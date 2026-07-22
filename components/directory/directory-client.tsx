'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Company,
  DirectoryCoverageFilter,
  DirectoryFilters,
  SortOption,
  ServiceType,
} from '@/types';
import { buildDirectoryApiQuery } from '@/lib/directory/build-directory-api-query';
import { normalizeCoverageFilter } from '@/lib/directory/coverage-filter';
import { DIRECTORY_PAGE_SIZE } from '@/lib/directory/page-size';
import type { DirectorySearchScope } from '@/lib/directory/search-scope';
import { useCompareStore } from '@/store/compare-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, Filter, Loader2, X } from 'lucide-react';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { CompanyCard } from '@/components/directory/company-card';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { DirectoryCoverageFilterControl } from '@/components/directory/directory-coverage-filter';
import { DirectoryEmptyState } from '@/components/directory/directory-empty-state';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import {
  companyProfileHref,
  formatAvgPricePerMove,
  formatCompanyHeadquarters,
  normalizeCompaniesForDisplay,
} from '@/lib/directory/normalize-company';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

const SEARCH_DEBOUNCE_MS = 350;
const URL_SYNC_DEBOUNCE_MS = 450;
const FILTER_FETCH_DEBOUNCE_MS = 280;
const RESULTS_MIN_HEIGHT = 'min-h-[480px] md:min-h-[520px]';

const SERVICE_OPTIONS: ServiceType[] = [
  'Full Service',
  'Carrier',
  'Broker',
  'Carrier / Broker',
  'Local Mover',
  'Container / Portable',
  'Auto Transport',
  'Storage',
];

function serviceFilterLabel(service: ServiceType): string {
  if (service === 'Carrier / Broker') return 'Carrier/Broker';
  return service;
}

function coverageFilterFromUrl(searchParams: URLSearchParams): DirectoryCoverageFilter {
  return normalizeCoverageFilter({
    coverage: searchParams.get('coverage') || 'Any',
    coverageFilter: {
      mode:
        (searchParams.get('coverageMode') as DirectoryCoverageFilter['mode']) ||
        'any',
      region: (searchParams.get('coverageRegion') as DirectoryCoverageFilter['region']) || null,
      stateCode: searchParams.get('coverageState') || null,
      countySlugs: (searchParams.get('coverageCounties') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    },
  });
}
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'reputation', label: 'Reputation Score (High → Low)' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'reviews', label: 'Number of Reviews' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'years', label: 'Years in Business' },
  { value: 'complaints', label: 'Lowest Complaint Ratio' },
];

const BBB_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];

interface Props {
  /** First page of results (server-side offset 0). */
  initialCompanies: Company[];
  /** Total matches for the SSR query (filtered when URL params present). */
  initialTotal?: number;
  pageSize?: number;
  sourcePage?: string;
  scope?: DirectorySearchScope;
}

