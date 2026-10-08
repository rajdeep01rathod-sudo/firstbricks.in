import React, { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateRetirementBuildUtilise } from '../utils/financeEngine';
import { RetirementBuildUtiliseInput } from '../types/finance';
import {
  getNumericParam,
  updateUrlQuery,
  copyShareLink,
} from '../utils/urlState';
import { BrandLogo } from './BrandLogo';
import {
  Compass,
  TrendingUp,
  Sparkles,
  RotateCcw,
  Share2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Percent,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';

export const FireSimulatorTool: React.FC = () => {
  const { userSnapshot, format, currency } = useCurrency();
  const isINR = currency === 'INR';

  // Standalone defaults with profile awareness
  const defaultInvestments = userSnapshot.investments > 0
    ? userSnapshot.investments
    : (isINR ? 500000 : 35000);

  const defaultMonthlySip = userSnapshot.monthlySavings > 0
    ? userSnapshot.monthlySavings
    : (isINR ? 25000 : 1200);

  const defaultMonthlyExpense = userSnapshot.monthlyExpenses > 0
    ? userSnapshot.monthlyExpenses
    : (isINR ? 45000 : 2800);

  // Read initial values from URL query parameters (or profile fallback)
  const [currentAge, setCurrentAge] = useState<number>(() =>
    getNumericParam('age', userSnapshot.age || 28)
  );
  const [retirementAge, setRetirementAge] = useState<number>(() =>
    getNumericParam('retire', 58)
  );
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(() =>
    getNumericParam('life', 85)
  );
  const [currentInvestments, setCurrentInvestments] = useState<number>(() =>
    getNumericParam('corpus', defaultInvestments)
  );
  const [monthlySip, setMonthlySip] = useState<number>(() =>
    getNumericParam('sip', defaultMonthlySip)
  );
  const [stepUpPercent, setStepUpPercent] = useState<number>(() =>
    getNumericParam('stepup', 7)
  );
  const [expectedPreRetirementCagr, setExpectedPreRetirementCagr] = useState<number>(() =>
    getNumericParam('precagr', isINR ? 12 : 9)
  );
  const [inflationRate, setInflationRate] = useState<number>(() =>
    getNumericParam('inf', isINR ? 6 : 3)
  );
  const [monthlyExpensesToday, setMonthlyExpensesToday] = useState<number>(() =>
    getNumericParam('expense', defaultMonthlyExpense)
  );
  const [yearlyIncreaseInWithdrawalPercent, setYearlyIncreaseInWithdrawalPercent] = useState<number>(() =>
    getNumericParam('wgrowth', isINR ? 6 : 3)
  );
  const [postRetirementCagr, setPostRetirementCagr] = useState<number>(() =>
    getNumericParam('postcagr', isINR ? 8 : 6)
  );

  const [copiedToast, setCopiedToast] = useState(false);
  const [tableFilter, setTableFilter] = useState<'all' | 'build' | 'utilise'>('all');
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // Synchronize state with URL parameters
  useEffect(() => {
    updateUrlQuery({
      age: currentAge,
      retire: retirementAge,
      life: lifeExpectancy,
      corpus: currentInvestments,
      sip: monthlySip,
      stepup: stepUpPercent,
      precagr: expectedPreRetirementCagr,
      inf: inflationRate,
      expense: monthlyExpensesToday,
      wgrowth: yearlyIncreaseInWithdrawalPercent,
      postcagr: postRetirementCagr,
    });
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentInvestments,
    monthlySip,
    stepUpPercent,
    expectedPreRetirementCagr,
    inflationRate,
    monthlyExpensesToday,
    yearlyIncreaseInWithdrawalPercent,
    postRetirementCagr,
  ]);

  const handleShare = async () => {
    await copyShareLink({
      age: currentAge,
      retire: retirementAge,
      life: lifeExpectancy,
      corpus: currentInvestments,
      sip: monthlySip,
      stepup: stepUpPercent,
      precagr: expectedPreRetirementCagr,
      inf: inflationRate,
      expense: monthlyExpensesToday,
      wgrowth: yearlyIncreaseInWithdrawalPercent,
      postcagr: postRetirementCagr,
    });
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCurrentAge(28);
    setRetirementAge(58);
    setLifeExpectancy(85);
    setCurrentInvestments(isINR ? 500000 : 35000);
    setMonthlySip(isINR ? 25000 : 1200);
    setStepUpPercent(7);
    setExpectedPreRetirementCagr(isINR ? 12 : 9);
    setInflationRate(isINR ? 6 : 3);
    setMonthlyExpensesToday(isINR ? 45000 : 2800);
    setYearlyIncreaseInWithdrawalPercent(isINR ? 6 : 3);
    setPostRetirementCagr(isINR ? 8 : 6);
  };

  const handlePrefillProfile = () => {
    if (userSnapshot.age) setCurrentAge(userSnapshot.age);
    if (userSnapshot.investments > 0) setCurrentInvestments(userSnapshot.investments);
    if (userSnapshot.monthlySavings > 0) setMonthlySip(userSnapshot.monthlySavings);
    if (userSnapshot.monthlyExpenses > 0) setMonthlyExpensesToday(userSnapshot.monthlyExpenses);
  };

  // Build the Input Payload
  const inputPayload: RetirementBuildUtiliseInput = useMemo(() => {
    return {
      currentAge: Math.max(18, Math.min(75, currentAge)),
      retirementAge: Math.max(currentAge + 1, Math.min(85, retirementAge)),
      lifeExpectancy: Math.max(retirementAge + 1, Math.min(105, lifeExpectancy)),
      currentInvestments: Math.max(0, currentInvestments),
      monthlySip: Math.max(0, monthlySip),
      stepUpPercent: Math.max(0, Math.min(50, stepUpPercent)),
      expectedPreRetirementCagr: Math.max(1, Math.min(30, expectedPreRetirementCagr)),
      inflationRate: Math.max(0, Math.min(20, inflationRate)),
      monthlyExpensesToday: Math.max(100, monthlyExpensesToday),
      yearlyIncreaseInWithdrawalPercent: Math.max(0, Math.min(25, yearlyIncreaseInWithdrawalPercent)),
      postRetirementCagr: Math.max(1, Math.min(25, postRetirementCagr)),
    };
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentInvestments,
    monthlySip,
    stepUpPercent,
    expectedPreRetirementCagr,
    inflationRate,
    monthlyExpensesToday,
    yearlyIncreaseInWithdrawalPercent,
    postRetirementCagr,
  ]);

  const result = useMemo(() => {
    return calculateRetirementBuildUtilise(inputPayload);
  }, [inputPayload]);

  // SVG Chart Setup
  const chartData = useMemo(() => {
    const list = result.schedule.filter((s) => s.age <= inputPayload.lifeExpectancy + 5);
    const maxBal = Math.max(result.corpusAtRetirement * 1.15, ...list.map((s) => s.endingCorpus), 1);
    return { list, maxBal };
  }, [result.schedule, result.corpusAtRetirement, inputPayload.lifeExpectancy]);

  const buildYearsCount = Math.max(1, inputPayload.retirementAge - inputPayload.currentAge);
  const retirementDurationYears = inputPayload.lifeExpectancy - inputPayload.retirementAge;

  // Filtered table rows
  const visibleSchedule = useMemo(() => {
    let filtered = result.schedule.filter((s) => s.age <= inputPayload.lifeExpectancy + 5);
    if (tableFilter === 'build') {
      filtered = filtered.filter((s) => s.phase === 'build');
    } else if (tableFilter === 'utilise') {
      filtered = filtered.filter((s) => s.phase === 'utilise');
    }

    if (!showFullSchedule) {
      // Show every 2nd or 3rd year plus pivotal milestones (current, retirement, life expectancy, depletion)
      filtered = filtered.filter((s) => {
        return (
          s.age === inputPayload.currentAge ||
          s.age === inputPayload.retirementAge - 1 ||
          s.age === inputPayload.retirementAge ||
          s.age === inputPayload.lifeExpectancy ||
          (result.ageDepleted && Math.floor(result.ageDepleted) === s.age) ||
          s.age % 3 === 0
        );
      });
    }

    return filtered;
  }, [result.schedule, tableFilter, showFullSchedule, inputPayload, result.ageDepleted]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Printable Report Header (Print only) */}
      <div className="hidden print-only mb-6 border-b border-neutral-300 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo size="md" />
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                Retirement Lifecycle Plan: From Build to Utilise
              </h1>
              <p className="text-xs text-neutral-600">
                Complete accumulation, step-up SIP compounding, and inflation-adjusted pension withdrawals.
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-neutral-500">
            <div>First Bricks Independent Decision Engine</div>
            <div>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Screen Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Lifecycle Retirement Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Build to Utilise</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Retirement Calculator: Build to Utilise
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Model your complete financial life in two seamless phases: <strong>Phase 1 (Build)</strong> with Step-Up SIP and compounding growth up to retirement, followed by <strong>Phase 2 (Utilise)</strong> with inflation-escalating monthly withdrawals until life expectancy.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Copy shareable link with these exact inputs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Share Calculation</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Print or save 1-page summary PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Export / Print</span>
          </button>
          <button
            type="button"
            onClick={handlePrefillProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Autofill from saved profile"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Prefill</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {copiedToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 no-print animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Shareable link copied!</strong> Open anytime to restore these exact retirement build-to-utilise values.
            </span>
          </div>
          <button
            onClick={() => setCopiedToast(false)}
            className="text-emerald-700 hover:text-emerald-900 underline ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* HERO LIFECYCLE SUMMARY BANNER */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm transition-all ${
        result.survivesLifeExpectancy
          ? 'bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-teal-50/60 border-emerald-200/90'
          : 'bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-orange-50/60 border-amber-200/90'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                result.survivesLifeExpectancy
                  ? 'bg-emerald-200 text-emerald-900'
                  : 'bg-amber-200 text-amber-900'
              }`}>
                {result.survivesLifeExpectancy ? '✓ Fully Funded Retirement' : '⚠️ Potential Retirement Shortfall'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Simulated from Age {inputPayload.currentAge} → {inputPayload.lifeExpectancy}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {result.survivesLifeExpectancy ? (
                <>
                  This Fund Lasts{' '}
                  <span className="text-emerald-800">
                    {result.yearsFundLastsPostRetirement}+ Years
                  </span>{' '}
                  After Retirement
                </>
              ) : (
                <>
                  Fund Depletes in{' '}
                  <span className="text-amber-800">
                    {result.yearsFundLastsPostRetirement} Years
                  </span>{' '}
                  (At Age {result.ageDepleted})
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {result.survivesLifeExpectancy ? (
                <>
                  Your accumulated corpus of <strong>{format(result.corpusAtRetirement, true)}</strong> comfortably pays for your initial monthly withdrawal of <strong>{format(result.monthlyExpenseAtRetirement)}/mo</strong> (stepping up {inputPayload.yearlyIncreaseInWithdrawalPercent}% yearly with inflation). At age {inputPayload.lifeExpectancy}, you will still have a legacy surplus of <strong>{format(result.balanceAtLifeExpectancy, true)}</strong>.
                </>
              ) : (
                <>
                  Your projected corpus of <strong>{format(result.corpusAtRetirement, true)}</strong> will run dry at Age {result.ageDepleted}, which is <strong>{(inputPayload.lifeExpectancy - (result.ageDepleted || 0)).toFixed(1)} years before your life expectancy</strong> of {inputPayload.lifeExpectancy}. To ensure your fund never runs out, step up your starting SIP to <strong>{format(result.requiredMonthlySip)}/mo</strong>.
                </>
              )}
            </p>
          </div>

          {/* Quick Pillar Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:min-w-[380px]">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Corpus at Retirement</span>
              <span className="text-lg font-black tabular-nums text-slate-900 block mt-0.5">
                {format(result.corpusAtRetirement, true)}
              </span>
              <span className="text-[10px] text-slate-500">At Age {inputPayload.retirementAge}</span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">First Monthly Pension</span>
              <span className="text-lg font-black tabular-nums text-emerald-800 block mt-0.5">
                {format(result.monthlyExpenseAtRetirement)}
              </span>
              <span className="text-[10px] text-slate-500">Inflated from today</span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Needed</span>
              <span className="text-lg font-black tabular-nums text-slate-900 block mt-0.5">
                {format(result.targetCorpusNeededAtRetirement, true)}
              </span>
              <span className="text-[10px] text-slate-500">For Age {inputPayload.lifeExpectancy}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUTS PANEL (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] no-print">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Lifecycle Parameters</h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Build & Utilise
            </span>
          </div>

          {/* SECTION A: TIMELINE & AGES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Timeline & Ages</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {buildYearsCount}y Build / {retirementDurationYears}y Utilise
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Age</label>
                <input
                  type="number"
                  min={18}
                  max={70}
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value) || 25)}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Retirement Age</label>
                <input
                  type="number"
                  min={currentAge + 1}
                  max={80}
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value) || 60)}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Life Expectancy</label>
                <input
                  type="number"
                  min={retirementAge + 1}
                  max={100}
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value) || 85)}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION B: PHASE 1 - BUILD (ACCUMULATION) */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5 text-emerald-900">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Phase 1: Build (Accumulation)</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Saving & Growing
              </span>
            </div>

            {/* Current Portfolio */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Existing Investments Today</label>
                <span className="font-extrabold tabular-nums text-slate-900">{format(currentInvestments)}</span>
              </div>
              <input
                type="number"
                step={isINR ? 50000 : 1000}
                value={currentInvestments}
                onChange={(e) => setCurrentInvestments(Math.max(0, Number(e.target.value) || 0))}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Monthly SIP */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Monthly SIP / Investment</label>
                <span className="font-extrabold tabular-nums text-emerald-800">{format(monthlySip)}/mo</span>
              </div>
              <input
                type="number"
                step={isINR ? 2500 : 100}
                value={monthlySip}
                onChange={(e) => setMonthlySip(Math.max(0, Number(e.target.value) || 0))}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Step-Up % Slider */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-800">Annual SIP Step-Up %</label>
                <span className="font-black tabular-nums text-emerald-700">+{stepUpPercent}% each year</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={stepUpPercent}
                onChange={(e) => setStepUpPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (Flat SIP)</span>
                <span>5-10% (Salary matched)</span>
                <span>20%</span>
              </div>
            </div>

            {/* Expected Pre-Retirement CAGR */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Expected Pre-Retirement Return (CAGR)</label>
                <span className="font-extrabold tabular-nums text-emerald-800">{expectedPreRetirementCagr}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={18}
                step={0.5}
                value={expectedPreRetirementCagr}
                onChange={(e) => setExpectedPreRetirementCagr(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>8% (Conservative)</span>
                <span>12% (Equity Index)</span>
                <span>18%</span>
              </div>
            </div>
          </div>

          {/* SECTION C: PHASE 2 - UTILISE (DECUMULATION & PENSION) */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5 text-indigo-900">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>3. Phase 2: Utilise (Decumulation)</span>
              </span>
              <span className="text-[11px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                Pension & Drawdown
              </span>
            </div>

            {/* Monthly Expenses Today */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Monthly Expenses Today</label>
                <span className="font-extrabold tabular-nums text-slate-900">{format(monthlyExpensesToday)}/mo</span>
              </div>
              <input
                type="number"
                step={isINR ? 2500 : 100}
                value={monthlyExpensesToday}
                onChange={(e) => setMonthlyExpensesToday(Math.max(100, Number(e.target.value) || 0))}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
              />
              <span className="text-[11px] text-slate-700 block leading-relaxed mt-1">
                <strong>This amount today {format(monthlyExpensesToday)}/mo is equivalent to your real withdrawal {format(result.monthlyExpenseAtRetirement)}/mo after inflation</strong> (at retirement in {buildYearsCount} yrs).
              </span>
            </div>

            {/* Inflation & Withdrawal Escalation Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Inflation Rate %
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1" title="Yearly increase in withdrawal so purchasing power is preserved">
                  Withdrawal Hike %/yr
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={yearlyIncreaseInWithdrawalPercent}
                  onChange={(e) => setYearlyIncreaseInWithdrawalPercent(Number(e.target.value))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white"
                />
              </div>
            </div>

            {/* Post-Retirement Return / CAGR */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Post-Retirement Return (CAGR)</label>
                <span className="font-extrabold tabular-nums text-indigo-700">{postRetirementCagr}%</span>
              </div>
              <input
                type="range"
                min={4}
                max={12}
                step={0.5}
                value={postRetirementCagr}
                onChange={(e) => setPostRetirementCagr(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5% (Debt only)</span>
                <span>8% (Conservative Hybrid)</span>
                <span>12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTIONS, VISUAL CHART & BREAKDOWN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* LIFECYCLE SVG GRAPH */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Build-to-Utilise Wealth Curve
                </h3>
                <span className="text-[11px] text-slate-400">
                  Phase 1 Accumulation Peak → Phase 2 Sustainable Drawdown
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Build (Accumulation)
                </span>
                <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  Utilise (Drawdown)
                </span>
              </div>
            </div>

            {/* SVG Visual Graph */}
            <div className="h-56 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="buildGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="utiliseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Base zero gridline */}
                <line x1="0" y1="100" x2="100" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                {/* Peak horizontal guideline */}
                <line
                  x1="0"
                  y1={100 - (result.corpusAtRetirement / chartData.maxBal) * 100}
                  x2="100"
                  y2={100 - (result.corpusAtRetirement / chartData.maxBal) * 100}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Shaded Area */}
                {chartData.list.length > 1 && (
                  <path
                    d={`M 0 100 ${chartData.list
                      .map((pt, i) => {
                        const x = (i / (chartData.list.length - 1)) * 100;
                        const y = 100 - Math.min(100, Math.max(0, (pt.endingCorpus / chartData.maxBal) * 100));
                        return `L ${x} ${y}`;
                      })
                      .join(' ')} L 100 100 Z`}
                    fill="url(#buildGrad)"
                  />
                )}

                {/* Trajectory Polyline */}
                {chartData.list.length > 1 && (
                  <path
                    d={`M 0 ${100 - Math.min(100, (chartData.list[0].endingCorpus / chartData.maxBal) * 100)} ${chartData.list
                      .map((pt, i) => {
                        const x = (i / (chartData.list.length - 1)) * 100;
                        const y = 100 - Math.min(100, Math.max(0, (pt.endingCorpus / chartData.maxBal) * 100));
                        return `L ${x} ${y}`;
                      })
                      .join(' ')}`}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </div>

            {/* X-Axis Timeline Markers */}
            <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
              <span className="font-semibold text-slate-700">Start (Age {inputPayload.currentAge})</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Retirement Peak (Age {inputPayload.retirementAge}: {format(result.corpusAtRetirement, true)})
              </span>
              <span className="font-semibold text-slate-700">Life Exp (Age {inputPayload.lifeExpectancy})</span>
            </div>
          </div>

          {/* LIFETIME TOTAL CASH FLOW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Invested (From Pocket)</span>
              <div className="text-base font-black text-slate-900 tabular-nums">
                {format(result.totalInvestedDuringBuild, true)}
              </div>
              <p className="text-[11px] text-slate-500">Over {buildYearsCount} years with {inputPayload.stepUpPercent}% step-up</p>
            </div>

            <div className="bg-white border border-indigo-200 rounded-2xl p-4 space-y-1 shadow-xs bg-indigo-50/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Lifetime Drawdowns Received</span>
              <div className="text-base font-black text-indigo-900 tabular-nums">
                {format(result.totalWithdrawnDuringRetirement, true)}
              </div>
              <p className="text-[11px] text-indigo-600/80">Total pension paid to you in retirement</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ending Balance at Age {inputPayload.lifeExpectancy}</span>
              <div className={`text-base font-black tabular-nums ${
                result.balanceAtLifeExpectancy > 0 ? 'text-emerald-800' : 'text-slate-500'
              }`}>
                {format(result.balanceAtLifeExpectancy, true)}
              </div>
              <p className="text-[11px] text-slate-500">Surplus inheritance legacy for family</p>
            </div>
          </div>

          {/* YEAR-BY-YEAR BUILD & UTILISE LEDGER */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Lifecycle Amortization Schedule
                </h3>
                <span className="text-xs text-slate-500">
                  Year-by-year cash flow, compounding returns, and year-end corpus
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs no-print">
                <button
                  type="button"
                  onClick={() => setTableFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    tableFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Years
                </button>
                <button
                  type="button"
                  onClick={() => setTableFilter('build')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    tableFilter === 'build'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Build Only
                </button>
                <button
                  type="button"
                  onClick={() => setTableFilter('utilise')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    tableFilter === 'utilise'
                      ? 'bg-white text-indigo-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Utilise Only
                </button>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Age (Year)</th>
                    <th className="py-2.5 px-3">Phase</th>
                    <th className="py-2.5 px-3 text-right">Monthly Flow</th>
                    <th className="py-2.5 px-3 text-right">Annual Cashflow</th>
                    <th className="py-2.5 px-3 text-right">Returns Earned</th>
                    <th className="py-2.5 px-3 text-right">Ending Corpus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {visibleSchedule.map((row) => (
                    <tr
                      key={row.age}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        row.age === inputPayload.retirementAge
                          ? 'bg-emerald-50/60 font-bold'
                          : row.isDepleted
                          ? 'bg-amber-50/40 text-amber-900'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-slate-900 whitespace-nowrap font-bold">
                        Age {row.age} <span className="text-slate-400 font-normal">({row.year})</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {row.phase === 'build' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Build (SIP)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                            Utilise (Pension)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {row.phase === 'build' ? (
                          <span className="text-emerald-700 font-semibold">+{format(row.monthlyCashflow)}/mo</span>
                        ) : (
                          <span className="text-indigo-700 font-semibold">-{format(row.monthlyCashflow)}/mo</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {row.phase === 'build' ? (
                          <span className="text-slate-700">+{format(row.annualContribution, true)}</span>
                        ) : (
                          <span className="text-slate-700">-{format(row.annualWithdrawal, true)}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-slate-600">
                        +{format(row.growthEarned, true)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-black text-slate-900">
                        {row.isDepleted ? (
                          <span className="text-amber-700 font-bold">Depleted (0)</span>
                        ) : (
                          format(row.endingCorpus, true)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Toggle Full / Condensed Table */}
            <div className="pt-2 flex justify-center no-print">
              <button
                type="button"
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
              >
                {showFullSchedule ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Show Milestone Summary</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Show All {result.schedule.length} Years Detailed Ledger</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* STRATEGIC RULES OF THUMB & BENCHMARKS */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Smart Retirement Safeguards</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                • <strong>Step-Up SIP is Your Superpower</strong>: Increasing your monthly SIP by just {inputPayload.stepUpPercent}% per year doubles your maturity corpus compared to a flat SIP, effortlessly absorbing pre-retirement inflation.
              </p>
              <p>
                • <strong>The Inflation Escalator in Retirement</strong>: A monthly expense of {format(inputPayload.monthlyExpensesToday)} today grows to {format(result.monthlyExpenseAtRetirement)} at Age {inputPayload.retirementAge} with {inputPayload.inflationRate}% annual inflation. If your retirement fund does not increase withdrawals annually, purchasing power drops by 50% every 12 years.
              </p>
              <p>
                • <strong>Sequence of Returns Buffer</strong>: In the first 3 years of retirement, keep 2–3 years of living expenses in ultra-safe liquid debt funds. This prevents having to sell volatile equities during market downturns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
