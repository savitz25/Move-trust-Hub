'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ExternalLink,
  MapPin,
  Phone,
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
  if (!result.success || !result.saferUrl) return null;

  const preview = result.preview;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {preview ? (
        <Card className="border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {preview.source === 'directory'
                  ? 'In Move Trust Hub Directory'
                  : 'FMCSA Data Preview'}
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
                  <dd>{preview.allowedToOperate === 'Y' ? 'Yes' : preview.allowedToOperate}</dd>
                </div>
              </div>
            ) : null}
          </dl>

          {result.directorySlug ? (
            <div className="mt-4 rounded-lg border bg-background/80 p-3 text-sm">
              <Building2 className="inline h-4 w-4 mr-1.5 text-primary" />
              This carrier is listed in our directory.{' '}
              <Link
                href={`/companies/${result.directorySlug}`}
                className="font-medium text-primary underline underline-offset-2"
              >
                View {result.directoryName} profile →
              </Link>
            </div>
          ) : null}

          <p className="mt-4 text-xs text-muted-foreground">
            Preview may be incomplete. The official FMCSA SAFER report is the
            authoritative source for licensing and safety data.
          </p>
        </Card>
      ) : (
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold">
            Opening official lookup for {result.displayNumber}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We don&apos;t have a preview for this carrier in our directory or
            public FMCSA cache. You&apos;ll view the full government Company
            Snapshot on{' '}
            <strong>safer.fmcsa.dot.gov</strong> — including authority status,
            safety rating, inspections, and crash history.
          </p>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="gap-2 min-h-[48px] flex-1">
          <a href={result.saferUrl} target="_blank" rel="noopener noreferrer">
            View Full FMCSA SAFER Report
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="gap-2 min-h-[48px]"
          onClick={onGetQuotes}
        >
          Get Free Moving Quotes
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        Move Trust Hub is not affiliated with FMCSA. Always confirm current
        licensing on the official government site before signing a contract.
      </p>
    </div>
  );
}