'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, MapPin, Search, X } from 'lucide-react';
import { LenderCard } from '@/components/lender/LenderCard';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';
import type { Lender } from '@/lib/lender/mockData';
import {
  parsePopularFilters,
  searchLenders,
  serializePopularFilters,
  type LenderPopularFilter,
} from '@/lib/lender/search-lenders';
import { getCountyFromZip } from '@/lib/lender/lenders';

const SEARCH_DEBOUNCE_MS = 300;
const URL_SYNC_DEBOUNCE_MS = 400;
const NEAR_ZIP_STORAGE_KEY = 'mth-lender-near-zip';
const DEFAULT_PREVIEW_COUNT = 12;

const POPULAR_FILTERS: { id: LenderPopularFilter; label: string }[] = [
  { id: 'near-me', label: 'Near Me' },
  { id: 'fha', label: 'FHA Approved' },
  { id: 'top-rated', label: 'Top Rated' },
];

type Props = {
  lenders: Lender[];
};

export function MortgageLenderDirectory({ lenders }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const basePath = hubPath('lender', '/');

  const initialSearch = searchParams.get('search') ?? '';
  const initialFilters = parsePopularFilters(searchParams.get('filter'));
  const initialZip = searchParams.get('zip') ?? '';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [popularFilters, setPopularFilters] = useState<LenderPopularFilter[]>(initialFilters);
  const [nearZip, setNearZip] = useState(initialZip);
  const [nearZipDraft, setNearZipDraft] = useState(initialZip);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [nearMeLoading, setNearMeLoading] = useState(false);
  const [nearMeMessage, setNearMeMessage] = useState<string | null>(null);

  const filteredLenders = useMemo(
    () =>
      searchLenders(lenders, {
        search: debouncedSearch,
        popularFilters,
        zip: popularFilters.includes('near-me') ? nearZip : undefined,
      }),
    [lenders, debouncedSearch, popularFilters, nearZip]
  );

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 ||
    popularFilters.length > 0 ||
    (popularFilters.includes('near-me') && nearZip.length > 0);

  const syncUrl = useCallback(
    (search: string, filters: LenderPopularFilter[], zip: string) => {
      const params = new URLSearchParams();
      const trimmed = search.trim();
      if (trimmed) params.set('search', trimmed);
      const filterValue = serializePopularFilters(filters);
      if (filterValue) params.set('filter', filterValue);
      if (filters.includes('near-me') && /^\d{5}$/.test(zip)) params.set('zip', zip);

      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();
      if (nextQuery === currentQuery) return;

      router.replace(nextQuery ? `${basePath}?${nextQuery}` : basePath, { scroll: false });
    },
    [basePath, router, searchParams]
  );

  useEffect(() => {
    if (searchInput === debouncedSearch) {
      setIsSearchPending(false);
      return;
    }
    setIsSearchPending(true);
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput);
      setIsSearchPending(false);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput, debouncedSearch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      syncUrl(debouncedSearch, popularFilters, nearZip);
    }, URL_SYNC_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [debouncedSearch, popularFilters, nearZip, syncUrl]);

  useEffect(() => {
    if (!popularFilters.includes('near-me') || nearZip) return;
    const stored = window.localStorage.getItem(NEAR_ZIP_STORAGE_KEY);
    if (stored && /^\d{5}$/.test(stored)) {
      setNearZip(stored);
      setNearZipDraft(stored);
    }
  }, [popularFilters, nearZip]);

  const clearAll = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setPopularFilters([]);
    setNearZip('');
    setNearZipDraft('');
    setNearMeMessage(null);
  };

  const togglePopularFilter = async (filter: LenderPopularFilter) => {
    setNearMeMessage(null);

    if (popularFilters.includes(filter)) {
      setPopularFilters((prev) => prev.filter((f) => f !== filter));
      if (filter === 'near-me') {
        setNearZip('');
        setNearZipDraft('');
      }
      return;
    }

    if (filter === 'near-me') {
      setPopularFilters((prev) => [...prev, filter]);

      if (/^\d{5}$/.test(nearZip)) return;

      const stored = window.localStorage.getItem(NEAR_ZIP_STORAGE_KEY);
      if (stored && /^\d{5}$/.test(stored)) {
        setNearZip(stored);
        setNearZipDraft(stored);
        return;
      }

      if (!navigator.geolocation) {
        setNearMeMessage('Enter your ZIP code below to find lenders near you.');
        return;
      }

      setNearMeLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              { headers: { Accept: 'application/json' } }
            );
            if (!response.ok) throw new Error('reverse geocode failed');
            const data = (await response.json()) as { address?: { postcode?: string } };
            const postcode = data.address?.postcode?.slice(0, 5);
            if (postcode && /^\d{5}$/.test(postcode)) {
              setNearZip(postcode);
              setNearZipDraft(postcode);
              window.localStorage.setItem(NEAR_ZIP_STORAGE_KEY, postcode);
            } else {
              setNearMeMessage('We found your location — enter your ZIP code below to refine results.');
            }
          } catch {
            setNearMeMessage('Enter your ZIP code below to find lenders near you.');
          } finally {
            setNearMeLoading(false);
          }
        },
        () => {
          setNearMeLoading(false);
          setNearMeMessage('Location access denied. Enter your ZIP code below to find nearby lenders.');
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
      return;
    }

    setPopularFilters((prev) => [...prev, filter]);
  };

  const applyNearZip = () => {
    const trimmed = nearZipDraft.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setNearMeMessage('Please enter a valid 5-digit ZIP code.');
      return;
    }
    setNearZip(trimmed);
    setNearMeMessage(null);
    window.localStorage.setItem(NEAR_ZIP_STORAGE_KEY, trimmed);
    if (!popularFilters.includes('near-me')) {
      setPopularFilters((prev) => [...prev, 'near-me']);
    }
  };

  const nearCounty =
    popularFilters.includes('near-me') && /^\d{5}$/.test(nearZip)
      ? getCountyFromZip(nearZip)
      : undefined;

  const displayLenders = hasActiveFilters
    ? filteredLenders
    : filteredLenders.slice(0, DEFAULT_PREVIEW_COUNT);

  useEffect(() => {
    const shouldScroll =
      window.location.hash.includes('mortgage-lender-directory') ||
      initialSearch.length > 0 ||
      initialFilters.length > 0 ||
      initialZip.length > 0;
    if (!shouldScroll) return;
    document.getElementById('mortgage-lender-directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [initialSearch, initialFilters.length, initialZip]);

  return (
    <section id="mortgage-lender-directory" className="scroll-mt-24 border-t bg-card py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#3B82F6]">
            Mortgage Lender Directory
          </p>
          <h2 className="text-3xl font-bold text-[#0A2540] md:text-4xl">
            Search Verified Mortgage Lenders
          </h2>
          <p className="mt-3 text-zinc-600">
            Search by lender name, city, state, county, loan type, or keywords like &ldquo;local&rdquo;,
            &ldquo;best rates&rdquo;, or &ldquo;veterans&rdquo;.
          </p>
        </div>

        <div className="mx-auto mb-6 max-w-3xl">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search lenders, cities, loan types (FHA, VA, jumbo)…"
              className="h-14 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-24 text-base text-[#0A2540] shadow-sm focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              aria-label="Search mortgage lenders"
              autoComplete="off"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {isSearchPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" aria-hidden="true" />
              ) : null}
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="h-9 gap-1 text-zinc-600"
                  aria-label="Clear search and filters"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Clear
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {POPULAR_FILTERS.map((filter) => {
              const active = popularFilters.includes(filter.id);
              const loading = filter.id === 'near-me' && nearMeLoading;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => void togglePopularFilter(filter.id)}
                  disabled={loading}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-[#0A2540]'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-[#3B82F6]/40'
                  }`}
                >
                  {filter.id === 'near-me' ? (
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : null}
                  {loading ? 'Locating…' : filter.label}
                </button>
              );
            })}
          </div>

          {popularFilters.includes('near-me') ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={nearZipDraft}
                onChange={(e) => setNearZipDraft(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="ZIP code for nearby lenders"
                className="h-11 flex-1 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-[#0A2540] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                aria-label="ZIP code for near me filter"
              />
              <Button type="button" size="sm" onClick={applyNearZip} className="h-11 shrink-0 px-5">
                Apply ZIP
              </Button>
            </div>
          ) : null}

          {nearMeMessage ? (
            <p className="mt-3 text-center text-sm text-zinc-500" role="status">
              {nearMeMessage}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mb-6 max-w-3xl text-center text-sm text-zinc-600" role="status" aria-live="polite">
          {!hasActiveFilters ? (
            <span>
              Previewing top {displayLenders.length} of {lenders.length.toLocaleString()} verified lenders —
              search above to explore the full directory
            </span>
          ) : (
            <span>
              Showing {filteredLenders.length.toLocaleString()} lender
              {filteredLenders.length !== 1 ? 's' : ''}
              {debouncedSearch.trim() ? (
                <>
                  {' '}
                  matching &ldquo;{debouncedSearch.trim()}&rdquo;
                </>
              ) : null}
              {nearCounty ? (
                <>
                  {' '}
                  near {nearCounty.county} County, {nearCounty.state}
                </>
              ) : null}
            </span>
          )}
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {displayLenders.length > 0 ? (
            displayLenders.map((lender, index) => (
              <LenderCard
                key={lender.id}
                lender={lender}
                rank={index + 1}
                countyLabel={`${lender.county} County, ${lender.state}`}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-12 text-center">
              <Search className="mx-auto mb-4 h-10 w-10 text-[#3B82F6]/60" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#0A2540]">No lenders match your search</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                Try broadening your search — use a city or state name, a loan type like FHA or VA, or
                remove filters to see more results.
              </p>
              <ul className="mx-auto mt-4 max-w-sm text-left text-sm text-zinc-500">
                <li>• Search &ldquo;Honolulu&rdquo; or &ldquo;Texas&rdquo; for location matches</li>
                <li>• Try &ldquo;VA&rdquo; or &ldquo;veterans&rdquo; for military loan specialists</li>
                <li>• Use &ldquo;jumbo&rdquo; or &ldquo;FHA&rdquo; for loan-type matches</li>
              </ul>
              {hasActiveFilters ? (
                <Button type="button" variant="outline" className="mt-6" onClick={clearAll}>
                  Clear search &amp; filters
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}