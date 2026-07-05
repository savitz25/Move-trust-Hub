'use server';

import { headers } from 'next/headers';
import {
  parseCarrierNumber,
  verifyDotSchema,
} from '@/lib/verify-dot/schema';
import { resolveCarrierPreview, type FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import { findCompanyByCarrierNumber } from '@/lib/verify-dot/directory-lookup';
import { lookupFmcsaForSuggestion } from '@/lib/suggestions/fmcsa-lookup';
import { logDotVerification } from '@/lib/verify-dot/log';
import { logger } from '@/lib/logging/logger';

export type VerifyDotResult = {
  success: boolean;
  error?: string;
  saferUrl?: string;
  displayNumber?: string;
  numberType?: 'DOT' | 'MC';
  preview?: FmcsaPreview | null;
  directorySlug?: string;
  directoryName?: string;
  logged?: boolean;
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

export async function verifyCarrierNumber(
  raw: unknown
): Promise<VerifyDotResult> {
  const parsedInput = verifyDotSchema.safeParse(raw);
  if (!parsedInput.success) {
    return {
      success: false,
      error: 'Enter a valid USDOT or MC number (3–8 digits).',
    };
  }

  const carrier = parseCarrierNumber(parsedInput.data.query);
  if (!carrier) {
    return {
      success: false,
      error:
        'Could not parse that number. Try formats like 1234567, DOT 1234567, or MC-123456.',
    };
  }

  const headerStore = await headers();
  const userIp = clientIpFromHeaders(headerStore);

  const { logged } = await logDotVerification({
    dotNumber: carrier.value,
    numberType: carrier.type,
    sourcePage: parsedInput.data.sourcePage ?? '/verify-dot',
    userIp,
  });

  const directory = await findCompanyByCarrierNumber(carrier);
  const { saferUrl, preview: basePreview } = await resolveCarrierPreview(
    carrier,
    directory.preview
  );

  let preview: FmcsaPreview | null = basePreview;

  if (!directory.slug) {
    const fmcsa = await lookupFmcsaForSuggestion(carrier.display);
    if (fmcsa) {
      preview = {
        legalName: fmcsa.legalName ?? basePreview?.legalName,
        dbaName: fmcsa.dbaName ?? basePreview?.dbaName,
        physicalAddress: fmcsa.headquarters ?? basePreview?.physicalAddress,
        phone: fmcsa.phone ?? basePreview?.phone,
        usdot: fmcsa.usdot ?? (carrier.type === 'DOT' ? carrier.value : undefined),
        mcNumber: fmcsa.mcNumber ?? (carrier.type === 'MC' ? carrier.value : undefined),
        authorityStatus: fmcsa.authorityStatus ?? undefined,
        allowedToOperate: fmcsa.allowedToOperate ?? basePreview?.allowedToOperate,
        safetyRating: fmcsa.safetyRating ?? basePreview?.safetyRating,
        source: 'fmcsa_api',
      };
    }
  }

  logger.info('dot.verification_completed', {
    numberType: carrier.type,
    logged,
    hasPreview: Boolean(preview),
    inDirectory: Boolean(directory.slug),
  });

  return {
    success: true,
    saferUrl,
    displayNumber: carrier.display,
    numberType: carrier.type,
    preview,
    directorySlug: directory.slug,
    directoryName: directory.name,
    logged,
  };
}