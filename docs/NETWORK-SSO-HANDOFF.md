# Silent cross-domain SSO (network handoff)

One Ask Trust Hub account (shared Supabase project **arepfylnilkjmyduhwbz**).  
Cookies stay **per domain**; this handoff establishes a session on the destination hub without a second login form.

## Flow

1. User signed in on Hub A  
2. Network bar → same-origin handoff start on A:
   - **Preferred (signed-in):** `POST /api/auth/network-handoff/start` with JSON  
     `{ "to": "lender", "next": "/my-lending", "access_token": "<browser JWT>" }`  
     (network bar uses the browser session so cookies are not required)  
   - **Fallback / guest:** `GET /api/auth/network-handoff/start?to=lender&next=/my-lending`
3. A verifies session (cookie **or** Bearer access token), inserts one-time row (hashed code, 90s TTL)  
4. Response redirects (or JSON `redirectUrl`) to  
   `https://www.{target}/auth/network-handoff?code=…&next=…`  
5. Target consumes code (atomic), mints session via admin `generateLink` + `verifyOtp`, sets cookies on **B**, redirects to HQ with `?handoff=ok`

## Security

| Rule | Implementation |
|------|----------------|
| Single-use | `consume_network_auth_handoff` sets `used_at` atomically |
| TTL | 90 seconds (`HANDOFF_TTL_SECONDS`) |
| Target-bound | `to_hub` must match consuming hub |
| Session required | Start checks cookies **or** Bearer JWT |
| No long-lived tokens in URL | Only one-time opaque `code` (hash stored) |
| Rate limit | ≤10 creates / user / minute |
| Soft fail | Redirect to logged-out HQ with `?handoff=failed&reason=…` |

## Ops — required env on **all three** Vercel projects

Use the **same** Supabase project for every hub:

| Variable | Where | Notes |
|----------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Move, Insurance, Lender | `https://arepfylnilkjmyduhwbz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Move, Insurance, Lender | Project **anon** `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Move, Insurance, Lender (server-only) | Project **service_role** `secret` — long JWT (~200+ chars), **not** the anon key |

1. Run migration once on the shared project:  
   `supabase/migrations/20260805120000_network_auth_handoffs.sql`  
2. After changing env vars, **redeploy** each Production deployment.

### Production health probe (must pass on every hub)

```bash
curl -s https://www.movetrusthub.com/api/auth/network-handoff/health
curl -s https://www.insurancetrusthub.com/api/auth/network-handoff/health
curl -s https://www.lendertrusthub.com/api/auth/network-handoff/health
```

Expect:

```json
{
  "ok": true,
  "serviceRoleValid": true,
  "serviceRoleKeyLength": 200,
  "table": true,
  "rpc": true,
  "supabaseHost": "arepfylnilkjmyduhwbz.supabase.co"
}
```

| Field | Meaning |
|-------|---------|
| `serviceRoleConfigured` | Env var is non-empty |
| `serviceRoleValid` | Admin API accepts the key |
| `table` | `network_auth_handoffs` readable |
| `rpc` | `consume_network_auth_handoff` callable |

Guest start (no cookies):

```bash
curl -sI "https://www.movetrusthub.com/api/auth/network-handoff/start?to=lender&next=/my-lending"
# Location: https://www.lendertrusthub.com/my-lending
# X-Network-Handoff: skip:no_session
```

Signed-in start response headers:

| Header | Meaning |
|--------|---------|
| `X-Network-Handoff: ok` | Code minted; Location has `code=` |
| `X-Network-Handoff: skip:no_session` | No cookie/Bearer user |
| `X-Network-Handoff: skip:create_500` | Insert/RPC failed |
| `X-Network-Handoff-Cookie: 0\|1` | Auth cookie present on request |
| `X-Network-Handoff-Bearer: 0\|1` | Bearer token present |

Complete soft-fail: `/my-lending?handoff=failed&reason=otp_failed|consume_400|mint_failed|…`

## Routes

| Route | Role |
|-------|------|
| `GET/POST /api/auth/network-handoff/start` | Hub A — create + redirect/JSON |
| `GET /auth/network-handoff?code=…` | Hub B — complete + set cookies |
| `GET /api/auth/network-handoff/health` | Ops probe |

## Guest behavior

Logged-out network bar still points at `/start`; server returns plain 307 **without** `code`.
