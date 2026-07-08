'use server';

import { headers } from 'next/headers';
import { searchFmcsaCarriersByNameAndStateForVerify } from '@/lib/fmcsa/refresh/name-search';
import {
  parseCarrierNumber,
  verifyDotSchema,
  verifyNameStateSchema,
} from '@/lib/verify-dot/schema';
import { isValidUsStateCode } from '@/lib/verify-dot/us-states';
import { resolveCarrierPreview, type FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import { findCompanyByCarrierNumber } from '@/lib/verify-dot/directory-lookup';
import { lookupFmcsaForSuggestion } from '@/lib/suggestions/fmcsa-lookup';
import { logDotVerification } from '@/lib/verify-dot/log';
import { logger } from '@/lib/logging/logger';

export type VerifyDotNameCandidate = {
  dotNumber: string;
  mcNumber: string | null;
  legalName: string;
  dbaName: string | null;
  city: string | null;
  state: string | null;
  relevanceScore: number;
};

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

export type NameStateSearchResult = {
  success: boolean;
  error?: string;
  companyName?: string;
  state?: string;
  candidates?: VerifyDotNameCandidate[];
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

export async function searchCarriersByNameState(
  raw: unknown
): Promise<NameStateSearchResult> {
  const parsedInput = verifyNameStateSchema.safeParse(raw);
  if (!parsedInput.success) {
    return {
      success: false,
      error: 'Enter a company name and select a state.',
    };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return {
      success: false,
      error: 'FMCSA lookup is temporarily unavailable. Try again later.',
    };
  }

  const { companyName, state } = parsedInput.data;
  if (!isValidUsStateCode(state)) {
    return { success: false, error: 'Select a valid US state.' };
  }

  const candidates = await searchFmcsaCarriersByNameAndStateForVerify({
    companyName,
    state,
  });

  if (!candidates.length) {
    return {
      success: false,
      error: `No FMCSA carriers found matching "${companyName}" in ${state}. Try a shorter name or verify by DOT/MC.`,
      companyName,
      state,
      candidates: [],
    };
  }

  logger.info('dot.name_state_search', {
    companyName,
    state,
    matchCount: candidates.length,
  });

  return {
    success: true,
    companyName,
    state,
    candidates,
  };
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

  let directory = await findCompanyByCarrierNumber(carrier);
  const { saferUrl, preview: basePreview } = await resolveCarrierPreview(
    carrier,
    directory.preview
  );

  let preview: FmcsaPreview | null = basePreview;

  if (!directory.slug) {
    const fmcsa = await lookupFmcsaForSuggestion(parsedInput.data.query);
    if (fmcsa?.fmcsaPreview?.legalName) {
      preview = fmcsa.fmcsaPreview;
    } else if (fmcsa?.legalName) {
      preview = {
        legalName: fmcsa.legalName,
        dbaName: fmcsa.dbaName ?? undefined,
        physicalAddress: fmcsa.headquarters ?? undefined,
        phone: fmcsa.phone ?? undefined,
        usdot: fmcsa.usdot ?? (carrier.type === 'DOT' ? carrier.value : undefined),
        mcNumber: fmcsa.mcNumber ?? (carrier.type === 'MC' ? carrier.value : undefined),
        authorityStatus: fmcsa.authorityStatus ?? undefined,
        allowedToOperate: fmcsa.allowedToOperate ?? undefined,
        safetyRating: fmcsa.safetyRating ?? undefined,
        source: 'fmcsa_api',
      };
    } else if (!preview?.legalName && basePreview?.legalName) {
      preview = basePreview;
    }

    const legalNameHint = preview?.legalName ?? fmcsa?.legalName ?? undefined;
    if (legalNameHint) {
      directory = await findCompanyByCarrierNumber(carrier, legalNameHint);
    }

    if (!directory.slug && fmcsa?.usdot && carrier.type === 'MC') {
      const dotCarrier = parseCarrierNumber(fmcsa.usdot);
      if (dotCarrier) {
        directory = await findCompanyByCarrierNumber(dotCarrier, legalNameHint);
      }
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