import { Article } from './types';

export const homeLoanPrepaymentStrategy: Article = {
  slug: 'home-loan-prepayment',
  title: 'The Math of Home Loan Prepayment: 5% Step-Up EMI vs. 1 Extra EMI per Year',
  subtitle: 'How front-loading loan prepayments eliminates 40% to 60% of total lifetime interest and slashes a 20-year mortgage to 8–11 years.',
  category: 'Loans & Prepayment',
  categorySlug: 'loans',
  publishedDate: 'October 2026',
  readTime: '6 min read',
  featured: true,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Mortgage & Debt Analytics',
    avatarText: 'FB',
  },
  summary:
    'A 20-year home loan is engineered with front-loaded interest: in the first 5 years, over 70% of every monthly payment goes to the bank’s profit rather than your home equity. By executing either an annual 5–10% step-up in EMI or paying 1 additional EMI every calendar year, borrowers bypass compound interest and gain freedom a decade earlier.',
  keyTakeaways: [
    'Front-Loaded Amortization Trap: Standard fixed EMIs keep your principal virtually untouched during the critical first 3 to 7 years.',
    'The 1 Extra EMI/Year Hack: Paying 13 EMIs instead of 12 each year reduces a 20-year loan to approximately 16 years and cuts interest by ~20%.',
    'The 5–10% Annual Step-Up Power: Increasing your EMI annually in tandem with salary increments slashes a 20-year mortgage down to 9–11 years, saving upwards of 45% of total interest.',
    'Opportunity Cost Check: Only prepay if your home loan interest rate (>8.5%) exceeds your guaranteed post-tax hurdle rate, or if psychological peace of mind has tangible value.',
  ],
  targetToolId: 'home-loan',
  targetToolLabel: 'Launch Home Loan Step-Up Prepayment Calculator',
  caseStudy: {
    title: 'Anil & Priya’s ₹60 Lakh Home Loan Amortization Dilemma',
    scenario: 'Anil (32) and Priya (30) purchased an apartment in Pune with a ₹60,00,000 mortgage at 8.75% interest over 20 years. Their mandatory EMI is ₹53,023/month. In Year 1 alone, ₹5.21 Lakh of their ₹6.36 Lakh payments vanishes into pure interest.',
    profile: [
      { label: 'Loan Principal', value: '₹60,00,000' },
      { label: 'Interest Rate', value: '8.75% per annum' },
      { label: 'Original Term', value: '20 Years (240 mos)' },
      { label: 'Baseline EMI', value: '₹53,023 / month' },
    ],
    comparison: {
      strategyA: {
        name: 'Standard Passive Repayment (No Prepayments)',
        details: [
          'Pay regular ₹53,023 EMI every month for 240 months',
          'Total amount repaid to bank: ₹1,27,25,520',
          'Total interest paid: ₹67,25,520 (112% of the principal borrowed)',
          'Loan closure year: 2046 (Age 52)',
        ],
        outcome: 'Pays ₹67.25 Lakh in interest; mortgage debt drags for 20 full years.',
      },
      strategyB: {
        name: 'Annual 7% Step-Up EMI Prepayment Program',
        details: [
          'Step-up monthly payment by 7% each year (matching their annual job appraisal)',
          'Year 1: ₹53,023/mo | Year 2: ₹56,735/mo | Year 3: ₹60,706/mo',
          'Loan is fully extinguished in 9 years and 8 months (slashed by 10+ years)',
          'Total interest paid: ₹29,80,000',
        ],
        outcome: 'Saves ₹37,45,520 ($45,000+) in pure cash interest; mortgage-free at age 41.',
      },
    },
    keyTakeaway: 'Stepping up EMI by just 7% each year redirected ₹37.45 Lakh from the bank’s profit margins directly back into Anil and Priya’s child education and retirement accounts.',
  },
  latexHighlights: [
    {
      id: 'emi-formula',
      title: 'Standard Monthly Equated Installment (EMI) Formula',
      latex: 'EMI = P \\times r \\times \\frac{(1 + r)^n}{(1 + r)^n - 1}',
      explanation: 'P = Loan Principal, r = Monthly Interest Rate (Annual Rate / 12 / 100), n = Total Tenure in Months.',
    },
    {
      id: 'stepup-amortization',
      title: 'Balance After Periodic Extra Prepayment',
      latex: 'B_t = B_{t-1}(1 + r) - \\left(EMI_t + \\Delta_{prepay, t}\\right)',
      explanation: 'B_t = Principal Balance at month t, EMI_t = Stepped-up monthly installment, \\Delta_{prepay, t} = Lump sum extra prepayment applied directly to principal.',
    },
  ],
  sections: [
    {
      title: '1. The Anatomy of the Amortization Curve',
      content: [
        'When you take a 20-year home loan of ₹50 Lakh ($100,000) at 8.75% interest, your monthly EMI is ₹44,186. Over the life of the loan, you will pay ₹56 Lakh in pure interest—meaning you repay more than double what you borrowed.',
        'Worse, bank amortization schedules front-load interest payments. In Month 1, ₹36,458 goes to interest, and only ₹7,728 reduces your principal balance. Even after 5 full years (60 months of payments totaling ₹26.5 Lakh), your outstanding principal has barely dropped from ₹50 Lakh to ₹44.8 Lakh.',
      ],
      latexFormula: {
        title: 'Monthly Interest vs. Principal Decomposition',
        latex: 'I_t = B_{t-1} \\times r \\quad \\text{and} \\quad \\Delta P_t = EMI - I_t',
        explanation: 'At high initial balance B_{t-1}, interest component I_t consumes almost the entire payment, leaving principal reduction \\Delta P_t minimal.',
      },
    },
    {
      title: '2. Strategy A: Paying 1 Extra EMI Every Year',
      content: [
        'The simplest strategy requires zero monthly budget restructuring: designate your annual bonus or festival payout to pay one extra EMI per calendar year (13 payments instead of 12).',
        'Because this extra payment does not have to cover monthly interest, 100% of it is subtracted straight from the outstanding principal balance.',
        'On a 20-year, 9% home loan, paying 1 extra EMI every year shaves roughly 48 months (4 full years) off your repayment term and preserves hundreds of thousands in net interest.',
      ],
      calloutBox: {
        type: 'insight',
        title: 'Rules of Thumb for Extra EMI Strategy',
        points: [
          'Best suited for individuals with annual variable bonuses or incentive bonuses.',
          'Always instruct your lending institution to apply the payment toward "Tenure Reduction" rather than "EMI Reduction".',
          'Ensure the lender charges 0% prepayment penalty (standard for floating-rate retail loans under RBI & consumer credit regulations).',
        ],
      },
    },
    {
      title: '3. Strategy B: The 5% to 10% Annual Step-Up EMI',
      content: [
        'While Strategy A is powerful, Strategy B is mathematically superior for working professionals whose earnings rise with inflation and career progression.',
        'In a Step-Up model, your EMI increases by a modest 5% or 10% each year. For instance, if your Year 1 EMI is ₹40,000, your Year 2 EMI becomes ₹42,000 (+5%), Year 3 becomes ₹44,100, and so forth.',
        'Because your initial baseline interest is already satisfied by the original EMI, every additional rupee in subsequent years attacks the remaining principal at an accelerating rate.',
      ],
      latexFormula: {
        title: 'Step-Up EMI Escalation Equation',
        latex: 'EMI_{k} = EMI_1 \\times (1 + g)^{k-1}',
        explanation: 'EMI_k = Monthly payment in year k, g = Annual Step-Up percentage rate (e.g., 0.05 or 0.10).',
      },
    },
    {
      title: '4. Decision Matrix: When to Prepay vs. When to Invest',
      content: [
        'Should you rush to eliminate an 8.5% home loan, or invest your surplus cash in an index fund generating a historical 12% nominal return?',
        'The answer depends on tax deductibility and risk premium. Home loan interest is a guaranteed negative return. Paying it off yields a guaranteed 8.5% post-tax equivalent return. Equity compounding, while theoretically higher, carries volatility and downside drawdown risk.',
        'A balanced approach recommended by First Bricks is the 50/50 Rule: split your annual surplus 50% into loan step-up prepayment and 50% into a Step-Up SIP.',
      ],
      calloutBox: {
        type: 'takeaway',
        title: 'Action Steps for Homeowners Today',
        points: [
          'Run your loan numbers in the First Bricks Home Loan Calculator.',
          'Verify your current outstanding balance and interest rate on your latest loan statement.',
          'Set up an automated calendar reminder to step up your auto-debit ECS by 5% every January.',
        ],
      },
    },
  ],
};
