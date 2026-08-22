/**
 * Map parsed Ask context onto existing Move routes.
 * Reuses local-movers / auto-transport / company profiles — no second search system.
 */

import { MOVER_ENTITY_TYPES, type MoveAskSearchContext, type MoveHandoffEntityType } from './allowlist';
import { resolveHandoffGeography, type GeographyMatchClass, type ResolvedGeography } from './geography';
import { withAskHandoffParams } from './parse';

export type AskHandoffStatus = 'ok' | 'unsupported';

export type AskHandoffResolution = {
  status: AskHandoffStatus;
  path: string;
  href: string;
  entityType?: MoveHandoffEntityType;
  geography?: ResolvedGeography;
  matchClass?: GeographyMatchClass;
  backLabel: string;
  bannerTitle: string;
  bannerBody: string;
  reason?: string;
};

function placeLabel(geo?: ResolvedGeography, ctx?: MoveAskSearchContext): string {
  if (geo?.city && geo.stateCode) return `${geo.city}, ${geo.stateCode}`;
  if (ctx?.city && geo?.stateCode) return `${ctx.city}, ${geo.stateCode}`;
  if (geo?.countyName && geo.stateCode) return `${geo.countyName}, ${geo.stateCode}`;
  if (geo?.stateCode) return geo.stateCode;
  return 'your search';
}

function moverBackLabel(geo: ResolvedGeography | undefined, ctx: MoveAskSearchContext): string {
  return `Back to movers serving ${placeLabel(geo, ctx)}`;
}

function bannerForMovers(geo: ResolvedGeography, ctx: MoveAskSearchContext): { title: string; body: string } {
  const place = placeLabel(geo, ctx);
  if (geo.matchClass === 'county_service_area_via_zip_resolution' && geo.countyName && ctx.zip) {
    return {
      title: `Movers serving ${geo.countyName}, ${geo.stateCode}`,
      body: `ZIP ${ctx.zip} is in ${geo.city || 'this area'}, which is part of ${geo.countyName}. These listings use county service coverage, not an explicit ZIP ${ctx.zip} service area.`,
    };
  }
  if (geo.cityCoveredByCountyOnly && geo.countyName && geo.city) {
    return {
      title: `Movers serving ${place}`,
      body: `${geo.city} is in ${geo.countyName}. Results are loaded from that county directory. County coverage is not the same as an exact ${geo.city} listing.`,
    };
  }
  if (geo.countyName) {
    return {
      title: `Movers serving ${geo.countyName}, ${geo.stateCode}`,
      body: 'These companies are listed for this county from MoveTrustHub’s existing local-mover directory.',
    };
  }
  return {
    title: `Movers in ${geo.stateCode}`,
    body: 'Browse existing MoveTrustHub listings for this state. No extra search is required.',
  };
}

export function resolveAskSearchHandoff(ctx: MoveAskSearchContext): AskHandoffResolution {
  if (ctx.unsupportedEntity) {
    return unsupported(ctx, `unsupported_entity:${ctx.unsupportedEntity}`);
  }

  const entity = ctx.entityType;

  if (entity === 'moving_broker') {
    const path = '/from-ask/unsupported';
    return {
      status: 'unsupported',
      path,
      href: withAskHandoffParams(path, ctx),
      entityType: entity,
      backLabel: 'Back to Ask search',
      bannerTitle: 'No dedicated moving-broker directory for this search',
      bannerBody:
        'MoveTrustHub does not treat moving brokers as movers. This handoff was not redirected to the local mover directory.',
      reason: 'moving_broker_has_no_preload_directory',
    };
  }

  if (entity === 'auto_transporter') {
    const path = '/auto-transport';
    return {
      status: 'ok',
      path,
      href: withAskHandoffParams(path, ctx),
      entityType: entity,
      matchClass: 'state_service_area',
      backLabel: 'Back to auto transporters',
      bannerTitle: 'Auto transport companies',
      bannerBody:
        'These are auto transport listings from MoveTrustHub’s existing directory — not household-goods movers.',
    };
  }

  const geo = resolveHandoffGeography(ctx);
  if (!geo) {
    return {
      status: 'ok',
      path: '/local-movers',
      href: withAskHandoffParams('/local-movers', ctx),
      entityType: entity,
      matchClass: 'state_service_area',
      backLabel: 'Back to local movers',
      bannerTitle: 'Local movers',
      bannerBody: 'Choose a state to browse existing county mover directories.',
    };
  }

  const path = geo.countySlug
    ? `/local-movers/${geo.stateSlug}/${geo.countySlug}`
    : `/local-movers/${geo.stateSlug}`;
  const copy = bannerForMovers(geo, ctx);

  return {
    status: 'ok',
    path,
    href: withAskHandoffParams(path, ctx),
    entityType: entity,
    geography: geo,
    matchClass: geo.matchClass,
    backLabel: moverBackLabel(geo, ctx),
    bannerTitle: copy.title,
    bannerBody: copy.body,
  };
}

function unsupported(ctx: MoveAskSearchContext, reason: string): AskHandoffResolution {
  const path = '/from-ask/unsupported';
  return {
    status: 'unsupported',
    path,
    href: withAskHandoffParams(path, ctx),
    entityType: ctx.entityType,
    backLabel: 'Back to Ask search',
    bannerTitle: 'This search type is not available here',
    bannerBody: 'MoveTrustHub did not substitute a different directory.',
    reason,
  };
}

/** Paths that already show the resolved results — no redirect needed. */
export function isResolvedAskPath(pathname: string, resolution: AskHandoffResolution): boolean {
  const current = pathname.replace(/\/$/, '') || '/';
  const target = resolution.path.replace(/\/$/, '') || '/';
  if (current === target) return true;
  if (current.startsWith('/companies/')) return true;
  if (current.startsWith('/auto-transport/')) return true;
  return false;
}

/** Entry paths that should bounce into the resolved directory. */
export function shouldRedirectAskEntry(pathname: string): boolean {
  const p = pathname.replace(/\/$/, '') || '/';
  return (
    p === '/' ||
    p === '/from-ask' ||
    p === '/local-movers' ||
    /^\/local-movers\/[^/]+$/.test(p) ||
    p.startsWith('/moving-to/')
  );
}
