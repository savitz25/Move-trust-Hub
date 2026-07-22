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
    <div className={cn('space-y-2 min-w-0', className)}>
      <div className="text-xs font-medium mb-1.5 text-muted-foreground">COVERAGE</div>
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
        <>
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

          {value.stateCode && counties.length > 0 ? (
            <div className="max-h-36 overflow-y-auto rounded-md border bg-muted/20 p-2">
              <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Counties (optional — leave empty for whole state)
              </p>
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
          ) : null}
        </>
      ) : null}

      {value.mode === 'national' ? (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Nationwide / continental coverage only (excludes local/in-state movers).
        </p>
      ) : null}
    </div>
  );
}
