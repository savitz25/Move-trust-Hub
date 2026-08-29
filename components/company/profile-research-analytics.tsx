'use client';

import { useEffect } from 'react';
import { trackGaEvent } from '@/components/ga-events';

/** Privacy-safe profile research events. Slug only — no names, DOT, or query strings. */
export function ProfileResearchAnalytics({ slug }: { slug: string }) {
  useEffect(() => {
    const hero = document.querySelector('[data-research-hero]');
    if (!hero) return;

    const onClick = (event: Event) => {
      const el = (event.target as Element | null)?.closest?.('[data-profile-event]');
      if (!el) return;
      const name = el.getAttribute('data-profile-event');
      if (!name || name.endsWith('_opened')) return;
      trackGaEvent(name, { company_slug: slug });
    };

    const onToggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      const name = details.getAttribute('data-profile-event');
      if (!name) return;
      trackGaEvent(name, { company_slug: slug });
    };

    hero.addEventListener('click', onClick);
    hero.addEventListener('toggle', onToggle, true);
    return () => {
      hero.removeEventListener('click', onClick);
      hero.removeEventListener('toggle', onToggle, true);
    };
  }, [slug]);

  return null;
}
