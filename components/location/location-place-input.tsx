'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlaceSearchHit } from '@/lib/geo/us-place-types';
import type { PlaceResolveResult } from '@/lib/geo/us-place-types';

export type ConfirmedPlace = {
  kind: 'zip' | 'city';
  label: string;
  city: string;
  stateCode: string;
  stateSlug: string;
  zip: string | null;
  moversHref: string;
  countySlug: string | null;
  countyName: string | null;
};

type LocationPlaceInputProps = {
  id?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  confirmed: ConfirmedPlace | null;
  onConfirm: (place: ConfirmedPlace | null) => void;
  loading?: boolean;
  autoFocus?: boolean;
  /** When true, selecting a city navigates via parent (homepage keeps flow). */
  className?: string;
  inputClassName?: string;
  variant?: 'hero' | 'default';
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '').slice(0, 5);
}

function looksLikeZip(value: string): boolean {
  return /^\d{1,5}$/.test(value.trim());
}

export function LocationPlaceInput({
  id: idProp,
  label,
  placeholder = 'City or ZIP',
  value,
  onChange,
  confirmed,
  onConfirm,
  loading: externalLoading,
  autoFocus,
  className,
  inputClassName,
  variant = 'hero',
}: LocationPlaceInputProps) {
  const autoId = useId();
  const id = idProp || autoId;
  const listId = `${id}-suggestions`;

  const [suggestions, setSuggestions] = useState<PlaceSearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const resolveAbort = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const busy = Boolean(externalLoading || searching || resolving);

  // Debounced city search
  useEffect(() => {
    const q = value.trim();
    if (q.length < 2 || looksLikeZip(q)) {
      setSuggestions([]);
      setOpen(false);
      setSearching(false);
      return;
    }

    // Don't re-search after a confirmed match that matches the field text
    if (
      confirmed &&
      (confirmed.label.toLowerCase() === q.toLowerCase() ||
        (confirmed.zip && confirmed.zip === q))
    ) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const timer = window.setTimeout(() => {
      abortRef.current?.abort();
      const abort = new AbortController();
      abortRef.current = abort;
      setSearching(true);
      setError(null);

      void fetch(`/api/place-search?q=${encodeURIComponent(q)}`, {
        signal: abort.signal,
        headers: { Accept: 'application/json' },
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Search failed');
          const results = (data.results || []) as PlaceSearchHit[];
          setSuggestions(results);
          setHighlight(0);
          setOpen(results.length > 0);
        })
        .catch((err: Error) => {
          if (err.name === 'AbortError') return;
          setSuggestions([]);
          setOpen(false);
        })
        .finally(() => setSearching(false));
    }, 220);

    return () => window.clearTimeout(timer);
  }, [value, confirmed]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const resolveHit = useCallback(
    async (hit: PlaceSearchHit) => {
      resolveAbort.current?.abort();
      const abort = new AbortController();
      resolveAbort.current = abort;
      setResolving(true);
      setError(null);
      setOpen(false);

      try {
        const params = new URLSearchParams({
          city: hit.city,
          state: hit.stateCode,
        });
        const res = await fetch(`/api/place-resolve?${params}`, {
          signal: abort.signal,
          headers: { Accept: 'application/json' },
        });
        const data = (await res.json()) as PlaceResolveResult & {
          error?: string;
        };
        if (!res.ok) throw new Error(data.error || 'Could not resolve place');

        onChange(data.label);
        onConfirm({
          kind: 'city',
          label: data.label,
          city: data.city,
          stateCode: data.stateCode,
          stateSlug: data.stateSlug,
          zip: data.zip,
          moversHref: data.moversHref,
          countySlug: data.countySlug,
          countyName: data.countyName,
        });
        setSuggestions([]);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message || 'Could not resolve place');
        onConfirm(null);
      } finally {
        setResolving(false);
      }
    },
    [onChange, onConfirm]
  );

  const resolveZip = useCallback(
    async (zip: string) => {
      if (zip.length !== 5) {
        onConfirm(null);
        return;
      }
      resolveAbort.current?.abort();
      const abort = new AbortController();
      resolveAbort.current = abort;
      setResolving(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/place-resolve?zip=${encodeURIComponent(zip)}`,
          {
            signal: abort.signal,
            headers: { Accept: 'application/json' },
          }
        );
        const data = (await res.json()) as PlaceResolveResult & {
          error?: string;
        };
        if (!res.ok) throw new Error(data.error || 'ZIP not found');

        onConfirm({
          kind: 'zip',
          label: data.label,
          city: data.city,
          stateCode: data.stateCode,
          stateSlug: data.stateSlug,
          zip: data.zip,
          moversHref: data.moversHref,
          countySlug: data.countySlug,
          countyName: data.countyName,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message || 'ZIP not found');
        onConfirm(null);
      } finally {
        setResolving(false);
      }
    },
    [onConfirm]
  );

  // Auto-resolve complete ZIP
  useEffect(() => {
    const q = value.trim();
    if (!looksLikeZip(q) || q.length !== 5) return;
    if (confirmed?.zip === q) return;
    const timer = window.setTimeout(() => {
      void resolveZip(q);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [value, confirmed?.zip, resolveZip]);

  const onInputChange = (raw: string) => {
    // If user is typing a ZIP, keep digits only
    if (looksLikeZip(raw) || /^\d+$/.test(raw)) {
      onChange(digitsOnly(raw));
    } else {
      onChange(raw);
    }
    if (confirmed) onConfirm(null);
    setError(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const hit = suggestions[highlight];
        if (hit) void resolveHit(hit);
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={wrapRef} className={cn('relative flex-1 min-w-0', className)}>
      <label
        htmlFor={id}
        className={cn(
          'mb-1.5 block text-xs font-semibold uppercase tracking-wider',
          isHero ? 'text-primary/80' : 'text-muted-foreground'
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          'group relative rounded-2xl border-2 bg-white shadow-sm transition-all',
          'focus-within:border-primary focus-within:shadow-md focus-within:ring-4 focus-within:ring-primary/15',
          confirmed ? 'border-emerald-300/80' : 'border-border/80',
          !isHero && 'rounded-xl'
        )}
      >
        <div className="flex items-center gap-2 px-3 sm:px-4">
          <MapPin
            className={cn(
              'h-5 w-5 shrink-0',
              confirmed ? 'text-emerald-600' : 'text-muted-foreground'
            )}
            aria-hidden
          />
          <input
            id={id}
            autoComplete="address-level2"
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setOpen(true);
            }}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && suggestions[highlight]
                ? `${listId}-opt-${highlight}`
                : undefined
            }
            className={cn(
              'w-full bg-transparent outline-none placeholder:font-normal placeholder:text-muted-foreground/70',
              isHero
                ? 'h-14 text-lg font-semibold tracking-wide sm:h-16 sm:text-xl'
                : 'h-11 text-base',
              inputClassName
            )}
          />
          {busy ? (
            <Loader2
              className="h-5 w-5 shrink-0 animate-spin text-primary"
              aria-hidden
            />
          ) : null}
        </div>

        {confirmed ? (
          <p
            id={`${id}-hint`}
            className="border-t border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-sm font-medium text-emerald-800 sm:px-4"
          >
            {confirmed.label}
            {confirmed.countyName ? (
              <span className="font-normal text-emerald-700/80">
                {' '}
                · {confirmed.countyName} County movers
              </span>
            ) : null}
          </p>
        ) : null}

        {open && suggestions.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-auto rounded-xl border bg-white py-1 shadow-lg"
          >
            <li className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Confirm city &amp; state
            </li>
            {suggestions.map((hit, i) => (
              <li key={`${hit.city}-${hit.stateCode}`} role="option">
                <button
                  type="button"
                  id={`${listId}-opt-${i}`}
                  aria-selected={i === highlight}
                  className={cn(
                    'flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm transition-colors',
                    i === highlight
                      ? 'bg-primary/10 text-foreground'
                      : 'hover:bg-muted/80'
                  )}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => void resolveHit(hit)}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-semibold">{hit.label}</span>
                    {hit.countyName ? (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {hit.countyName} County
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : !confirmed && value.trim().length >= 2 && !looksLikeZip(value) ? (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Select a City, State match to open the right county movers page.
        </p>
      ) : null}
    </div>
  );
}
