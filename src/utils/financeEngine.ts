import {
  FinancialSnapshotInput,
  HealthCheckResult,
  BrickStatus,
  AffordabilityInput,
  AffordabilityResult,
  DebtVsInvestInput,
  DebtVsInvestResult,
  DebtItem,
  DebtPayoffComparison,
  FireInput,
  FireResult,
  RetirementBuildUtiliseInput,
  RetirementBuildUtiliseResult,
  RetirementYearData,
  PrepayVsInvestInput,
  PrepayVsInvestResult,
  PrepayVsInvestYearData,
} from '../types/finance';

/**
 * 1. FLAGSHIP FINANCIAL HEALTH CHECK (6-BRICK FOUNDATION)
 */
export function calculateFinancialHealth(input: FinancialSnapshotInput): HealthCheckResult {
  const {
    age,
    monthlyIncome,
    monthlyExpenses,
    essentialExpenses,
    cashSavings,
    totalDebt,
    debtInterestRate,
    monthlyDebtPayment,
    investments,
    monthlySavings,
    hasHealthInsurance,
    hasTermLifeInsurance,
    primaryGoal,
  } = input;

  const validIncome = Math.max(1, monthlyIncome);
  const validExpenses = Math.max(1, monthlyExpenses);
  const validEssential = Math.max(1, essentialExpenses || monthlyExpenses * 0.7);

  // Core metrics
  const emergencyRunwayMonths = cashSavings / validExpenses;
  const savingsRatePercent = Math.min(100, Math.max(0, (monthlySavings / validIncome) * 100));
  const debtToIncomePercent = (monthlyDebtPayment / validIncome) * 100;
  const netWorth = cashSavings + investments - totalDebt;

  // FIRE & Coast FIRE calculations
  const annualExpenses = validExpenses * 12;
  const fireNumber = annualExpenses * 25; // 4% safe withdrawal rule
  const realReturnRate = 0.07; // 7% real return after inflation

  // Years to FIRE estimation
  let currentAccumulated = investments;
  let yearsToFire = 0;
  const maxYears = 50;
  const annualSavings = monthlySavings * 12;

  if (annualSavings > 0 || currentAccumulated >= fireNumber) {
    while (currentAccumulated < fireNumber && yearsToFire < maxYears) {
      currentAccumulated = currentAccumulated * (1 + realReturnRate) + annualSavings;
      yearsToFire++;
    }
  } else {
    yearsToFire = 99;
  }

  // Coast FIRE target today (for retirement at age 60)
  const yearsToSixty = Math.max(1, 60 - age);
  const coastFireTargetNow = fireNumber / Math.pow(1 + realReturnRate, yearsToSixty);
  const coastFireStatus = investments >= coastFireTargetNow;

  // Evaluate the 6 Bricks
  // Brick 1: Cash (Target: 3-6 months emergency runway)
  let brick1Score = 0;
  let brick1Status: BrickStatus['status'] = 'at_risk';
  let brick1Action = 'Build at least 3 months of essential living expenses in an accessible high-yield account.';
  if (emergencyRunwayMonths >= 6) {
    brick1Score = 100;
    brick1Status = 'solid';
    brick1Action = 'Runway is fortress-grade. Keep maintaining this liquidity cushion.';
  } else if (emergencyRunwayMonths >= 3) {
    brick1Score = 75;
    brick1Status = 'in_progress';
    brick1Action = `Currently at ${emergencyRunwayMonths.toFixed(1)} months. Aim to reach 6 full months of cushion.`;
  } else if (emergencyRunwayMonths >= 1) {
    brick1Score = 40;
    brick1Status = 'in_progress';
    brick1Action = 'You have a small buffer, but any job loss or health event could force debt.';
  } else {
    brick1Score = 15;
    brick1Status = 'at_risk';
  }

  // Brick 2: Protection (Health & Term Life Insurance)
  let brick2Score = 0;
  let brick2Status: BrickStatus['status'] = 'at_risk';
  let brick2Action = 'Get dedicated health and pure term life insurance before aggressive investing.';
  if (hasHealthInsurance && hasTermLifeInsurance) {
    brick2Score = 100;
    brick2Status = 'solid';
    brick2Action = 'Core baseline protection is active. Review sum assured every 3 years.';
  } else if (hasHealthInsurance) {
    brick2Score = 60;
    brick2Status = 'in_progress';
    brick2Action = 'Health cover is in place. If you have dependents, secure a pure term life policy.';
  } else {
    brick2Score = 20;
    brick2Status = 'at_risk';
  }

  // Brick 3: Debt (Low DTI and no toxic high-interest debt > 10%)
  let brick3Score = 100;
  let brick3Status: BrickStatus['status'] = 'solid';
  let brick3Action = 'Debt-free or minimal manageable debt. Great capital flexibility.';
  if (totalDebt > 0) {
    if (debtInterestRate >= 12 || debtToIncomePercent > 40) {
      brick3Score = 25;
      brick3Status = 'at_risk';
      brick3Action = `High interest (${debtInterestRate}%) or high DTI (${debtToIncomePercent.toFixed(0)}%) is siphoning your wealth. Prioritize aggressive repayment.`;
    } else if (debtInterestRate > 8 || debtToIncomePercent > 25) {
      brick3Score = 65;
      brick3Status = 'in_progress';
      brick3Action = `Debt is moderate. Keep payments on schedule and avoid taking new unsecured debt.`;
    } else {
      brick3Score = 85;
      brick3Status = 'solid';
      brick3Action = 'Debt is low-cost and well within safe cash flow boundaries.';
    }
  }

  // Brick 4: Investing (Savings Rate >= 20% & active investing)
  let brick4Score = 0;
  let brick4Status: BrickStatus['status'] = 'at_risk';
  let brick4Action = 'Automate regular monthly investments into broad low-cost index funds.';
  if (savingsRatePercent >= 30) {
    brick4Score = 100;
    brick4Status = 'solid';
    brick4Action = `Exceptional ${savingsRatePercent.toFixed(0)}% savings rate. Compounding will accelerate rapidly.`;
  } else if (savingsRatePercent >= 20) {
    brick4Score = 80;
    brick4Status = 'solid';
    brick4Action = `Healthy ${savingsRatePercent.toFixed(0)}% savings rate. Try bumping contributions by 2% each year.`;
  } else if (savingsRatePercent >= 10) {
    brick4Score = 55;
    brick4Status = 'in_progress';
    brick4Action = `Modest ${savingsRatePercent.toFixed(0)}% savings rate. Look for leakages in recurring discretionary spending.`;
  } else {
    brick4Score = 20;
    brick4Status = 'at_risk';
  }

  // Brick 5: Goals (Positive Net Worth and milestone trajectory)
  let brick5Score = 50;
  let brick5Status: BrickStatus['status'] = 'in_progress';
  let brick5Action = 'Assign concrete timelines and capital allocations to your major milestones.';
  if (netWorth > fireNumber * 0.3) {
    brick5Score = 95;
    brick5Status = 'solid';
    brick5Action = 'Substantial wealth accumulated relative to annual spending.';
  } else if (netWorth > 0 && coastFireStatus) {
    brick5Score = 85;
    brick5Status = 'solid';
    brick5Action = 'Coast FIRE threshold reached. Your core retirement is mathematically secured.';
  } else if (netWorth > 0) {
    brick5Score = 65;
    brick5Status = 'in_progress';
    brick5Action = 'Net worth is positive. Continue steady monthly asset accumulation.';
  } else {
    brick5Score = 30;
    brick5Status = 'at_risk';
    brick5Action = 'Net worth is negative due to debt liabilities. Focus on debt avalanche.';
  }

  // Brick 6: Optimization (Asset Allocation, tax drag, fee reduction)
  let brick6Score = 60;
  let brick6Status: BrickStatus['status'] = 'in_progress';
  let brick6Action = 'Ensure low expense ratio index funds and review tax-advantaged account ceilings.';
  if (investments > annualExpenses * 3 && totalDebt === 0) {
    brick6Score = 90;
    brick6Status = 'solid';
    brick6Action = 'Clean balance sheet. Maintain asset rebalancing once a year.';
  } else if (investments > 0) {
    brick6Score = 70;
    brick6Status = 'in_progress';
    brick6Action = 'Check expense ratios and avoid high-commission endowment or ULIP products.';
  } else {
    brick6Score = 35;
    brick6Status = 'at_risk';
    brick6Action = 'Focus on earlier bricks (Cash & Debt) before complex tax optimizations.';
  }

  const bricks: BrickStatus[] = [
    {
      id: 'cash',
      number: 1,
      name: 'Cash & Liquidity',
      shortDesc: 'Emergency fund & baseline cash buffer',
      status: brick1Status,
      score: brick1Score,
      metricLabel: 'Runway',
      metricValue: `${emergencyRunwayMonths.toFixed(1)} months`,
      actionRequired: brick1Action,
      guidance: 'A solid cash reserve prevents you from liquidating long-term investments during life surprises.',
    },
    {
      id: 'protection',
      number: 2,
      name: 'Protection',
      shortDesc: 'Health and life risk transfer',
      status: brick2Status,
      score: brick2Score,
      metricLabel: 'Coverage',
      metricValue: hasHealthInsurance && hasTermLifeInsurance ? 'Complete' : hasHealthInsurance ? 'Health Only' : 'Unprotected',
      actionRequired: brick2Action,
      guidance: 'Without insurance, a single medical crisis or unforeseen event can destroy years of accumulated wealth.',
    },
    {
      id: 'debt',
      number: 3,
      name: 'Debt Control',
      shortDesc: 'Eliminate toxic debt & cap DTI ratio',
      status: brick3Status,
      score: brick3Score,
      metricLabel: 'DTI Ratio',
      metricValue: `${debtToIncomePercent.toFixed(0)}%`,
      actionRequired: brick3Action,
      guidance: 'High-interest debt is an anchor on your net worth with a guaranteed negative return.',
    },
    {
      id: 'investing',
      number: 4,
      name: 'Wealth Engine',
      shortDesc: 'Consistent long-term compounding',
      status: brick4Status,
      score: brick4Score,
      metricLabel: 'Savings Rate',
      metricValue: `${savingsRatePercent.toFixed(0)}%`,
      actionRequired: brick4Action,
      guidance: 'Your savings rate matters more than chasing speculative returns. Compounding requires consistency.',
    },
    {
      id: 'goals',
      number: 5,
      name: 'Life Milestones',
      shortDesc: 'Housing, education & financial independence',
      status: brick5Status,
      score: brick5Score,
      metricLabel: 'FIRE Progress',
      metricValue: `${Math.min(100, Math.round((investments / Math.max(1, fireNumber)) * 100))}%`,
      actionRequired: brick5Action,
      guidance: 'Align capital with your personal life timeline rather than arbitrary societal scripts.',
    },
    {
      id: 'optimization',
      number: 6,
      name: 'Optimization',
      shortDesc: 'Tax efficiency & low-cost rebalancing',
      status: brick6Status,
      score: brick6Score,
      metricLabel: 'Efficiency',
      metricValue: brick6Score >= 80 ? 'Optimized' : 'Standard',
      actionRequired: brick6Action,
      guidance: 'Minimizing management fees and tax drag compounds to tens of thousands over decades.',
    },
  ];

  // Foundation Score: Weighted aggregate
  // Bricks 1, 2, 3 carry heavier initial foundation weight
  const weights = [0.22, 0.18, 0.22, 0.18, 0.12, 0.08];
  const foundationScore = Math.round(
    bricks.reduce((acc, brick, idx) => acc + brick.score * weights[idx], 0)
  );

  // Generate Top 3 Priorities
  const topPriorities: HealthCheckResult['topPriorities'] = [];

  if (emergencyRunwayMonths < 3) {
    topPriorities.push({
      brick: 'cash',
      title: 'Solidify Emergency Cash Buffer',
      description: `Your cash covers only ${emergencyRunwayMonths.toFixed(1)} months of expenses. Target 3-6 months.`,
      action: 'Redirect all surplus monthly cash until emergency fund reaches safe threshold.',
      impact: 'critical',
    });
  }

  if (totalDebt > 0 && debtInterestRate >= 10) {
    topPriorities.push({
      brick: 'debt',
      title: 'Crush High-Interest Debt',
      description: `Paying ${debtInterestRate}% APR is a guaranteed loss. No stock market return reliably beats this.`,
      action: 'Deploy the Debt Avalanche method: pay minimums on all else, attack this debt aggressively.',
      impact: 'critical',
    });
  }

  if (!hasHealthInsurance) {
    topPriorities.push({
      brick: 'protection',
      title: 'Secure Independent Health Cover',
      description: 'Lack of health coverage is the #1 driver of sudden bankruptcy.',
      action: 'Obtain an individual or family floater health policy immediately.',
      impact: 'critical',
    });
  }

  if (savingsRatePercent < 15 && topPriorities.length < 3) {
    topPriorities.push({
      brick: 'investing',
      title: 'Elevate Monthly Savings Rate',
      description: `Your savings rate is ${savingsRatePercent.toFixed(0)}%. Aim for at least 20% to reach independence.`,
      action: 'Conduct an expense audit to trim subscription creep and unnegotiated recurring bills.',
      impact: 'high',
    });
  }

  if (!coastFireStatus && topPriorities.length < 3) {
    topPriorities.push({
      brick: 'investing',
      title: 'Automate Low-Cost Index Investing',
      description: 'Compounding accelerates when automated on salary day.',
      action: 'Set up an automated SIP / monthly transfer into broad equity index funds.',
      impact: 'high',
    });
  }

  if (topPriorities.length < 3) {
    topPriorities.push({
      brick: 'optimization',
      title: 'Conduct Annual Portfolio Rebalance',
      description: 'Review asset allocation across equity, debt, and cash instruments.',
      action: 'Rebalance to target allocations and maximize tax-deferred allowances.',
      impact: 'medium',
    });
  }

  return {
    foundationScore,
    emergencyRunwayMonths,
    savingsRatePercent,
    debtToIncomePercent,
    netWorth,
    fireNumber,
    yearsToFire,
    coastFireStatus,
    coastFireTargetNow,
    bricks,
    topPriorities: topPriorities.slice(0, 3),
  };
}

