import { allArticles } from '../articles';

export interface RouteItem {
  id: string;
  path: string;
  label: string;
  title: string;
  description: string;
  canonical: string;
  category: 'core' | 'tools' | 'framework' | 'learn' | 'info';
  breadcrumbs: Array<{ label: string; path?: string }>;
  nextLogicalStep?: { id: string; label: string; description: string; path: string };
  relatedTools?: Array<{ id: string; label: string; path: string; desc: string }>;
}

export const BASE_URL = 'https://firstbricks.in';

export const ROUTES: Record<string, RouteItem> = {
  home: {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'First Bricks – Personal Finance Decision Engine',
    description: 'Turn your financial situation into a plan. Product-neutral health check, home loan step-up prepayment, SIP compounding, and scenario planning.',
    canonical: `${BASE_URL}/`,
    category: 'core',
    breadcrumbs: [{ label: 'Home' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Financial Health Check',
      description: 'Start with the 2-minute flagship diagnostic to find your foundation score.',
    },
    relatedTools: [
      { id: 'health-check', label: 'Health Check', path: '/health-check/', desc: 'Baseline foundation score' },
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Prepayment & EMI savings' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Inflation-adjusted wealth' },
    ],
  },
  'health-check': {
    id: 'health-check',
    path: '/health-check/',
    label: 'Financial Health Check',
    title: 'Financial Health Check & 6-Brick Score | First Bricks',
    description: 'Diagnose your cash runway, debt-to-income, and savings rate in 2 minutes. Get an actionable 3-step priority plan with zero product bias.',
    canonical: `${BASE_URL}/health-check/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines' }, { label: 'Financial Health Check' }],
    nextLogicalStep: {
      id: 'prepay-vs-invest',
      path: '/prepay-vs-invest/',
      label: 'Prepay vs. Invest Showdown',
      description: 'Compare prepaying your home loan vs investing extra cash in equity SIPs.',
    },
    relatedTools: [
      { id: 'prepay-vs-invest', label: 'Prepay vs Invest', path: '/prepay-vs-invest/', desc: 'Visual side-by-side' },
      { id: 'home-loan', label: 'Home Loan Prepayment', path: '/home-loan/', desc: 'Slash loan tenure' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Inflation-adjusted wealth' },
    ],
  },
  'prepay-vs-invest': {
    id: 'prepay-vs-invest',
    path: '/prepay-vs-invest/',
    label: 'Prepay vs. Invest Showdown',
    title: 'Prepay Home Loan vs. Invest in SIP: Side-by-Side Visual Showdown | First Bricks',
    description: 'Compare paying off your home loan early versus investing extra cash into equity SIP. Interactive net worth showdown, tax-adjusted breakeven math, and risk analysis.',
    canonical: `${BASE_URL}/prepay-vs-invest/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines', path: '/calculators/' }, { label: 'Prepay vs. Invest Showdown' }],
    nextLogicalStep: {
      id: 'home-loan',
      path: '/home-loan/',
      label: 'Home Loan Step-Up Prepayment',
      description: 'Model step-up prepayment schedules to cut your mortgage tenure in half.',
    },
    relatedTools: [
      { id: 'home-loan', label: 'Home Loan Prepayment', path: '/home-loan/', desc: 'Tenure & interest savings' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Inflation-adjusted wealth' },
      { id: 'debt-vs-invest', label: 'Debt vs Invest', path: '/debt-vs-invest/', desc: 'Unsecured debt comparison' },
    ],
  },
  'home-loan': {
    id: 'home-loan',
    path: '/home-loan/',
    label: 'Home Loan Prepayment & Step-Up EMI',
    title: 'Home Loan Prepayment & Step-Up EMI Calculator | First Bricks',
    description: 'Calculate interest savings with 5-10% annual step-up EMI or 1 extra EMI per year. See how you can cut loan tenure in half and save 40-60% interest.',
    canonical: `${BASE_URL}/home-loan/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Calculators', path: '/calculators/' }, { label: 'Home Loan Prepayment' }],
    nextLogicalStep: {
      id: 'sip-calculator',
      path: '/sip-calculator/',
      label: 'Step-Up SIP Calculator',
      description: 'Model your investment returns alongside your home loan prepayment schedule.',
    },
    relatedTools: [
      { id: 'debt-vs-invest', label: 'Debt vs Invest', path: '/debt-vs-invest/', desc: 'Prepay or invest?' },
      { id: 'debt-payoff', label: 'Debt Payoff', path: '/debt-payoff/', desc: 'Avalanche vs Snowball' },
      { id: 'affordability', label: 'Can I Afford This?', path: '/affordability/', desc: 'Test purchase impact' },
    ],
  },
  'sip-calculator': {
    id: 'sip-calculator',
    path: '/sip-calculator/',
    label: 'Step-Up SIP & Inflation Calculator',
    title: 'Step-Up SIP & Inflation-Adjusted Calculator | First Bricks',
    description: 'Model annual step-up compounding and see the true inflation-adjusted purchasing power of your future wealth in today’s money.',
    canonical: `${BASE_URL}/sip-calculator/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Calculators', path: '/calculators/' }, { label: 'Step-Up SIP Calculator' }],
    nextLogicalStep: {
      id: 'fire-engine',
      path: '/fire-engine/',
      label: 'Retirement & FIRE Engine',
      description: 'Translate your SIP compounding into your exact date of financial freedom.',
    },
    relatedTools: [
      { id: 'fire-engine', label: 'FIRE Engine', path: '/fire-engine/', desc: 'Coast FIRE milestones' },
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Balance loan vs equity' },
      { id: 'calculators', label: 'All Calculators', path: '/calculators/', desc: 'Full calculator suite' },
    ],
  },
  affordability: {
    id: 'affordability',
    path: '/affordability/',
    label: 'Can I Afford This?',
    title: 'Can I Afford This? Major Purchase Simulator | First Bricks',
    description: 'Test whether buying a car, trip, or gadget depletes your emergency buffer or sacrifices 20-year compound wealth opportunity cost.',
    canonical: `${BASE_URL}/affordability/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines' }, { label: 'Can I Afford This?' }],
    nextLogicalStep: {
      id: 'debt-vs-invest',
      path: '/debt-vs-invest/',
      label: 'Debt vs. Invest Engine',
      description: 'Compare financing interest costs against long-term index compounding.',
    },
    relatedTools: [
      { id: 'health-check', label: 'Health Check', path: '/health-check/', desc: 'Test your cash runway' },
      { id: 'home-loan', label: 'Home Loan', path: '/home-loan/', desc: 'Prepayment impact' },
      { id: 'fire-engine', label: 'FIRE Engine', path: '/fire-engine/', desc: 'Retirement impact' },
    ],
  },
  'debt-vs-invest': {
    id: 'debt-vs-invest',
    path: '/debt-vs-invest/',
    label: 'Debt vs. Invest Engine',
    title: 'Should I Pay Debt or Invest? Decision Engine | First Bricks',
    description: 'Compare the guaranteed, risk-free return of debt elimination against stock market index compounding. Calculate your exact breakeven rate.',
    canonical: `${BASE_URL}/debt-vs-invest/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines' }, { label: 'Debt vs. Invest' }],
    nextLogicalStep: {
      id: 'debt-payoff',
      path: '/debt-payoff/',
      label: 'Debt Avalanche vs. Snowball',
      description: 'Optimize the specific payoff order of your loans and credit cards.',
    },
    relatedTools: [
      { id: 'home-loan', label: 'Home Loan', path: '/home-loan/', desc: 'Mortgage step-up' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Compounding upside' },
      { id: 'calculators', label: 'Calculators Hub', path: '/calculators/', desc: 'Explore all tools' },
    ],
  },
  'fire-engine': {
    id: 'fire-engine',
    path: '/fire-engine/',
    label: 'Retirement & Build-to-Utilise Engine',
    title: 'Retirement Calculator: Build to Utilise, Step-Up SIP & Inflation | First Bricks',
    description: 'Complete retirement calculator from build to utilise. Model current age, retirement age, step-up SIP, expected CAGR, inflation, life expectancy, and see exact years your fund will last.',
    canonical: `${BASE_URL}/fire-engine/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines', path: '/calculators/' }, { label: 'Retirement & Build-to-Utilise' }],
    nextLogicalStep: {
      id: 'sip-calculator',
      path: '/sip-calculator/',
      label: 'Step-Up SIP Calculator',
      description: 'Model your monthly compounding and equity SIP growth trajectory.',
    },
    relatedTools: [
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Monthly compounding' },
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Prepayment strategy' },
      { id: 'health-check', label: 'Health Check', path: '/health-check/', desc: 'Foundation score' },
    ],
  },
  'debt-payoff': {
    id: 'debt-payoff',
    path: '/debt-payoff/',
    label: 'Debt Avalanche vs. Snowball',
    title: 'Debt Avalanche vs. Snowball Payoff Simulator | First Bricks',
    description: 'Compare the mathematical interest savings of Debt Avalanche against the psychological dopamine wins of Snowball. Accelerate your debt-free date.',
    canonical: `${BASE_URL}/debt-payoff/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Decision Engines' }, { label: 'Debt Avalanche vs. Snowball' }],
    nextLogicalStep: {
      id: 'home-loan',
      path: '/home-loan/',
      label: 'Home Loan Prepayment',
      description: 'Once unsecured debts are gone, accelerate your mortgage elimination.',
    },
    relatedTools: [
      { id: 'debt-vs-invest', label: 'Debt vs Invest', path: '/debt-vs-invest/', desc: 'Guaranteed returns' },
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Cut 10 years off EMI' },
      { id: 'health-check', label: 'Health Check', path: '/health-check/', desc: 'Revised cash runway' },
    ],
  },
  framework: {
    id: 'framework',
    path: '/framework/',
    label: 'The 6 Financial Bricks',
    title: 'The 6 Financial Bricks: Personal Finance Architecture | First Bricks',
    description: 'Understand the sequential order of operations: Cash, Protection, Debt Control, Wealth Engine, Goals, and Optimization.',
    canonical: `${BASE_URL}/framework/`,
    category: 'framework',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Architecture' }, { label: 'The 6 Financial Bricks' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Run Health Check',
      description: 'Diagnose your current standing across all 6 bricks.',
    },
    relatedTools: [
      { id: 'calculators', label: 'Calculators Hub', path: '/calculators/', desc: 'Full tool suite' },
      { id: 'guides', label: 'Decision Guides', path: '/guides/', desc: 'Practical rules of thumb' },
      { id: 'contact', label: 'Contact Us', path: '/contact/', desc: 'Questions or feedback' },
    ],
  },
  articles: {
    id: 'articles',
    path: '/articles/',
    label: 'Articles & Research',
    title: 'Financial Intelligence, Articles & Math Models | First Bricks',
    description: 'In-depth financial essays and quantitative models on home loan step-up prepayment, SIP inflation reality, debt prioritization, and early financial freedom.',
    canonical: `${BASE_URL}/articles/`,
    category: 'learn',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Knowledge Base' }, { label: 'Articles & Research' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Financial Health Check',
      description: 'Apply these quantitative models directly to your personal balance sheet.',
    },
    relatedTools: [
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Prepayment calculator' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Inflation-adjusted wealth' },
      { id: 'calculators', label: 'Calculators Hub', path: '/calculators/', desc: 'Full tool suite' },
    ],
  },
  guides: {
    id: 'guides',
    path: '/articles/',
    label: 'Articles & Research',
    title: 'Financial Intelligence, Articles & Math Models | First Bricks',
    description: 'Actionable decision frameworks: 20/4/10 car rule, 5% rent vs buy rule, Coast FIRE strategy, fortress emergency runway, and debt payoff math.',
    canonical: `${BASE_URL}/articles/`,
    category: 'learn',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Knowledge Base' }, { label: 'Articles & Research' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Test Your Situation',
      description: 'Apply these guides directly against your own financial facts.',
    },
    relatedTools: [
      { id: 'home-loan', label: 'Home Loan', path: '/home-loan/', desc: 'Prepayment calculator' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Inflation-adjusted wealth' },
      { id: 'calculators', label: 'Calculators Hub', path: '/calculators/', desc: 'All tools & formulas' },
    ],
  },
  calculators: {
    id: 'calculators',
    path: '/calculators/',
    label: 'Calculators Hub',
    title: 'Personal Finance Calculators Hub | First Bricks',
    description: 'Explore our full suite of standalone personal finance decision tools, including Home Loan Step-Up Prepayment, Step-Up SIP, FIRE Engine, Affordability, and Debt Payoff.',
    canonical: `${BASE_URL}/calculators/`,
    category: 'tools',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Calculators Hub' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Financial Health Check',
      description: 'Connect all these calculations into your unified foundation score.',
    },
    relatedTools: [
      { id: 'home-loan', label: 'Home Loan Step-Up', path: '/home-loan/', desc: 'Prepayment savings' },
      { id: 'sip-calculator', label: 'Step-Up SIP', path: '/sip-calculator/', desc: 'Real purchasing power' },
      { id: 'fire-engine', label: 'FIRE Engine', path: '/fire-engine/', desc: 'Retirement timeline' },
    ],
  },
  contact: {
    id: 'contact',
    path: '/contact/',
    label: 'Contact Us',
    title: 'Contact First Bricks | Decision Support & Feedback',
    description: 'Reach out to First Bricks at buddhisetu@gmail.com. Share calculator suggestions, formula feedback, or partnership inquiries.',
    canonical: `${BASE_URL}/contact/`,
    category: 'info',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'About & Support' }, { label: 'Contact Us' }],
    nextLogicalStep: {
      id: 'health-check',
      path: '/health-check/',
      label: 'Financial Health Check',
      description: 'Ready to build your plan? Run the flagship diagnostic.',
    },
    relatedTools: [
      { id: 'calculators', label: 'Calculators Hub', path: '/calculators/', desc: 'All calculators' },
      { id: 'framework', label: '6 Bricks', path: '/framework/', desc: 'Framework design' },
      { id: 'guides', label: 'Guides', path: '/guides/', desc: 'Read guides' },
    ],
  },
};

