import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type { TemplateBreadcrumb, TemplateFaqItem } from '@/lib/hub/templates/types';
import {
  buildCollectionPageSchema,
  buildFaqSchema,
  buildTemplateSchemaGraph,
} from '@/lib/hub/templates/schemas';

export type HubSectionLink = {
  href: string;
  label: string;
  description?: string;
};

export type HubSectionPageProps = {
  hub: HubId;
  eyebrow: string;
  title: string;
  description: string;
  path?: string;
  breadcrumbs?: TemplateBreadcrumb[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  links?: HubSectionLink[];
  faq?: TemplateFaqItem[];
  children?: React.ReactNode;
};

/**
 * Reusable hub interior layout for index pages, legacy fallbacks, and thin directory sections.
 */
export function HubSectionPage({
  hub,
  eyebrow,
  title,
  description,
  path = '/',
  breadcrumbs,
  primaryCta,
  secondaryCta,
  links = [],
  faq = [],
  children,
}: HubSectionPageProps) {
  const accent =
    hub === 'insurance' ? 'text-emerald-600' : hub === 'lender' ? 'text-[#3B82F6]' : 'text-primary';
  const crumbs = breadcrumbs ?? [
    { label: 'Home', href: hubPath(hub, '/') },
    { label: title },
  ];
  const faqNode = buildFaqSchema(faq);
  const schema = buildTemplateSchemaGraph({
    hub,
    path,
    breadcrumbs: crumbs,
    nodes: [
      buildCollectionPageSchema(hub, path, title, description),
      ...(faqNode ? [faqNode] : []),
    ],
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <HubBreadcrumbs hub={hub} items={crumbs} />

      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className={`mb-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
              {eyebrow}
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {primaryCta ? (
                  <Button asChild className="gap-2">
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button variant="outline" asChild>
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {children ? <div className="container mx-auto px-4 py-10 md:py-14">{children}</div> : null}

      {faq.length > 0 ? (
        <section className="border-t bg-muted/10 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-center text-xl font-semibold">Frequently asked questions</h2>
            <div className="space-y-5">
              {faq.map((item) => (
                <div key={item.question} className="rounded-lg border bg-card p-5">
                  <h3 className="font-medium">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {links.length > 0 ? (
        <section className="border-t bg-muted/10 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-center text-xl font-semibold">Related pages</h2>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="pt-5">
                      <p className="text-sm font-medium">{link.label}</p>
                      {link.description ? (
                        <p className="mt-1 text-xs text-muted-foreground">{link.description}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function hubSectionCta(hub: HubId, path: string) {
  return { href: path, label: path };
}