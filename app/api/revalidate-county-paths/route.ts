import { revalidatePath } from 'next/cache';
import { countyRevalidationPaths } from '@/lib/local-movers/county-cache-tag';

/**
 * Pre-validation still rejects the whole batch before any revalidatePath call.
 * A valid batch then calls revalidatePath once per path. Those calls are not
 * one transaction: an earlier path can already be marked when a later call
 * throws. Every path still gets a result. Status is 500 when any path failed,
 * including paths that were already marked. Retry the same batch. Do not read
 * a 500 as "nothing was marked."
 */
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

  const results: Array<{ path: string; ok: true } | { path: string; ok: false; error: 'revalidate failed' }> = [];
  for (const path of paths) {
    try {
      revalidatePath(path, 'page');
      results.push({ path, ok: true });
    } catch {
      results.push({ path, ok: false, error: 'revalidate failed' });
    }
  }
  const ok = results.every((result) => result.ok);
  return Response.json({ ok, paths: results }, { status: ok ? 200 : 500 });
}
