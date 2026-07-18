'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  changeMyMovePasswordAction,
  disableMyMovePasswordAction,
} from '@/actions/my-move-password';
import { scorePasswordStrength } from '@/lib/portal/password-strength';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Props = {
  passwordEnabled: boolean;
};

export function MyMovePasswordManager({ passwordEnabled: initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [mode, setMode] = useState<'idle' | 'set'>('idle');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const strength = useMemo(() => scorePasswordStrength(password), [password]);

  function resetForm() {
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setMode('idle');
  }

  function onSavePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await changeMyMovePasswordAction({
        password,
        confirm: confirmPassword,
      });
      if (!result.success) {
        setError(result.error ?? 'Could not update password');
        return;
      }
      setEnabled(true);
      resetForm();
      toast.success(enabled ? 'Password updated' : 'Password enabled');
    });
  }

  function onDisable() {
    if (
      !window.confirm(
        'Disable password login? You will sign in with magic links or social only. You can create a new password later.'
      )
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await disableMyMovePasswordAction();
      if (!result.success) {
        setError(result.error ?? 'Could not disable password');
        return;
      }
      setEnabled(false);
      resetForm();
      toast.success('Password login disabled — magic links still work');
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
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">Email &amp; password</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Optional convenience login. Magic links and social sign-in always remain available.
          </p>
        </div>
        <Badge variant={enabled ? 'success' : 'secondary'}>
          {enabled ? 'Password on' : 'Magic link only'}
        </Badge>
      </div>

      {mode === 'idle' ? (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => setMode('set')}>
            {enabled ? 'Change password' : 'Create password'}
          </Button>
          {enabled ? (
            <Button type="button" size="sm" variant="outline" onClick={onDisable} disabled={pending}>
              {pending ? 'Disabling…' : 'Disable password login'}
            </Button>
          ) : null}
        </div>
      ) : null}

      {mode === 'set' ? (
        <form onSubmit={onSavePassword} className="space-y-3 border-t pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="my-move-sec-password">New password</Label>
            <Input
              id="my-move-sec-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={72}
            />
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full transition-all', barColor)}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{strength.label}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="my-move-sec-confirm">Confirm password</Label>
            <Input
              id="my-move-sec-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              maxLength={72}
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={pending}>
              {pending ? 'Saving…' : 'Save password'}
            </Button>
            <Button type="button" variant="ghost" disabled={pending} onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {error && mode === 'idle' ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
