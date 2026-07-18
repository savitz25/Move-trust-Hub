'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { resolveMyMoveContinuePathAction } from '@/actions/my-move-password';
import { consumeStashedPostLoginRedirect } from '@/lib/save-my-move/redirect';

/**
 * After sign-in, navigate to a stashed path if the auth callback did not already
 * land the user there (belt-and-suspenders for ?next= preservation).
 * Resolves optional My Move create-password offer for client-side auth (e.g. Google GIS).
 */
export function usePostLoginRedirect(user: User | null) {
  const router = useRouter();
  const handledForUser = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      handledForUser.current = null;
      return;
    }
    if (handledForUser.current === user.id) return;

    const target = consumeStashedPostLoginRedirect();
    if (!target) return;

    handledForUser.current = user.id;

    let cancelled = false;
    void (async () => {
      try {
        const { path } = await resolveMyMoveContinuePathAction(target);
        if (cancelled) return;
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (path === current) return;
        router.replace(path);
      } catch {
        if (cancelled) return;
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (target !== current) router.replace(target);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, router]);
}