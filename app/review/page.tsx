import Link from 'next/link';
import { ReviewPageClient } from '@/components/reviews/review-page-client';
import { FaqSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import {
  REVIEW_PAGE_CANONICAL,
  REVIEW_PAGE_DESCRIPTION,
  REVIEW_PAGE_TITLE,
  reviewFaqItems,
} from '@/lib/reviews/seo';

export const metadata = buildResourceMetadata(
  '/review',
  REVIEW_PAGE_TITLE,
  REVIEW_PAGE_DESCRIPTION
);

type Props = {
  searchParams: Promise<{ carrier?: string; slug?: string }>;
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: REVIEW_PAGE_TITLE,
  description: REVIEW_PAGE_DESCRIPTION,
  url: REVIEW_PAGE_CANONICAL,
};

export default async function ReviewPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialCarrier = params.carrier?.trim() || undefined;

  return (
    <>
      <JsonLd data={webPageSchema} />

      <div className="border-b bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Community Reviews · Moderated
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Leave a Moving Company Review
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Search any interstate carrier by <strong>USDOT</strong> or{' '}
            <strong>MC number</strong>. Your review helps other families choose licensed
            movers — every submission is checked before publication.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
        <ReviewPageClient initialCarrierQuery={initialCarrier} />

        <section className="mt-12 prose prose-neutral max-w-none text-sm">
          <h2>How moderation works</h2>
          <p>
            Reviews enter a <strong>pending</strong> queue when submitted. Our team checks
            for spam, duplicate emails, and policy violations before approving. Rejected
            reviews are not published. Typical turnaround is 1–3 business days.
          </p>
          <p>
            Looking up a carrier first? Try our{' '}
            <Link href="/verify-dot">DOT verification tool</Link> to confirm FMCSA licensing
            before you book.
          </p>
        </section>

        <div className="mt-12">
          <FaqSection title="Review Submission FAQ" items={reviewFaqItems} />
        </div>
      </div>
    </>
  );
}