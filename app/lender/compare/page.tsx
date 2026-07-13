import type { Metadata } from 'next';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { LenderCompareLoader } from '@/components/lender/compare/lender-compare-loader';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildTemplateSchemaGraph,
} from '@/lib/hub/templates/schemas';
import { lenders } from '@/lib/lender/mockData';

const COMPARE_DESCRIPTION =
  'Select up to 3 NMLS-verified mortgage lenders and compare trust scores, ratings, loan types, and closing metrics.';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Compare Lenders Side-by-Side | Lender Trust Hub',
  description: COMPARE_DESCRIPTION,
  alternates: { canonical: 'https://www.movetrusthub.com/lender/compare' },
};

export default function LenderComparePage() {
  const comparePool = lenders.slice(0, 10);
  const pageUrl = hubCanonicalUrl('lender', '/compare');
  const itemListNode = buildItemListSchema(
    pageUrl,
    comparePool.map((lender) => ({
      name: lender.name,
      url: hubCanonicalUrl('lender', `/lenders/${lender.slug}`),
    })),
    'Featured lenders to compare'
  );
  const schema = buildTemplateSchemaGraph({
    hub: 'lender',
    path: '/compare',
    breadcrumbs: hubSectionBreadcrumbs('lender', 'Compare'),
    nodes: [
      buildCollectionPageSchema(
        'lender',
        '/compare',
        'Compare Lenders Side-by-Side',
        COMPARE_DESCRIPTION
      ),
      ...(itemListNode ? [itemListNode] : []),
    ],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <SchemaInjector data={schema} />
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#0A2540] md:text-4xl">
          Compare Lenders Side-by-Side
        </h1>
        <p className="mt-3 text-zinc-600">
          Select up to 3 lenders to compare trust scores, ratings, and loan types.
        </p>
      </div>

      <LenderCompareLoader lenders={comparePool} />
    </div>
  );
}