import { organizationSchema } from '@/lib/seo/schemas';
import { RESOURCES_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { RouteGuide } from '@/lib/resources/routes';

export function buildBasicRouteGuideSchemaGraph(route: RouteGuide, path: string) {
  const canonical = `${SITE_URL}${path}`;
  const title = `${route.title} — Interstate Moving Route Guide`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: `${SITE_URL}/resources`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Route Guides',
            item: `${SITE_URL}/resources/routes`,
          },
          { '@type': 'ListItem', position: 4, name: route.title, item: canonical },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: title,
        description: route.description,
        url: canonical,
        datePublished: '2026-06-01',
        dateModified: RESOURCES_CONTENT_UPDATED.toISOString().split('T')[0],
        author: {
          '@type': 'Organization',
          name: 'Move Trust Hub',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Move Trust Hub',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: canonical,
      },
    ],
  };
}