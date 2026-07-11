'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/lender/ui/button';
import { trackZipSearch } from '@/components/ga-events';
import {
  isLenderZipQuery,
  resolveLenderNameResultsPath,
  resolveLenderZipTarget,
} from '@/lib/lender/lender-search-submit';

export function SearchBar({ className }: { className?: string }) {
  const [input, setInput] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (isLenderZipQuery(trimmed)) {
      const target = resolveLenderZipTarget(trimmed);
      trackZipSearch({ hub: 'lender', zip: trimmed, destination: target });
      router.push(target);
      return;
    }

    router.push(resolveLenderNameResultsPath(trimmed, '/local-lenders'));
  }

  return (
    <form
      onSubmit={handleSearch}
      className={className}
      aria-label="Search mortgage lenders by ZIP code or company name"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ZIP code or lender name (e.g. 33301, Veterans United)"
          className="h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-[#0A2540] shadow-sm focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
          aria-label="ZIP code or lender name"
          autoComplete="off"
        />
        <Button type="submit" size="lg" className="h-14 gap-2 px-8">
          <Search className="h-5 w-5" aria-hidden="true" />
          Search
        </Button>
      </div>
    </form>
  );
}