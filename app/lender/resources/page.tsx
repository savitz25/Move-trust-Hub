import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import { HubSectionPage } from '@/components/hub/templates';
import { LENDER_SECTION_PRESETS } from '@/lib/hub/templates/section-presets';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { lenderGuides } from '@/lib/lender/resources/guides';
import { hubPath } from '@/lib/hub/paths';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const preset = LENDER_SECTION_PRESETS.resources!;

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'lender',
  title: preset.title,
  description: preset.description,
  path: '/resources',
  keywords: ['mortgage lender guide', 'NMLS verification', 'mortgage comparison', 'lender resources'],
});

export default function LenderResourcesPage() {
  const categories = [...new Set(lenderGuides.map((g) => g.category))];

  return (
    <HubSectionPage
      hub="lender"
      eyebrow={preset.eyebrow}
      title={preset.title}
      description={preset.description}
      path="/resources"
      breadcrumbs={hubSectionBreadcrumbs('lender', 'Resources')}
      primaryCta={preset.primaryCta}
      secondaryCta={preset.secondaryCta}
      links={preset.links}
      faq={preset.faq}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <section aria-labelledby="all-guides">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="all-guides" className="text-xl font-semibold">
              All guides
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {lenderGuides.map((guide) => (
              <Link key={guide.slug} href={guide.href}>
                <Card className="h-full border-[#3B82F6]/20 transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="text-[10px]">
                      {guide.category}
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold leading-snug">{guide.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{guide.excerpt}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {guide.readTime} · Updated {guide.updatedAt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={hubPath('lender', '/compare')}>
                Compare lenders
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={hubPath('lender', '/calculators')}>
                Mortgage calculators
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </HubSectionPage>
  );
}