import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateDebtVsInvest } from '../utils/financeEngine';
import { DebtVsInvestInput } from '../types/finance';
import {
  ShieldCheck,
  TrendingUp,
  Scale,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Percent,
  HelpCircle,
  Zap,
} from 'lucide-react';

export const DebtVsInvestTool: React.FC = () => {
  const { userSnapshot, format, currency } = useCurrency();
  const isINR = currency === 'INR';

  // 100% STANDALONE STATE:
  // Initialized with saved profile defaults if present, but completely independent & variable!
  const defaultBalance = userSnapshot.totalDebt > 0 
    ? userSnapshot.totalDebt 
    : (isINR ? 450000 : 25000);

  const defaultRate = userSnapshot.debtInterestRate > 0 
    ? userSnapshot.debtInterestRate 
    : 11.5;

  const defaultMin = userSnapshot.monthlyDebtPayment > 0 
    ? userSnapshot.monthlyDebtPayment 
    : (isINR ? 14000 : 500);

  const defaultExtra = userSnapshot.monthlySavings > 0 
    ? Math.round(userSnapshot.monthlySavings * 0.7) 
    : (isINR ? 15000 : 600);

  const stepAmount = isINR ? 5000 : 100;

  const [input, setInput] = useState<DebtVsInvestInput>({
    debtBalance: defaultBalance,
    debtInterestRate: defaultRate,
    minMonthlyPayment: defaultMin,
    extraMonthlyCash: defaultExtra,
    expectedInvestReturn: isINR ? 12.0 : 10.0,
    timeHorizonYears: 5,
  });

  const result = useMemo(() => {
    return calculateDebtVsInvest(input);
  }, [input]);

  const handlePrefillFromProfile = () => {
    setInput({
      debtBalance: userSnapshot.totalDebt > 0 ? userSnapshot.totalDebt : defaultBalance,
      debtInterestRate: userSnapshot.debtInterestRate > 0 ? userSnapshot.debtInterestRate : 11.0,
      minMonthlyPayment: userSnapshot.monthlyDebtPayment > 0 ? userSnapshot.monthlyDebtPayment : defaultMin,
      extraMonthlyCash: userSnapshot.monthlySavings > 0 ? Math.round(userSnapshot.monthlySavings * 0.7) : defaultExtra,
      expectedInvestReturn: isINR ? 12.0 : 10.0,
      timeHorizonYears: 5,
    });
  };

  const handleResetDefaults = () => {
    setInput({
      debtBalance: isINR ? 450000 : 25000,
      debtInterestRate: 11.0,
      minMonthlyPayment: isINR ? 14000 : 500,
      extraMonthlyCash: isINR ? 15000 : 600,
      expectedInvestReturn: isINR ? 12.0 : 10.0,
      timeHorizonYears: 5,
    });
  };

  // Soothing verdict styling
  const verdictConfig = {
    pay_debt: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200/90',
      text: 'text-amber-950',
      badge: 'bg-amber-100 text-amber-900 border-amber-300/80',
      title: result.verdictTitle || 'Prioritize Debt Payoff First',
      tagline: result.verdictExplanation || `At ${input.debtInterestRate}% APR, paying off this debt gives an untouchable, guaranteed ${input.debtInterestRate}% risk-free return that beats uncertain market volatility.`,
    },
    invest: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200/90',
      text: 'text-emerald-950',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300/80',
      title: result.verdictTitle || 'Prioritize Long-Term Investing',
      tagline: result.verdictExplanation || `At ${input.debtInterestRate}% APR, your debt is low-cost. The ${input.expectedInvestReturn}% expected equity return compounds into substantially higher wealth over ${input.timeHorizonYears} years.`,
    },
    hybrid: {
      bg: 'bg-sky-50/80',
      border: 'border-sky-200/90',
      text: 'text-sky-950',
      badge: 'bg-sky-100 text-sky-900 border-sky-300/80',
      title: result.verdictTitle || 'Optimal Strategy: Balanced Split',
      tagline: result.verdictExplanation || `Your debt rate (${input.debtInterestRate}%) and investment expectation (${input.expectedInvestReturn}%) are very close. A blended approach captures guaranteed debt reduction while keeping compounding habits active.`,
    },
  }[result.recommendation];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Standalone Capital Allocation Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Independent Variables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Should I Pay Off Debt or Invest?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Compare the guaranteed, risk-free return of debt elimination against the compounding upside of long-term equity investing. Discover your exact mathematical breakeven point.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handlePrefillFromProfile}
            title="Autofill debt and savings from your saved profile"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Prefill Profile</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUTS (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Your Numbers & Rates</h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Standalone & Live
            </span>
          </div>

          <div className="space-y-5">
            {/* Debt Balance */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Remaining Debt Balance</label>
                <span className="text-xs font-extrabold tabular-nums text-slate-900">{format(input.debtBalance)}</span>
              </div>
              <input
                type="number"
                step={stepAmount}
                value={input.debtBalance}
                onChange={(e) => setInput({ ...input, debtBalance: Math.max(1, Number(e.target.value) || 0) })}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Debt Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Debt Interest Rate (APR)</label>
                <span className="text-xs font-extrabold tabular-nums text-amber-800">{input.debtInterestRate}%</span>
              </div>
              <input
                type="range"
                min={3}
                max={28}
                step={0.5}
                value={input.debtInterestRate}
                onChange={(e) => setInput({ ...input, debtInterestRate: Number(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>3% (Mortgage)</span>
                <span>9.5% (Cutoff)</span>
                <span>28% (Card)</span>
              </div>
            </div>

            {/* Min payment & Extra Surplus */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Minimum EMI
                </label>
                <input
                  type="number"
                  step={stepAmount}
                  value={input.minMonthlyPayment}
                  onChange={(e) =>
                    setInput({ ...input, minMonthlyPayment: Math.max(1, Number(e.target.value) || 0) })
                  }
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Extra Monthly Surplus
                </label>
                <input
                  type="number"
                  step={stepAmount}
                  value={input.extraMonthlyCash}
                  onChange={(e) =>
                    setInput({ ...input, extraMonthlyCash: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Investment Return */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Expected Investment Return</label>
                <span className="text-xs font-extrabold tabular-nums text-emerald-700">{input.expectedInvestReturn}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={16}
                step={0.5}
                value={input.expectedInvestReturn}
                onChange={(e) => setInput({ ...input, expectedInvestReturn: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>6% (Conservative)</span>
                <span>11-12% (Equity Index)</span>
                <span>16%</span>
              </div>
            </div>

            {/* Horizon */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Comparison Horizon (Years)
              </label>
              <div className="flex gap-2">
                {[3, 5, 7, 10].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setInput({ ...input, timeHorizonYears: yrs })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      input.timeHorizonYears === yrs
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {yrs} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DECISION VERDICT & COMPARISON (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Tranquil Verdict Card */}
          <div className={`${verdictConfig.bg} border ${verdictConfig.border} rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${verdictConfig.badge}`}>
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Decision Verdict
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-black ${verdictConfig.text}`}>
                    {verdictConfig.title}
                  </h3>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[11px] text-slate-500 font-medium">Mathematical Breakeven</span>
                <div className="text-base font-extrabold text-slate-900 tabular-nums">
                  {result.breakEvenReturn.toFixed(1)}% APR
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {verdictConfig.tagline}
            </p>

            {/* Breakeven Rule Highlight */}
            <div className="p-3.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-slate-700">
                  Debt payoff return is <strong className="text-slate-900">guaranteed and tax-free</strong>.
                </span>
              </div>
              <span className="font-bold tabular-nums text-slate-900">
                Split Ratio: {result.hybridSplitRatio}
              </span>
            </div>
          </div>

          {/* Side-by-side Outcome Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Path A: Pay Debt Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Guaranteed Debt Elimination
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tabular-nums">
                  +{format(result.guaranteedDebtSavings)}
                </div>
                <span className="text-xs text-slate-500">Guaranteed Interest Saved</span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Debt-Free in:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{result.timelineMonthsToDebtFree} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Risk Profile:</span>
                  <span className="font-semibold text-emerald-700">Zero Risk (100% Guaranteed)</span>
                </div>
              </div>
            </div>

            {/* Path B: Invest First Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Equity Compounding Path
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tabular-nums">
                  {format(result.projectedInvestWealth)}
                </div>
                <span className="text-xs text-slate-500">Projected Portfolio at Year {input.timeHorizonYears}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Wealth Advantage:</span>
                  <span className={`font-bold tabular-nums ${result.netBenefitSpread >= 0 ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {result.netBenefitSpread >= 0 ? `+${format(result.netBenefitSpread)}` : format(result.netBenefitSpread)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Risk Profile:</span>
                  <span className="font-semibold text-amber-700">Market Volatility Exposure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Psychological & Behavioral Matrix */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Behavioral & Risk Matrix</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900">Choose Debt First if:</div>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>Interest is higher than 9.5% (credit cards, personal loans)</li>
                  <li>Debt causes emotional stress or keeps you awake</li>
                  <li>You value peace of mind and fixed cash flow</li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900">Choose Investing if:</div>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>Debt rate is low & subsidized (under 8% home loan)</li>
                  <li>You are maximizing tax-advantaged accounts (EPF/401k match)</li>
                  <li>You have a 10+ year long-term investing horizon</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
