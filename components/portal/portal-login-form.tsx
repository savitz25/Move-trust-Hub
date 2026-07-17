'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { resolvePortalContinuePathAction } from '@/actions/portal-password';
import { PortalGoogleSignIn } from '@/components/portal/portal-google-sign-in';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Mode = 'magic' | 'password';

export function PortalLoginForm({
  next = '/portal',
  initialError = null,
}: {
  next?: string;
  initialError?: string | null;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('magic');
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(initialError);

  function onMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
      .trim()
      .toLowerCase();

    startTransition(async () => {
      try {
        const res = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, next }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          success?: boolean;
        };
        if (!res.ok) {
          setError(
            data.error ??
              'Could not send the sign-in link. Please try again in a few minutes.'
          );
          return;
        }
        setMessage(
          'Check your email for a secure Move Trust Hub sign-in link (from Move Trust Hub / notifications@movetrusthub.com). It expires shortly and signs you into the Verified Mover Portal.'
        );
      } catch {
        setError(
          'Network error while sending the sign-in link. Check your connection and try again.'
        );
      }
    });
  }

  function onPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '')
      .trim()
      .toLowerCase();
    const password = String(form.get('password') ?? '');

    startTransition(async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        if (!supabase) {
          setError('Authentication is not configured.');
          return;
        }
        const { error: signErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signErr) {
          setError(
            signErr.message.includes('Invalid login')
              ? 'Incorrect email or password. Try magic link if you have not set a password.'
              : signErr.message
          );
          return;
        }
        const { path } = await resolvePortalContinuePathAction(next);
        router.replace(path);
        router.refresh();
      } catch {
        setError('Sign-in failed. Check your connection and try again.');
      }
    });
  }

  return (
    <Card className="p-6 max-w-md">
      <h2 className="text-lg font-semibold">Portal sign-in</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Use the same email you used to claim your company. Sign in with Google, a magic link, or
        an optional password. 2FA may ask for an authenticator code next.
      </p>

      <div className="mt-5 space-y-3">
        <PortalGoogleSignIn next={next} disabled={pending} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex rounded-lg border p-1 bg-muted/40" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'magic'}
          className={cn(
            'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            mode === 'magic' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => {
            setMode('magic');
            setError(null);
            setMessage(null);
          }}
        >
          Magic link
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'password'}
          className={cn(
            'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            mode === 'password' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => {
            setMode('password');
            setError(null);
            setMessage(null);
          }}
        >
          Password
        </button>
      </div>

      {mode === 'magic' ? (
        <form onSubmit={onMagicLink} className="mt-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="portal-email">Email</Label>
            <Input
              id="portal-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourmovingcompany.com"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Sending…' : 'Email me a magic link'}
          </Button>
        </form>
      ) : (
        <form onSubmit={onPassword} className="mt-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="portal-email-pw">Email</Label>
            <Input
              id="portal-email-pw"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourmovingcompany.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="portal-password">Password</Label>
            <Input
              id="portal-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your portal password"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Signing in…' : 'Sign in with password'}
          </Button>
          <p className="text-xs text-muted-foreground">
            No password yet? Use the magic link tab — you can create a password after sign-in.
          </p>
        </form>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Tip: check spam/junk if a magic link does not arrive within a minute. Links expire for
        security.
      </p>
    </Card>
  );
}
