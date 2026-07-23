'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CheckCircle2, PartyPopper, Sparkles } from 'lucide-react';
import {
  JOURNEY_STEPS,
  journeyProgressPercent,
  milestoneForPath,
  readJourneyState,
  recordMilestone,
  type JourneyMilestone,
} from '@/lib/ux/journey';
import type { HubId } from '@/lib/hub/types';

export function JourneyTracker({ hub }: { hub: HubId }) {
  const pathname = usePathname();
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const existing = readJourneyState();
    if (existing?.milestones) setMilestones(existing.milestones);
  }, []);

  useEffect(() => {
    if (hub !== 'move') return;
    const milestone = milestoneForPath(pathname);
    if (!milestone) return;

    const before = readJourneyState()?.milestones ?? [];
    if (before.includes(milestone)) return;

    const next = recordMilestone(milestone, 'move');
    setMilestones(next.milestones);
    setCelebrate(true);
    const timer = window.setTimeout(() => setCelebrate(false), 3200);
    return () => window.clearTimeout(timer);
  }, [pathname, hub]);

  const progress = useMemo(() => journeyProgressPercent(milestones), [milestones]);

  // Keep verification tool free of progress chrome.
  if (hub !== 'move' || milestones.length === 0 || pathname === '/verify-dot') return null;

  return (
    <div
      className="border-b bg-gradient-to-r from-emerald-500/5 via-background to-primary/5"
      aria-label="Your moving research progress"
    >
      <div className="container mx-auto flex flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          <span className="font-medium">Move journey</span>
          <span className="text-muted-foreground">
            {milestones.length} of {JOURNEY_STEPS.length} steps explored
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted sm:w-40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold tabular-nums text-primary">{progress}%</span>
        </div>
      </div>

      {celebrate ? (
        <div className="animate-slide-down overflow-hidden border-t border-emerald-200/50 bg-emerald-50/60 celebrate-pulse">
          <p className="container mx-auto flex items-center gap-2 px-4 py-2 text-sm text-emerald-800">
            <PartyPopper className="h-4 w-4 shrink-0" aria-hidden="true" />
            Nice work — you&apos;re building a smarter move plan. Keep going!
            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          </p>
        </div>
      ) : null}
    </div>
  );
}