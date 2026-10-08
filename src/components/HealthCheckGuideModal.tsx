import React from 'react';
import { X, CheckCircle2, Lock, Sparkles, ArrowRight, Wallet, ShieldCheck, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface HealthCheckGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFresh: () => void;
  onLoadPreset: (presetKey: 'starter' | 'family' | 'fire') => void;
}

export const HealthCheckGuideModal: React.FC<HealthCheckGuideModalProps> = ({
  isOpen,
  onClose,
  onStartFresh,
  onLoadPreset,
}) => {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-neutral-200 shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              <span>Quick 30-Second Primer</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Before You Start Your Health Check
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Takes ~2 minutes. Here is what to expect:
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close guide popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Preparation Steps */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-neutral-900">Have 4 Rough Numbers in Mind</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Monthly take-home income, monthly living expenses, current cash in bank, and total debt (approximate estimates work great!).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-neutral-900">100% In-Browser & Private</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Zero data is sent to any server or database. No account required. Your numbers remain strictly in your browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-neutral-900">What You'll Receive</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Your <strong>Foundation Score (0-100)</strong>, cash runway in months, and your <strong>Top 3 Recommended Next Steps</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-neutral-100">
          <button
            onClick={onStartFresh}
            className="w-full py-3 px-4 text-xs font-bold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <span>Let's Start (Enter My Numbers)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <span className="text-[11px] text-neutral-500">Don't have numbers handy? Test with a sample profile:</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onLoadPreset('starter')}
              className="py-2 px-2 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer text-center"
            >
              🎓 Starter (24)
            </button>
            <button
              onClick={() => onLoadPreset('family')}
              className="py-2 px-2 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer text-center"
            >
              🏡 Family (34)
            </button>
            <button
              onClick={() => onLoadPreset('fire')}
              className="py-2 px-2 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer text-center"
            >
              🚀 FIRE (30)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
