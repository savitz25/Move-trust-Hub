import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRelatedGuides } from '@/lib/resources/guides';
import { GuideCtaClient } from '@/components/resources/guide-cta-client';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';

export function GuideCta(_props?: { prefilledNotes?: string }) {
  return (
    <div className="not-prose mt-10 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
      <h3 className="font-semibold text-lg mb-2">Ready to plan your interstate move?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Use our free tools to research licensed movers, estimate your volume, and compare trusted movers.
      </p>
      <GuideCtaClient />
    </div>
  );
}

export function RelatedGuides({ slugs }: { slugs?: string[] | null }) {
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

export function GuideFooter({
  relatedSlugs,
  prefilledNotes,
}: {
  /** Optional — empty/missing is safe (no related block). */
  relatedSlugs?: string[] | null;
  prefilledNotes?: string;
} = {}) {
  return (
    <>
      <RelatedGuides slugs={relatedSlugs} />
      <div className="not-prose mt-8">
        <TrustToolsBar />
      </div>
      <GuideCta prefilledNotes={prefilledNotes} />
    </>
  );
}