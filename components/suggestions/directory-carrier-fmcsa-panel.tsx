'use client';

import { useEffect, useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { previewFmcsaSuggestion } from '@/actions/suggest-company';
import { DotReadonlyFields } from '@/components/suggestions/dot-readonly-fields';
import { SuggestCompanyCta } from '@/components/suggestions/suggest-company-cta';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

const ADD_DIRECTORY_LABEL = 'Add This Company to Our Directory';

type Props = {
  carrierQuery: string;
  displayNumber: string;
};

export function DirectoryCarrierFmcsaPanel({ carrierQuery, displayNumber }: Props) {
  const [preview, setPreview] = useState<FmcsaSuggestionPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setError(null);
      const res = await previewFmcsaSuggestion(carrierQuery);
      if (!res.success || !res.preview) {
        setPreview(null);
        setError(res.error ?? 'No FMCSA record found for this number.');
        return;
      }
      setPreview(res.preview);
    });
  }, [carrierQuery]);

  if (loading) {
    return (
      <div className="mx-auto max-w-lg flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        Loading FMCSA carrier data…
      </div>
    );
  }

  if (error || !preview) {
    return (
      <div className="mx-auto max-w-md space-y-3 rounded-lg border border-dashed border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
        <p className="text-sm text-muted-foreground">
          <strong>{displayNumber}</strong> isn&apos;t in our directory and we couldn&apos;t verify
          it with FMCSA. {error}
        </p>
        <SuggestCompanyCta
          sourcePage="/companies"
          carrierQuery={carrierQuery}
          variant="outline"
          size="default"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-5 text-left">
      <p className="text-sm text-muted-foreground text-center">
        <strong>{preview.legalName ?? displayNumber}</strong> is verified by FMCSA but not yet in
        Move Trust Hub.
      </p>
      <DotReadonlyFields preview={preview} />
      <SuggestCompanyCta
        sourcePage="/companies"
        carrierQuery={carrierQuery}
        dotPreview={preview}
        variant="default"
        size="default"
        className="w-full"
        label={ADD_DIRECTORY_LABEL}
      />
    </div>
  );
}