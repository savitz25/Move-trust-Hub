import { Suspense } from 'react';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

/**
 * Server-safe wrapper: GaPageViewTracker needs useSearchParams (Suspense boundary).
 */
export function GoogleAnalyticsRoot() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
    </Suspense>
  );
}
