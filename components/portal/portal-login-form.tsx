'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function PortalLoginForm({ next = '/portal' }: { next?: string }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
      .trim()
      .toLowerCase();

    startTransition(async () => {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, next }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Could not send sign-in link');
        return;
      }
      setMessage('Check your email for a secure magic link. It signs you into the Verified Mover Portal.');
    });
  }

  return (
    <Card className="p-6 max-w-md">
      <h2 className="text-lg font-semibold">Portal sign-in</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Use the same email you used to claim your company. No password — magic link only.
      </p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
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
    </Card>
  );
}
