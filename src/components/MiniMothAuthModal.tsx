import React, { useState } from 'react';
import { X, Phone, KeyRound, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api, SendOtpResponse, VerifyOtpResponse } from '../services/api';

export const MiniMothAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, setVerifiedSession, authStatus } = useAuth();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [troubleshooting, setTroubleshooting] = useState<string | null>(null);
  const [otpResponse, setOtpResponse] = useState<SendOtpResponse | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  if (!isAuthModalOpen) return null;

  const handleStartTimer = () => {
    setResendCountdown(30);
    const interval = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setTroubleshooting(null);

    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.sendOtp(cleanPhone);
      setLoading(false);

      if (res.success) {
        setOtpResponse(res);
        setStep('otp');
        handleStartTimer();
      } else {
        setErrorMsg(res.error || 'Failed to request OTP from MiniMoth.');
        if (res.troubleshooting) {
          setTroubleshooting(res.troubleshooting);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Network error communicating with the verification server.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMsg('Please enter the verification code sent to your phone.');
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
      const res: VerifyOtpResponse = await api.verifyOtp(cleanPhone, cleanOtp);
      setLoading(false);

      if (res.valid && res.success) {
        setVerifiedSession({
          phone: res.phone || cleanPhone,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          sessionId: res.sessionId,
          verifiedAt: res.verifiedAt || new Date().toISOString(),
          isSandbox: authStatus?.sandboxMode
        });
        setStep('success');
      } else {
        setErrorMsg(res.error || 'The code entered is invalid or expired.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Failed to verify OTP with MiniMoth.');
    }
  };

  const handleReset = () => {
    setStep('phone');
    setOtpCode('');
    setErrorMsg(null);
    setTroubleshooting(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fcf9f2] w-full max-w-md rounded-2xl shadow-2xl border border-[#d2c4bc] overflow-hidden">
        {/* Header */}
        <div className="bg-[#322319] text-[#fcf9f2] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#49382d] flex items-center justify-center text-[#fc9e7e]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">MiniMoth Phone Verification</h3>
              <p className="text-[11px] text-[#d2c4bc]">Fast, passwordless sign-in &amp; COD security</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-[#d2c4bc] hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MiniMoth Status / Sandbox Badge */}
        <div className="bg-[#f0eee7] border-b border-[#ebe8e1] px-6 py-2.5 text-xs text-[#49382d] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MiniMoth Service Active</span>
          </div>
          <a
            href="https://minimoth.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#934930] hover:underline font-semibold text-[11px]"
          >
            Documentation ↗
          </a>
        </div>

        {/* Content body */}
        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#322319] uppercase tracking-wider mb-1.5">
                  Mobile Number (India)
                </label>
                <div className="relative flex rounded-xl border border-[#d2c4bc] focus-within:border-[#934930] focus-within:ring-2 focus-within:ring-[#934930]/20 bg-white overflow-hidden transition-all">
                  <div className="px-3.5 py-3 bg-[#f6f3ec] border-r border-[#d2c4bc] text-sm font-semibold text-[#322319] flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-3 text-sm text-[#1c1c18] focus:outline-none placeholder:text-gray-400 font-medium"
                    autoFocus
                  />
                  <div className="flex items-center pr-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[#80756e]">
                  We will send a one-time verification code via the official MiniMoth OTP gateway.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{errorMsg}</p>
                    {troubleshooting && <p className="mt-1 text-[11px] text-red-600">{troubleshooting}</p>}
                  </div>
                </div>
              )}

              {/* Sandbox notice */}
              <div className="p-3 bg-[#f6f3ec] rounded-xl text-xs text-[#49382d] border border-[#ebe8e1] space-y-1">
                <p className="font-semibold text-[#322319] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#934930]" />
                  Competition Rule 3 Sandbox Ready
                </p>
                <p className="text-[11px] text-[#80756e]">
                  This prototype uses the real `@minimoth/sdk-node` client. Live keys deliver SMS/WhatsApp directly to your handset. In sandbox mode, OTP requests and verification flows are validated against the MiniMoth service.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Contacting MiniMoth...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#322319] uppercase tracking-wider">
                    Enter OTP Code
                  </label>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#934930] hover:underline cursor-pointer"
                  >
                    Change Number
                  </button>
                </div>
                <p className="text-xs text-[#80756e] mb-3">
                  Sent to <strong className="text-[#322319]">{phoneNumber}</strong>
                </p>

                <div className="relative flex rounded-xl border border-[#d2c4bc] focus-within:border-[#934930] focus-within:ring-2 focus-within:ring-[#934930]/20 bg-white overflow-hidden transition-all">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-center text-lg tracking-widest font-mono font-bold text-[#1c1c18] focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-[#80756e]">
                <span>Didn't receive the code?</span>
                {resendCountdown > 0 ? (
                  <span className="font-medium text-[#49382d]">Resend in {resendCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="font-semibold text-[#934930] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#934930] hover:bg-[#7e3e29] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with MiniMoth...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Continue</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#322319]">Phone Verified!</h4>
                <p className="text-xs text-[#80756e] mt-1">
                  Verified session created via MiniMoth for <strong className="text-[#322319]">{phoneNumber}</strong>
                </p>
              </div>

              <div className="p-3.5 bg-[#f6f3ec] rounded-xl text-left text-xs space-y-1.5 border border-[#ebe8e1]">
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Service:</span>
                  <span className="font-medium text-[#322319]">MiniMoth OTP &amp; Session</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#80756e]">Benefit:</span>
                  <span className="font-medium text-[#24280b]">1-Click Checkout &amp; Saved Addresses Unlocked</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#80756e]">COD Security:</span>
                  <span className="font-medium text-emerald-700">Protected against failed deliveries</span>
                </div>
              </div>

              <button
                onClick={closeAuthModal}
                className="w-full py-2.5 px-4 rounded-xl bg-[#322319] hover:bg-[#49382d] text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Proceed to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
