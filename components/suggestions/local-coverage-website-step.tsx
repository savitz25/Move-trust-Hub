'use client';

import { useEffect, useState, useTransition } from 'react';
import { Globe2, Loader2, MapPinned, Phone, Mail } from 'lucide-react';
import {
  scrapeWebsiteContactForOnboarding,
  scrapeWebsiteCoverageForOnboarding,
} from '@/actions/suggest-company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';

type Props = {
  /** Pre-fill from Google Places when available */
  defaultWebsiteUrl?: string | null;
  coverage: WebsiteCoverageData | null;
  onCoverageChange: (coverage: WebsiteCoverageData | null) => void;
  onWebsiteUrlChange: (url: string) => void;
  /** Phone / email discovered or edited for company contact */
  phone?: string;
  email?: string;
  onPhoneChange?: (phone: string) => void;
  onEmailChange?: (email: string) => void;
  /** Constrain coverage to this state (e.g. OR for local funnel) */
  preferredStateCode?: string | null;
  disabled?: boolean;
};

function isEmptyOrPlaceholderPhone(value: string | undefined): boolean {
  if (!value?.trim()) return true;
  const digits = value.replace(/\D/g, '');
  let d = digits;
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length !== 10) return false;
  if (/^555/.test(d)) return true;
  if (/^(\d)\1{9}$/.test(d)) return true;
  return false;
}

/**
 * Website field + coverage + contact scrape for Intrastate / Local onboarding.
 * Never blocks county selection — scan failures still allow manual picks.
 */
export function LocalCoverageWebsiteStep({
  defaultWebsiteUrl = '',
  coverage,
  onCoverageChange,
  onWebsiteUrlChange,
  phone = '',
  email = '',
  onPhoneChange,
  onEmailChange,
  preferredStateCode = null,
  disabled = false,
}: Props) {
  const [websiteUrl, setWebsiteUrl] = useState(
    () => normalizeCompanyWebsiteUrl(defaultWebsiteUrl) || defaultWebsiteUrl?.trim() || ''
  );
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanNote, setScanNote] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const next =
      normalizeCompanyWebsiteUrl(defaultWebsiteUrl) || defaultWebsiteUrl?.trim() || '';
    if (next && !websiteUrl) {
      setWebsiteUrl(next);
      onWebsiteUrlChange(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultWebsiteUrl]);

  function updateWebsiteUrl(next: string) {
    setWebsiteUrl(next);
    onWebsiteUrlChange(next);
    setScanError(null);
    setScanNote(null);
  }

  function handleScan() {
    const cleaned =
      normalizeCompanyWebsiteUrl(websiteUrl) || websiteUrl.trim();
    if (!cleaned) {
      setScanError('Enter a website URL first, then scan for coverage and contact details.');
      return;
    }
    // Reflect cleaned URL in the field so the user sees (and can edit) the canonical form.
    if (cleaned !== websiteUrl.trim()) {
      setWebsiteUrl(cleaned);
      onWebsiteUrlChange(cleaned);
    }

    startTransition(async () => {
      setScanError(null);
      setScanNote(null);

      const [coverageRes, contactRes] = await Promise.all([
        scrapeWebsiteCoverageForOnboarding({
          websiteUrl: cleaned,
          consentGiven: true,
          preferredStateCode,
        }),
        scrapeWebsiteContactForOnboarding({ websiteUrl: cleaned }),
      ]);

      if (coverageRes.success && coverageRes.coverage) {
        onCoverageChange(coverageRes.coverage);
      } else if (coverageRes.coverage) {
        onCoverageChange(coverageRes.coverage);
      }

      // Always apply scraped phone when field is empty or still a 555 placeholder
      if (contactRes.phone && onPhoneChange && isEmptyOrPlaceholderPhone(phone)) {
        onPhoneChange(contactRes.phone);
      }
      // Always fill Business email when empty — scraped value is the canonical source
      if (contactRes.email && onEmailChange && !email.trim()) {
        onEmailChange(contactRes.email);
      }

      const notes: string[] = [];
      if (contactRes.phone) notes.push(`phone ${contactRes.phone}`);
      if (contactRes.email) notes.push(`email ${contactRes.email}`);
      if (notes.length) {
        setScanNote(`Contact found: ${notes.join(' · ')}. You can edit below.`);
      }

      if (!coverageRes.success && !contactRes.success) {
        setScanError(
          coverageRes.error ||
            contactRes.error ||
            'Could not read this website. You can still enter contact details and select counties manually.'
        );
        return;
      }

      if (
        coverageRes.coverage?.status === 'ok' &&
        !coverageRes.coverage.isNationalOnly &&
        (coverageRes.coverage.counties?.length ?? 0) === 0
      ) {
        setScanError(
          'No county-level service areas found. Select counties manually; contact fields were still updated when available.'
        );
      } else if ((coverageRes.coverage?.counties?.length ?? 0) > 0) {
        const n = coverageRes.coverage!.counties.length;
        setScanNote((prev) =>
          prev
            ? `${prev} · ${n} count${n === 1 ? 'y' : 'ies'} pre-selected from website cities.`
            : `${n} count${n === 1 ? 'y' : 'ies'} pre-selected from website cities — adjust below if needed.`
        );
      }
    });
  }

  const countyCount = coverage?.counties?.length ?? 0;

  return (
    <div className="rounded-lg border border-emerald-200/70 bg-emerald-50/40 p-4 space-y-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <div className="flex items-start gap-2">
        <Globe2 className="h-4 w-4 text-emerald-800 dark:text-emerald-300 mt-0.5 shrink-0" />
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            Website, contact &amp; coverage
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Add the mover&apos;s website so we can find phone, email, and service areas. Google
            Places often pre-fills the site — you can edit anything before submitting.
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
            Pre-filled from Google Places when available.
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="local-company-phone" className="text-sm font-medium flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            Business phone
          </label>
          <Input
            id="local-company-phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange?.(e.target.value)}
            placeholder="(555) 555-5555"
            className="mt-1.5"
            disabled={disabled || pending}
          />
        </div>
        <div>
          <label htmlFor="local-company-email" className="text-sm font-medium flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Business email
          </label>
          <Input
            id="local-company-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange?.(e.target.value)}
            placeholder="info@example.com"
            className="mt-1.5"
            disabled={disabled || pending}
          />
        </div>
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
            Scanning website…
          </>
        ) : (
          <>
            <MapPinned className="h-4 w-4" />
            Scan website for contact &amp; coverage
          </>
        )}
      </Button>

      {scanNote ? (
        <p className="text-xs text-emerald-900 dark:text-emerald-100" role="status">
          {scanNote}
        </p>
      ) : null}

      {scanError ? (
        <p className="text-xs text-amber-800 dark:text-amber-200" role="status">
          {scanError}
        </p>
      ) : null}

      {coverage?.status === 'ok' ? (
        <div className="rounded-md border border-primary/20 bg-background p-3 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Coverage scan
          </p>
          {coverage.isNationalOnly ? (
            <p className="text-sm text-muted-foreground">
              Broad/national language on the site — pick the counties this local mover serves below.
            </p>
          ) : coverage.summary ? (
            <p className="text-sm text-foreground">{coverage.summary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Found {countyCount} county match{countyCount === 1 ? '' : 'es'} for pre-selection.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
