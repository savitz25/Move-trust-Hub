import { HelpCircle } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({
  title,
  items,
  id = 'faq-heading',
}: {
  title: string;
  items: FaqItem[];
  id?: string;
}) {
  return (
    <section className="container mx-auto px-4 py-14 max-w-3xl border-t" aria-labelledby={id}>
      <div className="flex items-center gap-2 mb-6 justify-center">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 id={id} className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.question} className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold mb-2">{item.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}