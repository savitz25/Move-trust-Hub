'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

function isSafeInternalPath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  if (path.includes('://')) return false;
  return true;
}

type MethodologyBackNavProps = {
  /** Used when no ?from= or same-origin referrer is available */
  fallbackHref: string;
  fallbackLabel?: string;
  className?: string;
};

function MethodologyBackNavInner({
  fallbackHref,
  fallbackLabel = 'Back to Directory',
  className,
}: MethodologyBackNavProps) {
  const searchParams = useSearchParams();
  const [href, setHref] = useState(fallbackHref);
  const [label, setLabel] = useState(fallbackLabel);

  useEffect(() => {
    const from = searchParams.get('from');
    const fromLabel = searchParams.get('fromLabel');

    if (from && isSafeInternalPath(from)) {
      setHref(from);
      setLabel(fromLabel?.trim() ? `Back to ${fromLabel.trim()}` : 'Back to previous page');
      return;
    }

    try {
      if (typeof document !== 'undefined' && document.referrer) {
        const ref = new URL(document.referrer);
        if (
          ref.origin === window.location.origin &&
          ref.pathname + ref.search !== window.location.pathname + window.location.search
        ) {
          setHref(`${ref.pathname}${ref.search}${ref.hash}`);
          setLabel('Back to previous page');
          return;
        }
      }
    } catch {
      // ignore invalid referrer
    }

    setHref(fallbackHref);
    setLabel(fallbackLabel);
  }, [searchParams, fallbackHref, fallbackLabel]);

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm',
        'transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label.startsWith('←') ? label : `← ${label}`}</span>
    </Link>
  );
}

/**
 * Back control for methodology / transparency pages across Trust Hub family.
 * Prefer `?from=` + `?fromLabel=` from tooltip “Learn more” links; fall back to referrer.
 */
export function MethodologyBackNav(props: MethodologyBackNavProps) {
  return (
    <Suspense
      fallback={
        <Link
          href={props.fallbackHref}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-sm font-medium shadow-sm',
            props.className
          )}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>← {props.fallbackLabel ?? 'Back to Directory'}</span>
        </Link>
      }
    >
      <MethodologyBackNavInner {...props} />
    </Suspense>
  );
}