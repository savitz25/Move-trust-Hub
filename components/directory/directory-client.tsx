'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Company, DirectoryFilters, SortOption, ServiceType } from '@/types';
import { filterCompanies } from '@/lib/directory/filter-companies';
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
import { Filter, Loader2, X } from 'lucide-react';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { CompanyCard } from '@/components/directory/company-card';
import { DirectoryEmptyState } from '@/components/directory/directory-empty-state';
import {
  companyProfileHref,
  formatAvgPricePerMove,
  formatCompanyHeadquarters,
  normalizeCompaniesForDisplay,
} from '@/lib/directory/normalize-company';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

const SEARCH_DEBOUNCE_MS = 350;
const URL_SYNC_DEBOUNCE_MS = 450;
const RESULTS_MIN_HEIGHT = 'min-h-[480px] md:min-h-[520px]';

const SERVICE_OPTIONS: ServiceType[] = [
  'Full Service',
  'Carrier',
  'Broker',
  'Carrier / Broker',
  'Container / Portable',
  'Auto Transport',
  'Storage',
];

function serviceFilterLabel(service: ServiceType): string {
  return service === 'Carrier / Broker' ? 'Carrier/Broker' : service;
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

const COVERAGE_OPTIONS = ['Any', 'All 50 States', 'Continental US', 'East Coast', 'West Coast', 'Midwest', 'South', 'Northeast'] as const;
const BBB_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];

interface Props {
  initialCompanies: Company[];
  sourcePage?: string;
  scope?: DirectorySearchScope;
}

export function DirectoryClient({
  initialCompanies,
  sourcePage = '/companies',
  scope,
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
    onlyFullService: searchParams.get('full') === 'true',
    onlyVerified: searchParams.get('verified') === 'true',
  });

  const [showFilters, setShowFilters] = useState(true);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  const compareStore = useCompareStore();
  const selectedCount = compareStore.selectedSlugs.length;

  const normalizedInitial = useMemo(
    () => normalizeCompaniesForDisplay(initialCompanies),
    [initialCompanies]
  );

  const companies = useMemo(
    () =>
      filterCompanies(normalizedInitial, {
        ...filters,
        search: debouncedSearch,
        services: selectedServices,
        scope,
      }),
    [normalizedInitial, filters, debouncedSearch, selectedServices, scope]
  );

  const parsedCarrierSearch = useMemo(() => {
    const q = debouncedSearch.trim();
    if (!q) return null;
    return parseCarrierNumber(q);
  }, [debouncedSearch]);

  const carrierNotInDirectory = useMemo(() => {
    if (!parsedCarrierSearch) return false;
    const norm = (v: string) => v.replace(/\D/g, '');
    return !normalizedInitial.some((c) =>
      parsedCarrierSearch.type === 'DOT'
        ? norm(c.usdotNumber || '') === parsedCarrierSearch.value
        : norm(c.mcNumber || '') === parsedCarrierSearch.value
    );
  }, [parsedCarrierSearch, normalizedInitial]);

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
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (filters.sort && filters.sort !== 'reputation') params.set('sort', filters.sort);
      if (filters.minRating) params.set('minRating', String(filters.minRating));
      if (filters.maxPrice && filters.maxPrice < 12000) params.set('maxPrice', String(filters.maxPrice));
      if (filters.coverage && filters.coverage !== 'Any') params.set('coverage', filters.coverage);
      if (filters.onlyFullService) params.set('full', 'true');
      if (filters.onlyVerified) params.set('verified', 'true');

      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();
      if (nextQuery === currentQuery) return;

      router.replace(nextQuery ? `/companies?${nextQuery}` : '/companies', { scroll: false });
    }, URL_SYNC_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only push URL when local filter state changes
  }, [debouncedSearch, filters, router]);

  const updateFilter = <K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
      onlyFullService: false,
      onlyVerified: false,
    });
    setSelectedServices([]);
  };

  const activeFilterCount = [
    debouncedSearch.trim().length > 0,
    filters.minRating && filters.minRating > 0,
    filters.maxPrice && filters.maxPrice < 12000,
    selectedServices.length,
    filters.coverage !== 'Any',
    filters.onlyFullService,
    filters.onlyVerified,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;
  const showEmptyState = companies.length === 0;

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

              <div>
                <div className="text-xs font-medium mb-1.5 text-muted-foreground">COVERAGE</div>
                <Select
                  value={filters.coverage}
                  onChange={(e) => updateFilter('coverage', e.target.value as DirectoryFilters['coverage'])}
                >
                  {COVERAGE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
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

      <div className="flex justify-between items-center mb-3 text-sm min-h-[1.25rem]">
        <div aria-live="polite" aria-atomic="true">
          {isSearchPending ? (
            <span className="text-muted-foreground">Updating results…</span>
          ) : (
            <>
              <span className="font-medium tabular-nums">{companies.length}</span> companies match
              your criteria
            </>
          )}
        </div>
        <div className="text-muted-foreground hidden sm:block">Click row or card to view full profile</div>
      </div>

      <div className={`relative ${RESULTS_MIN_HEIGHT}`} aria-busy={isSearchPending}>
        {showEmptyState ? (
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
                  const ratio = ((Number(c.fmcsaComplaints) || 0) / shipments * 1000).toFixed(1);
                  const selected = compareStore.isSelected(c.slug);
                  const profileHref = companyProfileHref(c);
                  return (
                    <tr key={c.id || c.slug} className="hover:bg-muted/40 border-b last:border-0">
                      <td className="pl-5 py-3 font-medium">
                        <Link href={profileHref} className="hover:underline">
                          {c.name || 'Unnamed company'}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {formatCompanyHeadquarters(c.headquarters)}
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
      </div>
    </div>
  );
}