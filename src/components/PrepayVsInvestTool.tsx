import React, { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculatePrepayVsInvest } from '../utils/financeEngine';
import { PrepayVsInvestInput } from '../types/finance';
import {
  getNumericParam,
  getBooleanParam,
  updateUrlQuery,
  copyShareLink,
} from '../utils/urlState';
import {
  Scale,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Share2,
  Printer,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Percent,
  Home,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const PrepayVsInvestTool: React.FC = () => {
  const { userSnapshot, format, currency } = useCurrency();
  const isINR = currency === 'INR';

  // Standalone defaults or profile prefill
  const defaultLoan = userSnapshot.totalDebt > 200000
    ? userSnapshot.totalDebt
    : (isINR ? 5000000 : 350000);

  const defaultRate = userSnapshot.debtInterestRate > 0
    ? userSnapshot.debtInterestRate
    : (isINR ? 8.5 : 6.5);

  const defaultExtra = userSnapshot.monthlySavings > 0
    ? Math.round(userSnapshot.monthlySavings * 0.5)
    : (isINR ? 15000 : 500);

  // Initialize from URL search parameters if available, else sensible defaults
  const [loanOutstanding, setLoanOutstanding] = useState<number>(() =>
    getNumericParam('loan', defaultLoan)
  );
  const [loanInterestRate, setLoanInterestRate] = useState<number>(() =>
    getNumericParam('rate', defaultRate)
  );
  const [remainingTenureYears, setRemainingTenureYears] = useState<number>(() =>
    getNumericParam('tenure', 20)
  );
  const [monthlyExtraCash, setMonthlyExtraCash] = useState<number>(() =>
    getNumericParam('extra', defaultExtra)
  );
  const [annualStepUpPct, setAnnualStepUpPct] = useState<number>(() =>
    getNumericParam('stepup', 5)
  );
  const [expectedInvestReturn, setExpectedInvestReturn] = useState<number>(() =>
    getNumericParam('return', isINR ? 12.0 : 10.0)
  );
  const [includeTaxBenefit, setIncludeTaxBenefit] = useState<boolean>(() =>
    getBooleanParam('tax', isINR)
  );
  const [taxBracketPct, setTaxBracketPct] = useState<number>(() =>
    getNumericParam('slab', 30)
  );

  const [copiedToast, setCopiedToast] = useState(false);
  const [showAmortizationTable, setShowAmortizationTable] = useState(false);

  // Sync state to URL search parameters for bookmarking & easy sharing
  useEffect(() => {
    updateUrlQuery({
      loan: loanOutstanding,
      rate: loanInterestRate,
      tenure: remainingTenureYears,
      extra: monthlyExtraCash,
      stepup: annualStepUpPct,
      return: expectedInvestReturn,
      tax: includeTaxBenefit ? 1 : 0,
      slab: taxBracketPct,
    });
  }, [
    loanOutstanding,
    loanInterestRate,
    remainingTenureYears,
    monthlyExtraCash,
    annualStepUpPct,
    expectedInvestReturn,
    includeTaxBenefit,
    taxBracketPct,
  ]);

  const input: PrepayVsInvestInput = useMemo(
    () => ({
      loanOutstanding,
      loanInterestRate,
      remainingTenureYears,
      monthlyExtraCash,
      annualStepUpPct,
      expectedInvestReturn,
      includeTaxBenefit,
      taxBracketPct,
    }),
    [
      loanOutstanding,
      loanInterestRate,
      remainingTenureYears,
      monthlyExtraCash,
      annualStepUpPct,
      expectedInvestReturn,
      includeTaxBenefit,
      taxBracketPct,
    ]
  );

  const result = useMemo(() => {
    return calculatePrepayVsInvest(input);
  }, [input]);

  // Quick Preset Chips
  const loanChips = isINR
    ? [
        { label: '₹30L', val: 3000000 },
        { label: '₹50L', val: 5000000 },
        { label: '₹75L', val: 7500000 },
        { label: '₹1 Crore', val: 10000000 },
      ]
    : [
        { label: '$200k', val: 200000 },
        { label: '$350k', val: 350000 },
        { label: '$500k', val: 500000 },
        { label: '$750k', val: 750000 },
      ];

  const extraChips = isINR
    ? [
        { label: '₹5k', val: 5000 },
        { label: '₹10k', val: 10000 },
        { label: '₹15k', val: 15000 },
        { label: '₹25k', val: 25000 },
        { label: '₹50k', val: 50000 },
      ]
    : [
        { label: '$200', val: 200 },
        { label: '$500', val: 500 },
        { label: '$1,000', val: 1000 },
        { label: '$1,500', val: 1500 },
      ];

  const handleShare = async () => {
    await copyShareLink({
      loan: loanOutstanding,
      rate: loanInterestRate,
      tenure: remainingTenureYears,
      extra: monthlyExtraCash,
      stepup: annualStepUpPct,
      return: expectedInvestReturn,
      tax: includeTaxBenefit ? 1 : 0,
      slab: taxBracketPct,
    });
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setLoanOutstanding(isINR ? 5000000 : 350000);
    setLoanInterestRate(isINR ? 8.5 : 6.5);
    setRemainingTenureYears(20);
    setMonthlyExtraCash(isINR ? 15000 : 500);
    setAnnualStepUpPct(5);
    setExpectedInvestReturn(isINR ? 12.0 : 10.0);
    setIncludeTaxBenefit(isINR);
    setTaxBracketPct(30);
  };

  const handlePrefillProfile = () => {
    if (userSnapshot.totalDebt > 0) setLoanOutstanding(userSnapshot.totalDebt);
    if (userSnapshot.debtInterestRate > 0) setLoanInterestRate(userSnapshot.debtInterestRate);
    if (userSnapshot.monthlySavings > 0) {
      setMonthlyExtraCash(Math.round(userSnapshot.monthlySavings * 0.5));
    }
  };

  const yearsSavedInPrepay = Math.max(
    0,
    remainingTenureYears - result.pathAYearsToDebtFree
  ).toFixed(1);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Printable Report Header (Active solely during print export) */}
      <div className="hidden print-only mb-6 border-b border-neutral-300 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <h1 className="text-xl font-bold text-neutral-900">FIRST BRICKS DECISION ENGINE</h1>
              <p className="text-xs text-neutral-500">
                Prepay Home Loan vs. Invest in SIP: Side-by-Side Visual Showdown Report
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-neutral-400">
            <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            <p>URL: firstbricks.in/prepay-vs-invest/</p>
          </div>
        </div>
      </div>

      {/* Hero Header & Action Toolbar */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-800 text-xs font-semibold mb-3">
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>Flagship Decision Engine</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-normal">Side-by-Side Visual Showdown</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Prepay Home Loan vs. Invest in SIP
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-3xl leading-relaxed">
              Should you put extra cash toward extinguishing your home loan early, or invest that surplus in an equity SIP?
              This model computes the fair, 360° math—accounting for interest savings, long-term compounding, and redirecting your full freed-up EMI into wealth creation after becoming debt-free.
            </p>
          </div>

          {/* Action Toolbar: Share Link & Printable 1-Page PDF */}
          <div className="flex flex-wrap items-center gap-2.5 no-print">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 transition-colors shadow-sm"
              title="Copy shareable link with current numbers"
            >
              {copiedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-neutral-600" />
                  <span>Share Calculation</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white transition-colors shadow-sm"
              title="Export 1-Page Printable Summary / PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF Export</span>
            </button>
          </div>
        </div>

        {/* Share Toast Banner if clicked */}
        {copiedToast && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 no-print animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Shareable link copied to clipboard!</strong> Anyone opening this URL will see your exact inputs and comparison results.
              </span>
            </div>
            <button
              onClick={() => setCopiedToast(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Main Interactive Grid: Left Controls, Right Showdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-indigo-600" />
                <span>Your Scenario Parameters</span>
              </h2>
              <div className="flex items-center gap-2 no-print">
                {userSnapshot.totalDebt > 0 && (
                  <button
                    onClick={handlePrefillProfile}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    title="Load from Saved Profile"
                  >
                    Load Profile
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="text-xs text-neutral-400 hover:text-neutral-700 flex items-center gap-1"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Input 1: Loan Outstanding */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-neutral-700">
                  Current Loan Outstanding
                </label>
                <span className="text-sm font-bold text-neutral-900 font-mono">
                  {format(loanOutstanding, false)}
                </span>
              </div>
              <input
                type="range"
                min={isINR ? 500000 : 50000}
                max={isINR ? 25000000 : 1500000}
                step={isINR ? 100000 : 10000}
                value={loanOutstanding}
                onChange={(e) => setLoanOutstanding(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 pt-1 no-print">
                {loanChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setLoanOutstanding(chip.val)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                      loanOutstanding === chip.val
                        ? 'bg-indigo-600 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Loan Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-neutral-700">
                  Home Loan Interest Rate
                </label>
                <span className="text-sm font-bold text-neutral-900 font-mono">
                  {loanInterestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min={4.0}
                max={14.0}
                step={0.1}
                value={loanInterestRate}
                onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>4.0%</span>
                <span>Base EMI: {format(result.baseEmi)}/mo</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Input 3: Remaining Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-neutral-700">
                  Remaining Loan Tenure
                </label>
                <span className="text-sm font-bold text-neutral-900 font-mono">
                  {remainingTenureYears} Years ({remainingTenureYears * 12} mos)
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={remainingTenureYears}
                onChange={(e) => setRemainingTenureYears(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>3 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Input 4: Extra Cash Available Per Month */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Extra Cash Available / Month</span>
                </label>
                <span className="text-sm font-bold text-indigo-700 font-mono">
                  {format(monthlyExtraCash)}/mo
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Surplus cash you can either allocate to loan prepayment or invest into an equity SIP.
              </p>
              <input
                type="range"
                min={isINR ? 1000 : 50}
                max={isINR ? 150000 : 5000}
                step={isINR ? 1000 : 50}
                value={monthlyExtraCash}
                onChange={(e) => setMonthlyExtraCash(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 pt-1 no-print">
                {extraChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setMonthlyExtraCash(chip.val)}
                    className={`px-2 py-0.5 text-xs rounded-lg font-medium transition-colors ${
                      monthlyExtraCash === chip.val
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 5: Annual Step-Up in Extra Cash */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-neutral-700">
                  Annual Step-Up on Extra Cash
                </label>
                <span className="text-sm font-bold text-neutral-900 font-mono">
                  +{annualStepUpPct}% / year
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={1}
                value={annualStepUpPct}
                onChange={(e) => setAnnualStepUpPct(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-neutral-400">
                Models increasing your extra cash alongside annual salary increments.
              </p>
            </div>

            {/* Input 6: Expected Investment Return (CAGR) */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Expected Equity SIP Return (CAGR)</span>
                </label>
                <span className="text-sm font-bold text-emerald-700 font-mono">
                  {expectedInvestReturn.toFixed(1)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={6.0}
                max={18.0}
                step={0.5}
                value={expectedInvestReturn}
                onChange={(e) => setExpectedInvestReturn(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>6% (Conservative)</span>
                <span>12% (Nifty 50 Index)</span>
                <span>18% (Aggressive)</span>
              </div>
            </div>

            {/* Input 7: Tax Consideration Toggle */}
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeTaxBenefit}
                  onChange={(e) => setIncludeTaxBenefit(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="text-xs font-semibold text-neutral-800">
                  Include Home Loan Tax Deduction (Sec 24b)
                </span>
              </label>

              {includeTaxBenefit && (
                <div className="space-y-2 pl-6 pt-1 border-t border-neutral-200/60 text-xs">
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Your Marginal Tax Bracket:</span>
                    <select
                      value={taxBracketPct}
                      onChange={(e) => setTaxBracketPct(Number(e.target.value))}
                      className="text-xs font-semibold bg-white border border-neutral-200 rounded px-2 py-1"
                    >
                      <option value={20}>20% Tax Slab</option>
                      <option value={30}>30% Tax Slab</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    Tax deduction saves up to ₹60,000/yr on interest, dropping your effective borrowing cost to{' '}
                    <strong className="text-neutral-900 font-mono">{result.effectiveLoanRate}%</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showdown & Mathematical Verdict (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Visual Showdown Cards (Side-by-Side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Path A (Prepay Aggressively) */}
            <div className="bg-white rounded-2xl border-2 border-indigo-200/90 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-70" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Path A: Prepay Loan</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  Aggressive Prepayment
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-snug">
                  Pay {format(result.baseEmi + monthlyExtraCash)}/mo. Once mortgage is finished, redirect total freed-up cash into equity SIP.
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Mortgage Cleared In</div>
                    <div className="text-xl font-bold text-indigo-700 font-mono mt-0.5">
                      {result.pathAYearsToDebtFree} Years
                      <span className="text-xs font-normal text-indigo-500 ml-1.5">
                        ({yearsSavedInPrepay} yrs earlier!)
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Total Interest Saved</div>
                    <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
                      +{format(result.pathAInterestSaved)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Post-Debt SIP Redirect</div>
                    <div className="text-xs font-medium text-neutral-700 mt-0.5">
                      Invests {format(result.pathAPostDebtMonthlySip)}/mo from Year {result.pathAYearsToDebtFree} to {remainingTenureYears}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-indigo-100 bg-indigo-50/50 -mx-5 -mb-5 p-5">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase">
                  Final Portfolio at Year {remainingTenureYears}
                </div>
                <div className="text-xl font-bold text-neutral-900 font-mono mt-0.5">
                  {format(result.pathAFinalInvestPortfolio, false)}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Guaranteed peace of mind + zero debt anxiety
                </div>
              </div>
            </div>

            {/* Card 2: Path B (Regular EMI + Invest Extra in SIP) */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200/90 p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-70" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Path B: Invest in SIP</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  Compounding Portfolio
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-snug">
                  Pay base EMI {format(result.baseEmi)}/mo for 20 yrs. Invest {format(monthlyExtraCash)}/mo uninterrupted into equity mutual funds.
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Loan Duration</div>
                    <div className="text-xl font-bold text-neutral-800 font-mono mt-0.5">
                      {remainingTenureYears} Years
                      <span className="text-xs font-normal text-neutral-400 ml-1.5">(Standard tenure)</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Total Interest Paid</div>
                    <div className="text-base font-bold text-amber-800 font-mono mt-0.5">
                      {format(result.pathBTotalInterestPaid)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Total SIP Principal Invested</div>
                    <div className="text-xs font-medium text-neutral-700 mt-0.5">
                      {format(result.pathBTotalInvestedPrincipal)} invested across {remainingTenureYears} years
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-100 bg-emerald-50/50 -mx-5 -mb-5 p-5">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase">
                  Final Portfolio at Year {remainingTenureYears}
                </div>
                <div className="text-xl font-bold text-emerald-800 font-mono mt-0.5">
                  {format(result.pathBFinalInvestPortfolio, false)}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  High liquidity + inflation-beating equity upside
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Verdict Banner */}
          <div
            className={`rounded-2xl p-6 border ${
              result.winner === 'invest'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : result.winner === 'prepay'
                ? 'bg-indigo-50/90 border-indigo-200 text-indigo-950'
                : 'bg-neutral-100 border-neutral-200 text-neutral-900'
            } shadow-sm`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2.5 rounded-xl ${
                  result.winner === 'invest'
                    ? 'bg-emerald-600 text-white'
                    : result.winner === 'prepay'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-neutral-800 text-white'
                } flex-shrink-0 mt-0.5`}
              >
                <Scale className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold">
                    {result.winner === 'invest' && (
                      <span>Investing in SIP Leads by {format(Math.abs(result.netWealthDifference))}</span>
                    )}
                    {result.winner === 'prepay' && (
                      <span>Prepaying Saves Guaranteed Wealth by {format(Math.abs(result.netWealthDifference))}</span>
                    )}
                    {result.winner === 'balanced' && (
                      <span>Virtually Tied (Within {format(Math.abs(result.netWealthDifference))})</span>
                    )}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 border border-current font-mono">
                    Margin: {result.winnerMarginPercent}%
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {result.winner === 'invest' ? (
                    <>
                      By compounding extra cash uninterrupted for {remainingTenureYears} years at {expectedInvestReturn}% CAGR,{' '}
                      <strong>Path B produces a final portfolio of {format(result.pathBFinalInvestPortfolio)}</strong> versus{' '}
                      {format(result.pathAFinalInvestPortfolio)} in Path A. The power of an uninterrupted 20-year compound interest curve exceeds the interest saved on the loan.
                    </>
                  ) : result.winner === 'prepay' ? (
                    <>
                      Because the effective borrowing cost ({result.effectiveLoanRate}%) is close to or exceeds expected investment returns,{' '}
                      <strong>extinguishing your mortgage in {result.pathAYearsToDebtFree} years</strong> saves a guaranteed{' '}
                      {format(result.pathAInterestSaved)} in interest, outperforming uncertain market returns.
                    </>
                  ) : (
                    <>
                      Both strategies yield closely matched net wealth. Choosing between them depends on whether you prefer guaranteed debt freedom or liquid mutual fund investments.
                    </>
                  )}
                </p>

                {/* Breakeven Insight Box */}
                <div className="mt-3 pt-3 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Exact Equity Breakeven Return Rate:</span>
                  </div>
                  <div className="font-mono font-bold text-sm bg-white/90 px-3 py-1 rounded-lg border border-black/10 inline-block">
                    {result.breakevenReturnRate}% CAGR
                  </div>
                </div>
                <p className="text-[11px] opacity-75">
                  • If your equity investments achieve greater than <strong>{result.breakevenReturnRate}% CAGR</strong>, <strong>Path B (Investing)</strong> wins mathematically.<br />
                  • If equity markets deliver less than <strong>{result.breakevenReturnRate}% CAGR</strong>, <strong>Path A (Prepayment)</strong> wins.
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Decision Matrix: Math vs Psychology vs Liquidity */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>The 3-Pillar Practical Decision Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>1. Risk Profile</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  <strong>Prepayment</strong> gives an untouchable, 100% risk-free return ({result.effectiveLoanRate}%). <strong>Equity SIP</strong> carries volatility and sequence-of-returns risk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>2. Liquidity & Access</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Money sent to the bank as prepayment is locked in brick & mortar (illiquid). In Path B, your mutual fund units can be partially redeemed within 48 hours for medical or business needs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>3. The Golden 50/50 Split</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  You don’t have to pick all-or-nothing. Split your {format(monthlyExtraCash)}: put {format(Math.round(monthlyExtraCash / 2))} to prepay and {format(Math.round(monthlyExtraCash / 2))} into equity SIP to balance emotional relief and wealth compounding!
                </p>
              </div>
            </div>
          </div>

          {/* Toggleable Year-by-Year Milestone Table */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Year-by-Year Net Wealth Trajectory
                </h3>
                <p className="text-xs text-neutral-500">
                  Comparing outstanding loan balance vs investment portfolio value over {remainingTenureYears} years.
                </p>
              </div>
              <button
                onClick={() => setShowAmortizationTable(!showAmortizationTable)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 no-print"
              >
                {showAmortizationTable ? 'Hide Table' : 'Show Full Breakdown'}
              </button>
            </div>

            {/* Quick Milestones Preview (Always visible) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
              {[5, 10, 15, remainingTenureYears]
                .filter((yr, idx, arr) => yr <= remainingTenureYears && arr.indexOf(yr) === idx)
                .map((yr) => {
                  const data = result.trajectory.find((d) => d.year === yr) || result.trajectory[result.trajectory.length - 1];
                  if (!data) return null;
                  return (
                    <div key={yr} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                      <div className="font-bold text-neutral-500 text-[11px]">Year {yr}</div>
                      <div className="text-xs font-bold text-indigo-700 mt-1 font-mono">
                        Path A: {format(data.pathAInvestPortfolio, true)}
                      </div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5 font-mono">
                        Path B: {format(data.pathBInvestPortfolio, true)}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Full Expandable Amortization / Net Worth Table */}
            {showAmortizationTable && (
              <div className="overflow-x-auto pt-2 border-t border-neutral-100">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px]">
                      <th className="py-2 pr-3">Year</th>
                      <th className="py-2 px-3 text-indigo-800">Path A Loan Bal</th>
                      <th className="py-2 px-3 text-indigo-800">Path A Portfolio</th>
                      <th className="py-2 px-3 text-emerald-800">Path B Loan Bal</th>
                      <th className="py-2 px-3 text-emerald-800">Path B Portfolio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-mono">
                    {result.trajectory.map((row) => (
                      <tr key={row.year} className="hover:bg-neutral-50/80">
                        <td className="py-2 pr-3 font-semibold text-neutral-800 font-sans">
                          Year {row.year}
                        </td>
                        <td className="py-2 px-3 text-neutral-700">
                          {row.pathALoanBalance === 0 ? (
                            <span className="text-emerald-600 font-bold">DEBT FREE</span>
                          ) : (
                            format(row.pathALoanBalance, true)
                          )}
                        </td>
                        <td className="py-2 px-3 text-indigo-700 font-semibold">
                          {format(row.pathAInvestPortfolio, true)}
                        </td>
                        <td className="py-2 px-3 text-neutral-700">
                          {row.pathBLoanBalance === 0 ? (
                            <span className="text-emerald-600 font-bold">DEBT FREE</span>
                          ) : (
                            format(row.pathBLoanBalance, true)
                          )}
                        </td>
                        <td className="py-2 px-3 text-emerald-700 font-semibold">
                          {format(row.pathBInvestPortfolio, true)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printable Educational & Disclaimer Summary (Included during 1-Page PDF Export) */}
      <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-5 text-xs text-neutral-600 space-y-2">
        <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>Methodology & Educational Transparency</span>
        </h4>
        <p className="leading-relaxed">
          First Bricks models both scenarios using identical total monthly cash outlays across the full {remainingTenureYears}-year timeline.
          Path A channels surplus funds directly into principal reduction, saving substantial interest and shortening tenure, after which the entirety of the former monthly commitment is redirected into an equity SIP.
          Path B keeps regular EMIs constant and compounds surplus funds in equity from month one.
          All projections assume disciplined regular investing without market timing. No financial advice; for educational simulation only.
        </p>
      </div>
    </div>
  );
};
