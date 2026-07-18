'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ImagePlus, Loader2, Sparkles } from 'lucide-react';
import { submitReviewWithPhotos, type LookupCarrierPreview } from '@/actions/reviews';
import { StarSelector } from '@/components/reviews/star-selector';
import { ReviewCompanyHeader } from '@/components/reviews/review-company-header';
import { ReviewGuidelines } from '@/components/reviews/review-guidelines';
import {
  ReviewProgressSteps,
  type ReviewFlowStep,
} from '@/components/reviews/review-progress-steps';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  carrier: LookupCarrierPreview;
  displayNumber: string;
  sourcePage?: string;
  onBack: () => void;
  skipSearch?: boolean;
};

export function ReviewSubmissionForm({
  carrier,
  displayNumber,
  sourcePage = '/review',
  onBack,
  skipSearch = false,
}: Props) {
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moveDate, setMoveDate] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const flowStep: ReviewFlowStep = submitted
    ? 'done'
    : loading
      ? 'submit'
      : rating < 1
        ? 'rate'
        : 'write';

  const profileHref = carrier.inDatabase
    ? `/company/${carrier.slug}`
    : carrier.legacyProfileSlug
      ? `/companies/${carrier.legacyProfileSlug}`
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) {
      setError('Please select a star rating.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set('carrierQuery', displayNumber);
    if (!carrier.inDatabase) formData.set('companyName', carrier.name);
    formData.set('reviewerName', reviewerName);
    formData.set('reviewerEmail', reviewerEmail);
    formData.set('rating', String(rating));
    formData.set('title', title);
    formData.set('content', content);
    if (moveDate) formData.set('moveDate', moveDate);
    formData.set('sourcePage', sourcePage);
    formData.set('website', honeypot);

    if (photos) {
      Array.from(photos)
        .slice(0, 3)
        .forEach((file) => formData.append('photos', file));
    }

    const res = await submitReviewWithPhotos(formData);
    setLoading(false);

    if (!res.success) {
      setError(res.error ?? 'Submission failed');
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <ReviewProgressSteps current="done" />

        <Card className="border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 to-background dark:from-emerald-950/30 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">Thank you for your review</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
            Your review for <strong className="text-foreground">{carrier.name}</strong> has been
            received and is now in our moderation queue. We typically approve legitimate
            submissions within 1–3 business days. Your email stays private and is never
            published.
          </p>

          <div className="mx-auto mt-4 max-w-sm rounded-lg border bg-background/80 px-4 py-3 text-left text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">What happens next</p>
            <ul className="space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Our team checks for spam, duplicates, and policy compliance</li>
              <li>
                After approval, your review appears on the company profile under{' '}
                <strong className="text-foreground">Customer Reviews</strong> with a{' '}
                &ldquo;Verified by Move Trust Hub&rdquo; badge
              </li>
              <li>Your email stays private — we never publish it or sell your data</li>
              <li>Independent directory — no paid placements or ranking boosts</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {profileHref ? (
              <Button asChild>
                <Link href={profileHref}>Back to company profile</Link>
              </Button>
            ) : null}
            {!skipSearch ? (
              <Button variant="outline" onClick={onBack}>
                Review another company
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/review">Leave another review</Link>
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ReviewProgressSteps current={flowStep} />

      <ReviewCompanyHeader
        carrier={carrier}
        displayNumber={displayNumber}
        onChangeCarrier={skipSearch ? undefined : onBack}
        className="mb-6"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-5 sm:p-6 border-primary/10">
          <StarSelector
            value={rating}
            onChange={(r) => {
              setRating(r);
              setError(null);
            }}
            disabled={loading}
            size="xl"
          />
        </Card>

        {rating >= 1 ? (
          <>
            <ReviewGuidelines />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reviewer-name" className="text-sm font-medium">
                  Your name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="reviewer-name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                  maxLength={80}
                  disabled={loading}
                  placeholder="How we'll show your name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <label htmlFor="reviewer-email" className="text-sm font-medium">
                  Email <span className="text-muted-foreground font-normal">(private)</span>{' '}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  id="reviewer-email"
                  type="email"
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  required
                  maxLength={254}
                  disabled={loading}
                  placeholder="For verification only"
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <label htmlFor="review-title" className="text-sm font-medium">
                Headline <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                placeholder="Sum up your experience in one line"
                disabled={loading}
                className="mt-1.5"
              />
            </div>

            <div>
              <label htmlFor="review-content" className="text-sm font-medium">
                Share details of your experience{' '}
                <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="review-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                minLength={50}
                maxLength={5000}
                rows={7}
                disabled={loading}
                placeholder="What went well? What could be improved? Families rely on specifics — timing, crew behavior, pricing, and communication all help."
                className="mt-1.5 resize-y min-h-[160px]"
              />
              <p
                className={cn(
                  'text-xs mt-1.5 tabular-nums',
                  content.length >= 50 ? 'text-muted-foreground' : 'text-amber-600'
                )}
              >
                {content.length} / 5000 · minimum 50 characters
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="move-date" className="text-sm font-medium">
                  Move date <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  id="move-date"
                  type="date"
                  value={moveDate}
                  onChange={(e) => setMoveDate(e.target.value)}
                  disabled={loading}
                  className="mt-1.5"
                />
              </div>
              <div>
                <label
                  htmlFor="review-photos"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <ImagePlus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  Photos <span className="text-muted-foreground font-normal">(optional, max 3)</span>
                </label>
                <label
                  htmlFor="review-photos"
                  className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 px-4 py-5 text-center transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <ImagePlus className="h-6 w-6 text-muted-foreground mb-2" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {photos && photos.length > 0
                      ? `${photos.length} photo${photos.length === 1 ? '' : 's'} selected`
                      : 'Add photos of your move'}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">JPEG, PNG, or WebP · 2 MB each</span>
                  <Input
                    id="review-photos"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={(e) => setPhotos(e.target.files)}
                    disabled={loading}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </>
        ) : null}

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {rating >= 1 ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            By submitting, you confirm this review reflects your genuine experience. All reviews
            enter moderation and only appear after Move Trust Hub approval — clearly labeled
            separately from attributed Google reviews. See our{' '}
            <Link href="/privacy-policy" className="underline text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        ) : null}

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        {rating >= 1 ? (
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto min-h-[52px] gap-2 px-8 text-base"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting review…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Post review
              </>
            )}
          </Button>
        ) : null}
      </form>
    </div>
  );
}