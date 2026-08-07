import { ArrowUpRight, Building2, Landmark, Scale } from 'lucide-react';
import { NetworkHandoffLink } from '@/components/network/network-handoff-link';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { networkHubHref } from '@/lib/network/handoff-href';
import { cn } from '@/lib/utils';

const ACTIONS = [
  {
    id: 'lender' as const,
    label: 'Lender Trust Hub',
    description: 'NMLS research for home financing',
    icon: Landmark,
    nextPath: '/my-lending',
  },
  {
    id: 'insurance' as const,
    label: 'Insurance Trust Hub',
    description: 'DOI / NAIC agency research',
    icon: Building2,
    nextPath: '/my-insurance',
  },
] as const;

const CARD_CLASS = cn(
  'group flex h-full min-h-[7.5rem] flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-5',
  'transition-[background-color,border-color,box-shadow] duration-200',
  'hover:border-primary/45 hover:bg-white/[0.09]',
  'hover:shadow-[0_8px_24px_-10px_rgb(255_90_31_/_0.28)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540]'
);

/**
 * Phase 4 — dark navy network / trust block (RSC).
 * Copy/layout SSR; only NetworkHandoffLink is a client island for SSO handoff.
 */
export function NetworkTrustBlock() {
  const cardClass = CARD_CLASS;

  return (
    <section
      className="bg-[#0A2540] text-slate-100"
      aria-labelledby="network-trust-heading"
    >
      <div className="move-section-inner move-section !py-12 md:!py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="network-trust-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Part of the Ask Trust Hub network
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            Common ownership, separated research and listing rules.
            <span className="sm:block"> No paid placements, no lead fees.</span>
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const href = networkHubHref(action.id, true, action.nextPath);
            return (
              <li key={action.id}>
                <NetworkHandoffLink
                  href={href}
                  toHub={action.id}
                  nextPath={action.nextPath}
                  className={cardClass}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white">
                    {action.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-slate-400">
                    {action.description}
                  </span>
                </NetworkHandoffLink>
              </li>
            );
          })}

          <li>
            <a
              href={ASK_TRUST_HUB.promiseUrl}
              rel="noopener noreferrer"
              className={cardClass}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Scale className="h-4 w-4" aria-hidden />
              </span>
              <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white">
                Independence Policy
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </span>
              <span className="mt-1 text-xs leading-relaxed text-slate-400">
                How the network stays independent
              </span>
            </a>
          </li>
        </ul>

        <p className="mx-auto mt-7 max-w-xl text-center text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          Independent research only — always verify current licensing on FMCSA and state sources.
        </p>
      </div>
    </section>
  );
}
