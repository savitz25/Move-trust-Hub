import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { NEBRASKA_MOVE_SNAPSHOT as s } from '@/lib/nebraska-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Nebraska Household Goods Mover Licenses | MoveTrustHub',
    description: 'The Nebraska Public Service Commission publishes 42 household-goods mover licenses. A license is not FMCSA authority, and a fee is not current insurance compliance.',
    path: '/nebraska',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function NebraskaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Nebraska household-goods mover licenses', url: `${SITE_URL}/nebraska` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Nebraska research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Nebraska Public Service Commission</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Nebraska household-goods mover licenses</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire household-goods moves wholly inside Nebraska use a Nebraska Public Service Commission license. A license, an application, an insurance requirement, a filed rate, a Commission order, FMCSA interstate authority, and a USDOT number are different records.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Nebraska evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.distinctLicenses} licenses</p><p className="mt-1 text-sm font-medium">{s.listingRows} table rows</p><p className="mt-1 text-xs text-muted-foreground">Distinct ML numbers on the Commission licensee table. A gap in the number series is not a hidden carrier.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">One year</p><p className="mt-1 text-sm font-medium">From the effective date</p><p className="mt-1 text-xs text-muted-foreground">The table prints an effective date. It does not print an expiration date. This page does not calculate one.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Insurance, tariffs, USDOT</p><p className="mt-1 text-xs text-muted-foreground">A $250 fee and the insurance statute are requirements. They are not a current filing for a named carrier.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">The licensee table is the household-goods roster</h2>
      <p>The <Official href={s.licenseesUrl}>Household Goods Movers Licensees</Official> page says licenses are valid for one year from the effective date and that services are provided statewide unless otherwise noted. The table retrieved {s.retrievedAt} has {s.listingRows} rows and {s.distinctLicenses} distinct license numbers. HTTP Last-Modified {s.httpLastModified}. A printed city is the location column, not a city research route. Omaha and Lincoln are not published as local pages.</p>
      <p>An application is not a license. The <Official href={s.applicationUrl}>application packet</Official> and the <Official href={s.renewalUrl}>renewal application</Official> are filing documents. The renewal form says a license that is not renewed before expiration expires, and the mover is no longer authorized until a new application is approved. The non-refundable license fee is ${s.licenseFeeUsd.toLocaleString('en-US')}. That fee is not current operating authority and not proof of insurance.</p>
      <h2 className="text-lg font-semibold text-foreground">Insurance, rates, orders, and federal records stay separate</h2>
      <p>The Commission says a license may be suspended or revoked after notice and hearing for failure to comply with Neb. Rev. Stat. section 75-307, insurance, a Commission rule, or a lawful order. That sentence is an insurance requirement. No provider-level insurance observation was on the licensee table. Provider insurance status is NOT_ACQUIRED.</p>
      <p>As of July 1, 2021, the Commission no longer sets household-goods rates. Carriers file their own rates in writing when they change. Those carrier filings were NOT_ACQUIRED. A rate requirement is not a quote.</p>
      <p>A complete order corpus was NOT_ACQUIRED. One published action, Order {s.singlePublishedOrder.docket} dated {s.singlePublishedOrder.dated}, assessed a civil penalty for intrastate household-goods service without a Nebraska license. That order was not joined to a row on this licensee table. A complaint is not a finding, and one order is not every Commission action.</p>
      <p>The licensee table does not print a USDOT or MC number. No exact federal bridge was made. FMCSA interstate authority is not this Nebraska license. Missing bridges are not zero.</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>New canonical organizations: {s.newCanonicalOrganizations}. Graph writes: {s.graphWrites}. Claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>Names are printed as the Commission table prints them, including abbreviated legal names.</li>
        <li>This page publishes no city or county route.</li>
      </ul>
    </section>

    <section className="mt-8 overflow-x-auto">
      <h2 className="text-lg font-semibold">Licensee table</h2>
      <table className="mt-3 w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
            <th className="py-2 pr-3 font-semibold">License</th>
            <th className="py-2 pr-3 font-semibold">Name</th>
            <th className="py-2 pr-3 font-semibold">DBA</th>
            <th className="py-2 pr-3 font-semibold">Location</th>
            <th className="py-2 font-semibold">Effective date</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.map((row) => <tr key={row.license} className="border-b border-border/70">
            <td className="py-2 pr-3 font-medium">{row.license}</td>
            <td className="py-2 pr-3">{row.name}</td>
            <td className="py-2 pr-3">{row.dba || '—'}</td>
            <td className="py-2 pr-3">{row.location || '—'}</td>
            <td className="py-2">{row.effectiveDate}</td>
          </tr>)}
        </tbody>
      </table>
    </section>
  <StateCountyLinks stateSlug="nebraska" stateName="Nebraska" />
    </main>;
}
