'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const MESSAGES: Record<string, string> = {
  google_not_enabled:
    'Google sign-in is not enabled on Supabase project uvqkyupfnpswdozmuzih. Dashboard → Authentication → Providers → Google: toggle on, save App ID/Secret, then retry.',
  facebook_not_enabled:
    'Facebook sign-in was rejected by Supabase. In project uvqkyupfnpswdozmuzih: Authentication → Providers → Facebook — confirm toggle is on, App ID and App Secret are saved, and Meta redirect URI is https://uvqkyupfnpswdozmuzih.supabase.co/auth/v1/callback.',
  facebook_redirect:
    'Facebook redirect misconfigured. Add https://uvqkyupfnpswdozmuzih.supabase.co/auth/v1/callback to Valid OAuth Redirect URIs in your Meta app, and https://www.movetrusthub.com/auth/callback to Supabase redirect URLs.',
  google_redirect:
    'Google redirect misconfigured. Confirm https://www.movetrusthub.com/auth/callback is in Supabase Auth → URL Configuration.',
  google: 'Google sign-in failed. Try the email link option, or try again in a few minutes.',
  facebook:
    'Facebook sign-in failed. Confirm your Meta app is Live (or you are a Test User), then try Google or the email link.',
  not_configured: 'Sign-in is temporarily unavailable — Supabase env vars are missing on this deployment.',
};

export function AuthErrorToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get('auth');
    if (auth !== 'error') return;

    const reason = searchParams.get('reason') ?? 'google';
    toast.error(MESSAGES[reason] ?? MESSAGES.google);
  }, [searchParams]);

  return null;
}