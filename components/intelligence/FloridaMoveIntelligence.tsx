import Link from 'next/link';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { COVERAGE_LABEL } from '@/lib/intelligence/coverage';
import type { FloridaMoveIntelligencePayload } from '@/lib/intelligence/florida-snapshot';
import { metricById } from '@/lib/intelligence/florida-snapshot';
import { formatAsOf, formatIntelNumber } from './format';

const TASKS = [
  { href: '/companies?state=FL', label: 'Find Florida movers', hint: 'Directory profiles with Florida headquarters' },
  { href: '/verify-dot', label: 'Check registration / authority', hint: 'USDOT and MC lookup' },
  { href: '/compare', label: 'Compare movers', hint: 'Side-by-side research' },
  { href: '/local-movers/florida', label: 'Research by county', hint: 'County pages — not Enhanced coverage' },
  { href: '/resources/carrier-vs-broker', label: 'Carrier vs broker', hint: 'Who actually hauls the load' },
];

export function FloridaMoveIntelligence({ payload }: { payload: FloridaMoveIntelligencePayload }) {
  const asOf = formatAsOf(payload.asOf);
  const im = metricById(payload, 'fl_fdacs_im_active_registrations');
  const mb = metricById(payload, 'fl_fdacs_mb_active_registrations');
  const hq = metricById(payload, 'fl_hq_publishable_profiles');
  const links = metricById(payload, 'fl_fdacs_im_verified_links');
  const contacts = metricById(payload, 'fl_contact_observations');

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Research Florida Movers',
          description:
            'Independent research of Florida mover registrations, directory headquarters, and public authority identifiers. Not a marketplace, ranking, or recommendation list.',
          url: `${SITE_URL}/florida`,
        }}
      />
      <LocalMoversBreadcrumbs
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Florida research' }]}
      />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Florida · mover research
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Research Florida movers
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          MoveTrustHub organizes federal authority identifiers, Florida FDACS registrations, and
          directory headquarters so you can research a mover before you hire. This is a research
          system — not a paid lead marketplace, ranking, or “vetted” list.
        </p>
        <nav aria-label="Florida mover tasks" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {TASKS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  title={t.hint}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground no-underline hover:border-primary/40"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mt-12 space-y-14 sm:space-y-16">
        <section id="snapshot" aria-labelledby="snapshot-heading" className="scroll-mt-24">
          <h2 id="snapshot-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Florida research snapshot
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            These figures count <strong className="font-medium text-foreground">registrations</strong> and{' '}
            <strong className="font-medium text-foreground">directory profiles</strong> separately.
            They are not “all Florida movers,” and headquarters is not service area.
          </p>
          {payload.timedOut || payload.metrics.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              Live research counts are temporarily unavailable. Browse links below still work. We do
              not display zeros for a failed snapshot.
            </p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {payload.metrics.map((m) => (
                <li key={m.id} className="rounded-2xl border border-border bg-card px-4 py-4">
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">
                    {formatIntelNumber(m.value, payload.timedOut)}
                  </p>
                  <p className="mt-1 text-sm font-medium">{m.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.disclosure}</p>
                  {m.href ? (
                    <Link href={m.href} className="mt-3 inline-block text-sm text-primary hover:underline">
                      Open matching research
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          {asOf ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Authority extract as of {asOf}. Not a live FDACS session.
            </p>
          ) : null}
        </section>

        <section id="authority" aria-labelledby="authority-heading" className="scroll-mt-24">
          <h2 id="authority-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Provider / authority intelligence
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            USDOT, MC, Florida registration, and the legal business name stay distinct unless a
            verified link exists. A company can hold more than one authority.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed">
            <li>
              <strong className="font-medium">Carriers (interstate directory):</strong> publishable
              profiles whose headquarters field is in Florida —{' '}
              <span className="tabular-nums">{formatIntelNumber(hq?.value ?? null, payload.timedOut)}</span>
              . Filter:{' '}
              <Link href="/companies?state=FL" className="text-primary hover:underline">
                Florida headquarters
              </Link>
              .
            </li>
            <li>
              <strong className="font-medium">Florida IM registrations:</strong>{' '}
              <span className="tabular-nums">{formatIntelNumber(im?.value ?? null, payload.timedOut)}</span>{' '}
              active rows. Verified company links:{' '}
              <span className="tabular-nums">{formatIntelNumber(links?.value ?? null, payload.timedOut)}</span>
              . A registration is not automatically a public profile.
            </li>
            <li>
              <strong className="font-medium">Florida moving-broker registrations:</strong>{' '}
              <span className="tabular-nums">{formatIntelNumber(mb?.value ?? null, payload.timedOut)}</span>{' '}
              active rows. Broker chrome is not claimed as a consumer directory facet beyond these
              registrations.
            </li>
          </ul>
        </section>

        <section id="safety" aria-labelledby="safety-heading" className="scroll-mt-24">
          <h2 id="safety-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Safety intelligence
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Inspection volume is not quality. Out-of-service events are not automatically a
            “bad mover” score. This page does not publish Florida inspection, crash, or safety-rating
            censuses because the live directory safety-rating field is Not Rated and no inspection
            event table is attributed to this population.
          </p>
          <p className="mt-4 text-sm">
            Look up a specific USDOT on{' '}
            <Link href="/verify-dot" className="text-primary hover:underline">
              Verify DOT
            </Link>
            .
          </p>
        </section>

        <section id="regulatory" aria-labelledby="regulatory-heading" className="scroll-mt-24">
          <h2 id="regulatory-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Regulatory &amp; Enforcement History
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A complaint is not a violation. A complaint is not a final finding. An investigation is
            not enforcement. A notice is not a final order. FDACS complaint and enforcement extracts
            are not loaded, so this page does not display complaint counts.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Official contact observations currently stored:{' '}
            <span className="tabular-nums font-medium text-foreground">
              {formatIntelNumber(contacts?.value ?? null, payload.timedOut)}
            </span>
            . Secondary phones and emails are kept as separate observations and do not overwrite a
            primary company contact.
          </p>
        </section>

        <section id="geography" aria-labelledby="geography-heading" className="scroll-mt-24">
          <h2 id="geography-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Geographic intelligence
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Figures below use <strong className="font-medium text-foreground">headquartered in</strong> /{' '}
            <strong className="font-medium text-foreground">business address in</strong> as stored.
            Operating geography is not inferred from headquarters.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {payload.researchCounties.map((c) => (
              <li key={c.slug} className="rounded-2xl border border-border px-4 py-4">
                <p className="text-sm font-semibold">{c.name} County</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {COVERAGE_LABEL[c.coverageLevel]}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{c.evidenceNote}</p>
                <Link href={c.href} className="mt-3 inline-block text-sm text-primary hover:underline">
                  Open county research page
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            All Florida county pages:{' '}
            <Link href="/local-movers/florida" className="text-primary hover:underline">
              /local-movers/florida
            </Link>
          </p>
        </section>

        <section id="depth" aria-labelledby="depth-heading" className="scroll-mt-24">
          <h2 id="depth-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Current research depth
          </h2>
          <ul className="mt-4 space-y-2">
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
        </section>

        <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-24">
          <h2 id="sources-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Sources
          </h2>
          <ul className="mt-6 space-y-4">
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

        <section id="education" aria-labelledby="education-heading" className="scroll-mt-24">
          <h2 id="education-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            How to use this research
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {payload.education.map((mod) => (
              <article key={mod.id} className="rounded-2xl border border-border px-4 py-4">
                <h3 className="text-sm font-semibold">{mod.title}</h3>
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

        <section id="continue" aria-labelledby="continue-heading" className="scroll-mt-24">
          <h2 id="continue-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Continue research
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            <li>
              <Link href="/companies?state=FL" className="text-primary hover:underline">
                Florida-headquartered directory profiles
              </Link>
            </li>
            <li>
              <Link href="/local-movers/florida" className="text-primary hover:underline">
                Florida county pages
              </Link>
            </li>
            <li>
              <Link href="/verify-dot" className="text-primary hover:underline">
                Verify a USDOT / MC
              </Link>
            </li>
            <li>
              <Link href="/compare" className="text-primary hover:underline">
                Compare movers
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        Intelligence aggregation {payload.version}
        {payload.generatedAt
          ? ` · generated ${payload.generatedAt.slice(0, 16).replace('T', ' ')} UTC`
          : ''}
        . Regenerating the payload updates these figures without changing page copy.
      </p>
    </main>
  );
}
