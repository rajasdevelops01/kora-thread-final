import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, MapPin, Truck, RotateCcw, ShieldCheck, Check, Sparkles, AlertCircle, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PincodeChecker } from '../components/PincodeChecker';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onCheckoutDirect: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onCheckoutDirect,
}) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  React.useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0] || 'Standard');
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    onCheckoutDirect();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#80756e] hover:text-[#322319] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collections</span>
        </button>
        <span className="text-[#d2c4bc]">/</span>
        <span className="text-xs text-[#80756e] capitalize">{product.category.replace('-', ' ')}</span>
        <span className="text-[#d2c4bc]">/</span>
        <span className="text-xs text-[#322319] font-medium truncate">{product.name}</span>
      </div>

      {/* Main product presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#f6f3ec] border border-[#ebe8e1] shadow-xs">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#934930] ring-2 ring-[#934930]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Cooperative Provenance Card */}
          <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#24280b] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#934930]" />
              <span>Direct Cooperative Sourcing</span>
            </div>
            <p className="text-xs text-[#322319] font-medium">
              Loomed by <strong>{product.cooperativeOrigin.name}</strong> in {product.cooperativeOrigin.location}.
            </p>
            <p className="text-[11px] text-[#80756e] leading-relaxed">
              Kora Threads purchases continuous yardage directly from registered artisan cooperative societies in Maharashtra and Karnataka, honoring traditional pit-loom weaving livelihoods.
            </p>
          </div>
        </div>

        {/* Right: Info & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#24280b]/10 text-[#24280b] uppercase">
                {product.fabric}
              </span>
              <span className="text-xs text-[#80756e] font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#322319] leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-[#80756e]">{product.tagline}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 p-4 bg-[#f6f3ec] rounded-2xl border border-[#ebe8e1]">
            <span className="font-serif text-3xl font-bold text-[#322319]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-[#80756e]">
              Inclusive of all taxes &bull; Free shipping over ₹2,000
            </span>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-[#49382d] leading-relaxed">
            {product.description}
          </div>

          {/* Size selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#322319]">
              <span>SELECT SIZE</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-[#80756e]">Regular Relaxed Fit</span>
                {product.category === 'kurtas' && (
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#934930] hover:text-[#7e3e29] underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'border-[#322319] bg-[#322319] text-white shadow-xs'
                      : 'border-[#d2c4bc] bg-white text-[#322319] hover:bg-[#f6f3ec]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-4 rounded-xl bg-white border-2 border-[#322319] hover:bg-[#f6f3ec] text-[#322319] font-bold text-xs transition-colors cursor-pointer"
              >
                {addedToast ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
              >
                Buy Now (Demo Checkout)
              </button>
            </div>

            <p className="text-[11px] text-[#80756e] text-center">
              Guest checkout available. ~40% of orders choose Cash on Delivery.
            </p>
          </div>

          {/* Pincode & Delivery Checker */}
          <PincodeChecker />

          {/* Key Product Features & Authoritative Care */}
          <div className="border-t border-[#ebe8e1] pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#322319]">Weave Specifications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#49382d]">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authoritative Care Guide (Combats Reseller Misinformation) */}
            <div className="p-4 bg-white rounded-xl border border-[#ebe8e1] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#322319] uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#934930]" />
                <span>Authoritative Handloom Care Instructions</span>
              </div>
              <ul className="space-y-1 text-xs text-[#80756e]">
                {product.careInstructions.map((c, i) => (
                  <li key={i}>&bull; {c}</li>
                ))}
              </ul>
            </div>

            {/* Authoritative Return Policy (10-Day Unworn) */}
            <div className="p-4 bg-[#fcf0ec] rounded-xl border border-[#fc9e7e]/50 space-y-1.5 text-xs text-[#322319]">
              <div className="flex items-center gap-1.5 font-bold text-[#934930]">
                <RotateCcw className="w-4 h-4 text-[#934930]" />
                <span>10-Day Return Window (Unworn with Tags)</span>
              </div>
              <p className="text-[11px] text-[#49382d] leading-relaxed">
                Returns are accepted within <strong>10 days of delivery</strong> for unworn, unwashed items with tags intact. Please note: Some AI assistants cite a 30-day policy; our official policy is strictly 10 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kurta Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  );
};
