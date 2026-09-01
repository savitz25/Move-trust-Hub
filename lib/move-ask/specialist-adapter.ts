import type { MoveSpecialistExecutionResponse } from '@/lib/specialist-execution/contract';
import { MOVE_ASK_CONTRACT, MOVE_ASK_PAGE_SIZE } from './contract';

/**
 * Backward-compatible move-ask-v1 view over the shared V2 cohort executor.
 * Identity, definitions, aggregates and comparisons remain on their accepted
 * move-ask-v1 paths until the parent migrates explicitly.
 */
export function publicAskPayloadFromSpecialist(result: MoveSpecialistExecutionResponse) {
  const geography = result.queryInterpretation.geography;
  return {
    contract: MOVE_ASK_CONTRACT,
    capability: { federatedExecution: 'execute', askStatus: 'live' },
    interpretation: [
      { label: 'Mode', value: 'research cohort' },
      { label: 'Entity', value: result.queryInterpretation.entityClass === 'auto_transport' ? 'Auto Transport identity' : 'Mover identity' },
      ...(result.queryInterpretation.role ? [{ label: 'Regulatory role', value: result.queryInterpretation.role }] : []),
      ...(geography?.stateCode ? [{ label: 'Geography', value: `${geography.stateCode} recorded headquarters` }] : []),
      { label: 'Sort', value: 'Neutral source order' },
    ],
    query: {
      mode: 'entity',
      role: result.queryInterpretation.role,
      jurisdiction: geography?.stateCode
        ? { state: geography.stateCode, meaning: 'recorded_headquarters_state' }
        : undefined,
      page: result.pagination.page,
      specialistContract: result.contractVersion,
    },
    resultType: result.resultType === 'UNSUPPORTED_CAPABILITY' ? 'fail_closed' : 'entity',
    results: result.rows.map((row) => ({
      name: row.publicDisplayName,
      usdot: row.usdot,
      mc: row.mc,
      role: row.role,
      fmcsaStatus: row.authorityState,
      headquarters: row.recordedHq.raw,
      floridaIm: null,
      operatingAuthority: row.authorityState,
      href: new URL(row.canonicalProfileUrl).pathname,
      publicationNote: null,
      whyMatched: row.whyMatched,
      complaintsNote: null,
    })),
    counts: result.total
      ? [{ label: 'Matching research identities', value: result.total, grain: result.provenance.queryGrain }]
      : [],
    pagination: {
      page: result.pagination.page,
      pageSize: result.pagination.limit || MOVE_ASK_PAGE_SIZE,
      total: result.total,
      hasMore: result.pagination.hasMore,
    },
    provenance: {
      sourceFamily: result.provenance.sourceFamily,
      geographyMeaning: result.provenance.geographyMeaning,
      officialAsOf: result.provenance.officialAsOf ?? 'See returned source clocks',
      grain: result.provenance.queryGrain,
      exclusions: result.limitations,
      sourceContract: result.contractVersion,
    },
    limitations: result.limitations,
    elapsedMs: result.diagnostics.elapsedMs,
  };
}
