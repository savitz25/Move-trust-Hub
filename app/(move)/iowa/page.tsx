import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

const authorityGuide = 'https://iowadot.gov/media/1143/download?inline=';
const application = 'https://ia.iowadot.gov/forms/442078.pdf';
const rules = 'https://iowadot.gov/media/8761/download?inline=';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Iowa Household Goods Mover Authority | MoveTrustHub',
    description: 'Iowa DOT intrastate household-goods motor-carrier permit requirements, distinct from passenger certificates, applications, insurance filings, tariffs and FMCSA interstate authority.',
    path: '/iowa',
  });
}

export default function IowaMovePage() {
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Iowa household goods mover authority', url: `${SITE_URL}/iowa` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Iowa research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Iowa DOT Motor Carrier Services</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Iowa household goods mover authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">An intrastate household-goods carrier needs an Iowa motor-carrier permit. The Iowa motor-carrier certificate on the same application is for passenger service. An application, a federal USDOT number and FMCSA interstate authority are separate from an issued Iowa household-goods permit.</p>
    </header>
    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Iowa evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Permit</p><p className="text-sm">Iowa household-goods authority class</p><p className="mt-1 text-xs text-muted-foreground">Passenger motor-carrier certificates are a different class.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="text-sm">Active Iowa HHG carrier roster rows</p><p className="mt-1 text-xs text-muted-foreground">No clean statewide roster was located in the public Iowa DOT materials reviewed.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">USDOT is a bridge</p><p className="text-sm">Not proof of Iowa authority</p><p className="mt-1 text-xs text-muted-foreground">A USDOT number may be required in the application, but does not establish permit issuance or current status.</p></div>
    </section>
    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">State permit and filing requirements</h2>
      <p>The <a className="underline" href={authorityGuide}>Iowa DOT Intrastate For-Hire Authority guide</a> and <a className="underline" href={application}>Form 441052</a> place household goods in the motor-carrier permit category. The certificate category is for passenger service. The application asks for the carrier&apos;s identity and USDOT number where required. Filing the application is not evidence that Iowa issued a permit.</p>
      <p>The guide lists liability and property damage insurance on Form E and a tariff for household-goods carriers as issuance requirements. A requirement is not evidence of an insurer&apos;s actual filing or a carrier&apos;s current compliance. The <a className="underline" href={rules}>Iowa DOT motor-carrier rules</a> govern the state framework; tariff or rate documents and individual permit terms need a carrier-specific check.</p>
      <h2 className="text-lg font-semibold text-foreground">Verify a named carrier</h2>
      <p>Ask the mover for its exact legal name and Iowa intrastate household-goods permit details, then confirm issuance and current status with <a className="underline" href="https://iowadot.gov/motor-carriers">Iowa DOT Motor Carrier Services</a>. For an interstate move, separately check <a className="underline" href="https://www.fmcsa.dot.gov/protect-your-move">FMCSA household-goods authority</a>. Neither federal authority nor a federal complaint record establishes Iowa intrastate authority.</p>
      <h2 className="text-lg font-semibold text-foreground">Coverage and clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Iowa DOT regulatory guide dated December 9, 2022; Iowa DOT application and motor-carrier rules reviewed October 6, 2026.</li>
        <li>Issued permit records, carrier status, insurance filings, tariffs, orders and enforcement: NOT_ACQUIRED. Raw carrier observations and distinct authorized carriers: UNKNOWN, not zero.</li>
        <li>Existing canonical matches, net-new entities and record-level evidence attachments: NOT_ACQUIRED. No state or federal authority was inferred from existing Iowa local mover data.</li>
        <li>No city or county research was added in this sprint.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="iowa" stateName="Iowa" />
    </main>;
}
