import Link from 'next/link';
import { formatAsOf, formatIntelNumber } from '@/components/intelligence/format';
import {
  MOVE_HOME_ASK_THE_MARKET,
  MOVE_HOME_MARKET_ROLES,
} from '@/lib/intelligence/home-education';
import type {
  MoveHomeIntelligencePayload,
  MoveHomeMetric,
} from '@/lib/intelligence/home-types';

function metricById(payload: MoveHomeIntelligencePayload, id: string) {
  return payload.metrics.find((m) => m.id === id);
}

function TraceNumber({ metric, retrievedAt }: { metric: MoveHomeMetric; retrievedAt: string }) {
  return (
    <details className="mt-3 text-xs text-muted-foreground">
      <summary
        className="inline-flex min-h-11 cursor-pointer list-none items-center font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        data-intel-event="move_intel_trace_number"
      >
        Trace this number
      </summary>
      <dl className="mt-2 space-y-1 rounded-xl border border-border bg-muted/30 px-3 py-3">
        <div><dt className="font-medium text-foreground">What is counted</dt><dd>{metric.definition}</dd></div>
        <div><dt className="font-medium text-foreground">Grain</dt><dd>{metric.grain}</dd></div>
        <div><dt className="font-medium text-foreground">Cohort</dt><dd>{metric.cohort}</dd></div>
        <div><dt className="font-medium text-foreground">Source</dt><dd>{metric.source}</dd></div>
        <div><dt className="font-medium text-foreground">As-of</dt><dd>{formatAsOf(metric.asOf) ?? metric.asOf}</dd></div>
        <div><dt className="font-medium text-foreground">Retrieved</dt><dd>{formatAsOf(retrievedAt) ?? retrievedAt}</dd></div>
        <div><dt className="font-medium text-foreground">Limitation</dt><dd>{metric.disclosure}</dd></div>
        <div><dt className="font-medium text-foreground">Exclusions</dt><dd>{metric.exclusions}</dd></div>
        <div><dt className="font-medium text-foreground">Not the FMCSA universe</dt><dd>{metric.whyNotFmcsaUniverse}</dd></div>
      </dl>
    </details>
  );
}

