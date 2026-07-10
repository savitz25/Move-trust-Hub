import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { getMovingCompanyBySlug } from '@/lib/reviews/companies';
import { getAllCompanies } from '@/lib/data-server';
import { getApprovedReviews } from '@/lib/reviews/queries';
import { buildAggregateRatingSchema } from '@/lib/reviews/aggregate-rating';
import { PublicReviewList } from '@/components/reviews/public-review-list';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildSaferLookupUrl } from '@/lib/verify-dot/fmcsa';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { reviewUrlForMovingCompany } from '@/lib/reviews/review-url';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const company = await getMovingCompanyBySlug(slug);
  if (!company) return { title: 'Carrier Not Found' };

  const title = `${company.name} Reviews — DOT/MC Verified Profile`;
  const description = `${company.name} customer reviews on Move Trust Hub. ${company.approved_review_count} moderated reviews, ${Number(company.avg_rating).toFixed(1)}★ average. Verify FMCSA licensing before you book.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/company/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CompanyReviewProfilePage({ params }: Props) {
  const { slug } = await params;
  const company = await getMovingCompanyBySlug(slug);
  if (!company) notFound();

  const { reviews, total } = await getApprovedReviews(company.id, {
    page: 1,
    pageSize: 10,
    sort: 'newest',
  });

  const reviewHref = reviewUrlForMovingCompany({
    slug: company.slug,
    dotNumber: company.dot_number,
    mcNumber: company.mc_number,
  });

  const saferUrl =
    company.dot_number || company.mc_number
      ? buildSaferLookupUrl({
          type: company.dot_number ? 'DOT' : 'MC',
          value: (company.dot_number || company.mc_number)!,
          display: company.dot_number ? `DOT ${company.dot_number}` : `MC-${company.mc_number}`,
        })
      : null;

  const schema = buildAggregateRatingSchema({
    companyName: company.name,
    slug: company.slug,
    avgRating: Number(company.avg_rating),
    reviewCount: company.approved_review_count,
    reviews,
  });

  return (
    <>
      <JsonLd data={schema} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/review"
          className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Leave another review
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              Community Review Profile
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {company.name}
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              {company.dot_number ? `USDOT ${company.dot_number}` : null}
              {company.dot_number && company.mc_number ? ' · ' : null}
              {company.mc_number ? `MC-${company.mc_number}` : null}
              {company.address ? ` · ${company.address}` : null}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <UserReviewsCta href={reviewHref} />
            {saferUrl ? (
              <Button variant="outline" asChild>
                <a href={saferUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  FMCSA Record <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <Card className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Average rating</p>
            <div className="mt-1">
              <StarRating
                rating={Number(company.avg_rating)}
                size="lg"
              />
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Approved reviews</p>
            <p className="text-3xl font-semibold mt-1 tabular-nums">
              {company.approved_review_count}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Verification</p>
            <p className="mt-2 text-sm flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Moderated submissions
            </p>
          </Card>
        </div>

        {company.legacy_company_id ? (
          <LegacyDirectoryLink legacyId={company.legacy_company_id} />
        ) : null}

        <PublicReviewList
          companyId={company.id}
          companyName={company.name}
          initialReviews={reviews}
          initialTotal={total}
        />

        <Card className="mt-10 p-5 text-xs text-muted-foreground leading-relaxed">
          Move Trust Hub is not affiliated with {company.name} or FMCSA. Reviews are
          submitted by customers and approved by moderators. Ratings may differ from
          third-party platforms. Always verify current licensing on the official government
          site before signing a contract.
        </Card>
      </div>
    </>
  );
}

async function LegacyDirectoryLink({ legacyId }: { legacyId: string }) {
  const legacyById = (await getAllCompanies()).find((c) => c.id === legacyId);
  if (!legacyById) return null;

  return (
    <Card className="mb-8 p-4 bg-primary/5 border-primary/20 text-sm">
      This carrier is also in our{' '}
      <Link
        href={`/companies/${legacyById.slug}`}
        className="text-primary font-medium underline"
      >
        full directory profile
      </Link>{' '}
      with FMCSA and pricing data.
    </Card>
  );
}