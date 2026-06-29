'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  SearchX,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { VerifyDotResult } from '@/actions/verify-dot';

type Props = {
  result: VerifyDotResult;
  onGetQuotes: () => void;
};

export function DotVerifierResults({ result, onGetQuotes }: Props) {
  if (!result.success) return null;

  const preview = result.preview;
  const inDirectory = Boolean(result.directorySlug);
  const hasPreview = Boolean(preview?.legalName);
  const saferUrl = result.saferUrl;

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
          <strong>{result.displayNumber}</strong>. You can compare quotes or
          open the official FMCSA record when you&apos;re ready.
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
          Public FMCSA data available
        </p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          This carrier isn&apos;t in our directory yet, but we pulled a preview
          from FMCSA records for <strong>{result.displayNumber}</strong>. Confirm
          licensing on the official government site before you book.
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
          No record in our directory
        </p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          We don&apos;t have <strong>{result.displayNumber}</strong> in Move Trust
          Hub yet. Use the button below to open the official FMCSA SAFER Company
          Snapshot — the authoritative source for authority status, safety
          ratings, inspections, and crash history.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {statusBanner}

      {hasPreview && preview ? (
        <Card className="border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {inDirectory
                  ? 'Move Trust Hub Directory'
                  : preview.source === 'fmcsa_api'
                    ? 'FMCSA Data Preview'
                    : 'Carrier Preview'}
              </Badge>
              <h2 className="text-xl font-semibold tracking-tight">
                {preview.legalName}
              </h2>
              {preview.dbaName ? (
                <p className="text-sm text-muted-foreground mt-1">
                  DBA: {preview.dbaName}
                </p>
              ) : null}
            </div>
            {preview.safetyRating ? (
              <Badge
                variant={
                  preview.safetyRating === 'Satisfactory' ? 'default' : 'outline'
                }
                className="shrink-0"
              >
                FMCSA: {preview.safetyRating}
              </Badge>
            ) : null}
          </div>

          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {preview.physicalAddress ? (
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <dt className="text-xs text-muted-foreground">Address</dt>
                  <dd>{preview.physicalAddress}</dd>
                </div>
              </div>
            ) : null}
            {preview.phone ? (
              <div className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <dt className="text-xs text-muted-foreground">Phone</dt>
                  <dd>{preview.phone}</dd>
                </div>
              </div>
            ) : null}
            {preview.allowedToOperate ? (
              <div className="flex gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Allowed to operate
                  </dt>
                  <dd>
                    {preview.allowedToOperate === 'Y'
                      ? 'Yes'
                      : preview.allowedToOperate}
                  </dd>
                </div>
              </div>
            ) : null}
          </dl>

          {result.directorySlug ? (
            <div className="mt-4 rounded-lg border bg-background/80 p-3 text-sm">
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

          <p className="mt-4 text-xs text-muted-foreground">
            {inDirectory
              ? 'Directory data is maintained by Move Trust Hub. Licensing and safety details can change — confirm on FMCSA before signing a contract.'
              : 'Preview may be incomplete. The official FMCSA SAFER report is the authoritative source for licensing and safety data.'}
          </p>
        </Card>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3">
        {inDirectory || hasPreview ? (
          <>
            <Button
              type="button"
              size="lg"
              className="gap-2 min-h-[48px] flex-1"
              onClick={onGetQuotes}
            >
              Get Free Moving Quotes
              <ArrowRight className="h-4 w-4" />
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