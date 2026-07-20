'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { listCountiesForLocalCoverage } from '@/actions/suggest-company';
import { Button } from '@/components/ui/button';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';
import { cn } from '@/lib/utils';

type CountyOpt = {
  stateSlug: string;
  countySlug: string;
  name: string;
  stateCode: string;
  stateName: string;
};

type Props = {
  stateCode: string;
  selected: SelectedCounty[];
  onChange: (counties: SelectedCounty[]) => void;
  disabled?: boolean;
  /** County keys from website coverage to pre-check when list loads */
  preselectKeys?: string[];
};

export function LocalCountyPicker({
  stateCode,
  selected,
  onChange,
  disabled,
  preselectKeys = [],
}: Props) {
  const [counties, setCounties] = useState<CountyOpt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!stateCode || stateCode.length !== 2) {
      setCounties([]);
      return;
    }
    startTransition(async () => {
      setError(null);
      const res = await listCountiesForLocalCoverage(stateCode);
      if (!res.success || !res.counties) {
        setError(res.error ?? 'Could not load counties.');
        setCounties([]);
        return;
      }
      setCounties(res.counties);
      if (selected.length === 0 && preselectKeys.length > 0) {
        const pre = res.counties
          .filter((c) => preselectKeys.includes(`${c.stateSlug}/${c.countySlug}`))
          .map((c) => ({
            stateSlug: c.stateSlug,
            countySlug: c.countySlug,
            name: c.name,
          }));
        if (pre.length) onChange(pre);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load when state changes only
  }, [stateCode]);

  const selectedKeys = useMemo(
    () => new Set(selected.map((c) => `${c.stateSlug}/${c.countySlug}`)),
    [selected]
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return counties;
    return counties.filter((c) => c.name.toLowerCase().includes(q));
  }, [counties, filter]);

  function toggle(c: CountyOpt) {
    const key = `${c.stateSlug}/${c.countySlug}`;
    if (selectedKeys.has(key)) {
      onChange(selected.filter((s) => `${s.stateSlug}/${s.countySlug}` !== key));
    } else {
      onChange([
        ...selected,
        { stateSlug: c.stateSlug, countySlug: c.countySlug, name: c.name },
      ]);
    }
  }

  function selectAll() {
    onChange(
      counties.map((c) => ({
        stateSlug: c.stateSlug,
        countySlug: c.countySlug,
        name: c.name,
      }))
    );
  }

  function clearAll() {
    onChange([]);
  }

  if (!stateCode) {
    return (
      <p className="text-sm text-muted-foreground">Select a state to choose counties.</p>
    );
  }

  if (pending && counties.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading counties…
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive" role="alert">
        {error}
      </p>
    );
  }

  const stateName = counties[0]?.stateName || stateCode;

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium">Counties served in {stateName}</p>
          <p className="text-xs text-muted-foreground">
            Local movers only appear on the county pages you select — not the main interstate
            directory. Select all counties in the state, or pick a service area (~200 miles is
            approximated by your state list).
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={selectAll} disabled={disabled}>
            Select all in {stateName}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={clearAll} disabled={disabled}>
            Clear
          </Button>
        </div>
      </div>

      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter counties…"
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        disabled={disabled}
      />

      <p className="text-xs text-muted-foreground">
        {selected.length} of {counties.length} selected
      </p>

      <div className="max-h-48 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 pr-1">
        {filtered.map((c) => {
          const key = `${c.stateSlug}/${c.countySlug}`;
          const on = selectedKeys.has(key);
          return (
            <label
              key={key}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm cursor-pointer',
                on ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted/60'
              )}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggle(c)}
                disabled={disabled}
                className="rounded border-input"
              />
              <span className="truncate">{c.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
