import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchFilters } from '@/components/insurance/search-filters';
import { DirectoryControls } from '@/components/insurance/directory-controls';
import { ProviderCard } from '@/components/insurance/provider-card';
import { DisclaimerBanner } from '@/components/insurance/disclaimer-banner';
import { HealthHubDirectoryTemplate } from '@/components/hub/templates';
import { searchProviders, sortEnrichedProviders } from '@/lib/insurance/providers/queries';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { INSURANCE_DIRECTORY_LANDING } from '@/lib/hub/templates/landing-data';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import type { InsuranceType, Specialty } from '@/lib/insurance/constants';
import { cn } from '@/lib/insurance/utils';

export const revalidate = 86400;

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: 'Licensed Insurance Agents Directory (2026)',
  description: INSURANCE_DIRECTORY_LANDING.subtitle,
  path: '/directory',
});

interface DirectoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getParam(params: Record<string, string | string[] | undefined>, key: string): string {
  const val = params[key];
  return Array.isArray(val) ? val[0] ?? '' : val ?? '';
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const query = getParam(params, 'q');
  const state = getParam(params, 'state');
  const type = getParam(params, 'type') as InsuranceType | '';
  const specialty = getParam(params, 'specialty') as Specialty | '';
  const verifiedOnly = getParam(params, 'verified') === 'true';
  const minRating = getParam(params, 'minRating');
  const minGoogleRating = getParam(params, 'minGoogleRating');
  const bbbAccreditedOnly = getParam(params, 'bbbAccredited') === 'true';
  const sort = getParam(params, 'sort') || 'rating';
  const view = getParam(params, 'view') || 'grid';

  const { providers: rawProviders, total } = await searchProviders({
    query: query || undefined,
    state: state || undefined,
    insuranceType: type || undefined,
    specialty: specialty || undefined,
    verifiedOnly,
    minRating: minRating ? Number(minRating) : undefined,
    minGoogleRating: minGoogleRating ? Number(minGoogleRating) : undefined,
    bbbAccreditedOnly,
    limit: 24,
  });

  const providers = sortEnrichedProviders(rawProviders, sort, query);
  const isList = view === 'list';

  return (
    <HealthHubDirectoryTemplate
      hub="insurance"
      data={INSURANCE_DIRECTORY_LANDING}
      path="/directory"
      variant="directory"
      breadcrumbs={hubSectionBreadcrumbs('insurance', 'Directory')}
      itemListItems={providers.slice(0, 20).map((provider) => ({
        name: provider.name,
        url: hubCanonicalUrl('insurance', `/providers/${provider.slug}`),
      }))}
    >
      <section>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense
              fallback={
                <div className="min-h-[540px] rounded-xl border bg-card p-5 space-y-4">
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-10 w-full" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="skeleton h-[72px] rounded-md" />
                    ))}
                  </div>
                  <div className="skeleton h-10 w-full" />
                </div>
              }
            >
              <SearchFilters />
            </Suspense>
          </aside>

          <div>
            <Suspense fallback={null}>
              <DirectoryControls total={total} className="mb-6" />
            </Suspense>

            {providers.length === 0 ? (
              <div className="rounded-xl border bg-muted/30 p-12 text-center">
                <p className="font-medium">No agencies match your filters</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try broadening your search or clearing filters.
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  isList ? 'flex flex-col gap-4' : 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
                )}
              >
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
          </div>
        </div>

        <DisclaimerBanner className="mt-12 rounded-xl border" compact />
      </section>
    </HealthHubDirectoryTemplate>
  );
}