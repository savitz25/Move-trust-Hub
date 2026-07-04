import Link from 'next/link';
import { ArrowRight, Home, Landmark, ShieldCheck } from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type LifeEventBundle = {
  title: string;
  description: string;
  links: { hub: HubId; label: string; href: string }[];
};

const LIFE_EVENT_BUNDLES: Record<HubId, LifeEventBundle> = {
  move: {
    title: 'Planning a move? Cover the full life event',
    description:
      'Research movers, then line up insurance and mortgage options for your new address — all verified, all independent.',
    links: [
      { hub: 'move', label: 'Moving Calculator', href: '/moving-calculator' },
      { hub: 'insurance', label: 'Insurance in Your Market', href: '/insurance/hubs/browse' },
      { hub: 'lender', label: 'Mortgage Lenders by County', href: '/lender/local-lenders' },
    ],
  },
  lender: {
    title: 'Buying or refinancing after a move?',
    description:
      'Pair your lender research with moving logistics and insurance updates for a seamless relocation.',
    links: [
      { hub: 'lender', label: 'Mortgage Calculators', href: '/lender/calculators' },
      { hub: 'move', label: 'Compare Interstate Movers', href: '/companies' },
      { hub: 'insurance', label: 'Home & Health Insurance', href: '/insurance/directory' },
    ],
  },
  insurance: {
    title: 'New home, new coverage, new financing',
    description:
      'Health and property insurance often change with a move. Explore verified agents alongside movers and lenders.',
    links: [
      { hub: 'insurance', label: 'Health Insurance Hubs', href: '/insurance/hubs' },
      { hub: 'move', label: 'Local Movers by State', href: '/local-movers' },
      { hub: 'lender', label: 'County Mortgage Lenders', href: '/lender/local-lenders' },
    ],
  },
};

const HUB_ICONS: Record<HubId, typeof Home> = {
  move: Home,
  lender: Landmark,
  insurance: ShieldCheck,
};

export function HubCrossLinkBar({ hub }: { hub: HubId }) {
  const bundle = LIFE_EVENT_BUNDLES[hub];

  return (
    <section
      className="border-t bg-gradient-to-r from-muted/30 via-background to-muted/30 py-10"
      aria-label="Cross-hub life event resources"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{bundle.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{bundle.description}</p>
        </div>
        <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
          {bundle.links.map((link) => {
            const Icon = HUB_ICONS[link.hub];
            const href = link.hub === hub ? hubPath(hub, link.href) : hubPath(link.hub, link.href);
            return (
              <Link
                key={link.label}
                href={href}
                className="group flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium shadow-sm transition-colors hover:border-primary/40 hover:bg-muted/50"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {link.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}