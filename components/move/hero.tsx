import { NetworkBelongingLine } from '@/components/network/network-belonging-line';
import { TrustMark } from '@/components/network/trust-mark';
import { HeroFeatureChips } from '@/components/move/hero-feature-chips';
import { HeroIllustration } from '@/components/move/hero-illustration';
import { HeroRouteForm } from '@/components/move/hero-route-form';
import {
  MOVE_HERO_EYEBROW,
  MOVE_HERO_HEADLINE,
  MOVE_HERO_SUPPORT,
} from '@/lib/design/move-design-system';

/**
 * Homepage hero — SSR H1 (LCP) + form-forward Move Plan card.
 * Controlled orange energy; independent research tone (not marketplace).
 */
export function MoveHero() {
  return (
    <div className="relative">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        {/* Copy column */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {MOVE_HERO_EYEBROW}
          </p>
          <NetworkBelongingLine className="mt-2 lg:text-left" />
          <div className="mt-2 flex justify-center lg:justify-start">
            <TrustMark />
          </div>

          <h1 className="mt-4 text-balance font-semibold leading-[1.08] tracking-tighter text-[#0A2540] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] dark:text-white">
            {MOVE_HERO_HEADLINE}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#3d4f63] sm:text-lg lg:mx-0 dark:text-slate-300">
            {MOVE_HERO_SUPPORT}
          </p>

          <HeroFeatureChips className="mt-6 lg:justify-start" />

          {/* Form under copy on mobile; right column on lg */}
          <div className="mt-8 lg:hidden">
            <HeroRouteForm />
          </div>
        </div>

        {/* Form + soft illustration (desktop) */}
        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <HeroIllustration className="pointer-events-none absolute -right-4 -top-6 w-[min(100%,280px)] opacity-90" />
          <div className="relative pt-16">
            <HeroRouteForm />
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use MoveHero — kept for import stability during redesign. */
export { MoveHero as HomeHeroSsr };
