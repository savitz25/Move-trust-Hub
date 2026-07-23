'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Search } from 'lucide-react';
import type {
  MapSearchResult,
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
const STROKE = '#f8fafc';

/**
 * National US map for discovery. State selection navigates to
 * /local-movers/{state-slug} — no in-place zoom/filter.
 */
export function InteractiveUSMap({ statesMeta }: Props) {
  const searchId = useId();
  const listboxId = useId();
  const liveRegionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [statesGeo, setStatesGeo] = useState<MapStatesFile | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<MapSearchResult[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const curatedBySlug = useMemo(
    () => new Map(statesMeta.map((s) => [s.slug, s.curated])),
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

  /** Real navigation — state landers or county pages. */
  const handleSearchSelect = useCallback((result: MapSearchResult) => {
    setQuery('');
    setSearchOpen(false);
    window.location.href = result.href;
  }, []);

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
                <li
                  key={`${result.type}-${result.href}`}
                  role="option"
                  aria-selected={index === highlightIndex}
                >
                  <a
                    href={result.href}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted/60 ${
                      index === highlightIndex ? 'bg-muted/60' : ''
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery('');
                      setSearchOpen(false);
                    }}
                  >
                    <span className="font-medium">{result.label}</span>
                    {result.sublabel && (
                      <span className="text-muted-foreground ml-2">
                        {result.sublabel}
                      </span>
                    )}
                    <span className="sr-only">
                      {result.type === 'state'
                        ? 'Open state local movers page'
                        : 'Open county local movers page'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
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
        <span className="inline-flex items-center gap-1.5 text-muted-foreground/90">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
          Click a state to open its full county guide
        </span>
      </div>

      <div
        className="relative w-full rounded-2xl border bg-gradient-to-b from-slate-50 to-white overflow-hidden"
        role="region"
        aria-label="Interactive map of United States states"
      >
        <p id={liveRegionId} className="sr-only" aria-live="polite">
          Showing all U.S. states. Activate a state to open its local movers landing
          page with county guides.
        </p>

        {loadingGeo && (
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
            viewBox={statesGeo?.viewBox ?? '0 0 960 500'}
            className="w-full h-auto max-h-[520px] touch-manipulation"
            preserveAspectRatio="xMidYMid meet"
            aria-describedby={liveRegionId}
          >
            <title>United States map for browsing local movers by state</title>
            <desc>
              Click any state to open its dedicated local movers page with county
              guides. Fully curated states are highlighted in teal.
            </desc>

            {statesGeo && (
              <g key="states">
                {statesGeo.states.map((state) => {
                  const curated = curatedBySlug.get(state.slug) ?? state.curated;
                  // Prefer meta href (canonical /local-movers/{slug}) over geo file
                  const href =
                    statesMeta.find((s) => s.slug === state.slug)?.href ??
                    state.href;
                  return (
                    <a
                      key={state.slug}
                      href={href}
                      aria-label={`${state.name}${
                        curated ? ', fully curated local mover guides' : ''
                      }. Open ${state.name} local movers page.`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
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
              </g>
            )}
          </svg>
        )}
      </div>
    </div>
  );
}
