import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck } from 'lucide-react';
import { TrustBadges } from '@/components/trust/trust-badges';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HubHeroBanner } from '@/components/hub/hub-hero-banner';
import { HomeBelowFold } from '@/components/home/home-below-fold';
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

      {/* SSR how-it-works / FAQ for SEO + LCP; ReviewHighlights stays lazy inside */}
      <HomeBelowFold />
    </div>
  );
}