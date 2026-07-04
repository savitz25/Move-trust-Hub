import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchFilters } from '@/components/insurance/search-filters';
import { DirectoryControls } from '@/components/insurance/directory-controls';
import { ProviderCard } from '@/components/insurance/provider-card';
import { DisclaimerBanner } from '@/components/insurance/disclaimer-banner';
import { HealthHubDirectoryTemplate } from '@/components/hub/templates';
import { searchProviders } from '@/lib/insurance/providers/queries';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { INSURANCE_DIRECTORY_LANDING } from '@/lib/hub/templates/landing-data';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import type { Provider } from '@/types/insurance/provider';
import type { InsuranceType, Specialty } from '@/lib/insurance/constants';
import { cn } from '@/lib/insurance/utils';

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: INSURANCE_DIRECTORY_LANDING.title,
  description: INSURANCE_DIRECTORY_LANDING.subtitle,
  path: '/insurance/directory',
  keywords: ['insurance agency directory', 'licensed agents', 'DOI verified', 'insurance search'],
});

interface DirectoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getParam(params: Record<string, string | string[] | undefined>, key: string): string {
  const val = params[key];
  return Array.isArray(val) ? val[0] ?? '' : val ?? '';
}

function sortProviders(providers: Provider[], sort: string, query: string): Provider[] {
  const sorted = [...providers];
  switch (sort) {
    case 'reviews':
      return sorted.sort((a, b) => b.review_count - a.review_count);
    case 'relevance':
      if (!query) return sorted;
      const q = query.toLowerCase();
      return sorted.sort((a, b) => {
        const score = (p: Provider) =>
          (p.name.toLowerCase().includes(q) ? 3 : 0) +
          (p.city.toLowerCase().includes(q) ? 2 : 0) +
          (p.specialties.some((s) => s.toLowerCase().includes(q)) ? 1 : 0);
        return score(b) - score(a);
      });
    case 'rating':
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const query = getParam(params, 'q');
  const state = getParam(params, 'state');
  const type = getParam(params, 'type') as InsuranceType | '';
  const specialty = getParam(params, 'specialty') as Specialty | '';
  const verifiedOnly = getParam(params, 'verified') === 'true';
  const minRating = getParam(params, 'minRating');
  const sort = getParam(params, 'sort') || 'rating';
  const view = getParam(params, 'view') || 'grid';

  const { providers: rawProviders, total } = await searchProviders({
    query: query || undefined,
    state: state || undefined,
    insuranceType: type || undefined,
    specialty: specialty || undefined,
    verifiedOnly,
    minRating: minRating ? Number(minRating) : undefined,
    limit: 48,
  });

  const providers = sortProviders(rawProviders, sort, query);
  const isList = view === 'list';

  return (
    <HealthHubDirectoryTemplate
      hub="insurance"
      data={INSURANCE_DIRECTORY_LANDING}
      path="/directory"
      variant="directory"
      breadcrumbs={hubSectionBreadcrumbs('insurance', 'Directory')}
    >
      <section>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={<div className="skeleton h-96 rounded-xl" />}>
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