import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Scale,
  Compass,
  Zap,
  Lock,
  Layers,
  Sparkles,
  BookOpen,
  ChevronRight,
  Home,
  Calculator,
  Activity,
} from 'lucide-react';

interface HomeOverviewProps {
  onNavigate: (view: string) => void;
  onOpenMethodology: () => void;
  onOpenHealthGuide: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onNavigate,
  onOpenMethodology,
  onOpenHealthGuide,
}) => {
  const { format, currency, loadPresetProfile, userSnapshot } = useCurrency();
  const [activeTab, setActiveTab] = useState<'all' | 'diagnostics' | 'debt' | 'retirement' | 'guides'>('all');
  const [selectedPersona, setSelectedPersona] = useState<'starter' | 'family' | 'fire'>('family');
  const [primerOpen, setPrimerOpen] = useState(true);

  const isINR = currency === 'INR';

  const handleApplyPersona = (key: 'starter' | 'family' | 'fire') => {
    setSelectedPersona(key);
    loadPresetProfile(key);
  };

  const tools = [
    {
      id: 'prepay-vs-invest',
      category: 'debt',
      title: 'Prepay Home Loan vs. Invest in SIP',
      badge: 'VISUAL SHOWDOWN',
      tagline: 'Side-by-side comparison of loan prepayment vs equity SIP with post-debt redirect and breakeven CAGR.',
      icon: Scale,
      question: 'Should I put extra money toward my home loan or into an equity SIP?',
    },
    {
      id: 'home-loan',
      category: 'debt',
      title: 'Home Loan Step-Up & Combo Prepayment',
      badge: 'COMBO PREPAYMENT',
      tagline: 'See how a 5-10% annual step-up combined with extra monthly EMI cuts loan tenure by 10+ years and saves 50-70% interest.',
      icon: Home,
      question: 'How fast can I be mortgage-free by stepping up my EMI with extra prepayments?',
    },
    {
      id: 'sip-calculator',
      category: 'retirement',
      title: 'Step-Up SIP & Inflation Calculator',
      badge: 'NEW',
      tagline: 'Model annual step-up compounding and see the true inflation-adjusted purchasing power in today\'s money.',
      icon: TrendingUp,
      question: 'What will my future SIP corpus actually buy after inflation?',
    },
    {
      id: 'health-check',
      category: 'diagnostics',
      title: 'Financial Health Check',
      badge: 'Flagship Diagnostic',
      tagline: 'Get your Foundation Score (0-100) and an immediate 3-step priority roadmap.',
      icon: Layers,
      question: 'Am I financially healthy, and what exact step should I take next?',
    },
    {
      id: 'affordability',
      category: 'retirement',
      title: 'Can I Afford This?',
      badge: 'Purchase Simulator',
      tagline: 'Test a car, gadget, or trip against emergency cash and 20-year compounding opportunity cost.',
      icon: ShieldCheck,
      question: 'Can I comfortably afford this purchase without compromising my future?',
    },
    {
      id: 'debt-vs-invest',
      category: 'debt',
      title: 'Should I Pay Debt or Invest?',
      badge: 'Allocation Engine',
      tagline: 'Compare the guaranteed risk-free return of debt elimination against stock index compounding.',
      icon: Scale,
      question: 'Is it smarter to pay off my loan early or put surplus cash in index funds?',
    },
    {
      id: 'fire-engine',
      category: 'retirement',
      title: 'Retirement: Build to Utilise Calculator',
      badge: 'BUILD TO UTILISE',
      tagline: 'Model accumulation (step-up SIP & CAGR) and decumulation (inflation-adjusted pension). See exact years your fund will last.',
      icon: Compass,
      question: 'How many years will my retirement fund last with inflation-escalating withdrawals?',
    },
    {
      id: 'debt-payoff',
      category: 'debt',
      title: 'Debt Avalanche vs. Snowball',
      badge: 'Payoff Accelerator',
      tagline: 'Compare mathematical interest savings vs psychological momentum across multiple loans.',
      icon: Zap,
      question: 'Which sequence of debt payoff saves me the most money and gets me free faster?',
    },
    {
      id: 'calculators',
      category: 'diagnostics',
      title: 'Calculators & Financial Engines',
      badge: 'Full Suite',
      tagline: 'Access all standalone financial calculators in one unified, distraction-free directory.',
      icon: Calculator,
      question: 'Where can I explore all calculators and decision engines?',
    },
    {
      id: 'framework',
      category: 'guides',
      title: 'The 6 Financial Bricks',
      badge: 'Core Framework',
      tagline: 'The sequential architecture from Cash survival to Optimization.',
      icon: Sparkles,
      question: 'Why does personal finance order of operations matter?',
    },
    {
      id: 'articles',
      category: 'guides',
      title: 'Articles, Research & Math Models',
      badge: 'Quantitative Essays',
      tagline: 'In-depth financial essays on home loan prepayment velocity, step-up compounding, and FIRE math.',
      icon: BookOpen,
      question: 'What are the time-tested mathematical rules of thumb for money decisions?',
    },
  ];

  const filteredTools =
    activeTab === 'all'
      ? tools
      : tools.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. HERO SECTION: Modern, High-Converting Hero with Zero Redundant Logo */}
      <section className="relative pt-2 pb-10 sm:pt-4 sm:pb-14 border-b border-neutral-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Headline, Value Proposition & Action Triggers */}
          <div className="lg:col-span-7 space-y-6">
            {/* Sleek Trust Badge & Privacy Status */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-semibold text-slate-100">Product-Neutral Decision Engine</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-emerald-300 font-medium hidden sm:inline">100% Client-Side Privacy</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.12] text-balance">
                Turn your financial numbers into{' '}
                <span className="bg-gradient-to-r from-[#0B2545] via-slate-800 to-emerald-600 bg-clip-text text-transparent">
                  clear, confident decisions.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                Not a bank sales funnel or product affiliate site. First Bricks transforms your raw income, home loans, and savings into mathematical clarity, scenario stress-testing, and sequenced next steps.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenHealthGuide}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Run 2-Minute Health Check</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onNavigate('home-loan')}
                className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:border-neutral-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Home className="w-4 h-4 text-emerald-600" />
                <span>Home Loan Prepayment</span>
              </button>

              <button
                onClick={() => onNavigate('sip-calculator')}
                className="w-full sm:w-auto px-4 py-3.5 text-sm font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Step-Up SIP</span>
              </button>
            </div>

            {/* Quick Interactive Jump Chips */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Frequently Tested Decisions:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigate('home-loan')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🏠 Save ₹18L+ on Home Loan</span>
                </button>
                <button
                  onClick={() => onNavigate('sip-calculator')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>📈 Real Purchasing Power SIP</span>
                </button>
                <button
                  onClick={() => onNavigate('debt-vs-invest')}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>⚖️ Debt vs. Index Investing</span>
                </button>
                <button
                  onClick={() => onNavigate('fire-engine')}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🏖️ Coast FIRE Math</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Decision Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-900 to-[#0B1528] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
                    Decision Support Snapshot
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium border border-emerald-500/30">
                  Zero Logins
                </span>
              </div>

              {/* Metric Card 1 */}
              <div 
                onClick={() => onNavigate('home-loan')}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    Home Loan Step-Up Leverage
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Model this <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  5% Annual Step-Up saves <span className="text-emerald-400 font-extrabold">₹18.4 Lakhs</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  On a {isINR ? '₹50 Lakh' : '$60,000'} 20-year mortgage, cuts loan duration by <strong>7.2 years</strong> with zero lifestyle shock.
                </p>
              </div>

              {/* Metric Card 2 */}
              <div 
                onClick={() => onNavigate('sip-calculator')}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    Step-Up SIP & Inflation Math
                  </span>
                  <span className="text-[11px] text-blue-400 font-mono group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Model this <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  {isINR ? '₹15,000/mo' : '$200/mo'} + 10% Step-Up = <span className="text-blue-300 font-extrabold">{isINR ? '₹2.41 Cr' : '$312k'}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Calculates exact nominal corpus alongside true inflation-discounted purchasing power in today's currency.
                </p>
              </div>

              {/* Metric Card 3 */}
              <div 
                onClick={onOpenHealthGuide}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    The 6-Brick Health Sequence
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Take check <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  Foundation Score (0–100) + Priority Roadmap
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Diagnoses cash runway, pure term defense, and debt safety before optimizing stock investments.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  100% In-Browser Execution
                </span>
                <button
                  onClick={() => onNavigate('calculators')}
                  className="text-white hover:text-emerald-300 font-semibold underline text-xs cursor-pointer"
                >
                  View All 8 Tools →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 100% CLIENT-SIDE EXPLANATION CALLOUT */}
        <div className="mt-8 p-4 sm:p-5 bg-white border border-neutral-200 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 shrink-0 mt-0.5 border border-emerald-100">
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                <span>100% In-Browser Privacy Guarantee</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Zero Server Storage</span>
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
                Unlike banking apps that collect and store your salary data, First Bricks executes <strong>100% in your browser's local JavaScript</strong>. No databases, no user accounts required, zero telemetry tracking your private income. Everything stays strictly on your device.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenMethodology}
            className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 underline whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Read Our Methodology & Disclosures →
          </button>
        </div>
      </section>

      {/* 2. FIRST-TIME VISITOR PRIMER: "How First Bricks Works in 30 Seconds" */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Sparkles className="w-4 h-4 text-neutral-800" />
            <span>First-Time Visitor Guide</span>
          </div>
          <button
            onClick={() => setPrimerOpen(!primerOpen)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            {primerOpen ? 'Collapse' : 'Expand Guide'}
          </button>
        </div>

        {primerOpen && (
          <>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                How to Use This Site in 3 Simple Steps
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                You don't need a finance degree or hours of research. Here is how First Bricks solves your dilemma:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Choose Your Question</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Start with a clear life question: <em>"Can I afford this car?"</em>, <em>"Should I pay debt or invest?"</em>, or <em>"Am I financially healthy?"</em>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Enter a Few Facts</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Input 3 to 5 simple numbers (income, expenses, cash, debt). You can also click our <strong>Sample Demo Profiles</strong> below to test in 1 click!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Get an Unbiased Action Plan</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Receive an immediate Foundation Score, mathematical trade-offs, and your top 3 prioritized next steps. No product pitches.
                </p>
              </div>
            </div>

            {/* ONE-CLICK INTERACTIVE PRESET SELECTOR */}
            <div className="pt-4 border-t border-neutral-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-neutral-800">
                  Try with a realistic sample profile (1-Click Test):
                </span>
                <span className="text-[11px] text-neutral-500">
                  Updates your session data instantly
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleApplyPersona('starter')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPersona === 'starter'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">1. Starter (Age 24)</div>
                  <div className={`text-[11px] mt-0.5 ${selectedPersona === 'starter' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Early career, student debt, building cash buffer
                  </div>
                </button>

                <button
                  onClick={() => handleApplyPersona('family')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPersona === 'family'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">2. Family (Age 34)</div>
                  <div className={`text-[11px] mt-0.5 ${selectedPersona === 'family' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Dual income, home loan EMI, kid planning
                  </div>
                </button>

                <button
                  onClick={() => handleApplyPersona('fire')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPersona === 'fire'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">3. FIRE Seeker (Age 30)</div>
                  <div className={`text-[11px] mt-0.5 ${selectedPersona === 'fire' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Debt-free, 50%+ savings rate, Coast FIRE focus
                  </div>
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                <div>
                  <span className="font-semibold text-neutral-800">Active Profile Loaded: </span>
                  <span className="text-neutral-600">
                    Age {userSnapshot.age} · Monthly Income {format(userSnapshot.monthlyIncome)} · Debt {format(userSnapshot.totalDebt)} · Investments {format(userSnapshot.investments)}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('health-check')}
                  className="px-3.5 py-1.5 bg-neutral-900 text-white font-medium rounded-lg text-xs hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  View Profile in Health Check →
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* 3. SCALABLE TOOL DIRECTORY & CATEGORY HUB (Prepared for adding dozens of calculators & articles) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Decision Suite
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Calculators, Engines & Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
              Organized by financial priority. Every calculator operates 100% as a standalone decision engine with independent variables, while allowing you to prefill from your health check baseline with one click.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Tools (8)' },
              { id: 'diagnostics', label: 'Diagnostics' },
              { id: 'debt', label: 'Debt & Cash' },
              { id: 'retirement', label: 'Purchases & FIRE' },
              { id: 'guides', label: 'Guides & Math' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => onNavigate(t.id)}
                className="group bg-white border border-neutral-200 rounded-xl p-6 shadow-xs hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700">{t.badge}</span>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-800 transition-colors">
                    {t.title}
                  </h3>

                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100 my-3 text-xs text-neutral-700 italic">
                    "{t.question}"
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Decision Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. THE 6 BRICKS ARCHITECTURE PILLAR */}
      <section className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Structural Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Build Your Financial Life, One Brick at a Time
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Financial paralysis happens when people try to optimize taxes or pick stocks without securing emergency liquidity (Brick 1) or health protection (Brick 2). First Bricks ensures every brick rests on a rock-solid foundation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { num: 1, title: 'Cash', desc: 'Emergency runway & liquidity' },
            { num: 2, title: 'Protection', desc: 'Health & pure term defense' },
            { num: 3, title: 'Debt', desc: 'Eradicate toxic high-APR debt' },
            { num: 4, title: 'Investing', desc: 'Automated index compounding' },
            { num: 5, title: 'Goals', desc: 'Milestones & capital allocation' },
            { num: 6, title: 'Optimization', desc: 'Tax minimization & rebalance' },
          ].map((b) => (
            <div
              key={b.num}
              onClick={() => onNavigate('framework')}
              className="bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700 rounded-xl p-4 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-neutral-400">
                  BRICK {b.num}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{b.title}</h4>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 leading-snug">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRANSPARENCY & METHODOLOGY TEASER */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Open Methodology
          </span>
          <h3 className="text-lg font-bold text-neutral-900">
            Mathematical Integrity & Open Assumptions
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            All formula models (Trinity Study 4% rule, opportunity cost compounding, debt avalanche order) are fully transparent. Read our mathematical methodology and run scenarios in our dedicated calculators.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => onNavigate('calculators')}
            className="px-4 py-2.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Explore Calculators
          </button>
          <button
            onClick={onOpenMethodology}
            className="px-4 py-2.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-neutral-200"
          >
            Disclosures & Math
          </button>
        </div>
      </section>
    </div>
  );
};
