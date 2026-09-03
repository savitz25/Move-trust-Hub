import { NextResponse } from 'next/server';
import { renderMoveShareImage } from '@/lib/og/move-share-card';
import { moveStateShareModel } from '@/lib/seo/share-card-model';

export const runtime = 'edge';
export function GET() { return renderMoveShareImage(moveStateShareModel({ stateName: 'Florida' })); }
export function HEAD() { return new NextResponse(null, { status: 200, headers: { 'Content-Type': 'image/png' } }); }
