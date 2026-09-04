import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { TexasMoveIntelligencePayload } from '@/lib/texas-intelligence/load';
import { formatIntelNumber } from './format';

function Trace({
  source,
  date,
  grain,
  coverage,
  numerator,
  denominator,
  calculation,
  caveat,
}: {
  source: string;
  date: string;
  grain: string;
  coverage: string;
  numerator?: string;
  denominator?: string;
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
        {numerator ? <li>Numerator: {numerator}</li> : null}
        {denominator ? <li>Denominator: {denominator}</li> : null}
        <li>Calculation: {calculation}</li>
        <li>Caveat: {caveat}</li>
      </ul>
    </details>
  );
}

export function TexasMoveIntelligence({ payload }: { payload: TexasMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const federalDisplay = formatIntelNumber(payload.federalHqPublishable, payload.federalTimedOut);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Texas Moving & Household-Goods Intelligence',
            description:
              'TxDMV household-goods certificates, FMCSA interstate records with a Texas HQ location, Form E / Form H&I insurance-filing lookup, and official consumer rules. Not a ranking.',
            url: `${SITE_URL}/texas`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Texas research', item: `${SITE_URL}/texas` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Texas research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Texas · moving &amp; household-goods research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Texas Moving &amp; Household-Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Texas household-goods authority is a TxDMV certificate of registration, separate from FMCSA
          interstate authority. This page organizes official verification paths, insurance-filing
          semantics, and consumer rules. It does not rank movers and does not publish a Trust Score.
          The complete Texas licensed-mover count is unknown — not zero.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Universe</dt>
            <dd className="mt-1 text-2xl font-semibold">Unknown</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Texas household-goods roster is search-only — not zero
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{federalDisplay}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              FMCSA interstate records with a Texas business/HQ location — not Texas licenses
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Insurance filing</dt>
            <dd className="mt-1 text-2xl font-semibold">Lookup</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Official Truck Stop / TxMCCS can show current Form E and Form H&amp;I for a looked-up record
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Consumer rules</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.consumer_rules.as_of}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Official TxDMV household-goods consumer source clock</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">As-of</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.as_of}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Publication snapshot, not live licensing</p>
          </div>
        </dl>
        <Trace
          source="MoveTrustHub publishable FMCSA-keyed companies with headquarters matching %, TX%"
          date="live directory when available"
          grain="publishable company profile with Texas HQ — not a TxDMV certificate"
          coverage="EXISTING_GRAPH / LIVE_DIRECTORY_WHEN_AVAILABLE"
          numerator="count of publication_state = PUBLISHABLE rows whose headquarters ILIKE %, TX%"
          denominator="that MoveTrustHub FMCSA graph — not Texas licensed movers"
          calculation="Exact headquarters-state overlay. Timed-out or unavailable counts display as an em dash, not zero."
          caveat="FMCSA ACTIVE is not Texas intrastate authorized. A USDOT number is not interstate operating authority by itself."
        />
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Who regulates Texas household-goods movers?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The current regulator is the <strong>Texas Department of Motor Vehicles</strong>, Motor
            Carrier Division. The credential is a <strong>TxDMV motor carrier certificate of
            registration</strong> (TxDMV No.). Household-goods movers must register regardless of
            vehicle weight. A historical “TxDOT number” is not the current program name. TxDMV
            certificate is not a USDOT number.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.regulator.home_url} rel="noopener noreferrer" target="_blank">
              TxDMV Motor Carriers
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.regulator.verification_url} rel="noopener noreferrer" target="_blank">
              TxMCCS Truck Stop lookup
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What should I verify?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This is research guidance, not legal advice. Keep Texas intrastate authority and federal
            interstate authority separate.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move entirely within Texas.</strong> A TxDMV household-goods certificate is
              central. Official consumer page: an Active certificate status means the mover is
              licensed with TxDMV. A USDOT number does not by itself prove Texas intrastate
              household-goods authority. Verify on{' '}
              <a className="underline underline-offset-2" href={s.verify.txmccs} rel="noopener noreferrer" target="_blank">
                TxMCCS / Truck Stop
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move Texas → another state, or another state → Texas.</strong> FMCSA
              interstate operating authority (an MC number) is central. Official TxDMV guidance:
              having one authority does not authorize the other. Verify USDOT and operating
              authority on{' '}
              <Link href={s.verify.movetrusthub_verify_dot} className="underline underline-offset-2">
                MoveTrustHub Verify DOT
              </Link>
              {' '}and{' '}
              <a className="underline underline-offset-2" href={s.verify.protect_your_move} rel="noopener noreferrer" target="_blank">
                protectyourmove.gov
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Texas carrier with a USDOT but no confirmed Texas certificate.</strong> A USDOT
              number is not a TxDMV certificate and is not interstate operating authority by itself.
              Texas household-goods registration also requires a valid USDOT number, but that does
              not replace the TxDMV certificate.
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Texas certificate with no confirmed federal interstate authority.</strong> A
              TxDMV certificate does not prove the carrier may haul household goods across a state
              line. Confirm FMCSA operating authority separately.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Market findings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {s.findings.map((f) => (
              <li key={f.id}>{f.text}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Find movers — keep the universes separate</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Research Texas intrastate authority</h3>
              <p className="mt-2 text-muted-foreground">
                TxDMV household-goods certificates. Search-only. Complete licensed-mover count is
                unknown.
              </p>
              <p className="mt-3">
                <a className="underline underline-offset-2" href={s.verify.txmccs} rel="noopener noreferrer" target="_blank">
                  Verify a TxDMV number on Truck Stop / TxMCCS
                </a>
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Research federal interstate authority</h3>
              <p className="mt-2 text-muted-foreground">
                FMCSA interstate records with a Texas business/HQ location. Not Texas licenses.
              </p>
              <p className="mt-3">
                <Link href={s.federal.directory_href} className="underline underline-offset-2">
                  MoveTrustHub federal company search (TX HQ)
                </Link>
                {' · '}
                <Link href={s.federal.verify_href} className="underline underline-offset-2">
                  Verify DOT
                </Link>
              </p>
            </article>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Never combine the two as one “verified mover” result. Name-only matching is unsafe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What does a TxDMV number prove?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A TxDMV certificate number identifies Texas motor-carrier registration. For household
            goods, official consumer materials say an <strong>Active</strong> certificate status
            means the mover is licensed with TxDMV. It does not prove FMCSA interstate operating
            authority, service quality, or a current insurance filing unless the official lookup
            record shows that filing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What does a USDOT number prove?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A USDOT number is a federal census/identity number. Official TxDMV household-goods
            registration also requires a valid USDOT number, but a USDOT number is not interstate
            operating authority by itself and is not a Texas household-goods certificate. Confirm
            operating authority separately on FMCSA SAFER / Verify DOT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Insurance filing information</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Household-goods carriers must have <strong>Form E</strong> (liability) and{' '}
            <strong>Form H&amp;I</strong> (cargo) filed electronically by the insurer before a
            certificate is granted. Official TxDMV guidance: Truck Stop publishes insurance data so
            anyone can look up whether a company&apos;s filings are current. That is
            record-specific. A certificate is not an “insured” badge on this page. Form E / H&amp;I
            is not a quality signal. Bulk current-filing universe: not acquired.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Official minima (Form 1899H / Motor Carrier Handbook): liability {s.insurance.liability_minimums}.
            Cargo: {s.insurance.cargo_minimums}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What state roster information is not in bulk?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage {s.authority.roster_coverage}. No official CSV, open API, or downloadable
            household-goods carrier roster was acquired. TxMCCS search results were not scraped. The
            licensed-mover denominator is UNKNOWN, not zero.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Consumer protections</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.consumer_rules.source_clock}. A tariff is not an actual invoice and not a quality
            score. This page does not calculate mover quotes.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.consumer_rules.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.verify.consumer} rel="noopener noreferrer" target="_blank">
              Don&apos;t Make a Move Without Us
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Complaints and enforcement</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage {s.complaints.coverage}. No bulk complaint report was acquired. A complaint is
            not a violation. No complaint found is not a clean record. TxDMV does not settle
            loss/damage claims. CES contains complaints filed after September 1, 2008.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            State enforcement bulk case roster: {s.enforcement.coverage}. The official Motor Carrier
            Disciplinary Matrix is a sanction schedule, not a list of orders. Adverse profile
            attachment requires an exact TxDMV or USDOT identifier. Name-only is unsafe. Attachments
            in this snapshot: {s.enforcement.profile_attachments}.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.complaints.path} rel="noopener noreferrer" target="_blank">
              TxDMV Complaint Management System
            </a>
            {' · helpline '}
            {s.complaints.helpline}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Tow-company data is a separate family</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.tow.note} ATH-TX-001 counted {s.tow.count_from_ath_tx_001.toLocaleString('en-US')}{' '}
            TDLR TowCompanies rows. Those rows are not used in the household-goods hero and are not
            a mover denominator.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Evidence depth</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-3 font-medium">Family</th>
                  <th className="py-2 pr-3 font-medium">Access</th>
                  <th className="py-2 font-medium">Limitation</th>
                </tr>
              </thead>
              <tbody>
                {s.evidence_depth.map((row) => (
                  <tr key={row.family} className="border-b border-border align-top">
                    <td className="py-2 pr-3">{row.family}</td>
                    <td className="py-2 pr-3">{row.access_class}</td>
                    <td className="py-2">{row.limitations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What we don&apos;t yet know</h2>
          <p className="mt-2 text-sm">Missing is not zero.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.coverage_gaps.map((g) => (
              <li key={g.id}>
                {g.label}: {g.state}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Semantic rules</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.semantics.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">No Trust Score. No paid ranking.</p>
        </section>
      </div>
    </main>
  );
}
