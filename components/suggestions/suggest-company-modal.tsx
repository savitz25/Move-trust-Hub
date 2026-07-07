'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { Building2, ExternalLink, Loader2, PlusCircle } from 'lucide-react';
import { previewEnrichedCompanySuggestion, submitCompanySuggestion } from '@/actions/suggest-company';
import { MultiSourcePreviewCard } from '@/components/verification/multi-source-preview-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';
import { toast } from 'sonner';

type SubmitSuccessState = {
  profileSlug: string;
  pendingReview: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePage: string;
  enrichedPreview?: EnrichedCompanyPreview | null;
  carrierQuery?: string;
  initialName?: string;
  loadingPreview?: boolean;
  previewError?: string | null;
  onEnrichedPreviewChange?: (preview: EnrichedCompanyPreview | null) => void;
};

export function SuggestCompanyModal({
  open,
  onOpenChange,
  sourcePage,
  enrichedPreview = null,
  carrierQuery = '',
  initialName = '',
  loadingPreview = false,
  previewError = null,
  onEnrichedPreviewChange,
}: Props) {
  const isDotMode = Boolean(enrichedPreview?.fmcsa?.legalName && carrierQuery);
  const [name, setName] = useState(initialName);
  const [manualPreview, setManualPreview] = useState<EnrichedCompanyPreview | null>(null);
  const [manualPreviewError, setManualPreviewError] = useState<string | null>(null);
  const [loadingManualPreview, startManualPreviewTransition] = useTransition();
  const [details, setDetails] = useState('');
  const [suggestedByName, setSuggestedByName] = useState('');
  const [suggestedByEmail, setSuggestedByEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<SubmitSuccessState | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open && !submitted && !isDotMode) {
      setName(initialName);
    }
  }, [open, initialName, submitted, isDotMode]);

  const activePreview = isDotMode ? enrichedPreview : manualPreview ?? enrichedPreview;

  function resetForm() {
    setName(initialName);
    setDetails('');
    setSuggestedByName('');
    setSuggestedByEmail('');
    setSubmitted(false);
    setSubmitSuccess(null);
    setManualPreview(null);
    setManualPreviewError(null);
    onEnrichedPreviewChange?.(null);
  }

  function loadManualEnrichmentPreview() {
    const trimmed = name.trim();
    if (!trimmed) {
      setManualPreviewError('Enter a company name first.');
      return;
    }

    startManualPreviewTransition(async () => {
      setManualPreviewError(null);
      const res = await previewEnrichedCompanySuggestion({ companyName: trimmed });
      if (!res.success || !res.preview) {
        setManualPreviewError(res.error ?? 'Could not load rating data.');
        setManualPreview(null);
        onEnrichedPreviewChange?.(null);
        return;
      }
      setManualPreview(res.preview);
      onEnrichedPreviewChange?.(res.preview);
    });
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitCompanySuggestion({
        carrierQuery: isDotMode ? carrierQuery : null,
        name: isDotMode ? null : name,
        details: details || null,
        suggestedByName,
        suggestedByEmail,
        sourcePage,
        website: '',
      });

      if (!res.success) {
        if (res.existingProfileSlug) {
          toast.error(
            <span>
              {res.error ?? 'This company is already listed.'}{' '}
              <Link href={`/companies/${res.existingProfileSlug}`} className="underline font-medium">
                View profile
              </Link>
            </span>
          );
        } else {
          toast.error(res.error ?? 'Submission failed');
        }
        return;
      }

      if (res.profileSlug) {
        setSubmitSuccess({
          profileSlug: res.profileSlug,
          pendingReview: Boolean(res.pendingReview),
        });
      }
      setSubmitted(true);
      toast.success('Submission received — pending directory review.');
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {isDotMode ? 'Add company to directory' : 'Suggest a missing company'}
          </DialogTitle>
          <DialogClose onClose={() => handleOpenChange(false)} />
        </DialogHeader>

        {submitted ? (
          <div className="px-6 pb-6 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {submitSuccess?.pendingReview
                ? 'Thank you — your submission is pending review. FMCSA, Google, and public rating data are on file. Once approved, the profile will be live at the link below (usually within one business day).'
                : 'Thank you — we&apos;ll review and add it shortly.'}
            </p>
            {submitSuccess?.profileSlug ? (
              <div className="rounded-md border bg-muted/40 p-4 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Expected profile URL
                </p>
                <Link
                  href={`/companies/${submitSuccess.profileSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  /companies/{submitSuccess.profileSlug}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                {submitSuccess.pendingReview ? (
                  <p className="text-xs text-muted-foreground">
                    The page may show &quot;not found&quot; until moderation is complete. You can
                    bookmark this link and check back after approval.
                  </p>
                ) : null}
              </div>
            ) : null}
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : loadingPreview ? (
          <div className="px-6 pb-8 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Loading FMCSA, Google, and public rating data…
          </div>
        ) : previewError ? (
          <div className="px-6 pb-6 space-y-4">
            <p className="text-sm text-destructive" role="alert">
              {previewError}
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            {isDotMode && activePreview ? (
              <>
                <p className="text-sm text-muted-foreground">
                  This carrier is verified via FMCSA but not yet in our directory. Review enriched
                  data from multiple sources below, then add optional notes.
                </p>
                <MultiSourcePreviewCard preview={activePreview} />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Help other families find trustworthy movers. We can pull Google and public ratings
                  before you submit.
                </p>
                <div>
                  <label htmlFor="suggest-name" className="text-sm font-medium">
                    Company name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="suggest-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (manualPreview) {
                        setManualPreview(null);
                        onEnrichedPreviewChange?.(null);
                      }
                    }}
                    placeholder="e.g. ABC Moving & Storage"
                    className="mt-1.5"
                    required
                    maxLength={120}
                    disabled={pending || loadingManualPreview}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full gap-2"
                  disabled={pending || loadingManualPreview || !name.trim()}
                  onClick={loadManualEnrichmentPreview}
                >
                  {loadingManualPreview ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading Google &amp; public ratings…
                    </>
                  ) : (
                    'Look up Google & public ratings'
                  )}
                </Button>
                {manualPreviewError ? (
                  <p className="text-xs text-destructive" role="alert">
                    {manualPreviewError}
                  </p>
                ) : null}
                {activePreview && !isDotMode ? (
                  <MultiSourcePreviewCard preview={activePreview} showFmcsa={false} />
                ) : null}
              </>
            )}

            <div>
              <label htmlFor="suggest-details" className="text-sm font-medium">
                Your notes <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="suggest-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  isDotMode
                    ? 'Why you’re adding this carrier, website, or service area…'
                    : 'City/state, USDOT if known, or why this mover should be listed…'
                }
                className="mt-1.5 flex min-h-[88px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                maxLength={1000}
                disabled={pending}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="suggest-by-name" className="text-sm font-medium">
                  Your name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="suggest-by-name"
                  value={suggestedByName}
                  onChange={(e) => setSuggestedByName(e.target.value)}
                  className="mt-1.5"
                  required
                  maxLength={80}
                  disabled={pending}
                />
              </div>
              <div>
                <label htmlFor="suggest-by-email" className="text-sm font-medium">
                  Your email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="suggest-by-email"
                  type="email"
                  value={suggestedByEmail}
                  onChange={(e) => setSuggestedByEmail(e.target.value)}
                  className="mt-1.5"
                  required
                  maxLength={254}
                  disabled={pending}
                />
              </div>
            </div>

            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={pending || loadingManualPreview || (isDotMode && !activePreview?.fmcsa)}
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  {isDotMode ? 'Submit for directory review' : 'Submit suggestion'}
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              Submissions are moderated. FMCSA is primary; Google API is supplemental; public scrape
              data is shown for transparency only.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}