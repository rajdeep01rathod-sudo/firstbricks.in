import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeOverview } from './components/HomeOverview';
import { Breadcrumbs, PageInterlinkSection } from './components/Breadcrumbs';
import { ToolLoadingSkeleton } from './components/LoadingSkeleton';
import { getRouteIdFromPath, getCanonicalPath } from './utils/navigation';
import { updatePageSeo, ensureTrailingSlashSoftRedirect } from './utils/seo';

// Lazy-loaded components for optimal initial bundle size and rapid FCP/LCP
const HealthCheckTool = lazy(() => import('./components/HealthCheckTool').then(m => ({ default: m.HealthCheckTool })));
const HomeLoanCalculator = lazy(() => import('./components/HomeLoanCalculator').then(m => ({ default: m.HomeLoanCalculator })));
const PrepayVsInvestTool = lazy(() => import('./components/PrepayVsInvestTool').then(m => ({ default: m.PrepayVsInvestTool })));
const SipCalculator = lazy(() => import('./components/SipCalculator').then(m => ({ default: m.SipCalculator })));
const CalculatorsHub = lazy(() => import('./components/CalculatorsHub').then(m => ({ default: m.CalculatorsHub })));
const AffordabilityTool = lazy(() => import('./components/AffordabilityTool').then(m => ({ default: m.AffordabilityTool })));
const DebtVsInvestTool = lazy(() => import('./components/DebtVsInvestTool').then(m => ({ default: m.DebtVsInvestTool })));
const FireSimulatorTool = lazy(() => import('./components/FireSimulatorTool').then(m => ({ default: m.FireSimulatorTool })));
const DebtPayoffTool = lazy(() => import('./components/DebtPayoffTool').then(m => ({ default: m.DebtPayoffTool })));
const FrameworkGuide = lazy(() => import('./components/FrameworkGuide').then(m => ({ default: m.FrameworkGuide })));
const ArticlesPage = lazy(() => import('./components/ArticlesPage').then(m => ({ default: m.ArticlesPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));

// Modals lazy-loaded strictly on demand
const MethodologyModal = lazy(() => import('./components/MethodologyModal').then(m => ({ default: m.MethodologyModal })));
const HealthCheckGuideModal = lazy(() => import('./components/HealthCheckGuideModal').then(m => ({ default: m.HealthCheckGuideModal })));

function MainApp() {
  const { loadPresetProfile } = useCurrency();

  const [currentView, setCurrentView] = useState<string>(() => {
    // Soft redirect any path missing trailing slash (e.g. /health-check -> /health-check/)
    const normalizedPath = ensureTrailingSlashSoftRedirect();
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '').replace(/^\/+|\/+$/g, '');
      if (hashId) return hashId;
    }
    return getRouteIdFromPath(normalizedPath);
  });

  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isHealthGuideOpen, setIsHealthGuideOpen] = useState(false);

  // Synchronize URL and update SEO metadata (Title, Description, Canonical Tag)
  useEffect(() => {
    const canonical = getCanonicalPath(currentView);
    if (window.location.hash || window.location.pathname !== canonical) {
      window.history.replaceState({ routeId: currentView }, '', canonical);
    }
    updatePageSeo(currentView);
  }, [currentView]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const normalizedPath = ensureTrailingSlashSoftRedirect();
      const routeId = getRouteIdFromPath(normalizedPath);
      setCurrentView(routeId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Idle background prefetch for top tools after home load to give 0ms instant click transition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const idlePrefetch = () => {
      import('./components/HomeLoanCalculator');
      import('./components/PrepayVsInvestTool');
      import('./components/SipCalculator');
      import('./components/HealthCheckTool');
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(idlePrefetch, { timeout: 3500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    } else {
      const timer = setTimeout(idlePrefetch, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Navigate function with trailing slash and clean URL (no '#')
  const navigateTo = (view: string) => {
    setCurrentView(view);
    const targetPath = getCanonicalPath(view);
    window.history.pushState({ routeId: view }, '', targetPath);
    updatePageSeo(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFreshFromGuide = () => {
    setIsHealthGuideOpen(false);
    navigateTo('health-check');
  };

  const handleLoadPresetFromGuide = (presetKey: 'starter' | 'family' | 'fire') => {
    loadPresetProfile(presetKey);
    setIsHealthGuideOpen(false);
    navigateTo('health-check');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Navigation Bar with authentic brand logo */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenHealthGuide={() => setIsHealthGuideOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Universal Breadcrumbs */}
        <Breadcrumbs currentRouteId={currentView} onNavigate={navigateTo} />

        {/* Home page is rendered directly (critical rendering path) */}
        {currentView === 'home' && (
          <HomeOverview
            onNavigate={navigateTo}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
            onOpenHealthGuide={() => setIsHealthGuideOpen(true)}
          />
        )}

        {/* Lazy Loaded Routes wrapped in Suspense with sleek skeleton */}
        {currentView !== 'home' && (
          <Suspense fallback={<ToolLoadingSkeleton />}>
            {currentView === 'health-check' && (
              <HealthCheckTool onNavigateToTool={navigateTo} />
            )}

            {currentView === 'home-loan' && <HomeLoanCalculator />}

            {currentView === 'prepay-vs-invest' && <PrepayVsInvestTool />}

            {currentView === 'sip-calculator' && <SipCalculator />}

            {currentView === 'calculators' && (
              <CalculatorsHub onNavigate={navigateTo} />
            )}

            {currentView === 'affordability' && <AffordabilityTool />}

            {currentView === 'debt-vs-invest' && <DebtVsInvestTool />}

            {currentView === 'fire-engine' && <FireSimulatorTool />}

            {currentView === 'debt-payoff' && <DebtPayoffTool />}

            {currentView === 'framework' && (
              <FrameworkGuide onSelectTool={navigateTo} />
            )}

            {(currentView === 'articles' || currentView === 'guides' || currentView.startsWith('article:')) && (
              <ArticlesPage
                initialSlug={currentView.startsWith('article:') ? currentView.replace('article:', '') : null}
                onNavigateToTool={navigateTo}
                onSelectArticleSlug={(slug) => {
                  if (slug) {
                    navigateTo(`article:${slug}`);
                  } else {
                    navigateTo('articles');
                  }
                }}
              />
            )}

            {currentView === 'contact' && <ContactPage />}
          </Suspense>
        )}

        {/* Logical Interlinking Section */}
        <PageInterlinkSection
          currentRouteId={currentView}
          onNavigate={navigateTo}
        />
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* Assumptions & Methodology Transparency Modal (Lazy Loaded) */}
      {isMethodologyOpen && (
        <Suspense fallback={null}>
          <MethodologyModal
            isOpen={isMethodologyOpen}
            onClose={() => setIsMethodologyOpen(false)}
          />
        </Suspense>
      )}

      {/* Beginner Guide Popup for 2-Minute Health Check (Lazy Loaded) */}
      {isHealthGuideOpen && (
        <Suspense fallback={null}>
          <HealthCheckGuideModal
            isOpen={isHealthGuideOpen}
            onClose={() => setIsHealthGuideOpen(false)}
            onStartFresh={handleStartFreshFromGuide}
            onLoadPreset={handleLoadPresetFromGuide}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <MainApp />
    </CurrencyProvider>
  );
}
