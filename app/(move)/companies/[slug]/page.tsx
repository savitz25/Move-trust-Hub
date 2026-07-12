import { notFound, redirect } from 'next/navigation';
import { getCompanyBySlugAsync, getReviews } from '@/lib/data-server';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AttributedReviewsPanel } from '@/components/reviews/attributed-reviews-panel';
import { CompanyProfileStats, FmcsaSafetyMetric } from '@/components/company/company-profile-stats';
import { CompanyProfileReviewSources } from '@/components/company/company-profile-review-sources';
import { getCompanyAttributableReviewCount } from '@/lib/trust/review-display-policy';
import { LegacyCompanyUserReviews } from '@/components/reviews/legacy-company-user-reviews';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';
import { CoverageAreaCard } from '@/components/map/coverage-area-card';
import { getCompanyAssignmentStateSlugs } from '@/lib/map/company-assignment-state-slugs';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { MetricLabel } from '@/components/trust/metric-label';
import { FmcsaLastVerified } from '@/components/fmcsa/fmcsa-last-verified';

import { directoryVerifiedLabel } from '@/lib/trust/company-display-policy';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';
import { FmcsaDotCompliance } from '@/components/trust/fmcsa-dot-compliance';
import { LicenseMetadataDescription } from '@/components/trust/license-display';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { BbbPublicDetail } from '@/components/verification/bbb-public-detail';
import { GoogleReviewsSection } from '@/components/verification/google-reviews-section';
import { PublicScrapeBadges } from '@/components/verification/public-scrape-badges';
import { AdminRefreshVerificationShell } from '@/components/verification/admin-refresh-verification-shell';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { VerificationBadgeLegend } from '@/components/trust/verification-badge-legend';
import { ProfileDataFreshness } from '@/components/trust/profile-data-freshness';


