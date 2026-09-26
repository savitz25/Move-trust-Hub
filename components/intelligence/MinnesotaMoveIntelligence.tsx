import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { MinnesotaMoveSnapshot } from '@/lib/minnesota-intelligence/snapshot';
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

export function MinnesotaMoveIntelligence({ payload }: { payload: { snapshot: MinnesotaMoveSnapshot } }) {
  const s = payload.snapshot;
  const f = s.permit_framework;
  const r = s.rates_and_records;
  const reg = s.regulator;
  const fed = s.existing_coverage_audit.federal_overlay;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            url: `${SITE_URL}/minnesota`,
            description: 'Minnesota MnDOT Household Goods Mover Permit research. Not a ranking.',
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Minnesota research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Minnesota · household-goods moving research</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{s.publication.h1}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          The Minnesota Department of Transportation (MnDOT) issues the Household Goods Mover Permit for moves within
          Minnesota. Moves that cross a state line are FMCSA interstate moves. A Minnesota permit is not a USDOT or MC
          number. This page is not a Trust Score and not a ranking.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold">Statewide</p>
          <p className="mt-1 text-sm font-medium">Household Goods Mover Permit authority</p>
          <p className="mt-1 text-xs text-muted-foreground">Minn. Stat. 221.121 (2025). Renewed annually with vehicle registration.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold">Form E + Form H</p>
          <p className="mt-1 text-sm font-medium">Insurance filed with MnDOT before moving</p>
          <p className="mt-1 text-xs text-muted-foreground">Liability and property damage (Form E) and $50,000 cargo (Form H).</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-2xl font-semibold">No public roster</p>
          <p className="mt-1 text-sm font-medium">Verify one carrier at a time</p>
          <p className="mt-1 text-xs text-muted-foreground">
            MnDOT&apos;s Carrier Search shows a carrier&apos;s authority types and status. There is no permit count here; missing is
            not zero.
          </p>
        </div>
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Minnesota Household Goods Mover Permit</h2>
        <p>
          {f.definition} Under Minnesota Statutes section 221.121, a person who wants to operate as a household goods carrier
          applies to the commissioner; MnDOT issues the permit to an applicant that files a complying application, pays the
          $150 fee and meets the insurance requirements, and does not issue one to an applicant with an unsatisfactory safety
          rating. MnDOT says: &quot;{f.no_operation_before_permit_mndot}&quot; Apply through MnDOT&apos;s{' '}
          <Official href={reg.household_goods_page} label="household goods mover page" />.
        </p>
        <p>
          A permit is effective for 12 months and is renewed each year by registering the vehicles operated under it ($75 per
          vehicle, with an identification card for each). The permit, the annual renewal, vehicle registration, continuous
          insurance and the safety rating are separate requirements; MnDOT does not publish one combined license status, and
          this page does not invent one.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Statewide operating authority</h2>
        <p>
          &quot;{f.statewide}&quot; That means permit authority covers all of Minnesota. It does not mean the carrier is
          headquartered in Minnesota, serves every move, holds interstate authority, or is recommended.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Minnesota permit vs USDOT and MC</h2>
        <p>
          MnDOT&apos;s steps include getting a USDOT number from FMCSA; there are intrastate and interstate USDOT numbers. A USDOT
          number is a federal identifier, not the Minnesota permit. An MC number is federal interstate authority and is not
          required for a move that stays in Minnesota. MnDOT&apos;s Carrier Search prints a carrier&apos;s MnDOT # and USDOT #
          together, but this page holds no Minnesota permit roster, so no Minnesota permit is linked to a USDOT or MC record
          here (0 exact bridges, which is not zero overlap), and nothing is matched by name.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Insurance requirements</h2>
        <p>{s.insurance.filing}</p>
        <ul className="list-disc pl-5">
          {s.insurance.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
        <p>
          Minnesota law also requires the cargo insurance or bond of $50,000 to be filed with MnDOT and kept continuously in
          effect; failing to keep insurance on file suspends the permit. Having insurance on file is a legal requirement, not a
          measure of quality.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Rates and shipment records</h2>
        <p>
          Every household goods mover must keep its own tariff showing rates and charges (section 221.161), keep its effective
          tariffs open for public inspection at its place of business, and provide copies on request. It must not charge more,
          less or differently than its tariff (section 221.171). MnDOT does not publish a tariff library, so no tariffs are
          collected here. A tariff is not a quote, and there is no statewide Minnesota moving price.
        </p>
        <p>
          The mover must keep a record of each shipment, such as a bill of lading or freight bill, showing the parties, date,
          origin and destination, a description of the goods, the weight or volume if used for the rate, the exact rates, the
          total charges including special services, and each participating carrier, and keep it for at least three years
          (section 221.172). A shipment record, a tariff and a quote are three different things.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Complaints and compliance</h2>
        <p>
          MnDOT takes complaints about for-hire motor carriers through its{' '}
          <Official href={reg.complaint_form} label="motor carrier complaint form" /> (
          <Official href={reg.complaint_page} label="complaint page" />
          ). Moves across state lines go to FMCSA (<Official href={reg.fmcsa_complaints} label="FMCSA complaints" />). MnDOT can
          order violations corrected and assess administrative penalties of up to $5,000 per audit or investigation, and a
          permit is suspended without a hearing if insurance lapses, renewal or vehicle fees go unpaid, or a penalty is not
          paid. Company-level complaint records and enforcement actions are not published in bulk, so no counts are shown. A
          complaint is not a finding, and nothing is matched to a company by name.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Check a mover</h2>
        <p>
          Use MnDOT&apos;s <Official href={reg.carrier_search_url} label="Carrier Search" /> with a MnDOT #, USDOT # or company
          name; the carrier&apos;s page lists each authority type (for example Household Goods), its status and the status
          date. For interstate authority, search the federal record, for example{' '}
          <Link href={ask('Find USDOT 3244649')} className="font-medium underline underline-offset-2">
            Find USDOT 3244649
          </Link>
          .
        </p>

        <h2 className="text-lg font-semibold text-foreground">Federal overlay</h2>
        <p>
          MoveTrustHub&apos;s federal research lists {fed.interstate_hhg_carriers_headquartered_mn} interstate household-goods
          carriers with a Minnesota headquarters address (observed {fed.observedAt.slice(0, 10)}). A Minnesota address is not a
          Minnesota permit and not a service area, and those carriers are not added to any Minnesota permit count.{' '}
          <Link href={ask('interstate household goods carriers headquartered in Minnesota')} className="font-medium underline underline-offset-2">
            See them in federal research
          </Link>
          .
        </p>

        <h2 className="text-lg font-semibold text-foreground">What this page does not mean</h2>
        <ul className="list-disc pl-5">
          <li>No count of Minnesota permit holders: MnDOT publishes no roster, and missing is not zero.</li>
          <li>No combined Minnesota permit plus FMCSA mover count.</li>
          <li>No statewide Minnesota moving price. A tariff is not a quote.</li>
          <li>No Trust Score, ranking or recommendation.</li>
          <li>No Minneapolis, St. Paul, Rochester, Duluth, Bloomington, county or city moving-intelligence page.</li>
        </ul>
        <p>
          Law cited from the 2025 Minnesota Statutes; MnDOT pages retrieved {s.retrievedAt}. Snapshot {s.version}.
        </p>
      </section>
    </main>
  );
}
