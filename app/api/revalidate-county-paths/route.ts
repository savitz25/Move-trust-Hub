import { revalidatePath } from 'next/cache';
import { countyRevalidationPaths } from '@/lib/local-movers/county-cache-tag';

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ ok: false, error: 'Revalidation unavailable' }, { status: 503 });
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const paths = countyRevalidationPaths(body);
  if (!paths) {
    return Response.json({ ok: false, error: 'Invalid county paths' }, { status: 400 });
  }

  for (const path of paths) {
    revalidatePath(path, 'page');
  }
  return Response.json({ ok: true, paths });
}
