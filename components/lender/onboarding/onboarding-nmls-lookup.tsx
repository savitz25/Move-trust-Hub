'use client';

import { useEffect, useState } from 'react';
import { Loader2, MapPin, Search, ShieldCheck } from 'lucide-react';
import {
  previewEnrichedLenderSuggestion,
  searchNmlsForOnboardingAction,
} from '@/actions/lender-onboarding';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { LENDER_LOOKUP_TAGLINE } from '@/lib/lender/onboarding/constants';
import { NmlsOfficialSourceLink } from '@/components/lender/onboarding/nmls-official-source-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SearchMode = 'nmls' | 'name' | 'address';

type Props = {
  onPreviewReady: (preview: EnrichedLenderPreview, nmlsId: string) => void;
  onError: (message: string | null) => void;
  disabled?: boolean;
  initialNmlsId?: string;
};

export function OnboardingNmlsLookup({
  onPreviewReady,
  onError,
  disabled,
  initialNmlsId = '',
}: Props) {
  const [mode, setMode] = useState<SearchMode>('nmls');
  const [nmlsId, setNmlsId] = useState(initialNmlsId);
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<
    Array<{ nmlsId: string; name: string; location: string | null }>
  >([]);

  useEffect(() => {
    if (initialNmlsId) setNmlsId(initialNmlsId);
  }, [initialNmlsId]);

  async function lookupByNmls(id: string, zip?: string) {
    setLoading(true);
    onError(null);
    setCandidates([]);

    const enriched = await previewEnrichedLenderSuggestion({
      nmlsId: id,
      zipCode: zip || null,
    });
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

  async function runNameOrAddressSearch(query: string, stateCode?: string) {
    setLoading(true);
    onError(null);
    setCandidates([]);

    const res = await searchNmlsForOnboardingAction(query, stateCode);
    setLoading(false);

    if (!res.success || !res.candidates?.length) {
      onError(res.error ?? 'No matches found');
      return;
    }

    setCandidates(res.candidates);
  }

  async function handleNameSearch(e: React.FormEvent) {
    e.preventDefault();
    await runNameOrAddressSearch(companyName, state || undefined);
  }

  async function handleAddressSearch(e: React.FormEvent) {
    e.preventDefault();
    const parts = [companyName, street, city, state].filter(Boolean);
    if (parts.length < 2) {
      onError('Enter a company name or city/state to search by location.');
      return;
    }
    await runNameOrAddressSearch(parts.join(' '), state || undefined);
  }

  async function selectCandidate(id: string) {
    setNmlsId(id);
    await lookupByNmls(id);
  }

  const modeButtons: { id: SearchMode; label: string }[] = [
    { id: 'nmls', label: 'NMLS ID' },
    { id: 'name', label: 'Company name' },
    { id: 'address', label: 'Name & location' },
  ];

  return (
    <div className="space-y-5">
      <p className="text-sm text-zinc-600 leading-relaxed">{LENDER_LOOKUP_TAGLINE}</p>

      <div className="flex flex-wrap gap-2">
        {modeButtons.map((m) => (
          <Button
            key={m.id}
            type="button"
            variant={mode === m.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      {mode === 'nmls' ? (
        <form onSubmit={handleNmlsSubmit} className="space-y-3">
          <label htmlFor="nmls-id-input" className="text-sm font-medium text-[#0A2540]">
            NMLS ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="nmls-id-input"
              value={nmlsId}
              onChange={(e) => setNmlsId(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="e.g. 3030"
              className="h-14 text-lg font-medium tracking-wide"
              inputMode="numeric"
              required
              disabled={disabled || loading}
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 gap-2 px-8"
              disabled={disabled || loading || !nmlsId}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Looking up…
                </>
              ) : (
                <>
                  Verify NMLS <ShieldCheck className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      ) : null}

      {mode === 'name' ? (
        <form onSubmit={handleNameSearch} className="space-y-3">
          <label htmlFor="company-name-input" className="text-sm font-medium text-[#0A2540]">
            Legal or DBA name
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="company-name-input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Rocket Mortgage, LLC"
              className="h-14 text-base"
              required
              disabled={disabled || loading}
            />
            <Input
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
              placeholder="State"
              className="h-14 w-full sm:w-28 text-base uppercase"
              maxLength={2}
              disabled={disabled || loading}
              aria-label="State (optional)"
            />
            <Button type="submit" size="lg" className="h-14 gap-2" disabled={disabled || loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5" /> Search NMLS
                </>
              )}
            </Button>
          </div>
        </form>
      ) : null}

      {mode === 'address' ? (
        <form onSubmit={handleAddressSearch} className="space-y-3">
          <p className="text-sm font-medium text-[#0A2540] flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
            Search by company and location
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name (optional)"
              className="h-12"
              disabled={disabled || loading}
            />
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street address (optional)"
              className="h-12"
              disabled={disabled || loading}
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="h-12"
              disabled={disabled || loading}
            />
            <Input
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
              placeholder="State"
              className="h-12 uppercase"
              maxLength={2}
              disabled={disabled || loading}
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto h-12 gap-2" disabled={disabled || loading}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5" /> Find on NMLS
              </>
            )}
          </Button>
        </form>
      ) : null}

      {candidates.length > 0 ? (
        <ul className="rounded-xl border divide-y max-h-56 overflow-y-auto shadow-sm">
          {candidates.map((c) => (
            <li key={c.nmlsId}>
              <button
                type="button"
                className="w-full text-left px-4 py-3.5 hover:bg-[#3B82F6]/5 text-sm transition-colors"
                onClick={() => selectCandidate(c.nmlsId)}
                disabled={loading}
              >
                <span className="font-semibold text-[#0A2540]">{c.name}</span>
                <span className="text-zinc-500 ml-2">NMLS #{c.nmlsId}</span>
                {c.location ? (
                  <span className="block text-xs text-zinc-500 mt-0.5">{c.location}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <NmlsOfficialSourceLink />
    </div>
  );
}