import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';

/** Read-only Edge Config snapshot for ops / debugging (no secrets). */
export async function GET() {
  const flags = await getPerformanceFlags();

  return NextResponse.json(flags, {
    headers: {
      'Cache-Control': apiCacheControl(300),
    },
  });
}