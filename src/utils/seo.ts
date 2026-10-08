import { ROUTES, getCanonicalPath, RouteItem } from './navigation';

/**
 * Updates all critical document head SEO tags dynamically on page navigation.
 * Ensures every single view, tool, and quantitative article has a dedicated
 * canonical URL, title, meta description, OpenGraph tags, and Schema.org JSON-LD.
 */
export function updatePageSeo(routeId: string) {
  const route: RouteItem = ROUTES[routeId] || ROUTES.home;

  // 1. Update Document Title
  document.title = route.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attribute: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Meta Description & Keywords
  setMetaTag('name', 'description', route.description);
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 4. Update OpenGraph Tags
  setMetaTag('property', 'og:title', route.title);
  setMetaTag('property', 'og:description', route.description);
  setMetaTag('property', 'og:url', route.canonical);
  setMetaTag('property', 'og:site_name', 'First Bricks');
  setMetaTag('property', 'og:type', routeId.startsWith('article:') ? 'article' : 'website');

  // 5. Update Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', route.title);
  setMetaTag('name', 'twitter:description', route.description);

  // 6. Update Canonical Link tag (<link rel="canonical" href="...">)
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', route.canonical);

  // 7. Dynamic JSON-LD Structured Data for fast Search Console indexing
  updateDynamicStructuredData(route);
}

/**
 * Injects or updates Schema.org JSON-LD structured data for rich snippets in Google Search Console.
 */
function updateDynamicStructuredData(route: RouteItem) {
  let scriptTag = document.getElementById('schema-structured-data') as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'schema-structured-data';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const isArticle = route.id.startsWith('article:');
  const isCalculator = route.category === 'tools';

  let schemaData: any;

  if (isArticle) {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: route.label,
      description: route.description,
      url: route.canonical,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonical,
      },
      datePublished: '2026-10-08T00:00:00Z',
      dateModified: '2026-10-08T00:00:00Z',
      author: {
        '@type': 'Organization',
        name: 'First Bricks Financial Research',
        url: 'https://firstbricks.in',
      },
      publisher: {
        '@type': 'Organization',
        name: 'First Bricks',
        url: 'https://firstbricks.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://firstbricks.in/logo.svg',
        },
      },
    };
  } else if (isCalculator) {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: route.label,
      url: route.canonical,
      description: route.description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
  } else {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: route.title,
      url: route.canonical,
      description: route.description,
      publisher: {
        '@type': 'Organization',
        name: 'First Bricks',
        url: 'https://firstbricks.in',
      },
    };
  }

  // Append BreadcrumbList schema
  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.label,
        item: b.path ? `https://firstbricks.in${b.path}` : route.canonical,
      })),
    };
    scriptTag.textContent = JSON.stringify([schemaData, breadcrumbSchema], null, 2);
  } else {
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  }
}

/**
 * Soft redirect: Ensures URLs always match the sitemap convention (trailing slash).
 * If a visitor or crawler lands on `/health-check`, it seamlessly normalizes to `/health-check/`.
 */
export function ensureTrailingSlashSoftRedirect(): string {
  if (typeof window === 'undefined') return '/';

  const pathname = window.location.pathname;

  // If path is root or already ends with slash, return it
  if (pathname === '/' || pathname.endsWith('/')) {
    return pathname;
  }

  // Path lacks trailing slash (e.g. `/health-check` or `/home-loan`)
  // Check if it's not a file (does not contain a dot like `.xml` or `.png`)
  if (!pathname.includes('.')) {
    const canonicalWithSlash = `${pathname}/`;
    window.history.replaceState(null, '', canonicalWithSlash + window.location.search);
    return canonicalWithSlash;
  }

  return pathname;
}
