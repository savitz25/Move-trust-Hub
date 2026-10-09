import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { MISSISSIPPI_MOVE_SNAPSHOT as s } from '@/lib/mississippi-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Mississippi Household-Goods Certificate Authority | MoveTrustHub',
    description: 'Mississippi intrastate household-goods moves use an MDOT certificate of public convenience and necessity. A statewide certificate roster was not acquired. Insurance minima are filing rules.',
    path: '/mississippi',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function MississippiMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Mississippi household-goods certificate authority', url: `${SITE_URL}/mississippi` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Mississippi research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Mississippi Department of Transportation</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Mississippi household-goods certificate authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire household-goods transportation between points in Mississippi is handled by the Mississippi Department of Transportation motor-carrier function under a certificate of public convenience and necessity, unless an exemption applies. That certificate, a contract-carrier permit, passenger authority, a USDOT number and a federal MC number are different credentials.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Mississippi evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Certificate of public convenience and necessity</p><p className="mt-1 text-sm font-medium">Verify with MDOT Motor Carrier</p><p className="mt-1 text-xs text-muted-foreground">Ask for the household-goods certificate number and whether it is still in effect.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide household-goods roster</p><p className="mt-1 text-xs text-muted-foreground">No current public certificate roster or mover count was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">$5,000 / $10,000 cargo</p><p className="mt-1 text-sm font-medium">Published cargo bands</p><p className="mt-1 text-xs text-muted-foreground">Three tons or less, and more than three tons. A minimum is a filing rule, not proof of current insurance. Passenger limits are separate.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check the MDOT certificate</h2>
      <p><Official href={s.guidelinesUrl}>MDOT household-goods and passenger guidelines</Official> describe how to apply for a certificate of convenience and necessity. The hearing section calls the same credential a certificate of public convenience and necessity. The packet covers household goods and passengers together as an application class. It is not a list of carriers. An application, including the hearing the Commission sets after filing, is not an issued certificate. A contract-carrier permit is a separate authority. Passenger authority is separate. Other property authority is not this packet. Over-dimensional permits are a different MDOT credential.</p>
      <p>The <Official href={s.receiptApplicationUrl}>MSR-1 receipt application</Official> is a blank form for household goods and passenger carriers. It collects a company name, addresses, a $50 new-registration fee, and $10 per vehicle. Renewal and supplement are checkboxes on that form. The certificate-number line is blank office use. The form is not a roster and not a count of certificated carriers. Per-vehicle fees can be waived when the carrier has paid Unified Carrier Registration and supplies a USDOT number and a motor-carrier number so MDOT can verify that payment. That waiver is a fee rule. It is not Mississippi certificate authority, and the blank form contains no USDOT or MC values to join.</p>
      <p>Call MDOT at 601-359-1717, option 2, or toll-free 888-737-0061, option 2. Mail for the motor-carrier section is P.O. Box 1850, Jackson, MS 39215-1850. No current statewide household-goods certificate or permit roster was found in the public MDOT document set retrieved on {s.retrievedAt}. That is a missed bulk download, not a live roster and not a count of zero movers. A public-records request to the motor-carrier section remains open. Disadvantaged-business certification and FMCSA interstate household-goods listings are different records and were not used as a Mississippi certificate census.</p>

      <h2 className="text-lg font-semibold text-foreground">Insurance filing rules</h2>
      <p>The guidelines say insurance requirements must be met before carrier operations begin, and that the printed minimums are the same as 49 C.F.R. Part 387. For this packet they print property (non-hazardous) liability of ${s.propertyLiabilityNonHazardousUsd.toLocaleString('en-US')}. Cargo liability is ${s.cargoThreeTonsOrLessUsd.toLocaleString('en-US')} for loads of three tons or less and ${s.cargoMoreThanThreeTonsUsd.toLocaleString('en-US')} for loads of more than three tons. Those cargo bands are not added together. Passenger limits are a different class: ${s.passengerSixteenOrMoreUsd.toLocaleString('en-US')} for seating of 16 or more and ${s.passengerFifteenOrLessUsd.toLocaleString('en-US')} for seating of 15 or less. Household-goods cargo is not a passenger limit. A filing minimum is not proof that a named carrier is insured today. No provider-level current insurance status was acquired. Applicants not domiciled in Mississippi are also told to file a BOC-3. That process note is not a carrier census.</p>
      <p>No Mississippi household-goods tariff corpus was acquired. Unified Carrier Registration is an interstate registration program. It does not establish a Mississippi certificate. A USDOT or federal MC number does not establish a current MDOT certificate, and an MDOT certificate does not substitute for FMCSA authority on a move that leaves Mississippi.</p>

      <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
      <p>No provider-level Mississippi household-goods complaint rows or outcomes were acquired. <Official href={s.interstateComplaintUrl}>FMCSA has a separate interstate mover complaint path</Official>. A complaint is not a finding. Commission orders and revocation or suspension records were not acquired as a corpus. No provider-level order was attached, including by name. Enforcement capability is PARTIAL.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Household-goods certificate rows, certificate numbers and current statuses: NOT_ACQUIRED. No mover count is shown.</li>
        <li>Contract-carrier permits, passenger authority, other property authority, applications and commission orders stay separate from the certificate roster, which was also not acquired.</li>
        <li>Rows with a printed USDOT or MC number, exact federal bridges and unmatched state rows: NOT_ACQUIRED. No combined Mississippi and federal total.</li>
        <li>Property liability ${s.propertyLiabilityNonHazardousUsd.toLocaleString('en-US')}; cargo ${s.cargoThreeTonsOrLessUsd.toLocaleString('en-US')} and ${s.cargoMoreThanThreeTonsUsd.toLocaleString('en-US')}. Passenger limits stay in their own class. Provider insurance status: NOT_ACQUIRED.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}; graph writes: {s.graphWrites}; claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>Guidelines PDF created {s.guidelinesPdfCreated} and file-modified {s.guidelinesPdfModified}. MSR-1 PDF created and file-modified {s.receiptApplicationPdfModified}. Both retrieved {s.retrievedAt}. Page data generated {s.generatedAt}. A file-modified date is not an authority effective date. No roster as-of date was available.</li>
        <li>Jackson, Gulfport and Biloxi are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="mississippi" stateName="Mississippi" />
    </main>;
}
