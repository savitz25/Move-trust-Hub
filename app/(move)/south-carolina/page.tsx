import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { SOUTH_CAROLINA_MOVE_SNAPSHOT as s } from '@/lib/south-carolina-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'South Carolina Class E Household-Goods Certificate | MoveTrustHub',
    description: 'The South Carolina Office of Regulatory Staff publishes a Class E carrier workbook. The file named 20260804 has 150 Class E household-goods certificate rows and 149 distinct certificate numbers. Hazardous-waste rows, tariffs, and federal numbers stay separate.',
    path: '/south-carolina',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function SouthCarolinaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'South Carolina Class E household-goods certificate', url: `${SITE_URL}/south-carolina` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'South Carolina research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">South Carolina Office of Regulatory Staff</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">South Carolina Class E household-goods certificate</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">A for-hire household-goods move between points in South Carolina uses a Public Service Commission Class E household-goods certificate. That certificate, a Class E hazardous-waste certificate, a certificate application, and a federal USDOT or MC number are different records.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="South Carolina evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.listingRows} Class E HHG rows</p><p className="mt-1 text-sm font-medium">{s.distinctCertificateNumbers} distinct certificate numbers</p><p className="mt-1 text-xs text-muted-foreground">Workbook file name date token {s.filenameDateToken}. Every household-goods row prints Filing Status Active.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.classRegulation}</p><p className="mt-1 text-sm font-medium">Class E certificate</p><p className="mt-1 text-xs text-muted-foreground">Class E covers household goods or hazardous waste for disposal. This count is household goods only.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.classEHazRowsInThisWorkbook} Class E HAZ rows</p><p className="mt-1 text-sm font-medium">Excluded from the {s.listingRows}</p><p className="mt-1 text-xs text-muted-foreground">Those three rows sit on the same sheet. They are not household-goods certificates, and the separate hazardous-waste file was not counted.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Class E household-goods workbook</h2>
      <p>The <Official href={s.classEUrl}>ORS Class E page</Official> links <Official href={s.workbookUrl}>Regulated Household Goods Carriers</Official> to {s.workbookFileName}. The sheet named {s.sheetName} has {s.sheetDataRows} data rows. {s.listingRows} print Filing Type Class E HHG. {s.classEHazRowsInThisWorkbook} print Filing Type Class E HAZ. The household-goods count is the {s.listingRows} Class E HHG rows. The sheet total is not that count. A hidden choice-list sheet was not counted.</p>
      <p>The {s.listingRows} household-goods rows print {s.distinctCertificateNumbers} distinct certificate numbers and {s.distinctCrmRecords} CRM certificate records. Certificate {s.repeatedCertificateNumber} is American Van Lines Inc., DBA MBM Moving Systems, on two CRM records. Both print Class E HHG and Active. Those two records were not collapsed, and the printed name was not counted twice as two companies. {s.distinctPrintedProviderNames} distinct provider names are printed. {s.rowsPrintingDba} rows print a DBA. The workbook has no address, phone, USDOT, or MC column.</p>
      <p>Filing Status prints Active on all {s.filingStatusActive} household-goods rows. That is the status in this file. It is not a later compliance review. CRM Modified On on the household-goods rows runs from {s.crmModifiedOnMin} through {s.crmModifiedOnMax}. The file name carries the date token {s.filenameDateToken}. Those clocks are different. Retrieval on {s.retrievedAt} is not a certificate effective date.</p>

      <h2 className="text-lg font-semibold text-foreground">Applications, tariffs, and insurance</h2>
      <p>{s.classRegulation} describes a Class E motor carrier as a common carrier of household goods or hazardous waste for disposal. {s.statute} is the motor-carrier statute cited on PSC Class E orders. The <Official href={s.pscUrl}>Public Service Commission</Official> and ORS both take part in a new certificate. The <Official href={s.applicationUrl}>Class E application</Official> says an application without an attached tariff is incomplete. An application is not a certificate on this list.</p>
      <p>{s.tariffRegulation} says a certificated motor freight carrier may not operate until its rates and rules are filed. ORS publishes a <Official href={s.tariffSampleUrl}>small-company tariff sample</Official>. The sample is not a carrier's tariff. Carrier tariff files were not acquired. A filing requirement is not a quote and is not proof that a named carrier's tariff is current.</p>
      <p>{s.insuranceRegulation} requires proof of insurance. The Class E application says Form E and Form H are filed with ORS. The workbook does not print insurance status. No dollar minimum was taken into this snapshot. A filing requirement is not current coverage.</p>

      <h2 className="text-lg font-semibold text-foreground">Orders, other authority, and interstate moves</h2>
      <p>The <Official href={s.docketUrl}>PSC docket system</Official> holds applications, orders, and tariffs. It was not used to build this roster. No provider-level order was attached, including by name. A complaint corpus was not acquired. A complaint is not a finding.</p>
      <p>The three Class E HAZ certificate numbers in this workbook are {s.classEHazCertificates.join(', ')}. The separate <Official href={s.hazWorkbookUrl}>hazardous-waste carrier file</Official> was not parsed, so its row count is not published. Class C certificates, transportation network companies, and fines are other ORS transportation pages. They are not in the {s.listingRows} household-goods rows. A move that leaves South Carolina is an FMCSA interstate move. This workbook prints no USDOT number and no MC number, so no exact state-to-federal bridge was made. UCR was not acquired.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Class E HHG rows: {s.listingRows}. Distinct certificate numbers: {s.distinctCertificateNumbers}. CRM certificate records: {s.distinctCrmRecords}. Filing Status Active: {s.filingStatusActive}.</li>
        <li>Sheet data rows: {s.sheetDataRows}. Class E HAZ rows in this workbook: {s.classEHazRowsInThisWorkbook}. Those HAZ rows are not in the household-goods count. The separate hazardous-waste file was not parsed.</li>
        <li>Certificate {s.repeatedCertificateNumber} is two CRM records for one printed provider. It was not collapsed.</li>
        <li>Printed USDOT or MC numbers, exact federal bridges: not on this workbook. Missing from the file is not a finding that a carrier has no federal number.</li>
        <li>Form E and Form H requirements: known. Provider insurance status: not acquired. Insurance dollar minimum: not acquired.</li>
        <li>Tariff requirement: known, {s.tariffRegulation}. Tariff sample: not a carrier tariff. Tariff corpus: not acquired.</li>
        <li>Complaint corpus and PSC order corpus: not acquired. The docket system was not the roster.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}. Graph writes: {s.graphWrites}. Claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>File name date token {s.filenameDateToken}. CRM Modified On {s.crmModifiedOnMin} through {s.crmModifiedOnMax}. Workbook retrieved {s.retrievedAt}. Page data generated {s.generatedAt}.</li>
        <li>Charleston, Columbia, and Greenville are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="south-carolina" stateName="South Carolina" />
    </main>;
}
