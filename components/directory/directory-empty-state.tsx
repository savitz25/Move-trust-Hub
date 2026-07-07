'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DirectoryCarrierFmcsaPanel } from '@/components/suggestions/directory-carrier-fmcsa-panel';
import { SuggestCompanyCta } from '@/components/suggestions/suggest-company-cta';
import { buildVerifyDotHref } from '@/lib/directory/verify-dot-link';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';

type Props = {
  searchTerm: string;
  hasActiveFilters: boolean;
  parsedCarrier: ParsedCarrierNumber | null;
  carrierNotInDirectory: boolean;
  sourcePage?: string;
  onClearFilters: () => void;
};

export function DirectoryEmptyState({
  searchTerm,
  hasActiveFilters,
  parsedCarrier,
  carrierNotInDirectory,
  sourcePage = '/companies',
  onClearFilters,
}: Props) {
  const trimmed = searchTerm.trim();
  const showCarrierPanel = Boolean(parsedCarrier && carrierNotInDirectory);

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-4 py-12 text-center">
      <ShieldCheck className="h-10 w-10 text-primary mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold tracking-tight">
        No companies found matching your search.
      </h3>

      {trimmed ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          We couldn&apos;t find <strong className="text-foreground">{trimmed}</strong> in our
          directory yet.
        </p>
      ) : (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Try adjusting your filters or search for a different company name.
        </p>
      )}

      <div className="mt-6 flex w-full max-w-md flex-col gap-3">
        <Button asChild size="lg" className="w-full gap-2 min-h-[48px]">
          <Link href={buildVerifyDotHref(trimmed, parsedCarrier)}>
            <ShieldCheck className="h-4 w-4" />
            Verify this company via DOT
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Not sure of the company name? Check licensing with a{' '}
          <strong className="font-medium text-foreground">USDOT</strong> or{' '}
          <strong className="font-medium text-foreground">MC number</strong> on our free verifier
          (e.g. DOT 3784776 or MC-15735).
        </p>
      </div>

      {showCarrierPanel ? (
        <div className="mt-8 w-full max-w-lg">
          <DirectoryCarrierFmcsaPanel
            carrierQuery={trimmed || parsedCarrier!.display}
            displayNumber={parsedCarrier!.display}
          />
        </div>
      ) : trimmed ? (
        <div className="mt-6 w-full max-w-md space-y-2">
          <SuggestCompanyCta
            sourcePage={sourcePage}
            carrierQuery={parsedCarrier ? trimmed : undefined}
            initialName={parsedCarrier ? undefined : trimmed}
            variant="outline"
            size="default"
            className="w-full"
            label="Suggest this company for our directory"
          />
        </div>
      ) : null}

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 text-sm text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}