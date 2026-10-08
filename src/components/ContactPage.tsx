import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, ShieldCheck, Clock, HelpCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'buddhisetu@gmail.com';

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-2">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 text-center sm:text-left">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
          Support & Communications
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Contact First Bricks
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-xl">
          Have an idea for a new financial calculator, formula suggestion, or feedback on our mathematical assumptions? Reach out directly via email.
        </p>
      </div>

      {/* Clean Email Contact Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-neutral-50/80 rounded-xl border border-neutral-200/80">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-3 bg-emerald-100/80 text-emerald-800 rounded-xl shrink-0">
              <Mail className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Official Email Address
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="text-base sm:text-lg font-bold text-neutral-900 hover:text-emerald-700 hover:underline truncate block"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${contactEmail}`}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Compose Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-neutral-50/60 border border-neutral-100 space-y-1.5">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>Response Time</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We typically reply within 24 to 48 business hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50/60 border border-neutral-100 space-y-1.5">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Calculator Ideas</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Suggest new rules of thumb, formulas, or financial scenarios to add.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50/60 border border-neutral-100 space-y-1.5">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Direct & Private</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No intermediary contact forms or databases; messages go straight to our inbox.
            </p>
          </div>
        </div>

        {/* Note on Subject Lines */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="font-semibold text-slate-900">Helpful Tip for Faster Replies:</div>
          <p className="leading-relaxed">
            Please include a clear subject line (e.g., <em>[Calculator Suggestion]</em>, <em>[Formula Question]</em>, or <em>[General Feedback]</em>) so we can route your message immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
