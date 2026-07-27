import type { Metadata } from 'next';
import { HubsExperience } from '@/components/insurance/hubs-experience';
import { DisclaimerBanner } from '@/components/insurance/disclaimer-banner';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import {
  buildCollectionPageSchema,
  buildTemplateSchemaGraph,
} from '@/lib/hub/templates/schemas';
import { INSURANCE_HUBS, getAllStateSlugs } from '@/lib/insurance/hubs/registry';
import { toHubCardData } from '@/lib/insurance/hubs/intent-filters';
import { getEnrollmentCountdowns } from '@/lib/insurance/hubs/enrollment-windows';

const title = 'Find the Right Insurance Help for Where You Live';
const description =
  'Tell us your ZIP and life situation — we’ll match you to verified insurance market hubs across 50+ U.S. metros. Health, Medicare, ACA, and multi-line specialists. No paid placement.';

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: 'Insurance Hubs — Personalized Markets Across America',
  description,
  path: '/hubs',
});

export default function HubsPage() {
  const hubs = INSURANCE_HUBS.map(toHubCardData);
  const enrollment = getEnrollmentCountdowns();
  const stateCount = getAllStateSlugs().length;
  const crumbs = hubSectionBreadcrumbs('insurance', 'Health hubs');
  const schema = buildTemplateSchemaGraph({
    hub: 'insurance',
    path: '/hubs',
    breadcrumbs: crumbs,
    nodes: [buildCollectionPageSchema('insurance', '/hubs', title, description)],
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <div className="border-b bg-white">
        <HubBreadcrumbs hub="insurance" items={crumbs} className="container mx-auto px-4 py-3" />
      </div>
      <HubsExperience hubs={hubs} enrollment={enrollment} stateCount={stateCount} />
      <DisclaimerBanner />
    </>
  );
}
