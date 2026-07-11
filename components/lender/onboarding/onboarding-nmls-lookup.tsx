'use client';

import { useState } from 'react';
import { Loader2, Search, ShieldCheck } from 'lucide-react';
import {
  previewEnrichedLenderSuggestion,
  searchNmlsForOnboardingAction,
} from '@/actions/lender-onboarding';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  onPreviewReady: (preview: EnrichedLenderPreview, nmlsId: string) => void;
  onError: (message: string | null) => void;
  disabled?: boolean;
};

export function OnboardingNmlsLookup({ onPreviewReady, onError, disabled }: Props) {
  const [mode, setMode] = useState<'nmls' | 'name'>('nmls');
  const [nmlsId, setNmlsId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<
    Array<{ nmlsId: string; name: string; location: string | null }>
  >([]);

  async function lookupByNmls(id: string) {
    setLoading(true);
    onError(null);
    setCandidates([]);

    const enriched = await previewEnrichedLenderSuggestion({ nmlsId: id });
    setLoading(false);

    if (!enriched.success || !enriched.preview) {
      onError(enriched.error ?? 'NMLS lookup failed');
      return;
    }

    onPreviewReady(enriched.preview, id.replace(/\D/g, ''));
  }

  async function handleNmlsSubmit(e: React.FormEvent) {
    e.preventDefault();
    await lookupByNmls(nmlsId);
  }

  async function handleNameSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    onError(null);
    setCandidates([]);

    const res = await searchNmlsForOnboardingAction(companyName, state || undefined);
    setLoading(false);

    if (!res.success || !res.candidates?.length) {
      onError(res.error ?? 'No matches found');
      return;
    }

    setCandidates(res.candidates);
  }

  async function selectCandidate(id: string) {
    setNmlsId(id);
    await lookupByNmls(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'nmls' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('nmls')}
        >
          NMLS ID
        </Button>
        <Button
          type="button"
          variant={mode === 'name' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('name')}
        >
          Company name
        </Button>
      </div>

      {mode === 'nmls' ? (
        <form onSubmit={handleNmlsSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={nmlsId}
            onChange={(e) => setNmlsId(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="NMLS ID, e.g. 3030"
            className="h-12"
            inputMode="numeric"
            required
            disabled={disabled || loading}
          />
          <Button type="submit" className="h-12 gap-2" disabled={disabled || loading || !nmlsId}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying…
              </>
            ) : (
              <>
                Verify NMLS <ShieldCheck className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleNameSearch} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Legal or DBA name"
              className="h-12"
              required
              disabled={disabled || loading}
            />
            <Input
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
              placeholder="State (optional)"
              className="h-12 w-full sm:w-28"
              maxLength={2}
              disabled={disabled || loading}
            />
            <Button type="submit" className="h-12 gap-2" disabled={disabled || loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4" /> Search
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {candidates.length > 0 ? (
        <ul className="rounded-lg border divide-y max-h-48 overflow-y-auto">
          {candidates.map((c) => (
            <li key={c.nmlsId}>
              <button
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-sm"
                onClick={() => selectCandidate(c.nmlsId)}
                disabled={loading}
              >
                <span className="font-medium text-[#0A2540]">{c.name}</span>
                <span className="text-zinc-500 ml-2">NMLS #{c.nmlsId}</span>
                {c.location ? (
                  <span className="block text-xs text-zinc-500">{c.location}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}