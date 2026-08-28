'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { trackGaEvent } from '@/components/ga-events';

/** Directory search only — routes to /companies?search=. No Places. */
export function HomeMoverSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('');

  return (
    <form
      action="/companies"
      method="get"
      role="search"
      aria-label="Research a mover"
      className={compact ? 'flex w-full max-w-xl flex-col gap-2 sm:flex-row' : 'flex w-full max-w-lg flex-col gap-2 sm:flex-row'}
      onSubmit={() => {
        trackGaEvent('move_intel_research_mover', {
          page_path: '/',
          has_query: Boolean(query.trim()),
        });
      }}
    >
      <label htmlFor="home-mover-search" className="sr-only">
        Company name or USDOT number
      </label>
      <span className="relative min-h-11 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/80" aria-hidden />
        <input
          id="home-mover-search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Company name or USDOT"
          autoComplete="off"
          className="h-11 w-full rounded-xl border border-border/80 bg-white pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-[#5a6b7d] focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </span>
      <button
        type="submit"
        className="inline-flex h-11 min-w-[11rem] items-center justify-center rounded-xl border border-[#0A2540] bg-[#0A2540] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1A3654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Research a mover
      </button>
    </form>
  );
}
