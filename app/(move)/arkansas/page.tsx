import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { ARKANSAS_MOVE_SNAPSHOT as s } from '@/lib/arkansas-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Arkansas Intrastate Household-Goods Authority | MoveTrustHub',
    description: 'Arkansas intrastate household-goods authority is issued through ARDOT. A statewide household-goods roster was not acquired. An application is not active authority.',
    path: '/arkansas',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function ArkansasMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Arkansas intrastate household-goods authority', url: `${SITE_URL}/arkansas` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Arkansas research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Arkansas Department of Transportation</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Arkansas intrastate household-goods authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire household-goods transportation wholly inside Arkansas uses Arkansas intrastate authority from the Arkansas Department of Transportation. Household-goods authority, general freight and mobile-home authority, passenger authority, an application, an insurance filing, a commission order, FMCSA interstate authority, and a USDOT number are different records.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Arkansas evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">ARDOT intrastate authority</p><p className="mt-1 text-sm font-medium">Verify with the Legal Division</p><p className="mt-1 text-xs text-muted-foreground">Ask whether a household-goods certificate or permit is in effect. An application is not that answer.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide household-goods roster</p><p className="mt-1 text-xs text-muted-foreground">No current public household-goods carrier roster was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Rule 13.1 cited</p><p className="mt-1 text-sm font-medium">HHG insurance dollars not printed</p><p className="mt-1 text-xs text-muted-foreground">The household-goods packet requires an insurance certificate. It does not print the dollar minimum. A filing is not current operating authority.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Household-goods applications are not a roster</h2>
      <p>The <Official href={s.applicationsUrl}>ARDOT applications page</Official> keeps General Freight/Mobile Home, Household Goods, and Passenger as separate application classes. Interstate authority is identified there as FMCSA. The household-goods individual packet and the household-goods corporation packet are separate files. On the applications page retrieved {s.retrievedAt}, both the Individual and Corporation household-goods labels pointed at the corporation PDF. The individual file remains at its own media address.</p>
      <p>The <Official href={s.hhgIndividualUrl}>individual household-goods packet</Official> says the enclosed forms apply for Arkansas intrastate authority for household goods or passenger services. It requires an original and one copy, a ${s.filingFeeUsd.toLocaleString('en-US')} filing fee, and a separate ${s.perVehicleInsuranceFilingFeeUsd.toLocaleString('en-US')} insurance filing fee for each vehicle operated in Arkansas intrastate service. Those fees are not operating authority. After acceptance, the applicant receives a Notice of Filing and then a hearing date. Personal appearance is mandatory. A filed application is not issued authority. The <Official href={s.noticeOfFilingUrl}>notice-of-filing page</Official> did not present a carrier roster.</p>
      <p>Hearings are held before the Arkansas State Highway Commission or its designated hearing officer at the Central Office Building, 10324 Interstate 30, Little Rock. Mail goes to the Legal Division, P.O. Box 2261, Little Rock, AR 72203-2261. The <Official href={s.authorityUrl}>intrastate authority page</Official> lists motor-carrier contact Donna Ramsey at (501) 569-2160. Little Rock in that address is the hearing office. This page publishes no city or county route.</p>

      <h2 className="text-lg font-semibold text-foreground">Freight, passenger, insurance, and federal records stay separate</h2>
      <p>The <Official href={s.generalFreightIndividualUrl}>general-freight individual packet</Official> is a different application. It prints an Arkansas intrastate insurance minimum of ${s.generalFreightBodilyInjuryPerPersonUsd.toLocaleString('en-US')} / ${s.generalFreightBodilyInjuryPerAccidentUsd.toLocaleString('en-US')} / ${s.generalFreightPropertyDamageUsd.toLocaleString('en-US')} and says that minimum is for intrastate operation except passengers and household goods. Those dollar amounts are not household-goods limits. The household-goods packet tells the applicant to submit public liability and property damage insurance in the amounts set out in Rule 13.1. The dollar amounts in Rule 13.1 were not printed in the household-goods packet and were NOT_ACQUIRED. An ACORD certificate or certificate of insurance is evidence of a filing. It is not current operating authority, and no provider-level insurance status was acquired.</p>
      <p>Passenger packets are a separate class. The individual household-goods cover letter also mentions passenger services. That sentence does not merge the passenger roster, which was also NOT_ACQUIRED, into household goods. FMCSA interstate authority and a USDOT number are not Arkansas household-goods authority. No exact federal bridge was made. Orders and provider complaint rows were NOT_ACQUIRED. A complaint is not a finding. Missing rows are not zero.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Household-goods certificate or permit rows and current statuses: NOT_ACQUIRED. No mover count is shown.</li>
        <li>General freight and mobile-home applications, passenger applications, insurance filings, commission orders, FMCSA, and USDOT stay separate.</li>
        <li>Application filing fee ${s.filingFeeUsd.toLocaleString('en-US')}. Per-vehicle insurance filing fee ${s.perVehicleInsuranceFilingFeeUsd.toLocaleString('en-US')}. A fee is not authority.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}. Graph writes: {s.graphWrites}. Claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>Household-goods individual PDF created {s.hhgIndividualPdfCreated} and file-modified {s.hhgIndividualPdfModified}. Corporation PDF created {s.hhgCorporationPdfCreated} and file-modified {s.hhgCorporationPdfModified}. General-freight individual PDF file-modified {s.generalFreightIndividualPdfModified}. Retrieved {s.retrievedAt}. Page data generated {s.generatedAt}. A file-modified date is not an authority effective date. No roster as-of date was available.</li>
        <li>Little Rock, Fayetteville, and Fort Smith are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  </main>;
}
