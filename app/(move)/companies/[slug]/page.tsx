import { notFound, redirect } from 'next/navigation';
import { getCompanyBySlugAsync, getReviews } from '@/lib/data-server';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ReviewsSection } from '@/components/reviews/reviews-section';
import { LegacyCompanyUserReviews } from '@/components/reviews/legacy-company-user-reviews';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { slugFromCarrier } from '@/lib/reviews/schema';
import { CoverageMap } from '@/components/map/coverage-map';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { FmcsaVerificationBadge } from '@/components/fmcsa/fmcsa-verification-badge';
import { FmcsaLastVerified } from '@/components/fmcsa/fmcsa-last-verified';
import { BbbVerificationBadge } from '@/components/bbb/bbb-verification-badge';
import { BbbLastVerified } from '@/components/bbb/bbb-last-verified';
import {
  canShowVerifiedBadge,
  directoryVerifiedLabel,
} from '@/lib/trust/company-display-policy';
import {
  LicenseDisplay,
  LicenseMetadataDescription,
} from '@/components/trust/license-display';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { ReviewTransparencyNote } from '@/components/trust/review-transparency-note';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { GooglePlacesPanel } from '@/components/verification/google-places-panel';
import { PublicScrapeBadges } from '@/components/verification/public-scrape-badges';
import { AdminRefreshVerificationShell } from '@/components/verification/admin-refresh-verification-shell';

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
    title: `${company.name} — Reviews, Pricing & FMCSA Info`,
    description: `${company.name} interstate mover profile. ${reviewMeta.headline}. ${LicenseMetadataDescription(company)} BBB ${company.bbbRating}. Coverage: ${company.coverage}.`,
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
  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });
  const complaintRatio = (company.fmcsaComplaints / Math.max(company.fmcsaShipments, 1) * 1000).toFixed(2);

  const dot = company.usdotNumber?.replace(/\D/g, '');
  const mc = company.mcNumber?.replace(/\D/g, '');
  const reviewHref = `/review?carrier=${encodeURIComponent(
    dot ? `DOT ${dot}` : mc ? `MC-${mc}` : company.name
  )}&slug=${dot ? slugFromCarrier('DOT', dot) : mc ? slugFromCarrier('MC', mc) : company.slug}`;

  const verifiedLabel = directoryVerifiedLabel(company);
  const trustSignals = [
    company.fmcsaSafetyRating === 'Satisfactory' && verifiedLabel && 'FMCSA Satisfactory',
    company.bbbAccredited && `BBB ${company.bbbRating} Accredited`,
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
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{company.name}</h1>
            {canShowVerifiedBadge(company) && <Badge variant="success">VERIFIED</Badge>}
            {canShowVerifiedBadge(company) && <FmcsaVerificationBadge company={company} />}
            <BbbVerificationBadge company={company} />
            {company.googleData?.status === 'ok' ? (
              <GoogleRatingBadge data={company.googleData} />
            ) : null}
          </div>
          {company.publicScrapeData ? (
            <div className="mt-2">
              <PublicScrapeBadges data={company.publicScrapeData} />
            </div>
          ) : null}
          <div className="text-muted-foreground">{company.headquarters} • Founded {company.foundedYear} • {company.yearsInBusiness} years in business</div>
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

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">OVERALL RATING</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <StarRating rating={company.overallRating} size="lg" />
            <span className="text-xs text-muted-foreground" title="Industry-reported volume from third-party platforms">
              (<EditorialReviewVolume count={company.reviewCount} />)
            </span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">REPUTATION SCORE</div>
          <div className="text-4xl font-semibold mt-0.5 tabular-nums text-primary">{company.reputationScore}<span className="text-xl font-normal text-muted-foreground">/100</span></div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">AVG. PRICE (3BR CROSS-COUNTRY)</div>
          <div className="text-3xl font-semibold mt-0.5 tabular-nums">${company.avgPricePerMove.toLocaleString()}</div>
          <div className="text-xs">{company.priceRange}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">FMCSA COMPLAINT RATIO</div>
          <div className="text-3xl font-semibold mt-0.5 tabular-nums">{complaintRatio}</div>
          <div className="text-xs">per 1,000 shipments</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">COVERAGE</div>
          <div className="font-semibold mt-1">{company.coverage}</div>
          <div className="text-xs mt-1 text-emerald-600 flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> {company.services.join(' • ')}</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
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
                <LicenseDisplay company={company} />
              </div>
              <div>
                <div className="text-muted-foreground text-xs">FMCSA Safety Rating</div>
                <div>
                  <Badge variant={company.fmcsaSafetyRating === 'Satisfactory' ? 'success' : 'warning'}>
                    {company.fmcsaSafetyRating}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">FMCSA complaints (12 mo)</div>
                <div>
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
              {company.googleData?.status === 'ok' ? (
                <GooglePlacesPanel data={company.googleData} />
              ) : null}
              {company.publicScrapeData ? (
                <div className="sm:col-span-2 rounded-md border border-dashed p-3">
                  <div className="text-muted-foreground text-xs mb-2">Public web ratings (scraped)</div>
                  <PublicScrapeBadges data={company.publicScrapeData} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Lower confidence than FMCSA or Google API. Confirm on official sites before booking.
                  </p>
                </div>
              ) : null}
              <div>
                <div className="text-muted-foreground text-xs">BBB Rating</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <BbbVerificationBadge company={company} showRating={false} />
                  <span className="font-semibold">{company.bbbRating}</span>
                </div>
                <BbbLastVerified checkedAt={company.bbbLastChecked} className="mt-1" />
              </div>
              {(company.complaintsLast36m ?? 0) > 0 ? (
                <div>
                  <div className="text-muted-foreground text-xs">BBB complaints (36 mo)</div>
                  <div>{company.complaintsLast36m?.toLocaleString()}</div>
                </div>
              ) : null}
              {(company.bbbCustomerReviews ?? 0) > 0 ? (
                <div>
                  <div className="text-muted-foreground text-xs">BBB customer reviews</div>
                  <div>{company.bbbCustomerReviews?.toLocaleString()}</div>
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

          <ReviewTransparencyNote className="mb-4" />

          {/* Attributed Google reviews (on-site only) */}
          <ReviewsSection companyId={company.id} companyName={company.name} initialReviews={reviews} />
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

          <CoverageMap companyName={company.name} coverage={company.coverage} />

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
