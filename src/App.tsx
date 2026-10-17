/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ReWearProvider } from './context/ReWearContext';
import { NoticeBanner } from './components/NoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MiniMothAuthModal } from './components/MiniMothAuthModal';
import { GeoInspectorModal } from './components/GeoInspectorModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './pages/CartDrawer';
import { HomeView } from './pages/HomeView';
import { CatalogView } from './pages/CatalogView';
import { ProductDetailView } from './pages/ProductDetailView';
import { OurStoryView } from './pages/OurStoryView';
import { CraftCooperativesView } from './pages/CraftCooperativesView';
import { ReWearView } from './pages/ReWearView';
import { FaqView } from './pages/FaqView';
import { AiVisibilityDossierView } from './pages/AiVisibilityDossierView';
import { CheckoutView } from './pages/CheckoutView';
import { AccountView } from './pages/AccountView';
import { Product, ProductCategory, TabType } from './types';

function getInitialRoute(): {
  tab: TabType;
  category?: ProductCategory | 'all';
} {
  const path = window.location.pathname.toLowerCase();
  if (path === '/faq' || path === '/faqs') {
    return { tab: 'faqs' };
  }
  if (path === '/catalog/kurtas') {
    return { tab: 'catalog', category: 'kurtas' };
  }
  if (path === '/catalog/stoles') {
    return { tab: 'catalog', category: 'stoles' };
  }
  if (path === '/catalog/home-linen') {
    return { tab: 'catalog', category: 'home-linen' };
  }
  if (path.startsWith('/catalog')) {
    return { tab: 'catalog', category: 'all' };
  }
  if (path === '/our-story') {
    return { tab: 'our-story' };
  }
  if (path === '/cooperatives') {
    return { tab: 'cooperatives' };
  }
  if (path === '/rewear') {
    return { tab: 'rewear' };
  }
  if (path === '/checkout') {
    return { tab: 'checkout' };
  }
  if (path === '/account') {
    return { tab: 'account' };
  }
  if (path === '/ai-dossier') {
    return { tab: 'ai-dossier' };
  }
  return { tab: 'home' };
}

