import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { INDIANA_MOVE_SNAPSHOT as s } from '@/lib/indiana-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Indiana Household-Goods Operating Authority | MoveTrustHub',
    description: 'Indiana DOR requires intrastate household-goods carriers to obtain a Certificate of Public Convenience and Necessity. Check authority, renewal, Form E, tariffs and public-data limits.',
    path: '/indiana',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function IndianaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Indiana household-goods operating authority', url: `${SITE_URL}/indiana` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Indiana research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Indiana DOR / Motor Carrier Services</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Indiana household-goods operating authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire carriers moving household goods between points in Indiana need a DOR-issued Certificate of Public Convenience and Necessity. Indiana operating authority, USDOT identity and federal MC authority are separate credentials.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Indiana evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Indiana operating authority</p><p className="mt-1 text-sm font-medium">Verify with DOR Motor Carrier Services</p><p className="mt-1 text-xs text-muted-foreground">Ask about the carrier's certificate, authority type and current renewal status.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide household-goods authority roster</p><p className="mt-1 text-xs text-muted-foreground">No defensible public roster or mover count was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">November 30</p><p className="mt-1 text-sm font-medium">Permanent authority renewal deadline</p><p className="mt-1 text-xs text-muted-foreground">An old certificate alone does not prove current authority.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check the Indiana certificate</h2>
      <p><Official href={s.authorityUrl}>Indiana DOR Motor Carrier Services</Official> says an approved applicant receives Permanent Indiana Operating Authority and, after required insurance and tariff filings, a Certificate of Public Convenience and Necessity. Permanent authority must be renewed annually by November 30. Contact Motor Carrier Services at 317-615-7200, option 3 then option 1, or passengerhhg@dor.in.gov to ask about a particular carrier. DOR also offers a <Official href={s.recordsUrl}>public-record request path</Official>. These are verification and request capabilities, not a bulk public roster or a live status feed.</p>
      <p>DOR distinguishes permanent, temporary (up to 180 days) and emergency temporary (up to 30 days) authority. Its <Official href={s.formsUrl}>authority application forms</Official> and carrier guide also distinguish common carriers serving the public from contract carriers serving limited shippers. Certificate, permit and temporary-authority evidence must retain their source labels; the categories are not one generic license or a combined mover census.</p>

      <h2 className="text-lg font-semibold text-foreground">Insurance and tariffs</h2>
      <p>After approval, the insurer must file <Official href={s.authorityUrl}>Form E proof of insurance</Official> with DOR. The carrier must also submit its household-goods tariff before the final certificate is issued. DOR says it keeps tariffs on file and makes them available to the public on request; tariff updates need an effective date. <Official href={s.tariffGuidanceUrl}>DOR tariff guidance</Official> explains the filing. No bulk tariff corpus or provider-level current insurance status was acquired.</p>
      <p><Official href={s.faqUrl}>DOR separates intrastate and interstate requirements</Official>. Indiana authority covers the specified in-state service; interstate for-hire operation requires FMCSA authority. A USDOT or federal MC number does not establish current Indiana authority, and an Indiana certificate does not substitute for federal authority. No exact state-to-federal identifier bridges were available from an Indiana authority roster.</p>

      <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
      <p>The <Official href={s.attorneyGeneralComplaintUrl}>Indiana Attorney General accepts consumer complaints</Official> about businesses, including concerns arising from an intrastate move. Ask DOR Motor Carrier Services about Indiana authority questions. <Official href={s.interstateComplaintUrl}>FMCSA has a separate interstate mover complaint path</Official>. No provider-level Indiana mover complaint rows or outcomes were acquired; a complaint is not an enforcement finding.</p>
      <p>DOR can dismiss an approved application if its required insurance and tariff filings do not arrive within 60 days, but no clean public 2022-2026 household-goods suspension, revocation or enforcement-order corpus was acquired. Enforcement capability is PARTIAL. No provider-level adverse rows or name-only attachments were made.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Authority rows, certificate numbers, current statuses, renewals and distinct household-goods authorities: NOT_ACQUIRED. No mover count is shown.</li>
        <li>Rows with printed USDOT or MC, exact federal bridges and unmatched state rows: NOT_ACQUIRED. No combined Indiana and federal total.</li>
        <li>Form E filing requirement and tariff availability on request: KNOWN. Provider insurance status and tariff corpus: NOT_ACQUIRED.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}; graph writes: {s.graphWrites}; claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>DOR authority, FAQ and public-record guidance retrieved {s.retrievedAt}; permanent-authority renewal is due each November 30; tariff effective dates are carrier-specific; page data generated {s.generatedAt}. No roster/status, provider-insurance or enforcement as-of date was available.</li>
        <li>Indianapolis, Fort Wayne, Evansville and South Bend are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  </main>;
}
