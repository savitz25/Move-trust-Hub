import Link from 'next/link';
import { MessageSquarePlus, ShieldCheck, Star } from 'lucide-react';
import { findMovingCompaniesForLegacy } from '@/lib/reviews/bridge';
import { getApprovedReviews } from '@/lib/reviews/queries';
import { PublicReviewList } from '@/components/reviews/public-review-list';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { StarRating } from '@/components/ui/star-rating';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const movingCompanies = await findMovingCompaniesForLegacy({
    legacyId,
    usdotNumber,
    mcNumber,
  });

  const companyIds = movingCompanies.map((c) => c.id);
  const primary = movingCompanies[0] ?? null;

  const dot = usdotNumber?.replace(/\D/g, '');
  const mc = mcNumber?.replace(/\D/g, '');
  const carrierDisplay = dot ? `DOT ${dot}` : mc ? `MC-${mc}` : '';
  const reviewSlug =
    primary?.slug ??
    (dot ? slugFromCarrier('DOT', dot) : mc ? slugFromCarrier('MC', mc) : '');
  const reviewHref = buildReviewPageUrl({
    slug: reviewSlug || undefined,
    carrier: carrierDisplay || undefined,
    sourcePage: primary ? `/company/${primary.slug}` : undefined,
  });

  // Always query approved rows — do not trust denormalized count alone
  const { reviews, total } =
    companyIds.length > 0
      ? await getApprovedReviews(companyIds, {
          page: 1,
          pageSize: 5,
          sort: 'newest',
        })
      : { reviews: [], total: 0 };

  // Prefer live total; fall back to sum of denormalized counts
  const approvedCount =
    total > 0
      ? total
      : movingCompanies.reduce((s, c) => s + (c.approved_review_count || 0), 0);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : Number(primary?.avg_rating || 0);

  if (approvedCount === 0 || reviews.length === 0) {
    return (
      <Card className="overflow-hidden border-primary/15">
        <div className="border-b bg-gradient-to-r from-primary/8 via-primary/5 to-transparent px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Move Trust Hub Community
          </div>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">Customer Reviews</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Moderated reviews from real customers — no paid placements, no ranking boosts.
          </p>
        </div>
        <div className="p-6 text-center sm:p-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <Star className="h-6 w-6 text-muted-foreground" aria-hidden />
          </div>
          <p className="font-medium text-foreground">No community reviews yet for {companyName}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
            Be the first to share a verified experience. Your review is checked by our team
            before it appears — so other families can trust what they read.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <UserReviewsCta href={reviewHref} />
            <p className="text-[11px] text-muted-foreground">
              Email verified · moderated · independent directory
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4" id="community-reviews">
      <Card className="border-primary/15 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Move Trust Hub Community
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">Customer Reviews</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRating rating={avgRating || Number(primary?.avg_rating || 0)} size="sm" />
              <span className="text-sm text-muted-foreground">
                {approvedCount} moderated review{approvedCount === 1 ? '' : 's'}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Verified by Move Trust Hub · no paid placements
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <UserReviewsCta href={reviewHref} />
            {primary ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/company/${primary.slug}`} className="gap-1">
                  All reviews
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Card>

      <PublicReviewList
        companyId={primary?.id ?? companyIds[0]}
        companyIds={companyIds}
        companyName={companyName}
        initialReviews={reviews}
        initialTotal={total}
        pageSize={5}
        showHeading={false}
      />

      <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-3 text-center">
        <p className="text-sm text-muted-foreground">
          Moved with {companyName}? Your experience helps other families.
        </p>
        <Button variant="link" size="sm" asChild className="mt-1 gap-1">
          <Link href={reviewHref}>
            <MessageSquarePlus className="h-3.5 w-3.5" />
            Leave a review
          </Link>
        </Button>
      </div>
    </div>
  );
}
