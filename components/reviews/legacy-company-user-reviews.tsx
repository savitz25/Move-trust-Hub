import Link from 'next/link';
import { findMovingCompanyForLegacy } from '@/lib/reviews/bridge';
import { getApprovedReviews } from '@/lib/reviews/queries';
import { PublicReviewList } from '@/components/reviews/public-review-list';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { StarRating } from '@/components/ui/star-rating';
import { Card } from '@/components/ui/card';
import { buildReviewPageUrl } from '@/lib/reviews/review-url';
import { slugFromCarrier } from '@/lib/reviews/schema';

type Props = {
  legacyId: string;
  companyName: string;
  usdotNumber?: string;
  mcNumber?: string;
};

export async function LegacyCompanyUserReviews({
  legacyId,
  companyName,
  usdotNumber,
  mcNumber,
}: Props) {
  const movingCompany = await findMovingCompanyForLegacy({
    legacyId,
    usdotNumber,
    mcNumber,
  });

  const dot = usdotNumber?.replace(/\D/g, '');
  const mc = mcNumber?.replace(/\D/g, '');
  const carrierDisplay = dot ? `DOT ${dot}` : mc ? `MC-${mc}` : '';
  const reviewSlug = movingCompany?.slug
    ?? (dot ? slugFromCarrier('DOT', dot) : mc ? slugFromCarrier('MC', mc) : '');
  const reviewHref = buildReviewPageUrl({
    slug: reviewSlug || undefined,
    carrier: carrierDisplay || undefined,
    sourcePage: movingCompany ? `/company/${movingCompany.slug}` : undefined,
  });

  if (!movingCompany || movingCompany.approved_review_count === 0) {
    return (
      <Card className="p-5">
        <h3 className="font-semibold text-lg">Community Reviews</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No moderated customer reviews yet for {companyName}. Share your experience to help
          other families.
        </p>
        <div className="mt-4">
          <UserReviewsCta href={reviewHref} />
        </div>
      </Card>
    );
  }

  const { reviews, total } = await getApprovedReviews(movingCompany.id, {
    page: 1,
    pageSize: 5,
    sort: 'newest',
  });

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-muted/30 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Move Trust Hub community
          </p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={Number(movingCompany.avg_rating)} size="sm" />
            <span className="text-sm text-muted-foreground">
              ({movingCompany.approved_review_count} moderated)
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <UserReviewsCta href={reviewHref} />
          <Link
            href={`/company/${movingCompany.slug}`}
            className="text-sm text-primary underline underline-offset-2"
          >
            All community reviews →
          </Link>
        </div>
      </Card>

      <PublicReviewList
        companyId={movingCompany.id}
        companyName={companyName}
        initialReviews={reviews}
        initialTotal={total}
        pageSize={5}
      />
    </div>
  );
}