import Link from 'next/link';
import { ASK_DEFINITIONS, MOVE_ASK_PAGE_SIZE } from '@/lib/move-ask/contract';
import type { MoveAskResult } from '@/lib/move-ask/execute';

function href(q: string, page?: number, overrides?: {role?: string; state?: string; authority?: string}) {
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

      {result.terminalState === 'UNAVAILABLE' ? <section role="status" className="rounded-2xl border p-5"><h2 className="text-2xl font-semibold">Research is temporarily unavailable</h2><p className="mt-3">The source could not be checked. Try again; this is not a zero-result search.</p></section> : null}
      {result.terminalState === 'NEEDS_CLARIFICATION' && q.mode !== 'fail_closed' ? <section className="rounded-2xl border p-5"><h2 className="text-2xl font-semibold">Confirm the identity</h2><p className="mt-3">{result.results.length ? 'Multiple published identities remain. Review the records and select the intended profile; they were not merged.' : 'No published identity confirms both identifiers. Check each number and research them separately.'}</p></section> : null}
      {q.constraints?.length ? <section className="rounded-2xl border p-5"><h2 className="text-xl font-semibold">Requested conditions</h2><ul className="mt-3 space-y-3">{q.constraints.map((c, i) => <li key={i}><strong>{c.field}: {c.value}</strong><p>{c.outcome === 'APPLIED' ? 'Applied' : c.outcome === 'CONFLICT' ? 'Does not agree with the evidence' : c.outcome === 'UNSUPPORTED' ? 'Not available' : 'Not established'}: {c.detail}</p></li>)}</ul></section> : null}
      {q.mode === 'fail_closed' ? (
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

      {def ? (
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
            Absence is not inactive, unauthorized, fraudulent, or a clean record. Not available in the current indexed
            source.
          </p>
        </section>
      ) : null}

      {result.results.length ? (
        <ol className="grid gap-4">
          {result.results.map((row) => (
            <li key={row.entityId} className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-xl font-semibold text-[#0A2540]">{row.displayName}</h3>
                <span className="rounded-full border border-[#E2E8F0] px-2 py-0.5 text-[11px] font-semibold">
                  {row.role}
                </span>
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {row.usdot ? (
                  <div>
                    <dt className="text-xs uppercase">USDOT</dt>
                    <dd className="font-semibold">{row.usdot}</dd>
                  </div>
                ) : null}
                {row.mc ? (
                  <div>
                    <dt className="text-xs uppercase">MC</dt>
                    <dd className="font-semibold">{row.mc}</dd>
                  </div>
                ) : null}
                {row.fmcsaStatus ? (
                  <div>
                    <dt className="text-xs uppercase">Authority status (stored)</dt>
                    <dd>{row.fmcsaStatus}</dd>
                  </div>
                ) : null}
                {row.operatingAuthority ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase">Operating authority</dt>
                    <dd>{row.operatingAuthority}</dd>
                  </div>
                ) : null}
                {row.headquarters ? (
                  <div>
                    <dt className="text-xs uppercase">Recorded location</dt>
                    <dd>{row.headquarters}</dd>
                  </div>
                ) : null}
                {row.floridaIm ? (
                  <div>
                    <dt className="text-xs uppercase">Florida IM registration</dt>
                    <dd>{row.floridaIm}</dd>
                  </div>
                ) : null}
              </dl>
              {row.sourceLastChecked !== undefined ? <p className="mt-3 text-sm">Stored source checked-at: {row.sourceLastChecked ?? 'Not available'}. Official effective time: {row.officialAsOf ?? 'Not supplied by this extract'}. These records were not checked live today.</p> : null}
              {row.officialVerificationUrl ? <a href={row.officialVerificationUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#C2410C] underline">Verify this identifier with FMCSA</a> : null}
              <p className="mt-3 text-sm leading-relaxed text-[#1E293B]">
                <span className="font-semibold">Why this matched. </span>
                {row.whyMatched}
              </p>
              {row.complaintsNote ? <p className="mt-2 text-xs text-[#475569]">{row.complaintsNote}</p> : null}
              {row.publicationNote ? <p className="mt-2 text-xs text-[#475569]">{row.publicationNote}</p> : null}
              {row.href ? (
                <Link href={row.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#C2410C]">
                  Research this mover
                </Link>
              ) : null}
              <div className="mt-3 border-t border-[#E2E8F0] pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Evidence available</p>
                <p className="mt-1 text-sm text-[#1E293B]">Published identity and stored role evidence{row.floridaIm ? '; verified Florida FDACS registration linkage' : ''}{row.complaintsNote ? '; partial complaint observations' : ''}.</p>
              </div>
              <details className="mt-3 rounded-xl bg-[#F8FAFC] p-3">
                <summary className="scroll-mt-24 flex min-h-11 cursor-pointer items-center font-semibold text-[#0A2540]">Trace this result</summary>
                <dl className="grid gap-2 pt-2 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs uppercase text-[#475569]">Why matched</dt><dd>{row.whyMatched}</dd></div>
                  <div><dt className="text-xs uppercase text-[#475569]">Identifiers</dt><dd>{[row.usdot && `USDOT ${row.usdot}`, row.mc && `MC ${row.mc}`].filter(Boolean).join(' · ') || 'State registration row'}</dd></div>
                  <div><dt className="text-xs uppercase text-[#475569]">Geography rule</dt><dd>Recorded headquarters is not service territory.</dd></div>
                  <div><dt className="text-xs uppercase text-[#475569]">Sources</dt><dd>{row.floridaIm ? 'Florida FDACS; FMCSA only when verified-linked' : 'Published directory record; verify federal evidence with FMCSA'}</dd></div>
                </dl>
                <p className="mt-2 text-xs text-[#475569]">Source timing: {result.provenance.officialAsOf}. Current authority is not a recommendation; missing evidence is not zero.</p>
              </details>
            </li>
          ))}
        </ol>
      ) : null}

      {result.results.length > 0 && result.pagination.total > MOVE_ASK_PAGE_SIZE ? (
        <nav className="flex gap-3" aria-label="Pagination">
          {result.pagination.page > 1 ? (
            <Link href={href(result.queryText, result.pagination.page - 1, q.overrides)} className="inline-flex min-h-11 items-center rounded-xl border px-4">
              Previous
            </Link>
          ) : null}
          {result.pagination.hasMore ? (
            <Link href={href(result.queryText, result.pagination.page + 1, q.overrides)} className="inline-flex min-h-11 items-center rounded-xl bg-[#0A2540] px-4 text-white">
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
