'use client';

import { useEffect, useState, useTransition } from 'react';
import { Globe2, Loader2, Mail, MapPinned, Phone } from 'lucide-react';
import {
  scrapeWebsiteContactForOnboarding,
  scrapeWebsiteCoverageForOnboarding,
} from '@/actions/suggest-company';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

type Props = {
  defaultWebsiteUrl?: string | null;
  coverage: WebsiteCoverageData | null;
  onCoverageChange: (coverage: WebsiteCoverageData | null) => void;
  onConsentChange: (consent: boolean) => void;
  onWebsiteUrlChange: (url: string) => void;
  phone?: string;
  email?: string;
  onPhoneChange?: (phone: string) => void;
  onEmailChange?: (email: string) => void;
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

export function OnboardingCoverageConsent({
  defaultWebsiteUrl = '',
  coverage,
  onCoverageChange,
  onConsentChange,
  onWebsiteUrlChange,
  phone = '',
  email = '',
  onPhoneChange,
  onEmailChange,
  preferredStateCode = null,
  disabled = false,
}: Props) {
  const [consent, setConsent] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(defaultWebsiteUrl?.trim() ?? '');
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanNote, setScanNote] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const next = defaultWebsiteUrl?.trim() ?? '';
    if (next && !websiteUrl) {
      setWebsiteUrl(next);
      onWebsiteUrlChange(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultWebsiteUrl]);

  function updateConsent(next: boolean) {
    setConsent(next);
    onConsentChange(next);
    setScanError(null);
    setScanNote(null);
    if (!next) {
      onCoverageChange(null);
    }
  }

  function updateWebsiteUrl(next: string) {
    setWebsiteUrl(next);
    onWebsiteUrlChange(next);
  }

  function handleScan() {
    if (!websiteUrl.trim()) return;

    startTransition(async () => {
      setScanError(null);
      setScanNote(null);

      // Contact scrape always runs when user scans (consent via action).
      // Coverage still requires explicit checkbox for interstate destination expansion.
      const contactPromise = scrapeWebsiteContactForOnboarding({
        websiteUrl: websiteUrl.trim(),
      });

      const coveragePromise = consent
        ? scrapeWebsiteCoverageForOnboarding({
            websiteUrl: websiteUrl.trim(),
            consentGiven: true,
            preferredStateCode,
          })
        : Promise.resolve(null);

      const [contactRes, coverageRes] = await Promise.all([contactPromise, coveragePromise]);

      if (contactRes.phone && onPhoneChange && isEmptyOrPlaceholderPhone(phone)) {
        onPhoneChange(contactRes.phone);
      }
      if (contactRes.email && onEmailChange) {
        onEmailChange(email.trim() || contactRes.email);
      }

      const notes: string[] = [];
      if (contactRes.phone) notes.push(`phone ${contactRes.phone}`);
      if (contactRes.email) notes.push(`email ${contactRes.email}`);
      if (notes.length) setScanNote(`Contact found: ${notes.join(' · ')}`);

      if (coverageRes) {
        if (!coverageRes.success || !coverageRes.coverage) {
          setScanError(
            coverageRes.error ??
              'Could not read coverage areas. Contact fields were still updated when available.'
          );
          if (coverageRes.coverage) onCoverageChange(coverageRes.coverage);
        } else {
          onCoverageChange(coverageRes.coverage);
        }
      }

      if (!contactRes.success && !notes.length) {
        setScanError(
          contactRes.error ??
            'No contact details found on the website. You can enter phone/email manually.'
        );
      }
    });
  }

  return (
    <div className="rounded-md border bg-muted/20 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <Globe2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Website, contact &amp; coverage</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We combine FMCSA phone (when present), Google Places phone/website, and a public
            website scan for email and extra phones. Coverage scan is optional and expands
            destination placement.
          </p>
        </div>
      </div>

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

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="interstate-company-phone" className="text-sm font-medium flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            Business phone
          </label>
          <Input
            id="interstate-company-phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange?.(e.target.value)}
            placeholder="(555) 555-5555"
            className="mt-1.5"
            disabled={disabled || pending}
          />
        </div>
        <div>
          <label htmlFor="interstate-company-email" className="text-sm font-medium flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Business email
          </label>
          <Input
            id="interstate-company-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange?.(e.target.value)}
            placeholder="info@example.com"
            className="mt-1.5"
            disabled={disabled || pending}
          />
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
          Also scan for service / coverage areas{' '}
          <span className="text-muted-foreground">(optional — places on county/destination pages)</span>
        </span>
      </label>

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
            Scan website for contact{consent ? ' & coverage' : ''}
          </>
        )}
      </Button>

      {scanNote ? (
        <p className="text-xs text-primary" role="status">
          {scanNote}
        </p>
      ) : null}

      {scanError ? (
        <p className="text-xs text-amber-700 dark:text-amber-300" role="status">
          {scanError}
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
  );
}
