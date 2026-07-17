'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import {
  clearPortalBackupCodesAction,
  savePortalBackupCodesAction,
} from '@/actions/portal-mfa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type Props = {
  initiallyEnabled: boolean;
  factorFriendlyName: string | null;
  backupCodesRemaining: number;
  showRecoveredBanner?: boolean;
};

type SetupState =
  | { step: 'idle' }
  | {
      step: 'enroll';
      factorId: string;
      qrCode: string;
      secret: string;
      uri: string;
    }
  | { step: 'backup'; codes: string[] }
  | { step: 'disable' };

export function PortalMfaManager({
  initiallyEnabled,
  factorFriendlyName,
  backupCodesRemaining: initialBackupCount,
  showRecoveredBanner = false,
}: Props) {
  const [enabled, setEnabled] = useState(initiallyEnabled);
  const [friendlyName, setFriendlyName] = useState(factorFriendlyName);
  const [backupCount, setBackupCount] = useState(initialBackupCount);
  const [setup, setSetup] = useState<SetupState>({ step: 'idle' });
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const refreshFactors = useCallback(async () => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;
    const { data } = await supabase.auth.mfa.listFactors();
    const verified = data?.totp?.filter((f) => f.status === 'verified') ?? [];
    setEnabled(verified.length > 0);
    setFriendlyName(verified[0]?.friendly_name ?? null);
  }, []);

  useEffect(() => {
    void refreshFactors();
  }, [refreshFactors]);

  function startEnroll() {
    setError(null);
    startTransition(async () => {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        setError('Authentication is not configured.');
        return;
      }

      // Clean up unverified / stale factors so re-enroll works
      const { data: existing } = await supabase.auth.mfa.listFactors();
      for (const f of existing?.all ?? []) {
        if (f.factor_type === 'totp' && f.status !== 'verified') {
          await supabase.auth.mfa.unenroll({ factorId: f.id });
        }
      }

      const { data, error: enrollErr } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Move Trust Hub Portal',
      });

      if (enrollErr || !data) {
        setError(
          enrollErr?.message ??
            'Could not start 2FA setup. Confirm MFA is enabled in Supabase Auth settings.'
        );
        return;
      }

      setSetup({
        step: 'enroll',
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        uri: data.totp.uri,
      });
      setCode('');
    });
  }

  function confirmEnroll() {
    if (setup.step !== 'enroll') return;
    const trimmed = code.replace(/\s/g, '');
    if (!/^\d{6}$/.test(trimmed)) {
      setError('Enter the 6-digit code from your app to finish setup.');
      return;
    }
    setError(null);
    const { factorId } = setup;

    startTransition(async () => {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        setError('Authentication is not configured.');
        return;
      }

      const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({
        factorId,
      });
      if (challengeErr || !challenge) {
        setError(challengeErr?.message ?? 'Could not verify code.');
        return;
      }

      const { error: verifyErr } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: trimmed,
      });
      if (verifyErr) {
        setError(verifyErr.message || 'Invalid code. Check the time on your phone and try again.');
        return;
      }

      const backup = await savePortalBackupCodesAction();
      await refreshFactors();
      setEnabled(true);
      if (backup.success && backup.codes) {
        setSetup({ step: 'backup', codes: backup.codes });
        setBackupCount(backup.codes.length);
        toast.success('Two-factor authentication enabled');
      } else {
        setSetup({ step: 'idle' });
        toast.success('Two-factor authentication enabled');
        if (backup.error) {
          toast.message('Backup codes unavailable', { description: backup.error });
        }
      }
      setCode('');
    });
  }

  function startDisable() {
    setSetup({ step: 'disable' });
    setCode('');
    setError(null);
  }

  function confirmDisable() {
    const trimmed = code.replace(/\s/g, '');
    if (!/^\d{6}$/.test(trimmed)) {
      setError('Enter your current 6-digit authenticator code to disable 2FA.');
      return;
    }
    setError(null);
    startTransition(async () => {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        setError('Authentication is not configured.');
        return;
      }

      const { data: factors } = await supabase.auth.mfa.listFactors();
      const verified = factors?.totp?.filter((f) => f.status === 'verified') ?? [];
      if (verified.length === 0) {
        setEnabled(false);
        setSetup({ step: 'idle' });
        return;
      }

      for (const factor of verified) {
        const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({
          factorId: factor.id,
        });
        if (challengeErr || !challenge) {
          setError(challengeErr?.message ?? 'Could not verify.');
          return;
        }
        const { error: verifyErr } = await supabase.auth.mfa.verify({
          factorId: factor.id,
          challengeId: challenge.id,
          code: trimmed,
        });
        if (verifyErr) {
          setError(verifyErr.message || 'Invalid code.');
          return;
        }
        const { error: unenrollErr } = await supabase.auth.mfa.unenroll({
          factorId: factor.id,
        });
        if (unenrollErr) {
          setError(unenrollErr.message);
          return;
        }
      }

      await clearPortalBackupCodesAction();
      setEnabled(false);
      setFriendlyName(null);
      setBackupCount(0);
      setSetup({ step: 'idle' });
      setCode('');
      toast.success('Two-factor authentication disabled');
    });
  }

  function regenerateBackupCodes() {
    setError(null);
    startTransition(async () => {
      const result = await savePortalBackupCodesAction();
      if (!result.success || !result.codes) {
        setError(result.error ?? 'Could not generate backup codes');
        return;
      }
      setSetup({ step: 'backup', codes: result.codes });
      setBackupCount(result.codes.length);
      toast.success('New backup codes generated — save them now');
    });
  }

  return (
    <div className="space-y-6">
      {showRecoveredBanner ? (
        <Card className="p-4 border-amber-300 bg-amber-50 text-sm text-amber-950">
          You signed in with a backup code. 2FA was turned off for recovery — enable it again below
          to protect your portal.
        </Card>
      ) : null}

      <Card className="p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-lg">Authenticator app (TOTP)</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Optional but strongly recommended. After your magic-link sign-in, you will enter a
              6-digit code from Google Authenticator, Microsoft Authenticator, Authy, or 1Password.
            </p>
          </div>
          <Badge variant={enabled ? 'success' : 'secondary'}>
            {enabled ? '2FA enabled' : '2FA off'}
          </Badge>
        </div>

        {enabled && setup.step === 'idle' ? (
          <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
            <p>
              <span className="font-medium text-foreground">Status:</span> Active
              {friendlyName ? ` (${friendlyName})` : ''}
            </p>
            <p className="text-muted-foreground">
              Backup codes remaining: <strong className="text-foreground">{backupCount}</strong>
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={regenerateBackupCodes} disabled={pending}>
                Generate new backup codes
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={startDisable} disabled={pending}>
                Disable 2FA
              </Button>
            </div>
          </div>
        ) : null}

        {!enabled && setup.step === 'idle' ? (
          <div className="space-y-3">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm space-y-2">
              <p className="font-medium">Why enable 2FA?</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Protects owner tools if someone gets your email inbox</li>
                <li>Works with free apps — no SMS required</li>
                <li>You can turn it off anytime with a valid code</li>
              </ul>
            </div>
            <Button type="button" onClick={startEnroll} disabled={pending}>
              {pending ? 'Starting…' : 'Enable 2FA'}
            </Button>
          </div>
        ) : null}

        {setup.step === 'enroll' ? (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Set up your authenticator</h3>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
              <li>
                Install <strong className="text-foreground">Google Authenticator</strong>, Authy,
                Microsoft Authenticator, or 1Password on your phone.
              </li>
              <li>Scan the QR code below (or enter the secret manually).</li>
              <li>Enter the 6-digit code the app shows to confirm setup.</li>
            </ol>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="rounded-xl border bg-white p-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={setup.qrCode}
                  alt="QR code for authenticator setup"
                  width={180}
                  height={180}
                  className="w-[180px] h-[180px]"
                />
              </div>
              <div className="space-y-2 text-sm flex-1 min-w-0">
                <p className="font-medium">Can&apos;t scan? Enter this secret:</p>
                <code className="block break-all rounded-md bg-muted px-3 py-2 font-mono text-xs">
                  {setup.secret}
                </code>
                <p className="text-xs text-muted-foreground">
                  Account name will appear as Move Trust Hub Portal. Keep this secret private.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <Label htmlFor="enroll-code">Verification code</Label>
              <Input
                id="enroll-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="font-mono tracking-[0.3em] text-center"
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={confirmEnroll} disabled={pending || code.length !== 6}>
                {pending ? 'Verifying…' : 'Confirm and enable'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  setSetup({ step: 'idle' });
                  setError(null);
                  setCode('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {setup.step === 'backup' ? (
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-semibold text-emerald-800">Save your backup codes</h3>
            <p className="text-sm text-muted-foreground">
              Store these somewhere safe (password manager). Each code works once if you lose your
              phone. They will not be shown again.
            </p>
            <ul className="grid grid-cols-2 gap-2 font-mono text-sm bg-muted/40 rounded-lg p-4 border">
              {setup.codes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(setup.codes.join('\n'));
                toast.success('Codes copied');
              }}
              variant="outline"
              size="sm"
            >
              Copy all codes
            </Button>
            <Button type="button" onClick={() => setSetup({ step: 'idle' })}>
              I saved my codes
            </Button>
          </div>
        ) : null}

        {setup.step === 'disable' ? (
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">Disable two-factor authentication</h3>
            <p className="text-sm text-muted-foreground">
              Enter a current authenticator code to confirm. Your portal will only need the magic
              link afterward.
            </p>
            <div className="space-y-1.5 max-w-xs">
              <Label htmlFor="disable-code">Authenticator code</Label>
              <Input
                id="disable-code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="font-mono tracking-[0.3em] text-center"
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDisable}
                disabled={pending || code.length !== 6}
              >
                {pending ? 'Disabling…' : 'Confirm disable'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  setSetup({ step: 'idle' });
                  setError(null);
                  setCode('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {error && setup.step === 'idle' ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </Card>

      <Card className="p-4 text-sm text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Recommended apps</p>
        <p>Google Authenticator · Microsoft Authenticator · Authy · 1Password · Bitwarden</p>
        <p className="pt-2">
          2FA uses Supabase TOTP (time-based one-time passwords). Codes refresh every 30 seconds —
          keep your phone clock set to automatic time.
        </p>
      </Card>
    </div>
  );
}
