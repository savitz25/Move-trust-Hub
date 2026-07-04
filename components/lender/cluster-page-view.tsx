import Link from 'next/link';
import { Breadcrumbs } from '@/components/lender/directory/Breadcrumbs';
import { LeadCaptureForm } from '@/components/lender/directory/LeadCaptureForm';
import { SearchBar } from '@/components/lender/SearchBar';
import { LenderCard } from '@/components/lender/LenderCard';
import { STATE_BY_SLUG } from '@/lib/lender/fdic/states';
import {
  getClusterAreas,
  resolveClusterLenders,
  usesCountyLabels,
  type ClusterContent,
} from '@/lib/lender/clusters/content';
import type { LenderClusterSlug } from '@/lib/lender/clusters/registry';

const CALCULATORS = [
  { href: '/lender/calculators?calc=payment', label: 'Mortgage Payment' },
  { href: '/lender/calculators?calc=affordability', label: 'Affordability' },
  { href: '/lender/calculators?calc=refinance', label: 'Refinance ROI' },
  { href: '/lender/calculators?calc=payment', label: 'VA Loan' },
];

function decodeHtml(text: string): string {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

interface ClusterPageViewProps {
  state: string;
  slug: LenderClusterSlug;
  content: ClusterContent;
}

export function ClusterPageView({ state, slug, content }: ClusterPageViewProps) {
  const stateName = STATE_BY_SLUG[state]?.name ?? state;
  const areas = getClusterAreas(slug);
  const showCountySuffix = usesCountyLabels(slug);
  const lenders = resolveClusterLenders(slug);
  const leadCaptureName = content.leadCaptureName ?? decodeHtml(content.breadcrumbLabel);
  const lenderCountyLabel =
    content.lenderFn === 'county' && content.countyArg
      ? `${content.countyArg[1].split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} County`
      : decodeHtml(content.breadcrumbLabel).replace(/ Hub$/, '');

  return (
    <>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/lender' },
            { label: 'Mortgage Lenders', href: '/lender/local-lenders' },
            { label: stateName, href: `/lender/local-lenders/${state}` },
            { label: decodeHtml(content.breadcrumbLabel) },
          ]}
        />
      </div>

      <section className="border-b border-zinc-200 bg-gradient-to-br from-[#0A2540] to-[#0d3a5c] py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-1.5 text-sm">
            {decodeHtml(content.badge)}
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">{decodeHtml(content.h1)}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">{decodeHtml(content.subtitle)}</p>
          <div className="mt-6">
            <SearchBar className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {areas.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-[#0A2540]">
                  {decodeHtml(content.featuredSectionTitle)}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {areas.map((area) => (
                    <Link
                      key={`${area.slug}-${area.name}`}
                      href={`/lender/local-lenders/${state}/${area.slug}`}
                      className="rounded-xl border border-zinc-200 bg-white p-4 hover:border-[#14B8A6]"
                    >
                      <span className="font-semibold text-[#0A2540]">
                        {area.name}
                        {showCountySuffix ? ' County' : ''}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500">{area.highlight}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {content.bullets.length > 0 && content.whySectionTitle && (
              <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <h2 className="text-xl font-bold text-[#0A2540]">
                  {decodeHtml(content.whySectionTitle)}
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                  {content.bullets.map((bullet) => (
                    <li key={bullet}>{decodeHtml(bullet)}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="mb-4 text-2xl font-bold text-[#0A2540]">
                {decodeHtml(content.lendersSectionTitle)}
              </h2>
              <div className="space-y-4">
                {lenders.map((lender, i) => (
                  <LenderCard
                    key={lender.id}
                    lender={lender}
                    rank={i + 1}
                    countyLabel={lenderCountyLabel}
                  />
                ))}
              </div>
              {content.countyLinkHref && content.countyLinkText && (
                <p className="mt-4 text-sm text-zinc-500">
                  <Link href={content.countyLinkHref} className="text-[#3B82F6] hover:underline">
                    View all {content.countyLinkText} →
                  </Link>
                </p>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-[#0A2540]">Free Calculators</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {CALCULATORS.map((calc) => (
                  <Link
                    key={calc.href + calc.label}
                    href={calc.href}
                    className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-[#0A2540] hover:border-[#3B82F6]"
                  >
                    {calc.label} →
                  </Link>
                ))}
              </div>
            </section>

            <LeadCaptureForm
              stateName={leadCaptureName}
              categoryId="mortgage"
              variant="state-page-v2"
            />
          </div>

          <aside className="space-y-6">
            {content.alsoExplore.length > 0 && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm">
                <h2 className="font-semibold text-[#0A2540]">Also Explore</h2>
                <ul className="mt-3 space-y-2">
                  {content.alsoExplore.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#14B8A6] hover:underline">
                        {decodeHtml(link.label)} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm">
              <h2 className="font-semibold text-[#0A2540]">How We Verify</h2>
              <p className="mt-2 text-zinc-600">
                Tier 1: NMLS + CFPB + state licensing. Tier 2: Local operations. Tier 3:
                Google/Zillow/BBB ratings. No paid placement.
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Verify at{' '}
                <a
                  href="https://www.nmlsconsumeraccess.org"
                  className="text-[#3B82F6] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nmlsconsumeraccess.org
                </a>{' '}
                before signing disclosures.
              </p>
            </div>
            <LeadCaptureForm
              stateName={leadCaptureName}
              categoryId="mortgage"
              variant="sidebar-minimal"
            />
          </aside>
        </div>
      </div>
    </>
  );
}