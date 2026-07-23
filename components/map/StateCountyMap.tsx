'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { MapStateCountiesGeo } from '@/lib/map/types';

type Props = {
  stateSlug: string;
  stateName: string;
  className?: string;
};

const COUNTY_FILL = '#e2e8f0';
const COUNTY_HOVER = '#0d9488';
const STROKE = '#f8fafc';

/**
 * Interactive county map for a single state lander.
 * Each county is a real link to /local-movers/{state}/{county}.
 */
export function StateCountyMap({ stateSlug, stateName, className }: Props) {
  const liveRegionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countyGeo, setCountyGeo] = useState<MapStateCountiesGeo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

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

  if (error) return null;

  return (
    <div ref={containerRef} className={className}>
      <div
        className="relative w-full rounded-2xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        role="region"
        aria-label={`Interactive map of ${stateName} counties`}
      >
        <p id={liveRegionId} className="sr-only" aria-live="polite">
          {hovered
            ? `${hovered} County. Activate to open the local movers guide.`
            : `Showing counties in ${stateName}. Click a county to open its local movers guide.`}
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
            <title>{stateName} county map for local movers</title>
            <desc>
              Click any county in {stateName} to open its local movers guide with
              vetted companies and ratings.
            </desc>
            <g>
              {countyGeo.counties.map((county) => (
                <a
                  key={county.slug}
                  href={county.href}
                  aria-label={`${county.name} County, ${stateName} local movers`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                  onMouseEnter={() => setHovered(county.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(county.name)}
                  onBlur={() => setHovered(null)}
                >
                  <path
                    d={county.path}
                    fill={hovered === county.name ? COUNTY_HOVER : COUNTY_FILL}
                    stroke={STROKE}
                    strokeWidth={0.4}
                    className="transition-colors duration-150 cursor-pointer"
                    style={{ vectorEffect: 'non-scaling-stroke' }}
                  />
                </a>
              ))}
            </g>
          </svg>
        ) : null}

        {hovered ? (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto rounded-lg bg-background/95 border px-3 py-1.5 text-sm font-medium shadow-sm pointer-events-none">
            <span className="text-primary">{hovered}</span>
            <span className="text-muted-foreground font-normal">
              {' '}
              · Open county guide
            </span>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 rounded-lg bg-background/90 border px-3 py-1.5 text-xs text-muted-foreground shadow-sm pointer-events-none">
            Tap a county to open its mover guide
          </div>
        )}
      </div>
    </div>
  );
}
