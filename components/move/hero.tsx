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
 * Network belonging is carried by TrustMark + Network block + footer (not triple-repeated).
 */
export function MoveHero() {
  return (
    <div className="relative">
      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {MOVE_HERO_EYEBROW}
          </p>
          <div className="mt-2.5 flex justify-center lg:justify-start">
            <TrustMark />
          </div>

          <h1 className="mt-4 text-balance font-semibold leading-[1.08] tracking-tighter text-[#0A2540] text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] dark:text-white">
            {MOVE_HERO_HEADLINE}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg lg:mx-0 dark:text-slate-300">
            {MOVE_HERO_SUPPORT}
          </p>

          <HeroFeatureChips className="mt-5 sm:mt-6 lg:justify-start" />

          <div className="mt-7 sm:mt-8 lg:hidden">
            <HeroRouteForm />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute -right-6 -top-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          {/* Soft mark only — form stays primary */}
          <HeroIllustration className="pointer-events-none absolute -right-2 -top-4 w-[min(100%,240px)] opacity-50" />
          <div className="relative pt-12 xl:pt-14">
            <HeroRouteForm />
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use MoveHero */
export { MoveHero as HomeHeroSsr };
