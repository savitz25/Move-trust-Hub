'use client';

import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

type MyInsuranceNavLinkProps = {
  variant: 'desktop' | 'mobile-header' | 'mobile-menu';
  onNavigate?: () => void;
  className?: string;
  active?: boolean;
};

/**
 * My Insurance header control — same visual family as My Move / My Lending.
 */
export function MyInsuranceNavLink({
  variant,
  onNavigate,
  className,
  active = false,
}: MyInsuranceNavLinkProps) {
  if (variant === 'mobile-header') {
    return (
      <Link
        prefetch={false}
        href="/my-insurance"
        onClick={onNavigate}
        className={cn(
          'relative inline-flex flex-col items-center justify-center gap-0.5',
          'min-h-11 min-w-[3.25rem] px-1.5 rounded-md text-primary',
          'hover:bg-primary/10 active:bg-primary/15 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          active && 'bg-primary/10',
          className
        )}
        aria-label="My Insurance"
        aria-current={active ? 'page' : undefined}
        title="My Insurance — research passport (sign in optional on HQ)"
      >
        <Bookmark className="h-4 w-4" aria-hidden="true" />
        <span className="text-[10px] font-semibold leading-none tracking-tight">
          My Insurance
        </span>
      </Link>
    );
  }

  if (variant === 'mobile-menu') {
    return (
      <Link
        prefetch={false}
        href="/my-insurance"
        onClick={onNavigate}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-3',
          'font-semibold text-foreground hover:bg-muted/60 transition-colors',
          'min-h-[48px]',
          active && 'border-primary/40 bg-primary/5',
          className
        )}
        aria-current={active ? 'page' : undefined}
      >
        <Bookmark className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>My Insurance</span>
      </Link>
    );
  }

  return (
    <Link
      prefetch={false}
      href="/my-insurance"
      onClick={onNavigate}
      className={cn(
        'relative inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3',
        'text-xs font-semibold text-foreground whitespace-nowrap',
        'hover:border-primary/40 hover:bg-primary/5 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        active && 'border-primary/40 bg-primary/5',
        className
      )}
      aria-label="My Insurance"
      aria-current={active ? 'page' : undefined}
      title="My Insurance — saved agencies and research tools"
    >
      <Bookmark className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      <span>My Insurance</span>
    </Link>
  );
}
