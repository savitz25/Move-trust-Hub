import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { IllinoisMoveIntelligencePayload } from '@/lib/illinois-intelligence/load';
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

export function IllinoisMoveIntelligence({ payload }: { payload: IllinoisMoveIntelligencePayload }) {
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
              'Illinois Commerce Commission household-goods licenses, ILCC identifiers, and FMCSA interstate overlay. Current ICC roster is official search. Not a ranking.',
            url: `${SITE_URL}/illinois`,
            about: 'Illinois household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Illinois research', item: `${SITE_URL}/illinois` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Illinois research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Illinois · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Illinois Moving Company Research
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          The Illinois Commerce Commission licenses intrastate household-goods movers. An ICC household-goods
          license is not a USDOT number, not MC authority, and not FMCSA interstate operating authority. A
          Public Carrier Certificate is not a household-goods license. This page does not rank movers and does
          not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current Illinois HHG roster
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">Search only</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Official MCIS entity search. Unknown is not zero.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Native identifier
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">ILCC</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Source-native on ICC entity profiles. Not USDOT. Not MC.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Exact USDOT crosswalks
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">0</dd>
            <p className="mt-1 text-xs text-muted-foreground">No bulk ILCC→USDOT table acquired. Name-only is unsafe.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              State complaint observations
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">Search only</dd>
            <p className="mt-1 text-xs text-muted-foreground">Missing bulk complaints is not zero complaints.</p>
          </div>
        </dl>
        <Trace
          source="Illinois Commerce Commission Motor Carrier Information System"
          date="Search-only; sourceAsOf not invented from retrieval"
          grain="official entity-search verification, not a bulk roster row"
          coverage="OPEN_SEARCH_ONLY for current HHG licenses, complaints, insurance-on-file, and enforcement status"
          calculation="No current-authority ID count is published because no official bulk roster was acquired."
          caveat="Search-only is not zero. ILCC is not USDOT. PCC is not household-goods authority."
        />
      </header>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Illinois household-goods authority</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Intrastate for-hire household-goods transportation requires an ICC Household Goods License under{' '}
          {s.regulator.statute} and {s.regulator.rules}. Confirm the current license on Motor Carrier Information
          System Entity Search using the company name or ILCC number. A license row is not a unique company. A
          temporary certificate is not a permanent certificate. Cab cards are not the license.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.hhg_url}>
            ICC Household Goods Movers
          </a>
          {' · '}
          <a className="underline" href={s.regulator.mcis_search_url}>
            Find a licensed household-goods mover
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Other state carrier classes</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Public Carrier Certificates authorize for-hire property other than household goods. Relocation towing
          and warehousing are separate ICC classes. Those universes are not household-goods movers and are not
          summed into one statewide mover/carrier denominator.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.pcc_url}>
            Public Carrier Certificate
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Federal USDOT / FMCSA context</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Interstate household-goods moves use FMCSA operating authority. A USDOT number alone is not active
          interstate household-goods authority. An Illinois headquarters on a federal profile is geography, not
          ICC authority. Exact state-to-USDOT crosswalks in this ticket: 0. Exact state-to-MC crosswalks: 0.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href="/verify-dot">
            Verify DOT
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Exact state↔federal identity linking</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Some MCIS entity pages print a USDOT next to ILCC. That is an official search display, not an acquired
          bulk crosswalk. Name-only matching is unsafe. Name plus address is review-required. Research
          crosswalks are not public profile attachments.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Complaints</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          File Illinois household-goods complaints with ICC Transportation ({s.regulator.complaint_email} /{' '}
          {s.regulator.complaint_phone}). Entity pages may show a complaint-on-file window. No bulk complaint
          table was acquired. A complaint is not a violation and not company quality. Federal complaint
          observations are not a substitute for ICC complaints.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.complaint_url}>
            ICC File a Complaint
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Enforcement / authority status</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Revocation, suspension, and cancellation are source-native ICC statuses. Inactive or cancelled
          Illinois authority is not a criminal conviction. Revoked ICC authority is not FMCSA out-of-service.
          Federal OOS is not Illinois revocation. No combined violations count is published.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Insurance / verification paths</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Licenses are conditioned on insurance on file with the ICC. An insurance filing is not active
          authority. An old filing row is not proof of current insurance. Current insurance compliance is
          official search, not a bulk extract.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">What this evidence means</h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>There is no combined Illinois movers total.</li>
          <li>Search-only is not zero licensed movers.</li>
          <li>ILCC is not USDOT. USDOT is not Illinois intrastate authority.</li>
          <li>Public Carrier Certificate is not a household-goods license.</li>
          <li>Chicago and Cook County are not separate MoveTrustHub intelligence routes.</li>
          <li>No Trust Score. No ranking. No star-rating schema.</li>
        </ul>
      </section>

      <section className="py-10">
        <h2 className="text-xl font-semibold">Coverage / gaps</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Current household-goods licenses, complaint observations, and enforcement rows were not acquired as
          bulk tables. Official verification remains the ICC Motor Carrier Information System. This ticket does
          not start Ask Illinois or local Illinois pages.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.consumer_guide_url}>
            2026 Consumer Guide to Household Goods Movers in Illinois
          </a>
        </p>
      </section>
    </main>
  );
}
