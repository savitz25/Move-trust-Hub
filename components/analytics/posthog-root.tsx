'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureSanitizedPageview, identifyTrustHubUser, resetTrustHubUser } from '@/lib/analytics/posthog/capture';
import { getPosthogBrowser } from '@/lib/analytics/posthog/posthog-browser';
import { shouldEnablePosthog } from '@/lib/analytics/posthog/environment';

function PosthogPageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string>('');

  useEffect(() => {
    if (!shouldEnablePosthog()) return;
    const path = pathname || '/';
    void getPosthogBrowser()
      .then((posthog) => {
        if (!posthog) return;
        if (lastPath.current === path) return;
        lastPath.current = path;
        captureSanitizedPageview(path, window.location.href);
      })
      .catch(() => undefined);
  }, [pathname, searchParams]);

  return null;
}

function PosthogIdentity() {
  const identified = useRef(false);
  useEffect(() => {
    if (!shouldEnablePosthog()) return;
    let cancelled = false;
    void fetch('/api/analytics/identity', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : { distinctId: null }))
      .then((body: { distinctId?: string | null }) => {
        if (cancelled) return;
        if (body.distinctId) {
          identified.current = true;
          identifyTrustHubUser(body.distinctId);
          return;
        }
        if (identified.current) {
          identified.current = false;
          resetTrustHubUser();
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}

export function PosthogRoot() {
  useEffect(() => {
    void getPosthogBrowser().catch(() => undefined);
  }, []);
  return (
    <>
      <PosthogPageviews />
      <PosthogIdentity />
    </>
  );
}
