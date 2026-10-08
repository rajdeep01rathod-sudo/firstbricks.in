import { Article } from './types';

export const carAffordabilityTwentyFourTen: Article = {
  slug: 'car-affordability',
  title: 'The 20/4/10 Auto Rule: The Hidden Compounding Opportunity Cost of Vehicles',
  subtitle: 'Why 7-year auto loans destroy middle-class wealth, and how to purchase a vehicle with mathematical discipline.',
  category: 'Purchases & Housing',
  categorySlug: 'housing',
  publishedDate: 'October 2026',
  readTime: '5 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Consumer Finance & TCO Modeling',
    avatarText: 'FB',
  },
  summary:
    'Dealerships sell vehicles on monthly payments rather than total vehicle cost, extending auto loan terms to 6 or 7 years. Because automobiles depreciate 15–20% the moment they leave the showroom, extended loan terms trap buyers underwater while siphoning critical compound investment dollars.',
  keyTakeaways: [
    'The 20/4/10 Rule: Put down at least 20% in cash, finance for a maximum of 4 years (48 months), and keep total vehicle costs (EMI + fuel + insurance + maintenance) strictly under 10% of monthly gross income.',
    'Total Cost of Ownership (TCO): The loan EMI represents only ~60% of real car ownership costs; operating costs make up the remaining 40%.',
    'The 15-Year Opportunity Cost: A ₹15 Lakh ($25,000) car purchase with down payment and EMI equates to over ₹75 Lakh ($120,000) in lost retirement compounding over 15 years.',
  ],
  targetToolId: 'affordability',
  targetToolLabel: 'Test in "Can I Afford This?" Purchase Engine',
  caseStudy: {
    title: 'Rohan’s ₹18 Lakh SUV Purchase: 7-Year Dealership Loan vs. 20/4/10 Discipline',
    scenario: 'Rohan earns ₹1,50,000 gross monthly salary. A car dealership offers him an attractive ₹18,00,000 SUV with "zero down payment" on an extended 7-year (84-month) loan at 10.5% interest, advertising an EMI of only ₹29,800/month.',
    profile: [
      { label: 'Monthly Gross Salary', value: '₹1,50,000 / month' },
      { label: 'Vehicle On-Road Price', value: '₹18,00,000' },
      { label: 'Dealership Offer', value: '0% Down, 7 Years @ 10.5%' },
      { label: 'Safe 20/4/10 Limit', value: 'Max ₹15,000/mo Total OpEx' },
    ],
    comparison: {
      strategyA: {
        name: 'The 7-Year Dealership Financing Trap',
        details: [
          'EMI: ₹29,800/mo + Fuel/Insurance/Maint: ₹12,000/mo = ₹41,800/month',
          'Consumes 27.8% of Rohan’s gross income (almost 3x the recommended 10% threshold)',
          'Total interest paid on car loan: ₹7,03,000',
          'Negative equity: The car is worth less than the remaining loan balance for the first 4.5 years',
        ],
        outcome: 'Severe monthly cash-flow squeeze; Rohan is forced to stop his retirement mutual fund SIPs.',
      },
      strategyB: {
        name: '20/4/10 Standard Applied to a ₹12 Lakh Car',
        details: [
          'Right-sizes to a quality ₹12 Lakh car with 20% down payment (₹2.4 Lakh cash)',
          'Finances ₹9.6 Lakh over 48 months (4 years) at 9.5% -> EMI = ₹24,100/mo',
          'Loan is fully closed in 4 years; 5th year onwards zero EMI liability',
          'Surplus ₹17,700/mo invested into equity SIP compounding for 10 years yields ₹43 Lakh',
        ],
        outcome: 'Completely debt-free car in 48 months while accumulating ₹43 Lakh in investment corpus.',
      },
    },
    keyTakeaway: 'The dealership loan disguised a ₹41,800/mo monthly liability as affordable, while 20/4/10 protected Rohan’s long-term wealth trajectory.',
  },
  latexHighlights: [
    {
      id: 'twenty-four-ten-inequality',
      title: 'The 20/4/10 Constraint Inequations',
      latex: 'DownPayment \\ge 0.20 \\times Price, \\quad Tenure \\le 48\\text{ mos}, \\quad \\frac{EMI + OpEx}{GrossIncome} \\le 0.10',
      explanation: 'Ensures the borrower never goes underwater on vehicle depreciation while maintaining a healthy monthly savings rate.',
    },
    {
      id: 'opportunity-cost-equation',
      title: 'Compounding Opportunity Cost of Vehicle Capital',
      latex: 'Cost_{opp} = DP \\times (1 + r)^t + \\sum_{m=1}^{n} EMI \\times (1 + r/12)^{12t - m}',
      explanation: 'DP = Cash down payment, EMI = Monthly payment, r = Expected long-term equity market return (10–12%), t = Years.',
    },
  ],
  sections: [
    {
      title: '1. The Amortization Trap of Long Auto Loans',
      content: [
        'Over the last decade, average auto loan tenures have expanded from 36–48 months to 72–84 months. Lenders offer 7-year loans to make expensive luxury vehicles "feel affordable" by suppressing the monthly EMI.',
        'However, automobiles are guaranteed depreciating assets. A new vehicle loses ~20% of its value in Year 1 and roughly 50% by Year 4.',
        'When you finance a depreciating asset over 7 years, you remain "underwater" (owing more on the loan than the car is worth) for the first 4 years. If the vehicle is totaled or sold, you owe the bank money out of pocket.',
      ],
      latexFormula: {
        title: 'Vehicle Book Value vs. Loan Outstanding Over Time',
        latex: 'V_{car}(t) = Price \\times (1 - d)^t \\quad \\text{vs.} \\quad B_{loan}(t)',
        explanation: 'd = Annualized depreciation rate (~15–20%). When B_{loan}(t) > V_{car}(t), negative equity occurs.',
      },
    },
    {
      title: '2. The True Monthly Budget Impact',
      content: [
        'A buyer calculating affordability usually checks whether their salary can absorb an EMI of ₹20,000.',
        'They overlook: comprehensive insurance (₹4,000/mo), fuel/charging (₹6,000/mo), parking/tolls (₹1,500/mo), and routine maintenance/tyres (₹2,500/mo). The true cost is ₹34,000/month.',
        'Under the First Bricks standard, if your household gross income is ₹2,00,000/month, your all-inclusive monthly vehicle expenditure must not exceed ₹20,000 (10%).',
      ],
      calloutBox: {
        type: 'takeaway',
        title: 'Rules Before Stepping into a Dealership',
        points: [
          'Pre-approve your financing at your primary bank; never accept dealer financing without checking baseline rates.',
          'Negotiate the on-road drive-away price, never the monthly installment.',
          'Model the purchase in the First Bricks Affordability Engine to verify cash runway impact.',
        ],
      },
    },
  ],
};
