'use client';

import { useCallback, useEffect, useState } from 'react';
import { Building2, ExternalLink, Loader2, Search, ShieldCheck } from 'lucide-react';
import {
  searchCarriersByNameState,
  verifyCarrierNumber,
  type VerifyDotNameCandidate,
  type VerifyDotResult,
} from '@/actions/verify-dot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { DotVerifierResults } from '@/components/verify-dot/dot-verifier-results';
import { DotVerifierNamePicker } from '@/components/verify-dot/dot-verifier-name-picker';
import {
  DotVerifierNoMatch,
  type NoMatchContext,
} from '@/components/verify-dot/dot-verifier-no-match';
import { US_STATES } from '@/lib/verify-dot/us-states';
import { cn } from '@/lib/utils';

type SearchMode = 'license' | 'name';

type Props = {
  sourcePage?: string;
};

/** Always-available official fallback — never hide this behind a successful API response. */
const SAFER_SNAPSHOT_URL = 'https://safer.fmcsa.dot.gov/CompanySnapshot.aspx';

function hasFmcsaMatch(res: VerifyDotResult): boolean {
  return Boolean(res.preview?.legalName || res.directorySlug);
}

export function DotVerifier({ sourcePage = '/verify-dot' }: Props) {
  const [mode, setMode] = useState<SearchMode>('license');
  const [query, setQuery] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyDotResult | null>(null);
  const [nameCandidates, setNameCandidates] = useState<VerifyDotNameCandidate[] | null>(
    null
  );
  const [nameSearchLabel, setNameSearchLabel] = useState<{ name: string; state: string } | null>(
    null
  );
  const [selectingDot, setSelectingDot] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState<NoMatchContext | null>(null);

  // Prefill from ?q= or ?carrier= without useSearchParams (avoids Suspense empty shell).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prefill = params.get('q') || params.get('carrier') || '';
      if (prefill) setQuery(prefill);
    } catch {
      /* ignore */
    }
  }, []);

  const resetResults = useCallback(() => {
    setError(null);
    setResult(null);
    setNameCandidates(null);
    setNameSearchLabel(null);
    setSelectingDot(null);
    setNoMatch(null);
  }, []);

  function switchMode(next: SearchMode) {
    if (next === mode) return;
    setMode(next);
    resetResults();
  }

  async function runVerification(
    dotQuery: string,
    options?: { fromNameSearch?: boolean; companyName?: string; stateCode?: string }
  ) {
    const res = await verifyCarrierNumber({
      query: dotQuery,
      sourcePage,
    });

    if (!res.success) {
      setError(res.error ?? 'Verification failed. Please try again or use the SAFER link below.');
      return false;
    }

    if (!hasFmcsaMatch(res)) {
      setResult(null);
      setNameCandidates(null);
      setNoMatch({
        mode: options?.fromNameSearch ? 'name' : 'license',
        searchLabel: res.displayNumber ?? dotQuery.trim(),
        companyName: options?.companyName,
        stateCode: options?.stateCode,
        carrierQuery: res.displayNumber ?? dotQuery.trim(),
      });
      return false;
    }

    setResult(res);
    setNameCandidates(null);
    setNoMatch(null);
    return true;
  }

  async function handleLicenseSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    resetResults();

    try {
      await runVerification(query);
    } catch (err) {
      console.error('[DOT Verify]', err);
      setError('Something went wrong. Use the official SAFER link below, or try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !state) {
      setError('Enter a company name and select a state.');
      return;
    }

    setLoading(true);
    resetResults();

    const trimmedName = companyName.trim();

    try {
      const search = await searchCarriersByNameState({
        companyName: trimmedName,
        state,
        sourcePage,
      });

      if (!search.success || !search.candidates?.length) {
        setNoMatch({
          mode: 'name',
          searchLabel: `"${trimmedName}" in ${state}`,
          companyName: trimmedName,
          stateCode: state,
        });
        return;
      }

      setNameSearchLabel({
        name: search.companyName ?? trimmedName,
        state: search.state ?? state,
      });

      if (search.candidates.length === 1) {
        setSelectingDot(search.candidates[0]!.dotNumber);
        await runVerification(search.candidates[0]!.dotNumber, {
          fromNameSearch: true,
          companyName: trimmedName,
          stateCode: state,
        });
        setSelectingDot(null);
        return;
      }

      setNameCandidates(search.candidates);
    } catch (err) {
      console.error('[DOT Verify name search]', err);
      setError('Something went wrong. Use the official SAFER link below, or try again.');
    } finally {
      setLoading(false);
      setSelectingDot(null);
    }
  }

  async function handleCandidateSelect(candidate: VerifyDotNameCandidate) {
    setSelectingDot(candidate.dotNumber);
    setError(null);
    setResult(null);
    setNoMatch(null);

    try {
      await runVerification(candidate.dotNumber, {
        fromNameSearch: true,
        companyName: nameSearchLabel?.name ?? companyName.trim(),
        stateCode: nameSearchLabel?.state ?? state,
      });
    } catch (err) {
      console.error('[DOT Verify select]', err);
      setError('Verification failed. Use the official SAFER link below, or try again.');
    } finally {
      setSelectingDot(null);
    }
  }

  const licenseDisabled = loading || !query.trim();
  const nameDisabled = loading || !companyName.trim() || !state;

  return (
    <Card className="border-2 border-primary/15 shadow-lg p-5 sm:p-7">
      <div
        className="mb-5 inline-flex w-full flex-col gap-1 rounded-lg border bg-muted/40 p-1 sm:flex-row"
        role="tablist"
        aria-label="Verification search mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'license'}
          className={cn(
            'flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
            mode === 'license'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => switchMode('license')}
        >
          Search by DOT / MC
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'name'}
          className={cn(
            'flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
            mode === 'name'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => switchMode('name')}
        >
          Search by Name + State
        </button>
      </div>

      {mode === 'license' ? (
        <form onSubmit={handleLicenseSubmit} className="space-y-4">
          <label htmlFor="dot-query" className="block text-sm font-medium">
            USDOT or MC Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="dot-query"
                name="dot-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 1234567, DOT 1234567, or MC-123456"
                className="h-14 pl-11 text-lg"
                inputMode="text"
                autoComplete="off"
                disabled={loading}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'dot-error' : 'dot-hint-license'}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 text-base gap-2 min-w-[160px]"
              disabled={licenseDisabled}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify Now
                  <ShieldCheck className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          <p id="dot-hint-license" className="text-xs text-muted-foreground">
            Accepts USDOT (3–8 digits) or MC docket numbers.
          </p>
        </form>
      ) : (
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium mb-1.5">
              Company name
            </label>
            <div className="relative">
              <Building2
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="company-name"
                name="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. United Van Lines"
                className="h-14 pl-11 text-lg"
                autoComplete="organization"
                disabled={loading}
                required
                aria-describedby={error ? 'dot-error' : 'dot-hint-name'}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company-state" className="block text-sm font-medium mb-1.5">
              State <span className="text-destructive">*</span>
            </label>
            <Select
              id="company-state"
              name="company-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="h-14 text-base"
              disabled={loading}
              required
              aria-describedby={error ? 'dot-error' : 'dot-hint-name'}
            >
              <option value="">Select state…</option>
              {US_STATES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} ({s.value})
                </option>
              ))}
            </Select>
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-14 w-full sm:w-auto px-8 text-base gap-2"
            disabled={nameDisabled}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching FMCSA…
              </>
            ) : (
              <>
                Find Carrier
                <Search className="h-5 w-5" />
              </>
            )}
          </Button>

          <p id="dot-hint-name" className="text-xs text-muted-foreground">
            Both fields are required. If several carriers match, pick the correct one to verify.
          </p>
        </form>
      )}

      {loading && !result && !nameCandidates && !noMatch ? (
        <div
          className="mt-5 flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
          Looking up FMCSA records…
        </div>
      ) : null}

      {error ? (
        <div
          id="dot-error"
          className="mt-5 space-y-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3"
          role="alert"
        >
          <p className="text-sm text-destructive">{error}</p>
          <a
            href={SAFER_SNAPSHOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2"
          >
            Open official SAFER Company Snapshot
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {noMatch ? (
        <DotVerifierNoMatch
          context={noMatch}
          sourcePage={sourcePage}
          onDismiss={() => setNoMatch(null)}
          onSwitchToLicense={() => {
            setMode('license');
            setNoMatch(null);
            setError(null);
            setResult(null);
            setNameCandidates(null);
          }}
          onSwitchToName={() => {
            setMode('name');
            setNoMatch(null);
            setError(null);
            setResult(null);
            setNameCandidates(null);
          }}
        />
      ) : null}

      {nameCandidates && nameSearchLabel ? (
        <div className="mt-6 pt-6 border-t">
          <DotVerifierNamePicker
            companyName={nameSearchLabel.name}
            state={nameSearchLabel.state}
            candidates={nameCandidates}
            onSelect={handleCandidateSelect}
            selectingDot={selectingDot}
            disabled={loading}
            sourcePage={sourcePage}
          />
        </div>
      ) : null}

      {result?.success && hasFmcsaMatch(result) ? (
        <div className="mt-6 pt-6 border-t">
          <DotVerifierResults
            result={result}
            sourcePage={sourcePage}
            prefillName={nameSearchLabel?.name || companyName.trim() || undefined}
            prefillState={
              nameSearchLabel?.state ||
              state ||
              result.preview?.addressState ||
              undefined
            }
          />
        </div>
      ) : null}

      {/* Always-visible official fallback — never leave users without a path to SAFER */}
      <div className="mt-6 rounded-lg border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <p>
          Prefer the government site?{' '}
          <a
            href={SAFER_SNAPSHOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2"
          >
            Open FMCSA SAFER Company Snapshot
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      </div>
    </Card>
  );
}
