import { ASK_TRUST_HUB, NETWORK_HUBS, type NetworkHubId } from '@/lib/network/ask-trust-hub';
import { ASK_NETWORK_OWNERSHIP_SHORT } from '@/lib/network/standard-version';
import { TrustMark } from '@/components/network/trust-mark';
import { cn } from '@/lib/utils';

type AskNetworkSealProps = {
  currentHub?: NetworkHubId;
  showSiblings?: boolean;
  className?: string;
  inverted?: boolean;
};

/**
 * Network seal for Move / Insurance / Lender footers.
 * Clarifies common ownership + separated research — not unaffiliated operators.
 */
export function AskNetworkSeal({
  currentHub,
  showSiblings = true,
  className,
  inverted = false,
}: AskNetworkSealProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-3xl px-4 text-center',
        inverted ? 'text-white/70' : 'text-muted-foreground',
        className
      )}
    >
      <p
        className={cn(
          'text-sm font-semibold tracking-tight',
          inverted ? 'text-white' : 'text-foreground'
        )}
      >
        Part of the{' '}
        <a
          href={ASK_TRUST_HUB.url}
          className={cn(
            'underline underline-offset-2',
            inverted ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/80'
          )}
          rel="noopener noreferrer"
        >
          Ask Trust Hub network
        </a>
      </p>
      <p className="mt-1.5 text-xs font-medium leading-relaxed">
        {ASK_NETWORK_OWNERSHIP_SHORT}
      </p>
      <p className="mt-1 text-xs leading-relaxed">
        <a
          href={ASK_TRUST_HUB.promiseUrl}
          className="underline underline-offset-2 hover:opacity-90"
          rel="noopener noreferrer"
        >
          Independence policy
        </a>
        {' · '}
        <a
          href={ASK_TRUST_HUB.revenueUrl}
          className="underline underline-offset-2 hover:opacity-90"
          rel="noopener noreferrer"
        >
          How we make money
        </a>
        {' · '}
        <a
          href={ASK_TRUST_HUB.methodologyUrl}
          className="underline underline-offset-2 hover:opacity-90"
          rel="noopener noreferrer"
        >
          Ask methodology
        </a>
      </p>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <TrustMark
          className={
            inverted
              ? 'border-white/25 bg-white/10 text-white/85 hover:border-white/40 hover:text-white'
              : undefined
          }
        />
      </p>

      {showSiblings ? (
        <ul
          className={cn(
            'mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px]',
            inverted ? 'text-white/55' : 'text-muted-foreground/80'
          )}
          aria-label="Ask Trust Hub network sites"
        >
          <li>
            <a
              href={ASK_TRUST_HUB.url}
              className="underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              Ask Trust Hub
            </a>
            <span className="ml-1 opacity-70">(parent)</span>
          </li>
          {NETWORK_HUBS.map((hub) => (
            <li key={hub.id} className="flex items-center gap-1">
              <span className="opacity-40" aria-hidden>
                ·
              </span>
              {currentHub === hub.id ? (
                <span>
                  {hub.proseName}
                  <span className="ml-1 opacity-70">(you are here)</span>
                </span>
              ) : (
                <a
                  href={hub.url}
                  className="underline-offset-2 hover:underline"
                  rel="noopener noreferrer"
                >
                  {hub.proseName}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
