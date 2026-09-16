import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import type { OregonMoveIntelligencePayload } from '@/lib/oregon-intelligence/load';
import { fmtInt } from '@/lib/oregon-intelligence/snapshot';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

function Trace({
  source,
  date,
  grain,
  coverage,
  calculation,
  caveat,
}: {
  source: string;
  date: string;
  grain: string;
  coverage: string;
  calculation: string;
  caveat: string;
}) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer font-medium text-foreground">Trace this number</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Source: {source}</li>
        <li>Source date: {date}</li>
        <li>Grain: {grain}</li>
        <li>Coverage: {coverage}</li>
        <li>Calculation: {calculation}</li>
        <li>Caveat: {caveat}</li>
      </ul>
    </details>
  );
}

export function OregonMoveIntelligence({ payload }: { payload: OregonMoveIntelligencePayload }) {
  const s = payload.snapshot;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: s.publication.h1,
            description:
              'Oregon ODOT CCD household-goods certificates of authority, local cartage versus other-than-local service, and FMCSA interstate overlay. Not a ranking.',
            url: `${SITE_URL}/oregon`,
            about: 'Oregon household-goods moving authority. Not a ranking.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Oregon research', item: `${SITE_URL}/oregon` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Oregon research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Oregon · household-goods moving research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Oregon Household-Goods Mover Authority Research
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          The Oregon Department of Transportation Commerce and Compliance Division issues a certificate of
          authority for for-hire household-goods transportation between points in Oregon. An Oregon certificate
          is not a USDOT number, not an MC number, and not FMCSA interstate operating authority. Certificate
          authority may be limited to local cartage, named cities or counties, or other-than-local service. This
          page does not rank movers and does not publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Authorized HHG list rows
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{fmtInt(s.current_hhg_roster.rows)}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Official ODOT CCD authorized-movers list. A row is not a unique company.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Distinct certificate IDs
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.current_hhg_roster.distinctAuthorityIds)}
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Source-native Oregon certificate numbers. Not USDOT. Not MC.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Local cartage rows
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.authority_classes.OR_LOCAL_CARTAGE_ROWS)}
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Service attribute on the same list. Not extra movers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Other-than-local rows
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {fmtInt(s.authority_classes.OR_OTHER_THAN_LOCAL_ROWS)}
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Not added to local cartage. Not a statewide-mover total.
            </p>
          </div>
        </dl>
        <Trace
          source="ODOT CCD Household Goods Movers List (SharePoint REST, list GUID cee52e55-c4c8-4df4-a679-54301fb8bf08)"
          date={`sourceUpdatedAt ${s.clocks.hhg_roster.sourceUpdatedAt}; sourceAsOf not published; retrievedAt ${s.clocks.hhg_roster.retrievedAt}`}
          grain="authorized household-goods list row / distinct Oregon certificate number"
          coverage="ACQUIRED_CURRENT_SNAPSHOT for the public authorized list. Complaints REQUEST_ONLY. Enforcement NOT_ACQUIRED."
          calculation={`${fmtInt(s.current_hhg_roster.rows)} list rows and ${fmtInt(s.current_hhg_roster.distinctAuthorityIds)} distinct certificate numbers. Local cartage ${fmtInt(s.authority_classes.OR_LOCAL_CARTAGE_ROWS)} and other-than-local ${fmtInt(s.authority_classes.OR_OTHER_THAN_LOCAL_ROWS)} overlap and are not summed.`}
          caveat="An Oregon certificate is not USDOT, not MC, and not proof the mover may serve every Oregon point. Missing complaints or enforcement is not a clean history."
        />
      </header>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Oregon household-goods authority</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Intrastate for-hire household-goods transportation between Oregon points requires an ODOT CCD
          certificate of authority under {s.regulator.statute}. Ask the mover for its Oregon certificate number
          and confirm it on the official authorized-movers list. A certificate row is not a unique company. A
          certificate is not statewide service territory. Local cartage is not other-than-local authority.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.roster_url}>
            Official authorized household-goods movers list
          </a>
          {' · '}
          <a className="underline" href={s.regulator.hhg_url}>
            Household goods moving information
          </a>
          {' · '}
          <a className="underline" href={s.regulator.application_url}>
            Certificate application
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Authority and service-class distinctions</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The official list prints authorized-service prose, not a coded statewide flag. Typical source-native
          language includes local cartage inside named cities or commercial zones, other-than-local cartage that
          may be unrestricted or county-limited, and occasional specialized or government-contract restrictions.
          {fmtInt(s.authority_classes.OR_OTHER_THAN_LOCAL_UNRESTRICTED_ROWS)} other-than-local rows use
          unrestricted statewide language; that is still not a combined Oregon-movers total.{' '}
          {fmtInt(s.authority_classes.OR_SPECIALIZED_HHG_ROWS)} authorized-list rows are piano/specialty named
          in the source. Pack-and-loader labor-only businesses that do not provide the moving vehicle are not
          Oregon certificated household-goods carriers.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Federal USDOT / FMCSA context</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Interstate household-goods moves use FMCSA operating authority. A USDOT number alone is not active
          interstate household-goods authority. An Oregon headquarters on a federal profile is geography, not
          ODOT authority. The official Oregon authorized list does not print USDOT or MC numbers. Exact
          state-to-USDOT crosswalks in this ticket: 0. Exact state-to-MC crosswalks: 0. Name-only matching is
          unsafe.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href="/verify-dot">
            Verify DOT
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Complaints</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          File Oregon intrastate household-goods complaints with ODOT CCD using form 9976 (
          {s.regulator.complaint_email} / {s.regulator.complaint_phone}). A complaint intake form proves a
          process exists. It does not prove a public complaint-matter dataset exists. No mover-level Oregon
          complaint universe was acquired. A complaint is not a violation, not a disciplinary action, and not
          quality. Missing bulk complaints is not zero complaints. Federal FMCSA complaints are not a substitute
          for Oregon intrastate complaints.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.complaint_form_url}>
            Intrastate Household Goods Complaint (form 9976)
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Enforcement / adverse evidence</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Oregon strengthened unauthorized household-goods enforcement effective January 1, 2026 (SB 839 and OAR
          740-300-0035). That framework is present. It is not a disciplinary record. No bounded official Final
          Order or civil-penalty docket was acquired. Press-named operations are not attached by company name.
          Proposed penalty is not a Final Order. Suspension is not cancellation. Oregon enforcement is not FMCSA
          out-of-service. Missing adverse evidence is not a clean history.
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">Insurance and tariff context</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Oregon HHG certificates are conditioned on required insurance filings, including cargo coverage. An
          insurance requirement is not proof of current coverage. A historical filing is not current insurance.
          FMCSA insurance is not Oregon authority. ODOT also regulates intrastate rates; a tariff filing is not
          active household-goods authority and is not a quality signal. Current insurance status is official
          search, not a bulk extract.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.insurance_url}>
            ODOT insurance requirements
          </a>
        </p>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">How to verify an Oregon mover</h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Ask for the Oregon household-goods certificate number.</li>
          <li>Confirm the name and authorized-service text on the official ODOT CCD list.</li>
          <li>Read whether authority is local cartage, other-than-local, unrestricted, or restricted.</li>
          <li>Use FMCSA / Verify DOT when the move crosses a state line.</li>
          <li>File Oregon complaints with form 9976; file interstate complaints with FMCSA.</li>
        </ul>
      </section>

      <section className="border-b border-border py-10">
        <h2 className="text-xl font-semibold">What this evidence means</h2>
        <ul className="mt-3 max-w-3xl list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>There is no combined “Oregon movers” total across incompatible grains.</li>
          <li>An Oregon certificate is not a USDOT number and not an MC number.</li>
          <li>Oregon authority may be territory- or service-restricted.</li>
          <li>Complaint is not a violation. Missing complaints is not zero complaints.</li>
          <li>Missing adverse evidence is not a clean history.</li>
          <li>Federal safety evidence is not Oregon disciplinary action.</li>
          <li>Portland and Multnomah County are not separate MoveTrustHub intelligence routes in this ticket.</li>
          <li>No Trust Score. No ranking. No star-rating schema.</li>
        </ul>
      </section>

      <section className="py-10">
        <h2 className="text-xl font-semibold">Coverage / gaps</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The authorized household-goods list was acquired as a current snapshot. Oregon complaint observations
          and enforcement-matter rows were not acquired as bulk tables. Official verification remains the ODOT CCD
          authorized-movers list and CCD complaint/enforcement process. This ticket does not create Oregon city or
          county intelligence pages.
        </p>
        <p className="mt-3 text-sm">
          <a className="underline" href={s.regulator.bulletin_url}>
            General Information Bulletin for Moving Household Goods in Oregon (form 9943)
          </a>
        </p>
      </section>
    </main>
  );
}
