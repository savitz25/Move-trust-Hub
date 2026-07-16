import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Shield, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FaqSection } from '@/components/seo/faq-section';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { homepageFaqItems } from '@/lib/seo/schemas';
import { formatAttributedReviewsLabel } from '@/lib/trust/site-stats';

const ReviewHighlights = dynamic(
  () =>
    import('@/components/trust/review-highlights').then((m) => m.ReviewHighlights),
  { loading: () => <div className="min-h-[280px] border-t" aria-hidden="true" /> }
);

export function HomeBelowFold() {
  return (
    <>
      <section className="container mx-auto px-4 py-14 content-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="text-primary font-semibold tracking-widest text-xs mb-2">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Research movers with confidence
          </h2>
          <p className="mt-3 text-muted-foreground">
            Verify licensing, compare reputation, and understand costs — without lead forms or
            paid placements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: '01',
              title: 'Estimate your move size',
              desc: (
                <>
                  Use our{' '}
                  <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                    moving calculator
                  </Link>{' '}
                  to build a room-by-room inventory before contacting carriers.
                </>
              ),
              icon: Truck,
            },
            {
              step: '02',
              title: 'Verify FMCSA licensing',
              desc: (
                <>
                  Browse{' '}
                  <Link href="/companies" className="text-primary underline underline-offset-2">
                    verified interstate movers
                  </Link>{' '}
                  or{' '}
                  <Link href="/verify-dot" className="text-primary underline underline-offset-2">
                    look up any USDOT number
                  </Link>{' '}
                  on the official SAFER system.
                </>
              ),
              icon: Shield,
            },
            {
              step: '03',
              title: 'Compare before you book',
              desc: (
                <>
                  Use our{' '}
                  <Link href="/compare" className="text-primary underline underline-offset-2">
                    comparison tool
                  </Link>{' '}
                  to weigh reputation scores, complaints, and services side by side.
                </>
              ),
              icon: ArrowRight,
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-sm font-mono text-primary mb-1">STEP {item.step}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-y py-14 content-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">
              Free tools
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Plan your interstate move
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <Link prefetch={false} href="/verify-dot" className="group">
              <Card className="h-full p-6 hover:border-primary/50 transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  Verify a DOT number
                </h3>
                <p className="text-sm text-muted-foreground">
                  Look up any mover&apos;s USDOT or MC number and jump to the official FMCSA SAFER
                  report.
                </p>
              </Card>
            </Link>

            <Link prefetch={false} href="/moving-calculator" className="group">
              <Card className="h-full p-6 hover:border-primary/50 transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  Moving calculator
                </h3>
                <p className="text-sm text-muted-foreground">
                  Build your inventory by room and get instant cubic footage estimates.
                </p>
              </Card>
            </Link>

            <Link prefetch={false} href="/companies" className="group">
              <Card className="h-full p-6 hover:border-primary/50 transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  Mover directory
                </h3>
                <p className="text-sm text-muted-foreground">
                  Filter FMCSA-licensed carriers by reputation, price, services, and complaints.
                </p>
              </Card>
            </Link>

            <Link prefetch={false} href="/compare" className="group">
              <Card className="h-full p-6 hover:border-primary/50 transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  Compare side-by-side
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select up to four movers and compare licensing, ratings, and services.
                </p>
              </Card>
            </Link>
          </div>

          <p className="text-center mt-6 text-sm">
            <Link href="/resources" className="text-primary font-medium hover:underline">
              Browse all moving guides →
            </Link>
          </p>
        </div>
      </section>

      <ReviewHighlights
        className="py-14 border-t"
        compact
        title="Featured review highlights"
        subtitle={`${formatAttributedReviewsLabel()} on Move Trust Hub — named reviewer excerpts from verified movers, not inflated industry totals.`}
      />

      <div className="container mx-auto px-4 pb-14">
        <InternalLinkHub className="mt-4" />
      </div>

      <div className="content-auto border-t">
        <FaqSection title="Frequently asked questions" items={homepageFaqItems} />
      </div>
    </>
  );
}