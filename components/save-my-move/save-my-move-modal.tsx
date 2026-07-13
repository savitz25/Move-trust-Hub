'use client';

import { useState } from 'react';
import { Shield, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export function SaveMyMoveModal({
  open,
  onOpenChange,
  redirectPath = '/my-move',
  context = 'dashboard',
}: SaveMyMoveModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<'google' | 'email' | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const safeRedirectPath = sanitizePostLoginPath(redirectPath);

  const handleGoogleStart = () => {
    setLoading('google');
    trackSaveMyMoveAuth({ method: 'google' });
    stashPostLoginRedirect(safeRedirectPath);
  };

  const handleGoogleSuccess = () => {
    setLoading(null);
    onOpenChange(false);
  };

  const handleGoogleError = () => {
    setLoading(null);
  };

  const handleMagicLink = async () => {
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
      setEmailSent(true);
      toast.success('Check your email', {
        description: 'We sent a single-use sign-in link (expires in 15 minutes).',
      });
    } catch {
      toast.error('Could not send sign-in link');
    } finally {
      setLoading(null);
    }
  };

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
              <p className="text-sm font-medium">Sign-in link sent to {email}</p>
              <p className="text-xs text-muted-foreground">
                Open the link on any device. It expires in 15 minutes and works once.
              </p>
              <Button variant="outline" size="sm" onClick={() => setEmailSent(false)}>
                Use a different email
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <GoogleSignInButton
                active={open && !emailSent}
                disabled={loading !== null}
                onStart={handleGoogleStart}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                  aria-label="Email for sign-in link"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleMagicLink}
                  disabled={loading !== null}
                >
                  {loading === 'email' ? 'Sending…' : 'Email me a sign-in link'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}