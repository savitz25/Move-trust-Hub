'use client';

import React, { useMemo, useState } from 'react';
import { Company, SortOption } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowUpDown, Filter, Plus, X, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { canShowVerifiedBadge } from '@/lib/trust/company-display-policy';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'reputation', label: 'Reputation Score (High → Low)' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'reviews', label: 'Number of Reviews' },
  { value: 'price-low', label: 'Price: Low to High (per vehicle)' },
  { value: 'price-high', label: 'Price: High to Low (per vehicle)' },
  { value: 'years', label: 'Years in Business' },
  { value: 'complaints', label: 'Lowest Complaint Ratio' },
];

const COVERAGE_OPTIONS = ['Any', 'All 50 States', 'Continental US'] as const;

interface Props {
  initialCompanies: Company[];
}

export function AutoTransportDirectoryClient({ initialCompanies }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    sort: (searchParams.get('sort') as SortOption) || 'reputation',
    minRating: Number(searchParams.get('minRating')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 3000,
    coverage: (searchParams.get('coverage') as any) || 'Any',
    onlyVerified: searchParams.get('verified') === 'true',
  });

  const [showFilters, setShowFilters] = useState(true);
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  // Client-side filtering + sorting (fast for demo)
  React.useEffect(() => {
    let result = [...initialCompanies];

    if (filters.search && filters.search.trim().length > 1) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.headquarters.toLowerCase().includes(q) ||
        c.specialties.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filters.minRating > 0) {
      result = result.filter(c => c.overallRating >= filters.minRating);
    }

    if (filters.maxPrice < 3000) {
      result = result.filter(c => c.avgPricePerMove <= filters.maxPrice);
    }

    if (filters.coverage && filters.coverage !== 'Any') {
      result = result.filter(c => c.coverage === filters.coverage || c.coverage === 'All 50 States');
    }

    if (filters.onlyVerified) {
      result = result.filter((c) => canShowVerifiedBadge(c));
    }

    const sort = filters.sort || 'reputation';
    result.sort((a, b) => {
      switch (sort) {
        case 'reputation':
          return b.reputationScore - a.reputationScore;
        case 'rating':
          return b.overallRating - a.overallRating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'price-low':
          return a.avgPricePerMove - b.avgPricePerMove;
        case 'price-high':
          return b.avgPricePerMove - a.avgPricePerMove;
        case 'years':
          return b.yearsInBusiness - a.yearsInBusiness;
        case 'complaints': {
          const ratioA = a.fmcsaComplaints / Math.max(a.fmcsaShipments, 1);
          const ratioB = b.fmcsaComplaints / Math.max(b.fmcsaShipments, 1);
          return ratioA - ratioB;
        }
        default:
          return b.reputationScore - a.reputationScore;
      }
    });

    setCompanies(result);
  }, [filters, initialCompanies]);

  // URL sync
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.sort !== 'reputation') params.set('sort', filters.sort);
    if (filters.minRating) params.set('minRating', String(filters.minRating));
    if (filters.maxPrice < 3000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.coverage !== 'Any') params.set('coverage', filters.coverage);
    if (filters.onlyVerified) params.set('verified', 'true');

    router.replace(`/auto-transport?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ sort: 'reputation', minRating: 0, maxPrice: 3000, coverage: 'Any', onlyVerified: false, search: '' });
  };

  const getComplaintRatio = (company: Company) => {
    if (!company.fmcsaShipments) return 0;
    return Number(((company.fmcsaComplaints / company.fmcsaShipments) * 1000).toFixed(2));
  };

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1">
            <X className="h-4 w-4" /> Clear All
          </Button>
          <div className="text-sm text-muted-foreground hidden sm:block">
            {companies.length} companies
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm bg-background"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('grid')}
              className="rounded-none"
            >
              Grid
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('table')}
              className="rounded-none"
            >
              Table
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 border rounded-xl bg-card grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs font-medium mb-1.5 text-muted-foreground">SEARCH</div>
            <Input
              placeholder="Search companies..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          <div>
            <div className="text-xs font-medium mb-1.5 text-muted-foreground">MIN RATING</div>
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={filters.minRating}
              onChange={(e) => updateFilter('minRating', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="text-xs font-medium mb-1.5 text-muted-foreground">MAX PRICE (per vehicle cross-country)</div>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="text-xs font-medium mb-1.5 text-muted-foreground">COVERAGE</div>
            <select
              value={filters.coverage}
              onChange={(e) => updateFilter('coverage', e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            >
              {COVERAGE_OPTIONS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => updateFilter('onlyVerified', e.target.checked)}
              />
              <span>Verified companies only</span>
            </label>

            <Button variant="outline" size="sm" onClick={clearAllFilters} className="ml-auto">
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <Card key={company.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <Link href={`/auto-transport/${company.slug}`} className="font-semibold text-xl hover:text-primary">
                      {company.name}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-0.5">{company.headquarters}</div>
                    <CompanyVerificationBadges company={company} compact className="mt-2 justify-start" />
                  </div>
                  <div className="text-right">
                    <StarRating rating={company.overallRating} />
                    <div className="text-xs text-muted-foreground mt-0.5">
                      (<EditorialReviewVolume count={company.reviewCount} />)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{company.shortDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {company.services.slice(0, 3).map((svc, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{svc}</Badge>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">REPUTATION</div>
                    <div className="font-semibold text-primary">{company.reputationScore}/100</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">AVG PRICE</div>
                    <div className="font-semibold">${company.avgPricePerMove.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">COMPLAINT RATIO</div>
                    <div className="font-semibold">{(company.fmcsaComplaints / Math.max(company.fmcsaShipments, 1) * 1000).toFixed(1)}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    {company.yearsInBusiness} yrs • {company.coverage}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/auto-transport/${company.slug}`} className="text-primary hover:underline">View Profile</Link>
                    <Link href={`/compare?add=${company.slug}`} className="text-primary hover:underline flex items-center gap-1">
                      <Plus className="h-3 w-3" /> Compare
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">No companies match your filters.</div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Rating</th>
                <th className="text-left p-3">Rep. Score</th>
                <th className="text-left p-3">Avg Price</th>
                <th className="text-left p-3">Complaints/1k</th>
                <th className="text-left p-3">Years</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-b hover:bg-muted/20">
                  <td className="p-3 font-medium">
                    <Link href={`/auto-transport/${c.slug}`}>{c.name}</Link>
                    <div className="text-xs text-muted-foreground">{c.headquarters}</div>
                  </td>
                  <td className="p-3">
                    <StarRating rating={c.overallRating} size="sm" />{' '}
                    <span className="text-xs">(<EditorialReviewVolume count={c.reviewCount} />)</span>
                  </td>
                  <td className="p-3 font-semibold text-primary">{c.reputationScore}</td>
                  <td className="p-3">${c.avgPricePerMove.toLocaleString()}</td>
                  <td className="p-3">{(c.fmcsaComplaints / Math.max(c.fmcsaShipments, 1) * 1000).toFixed(1)}</td>
                  <td className="p-3">{c.yearsInBusiness}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link href={`/auto-transport/${c.slug}`} className="text-primary hover:underline">Profile</Link>
                    <Link href={`/compare?add=${c.slug}`} className="text-primary hover:underline">Compare</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-xs text-muted-foreground">
        Data is for research purposes. Always verify current FMCSA licensing and insurance, then contact providers directly for written estimates. Auto transport pricing varies significantly based on route, vehicle type, season, and open vs. enclosed service.
      </div>
    </div>
  );
}
