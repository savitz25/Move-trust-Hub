'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ONE_ACCOUNT_ENABLED, useMyTrustHubHref } from '@/components/my-trusthub/my-trusthub-origin';
import { cn } from '@/lib/utils';

type Variant = 'desktop' | 'mobile-header' | 'drawer';

const CANONICAL_ACCOUNT_HREF = 'https://www.asktrusthub.com/my';

/**
 * Neutral link to the My TrustHub page on Ask. Desktop, mobile header, and
 * the mobile drawer always show it. ONE_ACCOUNT_ENABLED still controls the
 * one-account wording only; it does not hide this link or turn parent Save on.
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
  const accountHref = useMyTrustHubHref('/my');
  const href = ONE_ACCOUNT_ENABLED ? accountHref : CANONICAL_ACCOUNT_HREF;
  const title = ONE_ACCOUNT_ENABLED
    ? 'My TrustHub — your one TrustHub account and saved research'
    : 'My TrustHub';
  const marker = ONE_ACCOUNT_ENABLED
    ? { 'data-mth-account-entry': 'true' }
    : { 'data-mth-neutral-account': 'true' };

  if (variant === 'mobile-header') {
    return (
      <a
        href={href}
        onClick={onNavigate}
        className={cn('th-btn-icon relative text-[var(--th-accent,#4f46e5)]', className)}
        aria-label="My TrustHub"
        title={title}
        {...marker}
      >
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </a>
    );
  }

  if (variant === 'drawer') {
    return (
      <a href={href} onClick={onNavigate} className={cn('th-drawer-link', className)} title={title} {...marker}>
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
      {...marker}
    >
      <ShieldCheck className="h-4 w-4 text-[var(--th-accent,#4f46e5)]" aria-hidden="true" />
      My TrustHub
    </a>
  );
}
