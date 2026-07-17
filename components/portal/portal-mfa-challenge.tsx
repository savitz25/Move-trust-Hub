'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { recoverPortalMfaWithBackupCodeAction } from '@/actions/portal-mfa';
import { resolvePortalContinuePathAction } from '@/actions/portal-password';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  nextPath: string;
  factorId: string | null;
};

export function PortalMfaChallenge({ nextPath, factorId: initialFactorId }: Props) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [useBackup, setUseBackup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function verifyTotp() {
    setError(null);
    const trimmed = code.replace(/\s/g, '');
    if (!/^\d{6}$/.test(trimmed)) {
      setError('Enter the 6-digit code from your authenticator app.');
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        if (!supabase) {
          setError('Authentication is not configured.');
          return;
        }

        let factorId = initialFactorId;
        if (!factorId) {
          const { data: factors, error: listErr } = await supabase.auth.mfa.listFactors();
          if (listErr) {
            setError(listErr.message);
            return;
          }
          factorId = factors.totp.find((f) => f.status === 'verified')?.id ?? null;
        }
        if (!factorId) {
          setError('No authenticator is enrolled on this account.');
          return;
        }

        const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({
          factorId,
        });
        if (challengeErr || !challenge) {
          setError(challengeErr?.message ?? 'Could not start verification.');
          return;
        }

        const { error: verifyErr } = await supabase.auth.mfa.verify({
          factorId,
          challengeId: challenge.id,
          code: trimmed,
        });
        if (verifyErr) {
          setError(verifyErr.message || 'Invalid code. Try again.');
          return;
        }

        // May offer optional password setup after first full verification
        const { path } = await resolvePortalContinuePathAction(nextPath);
        router.replace(path);
        router.refresh();
      } catch {
        setError('Verification failed. Check your connection and try again.');
      }
    });
  }

  function verifyBackup() {
    setError(null);
    if (!backupCode.trim()) {
      setError('Enter a backup code.');
      return;
    }
    startTransition(async () => {
      const result = await recoverPortalMfaWithBackupCodeAction(backupCode);
      if (!result.success) {
        setError(result.error ?? 'Invalid backup code');
        return;
      }
      router.replace('/portal/security?recovered=1');
      router.refresh();
    });
  }

  return (
    <Card className="p-6 max-w-md w-full space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Two-factor authentication</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the 6-digit code from Google Authenticator, Authy, 1Password, or another TOTP app.
        </p>
      </div>

      {!useBackup ? (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            verifyTotp();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="mfa-code">Authenticator code</Label>
            <Input
              id="mfa-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-[0.3em] font-mono"
              autoFocus
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending || code.length !== 6}>
            {pending ? 'Verifying…' : 'Verify and continue'}
          </Button>
          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            onClick={() => {
              setUseBackup(true);
              setError(null);
            }}
          >
            Lost your phone? Use a backup code
          </button>
        </form>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            verifyBackup();
          }}
        >
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
            A backup code will disable 2FA so you can sign in and set it up again. Each code works
            once.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="backup-code">Backup code</Label>
            <Input
              id="backup-code"
              autoComplete="off"
              placeholder="XXXX-XXXX"
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
              className="font-mono tracking-wider"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Checking…' : 'Use backup code'}
          </Button>
          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            onClick={() => {
              setUseBackup(false);
              setError(null);
            }}
          >
            Back to authenticator code
          </button>
        </form>
      )}
    </Card>
  );
}
