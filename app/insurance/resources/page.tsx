import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock, Scale } from 'lucide-react';
import { ARTICLES } from '@/lib/insurance/resources/articles';
import { getComparisonArticles, getFeaturedResourceSlugs } from '@/lib/insurance/resources/helpers';
import { HubSectionPage } from '@/components/hub/templates';
import { INSURANCE_SECTION_PRESETS } from '@/lib/hub/templates/section-presets';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { hubPath } from '@/lib/hub/paths';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const preset = INSURANCE_SECTION_PRESETS.resources;

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: preset.title,
  description: preset.description,
  path: '/resources',
  keywords: ['insurance guides', 'Medicare comparison', 'ACA guide', 'insurance resources'],
});

export default function ResourcesPage() {
  const comparisons = getComparisonArticles();
  const featuredSlugs = new Set(getFeaturedResourceSlugs());
  const featured = ARTICLES.filter((article) => featuredSlugs.has(article.slug));
  const categories = [...new Set(ARTICLES.map((a) => a.category))];

  return (
    <HubSectionPage
      hub="insurance"
      eyebrow={preset.eyebrow}
      title={preset.title}
      description={preset.description}
      path="/resources"
      breadcrumbs={hubSectionBreadcrumbs('insurance', 'Resources')}
      primaryCta={preset.primaryCta}
      secondaryCta={preset.secondaryCta}
      links={preset.links}
      faq={preset.faq}
    >
      <div className="mx-auto max-w-6xl space-y-14">
        {comparisons.length > 0 ? (
          <section aria-labelledby="comparison-guides">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  <Scale className="h-3.5 w-3.5" aria-hidden="true" />
                  Comparisons
                </p>
                <h2 id="comparison-guides" className="text-2xl font-semibold">
                  Side-by-side insurance comparisons
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  High-intent guides that help seniors and movers compare coverage paths before
                  talking to a licensed agent.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {comparisons.map((article) => (
                <Link key={article.slug} href={hubPath('insurance', `/resources/${article.slug}`)}>
                  <Card className="h-full border-emerald-200/50 transition-shadow hover:shadow-md dark:border-emerald-900/40">
                    <CardContent className="pt-6">
                      <Badge className="gap-1 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/10">
                        <Scale className="h-3 w-3" aria-hidden="true" />
                        Comparison
                      </Badge>
                      <h3 className="mt-3 text-xl font-semibold leading-snug">{article.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {article.description}
                      </p>
                      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {article.readTime} · Updated {article.updatedAt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="featured-guides">
          <h2 id="featured-guides" className="mb-6 text-xl font-semibold">
            Featured guides
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((article) => (
              <Link key={article.slug} href={hubPath('insurance', `/resources/${article.slug}`)}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="pt-5">
                    <p className="text-xs text-muted-foreground">{article.category}</p>
                    <h3 className="mt-1 text-sm font-medium leading-snug">{article.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="all-guides">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="all-guides" className="text-xl font-semibold">
              All resources
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={hubPath('insurance', `/resources/${article.slug}`)}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="text-[10px]">
                      {article.category}
                      {article.variant === 'comparison' ? ' · Comparison' : ''}
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold leading-snug">{article.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {article.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readTime} · Updated {article.updatedAt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={hubPath('insurance', '/calculators')}>
                Insurance calculators
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={hubPath('insurance', '/directory')}>
                Agency directory
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </HubSectionPage>
  );
}