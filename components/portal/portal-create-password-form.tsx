'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  KeyRound,
  Link2,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  setPortalPasswordAction,
  skipPortalPasswordPromptAction,
} from '@/actions/portal-password';
import { scorePasswordStrength } from '@/lib/portal/password-strength';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  nextPath: string;
  email: string | null;
};

const BENEFITS = [
  {
    icon: Mail,
    title: 'Skip the inbox next time',
    body: 'Sign in with email + password when you are in a hurry.',
  },
  {
    icon: Link2,
    title: 'Magic links stay available',
    body: 'Email sign-in links always work — even after you set a password.',
  },
  {
    icon: ShieldCheck,
    title: 'You stay in control',
    body: 'Change or turn off password anytime under Security. 2FA still applies.',
  },
] as const;

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

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const confirmMismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lg shadow-black/5">
        {/* Accent strip */}
        <div
          className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/80 to-emerald-500"
          aria-hidden
        />

        <div className="space-y-8 p-6 sm:p-8">
          {/* Header */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Optional · one-time setup
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10"
                aria-hidden
              >
                <KeyRound className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <div className="space-y-2 min-w-0">
                <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-foreground leading-snug">
                  Welcome! Would you like a password for faster logins?
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto sm:mx-0">
                  Skip checking email next time — or keep using magic links. Your choice; nothing
                  required.
                </p>
              </div>
            </div>

            {email ? (
              <div className="flex items-center justify-center sm:justify-start gap-2 rounded-xl border bg-muted/40 px-3.5 py-2.5 text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background border text-muted-foreground shrink-0">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-muted-foreground truncate">
                  Signed in as{' '}
                  <span className="font-medium text-foreground">{email}</span>
                </span>
              </div>
            ) : null}
          </div>

          {/* Benefits */}
          <ul className="grid gap-2.5">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-3 rounded-xl border bg-muted/25 px-3.5 py-3 transition-colors hover:bg-muted/40"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Form */}
          <form onSubmit={onCreate} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portal-new-password" className="text-sm font-medium">
                  Create password
                </Label>
                <Input
                  id="portal-new-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={72}
                  placeholder="At least 8 characters"
                  className="h-11"
                />
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex gap-1" aria-hidden>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 flex-1 rounded-full transition-colors duration-300',
                          strength.score > i ? barColor : 'bg-muted'
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{strength.label}</p>
                    {password.length > 0 ? (
                      <p
                        className={cn(
                          'text-xs font-medium',
                          strength.ok ? 'text-emerald-600' : 'text-muted-foreground'
                        )}
                      >
                        {strength.ok ? 'Looks good' : 'Keep going'}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portal-confirm-password" className="text-sm font-medium">
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="portal-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    minLength={8}
                    maxLength={72}
                    placeholder="Re-enter password"
                    className={cn(
                      'h-11 pr-10',
                      confirmMismatch && 'border-destructive focus-visible:ring-destructive/30',
                      passwordsMatch && 'border-emerald-500/60 focus-visible:ring-emerald-500/20'
                    )}
                    aria-invalid={confirmMismatch || undefined}
                  />
                  {passwordsMatch ? (
                    <Check
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600"
                      aria-hidden
                    />
                  ) : null}
                </div>
                {confirmMismatch ? (
                  <p className="text-xs text-destructive">Passwords do not match yet.</p>
                ) : null}
              </div>
            </div>

            {error ? (
              <div
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <div className="space-y-3 pt-1">
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full text-base font-semibold shadow-sm"
                disabled={pending || !password || !confirm || confirmMismatch}
              >
                {pending ? 'Saving…' : 'Create password and continue'}
              </Button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-dashed" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                  <span className="bg-card px-3 text-muted-foreground">or stay with magic links</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 w-full border-2 text-base font-medium bg-background hover:bg-muted/50"
                disabled={pending}
                onClick={onSkip}
              >
                Skip for now — continue with magic links
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-muted-foreground leading-relaxed px-2">
            You can set or change a password later from{' '}
            <span className="font-medium text-foreground/80">Portal → Security</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
