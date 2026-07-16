import type { ReactNode } from 'react';
import {
  InsuranceHeroIcon,
  LendingHeroIcon,
  MovingHeroIcon,
} from '@/components/hub/hero-hub-icons';
import { HUB_HERO_PRESETS } from '@/lib/hub/hero-presets';
import type { HubId } from '@/lib/hub/types';
import { cn } from '@/lib/utils';

const HUB_HERO_ICONS = {
  move: MovingHeroIcon,
  lender: LendingHeroIcon,
  insurance: InsuranceHeroIcon,
} as const;

export type HubHeroBannerProps = {
  hub: HubId;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Two-column hub hero — copy left, section label + circular concept icon right.
 */
export function HubHeroBanner({
  hub,
  eyebrow,
  title,
  description,
  children,
  className,
}: HubHeroBannerProps) {
  const preset = HUB_HERO_PRESETS[hub];
  const Icon = HUB_HERO_ICONS[hub];

  return (
    <section className={cn('relative border-b bg-[#F7F8FA]', className)}>
      <div className="container mx-auto px-4 py-12 sm:py-14 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <div className="order-1 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <div className="mb-5 flex justify-center lg:justify-start">{eyebrow}</div>
            <div className="space-y-5">{title}</div>
            <div className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              {description}
            </div>
            {children ? <div className="mt-8 space-y-5">{children}</div> : null}
          </div>

          <div className="order-2 hidden justify-center sm:flex lg:justify-end">
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <p
                className={cn(
                  'text-center text-lg font-bold tracking-tight text-[#0A2540] sm:text-xl md:text-2xl',
                  preset.accentText
                )}
              >
                {preset.sectionLabel}
              </p>

              <div
                className={cn(
                  'relative flex h-44 w-44 items-center justify-center rounded-full bg-white sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-64 lg:w-64',
                  'shadow-trust-lg ring-1 ring-black/[0.06]'
                )}
              >
                <div
                  className={cn(
                    'absolute inset-2 rounded-full bg-gradient-to-br opacity-90',
                    preset.ringGradient
                  )}
                  aria-hidden="true"
                />
                <div
                  className="relative z-10 flex h-[58%] w-[58%] items-center justify-center rounded-full bg-white/90 p-4 shadow-sm ring-1 ring-black/[0.04]"
                  role="img"
                  aria-label={preset.iconLabel}
                >
                  <Icon className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}