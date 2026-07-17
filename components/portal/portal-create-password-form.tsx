'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  setPortalPasswordAction,
  skipPortalPasswordPromptAction,
} from '@/actions/portal-password';
import { scorePasswordStrength } from '@/lib/portal/password-strength';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  nextPath: string;
  email: string | null;
};

export function PortalCreatePasswordForm({ nextPath, email }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const strength = useMemo(() => scorePasswordStrength(password), [password]);

  function goNext() {
    router.replace(nextPath);
    router.refresh();
  }

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await setPortalPasswordAction({ password, confirm });
      if (!result.success) {
        setError(result.error ?? 'Could not save password');
        return;
      }
      goNext();
    });
  }

  function onSkip() {
    setError(null);
    startTransition(async () => {
      const result = await skipPortalPasswordPromptAction();
      if (!result.success) {
        setError(result.error ?? 'Could not continue');
        return;
      }
      goNext();
    });
  }

  const barColor =
    strength.score <= 1
      ? 'bg-red-500'
      : strength.score === 2
        ? 'bg-amber-500'
        : strength.score === 3
          ? 'bg-lime-500'
          : 'bg-emerald-600';

  return (
    <Card className="p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome! Would you like to create a password for faster future logins?
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Skip checking email next time — log in with email + password or stay with magic links.
          Magic links always work, even if you set a password.
        </p>
        {email ? (
          <p className="text-xs text-muted-foreground">
            Account: <span className="font-medium text-foreground">{email}</span>
          </p>
        ) : null}
      </div>

      <ul className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2 text-muted-foreground">
        <li className="flex gap-2">
          <span className="text-emerald-600 font-bold" aria-hidden>
            ✓
          </span>
          <span>Optional — you can skip and keep magic-link only</span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-600 font-bold" aria-hidden>
            ✓
          </span>
          <span>Change or turn off password anytime under Security</span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-600 font-bold" aria-hidden>
            ✓
          </span>
          <span>If you use 2FA, you will still enter your authenticator code</span>
        </li>
      </ul>

      <form onSubmit={onCreate} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="portal-new-password">Password</Label>
          <Input
            id="portal-new-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={72}
            placeholder="At least 8 characters"
          />
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', barColor)}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{strength.label}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="portal-confirm-password">Confirm password</Label>
          <Input
            id="portal-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={8}
            maxLength={72}
            placeholder="Re-enter password"
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          disabled={pending || !password || !confirm}
        >
          {pending ? 'Saving…' : 'Create password and continue'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-2"
        size="lg"
        disabled={pending}
        onClick={onSkip}
      >
        Skip for now — continue with magic links
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You can set a password later from Portal → Security.
      </p>
    </Card>
  );
}
