import React, { useState, useMemo } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateSnowballVsAvalanche } from '../utils/financeEngine';
import { DebtItem } from '../types/finance';
import {
  Plus,
  Trash2,
  Zap,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';

export const DebtPayoffTool: React.FC = () => {
  const { userSnapshot, format, currency } = useCurrency();
  const isINR = currency === 'INR';

  // 100% Standalone initial presets
  const initialDebts: DebtItem[] = isINR
    ? [
        { id: '1', name: 'Credit Card Outstanding', balance: 75000, interestRate: 36.0, minPayment: 4000 },
        { id: '2', name: 'Personal Loan', balance: 220000, interestRate: 14.5, minPayment: 7200 },
        { id: '3', name: 'Car Loan', balance: 350000, interestRate: 9.0, minPayment: 8500 },
      ]
    : [
        { id: '1', name: 'Credit Card Balance', balance: 4500, interestRate: 24.9, minPayment: 150 },
        { id: '2', name: 'Personal Loan', balance: 12000, interestRate: 11.5, minPayment: 320 },
        { id: '3', name: 'Auto Loan', balance: 18000, interestRate: 6.8, minPayment: 410 },
      ];

  const [debts, setDebts] = useState<DebtItem[]>(() => {
    if (userSnapshot.totalDebt > 0 && userSnapshot.monthlyDebtPayment > 0) {
      return [
        {
          id: 'profile_debt_1',
          name: 'Existing Debt Balance',
          balance: userSnapshot.totalDebt,
          interestRate: userSnapshot.debtInterestRate || 12.0,
          minPayment: userSnapshot.monthlyDebtPayment,
        },
      ];
    }
    return initialDebts;
  });

  const defaultExtra = userSnapshot.monthlySavings > 0 
    ? Math.round(userSnapshot.monthlySavings * 0.5) 
    : (isINR ? 10000 : 300);

  const [extraPayment, setExtraPayment] = useState<number>(defaultExtra);

  // New debt form state
  const [newName, setNewName] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newMin, setNewMin] = useState('');

  const addDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBalance) return;
    const item: DebtItem = {
      id: Date.now().toString(),
      name: newName,
      balance: Math.max(1, Number(newBalance) || 1000),
      interestRate: Math.max(0.1, Number(newRate) || 10),
      minPayment: Math.max(10, Number(newMin) || 100),
    };
    setDebts([...debts, item]);
    setNewName('');
    setNewBalance('');
    setNewRate('');
    setNewMin('');
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const handlePrefillFromProfile = () => {
    if (userSnapshot.totalDebt > 0) {
      setDebts([
        {
          id: 'profile_debt_1',
          name: 'Profile Total Debt',
          balance: userSnapshot.totalDebt,
          interestRate: userSnapshot.debtInterestRate || 11.5,
          minPayment: userSnapshot.monthlyDebtPayment || (isINR ? 12000 : 450),
        },
      ]);
      setExtraPayment(userSnapshot.monthlySavings > 0 ? Math.round(userSnapshot.monthlySavings * 0.5) : defaultExtra);
    }
  };

  const handleResetDefaults = () => {
    setDebts(initialDebts);
    setExtraPayment(isINR ? 10000 : 300);
  };

  const comparison = useMemo(() => {
    return calculateSnowballVsAvalanche(debts, extraPayment);
  }, [debts, extraPayment]);

  const totalBalance = debts.reduce((acc, d) => acc + d.balance, 0);
  const totalMinPayment = debts.reduce((acc, d) => acc + d.minPayment, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Soothing Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Standalone Payoff Strategy Engine</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Independent Variables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Debt Avalanche vs. Snowball Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Compare the guaranteed interest savings of the mathematical Avalanche method versus the psychological quick wins of the Snowball method.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {userSnapshot.totalDebt > 0 && (
            <button
              type="button"
              onClick={handlePrefillFromProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prefill Profile Debt</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DEBTS LIST & EXTRA ACCELERATOR (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Debts Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Your Debt Portfolio</h3>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Total: <strong className="text-slate-800">{format(totalBalance)}</strong> • Min EMIs: {format(totalMinPayment)}/mo
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {debts.length} {debts.length === 1 ? 'Debt' : 'Debts'}
              </span>
            </div>

            <div className="space-y-2.5">
              {debts.map((debt) => (
                <div
                  key={debt.id}
                  className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-slate-900 truncate">{debt.name}</div>
                    <div className="text-slate-500 text-[11px]">
                      Balance: <span className="font-bold tabular-nums text-slate-800">{format(debt.balance)}</span> • <span className="text-amber-800 font-semibold">{debt.interestRate}% APR</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="font-bold tabular-nums text-slate-700 text-xs">
                      {format(debt.minPayment)}/mo
                    </span>
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove debt"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add new debt form */}
            <form onSubmit={addDebt} className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 block">Add Another Debt Item</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="e.g. Credit Card, Auto Loan"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Balance Amount"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none tabular-nums"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step={0.1}
                  placeholder="Interest APR %"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none tabular-nums"
                />
                <input
                  type="number"
                  placeholder="Min Monthly Payment"
                  value={newMin}
                  onChange={(e) => setNewMin(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50/50 focus:bg-white focus:outline-none tabular-nums"
                />
              </div>
              <button
                type="submit"
                className="w-full text-xs font-bold py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add to Payoff Plan
              </button>
            </form>
          </div>

          {/* Extra Payment Accelerator */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900">
                Monthly Accelerator Budget (Extra Cash)
              </label>
              <span className="text-xs font-extrabold tabular-nums text-emerald-800">
                +{format(extraPayment)}/mo
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={isINR ? 50000 : 2000}
              step={isINR ? 1000 : 50}
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{format(0)}</span>
              <span>{format(isINR ? 25000 : 1000)}</span>
              <span>{format(isINR ? 50000 : 2000)}</span>
            </div>
          </div>
        </div>

        {/* COMPARISON & SAVINGS BREAKDOWN (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Side-by-side Strategy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Avalanche Method */}
            <div className="bg-white border-2 border-emerald-500/80 rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm relative">
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Math Winner
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-black text-slate-900">Debt Avalanche</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tackle highest-interest debt first. Saves the most interest and pays off debt fastest mathematically.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Debt-Free In:</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">{comparison.avalanche.monthsToDebtFree} Months</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Interest Outlay:</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">{format(comparison.avalanche.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-100">
                  <span className="text-emerald-700">Estimated Payoff Date:</span>
                  <span className="text-emerald-700 tabular-nums">{comparison.avalanche.debtFreeDate}</span>
                </div>
              </div>
            </div>

            {/* Snowball Method */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs relative">
              <div className="absolute top-4 right-4 bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Psychology Winner
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-600" />
                <h4 className="text-sm font-black text-slate-900">Debt Snowball</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tackle smallest balance first. Creates rapid psychological momentum with quick wins.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Debt-Free In:</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">{comparison.snowball.monthsToDebtFree} Months</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Interest Outlay:</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">{format(comparison.snowball.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-100">
                  <span className="text-sky-700">Estimated Payoff Date:</span>
                  <span className="text-sky-700 tabular-nums">{comparison.snowball.debtFreeDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tranquil Comparison Delta Card */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Strategy Trade-Off</span>
              <span className="text-xs font-semibold text-emerald-800">
                Avalanche saves {format(comparison.differenceInterest)} more
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {comparison.recommendationReason ||
                'If you feel overwhelmed by multiple debt accounts, choose Snowball for the quick emotional wins. If you want maximum savings and strict mathematical optimization, choose Avalanche.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
