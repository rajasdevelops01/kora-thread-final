import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, Truck, RotateCcw, HeartHandshake, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { ASSETS } from '../assets/images';

interface HomeViewProps {
  onNavigate: (tab: string, param?: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenAuthModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenAuthModal,
}) => {
  const kurtas = PRODUCTS.filter(p => p.category === 'kurtas').slice(0, 3);
  const stoles = PRODUCTS.filter(p => p.category === 'stoles').slice(0, 3);
  const homeLinen = PRODUCTS.filter(p => p.category === 'home-linen');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f6f3ec] border-b border-[#ebe8e1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe8e1] text-[#934930] text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#934930]"></span>
              <span>Pune, Maharashtra &bull; Founded 2021 &bull; Direct-to-Consumer</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#322319] leading-[1.15]">
              Pure Handloom Cotton. <br />
              <span className="italic font-normal text-[#934930]">Straight from the Weavers.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#49382d] max-w-xl leading-relaxed">
              Kora Threads partners directly with registered weaver cooperatives across Maharashtra and Karnataka. Crafted on wooden pit-looms in unbleached, breathable natural cotton for effortless everyday comfort.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('catalog', 'kurtas')}
                className="px-6 py-3.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Cotton Kurtas</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('catalog', 'stoles')}
                className="px-5 py-3.5 rounded-xl border border-[#d2c4bc] bg-white hover:bg-[#fcf9f2] text-[#322319] text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Shop Cotton Stoles</span>
              </button>

              <button
                onClick={() => onNavigate('our-story')}
                className="px-4 py-3.5 text-[#934930] hover:text-[#7e3e29] text-xs font-bold transition-colors cursor-pointer"
              >
                Our Story &rarr;
              </button>
            </div>

            {/* Factual Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#ebe8e1] max-w-lg text-xs text-[#80756e]">
              <div>
                <strong className="block text-sm font-serif font-bold text-[#322319]">₹1,800 – ₹4,200</strong>
                <span>Cotton Kurtas</span>
              </div>
              <div>
                <strong className="block text-sm font-serif font-bold text-[#322319]">₹900 – ₹2,400</strong>
                <span>Cotton Stoles</span>
              </div>
              <div>
                <strong className="block text-sm font-serif font-bold text-[#322319]">4–6 Days</strong>
                <span>Pan-India Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image (Authentic Indian Handloom Model) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#fcf9f2]">
                <img
                  src={ASSETS.kurtas.solapur}
                  alt="Indian model wearing Solapur Textured Pure Cotton Handloom Kurta by Kora Threads Pune"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Sourcing credential badge */}
              <div className="absolute -bottom-5 -left-3 sm:left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#d2c4bc] max-w-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#24280b]">
                  <ShieldCheck className="w-4 h-4 text-[#934930]" />
                  <span>Direct Cooperative Sourcing</span>
                </div>
                <p className="text-[11px] text-[#80756e]">
                  Solapur &amp; Ilkal weaver societies receive transparent remuneration on every meter loomed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee7] flex items-center justify-center text-[#934930]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#322319]">Pune Headquarters</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Founded in Pune in 2021. Designed and dispatched directly from Pune, Maharashtra across India.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee7] flex items-center justify-center text-[#24280b]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#322319]">Weaver Cooperatives</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              100% of fabrics are sourced directly from registered artisan societies in Maharashtra &amp; Karnataka.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee7] flex items-center justify-center text-[#934930]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#322319]">4–6 Days Delivery</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Prompt nationwide delivery. Complimentary free shipping on all orders above ₹2,000.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee7] flex items-center justify-center text-[#322319]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#322319]">10-Day Unworn Returns</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Transparent 10-day return window for unworn items with original tags intact.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1 (Highest Priority): COTTON KURTAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ebe8e1] pb-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-[#934930]">
              Primary Collection
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              Pure Cotton Handloom Kurtas
            </h2>
            <p className="text-xs text-[#80756e] mt-1">
              Price range: ₹1,800 to ₹4,200 &bull; Pit-loom woven in Solapur, Ilkal, and Phaltan
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog', 'kurtas')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#934930] hover:underline cursor-pointer"
          >
            <span>View All Kurtas ({PRODUCTS.filter(p => p.category === 'kurtas').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kurtas.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2 (Highest Priority): COTTON STOLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ebe8e1] pb-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-[#934930]">
              Primary Collection
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              Pure Handloom Cotton Stoles
            </h2>
            <p className="text-xs text-[#80756e] mt-1">
              Price range: ₹900 to ₹2,400 &bull; Draped over outfits with temple borders and hand-tied fringes
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog', 'stoles')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#934930] hover:underline cursor-pointer"
          >
            <span>View All Stoles ({PRODUCTS.filter(p => p.category === 'stoles').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stoles.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: HOME LINEN (RECENTLY LAUNCHED — KEPT IN SEPARATE DEDICATED SECTION, SECONDARY TO CLOTHING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f0eee7] rounded-3xl p-6 sm:p-8 border border-[#d2c4bc] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#24280b] bg-[#24280b]/10 px-2.5 py-0.5 rounded-full inline-block">
                Recently Launched &bull; Secondary Category
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#322319] mt-1">
                Artisanal Handloom Home Linen
              </h2>
              <p className="text-xs text-[#80756e]">
                Tactile coarse-count cotton bed runners and handloom cushion covers loomed in Solapur &amp; Ilkal.
              </p>
            </div>
            <button
              onClick={() => onNavigate('catalog', 'home-linen')}
              className="px-4 py-2 bg-white border border-[#d2c4bc] hover:bg-[#fcf9f2] rounded-xl text-xs font-semibold text-[#322319] transition-colors cursor-pointer shrink-0"
            >
              Explore Home Linen
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {homeLinen.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Craft Cooperatives Narrative Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ebe8e1] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#934930]">
              The Weaving Communities
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              Preserving Pit-Loom Traditions in Maharashtra &amp; Karnataka
            </h2>
            <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
              Every yard of cotton fabric used by Kora Threads is sourced directly from registered weaver cooperative societies in Solapur, Phaltan, Ilkal, and Guledgudd. By providing steady institutional demand for traditional unbleached weaves and border motifs, we support rural weaving livelihoods without commercial middlemen.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => onNavigate('cooperatives')}
                className="px-5 py-2.5 bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Learn About the Cooperatives
              </button>
              <button
                onClick={() => onNavigate('our-story')}
                className="px-4 py-2.5 border border-[#d2c4bc] hover:bg-[#f6f3ec] text-[#322319] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Read Our Story
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#d2c4bc] aspect-16/10 bg-gray-100">
            <img
              src={ASSETS.editorial.weavingWorkshop}
              alt="Handloom workers weaving cotton fabric on traditional looms in an Indian textile workshop."
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* MiniMoth Phone Verification Security Feature: Solving Problem 7 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#fcf9f2] rounded-3xl p-6 sm:p-8 border border-[#d2c4bc] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#24280b] bg-[#24280b]/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#24280b]" />
              <span>MiniMoth OTP Verification Integration</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#322319]">
              Frictionless Cash on Delivery &amp; Saved Addresses
            </h3>
            <p className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
              With 40% of orders placed via Cash on Delivery, phone verification via MiniMoth guarantees authentic contact numbers, prevents failed dispatches, and saves addresses for 1-click repeat orders.
            </p>
            <p className="text-[11px] text-[#80756e]">
              MiniMoth provides passwordless SMS OTP verification. Guest checkout remains available for all visitors.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center">
            <button
              onClick={onOpenAuthModal}
              className="px-6 py-3.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#fc9e7e]" />
              <span>Sign in with Phone (MiniMoth)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
