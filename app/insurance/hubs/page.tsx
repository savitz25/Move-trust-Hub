import type { Metadata } from 'next';
import Link from 'next/link';
import { HubBrowser } from '@/components/insurance/hub-browser';
import { ZipSearch } from '@/components/insurance/zip-search';
import { DisclaimerBanner } from '@/components/insurance/disclaimer-banner';
import { HubSectionPage } from '@/components/hub/templates';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { INSURANCE_SECTION_PRESETS } from '@/lib/hub/templates/section-presets';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { INSURANCE_HUBS } from '@/lib/insurance/hubs/registry';

const preset = INSURANCE_SECTION_PRESETS.directories;

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: 'Health Insurance Hubs — 50+ U.S. Markets',
  description:
    'Explore verified insurance agent hubs across 50+ U.S. metros. Health insurance specialists for ACA, Medicare, employer plans, and multi-line coverage.',
  path: '/insurance/hubs',
  keywords: ['health insurance hubs', 'Medicare agents', 'ACA marketplace', 'insurance directory'],
});

export default function HubsPage() {
  return (
    <>
      <HubSectionPage
        hub="insurance"
        eyebrow="Insurance Trust Hub · Health hubs"
        title="Health Insurance Hubs Across America"
        description={`${INSURANCE_HUBS.length} verified market hubs featuring health insurance specialists in every high-volume MSA. Search by ZIP or browse by state.`}
        path="/hubs"
        breadcrumbs={hubSectionBreadcrumbs('insurance', 'Health hubs')}
        primaryCta={{ href: '/insurance/hubs/browse', label: 'Browse all markets' }}
        secondaryCta={preset.secondaryCta}
        links={preset.links}
      >
        <div className="mx-auto max-w-xl mb-10 flex justify-center">
          <ZipSearch />
        </div>
        <HubBrowser />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/insurance/hubs/browse" className="font-medium text-primary hover:underline">
            View all {INSURANCE_HUBS.length} hubs →
          </Link>
        </p>
      </HubSectionPage>
      <DisclaimerBanner />
    </>
  );
}