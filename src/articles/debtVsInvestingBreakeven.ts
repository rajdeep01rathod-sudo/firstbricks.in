import { Article } from './types';

export const debtVsInvestingBreakeven: Article = {
  slug: 'debt-vs-investing',
  title: 'Debt Payoff vs. Investing: The Mathematical Breakeven',
  subtitle: 'Why a guaranteed 11% debt payoff beats a volatile 13% stock index, and where the exact crossover threshold lies.',
  category: 'Debt Strategy',
  categorySlug: 'debt',
  publishedDate: 'October 2026',
  readTime: '5 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Risk-Adjusted Capital Allocation',
    avatarText: 'FB',
  },
  summary:
    'Borrowers frequently ask whether they should invest extra money in mutual funds or pay off their loans. The answer lies in the risk-adjusted spread: eliminating an 11% personal loan or credit card balance provides an unassailable 11% post-tax, risk-free return with zero volatility, zero sequence risk, and zero drawdown.',
  keyTakeaways: [
    'Debt as a Reverse Bond: Every rupee paid toward a 12% loan yields a guaranteed 12% risk-free return.',
    'The 3-Zone Rule: Debts above 9.5% APR must be liquidated immediately. Debts under 6% (subsidized mortgages) should be paid on schedule while investing surplus. Debts between 6.5% and 9.5% permit a 50/50 hybrid allocation.',
    'Sequence Risk Hazard: If you choose investing over debt payoff and equities crash 30%, your loan interest continues compounding uninterrupted.',
  ],
  targetToolId: 'debt-vs-invest',
  targetToolLabel: 'Launch Debt vs. Invest Decision Engine',
  caseStudy: {
    title: 'Siddharth’s ₹8 Lakh Bonus: Pay Off 11.5% Personal Loan or Chase 14% Stocks?',
    scenario: 'Siddharth received a net annual bonus of ₹8,00,000. He owes ₹8,00,000 on an unsecured personal loan with an effective APR of 11.5%. His friends encourage him to put the entire sum into small-cap equity funds expecting 14% to 15% gains.',
    profile: [
      { label: 'Available Capital', value: '₹8,00,000 lump sum' },
      { label: 'Personal Loan APR', value: '11.5% fixed' },
      { label: 'Market Expected Return', value: '13.0% (volatile)' },
      { label: 'Risk Drag Discount', value: '3.5% volatility buffer' },
    ],
    comparison: {
      strategyA: {
        name: 'Investing Bonus in Stocks While Maintaining Loan',
        details: [
          'Invest ₹8 Lakh in equity mutual funds while paying ₹21,000/mo loan EMI',
          'Market encounters a 2-year flat/correction phase (return: +2% annualized)',
          'Loan interest continues accruing relentlessly at ₹92,000/year',
          'Net wealth spread after 3 years: Negative ₹1.4 Lakh',
        ],
        outcome: 'Subjected to severe sequence of returns risk; high stress with zero guaranteed gains.',
      },
      strategyB: {
        name: '100% Loan Eradication (Guaranteed 11.5% Post-Tax Yield)',
        details: [
          'Wipes out entire ₹8 Lakh personal loan in a single transaction',
          'Instantly saves ₹92,000 in Year 1 interest expense (risk-free, tax-free return)',
          'Frees up ₹21,000/mo in monthly cash flow immediately',
          'Channels the freed ₹21,000/mo into equity SIP going forward with zero debt overhang',
        ],
        outcome: 'Achieves an unbeatable guaranteed 11.5% return, zero monthly liabilities, and bulletproof peace of mind.',
      },
    },
    keyTakeaway: 'Eliminating high-interest debt is equivalent to purchasing a AAA-rated bond yielding an incredible 11.5% post-tax return—an asset that does not exist anywhere in public financial markets.',
  },
  latexHighlights: [
    {
      id: 'breakeven-hurdle',
      title: 'Hurdle Rate Inequality for Capital Allocation',
      latex: 'r_{debt, effective} \\ge \\mathbb{E}\\left[r_{equity}\\right] - \\sigma_{risk\\_drag}',
      explanation: 'r_{debt, effective} = Post-tax interest rate on debt, \\mathbb{E}[r_{equity}] = Expected equity nominal return, \\sigma_{risk\\_drag} = Volatility and uncertainty discount (typically 3–4%).',
    },
    {
      id: 'effective-debt-rate',
      title: 'Tax-Adjusted Effective Debt Cost',
      latex: 'r_{eff} = r_{gross} \\times \\left(1 - \\tau_{deductible}\\right)',
      explanation: 'r_{gross} = Nominal loan APR, \\tau_{deductible} = Tax deduction percentage (0 for personal loans & auto loans, partial for home loans up to statutory limits).',
    },
  ],
  sections: [
    {
      title: '1. The Illusion of Higher Expected Stock Returns',
      content: [
        'A popular retail investing thesis argues: "My personal loan is at 11%, but the stock market has returned 14% historically. Therefore, I should invest in the market and make a 3% spread."',
        'This calculation commits a fundamental quantitative error: comparing a risk-free guaranteed liability with a volatile, equity-risk-bearing asset.',
        'If the stock market enters a 3-year bear market (as happened in 2000–2003 or 2008), the investor loses 25% of their principal while continuing to pay 11% compound interest to the bank. Their net geometric spread turns drastically negative.',
      ],
      latexFormula: {
        title: 'Net Geometric Wealth Spread Under Downside Scenario',
        latex: 'Spread_{net} = \\left(1 + r_{asset}\\right) - \\left(1 + r_{debt}\\right) < 0',
        explanation: 'When r_{asset} turns negative or flat in a correction, the fixed liability r_{debt} relentlessly drains household net worth.',
      },
    },
    {
      title: '2. The First Bricks 3-Zone Capital Allocation Framework',
      content: [
        'To remove emotional guesswork, First Bricks divides all debts into three objective quantitative tiers:',
        '• Red Zone (> 9.5% APR): Credit cards (36–42%), personal loans (11–16%), and high-cost consumer debt. Action: Halt all discretionary investments above 401(k)/PF employer match and obliterate this debt immediately.',
        '• Yellow Zone (6.5% – 9.5% APR): Auto loans, education loans, floating-rate mortgages. Action: Adopt the 50/50 rule. Allocate 50% of monthly surplus to loan prepayments and 50% to long-term equity SIPs.',
        '• Green Zone (< 6.5% APR): Concessional or heavily tax-sheltered mortgages. Action: Maintain standard amortization schedule and direct 100% of marginal surplus toward equity compounding.',
      ],
      calloutBox: {
        type: 'takeaway',
        title: 'Decision Checklist',
        points: [
          'Calculate your true APR including processing fees and insurance riders.',
          'Identify whether your loan interest qualifies for tax deductions (e.g. Section 24b / 80E).',
          'Use our Debt vs. Invest Engine to evaluate your exact breakeven horizon.',
        ],
      },
    },
  ],
};
