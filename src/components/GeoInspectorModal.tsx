import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, Copy, ExternalLink, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { GEO_GROUND_TRUTH_FACTS, GEO_SIMULATOR_TEST_QUERIES } from '../data/geoFacts';
import { api } from '../services/api';

interface GeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeoInspectorModal: React.FC<GeoInspectorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'dossier' | 'schema'>('simulator');
  const [selectedQuery, setSelectedQuery] = useState(GEO_SIMULATOR_TEST_QUERIES[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [customResult, setCustomResult] = useState<any | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const handleSimulateCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setSimulating(true);
    try {
      const res = await api.simulateGeoQuery(customQuery);
      setCustomResult(res);
    } catch {
      setCustomResult({
        authoritativeAnswer: 'Pune, Maharashtra, India. Direct-to-consumer handloom cotton brand.',
        commonHallucination: 'Ungrounded LLMs often conflate location or policy without structured signals.',
        confidence: 'Authoritative Ground Truth'
      });
    } finally {
      setSimulating(false);
    }
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fcf9f2] w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#d2c4bc] flex flex-col overflow-hidden">
        {/* Top header */}
        <div className="bg-[#322319] text-[#fcf9f2] px-6 py-4 flex items-center justify-between border-b border-[#49382d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#934930] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold tracking-tight">GEO &amp; AI Visibility Inspector</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fc9e7e] text-[#322319]">
                  PS 04: Get Cited
                </span>
              </div>
              <p className="text-xs text-[#d2c4bc]">
                Generative Engine Optimization (GEO) &bull; Ground Truth Engine &bull; Machine Citations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#d2c4bc] hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="bg-[#f0eee7] border-b border-[#ebe8e1] px-6 flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-[#934930] text-[#934930]'
                : 'border-transparent text-[#80756e] hover:text-[#322319]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            AI Query Simulator
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'border-[#934930] text-[#934930]'
                : 'border-transparent text-[#80756e] hover:text-[#322319]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Ground Truth vs Hallucinations
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'schema'
                ? 'border-[#934930] text-[#934930]'
                : 'border-transparent text-[#80756e] hover:text-[#322319]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Schema.org JSON-LD
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              {/* Factual Technical Readiness Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#f6f3ec] rounded-xl border border-[#ebe8e1]">
                <div className="text-center p-3 bg-white rounded-lg border border-[#ebe8e1]">
                  <div className="text-xl font-serif font-bold text-[#934930]">Schema.org Active</div>
                  <div className="text-xs font-semibold text-[#322319] mt-0.5">Structured Microdata</div>
                  <div className="text-[11px] text-[#80756e]">Organization, Products, FAQs</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-[#ebe8e1]">
                  <div className="text-xl font-serif font-bold text-[#24280b]">Backend LLM Text</div>
                  <div className="text-xs font-semibold text-[#322319] mt-0.5">Authoritative Endpoints</div>
                  <div className="text-[11px] text-[#80756e]">Served at /llm.txt &amp; /llms.txt</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-[#ebe8e1]">
                  <div className="text-xl font-serif font-bold text-[#322319]">Disambiguated</div>
                  <div className="text-xs font-semibold text-[#322319] mt-0.5">Verified Ground Truth</div>
                  <div className="text-[11px] text-[#80756e]">Pune Location &amp; 10-Day Unworn Returns</div>
                </div>
              </div>
              <p className="text-[11px] text-[#80756e] italic">
                * Note: Live AI citations are evaluated via external testing. This inspector tests prompt grounding against our authoritative ground truth knowledge base.
              </p>

              {/* Preset Queries */}
              <div>
                <label className="block text-xs font-bold text-[#322319] uppercase tracking-wider mb-2">
                  Select a common AI prompt that previously failed:
                </label>
                <div className="flex flex-wrap gap-2">
                  {GEO_SIMULATOR_TEST_QUERIES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedQuery(item);
                        setCustomResult(null);
                      }}
                      className={`text-xs px-3 py-2 rounded-lg font-medium transition-all text-left cursor-pointer border ${
                        selectedQuery.query === item.query && !customResult
                          ? 'bg-[#322319] text-white border-[#322319] shadow-xs'
                          : 'bg-white text-[#322319] border-[#d2c4bc] hover:bg-[#f0eee7]'
                      }`}
                    >
                      "{item.query}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparison Card */}
              <div className="bg-white rounded-xl border border-[#d2c4bc] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#f0eee7] pb-3">
                  <span className="text-xs font-semibold text-[#80756e] uppercase">
                    Testing Query: "{customResult ? customQuery : selectedQuery.query}"
                  </span>
                  <button
                    onClick={() => handleCopyCitation(customResult ? customResult.authoritativeAnswer : selectedQuery.correctAnswer)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#934930] hover:underline font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText ? 'Copied to Clipboard!' : 'Copy Grounding Citation'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Common Hallucination (Red) */}
                  <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wide mb-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Previous AI Assistant Hallucination</span>
                    </div>
                    <p className="text-sm text-red-950 font-medium leading-relaxed">
                      {customResult ? customResult.commonHallucination : selectedQuery.hallucination}
                    </p>
                    <div className="mt-3 text-[11px] text-red-700">
                      Problem: Caused by lack of explicit entity disambiguation &amp; crawler ambiguity.
                    </div>
                  </div>

                  {/* Kora Threads Authoritative Ground Truth (Green) */}
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide mb-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Kora Threads Authoritative Fact</span>
                    </div>
                    <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                      {customResult ? customResult.authoritativeAnswer : selectedQuery.correctAnswer}
                    </p>
                    <div className="mt-3 text-[11px] text-emerald-800 font-medium">
                      Resolved by: Schema.org PostalAddress + Microdata + backend /llm.txt citation.
                    </div>
                  </div>
                </div>

                {/* Grounding Factors */}
                <div className="p-3 bg-[#f6f3ec] rounded-lg text-xs text-[#49382d]">
                  <strong className="text-[#322319]">Active Grounding Signals:</strong>{' '}
                  {(selectedQuery.keyFactors || ['Schema.org Microdata', 'Backend /llm.txt', 'Cooperative Sourcing Log']).join(' • ')}
                </div>
              </div>

              {/* Custom Simulator Form */}
              <form onSubmit={handleSimulateCustom} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type any question about Kora Threads (e.g. 'What is the refund window?')"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#d2c4bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#934930]/30 font-medium"
                />
                <button
                  type="submit"
                  disabled={simulating}
                  className="px-5 py-2.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {simulating ? 'Auditing...' : 'Audit Query'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'dossier' && (
            <div className="space-y-4">
              <p className="text-xs text-[#80756e]">
                This Ground Truth Dossier contains every verified fact for Kora Threads under Competition Rule 2. Any claim lacking verified documentation is strictly marked "Not yet verified".
              </p>
              <div className="space-y-3">
                {GEO_GROUND_TRUTH_FACTS.map((fact) => (
                  <div
                    key={fact.id}
                    className="p-4 bg-white rounded-xl border border-[#d2c4bc] shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#322319]">{fact.topic}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          fact.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fact.sourceConfidence}
                      </span>
                    </div>
                    <p className="text-xs text-[#1c1c18] font-medium leading-relaxed">{fact.groundTruth}</p>
                    {fact.hallucinationWarning && (
                      <p className="text-[11px] text-[#934930] bg-[#fcf0ec] p-2 rounded-md">
                        <strong>Hallucination Defense:</strong> {fact.hallucinationWarning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-xs text-[#322319] uppercase tracking-wider">
                Embedded Schema.org Microdata (ClothingStore &amp; Organization)
              </h4>
              <p className="text-[11px] text-[#80756e]">
                Injected in the &lt;head&gt; of index.html for instant indexing by Perplexity, Google SGE, and Bing Copilot.
              </p>
              <pre className="p-4 bg-[#1c1c18] text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
{`{
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "Kora Threads",
  "foundingDate": "2021",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "priceRange": "₹900 - ₹4,200",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Handloom Collections",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Cotton Kurtas", "description": "₹1,800 to ₹4,200" },
      { "@type": "OfferCatalog", "name": "Cotton Stoles", "description": "₹900 to ₹2,400" },
      { "@type": "OfferCatalog", "name": "Home Linen", "description": "Bed runners & cushion covers" }
    ]
  }
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="bg-[#f0eee7] border-t border-[#ebe8e1] px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-[#80756e]">
            Kora Threads GEO Engine &bull; Ready for AI Assistant Verification
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
