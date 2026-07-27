/** Fixed calendar windows for consumer enrollment urgency (educational only). */

export type EnrollmentWindow = {
  id: string;
  label: string;
  shortLabel: string;
  /** Inclusive start month/day (1-indexed month) */
  start: { month: number; day: number };
  /** Inclusive end month/day */
  end: { month: number; day: number };
  /** When true, window can cross calendar year (start after end month) */
  crossesYear?: boolean;
  href: string;
  note?: string;
};

export const ENROLLMENT_WINDOWS: EnrollmentWindow[] = [
  {
    id: 'medicare-aep',
    label: 'Medicare Annual Enrollment',
    shortLabel: 'Medicare AEP',
    start: { month: 10, day: 15 },
    end: { month: 12, day: 7 },
    href: '/hubs/medicare',
    note: 'Change Advantage, Part D, or switch to Medigap (with underwriting rules).',
  },
  {
    id: 'aca-oe',
    label: 'ACA Open Enrollment',
    shortLabel: 'ACA OE',
    start: { month: 11, day: 1 },
    end: { month: 1, day: 15 },
    crossesYear: true,
    href: '/hubs/aca',
    note: 'Marketplace plans for most states. Covered California and a few states use state windows.',
  },
];

function dateInYear(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export type EnrollmentCountdown = {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  note?: string;
  /** Days remaining until window ends (0 if last day). Null if closed. */
  daysRemaining: number | null;
  /** Days until next window opens */
  daysUntilOpen: number | null;
  status: 'open' | 'upcoming' | 'closed';
  endsLabel: string;
};

function windowBounds(window: EnrollmentWindow, ref: Date): { start: Date; end: Date } {
  const y = ref.getFullYear();
  if (window.crossesYear) {
    // e.g. Nov 1 – Jan 15
    const startThisYear = dateInYear(y, window.start.month, window.start.day);
    const endNextYear = dateInYear(y + 1, window.end.month, window.end.day);
    const startPrevYear = dateInYear(y - 1, window.start.month, window.start.day);
    const endThisYear = dateInYear(y, window.end.month, window.end.day);

    if (ref >= startThisYear || ref <= endThisYear) {
      // In Nov–Dec of y, or Jan 1–15 of y
      if (ref.getMonth() + 1 <= window.end.month) {
        return { start: startPrevYear, end: endThisYear };
      }
      return { start: startThisYear, end: endNextYear };
    }
    // Between Jan 16 and Oct 31
    return { start: startThisYear, end: endNextYear };
  }

  const start = dateInYear(y, window.start.month, window.start.day);
  const end = dateInYear(y, window.end.month, window.end.day);
  if (ref > end) {
    return {
      start: dateInYear(y + 1, window.start.month, window.start.day),
      end: dateInYear(y + 1, window.end.month, window.end.day),
    };
  }
  return { start, end };
}

function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function getEnrollmentCountdowns(now = new Date()): EnrollmentCountdown[] {
  return ENROLLMENT_WINDOWS.map((window) => {
    const { start, end } = windowBounds(window, now);
    const open = now >= start && now <= end;

    if (open) {
      const remaining = Math.max(0, daysBetween(now, end));
      return {
        id: window.id,
        label: window.label,
        shortLabel: window.shortLabel,
        href: window.href,
        note: window.note,
        daysRemaining: remaining,
        daysUntilOpen: null,
        status: 'open' as const,
        endsLabel: end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
    }

    const untilOpen = Math.max(0, daysBetween(now, start));
    return {
      id: window.id,
      label: window.label,
      shortLabel: window.shortLabel,
      href: window.href,
      note: window.note,
      daysRemaining: null,
      daysUntilOpen: untilOpen,
      status: untilOpen <= 60 ? ('upcoming' as const) : ('closed' as const),
      endsLabel: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  });
}
