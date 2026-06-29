/**
 * Supabase Edge Function: process-quote
 * Deploy: supabase functions deploy process-quote --project-ref <ref>
 *
 * Future use cases:
 * - Webhook receiver for high-volume quote batching
 * - Slack/PagerDuty alerts on error spikes
 * - Mover-matching queue handoff
 *
 * Invoke via Database Webhook on quote_requests INSERT or cron.
 */
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record ?? payload;

    console.log(
      JSON.stringify({
        event: 'edge.process_quote',
        quoteId: record?.id,
        source: record?.source,
        destinationSlug: record?.destination_slug,
        ts: new Date().toISOString(),
      })
    );

    // TODO: enqueue mover matching, CRM sync, anomaly detection
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error(
      JSON.stringify({
        event: 'edge.process_quote_error',
        message: err instanceof Error ? err.message : 'unknown',
      })
    );
    return new Response(JSON.stringify({ error: 'Processing failed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});