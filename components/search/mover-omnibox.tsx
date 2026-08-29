'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { trackGaEvent } from '@/components/ga-events';
import {
  SEARCH_NUMERIC_THRESHOLD,
  SEARCH_TEXT_THRESHOLD,
} from '@/lib/search/types';

type CompanyHit = {
  companyId: string;
  slug: string;
  displayName: string;
  legalName: string | null;
  headquarters: string;
  usdot: string;
  mc: string;
  role: string;
  authorityStatus: string | null;
  matchExplanation: string;
  matchTier: number;
};

type PlaceHit = {
  kind: string;
  label: string;
  href: string;
  explanation: string;
};

type SearchPayload = {
  query: string;
  intent: string;
  results: CompanyHit[];
  place_results: PlaceHit[];
  verification_action: { href: string; label: string; identifierDisplay: string } | null;
  exact_name_group_size: number;
  direct_jump_slug: string | null;
  ambiguity: boolean;
  result_count: number;
  latency_ms: number;
};

type Option =
  | { kind: 'company'; id: string; href: string; hit: CompanyHit }
  | { kind: 'place'; id: string; href: string; hit: PlaceHit }
  | { kind: 'verify'; id: string; href: string; label: string }
  | { kind: 'all'; id: string; href: string; label: string };

function shouldSearch(q: string): boolean {
  const trimmed = q.trim();
  if (!trimmed) return false;
  if (/^\d+$/.test(trimmed.replace(/[-\s]/g, ''))) {
    return trimmed.replace(/\D/g, '').length >= SEARCH_NUMERIC_THRESHOLD;
  }
  return trimmed.length >= SEARCH_TEXT_THRESHOLD;
}

function latencyBucket(ms: number): string {
  if (ms < 100) return 'under_100';
  if (ms < 200) return '100_199';
  if (ms < 400) return '200_399';
  if (ms < 800) return '400_799';
  return '800_plus';
}

function resultCountBucket(n: number): string {
  if (n === 0) return '0';
  if (n === 1) return '1';
  if (n <= 5) return '2_5';
  if (n <= 20) return '6_20';
  return '21_plus';
}

