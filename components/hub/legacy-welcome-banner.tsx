'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PartyPopper, Sparkles, X } from 'lucide-react';
import { trackLegacyArrival } from '@/components/ga-events';
import { hubPath } from '@/lib/hub/paths';
import {
  LEGACY_REDIRECT_SOURCES,
  normalizeLegacySource,
  type LegacyRedirectSource,
} from '@/lib/migration/legacy-sources';
import type { HubId } from '@/lib/hub/types';
import { Button } from '@/components/ui/button';

interface LegacyWelcomeBannerProps {
  hubId: HubId;
}

/**
 * One-time welcome for visitors arriving via 308 from lendertrusthub.com or insurancetrusthub.com.
 * Activated by ?from=lendertrusthub (set on Vercel host redirects).
 */
export function LegacyWelcomeBanner({ hubId }: LegacyWelcomeBannerProps) {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const [source, setSource] = useState<LegacyRedirectSource | null>(null);

  useEffect(() => {
    if (hubId !== 'lender' && hubId !== 'insurance') return;

    const from =
      searchParams.get('from') ??
      searchParams.get('utm_source') ??
      searchParams.get('ref') ??
      '';

    const resolved = normalizeLegacySource(from);
    if (!resolved) return;

    const meta = LEGACY_REDIRECT_SOURCES[resolved];
    if (meta.hubId !== hubId) return;

    const sessionKey = `mth-welcome-${resolved}`;
    if (sessionStorage.getItem(sessionKey)) {
      setDismissed(true);
      return;
    }

    setSource(resolved);
    trackLegacyArrival({
      legacy_source: resolved,
      hub: hubId,
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  }, [searchParams, hubId]);

  if (!source || dismissed) return null;

  const legacy = LEGACY_REDIRECT_SOURCES[source];

  function handleDismiss() {
    sessionStorage.setItem(`mth-welcome-${source}`, '1');
    setDismissed(true);
  }

  return (
    <div
      className="animate-slide-down overflow-hidden border-b border-primary/20 bg-gradient-to-r from-primary/8 via-sky-500/8 to-primary/5"
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <span className="animate-wiggle mt-0.5 shrink-0 sm:mt-0" aria-hidden>
            <PartyPopper className="h-5 w-5 text-amber-500" />
          </span>
          <p className="text-sm font-medium leading-snug text-foreground">
            <Sparkles className="mr-1 inline h-4 w-4 text-amber-500" aria-hidden />
            Welcome from <strong>{legacy.brand}</strong> {legacy.emoji} Everything now lives here on{' '}
            <strong>Move Trust Hub</strong> — same trusted data, one home. Your bookmarks still work!
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" asChild>
            <Link href={hubPath(hubId, '/')}>Explore {legacy.brand}</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/">Move Trust Hub home</Link>
          </Button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-1.5 transition-colors hover:bg-muted"
            aria-label="Dismiss welcome message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}