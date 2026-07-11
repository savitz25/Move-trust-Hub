import type { NmlsBranchRow, NmlsLicenseRow, NmlsSuggestionPreview } from '@/lib/lender/onboarding/types';

const NMLS_BASE = 'https://www.nmlsconsumeraccess.org';

function cleanText(value: string | null | undefined): string | null {
  if (!value) return null;
  const t = value.replace(/\s+/g, ' ').trim();
  return t || null;
}

function extractField(html: string, label: string): string | null {
  const patterns = [
    new RegExp(`<td[^>]*>\\s*${label}\\s*</td>\\s*<td[^>]*>([^<]+)</td>`, 'i'),
    new RegExp(`${label}[^<]*</[^>]+>\\s*<[^>]+>([^<]+)<`, 'i'),
    new RegExp(`"${label}"\\s*:\\s*"([^"]+)"`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return cleanText(m[1]);
  }
  return null;
}

function extractLicenses(html: string): NmlsLicenseRow[] {
  const licenses: NmlsLicenseRow[] = [];
  const rowRe =
    /<tr[^>]*>[\s\S]*?<td[^>]*>([A-Z]{2})<\/td>[\s\S]*?<td[^>]*>([^<]*)<\/td>[\s\S]*?<td[^>]*>([^<]*)<\/td>[\s\S]*?<td[^>]*>([^<]*)<\/td>/gi;
  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(html)) !== null) {
    const state = cleanText(m[1]);
    if (!state || state.length !== 2) continue;
    licenses.push({
      state,
      regulator: cleanText(m[2]) ?? state,
      licenseName: cleanText(m[3]) ?? 'Mortgage',
      authorized: /yes|authorized/i.test(m[4] ?? ''),
      status: cleanText(m[4]),
    });
  }
  return licenses.slice(0, 60);
}

function extractBranches(html: string): NmlsBranchRow[] {
  const branches: NmlsBranchRow[] = [];
  const branchRe =
    /Branch[^<]*NMLS\s*#?\s*(\d+)[^<]*<[^>]*>([^<]+)</gi;
  let m: RegExpExecArray | null;
  while ((m = branchRe.exec(html)) !== null) {
    branches.push({
      name: cleanText(m[2]) ?? 'Branch',
      nmlsId: m[1],
      address: null,
      city: null,
      state: null,
    });
  }
  return branches.slice(0, 20);
}

export function parseNmlsEntityHtml(
  html: string,
  nmlsId: string,
  scrapeMethod: NmlsSuggestionPreview['scrapeMethod']
): NmlsSuggestionPreview | null {
  if (/unable to access|cf-browser-verification|challenge-platform/i.test(html)) {
    return null;
  }

  const legalName =
    extractField(html, 'Entity Name') ??
    extractField(html, 'Company Name') ??
    html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ??
    null;

  if (!legalName) return null;

  const streetAddress =
    extractField(html, 'Street Address') ?? extractField(html, 'Location Street Address');
  const city = extractField(html, 'City');
  const state = extractField(html, 'State');
  const zip = extractField(html, 'Zip') ?? extractField(html, 'Zip Code');

  const licenses = extractLicenses(html);
  const stateRegulators = [...new Set(licenses.map((l) => l.regulator))];

  const warnings: string[] = [];
  if (!streetAddress) warnings.push('Street address not found — flagged for manual review.');
  if (licenses.length === 0) warnings.push('State licenses not parsed — verify on NMLS directly.');

  return {
    nmlsId,
    entityType: 'COMPANY',
    legalName,
    otherNames: [],
    streetAddress,
    city,
    state,
    zip,
    phone: extractField(html, 'Phone'),
    fax: extractField(html, 'Fax'),
    website: extractField(html, 'Website'),
    businessEmail: extractField(html, 'Email'),
    dateFormed:
      extractField(html, 'Date Formed') ??
      extractField(html, 'Other Trade Names') ??
      null,
    stateRegulators,
    licenses,
    branches: extractBranches(html),
    nmlsRecordUrl: `${NMLS_BASE}/EntityDetails.aspx/COMPANY/${nmlsId}`,
    fetchedAt: new Date().toISOString(),
    scrapeMethod,
    needsManualReview: warnings.length > 0,
    scrapeWarnings: warnings,
  };
}

export function nmlsSearchUrl(nmlsId: string): string {
  return `${NMLS_BASE}/EntityDetails.aspx/COMPANY/${nmlsId}`;
}