import React from 'react';
import { ROUTES, getCanonicalPath } from '../utils/navigation';
import { ChevronRight, ArrowRight, Compass } from 'lucide-react';

interface BreadcrumbsProps {
  currentRouteId: string;
  onNavigate: (routeId: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentRouteId, onNavigate }) => {
  const route = ROUTES[currentRouteId];
  if (!route || currentRouteId === 'home') return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs text-neutral-500 mb-6 no-print overflow-x-auto whitespace-nowrap py-1"
    >
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        {route.breadcrumbs.map((crumb, idx) => {
          const isLast = idx === route.breadcrumbs.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
              )}
              {isLast || !crumb.path ? (
                <span
                  className={isLast ? 'font-semibold text-neutral-900 truncate' : 'text-neutral-500'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (crumb.path === '/') onNavigate('home');
                    else if (crumb.path) onNavigate(crumb.path.replace(/^\/+|\/+$/g, ''));
                  }}
                  className="hover:text-neutral-900 transition-colors cursor-pointer text-neutral-600 hover:underline"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

interface PageInterlinkSectionProps {
  currentRouteId: string;
  onNavigate: (routeId: string) => void;
}

export const PageInterlinkSection: React.FC<PageInterlinkSectionProps> = ({
  currentRouteId,
  onNavigate,
}) => {
  const route = ROUTES[currentRouteId];
  if (!route) return null;

  const next = route.nextLogicalStep;
  const related = route.relatedTools || [];

  return (
    <div className="mt-16 pt-10 border-t border-neutral-200 space-y-8 no-print">
      {/* Next Logical Step in Financial Plan */}
      {next && (
        <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Next Step in Your Plan
            </span>
            <h3 className="text-lg font-bold text-white">{next.label}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{next.description}</p>
          </div>

          <button
            onClick={() => onNavigate(next.id)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-xs self-start sm:self-auto"
          >
            <span>Continue Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Related Connected Decision Tools */}
      {related.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Connected Tools & Guides
            </h4>
            <span className="text-[11px] text-neutral-400">Never get stuck on an isolated calculation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {related.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onNavigate(rel.id)}
                className="text-left p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors mb-1">
                    {rel.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 line-clamp-1">{rel.desc}</div>
                </div>
                <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-medium text-neutral-800">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