/**
 * 2. "CAN I AFFORD THIS?" DECISION ENGINE
 */
export function calculateAffordability(
  snapshot: FinancialSnapshotInput,
  purchase: AffordabilityInput
): AffordabilityResult {
  const {
    monthlyIncome,
    monthlyExpenses,
    cashSavings,
    totalDebt,
    monthlyDebtPayment,
  } = snapshot;

  const {
    purchaseCost,
    paymentType,
    downPayment,
    loanTermMonths,
    loanInterestRate,
    monthlyMaintenanceCost,
  } = purchase;

  const discretionaryCashFlow = Math.max(0, monthlyIncome - monthlyExpenses - monthlyDebtPayment);
  let monthlyPayment = 0;
  let cashOutlayImmediate = 0;

  if (paymentType === 'one_time') {
    cashOutlayImmediate = purchaseCost;
    monthlyPayment = monthlyMaintenanceCost;
  } else {
    cashOutlayImmediate = downPayment;
    const loanAmount = Math.max(0, purchaseCost - downPayment);
    if (loanAmount > 0 && loanTermMonths > 0) {
      const monthlyRate = loanInterestRate / 100 / 12;
      if (monthlyRate > 0) {
        monthlyPayment =
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
            (Math.pow(1 + monthlyRate, loanTermMonths) - 1) +
          monthlyMaintenanceCost;
      } else {
        monthlyPayment = loanAmount / loanTermMonths + monthlyMaintenanceCost;
      }
    } else {
      monthlyPayment = monthlyMaintenanceCost;
    }
  }

  const remainingCash = cashSavings - cashOutlayImmediate;
  const remainingRunwayMonths = remainingCash / Math.max(1, monthlyExpenses);
  const totalMonthlyCommitment = monthlyDebtPayment + monthlyPayment;
  const postPurchaseDTI = (totalMonthlyCommitment / Math.max(1, monthlyIncome)) * 100;

  // Opportunity Cost: What if purchaseCost was invested at 10% annual return?
  const r = 0.10;
  const opportunityCost10Years = Math.round(purchaseCost * Math.pow(1 + r, 10));
  const opportunityCost20Years = Math.round(purchaseCost * Math.pow(1 + r, 20));

  const keyConcerns: string[] = [];
  const remedyOptions: string[] = [];
  let score = 100;

  if (remainingRunwayMonths < 3) {
    score -= 40;
    keyConcerns.push(
      `Depletes emergency buffer to ${remainingRunwayMonths.toFixed(1)} months (below safe 3-6 month rule).`
    );
    remedyOptions.push('Wait until emergency fund is fortified before making this purchase.');
  }

  if (monthlyPayment > discretionaryCashFlow) {
    score -= 45;
    keyConcerns.push(
      `Monthly recurring impact exceeds your current surplus cash flow by ${(monthlyPayment - discretionaryCashFlow).toFixed(0)}.`
    );
    remedyOptions.push('Increase down payment or lower the item specification to reduce monthly drag.');
  } else if (monthlyPayment > discretionaryCashFlow * 0.5) {
    score -= 20;
    keyConcerns.push(
      `Consumes over 50% of your discretionary monthly cash flow, significantly slowing wealth accumulation.`
    );
  }

  if (postPurchaseDTI > 35) {
    score -= 25;
    keyConcerns.push(
      `Total debt-to-income ratio will climb to ${postPurchaseDTI.toFixed(0)}%, exceeding healthy lending thresholds.`
    );
  }

  let isAffordable: AffordabilityResult['isAffordable'] = 'yes';
  let headline = 'Affordable with Ease: Fits cleanly within cash flow and safety reserves.';

  if (score < 45 || remainingCash < 0) {
    isAffordable = 'no';
    headline = 'Not Recommended Today: This purchase severely strains your financial foundation.';
  } else if (score < 75) {
    isAffordable = 'caution';
    headline = 'Stretch Purchase: Feasible, but exposes you to cash-flow fragility or slows down your goals.';
  }

  if (remedyOptions.length === 0) {
    remedyOptions.push('Clear to proceed if this aligns with your core happiness and life priorities.');
    remedyOptions.push(`Remember the opportunity cost: ${purchaseCost.toLocaleString()} today could compound to substantial future wealth.`);
  }

  return {
    isAffordable,
    score: Math.max(0, score),
    headline,
    cashFlowImpactMonthly: Math.round(monthlyPayment),
    remainingRunwayMonths: Math.max(0, remainingRunwayMonths),
    opportunityCost10Years,
    opportunityCost20Years,
    keyConcerns,
    remedyOptions,
  };
}

