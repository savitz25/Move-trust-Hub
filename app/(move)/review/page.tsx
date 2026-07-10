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
import { resolveInitialReviewCarrier } from '@/lib/reviews/resolve-initial-carrier';

export const metadata = buildResourceMetadata(
  '/review',
  REVIEW_PAGE_TITLE,
  REVIEW_PAGE_DESCRIPTION
);

type Props = {
  searchParams: Promise<{ carrier?: string; slug?: string; source?: string }>;
};

const reviewPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': REVIEW_PAGE_CANONICAL,
      name: REVIEW_PAGE_TITLE,
      description: REVIEW_PAGE_DESCRIPTION,
      url: REVIEW_PAGE_CANONICAL,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Move Trust Hub',
        url: 'https://www.movetrusthub.com',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${REVIEW_PAGE_CANONICAL}#faq`,
      mainEntity: reviewFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.movetrusthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Leave a Review', item: REVIEW_PAGE_CANONICAL },
      ],
    },
  ],
};

export default async function ReviewPage({ searchParams }: Props) {
  const params = await searchParams;
  const slug = params.slug?.trim();
  const carrier = params.carrier?.trim();
  const sourcePage = params.source?.trim() || '/review';

  const resolved = await resolveInitialReviewCarrier({ slug, carrier });
  const prefillFromProfile = Boolean(resolved?.success && resolved.preview);
  const companyName = resolved?.preview?.name;

  return (
    <>
      <JsonLd data={reviewPageSchema} />

      <div className="border-b bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Community Reviews · Moderated
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {prefillFromProfile && companyName
              ? `Review ${companyName}`
              : 'Leave a Moving Company Review'}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {prefillFromProfile && companyName ? (
              <>
                Share your experience with <strong>{companyName}</strong>. Rate your move,
                write your review, and help other families choose licensed movers — every
                submission is checked before publication.
              </>
            ) : (
              <>
                Search any interstate carrier by <strong>USDOT</strong> or{' '}
                <strong>MC number</strong>. Your review helps other families choose licensed
                movers — every submission is checked before publication.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
        <ReviewPageClient
          initialCarrierQuery={carrier}
          initialCarrier={resolved?.preview}
          initialDisplayNumber={resolved?.displayNumber}
          sourcePage={sourcePage}
          prefillFromProfile={prefillFromProfile}
        />

        <section className="mt-12 prose prose-neutral max-w-none text-sm">
          <h2>How moderation works</h2>
          <p>
            Reviews enter a <strong>pending</strong> queue when submitted. Our team checks
            for spam, duplicate emails, and policy violations before approving. Rejected
            reviews are not published. Typical turnaround is 1–3 business days.
          </p>
          <p>
            <strong>Transparency:</strong> Approved Move Trust Hub reviews are labeled
            &ldquo;Verified by Move Trust Hub.&rdquo; Google-sourced reviews on company
            profiles remain clearly attributed to Google and are separate from our moderated
            community reviews.
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