/**
 * Utilities for URL state synchronization, bookmarking, and shareable calculations.
 */

export function getNumericParam(key: string, defaultValue: number): number {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null && val !== '') {
      const parsed = parseFloat(val);
      if (!isNaN(parsed) && isFinite(parsed)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return defaultValue;
}

export function getStringParam<T extends string>(key: string, defaultValue: T, allowedValues?: T[]): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null) {
      if (!allowedValues || allowedValues.includes(val as T)) {
        return val as T;
      }
    }
  } catch {
    // ignore
  }
  return defaultValue;
}

export function getBooleanParam(key: string, defaultValue: boolean): boolean {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null) {
      return val === '1' || val === 'true';
    }
  } catch {
    // ignore
  }
  return defaultValue;
}

export function updateUrlQuery(paramsToUpdate: Record<string, string | number | boolean | null | undefined>) {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    Object.entries(paramsToUpdate).forEach(([key, val]) => {
      if (val === null || val === undefined) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(val));
      }
    });
    window.history.replaceState(window.history.state, '', url.toString());
  } catch {
    // ignore
  }
}

export async function copyShareLink(paramsToUpdate?: Record<string, string | number | boolean>): Promise<string> {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  if (paramsToUpdate) {
    Object.entries(paramsToUpdate).forEach(([key, val]) => {
      url.searchParams.set(key, String(val));
    });
  }
  const shareUrl = url.toString();
  try {
    await navigator.clipboard.writeText(shareUrl);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = shareUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  return shareUrl;
}
