import React, { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import {
  getNumericParam,
  updateUrlQuery,
  copyShareLink,
} from '../utils/urlState';
import { BrandLogo } from './BrandLogo';
import {
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  Info,
  Share2,
  Printer,
  Check,
} from 'lucide-react';

export const SipCalculator: React.FC = () => {
  const { format, currency, userSnapshot } = useCurrency();
  const isINR = currency === 'INR';

  // 100% STANDALONE STATE:
  // Initialized with saved profile savings if present, but completely independent & variable!
  const defaultMonthlySip = () => {
    const fromUrl = getNumericParam('monthly', 0);
    if (fromUrl > 0) return fromUrl;
    if (userSnapshot.monthlySavings > 0) return userSnapshot.monthlySavings;
    return isINR ? 20000 : 800;
  };

  const [monthlySip, setMonthlySip] = useState<number>(defaultMonthlySip);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(() =>
    getNumericParam('rate', isINR ? 12.0 : 10.0)
  );
  const [horizonYears, setHorizonYears] = useState<number>(() =>
    getNumericParam('years', 15)
  );

  // Step-Up & Inflation Controls
  const [annualStepUpPct, setAnnualStepUpPct] = useState<number>(() =>
    getNumericParam('stepup', 10)
  );
  const [inflationRate, setInflationRate] = useState<number>(() =>
    getNumericParam('inflation', isINR ? 6.0 : 3.0)
  );

  const [copiedToast, setCopiedToast] = useState(false);

  // Synchronize state with URL search parameters
  useEffect(() => {
    updateUrlQuery({
      monthly: monthlySip,
      rate: expectedReturnRate,
      years: horizonYears,
      stepup: annualStepUpPct,
      inflation: inflationRate,
    });
  }, [monthlySip, expectedReturnRate, horizonYears, annualStepUpPct, inflationRate]);

  const handleShare = async () => {
    await copyShareLink({
      monthly: monthlySip,
      rate: expectedReturnRate,
      years: horizonYears,
      stepup: annualStepUpPct,
      inflation: inflationRate,
    });
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Quick chips
  const sipChips = isINR
    ? [
        { label: '₹10,000', val: 10000 },
        { label: '₹25,000', val: 25000 },
        { label: '₹50,000', val: 50000 },
        { label: '₹1 Lakh', val: 100000 },
      ]
    : [
        { label: '$300', val: 300 },
        { label: '$750', val: 750 },
        { label: '$1,500', val: 1500 },
        { label: '$3,000', val: 3000 },
      ];

  // Simulation Calculations
  const result = useMemo(() => {
    const monthlyRate = expectedReturnRate / 100 / 12;
    const totalMonths = horizonYears * 12;

    let balanceWithStepUp = 0;
    let balanceFlat = 0;
    let totalInvestedWithStepUp = 0;
    let totalInvestedFlat = 0;

    let currentSip = monthlySip;

    const trajectory: Array<{
      year: number;
      invested: number;
      nominalCorpus: number;
      realPurchasingPower: number;
      flatCorpus: number;
    }> = [];

    for (let m = 1; m <= totalMonths; m++) {
      // Annual step-up every 12 months
      if (m > 1 && (m - 1) % 12 === 0) {
        currentSip = Math.round(currentSip * (1 + annualStepUpPct / 100));
      }

      // Step-Up SIP compounding
      balanceWithStepUp = (balanceWithStepUp + currentSip) * (1 + monthlyRate);
      totalInvestedWithStepUp += currentSip;

      // Flat SIP compounding comparison
      balanceFlat = (balanceFlat + monthlySip) * (1 + monthlyRate);
      totalInvestedFlat += monthlySip;

      // Track trajectory per year
      if (m % 12 === 0) {
        const year = m / 12;
        // Inflation adjustment discount factor: (1 + inflation)^year
        const inflationDiscount = Math.pow(1 + inflationRate / 100, year);
        const realValue = Math.round(balanceWithStepUp / inflationDiscount);

        trajectory.push({
          year,
          invested: Math.round(totalInvestedWithStepUp),
          nominalCorpus: Math.round(balanceWithStepUp),
          realPurchasingPower: realValue,
          flatCorpus: Math.round(balanceFlat),
        });
      }
    }

    const finalNominalCorpus = Math.round(balanceWithStepUp);
    const finalInvested = Math.round(totalInvestedWithStepUp);
    const finalWealthGain = finalNominalCorpus - finalInvested;
    const finalInflationDiscount = Math.pow(1 + inflationRate / 100, horizonYears);
    const finalRealPurchasingPower = Math.round(finalNominalCorpus / finalInflationDiscount);

    const flatFinalCorpus = Math.round(balanceFlat);
    const stepUpAdvantageCorpus = Math.max(0, finalNominalCorpus - flatFinalCorpus);

    const investedPct = Math.round((finalInvested / (finalNominalCorpus || 1)) * 100);
    const gainPct = 100 - investedPct;

    return {
      finalNominalCorpus,
      finalInvested,
      finalWealthGain,
      finalRealPurchasingPower,
      flatFinalCorpus,
      stepUpAdvantageCorpus,
      investedPct,
      gainPct,
      trajectory,
    };
  }, [monthlySip, expectedReturnRate, horizonYears, annualStepUpPct, inflationRate]);

  const handlePrefillFromProfile = () => {
    if (userSnapshot.monthlySavings > 0) {
      setMonthlySip(userSnapshot.monthlySavings);
    }
  };

  const handleResetDefaults = () => {
    setMonthlySip(isINR ? 20000 : 800);
    setExpectedReturnRate(isINR ? 12.0 : 10.0);
    setHorizonYears(15);
    setAnnualStepUpPct(10);
    setInflationRate(isINR ? 6.0 : 3.0);
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
                Step-Up SIP & Compounding Wealth Projection Report
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-neutral-400">
            <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            <p>URL: firstbricks.in/sip-calculator/</p>
          </div>
        </div>
      </div>

      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Standalone SIP Wealth Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Independent Variables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Step-Up SIP & Inflation Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Calculate your long-term compounding maturity wealth with an annual step-up SIP and see the true purchasing power in today's money after inflation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto no-print">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Copy shareable link with current SIP parameters"
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

          {userSnapshot.monthlySavings > 0 && (
            <button
              type="button"
              onClick={handlePrefillFromProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prefill Profile SIP</span>
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
              <strong>Shareable link copied!</strong> Open anytime to restore these exact SIP and compounding inputs.
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
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Investment Parameters</h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Standalone & Live
            </span>
          </div>

          <div className="space-y-5">
            {/* Monthly SIP Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Initial Monthly SIP</label>
                <span className="text-sm font-black tabular-nums text-slate-900">{format(monthlySip)}</span>
              </div>
              <input
                type="number"
                step={isINR ? 1000 : 50}
                value={monthlySip}
                onChange={(e) => setMonthlySip(Math.max(100, Number(e.target.value) || 0))}
                className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />

              {/* Quick Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sipChips.map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setMonthlySip(chip.val)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer ${
                      monthlySip === chip.val
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Return Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Expected Annual Return (CAGR)</label>
                <span className="text-sm font-black tabular-nums text-emerald-700">{expectedReturnRate}%</span>
              </div>
              <input
                type="range"
                min={6}
                max={18}
                step={0.5}
                value={expectedReturnRate}
                onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>8% (Conservative Debt/Hybrid)</span>
                <span>12% (Nifty/S&P Index)</span>
                <span>16%</span>
              </div>
            </div>

            {/* Investment Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Investment Horizon</label>
                <span className="text-sm font-black tabular-nums text-slate-900">{horizonYears} Years</span>
              </div>
              <input
                type="range"
                min={1}
                max={35}
                step={1}
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>25 Yrs</span>
                <span>35 Yrs</span>
              </div>
            </div>

            {/* Step-Up Annual Increase */}
            <div className="space-y-2 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-700" />
                  <label className="text-xs font-bold text-emerald-950">Annual Step-Up (% / Year)</label>
                </div>
                <span className="text-sm font-black tabular-nums text-emerald-800">+{annualStepUpPct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={annualStepUpPct}
                onChange={(e) => setAnnualStepUpPct(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-white rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-emerald-800/80">
                <span>0% (Flat SIP)</span>
                <span>10% (Salary increment)</span>
                <span>20% (Aggressive)</span>
              </div>
            </div>

            {/* Inflation Adjustment Rate */}
            <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800">Expected Annual Inflation</label>
                <span className="text-sm font-black tabular-nums text-slate-900">{inflationRate}%</span>
              </div>
              <input
                type="range"
                min={2}
                max={10}
                step={0.5}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-slate-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>3% (Low)</span>
                <span>6% (India Long-term Average)</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS & REAL PURCHASING POWER (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Tranquil Scorecard */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-emerald-200/60">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Total Maturity Value (Nominal)
                </span>
                <div className="text-3xl font-black tabular-nums text-slate-900 mt-0.5">
                  {format(result.finalNominalCorpus, true)}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  At Year {horizonYears} ({expectedReturnRate}% CAGR)
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Real Purchasing Power</span>
                </div>
                <div className="text-3xl font-black tabular-nums text-emerald-800 mt-0.5">
                  {format(result.finalRealPurchasingPower, true)}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  In today's money (discounted for {inflationRate}% inflation)
                </span>
              </div>
            </div>

            {/* Quick 3 Pillar Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Total Invested</span>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                  {format(result.finalInvested, true)}
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Wealth Gained</span>
                <div className="text-sm sm:text-base font-extrabold text-emerald-800 tabular-nums">
                  +{format(result.finalWealthGain, true)}
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Step-Up Bonus</span>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                  +{format(result.stepUpAdvantageCorpus, true)}
                </div>
              </div>
            </div>

            {/* Visual Capital vs Growth Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-slate-700 h-full transition-all duration-300"
                  style={{ width: `${result.investedPct}%` }}
                  title={`Invested Capital: ${result.investedPct}%`}
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${result.gainPct}%` }}
                  title={`Compounded Gain: ${result.gainPct}%`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  Invested: {result.investedPct}% ({format(result.finalInvested, true)})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Gain: {result.gainPct}% ({format(result.finalWealthGain, true)})
                </span>
              </div>
            </div>
          </div>

          {/* Milestone Compounding Schedule */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Milestone Growth (Step-Up vs Inflation)
              </h3>
              <span className="text-xs text-slate-500 font-medium">{annualStepUpPct}% annual step-up</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="pb-2">Milestone</th>
                    <th className="pb-2">Invested</th>
                    <th className="pb-2">Nominal Wealth</th>
                    <th className="pb-2 text-emerald-700">Real Value (Today's ₹/$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.trajectory
                    .filter((t) => t.year % 5 === 0 || t.year === horizonYears)
                    .map((item) => (
                      <tr key={item.year} className="hover:bg-slate-50/60">
                        <td className="py-2.5 font-bold text-slate-900">Year {item.year}</td>
                        <td className="py-2.5 tabular-nums text-slate-600">{format(item.invested, true)}</td>
                        <td className="py-2.5 tabular-nums font-bold text-slate-900">
                          {format(item.nominalCorpus, true)}
                        </td>
                        <td className="py-2.5 tabular-nums font-extrabold text-emerald-800">
                          {format(item.realPurchasingPower, true)}
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
              <span>Key Compounding Takeaways</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                • <strong>The Power of Step-Up</strong>: Increasing your SIP by just {annualStepUpPct}% each year produces <strong className="text-slate-900">+{format(result.stepUpAdvantageCorpus, true)}</strong> more wealth than maintaining a flat SIP over {horizonYears} years.
              </p>
              <p>
                • <strong>Inflation Reality Check</strong>: While your bank account will show {format(result.finalNominalCorpus, true)}, its actual purchasing power in terms of groceries, rent, and education will equal <strong className="text-emerald-800">{format(result.finalRealPurchasingPower, true)}</strong> in today's money. Always plan for real returns!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
