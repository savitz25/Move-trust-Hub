'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { ensureUserProfileAction } from '@/actions/account';
import { generateGoogleSignInNonce } from '@/lib/save-my-move/google-nonce';
import { getGoogleOAuthClientId } from '@/lib/save-my-move/google-client-id';
import { toast } from 'sonner';

const GSI_SCRIPT_URL = 'https://accounts.google.com/gsi/client';
/** GSI large button height — reserve space to prevent layout shift. */
const GSI_BUTTON_HEIGHT_PX = 44;

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
  const renderedRef = useRef(false);
  const [gsiReady, setGsiReady] = useState(false);
  const [width, setWidth] = useState(0);
  const clientId = getGoogleOAuthClientId();

  // Measure width once when the modal opens — avoid ResizeObserver reflow loops while typing.
  useEffect(() => {
    if (!active) {
      renderedRef.current = false;
      if (buttonHostRef.current) buttonHostRef.current.innerHTML = '';
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const measure = () => Math.floor(el.getBoundingClientRect().width);
    setWidth(measure());

    // One delayed remeasure for post-animation layout only (dialog enter).
    const timer = window.setTimeout(() => {
      const next = measure();
      setWidth((prev) => (prev !== next ? next : prev));
    }, 120);

    return () => window.clearTimeout(timer);
  }, [active]);

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

  // Render GSI iframe once per open — never re-render on parent state (e.g. email typing).
  useEffect(() => {
    if (
      !active ||
      !gsiReady ||
      !clientId ||
      !buttonHostRef.current ||
      width < 1 ||
      renderedRef.current ||
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

      renderedRef.current = true;
    })();

    return () => {
      cancelled = true;
    };
  }, [active, gsiReady, clientId, width, handleCredential]);

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
      <div
        ref={containerRef}
        className="w-full"
        style={{ minHeight: GSI_BUTTON_HEIGHT_PX }}
      >
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