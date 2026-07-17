'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  changePortalPasswordAction,
  disablePortalPasswordAction,
} from '@/actions/portal-password';
import { scorePasswordStrength } from '@/lib/portal/password-strength';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Props = {
  passwordEnabled: boolean;
};

export function PortalPasswordManager({ passwordEnabled: initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [mode, setMode] = useState<'idle' | 'set' | 'disable'>('idle');
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
      const result = await changePortalPasswordAction({
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
        'Disable password login? You will sign in with magic links only. You can create a new password later.'
      )
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await disablePortalPasswordAction();
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
    <Card className="p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">Email &amp; password</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Optional convenience login. Magic links always remain available. If 2FA is on, you still
            enter your authenticator code after password sign-in.
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
        <form onSubmit={onSavePassword} className="space-y-3 border-t pt-4 max-w-md">
          <div className="space-y-1.5">
            <Label htmlFor="sec-password">New password</Label>
            <Input
              id="sec-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
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
            <Label htmlFor="sec-confirm">Confirm password</Label>
            <Input
              id="sec-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
    </Card>
  );
}
