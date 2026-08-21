import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import { renderMoveFallbackImage, renderMoveShareImage } from '@/lib/og/move-share-card';
import { moveEntityShareModel, moverProfileLabel } from '@/lib/seo/share-card-model';
import { canShowLicenseNumbers } from '@/lib/trust/company-display-policy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const company = await getCompanyBySlugAsync(decodeURIComponent(String(slug ?? '').trim()));
    if (!company?.name?.trim() || !isAnonymousPublicProfileAllowed(company)) {
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
