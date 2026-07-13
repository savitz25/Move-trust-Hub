import { JsonLd } from '@/lib/seo/json-ld';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { trustHubLogoUrl } from '@/lib/hub/config';
import { getSiteNameForHub } from '@/lib/seo/site-metadata';

const SITE_URL = 'https://www.movetrusthub.com';

export function ArticleSchema({
  title,
  description,
  path,
  hub = 'move',
  datePublished = '2026-06-01',
}: {
  title: string;
  description: string;
  path: string;
  hub?: HubId;
  datePublished?: string;
}) {
  const url = path.startsWith('http') ? path : `${SITE_URL}${path}`;
  const siteName = getSiteNameForHub(hub);
  const homeUrl = hub === 'move' ? SITE_URL : hubCanonicalUrl(hub, '/');
  const resourcesUrl = hubCanonicalUrl(hub, '/resources');

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: resourcesUrl },
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
              name: siteName,
              url: homeUrl,
            },
            publisher: {
              '@type': 'Organization',
              name: siteName,
              logo: {
                '@type': 'ImageObject',
                url: trustHubLogoUrl(SITE_URL),
              },
            },
            mainEntityOfPage: url,
          },
        ],
      }}
    />
  );
}