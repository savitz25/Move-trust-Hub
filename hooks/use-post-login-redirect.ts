'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { consumeStashedPostLoginRedirect } from '@/lib/save-my-move/redirect';

/**
 * After sign-in, navigate to a stashed path if the auth callback did not already
 * land the user there (belt-and-suspenders for ?next= preservation).
 */
export function usePostLoginRedirect(user: User | null) {
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const target = consumeStashedPostLoginRedirect();
    if (!target) return;

    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (target === current) return;

    router.replace(target);
  }, [user, router]);
}