import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import enrichmentsJson from '@/data/insurance/enrichments.json';
import type {
  ProviderEnrichmentRecord,
  ProviderEnrichmentStore,
} from '@/lib/insurance/enrichment/types';

const STORE_PATH = resolve(process.cwd(), 'data/insurance/enrichments.json');

/** Bundled at build time — used by profile/directory pages on Vercel. */
const bundledStore = enrichmentsJson as ProviderEnrichmentStore;

export function getEnrichmentStorePath(): string {
  return STORE_PATH;
}

export function readEnrichmentStore(): ProviderEnrichmentStore {
  try {
    if (!existsSync(STORE_PATH)) return bundledStore;
    const raw = readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(raw) as ProviderEnrichmentStore;
  } catch {
    return bundledStore;
  }
}

export function writeEnrichmentStore(store: ProviderEnrichmentStore): void {
  const dir = resolve(process.cwd(), 'data/insurance');
  mkdirSync(dir, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export function upsertEnrichmentInStore(record: ProviderEnrichmentRecord): ProviderEnrichmentStore {
  const store = readEnrichmentStore();
  store[record.slug] = record;
  writeEnrichmentStore(store);
  return store;
}

export function getEnrichmentBySlug(slug: string): ProviderEnrichmentRecord | undefined {
  return bundledStore[slug] ?? readEnrichmentStore()[slug];
}

export function getAllEnrichments(): ProviderEnrichmentStore {
  const disk = readEnrichmentStore();
  return { ...bundledStore, ...disk };
}