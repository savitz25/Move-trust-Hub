import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { MassachusettsMoveSnapshot } from '@/lib/massachusetts-intelligence/snapshot';
import { MA_DPU_COMPLAINT_FORM, MA_DPU_GUIDE, MA_DPU_LIST } from '@/lib/massachusetts-intelligence/publication';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Official({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="font-medium underline underline-offset-2" rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

function ask(q: string) {
  return `/ask?${new URLSearchParams({ q }).toString()}`;
}

export function MassachusettsMoveIntelligence({ payload }: { payload: { snapshot: MassachusettsMoveSnapshot } }) {
  const s = payload.snapshot;
  const roster = s.current_hhg_roster;
  const tariff = s.tariff;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            url: `${SITE_URL}/massachusetts`,
            description: 'Massachusetts DPU regulated household-goods mover research. Not a ranking.',
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Massachusetts research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Massachusetts · household-goods moving research</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{s.publication.h1}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          The Massachusetts Department of Public Utilities (DPU) regulates household-goods moves that stay inside
          Massachusetts. Interstate moves are regulated by FMCSA. A DPU certificate is not a USDOT or MC number. This is
          not a ranking or a Trust Score.
        </p>
      </header>
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.MA_DPU_HHG_DISTINCT_CERTIFICATES.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm font-medium">Distinct DPU certificate numbers</p>
          <p className="mt-1 text-xs text-muted-foreground">
            On the DPU list of regulated household-goods movers. Not an Active/Inactive column. Not FMCSA interstate movers.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.MA_DPU_HHG_LISTING_ROWS.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm font-medium">Company rows on the list</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {roster.MA_DPU_HHG_ROWS_MISSING_CERTIFICATE} row has no certificate number printed. Exact USDOT joins:{' '}
            {roster.MA_DPU_HHG_EXACT_USDOT_JOINS}. Exact MC joins: {roster.MA_DPU_HHG_EXACT_MC_JOINS}.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{tariff.MA_DPU_TARIFF_POSTED_ROWS.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm font-medium">Rows with a posted tariff</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tariff.MA_DPU_TARIFF_PENDING_ROWS} rows show the tariff as pending. A tariff is a filed rate, not a quote.
          </p>
        </div>
      </section>
      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Intrastate authority</h2>
        <p>
          The <Official href={MA_DPU_LIST} label="DPU list of regulated moving companies" /> is published by the
          Transportation Oversight Division. It lists each company&apos;s certificate number, any d/b/a name, city or town,
          state and tariff. The page says it is updated as of June 16, 2026, and this snapshot was retrieved on{' '}
          {s.retrievedAt}. Retrieval is not an authority effective date.
        </p>
        <p>
          Listing means DPU regulates the company for moves within Massachusetts. It does not prove a separate enforcement
          outcome, and it does not prove FMCSA interstate authority. DPU prints no USDOT or MC number, so none were
          attached by name. {roster.MA_DPU_HHG_OUT_OF_STATE_BUSINESS_ADDRESS_ROWS} rows show a business address outside
          Massachusetts; an address is not a service area and not interstate authority.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Filed tariffs are not quotes</h2>
        <p>
          Each regulated mover files its own tariff with DPU. The{' '}
          <Official href={MA_DPU_GUIDE} label="DPU guide to moving within Massachusetts" /> says movers must file their
          rates with DPU and may not charge more or less than the rates on file. That is the rule for the filed rates, not
          a price for your move. The actual charge depends on the move and the estimate. This page links tariffs through
          the official list; it does not parse rate sheets or compare prices. The list prints no tariff effective dates.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Complaints</h2>
        <p>
          DPU accepts written complaints through its{' '}
          <Official href={MA_DPU_COMPLAINT_FORM} label="complaint form" /> (DPU.Transportation@mass.gov, (617) 305-3559). A
          public statewide complaint-disposition or enforcement dataset was not acquired. Complaint intake is not zero
          complaints, and it is not a mover census.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Check a mover</h2>
        <p>
          Search by DPU certificate number, for example{' '}
          <Link href={ask('DPU certificate 32011')} className="font-medium underline underline-offset-2">
            DPU certificate 32011
          </Link>
          . For interstate authority, search the USDOT number instead, for example{' '}
          <Link href={ask('Find USDOT 3244649')} className="font-medium underline underline-offset-2">
            Find USDOT 3244649
          </Link>
          .
        </p>
        <p>No Boston, county or city moving-intelligence page is part of this statewide record. Snapshot {s.version}.</p>
      </section>
    </main>
  );
}
