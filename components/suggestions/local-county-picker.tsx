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
  /** County keys from website coverage to pre-check / merge when available */
  preselectKeys?: string[];
  /**
   * Keys that were auto-selected from the website scan (for labeling).
   * Defaults to preselectKeys when omitted.
   */
  autoSelectedKeys?: string[];
};

function countyKey(c: { stateSlug: string; countySlug: string }): string {
  return `${c.stateSlug}/${c.countySlug}`;
}

export function LocalCountyPicker({
  stateCode,
  selected,
  onChange,
  disabled,
  preselectKeys = [],
  autoSelectedKeys,
}: Props) {
  const [counties, setCounties] = useState<CountyOpt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');
  const [appliedPreselectSig, setAppliedPreselectSig] = useState('');

  const autoKeys = useMemo(
    () => new Set(autoSelectedKeys?.length ? autoSelectedKeys : preselectKeys),
    [autoSelectedKeys, preselectKeys]
  );

  useEffect(() => {
    if (!stateCode || stateCode.length !== 2) {
      setCounties([]);
      setAppliedPreselectSig('');
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
    });
  }, [stateCode]);

  // Merge website-detected counties whenever preselect keys change (initial load or after scan).
  useEffect(() => {
    if (!counties.length || preselectKeys.length === 0) return;
    const sig = preselectKeys.slice().sort().join('|');
    if (sig === appliedPreselectSig) return;

    const pre = counties
      .filter((c) => preselectKeys.includes(countyKey(c)))
      .map((c) => ({
        stateSlug: c.stateSlug,
        countySlug: c.countySlug,
        name: c.name,
      }));
    if (!pre.length) {
      setAppliedPreselectSig(sig);
      return;
    }

    const existing = new Set(selected.map(countyKey));
    const merged = [...selected];
    for (const c of pre) {
      if (!existing.has(countyKey(c))) merged.push(c);
    }
    if (merged.length !== selected.length) {
      onChange(merged);
    }
    setAppliedPreselectSig(sig);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-merge when keys / county list change
  }, [counties, preselectKeys, appliedPreselectSig]);

  const selectedKeys = useMemo(
    () => new Set(selected.map((c) => countyKey(c))),
    [selected]
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return counties;
    return counties.filter((c) => c.name.toLowerCase().includes(q));
  }, [counties, filter]);

  function toggle(c: CountyOpt) {
    const key = countyKey(c);
    if (selectedKeys.has(key)) {
      onChange(selected.filter((s) => countyKey(s) !== key));
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

  const autoSelectedCount = selected.filter((s) => autoKeys.has(countyKey(s))).length;

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium">Counties served in {stateName}</p>
          <p className="text-xs text-muted-foreground">
            Local movers only appear on the county pages you select — not the main interstate
            directory. Use <strong className="font-medium text-foreground">Select all</strong> for
            statewide service, or pick a smaller set. Website matches are marked when available.
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

      {autoSelectedCount > 0 ? (
        <p className="text-xs rounded-md border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-1.5 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100">
          {autoSelectedCount} count{autoSelectedCount === 1 ? 'y' : 'ies'} auto-selected from the
          website scan (labeled below). You can uncheck or add others anytime.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          No website matches yet — select counties manually or scan a website above first.
        </p>
      )}

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
          const key = countyKey(c);
          const on = selectedKeys.has(key);
          const fromWebsite = autoKeys.has(key);
          return (
            <label
              key={key}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm cursor-pointer',
                on ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted/60',
                fromWebsite && on ? 'ring-1 ring-emerald-500/40' : null
              )}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggle(c)}
                disabled={disabled}
                className="rounded border-input"
              />
              <span className="truncate flex-1">{c.name}</span>
              {fromWebsite ? (
                <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Site
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
    </div>
  );
}
