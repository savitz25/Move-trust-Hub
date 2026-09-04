import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { WashingtonMoveIntelligencePayload } from '@/lib/washington-intelligence/load';
import { formatIntelNumber } from './format';

function Trace({
  source,
  date,
  grain,
  coverage,
  numerator,
  denominator,
  calculation,
  caveat,
}: {
  source: string;
  date: string;
  grain: string;
  coverage: string;
  numerator?: string;
  denominator?: string;
  calculation: string;
  caveat: string;
}) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer font-medium text-foreground">Trace this number</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Source: {source}</li>
        <li>Source date: {date}</li>
        <li>Grain: {grain}</li>
        <li>Coverage: {coverage}</li>
        {numerator ? <li>Numerator: {numerator}</li> : null}
        {denominator ? <li>Denominator: {denominator}</li> : null}
        <li>Calculation: {calculation}</li>
        <li>Caveat: {caveat}</li>
      </ul>
    </details>
  );
}

export function WashingtonMoveIntelligence({ payload }: { payload: WashingtonMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const federalDisplay = formatIntelNumber(payload.federalHqPublishable, payload.federalTimedOut);
  const utcCount = s.directory.active_result_count.toLocaleString('en-US');

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Washington Moving & Household-Goods Intelligence',
            description:
              'UTC household-goods permits, official Active directory result count, FMCSA interstate records with a Washington HQ location, and Tariff 15-C consumer rules. Not a ranking.',
            url: `${SITE_URL}/washington`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Washington research', item: `${SITE_URL}/washington` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Washington research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Washington · moving &amp; household-goods research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Washington Moving &amp; Household-Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Washington intrastate household-goods authority is a UTC permit, separate from FMCSA
          interstate authority. This page organizes official verification paths, Tariff 15-C consumer
          rules, and the current Active directory header count. It does not rank movers, does not
          publish a Trust Score, and does not invent a combined state/federal mover number.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">UTC active directory</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{utcCount}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Official HTML header: Active Household Goods Carriers — not a historical universe
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">FMCSA Washington HQ</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{federalDisplay}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              FMCSA interstate records with a Washington business/HQ location — not UTC permits
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">State bulk roster</dt>
            <dd className="mt-1 text-2xl font-semibold">Not acquired</dd>
            <p className="mt-1 text-xs text-muted-foreground">Directory-only. No supported CSV/API.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Regulator</dt>
            <dd className="mt-1 text-2xl font-semibold">{s.regulator.short}</dd>
            <p className="mt-1 text-xs text-muted-foreground">{s.regulator.agency}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">As-of</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.as_of}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Directory header retrieved {s.directory.retrieved_at.slice(0, 10)}</p>
          </div>
        </dl>
        <Trace
          source="UTC companies lookup, industry=Household Goods Carriers (568), regulatory_status=Active"
          date={s.directory.retrieved_at}
          grain="ACTIVE DIRECTORY RESULTS in the official page header (Displaying 1 - 50 of 284)"
          coverage="OPEN_HTML_TABLE / OPEN_SEARCH_ONLY — first page only, no pagination crawl"
          numerator="284 (header total)"
          denominator="that Active Household Goods filter — not all movers, not FMCSA"
          calculation="Read the official Displaying N of M header. ATH-WA-001 baseline was 285; current header is 284."
          caveat="This is not a licensed-mover Trust Score and not a combined UTC+FMCSA count. Missing bulk roster is not zero movers."
        />
        <Trace
          source="MoveTrustHub publishable FMCSA-keyed companies with headquarters matching %, WA%"
          date="live directory when available"
          grain="publishable company profile with Washington HQ — not a UTC permit"
          coverage="EXISTING_GRAPH / LIVE_DIRECTORY_WHEN_AVAILABLE"
          numerator="count of publication_state = PUBLISHABLE rows whose headquarters ILIKE %, WA%"
          denominator="that MoveTrustHub FMCSA graph — not Washington UTC-authorized movers"
          calculation="Exact headquarters-state overlay, same as CA/NJ/TX. Timed-out counts display as an em dash, not zero."
          caveat="FMCSA Washington HQ is not UTC authorized. A USDOT number is not interstate operating authority by itself."
        />
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Who regulates intrastate household-goods movers in Washington?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The current regulator is the <strong>Washington Utilities and Transportation Commission</strong>.
            Official UTC language: transportation of household goods means moving people&apos;s household
            items for pay on public roads in Washington. The source-native credential is a{' '}
            <strong>permit</strong> (Active Permit(s) such as HG###### on company detail). This page
            does not rename that permit as a license.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.regulator.home_url} rel="noopener noreferrer" target="_blank">
              UTC Household Goods Carriers
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.regulator.verification_url} rel="noopener noreferrer" target="_blank">
              UTC companies lookup
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            How many active results does the current UTC directory show?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Filter: Household Goods Carriers + Active. Official header on {s.as_of}:{' '}
            <strong>{s.directory.header_text}</strong>. ATH-WA-001 baseline was 285. Use the current
            284. This is an active-directory result count, not all historically permitted movers and
            not interstate movers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">How do I verify a Washington mover?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Keep Washington UTC authority and federal interstate authority separate. A carrier that
            performs both may need both checks.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move entirely within Washington.</strong> A UTC household-goods permit is
              central. Verify on the official{' '}
              <a className="underline underline-offset-2" href={s.verify.utc_companies} rel="noopener noreferrer" target="_blank">
                UTC companies directory
              </a>
              . UTC Active is not quality and is not FMCSA Active.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move Washington → another state, or another state → Washington.</strong> FMCSA
              interstate operating authority is central. A UTC permit does not authorize interstate
              transport. Verify USDOT and operating authority on{' '}
              <Link href={s.verify.movetrusthub_verify_dot} className="underline underline-offset-2">
                MoveTrustHub Verify DOT
              </Link>
              {' '}and{' '}
              <a className="underline underline-offset-2" href={s.verify.protect_your_move} rel="noopener noreferrer" target="_blank">
                protectyourmove.gov
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>UTC record with a USDOT.</strong> That USDOT is a federal identity on that
              record. It is not interstate operating authority by itself and does not replace the UTC
              permit.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>FMCSA Washington HQ record with no UTC permit shown.</strong> An FMCSA
              Washington HQ listing is not UTC authorized. Confirm the UTC directory separately for
              intrastate household-goods work.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Market findings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {s.findings.map((f) => (
              <li key={f.id}>{f.text}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Find movers — keep the universes separate</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Washington intrastate</h3>
              <p className="mt-2 text-muted-foreground">
                Official UTC Household Goods directory (Active). Directory-only. Bulk roster not
                acquired.
              </p>
              <p className="mt-3">
                <a className="underline underline-offset-2" href={s.verify.utc_active_hhg} rel="noopener noreferrer" target="_blank">
                  Verify on the UTC Household Goods directory
                </a>
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Interstate</h3>
              <p className="mt-2 text-muted-foreground">
                MoveTrustHub Washington FMCSA directory plus Verify DOT. Not UTC permits.
              </p>
              <p className="mt-3">
                <Link href={s.federal.directory_href} className="underline underline-offset-2">
                  MoveTrustHub federal company search (WA HQ)
                </Link>
                {' · '}
                <Link href={s.federal.verify_href} className="underline underline-offset-2">
                  Verify DOT
                </Link>
              </p>
            </article>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Never merge these into one regulatory status. Name-only matching is unsafe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What does a UTC ID or permit prove?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The directory UTC ID identifies a UTC company row. Company detail shows{' '}
            <strong>Active Permit(s)</strong> (for example HG070844) and whether that permit is
            Permanent or Temp. A UTC ID is not a UBI. A permit number is not the UTC ID. A UTC
            permit is not an endorsement, not FMCSA interstate authority, and not a quality score.
            Current status is source-clock-specific. Do not infer approved forever.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What does a USDOT number prove?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A USDOT number is a federal census/identity number. Official UTC directory and detail
            pages often display it. It is not interstate operating authority by itself and is not a
            UTC household-goods permit. Confirm operating authority separately on FMCSA SAFER /
            Verify DOT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">How do state and interstate authority differ?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.federal.disclaimer} UBI is a Washington business identifier, not mover authority.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What data is not available in bulk?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage {s.bulk.utc_hhg_bulk_roster}. {s.bulk.note} Missing is not zero.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Consumer protections</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.consumer_rules.source_clock}. A tariff is not an invoice and not a quote calculator.
            These are Washington UTC rules — not Texas or California rules copied over.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.consumer_rules.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.verify.utc_moving_guide} rel="noopener noreferrer" target="_blank">
              Consumer Guide to Moving in Washington State
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Complaints and enforcement</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage {s.complaints.coverage}. No household-goods complaint bulk was acquired. A
            complaint is not a violation. No complaint found is not a clean record. UTC can help
            facilitate claim negotiations; it cannot require settlement of loss and damage claims.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Enforcement bulk: {s.enforcement.coverage}. Adverse profile attachment requires an exact
            UTC ID, UBI, USDOT, or permit number. Name-only is unsafe. Attachments in this snapshot:{' '}
            {s.enforcement.profile_attachments}.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.complaints.path} rel="noopener noreferrer" target="_blank">
              File a UTC complaint
            </a>
            {' · helpline '}
            {s.complaints.helpline}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Evidence depth</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-3 font-medium">Family</th>
                  <th className="py-2 pr-3 font-medium">Access</th>
                  <th className="py-2 font-medium">Limitation</th>
                </tr>
              </thead>
              <tbody>
                {s.evidence_depth.map((row) => (
                  <tr key={row.family} className="border-b border-border align-top">
                    <td className="py-2 pr-3">{row.family}</td>
                    <td className="py-2 pr-3">{row.access}</td>
                    <td className="py-2">{row.limitations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What we don&apos;t yet know</h2>
          <p className="mt-2 text-sm">Missing is not zero.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.coverage_gaps.map((g) => (
              <li key={g.id}>
                {g.label}: {g.state}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Semantic rules</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.semantics.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">No Trust Score. No paid ranking. No Washington city or county pages in this ticket.</p>
        </section>
      </div>
    </main>
  );
}
