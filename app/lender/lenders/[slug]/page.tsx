import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ChevronRight, Phone, ExternalLink } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { hubPath } from '@/lib/hub/paths';
import { buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';
import { getEnrichedLenderBySlug } from '@/lib/lender/enrichment/get-enriched';
import { lenders } from '@/lib/lender/lenders';
import { buildLenderFinancialServiceSchema } from '@/lib/lender/seo/schemas';
import { evaluateLenderProfileIndexability } from '@/lib/hub/indexability';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { Badge } from '@/components/lender/ui/badge';
import { MatchLenderButton } from '@/components/lender/MatchLenderButton';
import { RelatedDirectoryLinks } from '@/components/lender/directory/RelatedDirectoryLinks';
import { LenderProfileBack } from '@/components/lender/lender-profile-back';
import { LenderTrustSignals } from '@/components/lender/lender-trust-signals';
import { TrustProfileShell } from '@/components/network/trust-profile-shell';
import { toLenderTrustProfile } from '@/lib/network/adapters/to-lender-trust-profile';
import {
  cleanNmlsId,
  NO_CLOSING_PERFORMANCE_LABEL,
  resolveClosingPerformance,
} from '@/lib/lender/verification';

export function generateStaticParams() {
  return lenders.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lender = getEnrichedLenderBySlug(slug);
  if (!lender) return { title: 'Lender Not Found' };
  const indexDecision = evaluateLenderProfileIndexability(lender);
  const nmls = cleanNmlsId(lender.nmlsId);
  return buildHubMetadata('lender', {
    title: nmls ? `${lender.name} — NMLS #${nmls}` : lender.name,
    description: lender.shortDescription,
    path: `/lenders/${slug}`,
    noIndex: indexDecision.tier === 'noindex',
  });
}

export default async function LenderProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const lender = getEnrichedLenderBySlug(slug);
  if (!lender) notFound();

  const countyLabel = `${lender.county} County, ${lender.state}`;
  const schema = buildTemplateSchemaGraph({
    hub: 'lender',
    path: `/lenders/${lender.slug}`,
    breadcrumbs: [
      { label: 'Home', href: hubPath('lender', '/') },
      {
        label: countyLabel,
        href: hubPath('lender', `/local-lenders/${lender.stateSlug}/${lender.countySlug}`),
      },
      { label: lender.name },
    ],
    nodes: [buildLenderFinancialServiceSchema(lender)],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <SchemaInjector data={schema} />
      <LenderProfileBack fromParam={from} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/lender/" className="hover:text-[#3B82F6]">Home</Link></li>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <li>
            <Link
              href={`/lender/local-lenders/${lender.stateSlug}/${lender.countySlug}`}
              className="hover:text-[#3B82F6]"
            >
              {countyLabel}
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <li><span className="text-[#0A2540]">{lender.name}</span></li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl">
        <TrustProfileShell
          profile={toLenderTrustProfile(lender)}
          variant="lender"
          showContact
          className="mb-6"
          actions={<Badge variant="outline">{lender.type}</Badge>}
        />

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-lg font-semibold text-amber-700">
              <Star className="h-5 w-5 fill-current" aria-hidden="true" />
              {lender.rating.toFixed(1)}
              <span className="text-sm font-normal text-zinc-500">
                ({lender.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <p className="mb-6 text-zinc-600 leading-relaxed">{lender.shortDescription}</p>

          <div className="mb-2 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-zinc-50 p-4 text-center">
              <div className="text-xl font-bold text-[#0A2540]">
                {lender.countyExperienceScore}/100
              </div>
              <div className="text-xs text-zinc-500">County Experience</div>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4 text-center">
              {(() => {
                const close = resolveClosingPerformance({
                  avgCloseDays: lender.avgCloseDays,
                  onTimeCloseRate: lender.onTimeCloseRate,
                  provenance: null,
                });
                if (close.displayable && close.avgCloseDays != null) {
                  return (
                    <>
                      <div className="text-xl font-bold text-[#0A2540]">
                        ~{close.avgCloseDays} days
                      </div>
                      <div className="text-xs text-zinc-500">Avg close (observed)</div>
                    </>
                  );
                }
                return (
                  <>
                    <div className="text-sm font-medium leading-snug text-zinc-600">
                      {NO_CLOSING_PERFORMANCE_LABEL}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">Closing performance</div>
                  </>
                );
              })()}
            </div>
          </div>
          <p className="mb-6 text-xs text-zinc-500">
            Closing timelines are only shown when backed by a documented observed dataset (source,
            sample size, window). Seed or editorial estimates are not displayed.
          </p>

          <div className="mb-6">
            <h2 className="mb-2 font-semibold text-[#0A2540]">Loan Types</h2>
            <div className="flex flex-wrap gap-2">
              {lender.loanTypes.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 font-semibold text-[#0A2540]">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {lender.specialties.map((s) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {lender.phone && (
              <a
                href={`tel:${lender.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2540]/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {lender.phone}
              </a>
            )}
            {lender.website && (
              <a
                href={lender.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-[#0A2540] hover:bg-zinc-50"
              >
                Visit Website <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <MatchLenderButton
              filters={{
                stateSlug: lender.stateSlug,
                countySlug: lender.countySlug,
                loanType: lender.loanTypes[0],
              }}
            />
          </div>
        </div>

        <LenderTrustSignals lender={lender} className="mt-6" />

        <RelatedDirectoryLinks stateSlug={lender.stateSlug} stateName={lender.state} />
      </div>
    </div>
  );
}