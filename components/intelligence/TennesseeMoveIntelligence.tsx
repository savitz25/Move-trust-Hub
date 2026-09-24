import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { TennesseeMoveSnapshot } from '@/lib/tennessee-intelligence/snapshot';
import { TN_CONSUMER_COMPLAINT, TN_REVENUE_INTRASTATE, TN_RULES_1340_06_01 } from '@/lib/tennessee-intelligence/publication';
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

function Tile({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function TennesseeMoveIntelligence({ payload }: { payload: { snapshot: TennesseeMoveSnapshot } }) {
  const s = payload.snapshot;
  const limits = s.rules.intrastate_cargo_liability_limits;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            url: `${SITE_URL}/tennessee`,
            description: 'Tennessee Intrastate Authority for household-goods movers and current motor-carrier rules. Not a ranking.',
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tennessee research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Tennessee · household-goods moving research</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{s.publication.h1}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          A for-hire mover that carries household goods only inside Tennessee needs Tennessee Intrastate Authority from the
          Tennessee Department of Revenue. Moves that cross a state line are regulated by FMCSA. Tennessee Intrastate
          Authority is not a USDOT or MC number. This is not a ranking or a Trust Score.
        </p>
      </header>
      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          value="Not published"
          label="Public Intrastate Authority roster"
          hint="Tennessee offers no public carrier list or search. Missing is not zero, and a Tennessee address is not state authority."
        />
        <Tile
          value="Form H"
          label="Cargo insurance for household goods"
          hint="Revenue requires Form H cargo insurance from carriers hauling general freight, household goods or mobile homes."
        />
        <Tile
          value={`${limits.per_vehicle} / ${limits.any_one_time_and_place}`}
          label="Minimum intrastate cargo liability"
          hint="Per motor vehicle / any one time and place, for intrastate motor common carriers (rule 1340-06-01-.03)."
        />
        <Tile
          value="Repealed"
          label="Household-goods estimate and claims rule"
          hint={`Former rule 1340-06-01-.13 was repealed effective ${s.rules.effective}. It is not a current protection.`}
        />
      </section>
      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Tennessee Intrastate Authority</h2>
        <p>
          The <Official href={TN_REVENUE_INTRASTATE} label="Tennessee Department of Revenue" /> says Intrastate Authority
          allows for-hire motor carriers to use Tennessee public highways to carry persons or property in intrastate
          commerce. Carriers apply and renew through the Tennessee Taxpayer Access Point (TNTAP) or on paper. A new
          applicant files the Intrastate Authority application, a Designated Agent for Service of Process form, and proof
          of insurance: Form E for liability and Form H for cargo when hauling household goods.
        </p>
        <p>
          Tennessee does not publish a list of carriers holding Intrastate Authority, and TNTAP has no public carrier
          search, so this page cannot show how many movers hold it. The state application asks for a USDOT number, but the
          state authority is a separate credential and no public source pairs the two. Nothing here is matched by name to
          federal records.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Current rules and what changed</h2>
        <p>
          Tennessee&apos;s motor-carrier rules are{' '}
          <Official href={TN_RULES_1340_06_01} label={`Chapter 1340-06-01 (${s.rules.revision})`} />, effective{' '}
          {s.rules.effective}. They require insurance to be filed and set minimum limits, including cargo liability of{' '}
          {limits.per_vehicle} per vehicle and {limits.any_one_time_and_place} at any one time and place for intrastate
          motor common carriers.
        </p>
        <p>
          The earlier version of the chapter had a household-goods rule on estimates, weights and loss or damage claims,
          and rules requiring tariffs to be kept open for public inspection and charges to match the filed tariff. Those
          rules were repealed effective {s.rules.effective} and are not in the current text, so this page does not
          present them as current consumer protections. No Tennessee tariff index was found. A tariff is not a quote,
          and there is no statewide moving price.
        </p>
        <h2 className="text-lg font-semibold text-foreground">Interstate moves</h2>
        <p>
          A move from Tennessee to another state is interstate. FMCSA regulates it, and the USDOT and MC numbers identify
          the carrier. For interstate authority, search the USDOT number, for example{' '}
          <Link href={ask('Find USDOT 3244649')} className="font-medium underline underline-offset-2">
            Find USDOT 3244649
          </Link>
          .
        </p>
        <h2 className="text-lg font-semibold text-foreground">Complaints</h2>
        <p>
          The <Official href={TN_CONSUMER_COMPLAINT} label="Division of Consumer Affairs" /> in the Tennessee Attorney
          General&apos;s Office takes consumer complaints and forwards them to the business to try to reach a resolution. No
          public company-level complaint dataset was acquired. Complaint intake is not zero complaints, and a complaint is
          not a finding.
        </p>
        <p>No Nashville, Memphis, Knoxville, Chattanooga, county or city moving-intelligence page is part of this statewide record. Snapshot {s.version}.</p>
      </section>
    </main>
  );
}