// Register all individual quantitative articles for canonical indexing and SEO
allArticles.forEach((article) => {
  const routeKey = `article:${article.slug}`;
  ROUTES[routeKey] = {
    id: routeKey,
    path: `/articles/${article.slug}/`,
    label: article.title,
    title: `${article.title} | First Bricks Research`,
    description: article.subtitle,
    canonical: `${BASE_URL}/articles/${article.slug}/`,
    category: 'learn',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Articles & Research', path: '/articles/' },
      { label: article.title },
    ],
    nextLogicalStep: {
      id: article.targetToolId,
      path: `/${article.targetToolId}/`,
      label: article.targetToolLabel,
      description: 'Model these mathematical principles with your numbers in the interactive calculator.',
    },
    relatedTools: [
      { id: 'articles', label: 'All Articles', path: '/articles/', desc: 'Full research library' },
      { id: article.targetToolId, label: 'Calculator', path: `/${article.targetToolId}/`, desc: article.targetToolLabel },
      { id: 'health-check', label: 'Health Check', path: '/health-check/', desc: 'Foundation assessment' },
    ],
  };
});

export function getRouteIdFromPath(pathname: string): string {
  let clean = pathname.split('?')[0].split('#')[0];
  clean = clean.replace(/^\/+|\/+$/g, '');
  if (!clean) return 'home';

  // Support legacy routes
  if (clean === 'formula-lab') return 'calculators';
  if (clean === 'guides') return 'articles';

  // Support article subpaths: /articles/<slug>/ or /guides/<slug>/
  if (clean.startsWith('articles/') || clean.startsWith('guides/')) {
    const parts = clean.split('/');
    let slug = parts[1];
    if (slug) {
      // Map any previous long/stuffed URLs cleanly to canonical short URLs
      const legacySlugMap: Record<string, string> = {
        'home-loan-step-up-prepayment-strategy': 'home-loan-prepayment',
        'home-loan-prepayment-strategy': 'home-loan-prepayment',
        'step-up-sip-inflation-purchasing-power-math': 'step-up-sip-inflation',
        'step-up-sip-compounding-inflation-math': 'step-up-sip-inflation',
        'debt-payoff-vs-investing-mathematical-breakeven': 'debt-vs-investing',
        'debt-vs-investing-breakeven': 'debt-vs-investing',
        'coast-fire-mathematics-roadmap-financial-independence': 'coast-fire',
        'coast-fire-mathematics': 'coast-fire',
        'car-affordability-twenty-four-ten-rule-opportunity-cost': 'car-affordability',
        'car-affordability-20-4-10-rule': 'car-affordability',
        'rent-vs-buy-five-percent-rule-math-breakdown': 'rent-vs-buy',
        'rent-vs-buy-five-percent-rule': 'rent-vs-buy',
        'debt-avalanche-vs-snowball-math-and-psychology': 'debt-payoff-methods',
        'debt-avalanche-vs-snowball': 'debt-payoff-methods',
        'building-a-fortress-emergency-fund-runway-sizing': 'emergency-fund',
        'fortress-emergency-fund-runway': 'emergency-fund',
      };
      if (legacySlugMap[slug]) {
        slug = legacySlugMap[slug];
      }
      const articleKey = `article:${slug}`;
      if (ROUTES[articleKey]) return articleKey;
    }
    return 'articles';
  }

  if (ROUTES[clean]) return clean;
  return 'home';
}

export function getCanonicalPath(routeId: string): string {
  if (routeId === 'home') return '/';
  if (routeId === 'formula-lab') return '/calculators/';
  if (routeId === 'guides') return '/articles/';
  const item = ROUTES[routeId];
  if (item) return item.path;
  if (routeId.startsWith('article:')) {
    const slug = routeId.replace('article:', '');
    return `/articles/${slug}/`;
  }
  return `/${routeId}/`;
}
