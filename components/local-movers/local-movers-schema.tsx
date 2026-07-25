import { JsonLd } from '@/lib/seo/json-ld';
import { buildCountySchemaGraph } from '@/lib/local-movers/build-county-schema-graph';
import type { CountyFaqItem } from '@/lib/local-movers/county-seo';
import { sanitizeSchemaValue } from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * County / local-movers JSON-LD.
 * Never accepts testimonials — Review schema is forbidden on these pages
 * (GSC: itemReviewed AdministrativeArea critical error from editorial blocks).
 */
export function LocalMoversSchema({
  title,
  description,
  path,
  breadcrumbs,
  movers,
  county,
  stateName,
  faqItems,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
  faqItems?: CountyFaqItem[];
}) {
  const graph = buildCountySchemaGraph({
    title,
    description,
    path,
    breadcrumbs,
    movers,
    county,
    stateName,
    faqItems,
  });

  return (
    <JsonLd
      data={sanitizeSchemaValue({
        '@context': 'https://schema.org',
        '@graph': graph,
      })}
    />
  );
}
