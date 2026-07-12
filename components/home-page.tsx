import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowRight, Truck } from 'lucide-react';
import { FaqSection } from '@/components/seo/faq-section';
import { homepageFaqItems } from '@/lib/seo/schemas';
import { TrustBadges } from '@/components/trust/trust-badges';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { HubHeroBanner } from '@/components/hub/hub-hero-banner';
import { formatAttributedReviewsLabel } from '@/lib/trust/site-stats';
import { HERO_TRUST_EYEBROW } from '@/lib/trust/site-messaging';

export function HomePage({ mapSection }: { mapSection?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <HubHeroBanner
        hub="move"
        eyebrow={
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 sm:px-4 sm:text-sm">
            <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate sm:whitespace-normal">{HERO_TRUST_EYEBROW}</span>
          </div>
        }
        title={
          <h1 className="text-3xl font-semibold leading-[1.12] tracking-tighter sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Compare FMCSA-Licensed Interstate Movers
          </h1>
        }
        description={
          <>
            An independent directory for researching{' '}
            <Link
              href="/resources/fmcsa"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              FMCSA-licensed movers
            </Link>
            , attributable reviews, and move costs. Use our{' '}
            <Link
              href="/moving-calculator"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              moving calculator
            </Link>{' '}
            and{' '}
            <Link
              href="/companies"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              mover directory
            </Link>{' '}
            — we never sell your information to carriers.
          </>
        }
      >
        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <Link href="/companies" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="h-12 min-h-[48px] w-full gap-2 px-8 text-base sm:h-14 sm:px-10"
            >
              Find Movers <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/moving-calculator" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="h-12 min-h-[48px] w-full gap-2 px-8 text-base sm:h-14"
            >
              Open Calculator
            </Button>
          </Link>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Independent directory — not affiliated with listed movers.
        </p>
      </HubHeroBanner>

      <div className="container mx-auto px-4 pt-6">
        <TrustBadges variant="compact" className="mb-4" />
        <TrustToolsBar className="mb-2" />
      </div>

      {mapSection}

      <section className="container mx-auto px-4 py-14">
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
    </div>
  );
}