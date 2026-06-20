import Link from 'next/link';
import { DollarSign, Lightbulb, MessageSquareQuote, HelpCircle } from 'lucide-react';
import type { CountyCostGuide, CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';

export function CountyCostSection({
  countyLabel,
  stateName,
  costs,
}: {
  countyLabel: string;
  stateName: string;
  costs: CountyCostGuide;
}) {
  return (
    <section className="mb-10 rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" aria-hidden="true" />
        Average local moving costs in {countyLabel}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Pricing varies by home size, distance within {stateName}, stairs, and packing needs.
        These ranges reflect typical local move costs in {countyLabel} for {new Date().getFullYear()}:
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Studio / 1-Bedroom
          </div>
          <div className="text-sm font-semibold">{costs.studioRange}</div>
        </div>
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            3–4+ Bedroom Home
          </div>
          <div className="text-sm font-semibold">{costs.familyRange}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Typical crew rate:</span> {costs.avgHourly}.{' '}
        {costs.note}
      </p>
      <p className="text-sm text-muted-foreground mt-3">
        Leaving {stateName}? Use our{' '}
        <Link href="/moving-calculator" className="text-primary font-medium hover:underline">
          moving calculator
        </Link>{' '}
        for interstate volume estimates, then compare{' '}
        <Link href="/companies" className="text-primary font-medium hover:underline">
          FMCSA-licensed carriers
        </Link>
        .
      </p>
    </section>
  );
}

export function CountyTipsSection({
  countyLabel,
  tips,
}: {
  countyLabel: string;
  tips: string[];
}) {
  return (
    <section className="mb-10 rounded-2xl border bg-muted/20 p-6">
      <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
        Tips for moving in {countyLabel}
      </h2>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {tip}
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground mt-4">
        New to vetting movers? Read our{' '}
        <Link href="/resources/how-to-choose" className="text-primary font-medium hover:underline">
          how to choose a mover guide
        </Link>{' '}
        and{' '}
        <Link href="/resources/scams" className="text-primary font-medium hover:underline">
          scam avoidance checklist
        </Link>
        .
      </p>
    </section>
  );
}

export function CountyTestimonialSection({
  testimonial,
}: {
  testimonial: CountyTestimonial;
}) {
  return (
    <section className="mb-10 rounded-2xl border border-primary/15 bg-primary/5 p-6">
      <h2 className="text-lg font-semibold tracking-tight mb-3 flex items-center gap-2">
        <MessageSquareQuote className="h-5 w-5 text-primary" aria-hidden="true" />
        What movers say about planning ahead
      </h2>
      <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer className="mt-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{testimonial.name}</span>
        {' · '}
        {testimonial.location}
        {' · '}
        {testimonial.rating}★
      </footer>
    </section>
  );
}

export function CountyFaqSection({
  countyLabel,
  faqItems,
}: {
  countyLabel: string;
  faqItems: CountyFaqItem[];
}) {
  return (
    <section className="mb-10 rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        FAQ: Local movers in {countyLabel}
      </h2>
      <div className="space-y-5">
        {faqItems.map((item) => (
          <div key={item.question}>
            <h3 className="text-sm font-semibold mb-1.5">{item.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}