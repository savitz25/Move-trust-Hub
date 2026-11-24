import { analyticsBrowserOptOut, analyticsConsent, type AnalyticsConsent } from './posthog/environment';

/**
 * Fail-closed gate for nonessential Google Analytics 4 collection.
 *
 * Default consent is unresolved because Move has no reviewed consent record.
 * Do Not Track, Global Privacy Control, and cookies-off are honored as technical
 * signals. Honoring those signals is not a determination that they satisfy any
 * jurisdiction's consent, opt-out, or sale/share statute. Fonts, Maps, and
 * reCAPTCHA are separate products and are not gated here. No consent banner is added.
 */
export function shouldEnableGoogleAnalytics(consent: AnalyticsConsent = analyticsConsent()): boolean {
  try {
    if (consent !== 'granted') return false;
    if (analyticsBrowserOptOut()) return false;
    return true;
  } catch {
    return false;
  }
}
