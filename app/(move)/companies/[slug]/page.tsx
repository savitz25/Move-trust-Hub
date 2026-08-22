import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { getCompanyBySlugAsync, getReviews } from '@/lib/data-server';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCompanyDirectorySchemaGraph } from '@/lib/seo/build-company-directory-schema';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AttributedReviewsPanel } from '@/components/reviews/attributed-reviews-panel';
import { CompanyProfileStats, FmcsaSafetyMetric } from '@/components/company/company-profile-stats';
import { CompanyProfileReviewSources } from '@/components/company/company-profile-review-sources';
import { CompanyProfileIdentity } from '@/components/company/company-profile-identity';
import {
  ResearchNextSteps,
  profileResearchLinks,
} from '@/components/research/research-next-steps';
import { assessProfileQuality } from '@/lib/directory/profile-quality';
import { getCompanyAttributableReviewCount } from '@/lib/trust/review-display-policy';
import { countAttributedReviewsForCompany } from '@/lib/trust/attributed-review-count';
import { LegacyCompanyUserReviews } from '@/components/reviews/legacy-company-user-reviews';
import { UserReviewsCta } from '@/components/reviews/user-reviews-cta';
import { SaveMoverButton } from '@/components/save-my-move/save-mover-button';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';
import { CoverageAreaCard } from '@/components/map/coverage-area-card';
import { CompanyLocalCountyLinks } from '@/components/company/company-local-county-links';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { getCompanyAssignmentStateSlugs } from '@/lib/map/company-assignment-state-slugs';
import { ExternalLink } from 'lucide-react';
import { CompanyProfileBack } from '@/components/directory/company-profile-back-link';
import {
  buildCompanyProfileHref,
  isValidCompanyProfileHref,
} from '@/lib/directory/profile-back-link';
import { MetricLabel } from '@/components/trust/metric-label';
import { FmcsaLastVerified } from '@/components/fmcsa/fmcsa-last-verified';

import { directoryVerifiedLabel } from '@/lib/trust/company-display-policy';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';
import { CompanyContactCard } from '@/components/company/company-contact-card';
import { FmcsaDotCompliance } from '@/components/trust/fmcsa-dot-compliance';
import { LicenseMetadataDescription } from '@/components/trust/license-display';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { companyProfileReviewMeta } from '@/lib/trust/review-display-policy';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { BbbPublicDetail } from '@/components/verification/bbb-public-detail';
import { GoogleReviewsSection } from '@/components/verification/google-reviews-section';
import { PublicScrapeBadges } from '@/components/verification/public-scrape-badges';
import { AdminRefreshVerificationShell } from '@/components/verification/admin-refresh-verification-shell';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { VerificationBadgeLegend } from '@/components/trust/verification-badge-legend';
import { ProfileDataFreshness } from '@/components/trust/profile-data-freshness';
import { TrustProfileShell } from '@/components/network/trust-profile-shell';
import { toMoveTrustProfile } from '@/lib/network/adapters/to-move-trust-profile';
import { ClaimProfileCta } from '@/components/portal/claim-cta';
import { SeeHowWeVetLink } from '@/components/trust/see-how-we-vet-link';
import { regulatoryCopyForProvider } from '@/lib/provider/copy';
import { isSeoIndexableCompany } from '@/lib/provider/publication';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { FloridaFdacsEvidenceBlock } from '@/components/company/florida-fdacs-evidence-block';
import { PalmBeachCountyPermitBlock } from '@/components/company/palm-beach-county-permit-block';
import { MiamiDadeRegistrationBlock } from '@/components/company/miami-dade-registration-block';
import { getPublishedPalmBeachCountyPermitsForPublicProfile } from '@/lib/county-regulatory/pbc/public-read';
import { getPublishedMiamiDadeRegistrationsForPublicProfile } from '@/lib/county-regulatory/mdc/public-read';
import {
  FL_FDACS_ADDRESS_SOURCE_LABEL,
  FL_FDACS_EMAIL_SOURCE_LABEL,
  FL_FDACS_PHONE_SOURCE_LABEL,
} from '@/lib/state-hhg/fl/profile-presentation';
import {
  buildStateOnlyProfileChrome,
  buildStateOnlyStructuredData,
  loadWave1Manifest,
  shouldRenderFloridaStateWaveChrome,
} from '@/lib/state-hhg/fl/wave-1';
import {
  isVanLineNetworkCompany,
  loadCapabilityEvidenceState,
} from '@/lib/provider/capability-evidence';
import {
  formatCompanyTenureLine,
  isValidFoundedYear,
} from '@/lib/directory/normalize-company';
import { BeforeYouReachOut } from '@/components/research/before-you-reach-out';
import { SITE_URL } from '@/lib/seo/site-metadata';
import {
  isDisplayableGoogleForUi,
  resolveConfirmedPublicScrapeForCompany,
  resolveGooglePlacesForCompany,
} from '@/lib/verification/display-enrichment';
import { finalizeCompanyEnrichmentForDisplay } from '@/lib/verification/company-display-enrichment';


