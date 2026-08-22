/**
 * Bounded parser for Ask → Move structured handoff query params.
 * Fail-closed: unknown keys ignored; forbidden keys dropped; no arbitrary objects.
 */

import {
  ASK_HANDOFF_FORBIDDEN_KEYS,
  ASK_HANDOFF_KEYS,
  MOVE_HANDOFF_ENTITY_TYPES,
  type MoveAskSearchContext,
  type MoveHandoffEntityType,
} from './allowlist';

const ALLOW = new Set<string>(ASK_HANDOFF_KEYS);
const FORBIDDEN = new Set<string>(ASK_HANDOFF_FORBIDDEN_KEYS);
const ENTITIES = new Set<string>(MOVE_HANDOFF_ENTITY_TYPES);

function firstString(input: URLSearchParams | Record<string, string | string[] | undefined>, key: string): string | undefined {
  if (input instanceof URLSearchParams) {
    const v = input.get(key);
    return v == null ? undefined : v;
  }
  const raw = input[key];
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

function slugish(value: string, max = 64): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, max);
}

function titleCity(value: string): string {
  return value
    .trim()
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
    .slice(0, 64);
}

function normalizeState(raw: string): string | undefined {
  const v = raw.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(v)) return v;
  return undefined;
}

function normalizeCountySlug(raw: string): string | undefined {
  const s = slugish(raw.replace(/\s+county$/i, '').replace(/\s+parish$/i, ''));
  return s || undefined;
}

function normalizeEntity(raw: string): MoveHandoffEntityType | undefined {
  const s = slugish(raw).replace(/-/g, '_');
  if (ENTITIES.has(s)) return s as MoveHandoffEntityType;
  return undefined;
}

/**
 * Parse request search params. Returns null when this is not an Ask handoff
 * (`src` missing or not `ask`).
 */
export function parseAskSearchHandoff(
  input: string | URLSearchParams | Record<string, string | string[] | undefined>
): MoveAskSearchContext | null {
  const params =
    typeof input === 'string'
      ? new URLSearchParams(input.replace(/^\?/, ''))
      : input;

  const src = firstString(params, 'src');
  if ((src || '').trim().toLowerCase() !== 'ask') return null;

  const ctx: MoveAskSearchContext = { source: 'ask' };

  for (const key of ASK_HANDOFF_KEYS) {
    if (key === 'src') continue;
    if (FORBIDDEN.has(key)) continue;
    if (!ALLOW.has(key)) continue;
    const raw = firstString(params, key);
    if (raw == null) continue;
    const v = String(raw).trim();
    if (!v || v.toLowerCase() === 'unknown') continue;
    if (typeof v !== 'string') continue;

    if (key === 'zip') {
      if (/^\d{5}$/.test(v)) ctx.zip = v;
      continue;
    }
    if (key === 'state') {
      const st = normalizeState(v) || (v.length <= 32 ? v.slice(0, 32) : undefined);
      if (st && /^[A-Z]{2}$/.test(st)) ctx.state = st;
      continue;
    }
    if (key === 'county') {
      const c = normalizeCountySlug(v);
      if (c) ctx.county = c;
      continue;
    }
    if (key === 'city') {
      ctx.city = titleCity(v);
      continue;
    }
    if (key === 'entity') {
      const ent = normalizeEntity(v);
      if (ent) ctx.entityType = ent;
      else ctx.unsupportedEntity = slugish(v, 64).replace(/-/g, '_') || v.slice(0, 64);
      continue;
    }
    if (key === 'category') {
      ctx.category = slugish(v, 64).replace(/-/g, '_') || undefined;
      continue;
    }
    if (key === 'intent') {
      ctx.intent = slugish(v, 32).replace(/-/g, '_') || undefined;
      continue;
    }
    if (key === 'journey') {
      ctx.journey = slugish(v, 32).replace(/-/g, '_') || undefined;
      continue;
    }
    if (key === 'sid') {
      if (/^[a-zA-Z0-9_-]{1,64}$/.test(v)) ctx.sid = v;
    }
  }

  return ctx;
}

/** Serialize allowlisted context (no leading ?). Never writes forbidden keys. */
export function serializeAskSearchHandoff(ctx: MoveAskSearchContext): string {
  const p = new URLSearchParams();
  p.set('src', 'ask');
  if (ctx.journey) p.set('journey', ctx.journey);
  if (ctx.state) p.set('state', ctx.state);
  if (ctx.county) p.set('county', ctx.county);
  if (ctx.intent) p.set('intent', ctx.intent);
  if (ctx.entityType) p.set('entity', ctx.entityType);
  if (ctx.category) p.set('category', ctx.category);
  if (ctx.city) p.set('city', slugish(ctx.city));
  if (ctx.zip) p.set('zip', ctx.zip);
  if (ctx.sid) p.set('sid', ctx.sid);
  return p.toString();
}

export function withAskHandoffParams(path: string, ctx: MoveAskSearchContext): string {
  const q = serializeAskSearchHandoff(ctx);
  const [base, existing] = path.split('?');
  if (existing) {
    const merged = new URLSearchParams(existing);
    for (const [k, v] of new URLSearchParams(q)) merged.set(k, v);
    for (const bad of FORBIDDEN) merged.delete(bad);
    return `${base}?${merged.toString()}`;
  }
  return `${base}?${q}`;
}

export function hasForbiddenHandoffKey(input: URLSearchParams | Record<string, string | string[] | undefined>): boolean {
  const keys =
    input instanceof URLSearchParams ? [...input.keys()] : Object.keys(input);
  return keys.some((k) => FORBIDDEN.has(k.toLowerCase()));
}