type DirectoryPageResponse = {
  companies: Company[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

export function DirectoryClient({
  initialCompanies,
  initialTotal = initialCompanies.length,
  pageSize = DIRECTORY_PAGE_SIZE,
  sourcePage = '/companies',
  scope: _scope,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [isSearchPending, setIsSearchPending] = useState(false);

  const [filters, setFilters] = useState<Partial<DirectoryFilters>>({
    sort: (searchParams.get('sort') as SortOption) || 'reputation',
    minRating: Number(searchParams.get('minRating')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 12000,
    coverage: (searchParams.get('coverage') as DirectoryFilters['coverage']) || 'Any',
    coverageFilter: coverageFilterFromUrl(searchParams),
    onlyFullService: searchParams.get('full') === 'true',
    onlyVerified: searchParams.get('verified') === 'true',
    bbbMin: searchParams.get('bbbMin') || undefined,
  });

  const [showFilters, setShowFilters] = useState(true);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(() => {
    const raw = searchParams.get('services');
    if (!raw) return [];
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean) as ServiceType[];
  });

  const [companies, setCompanies] = useState(() =>
    normalizeCompaniesForDisplay(initialCompanies)
  );
  const [totalMatches, setTotalMatches] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialCompanies.length < initialTotal);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchSeq = useRef(0);
  const skipInitialFilterFetch = useRef(true);

  const compareStore = useCompareStore();
  const selectedCount = compareStore.selectedSlugs.length;

  const fetchPage = useCallback(
    async (offset: number, limit: number, append: boolean) => {
      const seq = ++fetchSeq.current;
      const qs = buildDirectoryApiQuery({
        offset,
        limit,
        filters,
        search: debouncedSearch,
        services: selectedServices,
      });

      if (append) setLoadingMore(true);
      else setLoadingFilter(true);
      setLoadError(null);

      try {
        const res = await fetch(`/api/directory/companies?${qs}`, {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Could not load companies');
        const data = (await res.json()) as DirectoryPageResponse;
        if (seq !== fetchSeq.current) return;

        const next = normalizeCompaniesForDisplay(data.companies ?? []);
        setCompanies((prev) => (append ? [...prev, ...next] : next));
        setTotalMatches(data.total ?? 0);
        setHasMore(Boolean(data.hasMore));
      } catch {
        if (seq !== fetchSeq.current) return;
        setLoadError('Could not load more companies. Please try again.');
      } finally {
        if (seq === fetchSeq.current) {
          setLoadingMore(false);
          setLoadingFilter(false);
        }
      }
    },
    [debouncedSearch, filters, selectedServices]
  );

  const parsedCarrierSearch = useMemo(() => {
    const q = debouncedSearch.trim();
    if (!q) return null;
    return parseCarrierNumber(q);
  }, [debouncedSearch]);

  const carrierNotInDirectory = useMemo(() => {
    if (!parsedCarrierSearch) return false;
    const norm = (v: string) => v.replace(/\D/g, '');
    return !companies.some((c) =>
      parsedCarrierSearch.type === 'DOT'
        ? norm(c.usdotNumber || '') === parsedCarrierSearch.value
        : norm(c.mcNumber || '') === parsedCarrierSearch.value
    );
  }, [parsedCarrierSearch, companies]);

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

  // Re-fetch first page when filters/search change (skip mount — SSR seed is enough)
  useEffect(() => {
    if (skipInitialFilterFetch.current) {
      skipInitialFilterFetch.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      void fetchPage(0, pageSize, false);
    }, FILTER_FETCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [debouncedSearch, filters, selectedServices, pageSize, fetchPage]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (filters.sort && filters.sort !== 'reputation') params.set('sort', filters.sort);
      if (filters.minRating) params.set('minRating', String(filters.minRating));
      if (filters.maxPrice && filters.maxPrice < 12000) params.set('maxPrice', String(filters.maxPrice));
      if (filters.onlyFullService) params.set('full', 'true');
      if (filters.onlyVerified) params.set('verified', 'true');
      if (filters.bbbMin) params.set('bbbMin', filters.bbbMin);
      if (selectedServices.length) params.set('services', selectedServices.join(','));

      const cf = normalizeCoverageFilter(filters);
      if (cf.mode !== 'any') {
        params.set('coverageMode', cf.mode);
        if (cf.mode === 'national') params.set('coverage', 'National');
        if (cf.mode === 'regional' && cf.region) {
          params.set('coverageRegion', cf.region);
          params.set('coverage', cf.region);
        }
        if (cf.mode === 'state' && cf.stateCode) {
          params.set('coverageState', cf.stateCode);
          if (cf.countySlugs?.length) {
            params.set('coverageCounties', cf.countySlugs.join(','));
          }
        }
      }

      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();
      if (nextQuery === currentQuery) return;

      router.replace(nextQuery ? `/companies?${nextQuery}` : '/companies', { scroll: false });
    }, URL_SYNC_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only push URL when local filter state changes
  }, [debouncedSearch, filters, selectedServices, router]);

  const updateFilter = <K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const setCoverageFilter = (coverageFilter: DirectoryCoverageFilter) => {
    setFilters((prev) => ({
      ...prev,
      coverageFilter,
      coverage:
        coverageFilter.mode === 'any'
          ? 'Any'
          : coverageFilter.mode === 'national'
            ? 'National'
            : coverageFilter.mode === 'regional' && coverageFilter.region
              ? coverageFilter.region
              : 'Any',
    }));
  };

  const toggleService = (svc: ServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setFilters({
      sort: 'reputation',
      minRating: 0,
      maxPrice: 12000,
      coverage: 'Any',
      coverageFilter: { mode: 'any' },
      onlyFullService: false,
      onlyVerified: false,
      bbbMin: undefined,
    });
    setSelectedServices([]);
  };

  const loadNextPage = () => {
    if (loadingMore || loadingFilter || !hasMore) return;
    // Always append the next batch of pageSize — no total browse cap.
    void fetchPage(companies.length, pageSize, true);
  };

  const showAll = () => {
    if (loadingMore || loadingFilter || !hasMore) return;
    const remaining = Math.max(totalMatches - companies.length, 0);
    if (remaining <= 0) return;
    // Load every remaining match in one request (API allows full directory size).
    void fetchPage(companies.length, remaining, true);
  };

  const coverageFilter = normalizeCoverageFilter(filters);
  const activeFilterCount = [
    debouncedSearch.trim().length > 0,
    filters.minRating && filters.minRating > 0,
    filters.maxPrice && filters.maxPrice < 12000,
    selectedServices.length,
    coverageFilter.mode !== 'any',
    filters.onlyFullService,
    filters.onlyVerified,
    Boolean(filters.bbbMin),
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;
  const showEmptyState = companies.length === 0 && !loadingFilter;
  const showingFrom = totalMatches === 0 || companies.length === 0 ? 0 : 1;
  const showingTo = companies.length;
  const isBusy = loadingFilter || isSearchPending;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-3 mb-5 items-start lg:items-center justify-between sticky top-[63px] bg-background/95 backdrop-blur z-40 py-3 border-b">
        <div className="flex items-center gap-2 flex-1 w-full lg:w-auto">
          <div className="relative flex-1 max-w-md">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search company name, city, USDOT, or MC number..."
              className="h-10 pr-9"
              aria-label="Search companies"
              autoComplete="off"
            />
            {isSearchPending ? (
              <Loader2
                className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground"
                aria-hidden="true"
              />
            ) : null}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1.5 shrink-0">
            <Filter className="h-4 w-4" /> Filters{' '}
            {activeFilterCount > 0 ? (
              <Badge variant="secondary" className="ml-1 px-1.5">
                {activeFilterCount}
              </Badge>
            ) : null}
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
            className="w-full lg:w-72 h-10"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>

          <div className="flex rounded-lg border overflow-hidden shrink-0">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setView('table')}
            >
              Table
            </Button>
          </div>

          <Link href="/compare">
            <Button variant="outline" size="sm" className="gap-1.5 whitespace-nowrap" disabled={selectedCount === 0}>
              Compare ({selectedCount}/4)
            </Button>
          </Link>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out ${
          showFilters
            ? 'mb-6 grid-rows-[1fr] opacity-100'
            : 'mb-0 grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
        aria-hidden={!showFilters}
      >
        <div className="min-h-0 overflow-hidden">
          <Card className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div>
                <div className="text-xs font-medium mb-1.5 text-muted-foreground">MINIMUM RATING</div>
                <div className="flex gap-2 items-center">
                  {[3.5, 4, 4.5].map((r) => (
                    <Button
                      key={r}
                      size="sm"
                      variant={filters.minRating === r ? 'default' : 'outline'}
                      onClick={() => updateFilter('minRating', filters.minRating === r ? 0 : r)}
                    >
                      {r}+
                    </Button>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-xs font-medium mb-1.5 text-muted-foreground">MAX AVG. PRICE</div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={3000}
                    max={12000}
                    step={250}
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                    className="flex-1 accent-primary min-w-0"
                  />
                  <div className="text-sm font-medium tabular-nums whitespace-nowrap w-16 text-right">
                    ${(filters.maxPrice || 12000).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 md:col-span-2 min-w-0">
                <DirectoryCoverageFilterControl
                  value={coverageFilter}
                  onChange={setCoverageFilter}
                />
              </div>

              <div>
                <div className="text-xs font-medium mb-1.5 text-muted-foreground">MIN BBB RATING</div>
                <div className="flex flex-wrap gap-1.5">
                  {BBB_OPTIONS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => updateFilter('bbbMin', filters.bbbMin === b ? undefined : b)}
                      className={`filter-chip text-xs ${filters.bbbMin === b ? 'filter-chip-active' : ''}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!filters.onlyFullService}
                    onChange={(e) => updateFilter('onlyFullService', e.target.checked)}
                  />
                  Full-Service movers only
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!filters.onlyVerified}
                    onChange={(e) => updateFilter('onlyVerified', e.target.checked)}
                  />
                  Show only verified listings
                </label>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-medium mb-2 text-muted-foreground">SERVICES OFFERED</div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`filter-chip ${selectedServices.includes(svc) ? 'filter-chip-active' : ''}`}
                  >
                    {serviceFilterLabel(svc)}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 ? (
              <div className="mt-4 text-right">
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 text-xs">
                  <X className="h-3.5 w-3.5" /> Clear all filters
                </Button>
              </div>
            ) : null}
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3 text-sm min-h-[1.25rem]">
        <div aria-live="polite" aria-atomic="true" className="text-muted-foreground">
          {isBusy ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Updating results…
            </span>
          ) : totalMatches === 0 ? (
            <span>No companies match your criteria</span>
          ) : (
            <>
              Showing{' '}
              <span className="font-medium text-foreground tabular-nums">
                {showingFrom}–{showingTo}
              </span>{' '}
              of{' '}
              <span className="font-medium text-foreground tabular-nums">{totalMatches}</span>{' '}
              {totalMatches === 1 ? 'company' : 'companies'}
            </>
          )}
        </div>
        <div className="text-muted-foreground hidden sm:block">
          Click row or card to view full profile
        </div>
      </div>

      <div className={`relative ${RESULTS_MIN_HEIGHT}`} aria-busy={isBusy}>
        {loadingFilter && companies.length === 0 ? (
          <div
            className="h-[480px] rounded-xl border bg-muted/30 animate-pulse"
            aria-hidden
          />
        ) : showEmptyState ? (
          <DirectoryEmptyState
            searchTerm={debouncedSearch}
            hasActiveFilters={hasActiveFilters}
            parsedCarrier={parsedCarrierSearch}
            carrierNotInDirectory={carrierNotInDirectory}
            sourcePage={sourcePage}
            onClearFilters={clearAllFilters}
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {companies.map((company) => (
              <CompanyCard
                key={company.id || company.slug}
                company={company}
                compareStore={compareStore}
                profileReturnPath={sourcePage}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-sm data-table">
              <thead>
                <tr>
                  <th className="text-left pl-5">Company</th>
                  <th>Rep. Score</th>
                  <th>Rating</th>
                  <th>Industry volume</th>
                  <th>Avg Price</th>
                  <th>Years</th>
                  <th>Complaints /1k</th>
                  <th className="text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => {
                  const shipments = Math.max(Number(c.fmcsaShipments) || 0, 1);
                  const ratio = (
                    ((Number(c.fmcsaComplaints) || 0) / shipments) *
                    1000
                  ).toFixed(1);
                  const selected = compareStore.isSelected(c.slug);
                  const profileHref = sourcePage
                    ? buildCompanyProfileHref(c.slug, sourcePage)
                    : companyProfileHref(c);
                  return (
                    <tr key={c.id || c.slug} className="hover:bg-muted/40 border-b last:border-0">
                      <td className="pl-5 py-3 font-medium">
                        <Link href={profileHref} className="hover:underline">
                          {c.name || 'Unnamed company'}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {formatCompanyHeadquarters(c.headquarters)}
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1">
                          <CompanyTypeBadges company={c} size="compact" />
                          <CompanyVerificationBadges
                            company={c}
                            size="compact"
                            className="justify-start"
                          />
                        </div>
                      </td>
                      <td className="font-semibold text-center">{c.reputationScore ?? 0}</td>
                      <td>
                        <StarRating rating={Number(c.overallRating) || 0} size="sm" showNumber />
                      </td>
                      <td className="text-center tabular-nums text-xs">
                        <EditorialReviewVolume count={Number(c.reviewCount) || 0} />
                      </td>
                      <td className="text-center tabular-nums">
                        {formatAvgPricePerMove(c.avgPricePerMove)}
                      </td>
                      <td className="text-center">{c.yearsInBusiness ?? 0}</td>
                      <td className="text-center text-xs">{ratio}</td>
                      <td className="text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <Link href={profileHref}>
                            <Button size="sm" variant="outline">
                              Profile
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant={selected ? 'default' : 'outline'}
                            onClick={() => compareStore.toggleCompany(c)}
                            disabled={!selected && !compareStore.canAddMore()}
                          >
                            {selected ? 'Remove' : 'Compare'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {loadError ? (
          <p className="mt-4 text-center text-sm text-destructive" role="alert">
            {loadError}
          </p>
        ) : null}

        {!showEmptyState && hasMore ? (
          <div className="mt-10 flex flex-col items-center gap-3 border-t pt-8">
            <Button
              type="button"
              size="lg"
              className="h-12 min-w-[min(100%,20rem)] px-8 text-base font-semibold shadow-sm"
              disabled={loadingMore || loadingFilter}
              onClick={loadNextPage}
            >
              {loadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Loading…
                </>
              ) : (
                <>
                  Show the next {pageSize} companies
                  <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                </>
              )}
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
              disabled={loadingMore || loadingFilter}
              onClick={showAll}
            >
              Show all remaining ({Math.max(totalMatches - companies.length, 0)})
            </button>
          </div>
        ) : null}

        {!showEmptyState && !hasMore && totalMatches > pageSize ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            You&apos;ve reached the end of the directory
            {hasActiveFilters ? ' for these filters' : ''}.
          </p>
        ) : null}
      </div>
    </div>
  );
}