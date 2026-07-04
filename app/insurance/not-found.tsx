import { LegacyFallbackPage } from '@/components/hub/templates/legacy-fallback-page';
import { hubNotFoundFallback } from '@/lib/migration/hub-legacy-resolver';

export default function InsuranceNotFound() {
  const resolution = hubNotFoundFallback('insurance');
  if (resolution.type !== 'fallback') return null;
  return <LegacyFallbackPage hub="insurance" resolution={resolution} />;
}