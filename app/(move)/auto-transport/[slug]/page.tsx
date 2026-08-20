import { notFound } from 'next/navigation';
import { getAutoTransportBySlugAsync } from '@/lib/data-server';
import { directoryVerifiedLabel } from '@/lib/trust/company-display-policy';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { VerificationBadgeLegend } from '@/components/trust/verification-badge-legend';
import { FmcsaDotCompliance } from '@/components/trust/fmcsa-dot-compliance';
import { LicenseMetadataDescription } from '@/components/trust/license-display';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { ReviewTransparencyNote } from '@/components/trust/review-transparency-note';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { CompanyProfileStats, FmcsaSafetyMetric } from '@/components/company/company-profile-stats';
import { CompanyProfileReviewSources } from '@/components/company/company-profile-review-sources';
import { CompanyContactCard } from '@/components/company/company-contact-card';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { GoogleReviewsSection } from '@/components/verification/google-reviews-section';
import { BbbPublicDetail } from '@/components/verification/bbb-public-detail';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { formatCompanyTenureLine } from '@/lib/directory/normalize-company';
import { regulatoryCopyForProvider } from '@/lib/provider/copy';
import { isSeoIndexableCompany } from '@/lib/provider/publication';


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const company = await getAutoTransportBySlugAsync(slug);
  if (!company) return { title: 'Company Not Found' };

  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });

  const indexable = isSeoIndexableCompany(company);
  return {
    title: `${company.name} — Reviews, Pricing & Auto Transport Info`,
    description: `${company.name} auto transport profile. ${reviewMeta.headline}. ${LicenseMetadataDescription(company)} BBB ${company.bbbRating}. Coverage: ${company.coverage}. Open & enclosed vehicle shipping.`,
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default async function AutoTransportProfilePage({ params }: Props) {
  const { slug } = await params;
  const company = await getAutoTransportBySlugAsync(slug);

  if (!company) notFound();

  const verification = getCompanyVerificationStatus(company);
  const verifiedLabel = directoryVerifiedLabel(company);
  const scrapeBbb = company.publicScrapeData;
  const showScrapeBbb =
    verification.bbb === 'verified' || hasBbbPublicScrapeData(scrapeBbb);
  const bbbTrustSignal =
    showScrapeBbb && scrapeBbb?.bbb_rating
      ? `BBB ${scrapeBbb.bbb_rating}${scrapeBbb.bbb_accredited ? ' Accredited' : ''} (public)`
      : company.bbbRating && company.bbbRating !== 'NR'
        ? `BBB ${company.bbbRating}${company.bbbAccredited ? ' Accredited' : ''}`
        : null;

  const trustSignals = [
    company.fmcsaSafetyRating === 'Satisfactory' && verifiedLabel && 'FMCSA Satisfactory',
    bbbTrustSignal,
    verifiedLabel,
  ].filter(Boolean);

  const tenureLine = formatCompanyTenureLine({
    headquarters: company.headquarters,
    foundedYear: company.foundedYear,
    yearsInBusiness: company.yearsInBusiness,
  });
  const regulatoryCopy = regulatoryCopyForProvider(company);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/auto-transport" className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Auto Transport Directory
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">{company.name}</h1>
            <CompanyTypeBadges company={company} size="default" className="shrink-0" />
            <CompanyVerificationBadges company={company} size="profile" className="justify-start shrink-0" />
            {company.googleData?.status === 'ok' ? (
              <GoogleRatingBadge data={company.googleData} />
            ) : null}
          </div>
          {tenureLine ? (
            <div className="text-muted-foreground">{tenureLine}</div>
          ) : null}
          <VerificationBadgeLegend className="mt-4" />
        </div>
        <div className="flex items-center gap-3">
          <a href={company.website} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Visit official site <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link href={`/compare?add=${company.slug}`}>
            <Button>Add to Compare</Button>
          </Link>
        </div>
      </div>

      <CompanyProfileStats company={company} variant="auto-transport" />
      <CompanyProfileReviewSources company={company} googleData={company.googleData} />
      <GoogleReviewsSection data={company.googleData} companyName={company.name} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-2">{regulatoryCopy.headline}</p>
              <p className="text-sm text-muted-foreground mb-4">{regulatoryCopy.detail}</p>
              <p className="text-muted-foreground">{company.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-xs text-muted-foreground mb-1">SERVICES OFFERED</div>
                  <div className="flex flex-wrap gap-1.5">
                    {company.services.map((s, i) => (
                      <Badge key={i} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-xs text-muted-foreground mb-1">SPECIALTIES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {company.specialties.map((s, i) => (
                      <Badge key={i} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Licensing &amp; Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <FmcsaDotCompliance company={company} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FmcsaSafetyMetric rating={company.fmcsaSafetyRating} />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">BBB Rating</div>
                  <div className="font-medium mt-0.5">
                    {scrapeBbb?.bbb_rating || company.bbbRating}{' '}
                    {(scrapeBbb?.bbb_accredited ?? company.bbbAccredited) ? '(Accredited)' : ''}
                  </div>
                </div>
              </div>
              {showScrapeBbb && scrapeBbb ? (
                <div className="rounded-md border border-dashed p-3">
                  <div className="text-muted-foreground text-xs mb-2">BBB — Public / scraped</div>
                  <BbbPublicDetail data={scrapeBbb} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Third-party reference — confirm on the official BBB profile before booking.
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CompanyContactCard company={company} />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener"
                className="block w-full"
              >
                <Button className="w-full" variant="default">
                  Visit Company Website <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <Link href={`/compare?add=${company.slug}`} className="block w-full">
                <Button variant="outline" className="w-full">
                  Add to Compare
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trust Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {trustSignals.length > 0 ? trustSignals.map((signal, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    {signal}
                  </li>
                )) : (
                  <li className="text-muted-foreground">Standard licensing applies. Always verify directly.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Teaser */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewTransparencyNote compact className="mb-4" />
            <p className="text-sm text-muted-foreground">
              {company.overallRating}★ editorial rating based on industry-reported third-party feedback — not
              verified on Move Trust Hub. Research reviews on Google, BBB, and Trustpilot before booking.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Industry-reported volume: <EditorialReviewVolume count={company.reviewCount} />. Last updated{' '}
              {company.lastUpdated}.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/auto-transport" className="text-sm text-primary hover:underline">
          ← Back to full Auto Transport Directory
        </Link>
      </div>
    </div>
  );
}
