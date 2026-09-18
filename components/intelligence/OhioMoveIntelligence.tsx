import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { OhioMoveIntelligencePayload } from '@/lib/ohio-intelligence/load';
import { OH_PUCO_DIS, OH_PUCO_HOME, OH_PUCO_RULES, OH_PUCO_TARIFF_FOLDER } from '@/lib/ohio-intelligence/publication';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Official({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="font-medium underline underline-offset-2" rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

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

export function OhioMoveIntelligence({ payload }: { payload: OhioMoveIntelligencePayload }) {
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
              'PUCO household-goods certificates, carrier-specific tariffs, and consumer rules. Not a ranking.',
            url: `${SITE_URL}/ohio`,
            about: 'Ohio household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Ohio research', item: `${SITE_URL}/ohio` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Ohio research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ohio · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Ohio Moving &amp; Household Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          The Public Utilities Commission of Ohio regulates <strong>intrastate</strong> household-goods carriers. The
          state authority identity is a PUCO household-goods certificate, advertised as <strong>PUCO No. ______</strong>.
          A PUCO certificate is not a USDOT number and not an MC number. PUCO intrastate authority is not FMCSA
          interstate authority. Each carrier files its own tariff. Ohio does not have North Carolina&apos;s one statewide
          Maximum Rate Tariff. A tariff is not a quote. Search-only is not zero. This page does not rank movers and
          does not publish a Trust Score.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          No Columbus, Cleveland, Cincinnati, Toledo, Dayton, or Akron household-goods intelligence pages are published
          from this statewide page.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current PUCO HHG roster
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">Search only</dd>
            <p className="mt-1 text-xs text-muted-foreground">OPEN_SEARCH_ONLY. Unknown is not zero movers.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Native identifier
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">PUCO No.</dd>
            <p className="mt-1 text-xs text-muted-foreground">Source-native displays may include -HG. Not USDOT. Not MC.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Exact USDOT / MC bridges
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">0</dd>
            <p className="mt-1 text-xs text-muted-foreground">No official PUCO bulk crosswalk. Name-only is unsafe.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Tariff document census
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">Search only</dd>
            <p className="mt-1 text-xs text-muted-foreground">Public folder known. Complete index not acquired.</p>
          </div>
        </dl>
        <Trace
          source="Public Utilities Commission of Ohio"
          date="Search-only; sourceAsOf not invented from retrieval"
          grain="official certificate search, not a bulk roster row"
          coverage="OPEN_SEARCH_ONLY for current household-goods certificates"
          calculation="No current-certificate count is published because no official bulk roster was acquired."
          caveat="Search-only is not zero. A PUCO number is not USDOT or MC. A carrier tariff is not a statewide Maximum Rate Tariff."
        />
      </header>

      <section className="mt-10" aria-labelledby="roster-heading">
        <h2 id="roster-heading" className="text-lg font-semibold">
          PUCO household-goods certificate roster
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Current PUCO household-goods certificate coverage is <strong>OPEN_SEARCH_ONLY</strong>. No complete public
          current roster, CSV, Excel export, or paging API was acquired. Motor Carrier Registration is a login system
          searched by USDOT, not a public HHG census. Search-only is not zero movers. Household-goods carriers are not
          generic trucking, freight, interstate movers, or brokers. Verify on{' '}
          <Official href={OH_PUCO_HOME} label="PUCO" />. Rules:{' '}
          <Official href={OH_PUCO_RULES} label="OAC Chapter 4901:2-19" />.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Source-native displays observed in public tariff documents include numeric IDs, <code>-HG</code> suffixes, and
          spaced H markers. Do not strip <code>-HG</code> blindly. Do not treat a PUCO number as a USDOT or MC number.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="tariff-heading">
        <h2 id="tariff-heading" className="text-lg font-semibold">
          Carrier-specific tariffs
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Each household-goods carrier must establish and maintain its own tariff filed with PUCO. One carrier&apos;s
          tariff is not another carrier&apos;s tariff. Tariff rates are not a consumer quote. Tariff existence is not
          current authority. A historic tariff is not a current rate. Ohio does not publish one statewide maximum moving
          rate table. Public tariff PDFs live in PUCO docketing folders (
          <Official href={OH_PUCO_TARIFF_FOLDER} label="Household Goods Carriers tariff folder" />
          ). A complete current/latest tariff index was not acquired. An Ohio Association of Movers agent tariff lists
          participating carriers — that is not the complete PUCO certificate census.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="consumer-heading">
        <h2 id="consumer-heading" className="text-lg font-semibold">
          Estimates, bill of lading, liability, and claims
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Ohio rules support nonbinding, binding, and guaranteed-not-to-exceed estimates. That is statewide regulatory
          context, not proof that a named carrier offers binding estimates. Bills of lading must include the
          carrier&apos;s certificate number. Do not label a carrier compliant without exact evidence.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Default liability is replacement value unless the consumer elects a disclosed limitation. The required
          liability framework is not active insurance proof. Consumers have a minimum of 60 days from the date of the
          move to file a damage claim. The carrier must acknowledge within 15 days and respond within 30 days. A
          consumer damage claim is not a PUCO regulatory complaint and not an enforcement matter.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="insurance-heading">
        <h2 id="insurance-heading" className="text-lg font-semibold">
          Insurance
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Form E (liability) and Form H (household-goods cargo) are filed into the Motor Carrier Registration system.
          Current carrier-specific insurance bulk evidence was not acquired. Requirement or verification path known is
          not proof every carrier is insured.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="docket-heading">
        <h2 id="docket-heading" className="text-lg font-semibold">
          Dockets, complaints, and enforcement
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          PUCO DIS is the public case system (
          <Official href={OH_PUCO_DIS} label="Docketing Information System" />
          ). Transportation cases are not an HHG adverse census. A docket is not a complaint. An application is not a
          violation. A tariff filing is not enforcement. An order is not automatically adverse. Complaint intake is
          available at 1-800-686-7826; bulk complaint rows were not acquired. Missing bulk is not zero complaints.
          Unauthorized-mover blacklists from news, BBB, or reviews are not used.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="federal-heading">
        <h2 id="federal-heading" className="text-lg font-semibold">
          PUCO / FMCSA firewall
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Interstate household-goods work uses the existing MoveTrustHub FMCSA architecture. A PUCO certificate does not
          authorize interstate HHG moves by itself. Exact PUCO→USDOT and PUCO→MC bridges in this snapshot: 0. No
          name-only merges.
        </p>
      </section>
    </main>
  );
}
