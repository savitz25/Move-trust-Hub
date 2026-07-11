import type { Metadata } from 'next';
import { JsonLd } from '@/components/lender/directory/JsonLd';
import { Breadcrumbs } from '@/components/lender/directory/Breadcrumbs';
import { NationalHubShell } from '@/components/lender/directory/NationalHubShell';
import { HubCTAStrip } from '@/components/lender/directory/HubCTAStrip';
import { LeadCaptureForm } from '@/components/lender/directory/LeadCaptureForm';
import { LocalLendersHubClient } from '@/components/lender/local-lenders-hub-client';
import { PersonalizedLenderBannerBoundary } from '@/components/lender/PersonalizedLenderBannerBoundary';
import { SITE_URL, MORTGAGE_CATEGORY } from '@/lib/lender/directory/categories';
import { lenders } from '@/lib/lender/mockData';
import { US_STATES } from '@/lib/lender/fdic/states';
import {
  getStateSlugsWithLenders,
  getStateMortgageStats,
} from '@/lib/lender/mortgage/stateLenders';
import {
  buildMortgageHubDescription,
  buildMortgageHubJsonLd,
  buildMortgageHubTitle,
} from '@/lib/lender/mortgage/seo';

export const revalidate = 86400;

const slugsWithLenders = getStateSlugsWithLenders();
const slugSet = new Set(slugsWithLenders);
const stateGrid = US_STATES.filter((s) => slugSet.has(s.slug)).map((s) => ({
  slug: s.slug,
  fullName: s.fullName,
  code: s.code,
  count: getStateMortgageStats(s.slug).total,
  region: s.region,
}));

export const metadata: Metadata = {
  title: buildMortgageHubTitle(),
  description: buildMortgageHubDescription(lenders.length),
  keywords: [
    'mortgage lenders by state',
    'NMLS verified mortgage brokers',
    'local mortgage lenders',
    'best mortgage lenders 2026',
  ],
  openGraph: {
    title: buildMortgageHubTitle(),
    description: buildMortgageHubDescription(lenders.length),
    url: `${SITE_URL}${MORTGAGE_CATEGORY.hubPath}`,
    locale: 'en_US',
  },
  alternates: {
    canonical: `${SITE_URL}${MORTGAGE_CATEGORY.hubPath}`,
  },
};

export default function LocalLendersHubPage() {
  const jsonLd = buildMortgageHubJsonLd(lenders.length, stateGrid.length);

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/lender' }, { label: 'Mortgage Lenders' }]} />
      </div>

      <LocalLendersHubClient lenders={lenders}>
        <PersonalizedLenderBannerBoundary
          variant="default"
          experimentKey="personalized-banner-v1"
        />

        <div id="lender-directory">
          <NationalHubShell
            categoryLabel={MORTGAGE_CATEGORY.label}
            statePathPrefix={MORTGAGE_CATEGORY.hubPath}
            title="Mortgage Lenders by State"
            description={`${lenders.length}+ NMLS-verified lenders and brokers. Select your state for county-level listings, trust scores, and cross-links to FDIC bank data.`}
            stateGrid={stateGrid}
            activeVertical="mortgage"
            availableSlugs={slugsWithLenders}
          />
        </div>

        <section className="border-t border-zinc-200 bg-zinc-50 py-12">
          <div className="container mx-auto max-w-2xl px-4">
            <LeadCaptureForm stateName="your state" categoryId="mortgage" variant="hero-compact" />
          </div>
        </section>

        <HubCTAStrip />
      </LocalLendersHubClient>
    </>
  );
}