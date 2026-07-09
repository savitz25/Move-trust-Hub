import type { Article } from '@/lib/insurance/resources/articles';
import { ARTICLES } from '@/lib/insurance/resources/articles';

function articleVariant(article: Article): 'guide' | 'comparison' {
  if (article.variant) return article.variant;
  if (article.slug.includes('vs') || article.title.toLowerCase().includes(' vs ')) {
    return 'comparison';
  }
  return 'guide';
}

export function getComparisonArticles(): Article[] {
  return ARTICLES.filter((article) => articleVariant(article) === 'comparison');
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((article) => article.category === category);
}

/** Related guides: same category first, then comparisons, then recency. */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = ARTICLES.filter((a) => a.slug !== article.slug);
  const variant = articleVariant(article);

  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.category === article.category) score += 10;
    if (articleVariant(candidate) === 'comparison' && variant === 'comparison') score += 6;
    if (articleVariant(candidate) === 'comparison') score += 2;
    score += new Date(candidate.updatedAt).getTime() / 1e12;
    return { candidate, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getFeaturedResourceSlugs(): string[] {
  return [
    'medicare-advantage-vs-medigap',
    'how-to-choose-health-insurance-plan',
    'aca-obamacare-guide',
    'how-to-choose-insurance-agent',
  ];
}