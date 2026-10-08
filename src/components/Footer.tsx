import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenMethodology?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMethodology }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-14 border-t border-neutral-800 no-print mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid with All Tab Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand & Architecture */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left cursor-pointer focus:outline-none block"
              title="First Bricks Home"
            >
              <BrandLogo size="md" showWordmark={true} variant="dark" />
            </button>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Product-neutral personal finance decision engine and sequential wealth architecture. 
              Transparent formulas, stress-tested scenario planning, and 100% in-browser privacy.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded bg-neutral-800/80 text-emerald-400 border border-neutral-700/60">
                100% Client-Side Privacy
              </span>
              <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                Product-Neutral
              </span>
              <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                Empirical Math
              </span>
            </div>
          </div>

          {/* Column 2: Decision Engines & Calculators */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Calculators & Engines
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('health-check')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Financial Health Check
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prepay-vs-invest')}
                  className="hover:text-white transition-colors cursor-pointer text-left block font-medium text-emerald-400"
                >
                  Prepay vs. Invest Showdown
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home-loan')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Home Loan Prepayment & Step-Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sip-calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Step-Up SIP & Compounding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('debt-vs-invest')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Debt vs. Invest Decision Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fire-engine')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Retirement: Build to Utilise Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('debt-payoff')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Debt Avalanche vs. Snowball
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('affordability')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Can I Afford This? Simulator
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('calculators')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>Explore Calculators Hub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Case Studies & Quantitative Research */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Articles & Case Studies
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('article:home-loan-prepayment-strategy')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Home Loan Prepayment Strategy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article:step-up-sip-compounding-inflation-math')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Step-Up SIP & Inflation Reality
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article:debt-vs-investing-breakeven')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Debt vs. Investing Breakeven
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article:coast-fire-mathematics')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Coast FIRE Mathematics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article:car-affordability-20-4-10-rule')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  20/4/10 Car Affordability Rule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article:rent-vs-buy-five-percent')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  5% Rule: Rent vs. Buy Analysis
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('articles')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>All Research & Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Framework & Support Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Framework & Navigation
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('framework')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  The 6 Financial Bricks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Calculators Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Articles & Guides
                </button>
              </li>
              {onOpenMethodology && (
                <li>
                  <button
                    onClick={onOpenMethodology}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    Assumptions & Methodology
                  </button>
                </li>
              )}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition-colors cursor-pointer border border-neutral-700"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tab Links (No email address mentioned) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} First Bricks (firstbricks.in). All decision engines run 100% client-side.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('calculators')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Calculators
            </button>
            <button
              onClick={() => onNavigate('framework')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              The 6 Bricks
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Research
            </button>
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Methodology
              </button>
            )}
            <button
              onClick={() => onNavigate('contact')}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
