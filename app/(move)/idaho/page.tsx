import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { IDAHO_MOVE_SNAPSHOT as s } from '@/lib/idaho-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Idaho Household-Goods Mover Evidence | MoveTrustHub',
    description:
      'No current Idaho mover-specific household-goods license roster was acquired. An exempt-commodity classification and a financial-responsibility exemption are not a mover census. FMCSA interstate authority stays separate.',
    path: s.route,
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
      {children}
    </a>
  );
}

export default function IdahoMovePage() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Idaho household-goods mover evidence',
            url: `${SITE_URL}${s.route}`,
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Idaho research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Idaho · household-goods evidence</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Idaho household-goods mover evidence</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          A current mover-specific statewide household-goods license, certificate, tariff, or company roster was NOT_ACQUIRED. Missing is not zero. This page does not publish a mover count, and it does not substitute Idaho-address FMCSA carriers, USDOT numbers, or commercial-vehicle registrations for one.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Idaho mover evidence status">
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Household-goods company roster</p>
          <p className="mt-1 text-sm font-medium">{s.hhgRoster}</p>
          <p className="mt-1 text-xs text-muted-foreground">No company count is published. An exempt commodity is not a census.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">ISP commodity table</p>
          <p className="mt-1 text-sm font-medium">Household Goods · {s.commodities.householdGoods}</p>
          <p className="mt-1 text-xs text-muted-foreground">Page modified {s.commodities.dateModified.slice(0, 10)}. That clock is not a roster clock.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Interstate household goods</p>
          <p className="mt-1 text-sm font-medium">FMCSA · separate federal authority</p>
          <p className="mt-1 text-xs text-muted-foreground">Federal authority is not an Idaho household-goods license.</p>
        </div>
      </section>

      <section className="mt-8 max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">The commodity table is not a license</h2>
        <p>
          The Idaho State Police <Official href={s.commodities.url}>Regulated and Exempt Commodities</Official> table was retrieved {s.retrievedAt}. The saved HTML is {s.commodities.htmlBytes.toLocaleString('en-US')} bytes, SHA-256 {s.commodities.htmlSha256}. Household Goods is {s.commodities.householdGoods}. Furniture – Moving and storage is {s.commodities.furnitureMovingAndStorage}. A different row, furniture from a factory or store unless the customer paid, is {s.commodities.furnitureFromFactoryOrStoreUnlessPaidByCustomer}. Those rows are commodity classifications. They are not a mover license, a certificate, a tariff, or a company roster. JSON-LD datePublished {s.commodities.datePublished} and dateModified {s.commodities.dateModified} are a page clock, not a roster clock.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Financial responsibility is not a certificate</h2>
        <p>
          <Official href={s.financialResponsibility.url}>{s.financialResponsibility.citation}</Official> lists “{s.financialResponsibility.householdGoodsText}” among intrastate motor carriers exempt from {s.financialResponsibility.exemptFrom}. The same subsection says they shall not be exempt from {s.financialResponsibility.notExemptFrom}. The dollar amounts in section 49-117 were {s.financialResponsibility.section49117Amounts}. This is financial responsibility. It is not a household-goods certificate and not a roster. History: {s.financialResponsibility.history}. {s.financialResponsibility.statutesSiteNote}
        </p>

        <h2 className="text-lg font-semibold text-foreground">A definition is not a current program count</h2>
        <p>
          <Official href={s.publicUtilitiesDefinition.url}>{s.publicUtilitiesDefinition.citation}</Official> still defines “{s.publicUtilitiesDefinition.term}” for the public utilities act. History: {s.publicUtilitiesDefinition.history}. The live statute page still contains the section. That definition is not a household-goods license count. This page does not treat a bill as a repeal of the published statute. Historical household-goods permits are not proof of a current regulatory roster.
        </p>
        <p>
          The <Official href={s.ipuc.url}>Idaho Public Utilities Commission homepage</Official>, retrieved {s.ipuc.retrievedAt}, lists {s.ipuc.homepageCategories.join(', ')}. That page does not publish a household-goods company roster. The <Official href={s.ipuc.complaintFormUrl}>consumer complaint form</Official> is intake, not a complaint census. A complaint is not a finding. Provider complaint rows and enforcement orders were NOT_ACQUIRED.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Keep the records separate</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Commercial-vehicle registration:</strong> separate from a household-goods license. It was not used as a mover census.</li>
          <li><strong className="text-foreground">FMCSA and USDOT:</strong> federal interstate authority and carrier identity. See <Official href={s.protectYourMoveUrl}>Protect Your Move</Official>. Neither is an Idaho household-goods roster.</li>
          <li><strong className="text-foreground">UCR:</strong> a separate registration program. See the <Official href={s.ucrUrl}>UCR program</Official>. It is not an Idaho household-goods license.</li>
          <li><strong className="text-foreground">Insurance:</strong> the 49-1233 exemption and the 49-117 coverage amounts stay in their own statute. Current provider coverage was NOT_ACQUIRED.</li>
          <li><strong className="text-foreground">Local business registration:</strong> separate. Boise is geography only. This page publishes no city route.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">What this research did not write</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name-only joins: {s.nameOnlyJoins}. Graph writes: {s.graphWrites}. New canonical organizations: {s.newCanonicalOrganizations}.</li>
          <li>No tariff corpus was acquired. A commodity exemption is not a tariff and not a quote.</li>
          <li>No ranking and no combined mover count are published from these sources.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Official sources</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li><Official href={s.commodities.url}>Idaho State Police regulated and exempt commodities</Official></li>
          <li><Official href={s.financialResponsibility.url}>Idaho Code 49-1233</Official></li>
          <li><Official href={s.publicUtilitiesDefinition.url}>Idaho Code 61-107</Official></li>
          <li><Official href={s.ipuc.url}>Idaho Public Utilities Commission</Official></li>
          <li><Official href={s.protectYourMoveUrl}>FMCSA Protect Your Move</Official></li>
        </ul>
      </section>
    </main>
  );
}
