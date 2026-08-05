# Network identity — Move Trust Hub

**Goal:** One **Ask Trust Hub** account across Move, Insurance, and Lending.  
**Shared Supabase project:** arepfylnilkjmyduhwbz  

**Production:** `https://www.movetrusthub.com`

---

## Auth routes

| Path | Role |
|------|------|
| Magic link / OAuth | Existing Save My Move + portal flows |
| `GET /auth/callback` | OAuth exchange **or** network bridge handoff (no exchange for `hub=insurance\|lending`) |
| `GET /api/auth/network-handoff/start` | Start silent SSO to Insurance / Lender |
| `GET /auth/network-handoff` | Complete SSO — set cookies on Move |

---

## Silent cross-domain SSO

See `docs/NETWORK-SSO-HANDOFF.md`.

| Piece | Path |
|-------|------|
| Server lib | `lib/network/sso-handoff.ts` |
| Journey content (unrelated) | `lib/network/network-handoff.ts` (`resolveNetworkHandoff`) |
| Client href | `lib/network/handoff-href.ts` |
| Cross-hub anchor | `components/network/cross-hub-link.tsx` |
| Network bar | `components/network/ask-network-bar.tsx` |
| Footer seal | `components/network/ask-network-seal.tsx` |

### Session on target domain

1. Consume one-time code (`consume_network_auth_handoff` RPC)  
2. `auth.admin.generateLink({ type: 'magiclink', email })` → `hashed_token`  
3. Browser SSR client `verifyOtp({ token_hash, type })` with cookies written onto the **redirect response**  

### Security

- Hash-only storage, 90s TTL, single-use, target hub match  
- Rate limit 10/user/min  
- `next=` open-redirect safe (relative path on target only)  
- Soft fail → HQ `?handoff=failed`  

### Ops

1. Apply migration on shared project  
2. `SUPABASE_SERVICE_ROLE_KEY` on Move / Insurance / Lender Vercel  
3. Redirect allow-list already includes all four `www` domains  

### Sign-out (v1)

Signs out **current domain only**. Other hubs may remain signed in until cookie expiry or local sign-out.
