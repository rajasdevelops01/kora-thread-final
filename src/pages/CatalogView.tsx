import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategory } from '../types';
import { Filter, Search, RotateCcw } from 'lucide-react';

interface CatalogViewProps {
  initialCategory?: ProductCategory | 'all';
  onSelectProduct: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ initialCategory = 'all', onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'Maharashtra' | 'Karnataka'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedRegion !== 'all' && p.cooperativeOrigin.region !== selectedRegion) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCoop = p.cooperativeOrigin.name.toLowerCase().includes(query);
        const matchesLoc = p.cooperativeOrigin.location.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCoop && !matchesLoc && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, selectedRegion, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Category header */}
      <div className="border-b border-[#ebe8e1] pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#322319]">
          Pure Handloom Cotton Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#80756e] max-w-2xl leading-relaxed">
          Crafted from 100% pure handloom cotton sourced directly from registered weaver cooperatives in Maharashtra and Karnataka. Delivered within 4–6 days nationwide with free shipping over ₹2,000.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-4">
        {/* Top Row: Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'kurtas', label: 'Cotton Kurtas (₹1,800–₹4,200)' },
            { id: 'stoles', label: 'Cotton Stoles (₹900–₹2,400)' },
            { id: 'home-linen', label: 'Home Linen (New Launch)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#322319] text-white shadow-xs'
                  : 'bg-[#f6f3ec] text-[#49382d] hover:bg-[#ebe8e1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Secondary Row: Sourcing Region, Search & Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-[#f6f3ec] items-center">
          {/* Search box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by weave, cooperative, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#fcf9f2] rounded-xl border border-[#d2c4bc] focus:outline-none focus:ring-1 focus:ring-[#934930] font-medium"
            />
          </div>

          {/* Region selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#fcf9f2] rounded-xl border border-[#d2c4bc] text-[#322319] font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Sourcing Regions</option>
              <option value="Maharashtra">Maharashtra (Solapur, Phaltan)</option>
              <option value="Karnataka">Karnataka (Ilkal, Guledgudd)</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#fcf9f2] rounded-xl border border-[#d2c4bc] text-[#322319] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Handlooms</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="sm:col-span-1 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="p-2 text-[#80756e] hover:text-[#322319] hover:bg-[#f0eee7] rounded-lg transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active filter count and products */}
      <div className="flex items-center justify-between text-xs text-[#80756e]">
        <span>Showing <strong>{filteredProducts.length}</strong> verified handloom pieces</span>
        <span className="text-[11px] text-[#934930] font-medium">10-Day Unworn Returns Guaranteed</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#ebe8e1] space-y-3">
          <p className="font-serif text-lg font-semibold text-[#322319]">No products found matching your filter</p>
          <p className="text-xs text-[#80756e]">Try clearing your search term or switching the sourcing region.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#322319] text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
