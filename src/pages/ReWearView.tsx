import React, { useState, useRef } from 'react';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shirt,
  Tag,
  Gift,
  Truck,
  MapPin,
  Upload,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Coins,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useReWear } from '../context/ReWearContext';
import { useAuth } from '../context/AuthContext';
import { ReWearCondition, ReWearGarmentType, ReWearReturnMethod, ReWearSubmission } from '../types';

interface ReWearViewProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenAuthModal: () => void;
}

export const ReWearView: React.FC<ReWearViewProps> = ({ onNavigate, onOpenAuthModal }) => {
  const {
    availablePoints,
    equivalentDiscountRupees,
    submissions,
    transactions,
    submitReturn,
    approveSubmissionDemo,
    resetDemoData,
  } = useReWear();

  const { isAuthenticated, session } = useAuth();

  // Scroll target refs
  const formRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState(session?.phone || '');
  const [garmentCount, setGarmentCount] = useState<number>(1);
  const [garmentType, setGarmentType] = useState<ReWearGarmentType>('kurta');
  const [conditions, setConditions] = useState<ReWearCondition[]>(['worn_out']);
  const [returnMethod, setReturnMethod] = useState<ReWearReturnMethod>('collection');
  const [photoUrls, setPhotoUrls] = useState<string[]>([
    '/assets/images/cotton_recycling_sorting_1792176540660.jpg'
  ]);
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<ReWearSubmission | null>(null);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Keep phone updated if user signs in
  React.useEffect(() => {
    if (session?.phone && !phone) {
      setPhone(session.phone);
    }
  }, [session, phone]);

  const handleConditionToggle = (condition: ReWearCondition) => {
    setConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handlePhotoUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Create local object URL for preview
      const previewUrl = URL.createObjectURL(files[0]);
      setPhotoUrls((prev) => [previewUrl, ...prev]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !agreedToRules) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const submission = submitReturn({
        customerName: customerName.trim(),
        phone: phone.trim(),
        garmentCount,
        garmentType,
        conditions: conditions.length > 0 ? conditions : ['worn_out'],
        photoUrls,
        returnMethod,
      });

      setIsSubmitting(false);
      setSubmittedItem(submission);
    }, 600);
  };

  const resetForm = () => {
    setCustomerName('');
    setGarmentCount(1);
    setGarmentType('kurta');
    setConditions(['worn_out']);
    setAgreedToRules(false);
    setSubmittedItem(null);
  };

  const rewearFaqs = [
    {
      q: 'What types of garments are eligible for Kora ReWear?',
      a: 'In this proposed initiative, we accept all pre-loved cotton kurtas, stoles, and natural-fiber clothing, regardless of whether they were originally bought from Kora Threads. Clothes can be faded, torn, or worn-out, as long as they are freshly laundered.'
    },
    {
      q: 'How are ReWear Points calculated and approved?',
      a: 'Each verified garment qualifies for 50 ReWear Points. Points are credited to your account only after our team reviews the garment details and confirms eligibility (typically within 48–72 hours in a live setup).'
    },
    {
      q: 'How do I redeem points for discounts?',
      a: 'Every 100 ReWear Points equals a ₹50 discount voucher. The minimum redemption threshold is 100 points. You can select and apply your approved points directly during checkout to reduce your order total.'
    },
    {
      q: 'Do ReWear Points expire?',
      a: 'In this demonstration ruleset, ReWear Points remain valid for 12 months from the date of approval. Points cannot be transferred or exchanged for cash.'
    },
    {
      q: 'Where do the collected clothes go?',
      a: 'Transparency Notice: As this website is a case-study prototype for the Get Cited hackathon, physical collection and recycling partnerships have not yet been established. In an operational deployment, sorted fibers are directed to regional textile shredding and circular insulation facilities in Maharashtra.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-[#322319] text-[#fcf9f2] relative overflow-hidden border-b border-[#49382d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#49382d] text-[#fc9e7e] text-xs font-semibold">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kora ReWear &bull; Wear Again, Reward Again</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Your Old Clothes Deserve a New Purpose.
            </h1>

            <p className="text-sm sm:text-lg text-[#d2c4bc] max-w-xl leading-relaxed">
              Return your worn-out clothes, earn ReWear Points, and unlock rewards on your next Kora Threads order.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 rounded-xl bg-[#fc9e7e] hover:bg-[#fc9e7e]/90 text-[#322319] font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Start a Return</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-[#80756e] font-semibold text-sm transition-all cursor-pointer"
              >
                How It Works
              </button>
            </div>

            {/* Fictional Disclosure Badge */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#d2c4bc]/80">
              <AlertCircle className="w-4 h-4 text-[#fc9e7e] shrink-0" />
              <span>Case-Study Circularity Prototype &bull; Get Cited Hackathon Demo</span>
            </div>
          </div>

          {/* Right Image: Authentic textile sorting & recycling */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#49382d] shadow-2xl aspect-4/3 bg-[#49382d]/30">
              <img
                src="/assets/images/cotton_recycling_sorting_1792176540660.jpg"
                alt="Artisanal textile workshop sorting folded worn cotton garments for recycling"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-[11px] text-white/90 font-medium">
                  Artisanal textile circularity: sorting used cotton for fiber repurposing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISUAL FLOW (Rule 5: Return Clothes → Earn Points → Redeem Discount → Shop Again) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#ebe8e1] p-5 sm:p-7 shadow-xs">
          <div className="text-center space-y-1 mb-6">
            <span className="text-[11px] uppercase tracking-widest text-[#934930] font-bold">
              The Circular Journey
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#322319]">
              How the Loop Closes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#934930]/10 text-[#934930] flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <p className="font-bold text-xs text-[#322319]">Return Clothes</p>
                <p className="text-[11px] text-[#80756e]">Send us your pre-loved garments</p>
              </div>
            </div>

            <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#24280b]/10 text-[#24280b] flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <p className="font-bold text-xs text-[#322319]">Earn Points</p>
                <p className="text-[11px] text-[#80756e]">Get 50 pts per eligible item</p>
              </div>
            </div>

            <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#934930]/10 text-[#934930] flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <p className="font-bold text-xs text-[#322319]">Redeem Discount</p>
                <p className="text-[11px] text-[#80756e]">100 pts = ₹50 off checkout</p>
              </div>
            </div>

            <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#24280b]/10 text-[#24280b] flex items-center justify-center font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <p className="font-bold text-xs text-[#322319]">Shop Again</p>
                <p className="text-[11px] text-[#80756e]">Enjoy handcrafted cotton kurtas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 Attractive Steps) & PROMINENT REWARDS CARD */}
      <section ref={howItWorksRef} className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#934930]">
            Simple &bull; Transparent &bull; Rewarding
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#322319]">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-[#80756e]">
            Follow four easy steps to give your garments a second life while earning savings on pure cotton handlooms.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#ebe8e1] shadow-xs hover:border-[#d2c4bc] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#f6f3ec] text-[#934930] flex items-center justify-center">
              <Shirt className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#934930]">STEP 01</div>
            <h3 className="font-serif text-lg font-bold text-[#322319]">1. Collect</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Gather your old, used or damaged clothes. Worn out, faded, or torn cotton garments are all welcome.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#ebe8e1] shadow-xs hover:border-[#d2c4bc] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#f6f3ec] text-[#934930] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#934930]">STEP 02</div>
            <h3 className="font-serif text-lg font-bold text-[#322319]">2. Submit</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Register the items you want to return through the ReWear form below. Upload photos and choose collection.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#ebe8e1] shadow-xs hover:border-[#d2c4bc] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#f6f3ec] text-[#24280b] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#24280b]">STEP 03</div>
            <h3 className="font-serif text-lg font-bold text-[#322319]">3. Get Verified</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Our team reviews the submission and confirms eligibility before awarding points.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#ebe8e1] shadow-xs hover:border-[#d2c4bc] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#f6f3ec] text-[#934930] flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#934930]">STEP 04</div>
            <h3 className="font-serif text-lg font-bold text-[#322319]">4. Earn Rewards</h3>
            <p className="text-xs text-[#80756e] leading-relaxed">
              Receive ReWear Points after approval and redeem them on your next eligible order.
            </p>
          </div>
        </div>

        {/* PROMINENT REWARDS CARD */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#f6f3ec] via-[#fcf9f2] to-[#f0eee7] rounded-3xl border border-[#d2c4bc] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#934930] text-xs font-bold border border-[#ebe8e1]">
                <Coins className="w-3.5 h-3.5" />
                <span>Proposed ReWear Points Conversion System</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#322319]">
                Turn Old Cotton into Real Savings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-[#ebe8e1] space-y-1">
                  <p className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
                    Garment Points Rate
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#322319]">
                    1 Eligible Garment = <span className="text-[#934930]">50 Points</span>
                  </p>
                  <p className="text-[11px] text-[#80756e]">
                    Kurtas, stoles, or cotton apparel
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ebe8e1] space-y-1">
                  <p className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
                    Redemption Rate
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#322319]">
                    100 Points = <span className="text-[#24280b]">₹50 Discount</span>
                  </p>
                  <p className="text-[11px] text-[#80756e]">
                    Minimum redemption: 100 points
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-[#80756e] italic pt-1">
                *Demo rules notice: Points are credited only after the return is reviewed and approved. Displayed as proposed demonstration rules for the hackathon prototype.
              </p>
            </div>

            {/* Quick Balance Preview Card */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#d2c4bc] shadow-sm space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#80756e] uppercase">Your Points</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  Demo Balance
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl font-bold text-[#322319]">
                  {availablePoints}
                </span>
                <span className="text-xs text-[#80756e] ml-2">ReWear Points</span>
              </div>
              <p className="text-xs text-[#24280b] font-medium">
                Worth <strong>₹{equivalentDiscountRupees} off</strong> your next eligible purchase!
              </p>
              <button
                onClick={() => onNavigate('catalog', 'kurtas')}
                className="w-full py-2.5 bg-[#322319] hover:bg-[#49382d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Shop Handloom Kurtas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MY REWEAR REWARDS DASHBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-[#ebe8e1] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              My ReWear Rewards Dashboard
            </h2>
            <p className="text-xs text-[#80756e]">
              Monitor your available points, pending submissions, and redemption history.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-300">
              Interactive Demo State
            </span>
            <button
              onClick={resetDemoData}
              title="Reset points and submissions to default prototype values"
              className="p-1.5 rounded-xl hover:bg-[#f0eee7] text-[#80756e] transition-colors cursor-pointer flex items-center gap-1 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Metric summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-1">
            <span className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
              Available Points
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#934930]">
              {availablePoints}
            </p>
            <p className="text-[11px] text-[#80756e]">Ready to redeem</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-1">
            <span className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
              Discount Value
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#24280b]">
              ₹{equivalentDiscountRupees}
            </p>
            <p className="text-[11px] text-[#80756e]">At ₹50 / 100 pts</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-1">
            <span className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
              Submissions
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              {submissions.length}
            </p>
            <p className="text-[11px] text-[#80756e]">
              {submissions.filter((s) => s.status === 'pending').length} pending review
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ebe8e1] shadow-xs space-y-1">
            <span className="text-[11px] text-[#80756e] uppercase tracking-wider font-semibold">
              Total Redeemed
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#80756e]">
              {transactions.filter((t) => t.type === 'redeemed').reduce((sum, t) => sum + t.points, 0)}
            </p>
            <p className="text-[11px] text-[#80756e]">Previous savings</p>
          </div>
        </div>

        {/* Submissions & Transaction List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Submissions */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ebe8e1] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#f0eee7] pb-3">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#322319]">
                Garment Submissions Status
              </h3>
              <span className="text-[11px] text-[#80756e] font-mono">
                {submissions.length} Recorded
              </span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#322319]">
                          {sub.garmentCount} {sub.garmentType.toUpperCase()} ({sub.conditions.join(', ')})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            sub.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#80756e] mt-0.5">
                        Submitted: {new Date(sub.createdAt).toLocaleDateString('en-IN')} &bull; ID: {sub.id}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs text-[#934930]">
                        +{sub.approvedPoints ?? sub.estimatedPoints} pts
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#80756e] italic">
                    {sub.notes}
                  </p>

                  {/* Demo helper to simulate staff approval */}
                  {sub.status === 'pending' && (
                    <div className="pt-1 flex items-center justify-between text-[11px] border-t border-[#ebe8e1]">
                      <span className="text-amber-800 font-medium">Pending team inspection</span>
                      <button
                        onClick={() => approveSubmissionDemo(sub.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                        title="Simulate staff approving this return and crediting points"
                      >
                        ✓ Simulate Staff Approval (+{sub.estimatedPoints} pts)
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reward Redemption History */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ebe8e1] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#f0eee7] pb-3">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#322319]">
                Points Activity Log
              </h3>
              <button
                onClick={() => onNavigate('checkout')}
                className="text-xs font-semibold text-[#934930] hover:underline"
              >
                Redeem at Checkout &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {transactions.length === 0 ? (
                <p className="text-xs text-[#80756e] py-4 text-center">No transactions recorded yet.</p>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 bg-[#fcf9f2] rounded-xl border border-[#ebe8e1] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-medium text-[#322319] leading-snug">{tx.description}</p>
                      <p className="text-[10px] text-[#80756e] mt-0.5">
                        {new Date(tx.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <span
                      className={`font-bold font-mono shrink-0 ${
                        tx.type === 'earned' ? 'text-emerald-700' : 'text-[#934930]'
                      }`}
                    >
                      {tx.type === 'earned' ? `+${tx.points}` : `-${tx.points}`} pts
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-2.5 bg-[#934930] hover:bg-[#7e3e29] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Redeem Points on Next Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RETURN SUBMISSION FORM */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-[#ebe8e1] shadow-lg p-6 sm:p-10 space-y-6">
          <div className="border-b border-[#ebe8e1] pb-5 space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ec] text-[#934930] text-xs font-bold">
              <Shirt className="w-3.5 h-3.5" />
              <span>Garment Registration</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
              ReWear Return Submission Form
            </h2>
            <p className="text-xs sm:text-sm text-[#80756e]">
              Register your pre-loved cotton garments. Our Pune inspection team will review your submission and award ReWear Points.
            </p>
          </div>

          {/* If already submitted, show confirmation screen */}
          {submittedItem ? (
            <div className="p-6 bg-[#fcf9f2] rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Submission Received
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#322319]">
                  Thank You, {submittedItem.customerName}!
                </h3>
                <p className="text-xs text-[#80756e] max-w-md mx-auto">
                  Your return request for <strong>{submittedItem.garmentCount} {submittedItem.garmentType}(s)</strong> has been recorded in the prototype demo system.
                </p>
              </div>

              {/* Status details */}
              <div className="bg-white p-4 rounded-xl border border-[#ebe8e1] max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Tracking ID:</span>
                  <span className="font-mono font-bold text-[#322319]">{submittedItem.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Estimated Points:</span>
                  <span className="font-bold text-[#934930]">+{submittedItem.estimatedPoints} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Status:</span>
                  <span className="font-bold text-amber-700 uppercase">{submittedItem.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Return Method:</span>
                  <span className="capitalize">{submittedItem.returnMethod.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Prototype Disclosure Note (Rule 2 requirement) */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 max-w-lg mx-auto text-[11px] text-amber-900 leading-relaxed text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Prototype Demonstration Notice:</strong> This return submission is stored locally in your browser session for testing. In this hackathon demonstration prototype, physical logistics and pickup operations are simulated.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-white border border-[#d2c4bc] hover:bg-[#f6f3ec] text-[#322319] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Garment
                </button>
                <button
                  onClick={() => onNavigate('catalog', 'kurtas')}
                  className="px-4 py-2 bg-[#322319] hover:bg-[#49382d] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Explore New Collections
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-[#322319]">
              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#322319]">
                    Customer Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c4bc] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#934930]/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#322319]">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    {isAuthenticated ? (
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        MiniMoth Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenAuthModal}
                        className="text-[10px] text-[#934930] hover:underline font-semibold cursor-pointer"
                      >
                        Verify with MiniMoth OTP
                      </button>
                    )}
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+919876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c4bc] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#934930]/30"
                  />
                </div>
              </div>

              {/* Number of Garments & Garment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#322319]">
                    Number of Garments to Return <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={garmentCount}
                      onChange={(e) => setGarmentCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-24 px-3.5 py-2.5 rounded-xl border border-[#d2c4bc] bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#934930]/30"
                    />
                    <span className="text-[11px] text-[#80756e]">
                      = <strong>{garmentCount * 50} ReWear Points</strong> upon approval
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#322319]">
                    Garment Type <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'kurta', label: 'Kurta' },
                      { id: 'stole', label: 'Stole' },
                      { id: 'other', label: 'Other' },
                    ].map((gt) => (
                      <button
                        key={gt.id}
                        type="button"
                        onClick={() => setGarmentType(gt.id as ReWearGarmentType)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          garmentType === gt.id
                            ? 'bg-[#322319] text-white border-[#322319]'
                            : 'bg-white hover:bg-[#f6f3ec] text-[#322319] border-[#d2c4bc]'
                        }`}
                      >
                        {gt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Garment Condition (Multi-select) */}
              <div className="space-y-2">
                <label className="font-bold text-[#322319]">
                  Garment Condition (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'worn_out', label: 'Worn Out' },
                    { id: 'torn', label: 'Torn / Ripped' },
                    { id: 'faded', label: 'Faded Color' },
                    { id: 'damaged', label: 'Damaged Weave' },
                  ].map((c) => {
                    const isSelected = conditions.includes(c.id as ReWearCondition);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleConditionToggle(c.id as ReWearCondition)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-[#934930] text-white border-[#934930]'
                            : 'bg-white text-[#322319] border-[#d2c4bc] hover:bg-[#f6f3ec]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#80756e]">
                  Please ensure all submitted clothes are washed and dry before return.
                </p>
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2">
                <label className="font-bold text-[#322319]">
                  Upload Clothing Photos <span className="text-red-600">*</span>
                </label>
                <div className="p-4 bg-[#fcf9f2] rounded-2xl border-2 border-dashed border-[#d2c4bc] flex flex-col items-center justify-center text-center space-y-2">
                  <Upload className="w-6 h-6 text-[#934930]" />
                  <div>
                    <span className="text-xs font-semibold text-[#322319]">
                      Attach photos of your garments
                    </span>
                    <p className="text-[11px] text-[#80756e]">
                      PNG, JPG or WEBP (Max 5MB)
                    </p>
                  </div>
                  <label className="px-3.5 py-1.5 bg-white border border-[#d2c4bc] rounded-xl text-xs font-bold text-[#322319] hover:bg-[#f6f3ec] transition-colors cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUploadMock}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Previews */}
                {photoUrls.length > 0 && (
                  <div className="flex gap-2 pt-1 overflow-x-auto">
                    {photoUrls.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#ebe8e1] shrink-0">
                        <img src={url} alt="Uploaded preview" className="w-full h-full object-cover" />
                        <span className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 text-[9px]">
                          ✓
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preferred Return Method */}
              <div className="space-y-2">
                <label className="font-bold text-[#322319]">
                  Preferred Return Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setReturnMethod('collection')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      returnMethod === 'collection'
                        ? 'border-[#934930] bg-[#fcf0ec] ring-1 ring-[#934930]'
                        : 'border-[#ebe8e1] bg-white hover:bg-[#fcf9f2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#322319]">
                      <Truck className="w-4 h-4 text-[#934930]" />
                      <span>Home Collection</span>
                    </div>
                    <p className="text-[11px] text-[#80756e] mt-1">
                      Courier doorstep pickup (Serviceable Indian pincodes only).
                    </p>
                  </div>

                  <div
                    onClick={() => setReturnMethod('drop_off')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      returnMethod === 'drop_off'
                        ? 'border-[#934930] bg-[#fcf0ec] ring-1 ring-[#934930]'
                        : 'border-[#ebe8e1] bg-white hover:bg-[#fcf9f2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#322319]">
                      <MapPin className="w-4 h-4 text-[#934930]" />
                      <span>Drop-off at Partner Point</span>
                    </div>
                    <p className="text-[11px] text-[#80756e] mt-1">
                      Designated drop-off hubs (Pune region only in prototype).
                    </p>
                  </div>
                </div>
              </div>

              {/* Program Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToRules}
                    onChange={(e) => setAgreedToRules(e.target.checked)}
                    className="mt-0.5 rounded border-[#d2c4bc] text-[#934930] focus:ring-[#934930]"
                  />
                  <span className="text-[11px] text-[#80756e] leading-relaxed">
                    I confirm that I own these garments, they are clean and laundered, and I agree to the Kora ReWear demonstration guidelines. I acknowledge this is a case-study prototype.
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToRules}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    agreedToRules && !isSubmitting
                      ? 'bg-[#322319] hover:bg-[#49382d] text-white shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Registering Return...' : `Submit Return & Request ${garmentCount * 50} ReWear Points`}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 6. REWEAR FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#934930] font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#322319]">
            Questions About Kora ReWear
          </h2>
        </div>

        <div className="space-y-3">
          {rewearFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ebe8e1] overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fcf9f2] transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#322319]">
                    {faq.q}
                  </span>
                  <span className="text-[#80756e] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#934930]" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 border-t border-[#f6f3ec] text-xs text-[#49382d] leading-relaxed pt-3 animate-in fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
