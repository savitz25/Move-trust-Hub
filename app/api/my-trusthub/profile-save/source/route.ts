import { getMoveProfileSaveBindings } from '@/lib/my-trusthub/profile-save-server';
import { handleSourceCallback } from '@/lib/my-trusthub/source-callback-http';
export const runtime='nodejs';
export const dynamic='force-dynamic';
// Remains unavailable until approved isolated service-verification ports are bound.
export function POST(request:Request){return handleSourceCallback(request,getMoveProfileSaveBindings());}
