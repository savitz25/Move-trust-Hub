'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  JOURNEY_STEPS,
  nextRecommendedStep,
  readJourneyState,
  type JourneyMilestone,
} from '@/lib/ux/journey';
import type { HubId } from '@/lib/hub/types';

const PAGE_TIPS: Record<string, string> = {
  '/': 'Hey — no rush. Start with our calculator to learn your move size before contacting carriers.',
  '/moving-calculator':
    'Pro tip: room-by-room inventory beats guessing. Movers price on cubic feet, not vibes.',
  '/companies':
    'Compare at least three carriers. Reputation scores weigh complaints, years, and verified reviews.',
  '/compare': 'Look past the lowest bid — check FMCSA complaint ratios and insurance options too.',
  '/verify-dot': 'If the DOT number doesn’t match the company name, walk away. Seriously.',
  '/review': 'Real moves, real feedback. Attributed reviews help the whole community.',
  '/local-movers': 'County guides show who actually operates where you’re headed — not just who advertises.',
  '/resources': 'Every guide here is independent. No carrier paid us to write any of this.',
};

function coachTipForPath(pathname: string, completed: JourneyMilestone[]): string {
  if (PAGE_TIPS[pathname]) return PAGE_TIPS[pathname];
  if (pathname.startsWith('/company/')) {
    return 'Check their USDOT, read recent reviews, and compare with two other carriers before booking.';
  }
  const next = nextRecommendedStep(completed);
  return next?.coachTip ?? JOURNEY_STEPS[0].coachTip;
}

export function MoveCoachTip({ hub }: { hub: HubId }) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true);
  const [completed, setCompleted] = useState<JourneyMilestone[]>([]);

  useEffect(() => {
    const sessionKey = `mth-coach-dismiss-${pathname}`;
    setDismissed(sessionStorage.getItem(sessionKey) === '1');
    setCompleted(readJourneyState()?.milestones ?? []);
  }, [pathname]);

  const tip = useMemo(() => coachTipForPath(pathname, completed), [pathname, completed]);
  const next = useMemo(() => nextRecommendedStep(completed), [completed]);

  if (hub !== 'move' || dismissed) return null;

  function handleDismiss() {
    sessionStorage.setItem(`mth-coach-dismiss-${pathname}`, '1');
    setDismissed(true);
  }

  return (
    <aside
      className="animate-fade-in-up border-b border-amber-200/60 bg-gradient-to-r from-amber-50/80 via-background to-amber-50/40"
      aria-label="Moving coach tip"
    >
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm leading-snug text-foreground">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Coach says: </strong>
            {tip}
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {next ? (
            <Button size="sm" variant="outline" asChild className="h-8">
              <Link href={next.href}>Next: {next.label}</Link>
            </Button>
          ) : null}
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss coach tip"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}