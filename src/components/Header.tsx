import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { allArticles } from '../articles';
import {
  ChevronDown,
  Layers,
  ShieldCheck,
  Calculator,
  BookOpen,
  Mail,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Home,
  TrendingUp,
  Scale,
  Zap,
  Compass,
  FileText,
  ChevronRight,
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenMethodology: () => void;
  onOpenHealthGuide: () => void;
}

type MobileTabType = 'home' | 'calculators' | 'articles' | 'framework' | 'contact';

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenMethodology,
  onOpenHealthGuide,
}) => {
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTabType>('calculators');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync mobile active tab with currentView whenever menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      if (['calculators', 'prepay-vs-invest', 'home-loan', 'sip-calculator', 'health-check', 'affordability', 'debt-vs-invest', 'fire-engine', 'debt-payoff'].includes(currentView)) {
        setMobileActiveTab('calculators');
      } else if (['articles', 'guides'].includes(currentView)) {
        setMobileActiveTab('articles');
      } else if (currentView === 'framework') {
        setMobileActiveTab('framework');
      } else if (currentView === 'contact') {
        setMobileActiveTab('contact');
      } else {
        setMobileActiveTab('calculators');
      }
    }
  }, [mobileMenuOpen, currentView]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalcDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: string) => {
    setCalcDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const calculatorGroups = [
    {
      group: 'Popular & Prepayments',
      items: [
        { id: 'prepay-vs-invest', label: 'Prepay vs. Invest Showdown', desc: 'Mortgage prepayment vs equity SIP', icon: Scale, badge: 'Showdown' },
        { id: 'home-loan', label: 'Home Loan Step-Up Prepayment', desc: '5-10% step-up or 1 extra EMI/yr', icon: Home, badge: 'Popular' },
        { id: 'sip-calculator', label: 'Step-Up SIP & Real Value', desc: 'Inflation-adjusted purchasing power', icon: TrendingUp, badge: 'Wealth' },
        { id: 'health-check', label: 'Financial Health Check', desc: '6-Brick Foundation Score & priorities', icon: Layers, badge: 'Flagship' },
      ],
    },
    {
      group: 'Borrowing & Allocation',
      items: [
        { id: 'debt-vs-invest', label: 'Debt vs. Invest Engine', desc: 'Guaranteed rate vs index compounding', icon: Scale, badge: 'Strategy' },
        { id: 'debt-payoff', label: 'Avalanche vs. Snowball', desc: 'Multi-loan payoff accelerator', icon: Zap, badge: 'Payoff' },
      ],
    },
    {
      group: 'Purchases & Independence',
      items: [
        { id: 'affordability', label: 'Can I Afford This?', desc: 'Major purchase runway & opportunity cost', icon: ShieldCheck, badge: 'Purchase' },
        { id: 'fire-engine', label: 'Retirement: Build to Utilise', desc: 'Accumulation to pension drawdown', icon: Compass, badge: 'Lifecycle' },
      ],
    },
  ];

  const isCalculatorActive = [
    'calculators',
    'prepay-vs-invest',
    'home-loan',
    'sip-calculator',
    'health-check',
    'affordability',
    'debt-vs-invest',
    'fire-engine',
    'debt-payoff',
  ].includes(currentView);

  const isArticleActive = ['articles', 'guides'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Authentic Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
        >
          <BrandLogo size="md" showWordmark={true} />
        </button>

        {/* Zone 2: Scalable, Organised Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {/* Calculators Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleNav('calculators')}
                className={`py-1 transition-colors cursor-pointer ${
                  isCalculatorActive
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Calculators
              </button>
              <button
                onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
                className="p-1 text-neutral-400 hover:text-neutral-900 cursor-pointer"
                aria-label="Open calculators menu"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    calcDropdownOpen ? 'rotate-180 text-neutral-900' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>

            {calcDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-84 bg-white border border-neutral-200 rounded-2xl shadow-xl p-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Calculators Suite
                  </span>
                  <button
                    onClick={() => handleNav('calculators')}
                    className="text-[11px] font-semibold text-neutral-900 hover:underline"
                  >
                    View All Hub →
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  {calculatorGroups.map((grp, gIdx) => (
                    <div key={gIdx} className="space-y-1">
                      <div className="text-[10px] font-bold uppercase text-neutral-400 px-2 pt-1">
                        {grp.group}
                      </div>
                      {grp.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNav(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex flex-col ${
                            currentView === item.id
                              ? 'bg-neutral-100 text-neutral-900 font-semibold'
                              : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                          }`}
                        >
                          <span className="font-medium text-neutral-900">{item.label}</span>
                          <span className="text-[11px] text-neutral-500 font-normal">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Articles & News */}
          <button
            onClick={() => handleNav('articles')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
              isArticleActive
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Articles & Research
          </button>

          {/* 6 Bricks Framework */}
          <button
            onClick={() => handleNav('framework')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
              currentView === 'framework'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            6 Bricks
          </button>

          {/* Contact Us */}
          <button
            onClick={() => handleNav('contact')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
              currentView === 'contact'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Check Health Primary CTA */}
          <button
            onClick={onOpenHealthGuide}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.99]"
          >
            Start Check
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Tab and Sub-Tab Architecture */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-3 sm:px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Primary Mobile Tabs Bar */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1">
              Select Section (Tabs)
            </div>
            <div className="grid grid-cols-5 gap-1 p-1 bg-neutral-100 rounded-2xl">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  currentView === 'home'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span className="text-[10px]">Home</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('calculators')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  mobileActiveTab === 'calculators'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px]">Calculators</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('articles')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  mobileActiveTab === 'articles'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-[10px]">Articles</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('framework')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  mobileActiveTab === 'framework'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px]">6 Bricks</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('contact')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  mobileActiveTab === 'contact'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-[10px]">Contact</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs Content Container based on selected Tab */}
          <div className="pt-2">
            {/* SUB-TAB 1: Calculators */}
            {mobileActiveTab === 'calculators' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                    Calculators Sub-Menu
                  </span>
                  <button
                    onClick={() => handleNav('calculators')}
                    className="text-xs font-bold text-neutral-900 underline hover:text-emerald-700"
                  >
                    View All Calculators Hub →
                  </button>
                </div>

                {calculatorGroups.map((group, grpIdx) => (
                  <div key={grpIdx} className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1 pt-1">
                      {group.group}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isSelected = currentView === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-neutral-900 text-white shadow-xs'
                                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`p-1.5 rounded-lg ${
                                  isSelected ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-600 shadow-2xs'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="font-semibold text-xs leading-snug">{item.label}</div>
                                <div
                                  className={`text-[10px] ${
                                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                                  }`}
                                >
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-neutral-800 text-emerald-300'
                                  : 'bg-neutral-200/60 text-neutral-600'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUB-TAB 2: Articles & Research */}
            {mobileActiveTab === 'articles' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    Articles & Research Sub-Menu
                  </span>
                  <button
                    onClick={() => handleNav('articles')}
                    className="text-xs font-bold text-neutral-900 underline hover:text-sky-700"
                  >
                    View All Articles Hub →
                  </button>
                </div>

                <div className="space-y-1">
                  {allArticles.map((article) => (
                    <button
                      key={article.slug}
                      onClick={() => handleNav('articles')}
                      className="w-full text-left p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-medium transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 shrink-0" />
                        <div className="truncate">
                          <div className="font-semibold text-xs text-neutral-900 truncate">
                            {article.title}
                          </div>
                          <div className="text-[10px] text-neutral-500">{article.category} • {article.readTime}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 3: 6 Bricks Framework */}
            {mobileActiveTab === 'framework' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    The 6 Bricks Architecture
                  </span>
                  <button
                    onClick={() => handleNav('framework')}
                    className="text-xs font-bold text-neutral-900 underline hover:text-amber-700"
                  >
                    Explore Blueprint →
                  </button>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Personal finance order of operations from survival baseline to long-term compounding.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 1: Cash</div>
                    <div className="text-[10px] text-neutral-500">Runway & survival</div>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 2: Debt</div>
                    <div className="text-[10px] text-neutral-500">Eliminate high APR</div>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 3: Buffer</div>
                    <div className="text-[10px] text-neutral-500">3-6 mo reserves</div>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 4: Shield</div>
                    <div className="text-[10px] text-neutral-500">Health & term life</div>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 5: Compound</div>
                    <div className="text-[10px] text-neutral-500">Index SIP investing</div>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="font-bold text-neutral-900">🧱 Brick 6: Optimize</div>
                    <div className="text-[10px] text-neutral-500">Tax & FIRE freedom</div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('framework')}
                  className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold text-center cursor-pointer shadow-xs"
                >
                  View Complete 6 Bricks Framework
                </button>
              </div>
            )}

            {/* SUB-TAB 4: Contact Us */}
            {mobileActiveTab === 'contact' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    Contact & Support
                  </span>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/90 space-y-2">
                  <div className="text-xs font-bold text-neutral-900">Direct Team Email</div>
                  <a
                    href="mailto:buddhisetu@gmail.com"
                    className="block text-sm font-semibold text-emerald-700 hover:underline"
                  >
                    buddhisetu@gmail.com
                  </a>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Have an idea for a new financial calculator, formula suggestion, or research topic? We read and reply to every message.
                  </p>
                </div>

                <button
                  onClick={() => handleNav('contact')}
                  className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold text-center cursor-pointer shadow-xs"
                >
                  View Contact & Email Details
                </button>
              </div>
            )}
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHealthGuide();
              }}
              className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start 2-Min Check</span>
            </button>
            <button
              onClick={() => handleNav('calculators')}
              className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              All Tools
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
