import { AskMoveResultView } from '@/components/ask-move-result';
import { SearchAnalytics } from '@/components/specialist-search/SearchAnalytics';
import { SpecialistSearchShell } from '@/components/specialist-search/SpecialistSearchShell';
import { executeMoveRequest } from '@/lib/move-ask/execute';
import { searchResultCountBucket } from '@/lib/specialist-search/analytics';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return { title: q?.trim() ? `Research: ${q.trim().slice(0, 80)}` : 'Research movers', description: 'Source-backed moving-company research across FMCSA and supported state records.', robots: { index: false, follow: true } };
}

export default async function AskPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string; role?: string; state?: string; authority?: string; company?: string }> }) {
  const params = await searchParams;
  const baseQuery = typeof params.q === 'string' ? params.q : '';
  const result = params.q !== undefined ? await executeMoveRequest(params) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-3xl font-semibold text-[#0A2540] sm:text-4xl">MoveTrustHub specialist research</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#1E293B]">Ask interprets the question. Published FMCSA and supported state records answer it. A carrier is not a broker. Florida registration is not interstate authority. Headquarters is not service territory.</p>
      <div className="mt-7"><SpecialistSearchShell query={baseQuery} filters={{ role: params.role, state: params.state, authority: params.authority }} /></div>
      {result ? <div className="mt-10">
        <SearchAnalytics dimensions={{ hub: 'move', intent: result.parsed.query.mode, role: result.parsed.query.role, state: result.parsed.query.jurisdiction?.state, hasIdentifier: Boolean(result.parsed.query.identifier), identifierType: result.parsed.query.identifier?.type, authorityFilter: String(result.parsed.query.authorityCurrent ?? ''), hasStateRegistrationFilter: Boolean(result.parsed.query.floridaIm), hasEvidenceFilter: Boolean(result.parsed.query.evidenceFamily), coverageState: result.coverageState, resultCountBucket: searchResultCountBucket(result.pagination.total) }} hasResults={result.results.length > 0 || result.counts.length > 0} />
        <AskMoveResultView result={result} />
      </div> : null}
    </div>
  );
}
