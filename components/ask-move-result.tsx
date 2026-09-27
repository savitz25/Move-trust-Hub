import { AskMoveResultCard } from './ask-move-result-card';
import { MoveJourneyResearch } from './move-journey-research';
import Link from 'next/link';
import { ASK_DEFINITIONS, MOVE_ASK_PAGE_SIZE } from '@/lib/move-ask/contract';
import type { MoveAskResult } from '@/lib/move-ask/execute';

function href(q: string, page?: number, overrides?: Record<string, string | undefined>) {
  const params = new URLSearchParams({ q });
  for (const [key, value] of Object.entries(overrides ?? {})) if (value) params.set(key, value);
  if (page && page > 1) params.set('page', String(page));
  return `/ask?${params.toString()}`;
}

export function AskMoveResultView({ result }: { result: MoveAskResult }) {
  const q = result.parsed.query;
  const def = q.definitionId ? ASK_DEFINITIONS[q.definitionId] : undefined;

  return (
    <div className="min-w-0 space-y-8 break-words">
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C2410C]">
          We interpreted your question as
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.parsed.interpretation.map((row) => (
            <div key={`${row.label}-${row.value}`} className="rounded-xl border border-[#E2E8F0] p-3">
              <dt className="text-xs uppercase text-[#475569]">{row.label}</dt>
              <dd className="text-base font-semibold text-[#0A2540]">{row.value}</dd>
              <dd><Link href="#ask-edit" className="mt-1 inline-flex min-h-8 items-center text-xs font-semibold text-[#C2410C]" aria-label={`Edit ${row.label} in your request`}>Edit request</Link></dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-[#475569]">
          Parsing and regulatory execution stay separate. Headquarters is not service territory.
        </p>
        <form action="/ask" method="get" className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="ask-edit" className="sr-only">
            Change interpretation
          </label>
          <input
            id="ask-edit"
            name="q"
            defaultValue={result.queryText}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#E2E8F0] px-3 text-sm text-[#0A2540]"
          />
          {Object.entries(q.overrides ?? {}).map(([key, value]) => value ? <input key={key} type="hidden" name={key} value={value} /> : null)}
          <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0A2540] px-4 text-sm font-semibold text-white">
            Change interpretation
          </button>
        </form>
      </section>

      {result.terminalState === 'SOURCE_CONFLICT' ? <section role="status" className="rounded-2xl border p-5"><h2 className="text-2xl font-semibold">Identifier association needs review</h2><p className="mt-3">A stored record contains the requested number, but the company relationship is not confirmed. This is not a finding of an invalid identifier or zero movers.</p></section> : null}
      {result.terminalState === 'UNAVAILABLE'  ? <section role="status" className="rounded-2xl border p-5"><h2 className="text-2xl font-semibold">Research is temporarily unavailable</h2><p className="mt-3">The source could not be checked. Try again; this is not a zero-result search.</p></section> : null}
      {result.terminalState === 'NEEDS_CLARIFICATION' && q.mode !== 'fail_closed' && (!q.journey || Boolean(q.nameQuery || q.identifier)) ? <section className="rounded-2xl border p-5"><h2 className="text-2xl font-semibold">Confirm the identity</h2><p className="mt-3">{q.nameQuery ? (result.nameSearch?.truncated ? 'The candidate search reached its bound. Refine the name or select a sourced identity to continue the original question.' : result.results.length ? 'These source-backed names belong to distinct identities. Select the intended company to continue this question.' : 'The selected record does not establish this name match. Edit the name and try again.') : result.results.length ? 'Multiple published identities remain. Review the records and select the intended profile; they were not merged.' : 'No published identity confirms both identifiers. Check each number and research them separately.'}</p></section> : null}
      {q.constraints?.length ? <section className="rounded-2xl border p-5"><h2 className="text-xl font-semibold">Requested conditions</h2><ul className="mt-3 space-y-3">{q.constraints.map((c, i) => <li key={i}><strong>{c.field}: {c.value}</strong><p>{c.outcome === 'APPLIED' ? 'Applied' : c.outcome === 'CONFLICT' ? 'Does not agree with the evidence' : c.outcome === 'UNSUPPORTED' ? 'Not available' : 'Not established'}: {c.detail}</p></li>)}</ul></section> : null}
      {q.mode === 'fail_closed' && !q.journey ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFF7F3] p-5">
          <h2 className="text-2xl font-semibold text-[#0A2540]">{result.terminalState === 'INVALID_INPUT' ? 'Check your request' : 'This question needs clarification'}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">{q.failReason}</p>
          {q.alternatives?.length ? (
            <ul className="mt-4 space-y-2">
              {q.alternatives.map((alt) => (
                <li key={alt}>
                  <Link href={href(alt)} className="font-semibold text-[#FF5A1F] underline-offset-2 hover:underline">
                    {alt}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {q.journey ? <MoveJourneyResearch result={result}/> : null}
      {def && !q.journey ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
          <h2 className="text-2xl font-semibold text-[#0A2540]">{def.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">{def.body}</p>
        </section>
      ) : null}

      {result.counts.length ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
          <h2 className="text-2xl font-semibold text-[#0A2540]">Count</h2>
          <ul className="mt-4 divide-y divide-[#E2E8F0]">
            {result.counts.map((row) => (
              <li key={row.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                <span className="text-sm text-[#0A2540]">{row.label}</span>
                <span className="font-semibold tabular-nums text-[#0A2540]">{row.value.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[#475569]">{result.counts[0]?.grain}</p>
        </section>
      ) : null}

      {q.mode !== 'fail_closed' && result.terminalState !== 'UNAVAILABLE' && result.terminalState !== 'NEEDS_CLARIFICATION' && !def && !result.results.length && !result.counts.length ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
          <h2 className="text-2xl font-semibold text-[#0A2540]">No matching research identities in this extract</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">
            {q.nameQuery ? `No plausible match for "${q.nameQuery}" was found in the published legal/display-name index. Refine the name above or enter a labeled USDOT/MC identifier. ` : ''}Absence is not inactive, unauthorized, fraudulent, or a clean record. Not available in the current indexed
            source.
          </p>
        </section>
      ) : null}

      {result.results.length ? (
        <ol className="grid gap-4">
          {result.results.map((row) => (
            <li key={row.entityId} className="min-w-0">
              <AskMoveResultCard row={row} officialAsOf={result.provenance.officialAsOf} />
            </li>
          ))}
        </ol>
      ) : null}

      {result.results.length > 0 && result.pagination.total > MOVE_ASK_PAGE_SIZE ? (
        <nav className="flex gap-3" aria-label="Pagination">
          {result.pagination.page > 1 ? (
            <Link href={href(result.queryText, result.pagination.page - 1, {...q.overrides,...q.journeyChoices})} className="inline-flex min-h-11 items-center rounded-xl border px-4">
              Previous
            </Link>
          ) : null}
          {result.pagination.hasMore ? (
            <Link href={href(result.queryText, result.pagination.page + 1, {...q.overrides,...q.journeyChoices})} className="inline-flex min-h-11 items-center rounded-xl bg-[#0A2540] px-4 text-white">
              Next
            </Link>
          ) : null}
          <p className="self-center text-xs">
            Page {result.pagination.page} · {result.pagination.total.toLocaleString('en-US')} identities
          </p>
        </nav>
      ) : null}

      <details className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
        <summary className="scroll-mt-24 min-h-11 cursor-pointer font-semibold text-[#0A2540]">Trace this query</summary>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase">Contract</dt>
            <dd>{result.contract}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase">Grain</dt>
            <dd>{result.provenance.grain}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase">Geography meaning</dt>
            <dd>{result.provenance.geographyMeaning}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase">Official as-of</dt>
            <dd>{result.provenance.officialAsOf}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase">Elapsed</dt>
            <dd>{result.elapsedMs} ms</dd>
          </div>
        </dl>
        <ul className="mt-3 list-disc pl-5 text-xs text-[#475569]">
          {result.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
