import React from 'react';
import { ASSETS } from '../assets/images';
import { MapPin, HeartHandshake, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

interface OurStoryViewProps {
  onNavigateCatalog: (category?: string) => void;
  onNavigateCooperatives: () => void;
}

export const OurStoryView: React.FC<OurStoryViewProps> = ({
  onNavigateCatalog,
  onNavigateCooperatives,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Editorial Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0eee7] text-[#934930] text-xs font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#934930]"></span>
          <span>Pune, Maharashtra &bull; Founded 2021</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#322319] leading-tight">
          Rooted in Craft. <br />
          <span className="italic font-normal text-[#934930]">Made for Today.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#49382d] leading-relaxed">
          Kora Threads is a Pune-based direct-to-consumer handloom clothing brand founded in 2021. We bridge the timeless heritage of traditional pit-loom weaving with the ease, breathability, and silhouettes demanded by contemporary living.
        </p>
      </section>

      {/* Main Narrative Hero Image with Craft Loom */}
      <section className="rounded-3xl overflow-hidden border border-[#d2c4bc] shadow-xl bg-[#f6f3ec] relative">
        <div className="aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-[#ebe8e1]">
          <img
            src={ASSETS.editorial.weavingWorkshop}
            alt="Handloom workers weaving cotton fabric on traditional looms in an Indian textile workshop."
            className="w-full h-full object-cover object-center transition-opacity duration-300"
            loading="eager"
            onError={(e) => {
              // Graceful fallback to guarantee visual continuity if primary asset fails
              const target = e.target as HTMLImageElement;
              if (target.src !== ASSETS.editorial.yarnTexture) {
                target.src = ASSETS.editorial.yarnTexture;
              }
            }}
          />
        </div>
        <div className="p-6 sm:p-8 bg-[#322319] text-[#fcf9f2] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fc9e7e]">Headquarters</span>
            <p className="text-sm font-serif font-bold text-white">Pune, Maharashtra</p>
            <p className="text-[#d2c4bc]">Conceived and dispatched from Pune since our inception in 2021.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fc9e7e]">Fabric Sourcing</span>
            <p className="text-sm font-serif font-bold text-white">Registered Weaver Cooperatives</p>
            <p className="text-[#d2c4bc]">Purchased directly from weaver societies in Maharashtra and Karnataka.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fc9e7e]">Core Collections</span>
            <p className="text-sm font-serif font-bold text-white">Cotton Kurtas &amp; Stoles</p>
            <p className="text-[#d2c4bc]">100% pure cotton, with recently added artisanal home linen.</p>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: The Beauty of Kora */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#934930]">
            Natural Fiber Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
            The Honesty of Pure Handloom Cotton
          </h2>
          <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
            In Marathi and Hindi, <em>'Kora'</em> signifies pure, unbleached, untouched, and authentic. When cotton is spun and woven by hand on wooden pit-looms, it retains tiny natural slub textures, breathable air pockets, and an organic drape that industrial synthetic mills cannot replicate.
          </p>
          <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
            Every garment we make starts with 100% pure handloom cotton yarns. Rather than treating natural variations as imperfections, we celebrate the tactile rhythm of the loom. Our garments soften with each wash, adapting to the Indian climate with natural breathability.
          </p>
        </div>

        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#ebe8e1] shadow-md aspect-4/3 bg-gray-100">
          <img
            src={ASSETS.editorial.yarnTexture}
            alt="Close-up of pure handloom cotton yarn and unbleached slub fabric texture"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Narrative Section 2: Regional Weaving Alliances */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden border border-[#ebe8e1] shadow-md aspect-3/4 bg-gray-100">
          <img
            src={ASSETS.kurtas.ilkal}
            alt="Pure handloom indigo cotton kurta with traditional Ilkal temple border loomed in Karnataka"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#24280b]">
            Direct Sourcing Alliance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
            Partnering with Weaver Cooperatives
          </h2>
          <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
            Instead of sourcing through commercial middle-tier wholesale markets, Kora Threads partners directly with registered weaver cooperative societies in <strong>Maharashtra</strong> (such as Solapur and Phaltan) and <strong>Karnataka</strong> (such as Ilkal and Guledgudd).
          </p>
          <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
            Cooperatives provide institutional protection, transparent yardage pricing, and collective welfare for traditional weaving families. By incorporating iconic regional techniques — such as Ilkal's <em>Chikki Paras</em> temple borders and Guledgudd's geometric <em>Khun</em> yokes — into clean, contemporary silhouettes, we help sustain vital textile heritages.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateCooperatives}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#934930] hover:underline cursor-pointer"
            >
              <span>Explore our cooperative records &amp; sourcing locations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#ebe8e1] shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
            Our Handloom Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#80756e]">
            Honoring authentic regional techniques across three focused categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#fcf9f2] border border-[#ebe8e1] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#934930] bg-[#fcf0ec] px-2.5 py-0.5 rounded-full inline-block">
                Primary Category
              </span>
              <h3 className="font-serif text-lg font-bold text-[#322319]">Cotton Kurtas</h3>
              <p className="text-xs text-[#80756e] leading-relaxed">
                Relaxed silhouettes, mandarin collars, and wooden button plackets woven in Solapur and Ilkal. Priced from ₹1,800 to ₹4,200.
              </p>
            </div>
            <button
              onClick={() => onNavigateCatalog('kurtas')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              View Kurtas
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#fcf9f2] border border-[#ebe8e1] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#934930] bg-[#fcf0ec] px-2.5 py-0.5 rounded-full inline-block">
                Primary Category
              </span>
              <h3 className="font-serif text-lg font-bold text-[#322319]">Cotton Stoles</h3>
              <p className="text-xs text-[#80756e] leading-relaxed">
                Feather-soft pure cotton stoles with temple borders and hand-twisted fringes. Priced from ₹900 to ₹2,400.
              </p>
            </div>
            <button
              onClick={() => onNavigateCatalog('stoles')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              View Stoles
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#fcf9f2] border border-[#ebe8e1] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#24280b] bg-[#24280b]/10 px-2.5 py-0.5 rounded-full inline-block">
                Recently Launched
              </span>
              <h3 className="font-serif text-lg font-bold text-[#322319]">Home Linen</h3>
              <p className="text-xs text-[#80756e] leading-relaxed">
                Textured cotton bed runners and handloom cushion covers loomed with coarse count yarns for warmth and living tactile beauty.
              </p>
            </div>
            <button
              onClick={() => onNavigateCatalog('home-linen')}
              className="w-full py-2.5 px-3 rounded-xl border border-[#d2c4bc] bg-white hover:bg-[#ebe8e1] text-[#322319] text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              View Home Linen
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Hackathon Prototype Disclosure */}
      <section className="p-6 bg-[#322319] text-[#fcf9f2] rounded-3xl border border-[#49382d] flex flex-col sm:flex-row items-center gap-4 text-xs">
        <ShieldAlert className="w-8 h-8 text-[#fc9e7e] shrink-0" />
        <div className="space-y-1">
          <h4 className="font-serif text-sm font-bold text-[#fc9e7e]">
            Competition Demonstration Notice
          </h4>
          <p className="text-[#d2c4bc] leading-relaxed">
            Kora Threads is a fictional business created for the <em>Get Cited</em> hackathon (Problem Statement 04). This website is a functional prototype designed to demonstrate Generative Engine Optimization (GEO) and MiniMoth verification, not a commercial retail entity.
          </p>
        </div>
      </section>
    </div>
  );
};
