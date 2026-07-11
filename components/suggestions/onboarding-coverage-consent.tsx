'use client';

import { useState, useTransition } from 'react';
import { Globe2, Loader2, MapPinned } from 'lucide-react';
import { scrapeWebsiteCoverageForOnboarding } from '@/actions/suggest-company';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

type Props = {
  defaultWebsiteUrl?: string | null;
  coverage: WebsiteCoverageData | null;
  onCoverageChange: (coverage: WebsiteCoverageData | null) => void;
  onConsentChange: (consent: boolean) => void;
  onWebsiteUrlChange: (url: string) => void;
  disabled?: boolean;
};

export function OnboardingCoverageConsent({
  defaultWebsiteUrl = '',
  coverage,
  onCoverageChange,
  onConsentChange,
  onWebsiteUrlChange,
  disabled = false,
}: Props) {
  const [consent, setConsent] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(defaultWebsiteUrl?.trim() ?? '');
  const [scanError, setScanError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function updateConsent(next: boolean) {
    setConsent(next);
    onConsentChange(next);
    setScanError(null);
    if (!next) {
      onCoverageChange(null);
    }
  }

  function updateWebsiteUrl(next: string) {
    setWebsiteUrl(next);
    onWebsiteUrlChange(next);
  }

  function handleScan() {
    if (!consent || !websiteUrl.trim()) return;

    startTransition(async () => {
      setScanError(null);
      const res = await scrapeWebsiteCoverageForOnboarding({
        websiteUrl: websiteUrl.trim(),
        consentGiven: true,
      });

      if (!res.success || !res.coverage) {
        setScanError(res.error ?? 'Could not read coverage areas from this website.');
        onCoverageChange(
          res.coverage ?? {
            consentGiven: true,
            websiteUrl: websiteUrl.trim(),
            scrapedAt: new Date().toISOString(),
            status: 'error',
            isNationalOnly: false,
            summary: null,
            stateSlugs: [],
            cities: [],
            counties: [],
            officeAddresses: [],
            regions: [],
            pagesFetched: [],
            rawSnippets: [],
            error: res.error,
          }
        );
        return;
      }

      onCoverageChange(res.coverage);
    });
  }

  return (
    <div className="rounded-md border bg-muted/20 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <Globe2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Optional website coverage scan</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Would you like us to pull coverage areas from the company&apos;s website? This is
            optional and requires your consent. We only read public pages and use explicit service
            areas to place the mover on relevant county and destination pages.
          </p>
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          className="mt-1"
          checked={consent}
          onChange={(e) => updateConsent(e.target.checked)}
          disabled={disabled || pending}
        />
        <span>
          Yes — scan the company website for service areas{' '}
          <span className="text-muted-foreground">(optional, consent required)</span>
        </span>
      </label>

      {consent ? (
        <div className="space-y-3">
          <div>
            <label htmlFor="coverage-website-url" className="text-sm font-medium">
              Company website
            </label>
            <Input
              id="coverage-website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => updateWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-1.5"
              disabled={disabled || pending}
            />
            {defaultWebsiteUrl ? (
              <p className="text-xs text-muted-foreground mt-1">
                Pre-filled from Google Places when available — you can edit it.
              </p>
            ) : null}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleScan}
            disabled={disabled || pending || !websiteUrl.trim()}
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning website…
              </>
            ) : (
              <>
                <MapPinned className="h-4 w-4" />
                Scan for coverage areas
              </>
            )}
          </Button>

          {scanError ? (
            <p className="text-xs text-amber-700 dark:text-amber-300" role="status">
              {scanError} The mover will still be added to the main directory and headquarters area.
            </p>
          ) : null}

          {coverage?.status === 'ok' ? (
            <div className="rounded-md border border-primary/20 bg-background p-3 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Detected service areas
              </p>
              {coverage.isNationalOnly ? (
                <p className="text-sm text-muted-foreground">
                  National language only — we will place this mover in the main directory and
                  headquarters area, not on every county page.
                </p>
              ) : coverage.summary ? (
                <p className="text-sm">{coverage.summary}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No explicit regional coverage found. Headquarters placement will still apply.
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}