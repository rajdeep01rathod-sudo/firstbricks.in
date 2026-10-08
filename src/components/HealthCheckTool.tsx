import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateFinancialHealth } from '../utils/financeEngine';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  Printer,
  Share2,
  Sparkles,
  RefreshCw,
  Plus,
  Minus,
  HelpCircle,
  Lock,
  ChevronDown,
} from 'lucide-react';

export const HealthCheckTool: React.FC<{ onNavigateToTool: (tool: string) => void }> = ({ onNavigateToTool }) => {
  const { userSnapshot, updateUserSnapshot, format, currency, loadPresetProfile, resetSnapshot } = useCurrency();

  // Scenario toggle: base, optimistic (+15% savings), or stress (-20% income)
  const [activeScenario, setActiveScenario] = useState<'base' | 'optimistic' | 'stress'>('base');
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [guideExpanded, setGuideExpanded] = useState(false);

  // Compute effective input based on scenario
  const scenarioInput = useMemo(() => {
    const base = { ...userSnapshot };
    if (activeScenario === 'optimistic') {
      return {
        ...base,
        monthlySavings: Math.round(base.monthlySavings * 1.25),
        monthlyIncome: Math.round(base.monthlyIncome * 1.1),
      };
    }
    if (activeScenario === 'stress') {
      return {
        ...base,
        monthlyIncome: Math.round(base.monthlyIncome * 0.8),
        cashSavings: Math.max(0, base.cashSavings - base.monthlyExpenses * 1.5),
      };
    }
    return base;
  }, [userSnapshot, activeScenario]);

  const result = useMemo(() => {
    return calculateFinancialHealth(scenarioInput);
  }, [scenarioInput]);

  const handleShare = () => {
    const text = `My First Bricks Foundation Score: ${result.foundationScore}/100 with ${result.emergencyRunwayMonths.toFixed(1)} months cash runway and ${result.savingsRatePercent.toFixed(0)}% savings rate. Tested on firstbricks.in`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isINR = currency === 'INR';
  const incomeStep = isINR ? 5000 : 250;
  const cashStep = isINR ? 10000 : 500;

  return (
    <div className="space-y-8">
      {/* 1. Header & Value Proposition */}
      <div className="border-b border-neutral-200 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <span>Flagship Diagnostic</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-emerald-800">
                <Lock className="w-3 h-3 text-emerald-600" /> 100% In-Browser Private
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Financial Health Check
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Enter your real financial numbers (or tap a sample profile below) to diagnose strengths, identify vulnerabilities, and receive an actionable 3-step priority plan. These numbers establish your baseline profile.
            </p>
          </div>

          <div className="flex items-center gap-2 no-print self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export Plan</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{copiedNotice ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Standalone calculators & baseline note */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5 no-print">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold">Central Baseline Profile:</span>
            <p className="text-[11px] text-emerald-800">
              Numbers entered here establish your baseline profile. All individual calculators (Home Loan, Step-Up SIP, Affordability, Debt vs Invest, FIRE) function 100% as standalone tools with independent variables, but you can tap <span className="font-semibold underline">"Prefill Profile"</span> on any calculator to bring these numbers in instantly.
            </p>
          </div>
        </div>

        {/* 1-CLICK SAMPLE DEMO PROFILES (Great for first-time visitors!) */}
        <div className="p-3 bg-neutral-100/80 rounded-xl border border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-2.5 no-print">
          <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
            <span>Try with a Demo Profile:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => loadPresetProfile('starter')}
              className="px-2.5 py-1 text-xs font-medium bg-white text-neutral-800 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              🎓 Starter (Age 24)
            </button>
            <button
              onClick={() => loadPresetProfile('family')}
              className="px-2.5 py-1 text-xs font-medium bg-white text-neutral-800 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              🏡 Family (Age 34)
            </button>
            <button
              onClick={() => loadPresetProfile('fire')}
              className="px-2.5 py-1 text-xs font-medium bg-white text-neutral-800 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              🚀 FIRE Seeker (Age 30)
            </button>
            <button
              onClick={resetSnapshot}
              className="px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              title="Reset to default numbers"
            >
              <RefreshCw className="w-3 h-3 inline mr-1" />
              Reset
            </button>
          </div>
        </div>

        {/* Educational Accordion: How to Understand Your Health Check */}
        <div className="bg-white border border-neutral-200 rounded-xl p-3.5 sm:p-4 text-xs space-y-2 no-print">
          <button
            onClick={() => setGuideExpanded(!guideExpanded)}
            className="w-full flex items-center justify-between font-bold text-neutral-900 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-neutral-500" />
              <span>How to Understand Your Diagnostic (30-second guide)</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform ${
                guideExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {guideExpanded && (
            <div className="pt-2 text-neutral-600 space-y-2 border-t border-neutral-100 leading-relaxed">
              <p>
                <strong>1. Foundation Score (0-100):</strong> A weighted benchmark of your financial resilience across all 6 building blocks. Scores $\ge 80$ represent fortress-grade stability; $60-79$ indicates healthy momentum with minor gaps; and $&lt; 60$ signals urgent balance-sheet vulnerabilities.
              </p>
              <p>
                <strong>2. Cash Runway:</strong> The number of months your household could survive on existing cash savings if your income dropped to zero tomorrow. 3 months is the absolute safety line; 6 months is fortress-grade.
              </p>
              <p>
                <strong>3. Sequential Action:</strong> You don't need to fix everything at once. Focus strictly on your <strong>Top 3 Recommended Priorities</strong> first.
              </p>
            </div>
          )}
        </div>

        {/* Scenario Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 no-print">
          <span className="text-xs font-medium text-neutral-500 mr-1">Scenario Mode:</span>
          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg border border-neutral-200">
            <button
              onClick={() => setActiveScenario('base')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeScenario === 'base'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Current Reality
            </button>
            <button
              onClick={() => setActiveScenario('optimistic')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeScenario === 'optimistic'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              +25% Savings Boost
            </button>
            <button
              onClick={() => setActiveScenario('stress')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeScenario === 'stress'
                  ? 'bg-white text-rose-800 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              -20% Income Shock
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Clean Financial Inputs with Steppers (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs no-print">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h2 className="text-base font-semibold text-neutral-900">Your Numbers</h2>
            <span className="text-xs text-neutral-500 font-mono">100% In-Browser</span>
          </div>

          <div className="space-y-4">
            {/* Income with Stepper */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-neutral-700">Monthly Income (Take-Home)</label>
                <span className="text-xs font-bold tabular-nums text-neutral-900">{format(userSnapshot.monthlyIncome)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    updateUserSnapshot({
                      monthlyIncome: Math.max(0, userSnapshot.monthlyIncome - incomeStep),
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 shrink-0 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  step={incomeStep}
                  value={userSnapshot.monthlyIncome}
                  onChange={(e) =>
                    updateUserSnapshot({ monthlyIncome: Number(e.target.value) || 0 })
                  }
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateUserSnapshot({
                      monthlyIncome: userSnapshot.monthlyIncome + incomeStep,
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Expenses with Stepper */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-neutral-700">Monthly Expenses (Living & Rent)</label>
                <span className="text-xs font-bold tabular-nums text-neutral-900">{format(userSnapshot.monthlyExpenses)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    updateUserSnapshot({
                      monthlyExpenses: Math.max(0, userSnapshot.monthlyExpenses - incomeStep),
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 shrink-0 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  step={incomeStep}
                  value={userSnapshot.monthlyExpenses}
                  onChange={(e) =>
                    updateUserSnapshot({ monthlyExpenses: Number(e.target.value) || 0 })
                  }
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateUserSnapshot({
                      monthlyExpenses: userSnapshot.monthlyExpenses + incomeStep,
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Cash Savings & Monthly Investments */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Cash & Bank Buffer
                </label>
                <input
                  type="number"
                  step={cashStep}
                  value={userSnapshot.cashSavings}
                  onChange={(e) =>
                    updateUserSnapshot({ cashSavings: Number(e.target.value) || 0 })
                  }
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-2.5 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Monthly Savings / SIP
                </label>
                <input
                  type="number"
                  step={incomeStep}
                  value={userSnapshot.monthlySavings}
                  onChange={(e) =>
                    updateUserSnapshot({ monthlySavings: Number(e.target.value) || 0 })
                  }
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-2.5 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Debt Block */}
            <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-800">Debt & Liabilities</span>
                <span className="text-[11px] text-neutral-500">Loans, Credit Cards, EMIs</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-neutral-600 mb-0.5">Total Debt</label>
                  <input
                    type="number"
                    step={cashStep}
                    value={userSnapshot.totalDebt}
                    onChange={(e) =>
                      updateUserSnapshot({ totalDebt: Number(e.target.value) || 0 })
                    }
                    className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-md px-2 py-1.5 bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-600 mb-0.5">Avg APR %</label>
                  <input
                    type="number"
                    step={0.5}
                    value={userSnapshot.debtInterestRate}
                    onChange={(e) =>
                      updateUserSnapshot({ debtInterestRate: Number(e.target.value) || 0 })
                    }
                    className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-md px-2 py-1.5 bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-600 mb-0.5">Monthly EMI</label>
                  <input
                    type="number"
                    step={100}
                    value={userSnapshot.monthlyDebtPayment}
                    onChange={(e) =>
                      updateUserSnapshot({ monthlyDebtPayment: Number(e.target.value) || 0 })
                    }
                    className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-md px-2 py-1.5 bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Investments & Age */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Stocks / PF / Mutual Funds
                </label>
                <input
                  type="number"
                  step={cashStep}
                  value={userSnapshot.investments}
                  onChange={(e) =>
                    updateUserSnapshot({ investments: Number(e.target.value) || 0 })
                  }
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-2.5 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Your Age
                </label>
                <input
                  type="number"
                  min={18}
                  max={80}
                  value={userSnapshot.age}
                  onChange={(e) => updateUserSnapshot({ age: Number(e.target.value) || 25 })}
                  className="w-full text-xs font-semibold tabular-nums border border-neutral-200 rounded-lg px-2.5 py-2 bg-neutral-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Insurance Protections */}
            <div className="pt-2 border-t border-neutral-100">
              <label className="block text-xs font-medium text-neutral-700 mb-2">
                Protection Check (Brick 2)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userSnapshot.hasHealthInsurance}
                    onChange={(e) =>
                      updateUserSnapshot({ hasHealthInsurance: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Active Personal Health Insurance</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userSnapshot.hasTermLifeInsurance}
                    onChange={(e) =>
                      updateUserSnapshot({ hasTermLifeInsurance: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Pure Term Life Cover (10x-15x annual income)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnostic Results, 6-Bricks & Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Score & Vital Signs Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Overall Health Diagnostic
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
                  Financial Foundation Score
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Evaluated across the 6 core financial building blocks
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-extrabold tracking-tight tabular-nums text-neutral-900">
                    {result.foundationScore}
                    <span className="text-lg font-normal text-neutral-400">/100</span>
                  </div>
                  <div className="text-xs font-medium text-neutral-600">
                    {result.foundationScore >= 80
                      ? 'Fortress Grade'
                      : result.foundationScore >= 60
                      ? 'Building Momentum'
                      : 'Needs Reinforcement'}
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs Metric Row (Responsive Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
              <div className="p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg">
                <div className="text-xs text-neutral-500 mb-0.5">Cash Runway</div>
                <div className="text-base sm:text-lg font-bold tabular-nums text-neutral-900">
                  {result.emergencyRunwayMonths.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-neutral-500">mos</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  {result.emergencyRunwayMonths >= 6
                    ? 'Fortress (6m)'
                    : result.emergencyRunwayMonths >= 3
                    ? 'Healthy (3m)'
                    : 'Critical gap'}
                </div>
              </div>

              <div className="p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg">
                <div className="text-xs text-neutral-500 mb-0.5">Savings Rate</div>
                <div className="text-base sm:text-lg font-bold tabular-nums text-neutral-900">
                  {result.savingsRatePercent.toFixed(0)}%
                </div>
                <div className="text-[11px] text-neutral-500">
                  {result.savingsRatePercent >= 20 ? 'Optimal (>=20%)' : 'Below 20% mark'}
                </div>
              </div>

              <div className="p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg">
                <div className="text-xs text-neutral-500 mb-0.5">Debt-to-Income</div>
                <div className="text-base sm:text-lg font-bold tabular-nums text-neutral-900">
                  {result.debtToIncomePercent.toFixed(0)}%
                </div>
                <div className="text-[11px] text-neutral-500">
                  {result.debtToIncomePercent <= 20
                    ? 'Safe (<20%)'
                    : result.debtToIncomePercent <= 35
                    ? 'Moderate'
                    : 'Overextended'}
                </div>
              </div>

              <div className="p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg">
                <div className="text-xs text-neutral-500 mb-0.5">Net Worth</div>
                <div className="text-base sm:text-lg font-bold tabular-nums text-neutral-900 truncate">
                  {format(result.netWorth, true)}
                </div>
                <div className="text-[11px] text-neutral-500">
                  {result.netWorth >= 0 ? 'Positive balance' : 'Negative balance'}
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Prioritized Next Actions */}
          <div className="bg-neutral-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Actionable Strategy
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Your Top 3 Recommended Priorities
                </h3>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">Immediate Roadmap</span>
            </div>

            <div className="space-y-3 pt-4">
              {result.topPriorities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-800/80 rounded-lg p-3.5 sm:p-4 border border-neutral-700/60 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-700 text-neutral-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h4>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {item.impact === 'critical' ? 'Urgent' : 'Priority'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{item.description}</p>
                    <div className="text-xs font-medium text-emerald-400 pt-0.5">
                      Next Step: {item.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The 6 Financial Bricks Progress Matrix */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Methodology Review
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  The 6 Financial Bricks Status
                </h3>
              </div>
              <button
                onClick={() => onNavigateToTool('framework')}
                className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Framework Details <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {result.bricks.map((brick) => {
                const isSolid = brick.status === 'solid';
                const isInProgress = brick.status === 'in_progress';

                return (
                  <div
                    key={brick.id}
                    className="p-3.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-900">
                            Brick {brick.number}
                          </span>
                          <span className="text-xs font-semibold text-neutral-700">
                            {brick.name}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] font-medium ${
                            isSolid
                              ? 'text-emerald-700'
                              : isInProgress
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {isSolid ? 'Solid' : isInProgress ? 'In Progress' : 'At Risk'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 line-clamp-2 mb-2">
                        {brick.actionRequired}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">{brick.metricLabel}:</span>
                      <span className="font-semibold tabular-nums text-neutral-900">
                        {brick.metricValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
