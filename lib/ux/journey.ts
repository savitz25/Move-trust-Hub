export type JourneyMilestone = 'estimate' | 'research' | 'verify' | 'compare' | 'review';

export type JourneyState = {
  milestones: JourneyMilestone[];
  lastHub: 'move' | 'lender' | 'insurance';
  updatedAt: string;
};

const STORAGE_KEY = 'mth-journey-v1';

export const JOURNEY_STEPS: {
  id: JourneyMilestone;
  label: string;
  coachTip: string;
  href: string;
}[] = [
  {
    id: 'estimate',
    label: 'Size your move',
    coachTip: 'Start with cubic footage — it keeps quotes honest and protects you from lowball bids.',
    href: '/moving-calculator',
  },
  {
    id: 'research',
    label: 'Browse movers',
    coachTip: 'Look beyond star ratings. FMCSA complaint ratios tell the real story.',
    href: '/companies',
  },
  {
    id: 'verify',
    label: 'Verify DOT',
    coachTip: 'A quick USDOT check takes 30 seconds and can save you thousands.',
    href: '/verify-dot',
  },
  {
    id: 'compare',
    label: 'Compare side-by-side',
    coachTip: 'Line up 3–5 carriers on reputation, pricing, and services before you call.',
    href: '/compare',
  },
  {
    id: 'review',
    label: 'Read real reviews',
    coachTip: 'Attributed reviews from verified moves help you spot patterns other sites miss.',
    href: '/review',
  },
];

const PATH_MILESTONES: Record<string, JourneyMilestone> = {
  '/moving-calculator': 'estimate',
  '/companies': 'research',
  '/verify-dot': 'verify',
  '/compare': 'compare',
  '/review': 'review',
};

export function milestoneForPath(pathname: string): JourneyMilestone | null {
  if (PATH_MILESTONES[pathname]) return PATH_MILESTONES[pathname];
  if (pathname.startsWith('/company/')) return 'research';
  return null;
}

export function readJourneyState(): JourneyState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JourneyState;
  } catch {
    return null;
  }
}

export function writeJourneyState(state: JourneyState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function recordMilestone(
  milestone: JourneyMilestone,
  hub: JourneyState['lastHub'] = 'move'
): JourneyState {
  const existing = readJourneyState();
  const milestones = new Set(existing?.milestones ?? []);
  milestones.add(milestone);
  const next: JourneyState = {
    milestones: [...milestones],
    lastHub: hub,
    updatedAt: new Date().toISOString(),
  };
  writeJourneyState(next);
  return next;
}

export function nextRecommendedStep(completed: JourneyMilestone[]): (typeof JOURNEY_STEPS)[number] | null {
  return JOURNEY_STEPS.find((step) => !completed.includes(step.id)) ?? null;
}

export function journeyProgressPercent(completed: JourneyMilestone[]): number {
  return Math.round((completed.length / JOURNEY_STEPS.length) * 100);
}