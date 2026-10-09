import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { CONNECTICUT_MOVE_SNAPSHOT as s } from '@/lib/connecticut-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Connecticut Household-Goods Mover Certificates | MoveTrustHub',
    description: 'CTDOT 2026 household-goods roster: 117 source rows, 115 distinct HG certificates, RCHG live verification, tariffs and complaint limits. CTDOT authority is not USDOT or MC authority.',
    path: '/connecticut',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function ConnecticutMovePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Connecticut household-goods mover certificates', url: `${SITE_URL}/connecticut` }]} />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Connecticut research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Connecticut · household-goods authority</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Connecticut household-goods mover certificates</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          CTDOT&apos;s Bureau of Public Transportation regulates intrastate household-goods movers. A Connecticut HG certificate, a USDOT identifier and federal MC authority are separate records. Federal registration alone does not establish Connecticut authority.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="CTDOT roster summary">
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">{s.rosterRows}</p><p className="mt-1 text-sm font-medium">2026 CTDOT roster rows</p><p className="mt-1 text-xs text-muted-foreground">The file&apos;s footer also says 117 registered HHG carriers. A row is not necessarily a unique company.</p></div>
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">{s.distinctCertificates}</p><p className="mt-1 text-sm font-medium">Distinct HG certificate numbers</p><p className="mt-1 text-xs text-muted-foreground">HG1775 and HG1792 each appear twice. The source has no explicit active-status column.</p></div>
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">RCHG</p><p className="mt-1 text-sm font-medium">Live CTDOT eLicense lookup code</p><p className="mt-1 text-xs text-muted-foreground">Recheck a certificate&apos;s current status before relying on the annual roster.</p></div>
      </section>

      <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">What the statewide file establishes</h2>
        <p>The official <Official href={s.rosterSource}>2026 CTDOT Household Goods Movers roster</Official> has {s.rosterRows} source rows and {s.distinctCertificates} distinct HG certificates. We preserve both duplicate certificate observations and the source&apos;s legal-name/DBA spelling. Names and towns are roster context, not verified federal identity. The workbook has no USDOT or MC columns: {s.printedUsdotRows} rows print USDOT and {s.printedMcRows} print MC. That means no exact state-to-federal bridge can be made from this source—not that no carriers overlap.</p>
        <p>CTDOT says the list is current as of publication, but the workbook does not print a publication date. Its HTTP Last-Modified is {s.sourceFileLastModifiedHttp}; we retrieved it {s.retrievedAt}. Neither clock is a live authority-status check. Use <Official href={s.elicenseUrl}>Connecticut eLicense</Official> and the household-goods code <strong>RCHG</strong> to verify current certificate or permit status. We did not ingest an eLicense duplicate roster.</p>
        <p>A CTDOT household-goods certificate and any motor contract carrier permit are state authority concepts; vehicle registration is another matter. Interstate USDOT and MC records are federal identity and authority concepts. We do not convert one into another.</p>

        <h2 className="text-lg font-semibold text-foreground">Tariffs and consumer terms</h2>
        <p>CTDOT&apos;s <Official href={s.regulatoryUrl}>Regulatory &amp; Compliance Unit</Official> handles household-goods tariff filings and states that, since January 2, 2023, it no longer approves a fuel surcharge as part of an HHG mover&apos;s tariff. CTDOT advises consumers to ask for a binding quote and to review contract valuation and damage terms. These are regulator-published rules and guidance, not a carrier tariff corpus or a statewide price comparison. Carrier tariff documents are NOT_ACQUIRED.</p>

        <h2 className="text-lg font-semibold text-foreground">Complaints and citations</h2>
        <p>CTDOT requires household-goods complaints in writing; its Administrative Law Unit hears household-goods citation matters and publishes <Official href={s.finalDecisionsUrl}>final decisions</Official>. Complaint intake and citation capability are KNOWN. We did not acquire a complete provider-level complaint or 2022–2026 citation/outcome corpus, and made no name-only adverse joins. A complaint or citation notice is not an adjudicated finding.</p>

        <h2 className="text-lg font-semibold text-foreground">Coverage limits</h2>
        <ul className="list-disc pl-5">
          <li>No combined Connecticut plus federal mover total and no inferred USDOT/MC links.</li>
          <li>No new canonical organizations, graph writes or claim-eligibility changes.</li>
          <li>Carrier tariff corpus, provider-level complaints and provider-level enforcement outcomes: NOT_ACQUIRED.</li>
          <li>Hartford, New Haven, Stamford and Bridgeport are search context only; no city intelligence pages.</li>
          <li>No mover ratings, rankings or recommendations.</li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="ct-roster-heading">
        <h2 id="ct-roster-heading" className="text-xl font-semibold">2026 CTDOT household-goods roster</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Source-order rows. A certificate can appear more than once. Towns come from the public city/state field; one row has no extractable Connecticut town. Verify current status in eLicense.</p>
        <div className="mt-4 max-w-full overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-muted/60"><tr><th className="px-3 py-2 font-semibold">CTDOT certificate</th><th className="px-3 py-2 font-semibold">Legal name / DBA</th><th className="px-3 py-2 font-semibold">Connecticut town(s)</th></tr></thead>
            <tbody>{s.rows.map((row) => <tr key={row.sourceRow} className="border-t align-top"><td className="whitespace-nowrap px-3 py-2 font-medium">{row.ctdotCertificate}</td><td className="px-3 py-2">{row.legalName}{row.dba ? <span className="block text-xs text-muted-foreground">{row.dba}</span> : null}</td><td className="px-3 py-2">{row.towns.length ? row.towns.join(' / ') : 'Not printed as CT town'}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    <StateCountyLinks stateSlug="connecticut" stateName="Connecticut" />
    </main>
  );
}
