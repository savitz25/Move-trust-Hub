/**
 * WA UTC Household Goods Carriers registry fetcher (Task 011B).
 * Official source only — zero Google Places requests.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const WA_UTC_USER_AGENT =
  'MoveTrustHub-Task011B/1.0 (state-registry; no Google Places)';

export const WA_UTC_HHG_INDUSTRY = '568';
export const WA_UTC_BASE = 'https://www.utc.wa.gov';

const LIST_PATH =
  '/companies?combine=&usdot=&exposed_select_industry=568&regulatory_status=';

export type WaUtcListRow = {
  companyNodeId: string;
  utcId: string | null;
  legalName: string | null;
  dba: string | null;
  ubi: string | null;
  usdot: string | null;
  /** Alternate USDOTs when the registry lists the same node more than once. */
  alternateUsdots: string[];
  industry: string | null;
  status: string | null;
  detailUrl: string;
  listSourceStatus: 'active' | 'all';
  listRowOccurrences: number;
};

export type WaUtcPermit = {
  code: string | null;
  industry: string | null;
  status: string | null;
  usdot: string | null;
  activePermit: string | null;
  permOrTemp: string | null;
};

export type WaUtcContact = {
  contactType: string | null;
  name: string | null;
  title: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
};

export type WaUtcCarrierRecord = {
  companyNodeId: string;
  detailUtcId: string | null;
  listUtcId: string | null;
  legalName: string | null;
  dba: string | null;
  ubi: string | null;
  industries: string | null;
  status: string | null;
  contacts: WaUtcContact[];
  primaryContactName: string | null;
  primaryContactTitle: string | null;
  phone: string | null;
  email: string | null;
  fax: string | null;
  physicalAddress: string | null;
  mailingAddress: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  permits: WaUtcPermit[];
  usdot: string | null;
  alternateUsdots: string[];
  permitNumber: string | null;
  permOrTemp: string | null;
  sourceUrl: string;
  listSourceStatus: 'active' | 'all';
  retrievedAt: string;
  parseWarnings: string[];
};

export type WaUtcFetchOptions = {
  /** Delay between HTTP requests (ms). Default 400. */
  delayMs?: number;
  /** Cap detail fetches (for dry runs). */
  detailLimit?: number;
  /** Also scrape regulatory_status=All list pages. Default true. */
  includeAllList?: boolean;
  /** Skip writing files (tests). */
  dryRun?: boolean;
  /** Output directory. Default data/state-hhg/wa */
  outDir?: string;
  /** Optional fetch impl (tests). */
  fetchImpl?: typeof fetch;
};

export type WaUtcFetchResult = {
  retrievedAt: string;
  activeListTotalClaimed: number | null;
  allListTotalClaimed: number | null;
  activeListRows: number;
  allListRows: number;
  activeRecords: WaUtcCarrierRecord[];
  fieldCoverage: Record<string, { present: number; pct: number }>;
  googlePlacesRequests: 0;
  rawPath: string;
  summaryPath: string;
  allListPath: string | null;
};

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanCell(html: string): string {
  return stripTags(html);
}

function emptyToNull(s: string | null | undefined): string | null {
  if (s == null) return null;
  const t = s.replace(/\s+/g, ' ').trim();
  if (!t || t === '—' || t === '-' || t === 'N/A') return null;
  return t;
}

function normalizeDba(raw: string | null): string | null {
  const v = emptyToNull(raw);
  if (!v) return null;
  return emptyToNull(v.replace(/^DBA:\s*/i, ''));
}

function normalizeUsdot(raw: string | null | undefined): string | null {
  const v = emptyToNull(raw);
  if (!v) return null;
  if (/under\s*16/i.test(v) || /n\/a/i.test(v)) return null;
  const digits = v.replace(/\D/g, '').replace(/^0+/, '') || '';
  // USDOT numbers are typically 5–8 digits after leading-zero trim.
  return digits.length >= 4 && digits.length <= 8 ? digits : null;
}

function preferUsdot(a: string | null, b: string | null): string | null {
  if (a && b) return a.length >= b.length ? a : b;
  return a || b;
}

function mergeListRows(existing: WaUtcListRow, incoming: WaUtcListRow): WaUtcListRow {
  const alts = new Set<string>([
    ...existing.alternateUsdots,
    ...incoming.alternateUsdots,
  ]);
  if (existing.usdot) alts.add(existing.usdot);
  if (incoming.usdot) alts.add(incoming.usdot);
  const usdot = preferUsdot(existing.usdot, incoming.usdot);
  if (usdot) alts.delete(usdot);
  return {
    ...existing,
    legalName: existing.legalName || incoming.legalName,
    dba: existing.dba || incoming.dba,
    ubi: existing.ubi || incoming.ubi,
    usdot,
    alternateUsdots: [...alts],
    industry: existing.industry || incoming.industry,
    status: existing.status || incoming.status,
    listRowOccurrences: existing.listRowOccurrences + incoming.listRowOccurrences,
  };
}

