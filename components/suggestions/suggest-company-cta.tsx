'use client';

import { useEffect, useState, useTransition } from 'react';
import { Loader2, PlusCircle } from 'lucide-react';
import { previewEnrichedCompanySuggestion } from '@/actions/suggest-company';
import { SuggestCompanyModal } from '@/components/suggestions/suggest-company-modal';
import { Button } from '@/components/ui/button';
import type { EnrichedCompanyPreview, FmcsaSuggestionPreview } from '@/lib/suggestions/types';

type Props = {
  sourcePage: string;
  /** When set, pre-loads FMCSA + enrichment for verified carrier flow */
  carrierQuery?: string;
  /** Pre-loaded FMCSA data from verify page or directory panel */
  dotPreview?: FmcsaSuggestionPreview | null;
  initialName?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  label?: string;
};

export function SuggestCompanyCta({
  sourcePage,
  carrierQuery = '',
  dotPreview: initialDotPreview = null,
  initialName = '',
  variant = 'default',
  size = 'lg',
  className,
  label = 'Add Company to Directory',
}: Props) {
  const [open, setOpen] = useState(false);
  const [enrichedPreview, setEnrichedPreview] = useState<EnrichedCompanyPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loadingPreview, startPreviewTransition] = useTransition();

  const hasCarrierQuery = Boolean(carrierQuery.trim());

  useEffect(() => {
    if (initialDotPreview?.legalName && carrierQuery) {
      setEnrichedPreview({
        fmcsa: initialDotPreview,
        google: null,
        publicScrape: null,
        fetchedAt: new Date().toISOString(),
      });
    }
  }, [initialDotPreview, carrierQuery]);

  function handleClick() {
    setPreviewError(null);
    setOpen(true);

    if (!hasCarrierQuery) {
      setEnrichedPreview(null);
      return;
    }

    startPreviewTransition(async () => {
      const res = await previewEnrichedCompanySuggestion({ carrierQuery });
      if (!res.success || !res.preview) {
        setPreviewError(res.error ?? 'Could not load verification data.');
        setEnrichedPreview(null);
        return;
      }
      setEnrichedPreview(res.preview);
    });
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={handleClick}
        disabled={loadingPreview}
      >
        {loadingPreview ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <PlusCircle className="h-4 w-4 mr-2" />
        )}
        {loadingPreview ? 'Loading verification data…' : label}
      </Button>
      <SuggestCompanyModal
        open={open}
        onOpenChange={setOpen}
        sourcePage={sourcePage}
        enrichedPreview={enrichedPreview}
        carrierQuery={carrierQuery}
        initialName={initialName}
        loadingPreview={loadingPreview}
        previewError={previewError}
        onEnrichedPreviewChange={setEnrichedPreview}
      />
    </>
  );
}