export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const company = await getCompanyBySlugAsync(slug);
  if (!company) return { title: 'Company Not Found' };

  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });
  const canonical = `${SITE_URL}/companies/${company.slug}`;
  return {
    title: `${company.name} — FMCSA Profile, Ratings & Pricing`,
    description: `${company.name} interstate mover profile. ${reviewMeta.headline}. ${LicenseMetadataDescription(company)} BBB ${company.bbbRating}. Coverage: ${company.coverage}. Independent directory — verify FMCSA licensing yourself.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function CompanyProfilePage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompanyBySlugAsync(slug);

  if (!company) notFound();

  if (company.slug !== slug) {
    redirect(`/companies/${company.slug}`);
  }

  const reviews = await getReviews(company.id, 8);
  const assignmentStateSlugs = await getCompanyAssignmentStateSlugs(company.slug);
  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });
  const attributableOnSiteCount = getCompanyAttributableReviewCount(company.id);

  const reviewHref = reviewUrlForDirectoryCompany({
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    slug: company.slug,
  });

  const verification = getCompanyVerificationStatus(company);
  const verifiedLabel = directoryVerifiedLabel(company);
  const scrapeBbb = company.publicScrapeData;
  const showScrapeBbb = verification.bbb === 'verified';
  // BBB trust signal only when a confirmed public BBB listing exists — never legacy/unverified.
  const bbbTrustSignal =
    showScrapeBbb && scrapeBbb?.bbb_rating
      ? `BBB ${scrapeBbb.bbb_rating}${scrapeBbb.bbb_accredited ? ' Accredited' : ''} (public)`
      : null;

  const trustSignals = [
    company.fmcsaSafetyRating === 'Satisfactory' && verifiedLabel && 'FMCSA Satisfactory',
    bbbTrustSignal,
    verifiedLabel,
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={buildCompanyDirectorySchemaGraph(company)} />
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AdminRefreshVerificationShell companyId={company.id} />
      <Link href="/companies" className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Directory
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">{company.name}</h1>
            <CompanyVerificationBadges company={company} className="justify-start" />
            {company.googleData?.status === 'ok' ? (
              <GoogleRatingBadge data={company.googleData} />
            ) : null}
          </div>
          {company.publicScrapeData ? (
            <div className="mt-2">
              <PublicScrapeBadges data={company.publicScrapeData} excludeBbb />
            </div>
          ) : null}
          <div className="text-muted-foreground">{company.headquarters} • Founded {company.foundedYear} • {company.yearsInBusiness} years in business</div>
          {verification.directoryVerified || verification.fmcsa || verification.bbb ? (
            <VerificationBadgeLegend className="mt-4" />
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <a href={company.website} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Visit official site <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <UserReviewsCta href={reviewHref} />
          <Link href={`/compare?add=${company.slug}`}>
            <Button>Add to Compare</Button>
          </Link>
        </div>
      </div>

      <ProfileDataFreshness
        fmcsaLastChecked={company.fmcsaLastChecked}
        lastUpdated={company.lastUpdated}
        className="mb-6"
      />

      <CompanyProfileStats company={company} />

      <CompanyProfileReviewSources company={company} googleData={company.googleData} />

      <GoogleReviewsSection
        data={company.googleData}
        companyName={company.name}
        attributableOnSiteCount={attributableOnSiteCount}
      />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left/Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
              <p>{company.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {trustSignals.map((t, i) => (
                  <Badge key={i} variant="success" className="text-xs">{t}</Badge>
                ))}
                {company.specialties.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </CardContent>
          </Card>

          {/* Licensing & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Licensing &amp; Compliance</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div className="sm:col-span-2">
                <FmcsaDotCompliance company={company} />
              </div>
              <div>
                <FmcsaSafetyMetric rating={company.fmcsaSafetyRating} />
                <div className="mt-2">
                  <Badge variant={company.fmcsaSafetyRating === 'Satisfactory' ? 'success' : 'warning'}>
                    {company.fmcsaSafetyRating}
                  </Badge>
                </div>
              </div>
              <div>
                <MetricLabel
                  label="FMCSA complaints (12 mo)"
                  tooltip="Consumer complaints filed with FMCSA in the last 12 months, compared to total household-goods shipments."
                />
                <div className="mt-1 text-sm">
                  {(company.complaintsLast12m ?? company.fmcsaComplaints).toLocaleString()} complaints on{' '}
                  {company.fmcsaShipments.toLocaleString()} shipments
                </div>
              </div>
              {company.authorityActive === false || company.outOfService ? (
                <div className="sm:col-span-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
                  {company.outOfService
                    ? 'FMCSA reports an active out-of-service order for this carrier.'
                    : 'FMCSA reports inactive or revoked operating authority.'}
                  {company.revocationDate ? ` Revocation date: ${company.revocationDate}.` : ''}
                </div>
              ) : null}
              <div className="sm:col-span-2">
                <FmcsaLastVerified checkedAt={company.fmcsaLastChecked} />
              </div>
              {showScrapeBbb && scrapeBbb ? (
                <div className="sm:col-span-2 rounded-md border border-dashed p-3">
                  <div className="text-muted-foreground text-xs mb-2">BBB — Public / scraped</div>
                  <BbbPublicDetail data={scrapeBbb} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Lower confidence than FMCSA or Google API. Confirm on the official BBB profile
                    before booking.
                  </p>
                </div>
              ) : null}
              {company.publicScrapeData &&
              !showScrapeBbb &&
              (company.publicScrapeData.trustpilot_rating != null ||
                company.publicScrapeData.yelp_rating != null) ? (
                <div className="sm:col-span-2 rounded-md border border-dashed p-3">
                  <div className="text-muted-foreground text-xs mb-2">Public web ratings (scraped)</div>
                  <PublicScrapeBadges data={company.publicScrapeData} excludeBbb />
                  <p className="text-xs text-muted-foreground mt-2">
                    Lower confidence than FMCSA or Google API. Confirm on official sites before booking.
                  </p>
                </div>
              ) : null}
              <div className="text-[11px] text-muted-foreground col-span-2">
                Always verify the most current licensing and complaint information directly on the <a href="https://www.fmcsa.dot.gov/" target="_blank" className="underline">FMCSA website</a>.
              </div>
            </CardContent>
          </Card>

          {/* Services & Specialties */}
          <Card>
            <CardHeader><CardTitle>Services &amp; Specialties</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-medium mb-1">Services Offered</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">
                    {company.services.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {company.specialties.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community reviews (user-submitted, moderated) */}
          <LegacyCompanyUserReviews
            legacyId={company.id}
            companyName={company.name}
            usdotNumber={company.usdotNumber}
            mcNumber={company.mcNumber}
          />

          <AttributedReviewsPanel
            companyId={company.id}
            companyName={company.name}
            initialReviews={reviews}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Facts</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">HQ</span><span>{company.headquarters}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Founded</span><span>{company.foundedYear}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Price Tier</span><span>{company.priceRange}</span></div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground shrink-0">On-site reviews</span>
                <span className="text-right text-xs">{reviewMeta.headline}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground shrink-0">Industry volume</span>
                <span className="text-right text-xs">
                  <EditorialReviewVolume count={company.reviewCount} showNote />
                </span>
              </div>
              <div className="pt-2 border-t text-xs text-muted-foreground">Last data refresh: {company.lastUpdated}</div>
            </CardContent>
          </Card>

          <CoverageAreaCard
            companyName={company.name}
            coverage={company.coverage}
            headquarters={company.headquarters}
            assignmentStateSlugs={assignmentStateSlugs}
          />

          <Card className="bg-muted/30">
            <CardContent className="pt-5 text-xs leading-relaxed text-muted-foreground">
              This profile is for informational purposes only. Move Trust Hub is not affiliated with {company.name}. 
              Always obtain multiple in-home or virtual estimates and verify current licensing directly with FMCSA and your state authorities.
            </CardContent>
          </Card>

          <div>
            <Link href={`/compare?add=${company.slug}`}>
              <Button className="w-full" size="lg">Add {company.name.split(' ')[0]} to Comparison</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
