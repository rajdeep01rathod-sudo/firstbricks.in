import { Article } from './types';

export const rentVsBuyFivePercentRule: Article = {
  slug: 'rent-vs-buy',
  title: 'The 5% Rule of Real Estate: Evaluating Rent vs. Buy with Mathematical Discipline',
  subtitle: 'Why renting is not "throwing money away", and how to calculate the unrecoverable cost spread between housing options.',
  category: 'Purchases & Housing',
  categorySlug: 'housing',
  publishedDate: 'October 2026',
  readTime: '6 min read',
  featured: false,
  author: {
    name: 'First Bricks Quantitative Research',
    role: 'Real Estate & Housing Economics',
    avatarText: 'FB',
  },
  summary:
    'Society repeats the dogma that renting is burning cash while buying builds equity. Financial mathematics tells a more nuanced story: homeownership entails massive unrecoverable costs (property taxes, maintenance reserves, transaction friction, and cost of capital) that often exceed annual rent.',
  keyTakeaways: [
    'The 3 Unrecoverable Costs of Owning: Property taxes (~1%), routine maintenance & depreciation (~1%), and cost of capital / mortgage interest (~3%). Total = ~5% annually.',
    'The 5% Breakeven Rule: If annual rent for an identical home is less than 5% of its purchase price, renting and investing the surplus into equity indexes creates greater long-term net worth.',
    'Frictional Costs: Buying and selling real estate carries 6% to 10% in registration, stamp duty, brokerage, and closing fees—requiring at least 7–10 years of tenure to break even.',
  ],
  targetToolId: 'affordability',
  targetToolLabel: 'Check Housing Purchase Affordability',
  caseStudy: {
    title: 'Kavita & Dev’s Bengaluru Apartment Decision: Buying at ₹1.2 Cr vs. Renting at ₹38,000',
    scenario: 'Kavita and Dev are evaluating whether to buy a 3-BHK apartment in Bengaluru costing ₹1,20,00,000 ($145,000) or continue renting the identical unit for ₹38,000 per month. Their families argue that paying rent is "wasting money into the landlord\'s pocket".',
    profile: [
      { label: 'Property Sale Price', value: '₹1,20,00,000' },
      { label: 'Market Rent', value: '₹38,00,0 / mo (₹4.56L/yr)' },
      { label: '5% Rule Annual Hurdle', value: '₹6,00,000 / yr (₹50,000/mo)' },
      { label: 'Down Payment Ready', value: '₹25,00,000 cash' },
    ],
    comparison: {
      strategyA: {
        name: 'Buying the Apartment (Unrecoverable Cost Reality)',
        details: [
          'Unrecoverable annual costs (interest + maintenance + property tax): ~5% = ₹6,00,000/yr (₹50,000/mo)',
          'Total monthly cash commitment: EMI ₹84,000 + Maintenance ₹6,000 = ₹90,000/mo',
          'Sinks ₹25 Lakh liquidity into down payment + ₹8 Lakh non-refundable stamp duty/registration',
          'Illiquid capital locked in a single non-diversified physical asset',
        ],
        outcome: 'True unrecoverable owning cost (₹50,000/mo) is ₹12,000 HIGHER than the market rent (₹38,000/mo).',
      },
      strategyB: {
        name: 'Rent & Aggressively Invest the Spread',
        details: [
          'Rent the exact same home for ₹38,000/month (only 3.8% rental yield on property value)',
          'Invest the ₹25 Lakh down payment + ₹8 Lakh registration fees into diversified index funds',
          'Invest monthly cash-flow savings of ₹52,000/month (₹90k EMI equivalent minus ₹38k rent) into SIP',
          'Over 15 years at 12% equity compounding, this portfolio amasses ₹3.1 Crore in liquid assets',
        ],
        outcome: 'Produces ₹1.2 Crore greater liquid net worth compared to the estimated net equity of the apartment.',
      },
    },
    keyTakeaway: 'Because local rental yield (3.8%) was well below the 5% unrecoverable threshold, renting was not throwing money away—it was actually saving ₹12,000/month in unrecoverable costs while creating superior liquid net worth.',
  },
  latexHighlights: [
    {
      id: 'unrecoverable-costs-equation',
      title: 'Unrecoverable Housing Cost Equation',
      latex: '\\text{Cost}_{unrecoverable} = Price \\times \\left( r_{cost\\_of\\_capital} + t_{property\\_tax} + m_{maintenance} \\right)',
      explanation: 'Unrecoverable expenditures that build zero home equity. Typically totals 4.5% to 5.5% of total asset valuation per year.',
    },
    {
      id: 'five-percent-rent-hurdle',
      title: 'The 5% Monthly Rental Hurdle',
      latex: '\\text{Max Monthly Rent} = \\frac{\\text{Property Purchase Price} \\times 0.05}{12}',
      explanation: 'If actual market rent is below this threshold, renting is mathematically superior provided the savings are invested.',
    },
  ],
  sections: [
    {
      title: '1. Deconstructing the Myth of "Throwing Away Money"',
      content: [
        'When you pay rent, you exchange cash for immediate shelter and maximum mobility with zero maintenance liability, zero mortgage debt, and zero property tax obligations.',
        'When you buy a home, a large portion of your monthly payment is also "thrown away" into unrecoverable sinks: mortgage interest, home insurance, society maintenance fees, municipal property taxes, and asset depreciation.',
        'In the first 7 years of a 20-year mortgage, more than 60% of every EMI paid is pure interest expense paid to the lender—unrecoverable dollars that never convert to equity.',
      ],
      latexFormula: {
        title: 'Net Wealth Differential: Rent & Invest vs. Homeownership',
        latex: '\\Delta W(t) = \\left[ DP(1+r_{eq})^t + \\sum \\Delta_{cashflow}(1+r_{eq})^{t-m} \\right] - \\left[ Value_{home}(t) - Debt(t) - Friction \\right]',
        explanation: 'Compares compounding equity index portfolio against illiquid net home equity after 8% liquidation costs.',
      },
    },
    {
      title: '2. Applying the 5% Rule Step-by-Step',
      content: [
        'Take an apartment with a purchase price of ₹1 Crore ($120,000).',
        'Multiply by 5%: ₹1,00,00,000 × 0.05 = ₹5,00,000 per year.',
        'Divide by 12 months: ₹5,00,000 ÷ 12 = ₹41,666/month.',
        'If you can rent an identical apartment in that same neighborhood for ₹28,000 to ₹35,000 per month, renting is cheaper than the unrecoverable cost of ownership. The remaining ₹15,000/month plus the ₹25 Lakh down payment invested in index funds will mathematically outperform home equity.',
      ],
      calloutBox: {
        type: 'insight',
        title: 'The Critical Caveat: The Discipline Requirement',
        points: [
          'Renting only wins mathematically if you actually invest the difference.',
          'If a renter consumes the cash surplus on luxury lifestyle inflation, homeownership wins by acting as a forced savings mechanism.',
          'Homeownership also provides subjective non-financial benefits: tenure security, customization freedom, and emotional roots.',
        ],
      },
    },
  ],
};
