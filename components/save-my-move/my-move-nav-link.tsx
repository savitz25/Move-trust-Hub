'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useSaveMyMoveOptional } from '@/components/save-my-move/save-my-move-provider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type MyMoveNavLinkProps = {
  variant: 'desktop' | 'mobile-header' | 'mobile-menu';
  onNavigate?: () => void;
  className?: string;
};

/** Always visible My Move entry — badge only when signed in with saved movers. */
export function MyMoveNavLink({ variant, onNavigate, className }: MyMoveNavLinkProps) {
  const ctx = useSaveMyMoveOptional();
  const savedCount = ctx?.savedMoverSlugs?.size ?? 0;
  const showBadge = Boolean(ctx?.user) && savedCount > 0;

  const heartClass = cn(
    'shrink-0 h-4 w-4',
    showBadge && 'fill-primary text-primary'
  );

  const badge = showBadge ? (
    <Badge
      variant="default"
      className={cn(
        'min-w-[1.25rem] justify-center px-1.5 py-0 text-[10px] leading-none tabular-nums',
        variant === 'mobile-header' && 'absolute -top-0.5 -right-1 h-4 min-w-4 px-1 text-[9px]'
      )}
      aria-label={`${savedCount} saved movers`}
    >
      {savedCount > 99 ? '99+' : savedCount}
    </Badge>
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
      >
        <Heart className={heartClass} aria-hidden="true" />
        <span className="text-[10px] font-semibold leading-none tracking-tight">My Move</span>
        {badge}
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
            'flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-3 py-3',
            'font-semibold text-primary hover:bg-primary/10 active:bg-primary/15 transition-colors',
            'min-h-[48px]',
            className
          )}
        >
          <Heart className={heartClass} aria-hidden="true" />
          <span>My Move</span>
          {badge}
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

  return (
    <Link
      prefetch={false}
      href="/my-move"
      onClick={onNavigate}
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 -my-1',
        'font-semibold text-primary hover:text-primary/90 hover:bg-primary/5 transition-colors whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        className
      )}
      aria-label={showBadge ? `My Move, ${savedCount} saved movers` : 'My Move'}
      title="My Move — saved plans and shortlists"
    >
      <Heart className={heartClass} aria-hidden="true" />
      <span>My Move</span>
      {badge}
    </Link>
  );
}
