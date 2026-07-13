'use client';

import { memo, useCallback, useState } from 'react';
import { Shield, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FacebookSignInButton } from '@/components/save-my-move/facebook-sign-in-button';
import { GoogleSignInButton } from '@/components/save-my-move/google-sign-in-button';
import { trackSaveMyMoveAuth } from '@/components/ga-events';
import { toast } from 'sonner';
import {
  sanitizePostLoginPath,
  stashPostLoginRedirect,
} from '@/lib/save-my-move/redirect';
import type { SaveMyMoveContext } from '@/lib/save-my-move/types';

const CONTEXT_HEADINGS: Record<SaveMyMoveContext, string> = {
  inventory: 'Save this inventory',
  mover: 'Save this mover',
  comparison: 'Save this comparison',
  dashboard: 'Save your move',
};

type SaveMyMoveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath?: string;
  context?: SaveMyMoveContext;
};

/** OAuth buttons isolated from email input state to prevent GSI reflow while typing. */
const SaveMyMoveOAuthButtons = memo(function SaveMyMoveOAuthButtons({
  open,
  loading,
  onGoogleStart,
  onGoogleSuccess,
  onGoogleError,
  onFacebookStart,
}: {
  open: boolean;
  loading: 'google' | 'facebook' | 'email' | null;
  onGoogleStart: () => void;
  onGoogleSuccess: () => void;
  onGoogleError: () => void;
  onFacebookStart: () => void;
}) {
  const disabled = loading !== null;

  return (
    <div className="space-y-3">
      <GoogleSignInButton
        active={open}
        disabled={disabled}
        onStart={onGoogleStart}
        onSuccess={onGoogleSuccess}
        onError={onGoogleError}
      />
      <FacebookSignInButton disabled={disabled} onStart={onFacebookStart} />
    </div>
  );
});

/** Email field isolated so keystrokes do not re-render OAuth iframes. */
const SaveMyMoveEmailForm = memo(function SaveMyMoveEmailForm({
  loading,
  onSubmit,
}: {
  loading: 'google' | 'facebook' | 'email' | null;
  onSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState('');
  const disabled = loading !== null;

  const handleSubmit = () => onSubmit(email);

  return (
    <div className="space-y-2">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        aria-label="Email for sign-in link"
        autoComplete="email"
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={handleSubmit}
        disabled={disabled}
      >
        {loading === 'email' ? 'Sending…' : 'Email me a sign-in link'}
      </Button>
    </div>
  );
});

export function SaveMyMoveModal({
  open,
  onOpenChange,
  redirectPath = '/my-move',
  context = 'dashboard',
}: SaveMyMoveModalProps) {
  const [loading, setLoading] = useState<'google' | 'facebook' | 'email' | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const safeRedirectPath = sanitizePostLoginPath(redirectPath);

  const handleGoogleStart = useCallback(() => {
    setLoading('google');
    trackSaveMyMoveAuth({ method: 'google' });
    stashPostLoginRedirect(safeRedirectPath);
  }, [safeRedirectPath]);

  const handleGoogleSuccess = useCallback(() => {
    setLoading(null);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleGoogleError = useCallback(() => {
    setLoading(null);
  }, []);

  const handleFacebookStart = useCallback(() => {
    setLoading('facebook');
    trackSaveMyMoveAuth({ method: 'facebook' });
    stashPostLoginRedirect(safeRedirectPath);
  }, [safeRedirectPath]);

  const handleMagicLink = useCallback(
    async (email: string) => {
      const trimmed = email.trim().toLowerCase();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        toast.error('Enter a valid email address');
        return;
      }
      setLoading('email');
      trackSaveMyMoveAuth({ method: 'magic_link' });
      stashPostLoginRedirect(safeRedirectPath);
      try {
        const res = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, next: safeRedirectPath }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? 'Could not send sign-in link');
          return;
        }
        setSentEmail(trimmed);
        setEmailSent(true);
        toast.success('Check your email', {
          description: 'We sent a single-use sign-in link (expires in 15 minutes).',
        });
      } catch {
        toast.error('Could not send sign-in link');
      } finally {
        setLoading(null);
      }
    },
    [safeRedirectPath]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{CONTEXT_HEADINGS[context]}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Optional — everything on Move Trust Hub works without an account.
          </p>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1.5 text-xs text-foreground leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-sm mb-1">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Your privacy
            </div>
            <p>We only store your email address.</p>
            <p>We only email you things you ask for — your inventory or saved list.</p>
            <p>
              No marketing unless you explicitly opt in. We never sell or share your information.
              Delete your account anytime with one click.
            </p>
          </div>

          {emailSent ? (
            <div className="text-center py-2 space-y-2">
              <Mail className="h-8 w-8 mx-auto text-primary opacity-80" />
              <p className="text-sm font-medium">Sign-in link sent to {sentEmail}</p>
              <p className="text-xs text-muted-foreground">
                Open the link on any device. It expires in 15 minutes and works once.
              </p>
              <Button variant="outline" size="sm" onClick={() => setEmailSent(false)}>
                Use a different email
              </Button>
            </div>
          ) : (
            <>
              <SaveMyMoveOAuthButtons
                open={open}
                loading={loading}
                onGoogleStart={handleGoogleStart}
                onGoogleSuccess={handleGoogleSuccess}
                onGoogleError={handleGoogleError}
                onFacebookStart={handleFacebookStart}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <SaveMyMoveEmailForm loading={loading} onSubmit={handleMagicLink} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}