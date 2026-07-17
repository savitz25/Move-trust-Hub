'use client';

import { useState, useTransition } from 'react';
import { updateServiceAreaAction } from '@/actions/portal-owner';
import { US_STATE_OPTIONS } from '@/lib/portal/us-states';
import type { InterstateLane, ServiceAreaMode } from '@/lib/portal/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  companySlug: string;
  mode: ServiceAreaMode;
  states: string[];
  counties: string[];
  radiusMiles: number | null;
  lanes: InterstateLane[];
  coverageNotes: string | null;
  verifiedStates: string[];
  verifiedNotes: string[];
};

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
}: Props) {
  const [mode, setMode] = useState<ServiceAreaMode>(initialMode);
  const [states, setStates] = useState<string[]>(initialStates);
  const [counties, setCounties] = useState(initialCounties.join(', '));
  const [radius, setRadius] = useState(initialRadius?.toString() ?? '50');
  const [lanes, setLanes] = useState<InterstateLane[]>(
    initialLanes.length ? initialLanes : [{ from: '', to: '' }]
  );
  const [notes, setNotes] = useState(initialNotes ?? '');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  function toggleState(code: string) {
    setStates((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  }

  function onSave() {
    setError(null);
    setOk(null);
    startTransition(async () => {
      const result = await updateServiceAreaAction(companySlug, {
        mode,
        states,
        counties: counties
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
        radiusMiles: mode === 'local' ? Number(radius) || null : null,
        primaryInterstateLanes: lanes,
        coverageNotes: notes,
      });
      if (!result.success) {
        setError(result.error ?? 'Could not save service area');
        return;
      }
      setOk('Service area saved. Directory coverage updated. Rankings are never for sale.');
    });
  }

  return (
    <div className="space-y-6">
      <Card className="p-5 space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Service area</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Describe where you actually operate. Spammy nationwide claims without authority are
            discouraged — we show verified coverage signals separately.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['national', 'regional', 'local'] as const).map((m) => (
            <Button
              key={m}
              type="button"
              size="sm"
              variant={mode === m ? 'default' : 'outline'}
              onClick={() => setMode(m)}
            >
              {m === 'national' ? 'National' : m === 'regional' ? 'Regional' : 'Local'}
            </Button>
          ))}
        </div>

        {mode !== 'national' ? (
          <div>
            <Label className="mb-2 block">States</Label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto border rounded-lg p-2">
              {US_STATE_OPTIONS.map((code) => {
                const selected = states.includes(code);
                const verified = verifiedStates.includes(code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => toggleState(code)}
                    className={`text-xs rounded px-1.5 py-1 border ${
                      selected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted'
                    } ${verified ? 'ring-1 ring-emerald-500/50' : ''}`}
                    title={verified ? 'Verified coverage signal' : undefined}
                  >
                    {code}
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
        ) : null}

        {mode === 'local' ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="radius">Radius from HQ (miles)</Label>
              <Input
                id="radius"
                type="number"
                min={10}
                max={500}
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="counties">Counties (comma-separated, optional)</Label>
              <Input
                id="counties"
                value={counties}
                onChange={(e) => setCounties(e.target.value)}
                placeholder="Richland, Lexington"
              />
            </div>
          </div>
        ) : null}

        {mode === 'regional' ? (
          <div className="space-y-1.5">
            <Label htmlFor="counties-r">Counties (optional, comma-separated)</Label>
            <Input
              id="counties-r"
              value={counties}
              onChange={(e) => setCounties(e.target.value)}
            />
          </div>
        ) : null}
      </Card>

      <Card className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold">Primary interstate lanes</h3>
          <p className="text-sm text-muted-foreground">
            Common origin → destination corridors (e.g. NY → FL). Max 20.
          </p>
        </div>
        {lanes.map((lane, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="From (city/state)"
              value={lane.from}
              onChange={(e) => {
                const next = [...lanes];
                next[i] = { ...next[i], from: e.target.value };
                setLanes(next);
              }}
              className="max-w-[200px]"
            />
            <span className="text-muted-foreground">→</span>
            <Input
              placeholder="To (city/state)"
              value={lane.to}
              onChange={(e) => {
                const next = [...lanes];
                next[i] = { ...next[i], to: e.target.value };
                setLanes(next);
              }}
              className="max-w-[200px]"
            />
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
      {ok ? <p className="text-sm text-emerald-700">{ok}</p> : null}

      <Button onClick={onSave} disabled={pending}>
        {pending ? 'Saving…' : 'Save service area'}
      </Button>
    </div>
  );
}
