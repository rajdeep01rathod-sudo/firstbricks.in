import { CurrencyCode } from '../types/finance';

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'INR',
  options: { compact?: boolean; precision?: number } = {}
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    amount = 0;
  }

  const { compact = false, precision = 0 } = options;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (compact) {
    if (currency === 'INR') {
      if (absAmount >= 10000000) {
        // Crores
        const cr = absAmount / 10000000;
        return `${isNegative ? '-' : ''}₹${cr.toFixed(cr >= 10 ? 1 : 2)}Cr`;
      } else if (absAmount >= 100000) {
        // Lakhs
        const lk = absAmount / 100000;
        return `${isNegative ? '-' : ''}₹${lk.toFixed(lk >= 10 ? 1 : 2)}L`;
      } else if (absAmount >= 1000) {
        return `${isNegative ? '-' : ''}₹${(absAmount / 1000).toFixed(1)}k`;
      }
      return `${isNegative ? '-' : ''}₹${absAmount.toLocaleString('en-IN')}`;
    } else {
      if (absAmount >= 1000000000) {
        return `${isNegative ? '-' : ''}$${(absAmount / 1000000000).toFixed(1)}B`;
      } else if (absAmount >= 1000000) {
        return `${isNegative ? '-' : ''}$${(absAmount / 1000000).toFixed(1)}M`;
      } else if (absAmount >= 1000) {
        return `${isNegative ? '-' : ''}$${(absAmount / 1000).toFixed(1)}k`;
      }
      return `${isNegative ? '-' : ''}$${absAmount.toLocaleString('en-US')}`;
    }
  }

  const symbol = currency === 'INR' ? '₹' : '$';
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';

  const formattedNumber = absAmount.toLocaleString(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return `${isNegative ? '-' : ''}${symbol}${formattedNumber}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}

export function formatMonths(months: number): string {
  if (isNaN(months) || months <= 0) return '0 mos';
  if (months < 12) return `${months.toFixed(1)} mos`;
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  }
  return `${years}y ${remainingMonths}m`;
}
