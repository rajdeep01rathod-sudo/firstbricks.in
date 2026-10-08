import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, FinancialSnapshotInput } from '../types/finance';
import { formatCurrency, formatPercent, formatMonths } from '../utils/formatters';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (amount: number, compact?: boolean, precision?: number) => string;
  formatPct: (value: number, decimals?: number) => string;
  formatMo: (months: number) => string;
  userSnapshot: FinancialSnapshotInput;
  updateUserSnapshot: (partial: Partial<FinancialSnapshotInput>) => void;
  resetSnapshot: () => void;
  loadPresetProfile: (presetKey: 'starter' | 'family' | 'fire') => void;
}

export const PRESETS_INR = {
  starter: {
    age: 24,
    monthlyIncome: 65000,
    monthlyExpenses: 38000,
    essentialExpenses: 26000,
    cashSavings: 80000,
    totalDebt: 60000,
    debtInterestRate: 14.0,
    monthlyDebtPayment: 4000,
    investments: 50000,
    monthlySavings: 15000,
    hasHealthInsurance: true,
    hasTermLifeInsurance: false,
    primaryGoal: 'emergency_fund' as const,
  },
  family: {
    age: 34,
    monthlyIncome: 180000,
    monthlyExpenses: 95000,
    essentialExpenses: 70000,
    cashSavings: 450000,
    totalDebt: 3800000,
    debtInterestRate: 8.5,
    monthlyDebtPayment: 36000,
    investments: 1400000,
    monthlySavings: 42000,
    hasHealthInsurance: true,
    hasTermLifeInsurance: true,
    primaryGoal: 'investing' as const,
  },
  fire: {
    age: 30,
    monthlyIncome: 220000,
    monthlyExpenses: 65000,
    essentialExpenses: 45000,
    cashSavings: 600000,
    totalDebt: 0,
    debtInterestRate: 0,
    monthlyDebtPayment: 0,
    investments: 3200000,
    monthlySavings: 120000,
    hasHealthInsurance: true,
    hasTermLifeInsurance: true,
    primaryGoal: 'fire_retirement' as const,
  },
};

export const PRESETS_USD = {
  starter: {
    age: 24,
    monthlyIncome: 4500,
    monthlyExpenses: 3100,
    essentialExpenses: 2200,
    cashSavings: 5000,
    totalDebt: 12000,
    debtInterestRate: 12.0,
    monthlyDebtPayment: 350,
    investments: 6000,
    monthlySavings: 600,
    hasHealthInsurance: true,
    hasTermLifeInsurance: false,
    primaryGoal: 'emergency_fund' as const,
  },
  family: {
    age: 34,
    monthlyIncome: 11000,
    monthlyExpenses: 6800,
    essentialExpenses: 5200,
    cashSavings: 35000,
    totalDebt: 280000,
    debtInterestRate: 6.8,
    monthlyDebtPayment: 2100,
    investments: 110000,
    monthlySavings: 1800,
    hasHealthInsurance: true,
    hasTermLifeInsurance: true,
    primaryGoal: 'investing' as const,
  },
  fire: {
    age: 30,
    monthlyIncome: 12500,
    monthlyExpenses: 4200,
    essentialExpenses: 3000,
    cashSavings: 40000,
    totalDebt: 0,
    debtInterestRate: 0,
    monthlyDebtPayment: 0,
    investments: 220000,
    monthlySavings: 6500,
    hasHealthInsurance: true,
    hasTermLifeInsurance: true,
    primaryGoal: 'fire_retirement' as const,
  },
};

const DEFAULT_INR_SNAPSHOT: FinancialSnapshotInput = {
  age: 29,
  monthlyIncome: 125000,
  monthlyExpenses: 55000,
  essentialExpenses: 38000,
  cashSavings: 280000,
  totalDebt: 320000,
  debtInterestRate: 11.5,
  monthlyDebtPayment: 14500,
  investments: 650000,
  monthlySavings: 35000,
  hasHealthInsurance: true,
  hasTermLifeInsurance: false,
  primaryGoal: 'fire_retirement',
};

const DEFAULT_USD_SNAPSHOT: FinancialSnapshotInput = {
  age: 29,
  monthlyIncome: 7500,
  monthlyExpenses: 4200,
  essentialExpenses: 3000,
  cashSavings: 18000,
  totalDebt: 22000,
  debtInterestRate: 9.8,
  monthlyDebtPayment: 750,
  investments: 52000,
  monthlySavings: 1800,
  hasHealthInsurance: true,
  hasTermLifeInsurance: true,
  primaryGoal: 'fire_retirement',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always INR as requested by user for firstbricks.in
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');

  const [userSnapshot, setUserSnapshot] = useState<FinancialSnapshotInput>(() => {
    try {
      const saved = localStorage.getItem('fb_snapshot_INR');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_INR_SNAPSHOT;
  });

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('fb_currency', newCurrency);
      const saved = localStorage.getItem('fb_snapshot_' + newCurrency);
      if (saved) {
        setUserSnapshot(JSON.parse(saved));
      } else {
        setUserSnapshot(newCurrency === 'USD' ? DEFAULT_USD_SNAPSHOT : DEFAULT_INR_SNAPSHOT);
      }
    } catch {}
  };

  const updateUserSnapshot = (partial: Partial<FinancialSnapshotInput>) => {
    setUserSnapshot((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem('fb_snapshot_' + currency, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetSnapshot = () => {
    const defaults = currency === 'USD' ? DEFAULT_USD_SNAPSHOT : DEFAULT_INR_SNAPSHOT;
    setUserSnapshot(defaults);
    try {
      localStorage.setItem('fb_snapshot_' + currency, JSON.stringify(defaults));
    } catch {}
  };

  const loadPresetProfile = (presetKey: 'starter' | 'family' | 'fire') => {
    const table = currency === 'USD' ? PRESETS_USD : PRESETS_INR;
    const preset = table[presetKey];
    if (preset) {
      setUserSnapshot(preset);
      try {
        localStorage.setItem('fb_snapshot_' + currency, JSON.stringify(preset));
      } catch {}
    }
  };

  const format = (amount: number, compact: boolean = false, precision: number = 0) => {
    return formatCurrency(amount, currency, { compact, precision });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        format,
        formatPct: formatPercent,
        formatMo: formatMonths,
        userSnapshot,
        updateUserSnapshot,
        resetSnapshot,
        loadPresetProfile,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