export function MoverOmnibox({
  compact = false,
  profileCount,
}: {
  compact?: boolean;
  profileCount?: number | null;
}) {
  const router = useRouter();
  const listId = useId();
  const inputId = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<SearchPayload | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);
  const openedRef = useRef(false);

  const options: Option[] = [];
  if (payload) {
    for (const hit of payload.results) {
      options.push({ kind: 'company', id: `c-${hit.companyId}`, href: `/companies/${hit.slug}`, hit });
    }
    for (const hit of payload.place_results) {
      options.push({ kind: 'place', id: `p-${hit.href}`, href: hit.href, hit });
    }
    if (payload.verification_action) {
      options.push({
        kind: 'verify',
        id: 'verify',
        href: payload.verification_action.href,
        label: payload.verification_action.label,
      });
    }
    if (payload.intent === 'COMPANY_IDENTITY' || payload.ambiguity || (payload.result_count > 1 && payload.results.length)) {
      options.push({
        kind: 'all',
        id: 'all',
        href: `/companies?search=${encodeURIComponent(query.trim())}`,
        label: 'Search all matching companies',
      });
    }
  }

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  function emit(event: string, extra: Record<string, string | number | boolean> = {}) {
    trackGaEvent(event, {
      page_path: '/',
      intent: payload?.intent,
      query_length: query.trim().length,
      result_count_bucket: resultCountBucket(payload?.result_count ?? 0),
      ...extra,
    });
  }

  function runSearch(value: string) {
    abortRef.current?.abort();
    if (!shouldSearch(value)) {
      setPayload(null);
      setStatus('');
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    const started = performance.now();
    fetch(`/api/search/movers?q=${encodeURIComponent(value.trim())}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('search failed');
        const data = (await res.json()) as SearchPayload;
        if (controller.signal.aborted) return;
        setPayload(data);
        setOpen(true);
        setActiveIndex(0);
        const count = (data.results?.length ?? 0) + (data.place_results?.length ?? 0);
        setStatus(
          count === 0
            ? 'No MoveTrustHub research profile matched this query.'
            : `${count} research ${count === 1 ? 'result' : 'results'} available.`
        );
        emit('suggestions_returned', {
          intent: data.intent,
          match_tier: data.results[0]?.matchTier ?? 0,
          latency_bucket: latencyBucket(data.latency_ms || Math.round(performance.now() - started)),
          result_count_bucket: resultCountBucket(data.result_count),
          ambiguity_shown: data.ambiguity,
        });
        if (data.result_count === 0) emit('search_no_match', { intent: data.intent });
        if (data.ambiguity) emit('ambiguity_shown', { intent: data.intent });
        if (data.results[0]?.matchTier && data.results[0].matchTier <= 3) {
          emit('exact_identifier_match', { intent: data.intent });
        }
      })
      .catch((err: unknown) => {
        if ((err as { name?: string }).name === 'AbortError') return;
        setStatus('Search is temporarily unavailable.');
      });
  }

  function onChange(value: string) {
    setQuery(value);
    if (!openedRef.current) {
      openedRef.current = true;
      emit('search_opened', { query_length: value.trim().length });
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => runSearch(value), 160);
  }

  function go(href: string, kind: Option['kind'], position: number) {
    emit('search_submitted', { intent: payload?.intent ?? 'UNKNOWN' });
    if (kind === 'company') emit('company_result_clicked', { clicked_position: position });
    if (kind === 'place') emit('place_result_clicked', { clicked_position: position });
    if (kind === 'verify') emit('verify_fallback_clicked', { clicked_position: position });
    router.push(href);
    setOpen(false);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    emit('search_submitted', { has_query: Boolean(trimmed), intent: payload?.intent ?? 'UNKNOWN' });
    if (!trimmed) return;
    const active = options[activeIndex];
    if (open && active) {
      go(active.href, active.kind, activeIndex);
      return;
    }
    if (payload?.direct_jump_slug && !payload.ambiguity) {
      emit('company_result_clicked', { clicked_position: 0, exact_identifier_match: true });
      router.push(`/companies/${payload.direct_jump_slug}`);
      return;
    }
    if (payload?.intent === 'PLACE' && payload.place_results[0]) {
      router.push(payload.place_results[0].href);
      return;
    }
    router.push(`/companies?search=${encodeURIComponent(trimmed)}`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      if (payload) setOpen(true);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Escape') {
      setOpen(false);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  const helper =
    typeof profileCount === 'number' && profileCount > 0
      ? `Search ${profileCount.toLocaleString('en-US')} published research profiles.`
      : 'Search published mover research profiles or jump to state and local research.';

  return (
    <form
      action="/companies"
      method="get"
      role="search"
      aria-label="Research a mover"
      className={compact ? 'w-full max-w-2xl' : 'w-full max-w-xl'}
      onSubmit={onSubmit}
    >
      <label htmlFor={inputId} className="text-sm font-semibold text-[#0A2540]">
        Research a mover
      </label>
      <div className="relative mt-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/80" aria-hidden />
        <input
          id={inputId}
          name="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[activeIndex] ? `${listId}-${options[activeIndex].id}` : undefined}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (payload) setOpen(true);
          }}
          placeholder="Company, USDOT, MC, city or state"
          autoComplete="off"
          maxLength={80}
          className="h-12 w-full rounded-xl border border-border/80 bg-white pl-10 pr-[7.5rem] text-base text-foreground outline-none placeholder:text-[#5a6b7d] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 sm:pr-3"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 hidden h-9 -translate-y-1/2 items-center justify-center rounded-lg bg-[#0A2540] px-3 text-sm font-semibold text-white sm:inline-flex"
        >
          Search
        </button>
        <div className="sr-only" aria-live="polite">
          {status}
        </div>
        {open && payload ? (
          <div
            id={listId}
            role="listbox"
            className="absolute z-30 mt-2 max-h-[min(24rem,70vh)] w-full overflow-auto rounded-xl border border-border bg-white p-2 shadow-lg"
          >
            {payload.ambiguity && payload.exact_name_group_size > 1 ? (
              <p className="px-2 py-2 text-sm text-[#1E293B]">
                {payload.exact_name_group_size} published profiles use this brand name. Use the
                legal name, headquarters or USDOT on your paperwork to identify the correct
                operator. Brand name is not the FMCSA legal entity.
              </p>
            ) : null}
            {payload.results.length > 0 ? (
              <p className="px-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Company research
              </p>
            ) : null}
            {options.map((option, index) => {
              const active = index === activeIndex;
              const common = {
                id: `${listId}-${option.id}`,
                role: 'option' as const,
                'aria-selected': active,
                className: `mt-1 block w-full rounded-lg px-3 py-2.5 text-left no-underline min-h-11 ${
                  active ? 'bg-primary/10' : 'hover:bg-muted/60'
                }`,
              };
              if (option.kind === 'company') {
                const hit = option.hit;
                return (
                  <button
                    key={option.id}
                    type="button"
                    {...common}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(option.href, 'company', index)}
                  >
                    <span className="block font-semibold text-[#0A2540]">{hit.displayName}</span>
                    {hit.legalName ? (
                      <span className="mt-0.5 block text-sm text-muted-foreground">Legal: {hit.legalName}</span>
                    ) : null}
                    <span className="mt-0.5 block text-sm text-[#1E293B]">
                      {hit.headquarters}
                    </span>
                    <span className="mt-0.5 block text-sm tabular-nums text-[#1E293B]">
                      {hit.usdot ? `USDOT ${hit.usdot}` : 'USDOT not recorded'}
                      {hit.mc ? ` · MC ${hit.mc}` : ''} · {hit.role}
                    </span>
                    {hit.authorityStatus ? (
                      <span className="mt-0.5 block text-xs text-[#334155]">{hit.authorityStatus}</span>
                    ) : null}
                    <span className="mt-1 block text-xs font-medium text-primary">{hit.matchExplanation}</span>
                  </button>
                );
              }
              if (option.kind === 'place') {
                return (
                  <button
                    key={option.id}
                    type="button"
                    {...common}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(option.href, 'place', index)}
                  >
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      Local / state research
                    </span>
                    <span className="mt-1 block font-semibold text-[#0A2540]">{option.hit.label}</span>
                    <span className="mt-0.5 block text-sm text-[#1E293B]">{option.hit.explanation}</span>
                  </button>
                );
              }
              return (
                <button
                  key={option.id}
                  type="button"
                  {...common}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => go(option.href, option.kind, index)}
                >
                  <span className="font-semibold text-[#0A2540]">{option.label}</span>
                </button>
              );
            })}
            {options.length === 0 ? (
              <div className="px-3 py-3 text-sm text-[#1E293B]">
                <p>No MoveTrustHub research profile matched this query.</p>
                <p className="mt-2">That does not mean a company is unlicensed.</p>
                <a className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary" href="/verify-dot">
                  Verify DOT / MC
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
      <noscript>
        <button type="submit" className="mt-2 text-sm font-semibold text-primary">
          Search companies
        </button>
      </noscript>
    </form>
  );
}
