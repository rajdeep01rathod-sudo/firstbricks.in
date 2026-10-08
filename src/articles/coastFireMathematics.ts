import { Article } from './types';

export const coastFireMathematics: Article = {
  slug: 'coast-fire',
  title: 'Coast FIRE Mathematics: How Front-Loading Buys Decades of Freedom',
  subtitle: 'The exact formula to calculate when your invested nest egg will compound to full retirement on autopilot without saving another rupee.',
  category: 'Financial Freedom',
  categorySlug: 'freedom',
  publishedDate: 'October 2026',
  readTime: '6 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Retirement & FIRE Modeling',
    avatarText: 'FB',
  },
  summary:
    'Full FIRE (Financial Independence, Retire Early) requires accumulating 25x to 33x your annual spending before you can step away from work. Coast FIRE, however, is a game-changing milestone: it is the precise portfolio balance where compound growth alone will deliver your target nest egg by traditional retirement age without adding a single extra penny of contributions.',
  keyTakeaways: [
    'Coast FIRE Formula: Coast Capital = Target Nest Egg ÷ (1 + Real Return)^Years Remaining.',
    'Career Decoupling: Once you cross your Coast FIRE number, you only need to earn enough to cover current living expenses, unlocking low-stress roles, sabbaticals, or entrepreneurial risk.',
    'Front-Loading Asymmetry: Investing aggressively in your 20s and early 30s does 80% of the mathematical work of retirement funding due to the exponent of time.',
  ],
  targetToolId: 'fire-engine',
  targetToolLabel: 'Launch Retirement & FIRE Engine',
  caseStudy: {
    title: 'Aanya’s Escape from Burnout: Full FIRE vs. Coast FIRE at Age 31',
    scenario: 'Aanya (31) works an intense 65-hour weekly tech role earning ₹2,20,000/mo. Her annual living expenses are ₹12,00,000. She dreams of leaving high-stress corporate life to pursue design consulting, but assumes she must amass ₹3.5 Crore before making any transition.',
    profile: [
      { label: 'Current Age', value: '31 Years Old' },
      { label: 'Annual Spending', value: '₹12,00,000 / year' },
      { label: 'Current Invested Corpus', value: '₹62,00,000 in equity' },
      { label: 'Traditional Retirement Age', value: '60 Years Old (29 yrs left)' },
    ],
    comparison: {
      strategyA: {
        name: 'The Exhaustive Full FIRE Grind',
        details: [
          'Stay in 65-hr/week high-pressure job for another 11 years',
          'Aim for ₹3.5 Crore target corpus to completely stop working',
          'Risk of severe career burnout, health deterioration, and chronic fatigue',
          'Zero career flexibility during peak vitality years (30s and 40s)',
        ],
        outcome: 'Achieves complete non-work retirement at age 42, but sacrifices her entire 30s to corporate exhaustion.',
      },
      strategyB: {
        name: 'Triggering Coast FIRE Immediately',
        details: [
          'Recognizes her ₹62 Lakh portfolio already covers her Coast FIRE threshold for age 60',
          'Compounding at 6.5% real return, ₹62 Lakh grows to ₹3.8+ Crore by age 60 without another rupee added',
          'Switches to a fulfilling 30-hour design practice earning ₹1,00,000/mo to simply cover living expenses',
          'Saves ₹0 toward retirement going forward, letting time do 100% of the heavy lifting',
        ],
        outcome: 'Wins immediate lifestyle freedom at age 31 with zero compromise on senior retirement solvency.',
      },
    },
    keyTakeaway: 'Coast FIRE allowed Aanya to reclaim 29 years of daily freedom immediately by acknowledging that her existing investments will compound into a multi-crore retirement nest egg on autopilot.',
  },
  latexHighlights: [
    {
      id: 'coast-fire-equation',
      title: 'Coast FIRE Threshold Equation',
      latex: 'C_{coast} = \\frac{NW_{target}}{(1 + r_{real})^{T_{retire} - T_{current}}}',
      explanation: 'NW_{target} = Target retirement corpus in today\'s purchasing power, r_{real} = Real annual compound return (e.g. 5–7%), T_{retire} - T_{current} = Years remaining until target retirement age.',
    },
    {
      id: 'full-target-swr',
      title: 'Target Nest Egg via Safe Withdrawal Rate (SWR)',
      latex: 'NW_{target} = \\frac{\\text{Annual Retirement Spend}}{SWR} = \\text{Annual Spend} \\times 25 \\text{ to } 33',
      explanation: 'SWR = Safe withdrawal rate (4.0% for 30-year horizon, 3.25% for 45+ year early retirement).',
    },
  ],
  sections: [
    {
      title: '1. The Problem with the All-or-Nothing FIRE Mindset',
      content: [
        'Many professionals become demoralized by standard FIRE targets. If a household spends ₹15 Lakh ($30,000) annually, their target nest egg at a conservative 3.5% withdrawal rate is ₹4.3 Crore ($850,000).',
        'Grinding in a high-stress corporate job for 18 years to reach that massive sum feels exhausting. Many experience burnout before reaching the halfway mark.',
        'Coast FIRE dismantles this all-or-nothing binary into a realistic two-phase journey.',
      ],
      latexFormula: {
        title: 'Rule of 30 for Extended Early Retirement',
        latex: 'Corpus = \\text{Annual Living Expenses} \\times 30 \\quad (SWR = 3.33\\%)',
        explanation: 'Accommodates longer 40-year life expectancies and sequence of returns risk.',
      },
    },
    {
      title: '2. How Coast FIRE Works in Practice',
      content: [
        'Suppose you are 30 years old and plan to retire at age 60 (30 years of compounding). Your target retirement corpus in today\'s money is ₹3.5 Crore.',
        'Assuming a conservative real return (after inflation) of 6% annualized in broad index equities, we discount ₹3.5 Crore backwards over 30 years:',
        'Your Coast FIRE number today is ₹3.5 Crore ÷ (1.06)³⁰ = ₹61 Lakh ($75,000).',
        'Once you possess ₹61 Lakh in equity index funds at age 30, that money will grow into ₹3.5 Crore by age 60 without you ever saving another single rupee. You can immediately quit 70-hour workweeks, work a peaceful 30-hour job that covers living expenses, and let compounding do the heavy lifting.',
      ],
      calloutBox: {
        type: 'insight',
        title: 'The Coast FIRE Freedom Dividend',
        points: [
          'Zero retirement savings requirement going forward: 100% of your paycheck can be spent on lifestyle or passion pursuits.',
          'Extreme psychological resilience during economic downturns and corporate layoffs.',
          'Freedom to negotiate or take extended unpaid sabbaticals without endangering your old-age security.',
        ],
      },
    },
  ],
};
