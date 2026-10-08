import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateAffordability } from '../utils/financeEngine';
import { AffordabilityInput, FinancialSnapshotInput } from '../types/finance';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Wallet,
  Car,
  Plane,
  Laptop,
  Home as HomeIcon,
  HelpCircle,
  Percent,
} from 'lucide-react';

export const AffordabilityTool: React.FC = () => {
  const { userSnapshot, format, currency } = useCurrency();
  const isINR = currency === 'INR';

  // 100% STANDALONE STATE:
  // Initialized with saved profile defaults if present, but fully editable as local variables!
  const defaultIncome = isINR ? (userSnapshot.monthlyIncome || 120000) : (userSnapshot.monthlyIncome || 7500);
  const defaultExpenses = isINR ? (userSnapshot.monthlyExpenses || 55000) : (userSnapshot.monthlyExpenses || 4000);
  const defaultSavings = isINR ? (userSnapshot.cashSavings || 300000) : (userSnapshot.cashSavings || 20000);
  const defaultDebtPayment = isINR ? (userSnapshot.monthlyDebtPayment || 12000) : (userSnapshot.monthlyDebtPayment || 600);

  // Standalone financial profile variables
  const [monthlyIncome, setMonthlyIncome] = useState<number>(defaultIncome);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(defaultExpenses);
  const [cashSavings, setCashSavings] = useState<number>(defaultSavings);
  const [existingMonthlyDebt, setExistingMonthlyDebt] = useState<number>(defaultDebtPayment);

  // Standalone purchase variables
  const defaultCost = isINR ? 800000 : 35000;
  const defaultDown = isINR ? 200000 : 7000;
  const defaultStep = isINR ? 25000 : 1000;

  const [purchase, setPurchase] = useState<AffordabilityInput>({
    purchaseName: isINR ? 'Mid-size Car / EV' : 'New Vehicle / EV',
    purchaseCost: defaultCost,
    paymentType: 'financed',
    downPayment: defaultDown,
    loanTermMonths: 48,
    loanInterestRate: 9.5,
    monthlyMaintenanceCost: isINR ? 6000 : 250,
  });

  // Effective standalone financial snapshot constructed locally
  const effectiveSnapshot: FinancialSnapshotInput = useMemo(() => {
    return {
      age: userSnapshot.age || 30,
      monthlyIncome: Math.max(0, monthlyIncome),
      monthlyExpenses: Math.max(0, monthlyExpenses),
      essentialExpenses: Math.round(monthlyExpenses * 0.75),
      cashSavings: Math.max(0, cashSavings),
      totalDebt: userSnapshot.totalDebt || 0,
      debtInterestRate: userSnapshot.debtInterestRate || 10,
      monthlyDebtPayment: Math.max(0, existingMonthlyDebt),
      investments: userSnapshot.investments || 0,
      monthlySavings: Math.max(0, monthlyIncome - monthlyExpenses - existingMonthlyDebt),
      hasHealthInsurance: true,
      hasTermLifeInsurance: true,
      primaryGoal: 'emergency_fund',
    };
  }, [monthlyIncome, monthlyExpenses, cashSavings, existingMonthlyDebt, userSnapshot]);

  // Run calculation
  const result = useMemo(() => {
    return calculateAffordability(effectiveSnapshot, purchase);
  }, [effectiveSnapshot, purchase]);

  // Sync / Prefill from Saved Baseline
  const handlePrefillFromProfile = () => {
    setMonthlyIncome(userSnapshot.monthlyIncome || defaultIncome);
    setMonthlyExpenses(userSnapshot.monthlyExpenses || defaultExpenses);
    setCashSavings(userSnapshot.cashSavings || defaultSavings);
    setExistingMonthlyDebt(userSnapshot.monthlyDebtPayment || defaultDebtPayment);
  };

  // Reset to default sample numbers
  const handleResetDefaults = () => {
    setMonthlyIncome(isINR ? 120000 : 7500);
    setMonthlyExpenses(isINR ? 55000 : 4000);
    setCashSavings(isINR ? 300000 : 20000);
    setExistingMonthlyDebt(isINR ? 12000 : 600);
    setPurchase({
      purchaseName: isINR ? 'Mid-size Car / EV' : 'New Vehicle / EV',
      purchaseCost: isINR ? 800000 : 35000,
      paymentType: 'financed',
      downPayment: isINR ? 200000 : 7000,
      loanTermMonths: 48,
      loanInterestRate: 9.5,
      monthlyMaintenanceCost: isINR ? 6000 : 250,
    });
  };

  // Verdict design tokens (soothing, calm, non-jarring)
  const verdictTheme = {
    yes: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200/90',
      text: 'text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300/80',
      icon: CheckCircle2,
      label: 'Comfortably Affordable',
      desc: result.headline || 'Your emergency runway remains safely funded, and monthly cash flow stays positive without jeopardizing compounding wealth.',
    },
    caution: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200/90',
      text: 'text-amber-900',
      badge: 'bg-amber-100 text-amber-800 border-amber-300/80',
      icon: AlertTriangle,
      label: 'Financial Stretch',
      desc: result.headline || 'You can technically manage this purchase, but it significantly compresses your monthly margin or cuts emergency runway below optimal safety.',
    },
    no: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200/90',
      text: 'text-rose-900',
      badge: 'bg-rose-100 text-rose-800 border-rose-300/80',
      icon: AlertCircle,
      label: 'High Financial Strain',
      desc: result.headline || 'This purchase drains your emergency buffer or turns your monthly cash flow negative. Postponing or downsizing is strongly recommended.',
    },
  }[result.isAffordable];

  const VerdictIcon = verdictTheme.icon;

  // Monthly surplus before vs after
  const surplusBefore = Math.max(0, monthlyIncome - monthlyExpenses - existingMonthlyDebt);
  const monthlyImpact = result.cashFlowImpactMonthly;
  const surplusAfter = surplusBefore - monthlyImpact;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Standalone Decision Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Independent Variables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Can I Afford This Purchase?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Move beyond your bank balance today. Test whether a major purchase compromises your emergency runway, strains monthly cash flow, or forfeits long-term compounding.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handlePrefillFromProfile}
            title="Autofill income and expenses from your saved profile"
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

      {/* Quick Scenario Preset Chips */}
      <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Quick Test Scenarios:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPurchase({
                purchaseName: isINR ? 'Mid-size Car / EV' : 'New Vehicle / EV',
                purchaseCost: isINR ? 850000 : 35000,
                paymentType: 'financed',
                downPayment: isINR ? 200000 : 7000,
                loanTermMonths: 48,
                loanInterestRate: 9.5,
                monthlyMaintenanceCost: isINR ? 6000 : 250,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              purchase.purchaseCost === (isINR ? 850000 : 35000)
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Vehicle ({format(isINR ? 850000 : 35000, true)})</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setPurchase({
                purchaseName: isINR ? 'Home Interior / Renovation' : 'Home Upgrade',
                purchaseCost: isINR ? 450000 : 18000,
                paymentType: 'one_time',
                downPayment: 0,
                loanTermMonths: 0,
                loanInterestRate: 0,
                monthlyMaintenanceCost: 0,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              purchase.purchaseCost === (isINR ? 450000 : 18000)
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Home Renovation ({format(isINR ? 450000 : 18000, true)})</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setPurchase({
                purchaseName: isINR ? 'International Family Vacation' : 'Overseas Vacation',
                purchaseCost: isINR ? 250000 : 6000,
                paymentType: 'one_time',
                downPayment: 0,
                loanTermMonths: 0,
                loanInterestRate: 0,
                monthlyMaintenanceCost: 0,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              purchase.purchaseCost === (isINR ? 250000 : 6000)
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Vacation ({format(isINR ? 250000 : 6000, true)})</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setPurchase({
                purchaseName: isINR ? 'Pro Laptop & Creative Gear' : 'Workstation Gear',
                purchaseCost: isINR ? 150000 : 3200,
                paymentType: 'one_time',
                downPayment: 0,
                loanTermMonths: 0,
                loanInterestRate: 0,
                monthlyMaintenanceCost: 0,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              purchase.purchaseCost === (isINR ? 150000 : 3200)
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Pro Gear ({format(isINR ? 150000 : 3200, true)})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: STANDALONE INPUTS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section A: Your Financial Baseline */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">1. Your Financial Baseline</h2>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                100% Editable
              </span>
            </div>

            <div className="space-y-4">
              {/* Monthly In-Hand Income */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Monthly In-Hand Income</label>
                  <span className="text-xs font-bold tabular-nums text-slate-900">{format(monthlyIncome)}</span>
                </div>
                <input
                  type="number"
                  step={isINR ? 5000 : 250}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Monthly Living Expenses */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Monthly Living Expenses</label>
                  <span className="text-xs font-bold tabular-nums text-slate-900">{format(monthlyExpenses)}</span>
                </div>
                <input
                  type="number"
                  step={isINR ? 2500 : 200}
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Liquid Cash Savings */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Liquid Cash & Bank Savings</label>
                  <span className="text-xs font-bold tabular-nums text-slate-900">{format(cashSavings)}</span>
                </div>
                <input
                  type="number"
                  step={isINR ? 25000 : 1000}
                  value={cashSavings}
                  onChange={(e) => setCashSavings(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Current emergency buffer: {(cashSavings / (monthlyExpenses || 1)).toFixed(1)} months
                </p>
              </div>

              {/* Existing Monthly Debt EMI */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Existing Monthly Debt EMIs</label>
                  <span className="text-xs font-bold tabular-nums text-slate-900">{format(existingMonthlyDebt)}</span>
                </div>
                <input
                  type="number"
                  step={isINR ? 1000 : 50}
                  value={existingMonthlyDebt}
                  onChange={(e) => setExistingMonthlyDebt(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section B: Purchase Parameters */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">2. Purchase Specifications</h2>
              <span className="text-xs text-slate-500 font-medium">{purchase.purchaseName}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item or Goal Description
                </label>
                <input
                  type="text"
                  value={purchase.purchaseName}
                  onChange={(e) => setPurchase({ ...purchase, purchaseName: e.target.value })}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  placeholder="e.g. Electric Vehicle, Vacation, Home Studio"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Total Purchase Price</label>
                  <span className="text-sm font-extrabold tabular-nums text-slate-900">{format(purchase.purchaseCost)}</span>
                </div>
                <input
                  type="number"
                  step={defaultStep}
                  value={purchase.purchaseCost}
                  onChange={(e) =>
                    setPurchase({ ...purchase, purchaseCost: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Funding Type Segmented Bar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPurchase({ ...purchase, paymentType: 'financed' })}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      purchase.paymentType === 'financed'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Financed / Loan EMI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurchase({ ...purchase, paymentType: 'one_time' })}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      purchase.paymentType === 'one_time'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    100% Upfront Cash
                  </button>
                </div>
              </div>

              {purchase.paymentType === 'financed' && (
                <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Payment</label>
                      <input
                        type="number"
                        step={defaultStep}
                        value={purchase.downPayment}
                        onChange={(e) =>
                          setPurchase({
                            ...purchase,
                            downPayment: Math.max(0, Number(e.target.value) || 0),
                          })
                        }
                        className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Loan Term (Months)</label>
                      <input
                        type="number"
                        value={purchase.loanTermMonths}
                        onChange={(e) =>
                          setPurchase({
                            ...purchase,
                            loanTermMonths: Math.max(1, Number(e.target.value) || 12),
                          })
                        }
                        className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Loan APR Rate %</label>
                      <input
                        type="number"
                        step={0.25}
                        value={purchase.loanInterestRate}
                        onChange={(e) =>
                          setPurchase({
                            ...purchase,
                            loanInterestRate: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Monthly Maintenance</label>
                      <input
                        type="number"
                        step={isINR ? 500 : 25}
                        value={purchase.monthlyMaintenanceCost}
                        onChange={(e) =>
                          setPurchase({
                            ...purchase,
                            monthlyMaintenanceCost: Number(e.target.value) || 0,
                          })
                        }
                        className="w-full text-xs font-bold tabular-nums border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SOOTHING DECISION REPORT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Tranquil Verdict Card */}
          <div className={`${verdictTheme.bg} border ${verdictTheme.border} rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${verdictTheme.badge}`}>
                  <VerdictIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Decision Verdict (Score: {result.score}/100)
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-black ${verdictTheme.text}`}>
                    {verdictTheme.label}
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 font-medium">Estimated Monthly Impact</span>
                <div className="text-lg font-black text-slate-900 tabular-nums">
                  +{format(monthlyImpact)}/mo
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {verdictTheme.desc}
            </p>

            {/* Quick 3 Pillar Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/60">
              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-slate-200/50">
                <span className="text-[11px] text-slate-500 font-medium">Runway Post-Purchase</span>
                <div className="text-base font-extrabold text-slate-900 tabular-nums mt-0.5">
                  {result.remainingRunwayMonths.toFixed(1)} months
                </div>
                <span className={`text-[10px] font-semibold ${result.remainingRunwayMonths >= 4 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {result.remainingRunwayMonths >= 6 ? '✓ Robust (6+ mo)' : result.remainingRunwayMonths >= 4 ? 'Moderate' : '⚠️ Below 4 months'}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-slate-200/50">
                <span className="text-[11px] text-slate-500 font-medium">Monthly Surplus Left</span>
                <div className={`text-base font-extrabold tabular-nums mt-0.5 ${surplusAfter >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                  {format(surplusAfter)}
                </div>
                <span className={`text-[10px] font-semibold ${surplusAfter > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {surplusAfter > 0 ? `Was ${format(surplusBefore)}` : '⚠️ Deficit cash flow'}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-slate-200/50">
                <span className="text-[11px] text-slate-500 font-medium">10-Yr Opportunity Cost</span>
                <div className="text-base font-extrabold text-slate-900 tabular-nums mt-0.5">
                  {format(result.opportunityCost10Years, true)}
                </div>
                <span className="text-[10px] text-slate-500">If invested at 11% CAGR</span>
              </div>
            </div>
          </div>

          {/* Detailed Decision Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cash Flow Impact Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Monthly Cash Flow
                </h4>
                <Percent className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Net Income:</span>
                  <span className="font-semibold tabular-nums text-slate-900">{format(monthlyIncome)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Existing Commitments:</span>
                  <span className="font-semibold tabular-nums text-slate-900">-{format(monthlyExpenses + existingMonthlyDebt)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">New Purchase EMI + Upkeep:</span>
                  <span className="font-semibold tabular-nums text-rose-600">-{format(monthlyImpact)}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800">Remaining Buffer:</span>
                  <span className={`tabular-nums ${surplusAfter >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {format(surplusAfter)}/mo
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-1">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      surplusAfter >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(0, ((monthlyIncome - surplusAfter) / (monthlyIncome || 1)) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Committed Outflow</span>
                  <span>{((Math.max(0, monthlyIncome - surplusAfter) / (monthlyIncome || 1)) * 100).toFixed(0)}% of income</span>
                </div>
              </div>
            </div>

            {/* Opportunity Cost Compounding Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Compounding Trade-off
                </h4>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Purchase Total Cost:</span>
                  <span className="font-semibold tabular-nums text-slate-900">{format(purchase.purchaseCost)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">In 10 Years (Index Fund):</span>
                  <span className="font-bold tabular-nums text-slate-900">{format(result.opportunityCost10Years)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">In 20 Years (Index Fund):</span>
                  <span className="font-bold tabular-nums text-emerald-700">{format(result.opportunityCost20Years)}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 leading-tight">
                Every {format(isINR ? 100000 : 1000)} spent today is worth ~{format(isINR ? 284000 : 2840)} in 10 years at historical equity returns.
              </p>
            </div>
          </div>

          {/* Actionable Recommendations / Remedies */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Next Steps & Remedies</span>
            </h4>

            <div className="space-y-3">
              {(result.remedyOptions.length > 0 ? result.remedyOptions : result.keyConcerns).map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
