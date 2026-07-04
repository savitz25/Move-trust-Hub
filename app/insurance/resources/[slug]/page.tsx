import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/insurance/resources/articles';
import { getRelatedArticles } from '@/lib/insurance/resources/helpers';
import { resolveInsuranceResourceSlug } from '@/lib/insurance/resources/slug-aliases';
import { ResourceArticleTemplate } from '@/components/hub/templates';
import { articleToResourceData } from '@/lib/hub/templates/adapters';
import { buildArticleTemplateMetadata } from '@/lib/hub/templates/metadata';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonical = resolveInsuranceResourceSlug(slug);
  const article = getArticleBySlug(canonical);
  if (!article) return { title: 'Article Not Found' };

  return buildArticleTemplateMetadata('insurance', {
    title: article.title,
    description: article.description,
    slug: article.slug,
    category: article.category,
    variant: article.variant,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const canonical = resolveInsuranceResourceSlug(slug);
  if (canonical !== slug) {
    permanentRedirect(`/insurance/resources/${canonical}`);
  }
  const article = getArticleBySlug(canonical);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <ResourceArticleTemplate
      hub="insurance"
      article={articleToResourceData(article)}
      relatedArticles={related}
    />
  );
}