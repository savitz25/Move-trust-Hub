import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { KENTUCKY_MOVE_SNAPSHOT as s } from '@/lib/kentucky-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Kentucky Intrastate Household-Goods Certificate | MoveTrustHub',
    description: 'The Kentucky Transportation Cabinet publishes an intrastate household-goods certificate listing. The September 1, 2026 file has 42 certificate rows. Status, insurance, and federal numbers are separate.',
    path: '/kentucky',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function KentuckyMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Kentucky intrastate household-goods certificate', url: `${SITE_URL}/kentucky` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Kentucky research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Kentucky Transportation Cabinet</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Kentucky intrastate household-goods certificate</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">A for-hire household-goods move between points in Kentucky needs a Kentucky Transportation Cabinet household-goods certificate. The certificate number on the state listing, a DMT or DVR label, a USDOT number, and a federal MC number are different identifiers.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Kentucky evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.listingRows} certificate rows</p><p className="mt-1 text-sm font-medium">{s.distinctCertificateNumbers} distinct certificate numbers</p><p className="mt-1 text-xs text-muted-foreground">HHG Carrier Listing dated September 1, 2026. The file does not print a status for each certificate.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.statuteCertificate}</p><p className="mt-1 text-sm font-medium">Household goods certificate</p><p className="mt-1 text-xs text-muted-foreground">Kentucky issues this certificate separately from taxicab, limousine, disabled-persons, TNC, charter bus, and other motor-carrier certificates.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Tariff on file</p><p className="mt-1 text-sm font-medium">{s.statuteStandards}</p><p className="mt-1 text-xs text-muted-foreground">A current tariff is required while the certificate is in effect. This page does not hold the tariff files.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Household-goods certificate listing</h2>
      <p><Official href={s.householdGoodsUrl}>KYTC household-goods guidance</Official> says a mover that stays inside Kentucky must be licensed by the Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers. The <Official href={s.listingUrl}>HHG Carrier Listing</Official> is the public file linked from that page. The PDF footer reads Tuesday, September 1, 2026, and the file has 11 pages. This snapshot parsed {s.listingRows} certificate rows and {s.distinctCertificateNumbers} distinct certificate numbers. Each row has a certificate number, phone, email, legal name, DBA, physical address, and mailing address.</p>
      <p>The listing does not print certificate status, a field labeled DMT, or a field labeled DVR. The consumer checklist on the KYTC page tells customers to ask for a KY DMT number, sometimes called a DVR license number. That label is not a column on this file, so the certificate number is not renamed into a DMT number here. {s.physicalAddressInKentucky} physical addresses are in Kentucky. {s.physicalAddressOutsideKentucky} physical addresses are in another state. Those rows stay in the Kentucky certificate count. A street address is the address on the listing. It is not a service area, and it is not federal authority.</p>
      <p>An older file, <Official href={s.priorListingUrl}>Household Goods Carriers dated November 1, 2023</Official>, is a prior clock. Its rows were not parsed into this count. Carriers apply and renew intrastate household-goods authority in the <Official href={s.portalUrl}>Motor Carrier Portal</Official>. The portal was not downloaded.</p>

      <h2 className="text-lg font-semibold text-foreground">Insurance, tariffs, and annual reports</h2>
      <p>The KYTC page says insurers file Form H for household goods and Form E, or an Accord certificate, for liability. Liability coverage must comply with {s.statuteLiability}. The listing does not show whether a named carrier’s filing is current. A filing requirement is not current compliance. No dollar cargo minimum was taken from the statute into this snapshot. The KYTC FAQ describes a declared-value base rate of $.60 per pound per article and says that base rate is not insurance.</p>
      <p>{s.statuteCertificate} requires a household-goods certificate holder to maintain a current tariff on file with the department. {s.statuteStandards} includes filing of tariffs among the household-goods standards. The KYTC FAQ says movers file their rates and may not charge more or less than the rates on file. No tariff documents were acquired. A tariff is not a quote.</p>
      <p>The annual-report form is <Official href={s.annualReportFormUrl}>TC 95-44</Official>. Filed annual reports were not acquired.</p>

      <h2 className="text-lg font-semibold text-foreground">Complaints, other Kentucky authority, and interstate moves</h2>
      <p>KYTC accepts household-goods complaints on <Official href={s.complaintFormUrl}>TC 95-622</Official>, sent to {s.complaintEmail}. The page says the Division of Motor Carriers investigates written complaints. That form is intake. No provider-level complaint rows or outcomes were acquired. A suspension, revocation, or order corpus was not acquired. No provider-level order was attached, including by name.</p>
      <p>Passenger certificates, towing and storage, U-Drive-It, IFTA, IRP, Kentucky weight-distance tax, intrastate tax, and UCR are other Kentucky or registration programs. They are not in the {s.listingRows} household-goods rows. A move that leaves Kentucky is an FMCSA interstate move. KYTC points consumers to 888-368-7238. The listing prints no USDOT number and no MC number, so no exact state-to-federal bridge was made.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Household-goods certificate rows: {s.listingRows}. Distinct certificate numbers: {s.distinctCertificateNumbers}. Status on the listing: not printed.</li>
        <li>Physical addresses in Kentucky: {s.physicalAddressInKentucky}. Physical addresses in another state: {s.physicalAddressOutsideKentucky}. Both groups are Kentucky certificate rows.</li>
        <li>Printed USDOT or MC numbers, exact federal bridges: not on this listing. Missing from the file is not a finding that a carrier has no federal number.</li>
        <li>Form H and Form E requirements: known from the KYTC page. Provider insurance status: not acquired. Cargo dollar minimum: not acquired.</li>
        <li>Tariff requirement: known, {s.statuteCertificate}. Tariff corpus: not acquired. Annual-report filings: not acquired. Form {s.annualReportForm} is the blank form.</li>
        <li>Complaint intake: known, form TC 95-622. Complaint outcomes and enforcement orders: not acquired.</li>
        <li>November 1, 2023 carrier file: not used as this population. Its row count is not published here.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}. Graph writes: {s.graphWrites}. Claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>Listing footer date {s.listingFooterDate}. PDF retrieved {s.retrievedAt}. Page data generated {s.generatedAt}. Retrieval is not the certificate effective date.</li>
        <li>Louisville and Lexington are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="kentucky" stateName="Kentucky" />
    </main>;
}
