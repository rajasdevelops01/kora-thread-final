import React, { useState } from 'react';
import { Product } from '../types';
import { MapPin, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ASSETS } from '../assets/images';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'Standard');
  };

  const handleImageError = () => {
    if (product.category === 'kurtas') {
      setImgSrc(ASSETS.kurtas.solapur);
    } else if (product.category === 'stoles') {
      setImgSrc(ASSETS.stoles.ilkal);
    } else {
      setImgSrc(ASSETS.homeLinen.bedRunner);
    }
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-[#ebe8e1] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#d2c4bc] transition-all duration-300 flex flex-col cursor-pointer"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={product.name} />
      <meta itemProp="sku" content={product.sku} />
      <meta itemProp="description" content={product.description} />
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
        <meta itemProp="price" content={product.price.toString()} />
        <meta itemProp="priceCurrency" content="INR" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
      </div>

      {/* Image container */}
      <div className="relative aspect-3/4 bg-[#f6f3ec] overflow-hidden">
        <img
          src={imgSrc}
          alt={`${product.name} — Pure Handloom Cotton loomed in ${product.cooperativeOrigin.location}`}
          onError={handleImageError}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          itemProp="image"
        />

        {/* Origin tag */}
        <div className="absolute top-3 left-3 bg-[#fcf9f2]/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#322319] border border-[#d2c4bc]/60 shadow-xs flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#934930]" />
          <span>{product.cooperativeOrigin.location}</span>
        </div>

        {/* 100% Pure Cotton Pill */}
        <div className="absolute bottom-3 left-3 bg-[#24280b]/90 backdrop-blur-xs text-[#fcf9f2] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
          100% Pure Cotton
        </div>

        {/* Hover View overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#322319] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#934930]" />
            View Product
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[11px] text-[#80756e] font-semibold tracking-wide uppercase mb-1">
            {product.cooperativeOrigin.name}
          </div>
          <h3 className="font-serif text-base font-bold text-[#322319] group-hover:text-[#934930] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#80756e] line-clamp-2 mt-1">
            {product.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-[#f6f3ec] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#322319]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3 py-1.5 rounded-xl bg-[#322319] hover:bg-[#934930] text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="Add to shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
