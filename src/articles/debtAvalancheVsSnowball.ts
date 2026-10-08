import { Article } from './types';

export const debtAvalancheVsSnowball: Article = {
  slug: 'debt-payoff-methods',
  title: 'Debt Avalanche vs. Snowball: Mathematical Optimization vs. Psychological Momentum',
  subtitle: 'When to choose the mathematically optimal highest-interest order, and when behavioral quick wins prevent borrower surrender.',
  category: 'Debt Strategy',
  categorySlug: 'debt',
  publishedDate: 'October 2026',
  readTime: '5 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Behavioral Finance & Liability Management',
    avatarText: 'FB',
  },
  summary:
    'Borrowers struggling with multiple credit cards and loans face two proven repayment methodologies: the Debt Avalanche (ranking debts by highest interest rate) and the Debt Snowball (ranking debts by lowest balance). The Avalanche saves the maximum dollars; the Snowball delivers psychological victories that prevent quitting.',
  keyTakeaways: [
    'Debt Avalanche Priority: Target debt with highest APR first (e.g. 38% credit card), while paying minimums on everything else. Mathematically minimizes total interest paid.',
    'Debt Snowball Priority: Target debt with smallest balance first (e.g. ₹15,000 personal line), paying minimums on the rest. Produces rapid endorphin wins.',
    'The First Bricks Hybrid: If you have a small debt (< ₹25,000) that can be eliminated in 60 days, kill it with Snowball for mental clarity, then switch to pure Avalanche.',
  ],
  targetToolId: 'debt-payoff',
  targetToolLabel: 'Launch Debt Avalanche vs. Snowball Accelerator',
  caseStudy: {
    title: 'Meera’s 4-Debt Liquidation: ₹4.8 Lakh Debt Load with ₹25,000 Monthly Payoff Budget',
    scenario: 'Meera (29) has 4 separate liabilities: Credit Card 1 (₹45,000 @ 42%), Credit Card 2 (₹95,000 @ 36%), Consumer Tech Loan (₹30,000 @ 18%), and a Personal Loan (₹3,10,000 @ 13%). Her minimum required payments total ₹16,000/mo. She can afford ₹25,000/month total toward debt elimination.',
    profile: [
      { label: 'Total Debt Balance', value: '₹4,80,000 across 4 debts' },
      { label: 'Monthly Surplus Budget', value: '₹25,000 total allocation' },
      { label: 'Highest APR Debt', value: 'Credit Card 1 (42% APR)' },
      { label: 'Smallest Balance Debt', value: 'Consumer Loan (₹30,000)' },
    ],
    comparison: {
      strategyA: {
        name: 'The Pure Debt Snowball Strategy',
        details: [
          'Order: Consumer Loan (₹30k) -> CC 1 (₹45k) -> CC 2 (₹95k) -> Personal Loan (₹3.1L)',
          'First loan eliminated in Month 3 (huge psychological boost)',
          'Second loan killed in Month 6',
          'Total interest paid until 100% debt-free: ₹1,18,400',
        ],
        outcome: 'Debt-free in 24 months with continuous psychological motivation and momentum.',
      },
      strategyB: {
        name: 'The Pure Debt Avalanche Strategy (Optimal Math)',
        details: [
          'Order: CC 1 (42%) -> CC 2 (36%) -> Consumer Loan (18%) -> Personal Loan (13%)',
          'Attacks vicious 42% and 36% compound interest charges immediately',
          'First loan eliminated in Month 4, second in Month 9',
          'Total interest paid until 100% debt-free: ₹91,200',
        ],
        outcome: 'Debt-free in 22 months; saves ₹27,200 ($330) more pure cash interest than Snowball.',
      },
    },
    keyTakeaway: 'The Avalanche method saved Meera ₹27,200 in interest and shaved 2 months off her repayment, while the Snowball offered faster initial milestone closures. First Bricks recommends Avalanche if you have high discipline, or a Hybrid approach if you need early momentum.',
  },
  latexHighlights: [
    {
      id: 'avalanche-objective',
      title: 'Debt Avalanche Interest Minimization Objective',
      latex: '\\min_{\\pi} \\sum_{i=1}^{m} \\int_0^{T_i} B_i(t) \\times r_i \\, dt \\quad \\text{where } r_1 \\ge r_2 \\ge \\dots \\ge r_m',
      explanation: 'Ordering repayments by descending interest rate r_i strictly minimizes the integral of accrued compound interest across all balances B_i.',
    },
    {
      id: 'monthly-rollover-acceleration',
      title: 'Snowball/Avalanche Rollover Payment Vector',
      latex: 'P_{active}(k) = P_{surplus} + \\sum_{j \\in \\text{Eliminated}} EMI_j',
      explanation: 'As each loan is liquidated, its required monthly minimum payment is recycled into the next target loan.',
    },
  ],
  sections: [
    {
      title: '1. The Mathematical Rigor of the Avalanche Method',
      content: [
        'Suppose you have three debts:',
        '• Credit Card A: ₹80,000 balance at 38% APR (Minimum: ₹4,000/mo)',
        '• Personal Loan B: ₹35,000 balance at 16% APR (Minimum: ₹2,000/mo)',
        '• Auto Loan C: ₹3,00,000 balance at 9.5% APR (Minimum: ₹7,500/mo)',
        'Under the Avalanche method, you direct every extra rupee beyond minimums toward Credit Card A because every day it remains unpaid, it consumes 38% annual interest.',
        'Over a 3-year repayment journey, the Avalanche method typically saves 15% to 35% more money in pure interest expense compared to random or flat repayment.',
      ],
      latexFormula: {
        title: 'Daily Interest Bleed Equation',
        latex: '\\text{Bleed}_{daily} = \\sum_{i=1}^{m} \\frac{B_i \\times r_i}{365}',
        explanation: 'Minimizing the daily bleed rate requires extinguishing the highest r_i terms first.',
      },
    },
    {
      title: '2. The Behavioral Science of the Snowball Method',
      content: [
        'If human beings were purely rational spreadsheets, nobody would ever use the Snowball method. However, behavioral research by Northwestern University and Harvard Business School revealed that borrowers using the Snowball method frequently become debt-free faster in real life.',
        'Why? Eliminating Loan B (₹35,000) in 3 months removes an entire monthly bill, eliminates collection calls, and proves the plan is working. That emotional victory gives the borrower the stamina to tackle the remaining balances.',
      ],
      calloutBox: {
        type: 'takeaway',
        title: 'How to Choose Your Payoff Strategy',
        points: [
          'Choose Avalanche if: You are analytical, motivated by financial spreadsheets, and have disciplined emotional resolve.',
          'Choose Snowball if: You feel anxious, overwhelmed by multiple accounts, and need a quick win within 60 days to stay committed.',
          'Simulate both side-by-side in our Debt Avalanche vs. Snowball calculator to see the exact dollar difference.',
        ],
      },
    },
  ],
};
