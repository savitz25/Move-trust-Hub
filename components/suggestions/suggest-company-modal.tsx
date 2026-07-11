'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { Building2, ExternalLink, Loader2, PlusCircle } from 'lucide-react';
import {
  getSuggestionSubmitterDefaults,
  submitCompanySuggestion,
} from '@/actions/suggest-company';
import { OnboardingCarrierLookup } from '@/components/suggestions/onboarding-carrier-lookup';
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
  carrierQuery: initialCarrierQuery = '',
  initialName = '',
  loadingPreview = false,
  previewError = null,
  onEnrichedPreviewChange,
}: Props) {
  const [activePreview, setActivePreview] = useState<EnrichedCompanyPreview | null>(enrichedPreview);
  const [carrierQuery, setCarrierQuery] = useState(initialCarrierQuery);
  const [lookupError, setLookupError] = useState<string | null>(previewError);
  const [details, setDetails] = useState('');
  const [suggestedByName, setSuggestedByName] = useState('');
  const [suggestedByEmail, setSuggestedByEmail] = useState('');
  const [isTrustedSubmitter, setIsTrustedSubmitter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<SubmitSuccessState | null>(null);
  const [pending, startTransition] = useTransition();

  const readyToSubmit = Boolean(activePreview?.fmcsa?.legalName && carrierQuery.trim());

  useEffect(() => {
    if (open && enrichedPreview?.fmcsa) {
      setActivePreview(enrichedPreview);
    }
  }, [open, enrichedPreview]);

  useEffect(() => {
    if (open) {
      setLookupError(previewError);
    }
  }, [open, previewError]);

  useEffect(() => {
    if (!open) return;

    getSuggestionSubmitterDefaults().then((defaults) => {
      setIsTrustedSubmitter(defaults.isTrustedSubmitter);
      if (defaults.isTrustedSubmitter) {
        setSuggestedByName(defaults.suggestedByName);
        setSuggestedByEmail(defaults.suggestedByEmail);
      }
    });
  }, [open]);

  function resetForm() {
    setActivePreview(null);
    setCarrierQuery(initialCarrierQuery);
    setLookupError(null);
    setDetails('');
    setSuggestedByName('');
    setSuggestedByEmail('');
    setSubmitted(false);
    setSubmitSuccess(null);
    onEnrichedPreviewChange?.(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function handlePreviewReady(preview: EnrichedCompanyPreview, query: string) {
    setActivePreview(preview);
    setCarrierQuery(query);
    setLookupError(null);
    onEnrichedPreviewChange?.(preview);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!readyToSubmit) return;

    startTransition(async () => {
      const res = await submitCompanySuggestion({
        carrierQuery,
        name: null,
        details: details || null,
        suggestedByName,
        suggestedByEmail,
        sourcePage,
        website: '',
        enrichmentSnapshot: activePreview
          ? {
              google: activePreview.google,
              publicScrape: activePreview.publicScrape,
              fetchedAt: activePreview.fetchedAt,
            }
          : null,
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
      if (res.pendingReview) {
        toast.success('Submission received — pending admin review.');
      } else {
        toast.success('Company published to the directory.');
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Add company to directory
          </DialogTitle>
          <DialogClose onClose={() => handleOpenChange(false)} />
        </DialogHeader>

        {submitted ? (
          <div className="px-6 pb-6 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {submitSuccess?.pendingReview
                ? 'Thank you — your submission is in the admin review queue. FMCSA, Google, and BBB data are on file. Once approved, the profile will be live at the link below (usually within one business day).'
                : 'Published — this company is live in the directory with FMCSA, Google, and BBB data on file. County and destination coverage were assigned from the headquarters address.'}
            </p>
            {submitSuccess?.profileSlug ? (
              <div className="rounded-md border bg-muted/40 p-4 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {submitSuccess.pendingReview ? 'Expected profile URL' : 'Live profile'}
                </p>
                <p className="text-sm font-mono text-foreground">
                  /companies/{submitSuccess.profileSlug}
                </p>
                {submitSuccess.pendingReview ? (
                  <p className="text-xs text-muted-foreground">
                    This URL is reserved for after admin approval. It will show &quot;not found&quot;
                    until then — that is expected.
                  </p>
                ) : (
                  <Link
                    href={`/companies/${submitSuccess.profileSlug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ) : null}
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : loadingPreview ? (
          <div className="px-6 pb-8 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Pulling FMCSA, Google Places, and BBB data…
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            {!readyToSubmit ? (
              <>
                <OnboardingCarrierLookup
                  initialCarrierQuery={initialCarrierQuery}
                  initialCompanyName={initialName}
                  onPreviewReady={handlePreviewReady}
                  onError={setLookupError}
                  disabled={pending}
                />
                {lookupError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {lookupError}
                  </p>
                ) : null}
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {isTrustedSubmitter
                    ? 'Admin mode — review the preview below, then publish directly to the directory. No daily limits apply while you are logged in.'
                    : 'Review the multi-source preview below. FMCSA is primary; Google is supplemental; BBB/public scrape is lowest confidence. Add optional notes, then submit for admin review.'}
                </p>

                <MultiSourcePreviewCard preview={activePreview!} />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setActivePreview(null);
                    setCarrierQuery('');
                    onEnrichedPreviewChange?.(null);
                  }}
                  disabled={pending}
                >
                  Search a different carrier
                </Button>

                <div>
                  <label htmlFor="suggest-details" className="text-sm font-medium">
                    Your notes <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="suggest-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Why you’re adding this carrier, website, or service area…"
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

                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <Button type="submit" className="w-full gap-2" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isTrustedSubmitter ? 'Publishing to directory…' : 'Submitting to review queue…'}
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4" />
                      {isTrustedSubmitter ? 'Publish to Directory' : 'Add to Directory'}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}