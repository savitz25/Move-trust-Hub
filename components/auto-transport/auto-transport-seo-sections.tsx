import Link from 'next/link';
import { Car, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

const tips = [
  {
    title: 'Book early in peak season',
    body: 'Summer and snowbird corridors fill carrier capacity quickly. Booking 2–4 weeks ahead often improves pricing and pickup windows.',
  },
  {
    title: 'Confirm insurance before pickup',
    body: 'Ask for the carrier’s cargo insurance limits and whether gap coverage is available for high-value vehicles.',
  },
  {
    title: 'Document vehicle condition',
    body: 'Take dated photos at pickup and delivery. This protects you if damage claims arise after enclosed or open transport.',
  },
  {
    title: 'Compare broker vs. carrier quotes',
    body: 'Brokers coordinate capacity while carriers haul the load. Compare FMCSA standing, reviews, and total door-to-door price.',
  },
];

export function AutoTransportSeoSections() {
  return (
    <div className="mt-14 space-y-10 max-w-3xl mx-auto">
      <section className="rounded-xl border bg-card p-6 sm:p-8 shadow-sm" aria-labelledby="auto-trust-heading">
        <h2 id="auto-trust-heading" className="text-xl font-semibold tracking-tight mb-4">
          Ship with Licensed, Insured Carriers
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Auto transport brokers and carriers operating interstate must register with FMCSA. Use our directory and calculator to research pricing, then verify USDOT authority before booking.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: ShieldCheck, label: 'FMCSA licensing checks' },
            { icon: Truck, label: 'Open & enclosed carriers' },
            { icon: Car, label: 'Sedans, SUVs, trucks & vans' },
            { icon: CheckCircle2, label: 'Free instant estimates' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
              <Icon className="h-4 w-4 text-primary shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="auto-tips-heading">
        <h2 id="auto-tips-heading" className="text-xl font-semibold tracking-tight mb-2">
          Tips for a Smoother Vehicle Shipment
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          A few minutes of prep can prevent delays and surprise fees when you compare{' '}
          <Link href="/auto-transport#directory" className="text-primary underline underline-offset-2">
            auto transport companies
          </Link>
          .
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-xl border bg-card p-4">
              <h3 className="font-semibold text-sm mb-1.5">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}