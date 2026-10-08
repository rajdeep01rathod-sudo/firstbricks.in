import { Article } from './types';

export const stepUpSipInflationMath: Article = {
  slug: 'step-up-sip-inflation',
  title: 'Step-Up SIP & The Inflation Reality: Why Nominal Wealth is an Illusion',
  subtitle: 'How a ₹5 Crore or $2M corpus shrinks in purchasing power, and how a 10% annual Step-Up SIP restores compound dominance.',
  category: 'Wealth & SIP',
  categorySlug: 'wealth',
  publishedDate: 'October 2026',
  readTime: '7 min read',
  featured: true,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Asset Allocation & Portfolio Modeling',
    avatarText: 'FB',
  },
  summary:
    'Every conventional SIP calculator displays dazzling figures of ₹5 Crore or $2,000,000 in 25 years. But if consumer inflation averages 6% over that period, that ₹5 Crore will buy no more goods and services than ₹1.16 Crore buys today. To defeat inflation, an investor must employ a Step-Up SIP and discount future wealth using exact real purchasing power equations.',
  keyTakeaways: [
    'Nominal Mirage: In 20 years at 6% annual inflation, the purchasing power of your money drops by over 68%.',
    'The Fisher Real Return Equation: Real compound growth is not (Nominal Rate - Inflation Rate); it is strictly (1 + r) / (1 + i) - 1.',
    'Step-Up SIP Countermeasure: Increasing your SIP by 10% each year expands your terminal wealth by more than 2.3x compared to a static flat SIP.',
    'Lifestyle Inflation Neutralization: As your career income grows, keeping your savings rate static fails unless your absolute investment contributions increase proportionally.',
  ],
  targetToolId: 'sip-calculator',
  targetToolLabel: 'Launch Step-Up SIP & Inflation Calculator',
  caseStudy: {
    title: 'Vikram’s 25-Year Wealth Journey: Flat ₹25,000 SIP vs. 10% Step-Up SIP',
    scenario: 'Vikram (28) starts his wealth accumulation journey with ₹25,000 monthly savings. He anticipates a realistic 12% annualized return in diversified index funds over 25 years. However, with consumer inflation averaging 6%, he needs to know his true buying power upon retirement at age 53.',
    profile: [
      { label: 'Initial Investment', value: '₹25,000 / month' },
      { label: 'Time Horizon', value: '25 Years (300 mos)' },
      { label: 'Nominal CAGR', value: '12.0% per annum' },
      { label: 'Long-Term Inflation', value: '6.0% annualized' },
    ],
    comparison: {
      strategyA: {
        name: 'Fixed Flat SIP (No Annual Increment)',
        details: [
          'Invest ₹25,000/mo unvaried for all 25 years',
          'Total principal invested out of pocket: ₹75 Lakh',
          'Nominal terminal wealth: ₹4.74 Crore ($570,000)',
          'Inflation-adjusted real value in today’s money: ₹1.10 Crore',
        ],
        outcome: 'Generates ₹4.74 Cr nominally, but buying power is reduced by 77% due to inflation drag.',
      },
      strategyB: {
        name: 'Disciplined 10% Annual Step-Up SIP',
        details: [
          'Raise monthly contribution by 10% each January (₹25k -> ₹27.5k -> ₹30.25k...)',
          'Total principal invested out of pocket: ₹2.95 Crore (funded smoothly via salary growth)',
          'Nominal terminal wealth: ₹11.23 Crore ($1,350,000+)',
          'Inflation-adjusted real value in today’s money: ₹2.62 Crore',
        ],
        outcome: 'Produces 2.37x greater real wealth and beats inflation by over ₹1.52 Crore in today\'s purchasing power.',
      },
    },
    keyTakeaway: 'By increasing investments in tandem with career salary hikes, Vikram prevented the inflation trap and preserved actual generational purchasing power.',
  },
  latexHighlights: [
    {
      id: 'fisher-equation',
      title: 'Fisher Equation for Real Purchasing Power Return',
      latex: 'r_{real} = \\frac{1 + r_{nominal}}{1 + i_{inflation}} - 1',
      explanation: 'r_{nominal} = Nominal compound asset return, i_{inflation} = Annualized rate of consumer/lifestyle inflation.',
    },
    {
      id: 'inflation-discounting',
      title: 'Discounted Real Value (Purchasing Power in Today’s Money)',
      latex: 'V_{real} = \\frac{V_{nominal}}{(1 + i_{inflation})^t}',
      explanation: 'V_{nominal} = Terminal corpus balance at year t, i_{inflation} = Inflation rate, t = Time horizon in years.',
    },
  ],
  sections: [
    {
      title: '1. Why Standard SIP Calculators Mislead Investors',
      content: [
        'Imagine investing ₹25,000 ($350) per month at an expected 12% annualized equity return for 25 years. A standard calculator proudly tells you your final corpus will be ₹4.74 Crore ($600,000).',
        'You feel secure until you calculate what healthcare, higher education, groceries, and housing will cost in 2051. At a realistic 6.5% inflation rate, a hospital bill of ₹10 Lakh today will cost ₹48 Lakh then. A cup of coffee will cost five times more.',
        'When discounted by inflation, your ₹4.74 Crore portfolio is worth only ₹98 Lakh in today’s real buying power. You are not wealthy; you are merely treading water.',
      ],
      latexFormula: {
        title: 'Nominal Future Value of Ordinary Annuity (Flat SIP)',
        latex: 'FV = P \\times \\left[ \\frac{(1 + r)^n - 1}{r} \\right] \\times (1 + r)',
        explanation: 'P = Monthly deposit, r = Monthly interest rate, n = Total months.',
      },
    },
    {
      title: '2. The Mathematical Power of the Annual Step-Up SIP',
      content: [
        'A flat SIP assumes you will never receive a promotion, bonus, or career increment for 25 years. But salaries rise.',
        'By instituting a 10% annual Step-Up SIP—meaning you raise your contribution from ₹25,000/mo in Year 1 to ₹27,500/mo in Year 2 and ₹30,250/mo in Year 3—your final nominal wealth surges from ₹4.74 Crore to a staggering ₹11.23 Crore.',
        'Even after harsh 6.5% inflation discounting, your real purchasing power rises from ₹98 Lakh to ₹2.32 Crore in current terms. You have genuinely created generational wealth.',
      ],
      calloutBox: {
        type: 'insight',
        title: 'Step-Up Multipliers vs. Flat Contributions',
        points: [
          '5% Step-Up: Increases terminal maturity corpus by +48% over 20 years.',
          '10% Step-Up: Increases terminal maturity corpus by +136% over 20 years.',
          '15% Step-Up: Increases terminal maturity corpus by +275% over 20 years.',
        ],
      },
    },
    {
      title: '3. Modeling Asset Class Real Returns',
      content: [
        'Equities historically deliver 11% to 13% in emerging markets and 8% to 10% in developed markets. After 6% inflation, real equity compounding is 5.5% to 6.5%.',
        'Fixed deposits and debt instruments generating 7% nominal yield deliver a real return of just 0.5% to 1% before income taxes. After a 30% tax bracket, debt funds often yield negative real purchasing power.',
        'This is why long-term wealth mandates disciplined equity exposure paired with systematically stepped-up contributions.',
      ],
      latexFormula: {
        title: 'Post-Tax Real Return Equation',
        latex: 'r_{real, net} = \\frac{1 + r_{nom}(1 - \\tau)}{1 + i} - 1',
        explanation: '\\tau = Marginal tax rate on investment gains, r_{nom} = Nominal interest rate, i = Inflation rate.',
      },
    },
  ],
};
