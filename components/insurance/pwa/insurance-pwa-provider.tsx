'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/insurance/ui/button';
import { cn } from '@/lib/insurance/utils';

const DISMISS_KEY = 'ith-pwa-install-dismissed';
const DISMISS_DAYS = 21;

function isInsuranceHost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return h === 'insurancetrusthub.com' || h === 'www.insurancetrusthub.com' || h === 'localhost';
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const t = Number(raw);
    if (Number.isNaN(t)) return false;
    return Date.now() - t < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

/**
 * Registers the ITH service worker and shows a soft, dismissible install affordance.
 * Only runs on InsuranceTrustHub hosts — never registers Move branding.
 */
export function InsurancePwaProvider() {
  const [ready, setReady] = useState(false);
  const [deferred, setDeferred] = useState<{ prompt: () => Promise<void> } | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isInsuranceHost()) return;
    if (isStandalone()) return;

    // Register SW
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
        /* non-fatal — site works without SW */
      });
    }

    setReady(true);

    const onBip = (e: Event) => {
      e.preventDefault();
      const ev = e as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
      setDeferred({
        prompt: async () => {
          await ev.prompt();
          await ev.userChoice;
          setDeferred(null);
          setShowBanner(false);
        },
      });
      if (!isDismissed()) setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', onBip);

    // iOS: soft tip if not dismissed (no beforeinstallprompt)
    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    if (isIos && !isDismissed()) {
      const t = window.setTimeout(() => setShowBanner(true), 2500);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener('beforeinstallprompt', onBip);
      };
    }

    return () => window.removeEventListener('beforeinstallprompt', onBip);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setShowBanner(false);
  }

  async function install() {
    if (deferred) {
      await deferred.prompt();
      return;
    }
    // iOS guidance — no native prompt API
    dismiss();
  }

  if (!ready || !showBanner || isStandalone()) return null;

  const isIosHint = !deferred && /iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-[90] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        'pointer-events-none sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm sm:p-0'
      )}
      role="region"
      aria-label="Install app"
    >
      <div className="pointer-events-auto rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
            <Download className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Install Insurance HQ</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              {isIosHint
                ? 'Add to your Home Screen for quick access: Share → Add to Home Screen.'
                : 'Optional: use InsuranceTrustHub like an app. The website still works normally in your browser.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!isIosHint && (
                <Button type="button" size="sm" className="min-h-[40px]" onClick={install}>
                  Install
                </Button>
              )}
              <Button type="button" size="sm" variant="ghost" className="min-h-[40px]" onClick={dismiss}>
                Not now
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
