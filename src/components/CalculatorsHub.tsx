import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import {
  Calculator,
  Home,
  TrendingUp,
  Scale,
  Zap,
  Compass,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface CalculatorsHubProps {
  onNavigate: (view: string) => void;
}

export const CalculatorsHub: React.FC<CalculatorsHubProps> = ({ onNavigate }) => {
  const { format, currency } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<'all' | 'loans' | 'wealth' | 'decisions'>('all');

  const allCalculators = [
    {
      id: 'prepay-vs-invest',
      category: 'loans',
      title: 'Prepay Home Loan vs. Invest in SIP Showdown',
      badge: 'VISUAL SHOWDOWN',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      tagline: 'Compare prepaying your mortgage early vs compounding in equity SIP side-by-side with post-debt redirect.',
      icon: Scale,
      highlight: 'Full net worth showdown & exact breakeven CAGR',
      type: '100% Standalone',
    },
    {
      id: 'home-loan',
      category: 'loans',
      title: 'Home Loan Step-Up EMI & Prepayment',
      badge: 'POPULAR',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      tagline: 'Calculate interest savings with 5–10% annual step-up EMI or 1 extra EMI per year.',
      icon: Home,
      highlight: 'Saves 40–60% interest & cuts tenure in half',
      type: '100% Standalone',
    },
    {
      id: 'sip-calculator',
      category: 'wealth',
      title: 'Step-Up SIP & Inflation Calculator',
      badge: 'WEALTH',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      tagline: 'Calculate maturity wealth with annual step-up SIP and real purchasing power after inflation.',
      icon: TrendingUp,
      highlight: 'Shows true purchasing power in today\'s money',
      type: '100% Standalone',
    },
    {
      id: 'health-check',
      category: 'decisions',
      title: 'Financial Health Check (6 Bricks)',
      badge: 'FLAGSHIP',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      tagline: 'Diagnose your balance sheet across all 6 building blocks and receive an actionable priority plan.',
      icon: Layers,
      highlight: 'Foundation Score (0-100) & cash runway',
      type: 'Central Diagnostic',
    },
    {
      id: 'affordability',
      category: 'decisions',
      title: 'Can I Afford This? (Purchase Engine)',
      badge: 'PURCHASE',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      tagline: 'Test a car, home renovation, or trip against emergency runway and 20-year opportunity cost.',
      icon: ShieldCheck,
      highlight: 'Evaluates cash flow & runway impact',
      type: '100% Standalone',
    },
    {
      id: 'debt-vs-invest',
      category: 'loans',
      title: 'Should I Pay Debt or Invest?',
      badge: 'ALLOCATION',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      tagline: 'Compare the guaranteed risk-free return of debt elimination against stock index compounding.',
      icon: Scale,
      highlight: 'Mathematical breakeven threshold',
      type: '100% Standalone',
    },
    {
      id: 'fire-engine',
      category: 'wealth',
      title: 'Retirement: Build to Utilise Calculator',
      badge: 'BUILD TO UTILISE',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      tagline: 'Model accumulation (step-up SIP & CAGR) and decumulation (inflation-linked withdrawals). See exact years your fund will last.',
      icon: Compass,
      highlight: 'Full lifecycle runway & depletion calculator',
      type: '100% Standalone',
    },
    {
      id: 'debt-payoff',
      category: 'loans',
      title: 'Debt Avalanche vs. Snowball',
      badge: 'PAYOFF',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      tagline: 'Organize multiple credit cards and loans to minimize total interest and accelerate freedom.',
      icon: Zap,
      highlight: 'Compare mathematical vs psychological speed',
      type: '100% Standalone',
    },
  ];

  const filteredCalculators = activeCategory === 'all' 
    ? allCalculators 
    : allCalculators.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Decision Support Suite</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Standalone & Transparent Math</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Personal Finance Calculators
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Every calculator is 100% standalone and private. Adjust any variable independently without affecting other tools, or prefill with your saved baseline with one tap.
          </p>
        </div>

        {/* In-Browser Privacy Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs font-semibold text-emerald-900 self-start md:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% In-Browser & Private</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/70 pb-4">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Standalone Calculators ({allCalculators.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('loans')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            activeCategory === 'loans'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Mortgages & Loans (3)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('wealth')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            activeCategory === 'wealth'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Wealth & SIP Compounding (2)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('decisions')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
            activeCategory === 'decisions'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Life Planning & Health Check (2)
        </button>
      </div>

      {/* Grid of Standalone Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <div
              key={calc.id}
              onClick={() => onNavigate(calc.id)}
              className="bg-white border border-slate-200/90 hover:border-slate-400 rounded-3xl p-6 transition-all duration-200 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-md flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {calc.type}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${calc.badgeColor}`}>
                      {calc.badge}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors tracking-tight">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {calc.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                <span className="text-[11px] text-slate-500 font-normal">{calc.highlight}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
