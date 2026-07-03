import Link from 'next/link';
import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { testimonials, toolLinks } from '@/lib/trust/trust-data';
import { cn } from '@/lib/utils';

type TestimonialsSectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 2 | 4;
};

export function TestimonialsSection({
  title = 'Directory Research Highlights',
  subtitle =
    'Attributed Google review excerpts hosted on Move Trust Hub with named reviewers. These are not aggregated industry totals and are not emitted as fabricated AggregateRating schema. Submit moderated reviews on our review page.',
  className,
  columns = 2,
}: TestimonialsSectionProps) {
  const gridClass = columns === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2';

  return (
    <section
      className={cn('bg-muted/30 py-16 border-y', className)}
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 id="testimonials-heading" className="text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{subtitle}</p>
        </div>

        <div className={cn('grid gap-5', gridClass)}>
          {testimonials.map((testimonial) => (
            <Card key={`${testimonial.name}-${testimonial.date ?? testimonial.location}`} className="p-6 h-full flex flex-col">
              <Quote className="h-5 w-5 text-primary/60 mb-3" aria-hidden="true" />
              <blockquote className="text-base italic leading-relaxed mb-4 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mb-3">
                <StarRating rating={testimonial.rating} />
              </div>

              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                  {'source' in testimonial && testimonial.source ? (
                    <> · {testimonial.source} review</>
                  ) : null}
                  {'companyName' in testimonial && testimonial.companyName ? (
                    <> · {testimonial.companyName}</>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {testimonial.toolsUsed.map((tool) => {
                  const link = toolLinks[tool];
                  return (
                    <Link
                      key={tool}
                      href={link.href}
                      className="text-[11px] rounded-full bg-primary/10 text-primary px-2.5 py-1 font-medium hover:bg-primary/15 transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}