import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { RelatedGuides } from '@/components/resources/guide-footer';

export const metadata = {
  title: 'Why Knowing the Size and Weight of Your Move Is the Most Important First Step',
  description:
    'Learn why accurate cubic footage and weight estimates protect you from lowball quotes, inflated prices, and moving day surprises. Use our free calculator first.',
  openGraph: {
    title: 'Why Knowing the Size and Weight of Your Move Is the Most Important First Step',
    description:
      'Stop guessing your move size. Understand why inventory and weight matter before you request quotes from interstate movers.',
  },
};

const benefits = [
  'Get an accurate estimate of total cubic feet and weight',
  'Understand exactly what you\'re moving — and what you can leave behind or sell',
  'Receive realistic quotes from reputable companies',
  'Avoid being taken advantage of by dishonest estimators',
];

const calculatorOutputs = [
  { icon: Calculator, label: 'Total cubic footage' },
  { icon: Scale, label: 'Estimated weight' },
  { icon: Truck, label: 'Recommended truck size' },
];

export default function MoveSizeWeightGuide() {
  return (
    <>
    <ArticleSchema
      title="Why Knowing the Size and Weight of Your Move Is the Most Important First Step"
      description="Learn why accurate cubic footage and weight estimates protect you from lowball quotes and inflated prices."
      path="/resources/move-size-weight"
    />
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all resources
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
              Planning Guide
            </Badge>
            <span className="text-xs text-muted-foreground">5 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] text-balance">
            Why Knowing the Size and Weight of Your Move Is the Most Important First Step
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Getting moving quotes can be confusing and stressful. The gap between estimates often comes down to one thing: whether anyone actually measured your move.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-12">
        {/* Price gap callout */}
        <section className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            The quote gap
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-muted/60 px-5 py-4 text-center">
              <div className="text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
                $6,000
              </div>
              <p className="text-xs text-muted-foreground mt-1">Low estimate</p>
            </div>
            <div className="rounded-xl bg-muted/60 px-5 py-4 text-center">
              <div className="text-3xl font-semibold tracking-tight text-rose-600 dark:text-rose-400">
                $18,000
              </div>
              <p className="text-xs text-muted-foreground mt-1">High estimate</p>
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Same move, wildly different numbers. The answer is almost always the same:{' '}
            <strong className="text-foreground font-medium">
              they don&apos;t know the actual size and weight of your belongings
            </strong>
            .
          </p>
        </section>

        {/* Problem section */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            The problem with &quot;guessing&quot; your move size
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Most moving companies ask for a quick verbal or email description. Without accurate measurements, they are forced to estimate — and that creates two predictable traps.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40">
                  <TrendingDown className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-sm">Underbidding companies</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                They deliberately lowball cubic footage to win the job, then hit you with surprise charges later.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200/80 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/40">
                  <TrendingUp className="h-4 w-4 text-rose-700 dark:text-rose-400" />
                </div>
                <h3 className="font-semibold text-sm">Padding companies</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                They inflate size and weight to justify a much higher price, making cheaper quotes look like scams.
              </p>
            </div>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            Either way, the customer loses — overpaying upfront or dealing with hidden fees and stress on moving day.
          </p>
        </section>

        {/* Knowledge is power */}
        <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Knowledge is power</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                The best way to protect yourself is simple:{' '}
                <strong className="text-foreground font-medium">
                  know your move before you talk to any mover
                </strong>
                .
              </p>
            </div>
          </div>

          <p className="text-sm font-medium text-muted-foreground mb-3">
            A detailed inventory calculator helps you:
          </p>
          <ul className="space-y-2.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Calculator section */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            How to get an accurate move size
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our free Moving Calculator on Move Trust Hub makes this easy. Go room by room, list your items, and let the tool do the math.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {calculatorOutputs.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border bg-card px-4 py-5 text-center shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Armed with this information, you can confidently speak with multiple companies and compare apples to apples.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Take control of your move today
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-1">
            Don&apos;t let movers control the conversation with vague estimates.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Spend 15–20 minutes creating your inventory first — a well-prepared customer almost always gets better service and better pricing.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="/moving-calculator">
                Use the Free Moving Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Get Free Moving Quotes</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/companies">Browse Trusted Movers</Link>
            </Button>
          </div>
        </section>

        <RelatedGuides slugs={['how-to-choose', 'packing-checklist', 'routes', 'scams', 'checklist']} />

        <p className="text-xs text-muted-foreground text-center pb-4">
          Move Trust Hub — Trusted Directory &amp; Reviews for Interstate Movers
        </p>
      </div>
    </div>
    </>
  );
}