function AppContent() {
  const { openAuthModal } = useAuth();
  const initial = getInitialRoute();
  const [currentTab, setCurrentTab] = useState<TabType>(initial.tab);
  const [catalogCategory, setCatalogCategory] = useState<ProductCategory | 'all'>(
    initial.category || 'all'
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGeoInspectorOpen, setIsGeoInspectorOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Synchronize browser history on route change
  const handleNavigate = useCallback((tab: string, param?: string, pushState = true) => {
    setSelectedProduct(null);

    let newPath = '/';
    if (tab === 'catalog') {
      const cat = (param as ProductCategory | 'all') || 'all';
      setCatalogCategory(cat);
      setCurrentTab('catalog');
      newPath = cat !== 'all' ? `/catalog/${cat}` : '/catalog';
    } else if (tab === 'faqs' || tab === 'faq') {
      setCurrentTab('faqs');
      newPath = '/faq';
    } else if (tab === 'our-story') {
      setCurrentTab('our-story');
      newPath = '/our-story';
    } else if (tab === 'cooperatives') {
      setCurrentTab('cooperatives');
      newPath = '/cooperatives';
    } else if (tab === 'rewear') {
      setCurrentTab('rewear');
      newPath = '/rewear';
    } else if (tab === 'checkout') {
      setCurrentTab('checkout');
      newPath = '/checkout';
    } else if (tab === 'account') {
      setCurrentTab('account');
      newPath = '/account';
    } else if (tab === 'ai-dossier') {
      setCurrentTab('ai-dossier');
      newPath = '/ai-dossier';
    } else {
      setCurrentTab('home');
      newPath = '/';
    }

    if (pushState && window.location.pathname !== newPath) {
      window.history.pushState({ tab, param }, '', newPath);
    }
  }, []);

  // Listen to popstate (back/forward button)
  useEffect(() => {
    const onPopState = () => {
      const route = getInitialRoute();
      if (route.category) {
        setCatalogCategory(route.category);
      }
      setCurrentTab(route.tab);
      setSelectedProduct(null);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Dynamic SEO & GEO: Update title, meta description, and canonical URL dynamically per view
  useEffect(() => {
    let title = 'Kora Threads — Artisanal Handloom & Pure Cotton | Pune';
    let desc =
      'Pune-based direct-to-consumer handloom clothing brand founded in 2021. Sourcing 100% pure cotton directly from weaver cooperatives in Maharashtra & Karnataka.';
    let canonicalPath = '/';

    if (currentTab === 'catalog') {
      if (catalogCategory === 'kurtas') {
        title = 'Pure Handloom Cotton Kurtas (₹1,800–₹4,200) | Kora Threads Pune';
        desc =
          'Discover pure cotton handloom kurtas loomed in Solapur, Phaltan, and Ilkal. Unbleached ecru textures, mandarin collars, and wooden button details.';
        canonicalPath = '/catalog/kurtas';
      } else if (catalogCategory === 'stoles') {
        title = 'Handwoven Cotton Stoles (₹900–₹2,400) | Kora Threads Pune';
        desc =
          'Lightweight pure handloom cotton stoles with temple borders and hand-twisted fringes. Woven by cooperative societies in Maharashtra and Karnataka.';
        canonicalPath = '/catalog/stoles';
      } else if (catalogCategory === 'home-linen') {
        title = 'Artisanal Handloom Cotton Home Linen | Kora Threads Pune';
        desc =
          'Recently launched collection of coarse count pure cotton bed runners and handloom cushion covers loomed in Solapur and Ilkal.';
        canonicalPath = '/catalog/home-linen';
      } else {
        title = 'Pure Handloom Cotton Collections | Kora Threads Pune';
        canonicalPath = '/catalog';
      }
    } else if (currentTab === 'detail' && selectedProduct) {
      title = `${selectedProduct.name} — Pure Handloom Cotton | Kora Threads`;
      desc = `${selectedProduct.tagline} Loomed by ${selectedProduct.cooperativeOrigin.name} in ${selectedProduct.cooperativeOrigin.location}.`;
      canonicalPath = `/catalog/${selectedProduct.category}`;
    } else if (currentTab === 'our-story') {
      title = 'Our Story: Rooted in Craft. Made for Today | Kora Threads Pune';
      desc =
        'Founded in Pune in 2021, Kora Threads bridges traditional Maharashtra and Karnataka pit-loom weaving with contemporary cotton wardrobes.';
      canonicalPath = '/our-story';
    } else if (currentTab === 'cooperatives') {
      title = 'Weaver Cooperatives Alliance: Maharashtra & Karnataka | Kora Threads';
      desc =
        'Official direct sourcing partnerships with registered handloom weaver cooperatives in Solapur, Phaltan, Ilkal, and Guledgudd.';
      canonicalPath = '/cooperatives';
    } else if (currentTab === 'rewear') {
      title = 'Kora ReWear — Wear Again, Reward Again | Sustainable Cotton Recycling Pune';
      desc =
        'Return your worn-out cotton clothes, earn ReWear Points, and unlock rewards on your next Kora Threads handloom order. Pune-based circularity initiative.';
      canonicalPath = '/rewear';
    } else if (currentTab === 'faqs') {
      // Precise requirements from User Request
      title = 'Frequently Asked Questions | Kora Threads — Artisanal Handloom Pune';
      desc =
        'Find answers about our handloom clothing, fabric sourcing, sizing, shipping, returns and shopping experience. Fictional D2C demonstration based in Pune, founded 2021.';
      canonicalPath = '/faq';
    } else if (currentTab === 'checkout') {
      title = 'Prototype Demonstration Checkout | Kora Threads';
      canonicalPath = '/checkout';
    } else if (currentTab === 'account') {
      title = 'My Account & MiniMoth Verified Identity | Kora Threads';
      canonicalPath = '/account';
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    // Update canonical link element
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${window.location.origin}${canonicalPath}`);
  }, [currentTab, catalogCategory, selectedProduct]);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedProduct]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#1c1c18]">
      {/* Mandatory Rule 1 Persistent Notice Banner (No developer audit buttons in storefront navigation) */}
      <NoticeBanner />

      {/* Navigation Bar strictly in customer shopping order */}
      <Navbar
        currentTab={currentTab}
        currentCategoryParam={currentTab === 'catalog' ? catalogCategory : undefined}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'catalog' && (
          <CatalogView
            initialCategory={catalogCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => handleNavigate('catalog', selectedProduct.category)}
            onCheckoutDirect={() => handleNavigate('checkout')}
          />
        )}

        {currentTab === 'our-story' && (
          <OurStoryView
            onNavigateCatalog={(cat) => handleNavigate('catalog', cat)}
            onNavigateCooperatives={() => handleNavigate('cooperatives')}
          />
        )}

        {currentTab === 'cooperatives' && (
          <CraftCooperativesView
            onNavigateCatalog={(cat) => handleNavigate('catalog', cat)}
            onOpenGeoInspector={() => setIsGeoInspectorOpen(true)}
          />
        )}

        {currentTab === 'rewear' && (
          <ReWearView
            onNavigate={handleNavigate}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'faqs' && (
          <FaqView
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'ai-dossier' && (
          <AiVisibilityDossierView
            onOpenInspector={() => setIsGeoInspectorOpen(true)}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutView
            onBackToShopping={() => handleNavigate('catalog')}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'account' && (
          <AccountView
            onBackToHome={() => handleNavigate('home')}
            onOpenAuthModal={openAuthModal}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer with discrete Machine Discovery section */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGeoInspector={() => setIsGeoInspectorOpen(true)}
        onOpenAuthModal={openAuthModal}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => handleNavigate('checkout')}
        onContinueShopping={() => handleNavigate('catalog')}
      />

      {/* MiniMoth Phone Verification Modal */}
      <MiniMothAuthModal />

      {/* Kurta Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onNavigateToKurtas={() => handleNavigate('catalog', 'kurtas')}
      />

      {/* Hackathon Evaluator GEO Auditor Modal (Accessed via Footer) */}
      <GeoInspectorModal
        isOpen={isGeoInspectorOpen}
        onClose={() => setIsGeoInspectorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ReWearProvider>
          <AppContent />
        </ReWearProvider>
      </CartProvider>
    </AuthProvider>
  );
}
