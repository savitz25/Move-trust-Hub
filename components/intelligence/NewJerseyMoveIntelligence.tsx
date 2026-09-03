import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { NjMoveIntelligencePayload } from '@/lib/intelligence/nj-snapshot';
import { formatIntelNumber } from './format';
import {
  NJ_PMW_FAQ_URL,
  NJ_PMW_HOME_URL,
  NJ_RGB_PUBLIC_VIEW_URL,
} from '@/lib/state-hhg/nj/adapter';

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

export function NewJerseyMoveIntelligence({ payload }: { payload: NjMoveIntelligencePayload }) {
  const snap = payload.snapshot;
  const osm2025 = snap.osm.years['2025'];
  const osm2024 = snap.osm.years['2024'];
  const rows2025 = snap.osm.rows.filter((row) => row.year === '2025');
  const rows2024 = snap.osm.rows.filter((row) => row.year === '2024');
  const federalDisplay = formatIntelNumber(payload.federalHqPublishable, payload.federalTimedOut);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'New Jersey Moving & Warehousing Intelligence',
          description:
            'Official New Jersey mover and warehouse authority rules, federal interstate carrier evidence, and Operation Safe Move enforcement. Not a ranking.',
          url: `${SITE_URL}/new-jersey`,
        }}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'New Jersey research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          New Jersey · moving &amp; warehousing research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          New Jersey Moving &amp; Warehousing Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Research official New Jersey mover and warehouse authority rules, federal interstate
          carrier evidence, and state enforcement activity. MoveTrustHub organizes evidence. It
          does not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Universe
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{federalDisplay}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Federal NJ-headquartered publishable profiles — not NJ state licenses
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current
            </dt>
            <dd className="mt-1 text-2xl font-semibold">Unknown</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Complete PM/PW/PC roster is request-only — not zero
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Observations
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{snap.osm.acquiredNovs}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Operation Safe Move NOVs in acquired 2024–2025 releases
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Geography
            </dt>
            <dd className="mt-1 text-2xl font-semibold">New Jersey</dd>
            <p className="mt-1 text-xs text-muted-foreground">Statewide research — no county routes</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              As-of
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{snap.asOf}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Publication snapshot, not live licensing</p>
          </div>
        </dl>
        <Trace
          source="Official NJ DCA Operation Safe Move releases (2024, 2025 respondent tables)"
          date={`${osm2024.releaseDate} / ${osm2025.releaseDate}`}
          grain="notice / named respondent"
          coverage="acquired official releases"
          numerator="11 + 23 Notices of Violation"
          denominator="those two official tables — not every NJ moving action"
          calculation="Count of parsed official table rows. Unique hashes are not used as the public count."
          caveat="A Notice of Violation is not a final order. Proposed penalty is not a paid fine."
        />
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section id="authority-needed" aria-labelledby="authority-needed-heading">
          <h2 id="authority-needed-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            What authority do I need?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This is research guidance, not legal advice. Which credential matters depends on the
            move.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move within New Jersey.</strong> New Jersey Public Movers and Warehousemen
              authority matters. Verify a specific record on the{' '}
              <a href={NJ_RGB_PUBLIC_VIEW_URL} className="text-primary hover:underline">
                official RGB portal
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move from New Jersey to another state.</strong> FMCSA interstate household-goods
              authority matters.{' '}
              <Link href="/verify-dot" className="text-primary hover:underline">
                Verify USDOT / MC
              </Link>{' '}
              or{' '}
              <Link href="/companies?state=NJ" className="text-primary hover:underline">
                research federal NJ headquarters profiles
              </Link>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Warehouse / storage.</strong> New Jersey warehouse authority (PW) may matter.
              PW-only is not mover authority.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Combined moving + storage.</strong> PM / PW / PC class semantics matter. PC is
              combined authority; it is still not FMCSA interstate authority.
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            A company can be NJ-authorized for intrastate moves, federally authorized for interstate
            household-goods moves, both, warehouse-only in New Jersey, or not resolved in our current
            NJ state roster. <strong>FMCSA ACTIVE is not NJ licensed. NJ licensed is not interstate
            authorized.</strong>
          </p>
        </section>

        <section id="pmw" aria-labelledby="pmw-heading">
          <h2 id="pmw-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            PM / PW / PC state authority
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official current terminology from the New Jersey Division of Consumer Affairs Public
            Movers and Warehousemen FAQ. Counts are not shown because the complete statewide roster
            was not acquired.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="mb-2 text-left text-xs text-muted-foreground">
                NJ state license classes. PW-only is not mover authority.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-3">
                    Class
                  </th>
                  <th scope="col" className="py-2 pr-3">
                    Official meaning
                  </th>
                  <th scope="col" className="py-2">
                    Consumer mover search
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(snap.authority.classes).map((cls) => (
                  <tr key={cls.code} className="border-b border-border/70">
                    <th scope="row" className="py-3 pr-3 font-semibold">
                      {cls.code}
                    </th>
                    <td className="py-3 pr-3">
                      <div>{cls.label}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{cls.definition}</p>
                    </td>
                    <td className="py-3">{cls.consumerMover ? 'Yes (mover class)' : 'No — warehouse only'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">
            Current complete statewide license roster:{' '}
            <strong>{snap.authority.rosterCoverage}</strong>. Public verification:{' '}
            <strong>{snap.authority.verificationCoverage}</strong>. Source search can verify a specific
            record. Absence from our dataset does not establish no NJ authority.{' '}
            <a href={NJ_RGB_PUBLIC_VIEW_URL} className="text-primary hover:underline">
              Official RGB verification
            </a>
            {' · '}
            <a href={NJ_PMW_FAQ_URL} className="text-primary hover:underline">
              Official FAQ
            </a>
            {' · '}
            <a href={NJ_PMW_HOME_URL} className="text-primary hover:underline">
              PMW home
            </a>
            .
          </p>
        </section>

        <section id="federal" aria-labelledby="federal-heading">
          <h2 id="federal-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Federal interstate mover intelligence
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-medium text-foreground">
            Federal interstate authority and New Jersey intrastate authority are separate.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {snap.federal.disclaimer} These figures, when available, count MoveTrustHub directory
            profiles keyed by USDOT — not NJ PM/PW/PC licenses.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed">
            <li>
              <strong>NJ-headquartered publishable federal profiles:</strong>{' '}
              <span className="tabular-nums">{federalDisplay}</span>
              {payload.federalTimedOut
                ? ' Live directory count is temporarily unavailable. We do not display zero for a missing query.'
                : ' Headquarters is not a service area and is not an NJ state license.'}
            </li>
            <li>
              Research tools:{' '}
              <Link href="/companies?state=NJ" className="text-primary hover:underline">
                Federal NJ headquarters directory
              </Link>
              {' · '}
              <Link href="/verify-dot" className="text-primary hover:underline">
                USDOT / MC lookup
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="safe-move" aria-labelledby="safe-move-heading">
          <h2 id="safe-move-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Operation Safe Move
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official NJ DCA undercover enforcement releases. Coverage is partial history — not every
            year is complete.
          </p>
          <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            NOTICE OF VIOLATION ≠ FINAL ORDER. PROPOSED PENALTY ≠ PAID FINE. PRESS RELEASE ≠ FINAL
            DISPOSITION. ALLEGED UNLICENSED ACTIVITY ≠ CRIMINAL CONVICTION.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <strong>2025.</strong> {osm2025.novs} Notices of Violation. Typical proposed penalty $
              {osm2025.proposedPenaltyTypical.toLocaleString('en-US')} per cited respondent.{' '}
              <a href={osm2025.sourceUrl} className="text-primary hover:underline">
                Official release
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <strong>2024.</strong> {osm2024.novs} Notices of Violation ({osm2024.fiveThousand} at $
              {osm2024.proposedPenaltyTypical.toLocaleString('en-US')}, {osm2024.tenThousand} at $
              {osm2024.proposedPenaltyAlso.toLocaleString('en-US')}).{' '}
              <a href={osm2024.sourceUrl} className="text-primary hover:underline">
                Official release
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <strong>2023.</strong> Official enforcement-highlight count of {snap.osm.years['2023'].novs}{' '}
              NOVs. No acquired machine-readable respondent name table.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <strong>2015.</strong> Official sting release describing approximately{' '}
              {snap.osm.years['2015'].citedRespondents} cited respondents, with{' '}
              {snap.osm.years['2015'].parsedStructuredRows} structured rows parsed.
            </li>
          </ul>
        </section>

        <section id="enforcement-inventory" aria-labelledby="inventory-heading">
          <h2 id="inventory-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Public enforcement source inventory
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official source-level enforcement record. Profile identity is not confirmed unless
            separately linked. These rows are not company profiles and are not a ranking.
          </p>
          <h3 className="mt-6 text-base font-semibold">2025 respondent table</h3>
          <EnforcementTable rows={rows2025} />
          <h3 className="mt-8 text-base font-semibold">2024 respondent table</h3>
          <EnforcementTable rows={rows2024} />
        </section>

        <section id="final-order" aria-labelledby="final-heading">
          <h2 id="final-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Final disposition vs allegation
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Allegation / NOV
              </p>
              <p className="mt-2">
                Operation Safe Move tables above are Notices of Violation announced in official
                releases. They are not final orders and not paid-fine records.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Final disposition
              </p>
              <p className="mt-2">
                <strong>{snap.finalOrder.caption}</strong> — {snap.finalOrder.respondents.join(' and ')}.
                File date {snap.finalOrder.fileDate}. NOV {snap.finalOrder.novNumber} dated{' '}
                {snap.finalOrder.novDate}. Source-event grain only; name-only identity is not attached
                to a company profile.{' '}
                <a href={snap.finalOrder.sourceUrl} className="text-primary hover:underline">
                  Official PDF
                </a>
                .
              </p>
            </article>
          </div>
        </section>

        <section id="other-enforcement" aria-labelledby="ocp-heading">
          <h2 id="ocp-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Other DCA / OCP enforcement
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Broader filings index coverage: <strong>PARTIAL_SOURCE_COVERAGE</strong>. The acquired
            corpus is not every New Jersey moving action. SharePoint index access was blocked; one
            deterministic final-order PDF was acquired.
          </p>
        </section>

        <section id="complaints" aria-labelledby="complaints-heading">
          <h2 id="complaints-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Complaint history
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage: <strong>{snap.complaints.coverage}</strong>. Complaint history may be reviewed
            through license verification. No complete machine-readable export was acquired.{' '}
            {snap.complaints.caveat} There is no complaint score and no complaint ranking.{' '}
            <a href={snap.complaints.url} className="text-primary hover:underline">
              Official verification
            </a>
            .
          </p>
        </section>

        <section id="tariffs" aria-labelledby="tariffs-heading">
          <h2 id="tariffs-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Tariffs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage: <strong>{snap.tariffs.coverage}</strong>. New Jersey intrastate movers operate
            under state tariff and rate rules. Tariff evidence is rate/rule evidence. It is not a
            quality score. A filed rate is not automatically the final invoice for a specific move.
            MoveTrustHub does not publish cheapest or most expensive movers.
          </p>
        </section>

        <section id="insurance" aria-labelledby="insurance-heading">
          <h2 id="insurance-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Insurance / financial responsibility
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official licensure framework in the acquired PMW material includes{' '}
            {snap.insurance.framework.join(', ')}. Coverage of current certificates:{' '}
            <strong>{snap.insurance.coverage}</strong>. {snap.insurance.caveat} This snapshot does
            not invent policy numbers or expiration dates.
          </p>
        </section>

        <section id="warehouse" aria-labelledby="warehouse-heading">
          <h2 id="warehouse-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Warehouse locations / authority
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            PW-only is warehouse authority, not mover authority. PC is combined authority where the
            official definition supports it. A warehouse location is not automatically a mover
            headquarters. This page does not create warehouse profile pages from uncertain source
            data.
          </p>
        </section>

        <section id="sources" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Public source inventory
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="mb-2 text-left text-xs text-muted-foreground">
                Coverage, grain, and consumer meaning. Unknown stays unknown.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-3">
                    Source
                  </th>
                  <th scope="col" className="py-2 pr-3">
                    Coverage
                  </th>
                  <th scope="col" className="py-2 pr-3">
                    As-of
                  </th>
                  <th scope="col" className="py-2">
                    Consumer meaning
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['NJ Public Movers & Warehousemen regulator', 'ACQUIRED_CURRENT_SNAPSHOT (classes only)', snap.asOf, 'Official PM/PW/PC rules — not a roster count'],
                  ['RGB verification portal', snap.authority.verificationCoverage, snap.asOf, 'Can verify a specific record; search absence is not unlicensed'],
                  ['Operation Safe Move', snap.osm.coverage, `${osm2024.releaseDate} / ${osm2025.releaseDate}`, 'NOV tables are allegations, not final orders'],
                  ['DCA/OCP enforcement', snap.finalOrder.coverage, snap.finalOrder.fileDate, 'Partial filings; one final-order PDF acquired'],
                  ['Complaint-history search', snap.complaints.coverage, snap.asOf, 'Complaint ≠ violation; missing count ≠ zero'],
                  ['Tariff access', snap.tariffs.coverage, snap.asOf, 'Rate/rule evidence, not a price ranking'],
                  ['Insurance / financial responsibility', snap.insurance.coverage, snap.asOf, 'License ≠ confirmed current insurance here'],
                  ['FMCSA interstate data', snap.federal.coverage, 'live directory when available', snap.federal.grain],
                  ['Records-request status', 'SOURCE_AVAILABLE_BY_REQUEST', snap.asOf, 'Statewide PM/PW/PC file requested, not scraped'],
                ].map(([source, coverage, asOf, meaning]) => (
                  <tr key={source} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-3 font-medium">
                      {source}
                    </th>
                    <td className="py-3 pr-3">{coverage}</td>
                    <td className="py-3 pr-3">{asOf}</td>
                    <td className="py-3">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="gaps" aria-labelledby="gaps-heading">
          <h2 id="gaps-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            What we don&apos;t yet know
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {snap.gaps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Labels used: Unknown / request-only / search-only / partial coverage. Missing evidence is
            never converted to zero.
          </p>
        </section>

        <section id="monitoring" aria-labelledby="monitoring-heading">
          <h2 id="monitoring-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Current snapshot
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {snap.monitoring.currentUpdate} Future monitoring may cover new NOVs, final dispositions,
            state license status, and state/federal identity resolution. This page does not generate
            historical alerts.
          </p>
        </section>
      </div>
    </main>
  );
}

function EnforcementTable({
  rows,
}: {
  rows: ReadonlyArray<NjMoveIntelligencePayload['snapshot']['osm']['rows'][number]>;
}) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <caption className="mb-2 text-left text-xs text-muted-foreground">
          Official source-level enforcement record. Profile identity not confirmed.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2 pr-3">
              Respondent
            </th>
            <th scope="col" className="py-2 pr-3">
              City
            </th>
            <th scope="col" className="py-2 pr-3">
              Year
            </th>
            <th scope="col" className="py-2 pr-3">
              Action
            </th>
            <th scope="col" className="py-2 pr-3">
              NOV status
            </th>
            <th scope="col" className="py-2 pr-3">
              Proposed penalty
            </th>
            <th scope="col" className="py-2">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.year}-${row.respondent}`} className="border-b border-border/70 align-top">
              <th scope="row" className="py-3 pr-3 font-medium">
                {row.respondent}
                <p className="mt-1 text-xs font-normal text-muted-foreground">{row.wording}</p>
              </th>
              <td className="py-3 pr-3">{row.city}</td>
              <td className="py-3 pr-3">{row.year}</td>
              <td className="py-3 pr-3">{row.actionType}</td>
              <td className="py-3 pr-3">{row.novStatus}</td>
              <td className="py-3 pr-3">
                {row.proposedPenalty == null
                  ? 'Not stated'
                  : `$${row.proposedPenalty.toLocaleString('en-US')}`}
              </td>
              <td className="py-3">
                <a href={row.sourceUrl} className="text-primary hover:underline">
                  Official release
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
