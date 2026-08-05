'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  rewriteCrossHubHref,
  type HubLinkId,
} from '@/lib/network/handoff-href';
import { NetworkHandoffLink } from '@/components/network/network-handoff-link';

type CrossHubLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  children: ReactNode;
  currentHub?: HubLinkId;
};

function parseHandoffStart(href: string): { to: HubLinkId; next?: string } | null {
  if (!href.startsWith('/api/auth/network-handoff/start')) return null;
  try {
    const u = new URL(href, 'https://www.movetrusthub.com');
    const to = u.searchParams.get('to') as HubLinkId | null;
    if (to !== 'move' && to !== 'insurance' && to !== 'lender') return null;
    return { to, next: u.searchParams.get('next') || undefined };
  } catch {
    return null;
  }
}

/**
 * Anchor that rewrites specialist-hub URLs through SSO handoff start.
 * Uses NetworkHandoffLink (POST + access_token) when resolved to /start.
 */
export function CrossHubLink({
  href,
  children,
  currentHub = 'move',
  rel,
  ...rest
}: CrossHubLinkProps) {
  const resolved = rewriteCrossHubHref(href, true, currentHub);
  const handoff = parseHandoffStart(resolved);

  if (handoff) {
    return (
      <NetworkHandoffLink
        href={resolved}
        toHub={handoff.to}
        nextPath={handoff.next}
        {...rest}
      >
        {children}
      </NetworkHandoffLink>
    );
  }

  return (
    <a href={resolved} rel={rel ?? 'noopener noreferrer'} {...rest}>
      {children}
    </a>
  );
}
