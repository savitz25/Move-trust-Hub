import { NextResponse } from 'next/server';
import { shouldEnablePosthog } from '@/lib/analytics/posthog/environment';
import { INACTIVE_ANALYTICS_IDENTITY, analyticsIdentityForSession } from '@/lib/analytics/posthog/identity-gate';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!shouldEnablePosthog()) {
    return NextResponse.json(INACTIVE_ANALYTICS_IDENTITY);
  }
  try {
    const user = await getAuthenticatedUser();
    return NextResponse.json(analyticsIdentityForSession(true, { id: user?.id ?? null }));
  } catch {
    return NextResponse.json({ distinctId: null });
  }
}
