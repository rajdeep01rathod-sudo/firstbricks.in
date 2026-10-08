import React, { useEffect } from 'react';
import { Article } from '../articles/types';
import { LatexMath } from './LatexMath';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Sparkles,
  BookOpen,
  Check,
} from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
  onBackToArticles: () => void;
  onNavigateToTool: (toolId: string) => void;
  onSelectArticle: (slug: string) => void;
  allArticles: Article[];
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBackToArticles,
  onNavigateToTool,
  onSelectArticle,
  allArticles,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && (a.categorySlug === article.categorySlug || a.featured))
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto space-y-10 pb-16 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 no-print">
        <button
          onClick={onBackToArticles}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles & Research</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editorial Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider text-[11px]">
            {article.category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {article.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
            {article.author.avatarText || 'FB'}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{article.author.name}</div>
            <div className="text-[11px] text-slate-500">{article.author.role}</div>
          </div>
        </div>
      </header>

      {/* Executive Summary & Key Takeaways Box */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Executive Summary & Key Takeaways
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {article.summary}
        </p>
        <div className="space-y-2 pt-2 border-t border-slate-200/70">
          {article.keyTakeaways.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mathematical Highlights */}
      {article.latexHighlights && article.latexHighlights.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Mathematical Formulas
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Standard Financial Formulation</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {article.latexHighlights.map((f) => (
              <LatexMath
                key={f.id}
                title={f.title}
                math={f.latex}
                explanation={f.explanation}
                block={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Practical Case Study Block */}
      {article.caseStudy && (
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                Real-World Financial Case Study
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                {article.caseStudy.title}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Practical Scenario Simulation
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {article.caseStudy.scenario}
          </p>

          {/* Profile Assumptions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {article.caseStudy.profile.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-blue-100/80 shadow-2xs">
                <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  {p.label}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                  {p.value}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Strategy A */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Option A
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {article.caseStudy.comparison.strategyA.name}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {article.caseStudy.comparison.strategyA.details.map((d, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                <span className="text-slate-500 font-normal">Result: </span>
                {article.caseStudy.comparison.strategyA.outcome}
              </div>
            </div>

            {/* Strategy B */}
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-500/60 bg-emerald-50/20 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Option B (Optimized)
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {article.caseStudy.comparison.strategyB.name}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {article.caseStudy.comparison.strategyB.details.map((d, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-900">
                <span className="text-emerald-700 font-normal">Result: </span>
                {article.caseStudy.comparison.strategyB.outcome}
              </div>
            </div>
          </div>

          {/* Bottom Takeaway */}
          <div className="p-3.5 rounded-xl bg-blue-100/60 border border-blue-200 text-xs text-blue-950 font-medium flex items-start gap-2">
            <span className="font-bold text-blue-800">💡 Case Takeaway:</span>
            <span>{article.caseStudy.keyTakeaway}</span>
          </div>
        </div>
      )}

      {/* Main Body Content Sections */}
      <div className="space-y-8 text-slate-800 text-sm sm:text-base leading-relaxed">
        {article.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            {section.title && (
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pt-2 border-t border-slate-100">
                {section.title}
              </h2>
            )}

            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}

            {section.latexFormula && (
              <LatexMath
                title={section.latexFormula.title}
                math={section.latexFormula.latex}
                explanation={section.latexFormula.explanation}
                block={true}
              />
            )}

            {section.calloutBox && (
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                  section.calloutBox.type === 'insight'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-slate-100/80 border-slate-200 text-slate-900'
                }`}
              >
                <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {section.calloutBox.title}
                </div>
                <div className="space-y-1.5">
                  {section.calloutBox.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="font-bold text-emerald-700">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Interactive Tool Launcher Call-to-Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Decision Tool</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Run This Formula With Your Own Numbers
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Test scenarios in our standalone calculator with your custom interest rates, loan balance, and compounding schedule.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTool(article.targetToolId)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all transform hover:scale-[1.02] shadow-md cursor-pointer shrink-0"
        >
          <span>{article.targetToolLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Related Articles Footer */}
      {relatedArticles.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            More Research & Decision Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onSelectArticle(rel.slug)}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 transition-all cursor-pointer shadow-xs hover:shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 pt-1">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {rel.subtitle}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 pt-2 flex items-center gap-1">
                  Read Analysis <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
