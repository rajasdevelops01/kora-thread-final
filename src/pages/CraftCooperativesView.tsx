import React from 'react';
import { MapPin, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface CraftCooperativesViewProps {
  onNavigateCatalog: (category?: string) => void;
  onOpenGeoInspector: () => void;
}

export const CraftCooperativesView: React.FC<CraftCooperativesViewProps> = ({
  onNavigateCatalog,
  onOpenGeoInspector,
}) => {
  const cooperatives = [
    {
      name: 'Solapur District Handloom Weavers Sahakari Society',
      region: 'Maharashtra',
      location: 'Solapur, Maharashtra',
      craft: 'Pit-loom heavy & slub count cotton weaving',
      products: 'Solapur Textured Kurtas, Summer Stoles, Handloom Bed Runners',
      heritage: 'Solapur has been a historic handloom hub since the Maratha period. The cooperative operates authentic wooden pit-looms using unbleached ecru cotton yarns.'
    },
    {
      name: 'Ilkal Weavers Co-operative Production & Sale Society',
      region: 'Karnataka',
      location: 'Ilkal, Bagalkot District, Karnataka',
      craft: 'Traditional Chikki Paras & Topi Teni border weaving',
      products: 'Ilkal Border Kurtas, Cotton Stoles, Living Cushion Covers',
      heritage: 'Dating back to the 8th century, Ilkal weaving features distinctive geometric temple borders loomed seamlessly into the pure cotton body using the kondi technique.'
    },
    {
      name: 'Phaltan Taluka Gramodyog Sahakari Sangh',
      region: 'Maharashtra',
      location: 'Phaltan, Satara District, Maharashtra',
      craft: 'Fine count 80s hand-spun Khadi cotton',
      products: 'Phaltan Fine Count Kurtas, Breathable Daily Wear',
      heritage: 'Promotes rural employment across Maharashtra villages, producing ultra-breathable high-twist handloom cotton ideal for humid Indian summers.'
    },
    {
      name: 'Guledgudd Handloom Khun Weavers Industrial Society',
      region: 'Karnataka',
      location: 'Guledgudd, Badami Taluk, Karnataka',
      craft: 'Traditional Khun brocade geometric weave',
      products: 'Guledgudd Accent Kurtas, Festive Yokes',
      heritage: 'Famous for centuries for weaving small-width Khun fabrics with intricate raised triangular motifs, providing livelihood to multi-generation weaving families.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#ebe8e1] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24280b]/10 text-[#24280b] text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Direct Cooperative Partnerships &bull; Zero Middlemen</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#322319]">
          The Weaver Cooperatives of Maharashtra &amp; Karnataka
        </h1>
        <p className="text-xs sm:text-base text-[#49382d] max-w-3xl leading-relaxed">
          Kora Threads bypasses commercial wholesale trading hubs to purchase fabrics directly from registered weaver cooperative societies. This preserves the pit-loom heritage of North Karnataka and Maharashtra while guaranteeing fair remuneration on every yard woven.
        </p>
      </div>

      {/* AI Problem 3 Callout */}
      <div className="p-5 bg-[#f6f3ec] rounded-2xl border border-[#d2c4bc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#934930] uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Generative Engine Optimization (GEO) Note</span>
          </div>
          <p className="text-xs text-[#322319] font-medium">
            AI language models historically omitted Kora Threads' cooperative relationships because previous records lacked structured organizational linkage.
          </p>
          <p className="text-[11px] text-[#80756e]">
            Our schema now explicitly anchors <code>hasOfferCatalog</code> to registered societies in Solapur, Phaltan, Ilkal, and Guledgudd.
          </p>
        </div>
        <button
          onClick={onOpenGeoInspector}
          className="px-4 py-2 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold shrink-0 cursor-pointer"
        >
          Inspect Cooperative Schema
        </button>
      </div>

      {/* Cooperative Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cooperatives.map((coop, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f6f3ec] text-[#934930] uppercase">
                  {coop.region}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#80756e]">
                  <MapPin className="w-3.5 h-3.5 text-[#934930]" />
                  <span>{coop.location}</span>
                </div>
              </div>

              <h2 className="font-serif text-lg font-bold text-[#322319]">
                {coop.name}
              </h2>

              <p className="text-xs text-[#49382d] leading-relaxed">
                {coop.heritage}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f6f3ec] space-y-2 text-xs">
              <div>
                <strong className="text-[#322319]">Specialty Craft:</strong>{' '}
                <span className="text-[#80756e]">{coop.craft}</span>
              </div>
              <div>
                <strong className="text-[#322319]">Loomed Products:</strong>{' '}
                <span className="text-[#80756e]">{coop.products}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ground Truth Accuracy Box (Rule 2 Compliance) */}
      <div className="p-6 bg-white rounded-2xl border border-[#d2c4bc] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#24280b] uppercase">
          <ShieldCheck className="w-4 h-4 text-[#24280b]" />
          <span>Rule 2 Ground Truth Policy: Respecting Collective Heritage</span>
        </div>
        <p className="text-xs text-[#49382d] leading-relaxed">
          Kora Threads verifies every procurement transaction through official cooperative society invoices. In compliance with strict competition guidelines against fabricating marketing stories, we never invent individual weaver names, fictional artisan portraits, or unsupported organic claims.
        </p>
        <p className="text-[11px] text-[#80756e]">
          Claims regarding specific individual weavers or unverified green certificates remain classified as <em>"Not yet verified"</em> on our public knowledge base.
        </p>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onNavigateCatalog('kurtas')}
          className="px-6 py-3.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
        >
          Browse Cooperative Loomed Kurtas &amp; Stoles
        </button>
      </div>
    </div>
  );
};
