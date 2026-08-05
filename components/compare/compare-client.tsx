'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { Company } from '@/types';
import {
  MAX_COMPARE,
  parseAddQueryParams,
  resolveCompareCompanies,
  useCompareStore,
  resetCompareStorage,
} from '@/store/compare-store';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { X } from 'lucide-react';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { getLicenseDisplay, LICENSE_PENDING_MESSAGE } from '@/lib/trust/company-display-policy';
import { SaveComparisonButton } from '@/components/save-my-move/save-comparison-button';
import { resolveYearsInBusiness } from '@/lib/directory/normalize-company';
import { BeforeYouReachOut } from '@/components/research/before-you-reach-out';

interface Props {
  allCompanies: Company[];
}

function safeJoin(arr: unknown, sep: string): string {
  if (!Array.isArray(arr) || arr.length === 0) return '—';
  return arr.map((x) => (x == null ? '' : String(x))).filter(Boolean).join(sep) || '—';
}

function safeLocale(n: unknown): string {
  const v = typeof n === 'number' ? n : Number(n);
  if (!Number.isFinite(v)) return '—';
  return v.toLocaleString();
}

function safeMoney(n: unknown): string {
  const v = typeof n === 'number' ? n : Number(n);
  if (!Number.isFinite(v) || v <= 0) return '—';
  return `$${v.toLocaleString()}`;
}

