'use client';

import { useEffect } from 'react';
import {
  trackOutboundPrimarySource,
  trackOutboundRegulatorLookup,
  trackOutboundSpecialistHub,
  trackResearchPathClick,
} from '@/components/ga-events';
import type { GaHub } from '@/lib/analytics/ga-config';

/**
 * Phase 5 — capture outbound verification + key internal research path clicks.
 * Mount for Move and Insurance hubs (host-aware GA). No PII.
 */

function closestAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest('a[href]');
}

function hostOf(href: string): string | null {
  try {
    return new URL(href, window.location.origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function pathOf(href: string): string | null {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return null;
  }
}

function isMovePrimarySourceHost(host: string): boolean {
  return (
    host === 'safer.fmcsa.dot.gov' ||
    host === 'www.fmcsa.dot.gov' ||
    host === 'fmcsa.dot.gov' ||
    host.endsWith('.fmcsa.dot.gov')
  );
}

/** Official insurance / Medicare / marketplace government & regulator hosts. */
function isInsurancePrimarySourceHost(host: string): boolean {
  if (
    host === 'www.medicare.gov' ||
    host === 'medicare.gov' ||
    host === 'www.cms.gov' ||
    host === 'cms.gov' ||
    host === 'www.healthcare.gov' ||
    host === 'healthcare.gov' ||
    host === 'www.medicaid.gov' ||
    host === 'medicaid.gov' ||
    host === 'www.shiphelp.org' ||
    host === 'shiphelp.org' ||
    host === 'content.naic.org' ||
    host === 'www.naic.org' ||
    host === 'naic.org' ||
    host === 'npiregistry.cms.hhs.gov' ||
    host === 'data.cms.gov' ||
    host === 'licenseesearch.fldfs.com' ||
    host.endsWith('.gov')
  ) {
    return true;
  }
  return false;
}

function specialistHubKind(
  host: string,
  currentHub: GaHub
): 'lender' | 'insurance' | 'ask' | 'move' | null {
  if (host === 'www.lendertrusthub.com' || host === 'lendertrusthub.com') {
    return 'lender';
  }
  if (host === 'www.insurancetrusthub.com' || host === 'insurancetrusthub.com') {
    return currentHub === 'insurance' ? null : 'insurance';
  }
  if (host === 'www.asktrusthub.com' || host === 'asktrusthub.com') {
    return 'ask';
  }
  if (host === 'www.movetrusthub.com' || host === 'movetrusthub.com') {
    return currentHub === 'move' ? null : 'move';
  }
  return null;
}

function classifyMovePath(
  fromPath: string,
  toPath: string,
  explicit?: string | null
): string | null {
  if (explicit) return explicit;
  const from = fromPath.toLowerCase();
  const to = toPath.toLowerCase();

  if (
    (from.startsWith('/local-movers') || from.includes('/local-movers/')) &&
    to.startsWith('/companies/') &&
    to !== '/companies'
  ) {
    return 'county_to_profile';
  }
  if (from.startsWith('/companies/') && (to === '/compare' || to.startsWith('/compare?'))) {
    return 'profile_to_compare';
  }
  const toolPaths = ['/moving-calculator', '/verify-dot', '/compare', '/my-move'];
  if (toolPaths.some((p) => from === p || from.startsWith(`${p}/`)) && to.startsWith('/companies')) {
    return 'tool_to_directory';
  }
  if (
    (from === '/companies' || from.startsWith('/companies?')) &&
    to.startsWith('/companies/') &&
    to !== '/companies'
  ) {
    return 'directory_to_profile';
  }
  if (to === '/compare' || to.startsWith('/compare?')) return 'to_compare';
  if (to === '/verify-dot' || to.startsWith('/verify-dot')) return 'to_verify_dot';
  if (to === '/moving-calculator' || to.startsWith('/moving-calculator')) {
    return 'to_calculator';
  }
  if (to === '/my-move' || to.startsWith('/my-move')) return 'to_my_move';
  if (to.startsWith('/local-movers')) return 'to_local_movers';
  return null;
}

function classifyInsurancePath(
  fromPath: string,
  toPath: string,
  explicit?: string | null
): string | null {
  if (explicit) return explicit;
  const from = fromPath.toLowerCase();
  const to = toPath.toLowerCase();

  // Hub / market → agency profile
  if (
    (from.startsWith('/hubs/') || from.startsWith('/directory')) &&
    to.startsWith('/providers/') &&
    to !== '/providers'
  ) {
    return 'hub_to_profile';
  }

  // Profile → verify / license tool
  if (
    from.startsWith('/providers/') &&
    (to.startsWith('/tools/license-verification') || to.includes('license'))
  ) {
    return 'profile_to_verify';
  }

  // Tool → hub / directory
  if (
    (from.startsWith('/tools/') ||
      from.startsWith('/calculators/') ||
      from.startsWith('/medicare')) &&
    (to.startsWith('/hubs') || to.startsWith('/directory') || to.startsWith('/providers'))
  ) {
    return 'tool_to_hub';
  }

  // Profile → compare
  if (
    from.startsWith('/providers/') &&
    (to.startsWith('/my-insurance/compare') || to.includes('compare'))
  ) {
    return 'profile_to_compare';
  }

  // County research hub ↔ Medicare
  if (from.startsWith('/hubs/') && to.startsWith('/medicare/')) {
    return 'hub_to_medicare';
  }
  if (from.startsWith('/medicare/') && to.startsWith('/hubs/')) {
    return 'medicare_to_hub';
  }

  if (to.startsWith('/tools/license-verification')) return 'to_license_verify';
  if (to.startsWith('/medicare')) return 'to_medicare';
  if (to.startsWith('/directory')) return 'to_directory';
  if (to.startsWith('/my-insurance')) return 'to_my_insurance';

  return null;
}

type Props = {
  hub?: GaHub;
};

export function ResearchClickTracker({ hub = 'move' }: Props) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = closestAnchor(event.target);
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      const host = hostOf(href);
      const toPath = pathOf(href);
      if (!host || !toPath) return;

      const fromPath = window.location.pathname;
      const explicit = anchor.getAttribute('data-research-path');

      const isPrimary =
        hub === 'insurance'
          ? isInsurancePrimarySourceHost(host)
          : isMovePrimarySourceHost(host);

      if (isPrimary) {
        trackOutboundPrimarySource({
          destination_host: host,
          link_label: (anchor.textContent || '').trim().slice(0, 80) || undefined,
          page_path: fromPath,
        });
        // Also fire regulator-specific event for .gov DOI-style hosts on insurance
        if (hub === 'insurance' && (host.endsWith('.gov') || host.includes('fldfs'))) {
          trackOutboundRegulatorLookup({
            destination_host: host,
            page_path: fromPath,
          });
        }
        return;
      }

      const specialist = specialistHubKind(host, hub);
      if (specialist) {
        trackOutboundSpecialistHub({
          hub: specialist,
          destination_host: host,
          page_path: fromPath,
        });
        return;
      }

      try {
        const u = new URL(href, window.location.origin);
        if (u.origin !== window.location.origin) return;
      } catch {
        return;
      }

      const kind =
        hub === 'insurance'
          ? classifyInsurancePath(fromPath, toPath, explicit)
          : classifyMovePath(fromPath, toPath, explicit);
      if (!kind) return;

      trackResearchPathClick({
        path_kind: kind,
        from_path: fromPath,
        to_path: toPath,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [hub]);

  return null;
}