/**
 * 3. DEBT VS INVEST DECISION ENGINE
 */
export function calculateDebtVsInvest(input: DebtVsInvestInput): DebtVsInvestResult {
  const {
    debtBalance,
    debtInterestRate,
    minMonthlyPayment,
    extraMonthlyCash,
    expectedInvestReturn,
    timeHorizonYears = 5,
  } = input;

  const totalMonthlyDebtCapacity = minMonthlyPayment + extraMonthlyCash;

  // Path A: Aggressive Debt Payoff
  // Calculate months to payoff with extra payment
  const monthlyDebtRate = debtInterestRate / 100 / 12;
  let monthsWithExtra = 0;
  let remainingBal = debtBalance;
  let totalInterestWithExtra = 0;

  if (monthlyDebtRate > 0) {
    while (remainingBal > 0 && monthsWithExtra < 360) {
      const interestMonth = remainingBal * monthlyDebtRate;
      totalInterestWithExtra += interestMonth;
      const principalMonth = totalMonthlyDebtCapacity - interestMonth;
      if (principalMonth <= 0) {
        monthsWithExtra = 360; // Payment doesn't cover interest
        break;
      }
      remainingBal -= principalMonth;
      monthsWithExtra++;
    }
  } else {
    monthsWithExtra = Math.ceil(debtBalance / totalMonthlyDebtCapacity);
  }

  // Calculate guaranteed interest saved compared to minimum payment only
  let monthsMinOnly = 0;
  let remainingBalMin = debtBalance;
  let totalInterestMinOnly = 0;
  if (monthlyDebtRate > 0) {
    while (remainingBalMin > 0 && monthsMinOnly < 360) {
      const interestMonth = remainingBalMin * monthlyDebtRate;
      totalInterestMinOnly += interestMonth;
      const principalMonth = minMonthlyPayment - interestMonth;
      if (principalMonth <= 0) {
        monthsMinOnly = 360;
        break;
      }
      remainingBalMin -= principalMonth;
      monthsMinOnly++;
    }
  }

  const guaranteedDebtSavings = Math.max(0, totalInterestMinOnly - totalInterestWithExtra);

  // Path B: Investing extra cash instead
  // Compound monthly for the timeHorizon
  const investMonthlyRate = expectedInvestReturn / 100 / 12;
  const totalMonths = timeHorizonYears * 12;
  let projectedInvestWealth = 0;

  for (let m = 0; m < totalMonths; m++) {
    projectedInvestWealth = (projectedInvestWealth + extraMonthlyCash) * (1 + investMonthlyRate);
  }

  // Break-even return: debt rate adjusted for realistic equity risk premium
  const breakEvenReturn = debtInterestRate;

  // Net benefit spread
  const netBenefitSpread = expectedInvestReturn - debtInterestRate;

  let recommendation: DebtVsInvestResult['recommendation'] = 'hybrid';
  let verdictTitle = '';
  let verdictExplanation = '';
  let hybridSplitRatio = '50% Debt Paydown / 50% Investing';

  if (debtInterestRate >= 9.5) {
    recommendation = 'pay_debt';
    verdictTitle = 'Pay Off Debt First (Guaranteed Return)';
    verdictExplanation = `Your debt carries a ${debtInterestRate}% APR. Paying it down provides a guaranteed, 100% risk-free return of ${debtInterestRate}%. No equity market can offer guaranteed returns at this level.`;
    hybridSplitRatio = '100% Debt / 0% Investing';
  } else if (debtInterestRate <= 6.5) {
    recommendation = 'invest';
    verdictTitle = 'Invest the Surplus (Long-Term Compounding)';
    verdictExplanation = `Your debt is low-cost (${debtInterestRate}%). With an expected long-term market return of ${expectedInvestReturn}%, historical math favors investing the extra surplus while making scheduled debt payments.`;
    hybridSplitRatio = '20% Debt / 80% Investing';
  } else {
    recommendation = 'hybrid';
    verdictTitle = 'Adopt a Balanced Hybrid Strategy';
    verdictExplanation = `Your interest rate (${debtInterestRate}%) sits in the grey zone. The mathematical advantage of investing is narrow when factoring in volatility and tax drag. Splitting your surplus gives both guaranteed balance reduction and investment habit momentum.`;
    hybridSplitRatio = '50% Debt / 50% Investing';
  }

  return {
    recommendation,
    verdictTitle,
    verdictExplanation,
    guaranteedDebtSavings: Math.round(guaranteedDebtSavings),
    projectedInvestWealth: Math.round(projectedInvestWealth),
    netBenefitSpread,
    breakEvenReturn,
    timelineMonthsToDebtFree: monthsWithExtra,
    hybridSplitRatio,
  };
}

