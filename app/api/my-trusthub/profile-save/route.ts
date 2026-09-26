import { getMoveProfileSaveRuntime } from '@/lib/my-trusthub/profile-save-server';
import { handleMoveProfileSave } from '@/lib/my-trusthub/profile-save-http';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) { return handleMoveProfileSave(request, getMoveProfileSaveRuntime()); }
