import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout, onContinueShopping }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCharge,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f2] border-l border-[#d2c4bc] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#ebe8e1] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#934930]" />
              <h2 className="font-serif text-lg font-bold text-[#322319]">Your Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#f6f3ec] text-[#49382d] font-semibold">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-[#f0eee7] px-4 py-3 border-b border-[#ebe8e1] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-[#322319] font-medium">
                  Add <strong className="text-[#934930]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for <span className="text-emerald-700 font-bold">FREE Delivery</span>!
                </p>
                <div className="w-full bg-[#d2c4bc] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#934930] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <span>🎉</span>
                <span>You unlocked FREE Express Delivery (Orders &gt; ₹2,000)!</span>
              </p>
            )}
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f0eee7] flex items-center justify-center mx-auto text-[#80756e]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#322319]">Your bag is empty</h3>
                  <p className="text-xs text-[#80756e] mt-1 max-w-xs mx-auto">
                    Explore our pure handloom cotton kurtas, stoles, and artisanal home linen directly from Maharashtra &amp; Karnataka.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    onContinueShopping();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#ebe8e1] shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover rounded-lg bg-[#f6f3ec] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#322319] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#80756e] mt-0.5">
                        Size: <span className="font-semibold text-[#322319]">{item.selectedSize}</span> • {item.product.fabric}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[#d2c4bc] rounded-lg bg-[#fcf9f2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 hover:bg-[#ebe8e1] text-[#322319] rounded-l-lg transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#322319] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 hover:bg-[#ebe8e1] text-[#322319] rounded-r-lg transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#322319]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#ebe8e1] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#80756e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#322319]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Domestic Shipping</span>
                  {shippingCharge === 0 ? (
                    <span className="font-semibold text-emerald-700">FREE</span>
                  ) : (
                    <span className="font-semibold text-[#322319]">₹{shippingCharge}</span>
                  )}
                </div>
                <div className="border-t border-[#f0eee7] pt-2 flex justify-between text-sm font-bold text-[#322319]">
                  <span>Total (INR)</span>
                  <span className="font-serif text-base text-[#934930]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Fictional store prototype warning */}
              <div className="p-2.5 bg-[#fcf0ec] rounded-lg border border-[#fc9e7e]/40 flex items-center gap-2 text-[11px] text-[#934930]">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Prototype Demonstration • No real charges will be processed.</span>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
