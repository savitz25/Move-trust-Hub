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

export function sanitizePostLoginPath(next: string | null | undefined): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return MY_INSURANCE_PATH;
  }
  // Never allow auth loops or external absolute URLs
  if (next.startsWith('/auth/')) return MY_INSURANCE_PATH;
  return next;
}
