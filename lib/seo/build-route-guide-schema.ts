import { organizationSchema } from '@/lib/seo/schemas';
import {
  buildEditorPersonSchema,
  getPrimaryEditorForContent,
} from '@/lib/trust/editorial-team';
import { RESOURCES_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { RouteGuide } from '@/lib/resources/routes';
import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';

export function buildRouteGuideSchemaGraph(
  route: RouteGuide,
  content: RouteGuideExtendedContent,
  canonical: string
) {
  const editor = getPrimaryEditorForContent('route');
  const editorSchema = buildEditorPersonSchema(editor);

  const graph: Record<string, unknown>[] = [
    organizationSchema,
    editorSchema,
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
      headline: content.seo.title,
      description: content.seo.description,
      url: canonical,
      datePublished: '2026-06-27',
      dateModified: RESOURCES_CONTENT_UPDATED.toISOString().split('T')[0],
      author: { '@id': editorSchema['@id'] as string },
      publisher: {
        '@type': 'Organization',
        name: 'Move Trust Hub',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: canonical,
      keywords: content.seo.keywords.join(', '),
    },
    {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      name: `FAQ: ${route.title}`,
      mainEntity: content.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: `How to Plan a ${route.title}`,
      description: content.seo.description,
      step: content.howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}