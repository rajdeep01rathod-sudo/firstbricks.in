export interface ArticleAuthor {
  name: string;
  role: string;
  avatarText?: string;
}

export interface LatexFormulaItem {
  id: string;
  title: string;
  latex: string;
  explanation: string;
}

export interface ArticleSection {
  title?: string;
  content: string[]; // Paragraphs
  latexFormula?: {
    title: string;
    latex: string;
    explanation: string;
  };
  calloutBox?: {
    type: 'takeaway' | 'caution' | 'insight';
    title: string;
    points: string[];
  };
}

export interface ArticleCaseStudy {
  title: string;
  scenario: string;
  profile: {
    label: string;
    value: string;
  }[];
  comparison: {
    strategyA: {
      name: string;
      details: string[];
      outcome: string;
    };
    strategyB: {
      name: string;
      details: string[];
      outcome: string;
    };
  };
  keyTakeaway: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Loans & Prepayment' | 'Wealth & SIP' | 'Debt Strategy' | 'Financial Freedom' | 'Purchases & Housing' | 'Emergency & Cash';
  categorySlug: 'loans' | 'wealth' | 'debt' | 'freedom' | 'housing' | 'cash';
  publishedDate: string;
  updatedDate?: string;
  readTime: string;
  featured?: boolean;
  author: ArticleAuthor;
  summary: string;
  keyTakeaways: string[];
  caseStudy?: ArticleCaseStudy;
  targetToolId: string;
  targetToolLabel: string;
  latexHighlights: LatexFormulaItem[];
  sections: ArticleSection[];
}
