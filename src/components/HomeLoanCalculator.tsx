import React, { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import {
  getNumericParam,
  getStringParam,
  updateUrlQuery,
  copyShareLink,
} from '../utils/urlState';
import { BrandLogo } from './BrandLogo';
import {
  Home,
  Zap,
  TrendingDown,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Percent,
  Plus,
  Minus,
  RotateCcw,
  Info,
  CheckCircle2,
  Share2,
  Printer,
  Check,
} from 'lucide-react';

export const HomeLoanCalculator: React.FC = () => {
  const { format, currency, userSnapshot } = useCurrency();
  const isINR = currency === 'INR';

  // 100% Standalone State: Initialized with sensible defaults or profile context, but fully independent!
  const defaultAmount = isINR ? 5000000 : 350000;
  const initialLoanAmount = () => {
    const fromUrl = getNumericParam('loan', 0);
    if (fromUrl > 0) return fromUrl;
    if (userSnapshot.totalDebt > 500000 && isINR) return userSnapshot.totalDebt;
    if (userSnapshot.totalDebt > 50000 && !isINR) return userSnapshot.totalDebt;
    return defaultAmount;
  };

  const [loanAmount, setLoanAmount] = useState<number>(initialLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(() =>
    getNumericParam('rate', isINR ? 8.5 : 6.5)
  );
  const [tenureYears, setTenureYears] = useState<number>(() =>
    getNumericParam('tenure', 20)
  );

  // Prepayment / Acceleration Options
  const [accelerationType, setAccelerationType] = useState<'step_up' | 'extra_monthly' | 'extra_yearly' | 'combo'>(() =>
    getStringParam('type', 'step_up', ['step_up', 'extra_monthly', 'extra_yearly', 'combo'])
  );
  const [annualStepUpPct, setAnnualStepUpPct] = useState<number>(() =>
    getNumericParam('stepup', 5)
  );
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(() =>
    getNumericParam('extra', isINR ? 5000 : 200)
  );
  const [comboIncludeYearly, setComboIncludeYearly] = useState<boolean>(() =>
    getNumericParam('comboyearly', 0) === 1
  );

  const [copiedToast, setCopiedToast] = useState(false);

  // Synchronize state with URL parameters
  useEffect(() => {
    updateUrlQuery({
      loan: loanAmount,
      rate: interestRate,
      tenure: tenureYears,
      type: accelerationType,
      stepup: (accelerationType === 'step_up' || accelerationType === 'combo') ? annualStepUpPct : null,
      extra: (accelerationType === 'extra_monthly' || accelerationType === 'combo') ? extraMonthlyPayment : null,
      comboyearly: accelerationType === 'combo' && comboIncludeYearly ? 1 : null,
    });
  }, [loanAmount, interestRate, tenureYears, accelerationType, annualStepUpPct, extraMonthlyPayment, comboIncludeYearly]);

  const handleShare = async () => {
    await copyShareLink({
      loan: loanAmount,
      rate: interestRate,
      tenure: tenureYears,
      type: accelerationType,
      stepup: annualStepUpPct,
      extra: extraMonthlyPayment,
      comboyearly: comboIncludeYearly ? 1 : 0,
    });
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Quick preset chips
  const amountChips = isINR
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

  // Calculation Logic
  const result = useMemo(() => {
    const P = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalBaseMonths = tenureYears * 12;

    // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let baseEmi = 0;
    if (monthlyRate > 0) {
      baseEmi = Math.round(
        (P * monthlyRate * Math.pow(1 + monthlyRate, totalBaseMonths)) /
          (Math.pow(1 + monthlyRate, totalBaseMonths) - 1)
      );
    } else {
      baseEmi = Math.round(P / totalBaseMonths);
    }

    const baseTotalPayment = baseEmi * totalBaseMonths;
    const baseTotalInterest = baseTotalPayment - P;

    // Simulate accelerated schedule month-by-month
    let balance = P;
    let currentEmi = baseEmi;
    let acceleratedMonths = 0;
    let acceleratedTotalInterest = 0;
    const trajectory: Array<{ year: number; balance: number; baseBalance: number }> = [];

    let baseSimBal = P;

    while (balance > 0 && acceleratedMonths < 480) {
      acceleratedMonths++;

      // Annual step-up check
      if ((accelerationType === 'step_up' || accelerationType === 'combo') && acceleratedMonths > 1 && (acceleratedMonths - 1) % 12 === 0) {
        currentEmi = Math.round(currentEmi * (1 + annualStepUpPct / 100));
      }

      // Calculate interest for this month
      const monthInterest = balance * monthlyRate;
      acceleratedTotalInterest += monthInterest;

      // Determine payment this month
      let monthPayment = currentEmi;
      if (accelerationType === 'extra_monthly') {
        monthPayment += extraMonthlyPayment;
      }
      if (accelerationType === 'extra_yearly' && acceleratedMonths % 12 === 0) {
        monthPayment += baseEmi; // 1 extra EMI every 12 months
      }
      if (accelerationType === 'combo') {
        monthPayment += extraMonthlyPayment; // Step-up EMI + Extra Monthly EMI
        if (comboIncludeYearly && acceleratedMonths % 12 === 0) {
          monthPayment += baseEmi; // Optional 1 extra EMI every 12 months
        }
      }

      const principalPaid = Math.min(balance, Math.max(0, monthPayment - monthInterest));
      balance -= principalPaid;

      // Base simulation tracker
      if (baseSimBal > 0) {
        const baseInt = baseSimBal * monthlyRate;
        const basePrinc = Math.min(baseSimBal, Math.max(0, baseEmi - baseInt));
        baseSimBal -= basePrinc;
      }

      // Track trajectory per year
      if (acceleratedMonths % 12 === 0 || balance <= 0) {
        trajectory.push({
          year: Math.ceil(acceleratedMonths / 12),
          balance: Math.max(0, Math.round(balance)),
          baseBalance: Math.max(0, Math.round(baseSimBal)),
        });
      }
    }

    const interestSaved = Math.max(0, baseTotalInterest - acceleratedTotalInterest);
    const monthsSaved = Math.max(0, totalBaseMonths - acceleratedMonths);
    const yearsSaved = (monthsSaved / 12).toFixed(1);

    // Donut chart calculations
    const totalAcceleratedOutlay = P + acceleratedTotalInterest;
    const principalPct = Math.round((P / totalAcceleratedOutlay) * 100);
    const interestPct = 100 - principalPct;

    return {
      baseEmi,
      baseTotalInterest,
      baseTotalPayment,
      acceleratedMonths,
      acceleratedTotalInterest: Math.round(acceleratedTotalInterest),
      interestSaved: Math.round(interestSaved),
      monthsSaved,
      yearsSaved,
      principalPct,
      interestPct,
      trajectory,
    };
  }, [loanAmount, interestRate, tenureYears, accelerationType, annualStepUpPct, extraMonthlyPayment]);

  const handlePrefillFromProfile = () => {
    if (userSnapshot.totalDebt > 0) {
      setLoanAmount(userSnapshot.totalDebt);
      if (userSnapshot.debtInterestRate > 0) {
        setInterestRate(userSnapshot.debtInterestRate);
      }
    }
  };

  const handleResetDefaults = () => {
    setLoanAmount(defaultAmount);
    setInterestRate(isINR ? 8.5 : 6.5);
    setTenureYears(20);
    setAccelerationType('step_up');
    setAnnualStepUpPct(5);
    setExtraMonthlyPayment(isINR ? 5000 : 200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Printable Report Header (Print only) */}
      <div className="hidden print-only mb-6 border-b border-neutral-300 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <h1 className="text-xl font-bold text-neutral-900">FIRST BRICKS DECISION ENGINE</h1>
              <p className="text-xs text-neutral-500">
                Home Loan Prepayment & Step-Up EMI Strategy Report
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-neutral-400">
            <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            <p>URL: firstbricks.in/home-loan/</p>
          </div>
        </div>
      </div>

      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Standalone Home Loan Decision Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Independent Variables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Home Loan Prepayment & Step-Up EMI Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Model how an annual 5–10% step-up or 1 extra EMI per year eliminates 10+ years off your mortgage and saves tens of lakhs in interest.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto no-print">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Copy shareable link with current loan parameters"
          >
            {copiedToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shadow-xs"
            title="Export 1-Page Summary / Print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          {userSnapshot.totalDebt > 0 && (
            <button
              type="button"
              onClick={handlePrefillFromProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prefill Debt</span>
            </button>
          )}
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

      {copiedToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 no-print animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Shareable link copied!</strong> Open anytime to restore these exact loan and prepayment values.
            </span>
          </div>
          <button
            onClick={() => setCopiedToast(false)}
            className="text-emerald-700 hover:text-emerald-900 underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUTS PANEL (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Loan Parameters</h2>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              Standalone & Live
            </span>
          </div>

          <div className="space-y-5">
            {/* Loan Principal Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Home Loan Principal</label>
                <span className="text-sm font-extrabold tabular-nums text-slate-900">{format(loanAmount)}</span>
              </div>
              <input
                type="number"
                step={isINR ? 100000 : 5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(10000, Number(e.target.value) || 0))}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {amountChips.map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setLoanAmount(chip.val)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer ${
                      loanAmount === chip.val
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Interest Rate (APR)</label>
                <span className="text-sm font-extrabold tabular-nums text-emerald-700">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5% (Subsidized)</span>
                <span>8.5% (Prime)</span>
                <span>15%</span>
              </div>
            </div>

            {/* Tenure Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Original Tenure</label>
                <span className="text-sm font-extrabold tabular-nums text-slate-900">{tenureYears} Years</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {[10, 15, 20, 25, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      tenureYears === yr
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {yr}y
                  </button>
                ))}
              </div>
            </div>

            {/* Acceleration Strategy Section */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">Prepayment Acceleration</label>
                <span className="text-[11px] text-emerald-700 font-semibold">Choose Strategy</span>
              </div>

              {/* Strategy Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAccelerationType('step_up')}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    accelerationType === 'step_up'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Step-Up %
                </button>
                <button
                  type="button"
                  onClick={() => setAccelerationType('extra_monthly')}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    accelerationType === 'extra_monthly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Extra / Mo
                </button>
                <button
                  type="button"
                  onClick={() => setAccelerationType('extra_yearly')}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    accelerationType === 'extra_yearly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1 Extra EMI
                </button>
                <button
                  type="button"
                  onClick={() => setAccelerationType('combo')}
                  className={`py-2 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                    accelerationType === 'combo'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100'
                  }`}
                >
                  Combo ⭐
                </button>
              </div>

              {/* Strategy Specific Input */}
              {accelerationType === 'step_up' && (
                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-950">Annual Step-Up Increase:</span>
                    <span className="font-black tabular-nums text-emerald-800">+{annualStepUpPct}% each year</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={annualStepUpPct}
                    onChange={(e) => setAnnualStepUpPct(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-white rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-emerald-800/80">
                    <span>1%</span>
                    <span>5% (Recommended)</span>
                    <span>15%</span>
                  </div>
                </div>
              )}

              {accelerationType === 'extra_monthly' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">Extra Monthly Payment:</span>
                    <span className="font-black tabular-nums text-slate-900">+{format(extraMonthlyPayment)}/mo</span>
                  </div>
                  <input
                    type="range"
                    min={isINR ? 1000 : 50}
                    max={isINR ? 25000 : 1000}
                    step={isINR ? 500 : 25}
                    value={extraMonthlyPayment}
                    onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{format(isINR ? 1000 : 50)}</span>
                    <span>{format(isINR ? 12000 : 500)}</span>
                    <span>{format(isINR ? 25000 : 1000)}</span>
                  </div>
                </div>
              )}

              {accelerationType === 'extra_yearly' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                  💡 Paying just <strong>1 extra EMI once a year</strong> (e.g. from your annual bonus) will shave years off your loan without altering monthly budget.
                </div>
              )}

              {accelerationType === 'combo' && (
                <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-4">
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>Dual Power: Step-Up + Extra EMI</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold uppercase tracking-wider">
                      Maximum Savings
                    </span>
                  </div>

                  {/* 1. Step up % */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-emerald-900">1. Annual Step-Up EMI:</span>
                      <span className="font-black tabular-nums text-emerald-800">+{annualStepUpPct}% / yr</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={annualStepUpPct}
                      onChange={(e) => setAnnualStepUpPct(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-2 bg-white rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-emerald-700/80">
                      <span>1%</span>
                      <span>5% (Recommended)</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* 2. Extra Monthly EMI */}
                  <div className="space-y-1.5 pt-2 border-t border-emerald-200/60">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-emerald-900">2. Extra Monthly Payment:</span>
                      <span className="font-black tabular-nums text-emerald-800">+{format(extraMonthlyPayment)} / mo</span>
                    </div>
                    <input
                      type="range"
                      min={isINR ? 1000 : 50}
                      max={isINR ? 25000 : 1000}
                      step={isINR ? 500 : 25}
                      value={extraMonthlyPayment}
                      onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
                      className="w-full accent-emerald-700 cursor-pointer h-2 bg-white rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-emerald-700/80">
                      <span>{format(isINR ? 1000 : 50)}</span>
                      <span>{format(isINR ? 12000 : 500)}</span>
                      <span>{format(isINR ? 25000 : 1000)}</span>
                    </div>
                  </div>

                  {/* 3. Optional Extra Yearly EMI */}
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-emerald-950 font-medium">
                      <input
                        type="checkbox"
                        checked={comboIncludeYearly}
                        onChange={(e) => setComboIncludeYearly(e.target.checked)}
                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                      />
                      <span>Also add 1 extra EMI every year (Bonus)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS & SAVINGS DASHBOARD (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Tranquil Scorecard */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-emerald-200/60">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Standard Monthly EMI
                </span>
                <div className="text-3xl font-black tabular-nums text-slate-900 mt-0.5">
                  {format(result.baseEmi)}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  Base tenure: {tenureYears} years ({tenureYears * 12} months)
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Total Interest Saved</span>
                </div>
                <div className="text-3xl font-black tabular-nums text-emerald-800 mt-0.5">
                  +{format(result.interestSaved, true)}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  Cuts loan tenure by <strong className="text-emerald-950 font-bold">{result.yearsSaved} Years</strong>
                </span>
              </div>
            </div>

            {/* Quick 3 Pillar Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Accelerated Tenure</span>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                  {(result.acceleratedMonths / 12).toFixed(1)} Yrs
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">Was {tenureYears} Yrs</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Revised Total Interest</span>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                  {format(result.acceleratedTotalInterest, true)}
                </div>
                <span className="text-[10px] text-slate-500">Was {format(result.baseTotalInterest, true)}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Interest Discount</span>
                <div className="text-sm sm:text-base font-extrabold text-emerald-800 tabular-nums">
                  {result.baseTotalInterest > 0
                    ? Math.round((result.interestSaved / result.baseTotalInterest) * 100)
                    : 0}% Off
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">Over lifetime</span>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-slate-700 h-full transition-all duration-300"
                  style={{ width: `${result.principalPct}%` }}
                  title={`Principal: ${result.principalPct}%`}
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${result.interestPct}%` }}
                  title={`Total Interest: ${result.interestPct}%`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  Principal: {result.principalPct}% ({format(loanAmount, true)})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Interest: {result.interestPct}% ({format(result.acceleratedTotalInterest, true)})
                </span>
              </div>
            </div>
          </div>

          {/* Amortization Milestone Schedule */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Loan Balance Trajectory
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Accelerated Path
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  Standard Schedule
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="pb-2">Year</th>
                    <th className="pb-2">Accelerated Balance</th>
                    <th className="pb-2">Standard Balance</th>
                    <th className="pb-2 text-emerald-700">Equity Ahead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.trajectory
                    .filter((t) => t.year % 2 === 0 || t.balance === 0)
                    .slice(0, 8)
                    .map((item) => (
                      <tr key={item.year} className="hover:bg-slate-50/60">
                        <td className="py-2.5 font-bold text-slate-900">Year {item.year}</td>
                        <td className="py-2.5 tabular-nums font-semibold text-emerald-800">
                          {format(item.balance, true)}
                        </td>
                        <td className="py-2.5 tabular-nums text-slate-500">
                          {format(item.baseBalance, true)}
                        </td>
                        <td className="py-2.5 tabular-nums font-bold text-slate-900">
                          +{format(Math.max(0, item.baseBalance - item.balance), true)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calming Educational Insight */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Smart Mortgage Rules</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                • <strong>Early Years Matter Most</strong>: In the first 5 years of a 20-year home loan, up to 70% of each EMI goes toward pure interest! Prepayments made in years 1–5 save more than prepayments made in year 15.
              </p>
              <p>
                • <strong>Salary Match Step-Up</strong>: If your income increases by 7–10% annually with appraisals, stepping up your EMI by 5% feels painless because your take-home pay still grows, while cutting your loan tenure almost in half!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
