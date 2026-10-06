import type { Metadata } from "next";
import { LocalMoversBreadcrumbs } from "@/components/local-movers/local-movers-breadcrumbs";
import { KANSAS_MOVE_SNAPSHOT as s } from "@/lib/kansas-intelligence/snapshot";
import { buildMovePageMetadata } from "@/lib/seo/move-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/seo/site-metadata";

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: "Kansas Household-Goods Tariff and Carrier Evidence | MoveTrustHub",
    description:
      "Kansas KCC intrastate household-goods tariff/carrier listing, distinct from certificate authority, current insurance compliance, USDOT, and FMCSA interstate authority.",
    path: s.route,
  });
}

const kcc = "https://www.kcc.ks.gov";
const fmt = (value: number) => value.toLocaleString("en-US");

function Official({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline underline-offset-2"
    >
      {children}
    </a>
  );
}

const identifiers = s.rows.flatMap((row) =>
  row.mcid_dot_identifier ? [row.mcid_dot_identifier] : [],
);
const distinctIdentifiers = new Set(identifiers);
const exceptionRows = s.rows.filter((row) => row.tariff_exception_document);
const blankIdentifiers = s.rows.filter((row) => !row.mcid_dot_identifier);

export default function KansasMovePage() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Kansas household-goods tariff and carrier evidence",
            url: `${SITE_URL}${s.route}`,
          },
        ]}
      />
      <LocalMoversBreadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: "Kansas research" }]}
      />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">
          Kansas Corporation Commission · Transportation
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Kansas intrastate household-goods tariff and carrier listing
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Kansas has a state household-goods certificate requirement for covered
          intrastate operations. The KCC tariff/carrier listing below is
          evidence of published tariff relationships; a listing is not a current
          certificate-status or insurance-compliance census. Kansas intrastate
          authority, tariffs, insurance, USDOT, and FMCSA interstate
          household-goods authority remain separate.
        </p>
      </header>

      <section
        className="mt-8 grid gap-3 sm:grid-cols-3"
        aria-label="Kansas evidence summary"
      >
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">
            {fmt(s.sourceRowCount)} listing rows
          </p>
          <p className="mt-1 text-sm">
            KCC household-goods tariff/carrier table
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Source row is a tariff/carrier listing relationship, not necessarily
            a distinct legal company.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">
            {fmt(distinctIdentifiers.size)} distinct printed identifiers
          </p>
          <p className="mt-1 text-sm">MCID / DOT field</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {fmt(blankIdentifiers.length)} row has no printed identifier; two
            identifiers occur on more than one differently labeled row.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">
            {fmt(exceptionRows.length)} exception links
          </p>
          <p className="mt-1 text-sm">Source-linked documents</p>
          <p className="mt-1 text-xs text-muted-foreground">
            A filed exception is not an authority or insurance-status
            observation.
          </p>
        </div>
      </section>

      <section className="mt-8 max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">
          State authority, tariff, and insurance are separate records
        </h2>
        <p>
          <Official href={s.authorityStatute}>
            Kansas Statutes Annotated 66-1,114
          </Official>{" "}
          establishes a certificate requirement for covered intrastate motor
          carriers transporting household goods. The KCC table is specifically
          published as a household-goods tariff/carrier list; it does not itself
          provide a complete current certificate-status roster. The{" "}
          <Official href={s.motorCarrierSearch}>
            KCC motor-carrier search
          </Official>{" "}
          is a point-search pathway, not a bulk census acquired for this page;
          KCC describes it as an ongoing project and disclaims that search
          information is free of errors. Certificate row count and current
          authorized-carrier population remain UNKNOWN.
        </p>
        <p>
          The KCC list retrieved {s.retrievedAt} has no dataset-wide update
          clock displayed on the listing page. Its {fmt(s.sourceRowCount)}{" "}
          source rows include {fmt(distinctIdentifiers.size)} distinct nonblank
          printed MCID/DOT identifiers, {fmt(blankIdentifiers.length)} blank
          identifier, and repeated identifiers across separate labels. We
          preserve all published rows without merging unlike labels. The list
          does not establish an identifier as USDOT, an active KCC certificate,
          or FMCSA authority.
        </p>
        <p>
          <Official href={s.insuranceStatute}>
            Kansas Statutes Annotated 66-1,128
          </Official>{" "}
          describes insurance filing as a separate statutory condition. This
          tariff list does not show a current named-carrier insurance
          observation. Current insurance status is NOT_ACQUIRED. FMCSA
          interstate household-goods authority and USDOT records are also
          NOT_ACQUIRED here and are not inferred from this state list.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Tariff listing rows: {fmt(s.sourceRowCount)}; distinct nonblank
            printed identifiers: {fmt(distinctIdentifiers.size)}.
          </li>
          <li>
            Existing Kansas destination and county editorial content remains
            separate and was not changed. Existing mover-directory records were
            not reconciled: {s.existingKansasMoverDirectoryRecords}. Existing
            authority matches: {s.existingEntityMatches}; canonical organization
            writes: {s.netNewEntities}; evidence attachments:{" "}
            {s.evidenceAttachments}; graph writes: {s.graphWrites}.
          </li>
          <li>
            Certificate status, actual insurance, commission actions,
            USDOT/FMCSA bridge, and current active-authority population:
            NOT_ACQUIRED or UNKNOWN as labeled; none are reported as zero.
          </li>
        </ul>
      </section>

      <section className="mt-8 overflow-x-auto">
        <h2 className="text-lg font-semibold">
          KCC published tariff/carrier listing rows
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every row retains its printed label, address, identifier, tariff
          document, and any separate exception document.
        </p>
        <table className="mt-3 w-full min-w-[60rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-3">Carrier/tariff label</th>
              <th className="py-2 pr-3">Address as printed</th>
              <th className="py-2 pr-3">MCID / DOT field</th>
              <th className="py-2 pr-3">Tariff</th>
              <th className="py-2">Exception</th>
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row, index) => (
              <tr
                key={`${row.carrier_tariff_label}-${index}`}
                className="border-b border-border/70"
              >
                <td className="py-2 pr-3 font-medium">
                  {row.carrier_tariff_label}
                </td>
                <td className="py-2 pr-3">
                  {row.listed_address || "Not printed"}
                </td>
                <td className="py-2 pr-3">
                  {row.mcid_dot_identifier || "Not printed"}
                </td>
                <td className="py-2 pr-3">
                  <Official href={`${kcc}${row.carrier_tariff_document}`}>
                    View tariff
                  </Official>
                </td>
                <td className="py-2">
                  {row.tariff_exception_document ? (
                    <Official href={`${kcc}${row.tariff_exception_document}`}>
                      View exception
                    </Official>
                  ) : (
                    "None linked in this row"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 max-w-4xl space-y-2 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">
          Source and clocks
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Official href={s.sourceUrl}>
              KCC household-goods tariffs/carrier listing
            </Official>{" "}
            — retrieved {s.retrievedAt}; page does not publish a dataset-wide
            update date.
          </li>
          <li>
            Retrieved KCC source HTML SHA-256: {s.sourceSha256}; accepted row
            snapshot SHA-256: {s.acceptedSnapshotSha256}. No inference is made
            about certificate status, insurance status, or current federal
            operating authority.
          </li>
          <li>
            No Kansas city or county routes were created. A printed address
            remains a source field, not a local market publication.
          </li>
        </ul>
      </section>
    </main>
  );
}
