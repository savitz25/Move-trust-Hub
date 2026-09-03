import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { getCompanyBySlug as getSeedCompanyBySlug } from '@/data/seed-companies';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';
import { renderMoveFallbackImage, renderMoveShareImage } from '@/lib/og/move-share-card';
import { moveEntityShareModel, moverProfileLabel } from '@/lib/seo/share-card-model';
import { canShowLicenseNumbers } from '@/lib/trust/company-display-policy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const ENTITY_LOOKUP_TIMEOUT_MS = 4_000;

async function getCompanyForShareCard(slug: string) {
  const seed = getSeedCompanyBySlug(slug);
  if (seed) return seed;

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      getCompanyBySlugAsync(slug),
      new Promise<undefined>((resolve) => {
        timeout = setTimeout(() => resolve(undefined), ENTITY_LOOKUP_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const company = await getCompanyForShareCard(decodeURIComponent(String(slug ?? '').trim()));
    if (!company?.name?.trim() || isAnonymousCompanyNotFound(company) || !isAnonymousPublicProfileAllowed(company)) {
      return renderMoveFallbackImage();
    }
    const showUsdot = canShowLicenseNumbers(company.usdotNumber, company.mcNumber);
    const digits = (company.usdotNumber || '').replace(/\D/g, '');
    const usdotLabel = showUsdot && digits ? `USDOT ${digits}` : undefined;
    return renderMoveShareImage(
      moveEntityShareModel({
        name: company.name,
        headquarters: company.headquarters,
        usdotLabel,
        profileLabel: moverProfileLabel({
          serviceScope: company.serviceScope,
          services: company.services,
        }),
      }),
    );
  } catch {
    return renderMoveFallbackImage();
  }
}

export function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: { 'Content-Type': 'image/png' },
  });
}
