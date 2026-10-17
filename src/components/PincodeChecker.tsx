import React, { useState } from 'react';
import { Truck, Check, MapPin } from 'lucide-react';

export const PincodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    checked: boolean;
    valid: boolean;
    city?: string;
    timeline?: string;
    shippingText?: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (clean.length === 6 && /^\d+$/.test(clean)) {
      let estimatedCity = 'India Serviceable Hub';
      if (clean.startsWith('411')) estimatedCity = 'Pune (Local Dispatch)';
      else if (clean.startsWith('400')) estimatedCity = 'Mumbai & Konkan';
      else if (clean.startsWith('560')) estimatedCity = 'Bengaluru & Karnataka';
      else if (clean.startsWith('110')) estimatedCity = 'Delhi NCR';

      setResult({
        checked: true,
        valid: true,
        city: estimatedCity,
        timeline: clean.startsWith('411') ? '3–4 business days' : '4–6 business days',
        shippingText: 'Free shipping on orders above ₹2,000'
      });
    } else {
      setResult({
        checked: true,
        valid: false
      });
    }
  };

  return (
    <div className="bg-[#f6f3ec] p-4 rounded-xl border border-[#ebe8e1] space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#322319] uppercase tracking-wider">
        <Truck className="w-4 h-4 text-[#934930]" />
        <span>Check Delivery Speed to Your Pincode</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode (e.g. 411004)"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
            if (result) setResult(null);
          }}
          className="flex-1 px-3.5 py-2 text-xs bg-white rounded-lg border border-[#d2c4bc] focus:outline-none focus:ring-1 focus:ring-[#934930] font-medium"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#322319] hover:bg-[#49382d] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Check
        </button>
      </form>

      {result && result.checked && result.valid && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Delivery available to {result.city}</span>
          </div>
          <p className="text-[#322319]">
            Estimated dispatch transit: <strong>{result.timeline}</strong>
          </p>
          <p className="text-[11px] text-[#80756e]">
            {result.shippingText} • Cash on Delivery supported
          </p>
        </div>
      )}

      {result && result.checked && !result.valid && (
        <p className="text-xs text-red-600">Please enter a valid 6-digit Indian postal pincode.</p>
      )}

      {!result && (
        <p className="text-[11px] text-[#80756e]">
          Dispatched from Pune via insured surface courier. Free shipping on orders &gt; ₹2,000.
        </p>
      )}
    </div>
  );
};
