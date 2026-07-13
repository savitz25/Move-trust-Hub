import type { Metadata } from 'next';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { SITE_EMAIL } from '@/lib/contact';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { buildCollectionPageSchema, buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';

const TERMS_DESCRIPTION =
  'Terms of service for using Lender Trust Hub directory, calculators, and resources.';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Terms of Service',
  description: TERMS_DESCRIPTION,
  path: '/terms',
});

export default function LenderTermsPage() {
  const effectiveDate = 'June 1, 2026';
  const schema = buildTemplateSchemaGraph({
    hub: 'lender',
    path: '/terms',
    breadcrumbs: hubSectionBreadcrumbs('lender', 'Terms of Service'),
    nodes: [
      buildCollectionPageSchema('lender', '/terms', 'Terms of Service', TERMS_DESCRIPTION),
    ],
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <SchemaInjector data={schema} />
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {effectiveDate}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Agreement</h2>
          <p>
            By using Lender Trust Hub, you agree to these terms. We provide an informational directory
            and educational calculators — we are not a lender, broker, or loan originator.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">No lending advice</h2>
          <p>
            Calculator outputs and lender listings are for research only. Verify rates, fees, and NMLS
            licensing directly with lenders and official registries before applying.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms:{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}