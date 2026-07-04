import { LegacyFallbackPage } from '@/components/hub/templates/legacy-fallback-page';
import { hubNotFoundFallback } from '@/lib/migration/hub-legacy-resolver';

export default function LenderNotFound() {
  const resolution = hubNotFoundFallback('lender');
  if (resolution.type !== 'fallback') return null;
  return <LegacyFallbackPage hub="lender" resolution={resolution} />;
}