/**
 * 4. RETIREMENT & FINANCIAL INDEPENDENCE (FIRE) SIMULATOR
 */
export function calculateFireSimulator(input: FireInput): FireResult {
  const {
    currentAge,
    targetRetireAge,
    currentInvestments,
    monthlyInvestment,
    annualRetirementSpend,
    expectedRealReturnRate,
    safeWithdrawalRate,
  } = input;

  const fireTargetNumber = Math.round(annualRetirementSpend / (safeWithdrawalRate / 100));
  const realRate = expectedRealReturnRate / 100;
  const annualContribution = monthlyInvestment * 12;

  // Coast FIRE threshold today
  const yearsToTarget = Math.max(1, targetRetireAge - currentAge);
  const coastFireThresholdToday = Math.round(fireTargetNumber / Math.pow(1 + realRate, yearsToTarget));
  const isCoastFireAchieved = currentInvestments >= coastFireThresholdToday;

  const trajectory: FireResult['trajectory'] = [];
  let balance = currentInvestments;
  let projectedFireAge = 99;

  for (let age = currentAge; age <= Math.max(80, targetRetireAge + 10); age++) {
    const yearIndex = age - currentAge;
    trajectory.push({
      age,
      year: new Date().getFullYear() + yearIndex,
      balance: Math.round(balance),
      fireTarget: fireTargetNumber,
    });

    if (balance >= fireTargetNumber && projectedFireAge === 99) {
      projectedFireAge = age;
    }

    if (age < targetRetireAge) {
      balance = balance * (1 + realRate) + annualContribution;
    } else {
      // In retirement: subtract spending
      balance = balance * (1 + realRate) - annualRetirementSpend;
    }
  }

  const projectedPortfolioAtTargetAge =
    trajectory.find((t) => t.age === targetRetireAge)?.balance || 0;
  const savingsGapOrSurplus = projectedPortfolioAtTargetAge - fireTargetNumber;

  return {
    fireTargetNumber,
    currentPortfolio: currentInvestments,
    projectedPortfolioAtTargetAge,
    projectedFireAge,
    coastFireThresholdToday,
    isCoastFireAchieved,
    savingsGapOrSurplus,
    trajectory,
  };
}