/** Keep aligned with directory ISR + CDN s-maxage (tag revalidation on publish). */
export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlugAsync(slug);
  if (!company || isAnonymousCompanyNotFound(company)) {
    notFound();
  }

  const waveChrome = shouldRenderFloridaStateWaveChrome({
    id: company.id,
    publicationState: company.publicationState,
  });
  if (waveChrome) {
    const member = loadWave1Manifest().members.find((m) => m.companyId === company.id);
    const chrome = buildStateOnlyProfileChrome({
      displayName: company.name,
      fdacsNumber: member?.fdacsIm ?? '',
      fdacsStatus: 'active',
      hasFederalId: Boolean(company.usdotNumber?.trim()),
    });
    return buildMovePageMetadata({
      title: chrome.title,
      description: chrome.description,
      path: `/companies/${company.slug}`,
      noIndex: true,
      contextualImage: true,
      imageAlt: `${company.name} — Florida Intrastate Mover on MoveTrustHub`,
    });
  }

  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });
  const profileQuality = assessProfileQuality(company);
  // Absolute self-canonical to clean /companies/{slug} (no query params).
  // Thin stubs: noindex,follow — still usable if someone lands with a direct URL.
  return buildMovePageMetadata({
    title: `${company.name} — FMCSA Profile, Ratings & Pricing`,
    description: `${company.name} interstate mover profile. ${reviewMeta.headline}. ${LicenseMetadataDescription(company)} BBB ${company.bbbRating}. Coverage: ${company.coverage}. Independent directory — verify FMCSA licensing yourself.`,
    path: `/companies/${company.slug}`,
    noIndex: !profileQuality.indexable || !isSeoIndexableCompany(company),
    contextualImage: true,
    imageAlt: `${company.name} — moving company research on MoveTrustHub`,
  });
}

