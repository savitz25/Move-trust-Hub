'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  buildMoveJourneyCards,
  type JourneyIntent,
  type MoveJourneyGeo,
} from '@/lib/network/journey-context';
import { cn } from '@/lib/utils';

type Props = {
  geo: MoveJourneyGeo;
  /** Default intent when page has no user selection */
  defaultIntent?: JourneyIntent;
  className?: string;
  title?: string;
};

/**
 * Stage A′ dual-card journey handoff for Move destination / state surfaces.
 * Crawlable absolute URLs only — no auth handoff, no quote funnels.
 */
export function ContinueTrustJourney({
  geo,
  defaultIntent = 'unknown',
  className,
  title = 'Continue your Trust journey',
}: Props) {
  const [intent, setIntent] = useState<JourneyIntent>(defaultIntent);
  const cards = useMemo(() => buildMoveJourneyCards(geo, intent), [geo, intent]);

  return (
    <aside
      className={cn(
        'rounded-2xl border border-border bg-gradient-to-br from-slate-50 via-background to-sky-50/40 p-5 shadow-sm sm:p-6',
        className
      )}
      aria-labelledby="continue-trust-journey-heading"
      data-journey-handoff="move-destination"
      data-journey-state={geo.stateCode}
      data-journey-county={geo.countySlug ?? ''}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Ask Trust Hub network
      </p>
      <h2
        id="continue-trust-journey-heading"
        className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl"
      >
        {title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Your destination is set to <strong className="font-medium text-foreground">{geo.placeLabel}</strong>.
        Continue into specialist research with that context — no account required.
      </p>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Housing intent for next research step"
      >
        {(
          [
            { id: 'unknown', label: 'Not sure yet' },
            { id: 'buy', label: 'I may buy' },
            { id: 'rent', label: 'I plan to rent' },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setIntent(opt.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              intent === opt.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40'
            )}
            aria-pressed={intent === opt.id}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <ul
        className={cn(
          'mt-4 grid gap-3',
          cards.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1 max-w-xl'
        )}
      >
        {cards.map((card) => (
          <li key={card.href + card.hub}>
            <a
              href={card.href}
              className={cn(
                'group flex h-full flex-col rounded-xl border px-4 py-3.5 transition-colors',
                card.priority === 'primary'
                  ? 'border-primary/30 bg-primary/5 hover:border-primary/50'
                  : 'border-border bg-card hover:border-primary/30'
              )}
              rel="noopener noreferrer"
              data-journey-hub={card.hub}
              data-journey-priority={card.priority}
              data-journey-intent={intent}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {card.priority === 'primary' ? 'Next step' : 'Also useful'}
              </span>
              <span className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary">
                {card.title}
              </span>
              <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                {card.body}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {card.cta}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Research only · No quote marketplace · Context travels in the URL for the next hub
      </p>
    </aside>
  );
}
