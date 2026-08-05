'use client';

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { HubLinkId } from '@/lib/network/handoff-href';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  toHub: HubLinkId;
  nextPath?: string;
  children: ReactNode;
};

/**
 * Cross-hub network link that prefers POST handoff with the browser access token
 * so SSO works even when Move session cookies are not sent on GET /start.
 * Falls back to plain GET href (guest → skip:no_session without code).
 */
export function NetworkHandoffLink({
  href,
  toHub,
  nextPath,
  children,
  onClick,
  ...rest
}: Props) {
  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();

    try {
      const supabase = createBrowserSupabaseClient();
      const session = supabase
        ? (await supabase.auth.getSession()).data.session
        : null;

      if (session?.access_token) {
        const res = await fetch('/api/auth/network-handoff/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            to: toHub,
            next: nextPath,
            access_token: session.access_token,
          }),
        });
        const data = (await res.json().catch(() => null)) as {
          ok?: boolean;
          redirectUrl?: string;
          fallbackUrl?: string;
          reason?: string;
        } | null;

        if (data?.ok && data.redirectUrl) {
          window.location.assign(data.redirectUrl);
          return;
        }

        console.warn('[NetworkHandoffLink] POST handoff failed', data?.reason, data);
        if (data?.fallbackUrl) {
          window.location.assign(data.fallbackUrl);
          return;
        }
      }
    } catch (err) {
      console.warn('[NetworkHandoffLink] POST error, falling back to GET', err);
    }

    // Guest or POST failure → GET start (guest-safe plain 307)
    window.location.assign(href);
  }

  return (
    <a
      href={href}
      data-network-handoff="start"
      data-network-to={toHub}
      onClick={(e) => void handleClick(e)}
      {...rest}
    >
      {children}
    </a>
  );
}
