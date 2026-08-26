import Link from 'next/link';
import { COVERAGE_LABEL } from '@/lib/intelligence/coverage';
import { publicCountyMetrics } from '@/lib/intelligence/county-payload';
import type { CountyMoveIntelligencePayload } from '@/lib/intelligence/payload-types';
import { CoverageChip } from './CoverageChip';
import { formatAsOf, formatIntelNumber } from './format';

export function CountyResearchIntelligence({
  payload,
}: {
  payload: CountyMoveIntelligencePayload;
}) {
  const asOf = formatAsOf(payload.asOf);
  const publicMetrics = publicCountyMetrics(payload);
  const countyLabel = `${payload.countyName} County`;
  const coverageLabel = COVERAGE_LABEL[payload.coverageLevel];

  return (
    <section
      id="county-research"
      aria-labelledby="county-research-heading"
      className="mb-10 scroll-mt-28 rounded-2xl border border-border bg-card px-4 py-6 sm:px-5 sm:py-7"
    >
      <header className="border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <CoverageChip level={payload.coverageLevel} />
          <span className="text-xs text-muted-foreground">Evidence depth, not mover quality</span>
        </div>
        <h2
          id="county-research-heading"
          className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Research movers in {countyLabel}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          County research on this page is {coverageLabel}. A county credential is not an FDACS
          registration, not FMCSA authority, and not a company. Headquarters is not service area.
          The relocation guide further down this page is logistics — not Enhanced Local Research.
        </p>
      </header>

      <div className="mt-8 space-y-10">
        <section id="county-research-snapshot" aria-labelledby="county-research-snapshot-heading">
          <h3 id="county-research-snapshot-heading" className="text-lg font-semibold tracking-tight">
            {countyLabel} research snapshot
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Only <strong className="font-medium text-foreground">READY</strong> public metrics
            appear as numbers. Missing local datasets are omitted — not shown as zero.
          </p>
          {payload.timedOut ? (
            <p className="mt-4 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              Live county research counts are temporarily unavailable. Listings and statewide
              research links still work. We do not display zeros for a failed snapshot.
            </p>
          ) : publicMetrics.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              No county-level public metrics are READY for {countyLabel}. Statewide Florida
              research is on{' '}
              <Link href="/florida" className="text-primary hover:underline">
                /florida
              </Link>
              . {payload.credentials.attribution}
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {publicMetrics.map((m) => (
                <li key={m.id} className="rounded-2xl border border-border bg-background px-4 py-4">
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">
                    {formatIntelNumber(m.value, payload.timedOut)}
                  </p>
                  <p className="mt-1 text-sm font-medium">{m.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.disclosure}</p>
                </li>
              ))}
            </ul>
          )}
          {asOf ? (
            <p className="mt-3 text-xs text-muted-foreground">
              County program extract as of {asOf}. Not a live county-clerk session.
            </p>
          ) : null}
        </section>

        <section id="county-research-authority" aria-labelledby="county-research-authority-heading">
          <h3 id="county-research-authority-heading" className="text-lg font-semibold tracking-tight">
            Provider / authority intelligence
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {payload.credentials.datasetPresent ? (
              <>
                {countyLabel} credentials in this graph are{' '}
                <strong className="font-medium text-foreground">
                  {payload.credentials.credentialType}
                </strong>
                {payload.credentials.agency ? (
                  <>
                    {' '}
                    issued by{' '}
                    <strong className="font-medium text-foreground">{payload.credentials.agency}</strong>
                  </>
                ) : null}
                . They are not FDACS IM/MB registrations and not USDOT/MC authority.
              </>
            ) : (
              <>
                {countyLabel} has no contributing county credential dataset in production.{' '}
                {payload.credentials.attribution}
              </>
            )}
          </p>
        </section>

        <section id="county-research-safety" aria-labelledby="county-research-safety-heading">
          <h3 id="county-research-safety-heading" className="text-lg font-semibold tracking-tight">
            Safety intelligence
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Inspection volume is not quality. Out-of-service events are not a “bad mover” score.
            This county page does not publish inspection, crash, or safety-rating censuses.
          </p>
          <p className="mt-3 text-sm">
            Look up a specific USDOT on{' '}
            <Link href="/verify-dot" className="text-primary hover:underline">
              Verify DOT
            </Link>
            .
          </p>
        </section>

        <section id="county-research-regulatory" aria-labelledby="county-research-regulatory-heading">
          <h3 id="county-research-regulatory-heading" className="text-lg font-semibold tracking-tight">
            Regulatory &amp; Enforcement History
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A complaint is not a violation. A complaint is not a final finding. An investigation is
            not enforcement. A notice is not a final order. County complaint and enforcement extracts
            are not loaded, so this page does not display those counts.
          </p>
        </section>

        <section id="county-research-geography" aria-labelledby="county-research-geography-heading">
          <h3 id="county-research-geography-heading" className="text-lg font-semibold tracking-tight">
            Geographic intelligence
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Headquarters is a stored city/address. County seat is not a headquarters-to-county map.
            Directory coverage assignments are not proven operating geography. This page does not
            count companies “in” {countyLabel} by HQ.
          </p>
        </section>

        <section id="county-research-depth" aria-labelledby="county-research-depth-heading">
          <h3 id="county-research-depth-heading" className="text-lg font-semibold tracking-tight">
            Current research depth
          </h3>
          <ul className="mt-3 space-y-2">
            {payload.coverage.map((item) => (
              <li key={item.id} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.status === 'included' ? 'In graph' : 'Not yet'}
                </span>
                <span>
                  <span className="font-medium">{item.label}.</span> {item.note}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Coverage is {coverageLabel}. Enhanced Local Research is documented and not activated —
            operating geography is not proven.
          </p>
        </section>

        <section id="county-research-sources" aria-labelledby="county-research-sources-heading">
          <h3 id="county-research-sources-heading" className="text-lg font-semibold tracking-tight">
            Sources
          </h3>
          <ul className="mt-4 space-y-3">
            {payload.evidenceSources.map((s) => (
              <li key={s.id} className="rounded-2xl border border-border px-4 py-4">
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.agency}</p>
                <p className="mt-2 text-sm leading-relaxed">{s.whatItContains}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Coverage: {s.coveragePeriod}. {s.limitation}
                </p>
                {s.lastExtractedAt ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    As of {formatAsOf(s.lastExtractedAt)}
                  </p>
                ) : null}
                {s.sourceUrl ? (
                  <a
                    href={s.sourceUrl}
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Official source
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section id="county-research-education" aria-labelledby="county-research-education-heading">
          <h3 id="county-research-education-heading" className="text-lg font-semibold tracking-tight">
            How to use this research
          </h3>
          <div className="mt-4 grid gap-3">
            {payload.education.map((mod) => (
              <article key={mod.id} className="rounded-2xl border border-border px-4 py-4">
                <h4 className="text-sm font-semibold">{mod.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.body}</p>
                {mod.href ? (
                  <Link href={mod.href} className="mt-3 inline-block text-sm text-primary hover:underline">
                    Continue
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="county-research-continue" aria-labelledby="county-research-continue-heading">
          <h3 id="county-research-continue-heading" className="text-lg font-semibold tracking-tight">
            Continue research
          </h3>
          <ul className="mt-3 space-y-3 text-sm">
            {payload.discoveryLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{link.semantics}</p>
              </li>
            ))}
            <li>
              <Link href="/florida" className="text-primary hover:underline">
                Florida statewide research
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                FDACS registrations and Florida-headquartered directory profiles. Not this county.
              </p>
            </li>
            <li>
              <Link href="/companies?state=FL" className="text-primary hover:underline">
                Florida-headquartered directory profiles
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                Headquarters field as stored for Florida — not {countyLabel} HQ, not county
                credentials, not service area.
              </p>
            </li>
            <li>
              <Link href="/verify-dot" className="text-primary hover:underline">
                Verify a USDOT / MC
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Intelligence aggregation {payload.version}
        {payload.generatedAt
          ? ` · generated ${payload.generatedAt.slice(0, 16).replace('T', ' ')} UTC`
          : ''}
        . Canonical route {payload.canonicalPath}. Regenerating the payload updates figures without
        changing page copy.
      </p>
    </section>
  );
}
