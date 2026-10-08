import React, { useMemo } from 'react';
import katex from 'katex';
import { Copy, Check } from 'lucide-react';

interface LatexMathProps {
  math: string;
  block?: boolean;
  inline?: boolean;
  title?: string;
  explanation?: string;
  className?: string;
  showCopy?: boolean;
}

export const LatexMath: React.FC<LatexMathProps> = ({
  math,
  block = false,
  inline = false,
  title,
  explanation,
  className = '',
  showCopy = true,
}) => {
  const [copied, setCopied] = React.useState(false);

  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block && !inline,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<code class="text-rose-600 font-mono">${math}</code>`;
    }
  }, [math, block, inline]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(math);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (inline) {
    return (
      <span
        className={`inline-katex inline-block align-middle px-1 py-0.5 rounded bg-slate-100/80 text-slate-900 font-serif text-sm ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md ${className}`}
    >
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-200 tracking-wide uppercase text-[11px]">
            {title || 'Mathematical Formula'}
          </span>
        </div>
        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Copy LaTeX formula code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">Copied LaTeX</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Copy LaTeX</span>
              </>
            )}
          </button>
        )}
      </div>

      <div
        className="overflow-x-auto py-2 px-1 text-center sm:text-base text-sm text-emerald-300 font-serif"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {explanation && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed font-sans">
          <span className="text-slate-300 font-semibold mr-1.5">Where:</span>
          {explanation}
        </div>
      )}
    </div>
  );
};
