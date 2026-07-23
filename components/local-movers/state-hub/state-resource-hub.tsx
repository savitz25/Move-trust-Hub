import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MapPinned,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CountyGridCard } from '@/components/local-movers/county-grid-card';
import { StateHubStickyNav } from '@/components/local-movers/state-hub/state-hub-sticky-nav';
import { StateCountyMap } from '@/components/map/StateCountyMap';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
import type { StateHubCountyRow } from '@/lib/local-movers/state-hub-helpers';
import {
  formatCountyCountLabel,
  resolveRegionDisplayMode,
  type StateResourceHubPack,
} from '@/lib/local-movers/state-resource-hub/types';
import { cn } from '@/lib/utils';

type Props = {
  pack: StateResourceHubPack;
  hubRows: StateHubCountyRow[];
  totalMoverListings: number;
  path: string;
};

/** Server-rendered next-step strip — crawlable CTA hierarchy. */
function NextStepCtas({
  pack,
  compact,
}: {
  pack: StateResourceHubPack;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center',
        compact ? 'mt-4' : 'mt-6'
      )}
    >
      <Link
        href={pack.primaryCta.href}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
      >
        <Calculator className="h-4 w-4" aria-hidden />
        {pack.primaryCta.label}
      </Link>
      <Link
        href={pack.secondaryCta.href}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-primary/30 hover:bg-muted/40"
      >
        <Search className="h-4 w-4" aria-hidden />
        {pack.secondaryCta.label}
      </Link>
      <Link
        href={pack.tertiaryCta.href}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary hover:underline"
      >
        {pack.tertiaryCta.label}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  icon,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 scroll-mt-28"
      >
        {icon}
        {title}
      </h2>
      {intro ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/**
 * High-authority state resource hub (California master template).
 * Server Component — critical copy is in the initial HTML for crawlability.
 * Client islands: sticky nav + interactive map only.
 */
export function StateResourceHub({
  pack,
  hubRows,
  totalMoverListings,
  path: _path,
}: Props) {
  const rowBySlug = new Map(hubRows.map((r) => [r.county.slug, r]));
  const verifiedLabel =
    totalMoverListings > 0
      ? `${totalMoverListings}+ Verified Movers`
      : pack.trustBar.find((t) => /mover/i.test(t)) ?? 'Verified Movers';

  const trustBar = pack.trustBar.map((item) =>
    /verified movers/i.test(item) ? verifiedLabel : item
  );

  const countyMeta = hubRows.map((row) => ({
    slug: row.county.slug,
    label: buildCountyLabel(row.county),
    moverCount: row.moverCount,
    guideBadge: row.guideBadge,
    isDeepGuide: row.isDeepGuide,
  }));

  const lastReviewed = new Date(pack.trust.lastReviewed).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const costReviewed = new Date(
    pack.costs.methodology.lastReviewed
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const regionMode = resolveRegionDisplayMode(
    hubRows.length,
    pack.regions.length
  );
  const showRegions =
    regionMode !== 'flat_county_list' && pack.regions.length > 0;

  // Progressive county directory: show top tier first in HTML, rest in details
  const featuredCounties = hubRows.filter((r) => r.isDeepGuide || r.isTier1);
  const remainingCounties = hubRows.filter((r) => !r.isDeepGuide && !r.isTier1);
  const featuredShow =
    featuredCounties.length > 0 ? featuredCounties : hubRows.slice(0, 12);
  const restShow =
    featuredCounties.length > 0
      ? remainingCounties
      : hubRows.slice(12);

  return (
    <div className="space-y-0">
      {/* —— Hero (SSR) —— */}
      <header className="mb-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-900">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {pack.stateCode} · Moving resource hub
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {pack.h1}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {pack.heroSubhead}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {trustBar.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
            >
              <CheckCircle2
                className="h-3.5 w-3.5 text-teal-600"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>

        <NextStepCtas pack={pack} />
      </header>

      {/* —— Intent selector (dominant, SSR) —— */}
      <section
        className="mb-8 scroll-mt-28"
        id="hub-intent"
        aria-labelledby="hub-intent-heading"
      >
        <h2
          id="hub-intent-heading"
          className="mb-3 text-lg font-semibold tracking-tight text-slate-900 scroll-mt-28"
        >
          What kind of move are you planning?
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          Pick a path — we will jump you to the most relevant section of this hub.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pack.intents.map((intent, index) => (
            <a
              key={intent.id}
              href={intent.href}
              className={cn(
                'group rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md',
                index === 0
                  ? 'border-primary/40 bg-primary/5 hover:border-primary/60'
                  : 'border-slate-200 bg-white hover:border-primary/40'
              )}
            >
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900 group-hover:text-primary">
                {intent.label}
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-slate-500">
                {intent.description}
              </span>
            </a>
          ))}
        </div>
      </section>

      <StateHubStickyNav items={pack.stickyNav} />

      {/* —— Why different (SSR bridge) —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-why-different"
        aria-labelledby="hub-why-different-heading"
      >
        <SectionHeading
          id="hub-why-different-heading"
          eyebrow="Orientation"
          title={pack.whyDifferent.title}
        />
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 sm:p-6">
          {pack.whyDifferent.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="text-sm leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
          <p className="text-sm font-medium text-slate-800">
            Next: pick a region, open a county guide, or run the cost calculator.
          </p>
        </div>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Snapshot —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-snapshot"
        aria-labelledby="hub-snapshot-heading"
      >
        <SectionHeading
          id="hub-snapshot-heading"
          eyebrow="At a glance"
          title={pack.snapshot.title}
          intro={pack.snapshot.methodology}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pack.snapshot.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
              {stat.note ? (
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {stat.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Regulations —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-regulations"
        aria-labelledby="hub-regulations-heading"
      >
        <SectionHeading
          id="hub-regulations-heading"
          eyebrow="Consumer protection"
          title={pack.regulations.title}
          intro={pack.regulations.intro}
          icon={<Scale className="h-6 w-6 text-amber-600" aria-hidden />}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-teal-300/80 bg-teal-50/50 p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Intrastate · within {pack.stateCode}
            </p>
            <h3 className="mt-1 text-base font-semibold text-teal-950">
              {pack.regulations.intrastate.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-teal-950/90">
              {pack.regulations.intrastate.body}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-sky-300/80 bg-sky-50/50 p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
              Interstate · crosses a state line
            </p>
            <h3 className="mt-1 text-base font-semibold text-sky-950">
              {pack.regulations.interstate.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sky-950/90">
              {pack.regulations.interstate.body}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
          <h3 className="text-base font-semibold text-slate-900">
            How to verify a mover is legally allowed to operate
          </h3>
          <ol className="mt-4 space-y-3">
            {pack.regulations.verifySteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 text-sm leading-relaxed text-slate-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <details className="mt-4 rounded-2xl border border-slate-200 bg-white open:shadow-sm">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Consumer protections &amp; disclosures
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition open:rotate-90 [[open]_&]:rotate-90" />
            </span>
          </summary>
          <div className="grid gap-3 border-t px-5 py-4 sm:grid-cols-3">
            {pack.regulations.protections.map((p) => (
              <div key={p.title}>
                <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </details>

        <ul className="mt-5 flex flex-wrap gap-2">
          {pack.regulations.officialLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-primary/40 hover:text-primary"
              >
                {link.label}
                {link.external ? (
                  <ExternalLink className="h-3 w-3" aria-hidden />
                ) : (
                  <ArrowRight className="h-3 w-3" aria-hidden />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-xs leading-relaxed text-amber-950">
          {pack.regulations.disclaimer}
        </p>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Regions (progressive) —— */}
      {showRegions ? (
        <section
          className="mb-12 scroll-mt-28"
          id="hub-regions"
          aria-labelledby="hub-regions-heading"
        >
          <SectionHeading
            id="hub-regions-heading"
            eyebrow="State → region → county"
            title="Explore by region"
            intro="California is many markets. Start with a region, then open the county guide that matches your addresses. Expand a card to see every county in that region."
            icon={<MapPinned className="h-6 w-6 text-primary" aria-hidden />}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pack.regions.map((region) => {
              const links = region.countySlugs.map((slug) => {
                const row = rowBySlug.get(slug);
                return {
                  slug,
                  href: row?.href ?? `/local-movers/${pack.stateSlug}/${slug}`,
                  name: row?.county.name ?? slug.replace(/-/g, ' '),
                };
              });
              const countLabel = formatCountyCountLabel(links.length);
              return (
                <details
                  key={region.id}
                  id={`region-${region.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md"
                >
                  <summary className="cursor-pointer list-none p-5 marker:content-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-slate-900">
                          {region.name}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                          {region.blurb}
                        </p>
                        <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                          {countLabel}
                        </span>
                        {region.challenges?.length ? (
                          <ul className="mt-3 space-y-1">
                            {region.challenges.slice(0, 2).map((c) => (
                              <li
                                key={c}
                                className="flex gap-1.5 text-[11px] leading-snug text-slate-500"
                              >
                                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-600" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="mt-3 text-xs font-semibold text-primary">
                          {region.ctaLabel ?? 'Explore region'} →
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-90" />
                    </div>
                  </summary>
                  <div className="border-t border-slate-100 px-5 py-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      Counties in this region
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {links.map((link) => (
                        <li key={link.slug}>
                          <Link
                            href={link.href}
                            className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold capitalize text-slate-800 transition hover:bg-primary/10 hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })}
          </div>
          <NextStepCtas pack={pack} compact />
        </section>
      ) : (
        <div id="hub-regions" className="scroll-mt-28" />
      )}

      {/* —— Map (client island for interaction; labels in aria) —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-map"
        aria-labelledby="hub-map-heading"
      >
        <SectionHeading
          id="hub-map-heading"
          eyebrow="Interactive map"
          title="Explore counties on the map"
          intro="Hover or focus a county for its name and mover count. Click to open the county guide. Prefer text? Use regions above or the full directory below."
        />
        <StateCountyMap
          stateSlug={pack.stateSlug}
          stateName={
            pack.stateSlug === 'california' ? 'California' : pack.stateCode
          }
          countyMeta={countyMeta}
        />
        {/* Crawlable text fallback */}
        <noscript>
          <p className="mt-3 text-sm text-slate-600">
            JavaScript is required for the interactive map. Use the region cards
            or full county directory on this page to open any county guide.
          </p>
        </noscript>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Costs —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-costs"
        aria-labelledby="hub-costs-heading"
      >
        <SectionHeading
          id="hub-costs-heading"
          eyebrow="Planning ranges"
          title={pack.costs.title}
          intro={pack.costs.intro}
        />
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">
            {pack.costs.methodology.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
            {pack.costs.methodology.body}
          </p>
          <p className="mt-2 text-[11px] font-medium text-slate-500">
            Cost methodology last reviewed: {costReviewed}
          </p>
        </div>
        <div className="overflow-x-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Move type</th>
                <th className="px-4 py-3 font-semibold">Typical range</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {pack.costs.ranges.map((row) => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 font-semibold text-teal-800">
                    {row.value}
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                    {row.note ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="mt-4 rounded-2xl border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              See detailed cost drivers
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </span>
          </summary>
          <ul className="space-y-2 border-t px-5 py-4">
            {pack.costs.factors.map((f) => (
              <li
                key={f}
                className="flex gap-2 text-sm leading-relaxed text-slate-700"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
        </details>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Routes —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-routes"
        aria-labelledby="hub-routes-heading"
      >
        <SectionHeading
          id="hub-routes-heading"
          title={pack.routes.title}
          intro={pack.routes.intro}
        />
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Migration profile:{' '}
          <span className="text-slate-800">
            {pack.routes.migrationProfile.replace(/_/g, ' ')}
          </span>
        </p>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          High-volume outbound corridors
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {pack.routes.outbound.map((route) => (
            <article
              key={route.label}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              {route.href ? (
                <Link
                  href={route.href}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {route.label}
                </Link>
              ) : (
                <p className="text-sm font-semibold text-slate-900">
                  {route.label}
                </p>
              )}
              {route.origins ? (
                <p className="mt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Origins: </span>
                  {route.origins}
                </p>
              ) : null}
              {route.transit ? (
                <p className="mt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Transit: </span>
                  {route.transit}
                </p>
              ) : null}
              {route.planningNote ? (
                <p className="mt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Planning: </span>
                  {route.planningNote}
                </p>
              ) : null}
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {route.note}
              </p>
            </article>
          ))}
        </div>
        {pack.routes.inbound?.length ? (
          <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/50">
            <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                Inbound &amp; destination highlights
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </span>
            </summary>
            <div className="grid gap-3 border-t px-5 py-4 sm:grid-cols-3">
              {pack.routes.inbound.map((route) => (
                <div key={route.label}>
                  {route.href ? (
                    <Link
                      href={route.href}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      {route.label}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold">{route.label}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-600">{route.note}</p>
                </div>
              ))}
            </div>
          </details>
        ) : null}
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Challenges —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-challenges"
        aria-labelledby="hub-challenges-heading"
      >
        <SectionHeading
          id="hub-challenges-heading"
          title={pack.challenges.title}
          intro={pack.challenges.intro}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {pack.challenges.items.slice(0, 4).map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        {pack.challenges.items.length > 4 ? (
          <details className="mt-3 rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                Show more California challenges
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </span>
            </summary>
            <div className="grid gap-3 border-t px-5 py-4 sm:grid-cols-2">
              {pack.challenges.items.slice(4).map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ) : null}
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Full county directory —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-counties"
        aria-labelledby="hub-counties-heading"
      >
        <SectionHeading
          id="hub-counties-heading"
          eyebrow="Complete directory"
          title={`All ${hubRows.length} county guides`}
          intro="Deep and Tier 1 research first. Expand for the full list. Every card links to a live county page."
        />
        <div className="mb-4 flex flex-wrap gap-2 text-[11px] text-slate-500">
          <span className="rounded-full bg-sky-50 px-2 py-1 font-semibold text-sky-900 ring-1 ring-sky-200/80">
            Deep guide
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-800 ring-1 ring-emerald-200/80">
            Tier 1
          </span>
          <span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-800 ring-1 ring-amber-200/80">
            Limited
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
          {featuredShow.map(({ county, moverCount, guideBadge, href }) => (
            <CountyGridCard
              key={county.slug}
              href={href}
              name={county.name}
              seat={county.seat}
              moverCount={moverCount}
              guideBadge={guideBadge}
            />
          ))}
        </div>
        {restShow.length > 0 ? (
          <details className="mt-4">
            <summary className="cursor-pointer list-none rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                Show all remaining counties ({restShow.length})
                <ChevronRight className="h-4 w-4" />
              </span>
            </summary>
            <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
              {restShow.map(({ county, moverCount, guideBadge, href }) => (
                <CountyGridCard
                  key={county.slug}
                  href={href}
                  name={county.name}
                  seat={county.seat}
                  moverCount={moverCount}
                  guideBadge={guideBadge}
                />
              ))}
            </div>
          </details>
        ) : null}
        {/* Always expose full list for crawlers in a compact link list */}
        <nav
          className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-3"
          aria-label="All county guides text index"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Full text index (all counties)
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {hubRows.map((row) => (
              <li key={row.county.slug}>
                <Link
                  href={row.href}
                  className="text-slate-700 underline-offset-2 hover:text-primary hover:underline"
                >
                  {buildCountyLabel(row.county)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <NextStepCtas pack={pack} compact />
      </section>

      {/* —— Tools —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-tools"
        aria-labelledby="hub-tools-heading"
      >
        <SectionHeading
          id="hub-tools-heading"
          title="Tools & planning"
          intro="Use these tools before you request quotes — inventory accuracy and license checks save money and stress."
          icon={<BookOpen className="h-6 w-6 text-primary" aria-hidden />}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {pack.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900 group-hover:text-primary">
                {tool.label}
                <ArrowRight className="h-4 w-4 shrink-0 opacity-40 group-hover:opacity-100" />
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-slate-600">
                {tool.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* —— Trust / E-E-A-T —— */}
      <section
        className="mb-12 scroll-mt-28"
        id="hub-trust"
        aria-labelledby="hub-trust-heading"
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7">
          <h2
            id="hub-trust-heading"
            className="flex items-center gap-2 text-xl font-semibold text-slate-900 scroll-mt-28"
          >
            <ShieldCheck className="h-5 w-5 text-teal-700" aria-hidden />
            Trust, methodology &amp; editorial standards
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-800">
            {pack.trust.byline}
          </p>
          <p className="mt-1 text-sm font-semibold text-teal-800">
            Last reviewed: {lastReviewed}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            {pack.trust.methodology}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {pack.trust.independence}
          </p>
          {pack.trust.sources?.length ? (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Sources
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {pack.trust.sources.map((s) => (
                  <li key={s.label}>
                    {s.href ? (
                      <Link
                        href={s.href}
                        className="text-xs font-medium text-primary hover:underline"
                        {...(s.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {s.label}
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-600">{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* —— FAQ (SSR details) —— */}
      <section
        className="mb-10 scroll-mt-28"
        id="hub-faq"
        aria-labelledby="hub-faq-heading"
      >
        <SectionHeading
          id="hub-faq-heading"
          title={`${pack.stateCode === 'CA' ? 'California' : pack.stateCode} moving FAQ`}
          intro="State-level answers only — open a county guide for neighborhood access, parking, and local market detail."
        />
        <div className="space-y-3">
          {pack.faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  {item.question}
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-90" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <NextStepCtas pack={pack} compact />
      </section>
    </div>
  );
}
