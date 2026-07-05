'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  SearchX,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { VerifyDotResult } from '@/actions/verify-dot';
import { FmcsaStructuredPreview } from '@/components/suggestions/fmcsa-structured-preview';
import { SuggestCompanyCta } from '@/components/suggestions/suggest-company-cta';
import { fmcsaPreviewFromVerifyResult } from '@/lib/suggestions/from-verify';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

const ADD_DIRECTORY_LABEL = 'Add This Company to Our Directory';

type Props = {
  result: VerifyDotResult;
};

export function DotVerifierResults({ result }: Props) {
  if (!result.success) return null;

  const preview = result.preview;
  const inDirectory = Boolean(result.directorySlug);
  const hasPreview = Boolean(preview?.legalName);
  const saferUrl = result.saferUrl;
  const carrierQuery = result.displayNumber ?? '';
  const validCarrier = carrierQuery ? parseCarrierNumber(carrierQuery) : null;
  const dotPreviewForSuggest = fmcsaPreviewFromVerifyResult(result);
  const showAddToDirectory = !inDirectory && Boolean(validCarrier) && hasPreview;

  const statusBanner = inDirectory ? (
    <div
      className="flex items-start gap-3 rounded-lg border border-primary/25 bg-primary/10 p-4"
      role="status"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-medium text-foreground">
          We found this company in our directory
        </p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Below is what Move Trust Hub has on file for{' '}
          <strong>{result.displayNumber}</strong>. Compare this carrier in our
          directory or open the official FMCSA record when you&apos;re ready.
        </p>
      </div>
    </div>
  ) : hasPreview ? (
    <div
      className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4"
      role="status"
    >
      <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-medium text-foreground">
          FMCSA verified — not yet in our directory
        </p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          We pulled structured licensing data from FMCSA for{' '}
          <strong>{result.displayNumber}</strong>. Review the details below, then add
          this carrier to Move Trust Hub without leaving the site.
        </p>
      </div>
    </div>
  ) : (
    <div
      className="flex items-start gap-3 rounded-lg border border-amber-200/80 bg-amber-50/80 dark:border-amber-900/40 dark:bg-amber-950/30 p-4"
      role="status"
    >
      <SearchX className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-medium text-foreground">
          No FMCSA preview available
        </p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t pull structured data for <strong>{result.displayNumber}</strong>.
          Open the official FMCSA SAFER record to confirm authority status before you book.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {statusBanner}

      {hasPreview && preview ? (
        <>
          <FmcsaStructuredPreview
            preview={preview}
            displayNumber={carrierQuery}
            inDirectory={inDirectory}
          />

          {result.directorySlug ? (
            <div className="rounded-lg border bg-background/80 p-3 text-sm">
              <Building2 className="inline h-4 w-4 mr-1.5 text-primary" />
              See reviews, service areas, and more on our{' '}
              <Link
                href={`/companies/${result.directorySlug}`}
                className="font-medium text-primary underline underline-offset-2"
              >
                {result.directoryName} profile →
              </Link>
            </div>
          ) : null}
        </>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3">
        {inDirectory || hasPreview ? (
          <>
            <Button
              asChild
              size="lg"
              className="gap-2 min-h-[48px] flex-1"
            >
              <Link href={result.directorySlug ? `/companies/${result.directorySlug}` : '/companies'}>
                Compare Trusted Movers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {saferUrl ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 min-h-[48px]"
              >
                <a href={saferUrl} target="_blank" rel="noopener noreferrer">
                  View Official FMCSA Record
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </>
        ) : saferUrl ? (
          <Button asChild size="lg" className="gap-2 min-h-[48px] flex-1">
            <a href={saferUrl} target="_blank" rel="noopener noreferrer">
              View Official FMCSA SAFER Report
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>

      {showAddToDirectory ? (
        <div className="rounded-lg border-2 border-primary/25 bg-primary/5 p-5 text-center space-y-3">
          <Badge variant="secondary" className="mb-1">
            Not in directory
          </Badge>
          <p className="text-sm text-muted-foreground">
            {hasPreview
              ? `Add ${preview?.legalName ?? carrierQuery} to Move Trust Hub using verified FMCSA data.`
              : 'Submit this carrier for review — we will verify it against FMCSA before publishing.'}
          </p>
          <SuggestCompanyCta
            sourcePage="/verify-dot"
            carrierQuery={carrierQuery}
            dotPreview={dotPreviewForSuggest}
            className="min-h-[48px]"
            label={ADD_DIRECTORY_LABEL}
          />
        </div>
      ) : null}

      <p className="text-xs text-muted-foreground">
        {saferUrl ? (
          <>
            Prefer the government source?{' '}
            <a
              href={saferUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Open {result.displayNumber} on safer.fmcsa.dot.gov
            </a>
            {' · '}
          </>
        ) : null}
        <Link
          href={`/review?carrier=${encodeURIComponent(result.displayNumber ?? '')}`}
          className="underline underline-offset-2 hover:text-foreground"
        >
          Leave a moderated review
        </Link>
      </p>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        Move Trust Hub is not affiliated with FMCSA. Always confirm current
        licensing on the official government site before signing a contract.
      </p>
    </div>
  );
}