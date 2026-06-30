import Link from 'next/link';
import { Card } from '@/components/ui/card';

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

type Props = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
};

export function LegalDocument({ title, subtitle, lastUpdated, sections }: Props) {
  return (
    <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
        Legal
      </p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">{subtitle}</p>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: {lastUpdated}</p>

      <nav className="mt-8 rounded-lg border bg-muted/30 p-4 text-sm" aria-label="On this page">
        <p className="font-medium mb-2">On this page</p>
        <ul className="space-y-1 text-muted-foreground">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-foreground underline-offset-2 hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10 prose prose-neutral max-w-none">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm text-muted-foreground leading-relaxed mt-3">
                {p}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <Card className="mt-12 p-5 text-sm text-muted-foreground">
        Questions about these policies?{' '}
        <Link href="/contact" className="text-primary font-medium underline underline-offset-2">
          Contact us
        </Link>{' '}
        or email{' '}
        <a href="mailto:hello@movetrusthub.com" className="text-primary underline underline-offset-2">
          hello@movetrusthub.com
        </a>
        .
      </Card>
    </div>
  );
}