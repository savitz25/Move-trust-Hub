'use client';

import { useState, useTransition } from 'react';
import { Loader2, PlusCircle } from 'lucide-react';
import { previewFmcsaSuggestion } from '@/actions/suggest-company';
import { SuggestCompanyModal } from '@/components/suggestions/suggest-company-modal';
import { Button } from '@/components/ui/button';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

type Props = {
  sourcePage: string;
  /** When set, opens FMCSA-trusted flow */
  carrierQuery?: string;
  /** Skip FMCSA fetch when verify page already loaded preview */
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
  label,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dotPreview, setDotPreview] = useState<FmcsaSuggestionPreview | null>(initialDotPreview);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loadingPreview, startPreviewTransition] = useTransition();

  const isDotFlow = Boolean(carrierQuery.trim());
  const buttonLabel =
    label ?? (isDotFlow ? 'Add This Company to Directory' : 'Company not listed? Suggest it');

  function handleClick() {
    if (initialDotPreview?.legalName) {
      setDotPreview(initialDotPreview);
      setPreviewError(null);
      setOpen(true);
      return;
    }

    if (!carrierQuery.trim()) {
      setDotPreview(null);
      setPreviewError(null);
      setOpen(true);
      return;
    }

    startPreviewTransition(async () => {
      setPreviewError(null);
      const res = await previewFmcsaSuggestion(carrierQuery);
      if (!res.success || !res.preview) {
        setPreviewError(res.error ?? 'Could not load FMCSA data.');
        setDotPreview(null);
        setOpen(true);
        return;
      }
      setDotPreview(res.preview);
      setOpen(true);
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
        {loadingPreview ? 'Loading FMCSA data…' : buttonLabel}
      </Button>
      <SuggestCompanyModal
        open={open}
        onOpenChange={setOpen}
        sourcePage={sourcePage}
        dotPreview={dotPreview}
        carrierQuery={carrierQuery}
        initialName={initialName}
        loadingPreview={loadingPreview}
        previewError={previewError}
      />
    </>
  );
}