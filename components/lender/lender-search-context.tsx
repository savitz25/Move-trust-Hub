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
import type { Lender } from '@/lib/lender/mockData';
import { searchLenders } from '@/lib/lender/search-lenders';
import {
  isLenderZipQuery,
  resolveLenderNameResultsPath,
  resolveLenderZipTarget,
} from '@/lib/lender/lender-search-submit';

type LenderSearchBasePath = '/local-lenders' | '/';

type LenderSearchContextValue = {
  input: string;
  setInput: (value: string) => void;
  submit: () => void;
  clear: () => void;
  hasQuery: boolean;
  results: Lender[];
  totalCount: number;
  activeQuery: string;
  basePath: LenderSearchBasePath;
};

const LenderSearchContext = createContext<LenderSearchContextValue | null>(null);

export function useLenderSearch() {
  const ctx = useContext(LenderSearchContext);
  if (!ctx) throw new Error('useLenderSearch must be used within LenderSearchProvider');
  return ctx;
}

export function LenderSearchProvider({
  lenders,
  basePath = '/',
  children,
}: {
  lenders: Lender[];
  basePath?: LenderSearchBasePath;
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

    if (isLenderZipQuery(trimmed)) {
      const target = resolveLenderZipTarget(trimmed);
      trackZipSearch({ hub: 'lender', zip: trimmed, destination: target });
      router.push(target);
      return;
    }

    setActiveQuery(trimmed);
    router.replace(resolveLenderNameResultsPath(trimmed, basePath), { scroll: false });
  }, [input, router, basePath]);

  const clear = useCallback(() => {
    setInput('');
    setActiveQuery('');
    router.replace(hubPath('lender', basePath), { scroll: false });
  }, [router, basePath]);

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
      basePath,
    }),
    [input, submit, clear, hasQuery, results, lenders.length, activeQuery, basePath]
  );

  return <LenderSearchContext.Provider value={value}>{children}</LenderSearchContext.Provider>;
}