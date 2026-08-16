import { readFileSync } from 'node:fs';

export function databaseUrl(): string {
  const line = readFileSync('.env.local', 'utf8').split(/\r?\n/).find((value) => value.includes('DATABASE_URL'));
  const value = line?.slice((line.indexOf('=') ?? -1) + 1).trim().replace(/^['"]|['"]$/g, '');
  if (!value) throw new Error('DATABASE_URL is not configured');
  return value;
}

export function directDatabaseUrl(): string {
  const url = new URL(databaseUrl());
  const projectRef = url.username.match(/^postgres\.([a-z]+)$/)?.[1];
  if (!url.hostname.includes('pooler') || !projectRef) return url.toString();
  url.hostname = `db.${projectRef}.supabase.co`;
  url.port = '5432';
  url.username = 'postgres';
  return url.toString();
}

export const ssl = { rejectUnauthorized: false } as const;
