import Link from 'next/link';
import { SchemaInjector } from '@/components/hub/schema-injector';

export type CalculatorFaqItem = {
  question: string;
  answer: string;
};

type CalculatorPageShellProps = {
  title: string;
  description: string;
  methodology: string[];
  faq: CalculatorFaqItem[];
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode;
  schema?: Record<string, unknown>;
};

export function CalculatorPageShell({
  title,
  description,
  methodology,
  faq,
  breadcrumbs,
  children,
  schema,
}: CalculatorPageShellProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      {schema ? <SchemaInjector data={schema} /> : null}
      <SchemaInjector data={faqSchema} />

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {index > 0 ? ' / ' : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
        </header>

        <section aria-label="Calculator tool" className="mb-12">
          {children}
        </section>

        <section aria-labelledby="methodology-heading" className="mb-12 rounded-xl border bg-muted/20 p-6">
          <h2 id="methodology-heading" className="text-xl font-semibold mb-4">
            How this calculator works
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
            {methodology.map((line) => (
              <li key={line.slice(0, 48)}>{line}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading" className="rounded-xl border p-6">
          <h2 id="faq-heading" className="text-xl font-semibold mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-medium text-foreground">{item.question}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}