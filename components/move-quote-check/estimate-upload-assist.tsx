'use client';

import { useCallback, useRef, useState } from 'react';
import { FileUp, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  extractEstimateFromFile,
  UPLOAD_ACCEPT,
  UPLOAD_MAX_BYTES,
  type UploadExtractResult,
} from '@/lib/move-quote-check/extract-upload';
import type { PasteSuggestion } from '@/lib/move-quote-check/paste-parse';
import {
  trackQuoteCheckUploadLowConfidence,
  trackQuoteCheckUploadStarted,
  trackQuoteCheckUploadSuccess,
  trackQuoteCheckPrefillFromUpload,
} from '@/lib/move-quote-check/analytics';

type Props = {
  className?: string;
  onExtracted: (result: {
    text: string;
    suggestions: PasteSuggestion[];
    notices: string[];
    fileName: string;
    quality: UploadExtractResult['quality'];
  }) => void;
  onClear?: () => void;
};

/**
 * Phase 5 — optional PDF/image upload for prefill assist only.
 */
export function EstimateUploadAssist({ className, onExtracted, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [errorish, setErrorish] = useState(false);

  const processFile = useCallback(
    async (file: File | null | undefined) => {
      if (!file) return;
      setLoading(true);
      setErrorish(false);
      setStatus(null);
      setFileLabel(file.name);
      trackQuoteCheckUploadStarted({
        type: file.type || 'unknown',
        size_kb: Math.round(file.size / 1024),
      });

      const result = await extractEstimateFromFile(file);
      // Drop file reference — no retention
      if (inputRef.current) inputRef.current.value = '';

      setLoading(false);
      setStatus(result.message);
      setErrorish(!result.ok);

      if (result.ok && result.parse && result.parse.suggestions.length > 0) {
        trackQuoteCheckUploadSuccess({
          method: result.method,
          quality: result.quality,
          suggestion_count: result.parse.suggestions.length,
        });
        trackQuoteCheckPrefillFromUpload({
          field_count: result.parse.suggestions.length,
        });
        onExtracted({
          text: result.text,
          suggestions: result.parse.suggestions,
          notices: result.parse.notices,
          fileName: result.fileName,
          quality: result.quality,
        });
      } else {
        trackQuoteCheckUploadLowConfidence({
          method: result.method,
          quality: result.quality,
        });
        // Still pass partial suggestions if any, so user can review
        if (result.parse?.suggestions.length) {
          onExtracted({
            text: result.text,
            suggestions: result.parse.suggestions,
            notices: [
              ...result.parse.notices,
              'Low-confidence extraction — confirm every field carefully.',
            ],
            fileName: result.fileName,
            quality: result.quality,
          });
        }
      }
    },
    [onExtracted]
  );

  function clear() {
    setFileLabel(null);
    setStatus(null);
    setErrorish(false);
    if (inputRef.current) inputRef.current.value = '';
    onClear?.();
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'rounded-xl border border-dashed px-4 py-5 text-center transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/20',
          loading && 'opacity-70'
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          void processFile(f);
        }}
      >
        <FileUp className="mx-auto h-7 w-7 text-primary/80" aria-hidden />
        <p className="mt-2 text-sm font-semibold text-foreground">
          Upload estimate PDF or image
        </p>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
          Optional. Used only to help prefill your review. Not sold. Not shared with movers. Not
          stored by default after processing. Max {Math.round(UPLOAD_MAX_BYTES / (1024 * 1024))} MB ·
          PDF, PNG, JPG, WEBP.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={UPLOAD_ACCEPT}
          className="sr-only"
          id="mqc-estimate-upload"
          onChange={(e) => void processFile(e.target.files?.[0])}
        />
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" aria-hidden />
                Reading file…
              </>
            ) : (
              'Choose file'
            )}
          </Button>
          {fileLabel ? (
            <Button type="button" size="sm" variant="ghost" onClick={clear} disabled={loading}>
              <X className="mr-1 h-3.5 w-3.5" aria-hidden />
              Clear upload
            </Button>
          ) : null}
        </div>
        {fileLabel ? (
          <p className="mt-2 text-[11px] text-muted-foreground">Selected: {fileLabel}</p>
        ) : null}
      </div>
      {status ? (
        <p
          className={cn(
            'text-xs leading-relaxed rounded-lg border px-3 py-2',
            errorish
              ? 'border-amber-200 bg-amber-50 text-amber-950'
              : 'border-emerald-200 bg-emerald-50/80 text-emerald-950'
          )}
          role="status"
        >
          {status}
        </p>
      ) : null}
    </div>
  );
}
