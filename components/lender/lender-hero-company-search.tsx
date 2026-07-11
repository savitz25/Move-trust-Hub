'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';

export function LenderHeroCompanySearch({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      document.getElementById('mortgage-lender-directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const params = new URLSearchParams({ search: trimmed });
    router.push(`${hubPath('lender', '/')}?${params.toString()}#mortgage-lender-directory`);
  }

  return (
    <form onSubmit={handleSubmit} className={className} aria-label="Search mortgage lenders by name">
      <p className="mb-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Search by lender name, city, or loan type
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Building2
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Veterans United, FHA Orlando, jumbo Miami"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-base text-[#0A2540] shadow-sm focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
            aria-label="Mortgage lender or company name"
            autoComplete="off"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 shrink-0 gap-2 px-6">
          <Search className="h-4 w-4" aria-hidden="true" />
          Find Lenders
        </Button>
      </div>
    </form>
  );
}