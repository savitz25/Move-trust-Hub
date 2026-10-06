import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { WEST_VIRGINIA_MOVE_SNAPSHOT as s } from '@/lib/west-virginia-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'West Virginia Household-Goods Mover Evidence | MoveTrustHub',
    description:
      'No current West Virginia household-goods certificate roster was acquired. An application, a tariff, and an insurance requirement are not issued authority. FMCSA interstate authority stays separate.',
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

export default function WestVirginiaMovePage() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'West Virginia household-goods mover evidence',
            url: `${SITE_URL}${s.route}`,
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'West Virginia research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">West Virginia · household-goods evidence</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">West Virginia household-goods mover evidence</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          A current statewide household-goods certificate roster was NOT_ACQUIRED. Missing is not zero. This page does not publish a mover count, and it does not substitute FMCSA interstate authority, USDOT numbers, or UCR registrations for one.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="West Virginia mover evidence status">
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Household-goods certificates</p>
          <p className="mt-1 text-sm font-medium">{s.hhgRoster}</p>
          <p className="mt-1 text-xs text-muted-foreground">No company count is published. An application is not issued authority.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Tariff and insurance</p>
          <p className="mt-1 text-sm font-medium">Separate from a certificate</p>
          <p className="mt-1 text-xs text-muted-foreground">A tariff is not current authority. An insurance requirement is not observed coverage.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Interstate household goods</p>
          <p className="mt-1 text-sm font-medium">FMCSA · separate federal authority</p>
          <p className="mt-1 text-xs text-muted-foreground">Federal authority is not a West Virginia household-goods certificate.</p>
        </div>
      </section>

      <section className="mt-8 max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">The certificate search was not a roster</h2>
        <p>
          The {s.regulator} is the regulator for state motor-carrier certificates and permits. Household-goods authority is its own grain. The <Official href={s.certificateSearchUrl}>motor-carrier certificate search</Official> was not acquired as a current certificate population. A clean current household-goods roster was not published from a historical docket. Missing is not zero, and no mover count is published.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Keep the records separate</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Household-goods certificate:</strong> not acquired as a current roster.</li>
          <li><strong className="text-foreground">Contract-carrier permit:</strong> a different authority grain. It was not acquired as a roster.</li>
          <li><strong className="text-foreground">Application:</strong> not issued authority. The <Official href={s.rulesUrl}>motor carrier rules</Official> were not used to invent a roster.</li>
          <li><strong className="text-foreground">Tariff:</strong> not proof of current authority unless a source establishes that relationship. A tariff corpus was NOT_ACQUIRED.</li>
          <li><strong className="text-foreground">Form E:</strong> insurance filing observations were {s.formEObservations}. An insurance requirement is not observed coverage.</li>
          <li><strong className="text-foreground">UCR:</strong> a separate compliance program. See the <Official href={s.ucrUrl}>UCR program</Official>. It is not household-goods authority.</li>
          <li><strong className="text-foreground">USDOT and FMCSA:</strong> federal identity and interstate authority. See <Official href={s.protectYourMoveUrl}>Protect Your Move</Official>. Exact USDOT bridges were {s.usdotBridges}. Neither is a West Virginia certificate.</li>
          <li><strong className="text-foreground">PSC orders, suspension, and revocation:</strong> {s.pscOrders}. No provider-level order was joined by name.</li>
          <li><strong className="text-foreground">Local pages:</strong> Charleston, Morgantown, and Huntington are geography only. This page publishes no city route.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">What this research did not write</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name-only joins: {s.nameOnlyJoins}. Graph writes: {s.graphWrites}. New canonical organizations: {s.newCanonicalOrganizations}.</li>
          <li>No ranking and no combined mover count are published from these sources.</li>
        </ul>
      </section>
    </main>
  );
}
