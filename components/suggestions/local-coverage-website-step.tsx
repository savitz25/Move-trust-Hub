'use client';

import { useEffect, useState, useTransition } from 'react';
import { Globe2, Loader2, MapPinned } from 'lucide-react';
import { scrapeWebsiteCoverageForOnboarding } from '@/actions/suggest-company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

type Props = {
  /** Pre-fill from Google Places when available */
  defaultWebsiteUrl?: string | null;
  coverage: WebsiteCoverageData | null;
  onCoverageChange: (coverage: WebsiteCoverageData | null) => void;
  onWebsiteUrlChange: (url: string) => void;
  /** Called after a successful scan so parent can pre-select counties */
  onScanComplete?: (coverage: WebsiteCoverageData) => void;
  disabled?: boolean;
};

/**
 * Website field + optional coverage scan for Intrastate / Local onboarding.
 * Never blocks county selection — scan failures still allow manual picks.
 */
export function LocalCoverageWebsiteStep({
  defaultWebsiteUrl = '',
  coverage,
  onCoverageChange,
  onWebsiteUrlChange,
  onScanComplete,
  disabled = false,
}: Props) {
  const [websiteUrl, setWebsiteUrl] = useState(defaultWebsiteUrl?.trim() ?? '');
  const [scanError, setScanError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Keep field in sync when Google Places returns a website after lookup.
  useEffect(() => {
    const next = defaultWebsiteUrl?.trim() ?? '';
    if (next && !websiteUrl) {
      setWebsiteUrl(next);
      onWebsiteUrlChange(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only seed from Google once available
  }, [defaultWebsiteUrl]);

  function updateWebsiteUrl(next: string) {
    setWebsiteUrl(next);
    onWebsiteUrlChange(next);
    setScanError(null);
  }

  function handleScan() {
    const url = websiteUrl.trim();
    if (!url) {
      setScanError('Enter a website URL first, then scan for coverage areas.');
      return;
    }

    startTransition(async () => {
      setScanError(null);
      const res = await scrapeWebsiteCoverageForOnboarding({
        websiteUrl: url,
        consentGiven: true,
      });

      if (!res.success || !res.coverage) {
        setScanError(
          res.error ??
            'Could not read coverage areas from this website. You can still select counties manually below.'
        );
        if (res.coverage) onCoverageChange(res.coverage);
        return;
      }

      onCoverageChange(res.coverage);
      onScanComplete?.(res.coverage);

      if (
        res.coverage.status === 'ok' &&
        !res.coverage.isNationalOnly &&
        (res.coverage.counties?.length ?? 0) === 0 &&
        (res.coverage.cities?.length ?? 0) === 0
      ) {
        setScanError(
          'No county-level service areas found on the site. Select counties manually below.'
        );
      }
    });
  }

  const countyCount = coverage?.counties?.length ?? 0;
  const cityCount = coverage?.cities?.length ?? 0;

  return (
    <div className="rounded-lg border border-emerald-200/70 bg-emerald-50/40 p-4 space-y-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <div className="flex items-start gap-2">
        <Globe2 className="h-4 w-4 text-emerald-800 dark:text-emerald-300 mt-0.5 shrink-0" />
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Company website &amp; coverage</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Add the mover&apos;s website so we can try to detect service areas and pre-select
            matching counties. You can always edit the URL and the county list yourself.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="local-coverage-website" className="text-sm font-medium">
          Website
        </label>
        <Input
          id="local-coverage-website"
          type="url"
          inputMode="url"
          autoComplete="url"
          value={websiteUrl}
          onChange={(e) => updateWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
          className="mt-1.5"
          disabled={disabled || pending}
        />
        {defaultWebsiteUrl?.trim() ? (
          <p className="text-xs text-muted-foreground mt-1">
            Pre-filled from Google Places when available — paste a different URL if needed.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">
            Optional. If Google didn&apos;t return a site, paste one to scan for coverage.
          </p>
        )}
      </div>

      <Button
        type="button"
        variant="default"
        size="sm"
        className="gap-2 min-h-[40px]"
        onClick={handleScan}
        disabled={disabled || pending || !websiteUrl.trim()}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Scanning website for coverage…
          </>
        ) : (
          <>
            <MapPinned className="h-4 w-4" />
            Scan website for coverage areas
          </>
        )}
      </Button>

      {scanError ? (
        <p className="text-xs text-amber-800 dark:text-amber-200" role="status">
          {scanError}
        </p>
      ) : null}

      {coverage?.status === 'ok' ? (
        <div className="rounded-md border border-primary/20 bg-background p-3 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Scan results
          </p>
          {coverage.isNationalOnly ? (
            <p className="text-sm text-muted-foreground">
              The site uses broad/national language. Pick the counties this local mover actually
              serves below.
            </p>
          ) : coverage.summary ? (
            <p className="text-sm text-foreground">{coverage.summary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Found {countyCount} county match{countyCount === 1 ? '' : 'es'}
              {cityCount > 0 ? ` and ${cityCount} city mention${cityCount === 1 ? '' : 's'}` : ''}.
              Matching counties in this state are highlighted for review.
            </p>
          )}
          {countyCount > 0 ? (
            <p className="text-xs text-emerald-800 dark:text-emerald-300 pt-1">
              {countyCount} county area{countyCount === 1 ? '' : 's'} detected — we pre-selected
              matches in this state. Adjust the list anytime.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
