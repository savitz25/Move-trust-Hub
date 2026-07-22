import type { Metadata } from 'next';
import Link from 'next/link';
import { DirectoryLoader } from '@/components/directory/directory-loader';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { VerificationTransparency } from '@/components/trust/verification-transparency';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { directoryFiltersFromSearchParams } from '@/lib/directory/build-directory-api-query';
import { DIRECTORY_PAGE_SIZE } from '@/lib/directory/page-size';
import { queryDirectoryPage } from '@/lib/directory/query-directory-page';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { buildCompaniesDirectorySchemaGraph } from '@/lib/seo/build-directory-list-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
/**
 * ISR TTL for directory HTML — keep aligned with middleware, vercel.json,
 * and `unstable_cache` revalidate in companies / unified-directory queries.
 * Tag revalidation on publish still busts cache immediately.
 */
export const revalidate = 300;

const COMPANIES_TITLE = 'Compare FMCSA-Licensed Interstate Movers | Independent Directory';
const COMPANIES_DESCRIPTION =
  'Search FMCSA-licensed interstate movers with active operating authority. Sort by reputation, attributable reviews, price, complaints, or years in business. Independent directory — no lead fees.';

export const metadata: Metadata = buildMovePageMetadata({
  title: COMPANIES_TITLE,
  description: COMPANIES_DESCRIPTION,
  path: '/companies',
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompaniesDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = directoryFiltersFromSearchParams(params);

  const [allCompanies, firstPage] = await Promise.all([
    // Full list for JSON-LD only (top N + total count).
    getUnifiedDirectoryCompanies(),
    queryDirectoryPage({
      offset: 0,
      limit: DIRECTORY_PAGE_SIZE,
      filters,
    }),
  ]);

  const directorySchema = buildCompaniesDirectorySchemaGraph(allCompanies);

  return (
    <>
      <JsonLd data={directorySchema} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">
            COMPREHENSIVE DIRECTORY
          </div>
          <h1 className="text-4xl font-semibold tracking-tighter mt-1">
            Compare FMCSA-Licensed Interstate Movers
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Your shortlist starts here. Search interstate movers licensed by the U.S. Department of
            Transportation (FMCSA) for state-to-state moves — filter by Local Mover, coverage
            (national / state / county), services, price, and
            reputation. Every profile includes{' '}
            <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
              FMCSA licensing
            </Link>{' '}
            context and attributed customer reviews. This is a curated directory —{' '}
            <Link
              href="/about/how-we-score-movers#how-we-vet"
              className="text-primary underline underline-offset-2"
            >
              see how we vet our movers
            </Link>
            .
          </p>
        </div>

        <TrustToolsBar className="mb-8" />

        <HowWeScorePanel className="mb-8" collapsible />

        <DirectoryLoader
          initialCompanies={firstPage.companies}
          initialTotal={firstPage.total}
          pageSize={DIRECTORY_PAGE_SIZE}
        />

        <VerificationTransparency className="mt-10" />

        <ReviewHighlights
          className="py-16 mt-8 border-t"
          compact
          title="Featured Review Highlights"
          subtitle="Named Google review excerpts with reviewer attribution — not inflated industry totals."
        />

        <InternalLinkHub className="mt-12" />
      </div>
    </>
  );
}
