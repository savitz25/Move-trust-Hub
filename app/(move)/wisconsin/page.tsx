import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { WISCONSIN_MOVE_SNAPSHOT as s } from '@/lib/wisconsin-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({ title: 'Wisconsin Intrastate Mover Authority | MoveTrustHub', description: 'WisDOT issues Local Cartage (LC) authority for intrastate for-hire property carriers. Learn how to verify authority, the Form E insurance filing, and the limits of public household-goods data.', path: '/wisconsin' });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function WisconsinMovePage() {
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Wisconsin intrastate motor carrier authority', url: `${SITE_URL}/wisconsin` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Wisconsin research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">WisDOT · Local Cartage authority</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Wisconsin intrastate mover authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Wisconsin Department of Transportation, DMV Motor Carrier Services, issues intrastate for-hire property authority as LC plus an authority number. LC covers more commodities than household goods. LC authority, USDOT identity and federal MC authority are separate.</p>
    </header>
    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Wisconsin evidence summary">
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">LC authority</p><p className="mt-1 text-sm font-medium">WisDOT intrastate property carriers</p><p className="mt-1 text-xs text-muted-foreground">Verify a particular authority and commodity scope with Motor Carrier Services.</p></div>
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide LC roster</p><p className="mt-1 text-xs text-muted-foreground">No clean public bulk roster or carrier search was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Household-goods census</p><p className="mt-1 text-xs text-muted-foreground">An LC authority alone does not identify a household-goods mover.</p></div>
    </section>
    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check Wisconsin authority</h2>
      <p><Official href={s.authorityUrl}>WisDOT Motor Carrier Services</Official> says a carrier transporting property for compensation entirely within Wisconsin needs intrastate operating authority. It issues property authority as an LC certificate and number. Ask the carrier for its LC number, then contact Motor Carrier Services at (608) 266-9900 or irp-ifta@dot.wi.gov to verify the present authority and household-goods commodity scope. This is contact-based verification, not a public roster.</p>
      <p>The <Official href={s.applicationUrl}>MV2843 authority application</Official> asks applicants to list commodities and prints fields for the legal name, USDOT number and Wisconsin LC number. The form shows why all LC carriers cannot be counted as household-goods movers. Its private applicant fields are not published here. For interstate moves, <Official href={s.authorityUrl}>WisDOT points to FMCSA authority</Official>; an LC number does not substitute for federal authority, and USDOT or MC does not establish Wisconsin LC authority.</p>
      <h2 className="text-lg font-semibold text-foreground">Insurance, complaints and enforcement</h2>
      <p><Official href={s.insuranceUrl}>WisDOT requires proof of insurance</Official> before an intrastate for-hire carrier operates. The insurer files a Form E certificate with DMV, and the registered-owner and insurance names must match the authority identity. We did not acquire public provider-level Form E status, so this requirement does not prove a particular carrier is insured.</p>
      <p><Official href={s.intrastateComplaintUrl}>Wisconsin DATCP accepts general consumer complaints</Official> about Wisconsin businesses; this is an intrastate consumer intake path, not a mover-specific public case database. <Official href={s.interstateComplaintUrl}>FMCSA provides a separate interstate mover complaint path</Official>. Provider-level complaint rows and outcomes were NOT_ACQUIRED. A complaint is not a finding.</p>
      <p>WisDOT administers LC authority, but a clean public 2022–2026 LC suspension, revocation or household-goods sanctions corpus was NOT_ACQUIRED. Enforcement capability is PARTIAL; no provider-level enforcement rows or adverse attachments were made.</p>
      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc pl-5"><li>LC roster rows, distinct LC numbers, status labels and dates, and household-goods-specific rows: NOT_ACQUIRED. No LC count or household-goods count is shown.</li><li>Rows with printed USDOT or MC, distinct federal identifiers, exact federal bridges and unmatched state rows: NOT_ACQUIRED. No name-only links or combined state and federal total.</li><li>New canonical organizations: {s.newCanonicalOrganizations}; graph writes: {s.graphWrites}; claim eligibility changes: {s.claimEligibilityChanges}.</li><li>WisDOT authority, insurance and DATCP pages retrieved {s.retrievedAt}; MV2843 form dated {s.applicationFormDate}; page data generated {s.generatedAt}. No roster, individual status, insurance or enforcement as-of date was available. These are separate clocks.</li><li>Milwaukee, Madison, Green Bay and Kenosha are geographic search context only; there are no city intelligence pages or mover rankings.</li></ul>
    </section>
  </main>;
}
