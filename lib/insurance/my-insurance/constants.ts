import { INSURANCE_SITE_URL } from '@/lib/hub/domains';

export const MY_INSURANCE_PATH = '/my-insurance';
/** Dedicated ITH auth paths (never My Move /auth/* which hardcode Move origin). */
export const AUTH_CALLBACK_PATH = '/auth/insurance/callback';
export const AUTH_CONFIRM_PATH = '/auth/insurance/confirm';

/** Always InsuranceTrustHub apex — never MoveTrustHub. */
export const PRODUCTION_SITE_ORIGIN = INSURANCE_SITE_URL.replace(/\/$/, '');

export const AUTH_CALLBACK_URL = `${PRODUCTION_SITE_ORIGIN}${AUTH_CALLBACK_PATH}`;

export const GUEST_SAVED_PROVIDERS_KEY = 'ith-my-insurance-saved-providers-v1';
export const PENDING_SAVE_ACTION_KEY = 'ith-my-insurance-pending-action-v1';
export const POST_LOGIN_REDIRECT_KEY = 'ith-my-insurance-post-login-redirect';

/** Guest draft calculator save (pre-auth) — short-lived in sessionStorage via pending action. */
export const DRUG_BASKET_PATH = '/tools/prescription-drug-list';
export const ACA_SUBSIDY_PATH = '/calculators/aca-subsidy';
export const COST_ESTIMATOR_PATH = '/tools/cost-estimator';
export const COMPARE_PATH = '/my-insurance/compare';
export const COMPARE_TRAY_KEY = 'ith-my-insurance-compare-tray-v1';
export const MAX_COMPARE_PROVIDERS = 4;

/**
 * Safe post-login paths for InsuranceTrustHub only.
 * Blocks Move/portal destinations and open redirects.
 */
export function sanitizePostLoginPath(next: string | null | undefined): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return MY_INSURANCE_PATH;
  }
  // Never allow auth loops or external absolute URLs
  if (next.startsWith('/auth/')) return MY_INSURANCE_PATH;
  // Never bounce Insurance users into My Move / mover portal
  if (
    next === '/my-move' ||
    next.startsWith('/my-move/') ||
    next === '/portal' ||
    next.startsWith('/portal/')
  ) {
    return MY_INSURANCE_PATH;
  }
  try {
    const parsed = new URL(next, PRODUCTION_SITE_ORIGIN);
    if (parsed.origin !== new URL(PRODUCTION_SITE_ORIGIN).origin) {
      return MY_INSURANCE_PATH;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || MY_INSURANCE_PATH;
  } catch {
    return MY_INSURANCE_PATH;
  }
}
