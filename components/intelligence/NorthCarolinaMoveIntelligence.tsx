import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { NorthCarolinaMoveIntelligencePayload } from '@/lib/north-carolina-intelligence/load';
import {
  NC_NCUC_HHG_LIST,
  NC_NCUC_MOVING_GUIDE,
  NC_NCUC_MRT,
} from '@/lib/north-carolina-intelligence/publication';
import { fmtInt } from '@/lib/north-carolina-intelligence/snapshot';
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

export function NorthCarolinaMoveIntelligence({ payload }: { payload: NorthCarolinaMoveIntelligencePayload }) {
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
              'NCUC Certificate of Exemption C-numbers, T-number identities, monthly household-goods carrier list, and Maximum Rate Tariff. Not a ranking.',
            url: `${SITE_URL}/north-carolina`,
            about: 'North Carolina household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'North Carolina research', item: `${SITE_URL}/north-carolina` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'North Carolina research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          North Carolina · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          North Carolina Moving &amp; Household Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          The North Carolina Utilities Commission regulates <strong>intrastate</strong> household-goods movers. State
          authority is a Certificate of Exemption identified by an NCUC C-number. The T-number is a separate NCUC
          company/docket identity. NCUC authority is not FMCSA interstate authority. A C-number is not a USDOT or MC
          number. The monthly carrier list can lag later cancellations, suspensions, and new certificates. Maximum Rate
          Tariff rates are not quotes. Insurance requirements are not current coverage proof. A docket is not a
          complaint. This page does not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              C-number identities on the September 8, 2026 NCUC carrier-list snapshot
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS)}
            </dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Distinct T-numbers on that list</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.NC_NCUC_DISTINCT_T_NUMBERS)}
            </dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Exact C↔T crosswalks</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.NC_NCUC_EXACT_C_TO_T_CROSSWALKS)}
            </dd>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Temporarily suspended observations</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.NC_NCUC_TEMP_SUSPENDED_OBSERVATIONS)}
            </dd>
          </div>
        </dl>
        <Trace
          source={NC_NCUC_HHG_LIST}
          date={s.clocks.hhg_roster.sourceAsOf}
          grain="Official NCUC Certificate of Exemption carrier-list row (C-number)"
          coverage="Statewide monthly list of certificated household-goods carriers, not a live authority census"
          calculation={`${fmtInt(s.current_hhg_roster.NC_NCUC_HHG_LIST_ROWS)} list rows / ${fmtInt(s.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS)} distinct C-numbers. Header announces ${fmtInt(s.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL)} certified carriers.`}
          caveat="Monthly revision is not real-time status. Listed is not necessarily authorized today. Suspended rows remain physically present. Do not add C-numbers to T-numbers or to FMCSA movers."
        />
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">C-number is not a T-number</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          C-number is the NCUC household-goods Certificate of Exemption. T-number is the NCUC company/docket identity
          (Co. # / Docket Number on the annual-report form). This snapshot has{' '}
          {fmtInt(s.current_hhg_roster.NC_NCUC_EXACT_C_TO_T_CROSSWALKS)} source-native C↔T pairings and{' '}
          {fmtInt(s.current_hhg_roster.NC_NCUC_ROWS_MISSING_T)} list rows missing a T-number. Do not infer the missing
          pairings by business name.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Monthly list is not live status</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          NCUC consumer guidance says the list is updated monthly. Later cancellations, suspensions, and newly issued
          certificates may not appear until the next update. This freeze is a MONTHLY_LIST_SNAPSHOT, not a real-time
          authority census. {fmtInt(s.current_hhg_roster.NC_NCUC_TEMP_SUSPENDED_OBSERVATIONS)} rows still say the
          certificate is temporarily suspended and not currently authorized. Confirm current status with NCUC/Public
          Staff at {s.regulator.status_verify_phone}. See{' '}
          <a className="underline" href={NC_NCUC_MOVING_GUIDE} rel="noreferrer" target="_blank">
            Moving 101
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Maximum Rate Tariff is not a quote</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {s.tariff.NC_NCUC_MRT_VERSION} was issued {s.tariff.NC_NCUC_MRT_ISSUED_DATE} and effective{' '}
          {s.tariff.NC_NCUC_MRT_EFFECTIVE_DATE}. It sets maximum rates, estimate rules, bill-of-lading requirements,
          valuation choices, and required consumer forms for regulated intrastate household-goods moves. The maximum is
          not the mover&apos;s quote. A lower negotiated rate is not special regulatory status. TrustHub does not rank
          movers on price. Read the tariff at{' '}
          <a className="underline" href={NC_NCUC_MRT} rel="noreferrer" target="_blank">
            NCUC Maximum Rate Tariff
          </a>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Insurance requirement is not current coverage</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The January 2026 HHG annual-report form requires General Liability {s.insurance.NC_NCUC_GENERAL_LIABILITY_REQUIREMENT}
          ; Cargo {s.insurance.NC_NCUC_CARGO_INSURANCE_REQUIREMENT}; Vehicle Liability{' '}
          {s.insurance.NC_NCUC_VEHICLE_LIABILITY_REQUIREMENT}. Warehouse insurance is required when the carrier provides
          storage. Current carrier-specific insurance bulk was not acquired ({s.insurance.coverage}). Do not treat every
          listed carrier as insured=true.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Dockets are not findings</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The T-number can support exact docket research, but the Docket Portal was not harvested ({s.dockets.coverage}
          ). A docket is not a complaint. An annual report is not enforcement. An order is not automatically adverse. A
          Consumer Statement is a filing in a proceeding, not a complaint census. Household-goods complaints are{' '}
          {s.complaints.NC_NCUC_HHG_COMPLAINT_COVERAGE}. Missing bulk is not zero complaints.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">State authority is not federal authority</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          NCUC C-number is not a USDOT number. T-number is not an MC number. Exact NCUC→USDOT crosswalks:{' '}
          {fmtInt(s.federal.EXACT_NC_NCUC_TO_USDOT_CROSSWALKS)}. Exact NCUC→MC crosswalks:{' '}
          {fmtInt(s.federal.EXACT_NC_NCUC_TO_MC_CROSSWALKS)}. An NC address on the NCUC record is not federal
          headquarters. An FMCSA carrier with North Carolina headquarters is not automatically NCUC-certificated. Do
          not add the cohorts.
        </p>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Snapshot {s.version} · list revision {s.clocks.hhg_roster.sourceAsOf} · retrieved {s.clocks.retrievedAt} · no
        ranking · no star-rating markup
      </p>
    </main>
  );
}
