'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MapPin, Search } from 'lucide-react';
import type {
  MapSearchResult,
  MapStateCountiesGeo,
  MapStateMeta,
  MapStatesFile,
} from '@/lib/map/types';

type Props = {
  statesMeta: MapStateMeta[];
};

const CURATED_FILL = '#0d9488';
const CURATED_HOVER = '#14b8a6';
const DEFAULT_FILL = '#cbd5e1';
const DEFAULT_HOVER = '#94a3b8';
const COUNTY_FILL = '#e2e8f0';
const COUNTY_HOVER = '#0d9488';
const STROKE = '#f8fafc';

export function InteractiveUSMap({ statesMeta }: Props) {
  const searchId = useId();
  const listboxId = useId();
  const liveRegionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [statesGeo, setStatesGeo] = useState<MapStatesFile | null>(null);
  const [countyGeo, setCountyGeo] = useState<MapStateCountiesGeo | null>(null);
  const [activeStateSlug, setActiveStateSlug] = useState<string | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [loadingCounties, setLoadingCounties] = useState(false);

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<MapSearchResult[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const curatedBySlug = useMemo(
    () => new Map(statesMeta.map((s) => [s.slug, s.curated])),
    [statesMeta]
  );

  const stateNameBySlug = useMemo(
    () => new Map(statesMeta.map((s) => [s.slug, s.name])),
    [statesMeta]
  );

  const ensureSearchIndex = useCallback(async () => {
    if (searchIndex || loadingSearch) return;
    setLoadingSearch(true);
    try {
      const res = await fetch('/geo/search-index.json');
      const data = (await res.json()) as MapSearchResult[];
      setSearchIndex(data);
    } finally {
      setLoadingSearch(false);
    }
  }, [searchIndex, loadingSearch]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2 || !searchIndex) return [];
    return searchIndex
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.sublabel?.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, searchIndex]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [searchResults]);

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
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || statesGeo) return;

    let cancelled = false;
    setLoadingGeo(true);

    fetch('/geo/us-states.json')
      .then((res) => res.json() as Promise<MapStatesFile>)
      .then((data) => {
        if (!cancelled) setStatesGeo(data);
      })
      .finally(() => {
        if (!cancelled) setLoadingGeo(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isVisible, statesGeo]);

  const loadStateCounties = useCallback(async (stateSlug: string) => {
    setLoadingCounties(true);
    setActiveStateSlug(stateSlug);

    try {
      const res = await fetch(`/geo/counties/${stateSlug}.json`);
      if (!res.ok) throw new Error('County geo not found');
      const data = (await res.json()) as MapStateCountiesGeo;
      setCountyGeo(data);
    } catch {
      setActiveStateSlug(null);
      setCountyGeo(null);
    } finally {
      setLoadingCounties(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setActiveStateSlug(null);
    setCountyGeo(null);
  }, []);

  const handleStateActivate = useCallback(
    (stateSlug: string, event?: React.MouseEvent | React.KeyboardEvent) => {
      if (event) event.preventDefault();
      void loadStateCounties(stateSlug);
    },
    [loadStateCounties]
  );

  const handleSearchSelect = useCallback(
    (result: MapSearchResult) => {
      setQuery('');
      setSearchOpen(false);

      if (result.type === 'county') {
        window.location.href = result.href;
        return;
      }

      if (result.stateSlug) {
        void loadStateCounties(result.stateSlug);
      }
    },
    [loadStateCounties]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeStateSlug) {
        handleBack();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeStateSlug, handleBack]);

  const currentViewBox =
    activeStateSlug && countyGeo
      ? countyGeo.viewBox
      : statesGeo?.viewBox ?? '0 0 960 500';

  const activeStateName = activeStateSlug
    ? stateNameBySlug.get(activeStateSlug)
    : null;

  const liveMessage = activeStateName
    ? `Showing counties in ${activeStateName}. Press Escape to return to the national map.`
    : 'Showing all U.S. states. Click a state to explore its counties.';

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search by state or county
          </label>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            role="combobox"
            aria-expanded={searchOpen && searchResults.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            placeholder="Search by state or county..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
              void ensureSearchIndex();
            }}
            onFocus={() => {
              setSearchOpen(true);
              void ensureSearchIndex();
            }}
            onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
            onKeyDown={(e) => {
              if (!searchResults.length) return;

              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightIndex((i) => Math.min(i + 1, searchResults.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = searchResults[highlightIndex];
                if (selected) handleSearchSelect(selected);
              } else if (e.key === 'Escape') {
                setSearchOpen(false);
              }
            }}
            className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />

          {searchOpen && searchResults.length > 0 && (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-xl border bg-popover shadow-lg py-1"
            >
              {searchResults.map((result, index) => (
                <li key={`${result.type}-${result.href}`} role="option" aria-selected={index === highlightIndex}>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/60 ${
                      index === highlightIndex ? 'bg-muted/60' : ''
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSearchSelect(result)}
                  >
                    <span className="font-medium">{result.label}</span>
                    {result.sublabel && (
                      <span className="text-muted-foreground ml-2">{result.sublabel}</span>
                    )}
                    <span className="sr-only">
                      {result.type === 'state' ? 'State' : 'County'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {activeStateSlug && (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors shrink-0"
            aria-label="Back to national map"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All states
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: CURATED_FILL }}
            aria-hidden="true"
          />
          Fully curated guides
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: DEFAULT_FILL }}
            aria-hidden="true"
          />
          All states
        </span>
      </div>

      <div
        className="relative w-full rounded-2xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        role="region"
        aria-label={
          activeStateName
            ? `Interactive map of ${activeStateName} counties`
            : 'Interactive map of United States states'
        }
      >
        <p id={liveRegionId} className="sr-only" aria-live="polite">
          {liveMessage}
        </p>

        {(loadingGeo || loadingCounties) && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[1px]"
            aria-hidden="true"
          >
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {!statesGeo && !loadingGeo ? (
          <div className="aspect-[16/9] max-h-[520px] flex items-center justify-center text-sm text-muted-foreground">
            Scroll to load the interactive map
          </div>
        ) : (
          <svg
            viewBox={currentViewBox}
            className="w-full h-auto max-h-[520px] touch-manipulation transition-[viewBox] duration-500 ease-in-out"
            preserveAspectRatio="xMidYMid meet"
            aria-describedby={liveRegionId}
          >
            <title>
              {activeStateName
                ? `${activeStateName} county map for local movers`
                : 'United States map for browsing local movers by state'}
            </title>
            <desc>
              {activeStateName
                ? `Click a county in ${activeStateName} to view top local movers in that area.`
                : 'Click any state to zoom in and explore county-level local mover guides.'}
            </desc>

            <AnimatePresence mode="wait">
              {activeStateSlug && countyGeo ? (
                <motion.g
                  key={`counties-${activeStateSlug}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {countyGeo.counties.map((county) => (
                    <a
                      key={county.slug}
                      href={county.href}
                      aria-label={`${county.name}, ${activeStateName} local movers`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
                    >
                      <path
                        d={county.path}
                        fill={COUNTY_FILL}
                        stroke={STROKE}
                        strokeWidth={0.5}
                        className="transition-colors duration-150 cursor-pointer"
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                        onMouseEnter={(e) => {
                          (e.target as SVGPathElement).setAttribute('fill', COUNTY_HOVER);
                        }}
                        onMouseLeave={(e) => {
                          (e.target as SVGPathElement).setAttribute('fill', COUNTY_FILL);
                        }}
                      />
                    </a>
                  ))}
                </motion.g>
              ) : (
                statesGeo && (
                  <motion.g
                    key="states"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {statesGeo.states.map((state) => {
                      const curated = curatedBySlug.get(state.slug) ?? state.curated;
                      return (
                        <a
                          key={state.slug}
                          href={state.href}
                          aria-label={`${state.name}${curated ? ', fully curated local mover guides' : ''}. Click to explore counties.`}
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                          onClick={(e) => handleStateActivate(state.slug, e)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleStateActivate(state.slug, e);
                            }
                          }}
                        >
                          <path
                            d={state.path}
                            fill={curated ? CURATED_FILL : DEFAULT_FILL}
                            stroke={STROKE}
                            strokeWidth={0.75}
                            className="transition-colors duration-150 cursor-pointer"
                            style={{ vectorEffect: 'non-scaling-stroke' }}
                            onMouseEnter={(e) => {
                              (e.target as SVGPathElement).setAttribute(
                                'fill',
                                curated ? CURATED_HOVER : DEFAULT_HOVER
                              );
                            }}
                            onMouseLeave={(e) => {
                              (e.target as SVGPathElement).setAttribute(
                                'fill',
                                curated ? CURATED_FILL : DEFAULT_FILL
                              );
                            }}
                          />
                        </a>
                      );
                    })}
                  </motion.g>
                )
              )}
            </AnimatePresence>
          </svg>
        )}

        {activeStateName && (
          <div className="absolute top-3 left-3 rounded-lg bg-background/90 border px-3 py-1.5 text-sm font-medium shadow-sm">
            <MapPin className="inline h-3.5 w-3.5 mr-1 text-primary" aria-hidden="true" />
            {activeStateName}
          </div>
        )}
      </div>
    </div>
  );
}