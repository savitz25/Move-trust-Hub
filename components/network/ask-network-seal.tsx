import { ASK_TRUST_HUB, NETWORK_HUBS, type NetworkHubId } from '@/lib/network/ask-trust-hub';
import { cn } from '@/lib/utils';

type AskNetworkSealProps = {
  /** Current hub — shown as plain text “You are here” in optional sibling list */
  currentHub?: NetworkHubId;
  /** Show sibling hub list under the seal */
  showSiblings?: boolean;
  className?: string;
  /** Dark footer surfaces */
  inverted?: boolean;
};

/**
 * Identical network seal for Move, Insurance, and Lender footers.
 * Title links to Ask independence policy.
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
      <p className={cn('text-sm font-semibold tracking-tight', inverted ? 'text-white' : 'text-foreground')}>
        Part of the{' '}
        <a
          href={ASK_TRUST_HUB.promiseUrl}
          className={cn(
            'underline underline-offset-2',
            inverted ? 'text-white hover:text-white/90' : 'text-foreground hover:text-foreground/80'
          )}
          rel="noopener noreferrer"
        >
          Ask Trust Hub network
        </a>
      </p>
      <p className="mt-1 text-xs leading-relaxed">
        Independently operated · No paid placements
        {' · '}
        <a
          href={ASK_TRUST_HUB.promiseUrl}
          className="underline underline-offset-2 hover:opacity-90"
          rel="noopener noreferrer"
        >
          Independence policy
        </a>
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
