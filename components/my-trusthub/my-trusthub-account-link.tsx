'use client';

import { ShieldCheck } from 'lucide-react';
import { ONE_ACCOUNT_ENABLED, useMyTrustHubHref } from '@/components/my-trusthub/my-trusthub-origin';
import { cn } from '@/lib/utils';

type Variant = 'desktop' | 'mobile-header' | 'drawer';

/**
 * One account across TrustHub. Move presents My TrustHub as the account entry;
 * My Move stays a specialist workspace for plans, inventories, reports and
 * comparisons. Rendered only when parent Save is enabled for this deployment.
 */
export function MyTrustHubAccountLink({
  variant,
  onNavigate,
  className,
}: {
  variant: Variant;
  onNavigate?: () => void;
  className?: string;
}) {
  const href = useMyTrustHubHref('/my');
  if (!ONE_ACCOUNT_ENABLED) return null;
  const title = 'My TrustHub — your one TrustHub account and saved research';

  if (variant === 'mobile-header') {
    return (
      <a
        href={href}
        onClick={onNavigate}
        className={cn('th-btn-icon relative text-[var(--th-accent,#4f46e5)]', className)}
        aria-label="My TrustHub"
        title={title}
        data-mth-account-entry="true"
      >
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </a>
    );
  }

  if (variant === 'drawer') {
    return (
      <a href={href} onClick={onNavigate} className={cn('th-drawer-link', className)} title={title} data-mth-account-entry="true">
        <ShieldCheck className="mr-2 h-4 w-4 text-[var(--th-accent,#4f46e5)]" aria-hidden="true" />
        My TrustHub
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onNavigate}
      className={cn('th-btn-secondary !h-11 !text-sm', className)}
      title={title}
      data-mth-account-entry="true"
    >
      <ShieldCheck className="h-4 w-4 text-[var(--th-accent,#4f46e5)]" aria-hidden="true" />
      My TrustHub
    </a>
  );
}
