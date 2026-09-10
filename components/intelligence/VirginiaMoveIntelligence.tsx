import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { VirginiaMoveIntelligencePayload } from '@/lib/virginia-intelligence/load';
import { fmtInt } from '@/lib/virginia-intelligence/snapshot';
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

export function VirginiaMoveIntelligence({ payload }: { payload: VirginiaMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const hhg = fmtInt(s.hhg_roster.rows);
  const prop = fmtInt(s.property_roster.rows);
  const clock = s.clocks.authorized_carriers_sourceAsOf ?? 'UNKNOWN — no published listing date';

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            description:
              'Official Virginia DMV Household Goods Carrier certificates and Property Carrier permits. Authority depends on move distance. Interstate authority is FMCSA. Not a ranking or Trust Score.',
            url: `${SITE_URL}/virginia`,
            about: 'Virginia DMV household-goods and property-carrier authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Virginia research', item: `${SITE_URL}/virginia` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Virginia research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Virginia · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Virginia Household-Goods Moving Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Virginia DMV licenses two different state authorities that can matter for a household-goods
          move. A Household Goods Carrier certificate is not a Property Carrier permit. Authority
          depends in part on the intrastate move distance. Interstate moves are FMCSA. This page does
          not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Household Goods Carrier listings
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{hhg}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Current DMV Authorized Motor Carriers rows typed Household goods carrier. Certificates,
              not unique companies.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Property Carrier listings
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{prop}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              All Property Carrier authority listings — not local movers and not household-goods
              movers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current applicant notices
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{fmtInt(s.applications.notice_rows)}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Application notices, not authorized carriers. {s.applications.household_goods_notices}{' '}
              Household Goods notices in the current index.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Listing clock</dt>
            <dd className="mt-1 text-lg font-semibold">{clock}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              retrievedAt {s.clocks.authorized_carriers_retrievedAt}. Retrieval is not sourceAsOf.
            </p>
          </div>
        </dl>
        <Trace
          source={s.regulator.auth_url}
          date={clock}
          grain="authorized-listing row by DMV carrier type"
          coverage={`${s.hhg_roster.pages_traversed} HHG pages and ${s.property_roster.pages_traversed} Property pages`}
          calculation="Filtered official directory traversal. Types are not added together."
          caveat="Authorized Motor Carriers is DMV’s listing term. It is not proof that insurance and bond filings were verified today."
        />
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">How far is your Virginia move?</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Official DMV FAQ: if household goods are transported <strong>further than 30 miles</strong>{' '}
          from where the move started, Household Goods Carrier authority is required. If household
          goods are not transported for more than 30 miles, Property Carrier authority may apply. OA
          460 also says a Property Carrier may transport household goods only when delivery is{' '}
          <strong>less than 31 road-miles</strong> from pickup. Those official wordings are kept
          separate. A carrier that already holds Household Goods authority and transports only
          household goods does not also need Property Carrier authority merely for short moves.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            <strong>Over 30 miles inside Virginia:</strong> research the Household Goods Carrier
            certificate.
          </li>
          <li>
            <strong>Short local Virginia move:</strong> research a Household Goods Carrier certificate{' '}
            <em>or</em> qualifying Property Carrier authority.
          </li>
          <li>
            <strong>Across a state line:</strong> Virginia DMV authority is not a substitute for FMCSA
            interstate operating authority. A USDOT number alone is not proof of active interstate
            household-goods authority.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Household Goods Carrier certificates</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Legal authority document: <strong>certificate</strong>. The public table column may say
          “Permit Number.” That display label is not the legal document type. Identity namespace{' '}
          <code>VA-DMV-HHG:&#123;authorityNumber&#125;</code>. {hhg} listing rows and{' '}
          {fmtInt(s.hhg_roster.distinct_authority_numbers)} distinct displayed numbers.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Property Carrier short-distance authority</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Legal authority document: <strong>permit</strong>. {prop} listing rows. These are all
          Property Carrier authority listings, not a count of moving companies. Do not add this
          number to Household Goods Carrier listings.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">DMV Authorized Motor Carriers research</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Confirm on the official{' '}
          <a className="underline" href={s.regulator.auth_url} rel="noopener noreferrer" target="_blank">
            Authorized Motor Carriers
          </a>{' '}
          listing. A lookup result is not a MoveTrustHub public profile.
        </p>
        <form action="/virginia" method="get" className="mt-4 flex max-w-xl flex-wrap gap-2">
          <input
            name="authority"
            defaultValue={payload.lookup.query}
            placeholder="HHG authority number or name"
            className="min-w-[12rem] flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-md border border-border px-3 py-2 text-sm">
            Look up HHG listing
          </button>
        </form>
        {payload.lookup.hits.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm">
            {payload.lookup.hits.map((hit) => (
              <li key={`${hit.identity}-${hit.name}`} className="rounded-md border border-border px-3 py-2">
                <span className="font-medium">{hit.name}</span>
                {hit.dba ? <span className="text-muted-foreground"> / {hit.dba}</span> : null}
                <div className="text-xs text-muted-foreground">
                  {hit.identity} · {hit.locality} · displayed number {hit.source_displayed_authority_number}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Insurance, bond, tariff, complaints</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Household Goods: {s.insurance_bond.hhg_liability}; {s.insurance_bond.hhg_cargo};{' '}
            {s.insurance_bond.hhg_bond}. Requirement is not carrier-specific public proof. Roster
            presence is not insured=true or bonded=true.
          </li>
          <li>Property Carrier bond requirement: none on current DMV OA 460 guidance. Insurance differs by vehicle.</li>
          <li>
            Tariff is a Household Goods filing requirement, not a consumer quote. No structured public
            tariff repository was acquired.
          </li>
          <li>
            Complaint process is public (OA 411). Bulk complaint data is not acquired. A complaint is
            not a violation.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Applicants, suspension, claims</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Current DMV notices include {fmtInt(s.applications.notice_rows)} application rows (
          {s.applications.household_goods_notices} Household Goods). An applicant is not an authorized
          carrier. A protest is not a finding of unfitness. Denial/suspension/revocation is a process
          page, not a carrier-order corpus — missing is not zero actions. Suspension is not revocation.
          Revocation is not a criminal conviction.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">Coverage gaps</h2>
        <p className="text-sm text-muted-foreground">Missing is not zero. Search-only is not zero.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {s.gaps.SOURCE_NOT_ACQUIRED.map((g) => (
            <li key={g}>SOURCE_NOT_ACQUIRED — {g}</li>
          ))}
          {s.gaps.UNKNOWN.map((g) => (
            <li key={g}>UNKNOWN — {g}</li>
          ))}
        </ul>
      </section>
      <p className="mt-10 text-xs text-muted-foreground">
        Official:{' '}
        <a className="underline" href={s.regulator.hhg_url} rel="noopener noreferrer" target="_blank">
          Household Goods Carrier
        </a>
        . Independent research. You decide.
      </p>
    </main>
  );
}
