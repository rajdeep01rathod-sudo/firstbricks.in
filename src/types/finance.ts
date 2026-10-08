export type CurrencyCode = 'INR' | 'USD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  multiplier: number; // For converting default seed values
}

export type BrickId = 'cash' | 'protection' | 'debt' | 'investing' | 'goals' | 'optimization';

export interface BrickStatus {
  id: BrickId;
  number: number;
  name: string;
  shortDesc: string;
  status: 'solid' | 'in_progress' | 'at_risk' | 'not_started';
  score: number; // 0 to 100
  metricLabel: string;
  metricValue: string;
  actionRequired: string;
  guidance: string;
}

export interface FinancialSnapshotInput {
  age: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  essentialExpenses: number;
  cashSavings: number;
  totalDebt: number;
  debtInterestRate: number;
  monthlyDebtPayment: number;
  investments: number;
  monthlySavings: number;
  hasHealthInsurance: boolean;
  hasTermLifeInsurance: boolean;
  primaryGoal: 'emergency_fund' | 'debt_free' | 'investing' | 'house_goal' | 'fire_retirement';
}

export interface HealthCheckResult {
  foundationScore: number;
  emergencyRunwayMonths: number;
  savingsRatePercent: number;
  debtToIncomePercent: number;
  netWorth: number;
  fireNumber: number;
  yearsToFire: number;
  coastFireStatus: boolean;
  coastFireTargetNow: number;
  bricks: BrickStatus[];
  topPriorities: Array<{
    brick: BrickId;
    title: string;
    description: string;
    action: string;
    impact: 'critical' | 'high' | 'medium';
  }>;
}

export interface AffordabilityInput {
  purchaseName: string;
  purchaseCost: number;
  paymentType: 'one_time' | 'financed';
  downPayment: number;
  loanTermMonths: number;
  loanInterestRate: number;
  monthlyMaintenanceCost: number;
}

export interface AffordabilityResult {
  isAffordable: 'yes' | 'caution' | 'no';
  score: number; // 0 to 100
  headline: string;
  cashFlowImpactMonthly: number;
  remainingRunwayMonths: number;
  opportunityCost10Years: number;
  opportunityCost20Years: number;
  keyConcerns: string[];
  remedyOptions: string[];
}

export interface DebtVsInvestInput {
  debtBalance: number;
  debtInterestRate: number;
  minMonthlyPayment: number;
  extraMonthlyCash: number;
  expectedInvestReturn: number;
  timeHorizonYears: number;
}

export interface DebtVsInvestResult {
  recommendation: 'pay_debt' | 'invest' | 'hybrid';
  verdictTitle: string;
  verdictExplanation: string;
  guaranteedDebtSavings: number;
  projectedInvestWealth: number;
  netBenefitSpread: number;
  breakEvenReturn: number;
  timelineMonthsToDebtFree: number;
  hybridSplitRatio: string;
}

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

export interface DebtPayoffComparison {
  avalanche: {
    totalInterest: number;
    monthsToDebtFree: number;
    debtFreeDate: string;
    order: string[];
  };
  snowball: {
    totalInterest: number;
    monthsToDebtFree: number;
    debtFreeDate: string;
    order: string[];
  };
  differenceInterest: number;
  recommendedMethod: 'avalanche' | 'snowball';
  recommendationReason: string;
}

export interface FireInput {
  currentAge: number;
  targetRetireAge: number;
  currentInvestments: number;
  monthlyInvestment: number;
  annualRetirementSpend: number;
  expectedRealReturnRate: number; // e.g. 7% (after inflation)
  safeWithdrawalRate: number; // e.g. 3.5% or 4.0%
}

export interface FireResult {
  fireTargetNumber: number;
  currentPortfolio: number;
  projectedPortfolioAtTargetAge: number;
  projectedFireAge: number;
  coastFireThresholdToday: number;
  isCoastFireAchieved: boolean;
  savingsGapOrSurplus: number;
  trajectory: Array<{
    age: number;
    year: number;
    balance: number;
    fireTarget: number;
  }>;
}

export interface RetirementYearData {
  age: number;
  year: number;
  phase: 'build' | 'utilise';
  startingCorpus: number;
  monthlyCashflow: number; // monthly SIP if build, monthly withdrawal if utilise
  annualContribution: number;
  annualWithdrawal: number;
  growthEarned: number;
  endingCorpus: number;
  isDepleted: boolean;
}

export interface RetirementBuildUtiliseInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentInvestments: number;
  monthlySip: number;
  stepUpPercent: number; // Annual step-up % in SIP (e.g. 5% or 10%)
  expectedPreRetirementCagr: number; // Pre-retirement investment CAGR (e.g. 12%)
  inflationRate: number; // Expected annual inflation rate (e.g. 6%)
  monthlyExpensesToday: number; // Current monthly living expenses in today's money
  yearlyIncreaseInWithdrawalPercent: number; // Yearly increase in withdrawal as inflation (e.g. 6%)
  postRetirementCagr: number; // Conservative post-retirement return CAGR (e.g. 8%)
}

export interface RetirementBuildUtiliseResult {
  corpusAtRetirement: number;
  monthlyExpenseAtRetirement: number;
  annualExpenseAtRetirement: number;
  yearsFundLastsPostRetirement: number;
  ageDepleted: number | null;
  survivesLifeExpectancy: boolean;
  balanceAtLifeExpectancy: number;
  totalInvestedDuringBuild: number;
  totalWithdrawnDuringRetirement: number;
  requiredMonthlySip: number;
  targetCorpusNeededAtRetirement: number;
  fireNumberTarget: number;
  coastFireToday: number;
  isCoastFireAchieved: boolean;
  schedule: RetirementYearData[];
}

export interface StressScenarioInput {
  incomeDropPercent: number; // e.g. 20, 50, 100
  essentialExpensesOnly: boolean;
  unexpectedEmergencyCost: number;
}

export interface PrepayVsInvestInput {
  loanOutstanding: number;
  loanInterestRate: number;
  remainingTenureYears: number;
  monthlyExtraCash: number;
  annualStepUpPct: number;
  expectedInvestReturn: number;
  includeTaxBenefit: boolean;
  taxBracketPct: number;
}

export interface PrepayVsInvestYearData {
  year: number;
  pathALoanBalance: number;
  pathAInvestPortfolio: number;
  pathANetWealth: number;
  pathBLoanBalance: number;
  pathBInvestPortfolio: number;
  pathBNetWealth: number;
}

export interface PrepayVsInvestResult {
  baseEmi: number;
  totalBaseMonths: number;
  // Path A: Prepayment
  pathAMonthsToDebtFree: number;
  pathAYearsToDebtFree: number;
  pathATotalInterestPaid: number;
  pathAInterestSaved: number;
  pathAFinalInvestPortfolio: number;
  pathATotalOutlay: number;
  pathAPostDebtMonthlySip: number;
  // Path B: Invest
  pathBTotalInterestPaid: number;
  pathBFinalInvestPortfolio: number;
  pathBTotalInvestedPrincipal: number;
  pathBTotalOutlay: number;
  // Comparison
  netWealthDifference: number; // Path B - Path A
  winner: 'invest' | 'prepay' | 'balanced';
  winnerMarginPercent: number;
  breakevenReturnRate: number;
  effectiveLoanRate: number;
  trajectory: PrepayVsInvestYearData[];
}
