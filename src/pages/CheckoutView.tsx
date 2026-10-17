import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReWear } from '../context/ReWearContext';
import { ShieldAlert, ShieldCheck, CheckCircle2, Truck, ArrowLeft, Phone, CreditCard, Banknote, Coins, RotateCcw } from 'lucide-react';

interface CheckoutViewProps {
  onBackToShopping: () => void;
  onOpenAuthModal: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onBackToShopping, onOpenAuthModal }) => {
  const { cart, subtotal, shippingCharge, total, clearCart } = useCart();
  const { session, isAuthenticated, savedAddresses } = useAuth();
  const {
    availablePoints,
    equivalentDiscountRupees,
    selectedRedemptionPoints,
    appliedDiscountRupees,
    setRedemptionPoints,
    applyRedemptionAtCheckout,
  } = useReWear();

  const finalTotal = Math.max(0, total - appliedDiscountRupees);

  const [checkoutMode, setCheckoutMode] = useState<'guest' | 'verified'>(isAuthenticated ? 'verified' : 'guest');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'prepaid'>('cod');

  const [formData, setFormData] = useState({
    fullName: savedAddresses[0]?.fullName || '',
    phone: session?.phone || savedAddresses[0]?.phone || '',
    addressLine: savedAddresses[0]?.addressLine || '',
    city: savedAddresses[0]?.city || 'Pune',
    state: savedAddresses[0]?.state || 'Maharashtra',
    pincode: savedAddresses[0]?.pincode || '411004',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    date: string;
    estimatedDelivery: string;
    totalAmount: number;
    paymentType: string;
    phone: string;
    isVerified: boolean;
    pointsRedeemed: number;
    discountSaved: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `KT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Deduct redeemed points and log transaction in ReWear context
      if (selectedRedemptionPoints >= 100) {
        applyRedemptionAtCheckout(generatedOrderId);
      }

      setOrderComplete({
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDelivery: '4–6 business days',
        totalAmount: finalTotal,
        paymentType: paymentMethod === 'cod' ? 'Cash on Delivery (~40% volume)' : 'UPI / Card Prepayment',
        phone: formData.phone,
        isVerified: isAuthenticated,
        pointsRedeemed: selectedRedemptionPoints,
        discountSaved: appliedDiscountRupees,
      });
      clearCart();
      setIsSubmitting(false);
    }, 900);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-3xl border border-[#ebe8e1] p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Demonstration Order Logged
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-[#80756e]">
              Order ID: <strong className="text-[#322319] font-mono">{orderComplete.orderId}</strong> &bull; {orderComplete.date}
            </p>
          </div>

          {/* Prototype disclaimer badge */}
          <div className="p-3 bg-[#fcf0ec] rounded-xl border border-[#fc9e7e] text-xs text-[#934930] flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              <strong>Competition Prototype:</strong> No real payment was collected and no actual shipment will be dispatched.
            </span>
          </div>

          {/* Order specs summary */}
          <div className="p-4 bg-[#f6f3ec] rounded-2xl border border-[#ebe8e1] text-xs text-left space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[#80756e]">Delivery Destination:</span>
              <span className="font-semibold text-[#322319]">{formData.city}, {formData.state} - {formData.pincode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#80756e]">Estimated Timeline:</span>
              <span className="font-semibold text-emerald-800">{orderComplete.estimatedDelivery} across India</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#80756e]">Payment Mode:</span>
              <span className="font-semibold text-[#322319]">{orderComplete.paymentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#80756e]">MiniMoth Verification:</span>
              <span className="font-semibold text-[#24280b]">
                {orderComplete.isVerified ? '✓ Verified Phone Session' : 'Guest Checkout'}
              </span>
            </div>
            {orderComplete.discountSaved > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                <span>ReWear Points Redeemed ({orderComplete.pointsRedeemed} pts):</span>
                <span>-₹{orderComplete.discountSaved} Discount</span>
              </div>
            )}
            <div className="flex justify-between border-t border-[#ebe8e1] pt-2 text-sm font-bold text-[#322319]">
              <span>Total Amount:</span>
              <span className="font-serif text-[#934930]">₹{orderComplete.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#d2c4bc] text-xs text-[#80756e] text-left">
            <strong className="text-[#322319]">Return Policy Reminder:</strong> Returns are accepted within <strong>10 days of delivery</strong> provided garments are unworn with original tags attached.
          </div>

          <button
            onClick={onBackToShopping}
            className="w-full py-3.5 px-6 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Return to Store Collections
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#322319]">Your bag is currently empty</h2>
        <p className="text-xs text-[#80756e]">Add handloom items to your bag before checking out.</p>
        <button
          onClick={onBackToShopping}
          className="px-6 py-3 rounded-xl bg-[#322319] text-white text-xs font-semibold"
        >
          Explore Handloom Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBackToShopping}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#80756e] hover:text-[#322319] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continue Shopping</span>
      </button>

      {/* Mandatory Prototype Notice */}
      <div className="p-4 bg-[#322319] text-[#fcf9f2] rounded-2xl flex items-center justify-between gap-4 text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#fc9e7e] shrink-0" />
          <span>
            <strong>Competition Prototype Checkout:</strong> Kora Threads is a fictional direct-to-consumer store demonstration. No real charges or shipments occur.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Guest vs Phone Verification Toggle */}
          <div className="p-4 bg-white rounded-2xl border border-[#ebe8e1] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#322319] uppercase tracking-wider">
                Checkout Identity
              </span>
              {isAuthenticated ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#24280b]/10 text-[#24280b]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  MiniMoth Verified ({session?.phone})
                </span>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-1.5 text-xs text-[#934930] hover:underline font-semibold cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Verify with MiniMoth for 1-Click Orders</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[#80756e]">
              {isAuthenticated
                ? 'Your session is authenticated via MiniMoth OTP. Addresses and COD orders are secured.'
                : 'Guest checkout is active. You may checkout anonymously or verify your phone via MiniMoth to save addresses for repeat orders.'}
            </p>
          </div>

          {/* Shipping Address Form */}
          <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#322319]">
              Domestic Shipping Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#322319] mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Pooja Deshmukh"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#322319] mb-1">Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#322319] mb-1">Street Address</label>
              <input
                type="text"
                name="addressLine"
                required
                value={formData.addressLine}
                onChange={handleInputChange}
                placeholder="House / Flat No., Apartment, Street"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#322319] mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#322319] mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#322319] mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#d2c4bc] bg-[#fcf9f2] focus:outline-none focus:ring-1 focus:ring-[#934930]"
                />
              </div>
            </div>

            {/* 4. Use Your ReWear Points Section (Requirement 4) */}
            <div className="pt-4 border-t border-[#f6f3ec] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#934930]" />
                  <label className="text-xs font-bold text-[#322319] uppercase tracking-wider">
                    Use Your ReWear Points
                  </label>
                </div>
                <span className="text-[11px] font-semibold text-[#24280b] bg-[#24280b]/10 px-2.5 py-0.5 rounded-full">
                  {availablePoints} pts available (₹{equivalentDiscountRupees} value)
                </span>
              </div>

              {availablePoints < 100 ? (
                <div className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] space-y-1 text-xs">
                  <p className="font-medium text-[#322319]">
                    Minimum 100 points required for discount redemption.
                  </p>
                  <p className="text-[11px] text-[#80756e]">
                    You currently have {availablePoints} ReWear Points. Return worn-out clothes through Kora ReWear to earn 50 points per garment.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-[#80756e]">
                    Select points to apply on this order (100 points = ₹50 discount):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setRedemptionPoints(0)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedRedemptionPoints === 0
                          ? 'border-[#322319] bg-[#322319] text-white'
                          : 'border-[#d2c4bc] bg-white text-[#322319] hover:bg-[#f6f3ec]'
                      }`}
                    >
                      Don&apos;t use
                    </button>

                    <button
                      type="button"
                      onClick={() => setRedemptionPoints(100)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedRedemptionPoints === 100
                          ? 'border-[#934930] bg-[#934930] text-white shadow-xs'
                          : 'border-[#d2c4bc] bg-white text-[#322319] hover:bg-[#f6f3ec]'
                      }`}
                    >
                      100 pts (-₹50)
                    </button>

                    {availablePoints >= 150 && (
                      <button
                        type="button"
                        onClick={() => setRedemptionPoints(150)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedRedemptionPoints === 150
                            ? 'border-[#934930] bg-[#934930] text-white shadow-xs'
                            : 'border-[#d2c4bc] bg-white text-[#322319] hover:bg-[#f6f3ec]'
                        }`}
                      >
                        150 pts (-₹75)
                      </button>
                    )}

                    {availablePoints >= 200 && (
                      <button
                        type="button"
                        onClick={() => setRedemptionPoints(200)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedRedemptionPoints === 200
                            ? 'border-[#934930] bg-[#934930] text-white shadow-xs'
                            : 'border-[#d2c4bc] bg-white text-[#322319] hover:bg-[#f6f3ec]'
                        }`}
                      >
                        200 pts (-₹100)
                      </button>
                    )}
                  </div>

                  {selectedRedemptionPoints > 0 && (
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                      <span>✓ Applying <strong>{selectedRedemptionPoints} ReWear Points</strong></span>
                      <span className="font-bold">-₹{appliedDiscountRupees} Savings</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[10px] text-[#80756e] italic">
                *Demo UI Prototype: Points redemption and checkout discount calculations are simulated for the Get Cited hackathon demonstration.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-4 border-t border-[#f6f3ec] space-y-3">
              <label className="block text-xs font-bold text-[#322319] uppercase tracking-wider">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#934930] bg-[#fcf0ec] ring-2 ring-[#934930]/20'
                      : 'border-[#d2c4bc] bg-white hover:bg-[#f6f3ec]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#934930]" />
                    <span className="font-serif font-bold text-sm text-[#322319]">Cash on Delivery</span>
                  </div>
                  <p className="text-[11px] text-[#80756e] mt-1">
                    ~40% of orders. Pay upon physical delivery at your doorstep.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('prepaid')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'prepaid'
                      ? 'border-[#934930] bg-[#fcf0ec] ring-2 ring-[#934930]/20'
                      : 'border-[#d2c4bc] bg-white hover:bg-[#f6f3ec]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#934930]" />
                    <span className="font-serif font-bold text-sm text-[#322319]">UPI &bull; Cards (Demo)</span>
                  </div>
                  <p className="text-[11px] text-[#80756e] mt-1">
                    Instant demo checkout with zero transaction fees.
                  </p>
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-bold text-sm transition-all shadow-md mt-4 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming Demo Order...' : `Complete Prototype Order (₹${finalTotal.toLocaleString('en-IN')})`}
            </button>
          </form>
        </div>

        {/* Right Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#322319]">Order Bag Summary</h3>

            <div className="divide-y divide-[#f6f3ec] max-h-80 overflow-y-auto space-y-2">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 pt-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover rounded-lg bg-[#f6f3ec]"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif font-bold text-[#322319] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[#80756e]">Size: {item.selectedSize} &bull; Qty: {item.quantity}</p>
                    <span className="font-serif font-semibold text-[#322319]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#ebe8e1] space-y-2 text-xs text-[#80756e]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#322319]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Domestic Shipping (4–6 Days)</span>
                {shippingCharge === 0 ? (
                  <span className="font-semibold text-emerald-700">FREE</span>
                ) : (
                  <span className="font-semibold text-[#322319]">₹{shippingCharge}</span>
                )}
              </div>
              {appliedDiscountRupees > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                  <span>ReWear Points Discount ({selectedRedemptionPoints} pts):</span>
                  <span>-₹{appliedDiscountRupees}</span>
                </div>
              )}
              <div className="border-t border-[#ebe8e1] pt-2 flex justify-between text-base font-bold text-[#322319]">
                <span>Total Due</span>
                <span className="font-serif text-[#934930]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Sourcing & Return Assurance */}
          <div className="p-4 bg-[#f6f3ec] rounded-2xl border border-[#ebe8e1] space-y-2 text-xs text-[#49382d]">
            <div className="flex items-center gap-1.5 font-bold text-[#322319]">
              <Truck className="w-4 h-4 text-[#934930]" />
              <span>4–6 Days Transit &bull; 10-Day Unworn Returns</span>
            </div>
            <p className="text-[11px] text-[#80756e]">
              Fabrics loomed directly by registered weaver cooperatives in Maharashtra &amp; Karnataka. Shipped with tamper-evident tags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
