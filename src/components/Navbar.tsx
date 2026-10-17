import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  currentCategoryParam?: string;
  onNavigate: (tab: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, currentCategoryParam, onNavigate }) => {
  const { itemCount, openCart } = useCart();
  const { session, isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact customer-facing navigation order required by user brief
  const navLinks = [
    { id: 'home', label: 'Home', tab: 'home' },
    { id: 'kurtas', label: 'Cotton Kurtas', tab: 'catalog', param: 'kurtas' },
    { id: 'stoles', label: 'Cotton Stoles', tab: 'catalog', param: 'stoles' },
    { id: 'home-linen', label: 'Home Linen', tab: 'catalog', param: 'home-linen' },
    { id: 'rewear', label: 'Kora ReWear', tab: 'rewear' },
    { id: 'our-story', label: 'Our Story', tab: 'our-story' },
    { id: 'cooperatives', label: 'Weaver Cooperatives', tab: 'cooperatives' },
    { id: 'faqs', label: 'FAQs', tab: 'faqs' },
  ];

  const handleLinkClick = (tab: string, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
  };

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.tab === 'catalog' && link.param) {
      return currentTab === 'catalog' && currentCategoryParam === link.param;
    }
    return currentTab === link.tab;
  };

  return (
    <header className="bg-[#fcf9f2] border-b border-[#ebe8e1] sticky top-[33px] z-40 transition-all">
      {/* Upper subtle bar: Verified Location & Free shipping threshold */}
      <div className="border-b border-[#f0eee7] py-1 px-4 text-xs text-[#80756e] flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#934930]"></span>
          <span>Pune, Maharashtra &bull; 100% Pure Handloom Cotton</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>Free domestic delivery on orders above ₹2,000</span>
          <span className="text-[#d2c4bc]">|</span>
          <span className="text-[#934930] font-medium">Delivery: 4–6 Days Nationwide</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-md text-[#322319] hover:bg-[#f0eee7] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer flex flex-col items-start select-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#322319] uppercase leading-none">
            Kora Threads
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#934930] font-semibold mt-0.5">
            Handloom &bull; Pune &bull; Est. 2021
          </span>
        </div>

        {/* Center: Desktop Navigation in exact specified order */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.tab, link.param)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 border-b-2 whitespace-nowrap ${
                  active
                    ? 'text-[#934930] border-[#934930] font-semibold'
                    : 'text-[#322319] hover:text-[#934930] border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Customer Actions (Phone Login & Shopping Bag) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone Login / Verified Account */}
          {isAuthenticated ? (
            <button
              onClick={() => onNavigate('account')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#24280b]/10 text-[#24280b] hover:bg-[#24280b]/20 border border-[#24280b]/30 text-xs font-semibold transition-colors cursor-pointer"
              title={`Logged in with MiniMoth: ${session?.phone}`}
            >
              <ShieldCheck className="w-4 h-4 text-[#24280b]" />
              <span className="hidden sm:inline">My Account</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#f0eee7] text-[#322319] border border-[#d2c4bc] text-xs font-semibold transition-colors cursor-pointer"
              title="Sign in with phone via MiniMoth OTP"
            >
              <User className="w-4 h-4 text-[#80756e]" />
              <span>Phone Login</span>
            </button>
          )}

          {/* Shopping Bag */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-full hover:bg-[#f0eee7] text-[#322319] transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#322319]" />
            <span className="hidden sm:inline text-xs font-semibold text-[#322319]">Bag</span>
            {itemCount > 0 && (
              <span className="bg-[#934930] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ebe8e1] bg-[#fcf9f2] px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.tab, link.param)}
                className={`text-left py-2.5 px-3 text-sm font-medium rounded-xl transition-colors ${
                  isLinkActive(link)
                    ? 'bg-[#f0eee7] text-[#934930] font-bold'
                    : 'text-[#322319] hover:bg-[#f0eee7]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#ebe8e1] flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onNavigate('account');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#24280b]/10 text-[#24280b] rounded-xl text-xs font-semibold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Account ({session?.phone})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#80756e] rounded-xl text-xs font-semibold text-[#322319]"
              >
                <User className="w-4 h-4" />
                <span>Sign in with Phone (MiniMoth OTP)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
