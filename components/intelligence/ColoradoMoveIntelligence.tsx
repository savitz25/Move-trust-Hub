import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { ColoradoMoveIntelligencePayload } from '@/lib/colorado-intelligence/load';
import { fmtInt } from '@/lib/colorado-intelligence/snapshot';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
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

export function ColoradoMoveIntelligence({ payload }: { payload: ColoradoMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const federalDisplay = formatIntelNumber(payload.federalHqPublishable, payload.federalTimedOut);
  const active = fmtInt(s.active_universe.official_total_permits);
  const classes = s.status_classes.classes;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Colorado Moving & Household-Goods Intelligence',
            description:
              'Official Colorado PUC household-goods mover permits, Active listings, status evidence, and FMCSA interstate overlay kept separate. Not a ranking or Trust Score.',
            url: `${SITE_URL}/colorado`,
            about:
              'Colorado PUC household-goods permits for intrastate moves. Interstate authority is FMCSA. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Colorado research', item: `${SITE_URL}/colorado` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Colorado research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Colorado · moving &amp; household-goods research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Colorado Moving &amp; Household-Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Colorado has a real statewide household-goods mover permit universe. Intrastate authority is
          a Colorado PUC HHG permit. Interstate authority is FMCSA. This page does not rank movers,
          does not publish a Trust Score, and does not invent a combined state/federal mover number.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Active HHG listings</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{active}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Active Colorado PUC household-goods permit listings — not all moving companies in Colorado
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">FMCSA Colorado HQ</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{federalDisplay}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              FMCSA interstate records with a Colorado business/HQ location — not PUC permits
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Revoked listings</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{fmtInt(classes.REVOKED.official_total)}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Permit-status evidence. Not convictions. Not bad movers.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Regulator</dt>
            <dd className="mt-1 text-2xl font-semibold">{s.regulator.short}</dd>
            <p className="mt-1 text-xs text-muted-foreground">{s.regulator.agency}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Source date</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.source.source_publication_date}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Official OPR Active list clock {s.active_universe.source_clock}</p>
          </div>
        </dl>
        <Trace
          source="Colorado PUC Operating Rights System (OPR) Carriers With Permits, HOUSEHOLD GOODS, Permit Status ACTIVE"
          date={s.source.source_publication_date}
          grain="Official Total Permits line on the ACTIVE listing"
          coverage="Statewide Colorado PUC household-goods carrier permit listing"
          numerator="203"
          denominator="that ACTIVE OPR listing — not cancelled, inactive, revoked, suspended, or FMCSA"
          calculation="Read Total Permits: 203 on the July 2025 official PDF dated 06/27/2025 15:24. Extracted distinct HHG numbers on that listing: 203."
          caveat="This is not all moving companies in Colorado and not a combined PUC+FMCSA count. Historical statuses are not added to 203."
        />
        <Trace
          source="MoveTrustHub publishable FMCSA-keyed companies with headquarters matching %, CO%"
          date="live directory when available"
          grain="publishable company profile with Colorado HQ — not a PUC HHG permit"
          coverage="EXISTING_GRAPH / LIVE_DIRECTORY_WHEN_AVAILABLE"
          numerator="count of publication_state = PUBLISHABLE rows whose headquarters ILIKE %, CO%"
          denominator="that MoveTrustHub FMCSA graph — not Colorado PUC-authorized movers"
          calculation="Exact headquarters-state overlay, same as WA/CA/NJ/TX. Timed-out counts display as an em dash, not zero."
          caveat="FMCSA Colorado HQ is not a PUC HHG permit. Headquarters is not service territory. A USDOT number is not interstate operating authority by itself."
        />
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Who regulates intrastate household-goods movers in Colorado?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The current regulator is the <strong>Colorado Public Utilities Commission</strong>. Official
            language: the PUC regulates household goods movers per title 40, article 10.1, C.R.S. and
            Commission rules. The source-native credential is a <strong>permit</strong> whose number
            has the letters HHG. This page does not rename that permit as a license.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.regulator.home_url} rel="noopener noreferrer" target="_blank">
              PUC Household Goods Movers
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.regulator.permit_search} rel="noopener noreferrer" target="_blank">
              Official PUC permit search
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Look up a Colorado HHG permit</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Canonical state identity is <strong>{s.identity.namespace}</strong>. An HHG permit is not a
            USDOT and not an MC number. Name-only lookup is not used.
          </p>
          <form action="/colorado" method="get" className="mt-4 flex max-w-xl flex-wrap gap-2">
            <label className="sr-only" htmlFor="permit">
              HHG permit number
            </label>
            <input
              id="permit"
              name="permit"
              defaultValue={payload.lookup.query}
              placeholder="HHG-00513"
              className="min-h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm"
            />
            <button type="submit" className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
              Look up
            </button>
          </form>
          <p className="mt-3 text-sm text-muted-foreground">{payload.lookup.note}</p>
          {payload.lookup.hits.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {payload.lookup.hits.map((hit) => (
                <li key={`${hit.permitNumber}-${hit.status}`} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-semibold">{hit.identity}</p>
                  <p className="mt-1 text-muted-foreground">
                    Source-native status: {hit.status}
                    {hit.currentUniverse ? ' · current active listing' : ' · not the current active universe'}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">How do I verify a Colorado mover?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Keep Colorado PUC authority and federal interstate authority separate. A carrier that
            performs both may need both checks.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Intrastate Colorado household-goods move.</strong> A Colorado PUC permit matters.
              Verify on the official{' '}
              <a className="underline underline-offset-2" href={s.verify.puc_permit_search} rel="noopener noreferrer" target="_blank">
                PUC permit search
              </a>
              . Colorado ACTIVE is not quality and is not FMCSA ACTIVE.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Interstate household-goods move.</strong> FMCSA operating authority matters. A
              Colorado HHG permit does not authorize interstate transport. Verify USDOT and operating
              authority on{' '}
              <Link href={s.verify.movetrusthub_verify_dot} className="underline underline-offset-2">
                MoveTrustHub Verify DOT
              </Link>
              {' '}and{' '}
              <a className="underline underline-offset-2" href={s.verify.protect_your_move} rel="noopener noreferrer" target="_blank">
                protectyourmove.gov
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Status evidence — keep the classes separate</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official OPR lists are modeled separately. Do not flatten them. Do not add historical
            statuses into the current active universe. A status row is not a unique company unless
            identity confirms it.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-3">Status class</th>
                  <th className="py-2 pr-3">Official Total Permits</th>
                  <th className="py-2">Current universe?</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ['ACTIVE', classes.ACTIVE],
                    ['CANCELLED', classes.CANCELLED],
                    ['INACTIVE', classes.INACTIVE],
                    ['INACTIVE-TRANSFERRED', classes['INACTIVE-TRANSFERRED']],
                    ['REVOKED', classes.REVOKED],
                    ['SUSPENDED', classes.SUSPENDED],
                  ] as const
                ).map(([name, row]) => (
                  <tr key={name} className="border-b border-border">
                    <td className="py-2 pr-3">{name}</td>
                    <td className="py-2 pr-3 tabular-nums">{fmtInt(row.official_total)}</td>
                    <td className="py-2">{row.current_universe ? 'Yes — Active listings only' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Inactive is not revoked. Revoked is not a criminal conviction. Suspended is not
            permanently revoked. Revoked/suspended listings are source-native permit-status evidence,
            not criminal enforcement, consumer fraud findings, or “bad movers.” Attach only by exact
            HHG permit ID. Name-only adverse attachment is prohibited.
          </p>
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
              <h3 className="font-semibold">Colorado intrastate</h3>
              <p className="mt-2 text-muted-foreground">
                Official PUC OPR Active household-goods permit listings. Identity is the HHG permit.
              </p>
              <p className="mt-3">
                <a className="underline underline-offset-2" href={s.verify.puc_permit_search} rel="noopener noreferrer" target="_blank">
                  Verify on the official PUC permit search
                </a>
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Interstate</h3>
              <p className="mt-2 text-muted-foreground">
                MoveTrustHub Colorado FMCSA directory plus Verify DOT. Not PUC permits.
              </p>
              <p className="mt-3">
                <Link href={s.federal.directory_href} className="underline underline-offset-2">
                  MoveTrustHub federal company search (CO HQ)
                </Link>
                {' · '}
                <Link href={s.federal.verify_href} className="underline underline-offset-2">
                  Verify DOT
                </Link>
              </p>
            </article>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Never merge these into one regulatory status. Name-only matching is unsafe. A federal
            directory profile is not a state HHG permit. Headquarters is not service territory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What does a USDOT number prove?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A USDOT number is a federal identity. It is not a Colorado HHG permit and is not
            interstate operating authority by itself. MC presence is not active authority. Confirm
            operating authority separately on FMCSA SAFER / Verify DOT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">How do state and interstate authority differ?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{s.federal.disclaimer}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Consumer protections</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.consumer_rules.source_clock}. These are consumer rights / research guidance, not
            evidence that an individual mover complied. A tariff/rule is not an invoice, actual
            charged price, consumer premium, or quality score.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.consumer_rules.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.regulator.consumer_url} rel="noopener noreferrer" target="_blank">
              PUC Household Goods Movers — Consumer Info
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Complaints, insurance, and limitations</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Complaint process is a public research path. Bulk complaint observation universe is{' '}
            {s.complaints.bulk_observation_universe}. A complaint is not a violation. No complaint
            found is not a clean record. Missing is not zero. Do not invent zero complaints.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Insurance / financial-responsibility bulk coverage: {s.insurance.coverage}. Missing is not
            zero. Washington-style insurance evidence is not created from this source.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.complaints.path} rel="noopener noreferrer" target="_blank">
              File a PUC transportation complaint
            </a>
            {' · helpline '}
            {s.complaints.helpline}
          </p>
        </section>
      </div>
    </main>
  );
}
