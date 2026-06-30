import Link from 'next/link';
import { ArrowRight, Car, MapPin, Sun, Truck } from 'lucide-react';
import { RouteCalculatorEmbed } from '@/components/resources/route-calculator-embed';
import type { RouteGuide } from '@/lib/resources/routes';
import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';

export function ExtendedRouteGuide({
  content,
  route,
}: {
  content: RouteGuideExtendedContent;
  route?: RouteGuide;
}) {
  return (
    <>
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">{content.heroSubheadline}</p>
      {content.introParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">{content.whyMove.heading}</h2>
        {content.whyMove.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {content.whyMove.highlights.map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-4">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">{content.destinations.heading}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{content.destinations.intro}</p>
        <div className="space-y-6">
          {content.destinations.cities.map((city) => (
            <div key={city.name} className="rounded-xl border bg-muted/30 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{city.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{city.tagline}</p>
                </div>
                <Link
                  href={city.hubPath}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
                >
                  {city.linkLabel ?? 'City guide'}{' '}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {city.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">{content.costBreakdown.heading}</h2>
        {content.costBreakdown.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <div className="overflow-x-auto rounded-xl border mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Home size</th>
                <th className="text-left p-3 font-medium">Cubic ft.</th>
                <th className="text-left p-3 font-medium">Cost range</th>
                <th className="text-left p-3 font-medium">Transit days</th>
              </tr>
            </thead>
            <tbody>
              {content.costBreakdown.table.map((row) => (
                <tr key={row.homeSize} className="border-b last:border-0">
                  <td className="p-3">{row.homeSize}</td>
                  <td className="p-3 text-muted-foreground">{row.cubicFt}</td>
                  <td className="p-3 font-medium">{row.costRange}</td>
                  <td className="p-3 text-muted-foreground">{row.transitDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{content.costBreakdown.note}</p>
      </section>

      {route ? <RouteCalculatorEmbed route={route} /> : null}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">{content.timeline.heading}</h2>
        {content.timeline.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {content.timeline.phases.map((phase) => (
            <div key={phase.label} className="rounded-xl border bg-card p-4">
              <div className="text-sm font-medium mb-1">{phase.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{phase.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-muted/30 p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
            Seasonal considerations
          </h3>
          <ul className="space-y-3">
            {content.timeline.seasons.map((season) => (
              <li key={season.period} className="text-sm">
                <span className="font-medium">{season.period}:</span>{' '}
                <span className="text-muted-foreground">{season.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">{content.pickupTips.heading}</h2>
        {content.pickupTips.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <ul className="space-y-2 text-muted-foreground">
          {content.pickupTips.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">{content.deliveryTips.heading}</h2>
        {content.deliveryTips.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <ul className="space-y-2 text-muted-foreground">
          {content.deliveryTips.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" aria-hidden="true" />
          {content.carShipping.heading}
        </h2>
        {content.carShipping.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-sm text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
        <ul className="space-y-2 text-sm text-muted-foreground">
          {content.carShipping.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {content.faqItems.map((item) => (
            <div key={item.question} className="rounded-xl border bg-card p-5">
              <h3 className="font-medium mb-2">{item.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-10">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="font-semibold mb-2">
              {content.ctaHeading ?? 'Get quotes for your interstate move'}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Build your inventory in our{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                moving calculator
              </Link>
              , compare{' '}
              <Link href="/companies" className="text-primary underline underline-offset-2">
                FMCSA-licensed interstate carriers
              </Link>
              , or{' '}
              <Link href="/" className="text-primary underline underline-offset-2">
                request free matched quotes
              </Link>{' '}
              within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <section className="mb-10 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          Related guides & destinations
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {content.internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border bg-background p-3 text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="font-medium">{link.label}</span>
              {link.description && (
                <span className="block text-xs text-muted-foreground mt-1">{link.description}</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}