export function CompareClient({ allCompanies }: Props) {
  const params = useSearchParams();
  const hasHydrated = useCompareStore((s) => s.hasHydrated);
  const selectedSlugs = useCompareStore((s) => s.selectedSlugs);
  const snapshots = useCompareStore((s) => s.snapshots);
  const addSlugWithOptionalCompany = useCompareStore((s) => s.addSlugWithOptionalCompany);
  const removeCompany = useCompareStore((s) => s.removeCompany);
  const clearAll = useCompareStore((s) => s.clearAll);
  const isSelected = useCompareStore((s) => s.isSelected);
  const canAddMore = useCompareStore((s) => s.canAddMore);
  const setHasHydrated = useCompareStore((s) => s.setHasHydrated);

  const [appliedQuery, setAppliedQuery] = useState(false);

  // Finish hydration if persist already completed before mount
  useEffect(() => {
    try {
      if (useCompareStore.persist.hasHydrated()) {
        setHasHydrated(true);
      }
      const unsub = useCompareStore.persist.onFinishHydration(() => {
        setHasHydrated(true);
      });
      // Safety: never block forever if persist is broken
      const t = window.setTimeout(() => {
        if (!useCompareStore.getState().hasHydrated) {
          console.warn('[CompareClient] hydration timeout — forcing ready');
          setHasHydrated(true);
        }
      }, 1500);
      return () => {
        unsub();
        window.clearTimeout(t);
      };
    } catch (e) {
      console.error('[CompareClient] hydration setup', e);
      setHasHydrated(true);
    }
  }, [setHasHydrated]);

  // Deep link: ?add=slug&add=... or ?add=a,b,c — always snapshot even if not in allCompanies
  useEffect(() => {
    if (!hasHydrated || appliedQuery) return;
    try {
      const adds = parseAddQueryParams(params);
      if (adds.length === 0) {
        setAppliedQuery(true);
        return;
      }
      const list = Array.isArray(allCompanies) ? allCompanies : [];
      for (const slug of adds) {
        if (isSelected(slug) || !canAddMore()) continue;
        const found = list.find((c) => c?.slug === slug) ?? null;
        addSlugWithOptionalCompany(slug, found);
      }
    } catch (e) {
      console.error('[CompareClient] apply ?add= failed', e);
    } finally {
      setAppliedQuery(true);
    }
  }, [
    hasHydrated,
    appliedQuery,
    params,
    allCompanies,
    addSlugWithOptionalCompany,
    isSelected,
    canAddMore,
  ]);

  const selected = useMemo(() => {
    if (!hasHydrated) return [];
    try {
      return resolveCompareCompanies(
        selectedSlugs,
        Array.isArray(allCompanies) ? allCompanies : [],
        snapshots
      );
    } catch (e) {
      console.error('[CompareClient] resolve failed', e);
      return [];
    }
  }, [hasHydrated, selectedSlugs, allCompanies, snapshots]);

  if (!hasHydrated) {
    return (
      <Card className="p-8 text-center animate-pulse" aria-busy="true">
        <p className="text-sm text-muted-foreground">Loading your compare list…</p>
      </Card>
    );
  }

  if (selected.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="mb-4 text-muted-foreground">No companies selected yet.</p>
        <p className="mb-4 text-sm text-muted-foreground max-w-md mx-auto">
          On the directory, tap <strong>Compare</strong> on up to four movers. Your selection is
          saved on this device and appears here automatically.
        </p>
        <Link href="/companies">
          <Button>Browse the Directory and Add Companies</Button>
        </Link>
      </Card>
    );
  }

  const fields: { label: string; get: (c: Company) => React.ReactNode }[] = [
    {
      label: 'Reputation Score',
      get: (c) => (
        <span className="font-semibold text-xl">{safeLocale(c.reputationScore)}</span>
      ),
    },
    {
      label: 'Customer Rating',
      get: (c) => <StarRating rating={Number(c.overallRating) || 0} />,
    },
    { label: 'Review Count', get: (c) => safeLocale(c.reviewCount) },
    { label: 'Avg. Price', get: (c) => safeMoney(c.avgPricePerMove) },
    { label: 'Price Tier', get: (c) => c.priceRange || '—' },
    {
      label: 'Years in Business',
      get: (c) => resolveYearsInBusiness(c.yearsInBusiness, c.foundedYear) ?? '—',
    },
    {
      label: 'FMCSA Rating',
      get: (c) => (
        <Badge variant={c.fmcsaSafetyRating === 'Satisfactory' ? 'success' : 'warning'}>
          {c.fmcsaSafetyRating || 'Not Rated'}
        </Badge>
      ),
    },
    { label: 'Complaints (2yr)', get: (c) => safeLocale(c.fmcsaComplaints) },
    { label: 'Shipments Reported', get: (c) => safeLocale(c.fmcsaShipments) },
    {
      label: 'BBB Rating',
      get: (c) => `${c.bbbRating || 'NR'}${c.bbbAccredited ? ' (Accredited)' : ''}`,
    },
    { label: 'Coverage', get: (c) => String(c.coverage || '—') },
    { label: 'Services', get: (c) => safeJoin(c.services, ', ') },
    { label: 'Specialties', get: (c) => safeJoin(c.specialties, ' • ') },
    {
      label: 'USDOT / MC',
      get: (c) => {
        try {
          const display = getLicenseDisplay(c);
          if (display.status === 'verified') {
            return (
              <span className="font-mono text-xs">
                {display.usdot}
                {display.mc ? ` / ${display.mc}` : ''}
              </span>
            );
          }
          if (display.status === 'marketplace') {
            return <span className="text-xs text-muted-foreground">Marketplace</span>;
          }
          return <span className="text-xs text-muted-foreground">{LICENSE_PENDING_MESSAGE}</span>;
        } catch {
          return <span className="text-xs text-muted-foreground">—</span>;
        }
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="text-sm text-muted-foreground">
          Showing {selected.length} of {MAX_COMPARE} companies
        </div>
        <div className="flex gap-2">
          <SaveComparisonButton companySlugs={selectedSlugs} />
          <Button variant="outline" size="sm" onClick={() => clearAll()}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-2xl bg-card">
        <table className="compare-table min-w-[820px] w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="w-40 text-left pl-5">Criteria</th>
              {selected.map((c) => (
                <th key={c.slug || c.id} className="text-left min-w-[210px]">
                  <div className="flex justify-between items-start pr-3 gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/companies/${c.slug}`}
                        className="font-semibold hover:underline"
                      >
                        {c.name || c.slug}
                      </Link>
                      <CompanyTypeBadges company={c} size="compact" className="mt-1" />
                      <div className="text-xs font-normal text-muted-foreground mt-0.5">
                        {c.headquarters || '—'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCompany(c.slug)}
                      className="text-muted-foreground hover:text-foreground shrink-0"
                      aria-label={`Remove ${c.name} from compare`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((row, idx) => (
              <tr key={row.label} className="border-b last:border-none">
                <td className="font-medium pl-5 text-muted-foreground">{row.label}</td>
                {selected.map((c) => (
                  <td key={`${c.slug}-${idx}`}>
                    {(() => {
                      try {
                        return row.get(c);
                      } catch (e) {
                        console.warn('[CompareClient] cell render', row.label, c.slug, e);
                        return '—';
                      }
                    })()}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="pl-5 font-medium text-muted-foreground">Profile</td>
              {selected.map((c) => (
                <td key={`profile-${c.slug}`}>
                  <Link href={`/companies/${c.slug}`}>
                    <Button size="sm" variant="outline">
                      View full profile →
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-3 text-muted-foreground">
        Tip: Add more companies from the{' '}
        <Link href="/companies" className="underline">
          Directory
        </Link>
        . Your selections are saved in your browser.
      </p>

      <div className="mt-8 max-w-3xl">
        <BeforeYouReachOut
          title="Take this comparison with you"
          summaryLines={selected.flatMap((c) => {
            try {
              const lic = getLicenseDisplay(c);
              const id =
                lic.status === 'verified'
                  ? `USDOT ${lic.usdot}${lic.mc ? ` / ${lic.mc}` : ''}`
                  : 'License: verify on FMCSA';
              return [
                `${c.name} — ${id}`,
                `https://www.movetrusthub.com/companies/${c.slug}`,
              ];
            } catch {
              return [`${c.name}`, `https://www.movetrusthub.com/companies/${c.slug}`];
            }
          })}
          mailtoSubject="My Move Trust Hub mover comparison"
        />
      </div>

      {/* Recovery if localStorage was corrupt on a prior load */}
      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Compare list wrong?{' '}
        <button
          type="button"
          className="underline hover:text-foreground"
          onClick={() => {
            resetCompareStorage();
            window.location.href = '/compare';
          }}
        >
          Reset saved compare list
        </button>
      </p>
    </div>
  );
}
