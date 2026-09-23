import { handleMoveProfileSave } from '@/lib/my-trusthub/profile-save-http';
import { getMoveProfileSaveRuntime } from '@/lib/my-trusthub/profile-save-server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export function POST(request:Request){return handleMoveProfileSave(request,getMoveProfileSaveRuntime());}