function RoleBars({
  payload,
}: {
  payload: MoveHomeIntelligencePayload;
}) {
  const rows = payload.entityClasses;
  if (!rows) return null;
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  if (!total) return null;
  const colors: Record<string, string> = {
    Carrier: '#0A2540',
    Broker: '#FF5A1F',
    'Carrier/Broker': '#1A3654',
    Unknown: '#CBD5E1',
  };

  return (
    <figure className="mt-6">
      <div
        className="flex h-3 overflow-hidden rounded-full"
        role="img"
        aria-label="Directory role composition bar"
      >
        {rows.map((row) => (
          <span
            key={row.class}
            style={{ width: `${(row.count / total) * 100}%`, backgroundColor: colors[row.class] }}
            title={`${row.class}: ${row.count}`}
          />
        ))}
      </div>
      <table className="mt-4 w-full text-sm">
        <caption className="sr-only">
          Current MoveTrustHub directory cohort by regulatory role. Not the FMCSA census.
        </caption>
        <thead>
          <tr className="text-left text-muted-foreground">
            <th scope="col" className="py-1 font-medium">Role</th>
            <th scope="col" className="py-1 font-medium">Profiles</th>
            <th scope="col" className="py-1 font-medium">Share of directory cohort</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.class} className="border-t border-border/60">
              <th scope="row" className="py-2 font-medium text-foreground">{row.class}</th>
              <td className="py-2 tabular-nums">{formatIntelNumber(row.count, payload.timedOut)}</td>
              <td className="py-2 tabular-nums">{Math.round((row.count / total) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <details className="mt-3 text-xs text-muted-foreground">
        <summary
          className="inline-flex min-h-11 cursor-pointer items-center font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          data-intel-event="move_intel_explain_chart"
        >
          Explain this chart
        </summary>
        <div className="mt-2 space-y-2 rounded-xl border border-border bg-muted/30 px-3 py-3">
          <p><strong className="text-foreground">What am I looking at?</strong> Role composition of the current MoveTrustHub directory cohort, using stored entity type.</p>
          <p><strong className="text-foreground">Why might this matter?</strong> A carrier hauls the shipment. A broker arranges it. Dual authority stays dual.</p>
          <p><strong className="text-foreground">What does this not mean?</strong> It is not the complete FMCSA universe, not a ranking, and not a claim that one role is safer.</p>
          <p><strong className="text-foreground">Source</strong> Directory entity_type via existing FMCSA display normalization.</p>
          <p><strong className="text-foreground">As-of</strong> {formatAsOf(payload.asOf) ?? 'Not available'}</p>
        </div>
      </details>
    </figure>
  );
}

export function MoveNationalIntelligence({
  payload,
}: {
  payload: MoveHomeIntelligencePayload;
}) {
  const asOf = formatAsOf(payload.asOf);
  const profiles = metricById(payload, 'dir_publishable_profiles');
  const snapshotUnavailable = payload.timedOut || payload.metrics.length === 0;

  return (
    <div id="moving-intelligence" className="scroll-mt-24">
      <section aria-labelledby="record-heading" className="move-section">
        <div className="move-section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            State of the record
          </p>
          <h2 id="record-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            What the current research directory can show
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Numbers appear only when they have a source, a grain, and an as-of clock.
            Missing is shown as missing — never as zero.
          </p>

          {snapshotUnavailable ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              Live directory counts are temporarily unavailable. Research links below still work.
              We do not display zeros for a failed snapshot.
            </p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profiles ? (
                <li className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-3xl font-semibold tabular-nums tracking-tight text-[#0A2540]">
                    {formatIntelNumber(profiles.value, payload.timedOut)}
                  </p>
                  <p className="mt-1 text-sm font-medium">{profiles.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{profiles.disclosure}</p>
                  <TraceNumber metric={profiles} retrievedAt={payload.generatedAt} />
                </li>
              ) : null}
              {payload.entityClasses ? (
                <li className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Regulatory roles</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {payload.entityClasses.map((row) => (
                      <li key={row.class} className="flex justify-between gap-3">
                        <span>{row.class}</span>
                        <span className="tabular-nums font-medium">{formatIntelNumber(row.count, payload.timedOut)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Current MoveTrustHub directory cohort, not the complete FMCSA universe.
                  </p>
                </li>
              ) : null}
              {payload.authority ? (
                <li className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Current authority</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex justify-between gap-3"><span>Current / active flag</span><span className="tabular-nums font-medium">{formatIntelNumber(payload.authority.active, payload.timedOut)}</span></li>
                    <li className="flex justify-between gap-3"><span>Not current</span><span className="tabular-nums font-medium">{formatIntelNumber(payload.authority.notCurrent, payload.timedOut)}</span></li>
                    <li className="flex justify-between gap-3"><span>Unknown</span><span className="tabular-nums font-medium">{formatIntelNumber(payload.authority.unknown, payload.timedOut)}</span></li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Null is unknown, not inactive. Active is not an endorsement.
                  </p>
                </li>
              ) : null}
              {payload.siteCoverage.allFiftyStatesAndDc ? (
                <li className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">State research</p>
                  <p className="mt-2 text-base font-medium text-[#0A2540]">
                    State research available across all {payload.siteCoverage.stateCount} states and Washington, D.C.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{payload.siteCoverage.limitation}</p>
                </li>
              ) : (
                <li className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">State research</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Open local movers landings from the map and state directory below.
                  </p>
                </li>
              )}
            </ul>
          )}
          {asOf ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Directory FMCSA flags as of {asOf}. Snapshot {payload.version}.
            </p>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="market-heading" className="move-section border-t border-border/60 bg-muted/20">
        <div className="move-section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            How the moving market works
          </p>
          <h2 id="market-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            A carrier and a broker are not the same thing
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Neither role is “better” in this research view. Research the entity that will actually
            move the household goods.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {MOVE_HOME_MARKET_ROLES.map((role) => (
              <li key={role.id} className="rounded-2xl border border-border bg-card px-4 py-4">
                <h3 className="text-lg font-semibold text-[#0A2540]">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.body}</p>
              </li>
            ))}
          </ul>
          <RoleBars payload={payload} />
          <p className="mt-4 text-sm">
            <Link href="/resources/carrier-vs-broker" className="font-medium text-primary hover:underline">
              Read carrier vs broker →
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="authority-heading" className="move-section">
        <div className="move-section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Regulatory authority
          </p>
          <h2 id="authority-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            Authority is a regulatory fact, not a recommendation
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-border px-4 py-4">
              <h3 className="font-semibold text-[#0A2540]">USDOT</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Identifies the motor-carrier entity. A number fragment is not unique by itself.
              </p>
            </li>
            <li className="rounded-2xl border border-border px-4 py-4">
              <h3 className="font-semibold text-[#0A2540]">MC</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Identifies operating authority where issued. Related to USDOT, not interchangeable with it.
              </p>
            </li>
            <li className="rounded-2xl border border-border px-4 py-4">
              <h3 className="font-semibold text-[#0A2540]">Current / active status</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The directory stores an authority_active flag from FMCSA refresh. Null means unknown,
                not inactive. Active does not mean approved, safe, trusted, or recommended.
              </p>
            </li>
            <li className="rounded-2xl border border-border px-4 py-4">
              <h3 className="font-semibold text-[#0A2540]">Interstate vs state registration</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Crossing a state line is federally regulated. A move that stays inside one state may
                require that state’s registration. Headquarters in a state is not proof of either.
              </p>
            </li>
          </ul>
          <p className="mt-6">
            <Link
              href="/verify-dot"
              className="move-cta inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Verify a USDOT number
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="depth-heading" className="move-section border-t border-border/60 bg-muted/20">
        <div className="move-section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Evidence depth
          </p>
          <h2 id="depth-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            What we know, and how far it goes
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {payload.evidenceDepth.map((item) => (
              <li key={item.id} className="rounded-2xl border border-border bg-card px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[#0A2540]">{item.label}</h3>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="unknown-heading" className="move-section">
        <div className="move-section-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            What we don’t know
          </p>
          <h2 id="unknown-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            Research discipline, not an error page
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Gaps are part of the record. They tell you where to verify on official sources.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1E293B]">
            {payload.limitations.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}

export function HomeAskTheMarket() {
  return (
    <section aria-labelledby="ask-heading" className="move-section border-y border-border/60 bg-muted/20">
      <div className="move-section-inner">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Ask the market
        </p>
        <h2 id="ask-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
          Questions worth asking before you book
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {MOVE_HOME_ASK_THE_MARKET.map((item) => (
            <li key={item.q}>
              <Link
                href={item.href}
                className="flex min-h-11 flex-col rounded-2xl border border-border bg-card px-4 py-4 no-underline hover:border-primary/40"
              >
                <span className="font-medium text-[#0A2540]">{item.q}</span>
                <span className="mt-1 text-sm text-muted-foreground">{item.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeSourcesSection({ payload }: { payload: MoveHomeIntelligencePayload }) {
  return (
    <section aria-labelledby="sources-heading" className="move-section">
      <div className="move-section-inner">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Sources and limitations
        </p>
        <h2 id="sources-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
          Traceability over spectacle
        </h2>
        <ul className="mt-6 space-y-4">
          {payload.sources.map((source) => (
            <li key={source.id} className="rounded-2xl border border-border px-4 py-4">
              <h3 className="font-semibold text-[#0A2540]">{source.label}</h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{source.agency}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.whatItContains}</p>
              <p className="mt-2 text-xs text-muted-foreground">Coverage: {source.coveragePeriod}. {source.limitation}</p>
              {source.sourceUrl ? (
                <a href={source.sourceUrl} className="mt-2 inline-block text-sm text-primary hover:underline">
                  Open source
                </a>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Intelligence aggregation {payload.version}
          {payload.canonicalFingerprint ? ` · fingerprint ${payload.canonicalFingerprint.slice(0, 12)}` : ''}.
          Regenerating the payload updates figures without changing scoring, publication, or identity rules.
        </p>
      </div>
    </section>
  );
}
