import type { Metadata } from 'next';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { SITE_EMAIL } from '@/lib/contact';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { buildCollectionPageSchema, buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';

const PRIVACY_DESCRIPTION =
  'Privacy policy for Lender Trust Hub — how we collect, use, and protect your information.';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Privacy Policy',
  description: PRIVACY_DESCRIPTION,
  path: '/privacy',
});

export default function LenderPrivacyPage() {
  const effectiveDate = 'June 1, 2026';
  const schema = buildTemplateSchemaGraph({
    hub: 'lender',
    path: '/privacy',
    breadcrumbs: hubSectionBreadcrumbs('lender', 'Privacy Policy'),
    nodes: [
      buildCollectionPageSchema('lender', '/privacy', 'Privacy Policy', PRIVACY_DESCRIPTION),
    ],
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <SchemaInjector data={schema} />
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {effectiveDate}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Overview</h2>
          <p>
            Lender Trust Hub operates as an independent mortgage lender directory on movetrusthub.com.
            This policy explains how we collect, use, and safeguard information when you browse lender
            listings, use calculators, or contact us.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Information we collect</h2>
          <p>
            We may collect analytics data, form submissions (name, email, message), and calculator inputs
            stored locally in your browser. We do not sell personal information to lenders or brokers.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Privacy questions:{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}