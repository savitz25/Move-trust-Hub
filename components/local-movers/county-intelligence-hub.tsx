import Link from 'next/link';
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPinned,
  Navigation,
  Sparkles,
} from 'lucide-react';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { cn } from '@/lib/utils';

type Props = {
  pack: CountyIntelligencePack;
  className?: string;
};

/** Schematic zone map — CSS grid, no external assets. */
function ZoneMapSchematic({ pack }: { pack: CountyIntelligencePack }) {
  return (
    <div
      className="rounded-2xl border bg-gradient-to-br from-sky-50 via-background to-amber-50/60 p-4 dark:from-sky-950/40 dark:to-amber-950/20"
      role="img"
      aria-label={`${pack.hubTitle} zone map schematic`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
        <MapPinned className="h-3.5 w-3.5" aria-hidden />
        Zone map (schematic)
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] sm:text-xs">
        {pack.zones.map((z, i) => (
          <a
            key={z.id}
            href={`#zone-${z.id}`}
            className={cn(
              'rounded-xl border bg-background/90 px-2 py-3 font-medium shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5',
              i % 3 === 0 && 'sm:col-span-1',
              z.id === 'antelope' && 'sm:col-span-2',
              z.id === 'north-county' && 'sm:col-span-2',
              z.id === 'irvine-planned' && 'sm:col-span-2',
              z.id === 'coachella-valley' && 'sm:col-span-2',
              z.id === 'high-desert' && 'sm:col-span-2',
              z.id === 'mountains' && 'sm:col-span-2',
              z.id === 'hills' && 'border-amber-300/70 dark:border-amber-800/50',
              z.id === 'coastal' && 'border-sky-300/70 dark:border-sky-800/50',
              z.id === 'irvine-planned' &&
                'border-violet-300/70 dark:border-violet-800/50',
              z.id === 'coachella-valley' &&
                'border-orange-300/70 dark:border-orange-800/50',
              z.id === 'high-desert' &&
                'border-amber-300/70 dark:border-amber-800/50',
              z.id === 'mountains' &&
                'border-emerald-300/70 dark:border-emerald-800/50'
            )}
          >
            <span className="block text-foreground leading-snug">{z.shortName}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
        Zones are for planning — not political boundaries. Jump to a zone for housing types and
        access tips, then filter the mover list below.
      </p>
    </div>
  );
}

/**
 * Hyper-local county intelligence sections (LA first; reusable pack shape).
 * Renders only when a curated pack is registered for the county.
 */
export function CountyIntelligenceHub({ pack, className }: Props) {
  const reviewed = new Date(pack.lastReviewed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={cn('space-y-10 mb-10', className)}>
      {/* What makes it different */}
      <section
        className="rounded-2xl border bg-card p-6 sm:p-7"
        aria-labelledby="county-diff-heading"
      >
        <h2
          id="county-diff-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" aria-hidden />
          {pack.whatMakesDifferent.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {pack.whatMakesDifferent.intro}
        </p>
        <ul className="space-y-4">
          {pack.whatMakesDifferent.bullets.map((b) => (
            <li key={b.title} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-semibold text-foreground">{b.title}</p>
                <p className="text-muted-foreground mt-0.5">{b.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ZoneMapSchematic pack={pack} />

      {/* Zones */}
      <section aria-labelledby="county-zones-heading">
        <h2
          id="county-zones-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <Navigation className="h-5 w-5 text-primary shrink-0" aria-hidden />
          Hyper-local zone breakdown
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {pack.zonesIntro ??
            'Treat each zone as its own logistics problem. Housing stock, truck access, and crew expertise can vary more across this county than across many entire states.'}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {pack.zones.map((z) => (
            <article
              key={z.id}
              id={`zone-${z.id}`}
              className="rounded-2xl border bg-muted/15 p-5 scroll-mt-24"
            >
              <h3 className="font-semibold text-foreground tracking-tight">{z.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {z.neighborhoods.slice(0, 6).join(' · ')}
                {z.neighborhoods.length > 6 ? '…' : ''}
              </p>
              <p className="text-sm mt-3">
                <span className="font-medium text-foreground">Housing: </span>
                <span className="text-muted-foreground">{z.housingTypes}</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {z.challenges.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-primary">·</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed rounded-lg border bg-background/80 px-3 py-2">
                <span className="font-medium text-foreground">Mover tip: </span>
                <span className="text-muted-foreground">{z.moverTips}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Costs */}
      <section
        className="rounded-2xl border bg-card p-6 sm:p-7"
        aria-labelledby="county-cost-intel-heading"
      >
        <h2
          id="county-cost-intel-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <DollarSign className="h-5 w-5 text-primary shrink-0" aria-hidden />
          {pack.costDrivers.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {pack.costDrivers.intro}
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {pack.costDrivers.ranges.map((r) => (
            <div key={r.label} className="rounded-xl border bg-muted/20 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                {r.label}
              </div>
              <div className="text-lg font-semibold tabular-nums">{r.value}</div>
              {r.note ? (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
              ) : null}
            </div>
          ))}
        </div>
        <ul className="space-y-3">
          {pack.costDrivers.drivers.map((d) => (
            <li key={d.title} className="text-sm leading-relaxed">
              <span className="font-semibold text-foreground">{d.title}. </span>
              <span className="text-muted-foreground">{d.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Seasonal */}
      <section
        className="rounded-2xl border bg-muted/20 p-6 sm:p-7"
        aria-labelledby="county-seasonal-heading"
      >
        <h2
          id="county-seasonal-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <Calendar className="h-5 w-5 text-primary shrink-0" aria-hidden />
          {pack.seasonal.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{pack.seasonal.intro}</p>
        <ul className="space-y-4">
          {pack.seasonal.items.map((item) => (
            <li key={item.title} className="text-sm leading-relaxed">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground mt-0.5">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources */}
      <section
        className="rounded-2xl border bg-card p-6 sm:p-7"
        aria-labelledby="county-resources-heading"
      >
        <h2
          id="county-resources-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5 text-primary shrink-0" aria-hidden />
          {pack.resources.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pack.resources.intro}</p>
        <ul className="space-y-2.5">
          {pack.resources.items.map((item) => {
            const isExternal = item.external || item.href.startsWith('http');
            return (
              <li key={item.href + item.label}>
                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-primary hover:underline"
                  >
                    {item.label}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                    {item.note ? (
                      <span className="font-normal text-muted-foreground">— {item.note}</span>
                    ) : null}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-primary hover:underline"
                  >
                    {item.label}
                    {item.note ? (
                      <span className="font-normal text-muted-foreground">— {item.note}</span>
                    ) : null}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-muted-foreground mt-5">
          Intelligence last reviewed {reviewed}. Rules and fees change — verify on official city
          and agency sites before move day.
        </p>
      </section>
    </div>
  );
}
