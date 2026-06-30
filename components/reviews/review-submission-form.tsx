'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitReviewWithPhotos, type LookupCarrierPreview } from '@/actions/reviews';
import { StarSelector } from '@/components/reviews/star-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

type Props = {
  carrier: LookupCarrierPreview;
  displayNumber: string;
  sourcePage?: string;
  onBack: () => void;
};

export function ReviewSubmissionForm({
  carrier,
  displayNumber,
  sourcePage = '/review',
  onBack,
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
      <Card className="border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold">Thank you — review received</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Your review for <strong>{carrier.name}</strong> is pending moderation. We
          typically approve legitimate submissions within 1–3 business days. Your email
          is kept private and never published.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/company/${carrier.slug}`}>View carrier profile</Link>
            </Button>
            <Button variant="outline" onClick={onBack}>
              Review another carrier
            </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card className="p-4 bg-muted/30">
        <p className="text-sm">
          Reviewing: <strong>{carrier.name}</strong> ({displayNumber})
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-primary underline underline-offset-2 mt-1"
        >
          Change carrier
        </button>
      </Card>

      <StarSelector value={rating} onChange={setRating} disabled={loading} />

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
            className="mt-1.5"
          />
        </div>
        <div>
          <label htmlFor="reviewer-email" className="text-sm font-medium">
            Email (private) <span className="text-destructive">*</span>
          </label>
          <Input
            id="reviewer-email"
            type="email"
            value={reviewerEmail}
            onChange={(e) => setReviewerEmail(e.target.value)}
            required
            maxLength={254}
            disabled={loading}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="review-title" className="text-sm font-medium">
          Review title (optional)
        </label>
        <Input
          id="review-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="e.g. Smooth cross-country move, minor delays"
          disabled={loading}
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="review-content" className="text-sm font-medium">
          Your experience <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={50}
          maxLength={5000}
          rows={6}
          disabled={loading}
          placeholder="Describe pickup, delivery, pricing accuracy, communication, and any issues. Minimum 50 characters."
          className="mt-1.5"
        />
        <p className="text-xs text-muted-foreground mt-1">{content.length} / 5000 (min 50)</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="move-date" className="text-sm font-medium">
            Move date (optional)
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
          <label htmlFor="review-photos" className="text-sm font-medium">
            Photos (optional, max 3)
          </label>
          <Input
            id="review-photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => setPhotos(e.target.files)}
            disabled={loading}
            className="mt-1.5"
          />
          <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, or WebP · 2 MB each</p>
        </div>
      </div>

      {/* Honeypot */}
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

      <p className="text-xs text-muted-foreground leading-relaxed">
        By submitting, you confirm this review reflects your genuine experience. All
        reviews are moderated before publication. We never sell your email. See our{' '}
        <Link href="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto min-h-[48px] gap-2" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          'Submit review for moderation'
        )}
      </Button>
    </form>
  );
}