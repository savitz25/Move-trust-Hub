import Link from 'next/link';
import { Calculator, CheckCircle2, HelpCircle, ShieldCheck, Truck } from 'lucide-react';
import { calculatorFaqItems } from '@/lib/seo/schemas';

const tips = [
  {
    title: 'Start room-by-room',
    body: 'Bedroom, living room, kitchen, and garage lists are the most accurate way to build a complete interstate moving inventory.',
  },
  {
    title: 'Include boxes and bins',
    body: 'Packed boxes add significant cubic footage. Count medium and large boxes separately for a realistic total.',
  },
  {
    title: 'Add custom items',
    body: 'Pianos, safes, gym equipment, and antiques are easy to miss. Use the custom item field for anything not in the catalog.',
  },
  {
    title: 'Declutter before you quote',
    body: 'Remove items you plan to sell or donate first so movers price the shipment you are actually taking.',
  },
];

export function MovingCalculatorSeoSections() {
  return (
    <div className="mt-12 space-y-10 max-w-3xl mx-auto">
      {/* Trust signals */}
      <section className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="text-xl font-semibold tracking-tight mb-4">
          Why Movers Trust Prepared Customers
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Interstate movers price shipments largely on volume and weight. Arriving with a documented inventory helps you negotiate fairly and avoid surprise charges on loading day.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: ShieldCheck, label: 'FMCSA-focused research tools' },
            { icon: Calculator, label: 'Free — no signup required' },
            { icon: Truck, label: 'Truck size recommendations' },
            { icon: CheckCircle2, label: 'Inventory saved automatically' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
              <Icon className="h-4 w-4 text-primary shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-xl font-semibold tracking-tight mb-2">
          Tips for a More Accurate Move Estimate
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          A few extra minutes of inventory work can save hundreds — or thousands — when you compare{' '}
          <Link href="/companies" className="text-primary underline underline-offset-2">
            licensed interstate movers
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-xl border p-4 bg-muted/20">
              <h3 className="font-semibold text-sm mb-1.5">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-xl border bg-muted/20 p-6 sm:p-8" aria-labelledby="faq-heading">
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 id="faq-heading" className="text-xl font-semibold tracking-tight">
            Moving Calculator FAQ
          </h2>
        </div>
        <div className="space-y-5">
          {calculatorFaqItems.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-sm mb-1.5">{item.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Ready for quotes?{' '}
          <Link href="/" className="text-primary font-medium underline underline-offset-2">
            Get free interstate moving quotes
          </Link>{' '}
          on Move Trust Hub after you finish your estimate.
        </p>
      </section>
    </div>
  );
}