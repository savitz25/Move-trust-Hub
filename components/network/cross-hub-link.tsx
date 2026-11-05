'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  crossHubTarget,
  rewriteCrossHubHref,
  type HubLinkId,
} from '@/lib/network/handoff-href';
import { NetworkHandoffLink } from '@/components/network/network-handoff-link';

type CrossHubLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  children: ReactNode;
  currentHub?: HubLinkId;
};

/**
 * Crawlable href is the public hub URL. Signed-in clicks still POST SSO.
 */
export function CrossHubLink({
  href,
  children,
  currentHub = 'move',
  rel,
  ...rest
}: CrossHubLinkProps) {
  const resolved = rewriteCrossHubHref(href, true, currentHub);
  const handoff = crossHubTarget(resolved, currentHub);

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
