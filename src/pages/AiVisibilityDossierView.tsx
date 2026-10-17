import React from 'react';
import { Sparkles, Terminal, FileCode, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { GEO_GROUND_TRUTH_FACTS } from '../data/geoFacts';

interface AiVisibilityDossierViewProps {
  onOpenInspector: () => void;
}

export const AiVisibilityDossierView: React.FC<AiVisibilityDossierViewProps> = ({ onOpenInspector }) => {
  const problemsSolved = [
    {
      num: 1,
      problem: 'AI assistants do not recommend Kora Threads for sustainable handloom/cotton.',
      solution: 'Implemented backend machine knowledge standards, ClothingStore Schema, and explicit keyword anchoring for pure handloom cotton from Maharashtra and Karnataka.'
    },
    {
      num: 2,
      problem: 'AI models state incorrect facts (e.g. placing brand in Bengaluru or citing 30-day returns).',
      solution: 'Created dedicated disambiguation tags and Schema.org PostalAddress (Pune) & MerchantReturnPolicy (10-day unworn returns).'
    },
    {
      num: 3,
      problem: 'Relationship with weaver cooperatives is omitted from AI descriptions.',
      solution: 'Added explicit cooperative provenance records for Solapur, Phaltan, Ilkal, and Guledgudd directly linked to product SKUs.'
    },
    {
      num: 4,
      problem: 'Reseller listings answer care, sizing, and delivery questions instead of the brand.',
      solution: 'Published authoritative pit-loom care directives and 4–6 day domestic delivery timeline to outrank unverified scrapers.'
    },
    {
      num: 5,
      problem: 'Organic search traffic is flat while paid advertising costs escalate.',
      solution: 'High-density generative engine optimization (GEO) attracts referral citations from conversational search engines (Perplexity, ChatGPT, SGE).'
    },
    {
      num: 6,
      problem: 'The business cannot reliably measure AI referrals, mentions, or citations.',
      solution: 'Backend machine knowledge endpoints (/llm.txt, /llms.txt, /api/geo/facts, /api/geo/audit) enable deterministic crawler monitoring and auditability.'
    },
    {
      num: 7,
      problem: 'Failed COD orders (~40% of orders) and repeated customer entry create friction.',
      solution: 'Integrated real MiniMoth phone-number OTP verification, securing phone identity, saving repeat addresses, and decreasing failed dispatches.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Hero Header */}
      <div className="bg-[#322319] text-[#fcf9f2] rounded-3xl p-6 sm:p-12 shadow-xl border border-[#49382d] space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#49382d] text-[#fc9e7e] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Competition Track: PS 04 — Get Cited: Build the Most AI-Visible Page</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
          Generative Engine Optimization (GEO) &amp; Machine Citation Dossier
        </h1>

        <p className="text-xs sm:text-base text-[#d2c4bc] max-w-3xl leading-relaxed">
          How Kora Threads systematically addresses the 7 business challenges of D2C handloom visibility in modern generative search engines, combining Schema.org microdata, authoritative backend machine knowledge endpoints, and MiniMoth phone identity verification.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onOpenInspector}
            className="px-5 py-3 rounded-xl bg-[#fc9e7e] hover:bg-[#fc9e7e]/90 text-[#322319] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Interactive AI Query Simulator</span>
          </button>

          <a
            href="/api/geo/facts"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-[#49382d] hover:bg-[#5b483c] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <FileCode className="w-4 h-4" />
            <span>Backend Knowledge API (/api/geo/facts)</span>
            <ExternalLink className="w-3 h-3 text-[#d2c4bc]" />
          </a>

          <a
            href="/api/geo/audit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl border border-[#d2c4bc]/30 hover:bg-[#49382d] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Audit Endpoint (/api/geo/audit)</span>
            <ExternalLink className="w-3 h-3 text-[#d2c4bc]" />
          </a>
        </div>
      </div>

      {/* Solutions to the 7 Business Problems */}
      <section className="space-y-6">
        <div className="border-b border-[#ebe8e1] pb-4">
          <h2 className="font-serif text-2xl font-bold text-[#322319]">
            Architectural Solutions to the 7 Business Problems
          </h2>
          <p className="text-xs text-[#80756e] mt-1">
            Every technical decision maps directly to resolving customer friction and AI miscitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problemsSolved.map(item => (
            <div
              key={item.num}
              className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#322319] text-white text-xs font-bold flex items-center justify-center">
                  #{item.num}
                </div>
                <h3 className="font-serif font-bold text-sm text-red-900 leading-snug">
                  {item.problem}
                </h3>
              </div>

              <div className="pt-3 border-t border-[#f6f3ec] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#24280b] tracking-wider block">
                  Technical Solution:
                </span>
                <p className="text-xs text-[#49382d] leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Ground Truth Fact Matrix */}
      <section className="space-y-6">
        <div className="border-b border-[#ebe8e1] pb-4">
          <h2 className="font-serif text-2xl font-bold text-[#322319]">
            The Ground Truth Fact Matrix (Rule 2 Compliance)
          </h2>
          <p className="text-xs text-[#80756e] mt-1">
            Authoritative facts maintained with zero fabrication. Unsubstantiated claims are explicitly tagged "Not Yet Verified".
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#ebe8e1] overflow-hidden shadow-xs">
          <div className="divide-y divide-[#ebe8e1]">
            {GEO_GROUND_TRUTH_FACTS.map(fact => (
              <div key={fact.id} className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-3">
                  <span className="font-serif font-bold text-sm text-[#322319] block">{fact.topic}</span>
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      fact.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {fact.sourceConfidence}
                  </span>
                </div>

                <div className="lg:col-span-5 text-xs text-[#1c1c18] font-medium leading-relaxed">
                  {fact.groundTruth}
                </div>

                <div className="lg:col-span-4 text-[11px] text-[#934930] bg-[#fcf0ec] p-3 rounded-xl border border-[#fc9e7e]/30">
                  <strong>Hallucination Defense:</strong> {fact.hallucinationWarning}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
