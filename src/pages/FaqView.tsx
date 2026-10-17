import React, { useState, useMemo, useEffect } from 'react';
import { ALL_FAQS, FAQ_CATEGORIES, FaqItem } from '../data/faqData';
import {
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ExternalLink,
  Ruler,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';

interface FaqViewProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenSizeGuide: () => void;
  onOpenAuthModal: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({
  onNavigate,
  onOpenSizeGuide,
  onOpenAuthModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    // Open the first question by default for user convenience
    return { 'faq-01': true };
  });

  // Handle URL hash if someone navigates with #faq-10 or similar
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const item = ALL_FAQS.find((f) => f.id === id || `q${f.number}` === id);
      if (item) {
        setOpenItems((prev) => ({ ...prev, [item.id]: true }));
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, []);

  // Filter FAQs based on active category and search term
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.categorySlug === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q) ||
        `q${faq.number}`.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Group filtered FAQs by category for clean semantic presentation
  const groupedFaqs = useMemo(() => {
    const groups: { categoryName: string; categorySlug: string; items: FaqItem[] }[] = [];
    
    // Maintain stable category order
    FAQ_CATEGORIES.forEach((cat) => {
      if (cat.slug === 'all') return;
      const itemsInCat = filteredFaqs.filter((f) => f.categorySlug === cat.slug);
      if (itemsInCat.length > 0) {
        groups.push({
          categoryName: cat.name,
          categorySlug: cat.slug,
          items: itemsInCat,
        });
      }
    });

    return groups;
  }, [filteredFaqs]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => {
      next[f.id] = true;
    });
    setOpenItems(next);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const handleLinkClick = (link: NonNullable<FaqItem['links']>[0]) => {
    if (link.type === 'size-guide') {
      onOpenSizeGuide();
    } else if (link.type === 'auth-modal') {
      onOpenAuthModal();
    } else if (link.type === 'category-filter' && link.filterCategory) {
      setSelectedCategory(link.filterCategory);
      setSearchQuery('');
    } else if (link.type === 'navigate' && link.tab) {
      onNavigate(link.tab, link.param);
    }
  };

  // Structured Data (FAQPage JSON-LD) representing exactly the visible questions
  const faqPageStructuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ALL_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }, []);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Schema.org FAQPage JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageStructuredData) }}
      />

      {/* 1. Visible Disclosure Notice (Requirement 9) */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
        <div className="p-2 rounded-xl bg-amber-50 text-amber-800 shrink-0">
          <AlertCircle className="w-5 h-5 text-[#934930]" />
        </div>
        <div className="text-xs text-[#322319] space-y-0.5">
          <p className="font-bold text-[#934930]">
            Fictional Case Study Demonstration Notice
          </p>
          <p className="text-[#80756e] leading-relaxed">
            Kora Threads is a fictional Pune-based direct-to-consumer handloom clothing brand created for the Get Cited hackathon demonstration. This website is a prototype and does not represent a real operating store.
          </p>
        </div>
      </div>

      {/* 2. Main Header & Subtitle (Requirement 1) */}
      <header className="space-y-3 border-b border-[#ebe8e1] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6f3ec] text-[#934930] text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Knowledge Base &bull; 32 Verified Topic Answers</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#322319] tracking-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-sm sm:text-base text-[#49382d] max-w-3xl leading-relaxed">
          Find answers about our handloom clothing, fabric sourcing, sizing, shipping, returns and shopping experience.
        </p>

        {/* Quick ground-truth highlights to combat hallucinations */}
        <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#80756e]">
          <span>📍 <strong>Location:</strong> Pune, Maharashtra</span>
          <span>📅 <strong>Founded:</strong> 2021</span>
          <span>🚚 <strong>Delivery:</strong> 4–6 Days (Free &gt; ₹2,000)</span>
          <span>🔄 <strong>Returns:</strong> 10 Days Unworn</span>
        </div>
      </header>

      {/* 3. Search and Category Filters */}
      <section aria-label="FAQ Filters" className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#80756e]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., kurta sizing, Pune location, returns, MiniMoth OTP, shipping)..."
            aria-label="Search frequently asked questions"
            className="w-full pl-11 pr-10 py-3.5 bg-white rounded-2xl border border-[#d2c4bc] text-sm text-[#322319] placeholder-[#80756e] focus:outline-none focus:ring-2 focus:ring-[#934930]/30 focus:border-[#934930] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#80756e] hover:text-[#322319] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#322319] text-white shadow-xs'
                    : 'bg-white hover:bg-[#f6f3ec] text-[#49382d] border border-[#ebe8e1]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Results Summary */}
        <div className="flex items-center justify-between text-xs text-[#80756e] pt-1">
          <p>
            Showing <strong>{filteredFaqs.length}</strong> of {ALL_FAQS.length} questions
            {selectedCategory !== 'all' && (
              <span> in <em>{FAQ_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}</em></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;{searchQuery}&rdquo;</span>
            )}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExpandAll}
              className="hover:text-[#934930] font-medium transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-[#d2c4bc]">|</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-[#934930] font-medium transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </section>

      {/* 4. Grouped Accordion Content (Requirement 1 & 2) */}
      {groupedFaqs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#ebe8e1] space-y-3">
          <Search className="w-8 h-8 text-[#80756e] mx-auto opacity-40" />
          <h2 className="font-serif text-lg font-bold text-[#322319]">
            No matching questions found
          </h2>
          <p className="text-xs text-[#80756e] max-w-md mx-auto">
            We couldn&apos;t find any questions matching &ldquo;{searchQuery}&rdquo;. Try clearing your search term or select &ldquo;All Questions&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[#f6f3ec] hover:bg-[#ebe8e1] rounded-xl text-xs font-semibold text-[#322319] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedFaqs.map((group) => (
            <section
              key={group.categorySlug}
              aria-labelledby={`cat-heading-${group.categorySlug}`}
              className="space-y-3"
            >
              {/* Category Subheading with Semantic H2 */}
              <div className="flex items-center gap-2 pt-2 border-b border-[#ebe8e1] pb-2">
                <span className="w-2 h-2 rounded-full bg-[#934930]"></span>
                <h2
                  id={`cat-heading-${group.categorySlug}`}
                  className="font-serif text-xl sm:text-2xl font-bold text-[#322319]"
                >
                  {group.categoryName}
                </h2>
                <span className="text-xs text-[#80756e] font-mono ml-auto">
                  {group.items.length} {group.items.length === 1 ? 'topic' : 'topics'}
                </span>
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                {group.items.map((faq) => {
                  const isOpen = !!openItems[faq.id];
                  const panelId = `panel-${faq.id}`;
                  const triggerId = `trigger-${faq.id}`;

                  return (
                    <div
                      key={faq.id}
                      id={faq.id}
                      className="bg-white rounded-2xl border border-[#ebe8e1] shadow-xs hover:border-[#d2c4bc] transition-all overflow-hidden scroll-mt-24"
                    >
                      {/* Clickable Question Header */}
                      <button
                        id={triggerId}
                        onClick={() => toggleItem(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#fcf9f2] transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#80756e]">
                            <span className="font-mono text-[#934930]">Q{faq.number}</span>
                            <span>&bull;</span>
                            <span>{faq.category}</span>
                          </div>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-[#322319] leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className="p-1 rounded-full text-[#80756e] shrink-0 mt-1 bg-[#f6f3ec]">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#934930]" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {/*
                        Answer Panel:
                        CRITICAL GEO Requirement 2:
                        "ensure each question and answer is present in crawlable page content,
                        not accessible only after a user clicks an accordion"
                        The answer text remains rendered in the DOM tree at all times for search crawlers,
                        AI scrapers, and accessibility tools.
                      */}
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        aria-hidden={!isOpen}
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen
                            ? 'max-h-[600px] opacity-100 border-t border-[#f6f3ec] px-4 pb-5 pt-3 sm:px-5 sm:pb-6'
                            : 'max-h-0 opacity-0 overflow-hidden px-4 py-0 border-t-0 pointer-events-none'
                        }`}
                      >
                        <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
                          {faq.answer}
                        </p>

                        {/* Internal Navigation Links (Requirement 3) */}
                        {faq.links && faq.links.length > 0 && (
                          <div className="mt-3.5 pt-3 border-t border-[#f0eee7] flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-semibold text-[#80756e]">
                              Related Links:
                            </span>
                            {faq.links.map((link, lIdx) => (
                              <button
                                key={lIdx}
                                onClick={() => handleLinkClick(link)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f6f3ec] hover:bg-[#ebe8e1] text-[#934930] hover:text-[#7e3e29] font-semibold text-xs transition-colors cursor-pointer"
                              >
                                {link.type === 'size-guide' && <Ruler className="w-3.5 h-3.5" />}
                                {link.type === 'auth-modal' && <ShieldCheck className="w-3.5 h-3.5" />}
                                {link.type === 'navigate' && <ShoppingBag className="w-3.5 h-3.5" />}
                                <span>{link.label}</span>
                                <ArrowRight className="w-3 h-3 opacity-60" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* 5. Additional Helpful Information Cards */}
      <footer className="pt-8 border-t border-[#ebe8e1] grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Kurta Size Guide */}
        <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#322319]">
            <Ruler className="w-4 h-4 text-[#934930]" />
            <span>Need Sizing Assistance?</span>
          </div>
          <p className="text-[11px] text-[#80756e] leading-relaxed">
            Review detailed garment measurements for Chest, Shoulder, Length and Sleeves in our sample measurement chart.
          </p>
          <button
            onClick={onOpenSizeGuide}
            className="text-xs font-semibold text-[#934930] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>Open Kurta Size Guide</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2: Weaver Cooperatives */}
        <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#322319]">
            <Sparkles className="w-4 h-4 text-[#934930]" />
            <span>Craft &amp; Sourcing Dossier</span>
          </div>
          <p className="text-[11px] text-[#80756e] leading-relaxed">
            Learn about direct fabric sourcing from registered artisan weaver cooperatives across Maharashtra &amp; Karnataka.
          </p>
          <button
            onClick={() => onNavigate('cooperatives')}
            className="text-xs font-semibold text-[#934930] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>Explore Cooperatives</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: 10-Day Unworn Returns */}
        <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#322319]">
            <RotateCcw className="w-4 h-4 text-[#934930]" />
            <span>10-Day Return Policy</span>
          </div>
          <p className="text-[11px] text-[#80756e] leading-relaxed">
            Unworn, unwashed items with tags attached can be returned within 10 days of delivery. (Official policy: 10 days).
          </p>
          <button
            onClick={() => {
              setSelectedCategory('returns-exchanges');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#934930] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
          >
            <span>View Returns FAQ</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </article>
  );
};