/**
 * 4B. RETIREMENT BUILD-TO-UTILISE LIFECYCLE SIMULATOR
 * Complete accumulation (SIP + Step-Up + CAGR) and decumulation (inflation-escalated withdrawals)
 * Calculates the exact years this fund will provide retirement income.
 */
export function calculateRetirementBuildUtilise(
  input: RetirementBuildUtiliseInput
): RetirementBuildUtiliseResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentInvestments,
    monthlySip,
    stepUpPercent,
    expectedPreRetirementCagr,
    inflationRate,
    monthlyExpensesToday,
    yearlyIncreaseInWithdrawalPercent,
    postRetirementCagr,
  } = input;

  const preMonthlyRate = expectedPreRetirementCagr / 100 / 12;
  const postMonthlyRate = postRetirementCagr / 100 / 12;
  const buildYears = Math.max(1, retirementAge - currentAge);
  const startYear = new Date().getFullYear();

  const schedule: RetirementYearData[] = [];

  // PHASE 1: BUILD (ACCUMULATION)
  let corpus = Math.max(0, currentInvestments);
  let currentMonthlySip = monthlySip;
  let totalInvestedDuringBuild = currentInvestments;

  for (let y = 0; y < buildYears; y++) {
    const age = currentAge + y;
    const year = startYear + y;
    const startingCorpus = Math.round(corpus);
    const annualContribution = Math.round(currentMonthlySip * 12);
    totalInvestedDuringBuild += annualContribution;

    // Simulate 12 months compounding with monthly SIP
    for (let m = 0; m < 12; m++) {
      corpus = corpus * (1 + preMonthlyRate) + currentMonthlySip;
    }

    const endingCorpus = Math.round(corpus);
    const growthEarned = endingCorpus - startingCorpus - annualContribution;

    schedule.push({
      age,
      year,
      phase: 'build',
      startingCorpus,
      monthlyCashflow: Math.round(currentMonthlySip),
      annualContribution,
      annualWithdrawal: 0,
      growthEarned: Math.max(0, growthEarned),
      endingCorpus,
      isDepleted: false,
    });

    // Step-up monthly SIP for the next year
    currentMonthlySip = currentMonthlySip * (1 + stepUpPercent / 100);
  }

  const corpusAtRetirement = Math.round(corpus);

  // Transition to Retirement Expenses
  // Inflation adjustment from current age to retirement age
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, buildYears);
  const monthlyExpenseAtRetirement = Math.round(monthlyExpensesToday * inflationMultiplier);
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

  // SWR rule-of-thumb baseline (25x)
  const fireNumberTarget = Math.round(annualExpenseAtRetirement * 25);
  // Coast FIRE today: corpus needed today that compounds to fireNumberTarget without further SIP
  const realPreRate = (expectedPreRetirementCagr - inflationRate) / 100;
  const coastFireToday = Math.round(
    fireNumberTarget / Math.pow(1 + Math.max(0.01, realPreRate), buildYears)
  );
  const isCoastFireAchieved = currentInvestments >= coastFireToday;

  // PHASE 2: UTILISE (DECUMULATION & DISTRIBUTION)
  const maxSimAge = Math.max(100, lifeExpectancy + 10);
  let utiliseBalance = corpusAtRetirement;
  let currentAnnualWithdrawal = annualExpenseAtRetirement;
  let totalWithdrawnDuringRetirement = 0;
  let ageDepleted: number | null = null;
  let monthsFundLasted = 0;
  let isDepleted = false;

  for (let age = retirementAge; age <= maxSimAge; age++) {
    const yearIndex = age - currentAge;
    const year = startYear + yearIndex;
    const startingCorpus = Math.round(utiliseBalance);
    const monthlyWithdrawal = Math.round(currentAnnualWithdrawal / 12);
    let yearWithdrawal = 0;

    if (isDepleted || utiliseBalance <= 0) {
      schedule.push({
        age,
        year,
        phase: 'utilise',
        startingCorpus: 0,
        monthlyCashflow: 0,
        annualContribution: 0,
        annualWithdrawal: 0,
        growthEarned: 0,
        endingCorpus: 0,
        isDepleted: true,
      });
      continue;
    }

    // Simulate 12 months with monthly withdrawal & monthly post-retirement growth
    for (let m = 0; m < 12; m++) {
      if (utiliseBalance <= 0) {
        if (!isDepleted) {
          isDepleted = true;
          ageDepleted = age + Math.round((m / 12) * 10) / 10;
        }
        break;
      }
      monthsFundLasted++;
      const withdraw = Math.min(utiliseBalance, monthlyWithdrawal);
      yearWithdrawal += withdraw;
      totalWithdrawnDuringRetirement += withdraw;
      utiliseBalance -= withdraw;
      // Remaining corpus grows at post-retirement rate
      utiliseBalance = utiliseBalance * (1 + postMonthlyRate);
    }

    const endingCorpus = Math.max(0, Math.round(utiliseBalance));
    const growthEarned = endingCorpus - startingCorpus + yearWithdrawal;

    schedule.push({
      age,
      year,
      phase: 'utilise',
      startingCorpus,
      monthlyCashflow: monthlyWithdrawal,
      annualContribution: 0,
      annualWithdrawal: Math.round(yearWithdrawal),
      growthEarned: Math.round(Math.max(0, growthEarned)),
      endingCorpus,
      isDepleted: endingCorpus <= 0,
    });

    if (endingCorpus <= 0 && !isDepleted) {
      isDepleted = true;
      ageDepleted = age + 1;
    }

    // Annual withdrawal increases by user-specified inflation rate
    currentAnnualWithdrawal = currentAnnualWithdrawal * (1 + yearlyIncreaseInWithdrawalPercent / 100);
  }

  const yearsFundLastsPostRetirement = Math.round((monthsFundLasted / 12) * 10) / 10;
  const survivesLifeExpectancy = ageDepleted === null || ageDepleted >= lifeExpectancy;

  const dataAtLifeExpectancy = schedule.find((s) => s.age === lifeExpectancy);
  const balanceAtLifeExpectancy = dataAtLifeExpectancy ? dataAtLifeExpectancy.endingCorpus : 0;

  // Target Corpus Needed at Retirement to sustain withdrawals until lifeExpectancy
  const retirementSpan = Math.max(1, lifeExpectancy - retirementAge);
  let targetCorpusNeededAtRetirement = 0;
  let simW = annualExpenseAtRetirement;
  for (let k = 0; k < retirementSpan; k++) {
    const df = Math.pow(1 + postRetirementCagr / 100, k + 0.5);
    targetCorpusNeededAtRetirement += simW / df;
    simW = simW * (1 + yearlyIncreaseInWithdrawalPercent / 100);
  }
  targetCorpusNeededAtRetirement = Math.round(targetCorpusNeededAtRetirement);

  // Required starting SIP today to reach targetCorpusNeededAtRetirement
  let testSip = 1000;
  let testCorpus = 0;
  for (let y = 0; y < buildYears; y++) {
    const yrSip = testSip * Math.pow(1 + stepUpPercent / 100, y);
    for (let m = 0; m < 12; m++) {
      testCorpus = testCorpus * (1 + preMonthlyRate) + yrSip;
    }
  }
  const growthOfInitial = currentInvestments * Math.pow(1 + expectedPreRetirementCagr / 100, buildYears);
  const shortfallAtRetirement = Math.max(0, targetCorpusNeededAtRetirement - growthOfInitial);
  const requiredMonthlySip = testCorpus > 0
    ? Math.round((shortfallAtRetirement / testCorpus) * testSip)
    : 0;

  return {
    corpusAtRetirement,
    monthlyExpenseAtRetirement,
    annualExpenseAtRetirement,
    yearsFundLastsPostRetirement,
    ageDepleted: ageDepleted !== null ? Math.round(ageDepleted * 10) / 10 : null,
    survivesLifeExpectancy,
    balanceAtLifeExpectancy,
    totalInvestedDuringBuild: Math.round(totalInvestedDuringBuild),
    totalWithdrawnDuringRetirement: Math.round(totalWithdrawnDuringRetirement),
    requiredMonthlySip,
    targetCorpusNeededAtRetirement,
    fireNumberTarget,
    coastFireToday,
    isCoastFireAchieved,
    schedule,
  };
}


