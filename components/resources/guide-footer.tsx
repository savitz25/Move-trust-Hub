import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRelatedGuides } from '@/lib/resources/guides';

export function GuideCta() {
  return (
    <div className="not-prose mt-10 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
      <h3 className="font-semibold text-lg mb-2">Ready to plan your interstate move?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Use our free tools to research licensed movers, estimate your volume, and request competitive quotes.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/moving-calculator"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Moving Calculator
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent transition-colors"
        >
          Get Free Quotes
        </Link>
        <Link
          href="/companies"
          className="inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent transition-colors"
        >
          Browse Movers
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent transition-colors"
        >
          Compare Movers
        </Link>
      </div>
    </div>
  );
}

export function RelatedGuides({ slugs }: { slugs: string[] }) {
  const related = getRelatedGuides(slugs);
  if (!related.length) return null;

  return (
    <div className="not-prose mt-10 rounded-xl border bg-muted/30 p-6">
      <h3 className="font-semibold mb-3">Related Moving Guides</h3>
      <ul className="space-y-2">
        {related.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={guide.href}
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
            >
              {guide.title}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GuideFooter({ relatedSlugs }: { relatedSlugs: string[] }) {
  return (
    <>
      <RelatedGuides slugs={relatedSlugs} />
      <GuideCta />
    </>
  );
}