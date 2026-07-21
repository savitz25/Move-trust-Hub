/**
 * Lightweight onboarding observability — structured logs for funnel events + fill rates.
 */

import { logger } from '@/lib/logging/logger';
import {
  computeContactFillSnapshot,
  type ContactFillSnapshot,
} from '@/lib/suggestions/onboarding-guards';

export type OnboardingOutcome =
  | 'submitted_pending'
  | 'admin_published'
  | 'admin_publish_failed'
  | 'rate_limited'
  | 'validation_error'
  | 'duplicate'
  | 'force_intrastate'
  | 'fmcsa_not_found'
  | 'google_matched'
  | 'google_not_found'
  | 'website_contact_found'
  | 'website_contact_empty'
  | 'counties_preselected'
  | 'coverage_constrained';

export function logOnboardingEvent(
  event: OnboardingOutcome,
  payload: Record<string, unknown>
): void {
  logger.info(`onboarding.${event}`, payload);
}

export function logContactFillRates(
  context: string,
  fields: {
    name?: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
  },
  extra?: Record<string, unknown>
): ContactFillSnapshot {
  const fill = computeContactFillSnapshot(fields);
  logger.info('onboarding.contact_fill', {
    context,
    fillRate: fill.fillRate,
    hasName: fill.hasName,
    hasAddress: fill.hasAddress,
    hasPhone: fill.hasPhone,
    hasEmail: fill.hasEmail,
    hasWebsite: fill.hasWebsite,
    ...extra,
  });
  return fill;
}

export function logAuthorityRouteToIntrastate(payload: {
  usdot?: string | null;
  legalName?: string | null;
  dbaName?: string | null;
  authorityStatus?: string | null;
  source: 'ui' | 'submit' | 'approve';
}): void {
  logOnboardingEvent('force_intrastate', payload);
}

export function logGoogleMatchResult(payload: {
  context: string;
  status: string;
  placeName?: string | null;
  matchScore?: number | null;
  strategy?: string | null;
  hasPhone?: boolean;
  hasWebsite?: boolean;
}): void {
  if (payload.status === 'ok') {
    logOnboardingEvent('google_matched', payload);
  } else {
    logOnboardingEvent('google_not_found', payload);
  }
}

export function logWebsiteContactResult(payload: {
  context: string;
  website: string;
  phone?: string | null;
  email?: string | null;
  status: string;
}): void {
  if (payload.phone || payload.email) {
    logOnboardingEvent('website_contact_found', {
      ...payload,
      hasPhone: Boolean(payload.phone),
      hasEmail: Boolean(payload.email),
    });
  } else {
    logOnboardingEvent('website_contact_empty', payload);
  }
}

export function logCountyPreselection(payload: {
  context: string;
  stateCode?: string | null;
  countyCount: number;
  counties: string[];
}): void {
  logOnboardingEvent('counties_preselected', payload);
}

export function logAdminPublish(payload: {
  suggestionId: string;
  slug: string;
  serviceScope: string;
  trustedReason?: string | null;
  countyCount?: number;
  fillRate?: number;
  ok: boolean;
  error?: string;
}): void {
  if (payload.ok) {
    logOnboardingEvent('admin_published', payload);
  } else {
    logOnboardingEvent('admin_publish_failed', payload);
  }
}
