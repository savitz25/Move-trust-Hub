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
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CountyGridCard } from '@/components/local-movers/county-grid-card';
import { StateHubStickyNav } from '@/components/local-movers/state-hub/state-hub-sticky-nav';
import { StateCountyMap } from '@/components/map/StateCountyMap';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
import type { StateHubCountyRow } from '@/lib/local-movers/state-hub-helpers';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';
import { cn } from '@/lib/utils';

type Props = {
  pack: StateResourceHubPack;
  hubRows: StateHubCountyRow[];
  totalMoverListings: number;
  path: string;
};

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
 * High-authority state resource hub layout (California master template).
 * Reusable when other states register a StateResourceHubPack.
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

  return (
    <div className="space-y-0">
      {/* —— Hero —— */}
      <header className="mb-8">
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

        {/* Intent selector */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            What kind of move are you planning?
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {pack.intents.map((intent) => (
              <a
                key={intent.id}
                href={intent.href}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
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
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={pack.primaryCta.href}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4" aria-hidden />
            {pack.primaryCta.label}
          </Link>
          {pack.secondaryCta ? (
            <Link
              href={pack.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-primary/30 hover:bg-muted/40"
            >
              {pack.secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        {/* Trust bar */}
        <ul className="mt-6 flex flex-wrap gap-2">
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
      </header>

      <StateHubStickyNav items={pack.stickyNav} />

      {/* —— Snapshot —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-snapshot"
        aria-labelledby="ca-snapshot-heading"
      >
        <SectionHeading
          id="ca-snapshot-heading"
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
      </section>

      {/* —— Regulations —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-regulations"
        aria-labelledby="ca-regulations-heading"
      >
        <SectionHeading
          id="ca-regulations-heading"
          eyebrow="Consumer protection"
          title={pack.regulations.title}
          intro={pack.regulations.intro}
          icon={<Scale className="h-6 w-6 text-amber-600" aria-hidden />}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-sky-200/80 bg-sky-50/40 p-5">
            <h3 className="text-base font-semibold text-sky-950">
              {pack.regulations.interstate.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sky-950/90">
              {pack.regulations.interstate.body}
            </p>
          </div>
          <div className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-5">
            <h3 className="text-base font-semibold text-teal-950">
              {pack.regulations.intrastate.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-teal-950/90">
              {pack.regulations.intrastate.body}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
          <h3 className="text-base font-semibold text-slate-900">
            How to verify a California mover is legally allowed to operate
          </h3>
          <ol className="mt-4 space-y-3">
            {pack.regulations.verifySteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {pack.regulations.protections.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

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
      </section>

      {/* —— Regions —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-regions"
        aria-labelledby="ca-regions-heading"
      >
        <SectionHeading
          id="ca-regions-heading"
          eyebrow="State → region → county"
          title="Explore California by region"
          intro="Start with a region, then drill into the county guide that matches your origin or destination. Each card lists the counties we cover in that region."
          icon={<MapPinned className="h-6 w-6 text-primary" aria-hidden />}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pack.regions.map((region) => {
            const links = region.countySlugs.map((slug) => {
              const row = rowBySlug.get(slug);
              return {
                slug,
                href: row?.href ?? `/local-movers/${pack.stateSlug}/${slug}`,
                name: row?.county.name ?? slug.replace(/-/g, ' '),
              };
            });
            return (
              <article
                key={region.id}
                id={`region-${region.id}`}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {region.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {region.blurb}
                </p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {links.length} counties
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
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
              </article>
            );
          })}
        </div>
      </section>

      {/* —— Map —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-map"
        aria-labelledby="ca-map-heading"
      >
        <SectionHeading
          id="ca-map-heading"
          eyebrow="Interactive map"
          title={`Explore ${pack.stateCode === 'CA' ? 'California' : pack.stateCode} counties on the map`}
          intro="Hover or focus a county to see its name and mover count. Click to open the deep county guide."
        />
        <StateCountyMap
          stateSlug={pack.stateSlug}
          stateName={
            pack.stateSlug === 'california' ? 'California' : pack.stateCode
          }
          countyMeta={countyMeta}
        />
      </section>

      {/* —— Costs —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-costs"
        aria-labelledby="ca-costs-heading"
      >
        <SectionHeading
          id="ca-costs-heading"
          eyebrow="Planning ranges"
          title={pack.costs.title}
          intro={pack.costs.intro}
        />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
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
        <ul className="mt-4 space-y-2">
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
        <div className="mt-6">
          <Link
            href={pack.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4" aria-hidden />
            {pack.primaryCta.label}
          </Link>
        </div>
      </section>

      {/* —— Routes —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-routes"
        aria-labelledby="ca-routes-heading"
      >
        <SectionHeading
          id="ca-routes-heading"
          title={pack.routes.title}
          intro={pack.routes.intro}
        />
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Strong outbound lanes
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {pack.routes.outbound.map((route) => (
            <div
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
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {route.note}
              </p>
            </div>
          ))}
        </div>
        {pack.routes.inbound?.length ? (
          <>
            <h3 className="mb-3 mt-6 text-sm font-semibold text-slate-900">
              Inbound / destination highlights
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {pack.routes.inbound.map((route) => (
                <div
                  key={route.label}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
                >
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
          </>
        ) : null}
      </section>

      {/* —— Challenges —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-challenges"
        aria-labelledby="ca-challenges-heading"
      >
        <SectionHeading
          id="ca-challenges-heading"
          title={pack.challenges.title}
          intro={pack.challenges.intro}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {pack.challenges.items.map((item) => (
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
      </section>

      {/* —— Full county directory —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-counties"
        aria-labelledby="ca-counties-heading"
      >
        <SectionHeading
          id="ca-counties-heading"
          eyebrow="Complete directory"
          title="All California county guides"
          intro={`${hubRows.length} county guides — deep and Tier 1 research listed first. Use the regional cards above if you are still choosing an area.`}
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
          {hubRows.map(({ county, moverCount, guideBadge, href }) => (
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
      </section>

      {/* —— Tools —— */}
      <section
        className="mb-14 scroll-mt-28"
        id="ca-tools"
        aria-labelledby="ca-tools-heading"
      >
        <SectionHeading
          id="ca-tools-heading"
          title="Tools & planning"
          intro="Use these tools before you request quotes — inventory accuracy and license checks save money and stress."
          icon={<BookOpen className="h-6 w-6 text-primary" aria-hidden />}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {pack.tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                'group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md'
              )}
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
        className="mb-14 scroll-mt-28"
        id="ca-trust"
        aria-labelledby="ca-trust-heading"
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7">
          <h2
            id="ca-trust-heading"
            className="flex items-center gap-2 text-xl font-semibold text-slate-900 scroll-mt-28"
          >
            <ShieldCheck className="h-5 w-5 text-teal-700" aria-hidden />
            Trust, methodology & editorial standards
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-800">
            {pack.trust.byline}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Last reviewed: {lastReviewed}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            {pack.trust.methodology}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {pack.trust.independence}
          </p>
        </div>
      </section>

      {/* —— FAQ —— */}
      <section
        className="mb-10 scroll-mt-28"
        id="ca-faq"
        aria-labelledby="ca-faq-heading"
      >
        <SectionHeading
          id="ca-faq-heading"
          title="California moving FAQ"
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
      </section>
    </div>
  );
}
