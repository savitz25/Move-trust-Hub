import { organizationSchema } from '@/lib/seo/schemas';
import { SITE_URL } from '@/lib/seo/site-metadata';
import {
  DESTINATIONS_INDEX_DESCRIPTION,
  DESTINATIONS_INDEX_TITLE,
} from '@/lib/seo/destination-seo';
import {
  getClusterMarkets,
  getMarketPath,
  priorityMarketsForNav,
} from '@/lib/destinations/markets';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';

type HubListItem = {
  name: string;
  url: string;
  description?: string;
};

function buildPublishedHubListItems(): HubListItem[] {
  const published = new Set(getPublishedCityHubSlugs());

  return priorityMarketsForNav
    .filter((market) => published.has(market.slug))
    .map((market) => ({
      name: `${market.displayName}, ${market.stateCode}`,
      url: `${SITE_URL}${getMarketPath(market)}`,
      description: market.inboundGrowthStat,
    }));
}

/** JSON-LD for /moving-to destinations index */
export function buildDestinationsIndexSchemaGraph() {
  const canonical = `${SITE_URL}/moving-to`;
  const hubItems = buildPublishedHubListItems();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: canonical,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: DESTINATIONS_INDEX_TITLE,
        description: DESTINATIONS_INDEX_DESCRIPTION,
        url: canonical,
        inLanguage: 'en-US',
        mainEntity: { '@id': `${canonical}#hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#hub-list`,
        name: 'Popular Moving Destination Guides',
        numberOfItems: hubItems.length,
        itemListElement: hubItems.map((hub, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: hub.name,
          url: hub.url,
          ...(hub.description ? { description: hub.description } : {}),
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/idaho cluster parent */
export function buildIdahoClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const idahoHubs = getClusterMarkets('idaho').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Idaho', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Idaho',
          addressRegion: 'ID',
        },
        mainEntity: { '@id': `${canonical}#idaho-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#idaho-hub-list`,
        name: 'Idaho City Moving Guides',
        numberOfItems: idahoHubs.length,
        itemListElement: idahoHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, ID`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/oregon cluster parent */
export function buildOregonClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const oregonHubs = getClusterMarkets('oregon').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Oregon', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Oregon',
          addressRegion: 'OR',
        },
        mainEntity: { '@id': `${canonical}#oregon-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#oregon-hub-list`,
        name: 'Oregon City Moving Guides',
        numberOfItems: oregonHubs.length,
        itemListElement: oregonHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, OR`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/oklahoma cluster parent */
export function buildOklahomaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const oklahomaHubs = getClusterMarkets('oklahoma').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Oklahoma', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Oklahoma',
          addressRegion: 'OK',
        },
        mainEntity: { '@id': `${canonical}#oklahoma-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#oklahoma-hub-list`,
        name: 'Oklahoma City Moving Guides',
        numberOfItems: oklahomaHubs.length,
        itemListElement: oklahomaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, OK`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/arizona cluster parent */
export function buildArizonaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const arizonaHubs = getClusterMarkets('arizona').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Arizona', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Arizona',
          addressRegion: 'AZ',
        },
        mainEntity: { '@id': `${canonical}#arizona-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#arizona-hub-list`,
        name: 'Arizona City Moving Guides',
        numberOfItems: arizonaHubs.length,
        itemListElement: arizonaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, AZ`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/alabama cluster parent */
export function buildAlabamaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const alabamaHubs = getClusterMarkets('alabama').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Alabama', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Alabama',
          addressRegion: 'AL',
        },
        mainEntity: { '@id': `${canonical}#alabama-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#alabama-hub-list`,
        name: 'Alabama City Moving Guides',
        numberOfItems: alabamaHubs.length,
        itemListElement: alabamaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, AL`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/new-york cluster parent */
export function buildNewYorkClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const newYorkHubs = getClusterMarkets('new-york').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'New York', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'New York',
          addressRegion: 'NY',
        },
        mainEntity: { '@id': `${canonical}#new-york-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#new-york-hub-list`,
        name: 'New York City Moving Guides',
        numberOfItems: newYorkHubs.length,
        itemListElement: newYorkHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, NY`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/new-jersey cluster parent */
export function buildNewJerseyClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const newJerseyHubs = getClusterMarkets('new-jersey').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'New Jersey', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'New Jersey',
          addressRegion: 'NJ',
        },
        mainEntity: { '@id': `${canonical}#new-jersey-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#new-jersey-hub-list`,
        name: 'New Jersey City Moving Guides',
        numberOfItems: newJerseyHubs.length,
        itemListElement: newJerseyHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, NJ`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/pennsylvania cluster parent */
export function buildPennsylvaniaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const pennsylvaniaHubs = getClusterMarkets('pennsylvania').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Pennsylvania', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Pennsylvania',
          addressRegion: 'PA',
        },
        mainEntity: { '@id': `${canonical}#pennsylvania-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#pennsylvania-hub-list`,
        name: 'Pennsylvania City Moving Guides',
        numberOfItems: pennsylvaniaHubs.length,
        itemListElement: pennsylvaniaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, PA`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/west-virginia cluster parent */
export function buildWestVirginiaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const westVirginiaHubs = getClusterMarkets('west-virginia').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'West Virginia', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'West Virginia',
          addressRegion: 'WV',
        },
        mainEntity: { '@id': `${canonical}#west-virginia-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#west-virginia-hub-list`,
        name: 'West Virginia City Moving Guides',
        numberOfItems: westVirginiaHubs.length,
        itemListElement: westVirginiaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, WV`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/virginia cluster parent */
export function buildVirginiaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const virginiaHubs = getClusterMarkets('virginia').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Virginia', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Virginia',
          addressRegion: 'VA',
        },
        mainEntity: { '@id': `${canonical}#virginia-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#virginia-hub-list`,
        name: 'Virginia City Moving Guides',
        numberOfItems: virginiaHubs.length,
        itemListElement: virginiaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, VA`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/california cluster parent */
export function buildCaliforniaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const californiaHubs = getClusterMarkets('california').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'California', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'California',
          addressRegion: 'CA',
        },
        mainEntity: { '@id': `${canonical}#california-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#california-hub-list`,
        name: 'California City Moving Guides',
        numberOfItems: californiaHubs.length,
        itemListElement: californiaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, CA`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/arkansas cluster parent */
export function buildArkansasClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const arkansasHubs = getClusterMarkets('arkansas').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Arkansas', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Arkansas',
          addressRegion: 'AR',
        },
        mainEntity: { '@id': `${canonical}#arkansas-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#arkansas-hub-list`,
        name: 'Arkansas City Moving Guides',
        numberOfItems: arkansasHubs.length,
        itemListElement: arkansasHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, AR`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/florida cluster parent */
export function buildFloridaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const floridaHubs = getClusterMarkets('florida').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Florida', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Florida',
          addressRegion: 'FL',
        },
        mainEntity: { '@id': `${canonical}#florida-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#florida-hub-list`,
        name: 'Florida City Moving Guides',
        numberOfItems: floridaHubs.length,
        itemListElement: floridaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, FL`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/tennessee cluster parent */
export function buildTennesseeClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const tennesseeHubs = getClusterMarkets('tennessee').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Tennessee', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Tennessee',
          addressRegion: 'TN',
        },
        mainEntity: { '@id': `${canonical}#tennessee-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#tennessee-hub-list`,
        name: 'Tennessee City Moving Guides',
        numberOfItems: tennesseeHubs.length,
        itemListElement: tennesseeHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, TN`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/south-carolina cluster parent */
export function buildSouthCarolinaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const southCarolinaHubs = getClusterMarkets('south-carolina').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'South Carolina', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'South Carolina',
          addressRegion: 'SC',
        },
        mainEntity: { '@id': `${canonical}#south-carolina-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#south-carolina-hub-list`,
        name: 'South Carolina City Moving Guides',
        numberOfItems: southCarolinaHubs.length,
        itemListElement: southCarolinaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, SC`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/north-carolina cluster parent */
export function buildNorthCarolinaClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const northCarolinaHubs = getClusterMarkets('north-carolina').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'North Carolina', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'North Carolina',
          addressRegion: 'NC',
        },
        mainEntity: { '@id': `${canonical}#north-carolina-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#north-carolina-hub-list`,
        name: 'North Carolina City Moving Guides',
        numberOfItems: northCarolinaHubs.length,
        itemListElement: northCarolinaHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, NC`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}

/** JSON-LD for /moving-to/texas cluster parent */
export function buildTexasClusterSchemaGraph(
  title: string,
  description: string,
  canonicalPath: string
) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const published = new Set(getPublishedCityHubSlugs());
  const texasHubs = getClusterMarkets('texas').filter((market) =>
    published.has(market.slug)
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Popular Destinations',
            item: `${SITE_URL}/moving-to`,
          },
          { '@type': 'ListItem', position: 3, name: 'Texas', item: canonical },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        about: {
          '@type': 'State',
          name: 'Texas',
          addressRegion: 'TX',
        },
        mainEntity: { '@id': `${canonical}#texas-hub-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#texas-hub-list`,
        name: 'Texas City Moving Guides',
        numberOfItems: texasHubs.length,
        itemListElement: texasHubs.map((market, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${market.displayName}, TX`,
          url: `${SITE_URL}${getMarketPath(market)}`,
        })),
      },
    ],
  };
}