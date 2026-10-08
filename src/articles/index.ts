import { Article } from './types';
import { homeLoanPrepaymentStrategy } from './homeLoanPrepaymentStrategy';
import { stepUpSipInflationMath } from './stepUpSipInflationMath';
import { debtVsInvestingBreakeven } from './debtVsInvestingBreakeven';
import { coastFireMathematics } from './coastFireMathematics';
import { carAffordabilityTwentyFourTen } from './carAffordabilityTwentyFourTen';
import { rentVsBuyFivePercentRule } from './rentVsBuyFivePercentRule';
import { debtAvalancheVsSnowball } from './debtAvalancheVsSnowball';
import { fortressEmergencyRunway } from './fortressEmergencyRunway';

export * from './types';

/**
 * All published financial analysis articles.
 * TO ADD A NEW ARTICLE IN THE FUTURE:
 * 1. Create a new file in /src/articles/myNewArticle.ts matching the Article interface.
 * 2. Import and append it to this `allArticles` array below.
 */
export const allArticles: Article[] = [
  homeLoanPrepaymentStrategy,
  stepUpSipInflationMath,
  debtVsInvestingBreakeven,
  coastFireMathematics,
  carAffordabilityTwentyFourTen,
  rentVsBuyFivePercentRule,
  debtAvalancheVsSnowball,
  fortressEmergencyRunway,
];

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getFeaturedArticles(): Article[] {
  return allArticles.filter((a) => a.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return allArticles;
  return allArticles.filter((a) => a.categorySlug === category || a.category === category);
}

export const ARTICLE_CATEGORIES = [
  { id: 'all', label: 'All Research' },
  { id: 'loans', label: 'Loans & Prepayment' },
  { id: 'wealth', label: 'Wealth & SIP' },
  { id: 'debt', label: 'Debt Strategy' },
  { id: 'freedom', label: 'Financial Freedom (FIRE)' },
  { id: 'housing', label: 'Purchases & Housing' },
  { id: 'cash', label: 'Emergency & Liquidity' },
];
