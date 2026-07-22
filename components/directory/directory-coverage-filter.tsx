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
 * Coverage filter: National · Regional · State · optional multi-select counties.
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
        stateCode: value.stateCode || 'CA',
        countySlugs: [],
      });
  }

  function toggleCounty(countySlug: string) {
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

  return (
    <div className={cn('space-y-2 min-w-0 w-full', className)}>
      <div className="text-xs font-medium mb-1.5 text-muted-foreground">COVERAGE</div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          value={value.mode}
          onChange={(e) => setMode(e.target.value as DirectoryCoverageFilter['mode'])}
          aria-label="Coverage type"
        >
          {MODES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </Select>

        {value.mode === 'regional' ? (
          <Select
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
        ) : null}

        {value.mode === 'state' ? (
          <Select
            value={value.stateCode || ''}
            onChange={(e) =>
              onChange({
                mode: 'state',
                stateCode: e.target.value,
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
        ) : null}
      </div>

      {value.mode === 'state' && value.stateCode ? (
        <div className="rounded-md border bg-muted/20 p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Counties (optional)
            </p>
            <p className="text-[11px] text-muted-foreground">
              {selectedCounties.size > 0
                ? `${selectedCounties.size} selected — click to toggle`
                : 'Leave empty for whole state'}
            </p>
          </div>
          {counties.length > 0 ? (
            <div className="max-h-48 overflow-y-auto overscroll-contain">
              <div className="flex flex-wrap gap-1.5">
                {counties.map((c) => {
                  const active = selectedCounties.has(c.slug);
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => toggleCounty(c.slug)}
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
                        active
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'bg-background text-muted-foreground hover:border-primary/40'
                      )}
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
      ) : null}

      {value.mode === 'national' ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Nationwide / continental coverage only (excludes local/in-state movers).
        </p>
      ) : null}

      {value.mode === 'state' ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {value.countySlugs && value.countySlugs.length > 0
            ? 'Shows movers assigned to or serving the selected counties. Local movers are listed first.'
            : 'Shows interstate carriers/brokers that operate in this state plus local movers based there. Local movers are listed first.'}
        </p>
      ) : null}
    </div>
  );
}
