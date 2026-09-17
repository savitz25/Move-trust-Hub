import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { PennsylvaniaMoveIntelligencePayload } from '@/lib/pennsylvania-intelligence/load';
import { PA_PUC_COMPLAINTS, PA_PUC_HHG_LIST, PA_PUC_INSURANCE } from '@/lib/pennsylvania-intelligence/publication';
import { fmtInt } from '@/lib/pennsylvania-intelligence/snapshot';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Trace({
  source,
  date,
  grain,
  coverage,
  calculation,
  caveat,
}: {
  source: string;
  date: string;
  grain: string;
  coverage: string;
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
        <li>Calculation: {calculation}</li>
        <li>Caveat: {caveat}</li>
      </ul>
    </details>
  );
}

export function PennsylvaniaMoveIntelligence({ payload }: { payload: PennsylvaniaMoveIntelligencePayload }) {
  const s = payload.snapshot;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            description:
              'Pennsylvania PUC active Household Goods carriers, Utility Code versus Carrier ID, insurance filings, and docket metadata. Not a ranking.',
            url: `${SITE_URL}/pennsylvania`,
            about: 'Pennsylvania household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Pennsylvania research', item: `${SITE_URL}/pennsylvania` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Pennsylvania research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Pennsylvania · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Pennsylvania Moving &amp; Household Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          The Pennsylvania Public Utility Commission regulates <strong>intrastate</strong> Household Goods carriers
          that move between points in Pennsylvania. Active PUC Household Goods carriers are not brokers. A Utility
          Code is not automatically a Carrier ID. Pennsylvania state authority is not FMCSA interstate authority. An
          office address is not approved service territory. Insurance evidence is separate from authority. A docketed
          case is not an adverse finding. Interstate movers must be researched through federal FMCSA evidence. This
          page does not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Active HHG operator list rows</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{fmtInt(s.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS)}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Distinct Utility Codes</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES)}
            </dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Active HHG authority rows</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.authorities.PA_PUC_HHG_ACTIVE_AUTHORITY_ROWS)}
            </dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">HHG broker roster</dt>
            <dd className="mt-1 text-2xl font-semibold">Unknown</dd>
          </div>
        </dl>
        <Trace
          source={PA_PUC_HHG_LIST}
          date={s.clocks.retrievedAt}
          grain="Official active Household Goods Operators List row (Utility Code)"
          coverage="Statewide PA PUC list of active Household Goods Carriers, not brokers"
          calculation={`${fmtInt(s.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS)} list rows collapse to ${fmtInt(s.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES)} distinct Utility Codes`}
          caveat="List rows are not unique companies. Utility Status is not automatically current Household Goods authority. Retrieval is not sourceAsOf."
        />
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Utility Code is not automatically Carrier ID</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Utility Code identifies the PUC utility entity. Carrier ID, often an A-number, and Application Number on an
          authority row identify operating authority. In this snapshot they differ on{' '}
          {fmtInt(s.identity.utilities_where_carrier_id_differs)} utilities. Do not call either “license number.” PUC
          consumer guidance says movers must display their PUC number in advertising; taxi marking uses PUC A-#. This
          page keeps both identifiers.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Carriers are not brokers</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The operators list is active Household Goods Carriers. Broker of Household Goods in Use is a separate PUC
          authority. No official current broker universe was acquired ({s.brokers.PA_PUC_HHG_BROKER_ROSTER_STATUS}).
          Search-only is not zero brokers. Truck authority rows on these utilities are not extra movers.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Insurance evidence is not authority</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Utility-detail insurance tables were acquired: {fmtInt(s.insurance.PA_PUC_INSURANCE_ROWS)} rows. Current
          cargo observations (Form H Received, no past lapse): {fmtInt(s.insurance.PA_PUC_CURRENT_CARGO_OBSERVATIONS)}.
          Current liability observations (Form E Received, no past lapse):{' '}
          {fmtInt(s.insurance.PA_PUC_CURRENT_LIABILITY_OBSERVATIONS)}. Form K is cancellation. A historical lapse row is
          not license status. Active authority is not automatically current insurance. Confirm on{' '}
          <a className="underline" href={PA_PUC_INSURANCE} rel="noreferrer" target="_blank">
            PUC insurance guidance
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Dockets are not findings</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Bounded docket metadata on active HHG utilities: {fmtInt(s.dockets.PA_PUC_DOCKET_ROWS)} rows /{' '}
          {fmtInt(s.dockets.PA_PUC_DISTINCT_DOCKET_NUMBERS)} distinct docket numbers. A docketed case is not an adverse
          finding. An application docket is not a complaint. An active case is not a violation. PUC complaint intake is{' '}
          {s.complaints.PA_HHG_COMPLAINTS}; missing bulk is not zero complaints. Enforcement census is{' '}
          {s.enforcement.PA_HHG_ENFORCEMENT}. See{' '}
          <a className="underline" href={PA_PUC_COMPLAINTS} rel="noreferrer" target="_blank">
            PUC complaints
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">State authority is not federal authority</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          PA PUC Household Goods Carrier is not a USDOT number. Carrier ID is not an MC number. Exact PA PUC→USDOT
          crosswalks: {fmtInt(s.federal.EXACT_PA_PUC_TO_USDOT_CROSSWALKS)}. Exact PA PUC→MC crosswalks:{' '}
          {fmtInt(s.federal.EXACT_PA_PUC_TO_MC_CROSSWALKS)}. Recorded Pennsylvania headquarters is not PUC authority.
          Interstate moves crossing state lines are FMCSA, not this roster.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Consumer moving rules are jurisdiction rules</h2>
        <ul className="max-w-3xl list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Written estimate required; tariff basis; hourly if 40 miles or less; weight/mileage if over 40 miles.</li>
          <li>{s.consumer_rules.bill_over_estimate_protection}</li>
          <li>Basic cargo protection: {s.consumer_rules.basic_cargo_protection}.</li>
          <li>Information for Shippers form before signing. These rules are not mover quality scores.</li>
        </ul>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Snapshot {s.version} · retrieved {s.clocks.retrievedAt} · sourceAsOf unknown · no ranking · no star-rating markup
      </p>
    </main>
  );
}
