import React from 'react';

export const ToolLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-slate-200/80 pb-6 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
          <div className="h-3 w-28 bg-slate-200 rounded"></div>
        </div>
        <div className="h-8 w-72 sm:w-96 bg-slate-200 rounded-xl"></div>
        <div className="h-4 w-full max-w-2xl bg-slate-100 rounded"></div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="h-4 w-32 bg-slate-200 rounded"></div>
            <div className="h-4 w-16 bg-emerald-100 rounded-md"></div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-slate-200 rounded"></div>
              <div className="h-9 w-full bg-slate-100 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-32 bg-slate-200 rounded"></div>
              <div className="h-9 w-full bg-slate-100 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-slate-200 rounded"></div>
              <div className="h-9 w-full bg-slate-100 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-emerald-200/60">
              <div className="space-y-2">
                <div className="h-3 w-24 bg-emerald-200/80 rounded"></div>
                <div className="h-8 w-36 bg-emerald-200 rounded-lg"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-28 bg-emerald-200/80 rounded"></div>
                <div className="h-8 w-36 bg-emerald-200 rounded-lg"></div>
              </div>
            </div>
            <div className="h-4 w-48 bg-emerald-200/60 rounded"></div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="h-4 w-40 bg-slate-200 rounded"></div>
            <div className="h-40 w-full bg-slate-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
