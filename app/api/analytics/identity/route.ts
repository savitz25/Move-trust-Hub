import { NextResponse } from 'next/server';
import { isOpaqueTrustHubId } from '@/lib/analytics/posthog/privacy';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (user?.id && isOpaqueTrustHubId(user.id)) {
      return NextResponse.json({ distinctId: user.id });
    }
    return NextResponse.json({ distinctId: null });
  } catch {
    return NextResponse.json({ distinctId: null });
  }
}
