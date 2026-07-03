'use client';

import React, { useMemo, useState } from 'react';
import { Company, DirectoryFilters, SortOption, ServiceType } from '@/types';
import { getFilteredCompanies } from '@/lib/data';
import { useCompareStore } from '@/store/compare-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowUpDown, Filter, Plus, X } from 'lucide-react';
import { FmcsaVerificationBadge } from '@/components/fmcsa/fmcsa-verification-badge';
import { BbbVerificationBadge } from '@/components/bbb/bbb-verification-badge';
import {
  canShowVerifiedBadge,
  getLicenseDisplay,
} from '@/lib/trust/company-display-policy';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICE_OPTIONS: ServiceType[] = ['Full Service', 'Carrier', 'Container / Portable', 'Auto Transport', 'Storage'];
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
}

export function DirectoryClient({ initialCompanies }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Partial<DirectoryFilters>>({
    search: searchParams.get('search') || '',
    sort: (searchParams.get('sort') as SortOption) || 'reputation',
    minRating: Number(searchParams.get('minRating')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 12000,
    coverage: (searchParams.get('coverage') as any) || 'Any',
    onlyFullService: searchParams.get('full') === 'true',
    onlyVerified: searchParams.get('verified') === 'true',
  });

  const [showFilters, setShowFilters] = useState(true);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  const compareStore = useCompareStore();
  const selectedCount = compareStore.selectedSlugs.length;

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  // Debounced filter application
  React.useEffect(() => {
    const run = async () => {
      const result = await getFilteredCompanies({
        ...filters,
        services: selectedServices,
      });
      setCompanies(result);
    };
    const t = setTimeout(run, 80);
    return () => clearTimeout(t);
  }, [filters, selectedServices]);

  // Sync URL (nice for sharing filtered views)
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.sort && filters.sort !== 'reputation') params.set('sort', filters.sort);
    if (filters.minRating) params.set('minRating', String(filters.minRating));
    if (filters.maxPrice && filters.maxPrice < 12000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.coverage && filters.coverage !== 'Any') params.set('coverage', filters.coverage);
    if (filters.onlyFullService) params.set('full', 'true');
    if (filters.onlyVerified) params.set('verified', 'true');

    router.replace(`/companies?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const updateFilter = <K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleService = (svc: ServiceType) => {
    setSelectedServices(prev =>
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  const clearAllFilters = () => {
    setFilters({ sort: 'reputation', minRating: 0, maxPrice: 12000, coverage: 'Any', onlyFullService: false, onlyVerified: false, search: '' });
    setSelectedServices([]);
  };

  const activeFilterCount = [
    filters.minRating && filters.minRating > 0,
    filters.maxPrice && filters.maxPrice < 12000,
    selectedServices.length,
    filters.coverage !== 'Any',
    filters.onlyFullService,
    filters.onlyVerified,
  ].filter(Boolean).length;

  return (
    <div>
      {/* Top controls */}
      <div className="flex flex-col lg:flex-row gap-3 mb-5 items-start lg:items-center justify-between sticky top-[63px] bg-background/95 backdrop-blur z-40 py-3 border-b">
        <div className="flex items-center gap-2 flex-1 w-full lg:w-auto">
          <Input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search name, location, or keyword..."
            className="max-w-md h-10"
          />
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1.5">
            <Filter className="h-4 w-4" /> Filters {activeFilterCount > 0 && <Badge variant="secondary" className="ml-1 px-1.5">{activeFilterCount}</Badge>}
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
            className="w-full lg:w-72 h-10"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </Select>

          <div className="flex rounded-lg border overflow-hidden">
            <Button variant={view === 'grid' ? 'default' : 'ghost'} size="sm" className="rounded-none" onClick={() => setView('grid')}>Grid</Button>
            <Button variant={view === 'table' ? 'default' : 'ghost'} size="sm" className="rounded-none" onClick={() => setView('table')}>Table</Button>
          </div>

          <Link href="/compare">
            <Button variant="outline" size="sm" className="gap-1.5 whitespace-nowrap" disabled={selectedCount === 0}>
              Compare ({selectedCount}/4)
            </Button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <Card className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Min Rating */}
                <div>
                  <div className="text-xs font-medium mb-1.5 text-muted-foreground">MINIMUM RATING</div>
                  <div className="flex gap-2 items-center">
                    {[3.5, 4, 4.5].map(r => (
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

                {/* Max Price */}
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

                {/* Coverage */}
                <div>
                  <div className="text-xs font-medium mb-1.5 text-muted-foreground">COVERAGE</div>
                  <Select
                    value={filters.coverage}
                    onChange={(e) => updateFilter('coverage', e.target.value as any)}
                  >
                    {COVERAGE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>

                {/* BBB */}
                <div>
                  <div className="text-xs font-medium mb-1.5 text-muted-foreground">MIN BBB RATING</div>
                  <div className="flex flex-wrap gap-1.5">
                    {BBB_OPTIONS.map(b => (
                      <button
                        key={b}
                        onClick={() => updateFilter('bbbMin', filters.bbbMin === b ? undefined : b)}
                        className={`filter-chip text-xs ${filters.bbbMin === b ? 'filter-chip-active' : ''}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
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

              {/* Services chips */}
              <div className="mt-5">
                <div className="text-xs font-medium mb-2 text-muted-foreground">SERVICES OFFERED</div>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map(svc => (
                    <button
                      key={svc}
                      onClick={() => toggleService(svc)}
                      className={`filter-chip ${selectedServices.includes(svc) ? 'filter-chip-active' : ''}`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-4 text-right">
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 text-xs">
                    <X className="h-3.5 w-3.5" /> Clear all filters
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <div><span className="font-medium tabular-nums">{companies.length}</span> companies match your criteria</div>
        <div className="text-muted-foreground hidden sm:block">Click row or card to view full profile</div>
      </div>

      {/* GRID VIEW */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} compareStore={compareStore} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* TABLE VIEW (simple, can be upgraded to TanStack Table) */}
      {view === 'table' && (
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
                const ratio = (c.fmcsaComplaints / Math.max(c.fmcsaShipments, 1) * 1000).toFixed(1);
                const selected = compareStore.isSelected(c.slug);
                return (
                  <tr key={c.id} className="hover:bg-muted/40 border-b last:border-0">
                    <td className="pl-5 py-3 font-medium">
                      <Link href={`/companies/${c.slug}`} className="hover:underline">{c.name}</Link>
                      <div className="text-xs text-muted-foreground">{c.headquarters}</div>
                    </td>
                    <td className="font-semibold text-center">{c.reputationScore}</td>
                    <td><StarRating rating={c.overallRating} size="sm" showNumber /></td>
                    <td className="text-center tabular-nums text-xs">
                      <EditorialReviewVolume count={c.reviewCount} />
                    </td>
                    <td className="text-center tabular-nums">${c.avgPricePerMove.toLocaleString()}</td>
                    <td className="text-center">{c.yearsInBusiness}</td>
                    <td className="text-center text-xs">{ratio}</td>
                    <td className="text-right pr-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/companies/${c.slug}`}>
                          <Button size="sm" variant="outline">Profile</Button>
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

      {companies.length === 0 && (
        <div className="text-center py-12 border rounded-xl">No companies match your current filters. <button onClick={clearAllFilters} className="text-primary underline">Clear filters</button></div>
      )}
    </div>
  );
}

function CompanyCard({ company, compareStore }: { company: Company; compareStore: ReturnType<typeof useCompareStore> }) {
  const isSelected = compareStore.isSelected(company.slug);
  const canAdd = compareStore.canAddMore();

  return (
    <Card className="company-card group overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex justify-between">
          <Link href={`/companies/${company.slug}`} className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">
            {company.name}
          </Link>
          {canShowVerifiedBadge(company) && <Badge variant="success" className="text-[10px] h-fit">VERIFIED</Badge>}
          {canShowVerifiedBadge(company) && <FmcsaVerificationBadge company={company} className="text-[10px] h-fit" />}
          <BbbVerificationBadge company={company} className="text-[10px] h-fit" />
        </div>
        <div className="text-sm text-muted-foreground">{company.headquarters} • Est. {company.foundedYear}</div>

        <div className="mt-3 flex items-baseline gap-2">
          <StarRating rating={company.overallRating} />
          <span className="text-xs text-muted-foreground" title="Industry-reported volume from third-party platforms">
            (<EditorialReviewVolume count={company.reviewCount} />)
          </span>
        </div>

        <div className="mt-2 text-sm line-clamp-2 text-muted-foreground">{company.shortDescription}</div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {company.services.slice(0, 2).map(s => (
            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
          ))}
          {company.specialties.slice(0, 1).map(s => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>
      </div>

      <div className="border-t px-5 py-3.5 bg-muted/20 flex items-center justify-between text-sm">
        <div>
          <span className="font-semibold tabular-nums">{company.reputationScore}</span>
          <span className="text-muted-foreground"> rep • ${company.avgPricePerMove.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/review?carrier=${encodeURIComponent(
              company.usdotNumber ? `DOT ${company.usdotNumber.replace(/\D/g, '')}` : company.mcNumber ? `MC-${company.mcNumber.replace(/\D/g, '')}` : company.name
            )}`}
          >
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">Review</Button>
          </Link>
          <Link href={`/companies/${company.slug}`}>
            <Button size="sm" variant="ghost" className="h-8 px-3">Details</Button>
          </Link>
          <Button
            size="sm"
            variant={isSelected ? 'default' : 'outline'}
            className="h-8 px-3 gap-1"
            onClick={() => compareStore.toggleCompany(company)}
            disabled={!isSelected && !canAdd}
          >
            {isSelected ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {isSelected ? 'Remove' : 'Compare'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
