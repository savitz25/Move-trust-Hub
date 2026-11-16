import { Suspense } from 'react';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { resolveGaMeasurementIdForHost } from '@/lib/analytics/ga-config';
import { shouldEnableGoogleAnalytics } from '@/lib/analytics/ga-privacy';

/**
 * Server wrapper: resolves host-aware Measurement ID, then mounts client gtag.
 * Nonessential GA4 stays off until consent is granted and the browser has not
 * opted out. That is a technical gate, not a jurisdiction-specific legal finding.
 */
export async function GoogleAnalyticsRoot() {
  if (!shouldEnableGoogleAnalytics()) return null;
  const host = (await headers()).get('host');
  const { measurementId, hub } = resolveGaMeasurementIdForHost(host);

  if (!measurementId) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalytics measurementId={measurementId} hub={hub} />
    </Suspense>
  );
}
