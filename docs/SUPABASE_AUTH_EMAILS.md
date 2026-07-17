# Supabase Auth emails — Move Trust Hub branding

Magic-link and verification emails must clearly come from **Move Trust Hub**, not “Supabase Auth”.

## What “Supabase Auth” means

| Layer | Where it comes from | How we brand it |
|-------|---------------------|-----------------|
| **From name** (e.g. `Supabase Auth <…@supabase.io>`) | Default Supabase mailer | **Custom SMTP** with Resend + sender name `Move Trust Hub` |
| **Subject + body** | Auth → Email Templates | Branded templates in this repo |
| **Site URL / links** | Auth → URL Configuration | `https://www.movetrusthub.com` |

Changing only the HTML template **does not** rename the sender. You need custom SMTP for the From line.

---

## 1. Custom SMTP (sender name) — required

Use the same Resend domain already used for quote/contact mail (`RESEND_FROM`).

1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/uvqkyupfnpswdozmuzih) → **Project Settings → Authentication** (or **Authentication → SMTP Settings**).
2. Enable **Custom SMTP**.
3. Enter:

| Field | Value |
|-------|--------|
| **Sender email** | `notifications@movetrusthub.com` (or the verified address in `RESEND_FROM`) |
| **Sender name** | `Move Trust Hub` |
| **Host** | `smtp.resend.com` |
| **Port** | `465` |
| **Username** | `resend` |
| **Password** | Your `RESEND_API_KEY` |

4. Save. Send a test magic link from `/portal/login` or Save My Move.

Resend docs: [Configure Supabase to send emails from your domain](https://resend.com/blog/how-to-configure-supabase-to-send-emails-from-your-domain).

**Recommended From line:**

```text
Move Trust Hub <notifications@movetrusthub.com>
```

Alternate support-style name:

```text
MoveTrustHub Support <notifications@movetrusthub.com>
```

---

## 2. Email templates (subject + body)

### Option A — Script (preferred)

Templates live in:

- `supabase/auth-emails/layout.ts` — brand shell (logo, colors, footer)
- `supabase/auth-emails/templates.ts` — all subjects + HTML
- `scripts/apply-supabase-auth-emails.ts` — write previews + optional API apply

Generate previews (always):

```bash
npx tsx scripts/apply-supabase-auth-emails.ts
```

Output: `supabase/auth-emails/previews/*.html` and `*.subject.txt`.

Apply live to project `uvqkyupfnpswdozmuzih` (needs a **personal access token**, not the service role key):

```bash
# https://supabase.com/dashboard/account/tokens
$env:SUPABASE_ACCESS_TOKEN="sbp_..."
$env:SUPABASE_PROJECT_REF="uvqkyupfnpswdozmuzih"
npx tsx scripts/apply-supabase-auth-emails.ts
```

The script PATCHes:

- Magic link  
- Confirm signup  
- Password recovery  
- Invite  
- Email change  
- Reauthentication (OTP code)  
- Password / email changed notifications  

### Option B — Dashboard paste

1. Run the script once to generate `supabase/auth-emails/previews/`.
2. Go to **Authentication → Email Templates**.
3. For each template, paste subject from `*.subject.txt` and body from `*.html`.

---

## 3. URL configuration checklist

**Authentication → URL Configuration:**

| Setting | Value |
|---------|--------|
| **Site URL** | `https://www.movetrusthub.com` |
| **Redirect URLs** | `https://www.movetrusthub.com/auth/callback` |

Magic links use `emailRedirectTo` → production callback with optional `?next=/portal` (see `app/api/auth/magic-link/route.ts`).

---

## 4. Covered emails

| Template | Subject (summary) |
|----------|-------------------|
| Magic link | Your Move Trust Hub sign-in link |
| Confirm signup | Confirm your Move Trust Hub email |
| Reset password | Reset your Move Trust Hub password |
| Invite | You’re invited to Move Trust Hub |
| Change email | Confirm your new Move Trust Hub email |
| Reauthentication | `{code} is your Move Trust Hub verification code` |
| Password changed | Your Move Trust Hub password was changed |
| Email changed | Your Move Trust Hub email was changed |

Tone: professional, transparent, independent directory — no lead fees / no paid placements in footer.

---

## 5. Verify

1. Request a magic link at `/portal/login` or Save My Move.
2. Confirm inbox shows:
   - **From:** Move Trust Hub \<notifications@…@movetrusthub.com\>
   - **Subject:** Your Move Trust Hub sign-in link  
   - **Body:** logo, navy CTA, links to movetrusthub.com  
3. Click through → lands on `https://www.movetrusthub.com/auth/callback` then the intended app path.

---

## 6. Related app code

- Magic link API: `app/api/auth/magic-link/route.ts`
- Auth callback: `app/auth/callback/route.ts`
- Logo URL helper: `trustHubLogoUrl()` in `lib/hub/config.ts`
- Transactional (non-auth) mail already uses `RESEND_FROM=Move Trust Hub <…>`