/**
 * 5. DEBT SNOWBALL VS. AVALANCHE OPTIMIZER
 */
export function calculateSnowballVsAvalanche(
  debts: DebtItem[],
  extraMonthlyPayment: number
): DebtPayoffComparison {
  if (debts.length === 0) {
    return {
      avalanche: { totalInterest: 0, monthsToDebtFree: 0, debtFreeDate: 'Now', order: [] },
      snowball: { totalInterest: 0, monthsToDebtFree: 0, debtFreeDate: 'Now', order: [] },
      differenceInterest: 0,
      recommendedMethod: 'avalanche',
      recommendationReason: 'No debts entered.',
    };
  }

  const simulate = (orderType: 'avalanche' | 'snowball') => {
    // Clone debts
    const list = debts.map((d) => ({ ...d }));
    // Sort
    if (orderType === 'avalanche') {
      list.sort((a, b) => b.interestRate - a.interestRate);
    } else {
      list.sort((a, b) => a.balance - b.balance);
    }

    const orderNames = list.map((d) => d.name);
    let months = 0;
    let totalInterest = 0;
    let extra = extraMonthlyPayment;

    while (list.some((d) => d.balance > 0) && months < 360) {
      months++;
      let freedUpMinPayment = 0;

      // 1. Pay interest and min payments
      for (const d of list) {
        if (d.balance > 0) {
          const monthlyRate = d.interestRate / 100 / 12;
          const interest = d.balance * monthlyRate;
          totalInterest += interest;
          d.balance += interest;

          const payment = Math.min(d.balance, d.minPayment);
          d.balance -= payment;

          if (d.balance <= 0) {
            d.balance = 0;
            freedUpMinPayment += d.minPayment;
          }
        }
      }

      // 2. Direct extra cash + freed payments to priority target
      let availableBonus = extra + freedUpMinPayment;
      for (const d of list) {
        if (d.balance > 0 && availableBonus > 0) {
          const applied = Math.min(d.balance, availableBonus);
          d.balance -= applied;
          availableBonus -= applied;
        }
      }
    }

    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const debtFreeDate = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    return {
      totalInterest: Math.round(totalInterest),
      monthsToDebtFree: months,
      debtFreeDate,
      order: orderNames,
    };
  };

  const avalanche = simulate('avalanche');
  const snowball = simulate('snowball');
  const diff = snowball.totalInterest - avalanche.totalInterest;

  let recommendedMethod: 'avalanche' | 'snowball' = 'avalanche';
  let recommendationReason = '';

  if (diff > 500) {
    recommendedMethod = 'avalanche';
    recommendationReason = `The Avalanche method saves ${diff.toLocaleString()} in interest by targeting the highest APR first.`;
  } else {
    recommendedMethod = 'snowball';
    recommendationReason = `Interest difference is minimal (${diff.toLocaleString()}). The Snowball method provides faster psychological wins by knocking out small balances first.`;
  }

  return {
    avalanche,
    snowball,
    differenceInterest: Math.abs(diff),
    recommendedMethod,
    recommendationReason,
  };
}

