import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { NevadaNtaHhgRow } from '@/lib/nevada-intelligence/lookup';
import { nevadaStatusLabel } from '@/lib/nevada-intelligence/lookup';
import {
  FMCSA_COMPLAINTS,
  FMCSA_PROTECT_YOUR_MOVE,
  NV_NTA_ACTIVE_MOVERS,
  NV_NTA_COMPLAINTS,
  NV_NTA_DIRECTORY,
  NV_NTA_HHG_COMPLAINT_FORM,
  NV_NTA_NOTICES,
} from '@/lib/nevada-intelligence/publication';
import type { NevadaMoveSnapshot } from '@/lib/nevada-intelligence/snapshot';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Official({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="font-medium underline underline-offset-2" rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

function ask(q: string) {
  return `/ask?${new URLSearchParams({ q }).toString()}`;
}

function RosterTable({ rows }: { rows: NevadaNtaHhgRow[] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Carrier (as NTA prints it)</th>
            <th className="px-3 py-2">CPCN</th>
            <th className="px-3 py-2">Status as printed</th>
            <th className="px-3 py-2">Filed tariff</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.cpcn} className="border-t align-top">
              <td className="px-3 py-2">
                {row.carrierName}
                {row.dba ? <span className="text-muted-foreground"> · d/b/a {row.dba}</span> : null}
              </td>
              <td className="px-3 py-2 tabular-nums">
                {row.certificateUrl ? <Official href={row.certificateUrl} label={row.cpcn} /> : row.cpcn}
              </td>
              <td className="px-3 py-2">{nevadaStatusLabel(row)}</td>
              <td className="px-3 py-2">{row.tariffUrl ? <Official href={row.tariffUrl} label="Tariff (PDF)" /> : 'None linked'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NevadaMoveIntelligence({
  payload,
}: {
  payload: { snapshot: NevadaMoveSnapshot; rows: NevadaNtaHhgRow[] };
}) {
  const s = payload.snapshot;
  const roster = s.current_hhg_roster;
  const tariff = s.tariff;
  const listed = payload.rows.filter((r) => r.ntaActiveListStatus);
  const documentOnly = payload.rows.filter((r) => !r.ntaActiveListStatus);
  const apps = s.applications;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            url: `${SITE_URL}/nevada`,
            description: 'Nevada Transportation Authority household-goods mover research. Not a ranking.',
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Nevada research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Nevada · household-goods moving research</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{s.publication.h1}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          The Nevada Transportation Authority (NTA) regulates household-goods moves that start and end inside Nevada.
          Interstate moves are regulated by FMCSA. An NTA certificate (CPCN) is not a USDOT or MC number. This page is
          not a Trust Score and not a ranking.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.NV_NTA_ACTIVE_MOVER_CERTIFICATES}</p>
          <p className="mt-1 text-sm font-medium">Certificates on NTA&apos;s Active Mover list</p>
          <p className="mt-1 text-xs text-muted-foreground">
            NTA&apos;s own &quot;Mover&quot; category, each printed as Active. Not FMCSA interstate movers.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{roster.NV_NTA_HHG_DOCUMENT_EVIDENCE_NOT_ON_ACTIVE_LIST}</p>
          <p className="mt-1 text-sm font-medium">Other household-goods certificates in the directory</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Not on the Active Mover list; their NTA-filed certificate or tariff says household goods. Status text as printed.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">{tariff.NV_NTA_HHG_TARIFF_LINKS}</p>
          <p className="mt-1 text-sm font-medium">Household-goods tariffs linked</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Carrier-filed tariffs. A tariff is not a quote and there is no statewide Nevada moving price.
          </p>
        </div>
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Nevada intrastate authority</h2>
        <p>
          A company that moves household goods for hire between points in Nevada needs a Certificate of Public
          Convenience and Necessity (CPCN) from the NTA. NTA&apos;s{' '}
          <Official href={NV_NTA_DIRECTORY} label="Tariffs & Certificates directory" /> lists {s.directory.NV_NTA_DIRECTORY_ROWS}{' '}
          certificates across every class it regulates (towing, limousine, charter bus, taxi, movers and more), with no class
          column, so the directory is not a mover count. NTA&apos;s{' '}
          <Official href={NV_NTA_ACTIVE_MOVERS} label="Active Certificates list for movers" /> is the class evidence used
          here. Company names are never used to decide who is a mover: {roster.NV_NTA_3XXX_DIRECTORY_ROWS_EXCLUDED_AS_NOT_HHG}{' '}
          certificates in the same number range belong to towing companies.
        </p>
        <p>
          Both pages were retrieved on {s.retrievedAt}; neither prints an as-of date, and retrieval is not an authority
          effective date. NTA also licenses {roster.NV_NTA_ACTIVE_WAREHOUSE_PERMITS} warehouse permits, which are a separate
          class and are not counted here.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Household-goods carriers ({roster.NV_NTA_HHG_DISTINCT_CPCN} certificates)</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Listed by name, not ranked. Status is exactly what NTA prints: &quot;Active&quot; on the Active Certificates list,
          and the directory&apos;s status text (for example Temporary Discontinuance, Revocation Pending Expiration, or Other
          Pending OSC) where it prints one. Three Active Mover certificates appear in the directory with an earlier revision
          suffix of the same number and are matched on that number.
        </p>
        <h3 className="mt-5 text-base font-semibold">On NTA&apos;s Active Mover list ({listed.length})</h3>
        <RosterTable rows={listed} />
        <h3 className="mt-6 text-base font-semibold">Household-goods certificates not on the Active Mover list ({documentOnly.length})</h3>
        <RosterTable rows={documentOnly} />
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Tariffs</h2>
        <p>
          Each household-goods carrier files its own tariff with NTA, naming its rates, charges and rules for the territory
          in its certificate. {tariff.NV_NTA_HHG_TARIFF_TITLE_SAYS_HOUSEHOLD_GOODS} of the {tariff.NV_NTA_HHG_TARIFF_LINKS}{' '}
          linked tariffs name household goods in their readable text; {tariff.NV_NTA_HHG_TARIFF_SCANNED_WITHOUT_TEXT} are
          scanned images. A tariff is not a quote. What you pay depends on the move, the estimate and the carrier&apos;s
          filed rules, and there is no statewide Nevada moving price. Tariff issue and effective dates are stamps on scanned
          pages and were not extracted, so no tariff date is shown. Rate sheets were not parsed or compared.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Applications are not certificates</h2>
        <p>
          NTA&apos;s <Official href={NV_NTA_NOTICES} label="2026 public notices" /> include {apps.NV_NTA_2026_HHG_APPLICATION_NOTICES}{' '}
          applications that ask for household-goods authority, out of {apps.NV_NTA_2026_NOTICES} notices this year. An
          application is not a granted CPCN, and applicants are not counted as licensed movers.
        </p>
        <ul className="list-disc pl-5">
          {apps.rows.map((a) => (
            <li key={a.docket}>
              Docket {a.docket} · {a.type} · {a.applicant}
              {a.noticeDate ? ` · notice ${a.noticeDate}` : ''} · <Official href={a.noticeUrl} label="notice" />
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Federal overlay</h2>
        <p>
          NTA prints no USDOT or MC number, so exact NTA-to-USDOT joins are 0 and exact NTA-to-MC joins are 0. Zero proven
          joins does not mean zero overlap: one carrier can hold both an NTA certificate and federal authority. Nothing is matched by company
          name, and a Nevada address is not an NTA certificate. For interstate authority, search the federal record, for
          example{' '}
          <Link href={ask('interstate household goods carriers headquartered in Nevada')} className="font-medium underline underline-offset-2">
            interstate household goods carriers headquartered in Nevada
          </Link>{' '}
          or{' '}
          <Link href={ask('Find USDOT 3244649')} className="font-medium underline underline-offset-2">
            Find USDOT 3244649
          </Link>
          . NTA certificates and FMCSA carriers are never added into one Nevada mover count.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Complaints</h2>
        <p>
          NTA takes complaints about moves within Nevada through its{' '}
          <Official href={NV_NTA_HHG_COMPLAINT_FORM} label="Household Goods Mover complaint form" /> (
          <Official href={NV_NTA_COMPLAINTS} label="complaint instructions" />); an NTA investigator is assigned to each
          complaint. NTA states that it does not have jurisdiction over interstate service, meaning moves that start in one
          state and end in another. Those go to FMCSA (<Official href={FMCSA_COMPLAINTS} label="FMCSA complaints" />,{' '}
          <Official href={FMCSA_PROTECT_YOUR_MOVE} label="Protect Your Move" />). Complaint records and outcomes are not
          published in bulk, so no complaint count is shown. A complaint is not a finding.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Check a mover</h2>
        <p>
          Search by NTA certificate number, for example{' '}
          <Link href={ask('Nevada CPCN 3251.3')} className="font-medium underline underline-offset-2">
            Nevada CPCN 3251.3
          </Link>
          . A Nevada-to-California move is interstate and belongs to the federal record.
        </p>

        <h2 className="text-lg font-semibold text-foreground">What this page does not mean</h2>
        <ul className="list-disc pl-5">
          <li>No statewide Nevada moving price. A tariff is not a quote.</li>
          <li>No combined NTA plus FMCSA mover count.</li>
          <li>No Trust Score, ranking or recommendation.</li>
          <li>No Las Vegas, Reno, Henderson, Carson City, county or city moving-intelligence page.</li>
        </ul>
        <p>Snapshot {s.version}.</p>
      </section>
    </main>
  );
}