function parseAddressParts(address: string | null): {
  city: string | null;
  state: string | null;
  postalCode: string | null;
} {
  if (!address) return { city: null, state: null, postalCode: null };
  // "street, City, ST 12345" or "street, City,, ST 12345"
  const m = address.match(
    /,\s*([^,]+?)\s*,+\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)\s*$/i
  );
  if (!m) return { city: null, state: null, postalCode: null };
  return {
    city: emptyToNull(m[1]),
    state: m[2].toUpperCase(),
    postalCode: m[3],
  };
}

async function fetchText(
  url: string,
  fetchImpl: typeof fetch,
  retries = 3
): Promise<string> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetchImpl(url, {
        headers: {
          'User-Agent': WA_UTC_USER_AGENT,
          Accept: 'text/html,application/xhtml+xml',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      return await res.text();
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(500 * attempt);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

function listUrl(status: '1' | 'All', page: number): string {
  return `${WA_UTC_BASE}${LIST_PATH}${status}&page=${page}`;
}

export function parseListPage(
  html: string,
  listSourceStatus: 'active' | 'all'
): { rows: WaUtcListRow[]; total: number | null; rawRowCount: number } {
  const totalMatch = html.match(/Displaying\s+\d+\s+-\s+\d+\s+of\s+(\d+)/i);
  const total = totalMatch ? Number(totalMatch[1]) : null;

  const byId = new Map<string, WaUtcListRow>();

  // Prefer tbody rows; fall back to any tr with a company link.
  const tbodyMatch = html.match(/<tbody[\s\S]*?<\/tbody>/i);
  const scope = tbodyMatch ? tbodyMatch[0] : html;

  const rowRe = /<tr[\s\S]*?<\/tr>/gi;
  let rowMatch: RegExpExecArray | null;
  let rawRowCount = 0;
  while ((rowMatch = rowRe.exec(scope))) {
    const rowHtml = rowMatch[0];
    const link = rowHtml.match(/href="\/company\/(\d+)"/i);
    if (!link) continue;
    rawRowCount += 1;
    const companyNodeId = link[1];

    const cells = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) =>
      cleanCell(c[1])
    );
    // Expected: Detail link, UTC ID, Name, DBA, UBI, USDOT, Industry, Status
    const utcId = emptyToNull(cells[1]?.replace(/\D/g, '') || null);
    const legalName = emptyToNull(cells[2] || null);
    const dba = normalizeDba(cells[3] || null);
    const ubi = emptyToNull(cells[4]?.replace(/\D/g, '') || cells[4] || null);
    const usdot = normalizeUsdot(cells[5] || null);
    const industry = emptyToNull(cells[6] || null);
    const status = emptyToNull(cells[7] || null);

    const row: WaUtcListRow = {
      companyNodeId,
      utcId,
      legalName,
      dba,
      ubi,
      usdot,
      alternateUsdots: [],
      industry,
      status,
      detailUrl: `${WA_UTC_BASE}/company/${companyNodeId}`,
      listSourceStatus,
      listRowOccurrences: 1,
    };

    const existing = byId.get(companyNodeId);
    byId.set(companyNodeId, existing ? mergeListRows(existing, row) : row);
  }

  return { rows: [...byId.values()], total, rawRowCount };
}

function tableHasHeaders(headers: string[], required: string[]): boolean {
  const lower = headers.map((h) => h.toLowerCase());
  return required.every((r) => lower.some((h) => h.includes(r.toLowerCase())));
}

function extractTables(html: string): Array<{
  headers: string[];
  rows: Array<{ th: string[]; td: string[] }>;
}> {
  return [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) => {
    const tableHtml = t[0];
    const thead = tableHtml.match(/<thead[\s\S]*?<\/thead>/i)?.[0] ?? '';
    const headers = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((h) =>
      cleanCell(h[1])
    );
    const bodyHtml =
      tableHtml.match(/<tbody[\s\S]*?<\/tbody>/i)?.[0] ?? tableHtml;
    const rows = [...bodyHtml.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) => ({
      th: [...r[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map((x) =>
        cleanCell(x[1])
      ),
      td: [...r[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((x) =>
        cleanCell(x[1])
      ),
    }));
    return { headers, rows };
  });
}

export function parseDetailPage(
  html: string,
  companyNodeId: string,
  listRow?: WaUtcListRow | null
): WaUtcCarrierRecord {
  const warnings: string[] = [];
  const retrievedAt = new Date().toISOString();
  const tables = extractTables(html);

  let detailUtcId: string | null = null;
  let legalName: string | null = null;
  let dba: string | null = null;
  let ubi: string | null = null;
  let industries: string | null = null;
  let status: string | null = null;
  const contacts: WaUtcContact[] = [];
  let physicalAddress: string | null = null;
  let mailingAddress: string | null = null;
  const permits: WaUtcPermit[] = [];

  for (const table of tables) {
    if (tableHasHeaders(table.headers, ['UTC ID', 'Company Name'])) {
      const row = table.rows.find((r) => r.td.length >= 4);
      if (row) {
        detailUtcId = emptyToNull(row.td[0] || null);
        legalName = emptyToNull(row.td[1] || null);
        ubi = emptyToNull(row.td[2] || null);
        dba = normalizeDba(row.td[3] || null);
        industries = emptyToNull(row.td[4] || null);
        status = emptyToNull(row.td[5] || null);
      } else {
        warnings.push('basic_info_table_missing_row');
      }
      continue;
    }

    if (tableHasHeaders(table.headers, ['Contact Type', 'Phone'])) {
      for (const row of table.rows) {
        if (row.td.length < 4) continue;
        contacts.push({
          contactType: emptyToNull(row.td[0]),
          name: emptyToNull(row.td[1]),
          title: emptyToNull(row.td[2]),
          phone: emptyToNull(row.td[3]),
          fax: emptyToNull(row.td[4]),
          email: emptyToNull(row.td[5]),
        });
      }
      continue;
    }

    if (
      tableHasHeaders(table.headers, ['Address Type', 'Address']) ||
      table.rows.some((r) =>
        r.th.some((th) => /physical address|mailing address/i.test(th))
      )
    ) {
      for (const row of table.rows) {
        const label = (row.th[0] || '').toLowerCase();
        const value = emptyToNull(row.td[0] || row.td[1] || null);
        if (/physical/.test(label)) physicalAddress = value;
        else if (/mailing/.test(label)) mailingAddress = value;
      }
      continue;
    }

    if (tableHasHeaders(table.headers, ['USDOT', 'Active Permit'])) {
      for (const row of table.rows) {
        if (row.td.length < 4) continue;
        permits.push({
          code: emptyToNull(row.td[0]),
          industry: emptyToNull(row.td[1]),
          status: emptyToNull(row.td[2]),
          usdot: normalizeUsdot(row.td[3]),
          activePermit: emptyToNull(row.td[4]),
          permOrTemp: emptyToNull(row.td[5]),
        });
      }
    }
  }

  if (!legalName && listRow?.legalName) {
    legalName = listRow.legalName;
    warnings.push('legalName_fallback_list');
  }
  if (!dba && listRow?.dba) dba = listRow.dba;
  if (!ubi && listRow?.ubi) ubi = listRow.ubi;
  if (!status && listRow?.status) {
    status = listRow.status;
    warnings.push('status_fallback_list');
  }

  const primary =
    contacts.find((c) => /primary/i.test(c.contactType || '')) || contacts[0] || null;

  const hhgPermit =
    permits.find((p) => /household|207/i.test(`${p.industry || ''} ${p.code || ''}`)) ||
    permits[0] ||
    null;

  const permitUsdots = permits
    .map((p) => p.usdot)
    .filter((v): v is string => Boolean(v));
  const usdot =
    hhgPermit?.usdot ||
    permitUsdots[0] ||
    listRow?.usdot ||
    null;

  const alternateUsdots = [
    ...new Set(
      [
        ...(listRow?.alternateUsdots || []),
        listRow?.usdot,
        ...permitUsdots,
      ].filter((v): v is string => Boolean(v) && v !== usdot)
    ),
  ];

  if (!usdot) warnings.push('usdot_missing');
  if (!physicalAddress) warnings.push('physical_address_missing');
  if (!primary?.phone && !contacts.some((c) => c.phone)) warnings.push('phone_missing');

  const addrParts = parseAddressParts(physicalAddress || mailingAddress);

  return {
    companyNodeId,
    detailUtcId,
    listUtcId: listRow?.utcId ?? null,
    legalName,
    dba,
    ubi,
    industries,
    status,
    contacts,
    primaryContactName: primary?.name ?? null,
    primaryContactTitle: primary?.title ?? null,
    phone: primary?.phone || contacts.map((c) => c.phone).find(Boolean) || null,
    email: primary?.email || contacts.map((c) => c.email).find(Boolean) || null,
    fax: primary?.fax || contacts.map((c) => c.fax).find(Boolean) || null,
    physicalAddress,
    mailingAddress,
    city: addrParts.city,
    state: addrParts.state,
    postalCode: addrParts.postalCode,
    permits,
    usdot,
    alternateUsdots,
    permitNumber: hhgPermit?.activePermit || permits.map((p) => p.activePermit).find(Boolean) || null,
    permOrTemp: hhgPermit?.permOrTemp || null,
    sourceUrl: `${WA_UTC_BASE}/company/${companyNodeId}`,
    listSourceStatus: listRow?.listSourceStatus ?? 'active',
    retrievedAt,
    parseWarnings: warnings,
  };
}

function coverage(
  records: WaUtcCarrierRecord[],
  fields: Array<keyof WaUtcCarrierRecord>
): Record<string, { present: number; pct: number }> {
  const n = records.length || 1;
  const out: Record<string, { present: number; pct: number }> = {};
  for (const field of fields) {
    const present = records.filter((r) => {
      const v = r[field];
      if (v == null) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }).length;
    out[field] = {
      present,
      pct: Math.round((present / n) * 1000) / 10,
    };
  }
  return out;
}

export async function fetchAllListPages(
  status: '1' | 'All',
  listSourceStatus: 'active' | 'all',
  opts: { delayMs: number; fetchImpl: typeof fetch }
): Promise<{ rows: WaUtcListRow[]; total: number | null; rawRowCount: number }> {
  const firstHtml = await fetchText(listUrl(status, 0), opts.fetchImpl);
  const first = parseListPage(firstHtml, listSourceStatus);
  const byId = new Map<string, WaUtcListRow>();
  for (const row of first.rows) byId.set(row.companyNodeId, row);
  let rawRowCount = first.rawRowCount;

  const pageCount = Math.ceil((first.total || first.rows.length || 1) / 50);
  for (let page = 1; page < pageCount; page++) {
    await sleep(opts.delayMs);
    const html = await fetchText(listUrl(status, page), opts.fetchImpl);
    const parsed = parseListPage(html, listSourceStatus);
    rawRowCount += parsed.rawRowCount;
    for (const row of parsed.rows) {
      const existing = byId.get(row.companyNodeId);
      byId.set(row.companyNodeId, existing ? mergeListRows(existing, row) : row);
    }
    console.log(
      `[wa-utc] list status=${status} page=${page + 1}/${pageCount} unique=${byId.size} rawRows=${rawRowCount}`
    );
  }

  return { rows: [...byId.values()], total: first.total, rawRowCount };
}

export async function fetchWaUtcHhgRegistry(
  options: WaUtcFetchOptions = {}
): Promise<WaUtcFetchResult> {
  const delayMs = options.delayMs ?? 400;
  const fetchImpl = options.fetchImpl ?? fetch;
  const includeAllList = options.includeAllList ?? true;
  const outDir = resolve(options.outDir ?? 'data/state-hhg/wa');
  const retrievedAt = new Date().toISOString();

  const activeList = await fetchAllListPages('1', 'active', { delayMs, fetchImpl });
  console.log(
    `[wa-utc] active list unique=${activeList.rows.length} rawRows=${activeList.rawRowCount} claimed=${activeList.total}`
  );

  let allList: { rows: WaUtcListRow[]; total: number | null; rawRowCount: number } = {
    rows: [],
    total: null,
    rawRowCount: 0,
  };
  if (includeAllList) {
    await sleep(delayMs);
    allList = await fetchAllListPages('All', 'all', { delayMs, fetchImpl });
    console.log(
      `[wa-utc] all-status list unique=${allList.rows.length} rawRows=${allList.rawRowCount} claimed=${allList.total}`
    );
  }

  if (!options.dryRun) {
    mkdirSync(outDir, { recursive: true });
    if (includeAllList) {
      writeFileSync(
        resolve(outDir, 'utc-hhg-all-list.json'),
        JSON.stringify(
          {
            retrievedAt,
            sourceUrl: listUrl('All', 0),
            googlePlacesRequests: 0,
            listTotalClaimed: allList.total,
            rawRowCount: allList.rawRowCount,
            recordCount: allList.rows.length,
            records: allList.rows,
          },
          null,
          2
        )
      );
      console.log(`[wa-utc] wrote utc-hhg-all-list.json (${allList.rows.length})`);
    }
  }

  const detailTargets = activeList.rows.slice(
    0,
    options.detailLimit ?? activeList.rows.length
  );
  const activeRecords: WaUtcCarrierRecord[] = [];
  const checkpointPath = resolve(outDir, 'utc-hhg-active-raw.partial.json');

  for (let i = 0; i < detailTargets.length; i++) {
    const listRow = detailTargets[i];
    await sleep(delayMs);
    const html = await fetchText(listRow.detailUrl, fetchImpl);
    activeRecords.push(parseDetailPage(html, listRow.companyNodeId, listRow));
    if ((i + 1) % 25 === 0 || i + 1 === detailTargets.length) {
      console.log(
        `[wa-utc] details ${i + 1}/${detailTargets.length} (googlePlacesRequests=0)`
      );
      if (!options.dryRun) {
        writeFileSync(
          checkpointPath,
          JSON.stringify(
            {
              retrievedAt,
              partial: true,
              completed: i + 1,
              total: detailTargets.length,
              googlePlacesRequests: 0,
              records: activeRecords,
            },
            null,
            2
          )
        );
      }
    }
  }

  const fieldCoverage = coverage(activeRecords, [
    'legalName',
    'usdot',
    'physicalAddress',
    'phone',
    'email',
    'dba',
    'ubi',
    'permitNumber',
    'status',
    'city',
    'postalCode',
  ]);

  const rawPayload = {
    retrievedAt,
    regulator: 'Washington Utilities and Transportation Commission (UTC)',
    sourceName: 'UTC Companies — Household Goods Carriers (Active)',
    sourceUrl: listUrl('1', 0),
    industryFilter: 'Household Goods Carriers (568)',
    googlePlacesRequests: 0 as const,
    listTotalClaimed: activeList.total,
    recordCount: activeRecords.length,
    uniqueCompanyNodeIds: new Set(activeRecords.map((r) => r.companyNodeId)).size,
    records: activeRecords,
  };

  const summaryPayload = {
    retrievedAt,
    googlePlacesRequests: 0 as const,
    activeListTotalClaimed: activeList.total,
    activeListRawRows: activeList.rawRowCount,
    activeListUniqueNodes: activeList.rows.length,
    activeDetailRecords: activeRecords.length,
    uniqueActiveNodeIds: new Set(activeRecords.map((r) => r.companyNodeId)).size,
    note:
      'UTC list Displaying total can exceed unique /company/{nodeId} rows when the same node appears with alternate USDOT values.',
    allListTotalClaimed: allList.total,
    allListRawRows: allList.rawRowCount,
    allListUniqueNodes: allList.rows.length,
    fieldCoverage,
    parseWarningCounts: activeRecords.reduce<Record<string, number>>((acc, r) => {
      for (const w of r.parseWarnings) acc[w] = (acc[w] || 0) + 1;
      return acc;
    }, {}),
    sampleMissing: {
      noUsdot: activeRecords
        .filter((r) => !r.usdot)
        .slice(0, 5)
        .map((r) => ({ companyNodeId: r.companyNodeId, legalName: r.legalName })),
      noPhone: activeRecords
        .filter((r) => !r.phone)
        .slice(0, 5)
        .map((r) => ({ companyNodeId: r.companyNodeId, legalName: r.legalName })),
      noAddress: activeRecords
        .filter((r) => !r.physicalAddress)
        .slice(0, 5)
        .map((r) => ({ companyNodeId: r.companyNodeId, legalName: r.legalName })),
    },
  };

  const rawPath = resolve(outDir, 'utc-hhg-active-raw.json');
  const summaryPath = resolve(outDir, 'utc-hhg-active-summary.json');
  let allListPath: string | null = null;

  if (!options.dryRun) {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(rawPath, JSON.stringify(rawPayload, null, 2));
    writeFileSync(summaryPath, JSON.stringify(summaryPayload, null, 2));
    if (includeAllList) {
      allListPath = resolve(outDir, 'utc-hhg-all-list.json');
      writeFileSync(
        allListPath,
        JSON.stringify(
          {
            retrievedAt,
            sourceUrl: listUrl('All', 0),
            googlePlacesRequests: 0,
            listTotalClaimed: allList.total,
            recordCount: allList.rows.length,
            records: allList.rows,
          },
          null,
          2
        )
      );
    }
    // Ensure parent exists for any nested paths callers may pass
    mkdirSync(dirname(rawPath), { recursive: true });
  }

  return {
    retrievedAt,
    activeListTotalClaimed: activeList.total,
    allListTotalClaimed: allList.total,
    activeListRows: activeList.rows.length,
    allListRows: allList.rows.length,
    activeRecords,
    fieldCoverage,
    googlePlacesRequests: 0,
    rawPath,
    summaryPath,
    allListPath,
  };
}
