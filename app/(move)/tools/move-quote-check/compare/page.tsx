import Link from 'next/link';
import { CompareTwoEstimatesClient } from '@/components/move-quote-check/compare-two-estimates-client';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export const metadata = buildResourceMetadata(
  '/tools/move-quote-check/compare',
  'Compare Two Moving Estimates — Normalize Assumptions',
  'Side-by-side research comparison of two moving estimates: price, volume, estimate type, packing, valuation, deposits, and inventory baseline. Not a winner picker. No lead form.'
);

export default function CompareTwoEstimatesPage() {
  return (
    <div className="border-b bg-gradient-to-b from-muted/40 to-background">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Move Quote Check — Compare Two Estimates',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          url: `${SITE_URL}/tools/move-quote-check/compare`,
        }}
      />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/tools/move-quote-check" className="hover:text-foreground">
                Move Quote Check
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-foreground">Compare two</li>
          </ol>
        </nav>
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Decision tool · Phase 4
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Compare two estimates
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            Not just sticker price — normalize volume, estimate type, packing, valuation, and
            deposits. Research only. No winner verdict. No lead form.
          </p>
        </div>
        <CompareTwoEstimatesClient />
      </div>
    </div>
  );
}