export default async function CompanyProfilePage({ params }: Props) {
  const raw = await params;
  // Normalize dynamic segment (never treat empty / array edge cases as a valid lookup).
  const slug = decodeURIComponent(String(raw.slug ?? '').trim());
  if (!slug) notFound();

  const resolved = await getCompanyBySlugAsync(slug);

  // True unknown movers → 404. Never soft-redirect valid misses to the directory index.
  // INGESTED / other internal publication states are not anonymously reachable (FL-005).
  if (!resolved || isAnonymousCompanyNotFound(resolved)) notFound();

  // Alias slug → canonical slug only when we have a *different* non-empty profile path.
  // Historical bug: buildCompanyProfileHref('') → '/companies', which bounced every
  // soft-nav profile click back to the directory (NEXT_REDIRECT;replace;/companies;307).
  const canonical = (resolved.slug || '').trim();
  if (canonical && canonical.toLowerCase() !== slug.toLowerCase()) {
    const target = buildCompanyProfileHref(canonical);
    if (isValidCompanyProfileHref(target)) {
      redirect(target);
    }
  }

  // Stable non-empty slug for the rest of the page (prefer DB/canonical, else URL segment).
  const company = {
    ...resolved,
    slug: canonical || slug,
  };

  const reviews = await getReviews(company.id, 8);
  const assignmentStateSlugs = await getCompanyAssignmentStateSlugs(company.slug);
  const reviewMeta = companyProfileReviewMeta({
    companyId: company.id,
    editorialReviewCount: company.reviewCount,
    editorialRating: company.overallRating,
  });
  // Prefer Google snippets on the profile when present; else curated seed excerpts.
  const attributableOnSiteCount = Math.max(
    countAttributedReviewsForCompany(company),
    getCompanyAttributableReviewCount(company.id)
  );

  const reviewHref = reviewUrlForDirectoryCompany({
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    slug: company.slug,
  });

  const displayCompany = finalizeCompanyEnrichmentForDisplay(company);
  const verification = getCompanyVerificationStatus(displayCompany);
  const verifiedLabel = directoryVerifiedLabel(displayCompany);
  // Single source of truth: Places from googleData / verification_sources; BBB only when confirmed.
  const googlePlaces =
    resolveGooglePlacesForCompany(displayCompany) ?? displayCompany.googleData ?? null;
  const scrapeBbb = resolveConfirmedPublicScrapeForCompany(displayCompany);
  const showScrapeBbb = Boolean(scrapeBbb) && verification.bbb === 'verified';
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

  const tenureLine = formatCompanyTenureLine({
    headquarters: company.headquarters,
    foundedYear: company.foundedYear,
    yearsInBusiness: company.yearsInBusiness,
  });
  const evidenceState = await loadCapabilityEvidenceState(company.id);
  const displayCompanyForTrust = {
    ...company,
    capabilityEvidenceState: evidenceState,
  };
  const regulatoryCopy = regulatoryCopyForProvider(company, {
    evidenceState,
    networkKind: isVanLineNetworkCompany(company.id) ? 'van_line' : undefined,
    historicalAuthority: company.id === 'graebel',
  });
  const waveChrome = shouldRenderFloridaStateWaveChrome({
    id: company.id,
    publicationState: company.publicationState,
  });
  const waveMember = waveChrome
    ? loadWave1Manifest().members.find((m) => m.companyId === company.id)
    : undefined;
  const waveChromeCopy = waveMember
    ? buildStateOnlyProfileChrome({
        displayName: company.name,
        fdacsNumber: waveMember.fdacsIm,
        fdacsStatus: 'active',
        hasFederalId: Boolean(company.usdotNumber?.trim()),
      })
    : null;
  const jsonLd = waveChrome
    ? buildStateOnlyStructuredData({
        name: company.name,
        slug: company.slug,
        street: company.physicalAddress ?? null,
        city: null,
        state: 'FL',
        zip: null,
        phone: company.phone ?? null,
        fdacsNumber: waveMember?.fdacsIm ?? '',
        usdot: company.usdotNumber ?? null,
      }).graph
    : buildCompanyDirectorySchemaGraph(company);

  // Fail-closed: only PUBLISHED county credentials for anonymously public companies.
  // Not included in JSON-LD / OG (HOLD_FROM_STRUCTURED_DATA_V1).
  const palmBeachPermits = await getPublishedPalmBeachCountyPermitsForPublicProfile({
    companyId: company.id,
    publicationState: company.publicationState,
  });
  const miamiDadeRegistrations =
    await getPublishedMiamiDadeRegistrationsForPublicProfile({
      companyId: company.id,
      publicationState: company.publicationState,
    });

  return (
    <>
      <JsonLd data={jsonLd} />
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AdminRefreshVerificationShell companyId={company.id} />
      <Suspense fallback={
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" aria-hidden />
      }>
        <CompanyProfileBack />
      </Suspense>

      {/* Shared network Trust Profile shell (Step 5) */}
      <TrustProfileShell
        profile={toMoveTrustProfile(company)}
        variant="move"
        showContact={false}
        className="mb-6"
        actions={
          <>
            <CompanyTypeBadges company={company} size="default" className="shrink-0" />
            <CompanyVerificationBadges company={displayCompanyForTrust} size="profile" className="justify-start shrink-0" />
            {isDisplayableGoogleForUi(googlePlaces) && googlePlaces ? (
              <GoogleRatingBadge data={googlePlaces} />
            ) : null}
            <UserReviewsCta href={reviewHref} />
            <SaveMoverButton
              companySlug={company.slug}
              companyName={company.name}
              variant="button"
            />
            <Link href={`/compare?add=${company.slug}`}>
              <Button>Add to Compare</Button>
            </Link>
          </>
        }
      />

      {/* Vertical detail under shell */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {company.publicScrapeData ? (
            <div className="mb-2">
              <PublicScrapeBadges data={company.publicScrapeData} excludeBbb />
            </div>
          ) : null}
          {tenureLine ? (
            <div className="text-sm text-muted-foreground">{tenureLine}</div>
          ) : null}
          <div className="mt-3 space-y-2">
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              <strong className="text-foreground">
                {waveChromeCopy?.headline ?? regulatoryCopy.headline}
              </strong>{' '}
              — {waveChromeCopy?.detail ?? regulatoryCopy.detail}
            </p>
            {verification.directoryVerified || verification.fmcsa || verification.bbb === 'verified' ? (
              <SeeHowWeVetLink className="text-xs" />
            ) : null}
            <VerificationBadgeLegend className="mt-2" />
          </div>
        </div>
      </div>

      <ProfileDataFreshness
        fmcsaLastChecked={company.fmcsaLastChecked}
        bbbLastChecked={company.bbbLastChecked}
        lastUpdated={company.lastUpdated}
        className="mb-6"
      />

      {waveMember && waveChromeCopy ? (
        <FloridaFdacsEvidenceBlock
          authorityNumber={waveMember.fdacsIm}
          status="active"
          federalCopy={waveChromeCopy.federalCopy}
          phone={company.phone}
          email={company.email}
          address={company.physicalAddress}
        />
      ) : null}

      {palmBeachPermits.length > 0 ? (
        <PalmBeachCountyPermitBlock permits={palmBeachPermits} />
      ) : null}

      {miamiDadeRegistrations.length > 0 ? (
        <MiamiDadeRegistrationBlock registrations={miamiDadeRegistrations} />
      ) : null}

      <CompanyProfileIdentity
        company={displayCompany}
        presentation={waveChrome ? 'florida-state-wave' : 'default'}
      />

      <ClaimProfileCta
        companySlug={company.slug}
        companyName={company.name}
        variant="profile"
        className="mb-6"
      />

      <CompanyProfileStats company={company} />

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CompanyContactCard
            company={company}
            sourceNote={
              waveChrome
                ? 'Contact details below are shown as reported in Florida FDACS registration and are not independently confirmed by the company on this page.'
                : undefined
            }
            phoneSourceLabel={waveChrome ? FL_FDACS_PHONE_SOURCE_LABEL : undefined}
            emailSourceLabel={waveChrome ? FL_FDACS_EMAIL_SOURCE_LABEL : undefined}
            addressSourceLabel={waveChrome ? FL_FDACS_ADDRESS_SOURCE_LABEL : undefined}
          />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center text-sm text-muted-foreground">
          <p className="leading-relaxed">
            Reach this mover using the contact details on the left. Licensing and safety details are
            in the section below — always confirm USDOT authority on FMCSA before you book.
          </p>
        </div>
      </div>

      <CompanyProfileReviewSources
        company={company}
        googleData={googlePlaces}
        reputationScore={company.reputationScore}
        fmcsaSafetyRating={company.fmcsaSafetyRating}
      />

      <GoogleReviewsSection
        data={googlePlaces}
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
                {(company.specialties ?? []).map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {company.serviceScope === 'intrastate' ? (
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardHeader>
                <CardTitle>Local / in-state mover</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <p>
                  This company is listed as an{' '}
                  <strong className="text-foreground">intrastate (local)</strong> household-goods
                  mover. Same-state moves are governed by{' '}
                  <strong className="text-foreground">state mover authority</strong>, which is
                  separate from FMCSA interstate household-goods authority.
                </p>
                <p>
                  Default interstate directory browse stays federal/interstate-focused. Local movers
                  appear on matching county guides and when you explicitly filter for Local Mover /
                  in-state coverage. Confirm pickup availability for your exact address.
                </p>
                {!company.usdotNumber ? (
                  <p className="text-xs">
                    No federal USDOT is shown on this profile. That does not by itself mean the
                    company is unauthorized for legitimate same-state moves — verify current state
                    registration with the state regulator before booking.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ) : null}

          <CompanyLocalCountyLinks
            companyName={company.name}
            coverageCounties={company.coverageCounties}
            assignmentStateSlugs={assignmentStateSlugs}
          />

          {/* Licensing & Compliance — federal card omitted for Florida state-wave chrome */}
          {waveChrome ? null : (
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
          )}

          {/* Services & Specialties */}
          <Card>
            <CardHeader><CardTitle>Services &amp; Specialties</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-medium mb-1">Services Offered</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">
                    {(company.services ?? []).length > 0 ? (
                      (company.services ?? []).map((s) => <li key={s}>{s}</li>)
                    ) : (
                      <li>Not listed on this profile</li>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {(company.specialties ?? []).length > 0 ? (
                      (company.specialties ?? []).map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Not listed</span>
                    )}
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

          <ResearchNextSteps
            title="Next research steps for this mover"
            subtitle="Independent tools — no lead fees, no paid placements."
            links={profileResearchLinks(company.slug)}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Facts</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-3">
              {company.headquarters?.trim() ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HQ</span>
                  <span>{company.headquarters}</span>
                </div>
              ) : null}
              {isValidFoundedYear(company.foundedYear) ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span>{company.foundedYear}</span>
                </div>
              ) : null}
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
              {company.fmcsaLastChecked ? (
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Regulatory data refreshed:{' '}
                  <time dateTime={company.fmcsaLastChecked}>{company.fmcsaLastChecked}</time>
                </div>
              ) : company.lastUpdated ? (
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Profile record updated:{' '}
                  <time dateTime={company.lastUpdated}>{company.lastUpdated}</time>
                </div>
              ) : null}
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

      <div className="mt-10 max-w-3xl">
        <BeforeYouReachOut
          summaryLines={[
            company.name,
            company.usdotNumber ? `USDOT ${company.usdotNumber}` : undefined,
            company.mcNumber ? `MC ${company.mcNumber}` : undefined,
            `Profile: ${SITE_URL.replace(/\/$/, '')}/companies/${company.slug}`,
            'Verify on FMCSA SAFER before booking',
          ].filter(Boolean) as string[]}
          mailtoSubject={`${company.name} — Move Trust Hub research notes`}
        />
      </div>

      <InternalLinkHub className="mt-12" />
    </div>
    </>
  );
}
