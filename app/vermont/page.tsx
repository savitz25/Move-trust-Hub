import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo/site-metadata";

const carrier = "https://dmv.vermont.gov/CVO";
const statute = "https://legislature.vermont.gov/statutes/fullchapter/05/024";
const motorCarrierChapter =
  "https://legislature.vermont.gov/statutes/chapter/05/029";
const fmcsa =
  "https://www.fmcsa.dot.gov/registration/types-operating-authority";
const Source = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-2"
  >
    {children}
  </a>
);

export const metadata: Metadata = {
  title: "Vermont household-goods carrier regulatory evidence",
  description:
    "Vermont intrastate carrier framework and separate federal household-goods authority evidence.",
  alternates: { canonical: `${SITE_URL}/vermont` },
  robots: { index: true, follow: true },
};

export default function VermontMoveEvidencePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm">
        <Link href="/" className="underline">
          Home
        </Link>{" "}
        / Vermont
      </nav>
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
        Intrastate carrier framework · Vermont
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        Vermont moving carrier regulatory evidence
      </h1>
      <p className="mt-5 text-lg text-slate-700">
        Vermont statutes provide for oversight of common-carrier companies. The
        reviewed chapter’s certificate provisions concern specified services,
        including motor-bus routes; the sources reviewed do not establish a
        separate household-goods carrier license census.
      </p>
      <section className="mt-8 rounded-xl border p-5">
        <h2 className="text-xl font-semibold">
          Current household-goods authority roster
        </h2>
        <p className="mt-3">
          <strong>NOT_ACQUIRED.</strong> No free, current, statewide Vermont
          household-goods carrier roster was identified in the reviewed sources.
          A common-carrier framework or a service-specific certificate is not
          evidence of a current HHG roster.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Keep records separate</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            State carrier statutes and any service-specific authority do not
            establish an HHG certificate.
          </li>
          <li>
            Commercial vehicle safety and registration requirements are separate
            from mover-specific operating authority.
          </li>
          <li>
            FMCSA interstate authority, USDOT identity, insurance filings,
            tariffs, complaints, applications, and enforcement orders are
            distinct records. A complaint is not a violation; an insurance
            requirement does not prove current coverage.
          </li>
        </ul>
      </section>
      <section className="mt-8 rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">
          Authoritative sources and clocks
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <Source href={statute}>Vermont Title 5, Chapter 24</Source> —
            statutory common-carrier and certificate framework; checked October
            14, 2026.
          </li>
          <li>
            <Source href={motorCarrierChapter}>
              Vermont Title 5, Chapter 29
            </Source>{" "}
            — motor-carrier provisions.
          </li>
          <li>
            <Source href={carrier}>
              Vermont DMV Commercial Vehicle Operations
            </Source>{" "}
            — live state commercial-vehicle guidance; no HHG roster rows
            acquired.
          </li>
          <li>
            <Source href={fmcsa}>FMCSA operating-authority types</Source> —
            federal interstate authority context only.
          </li>
        </ul>
      </section>
    </main>
  );
}
