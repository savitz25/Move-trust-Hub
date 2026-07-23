'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { MapStateCountiesGeo } from '@/lib/map/types';

export type StateCountyMapMeta = {
  slug: string;
  /** e.g. "Monmouth County" */
  label: string;
  moverCount?: number;
  /** e.g. "Deep guide", "Tier 1" */
  guideBadge?: string;
  isDeepGuide?: boolean;
};

type Props = {
  stateSlug: string;
  stateName: string;
  /** Optional enrichment from the state hub (mover counts, guide badges). */
  countyMeta?: StateCountyMapMeta[];
  className?: string;
};

const COUNTY_FILL = '#e2e8f0';
const COUNTY_HOVER = '#0d9488';
const STROKE = '#f8fafc';

type ActiveCounty = {
  slug: string;
  label: string;
  secondary?: string;
  href: string;
};

function formatCountyLabel(rawName: string, stateSlug: string): string {
  const name = rawName.trim();
  if (!name) return 'County';
  if (/\s(county|parish|borough)$/i.test(name) || /\sCity$/i.test(name)) {
    return name;
  }
  if (stateSlug === 'louisiana') return `${name} Parish`;
  if (stateSlug === 'district-of-columbia') return name;
  if (stateSlug === 'alaska' && /borough|census area|municipality/i.test(name)) {
    return name;
  }
  return `${name} County`;
}

/**
 * Interactive county map for a single state lander.
 * Hover/focus shows the real county name (+ movers / guide badge when available).
 * Click navigates to /local-movers/{state}/{county}.
 * Touch: first tap previews the name; second tap opens the guide.
 */
