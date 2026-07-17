'use client';

import { useMemo, useState, useTransition } from 'react';
import { updateServiceAreaAction } from '@/actions/portal-owner';
import { US_STATE_OPTIONS } from '@/lib/portal/us-states';
import type { InterstateLane, ServiceAreaMode } from '@/lib/portal/types';
import type { CountyCatalog } from '@/lib/portal/county-catalog-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  companySlug: string;
  mode: ServiceAreaMode;
  states: string[];
  /** Canonical keys: stateSlug/countySlug */
  counties: string[];
  radiusMiles: number | null;
  lanes: InterstateLane[];
  coverageNotes: string | null;
  verifiedStates: string[];
  verifiedNotes: string[];
  countyCatalog: CountyCatalog;
  /** state code → state slug */
  stateSlugByCode: Record<string, string>;
  prefillSources: string[];
};

function countyKey(stateSlug: string, countySlug: string) {
  return `${stateSlug}/${countySlug}`;
}

export function ServiceAreaEditor({
  companySlug,
  mode: initialMode,
  states: initialStates,
  counties: initialCounties,
  radiusMiles: initialRadius,
  lanes: initialLanes,
  coverageNotes: initialNotes,
  verifiedStates,
  verifiedNotes,
  countyCatalog,
  stateSlugByCode,
  prefillSources,
}: Props) {
  const [mode, setMode] = useState<ServiceAreaMode>(initialMode);
  const [states, setStates] = useState<string[]>(initialStates);
  const [counties, setCounties] = useState<string[]>(initialCounties);
  const [radius, setRadius] = useState(initialRadius?.toString() ?? '50');
  const [lanes, setLanes] = useState<InterstateLane[]>(
    initialLanes.length ? initialLanes : [{ from: '', to: '' }]
  );
  const [notes, setNotes] = useState(initialNotes ?? '');
  const [expandedState, setExpandedState] = useState<string | null>(
    initialStates[0] ?? null
  );
  const [countyFilter, setCountyFilter] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [okLocations, setOkLocations] = useState<string[]>([]);

  const countySet = useMemo(() => new Set(counties), [counties]);

  function slugForCode(code: string) {
    return stateSlugByCode[code] ?? code.toLowerCase();
  }

  function toggleState(code: string) {
    setStates((prev) => {
      if (prev.includes(code)) {
        const slug = slugForCode(code);
        setCounties((c) => c.filter((k) => !k.startsWith(`${slug}/`)));
        if (expandedState === code) setExpandedState(null);
        return prev.filter((s) => s !== code);
      }
      setExpandedState(code);
      return [...prev, code].sort();
    });
  }

  function selectAllCounties(code: string) {
    const slug = slugForCode(code);
    const list = countyCatalog[code] ?? [];
    setCounties((prev) => {
      const without = prev.filter((k) => !k.startsWith(`${slug}/`));
      return [...without, ...list.map((c) => countyKey(slug, c.slug))];
    });
    if (!states.includes(code)) {
      setStates((prev) => [...prev, code].sort());
    }
  }

  function deselectAllCounties(code: string) {
    const slug = slugForCode(code);
    setCounties((prev) => prev.filter((k) => !k.startsWith(`${slug}/`)));
  }

  function toggleCounty(code: string, countySlug: string) {
    const slug = slugForCode(code);
    const key = countyKey(slug, countySlug);
    setCounties((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      return [...prev, key];
    });
    if (!states.includes(code)) {
      setStates((prev) => [...prev, code].sort());
    }
  }

  function selectedCountyCount(code: string) {
    const slug = slugForCode(code);
    return counties.filter((k) => k.startsWith(`${slug}/`)).length;
  }

  function isWholeState(code: string) {
    const total = countyCatalog[code]?.length ?? 0;
    const selected = selectedCountyCount(code);
    return states.includes(code) && (selected === 0 || selected >= total);
  }

  function onSave() {
    setError(null);
    setOk(null);
    setOkLocations([]);
    startTransition(async () => {
      // For whole-state selections, send empty county list for that state so server expands all
      const countiesToSend = counties.filter((key) => {
        const code = Object.entries(stateSlugByCode).find(([, slug]) =>
          key.startsWith(`${slug}/`)
        )?.[0];
        if (!code) return true;
        const total = countyCatalog[code]?.length ?? 0;
        const selected = selectedCountyCount(code);
        // If every county checked, treat as whole state (clear partial list)
        if (states.includes(code) && total > 0 && selected >= total) return false;
        return true;
      });

      const result = await updateServiceAreaAction(companySlug, {
        mode,
        states,
        counties: countiesToSend,
        radiusMiles: mode === 'local' ? Number(radius) || 50 : null,
        primaryInterstateLanes: lanes.filter((l) => l.from && l.to),
        coverageNotes: notes,
      });
      if (!result.success) {
        setError(result.error ?? 'Could not save service area');
        return;
      }
      const count = result.assignedCountyCount ?? 0;
      setOk(
        mode === 'national'
          ? 'National coverage saved. Directory listing updated to nationwide.'
          : `Service area saved. ${count} county page${count === 1 ? '' : 's'} and related destination listings were updated.`
      );
      setOkLocations(result.locations ?? []);
    });
  }

  const expandedCounties = expandedState ? (countyCatalog[expandedState] ?? []) : [];
  const filterLower = countyFilter.trim().toLowerCase();
  const filteredCounties = filterLower
    ? expandedCounties.filter((c) => c.name.toLowerCase().includes(filterLower))
    : expandedCounties;

  return (
    <div className="space-y-6">
      {prefillSources.length > 0 ? (
        <Card className="p-4 bg-emerald-50/60 border-emerald-200/80 text-sm">
          <p className="font-medium text-foreground">Pre-populated from your records</p>
          <ul className="mt-1 text-muted-foreground list-disc pl-5 space-y-0.5">
            {prefillSources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Review and adjust before saving — saving syncs you onto local-movers and moving-to pages.
          </p>
        </Card>
      ) : null}

      <Card className="p-5 space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Service area</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose National, Regional, or Local coverage. For Regional and Local, pick whole states
            and/or individual counties. Saving updates your directory coverage and county listings.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Coverage type"
        >
          {([
            { id: 'national' as const, label: 'National' },
            { id: 'regional' as const, label: 'Regional' },
            { id: 'local' as const, label: 'Local' },
          ]).map((tab) => (
            <Button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              size="sm"
              variant={mode === tab.id ? 'default' : 'outline'}
              onClick={() => setMode(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {mode === 'national' ? (
          <p className="text-sm text-muted-foreground rounded-lg border bg-muted/30 p-3">
            National coverage marks you as serving all 50 states in the directory. Use this only if
            you truly operate nationwide with active interstate authority.
          </p>
        ) : (
          <>
            {mode === 'local' ? (
              <div className="space-y-1.5 max-w-xs">
                <Label htmlFor="radius">Service radius from HQ (miles)</Label>
                <Input
                  id="radius"
                  type="number"
                  min={10}
                  max={500}
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </div>
            ) : null}

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <Label className="block">States</Label>
                <p className="text-xs text-muted-foreground">
                  {states.length} selected · click a state to pick counties
                </p>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-52 overflow-y-auto border rounded-lg p-2">
                {US_STATE_OPTIONS.map((code) => {
                  const selected = states.includes(code);
                  const verified = verifiedStates.includes(code);
                  const whole = isWholeState(code);
                  const partial = selected && !whole && selectedCountyCount(code) > 0;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleState(code)}
                      onDoubleClick={() => {
                        if (!states.includes(code)) toggleState(code);
                        setExpandedState(code);
                      }}
                      className={`text-xs rounded px-1.5 py-1.5 border font-medium transition-colors ${
                        selected
                          ? whole
                            ? 'bg-primary text-primary-foreground border-primary'
                            : partial
                              ? 'bg-primary/80 text-primary-foreground border-primary'
                              : 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-muted'
                      } ${verified ? 'ring-1 ring-emerald-500/60' : ''} ${
                        expandedState === code ? 'outline outline-2 outline-offset-1 outline-sky-500' : ''
                      }`}
                      title={
                        verified
                          ? 'Verified coverage signal — click to select, expand below for counties'
                          : 'Click to select; expand panel below for counties'
                      }
                    >
                      {code}
                      {partial ? (
                        <span className="block text-[9px] opacity-90 font-normal">
                          {selectedCountyCount(code)} co.
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {verifiedStates.length > 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Green ring = verified coverage signals ({verifiedStates.join(', ')}).
                </p>
              ) : null}
            </div>

            {states.length > 0 ? (
              <div className="space-y-3 border rounded-lg p-3 bg-muted/20">
                <div className="flex flex-wrap gap-1.5">
                  {states.map((code) => (
                    <Button
                      key={code}
                      type="button"
                      size="sm"
                      variant={expandedState === code ? 'default' : 'outline'}
                      onClick={() => setExpandedState(code)}
                    >
                      {code}
                      {isWholeState(code)
                        ? ' · all'
                        : selectedCountyCount(code) > 0
                          ? ` · ${selectedCountyCount(code)}`
                          : ' · whole'}
                    </Button>
                  ))}
                </div>

                {expandedState ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium flex-1">
                        Counties in {expandedState}
                        <span className="font-normal text-muted-foreground ml-1">
                          ({selectedCountyCount(expandedState)} /{' '}
                          {countyCatalog[expandedState]?.length ?? 0} selected;
                          {selectedCountyCount(expandedState) === 0
                            ? ' whole state on save'
                            : ''}
                          )
                        </span>
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => selectAllCounties(expandedState)}
                      >
                        Select all counties
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => deselectAllCounties(expandedState)}
                      >
                        Deselect all counties
                      </Button>
                    </div>
                    <Input
                      placeholder="Search counties…"
                      value={countyFilter}
                      onChange={(e) => setCountyFilter(e.target.value)}
                      className="max-w-sm"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto border rounded-md p-2 bg-background">
                      {filteredCounties.map((c) => {
                        const key = countyKey(slugForCode(expandedState), c.slug);
                        const checked = countySet.has(key);
                        return (
                          <label
                            key={c.slug}
                            className={`flex items-center gap-2 text-sm rounded px-2 py-1.5 cursor-pointer hover:bg-muted ${
                              checked ? 'bg-primary/10' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="rounded border-input"
                              checked={checked}
                              onChange={() => toggleCounty(expandedState, c.slug)}
                            />
                            <span>{c.name}</span>
                          </label>
                        );
                      })}
                      {filteredCounties.length === 0 ? (
                        <p className="text-sm text-muted-foreground col-span-full p-2">
                          No counties match your search.
                        </p>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tip: leave counties unchecked to cover the entire state. Mix whole states with
                      specific counties in other states as needed.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select one or more states above to expand counties.
              </p>
            )}
          </>
        )}
      </Card>

      <Card className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold">Primary interstate lanes</h3>
          <p className="text-sm text-muted-foreground">
            Origin state → destination state corridors you regularly run (e.g. NY → FL). Max 20.
          </p>
        </div>
        {lanes.map((lane, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-center">
            <select
              className="h-9 rounded-md border border-input bg-background px-2 text-sm max-w-[120px]"
              value={lane.from}
              onChange={(e) => {
                const next = [...lanes];
                next[i] = { ...next[i], from: e.target.value };
                setLanes(next);
              }}
              aria-label={`Lane ${i + 1} origin state`}
            >
              <option value="">Origin</option>
              {US_STATE_OPTIONS.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <span className="text-muted-foreground">→</span>
            <select
              className="h-9 rounded-md border border-input bg-background px-2 text-sm max-w-[120px]"
              value={lane.to}
              onChange={(e) => {
                const next = [...lanes];
                next[i] = { ...next[i], to: e.target.value };
                setLanes(next);
              }}
              aria-label={`Lane ${i + 1} destination state`}
            >
              <option value="">Destination</option>
              {US_STATE_OPTIONS.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setLanes(lanes.filter((_, j) => j !== i))}
            >
              Remove
            </Button>
          </div>
        ))}
        {lanes.length < 20 ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setLanes([...lanes, { from: '', to: '' }])}
          >
            Add lane
          </Button>
        ) : null}

        <div className="space-y-1.5 pt-2">
          <Label htmlFor="coverage-notes">Notes (optional)</Label>
          <Textarea
            id="coverage-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder="Seasonal lanes, military bases, etc."
          />
        </div>
      </Card>

      {verifiedNotes.length > 0 ? (
        <Card className="p-4 bg-muted/30 text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Verified coverage signals</p>
          {verifiedNotes.map((n) => (
            <p key={n}>• {n}</p>
          ))}
        </Card>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {ok ? (
        <Card className="p-4 border-emerald-300 bg-emerald-50/70 space-y-2" role="status">
          <p className="text-sm font-medium text-emerald-900">{ok}</p>
          {okLocations.length > 0 ? (
            <div className="text-sm text-emerald-900/90">
              <p className="font-medium mb-1">Updated locations:</p>
              <ul className="list-disc pl-5 max-h-40 overflow-y-auto space-y-0.5">
                {okLocations.map((loc) => (
                  <li key={loc}>{loc}</li>
                ))}
              </ul>
              {okLocations.length >= 40 ? (
                <p className="text-xs mt-1 text-muted-foreground">
                  Showing first 40 locations; additional counties were also synced.
                </p>
              ) : null}
            </div>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Rankings are never for sale — coverage only controls where you appear as a licensed option.
          </p>
        </Card>
      ) : null}

      <Button onClick={onSave} disabled={pending}>
        {pending ? 'Saving & syncing listings…' : 'Save service area'}
      </Button>
    </div>
  );
}
