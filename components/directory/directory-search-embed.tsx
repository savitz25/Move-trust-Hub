'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { Loader2, Search, ShieldCheck } from 'lucide-react';
import { searchMoversDirectory } from '@/actions/search-movers-directory';
import { CompanyCard } from '@/components/directory/company-card';
import { DirectoryEmptyState } from '@/components/directory/directory-empty-state';
import { buildCompaniesSearchHref } from '@/lib/directory/verify-dot-link';
import type { DirectorySearchScope } from '@/lib/directory/search-scope';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCompareStore } from '@/store/compare-store';
import type { Company } from '@/types';

const DEBOUNCE_MS = 350;

type Props = {
  sourcePage: string;
  scope?: DirectorySearchScope;
  heading?: string;
  description?: string;
  placeholder?: string;
};

export function DirectorySearchEmbed({
  sourcePage,
  scope,
  heading = 'Search all licensed movers',
  description = 'Search our full interstate directory — the same index used on /companies.',
  placeholder = 'Company name, city, USDOT, or MC number…',
}: Props) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [restrictToScope, setRestrictToScope] = useState(false);
  const [results, setResults] = useState<Company[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [pending, startTransition] = useTransition();
  const compareStore = useCompareStore();

  const activeScope: DirectorySearchScope | undefined = scope
    ? { ...scope, restrictToScope: restrictToScope || Boolean(scope.restrictToScope) }
    : undefined;

  const scopeLabel =
    scope?.countyLabel && scope?.stateName
      ? `${scope.countyLabel}, ${scope.stateName}`
      : scope?.stateName || scope?.stateCode;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotalMatches(0);
      return;
    }

    startTransition(async () => {
      const res = await searchMoversDirectory({
        query: debouncedQuery,
        scope: activeScope,
        limit: 6,
      });
      setResults(res.results);
      setTotalMatches(res.totalMatches);
    });
  }, [debouncedQuery, restrictToScope, scope?.stateCode, scope?.stateName, scope?.countyLabel]);

  const parsedCarrier = debouncedQuery ? parseCarrierNumber(debouncedQuery) : null;
  const showEmpty = Boolean(debouncedQuery && !pending && results.length === 0);

  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm" aria-label="Mover directory search">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-9 pr-9"
          aria-label="Search movers"
          autoComplete="off"
        />
        {pending ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : null}
      </div>

      {scopeLabel ? (
        <label className="mb-4 flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={restrictToScope}
            onChange={(e) => setRestrictToScope(e.target.checked)}
            className="rounded border-input"
          />
          Prefer movers serving {scopeLabel}
        </label>
      ) : null}

      {debouncedQuery && !showEmpty ? (
        <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
          {pending ? (
            'Searching…'
          ) : (
            <>
              <span className="font-medium text-foreground tabular-nums">{totalMatches}</span> match
              {totalMatches === 1 ? '' : 'es'} in the full directory
            </>
          )}
        </p>
      ) : null}

      {showEmpty ? (
        <DirectoryEmptyState
          searchTerm={debouncedQuery}
          hasActiveFilters={restrictToScope}
          parsedCarrier={parsedCarrier}
          carrierNotInDirectory={Boolean(parsedCarrier)}
          sourcePage={sourcePage}
          onClearFilters={() => {
            setRestrictToScope(false);
            setQuery('');
          }}
        />
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((company) => (
              <CompanyCard
                key={company.id || company.slug}
                company={company}
                compareStore={compareStore}
                profileReturnPath={sourcePage}
              />
            ))}
          </div>
          {totalMatches > results.length ? (
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href={buildCompaniesSearchHref(debouncedQuery)}>
                View all {totalMatches} results in directory
              </Link>
            </Button>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
          Search by company name, city, USDOT, or MC number. No match? Verify licensing via DOT and
          add the company to our directory.
        </p>
      )}
    </section>
  );
}