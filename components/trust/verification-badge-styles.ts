import { cn } from '@/lib/utils';

/** Shared sizing for Directory / FMCSA / BBB trust badges. */
export type VerificationBadgeSize = 'compact' | 'profile';

const SIZE_CLASSES: Record<VerificationBadgeSize, string> = {
  compact: 'h-5 min-h-[1.25rem] px-1.5 text-[10px] font-medium leading-none gap-0.5',
  profile: 'h-6 min-h-[1.5rem] px-2 text-[11px] font-medium leading-none gap-1',
};

const ICON_CLASSES: Record<VerificationBadgeSize, string> = {
  compact: 'h-2.5 w-2.5 shrink-0',
  profile: 'h-3 w-3 shrink-0',
};

export function verificationBadgeClasses(
  size: VerificationBadgeSize,
  tone: 'success' | 'warning' | 'critical' | 'muted' | 'neutral',
  className?: string
): string {
  const toneClasses = {
    success:
      'border-emerald-600/35 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-950/35 dark:text-emerald-300 dark:border-emerald-500/30',
    warning:
      'border-amber-600/35 bg-amber-50 text-amber-900 hover:bg-amber-100/80 dark:bg-amber-950/35 dark:text-amber-200 dark:border-amber-500/30',
    critical:
      'border-red-600/35 bg-red-50 text-red-800 hover:bg-red-100/80 dark:bg-red-950/35 dark:text-red-300 dark:border-red-500/30',
    muted:
      'border-border/70 bg-muted/50 text-muted-foreground hover:bg-muted/70',
    neutral:
      'border-border/80 bg-background text-foreground hover:bg-muted/40',
  }[tone];

  return cn(
    'inline-flex items-center rounded-full border font-medium shadow-none',
    SIZE_CLASSES[size],
    toneClasses,
    className
  );
}

export function verificationBadgeIconClass(size: VerificationBadgeSize): string {
  return ICON_CLASSES[size];
}

export function verificationBadgeLinkClass(): string {
  return 'inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';
}