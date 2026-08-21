/**
 * FMCSA fleet observation for calibration — official QC Mobile only.
 * Does not mutate companies. Google Places: 0.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import type pg from 'pg';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier-core';
import {
  FLEET_FRESHNESS_DAYS,
  type FleetFreshness,
  type FleetObservation,
} from '@/lib/state-hhg/calibration/types';
import type { CalibrationCohortMember } from '@/lib/state-hhg/calibration/types';
import { normalizeUsdot } from '@/lib/state-hhg/normalize';
import { extractPowerUnits } from '@/lib/fmcsa/carrier-fields';

const CACHE_PATH = resolve(
  process.cwd(),
  'data/state-hhg/calibration/fleet-cache.json'
);

type FleetCache = Record<
  string,
  {
    powerUnits: number | null;
    drivers: number | null;
    mcs150Outdated: string | null;
    carrierOperation: string | null;
    retrievedAt: string;
    source: string;
  }
>;

function loadCache(): FleetCache {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as FleetCache;
}

function saveCache(cache: FleetCache) {
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/calibration'), {
    recursive: true,
  });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function freshnessFrom(
  powerUnits: number | null,
  hasUsdot: boolean,
  retrievedAt: string | null,
  mcs150Outdated: string | null
): FleetFreshness {
  if (!hasUsdot) return 'missing_usdot';
  if (powerUnits == null) return 'unknown';
  if (powerUnits === 0) return 'zero';
  if (mcs150Outdated === 'Y') return 'stale';
  if (!retrievedAt) return 'unknown';
  const ageDays =
    (Date.now() - new Date(retrievedAt).getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays > FLEET_FRESHNESS_DAYS) return 'stale';
  return 'fresh';
}

export async function loadFleetFromCompanies(
  client: pg.Client,
  members: readonly CalibrationCohortMember[]
): Promise<Map<string, FleetObservation>> {
  const usdots = [
    ...new Set(members.map((m) => m.usdot).filter(Boolean) as string[]),
  ];
  const map = new Map<string, FleetObservation>();
  if (!usdots.length) return map;

  const res = await client.query(
    `
    SELECT id, usdot_number,
           fmcsa_raw->>'totalPowerUnits' AS pu,
           fmcsa_raw->>'totalDrivers' AS drivers,
           fmcsa_raw->>'mcs150Outdated' AS outdated,
           fmcsa_raw->'carrierOperation'->>'carrierOperationDesc' AS op,
           fmcsa_last_checked
      FROM companies
     WHERE usdot_number = ANY($1::text[])
    `,
    [usdots]
  );

  const byUsdot = new Map<string, (typeof res.rows)[0]>();
  for (const row of res.rows) {
    const u = normalizeUsdot(row.usdot_number);
    if (u) byUsdot.set(u, row);
  }

  for (const m of members) {
    const u = m.usdot ? normalizeUsdot(m.usdot) : null;
    const row = u ? byUsdot.get(u) : null;
    const pu =
      row?.pu != null && String(row.pu).trim() !== ''
        ? Number(row.pu)
        : null;
    const drivers =
      row?.drivers != null && String(row.drivers).trim() !== ''
        ? Number(row.drivers)
        : null;
    const retrievedAt = row?.fmcsa_last_checked
      ? String(row.fmcsa_last_checked)
      : null;
    map.set(m.providerId, {
      providerId: m.providerId,
      usdot: u,
      powerUnits: Number.isFinite(pu as number) ? (pu as number) : null,
      drivers: Number.isFinite(drivers as number) ? (drivers as number) : null,
      mcs150Date: null,
      carrierOperation: row?.op ? String(row.op) : null,
      observationDate: retrievedAt,
      source: row?.pu != null ? 'companies.fmcsa_raw' : 'none',
      freshness: freshnessFrom(
        Number.isFinite(pu as number) ? (pu as number) : null,
        Boolean(u),
        retrievedAt,
        row?.outdated ? String(row.outdated) : null
      ),
    });
  }
  return map;
}

/** Fetch missing fleet via official FMCSA QC Mobile; cache to disk. Does not write companies. */
export async function enrichFleetViaFmcsaApi(
  existing: Map<string, FleetObservation>,
  members: readonly CalibrationCohortMember[],
  options?: { delayMs?: number; limit?: number }
): Promise<Map<string, FleetObservation>> {
  const cache = loadCache();
  const delayMs = options?.delayMs ?? 350;
  let fetched = 0;
  const out = new Map(existing);

  for (const m of members) {
    const cur = out.get(m.providerId);
    if (cur && cur.powerUnits != null) continue;
    const u = m.usdot ? normalizeUsdot(m.usdot) : null;
    if (!u) continue;
    if (options?.limit != null && fetched >= options.limit) break;

    let entry = cache[u];
    if (!entry) {
      if (!process.env.FMCSA_WEB_KEY?.trim()) {
        break;
      }
      const snapshot = await fetchFmcsaCarrierSnapshot(u);
      await new Promise((r) => setTimeout(r, delayMs));
      fetched++;
      if (snapshot?.raw) {
        const carrier = snapshot.raw as {
          totalPowerUnits?: number;
          totalDrivers?: number;
          mcs150Outdated?: string;
          carrierOperation?: { carrierOperationDesc?: string };
        };
        entry = {
          powerUnits: extractPowerUnits(carrier),
          drivers:
            carrier.totalDrivers == null ? null : Number(carrier.totalDrivers),
          mcs150Outdated: carrier.mcs150Outdated ?? null,
          carrierOperation:
            carrier.carrierOperation?.carrierOperationDesc ?? null,
          retrievedAt: new Date().toISOString(),
          source: 'fmcsa_qc_mobile',
        };
        cache[u] = entry;
        saveCache(cache);
      } else {
        entry = {
          powerUnits: null,
          drivers: null,
          mcs150Outdated: null,
          carrierOperation: null,
          retrievedAt: new Date().toISOString(),
          source: 'fmcsa_qc_mobile_miss',
        };
        cache[u] = entry;
        saveCache(cache);
      }
    }

    out.set(m.providerId, {
      providerId: m.providerId,
      usdot: u,
      powerUnits: entry.powerUnits,
      drivers: entry.drivers,
      mcs150Date: null,
      carrierOperation: entry.carrierOperation,
      observationDate: entry.retrievedAt,
      source: entry.source,
      freshness: freshnessFrom(
        entry.powerUnits,
        true,
        entry.retrievedAt,
        entry.mcs150Outdated
      ),
    });
  }
  return out;
}

export function summarizeFleet(obs: Iterable<FleetObservation>) {
  const rows = [...obs];
  return {
    providers: rows.length,
    withUsdot: rows.filter((r) => r.usdot).length,
    usablePowerUnits: rows.filter(
      (r) => r.powerUnits != null && r.powerUnits > 0
    ).length,
    fresh: rows.filter((r) => r.freshness === 'fresh').length,
    stale: rows.filter((r) => r.freshness === 'stale').length,
    zero: rows.filter((r) => r.freshness === 'zero').length,
    unknown: rows.filter((r) => r.freshness === 'unknown').length,
    missingUsdot: rows.filter((r) => r.freshness === 'missing_usdot').length,
  };
}
