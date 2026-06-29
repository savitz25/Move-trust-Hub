import { NextRequest, NextResponse } from 'next/server';
import { getAdminSecret } from '@/lib/supabase/config';
import { ADMIN_COOKIE } from '@/lib/supabase/middleware';
import { logAdminAccess } from '@/lib/logging/events';

export async function POST(req: NextRequest) {
  const adminSecret = getAdminSecret();

  if (!adminSecret) {
    return NextResponse.json(
      { error: 'ADMIN_SECRET not configured on server' },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const provided = typeof body.secret === 'string' ? body.secret.trim() : '';

  if (!provided || provided !== adminSecret) {
    logAdminAccess({ path: '/admin/api/login', authenticated: false });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, adminSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  logAdminAccess({ path: '/admin/api/login', authenticated: true });
  return response;
}