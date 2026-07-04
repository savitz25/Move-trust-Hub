import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { Button } from '@/components/ui/button';
import { stateGuideBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { buildStateGuideSchema, buildTemplateSchemaGraph } from '@/lib/hub/templates/schemas';
import type { HubId } from '@/lib/hub/types';
import type { StateGuideData } from '@/lib/hub/templates/types';

export type StateGuideTemplateProps = {
  hub: HubId;
  state: StateGuideData;
  children?: React.ReactNode;
};

export function StateGuideTemplate({ hub, state, children }: StateGuideTemplateProps) {
  const accent =
    hub === 'insurance' ? 'text-emerald-600' : hub === 'lender' ? 'text-[#3B82F6]' : 'text-primary';
  const breadcrumbs = stateGuideBreadcrumbs(hub, state);
  const schema = buildTemplateSchemaGraph({
    hub,
    path: `/destinations/${state.slug}`,
    breadcrumbs,
    nodes: [buildStateGuideSchema(hub, state)],
  });
  const directoryHref =
    hub === 'insurance'
      ? `/insurance/directory?state=${state.code ?? state.slug}`
      : `/lender/local-lenders/${state.slug}`;

  return (
    <>
      <SchemaInjector data={schema} />
      <HubBreadcrumbs hub={hub} items={breadcrumbs} />

      <header className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className={`mb-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
            Destination guide
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {state.name} insurance landscape
          </h1>
          <p className="mt-2 text-lg font-medium text-primary">{state.tagline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{state.description}</p>
          <Button asChild className="mt-6">
            <Link href={directoryHref}>Find agencies in {state.name}</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto space-y-14 px-4 py-10 md:py-14">
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <AlertCircle className="h-5 w-5 text-primary" aria-hidden="true" />
            Key insurance considerations
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {state.considerations.map((note) => (
              <li
                key={note}
                className="rounded-lg border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>

        {state.relatedLinks && state.relatedLinks.length > 0 ? (
          <section>
            <h2 className="mb-2 text-2xl font-semibold">Moving to {state.name}?</h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
              Plan coverage before your move-in date. Auto policies typically need updating within
              30–90 days of establishing residency. Homeowners and renters policies should align
              with your closing or lease start. An independent agent licensed in{' '}
              {state.code ?? state.name} can compare carriers and explain state-specific requirements.
            </p>
            <div className="flex flex-wrap gap-2">
              {state.relatedLinks.map((link) => (
                <Button key={link.href} variant="outline" size="sm" asChild>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </section>
        ) : null}

        {children}
      </div>
    </>
  );
}