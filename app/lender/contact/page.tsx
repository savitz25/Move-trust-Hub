import type { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_EMAIL } from '@/lib/contact';
import { hubPath } from '@/lib/hub/paths';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { buildCollectionPageSchema, buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';

const CONTACT_DESCRIPTION =
  'Contact Lender Trust Hub for listing corrections, data inquiries, partnerships, or press requests.';

export const metadata: Metadata = {
  title: 'Contact Lender Trust Hub',
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: `https://www.movetrusthub.com${hubPath('lender', '/contact')}` },
};

export default function LenderContactPage() {
  const schema = buildTemplateSchemaGraph({
    hub: 'lender',
    path: '/contact',
    breadcrumbs: hubSectionBreadcrumbs('lender', 'Contact'),
    nodes: [
      buildCollectionPageSchema('lender', '/contact', 'Contact Lender Trust Hub', CONTACT_DESCRIPTION),
    ],
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <SchemaInjector data={schema} />
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Lender Trust Hub</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Questions about NMLS verification, lender listings, or directory data? Reach out — we respond
        within 2–3 business days.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <Mail className="mb-3 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Email</h2>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-2 block text-sm text-primary hover:underline"
            >
              {SITE_EMAIL}
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <MessageSquare className="mb-3 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Listing updates</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Include NMLS ID, company name, and the correction needed. We verify all changes against
              NMLS Consumer Access.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}