'use client';

import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { useSaveMyMoveOptional } from '@/components/save-my-move/save-my-move-provider';
import { cn } from '@/lib/utils';

type MyMoveNavLinkProps = {
  variant: 'desktop' | 'mobile-header' | 'mobile-menu';
  onNavigate?: () => void;
  className?: string;
};

/**
 * My Move header control — visual family matches My Insurance / My Lending
 * (bookmark outline control). Badge only when signed in + account count > 0.
 * No separate top-nav Sign in.
 */
export function MyMoveNavLink({ variant, onNavigate, className }: MyMoveNavLinkProps) {
  const ctx = useSaveMyMoveOptional();
  const savedCount = ctx?.savedMoverSlugs?.size ?? 0;
  const showBadge = Boolean(ctx?.user) && !ctx?.loading && savedCount > 0;

  const badgeEl = showBadge ? (
    <span
      className={cn(
        'rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground tabular-nums',
        variant === 'mobile-header' && 'absolute -right-2 -top-1 px-1 text-[9px]'
      )}
      aria-label={`${savedCount} saved movers`}
    >
      {savedCount > 99 ? '99+' : savedCount}
    </span>
  ) : null;

  if (variant === 'mobile-header') {
    return (
      <Link
        prefetch={false}
        href="/my-move"
        onClick={onNavigate}
        className={cn(
          'relative inline-flex flex-col items-center justify-center gap-0.5',
          'min-h-11 min-w-[3.25rem] px-1.5 rounded-md text-primary',
          'hover:bg-primary/10 active:bg-primary/15 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          className
        )}
        aria-label={showBadge ? `My Move, ${savedCount} saved movers` : 'My Move'}
        title={
          ctx?.user
            ? 'My Move — research HQ'
            : 'My Move — research passport (sign in optional on HQ)'
        }
      >
        <span className="relative">
          <Bookmark className="h-4 w-4" aria-hidden="true" />
          {badgeEl}
        </span>
        <span className="text-[10px] font-semibold leading-none tracking-tight">My Move</span>
      </Link>
    );
  }

  if (variant === 'mobile-menu') {
    return (
      <div className="mb-2 space-y-1">
        <Link
          prefetch={false}
          href="/my-move"
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-3',
            'font-semibold text-foreground hover:bg-muted/60 transition-colors',
            'min-h-[48px]',
            className
          )}
        >
          <Bookmark className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>My Move</span>
          {badgeEl}
        </Link>
        <Link
          prefetch={false}
          href="/my-move/reports"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Move Reports
        </Link>
      </div>
    );
  }

  // Desktop — outline control matching Insurance/Lender “My [Hub]”
  return (
    <Link
      prefetch={false}
      href="/my-move"
      onClick={onNavigate}
      className={cn(
        'relative inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3',
        'text-xs font-semibold text-foreground whitespace-nowrap',
        'hover:border-primary/40 hover:bg-primary/5 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        className
      )}
      aria-label={showBadge ? `My Move, ${savedCount} saved movers` : 'My Move'}
      title={
        ctx?.user
          ? 'My Move — saved plans and shortlists'
          : 'My Move — research passport (sign in optional on HQ)'
      }
    >
      <Bookmark className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      <span>My Move</span>
      {badgeEl}
    </Link>
  );
}
