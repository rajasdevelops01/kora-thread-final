import React from 'react';
import { MapPin, Sparkles, AlertCircle, FileCode, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenGeoInspector: () => void;
  onOpenAuthModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGeoInspector,
  onOpenAuthModal,
}) => {
  return (
    <footer className="bg-[#1c1c18] text-[#fcf9f2] pt-14 pb-8 border-t border-[#322319]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* MANDATORY COMPETITION DISCLOSURE (Rule 1) */}
        <div className="p-4 sm:p-5 bg-[#322319] rounded-2xl border border-[#49382d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#fc9e7e] shrink-0" />
            <p className="text-[#fcf9f2] leading-relaxed">
              <strong className="text-[#fc9e7e] font-bold">Competition Demonstration:</strong> Kora Threads is a fictional business created for the Get Cited hackathon. This website is a prototype, not a real store.
            </p>
          </div>
          <button
            onClick={onOpenGeoInspector}
            className="px-3.5 py-1.5 rounded-lg bg-[#fc9e7e] text-[#322319] font-bold text-[11px] shrink-0 cursor-pointer hover:bg-[#fc9e7e]/90 transition-colors"
          >
            Audit Hackathon GEO Compliance
          </button>
        </div>

        {/* 4-column footer directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Ground Truth */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                KORA THREADS
              </span>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#fc9e7e] font-semibold mt-0.5">
                Handloom &bull; Pune &bull; Est. 2021
              </p>
            </div>
            <p className="text-xs text-[#d2c4bc] leading-relaxed">
              Direct-to-consumer handloom brand headquartered in Pune, Maharashtra. Sourcing 100% pure cotton directly from weaver cooperatives in Maharashtra and Karnataka.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#fc9e7e]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>

          {/* Col 2: Handloom Collections & Brand */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#d2c4bc]">
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'kurtas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cotton Kurtas (₹1,800–₹4,200)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'stoles')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cotton Stoles (₹900–₹2,400)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'home-linen')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Linen (Recently Launched)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story: Rooted in Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cooperatives')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weaver Cooperatives Alliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rewear')}
                  className="hover:text-[#fc9e7e] text-[#fc9e7e] transition-colors cursor-pointer font-medium"
                >
                  Kora ReWear (Recycle &amp; Earn)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Authoritative Policies & Help */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Customer Information
            </h4>
            <ul className="space-y-2 text-xs text-[#d2c4bc]">
              <li>
                <button
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Authoritative FAQs
                </button>
              </li>
              <li>
                <span className="text-white">Shipping:</span> 4–6 business days (Free &gt; ₹2,000)
              </li>
              <li>
                <span className="text-white">Returns:</span> 10 days for unworn items with tags
              </li>
              <li>
                <span className="text-white">Payment:</span> ~40% Cash on Delivery, UPI &amp; Cards
              </li>
              <li>
                <button
                  onClick={onOpenAuthModal}
                  className="hover:text-white transition-colors cursor-pointer text-[#fc9e7e]"
                >
                  MiniMoth Phone Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Machine Discovery (GEO Behind the Scenes) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#fc9e7e]" />
              <span>Machine Discovery</span>
            </h4>
            <p className="text-xs text-[#d2c4bc]">
              Structured knowledge endpoints formatted for search crawlers and AI assistants.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#fc9e7e] hover:underline font-mono"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>/llms.txt</span>
                <ExternalLink className="w-3 h-3 text-[#d2c4bc]" />
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#fc9e7e] hover:underline font-mono"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>/llms-full.txt</span>
                <ExternalLink className="w-3 h-3 text-[#d2c4bc]" />
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#d2c4bc] hover:underline font-mono"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>/sitemap.xml</span>
              </a>
              <button
                onClick={onOpenGeoInspector}
                className="text-left text-[#fc9e7e] hover:text-white transition-colors cursor-pointer block pt-1"
              >
                &bull; Hackathon Evaluator Audit Tool
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#322319] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#80756e]">
          <div>
            &copy; 2021–{new Date().getFullYear()} Kora Threads. All rights reserved. Direct-to-Consumer Handloom.
          </div>
          <div className="flex items-center gap-3">
            <span>Powered by MiniMoth OTP Gateway</span>
            <span>&bull;</span>
            <span>Schema.org Semantic Knowledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
