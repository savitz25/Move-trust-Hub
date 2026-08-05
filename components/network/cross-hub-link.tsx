'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  rewriteCrossHubHref,
  type HubLinkId,
} from '@/lib/network/handoff-href';
import { useSaveMyMoveOptional } from '@/components/save-my-move/save-my-move-provider';

type CrossHubLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  children: ReactNode;
  currentHub?: HubLinkId;
};

export function CrossHubLink({
  href,
  children,
  currentHub = 'move',
  rel,
  ...rest
}: CrossHubLinkProps) {
  const ctx = useSaveMyMoveOptional();
  const signedIn = Boolean(ctx?.user) && !ctx?.loading;
  const resolved = rewriteCrossHubHref(href, signedIn, currentHub);
  const isHandoff = resolved.startsWith('/api/auth/network-handoff/');

  return (
    <a
      href={resolved}
      rel={isHandoff ? undefined : rel ?? 'noopener noreferrer'}
      {...rest}
    >
      {children}
    </a>
  );
}
