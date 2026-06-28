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
  testimonials,
  countyLabel,
}: {
  testimonials: CountyTestimonial[];
  countyLabel: string;
}) {
  if (!testimonials.length) return null;

  return (
    <section
      className="mb-10 rounded-2xl border border-primary/15 bg-primary/5 p-6"
      aria-labelledby="county-testimonials-heading"
    >
      <h2
        id="county-testimonials-heading"
        className="text-lg font-semibold tracking-tight mb-2 flex items-center gap-2"
      >
        <MessageSquareQuote className="h-5 w-5 text-primary" aria-hidden="true" />
        Local move experiences in {countyLabel}
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        Curated, county-specific customer feedback from verified recent moves. Quotes
        are editorially selected — always verify current Google reviews, FMCSA licensing,
        and written estimates before booking.
      </p>
      <div className="space-y-5">
        {testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.name}-${testimonial.location}`}
            className="rounded-xl border bg-background/60 p-4"
          >
            <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{testimonial.name}</span>
              <span aria-hidden="true">·</span>
              <span>{testimonial.location}</span>
              {testimonial.moveType && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                    {testimonial.moveType}
                  </span>
                </>
              )}
              <span className="ml-auto font-medium text-foreground">
                {testimonial.rating}★
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
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