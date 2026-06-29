import 'server-only';

import { getAllCompanies } from '@/lib/data-server';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';

const normalizeDigits = (value: string) => value.replace(/\D/g, '');

export async function findCompanyByCarrierNumber(
  parsed: ParsedCarrierNumber
): Promise<{
  preview: FmcsaPreview | null;
  slug?: string;
  name?: string;
}> {
  const companies = await getAllCompanies();
  const target = parsed.value;

  const match = companies.find((c) => {
    if (parsed.type === 'DOT') {
      return normalizeDigits(c.usdotNumber || '') === target;
    }
    return normalizeDigits(c.mcNumber || '') === target;
  });

  if (!match) return { preview: null };

  return {
    slug: match.slug,
    name: match.name,
    preview: {
      legalName: match.name,
      dbaName: match.shortDescription || undefined,
      physicalAddress: match.headquarters || undefined,
      safetyRating: match.fmcsaSafetyRating,
      allowedToOperate: match.isVerified ? 'Y' : undefined,
      source: 'directory',
    },
  };
}