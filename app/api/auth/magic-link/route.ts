import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseConfigured } from '@/lib/supabase/config';

const MAX_REQUESTS_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }

  let body: { email?: string; next?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const emailHash = hashEmail(email);

  try {
    const admin = createAdminClient();
    const now = new Date();
    const { data: existing } = await admin
      .from('magic_link_rate_limits')
      .select('*')
      .eq('email_hash', emailHash)
      .maybeSingle();

    if (existing) {
      const windowStart = new Date(existing.window_start).getTime();
      const inWindow = now.getTime() - windowStart < WINDOW_MS;
      if (inWindow && existing.request_count >= MAX_REQUESTS_PER_HOUR) {
        return NextResponse.json(
          { error: 'Too many requests. Try again in an hour.' },
          { status: 429 }
        );
      }
      await admin.from('magic_link_rate_limits').upsert({
        email_hash: emailHash,
        request_count: inWindow ? existing.request_count + 1 : 1,
        window_start: inWindow ? existing.window_start : now.toISOString(),
        last_request_at: now.toISOString(),
      });
    } else {
      await admin.from('magic_link_rate_limits').insert({
        email_hash: emailHash,
        request_count: 1,
        window_start: now.toISOString(),
        last_request_at: now.toISOString(),
      });
    }
  } catch (err) {
    console.error('[magic-link] rate limit check failed', err);
    // Continue — rate limit is best-effort if table not migrated yet
  }

  const origin = new URL(request.url).origin;
  const next = body.next?.startsWith('/') ? body.next : '/my-move';
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error('[magic-link] signInWithOtp failed', error.message);
    return NextResponse.json({ error: 'Could not send sign-in link' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}