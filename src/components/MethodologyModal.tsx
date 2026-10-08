import React from 'react';
import { X, CheckCircle2, ShieldCheck, Scale, FileText } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Transparency First
            </span>
            <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
              Methodology, Math & Assumptions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 pt-6 text-xs text-neutral-700 leading-relaxed">
          {/* Product Neutrality */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Product Neutrality Commitment</span>
            </div>
            <p>
              First Bricks does not sell loans, mutual funds, insurance policies, or credit cards. We do not accept affiliate kickbacks or pay-to-play vendor rankings. Every calculation runs client-side in your web browser.
            </p>
          </div>

          {/* Mathematical Assumptions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900">
              Core Mathematical Assumptions
            </h4>

            <div className="space-y-2.5">
              <div className="border border-neutral-200 rounded-lg p-3">
                <span className="font-bold text-neutral-900">1. Safe Withdrawal Rate (SWR): 3.5% – 4.0%</span>
                <p className="mt-1 text-neutral-600">
                  Grounded in the Trinity Study and historical rolling 30-to-40 year market drawdowns. An SWR of 4% implies a FIRE target equal to 25x annual spending; 3.33% implies 30x.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-3">
                <span className="font-bold text-neutral-900">2. Real vs. Nominal Investment Returns</span>
                <p className="mt-1 text-neutral-600">
                  In the FIRE Engine, projections utilize a <strong>real return rate</strong> (default 7% after subtracting expected inflation of 5-6% for INR or 2.5-3% for USD). Projections express future portfolio purchasing power in today's money.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-3">
                <span className="font-bold text-neutral-900">3. Purchase Opportunity Cost Model: 10% CAGR</span>
                <p className="mt-1 text-neutral-600">
                  When testing "Can I Afford This?", we model what the purchase principal would produce over 10 and 20 years in a broad market index fund compounded at 10% nominal annual return ($FV = P(1+r)^t$).
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-3">
                <span className="font-bold text-neutral-900">4. Debt vs. Invest Breakeven Heuristic</span>
                <p className="mt-1 text-neutral-600">
                  Eliminating debt at &gt;9.5% APR provides an absolute guaranteed return. Because equities carry sequence-of-returns risk and market volatility, high-cost debt must always be eradicated before aggressive investing.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-3">
                <span className="font-bold text-neutral-900">5. Cash Runway Standard</span>
                <p className="mt-1 text-neutral-600">
                  3 months is the absolute minimum buffer. 6 months is fortress-grade. Solopreneurs, single-income households, and commission-based earners are encouraged to target 9-12 months.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-500">
            <strong>Educational Disclaimer:</strong> First Bricks (firstbricks.in) is a decision-support and educational modeling simulator. Content does not constitute licensed legal, tax, or investment advisory. Consult a registered fee-only financial planner for fiduciary advice.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
