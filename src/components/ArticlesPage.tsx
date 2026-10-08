import React, { useState, useMemo } from 'react';
import { allArticles, ARTICLE_CATEGORIES, Article } from '../articles';
import { ArticleReader } from './ArticleReader';
import { LatexMath } from './LatexMath';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface ArticlesPageProps {
  initialSlug?: string | null;
  onNavigateToTool: (toolId: string) => void;
  onSelectArticleSlug?: (slug: string | null) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  initialSlug,
  onNavigateToTool,
  onSelectArticleSlug,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    setSelectedSlug(initialSlug || null);
  }, [initialSlug]);

  const handleSelectArticle = (slug: string) => {
    setSelectedSlug(slug);
    if (onSelectArticleSlug) {
      onSelectArticleSlug(slug);
    }
  };

  const handleBackToArticles = () => {
    setSelectedSlug(null);
    if (onSelectArticleSlug) {
      onSelectArticleSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a specific article is selected, display the ArticleReader
  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return allArticles.find((a) => a.slug === selectedSlug) || null;
  }, [selectedSlug]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'all' ||
        article.categorySlug === activeCategory ||
        article.category === activeCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keyTakeaways.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return allArticles.find((a) => a.featured) || allArticles[0];
  }, []);

  if (currentArticle) {
    return (
      <ArticleReader
        article={currentArticle}
        allArticles={allArticles}
        onBackToArticles={handleBackToArticles}
        onNavigateToTool={onNavigateToTool}
        onSelectArticle={handleSelectArticle}
      />
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Modern Editorial Publication Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>First Bricks Financial Intelligence & Research</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Peer-Reviewed Mathematics & Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Articles, Guides & Quantitative Models
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            In-depth financial essays and formulas on home loan prepayment velocity, step-up compounding, debt prioritization, and early financial freedom.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles or formulas..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
        {ARTICLE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Lead Story (shown when viewing 'all' and no active search) */}
      {activeCategory === 'all' && !searchQuery && featuredArticle && (
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-[11px]">
              FEATURED ANALYSIS
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-medium">{featuredArticle.category}</span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {featuredArticle.readTime}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {featuredArticle.subtitle}
              </p>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
                  Core Takeaway Preview
                </div>
                <div>{featuredArticle.summary}</div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleSelectArticle(featuredArticle.slug)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigateToTool(featuredArticle.targetToolId)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Tool</span>
                </button>
              </div>
            </div>

            {/* Mathematical Formula Snapshot */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-xs space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Key Formula Breakdown</span>
                <span className="text-emerald-400 font-medium text-[11px]">Exact Math</span>
              </div>
              {featuredArticle.latexHighlights[0] && (
                <LatexMath
                  title={featuredArticle.latexHighlights[0].title}
                  math={featuredArticle.latexHighlights[0].latex}
                  explanation={featuredArticle.latexHighlights[0].explanation}
                  block={true}
                  className="my-0"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
          <span>{filteredArticles.length} Research Articles</span>
          <span>Click Any Card to Read</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.slug}
              onClick={() => handleSelectArticle(article.slug)}
              className="bg-white border border-slate-200/90 hover:border-slate-400 rounded-3xl p-6 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-800 font-bold uppercase tracking-wider text-[10px] transition-colors">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors tracking-tight leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Case Study & Formula Highlight Chips */}
                <div className="space-y-1.5 pt-1">
                  {article.caseStudy && (
                    <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] text-blue-900 font-medium truncate flex items-center gap-1.5">
                      <span className="font-bold text-blue-700">Case Study:</span>
                      <span className="truncate">{article.caseStudy.title}</span>
                    </div>
                  )}
                  {article.latexHighlights[0] && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                      <span className="font-semibold text-slate-600">Model:</span>
                      <span className="truncate">{article.latexHighlights[0].title}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="text-[11px] text-slate-400">{article.author.name}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Articles Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search query. Try searching for "EMI", "SIP", "FIRE", or "debt".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
