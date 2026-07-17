'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { submitClaimAction } from '@/actions/portal-claims';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { PORTAL_PROMISES, PORTAL_CANNOT } from '@/lib/portal/messaging';

type Props = {
  companySlug: string;
  companyName: string;
  usdotNumber?: string;
  defaultEmail?: string;
};

export function ClaimForm({ companySlug, companyName, usdotNumber, defaultEmail }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [magicLinkNote, setMagicLinkNote] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setMagicLinkNote(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') ?? '')
      .trim()
      .toLowerCase();

    startTransition(async () => {
      try {
        const result = await submitClaimAction({
          companySlug,
          claimantName: String(fd.get('name') ?? ''),
          claimantEmail: email,
          claimantPhone: String(fd.get('phone') ?? '') || undefined,
          claimantTitle: String(fd.get('title') ?? '') || undefined,
          usdotSubmitted: String(fd.get('usdot') ?? ''),
        });

        if (!result.success) {
          setError(result.error);
          return;
        }

        setSuccess(result.message);

        // Send magic link for verification login (claim already saved)
        try {
          const res = await fetch('/api/auth/magic-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              next: '/portal',
            }),
          });
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          if (!res.ok) {
            setMagicLinkNote(
              data.error ??
                'Claim saved, but we could not email a sign-in link. Use Portal sign-in with this email.'
            );
          } else {
            setMagicLinkNote(
              'We emailed a Move Trust Hub sign-in link. Check inbox and spam, then open /portal after signing in.'
            );
          }
        } catch {
          setMagicLinkNote(
            'Claim saved, but the sign-in email could not be sent (network error). Use /portal/login with this email.'
          );
        }

        router.refresh();
      } catch (err) {
        console.error('[portal] claim form error', err);
        setError(
          'Something went wrong submitting your claim. Please try again, or email info@movetrusthub.com with your USDOT.'
        );
      }
    });
  }

  if (success) {
    return (
      <Card className="p-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Claim submitted</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{success}</p>
        {magicLinkNote ? (
          <p className="text-sm text-muted-foreground leading-relaxed">{magicLinkNote}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Check your inbox for a secure sign-in link. After you verify your email, our team
            confirms ownership (DOT match + contact review). Then you can manage{' '}
            <strong>{companyName}</strong> in the Verified Mover Portal.
          </p>
        )}
        <Button asChild variant="outline">
          <a href="/portal">Go to portal</a>
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Claim {companyName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Multi-step verification: USDOT match, work contact, then magic-link login. We never
            sell rankings or placements.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="name">Your full name</Label>
            <Input id="name" name="name" required autoComplete="name" placeholder="Jordan Lee" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={defaultEmail}
              placeholder="you@yourmovingcompany.com"
            />
            <p className="text-xs text-muted-foreground">
              Prefer an email on your company domain — it speeds up verification.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Business phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-0100" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Your role</Label>
            <Input id="title" name="title" placeholder="Owner, GM, Ops manager…" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="usdot">USDOT number (must match this listing)</Label>
            <Input
              id="usdot"
              name="usdot"
              required
              inputMode="numeric"
              defaultValue={usdotNumber?.replace(/\D/g, '')}
              placeholder="1234567"
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? 'Submitting…' : 'Submit claim & send magic link'}
        </Button>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <Card className="p-4 bg-muted/30">
          <p className="font-medium mb-2">What you get</p>
          <ul className="space-y-1 text-muted-foreground">
            {PORTAL_PROMISES.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-4 bg-muted/30">
          <p className="font-medium mb-2">What you cannot do</p>
          <ul className="space-y-1 text-muted-foreground">
            {PORTAL_CANNOT.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </Card>
      </div>
    </form>
  );
}
