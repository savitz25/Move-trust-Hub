import Link from 'next/link';
import { MapPin, Shield } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { hubPath } from '@/lib/hub/paths';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { buildCollectionPageSchema, buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';
import type { HubId } from '@/lib/hub/types';
import type { HealthHubDirectoryData, TemplateBreadcrumb } from '@/lib/hub/templates/types';

export type HealthHubDirectoryTemplateProps = {
  hub: HubId;
  data: HealthHubDirectoryData;
  path: string;
  breadcrumbs?: TemplateBreadcrumb[];
  children?: React.ReactNode;
  heroChildren?: React.ReactNode;
  variant?: 'health-hub' | 'directory';
};

export function HealthHubDirectoryTemplate({
  hub,
  data,
  path,
  breadcrumbs,
  children,
  heroChildren,
  variant = 'health-hub',
}: HealthHubDirectoryTemplateProps) {
  const isInsurance = hub === 'insurance';
  const crumbs =
    breadcrumbs ??
    hubSectionBreadcrumbs(
      hub,
      variant === 'directory' ? 'Directory' : 'Health hubs',
      data.title
    );
  const schema = buildTemplateSchemaGraph({
    hub,
    path,
    breadcrumbs: crumbs,
    nodes: [
      buildCollectionPageSchema(hub, path, data.title, data.subtitle),
    ],
  });
  const gradient =
    hub === 'insurance'
      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
      : 'bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white';

  return (
    <>
      <SchemaInjector data={schema} />
      <HubBreadcrumbs hub={hub} items={crumbs} />

      <section className={`border-b ${gradient}`}>
        <div className="container mx-auto px-4 py-14 text-center md:py-16">
          {data.trustLabel ? (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
              <Shield className="h-4 w-4" aria-hidden="true" />
              {data.trustLabel}
            </p>
          ) : null}
          <h1 className="mx-auto max-w-4xl text-3xl font-semibold md:text-5xl">{data.title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg opacity-90">{data.subtitle}</p>
          {heroChildren ? <div className="mt-6 flex justify-center">{heroChildren}</div> : null}
        </div>
      </section>

      <div className="container mx-auto space-y-12 px-4 py-10 md:py-14">
        <section className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">Market overview</h2>
          <p className="leading-relaxed text-muted-foreground">{data.marketSnapshot}</p>
          {data.focusPoints.length > 0 ? (
            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {data.focusPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </section>

        {data.featuredMetros.length > 0 ? (
          <section>
            <h2 className="mb-6 text-2xl font-bold">
              {isInsurance ? 'Browse by metro market' : 'Browse by region'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.featuredMetros.map((metro) => (
                <Link key={metro.href} href={metro.href}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                        <h3 className="font-semibold">{metro.label}</h3>
                      </div>
                      {metro.description ? (
                        <p className="mt-2 text-sm text-muted-foreground">{metro.description}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {isInsurance ? (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link
                  href={hubPath(hub, '/hubs/browse')}
                  className="text-primary underline-offset-2 hover:underline"
                >
                  View all 54 health insurance markets →
                </Link>
              </p>
            ) : null}
          </section>
        ) : null}

        {children}
      </div>
    </>
  );
}