import { NextRequest, NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';
import { getAllReviewsForCompany } from '@/lib/data-server';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get('companyId');
  if (!companyId) {
    return NextResponse.json({ error: 'companyId required' }, { status: 400 });
  }

  const [reviews, flags] = await Promise.all([
    getAllReviewsForCompany(companyId),
    getPerformanceFlags(),
  ]);

  return NextResponse.json(
    { reviews },
    {
      headers: {
        'Cache-Control': apiCacheControl(flags.apiCacheSeconds),
      },
    }
  );
}