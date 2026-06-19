import { JsonLd } from '@/lib/seo/json-ld';

const SITE_URL = 'https://www.movetrusthub.com';

export function ArticleSchema({
  title,
  description,
  path,
  datePublished = '2026-06-01',
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  const url = `${SITE_URL}${path}`;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE_URL}/resources` },
              { '@type': 'ListItem', position: 3, name: title, item: url },
            ],
          },
          {
            '@type': 'Article',
            headline: title,
            description,
            url,
            datePublished,
            dateModified: new Date().toISOString().split('T')[0],
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
            mainEntityOfPage: url,
          },
        ],
      }}
    />
  );
}