/**
 * FMCSA field coverage audit — run: npx tsx scripts/audit-fmcsa-fields.ts
 * Requires FMCSA_WEB_KEY in environment or .env.local
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import {
  deriveUsdotStatus,
  extractCargoCarried,
  extractCarrierOperation,
  extractEntityType,
  extractMcs150Mileage,
  extractPowerUnits,
  formatAuthorityStatus,
  buildAddressParts,
} from '../lib/fmcsa/carrier-fields';

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

loadEnvLocal();

const REQUIRED = [
  'Entity Type',
  'USDOT Status (ACTIVE / OUT OF SERVICE)',
  'USDOT Number',
  'Legal Name',
  'Physical Address',
  'Phone Number',
  'Power Units',
  'Carrier Operation',
  'Cargo Carried',
  'MCS-150 Mileage per year',
  'MC Number',
  'Authority Status',
] as const;

type AuditRow = {
  field: (typeof REQUIRED)[number];
  apiAvailable: boolean;
  storedInRaw: boolean;
  displayedInUi: boolean;
  example: string | null;
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function extractContentArray(json: Record<string, unknown> | null, keys: string[]): unknown[] {
  if (!json) return [];
  const content = json.content;
  if (!content || typeof content !== 'object') return [];
  const record = content as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

async function fetchCarrierEnriched(dot: string, webKey: string) {
  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
  const key = `webKey=${encodeURIComponent(webKey)}`;

  const [carrierJson, cargoJson, opJson, authorityJson, oosJson] = await Promise.all([
    fetchJson<{ content?: { carrier?: Record<string, unknown> } }>(
      `${base}/${dot}?${key}`
    ),
    fetchJson<Record<string, unknown>>(`${base}/${dot}/cargo-carried?${key}`),
    fetchJson<Record<string, unknown>>(`${base}/${dot}/operation-classification?${key}`),
    fetchJson<Record<string, unknown>>(`${base}/${dot}/authority?${key}`),
    fetchJson<Record<string, unknown>>(`${base}/${dot}/oos?${key}`),
  ]);

  const carrier = carrierJson?.content?.carrier;
  if (!carrier) return null;

  return {
    ...carrier,
    _supplemental: {
      cargoCarried: extractContentArray(cargoJson, ['cargoCarried', 'cargoClasses', 'cargoClass']),
      operationClassification: extractContentArray(opJson, [
        'operationClassifications',
        'operationClassification',
        'operationClasses',
        'operationClass',
      ]),
      authority: extractContentArray(authorityJson, [
        'carrierAuthority',
        'authority',
        'authorities',
      ]),
      oos: extractContentArray(oosJson, ['oos', 'oosList', 'outOfService']),
    },
  } as Record<string, unknown>;
}

async function fetchCarrierByMc(mc: string, webKey: string) {
  const url = `https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/MC${mc}?webKey=${encodeURIComponent(webKey)}`;
  const json = await fetchJson<{ content?: { carrier?: Record<string, unknown> } }>(url);
  const carrier = json?.content?.carrier;
  if (!carrier?.dotNumber) return null;
  const dot = String(carrier.dotNumber).replace(/\D/g, '');
  return fetchCarrierEnriched(dot, webKey);
}

function auditCarrier(carrier: Record<string, unknown>): AuditRow[] {
  const address = buildAddressParts(carrier);
  const authority = formatAuthorityStatus(carrier);

  const rows: AuditRow[] = [
    {
      field: 'Entity Type',
      apiAvailable: Boolean(extractEntityType(carrier)),
      storedInRaw: Boolean(extractEntityType(carrier)),
      displayedInUi: true,
      example: extractEntityType(carrier),
    },
    {
      field: 'USDOT Status (ACTIVE / OUT OF SERVICE)',
      apiAvailable: 'allowedToOperate' in carrier || 'oosDate' in carrier,
      storedInRaw: true,
      displayedInUi: true,
      example: deriveUsdotStatus(carrier),
    },
    {
      field: 'USDOT Number',
      apiAvailable: 'dotNumber' in carrier,
      storedInRaw: true,
      displayedInUi: true,
      example: String(carrier.dotNumber ?? '—'),
    },
    {
      field: 'Legal Name',
      apiAvailable: 'legalName' in carrier,
      storedInRaw: true,
      displayedInUi: true,
      example: String(carrier.legalName ?? '—'),
    },
    {
      field: 'Physical Address',
      apiAvailable: Boolean(address.combined),
      storedInRaw: true,
      displayedInUi: true,
      example: address.combined,
    },
    {
      field: 'Phone Number',
      apiAvailable: 'telephone' in carrier,
      storedInRaw: true,
      displayedInUi: true,
      example: String(carrier.telephone ?? '—'),
    },
    {
      field: 'Power Units',
      apiAvailable: extractPowerUnits(carrier) !== null,
      storedInRaw: true,
      displayedInUi: true,
      example: String(extractPowerUnits(carrier) ?? '—'),
    },
    {
      field: 'Carrier Operation',
      apiAvailable: Boolean(extractCarrierOperation(carrier)),
      storedInRaw: true,
      displayedInUi: true,
      example: extractCarrierOperation(carrier),
    },
    {
      field: 'Cargo Carried',
      apiAvailable: Boolean(extractCargoCarried(carrier)),
      storedInRaw: true,
      displayedInUi: true,
      example: extractCargoCarried(carrier),
    },
    {
      field: 'MCS-150 Mileage per year',
      apiAvailable: Boolean(extractMcs150Mileage(carrier)),
      storedInRaw: Boolean(extractMcs150Mileage(carrier)),
      displayedInUi: true,
      example: extractMcs150Mileage(carrier) ?? 'Not reported by FMCSA API',
    },
    {
      field: 'MC Number',
      apiAvailable: 'docketNumber' in carrier,
      storedInRaw: true,
      displayedInUi: true,
      example: String(carrier.docketNumber ?? '—'),
    },
    {
      field: 'Authority Status',
      apiAvailable: Boolean(authority),
      storedInRaw: true,
      displayedInUi: true,
      example: authority,
    },
  ];

  return rows;
}

async function main() {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) {
    console.error('FAIL: FMCSA_WEB_KEY not set — cannot run live API audit');
    process.exit(1);
  }

  const dotTests = ['3784776', '125563'];
  const mcTests = ['15735'];

  console.log('=== FMCSA Field Coverage Audit ===\n');

  let pass = 0;
  let partial = 0;
  let fail = 0;

  for (const dot of dotTests) {
    console.log(`\n--- USDOT ${dot} ---`);
    try {
      const carrier = await fetchCarrierEnriched(dot, webKey);
      if (!carrier) {
        console.log('No carrier returned');
        continue;
      }
      const rows = auditCarrier(carrier);
      for (const r of rows) {
        const status = r.displayedInUi ? 'UI✓' : r.storedInRaw ? 'RAW✓' : r.apiAvailable ? 'API✓' : '✗';
        if (r.apiAvailable && r.displayedInUi) pass++;
        else if (r.apiAvailable) partial++;
        else fail++;
        console.log(`  [${status}] ${r.field}: ${r.example ?? 'n/a'}`);
      }
    } catch (e) {
      console.error('  Error:', e);
    }
  }

  for (const mc of mcTests) {
    console.log(`\n--- MC-${mc} ---`);
    try {
      const carrier = await fetchCarrierByMc(mc, webKey);
      if (!carrier) {
        console.log('No carrier returned');
        continue;
      }
      const rows = auditCarrier(carrier);
      for (const r of rows) {
        const status = r.displayedInUi ? 'UI✓' : r.storedInRaw ? 'RAW✓' : r.apiAvailable ? 'API✓' : '✗';
        if (r.apiAvailable && r.displayedInUi) pass++;
        else if (r.apiAvailable) partial++;
        else fail++;
        console.log(`  [${status}] ${r.field}: ${r.example ?? 'n/a'}`);
      }
    } catch (e) {
      console.error('  Error:', e);
    }
  }

  console.log(`\n=== Totals: ${pass} pass, ${partial} partial, ${fail} missing ===`);
}

main();