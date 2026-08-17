import { getProviderTrustReport } from '@/lib/move-v2/consumer-discovery/server-read';
import { providerRouteDecision } from '@/lib/move-v2/launch-candidate/provider-routing';
import { moveV2Flags } from '@/lib/move-v2/flags';
export function ProviderEvidenceSummary({ slug }: { slug: string }) {
  if (!moveV2Flags().sameUrlComposition) return null;
  const route = providerRouteDecision(slug); if (route.mode !== 'V2_COMPOSED') return null;
  const report = getProviderTrustReport(route.providerId);
  return <section className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5" aria-labelledby="v2-evidence-heading"><h2 id="v2-evidence-heading" className="text-lg font-semibold">Current evidence summary</h2>{report ? <><p className="mt-2 text-sm">{report.authority.source}: {report.authority.status}. Registration is evidence, not an endorsement.</p><p className="mt-1 text-sm">Service area: {report.service_evidence.length ? 'Provider-published evidence is available below.' : 'Not independently confirmed.'}</p><p className="mt-2 text-xs text-muted-foreground">Source-backed MoveTrustHub V2 Trust Report · {report.freshness.releaseVersion}</p></> : <><p className="mt-2 text-sm">Exact federal identity linked by USDOT evidence{route.observedUsdot ? ` (${route.observedUsdot.split('|').map(value => `USDOT ${value}`).join(', ')})` : ''}.</p><p className="mt-1 text-sm">State-local service area is not independently confirmed. This historical page remains the canonical consumer URL.</p><p className="mt-2 text-xs text-muted-foreground">MoveTrustHub V2 identity evidence · no fuzzy name merge</p></>}</section>;
}
