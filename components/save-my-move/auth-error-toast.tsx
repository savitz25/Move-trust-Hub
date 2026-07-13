'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const PROJECT_ID = 'uvqkyupfnpswdozmuzih';
const SUPABASE_CALLBACK = `https://${PROJECT_ID}.supabase.co/auth/v1/callback`;
const SITE_CALLBACK = 'https://www.movetrusthub.com/auth/callback';

function facebookNotEnabledMessage(project: string, detail?: string | null): string {
  const lines = [
    `Facebook sign-in failed on Supabase project ${project}.`,
    'Fix in Dashboard → Authentication → Providers → Facebook:',
    '1. Toggle Facebook ON',
    '2. Re-enter App ID and App Secret from Meta',
    '3. Click Save (wait 30 seconds)',
    `4. Meta app → Valid OAuth Redirect URIs: ${SUPABASE_CALLBACK}`,
    `5. Supabase → Redirect URLs includes: ${SITE_CALLBACK}`,
  ];
  if (detail?.toLowerCase().includes('provider is not enabled')) {
    lines.push(
      'Supabase returned "provider is not enabled" — credentials may not be saved on this project.'
    );
  }
  return lines.join(' ');
}

const MESSAGES: Record<string, (project: string, detail?: string | null) => string> = {
  google_not_enabled: (project) =>
    `Google sign-in is not enabled on Supabase project ${project}. Dashboard → Authentication → Providers → Google: toggle on, save credentials, retry.`,
  facebook_not_enabled: facebookNotEnabledMessage,
  facebook_redirect: (project) =>
    `Facebook redirect misconfigured (project ${project}). Meta redirect URI: ${SUPABASE_CALLBACK}. Supabase redirect URL: ${SITE_CALLBACK}.`,
  google_redirect: (project) =>
    `Google redirect misconfigured (project ${project}). Add ${SITE_CALLBACK} to Supabase Auth → URL Configuration.`,
  google: () =>
    'Google sign-in failed. Try the email link option, or try again in a few minutes.',
  facebook: (project) =>
    `Facebook sign-in failed (project ${project}). Confirm Meta app is Live or you are a Test User, then retry.`,
  not_configured: () =>
    'Sign-in is temporarily unavailable — Supabase env vars are missing on this deployment.',
};

export function AuthErrorToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get('auth');
    if (auth !== 'error') return;

    const reason = searchParams.get('reason') ?? 'google';
    const project = searchParams.get('project') ?? PROJECT_ID;
    const detail = searchParams.get('detail');

    const builder = MESSAGES[reason] ?? MESSAGES.google;
    toast.error(builder(project, detail), { duration: 12000 });
  }, [searchParams]);

  return null;
}