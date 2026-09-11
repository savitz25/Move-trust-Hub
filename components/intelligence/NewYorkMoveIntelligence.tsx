import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { NewYorkMoveIntelligencePayload } from '@/lib/new-york-intelligence/load';
import { fmtInt } from '@/lib/new-york-intelligence/snapshot';
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

export function NewYorkMoveIntelligence({ payload }: { payload: NewYorkMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const issues = fmtInt(s.bulletin_2026.issues);
  const hhg = fmtInt(s.bulletin_2026.hhgApplicationObservations);
  const cases = fmtInt(s.bulletin_2026.distinctCaseNumbers);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            description:
              'New York State DOT household-goods authority, 2026 Weekly Bulletin applications, and FMCSA interstate overlay. Application is not authorization. Not a ranking.',
            url: `${SITE_URL}/new-york`,
            about: 'New York household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'New York research', item: `${SITE_URL}/new-york` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'New York research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          New York · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          New York Household-Goods Moving Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          New York State DOT licenses intrastate household-goods movers. NYDOT authority is not a USDOT
          number and is not FMCSA interstate authority. A Weekly Bulletin application is not current
          operating authority. This page does not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current NY HHG roster
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">Search only</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              CarCert search is under development. Unknown is not zero.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              2026 bulletin issues
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{issues}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Weekly Bulletin PDFs from 2026-01-07 through 2026-09-09.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              2026 HHG application observations
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{hhg}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Bulletin household-goods entries. Not current authorized movers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Distinct bulletin case numbers
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{cases}</dd>
            <p className="mt-1 text-xs text-muted-foreground">One carrier may appear in more than one issue.</p>
          </div>
        </dl>
        <Trace
          source="NYSDOT Weekly Bulletin of Motor Carrier Applications"
          date="2026-01-07 through 2026-09-09"
          grain="one household-goods application block in a weekly PDF"
          coverage="ACQUIRED_CURRENT_SNAPSHOT for 36 issues; current roster OPEN_SEARCH_ONLY"
          calculation={`${issues} issues; ${hhg} HHG observations; ${cases} distinct Case Numbers.`}
          caveat="Application is not authorization. Bulletin count is not a carrier count. Search-only is not zero."
        />
      </header>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">New York household-goods regulation</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          NYSDOT requires movers operating wholly within New York to have household-goods authority.
          Applications must be published in the Weekly Bulletin for a 30-day protest period. A
          probationary certificate is not a permanent certificate. Property carrier authority is not
          household-goods authority.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.hhg_url}>
            NYSDOT Registration &amp; Licensing
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Current state authorization verification</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Official CarCert currently labels carrier search as under development. Verify with the exact
          carrier name and preferably a NYDOT number. A USDOT number alone does not prove New York
          intrastate household-goods authority. Interstate movers are FMCSA.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.carcert_url}>
            NYSDOT CarCert
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">2026 Weekly Bulletin activity</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {fmtInt(s.bulletin_2026.hhgApplicationObservations)} household-goods application observations
          in {fmtInt(s.bulletin_2026.issues)} issues. Types include New Service{' '}
          {fmtInt(s.bulletin_2026.applicationTypes['New Service'])}, Transfer{' '}
          {fmtInt(s.bulletin_2026.applicationTypes.Transfer)}, and smaller name-change / extension /
          partial-transfer classes. No USDOT, NYDOT, or certificate numbers were printed on those
          blocks. Name-only federal join is unsafe.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.bulletin_url}>
            Weekly Bulletin archive
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Interstate / FMCSA distinction</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A New York headquarters on a federal profile is geography, not NYSDOT authority. Exact
          state-to-federal crosswalks in this ticket: 0. USDOT is not active interstate household-goods
          authority by itself.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Complaints, insurance, and tariffs</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          NYSDOT accepts household-mover complaints; no bulk complaint table was acquired. Complaint is
          not a violation. Current insurance compliance is search-only. Tariff documents are regulatory
          context, not quality, and were not collected as a corpus.
        </p>
      </section>

      <section className="py-10">
        <h2 className="text-xl font-semibold">What these numbers do not mean</h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>There is no combined New York movers total.</li>
          <li>108 bulletin observations are not 108 currently authorized movers.</li>
          <li>Application is not authorization. Probationary is not permanent.</li>
          <li>NYDOT authority is not USDOT. Search-only is not zero.</li>
          <li>New York City is not a separate MoveTrustHub route. No Trust Score. No ranking.</li>
        </ul>
      </section>
    </main>
  );
}
