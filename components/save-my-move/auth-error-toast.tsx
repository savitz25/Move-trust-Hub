'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const MESSAGES: Record<string, string> = {
  google_not_enabled:
    'Google sign-in is not enabled on the Supabase project yet. Use the email link option, or enable Google under Authentication → Providers in project uvqkyupfnpswdozmuzih.',
  facebook_not_enabled:
    'Facebook sign-in is not enabled yet. Use Google or the email link option, or enable Facebook under Authentication → Providers in project uvqkyupfnpswdozmuzih.',
  google: 'Google sign-in failed. Try the email link option, or try again in a few minutes.',
  facebook: 'Facebook sign-in failed. Try another sign-in option, or try again in a few minutes.',
  not_configured: 'Sign-in is temporarily unavailable.',
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