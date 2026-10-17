import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReWear } from '../context/ReWearContext';
import { ShieldCheck, MapPin, Plus, LogOut, Package, Clock, Phone, AlertCircle, Coins, RotateCcw, ArrowRight } from 'lucide-react';

interface AccountViewProps {
  onBackToHome: () => void;
  onOpenAuthModal: () => void;
  onNavigate?: (tab: string, param?: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ onBackToHome, onOpenAuthModal, onNavigate }) => {
  const { session, isAuthenticated, logout, savedAddresses, addSavedAddress, authStatus } = useAuth();
  const { availablePoints, equivalentDiscountRupees, submissions } = useReWear();

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: session?.phone || '',
    addressLine: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411004',
  });

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine) return;
    addSavedAddress(newAddr);
    setShowAddAddress(false);
    setNewAddr({
      fullName: '',
      phone: session?.phone || '',
      addressLine: '',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#f6f3ec] text-[#934930] flex items-center justify-center mx-auto">
          <Phone className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[#322319]">Phone Sign-in Required</h2>
          <p className="text-xs text-[#80756e]">
            Access your saved delivery addresses, order history, and 1-click COD authorization via MiniMoth OTP.
          </p>
        </div>
        <button
          onClick={onOpenAuthModal}
          className="w-full py-3.5 px-6 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Verify Phone with MiniMoth
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#ebe8e1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#24280b]/10 text-[#24280b] flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#322319]">
                {session?.phone}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                MiniMoth Verified
              </span>
            </div>
            <p className="text-xs text-[#80756e] mt-0.5">
              Verified Session &bull; Secured with MiniMoth OTP Gateway
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#d2c4bc] text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* MiniMoth Verification Diagnostics */}
      <div className="p-4 bg-[#f6f3ec] rounded-2xl border border-[#ebe8e1] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-[#80756e] block text-[11px]">Provider:</span>
          <strong className="text-[#322319]">MiniMoth OTP &amp; Session Service</strong>
        </div>
        <div>
          <span className="text-[#80756e] block text-[11px]">Session ID:</span>
          <span className="font-mono text-[#322319] truncate block">
            {session?.sessionId || 'mm_sess_active'}
          </span>
        </div>
        <div>
          <span className="text-[#80756e] block text-[11px]">Verified Timestamp:</span>
          <span className="text-[#322319]">
            {session?.verifiedAt ? new Date(session.verifiedAt).toLocaleTimeString() : 'Active'}
          </span>
        </div>
      </div>

      {/* Kora ReWear Rewards Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-white to-[#fcf9f2] rounded-3xl border border-[#d2c4bc] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#934930]/10 text-[#934930] flex items-center justify-center">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-[#322319]">
                Kora ReWear Rewards
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#24280b]/10 text-[#24280b]">
                {availablePoints} Points Available
              </span>
            </div>
            <p className="text-xs text-[#80756e] mt-0.5">
              Worth <strong>₹{equivalentDiscountRupees} discount</strong> on your next eligible handloom order &bull; {submissions.length} returns registered
            </p>
          </div>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('rewear')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <span>Open ReWear Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Saved Addresses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#322319]">Saved Delivery Addresses</h3>
            <p className="text-xs text-[#80756e]">Enables 1-click checkout without repeated entry</p>
          </div>
          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Address</span>
          </button>
        </div>

        {showAddAddress && (
          <form onSubmit={handleCreateAddress} className="p-5 bg-white rounded-2xl border border-[#d2c4bc] shadow-sm space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#322319]">New Indian Delivery Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
              />
            </div>
            <input
              type="text"
              placeholder="Flat / House No., Apartment, Street"
              required
              value={newAddr.addressLine}
              onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City"
                required
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
              />
              <input
                type="text"
                placeholder="Pincode"
                maxLength={6}
                required
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="px-3.5 py-2 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2]"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#934930] hover:bg-[#7e3e29] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setShowAddAddress(false)}
                className="px-4 py-2 border border-[#d2c4bc] text-xs font-semibold rounded-xl text-[#322319] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-5 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#322319]">{addr.fullName}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f6f3ec] text-[#24280b]">
                    Default Dispatch
                  </span>
                )}
              </div>
              <p className="text-xs text-[#49382d] leading-relaxed">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-[11px] text-[#80756e]">
                Contact: <strong>{addr.phone}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Demonstration Order History */}
      <div className="space-y-4 pt-4 border-t border-[#ebe8e1]">
        <h3 className="font-serif text-lg font-bold text-[#322319]">Demonstration Orders</h3>
        <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] text-xs text-[#80756e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-[#934930]" />
            <div>
              <span className="font-semibold text-[#322319] block">Order KT-847291 &bull; 1x Solapur Textured Kurta</span>
              <span>Delivered to Pune &bull; 100% Pure Handloom Cotton</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            Delivered in 4 Days
          </span>
        </div>
      </div>
    </div>
  );
};
