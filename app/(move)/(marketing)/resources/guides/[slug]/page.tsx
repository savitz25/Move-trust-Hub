import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideCtaClient } from '@/components/resources/guide-cta-client';
import { GuideFooter } from '@/components/resources/guide-footer';
import { TrustBadges } from '@/components/trust/trust-badges';
import {
  destinationGuides,
  getDestinationGuide,
} from '@/lib/resources/destination-guides';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return destinationGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDestinationGuide(slug);
  if (!guide) return {};

  const canonical = `${SITE_URL}/resources/guides/${guide.slug}`;

  return {
    title: `${guide.title} | Move Trust Hub`,
    description: guide.description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title: guide.title,
      description: guide.description,
      url: canonical,
      type: 'article',
    }),
    twitter: buildTwitter({ title: guide.title, description: guide.description }),
    robots: { index: true, follow: true },
  };
}

export default async function DestinationGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getDestinationGuide(slug);
  if (!guide) notFound();

  const path = `/resources/guides/${guide.slug}`;

  return (
    <>
      <ArticleSchema title={guide.title} description={guide.description} path={path} />

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link
          href={guide.destinationHubPath}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.destinationLabel} destination hub
        </Link>

        <h1 className="text-4xl font-semibold tracking-tight mb-4">{guide.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {guide.description}
        </p>

        <GuideCtaClient />
        <TrustBadges variant="compact" className="mb-10" />

        {guide.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight mb-3">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mb-10 rounded-xl border bg-muted/20 p-6">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Mover vetting checklist</h2>
          <ul className="space-y-3">
            {guide.checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Related resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {guide.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <div className="font-semibold text-sm mb-1">{link.title}</div>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/moving-calculator"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Free moving calculator
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/companies"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Interstate mover directory
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <GuideFooter
          relatedSlugs={['how-to-choose', 'interstate-moving-costs', 'fmcsa', 'scams', 'packing-checklist']}
          prefilledNotes={`Destination guide: ${guide.destinationLabel}`}
        />
      </div>
    </>
  );
}