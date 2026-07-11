'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackZipSearch } from '@/components/ga-events';
import { hubPath } from '@/lib/hub/paths';
import { getCountyFromZip } from '@/lib/lender/lenders';
import type { Lender } from '@/lib/lender/mockData';
import { searchLenders } from '@/lib/lender/search-lenders';

type LenderSearchContextValue = {
  input: string;
  setInput: (value: string) => void;
  submit: () => void;
  clear: () => void;
  hasQuery: boolean;
  results: Lender[];
  totalCount: number;
  activeQuery: string;
};

const LenderSearchContext = createContext<LenderSearchContextValue | null>(null);

export function useLenderSearch() {
  const ctx = useContext(LenderSearchContext);
  if (!ctx) throw new Error('useLenderSearch must be used within LenderSearchProvider');
  return ctx;
}

function isZipQuery(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

export function LenderSearchProvider({
  lenders,
  children,
}: {
  lenders: Lender[];
  children: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') ?? '';

  const [input, setInput] = useState(urlSearch);
  const [activeQuery, setActiveQuery] = useState(urlSearch);

  useEffect(() => {
    setInput(urlSearch);
    setActiveQuery(urlSearch);
  }, [urlSearch]);

  const results = useMemo(
    () => searchLenders(lenders, { search: activeQuery }),
    [lenders, activeQuery]
  );

  const hasQuery = activeQuery.trim().length > 0;

  const submit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (isZipQuery(trimmed)) {
      const zip = trimmed;
      const county = getCountyFromZip(zip);
      const target = county
        ? `${hubPath('lender', `/local-lenders/${county.stateSlug}/${county.countySlug}`)}?zip=${zip}`
        : `${hubPath('lender', '/local-lenders')}?zip=${zip}`;
      trackZipSearch({ hub: 'lender', zip, destination: target });
      router.push(target);
      return;
    }

    setActiveQuery(trimmed);
    const params = new URLSearchParams();
    params.set('search', trimmed);
    router.replace(`${hubPath('lender', '/')}?${params.toString()}`, { scroll: false });
  }, [input, router]);

  const clear = useCallback(() => {
    setInput('');
    setActiveQuery('');
    router.replace(hubPath('lender', '/'), { scroll: false });
  }, [router]);

  const value = useMemo(
    () => ({
      input,
      setInput,
      submit,
      clear,
      hasQuery,
      results,
      totalCount: lenders.length,
      activeQuery,
    }),
    [input, submit, clear, hasQuery, results, lenders.length, activeQuery]
  );

  return <LenderSearchContext.Provider value={value}>{children}</LenderSearchContext.Provider>;
}