/**
 * 6. PREPAY VS. INVEST SIDE-BY-SIDE VISUAL SHOWDOWN ENGINE
 * Mathematically rigorously compares:
 * Path A: Prepaying home loan aggressively + redirecting full freed-up EMI into SIP once debt-free
 * Path B: Continuing regular EMI + investing extra cash into equity SIP for the full tenure
 * Over the exact same total time horizon.
 */
export function calculatePrepayVsInvest(input: PrepayVsInvestInput): PrepayVsInvestResult {
  const {
    loanOutstanding,
    loanInterestRate,
    remainingTenureYears,
    monthlyExtraCash,
    annualStepUpPct,
    expectedInvestReturn,
    includeTaxBenefit,
    taxBracketPct,
  } = input;

  const P = Math.max(1000, loanOutstanding);
  const nominalRate = Math.max(0.1, loanInterestRate);
  const tenureYears = Math.max(1, remainingTenureYears);
  const totalBaseMonths = tenureYears * 12;

  // Effective borrowing rate accounting for Indian Sec 24b or general mortgage interest tax relief
  // Under Sec 24b, max ₹2,00,000 deduction on interest. If included, tax relief is ~ (rate * bracket) on eligible portion
  let effectiveLoanRate = nominalRate;
  if (includeTaxBenefit) {
    const taxShieldPct = (taxBracketPct / 100) * 0.22; // Conservative average effective relief
    effectiveLoanRate = Math.max(1.0, nominalRate * (1 - taxShieldPct));
  }

  const monthlyLoanRate = effectiveLoanRate / 100 / 12;
  const baseMonthlyRate = nominalRate / 100 / 12;

  // Standard Base EMI
  let baseEmi = 0;
  if (baseMonthlyRate > 0) {
    baseEmi = Math.round(
      (P * baseMonthlyRate * Math.pow(1 + baseMonthlyRate, totalBaseMonths)) /
        (Math.pow(1 + baseMonthlyRate, totalBaseMonths) - 1)
    );
  } else {
    baseEmi = Math.round(P / totalBaseMonths);
  }

  // Monthly Investment return
  const monthlyInvestRate = Math.max(0, expectedInvestReturn) / 100 / 12;

  // Internal simulator runner function for any arbitrary equity return rate (used also for breakeven solver)
  const runSimulation = (equityAnnualReturn: number) => {
    const mInvestRate = Math.max(0, equityAnnualReturn) / 100 / 12;

    // --- Path A Simulation (Prepayment + Post-debt SIP) ---
    let balA = P;
    let totalIntA = 0;
    let monthsToFreeA = totalBaseMonths;
    let debtFreeFound = false;
    let investPortfolioA = 0;

    // --- Path B Simulation (Regular EMI + Consistent Extra SIP) ---
    let balB = P;
    let totalIntB = 0;
    let investPortfolioB = 0;
    let investedPrincipalB = 0;

    const yearlyData: PrepayVsInvestYearData[] = [];

    for (let m = 1; m <= totalBaseMonths; m++) {
      const yearIndex = Math.floor((m - 1) / 12);
      const extraThisMonth = monthlyExtraCash * Math.pow(1 + (annualStepUpPct || 0) / 100, yearIndex);

      // Path A Loan step
      if (balA > 0) {
        const intA = balA * monthlyLoanRate;
        totalIntA += intA;
        const targetPayA = baseEmi + extraThisMonth;
        const princA = Math.min(balA, Math.max(0, targetPayA - intA));
        balA -= princA;
        if (balA <= 0 && !debtFreeFound) {
          monthsToFreeA = m;
          debtFreeFound = true;
          balA = 0;
        }
      } else {
        // Once debt free, redirect FULL outlay (baseEmi + extraThisMonth) into SIP!
        const redirectSip = baseEmi + extraThisMonth;
        investPortfolioA = investPortfolioA * (1 + mInvestRate) + redirectSip;
      }

      // Path B Loan & Invest step
      if (balB > 0) {
        const intB = balB * monthlyLoanRate;
        totalIntB += intB;
        const princB = Math.min(balB, Math.max(0, baseEmi - intB));
        balB -= princB;
      }
      investPortfolioB = investPortfolioB * (1 + mInvestRate) + extraThisMonth;
      investedPrincipalB += extraThisMonth;

      // Track yearly milestone data
      if (m % 12 === 0 || m === totalBaseMonths) {
        const currentYear = Math.ceil(m / 12);
        // Financial net wealth above property = investment portfolio - remaining debt
        yearlyData.push({
          year: currentYear,
          pathALoanBalance: Math.round(balA),
          pathAInvestPortfolio: Math.round(investPortfolioA),
          pathANetWealth: Math.round(investPortfolioA - balA),
          pathBLoanBalance: Math.round(balB),
          pathBInvestPortfolio: Math.round(investPortfolioB),
          pathBNetWealth: Math.round(investPortfolioB - balB),
        });
      }
    }

    return {
      totalIntA: Math.round(totalIntA),
      monthsToFreeA: debtFreeFound ? monthsToFreeA : totalBaseMonths,
      investPortfolioA: Math.round(investPortfolioA),
      totalIntB: Math.round(totalIntB),
      investPortfolioB: Math.round(investPortfolioB),
      investedPrincipalB: Math.round(investedPrincipalB),
      yearlyData,
    };
  };

  const simResult = runSimulation(expectedInvestReturn);

  // Binary search for exact breakeven equity return
  let low = 0.0;
  let high = 30.0;
  let breakevenReturnRate = nominalRate;
  for (let iter = 0; iter < 24; iter++) {
    const mid = (low + high) / 2;
    const testSim = runSimulation(mid);
    const diff = testSim.investPortfolioB - testSim.investPortfolioA;
    if (diff > 0) {
      high = mid;
    } else {
      low = mid;
    }
  }
  breakevenReturnRate = parseFloat(((low + high) / 2).toFixed(2));

  const pathAInterestSaved = Math.max(0, simResult.totalIntB - simResult.totalIntA);
  const netWealthDiff = simResult.investPortfolioB - simResult.investPortfolioA;

  let winner: 'invest' | 'prepay' | 'balanced' = 'balanced';
  const baseline = Math.max(1, Math.min(simResult.investPortfolioA, simResult.investPortfolioB));
  const marginPct = (Math.abs(netWealthDiff) / baseline) * 100;

  if (netWealthDiff > 50000 && marginPct > 4) {
    winner = 'invest';
  } else if (netWealthDiff < -50000 && marginPct > 4) {
    winner = 'prepay';
  } else {
    winner = 'balanced';
  }

  const pathAYearsToDebtFree = parseFloat((simResult.monthsToFreeA / 12).toFixed(1));
  const postDebtMonthlySip = baseEmi + monthlyExtraCash;

  return {
    baseEmi,
    totalBaseMonths,
    pathAMonthsToDebtFree: simResult.monthsToFreeA,
    pathAYearsToDebtFree,
    pathATotalInterestPaid: simResult.totalIntA,
    pathAInterestSaved,
    pathAFinalInvestPortfolio: simResult.investPortfolioA,
    pathATotalOutlay: P + simResult.totalIntA,
    pathAPostDebtMonthlySip: postDebtMonthlySip,
    pathBTotalInterestPaid: simResult.totalIntB,
    pathBFinalInvestPortfolio: simResult.investPortfolioB,
    pathBTotalInvestedPrincipal: simResult.investedPrincipalB,
    pathBTotalOutlay: P + simResult.totalIntB,
    netWealthDifference: netWealthDiff,
    winner,
    winnerMarginPercent: parseFloat(marginPct.toFixed(1)),
    breakevenReturnRate,
    effectiveLoanRate: parseFloat(effectiveLoanRate.toFixed(2)),
    trajectory: simResult.yearlyData,
  };
}
