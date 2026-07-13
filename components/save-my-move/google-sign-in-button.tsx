'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { ensureUserProfileAction } from '@/actions/account';
import { generateGoogleSignInNonce } from '@/lib/save-my-move/google-nonce';
import { getGoogleOAuthClientId } from '@/lib/save-my-move/google-client-id';
import { toast } from 'sonner';

const GSI_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

type GoogleSignInButtonProps = {
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  disabled?: boolean;
  /** When false, cancels One Tap and clears the rendered button. */
  active?: boolean;
};

export function GoogleSignInButton({
  onStart,
  onSuccess,
  onError,
  disabled = false,
  active = true,
}: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonHostRef = useRef<HTMLDivElement>(null);
  const nonceRef = useRef('');
  const [gsiReady, setGsiReady] = useState(false);
  const [width, setWidth] = useState(0);
  const clientId = getGoogleOAuthClientId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => setWidth(Math.floor(el.getBoundingClientRect().width));
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCredential = useCallback(
    async (response: google.accounts.id.CredentialResponse) => {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        toast.error('Sign-in is not configured');
        onError?.();
        return;
      }

      onStart?.();

      try {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: nonceRef.current,
        });
        if (error) throw error;

        await ensureUserProfileAction();
        onSuccess?.();
      } catch (err) {
        console.error('[GoogleSignIn] signInWithIdToken failed', err);
        toast.error('Google sign-in failed. Try the email link instead.');
        onError?.();
      }
    },
    [onStart, onSuccess, onError]
  );

  useEffect(() => {
    if (!active && typeof window !== 'undefined' && window.google?.accounts?.id) {
      window.google.accounts.id.cancel();
      if (buttonHostRef.current) buttonHostRef.current.innerHTML = '';
    }
  }, [active]);

  useEffect(() => {
    if (
      !active ||
      !gsiReady ||
      !clientId ||
      !buttonHostRef.current ||
      width < 1 ||
      disabled ||
      typeof window === 'undefined' ||
      !window.google?.accounts?.id
    ) {
      return;
    }

    let cancelled = false;

    (async () => {
      const [rawNonce, hashedNonce] = await generateGoogleSignInNonce();
      if (cancelled || !buttonHostRef.current) return;

      nonceRef.current = rawNonce;
      buttonHostRef.current.innerHTML = '';

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
        nonce: hashedNonce,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
      });

      window.google.accounts.id.renderButton(buttonHostRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [active, gsiReady, clientId, width, disabled, handleCredential]);

  if (!clientId) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium"
        disabled={disabled}
        onClick={() => {
          onStart?.();
          window.location.assign('/api/auth/google');
        }}
      >
        Continue with Google
      </button>
    );
  }

  return (
    <>
      <Script
        src={GSI_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => setGsiReady(true)}
      />
      <div ref={containerRef} className="w-full min-h-[44px]">
        <div
          ref={buttonHostRef}
          className={
            disabled || !active
              ? 'pointer-events-none opacity-50 flex justify-center'
              : 'flex justify-center'
          }
          aria-hidden={disabled || !active}
        />
      </div>
    </>
  );
}