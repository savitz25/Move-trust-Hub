import type { Metadata } from 'next';
import Link from 'next/link';
import { CompareLoader } from '@/components/compare/compare-loader';
import { getAllCompanies } from '@/lib/data-server';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';

export const dynamic = 'force-static';

export const metadata: Metadata = buildMovePageMetadata({
  title: 'Compare Movers Side-by-Side',
  description:
    'Select up to 4 interstate moving companies and compare reputation scores, ratings, pricing, licensing, services, and complaint ratios in one table.',
  path: '/compare',
});

export default async function ComparePage() {
  const companies = (await getAllCompanies()).filter(isPubliclyDisplayableCompany);
  const featured = companies
    .slice()
    .sort((a, b) => (b.reputationScore ?? 0) - (a.reputationScore ?? 0))
    .slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold tracking-tight mb-1">Compare Movers</h1>
      <p className="text-muted-foreground mb-4 max-w-2xl">
        Select up to four companies from the{' '}
        <Link href="/companies" className="text-primary underline underline-offset-2">
          mover directory
        </Link>
        . Compare{' '}
        <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
          FMCSA ratings
        </Link>
        , reputation scores, and transparent review data side-by-side.
      </p>

      {/* Server-rendered discovery list — indexable without client JS */}
      {featured.length > 0 ? (
        <section className="mb-8 rounded-xl border bg-muted/20 p-5" aria-labelledby="compare-featured-heading">
          <h2 id="compare-featured-heading" className="text-lg font-semibold tracking-tight mb-2">
            Popular movers to compare
          </h2>
          <p className="text-sm text-muted-foreground mb-3 max-w-2xl">
            Open any profile, or use the interactive table below to compare up to four carriers on
            licensing, reputation, and pricing signals.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {featured.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/companies/${company.slug}`}
                  className="text-primary underline-offset-2 hover:underline font-medium"
                >
                  {company.name}
                </Link>
                <span className="text-muted-foreground">
                  {' '}
                  · score {company.reputationScore}
                  {company.usdotNumber ? ` · USDOT ${company.usdotNumber}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <CompareLoader allCompanies={companies} />
    </div>
  );
}
