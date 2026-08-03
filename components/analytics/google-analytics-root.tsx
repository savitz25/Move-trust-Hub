import { Suspense } from 'react';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { resolveGaMeasurementIdForHost } from '@/lib/analytics/ga-config';

/**
 * Server wrapper: resolves host-aware Measurement ID, then mounts client gtag.
 * Always keep this in app/layout.tsx — do not gate behind features/consent that
 * permanently deny analytics unless product requires it.
 */
export async function GoogleAnalyticsRoot() {
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
