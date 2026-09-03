import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { CaliforniaMoveIntelligencePayload } from '@/lib/california-intelligence/load';
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

export function CaliforniaMoveIntelligence({ payload }: { payload: CaliforniaMoveIntelligencePayload }) {
  const s = payload.snapshot;
  const federalDisplay = formatIntelNumber(payload.federalHqPublishable, payload.federalTimedOut);
  const years = Object.entries(s.enforcement.year_counts);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'California Moving & Household-Goods Intelligence',
            description:
              'BHGS CAL-T household-mover authority, FMCSA interstate records with a California HQ location, max-rate tariff rules, and official citations. Not a ranking.',
            url: `${SITE_URL}/california`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'California research', item: `${SITE_URL}/california` },
            ],
          },
        ]}
      />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'California research' }]} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          California · moving &amp; household-goods research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          California Moving &amp; Household-Goods Intelligence
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Research current BHGS household-mover (CAL-T) authority, federal interstate carrier
          evidence with a California business/HQ location, official max-rate tariff rules, and
          BHGS citations. MoveTrustHub organizes evidence. It does not rank movers and does not
          publish a Trust Score.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Universe</dt>
            <dd className="mt-1 text-2xl font-semibold">Unknown</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Complete CAL-T roster is search-only — not zero
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{federalDisplay}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              FMCSA interstate records with a California business/HQ location — not California licenses
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Observations</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.enforcement.rows}</dd>
            <p className="mt-1 text-xs text-muted-foreground">
              Official BHGS table rows with violation section 19237
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Tariff / rate</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.tariff.effective}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Maximum Rate Tariff 4 effective date</p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-4 py-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">As-of</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.as_of}</dd>
            <p className="mt-1 text-xs text-muted-foreground">Publication snapshot, not live licensing</p>
          </div>
        </dl>
        <Trace
          source="Official BHGS citations HTML table, filtered to violation section 19237"
          date={s.as_of}
          grain="citation row"
          coverage="household-mover permit citations on the mixed BHGS table; other BHGS industries excluded"
          numerator={`${s.enforcement.rows} 19237 rows (${s.enforcement.unlicensed_rows} UNLICENSED, ${s.enforcement.exact_cal_t_rows} with CAL-T/T number)`}
          denominator="that official table — not every California moving action"
          calculation="Count table rows whose violation section contains 19237. CAL-T parsed from License # / CAL-T / T- prefixes."
          caveat="A citation is not a revocation. A listed fine amount is not confirmed paid. Name-only is UNSAFE for profile attach."
        />
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Who regulates California household-goods movers?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The current regulator is the <strong>Bureau of Household Goods and Services</strong> in
            the California Department of Consumer Affairs. The California Public Utilities Commission
            is <strong>not</strong> the current household-goods mover regulator; that authority
            transferred to BHGS. A Household Mover permit is identified by a <strong>CAL-T</strong>{' '}
            number. CAL-T is not a USDOT number.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.regulator.home_url} rel="noopener noreferrer" target="_blank">
              BHGS home
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.regulator.verification_url} rel="noopener noreferrer" target="_blank">
              Household Movers license search
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What authority do I need?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This is research guidance, not legal advice. Which credential matters depends on the move.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move within California.</strong> California state Household Mover (CAL-T)
              authority is central. A USDOT number does not by itself prove the mover can perform
              your California intrastate move. Verify on{' '}
              <a className="underline underline-offset-2" href={s.verify.bhgs_search} rel="noopener noreferrer" target="_blank">
                BHGS license search
              </a>
              .
            </li>
            <li className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <strong>Move into or out of California.</strong> FMCSA/USDOT interstate authority is
              central. A California mover permit does not by itself prove interstate authority.
              BHGS also has a separate Interstate Mover application for companies that only move
              into or out of California. Verify USDOT on{' '}
              <Link href={s.verify.movetrusthub_verify_dot} className="underline underline-offset-2">
                MoveTrustHub Verify DOT
              </Link>{' '}
              and{' '}
              <a className="underline underline-offset-2" href={s.verify.fmcsa_safer} rel="noopener noreferrer" target="_blank">
                FMCSA SAFER
              </a>
              .
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Mixed or edge cases exist (for example a company that does both). Do not merge state and
            federal results merely by business name.
          </p>
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
              <h3 className="font-semibold">Research California state authority</h3>
              <p className="mt-2 text-muted-foreground">
                CAL-T Household Mover permits. Search-only. Complete licensed-mover count is unknown.
              </p>
              <p className="mt-3">
                <a className="underline underline-offset-2" href={s.verify.bhgs_search} rel="noopener noreferrer" target="_blank">
                  Verify a CAL-T permit on BHGS
                </a>
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-relaxed">
              <h3 className="font-semibold">Research federal interstate authority</h3>
              <p className="mt-2 text-muted-foreground">
                FMCSA interstate records with a California business/HQ location. Not California licenses.
              </p>
              <p className="mt-3">
                <Link href={s.federal.directory_href} className="underline underline-offset-2">
                  MoveTrustHub federal company search (CA HQ)
                </Link>
                {' · '}
                <Link href={s.federal.verify_href} className="underline underline-offset-2">
                  Verify DOT
                </Link>
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">BHGS citations (household movers)</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.enforcement.rows} official table rows use violation section 19237.{' '}
            {s.enforcement.unlicensed_rows} are marked UNLICENSED. {s.enforcement.exact_cal_t_rows}{' '}
            carry a CAL-T/T number. Other BHGS industries on the same page are excluded. A citation
            is not a revocation. Name-only unlicensed rows are not attached to profiles.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {years.map(([year, count]) => (
              <li key={year} className="rounded-full border border-border px-3 py-1 tabular-nums">
                {year}: {count}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.verify.bhgs_enforcement} rel="noopener noreferrer" target="_blank">
              Official BHGS citations and disciplinary actions
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Tariff / rate / consumer rules</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {s.tariff.title}. A tariff is not an actual invoice and not a quality score.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {s.tariff.consumer_rules_from_official_pages.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.tariff.source} rel="noopener noreferrer" target="_blank">
              Maximum Rate Tariff PDF
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.verify.intrastate_tips} rel="noopener noreferrer" target="_blank">
              Tips for moves within California
            </a>
            {' · '}
            <a className="underline underline-offset-2" href={s.verify.interstate_tips} rel="noopener noreferrer" target="_blank">
              Tips for moves into and out of California
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Insurance / financial responsibility</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            BHGS permit applicants must file evidence of insurance. Official minima: {s.insurance.liability_minimums}.
            Cargo: {s.insurance.cargo_minimum}. Workers&apos; compensation when applicable. A Household
            Mover permit is not proof of confirmed current insurance. This page does not create an
            “insured” badge from license presence.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Complaints</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Coverage {s.complaints.coverage}. No bulk complaint report was acquired. A complaint is
            not a violation. No complaint row is not a clean record. Official consumer page: loss or
            damage claims must be filed in writing within nine months after delivery.
          </p>
          <p className="mt-3 text-sm">
            <a className="underline underline-offset-2" href={s.complaints.path} rel="noopener noreferrer" target="_blank">
              File a BHGS complaint
            </a>
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
