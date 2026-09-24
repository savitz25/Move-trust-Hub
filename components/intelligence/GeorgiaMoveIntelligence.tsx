import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { GeorgiaMoveSnapshot } from '@/lib/georgia-intelligence/snapshot';
import { GA_DPS_GUIDE, GA_DPS_LIST, GA_DPS_RULES, GA_DPS_TARIFF } from '@/lib/georgia-intelligence/publication';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Official({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="font-medium underline underline-offset-2" rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

export function GeorgiaMoveIntelligence({ payload }: { payload: { snapshot: GeorgiaMoveSnapshot } }) {
  const s = payload.snapshot;
  const roster = s.current_hhg_roster;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            url: `${SITE_URL}/georgia`,
            description: 'Georgia DPS household-goods certificate research. Not a ranking.',
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Georgia research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Georgia · household-goods moving research</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{s.publication.h1}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Georgia DPS regulates household-goods moves that stay inside Georgia. Interstate authority remains FMCSA.
          A Georgia certificate is not a USDOT number. This is not a ranking or a Trust Score.
        </p>
      </header>
      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.GA_DPS_HHG_DISTINCT_MCA.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm font-medium">Distinct Georgia MCA numbers</p>
          <p className="mt-1 text-xs text-muted-foreground">
            On the DPS licensed household-goods movers list. Not an Active/Inactive column. Not FMCSA interstate movers.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.GA_DPS_HHG_LISTING_ROWS.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm font-medium">Licensed-list location rows</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Some certificates appear at more than one address. {roster.GA_DPS_HHG_ROWS_MISSING_MCA} rows have no MCA number.
            Exact USDOT joins: {roster.GA_DPS_HHG_EXACT_USDOT_JOINS}.
          </p>
        </div>
      </section>
      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Intrastate authority</h2>
        <p>
          The <Official href={GA_DPS_LIST} label="DPS Motor Vehicle Compliance movers list" /> is the licensed household-goods
          roster. The source does not print a revision date, so retrieval on {s.retrievedAt} is not an effective date.
          Listing means the carrier was on that licensed list. It does not prove a separate enforcement outcome, and it
          does not prove FMCSA interstate authority. No USDOT was printed, so none were attached by name.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Maximum Rate Tariff No. 7</h2>
        <p>
          Georgia DPS Maximum Rate Tariff No. 7 applies to intrastate household-goods moves under DPS jurisdiction.
          The Regulatory Compliance portal states the Board of Public Safety approved it on January 5, 2026, and that it
          was effective January 13, 2026. It is a maximum-rate ceiling, not a price quote and not an interstate tariff.{' '}
          <Official href={GA_DPS_TARIFF} label="Tariff No. 7" />. Rules:{' '}
          <Official href={GA_DPS_RULES} label="DPS Rule 570-38-3" />. Guidance:{' '}
          <Official href={GA_DPS_GUIDE} label="Household goods page" />.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Complaints</h2>
        <p>
          DPS publishes a household-goods complaint form. A public bulk disposition or enforcement dataset was not
          acquired. Complaint intake is not zero complaints, and it is not a mover census.
        </p>
        <p>No Atlanta or county moving-intelligence page is part of this statewide record. Snapshot {s.version}.</p>
      </section>
    </main>
  );
}
