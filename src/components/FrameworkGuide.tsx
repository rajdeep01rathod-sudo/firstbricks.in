import React from 'react';
import { ArrowRight, ShieldCheck, Wallet, Flame, Target, Sliders, CheckCircle2 } from 'lucide-react';

interface FrameworkGuideProps {
  onSelectTool: (tool: string) => void;
}

export const FrameworkGuide: React.FC<FrameworkGuideProps> = ({ onSelectTool }) => {
  const bricks = [
    {
      number: 1,
      name: 'Cash & Liquidity',
      tagline: 'The Foundation of Survival',
      goal: '3 to 6 months of living expenses in an accessible, low-risk account',
      why: 'Without cash liquidity, any emergency forces you into high-interest debt or forced selling of long-term investments during market crashes.',
      rules: [
        'Keep 1-2 months in daily checking/savings account',
        'Keep remaining 4-5 months in high-yield savings / liquid mutual funds',
        'Never invest your emergency fund into volatile equity or speculative crypto',
      ],
      toolAction: 'health-check',
      toolLabel: 'Check Your Cash Runway',
    },
    {
      number: 2,
      name: 'Protection',
      tagline: 'Risk Transfer & Capital Defense',
      goal: 'Independent health insurance and pure term life insurance',
      why: 'A single critical illness or catastrophic event can erase a decade of compounding wealth in weeks.',
      rules: [
        'Do not rely solely on employer group medical cover (it terminates if laid off)',
        'Buy pure term insurance equal to 10x to 15x annual income if you have dependents',
        'Avoid investment-linked insurance (ULIPs / endowment plans) that carry high fees',
      ],
      toolAction: 'health-check',
      toolLabel: 'Assess Insurance Adequacy',
    },
    {
      number: 3,
      name: 'Debt Control',
      tagline: 'Eliminating the Negative Compounders',
      goal: 'Zero toxic high-interest debt and Debt-to-Income (DTI) below 25%',
      why: 'Credit cards (24-42% APR) and personal loans (12-18% APR) mathematically overpower equity market compounding. Elimination yields guaranteed risk-free return.',
      rules: [
        'Pay off any balance carrying an APR above 10% before aggressive investing',
        'Use Debt Avalanche to minimize interest, or Snowball for psychological speed',
        'Cap total monthly debt obligations at under 30% of take-home pay',
      ],
      toolAction: 'debt-payoff',
      toolLabel: 'Run Debt Payoff Simulator',
    },
    {
      number: 4,
      name: 'Wealth Engine',
      tagline: 'Consistent Long-Term Compounding',
      goal: 'Savings rate of 20% to 50%+ into diversified broad-market assets',
      why: 'Compounding is the eighth wonder of the world. Time in the market and high savings velocity drive 90% of financial independence.',
      rules: [
        'Automate monthly investment on the exact day your salary deposits',
        'Stick with low-cost, broad-market index funds (Nifty 50 / S&P 500 / Total World)',
        'Never attempt market timing or day trading your primary savings',
      ],
      toolAction: 'fire-engine',
      toolLabel: 'Explore FIRE Trajectory',
    },
    {
      number: 5,
      name: 'Major Life Goals',
      tagline: 'Purpose-Driven Capital Allocation',
      goal: 'Matching time horizons with the appropriate asset classes',
      why: 'Goals with horizons under 3-5 years (home down payment, car, wedding) cannot withstand stock market drawdown volatility.',
      rules: [
        'Goals < 3 years: Fixed deposits, short-duration debt instruments',
        'Goals 3-7 years: Conservative hybrid / balanced allocation',
        'Goals 7+ years: Equity index funds for inflation-beating growth',
      ],
      toolAction: 'affordability',
      toolLabel: 'Test Purchase Affordability',
    },
    {
      number: 6,
      name: 'Optimization',
      tagline: 'Friction Reduction & Estate Planning',
      goal: 'Tax harvesting, expense ratio minimization, rebalancing, and estate wills',
      why: 'Once foundation bricks are established, trimming 0.5% in fees and tax leakages compounds into hundreds of thousands over a lifetime.',
      rules: [
        'Rebalance your portfolio once per year back to target asset allocation',
        'Utilize tax-saving allowances (PPF, NPS, 401k/IRA, Section 80C)',
        'Establish registered nominees, health proxies, and clear wills',
      ],
      toolAction: 'health-check',
      toolLabel: 'Check Foundation Score',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 pb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
          Architectural Philosophy
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          The 6 Financial Bricks
        </h1>
        <p className="text-base text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Most personal finance fails because people try to lay Brick 4 (speculative investing) before laying Brick 1 (cash safety) and Brick 2 (defense). First Bricks organizes your financial life into a sequence where each layer supports the next.
        </p>
      </div>

      {/* Grid of 6 Bricks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bricks.map((brick) => (
          <div
            key={brick.number}
            className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                <span className="text-xs font-mono font-bold text-neutral-500">
                  BRICK {brick.number}
                </span>
                <span className="text-xs text-neutral-400">Sequential Layer</span>
              </div>

              <h2 className="text-xl font-bold text-neutral-900">{brick.name}</h2>
              <div className="text-xs font-medium text-neutral-500 mt-0.5 mb-3">
                {brick.tagline}
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 mb-4 text-xs">
                <span className="font-semibold text-neutral-800">Target Standard: </span>
                <span className="text-neutral-700">{brick.goal}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {brick.why}
              </p>

              <div className="space-y-1.5 mb-6">
                <span className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider block">
                  Ground Rules
                </span>
                {brick.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectTool(brick.toolAction)}
              className="w-full mt-2 py-2 px-3 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{brick.toolLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
