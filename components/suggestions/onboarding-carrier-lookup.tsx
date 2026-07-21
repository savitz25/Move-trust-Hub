'use client';

import { useState, useTransition } from 'react';
import { Loader2, Search, ShieldCheck } from 'lucide-react';
import {
  previewEnrichedCompanySuggestion,
  searchCarriersForOnboarding,
} from '@/actions/suggest-company';
import type { VerifyDotNameCandidate } from '@/actions/verify-dot';
import { DotVerifierNamePicker } from '@/components/verify-dot/dot-verifier-name-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { US_STATES } from '@/lib/verify-dot/us-states';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';

type LookupMode = 'dot' | 'name';

type Props = {
  initialCarrierQuery?: string;
  initialCompanyName?: string;
  onPreviewReady: (preview: EnrichedCompanyPreview, carrierQuery: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
};

export function OnboardingCarrierLookup({
  initialCarrierQuery = '',
  initialCompanyName = '',
  onPreviewReady,
  onError,
  disabled,
}: Props) {
  const [mode, setMode] = useState<LookupMode>('dot');
  const [carrierQuery, setCarrierQuery] = useState(initialCarrierQuery);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [state, setState] = useState('');
  const [candidates, setCandidates] = useState<VerifyDotNameCandidate[]>([]);
  const [selectingDot, setSelectingDot] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function loadPreview(query: string) {
    startTransition(async () => {
      onError('');
      setCandidates([]);
      const res = await previewEnrichedCompanySuggestion({ carrierQuery: query });
      if (!res.success || !res.preview?.fmcsa) {
        onError(res.error ?? 'Could not load FMCSA and enrichment data for this carrier.');
        return;
      }
      onPreviewReady(res.preview, query);
    });
  }

  function handleDotSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = carrierQuery.trim();
    if (!trimmed) {
      onError('Enter a USDOT or MC number.');
      return;
    }
    loadPreview(trimmed);
  }

  function handleNameSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = companyName.trim();
    if (trimmedName.length < 2) {
      onError('Enter at least 2 characters of the company name.');
      return;
    }
    if (!state) {
      onError('Select the state where the company operates.');
      return;
    }

    startTransition(async () => {
      onError('');
      setCandidates([]);
      const res = await searchCarriersForOnboarding({ companyName: trimmedName, state });
      if (!res.success) {
        onError(res.error ?? 'Name search failed.');
        return;
      }
      if (!res.candidates?.length) {
        onError(`No FMCSA carriers found for "${trimmedName}" in ${state}.`);
        return;
      }
      if (res.candidates.length === 1) {
        const dot = res.candidates[0]!.dotNumber;
        setCarrierQuery(dot);
        loadPreview(dot);
        return;
      }
      setCandidates(res.candidates);
    });
  }

  function handleSelectCandidate(candidate: VerifyDotNameCandidate) {
    setSelectingDot(candidate.dotNumber);
    setCarrierQuery(candidate.dotNumber);
    startTransition(async () => {
      onError('');
      const res = await previewEnrichedCompanySuggestion({ carrierQuery: candidate.dotNumber });
      setSelectingDot(null);
      if (!res.success || !res.preview?.fmcsa) {
        onError(res.error ?? 'Could not load carrier data.');
        return;
      }
      setCandidates([]);
      onPreviewReady(res.preview, candidate.dotNumber);
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Official onboarding starts with FMCSA verification. Search by USDOT/MC or company name +
        state — we then pull Google Places and public BBB data automatically.
      </p>

      <div className="flex rounded-lg border p-1 gap-1 bg-muted/30">
        <Button
          type="button"
          size="sm"
          variant={mode === 'dot' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setMode('dot')}
          disabled={pending || disabled}
        >
          DOT / MC
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'name' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setMode('name')}
          disabled={pending || disabled}
        >
          Name + State
        </Button>
      </div>

      {mode === 'dot' ? (
        <form onSubmit={handleDotSearch} className="space-y-3">
          <div>
            <label htmlFor="onboard-carrier" className="text-sm font-medium">
              USDOT or MC number <span className="text-destructive">*</span>
            </label>
            <Input
              id="onboard-carrier"
              value={carrierQuery}
              onChange={(e) => setCarrierQuery(e.target.value)}
              placeholder="e.g. DOT 3784776 or MC-15735"
              className="mt-1.5"
              disabled={pending || disabled}
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={pending || disabled}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Pulling FMCSA, Google, and BBB data…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Verify &amp; load preview
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleNameSearch} className="space-y-3">
          <div>
            <label htmlFor="onboard-name" className="text-sm font-medium">
              Company name <span className="text-destructive">*</span>
            </label>
            <Input
              id="onboard-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. ABC Moving & Storage"
              className="mt-1.5"
              disabled={pending || disabled}
            />
          </div>
          <div>
            <label htmlFor="onboard-state" className="text-sm font-medium">
              State <span className="text-destructive">*</span>
            </label>
            <select
              id="onboard-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={pending || disabled}
            >
              <option value="">Select state…</option>
              {US_STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full gap-2" disabled={pending || disabled}>
            {pending && !candidates.length ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching FMCSA…
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search FMCSA by name
              </>
            )}
          </Button>
        </form>
      )}

      {candidates.length > 0 ? (
        <DotVerifierNamePicker
          companyName={companyName}
          state={state}
          candidates={candidates}
          onSelect={handleSelectCandidate}
          selectingDot={selectingDot}
          disabled={pending || disabled}
          showNotListedCta={false}
        />
      ) : null}
    </div>
  );
}