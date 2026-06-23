import { JsonLd } from '@/lib/seo/json-ld';
import { buildCountySchemaGraph } from '@/lib/local-movers/build-county-schema-graph';
import type { CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';
import { sanitizeSchemaValue } from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function LocalMoversSchema({
  title,
  description,
  path,
  breadcrumbs,
  movers,
  county,
  stateName,
  faqItems,
  testimonials,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
  faqItems?: CountyFaqItem[];
  testimonials?: CountyTestimonial[];
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
    testimonials,
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