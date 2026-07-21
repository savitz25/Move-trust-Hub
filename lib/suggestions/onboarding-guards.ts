/**
 * Non-negotiable data-quality guards for Interstate + Intrastate onboarding.
 */

import { isPlaceholderPhone } from '@/lib/verification/website-contact-scrape';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';
import { localStates } from '@/lib/local-movers/states';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

/** Never treat empty / 555 / whitespace as a real contact value. */
export function isUsableContactValue(value: string | null | undefined): boolean {
  if (!value?.trim()) return false;
  return true;
}

export function isUsablePhone(value: string | null | undefined): boolean {
  if (!isUsableContactValue(value)) return false;
  if (isPlaceholderPhone(value)) return false;
  return true;
}

export function isUsableEmail(value: string | null | undefined): boolean {
  if (!isUsableContactValue(value)) return false;
  const e = value!.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function isUsableWebsite(value: string | null | undefined): boolean {
  if (!isUsableContactValue(value)) return false;
  try {
    const withProtocol = /^https?:\/\//i.test(value!)
      ? value!
      : `https://${value!.trim()}`;
    const u = new URL(withProtocol);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Prefer existing good data over empty/placeholder/failed incoming values.
 * Never overwrites a valid phone with 555, empty, or failed scrape.
 */
export function preferGoodContactField(
  existing: string | null | undefined,
  incoming: string | null | undefined,
  kind: 'phone' | 'email' | 'website' | 'text' = 'text'
): string | null {
  const usable = (v: string | null | undefined): string | null => {
    if (!v?.trim()) return null;
    if (kind === 'phone' && !isUsablePhone(v)) return null;
    if (kind === 'email' && !isUsableEmail(v)) return null;
    if (kind === 'website' && !isUsableWebsite(v)) return null;
    if (kind === 'text' && !isUsableContactValue(v)) return null;
    return v.trim();
  };
  return usable(existing) || usable(incoming) || null;
}

/** True when we have enough contact to publish confidently (phone and/or website). */
export function hasMinimumPublishContact(input: {
  phone?: string | null;
  website?: string | null;
  email?: string | null;
}): boolean {
  return isUsablePhone(input.phone) || isUsableWebsite(input.website);
}

/**
 * Keep only counties that belong to the onboarding state.
 * Prevents MN/PA bleed into Oregon local onboarding.
 */
export function filterCountiesToState(
  counties: SelectedCounty[],
  stateCode: string | null | undefined
): SelectedCounty[] {
  const code = (stateCode ?? '').trim().toUpperCase().slice(0, 2);
  if (!code || code.length !== 2) return counties;
  const state = localStates.find((s) => s.code === code);
  if (!state) return counties;
  return counties.filter((c) => c.stateSlug === state.slug);
}

/** Filter website coverage cities/counties to a preferred state code. */
export function constrainCoverageToState(
  coverage: WebsiteCoverageData | null | undefined,
  stateCode: string | null | undefined
): WebsiteCoverageData | null {
  if (!coverage) return null;
  const code = (stateCode ?? '').trim().toUpperCase().slice(0, 2);
  if (!code) return coverage;
  const state = localStates.find((s) => s.code === code);
  if (!state) return coverage;

  const cities = (coverage.cities ?? []).filter((c) => c.stateCode === code);
  const counties = (coverage.counties ?? []).filter((c) => c.stateSlug === state.slug);
  const stateSlugs = coverage.stateSlugs?.includes(state.slug)
    ? [state.slug]
    : cities.length || counties.length
      ? [state.slug]
      : [];

  return {
    ...coverage,
    cities,
    counties,
    stateSlugs,
    regions: [],
    summary:
      cities.length || counties.length
        ? [
            ...cities.map((c) => `${c.city}, ${c.stateCode}`),
            ...counties.map((c) => `${c.label} County`),
          ]
            .slice(0, 12)
            .join('; ')
        : coverage.summary,
  };
}

export type ContactFillSnapshot = {
  hasName: boolean;
  hasAddress: boolean;
  hasPhone: boolean;
  hasEmail: boolean;
  hasWebsite: boolean;
  fillRate: number;
};

export function computeContactFillSnapshot(input: {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
}): ContactFillSnapshot {
  const hasName = isUsableContactValue(input.name);
  const hasAddress = isUsableContactValue(input.address);
  const hasPhone = isUsablePhone(input.phone);
  const hasEmail = isUsableEmail(input.email);
  const hasWebsite = isUsableWebsite(input.website);
  const filled = [hasName, hasAddress, hasPhone, hasEmail, hasWebsite].filter(Boolean)
    .length;
  return {
    hasName,
    hasAddress,
    hasPhone,
    hasEmail,
    hasWebsite,
    fillRate: Math.round((filled / 5) * 100),
  };
}

/**
 * Intrastate companies must never appear as interstate in the main directory.
 * Force usdot null + service_scope intrastate on the company row.
 */
export function assertLocalPublishShape(input: {
  serviceScope: 'interstate' | 'intrastate';
  usdot: string | null;
}): { serviceScope: 'interstate' | 'intrastate'; usdot: string | null } {
  if (input.serviceScope === 'intrastate') {
    return { serviceScope: 'intrastate', usdot: null };
  }
  return input;
}
