'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Home,
  HeartPulse,
  Briefcase,
  UserRound,
  Compass,
  Truck,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/insurance/utils';
import {
  LIFE_INTENTS,
  COVERAGE_OPTIONS,
  cardMatchesIntent,
  cardMatchesQuery,
  resolveLocationLabel,
  type CoverageFilter,
  type HubCardData,
  type LifeIntent,
} from '@/lib/insurance/hubs/intent-filters';
import type { EnrollmentCountdown } from '@/lib/insurance/hubs/enrollment-windows';

const INTENT_ICONS: Record<LifeIntent, typeof Truck> = {
  moving: Truck,
  'turning-65': UserRound,
  health: HeartPulse,
  'buying-home': Home,
  'self-employed': Briefcase,
  researching: Compass,
};

type Props = {
  hubs: HubCardData[];
  enrollment: EnrollmentCountdown[];
  stateCount: number;
};

function formatPop(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function HubsExperience({ hubs, enrollment, stateCount }: Props) {
  const [query, setQuery] = useState('');
  const [intent, setIntent] = useState<LifeIntent | null>(null);
  const [coverage, setCoverage] = useState<CoverageFilter[]>([]);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return hubs
      .filter((h) => {
        const queryOk = cardMatchesQuery(h, query);
        const intentOk = cardMatchesIntent(h, intent);
        const coverageOk =
          coverage.length === 0 ||
          coverage.some((c) => h.coverage.includes(c) || c === 'health');
        return queryOk && intentOk && coverageOk;
      })
      .sort((a, b) => a.priority - b.priority);
  }, [hubs, query, intent, coverage]);

  const visible = showAll ? filtered : filtered.slice(0, 12);
  const locationLabel = resolveLocationLabel(filtered, query);
  const topCoverage = useMemo(() => {
    const counts = new Map<string, number>();
    for (const h of filtered.slice(0, 8)) {
      for (const c of h.coverage) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([id]) => COVERAGE_OPTIONS.find((c) => c.id === id)?.label ?? id);
  }, [filtered]);

  const featured = useMemo(
    () => hubs.filter((h) => h.priority <= 8).slice(0, 6),
    [hubs]
  );

  const selectIntent = useCallback((id: LifeIntent) => {
    setIntent((prev) => {
      if (prev === id) {
        setCoverage([]);
        return null;
      }
      const def = LIFE_INTENTS.find((i) => i.id === id);
      setCoverage(def?.defaultCoverage ?? []);
      return id;
    });
    setShowAll(false);
  }, []);

  const toggleCoverage = useCallback((id: CoverageFilter) => {
    setCoverage((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setShowAll(false);
  }, []);

  const personalized = Boolean(query.trim() || intent || coverage.length);

  return (
    <div className="min-h-[60vh]">
      {/* Hero — light, high-contrast (avoid heavy dark glory band) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-teal-50/40">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(251,146,60,0.08), transparent 50%), radial-gradient(circle at 50% 100%, rgba(241,245,249,0.9), transparent 45%)',
          }}
        />
        <div className="container relative mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Insurance Trust Hub · {hubs.length} markets · {stateCount} states
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Find the Right Insurance Help for Where You Live
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-slate-600 md:text-lg">
              Tell us where you live and what you&apos;re trying to protect. We&apos;ll show you the
              best path — verified agents, no paid placement.
            </p>
          </div>

          {/* Sticky search stack */}
          <div className="mx-auto mt-8 max-w-2xl sticky top-16 z-20">
            <form
              className="rounded-2xl border border-slate-200/90 bg-white p-2 shadow-lg shadow-slate-200/80 ring-1 ring-slate-100"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <label htmlFor="hub-location-search" className="sr-only">
                Enter ZIP code, city, or county
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="ml-3 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                <input
                  id="hub-location-search"
                  type="search"
                  autoComplete="postal-code"
                  placeholder="Enter ZIP code, city, or county"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowAll(false);
                  }}
                  className="h-12 w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <span className="mr-1 hidden items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white sm:inline-flex">
                  <Search className="h-4 w-4" aria-hidden />
                  Search
                </span>
              </div>
            </form>
          </div>

          {/* Life-event chips */}
          <div className="mx-auto mt-8 max-w-4xl">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
              What brings you here?
            </p>
            <div
              className="flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Life situation"
            >
              {LIFE_INTENTS.map((item) => {
                const Icon = INTENT_ICONS[item.id];
                const active = intent === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectIntent(item.id)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 motion-reduce:transition-none',
                      active
                        ? 'border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-600/20'
                        : 'border-slate-200 bg-white text-slate-700 shadow-sm hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900'
                    )}
                    aria-pressed={active}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coverage row */}
          <div className="mx-auto mt-5 max-w-3xl">
            <div
              className="flex flex-wrap justify-center gap-1.5"
              role="group"
              aria-label="Coverage types"
            >
              {COVERAGE_OPTIONS.map((opt) => {
                const active = coverage.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleCoverage(opt.id)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
                      active
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    )}
                    aria-pressed={active}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personalized summary panel */}
          {personalized && (
            <div
              className="mx-auto mt-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-teal-200 bg-white p-4 text-left shadow-sm ring-1 ring-teal-100 md:p-5"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {filtered.length === 0
                      ? 'No exact market match yet — try a nearby city or browse featured hubs'
                      : locationLabel
                        ? `We found resources for ${locationLabel}`
                        : `We found ${filtered.length} matching market${filtered.length === 1 ? '' : 's'}`}
                  </p>
                  {topCoverage.length > 0 && filtered.length > 0 && (
                    <p className="mt-1 text-sm text-slate-600">
                      Most relevant:{' '}
                      <span className="font-medium text-teal-800">{topCoverage.join(' · ')}</span>
                    </p>
                  )}
                  {intent && (
                    <p className="mt-1 text-xs text-slate-500">
                      Path:{' '}
                      {LIFE_INTENTS.find((i) => i.id === intent)?.description ?? intent}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment urgency */}
      <section
        className="border-b bg-amber-50/80"
        aria-label="Enrollment windows"
      >
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-950">
            <Clock className="h-4 w-4 text-amber-700" aria-hidden />
            Live enrollment windows
          </div>
          <div className="flex flex-wrap gap-3">
            {enrollment.map((w) => (
              <Link
                key={w.id}
                href={w.href}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  w.status === 'open'
                    ? 'border-amber-600/40 bg-amber-100 text-amber-950 hover:bg-amber-200'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    w.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  )}
                  aria-hidden
                />
                {w.shortLabel}
                {w.status === 'open' && w.daysRemaining !== null
                  ? ` · ${w.daysRemaining} day${w.daysRemaining === 1 ? '' : 's'} left`
                  : w.daysUntilOpen !== null
                    ? ` · opens in ${w.daysUntilOpen}d`
                    : ''}
              </Link>
            ))}
            <span className="self-center text-[11px] text-amber-900/60">
              Qualifying life events may open a Special Enrollment Period year-round
            </span>
          </div>
        </div>
      </section>

      {/* Market cards */}
      <section className="container mx-auto px-4 py-12 md:py-16" id="markets">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {personalized ? 'Your matching markets' : 'Explore insurance markets'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {filtered.length} of {hubs.length} hubs
              {personalized ? ' matching your filters' : ' ranked by market priority'}
            </p>
          </div>
          <Link
            href="/insurance/hubs/browse"
            className="text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline"
          >
            Browse all {hubs.length} hubs →
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-700">No hubs matched that combination.</p>
            <button
              type="button"
              className="mt-3 text-sm font-medium text-teal-700 hover:underline"
              onClick={() => {
                setQuery('');
                setIntent(null);
                setCoverage([]);
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((hub) => (
                <MarketCard key={`${hub.stateSlug}-${hub.slug}`} hub={hub} />
              ))}
            </div>
            {filtered.length > 12 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-teal-300 hover:text-teal-800"
                >
                  {showAll ? 'Show fewer markets' : `Show all ${filtered.length} matches`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Journey section */}
      <section className="border-y bg-slate-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Where are you in your insurance journey?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
            Pick a path — we&apos;ll surface markets and guides that match your situation.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LIFE_INTENTS.map((item) => {
              const Icon = INTENT_ICONS[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    selectIntent(item.id);
                    document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md motion-reduce:transform-none"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-teal-300 transition group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.label}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                    {item.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured markets */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Featured high-density markets
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Priority metros with the highest health-insurance specialist density.
        </p>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {featured.map((hub) => (
            <Link
              key={`feat-${hub.slug}`}
              href={hub.href}
              className="min-w-[240px] snap-start rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 transition hover:border-teal-300 md:min-w-0"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
                {hub.stateName}
              </p>
              <p className="mt-1 font-semibold text-slate-900">{hub.shortName}</p>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2">{hub.enrollmentHighlight}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Path finder CTA */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center text-white md:px-12 md:py-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"
            aria-hidden
          />
          <h2 className="relative text-2xl font-semibold tracking-tight md:text-3xl">
            Not sure what you need?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-sm text-slate-300 md:text-base">
            Take a 60-second path finder — we&apos;ll recommend the right hub, guides, and
            coverage types for your life stage.
          </p>
          <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/insurance/tools"
              className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Start path finder
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/insurance/resources/how-to-choose-health-insurance-plan"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Read the health plan guide
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t bg-white">
        <div className="container mx-auto grid gap-6 px-4 py-10 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'DOI-verified listings',
              body: 'Agents and agencies are researched against public state Department of Insurance data — not paid placement.',
            },
            {
              icon: Star,
              title: 'Data-driven ranking',
              body: 'Market priority reflects population, density, and enrollment volume — never sponsored boosts.',
            },
            {
              icon: Truck,
              title: 'Built for movers',
              body: 'Part of MoveTrustHub — insurance guidance that connects to relocation, lenders, and local trust signals.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MarketCard({ hub }: { hub: HubCardData }) {
  return (
    <Link
      href={hub.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-300/60 hover:shadow-lg motion-reduce:transform-none"
    >
      <div
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-500 to-rose-400 opacity-80 transition group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-5 pl-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {hub.stateName} · {hub.stateCode}
            </p>
            <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900">
              {hub.shortName}
            </h3>
            <p className="text-xs text-slate-500">{hub.msaName}</p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {formatPop(hub.population)}
          </span>
        </div>

        {hub.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hub.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-800 ring-1 ring-teal-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {hub.enrollmentHighlight}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-500">{hub.agentBand}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 group-hover:text-teal-800">
            Explore {hub.shortName}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
