import Link from 'next/link';
import { MoveQuoteCheckClient } from '@/components/move-quote-check/move-quote-check-client';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export const metadata = buildResourceMetadata(
  '/tools/move-quote-check',
  'Move Quote Check — Know What You’re Signing',
  'Educational review of moving estimate terms before you sign or pay a deposit. Binding vs non-binding, USDOT identity, inventory, deposits, and valuation checklist. No lead form. Not legal advice.'
);

const canonical = `${SITE_URL}/tools/move-quote-check`;

export default function MoveQuoteCheckPage() {
  return (
    <div className="border-b bg-gradient-to-b from-muted/40 to-background">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Move Quote Check',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          description:
            'Educational household-goods estimate checklist. Research only — not legal advice.',
          url: canonical,
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
              <Link href="/moving-calculator" className="hover:text-foreground">
                Tools
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground font-medium">Move Quote Check</li>
          </ol>
        </nav>

        <MoveQuoteCheckClient />
      </div>
    </div>
  );
}
