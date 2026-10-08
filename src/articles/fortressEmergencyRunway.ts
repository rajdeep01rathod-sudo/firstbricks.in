import { Article } from './types';

export const fortressEmergencyRunway: Article = {
  slug: 'emergency-fund',
  title: 'The Fortress Emergency Runway: Liquidity, Sizing & Crisis Resilience',
  subtitle: 'Why holding 6 months in liquid cash is not "losing to inflation", but purchasing catastrophic put-option insurance for your wealth.',
  category: 'Emergency & Cash',
  categorySlug: 'cash',
  publishedDate: 'October 2026',
  readTime: '4 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Liquidity & Solvency Stress-Testing',
    avatarText: 'FB',
  },
  summary:
    'Novice investors often complain that keeping 6 months of living expenses in savings accounts or short-term liquid funds creates "cash drag" against inflation. In reality, an emergency fund is not an investment; it is an insurance policy whose sole job is preventing the forced liquidation of depreciated equities during a market crash or job loss.',
  keyTakeaways: [
    'Emergency Runway Formula: Liquid Reserves ÷ Essential Monthly Burn Rate (not total lifestyle spending).',
    'Sizing Guidelines: Dual-income corporate employees with stable jobs: 3–4 months. Single-income households, freelancers, and entrepreneurs: 6–9 months.',
    'Separation of Accounts: Emergency cash must never sit in your daily UPI/debit checking account; store it in a high-yield sweep or liquid debt fund.',
  ],
  targetToolId: 'health-check',
  targetToolLabel: 'Test Cash Runway in Financial Health Check',
  caseStudy: {
    title: 'Aditya’s Startup Crisis: 100% Invested Portfolio vs. 6-Month Liquid Fortress',
    scenario: 'Aditya (33) works in a high-growth tech startup. He kept only ₹50,000 in his bank account, putting 95% of his net worth into mid-cap equity mutual funds. When macroeconomic tightening triggered sudden industry layoffs and a 28% stock market pullback, he lost his job with zero emergency runway.',
    profile: [
      { label: 'Essential Monthly Burn', value: '₹75,000 / month' },
      { label: 'Pre-Crisis Liquid Cash', value: '₹50,000 (0.6 months)' },
      { label: 'Equity Portfolio', value: '₹18,00,000 before crash' },
      { label: 'Market Downturn', value: '-28% equity drop' },
    ],
    comparison: {
      strategyA: {
        name: 'Zero Cash Runway (Forced Equity Liquidation)',
        details: [
          'Unemployed for 5 months during industry slump',
          'Forced to liquidate ₹3,75,000 from crashed mutual fund units at market bottoms to pay rent and EMI',
          'Locked in catastrophic 28% capital losses permanently',
          'Sacrificed approximately ₹19 Lakh of future 10-year compound upside on those shares',
        ],
        outcome: 'Survives the layoff, but severely damages long-term net worth through forced fire-sales.',
      },
      strategyB: {
        name: 'The 6-Month Fortress Runway Architecture',
        details: [
          'Pre-funded a 6-month liquid fortress of ₹4,50,000 in sweep FDs and liquid funds',
          'Drew down purely from cash reserves over the 5-month job search',
          'Equity mutual funds left completely untouched through the entire market correction',
          'Portfolio naturally rebounded +45% in the subsequent economic recovery',
        ],
        outcome: 'Zero shares sold at a loss; found an even better leadership job with zero financial anxiety.',
      },
    },
    keyTakeaway: 'An emergency fund is not a low-yielding cash drag—it is a mandatory put option that prevents the catastrophic forced sale of high-performing equity assets during inevitable economic downturns.',
  },
  latexHighlights: [
    {
      id: 'cash-runway-months',
      title: 'Solvency Runway Equation',
      latex: '\\text{Runway (Months)} = \\frac{\\text{Cash Equivalents}}{\\text{Essential Monthly Expenses}} = \\frac{C_{liquid}}{E_{rent} + E_{food} + E_{emi} + E_{insurance}}',
      explanation: 'Only essential survival expenses are included in the denominator; dining out and vacations are stripped out.',
    },
    {
      id: 'forced-liquidation-loss',
      title: 'Cost of Forced Liquidation During Equity Drawdown',
      latex: '\\text{Loss}_{liquidation} = \\Delta C_{needed} \\times \\left[ \\frac{1}{1 - Drawdown} - 1 \\right] + \\text{Taxes}',
      explanation: 'Selling equities at the bottom of a 30% crash permanently locks in losses and sacrifices future compound recoveries.',
    },
  ],
  sections: [
    {
      title: '1. The Real Danger: Sequence of Crisis Risk',
      content: [
        'When do corporate layoffs, startup collapses, and medical emergencies occur? Almost invariably during macroeconomic recessions when equity markets are also down 20% to 40%.',
        'If you do not hold 6 months of liquid cash reserves, you are forced to sell your mutual funds or stocks at the absolute market trough to pay rent and hospital bills.',
        'Selling ₹5 Lakh of equities during a 35% market crash permanently destroys ₹25 Lakh of prospective 15-year compound growth.',
      ],
      latexFormula: {
        title: 'Net Value of Liquid Fortress Insurance',
        latex: '\\mathbb{E}[\\text{Net Preservation}] = P(\\text{Crisis}) \\times \\left( \\text{Drawdown Protection} + \\text{Career Peace} \\right) - \\text{Inflation Drag}',
        explanation: 'The expected value of preserving your long-term portfolio vastly outweighs the 2% minor inflation spread on cash reserves.',
      },
    },
    {
      title: '2. Structuring Your 3-Tier Fortress',
      content: [
        'First Bricks recommends dividing emergency capital into three buckets:',
        '• Tier 1 (Immediate Liquidity - 1 Month): High-yield savings account linked to an ATM debit card for instant hospital or family emergency access.',
        '• Tier 2 (Short-Term Liquidity - 2 to 3 Months): Bank Fixed Deposit with auto-sweep or overnight liquid debt fund (instant T+0 redemption).',
        '• Tier 3 (Extended Buffer - 2 to 3 Months): Ultra-short duration fund or arbitrage fund with low credit risk and zero lock-in.',
      ],
      calloutBox: {
        type: 'takeaway',
        title: 'Action Steps for Liquidity Security',
        points: [
          'Calculate your bare-bones monthly survival burn rate (rent/mortgage, basic groceries, utilities, loan minimums, and insurance premiums).',
          'Multiply by 6 to determine your Fortress Baseline.',
          'Verify your Runway Score in the First Bricks Financial Health Check diagnostic.',
        ],
      },
    },
  ],
};
