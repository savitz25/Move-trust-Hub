import { NextResponse } from 'next/server';
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Probe: production must return 200 JSON (not 404). */
export async function GET() {
  let tableOk: boolean | null = null;
  let tableError: string | null = null;
  let rpcOk: boolean | null = null;
  let rpcError: string | null = null;

  if (isSupabaseAdminConfigured()) {
    try {
      const admin = createAdminClient() as unknown as {
        from: (t: string) => {
          select: (
            c: string,
            o: { count: 'exact'; head: boolean }
          ) => Promise<{ error: { message: string } | null }>;
        };
        rpc: (
          fn: string,
          args: Record<string, string>
        ) => Promise<{ error: { message: string } | null }>;
      };
      const { error } = await admin
        .from('network_auth_handoffs')
        .select('id', { count: 'exact', head: true });
      if (error) {
        tableOk = false;
        tableError = error.message;
      } else {
        tableOk = true;
      }
      // RPC with impossible hash should return empty, not 404 function missing
      const { error: rpcErr } = await admin.rpc('consume_network_auth_handoff', {
        p_code_hash: '0'.repeat(64),
        p_to_hub: 'move',
      });
      if (rpcErr) {
        rpcOk = false;
        rpcError = rpcErr.message;
      } else {
        rpcOk = true;
      }
    } catch (e) {
      tableOk = false;
      tableError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    ok: true,
    hub: 'move',
    supabaseConfigured: isSupabaseConfigured(),
    serviceRole: isSupabaseAdminConfigured(),
    table: tableOk,
    tableError,
    rpc: rpcOk,
    rpcError,
    routes: {
      start: '/api/auth/network-handoff/start',
      complete: '/auth/network-handoff',
    },
  });
}
