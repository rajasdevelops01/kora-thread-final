import React, { useEffect } from 'react';
import { X, AlertTriangle, Ruler, Info, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToKurtas?: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToKurtas,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-[#fcf9f2] w-full max-w-2xl rounded-2xl border border-[#ebe8e1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ebe8e1] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#f6f3ec] rounded-xl text-[#934930]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 id="size-guide-title" className="font-serif text-lg sm:text-xl font-bold text-[#322319]">
                Kurta Size Guide &amp; Garment Measurements
              </h2>
              <p className="text-xs text-[#80756e]">
                Applicable strictly to Kora Threads cotton kurtas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#80756e] hover:text-[#322319] hover:bg-[#f6f3ec] transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-[#322319]">
          {/* Explicit Label: Sample Measurements Requiring Confirmation (FAQ Q11) */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                Measurement Type: Garment Measurements (Sample measurements requiring confirmation)
              </p>
              <p className="text-[11px] leading-relaxed text-amber-800">
                The dimensions listed in this chart reflect <strong>garment measurements</strong> (measured flat across the sewn garment), not body measurements. Because this website is a case-study prototype, these represent sample measurements requiring final production confirmation.
              </p>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto rounded-xl border border-[#ebe8e1] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f6f3ec] text-[11px] uppercase tracking-wider text-[#80756e] border-b border-[#ebe8e1]">
                  <th className="py-2.5 px-3.5 font-bold">Size</th>
                  <th className="py-2.5 px-3.5 font-bold">Garment Chest (in / cm)</th>
                  <th className="py-2.5 px-3.5 font-bold">Shoulder (in / cm)</th>
                  <th className="py-2.5 px-3.5 font-bold">Length (in / cm)</th>
                  <th className="py-2.5 px-3.5 font-bold">Sleeve (in / cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee7] text-xs">
                <tr>
                  <td className="py-2.5 px-3.5 font-bold text-[#934930]">S (38)</td>
                  <td className="py-2.5 px-3.5">40&quot; (101 cm)</td>
                  <td className="py-2.5 px-3.5">17.5&quot; (44.5 cm)</td>
                  <td className="py-2.5 px-3.5">40&quot; (101 cm)</td>
                  <td className="py-2.5 px-3.5">24&quot; (61 cm)</td>
                </tr>
                <tr className="bg-[#fcf9f2]/50">
                  <td className="py-2.5 px-3.5 font-bold text-[#934930]">M (40)</td>
                  <td className="py-2.5 px-3.5">42&quot; (106 cm)</td>
                  <td className="py-2.5 px-3.5">18.0&quot; (45.7 cm)</td>
                  <td className="py-2.5 px-3.5">42&quot; (106 cm)</td>
                  <td className="py-2.5 px-3.5">24.5&quot; (62 cm)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-bold text-[#934930]">L (42)</td>
                  <td className="py-2.5 px-3.5">44&quot; (112 cm)</td>
                  <td className="py-2.5 px-3.5">18.5&quot; (47 cm)</td>
                  <td className="py-2.5 px-3.5">43&quot; (109 cm)</td>
                  <td className="py-2.5 px-3.5">25.0&quot; (63.5 cm)</td>
                </tr>
                <tr className="bg-[#fcf9f2]/50">
                  <td className="py-2.5 px-3.5 font-bold text-[#934930]">XL (44)</td>
                  <td className="py-2.5 px-3.5">46&quot; (117 cm)</td>
                  <td className="py-2.5 px-3.5">19.0&quot; (48.3 cm)</td>
                  <td className="py-2.5 px-3.5">44&quot; (112 cm)</td>
                  <td className="py-2.5 px-3.5">25.5&quot; (65 cm)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-bold text-[#934930]">XXL (46)</td>
                  <td className="py-2.5 px-3.5">48&quot; (122 cm)</td>
                  <td className="py-2.5 px-3.5">19.5&quot; (49.5 cm)</td>
                  <td className="py-2.5 px-3.5">44&quot; (112 cm)</td>
                  <td className="py-2.5 px-3.5">26.0&quot; (66 cm)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sizing Guidance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white rounded-xl border border-[#ebe8e1] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#322319]">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>How to Choose Your Size (Q10)</span>
              </div>
              <p className="text-[11px] text-[#80756e] leading-relaxed">
                Take a well-fitting kurta from your personal wardrobe, lay it flat on a table, and measure across the chest from armpit to armpit. Compare your garment measurement directly with the chart above before choosing.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#ebe8e1] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#322319]">
                <Info className="w-3.5 h-3.5 text-[#934930]" />
                <span>Between Two Sizes? (Q12)</span>
              </div>
              <p className="text-[11px] text-[#80756e] leading-relaxed">
                Compare the garment measurements with a kurta that fits you comfortably and check the fit description on the product page. If the correct fit cannot be established, do not invent a size recommendation.
              </p>
            </div>
          </div>

          {/* Category Scope Clarification (Q13) */}
          <div className="p-3.5 bg-[#f6f3ec] rounded-xl border border-[#ebe8e1] space-y-1">
            <span className="font-bold text-xs text-[#322319]">
              Product Category Applicability (Q13):
            </span>
            <p className="text-[11px] text-[#80756e] leading-relaxed">
              This size guide applies strictly to <strong>Cotton Kurtas</strong>. Cotton stoles are single-size / free-size handwoven lengths (approximately 2.0m x 0.7m), and home-linen products (bed runners, cushion covers) specify their exact item dimensions on their respective product pages.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ebe8e1] bg-white flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#80756e]">
            Returns accepted within 10 days for unworn garments.
          </span>
          <div className="flex items-center gap-2">
            {onNavigateToKurtas && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToKurtas();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#322319] text-white font-semibold text-xs hover:bg-[#49382d] transition-colors cursor-pointer"
              >
                Browse Kurtas
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#d2c4bc] text-[#322319] font-semibold text-xs hover:bg-[#f6f3ec] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
