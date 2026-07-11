import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import enrichmentsJson from '@/data/lender/enrichments.json';
import type { LenderEnrichmentRecord, LenderEnrichmentStore } from '@/lib/lender/enrichment/types';

const STORE_PATH = resolve(process.cwd(), 'data/lender/enrichments.json');

/** Bundled at build time — used by profile/directory pages on Vercel. */
const bundledStore = enrichmentsJson as LenderEnrichmentStore;

export function getEnrichmentStorePath(): string {
  return STORE_PATH;
}

export function readEnrichmentStore(): LenderEnrichmentStore {
  try {
    if (!existsSync(STORE_PATH)) return bundledStore;
    const raw = readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(raw) as LenderEnrichmentStore;
  } catch {
    return bundledStore;
  }
}

export function writeEnrichmentStore(store: LenderEnrichmentStore): void {
  const dir = resolve(process.cwd(), 'data/lender');
  mkdirSync(dir, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export function upsertEnrichmentInStore(record: LenderEnrichmentRecord): LenderEnrichmentStore {
  const store = readEnrichmentStore();
  store[record.slug] = record;
  writeEnrichmentStore(store);
  return store;
}

export function getEnrichmentBySlug(slug: string): LenderEnrichmentRecord | undefined {
  return bundledStore[slug] ?? readEnrichmentStore()[slug];
}

export function getAllEnrichments(): LenderEnrichmentStore {
  const disk = readEnrichmentStore();
  return { ...bundledStore, ...disk };
}

export function resetEnrichmentCache(): void {
  // no-op — bundled store is static; scripts use readEnrichmentStore()
}