import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { HubBreadcrumbs } from '@/components/hub/templates/hub-breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import {
  buildCollectionPageSchema,
  buildFaqSchema,
  buildTemplateSchemaGraph,
} from '@/lib/hub/templates/schemas';
import type { HubId } from '@/lib/hub/types';
import type { CalculatorCardData, TemplateFaqItem } from '@/lib/hub/templates/types';

export type CalculatorLandingTemplateProps = {
  hub: HubId;
  /** Hub-relative path for canonical URLs and schema (e.g. `/calculators`). */
  path?: string;
  title: string;
  description: string;
  calculators: CalculatorCardData[];
  faq?: TemplateFaqItem[];
  eyebrow?: string;
  children?: React.ReactNode;
};

export function CalculatorLandingTemplate({
  hub,
  path = '/calculators',
  title,
  description,
  calculators,
  faq = [],
  eyebrow,
  children,
}: CalculatorLandingTemplateProps) {
  const accent =
    hub === 'insurance' ? 'text-emerald-600' : hub === 'lender' ? 'text-[#3B82F6]' : 'text-primary';
  const breadcrumbs = hubSectionBreadcrumbs(hub, 'Calculators', title);
  const faqNode = buildFaqSchema(faq);
  const schema = buildTemplateSchemaGraph({
    hub,
    path,
    breadcrumbs,
    nodes: [
      buildCollectionPageSchema(hub, path, title, description),
      ...(faqNode ? [faqNode] : []),
    ],
  });

  return (
    <>
      <SchemaInjector data={schema} />
      <HubBreadcrumbs hub={hub} items={breadcrumbs} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 max-w-3xl">
          {eyebrow ? (
            <p className={`mb-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} calc={calc} />
          ))}
        </div>

        {children}

        {faq.length > 0 ? (
          <section
            aria-labelledby="calc-landing-faq"
            className="mt-14 max-w-3xl rounded-xl border p-6"
          >
            <h2 id="calc-landing-faq" className="mb-4 text-xl font-semibold">
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium">{item.question}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

function CalculatorCard({ calc }: { calc: CalculatorCardData }) {
  const Icon = calc.icon;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Icon className="mb-2 h-8 w-8 text-primary" aria-hidden="true" />
        <CardTitle>{calc.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="flex-1 text-sm text-muted-foreground">{calc.description}</p>
        <Button variant="outline" className="mt-4 w-fit" asChild>
          <Link href={calc.href}>Open calculator</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export type { LucideIcon };