import type { Metadata } from 'next';
import type { Company } from '@/types';
import { isSeoIndexableCompany } from '@/lib/provider/publication';
import { SITE_URL } from '@/lib/seo/site-metadata';

type AutoTransportSeoCompany = Pick<
  Company,
  'slug' | 'indexable' | 'publicationState'
>;

/** Keep profile canonicals on the resolved company slug and preserve publication gates. */
export function buildAutoTransportProfileSeoMetadata(
  company: AutoTransportSeoCompany
): Pick<Metadata, 'alternates' | 'robots'> {
  return {
    alternates: {
      canonical: `${SITE_URL}/auto-transport/${company.slug}`,
    },
    robots: {
      index: isSeoIndexableCompany(company),
      follow: true,
    },
  };
}
