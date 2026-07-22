'use client';

import { useMemo } from 'react';
import { Select } from '@/components/ui/select';
import {
  REGIONAL_COVERAGE_OPTIONS,
  stateCodeToSlug,
} from '@/lib/directory/coverage-filter';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { US_STATES } from '@/lib/verify-dot/us-states';
import type { DirectoryCoverageFilter, Region } from '@/types';
import { cn } from '@/lib/utils';

type Props = {
  value: DirectoryCoverageFilter;
  onChange: (next: DirectoryCoverageFilter) => void;
  className?: string;
};

const MODES: Array<{ id: DirectoryCoverageFilter['mode']; label: string }> = [
  { id: 'any', label: 'Any' },
  { id: 'national', label: 'National' },
  { id: 'regional', label: 'Regional' },
  { id: 'state', label: 'State / County' },
];

/**
 * Coverage filter: Any · National · Regional · State / County (multi-select counties).
 * Segmented chips for mode so the control is always obvious in the directory UI.
 */
export function DirectoryCoverageFilterControl({ value, onChange, className }: Props) {
  const counties = useMemo(() => {
    if (value.mode !== 'state' || !value.stateCode) return [];
    const slug = stateCodeToSlug(value.stateCode);
    if (!slug) return [];
    return getCountiesForState(slug);
  }, [value.mode, value.stateCode]);

  const selectedCounties = new Set(
    (value.countySlugs ?? []).map((s) => s.toLowerCase())
  );

  function setMode(mode: DirectoryCoverageFilter['mode']) {
    if (mode === 'any') onChange({ mode: 'any' });
    else if (mode === 'national') onChange({ mode: 'national' });
    else if (mode === 'regional')
      onChange({ mode: 'regional', region: value.region || 'South' });
    else
      onChange({
        mode: 'state',
        // Keep prior state if set; otherwise require explicit pick
        stateCode: value.stateCode || null,
        countySlugs: value.stateCode ? value.countySlugs ?? [] : [],
      });
  }

  function toggleCounty(countySlug: string) {
    if (!value.stateCode) return;
    const slug = countySlug.toLowerCase();
    const prev = value.countySlugs ?? [];
    const next = prev.includes(slug)
      ? prev.filter((s) => s !== slug)
      : [...prev, slug];
    onChange({
      mode: 'state',
      stateCode: value.stateCode,
      countySlugs: next,
    });
  }

  function clearCounties() {
    if (!value.stateCode) return;
    onChange({ mode: 'state', stateCode: value.stateCode, countySlugs: [] });
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3 min-w-0 w-full',
        className
      )}
      data-testid="directory-coverage-filter"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold tracking-wide text-foreground">
          COVERAGE
        </div>
        {value.mode === 'state' && value.stateCode ? (
          <span className="text-[11px] text-muted-foreground">
            {value.stateCode}
            {selectedCounties.size > 0
              ? ` · ${selectedCounties.size} count${selectedCounties.size === 1 ? 'y' : 'ies'}`
              : ' · whole state'}
          </span>
        ) : null}
      </div>

      {/* Segmented mode control — always visible */}
      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="Coverage type"
      >
        {MODES.map((m) => {
          const active = value.mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
              aria-pressed={active}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {value.mode === 'regional' ? (
        <div className="space-y-1.5 max-w-md">
          <label className="text-[11px] font-medium text-muted-foreground" htmlFor="coverage-region">
            Region
          </label>
          <Select
            id="coverage-region"
            value={value.region || 'South'}
            onChange={(e) =>
              onChange({
                mode: 'regional',
                region: e.target.value as Region,
              })
            }
            aria-label="Region"
          >
            {REGIONAL_COVERAGE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      {value.mode === 'state' ? (
        <div className="space-y-3">
          <div className="space-y-1.5 max-w-md">
            <label className="text-[11px] font-medium text-muted-foreground" htmlFor="coverage-state">
              State
            </label>
            <Select
              id="coverage-state"
              value={value.stateCode || ''}
              onChange={(e) =>
                onChange({
                  mode: 'state',
                  stateCode: e.target.value || null,
                  countySlugs: [],
                })
              }
              aria-label="State"
            >
              <option value="">Select state…</option>
              {US_STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>

          {value.stateCode ? (
            <div className="rounded-lg border bg-background p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Counties (optional)
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] text-muted-foreground">
                    {selectedCounties.size > 0
                      ? `${selectedCounties.size} selected`
                      : 'Leave empty for whole state'}
                  </p>
                  {selectedCounties.size > 0 ? (
                    <button
                      type="button"
                      onClick={clearCounties}
                      className="text-[11px] font-medium text-primary hover:underline"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>
              {counties.length > 0 ? (
                <div className="max-h-52 overflow-y-auto overscroll-contain pr-1">
                  <div className="flex flex-wrap gap-1.5">
                    {counties.map((c) => {
                      const active = selectedCounties.has(c.slug);
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => toggleCounty(c.slug)}
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors',
                            active
                              ? 'border-primary bg-primary/10 text-foreground'
                              : 'bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                          )}
                          aria-pressed={active}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No county list available for this state.
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Choose a state to filter movers, then optionally pick counties.
            </p>
          )}
        </div>
      ) : null}

      {value.mode === 'national' ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Nationwide / continental coverage only (excludes local/in-state movers).
        </p>
      ) : null}

      {value.mode === 'state' && value.stateCode ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {value.countySlugs && value.countySlugs.length > 0
            ? 'Shows movers assigned to or serving the selected counties. Local movers are listed first.'
            : 'Shows interstate carriers/brokers that operate in this state plus local movers based there. Local movers are listed first.'}
        </p>
      ) : null}

      {value.mode === 'any' ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Default browse is interstate-focused. Pick State / County or the Local Mover service chip to include local movers.
        </p>
      ) : null}
    </div>
  );
}
