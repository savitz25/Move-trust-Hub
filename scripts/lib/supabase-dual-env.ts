import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/** Load .env.local / .env into process.env without overwriting existing keys. */
export function loadEnvLocalFiles(): void {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      // Strip accidental angle-bracket wrappers from paste mistakes
      if (value.startsWith('<') && value.endsWith('>')) {
        value = value.slice(1, -1);
      }
      // Fix doubled https://<https://... paste bug
      value = value.replace(/^https:\/\/<https:\/\//i, 'https://');
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

export type DualSupabaseConfig = {
  sourceUrl: string;
  sourceKey: string;
  targetUrl: string;
  targetKey: string;
  sourceRef: string;
  targetRef: string;
};

function projectRef(url: string): string {
  const m = url.match(/https:\/\/([a-z0-9]+)\.supabase\.co/i);
  return m?.[1] ?? 'unknown';
}

function isValidServiceKey(key: string): boolean {
  return Boolean(key) && key.length > 40 && !key.startsWith('<') && key.includes('.');
}

function isValidUrl(url: string): boolean {
  return (
    Boolean(url) &&
    url.includes('supabase.co') &&
    !url.includes('placeholder') &&
    !url.includes('<')
  );
}

/**
 * Resolve FREE (source/uvq) and PRO (target/are) credentials.
 * Prefer explicit SOURCE_* / TARGET_* then fall back to NEXT_PUBLIC_* as TARGET.
 */
export function resolveDualSupabaseConfig(): DualSupabaseConfig {
  loadEnvLocalFiles();

  const sourceUrl = (
    process.env.SOURCE_SUPABASE_URL ||
    process.env.FREE_SUPABASE_URL ||
    process.env.UVQ_SUPABASE_URL ||
    'https://uvqkyupfnpswdozmuzih.supabase.co'
  ).trim();

  const sourceKey = (
    process.env.SOURCE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.FREE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.UVQ_SUPABASE_SERVICE_ROLE_KEY ||
    ''
  ).trim();

  const targetUrl = (
    process.env.TARGET_SUPABASE_URL ||
    process.env.PRO_SUPABASE_URL ||
    process.env.ARE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://arepfylnilkjmyduhwbz.supabase.co'
  ).trim();

  const targetKey = (
    process.env.TARGET_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.PRO_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ARE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''
  ).trim();

  if (!isValidUrl(sourceUrl) || !isValidServiceKey(sourceKey)) {
    throw new Error(
      'Missing FREE/SOURCE Supabase credentials.\n' +
        'Set in .env.local:\n' +
        '  SOURCE_SUPABASE_URL=https://uvqkyupfnpswdozmuzih.supabase.co\n' +
        '  SOURCE_SUPABASE_SERVICE_ROLE_KEY=<service_role from FREE project Dashboard → Settings → API>\n' +
        'Do not wrap values in <angle brackets>.'
    );
  }

  if (!isValidUrl(targetUrl) || !isValidServiceKey(targetKey)) {
    throw new Error(
      'Missing PRO/TARGET Supabase credentials.\n' +
        'Set TARGET_SUPABASE_URL + TARGET_SUPABASE_SERVICE_ROLE_KEY\n' +
        'or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (are project).'
    );
  }

  const sourceRef = projectRef(sourceUrl);
  const targetRef = projectRef(targetUrl);
  if (sourceRef === targetRef) {
    throw new Error(`SOURCE and TARGET resolve to the same project (${sourceRef}). Aborting.`);
  }

  return {
    sourceUrl,
    sourceKey,
    targetUrl,
    targetKey,
    sourceRef,
    targetRef,
  };
}

export function redactUrl(url: string): string {
  return url.replace(/https:\/\/([a-z0-9]+)\.supabase\.co/i, 'https://$1.supabase.co');
}
