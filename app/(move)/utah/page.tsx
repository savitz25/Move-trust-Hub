import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { UTAH_MOVE_SNAPSHOT as s } from '@/lib/utah-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Utah Moving Authority and Household-Goods Evidence | MoveTrustHub',
    description:
      'Utah does not publish a mover-specific household-goods license roster. Separate UDOT intrastate safety and vehicle rules, FMCSA interstate authority, USDOT, UCR, insurance, and local business requirements.',
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

export default function UtahMovePage() {
  return (
    <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Utah mover authority and household-goods evidence',
            url: `${SITE_URL}${s.route}`,
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Utah research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Utah · UDOT Motor Carrier Division</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Utah mover authority and household-goods evidence</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          We found no distinct Utah household-goods mover certificate or statewide mover-license roster in the reviewed UDOT sources. Utah intrastate motor-carrier safety rules and vehicle registration still apply in their own scope; neither is a mover-specific license census. We do not substitute Utah-address FMCSA carriers for one.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Utah mover evidence status">
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Mover-specific state roster</p>
          <p className="mt-1 text-sm font-medium">NOT_ACQUIRED · no distinct roster identified</p>
          <p className="mt-1 text-xs text-muted-foreground">No statewide HHG license count or company rows are published here.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Intrastate motor-carrier rules</p>
          <p className="mt-1 text-sm font-medium">Utah Code Title 72, Chapter 9</p>
          <p className="mt-1 text-xs text-muted-foreground">A vehicle-safety and operating scope; its covered vehicle classes are not every mover.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-lg font-semibold">Interstate household-goods authority</p>
          <p className="mt-1 text-sm font-medium">FMCSA · separate federal authority</p>
          <p className="mt-1 text-xs text-muted-foreground">Crossing a state line does not turn a Utah state registration into federal authority.</p>
        </div>
      </section>

      <section className="mt-8 max-w-4xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">Utah intrastate motor-carrier rules</h2>
        <p>
          The <Official href={s.links.utahCode}>current Utah Code §72-9-102</Official> defines which vehicles are “intrastate commercial vehicles” for the Motor Carrier Safety Act. Among its tests, a vehicle carrying property only within Utah can qualify at 26,001 pounds or more GVWR/GW/GCWR/GCW when operated by an adult. The statute has separate provisions for younger drivers, passenger vehicles, and placarded hazardous materials. UDOT says covered intrastate operations must comply with applicable federal safety rules as adopted by Utah, plus state and local requirements. These are vehicle safety and compliance rules, not an HHG company certificate roster.
        </p>
        <p>
          UDOT&apos;s <Official href={s.links.intrastateVehicleRegistration}>Utah intrastate registration page</Official> describes vehicle registration and refers registration questions to DMV. Vehicle plate or weight registration is not motor-carrier operating authority. UDOT&apos;s <Official href={s.links.operatingAuthority}>operating-authority page</Official> explains the FMCSA process for interstate operations; it does not publish a Utah intrastate household-goods authority list.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Keep the credentials separate</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Intrastate Utah move:</strong> apply the Utah Motor Carrier Safety Act only when the vehicle and operation meet its definitions; check ordinary vehicle registration separately.</li>
          <li><strong className="text-foreground">Interstate household-goods move:</strong> verify the company&apos;s active FMCSA household-goods authority and consumer disclosures through <Official href={s.links.fmcsaProtect}>FMCSA Protect Your Move</Official> and its <Official href={s.links.fmcsaSafer}>SAFER system</Official>.</li>
          <li><strong className="text-foreground">USDOT:</strong> carrier identity and safety-registration number, not by itself operating authority or a Utah household-goods license. See <Official href={s.links.usdot}>UDOT&apos;s USDOT/FMCSA guidance</Official>.</li>
          <li><strong className="text-foreground">UCR:</strong> a separate federal-state registration program for carriers in its covered interstate or international scope; it is not a Utah intrastate HHG credential. See the <Official href={s.links.ucr}>UCR program</Official>.</li>
          <li><strong className="text-foreground">Insurance:</strong> separate from a license or authority. Federal interstate filing rules and any Utah vehicle or business coverage obligations have their own scope; verify directly with the regulator and insurer. <Official href={s.links.insurance}>UDOT insurance and MCS-90 guidance</Official>.</li>
          <li><strong className="text-foreground">Business registration and local licenses:</strong> a Utah entity record or city business license does not establish motor-carrier or FMCSA authority. Start with <Official href={s.links.utahBusinessSearch}>Utah&apos;s business search</Official> and the relevant local government.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Existing Utah directory data and coverage</h2>
        <p>
          MoveTrustHub already has {s.existingCountyGuides} Utah county planning guides and {s.existingLocalDirectoryRecords} Utah local mover catalog records. These are directory content, not a state license or authority roster, and none were reloaded or represented as licensed by this research. No regulator population was acquired: raw roster rows {s.sourceRowsAcquired}; source observations counted {s.observations}; existing authority-entity matches <strong>NOT_ACQUIRED</strong>; net-new canonical entities {s.netNewEntities}; evidence attachments {s.evidenceAttachments}; graph writes {s.graphWrites}.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>UDOT and Utah Code pages reviewed {s.reviewedAt.slice(0, 10)}. The Code source is effective May 6, 2026; UDOT web pages do not print a dataset-wide roster clock.</li>
          <li>FMCSA interstate household-goods authority, USDOT, UCR, insurance, vehicle registration, intrastate safety regulation, and local business requirements are distinct records or obligations.</li>
          <li>No Utah-address FMCSA carrier count is presented as a state mover-license census. An application, registration, complaint, or address is not proof of operating authority.</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Official sources</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li><Official href={s.links.udotCarrierOverview}>UDOT Motor Carrier Division</Official></li>
          <li><Official href={s.links.udotMotorCarrierDecision}>UDOT: Are you a motor carrier?</Official></li>
          <li><Official href={s.links.utahCode}>Utah Code §72-9-102, effective May 6, 2026</Official></li>
          <li><Official href={s.links.intrastateVehicleRegistration}>UDOT Utah intrastate vehicle registration</Official></li>
          <li><Official href={s.links.operatingAuthority}>UDOT motor-carrier operating authority</Official></li>
        </ul>
      </section>
    <StateCountyLinks stateSlug="utah" stateName="Utah" />
    </main>
  );
}
