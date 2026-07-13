import { buildBreadcrumbSchema } from '@/lib/hub/schemas';
import { hubCanonicalUrl, stripHubPrefix } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type {
  ResourceArticleData,
  StateGuideData,
  TemplateBreadcrumb,
  TemplateFaqItem,
} from '@/lib/hub/templates/types';

function isWebPageNode(node: Record<string, unknown>): boolean {
  const type = node['@type'];
  if (type === 'WebPage') return true;
  return Array.isArray(type) && type.includes('WebPage');
}

export function buildTemplateSchemaGraph(params: {
  hub: HubId;
  path: string;
  breadcrumbs: TemplateBreadcrumb[];
  nodes: Record<string, unknown>[];
}): Record<string, unknown> {
  const pageUrl = hubCanonicalUrl(params.hub, params.path);
  const crumbs = buildBreadcrumbSchema(
    params.hub,
    params.breadcrumbs
      .filter((b) => b.href)
      .map((b) => ({
        name: b.label,
        path: stripHubPrefix(params.hub, b.href!),
      }))
  );
  const hasWebPage = params.nodes.some(isWebPageNode);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...(hasWebPage
        ? []
        : [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl}#webpage`,
              url: pageUrl,
            },
          ]),
      {
        ...crumbs,
        '@id': `${pageUrl}#breadcrumb`,
      },
      ...params.nodes,
    ],
  };
}

export type ItemListEntry = { name: string; url: string };

export function buildItemListSchema(
  pageUrl: string,
  items: ItemListEntry[],
  name?: string
): Record<string, unknown> | null {
  if (!items.length) return null;

  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleSchema(hub: HubId, article: ResourceArticleData) {
  const url = hubCanonicalUrl(hub, `/resources/${article.slug}`);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: hub === 'insurance' ? 'Insurance Trust Hub' : 'Lender Trust Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Move Trust Hub',
    },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    articleSection: article.category,
  };
}

export function buildComparisonArticleSchema(hub: HubId, article: ResourceArticleData) {
  return {
    ...buildArticleSchema(hub, article),
    '@type': ['Article', 'TechArticle'],
    about: article.title,
  };
}

export function buildStateGuideSchema(hub: HubId, state: StateGuideData) {
  const url = hubCanonicalUrl(hub, `/destinations/${state.slug}`);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: `${state.name} Insurance Guide`,
    description: state.description,
    about: {
      '@type': 'AdministrativeArea',
      name: state.name,
    },
  };
}

export function buildCollectionPageSchema(
  hub: HubId,
  path: string,
  name: string,
  description: string
) {
  const url = hubCanonicalUrl(hub, path);
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name,
    description,
    url,
  };
}

export function buildFaqSchema(faq: TemplateFaqItem[]) {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}