import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/insurance/supabase/middleware';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/insurance/',
    maxAge: 0,
  });
  return response;
}