export function StateCountyMap({
  stateSlug,
  stateName,
  countyMeta,
  className,
}: Props) {
  const liveRegionId = useId();
  const tooltipId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapShellRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [countyGeo, setCountyGeo] = useState<MapStateCountiesGeo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState<ActiveCounty | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  /** Touch: require second tap to navigate after preview. */
  const [touchPreviewSlug, setTouchPreviewSlug] = useState<string | null>(null);

  const metaBySlug = useMemo(() => {
    const map = new Map<string, StateCountyMapMeta>();
    for (const row of countyMeta ?? []) {
      map.set(row.slug, row);
    }
    return map;
  }, [countyMeta]);

  const resolveCounty = useCallback(
    (slug: string, geoName: string, href: string): ActiveCounty => {
      const meta = metaBySlug.get(slug);
      const label =
        meta?.label ?? formatCountyLabel(geoName, stateSlug);
      const parts: string[] = [];
      if (typeof meta?.moverCount === 'number' && meta.moverCount > 0) {
        parts.push(
          `${meta.moverCount} local mover${meta.moverCount === 1 ? '' : 's'}`
        );
      }
      if (meta?.isDeepGuide) {
        parts.push('Deep guide');
      } else if (meta?.guideBadge && meta.guideBadge !== 'Limited') {
        parts.push(meta.guideBadge);
      }
      return {
        slug,
        label,
        secondary: parts.length ? parts.join(' · ') : undefined,
        href,
      };
    },
    [metaBySlug, stateSlug]
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || countyGeo || error) return;

    let cancelled = false;
    setLoading(true);

    fetch(`/geo/counties/${stateSlug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('County geo not found');
        return res.json() as Promise<MapStateCountiesGeo>;
      })
      .then((data) => {
        if (!cancelled) setCountyGeo(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isVisible, countyGeo, error, stateSlug]);

  const updateTooltipFromEvent = useCallback(
    (event: React.MouseEvent | React.FocusEvent, county: ActiveCounty) => {
      setActive(county);
      const shell = mapShellRef.current;
      if (!shell) return;
      const rect = shell.getBoundingClientRect();

      if ('clientX' in event && event.clientX) {
        setTooltipPos({
          x: Math.min(Math.max(event.clientX - rect.left, 12), rect.width - 12),
          y: Math.min(Math.max(event.clientY - rect.top - 12, 12), rect.height - 12),
        });
      } else {
        // Keyboard focus — anchor near top-center of map
        setTooltipPos({ x: rect.width / 2, y: 28 });
      }
    },
    []
  );

  const clearActive = useCallback(() => {
    setActive(null);
    setTooltipPos(null);
  }, []);

  if (error) return null;

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={mapShellRef}
        className="relative w-full rounded-2xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        role="region"
        aria-label={`Interactive map of ${stateName} counties`}
      >
        <p id={liveRegionId} className="sr-only" aria-live="polite">
          {active
            ? `${active.label}${
                active.secondary ? `, ${active.secondary}` : ''
              }. Activate to open the local movers guide.`
            : `Showing counties in ${stateName}. Hover or focus a county to see its name, then activate to open its guide.`}
        </p>

        {loading && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/40"
            aria-hidden="true"
          >
            <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {!countyGeo && !loading ? (
          <div className="aspect-[4/3] max-h-[420px] flex items-center justify-center text-sm text-muted-foreground px-4 text-center">
            Scroll to load the {stateName} county map
          </div>
        ) : countyGeo ? (
          <svg
            viewBox={countyGeo.viewBox}
            className="w-full h-auto max-h-[420px] touch-manipulation"
            preserveAspectRatio="xMidYMid meet"
            aria-describedby={liveRegionId}
          >
            {/* No global <title> — browsers would show a generic native tooltip on every hover. */}
            <desc>
              Interactive map of {stateName} counties. Hover or focus a county to
              see its name. Activate a county to open its local movers guide.
            </desc>
            <g>
              {countyGeo.counties.map((county) => {
                const info = resolveCounty(county.slug, county.name, county.href);
                const isHot = active?.slug === county.slug;
                return (
                  <a
                    key={county.slug}
                    href={county.href}
                    data-county-slug={county.slug}
                    data-county-name={info.label}
                    aria-label={`${info.label}${
                      info.secondary ? `, ${info.secondary}` : ''
                    }. Open local movers guide.`}
                    aria-describedby={isHot ? tooltipId : undefined}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                    onMouseEnter={(e) => updateTooltipFromEvent(e, info)}
                    onMouseMove={(e) => {
                      if (active?.slug === info.slug) {
                        updateTooltipFromEvent(e, info);
                      }
                    }}
                    onMouseLeave={clearActive}
                    onFocus={(e) => updateTooltipFromEvent(e, info)}
                    onBlur={clearActive}
                    onClick={(e) => {
                      // Touch / coarse pointer: first tap previews, second navigates
                      const coarse =
                        typeof window !== 'undefined' &&
                        window.matchMedia('(hover: none), (pointer: coarse)')
                          .matches;
                      if (coarse && touchPreviewSlug !== county.slug) {
                        e.preventDefault();
                        setTouchPreviewSlug(county.slug);
                        const shell = mapShellRef.current;
                        if (shell) {
                          const rect = shell.getBoundingClientRect();
                          setActive(info);
                          setTooltipPos({
                            x: rect.width / 2,
                            y: Math.min(rect.height * 0.35, 80),
                          });
                        } else {
                          setActive(info);
                        }
                      }
                    }}
                  >
                    {/* Native accessible name for AT / fallback tooltip */}
                    <title>{info.label}</title>
                    <path
                      d={county.path}
                      fill={isHot ? COUNTY_HOVER : COUNTY_FILL}
                      stroke={STROKE}
                      strokeWidth={0.4}
                      className="transition-colors duration-150 cursor-pointer"
                      style={{ vectorEffect: 'non-scaling-stroke' }}
                    />
                  </a>
                );
              })}
            </g>
          </svg>
        ) : null}

        {/* Floating tooltip with real county name */}
        {active && tooltipPos ? (
          <div
            id={tooltipId}
            role="tooltip"
            className="pointer-events-none absolute z-20 max-w-[min(100%-1.5rem,16rem)] -translate-x-1/2 -translate-y-full rounded-lg border bg-slate-900 px-3 py-2 text-left shadow-lg"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
            }}
          >
            <p className="text-sm font-semibold text-white leading-snug">
              {active.label}
            </p>
            {active.secondary ? (
              <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                {active.secondary}
              </p>
            ) : (
              <p className="mt-0.5 text-xs text-slate-400 leading-snug">
                Open local movers guide
              </p>
            )}
            {touchPreviewSlug === active.slug ? (
              <p className="mt-1 text-[11px] text-teal-300 font-medium">
                Tap again to open
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Persistent status strip (desktop hint + mobile when idle) */}
        {!active ? (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto rounded-lg bg-background/90 border px-3 py-1.5 text-xs text-muted-foreground shadow-sm pointer-events-none">
            Hover a county for its name · tap to open the guide
          </div>
        ) : null}
      </div>
    </div>
  );
}
