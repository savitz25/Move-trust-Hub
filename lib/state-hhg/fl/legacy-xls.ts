/**
 * Parse FDACS legacy ASP.NET HTML-as-XLS export.
 * Columns: NAME, ADDRESS, PHONE, EMAIL, CITY, STATE, DBA/OTHER NAME,
 * LICENSE TYPE, LICENSE NO#, ISSUED DATE, EXPIRED DATE, LICENSE STATUS
 */
import { readFileSync } from 'fs';
import { parseFdacsDate } from '@/lib/state-hhg/normalize';

export type FdacsLegacyRow = {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  dbaOtherName: string;
  licenseType: string;
  licenseNumber: string;
  issuedDate: string;
  expiredDate: string;
  licenseStatus: string;
};

function cells(trHtml: string): string[] {
  return [...trHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) =>
    m[1]
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export function parseFdacsLegacyXls(content: string): FdacsLegacyRow[] {
  const trs = [...content.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)];
  if (!trs.length) return [];
  const header = cells(trs[0][1]).map((h) => h.toUpperCase());
  const idx = (name: string) => header.indexOf(name.toUpperCase());
  const map = {
    name: idx('NAME'),
    address: idx('ADDRESS'),
    phone: idx('PHONE'),
    email: idx('EMAIL'),
    city: idx('CITY'),
    state: idx('STATE'),
    dba: idx('DBA/OTHER NAME'),
    licenseType: idx('LICENSE TYPE'),
    licenseNumber: idx('LICENSE NO#'),
    issued: idx('ISSUED DATE'),
    expired: idx('EXPIRED DATE'),
    status: idx('LICENSE STATUS'),
  };
  const out: FdacsLegacyRow[] = [];
  for (let i = 1; i < trs.length; i++) {
    const c = cells(trs[i][1]);
    if (!c.length) continue;
    const licenseNumber = (c[map.licenseNumber] ?? '').trim();
    const name = (c[map.name] ?? '').trim();
    if (!licenseNumber || !name) continue;
    out.push({
      name,
      address: (c[map.address] ?? '').trim(),
      phone: (c[map.phone] ?? '').trim(),
      email: (c[map.email] ?? '').trim(),
      city: (c[map.city] ?? '').trim(),
      state: (c[map.state] ?? '').trim(),
      dbaOtherName: (c[map.dba] ?? '').trim(),
      licenseType: (c[map.licenseType] ?? '').trim(),
      licenseNumber,
      issuedDate: (c[map.issued] ?? '').trim(),
      expiredDate: (c[map.expired] ?? '').trim(),
      licenseStatus: (c[map.status] ?? '').trim(),
    });
  }
  return out;
}

export function loadFdacsLegacyXls(path: string): FdacsLegacyRow[] {
  return parseFdacsLegacyXls(readFileSync(path, 'utf8'));
}

/** Legacy dates often appear as MM/DD/YY — normalize to ISO. */
export function parseFdacsLegacyDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const full = parseFdacsDate(value);
  if (full) return full;
  const m = String(value).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (!m) return null;
  const yy = Number(m[3]);
  const year = yy >= 70 ? 1900 + yy : 2000 + yy;
  return `${year}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}
