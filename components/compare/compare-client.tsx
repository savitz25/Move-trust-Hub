'use client';

import React, { useEffect, useState } from 'react';
import { Company } from '@/types';
import { useCompareStore } from '@/store/compare-store';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { X } from 'lucide-react';
import { getLicenseDisplay, LICENSE_PENDING_MESSAGE } from '@/lib/trust/company-display-policy';
import { SaveComparisonButton } from '@/components/save-my-move/save-comparison-button';

interface Props {
  allCompanies: Company[];
}

export function CompareClient({ allCompanies }: Props) {
  const store = useCompareStore();
  const params = useSearchParams();
  const [selected, setSelected] = useState<Company[]>([]);

  // Support deep linking ?add=slug&add=...
  useEffect(() => {
    const adds = params.getAll('add');
    if (adds.length > 0) {
      adds.forEach(slug => {
        const found = allCompanies.find(c => c.slug === slug);
        if (found && !store.isSelected(slug) && store.canAddMore()) {
          store.toggleCompany(found);
        }
      });
    }
  }, []);

  useEffect(() => {
    const companies = store.selectedSlugs
      .map(slug => allCompanies.find(c => c.slug === slug))
      .filter(Boolean) as Company[];
    setSelected(companies);
  }, [store.selectedSlugs, allCompanies]);

  if (selected.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="mb-4 text-muted-foreground">No companies selected yet.</p>
        <Link href="/companies">
          <Button>Browse the Directory and Add Companies</Button>
        </Link>
      </Card>
    );
  }

  const fields: { label: string; get: (c: Company) => React.ReactNode }[] = [
    { label: 'Reputation Score', get: c => <span className="font-semibold text-xl">{c.reputationScore}</span> },
    { label: 'Customer Rating', get: c => <StarRating rating={c.overallRating} /> },
    { label: 'Review Count', get: c => c.reviewCount.toLocaleString() },
    { label: 'Avg. Price', get: c => `$${c.avgPricePerMove.toLocaleString()}` },
    { label: 'Price Tier', get: c => c.priceRange },
    { label: 'Years in Business', get: c => c.yearsInBusiness },
    { label: 'FMCSA Rating', get: c => <Badge variant={c.fmcsaSafetyRating === 'Satisfactory' ? 'success' : 'warning'}>{c.fmcsaSafetyRating}</Badge> },
    { label: 'Complaints (2yr)', get: c => c.fmcsaComplaints },
    { label: 'Shipments Reported', get: c => c.fmcsaShipments.toLocaleString() },
    { label: 'BBB Rating', get: c => `${c.bbbRating}${c.bbbAccredited ? ' (Accredited)' : ''}` },
    { label: 'Coverage', get: c => c.coverage },
    { label: 'Services', get: c => c.services.join(', ') },
    { label: 'Specialties', get: c => c.specialties.join(' • ') || '—' },
    {
      label: 'USDOT / MC',
      get: (c) => {
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
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="text-sm text-muted-foreground">Showing {selected.length} of 4 companies</div>
        <div className="flex gap-2">
          <SaveComparisonButton companySlugs={store.selectedSlugs} />
          <Button variant="outline" size="sm" onClick={store.clearAll}>Clear All</Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-2xl bg-card">
        <table className="compare-table min-w-[820px] w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="w-40 text-left pl-5">Criteria</th>
              {selected.map(c => (
                <th key={c.id} className="text-left min-w-[210px]">
                  <div className="flex justify-between items-start pr-3">
                    <Link href={`/companies/${c.slug}`} className="font-semibold hover:underline">{c.name}</Link>
                    <CompanyTypeBadges company={c} size="compact" className="mt-1 justify-center" />
                    <button onClick={() => store.removeCompany(c.slug)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">{c.headquarters}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((row, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="font-medium pl-5 text-muted-foreground">{row.label}</td>
                {selected.map(c => (
                  <td key={c.id}>{row.get(c)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="pl-5 font-medium text-muted-foreground">Profile</td>
              {selected.map(c => (
                <td key={c.id}>
                  <Link href={`/companies/${c.slug}`}>
                    <Button size="sm" variant="outline">View full profile →</Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-3 text-muted-foreground">Tip: Add more companies from the <Link href="/companies" className="underline">Directory</Link>. Your selections are saved in your browser.</p>
    </div>
  );
}
