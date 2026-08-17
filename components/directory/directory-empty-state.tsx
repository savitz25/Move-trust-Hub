'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DirectoryCarrierFmcsaPanel } from '@/components/suggestions/directory-carrier-fmcsa-panel';
import { SuggestCompanyCta } from '@/components/suggestions/suggest-company-cta';
import { buildVerifyDotHref } from '@/lib/directory/verify-dot-link';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import {
  EmptyCoveragePanel,
  FMCSA_SAFER_SEARCH_URL,
} from '@/components/research/empty-coverage-panel';
import { PlaceCoverageBanner } from '@/components/directory/place-coverage-banner';
import type { DirectoryPlaceMatch } from '@/lib/directory/resolve-place-query';

type Props = {
  searchTerm: string;
  hasActiveFilters: boolean;
  parsedCarrier: ParsedCarrierNumber | null;
  carrierNotInDirectory: boolean;
  sourcePage?: string;
  onClearFilters: () => void;
  placeMatch?: DirectoryPlaceMatch | null;
};

export function DirectoryEmptyState({
  searchTerm,
  hasActiveFilters,
  parsedCarrier,
  carrierNotInDirectory,
  sourcePage = '/companies',
  onClearFilters,
  placeMatch = null,
}: Props) {
  const trimmed = searchTerm.trim();
  const showCarrierPanel = Boolean(parsedCarrier && carrierNotInDirectory);
  const variant = hasActiveFilters && !trimmed ? 'filtered' : 'filtered';
  const placeTitle = placeMatch
    ? `${placeMatch.headline} — not a missing interstate carrier`
    : trimmed
      ? 'No interstate companies matched this search'
      : 'No companies match these filters';
  const placeDescription = placeMatch
    ? placeMatch.detail
    : trimmed
      ? `No interstate directory profile matched “${trimmed}”. That does not mean a carrier is unlicensed. Verify on FMCSA SAFER, browse local movers by state, or try a USDOT / MC number.`
      : 'No movers match your current filters. Clear filters or browse the full directory — we do not invent listings to fill gaps.';

  return (
    <EmptyCoveragePanel
      variant={variant}
      title={placeTitle}
      description={placeDescription}
      placeLabel={placeMatch ? placeMatch.placeLabel : trimmed || undefined}
      primarySources={[
        {
          href: buildVerifyDotHref(trimmed, parsedCarrier),
          label: 'Verify a DOT / MC number',
        },
        {
          href: FMCSA_SAFER_SEARCH_URL,
          label: 'FMCSA SAFER Company Snapshot',
          external: true,
        },
      ]}
      widenLinks={
        placeMatch
          ? [
              ...(placeMatch.countyHref
                ? [{ href: placeMatch.countyHref, label: `${placeMatch.countyName || 'County'} local movers` }]
                : []),
              { href: placeMatch.stateHref, label: `${placeMatch.stateName} local movers` },
              { href: '/companies', label: 'Full interstate directory' },
              { href: '/moving-calculator', label: 'Moving calculator' },
            ]
          : [
              { href: '/companies', label: 'Full mover directory' },
              { href: '/local-movers', label: 'Local movers by state' },
              { href: '/moving-calculator', label: 'Moving calculator' },
            ]
      }
      journeyLink={{
        href: 'https://www.insurancetrusthub.com/destinations',
        label: 'Research coverage if you’re relocating',
        external: true,
      }}
    >
      {placeMatch ? <PlaceCoverageBanner place={placeMatch} /> : null}

      {showCarrierPanel ? (
        <div className="mt-6 w-full max-w-lg mx-auto text-left">
          <DirectoryCarrierFmcsaPanel
            carrierQuery={trimmed || parsedCarrier!.display}
            displayNumber={parsedCarrier!.display}
          />
        </div>
      ) : null}

      {trimmed && !showCarrierPanel ? (
        <div className="mt-5 w-full max-w-md mx-auto">
          <SuggestCompanyCta
            sourcePage={sourcePage}
            carrierQuery={parsedCarrier ? trimmed : undefined}
            initialName={trimmed}
            variant="outline"
            size="default"
            className="w-full"
            label="Suggest this company for the directory"
          />
        </div>
      ) : null}

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Clear all filters
        </button>
      ) : null}

      <div className="mt-4 print:hidden">
        <Button asChild size="lg" className="min-h-11 gap-2">
          <Link href={buildVerifyDotHref(trimmed, parsedCarrier)}>
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Open DOT verifier
          </Link>
        </Button>
      </div>
    </EmptyCoveragePanel>
  );
}
