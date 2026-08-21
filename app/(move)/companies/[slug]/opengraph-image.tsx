import { getCompanyBySlugAsync } from '@/lib/data-server';
import {
  MOVE_OG_CONTENT_TYPE,
  MOVE_OG_FALLBACK_ALT,
  MOVE_OG_SIZE,
  renderMoveFallbackImage,
  renderMoveShareImage,
} from '@/lib/og/move-share-card';
import { moveEntityShareModel, moverProfileLabel } from '@/lib/seo/share-card-model';
import { canShowLicenseNumbers } from '@/lib/trust/company-display-policy';

export const runtime = 'nodejs';
export const alt = MOVE_OG_FALLBACK_ALT;
export const size = MOVE_OG_SIZE;
export const contentType = MOVE_OG_CONTENT_TYPE;

export default async function CompanyOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const company = await getCompanyBySlugAsync(decodeURIComponent(String(slug ?? '').trim()));
    if (!company?.name?.trim()) {
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
