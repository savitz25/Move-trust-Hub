import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Scale } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import { resourceArticleBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import {
  buildArticleSchema,
  buildComparisonArticleSchema,
  buildTemplateSchemaGraph,
} from '@/lib/hub/templates/schemas';
import { ComparisonGlanceLoader } from '@/components/hub/templates/comparison-glance-loader';
import type { ResourceArticleData } from '@/lib/hub/templates/types';

export type ResourceArticleTemplateProps = {
  hub: HubId;
  article: ResourceArticleData;
  relatedArticles?: Pick<ResourceArticleData, 'slug' | 'title' | 'category'>[];
  directoryCta?: { href: string; label: string };
};

export function ResourceArticleTemplate({
  hub,
  article,
  relatedArticles = [],
  directoryCta,
}: ResourceArticleTemplateProps) {
  const isComparison = article.variant === 'comparison';
  const accent =
    hub === 'insurance' ? 'text-emerald-600' : hub === 'lender' ? 'text-[#3B82F6]' : 'text-primary';
  const breadcrumbs = resourceArticleBreadcrumbs(hub, article);
  const articleNode = isComparison
    ? buildComparisonArticleSchema(hub, article)
    : buildArticleSchema(hub, article);
  const schema = buildTemplateSchemaGraph({
    hub,
    path: `/resources/${article.slug}`,
    breadcrumbs,
    nodes: [articleNode],
  });
  const directoryHref =
    directoryCta?.href ?? hubPath(hub, hub === 'insurance' ? '/directory' : '/local-lenders');

  return (
    <>
      <SchemaInjector data={schema} />
      <HubBreadcrumbs hub={hub} items={breadcrumbs} />

      <article>
        <header className="border-b bg-muted/20">
          <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <p className={`text-xs font-semibold uppercase tracking-widest ${accent}`}>
                {article.category}
              </p>
              {isComparison ? (
                <Badge variant="secondary" className="gap-1 text-[10px] uppercase tracking-wide">
                  <Scale className="h-3 w-3" aria-hidden="true" />
                  Comparison
                </Badge>
              ) : null}
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.description}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {article.readTime} · Published{' '}
              {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              {article.updatedAt !== article.publishedAt ? (
                <> · Updated {format(new Date(article.updatedAt), 'MMMM d, yyyy')}</>
              ) : null}
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px]">
            <div className="prose prose-slate max-w-none">
              {article.sections.map((section, index) => {
                const isGlance =
                  isComparison &&
                  index === 0 &&
                  section.heading.toLowerCase().includes('glance');

                if (isGlance) {
                  return <ComparisonGlanceLoader key={section.heading} section={section} />;
                }

                return (
                  <section key={section.heading} className="mb-10">
                    <h2 className="mb-3 text-2xl font-semibold text-foreground">{section.heading}</h2>
                    <p className="leading-relaxed text-muted-foreground">{section.content}</p>
                    {section.bullets?.length ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                );
              })}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">
                    {hub === 'insurance' ? 'Find licensed agents' : 'Find verified lenders'}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {hub === 'insurance'
                      ? 'Browse licensed agencies in our independent directory — no quote matching or lead fees.'
                      : 'Compare NMLS-verified lenders in your state and county cluster.'}
                  </p>
                  <Button asChild className="mt-4 w-full gap-2">
                    <Link href={directoryHref}>
                      {directoryCta?.label ?? (hub === 'insurance' ? 'Agency directory' : 'Local lenders')}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {article.relatedLinks.length > 0 ? (
                <div>
                  <h3 className="mb-3 text-sm font-semibold">Related links</h3>
                  <ul className="space-y-2">
                    {article.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-primary underline-offset-2 hover:underline"
                        >
                          {link.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          {relatedArticles.length > 0 ? (
            <section className="mx-auto mt-16 max-w-5xl border-t pt-12">
              <h2 className="mb-6 text-xl font-semibold">
                {isComparison ? 'Related comparisons & guides' : 'More guides'}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={hubPath(hub, `/resources/${related.slug}`)}>
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardContent className="pt-5">
                        <p className="text-xs text-muted-foreground">{related.category}</p>
                        <h3 className="mt-1 text-sm font-medium leading-snug">{related.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}