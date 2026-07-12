import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';
import { getAllCompanies } from '@/lib/data-server';

export const revalidate = 3600;

export async function GET() {
  const [companies, flags] = await Promise.all([getAllCompanies(), getPerformanceFlags()]);

  return NextResponse.json(
    { companies, count: companies.length },
    {
      headers: {
        'Cache-Control': apiCacheControl(flags.apiCacheSeconds),
      },
    }
  );
}