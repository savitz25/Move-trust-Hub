import type { Metadata } from 'next';
import { JsonLd } from '@/components/lender/directory/JsonLd';
import { Breadcrumbs } from '@/components/lender/directory/Breadcrumbs';
import { NationalHubShell } from '@/components/lender/directory/NationalHubShell';
import { HubCTAStrip } from '@/components/lender/directory/HubCTAStrip';
import { LeadCaptureForm } from '@/components/lender/directory/LeadCaptureForm';
import { LocalLendersHubClient } from '@/components/lender/local-lenders-hub-client';
import { PersonalizedLenderBannerBoundary } from '@/components/lender/PersonalizedLenderBannerBoundary';
import { LenderDirectoryLoader } from '@/components/lender/directory/LenderDirectoryLoader';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { MORTGAGE_CATEGORY } from '@/lib/lender/directory/categories';
import { lenders as rawCatalog, TRUST_STATS, type LoanType } from '@/lib/lender/mockData';
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
import type { LenderSortOption } from '@/lib/lender/directory/filter-lenders';
import { catalogDistinctEntities } from '@/lib/lender/verification';

export const revalidate = 86400;

/** National directory: one row per NMLS entity (no geo-variant inflation). */
const lenders = catalogDistinctEntities(rawCatalog);

const slugsWithLenders = getStateSlugsWithLenders();
const slugSet = new Set(slugsWithLenders);
const stateGrid = US_STATES.filter((s) => slugSet.has(s.slug)).map((s) => ({
  slug: s.slug,
  fullName: s.fullName,
  code: s.code,
  count: getStateMortgageStats(s.slug).total,
  region: s.region,
}));

export const metadata: Metadata = buildHubMetadata('lender', {
  title: buildMortgageHubTitle(),
  description: buildMortgageHubDescription(TRUST_STATS.distinctEntities),
  path: '/local-lenders',
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? '';
  return v ?? '';
}

export default async function LocalLendersHubPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const jsonLd = buildMortgageHubJsonLd(lenders.length, stateGrid.length);

  const initialSearch =
    firstParam(params.q) || firstParam(params.search) || firstParam(params.zip);
  const loanTypeRaw = firstParam(params.loanType) as LoanType | '';
  const sortRaw = (firstParam(params.sort) || 'trust') as LenderSortOption;
  const minRating = Number(firstParam(params.minRating)) || 0;

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

        {/* Primary directory grid — same progressive UX as /companies */}
        <section
          id="lender-directory"
          className="border-b border-zinc-200 bg-white py-10"
          aria-labelledby="lender-directory-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
                Comprehensive Directory
              </div>
              <h2
                id="lender-directory-heading"
                className="mt-1 text-3xl font-semibold tracking-tight text-[#0A2540] md:text-4xl"
              >
                Compare Verified Mortgage Lenders
              </h2>
              <p className="mt-2 max-w-2xl text-zinc-600">
                Research directory of mortgage lenders and brokers (distinct NMLS entities). Sorted by
                trust score with county experience, loan types, and verification badges. Hard NMLS ID
                verified requires a numeric ID — independent directory, no lead fees for ranking.
              </p>
            </div>

            <LenderDirectoryLoader
              lenders={lenders}
              profileReturnPath="/lender/local-lenders"
              initialSearch={initialSearch}
              initialSort={sortRaw}
              initialLoanType={loanTypeRaw}
              initialMinRating={minRating}
              showSearch
            />
          </div>
        </section>

        <div id="browse-by-state">
          <NationalHubShell
            categoryLabel={MORTGAGE_CATEGORY.label}
            statePathPrefix={MORTGAGE_CATEGORY.hubPath}
            title="Mortgage Lenders by State"
            description={`Browse county-level listings across ${stateGrid.length} states. Pair with our FDIC bank directory for deposit safety.`}
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
