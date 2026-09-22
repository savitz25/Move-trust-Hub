import { getMoveProfileSaveRuntime } from '@/lib/my-trusthub/profile-save-server';
import { handleSource } from '@/lib/my-trusthub/source-callback-http';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) { return handleSource(request, getMoveProfileSaveRuntime()); }
