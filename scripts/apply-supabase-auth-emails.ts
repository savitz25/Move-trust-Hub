/**
 * Apply Move Trust Hub branded Supabase Auth email templates via Management API.
 *
 * Requires a personal access token (not the service role key):
 *   https://supabase.com/dashboard/account/tokens
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=sbp_... npx tsx scripts/apply-supabase-auth-emails.ts
 *   # optional:
 *   SUPABASE_PROJECT_REF=uvqkyupfnpswdozmuzih
 *
 * Also writes preview HTML under supabase/auth-emails/previews/ for Dashboard paste.
 *
 * Sender display name ("Move Trust Hub") is set via custom SMTP (Resend) in the Dashboard —
 * see docs/SUPABASE_AUTH_EMAILS.md. The Management API cannot fully override the default
 * "Supabase Auth" From name without custom SMTP.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  AUTH_EMAIL_TEMPLATES,
  buildAuthConfigPatch,
} from '../supabase/auth-emails/templates';
import { BRAND } from '../supabase/auth-emails/layout';

const DEFAULT_REF = 'uvqkyupfnpswdozmuzih';

function writePreviews() {
  const dir = join(process.cwd(), 'supabase', 'auth-emails', 'previews');
  mkdirSync(dir, { recursive: true });

  for (const t of AUTH_EMAIL_TEMPLATES) {
    const slug = t.subjectKey.replace('mailer_subjects_', '');
    const path = join(dir, `${slug}.html`);
    writeFileSync(path, t.html, 'utf8');
    writeFileSync(
      join(dir, `${slug}.subject.txt`),
      `${t.subject}\n`,
      'utf8'
    );
  }

  writeFileSync(
    join(dir, 'README.txt'),
    [
      'Move Trust Hub — Supabase Auth email previews',
      '',
      'Paste each .html into Dashboard → Authentication → Email Templates.',
      'Paste each .subject.txt into the Subject field.',
      '',
      `Sender name: set SMTP Sender name to "${BRAND.name}" (see docs/SUPABASE_AUTH_EMAILS.md).`,
      '',
    ].join('\n'),
    'utf8'
  );

  console.log(`Wrote ${AUTH_EMAIL_TEMPLATES.length} previews → ${dir}`);
}

async function applyViaApi() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  const projectRef =
    process.env.SUPABASE_PROJECT_REF?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
      /https:\/\/([a-z0-9]+)\.supabase\.co/i
    )?.[1] ||
    DEFAULT_REF;

  if (!token) {
    console.log(`
No SUPABASE_ACCESS_TOKEN set — skipping live apply.

To push templates to project ${projectRef}:
  1. Create a token: https://supabase.com/dashboard/account/tokens
  2. Run:
     $env:SUPABASE_ACCESS_TOKEN="sbp_..."
     npx tsx scripts/apply-supabase-auth-emails.ts

Previews were still written for manual Dashboard paste.
Also configure custom SMTP so the From name is "${BRAND.name}" (not "Supabase Auth").
See docs/SUPABASE_AUTH_EMAILS.md
`);
    return;
  }

  const body = buildAuthConfigPatch();
  const url = `https://api.supabase.com/v1/projects/${projectRef}/config/auth`;

  console.log(`PATCH ${url} (${Object.keys(body).length} fields)…`);

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`Failed (${res.status}):`, text.slice(0, 2000));
    process.exitCode = 1;
    return;
  }

  console.log(`✓ Applied branded auth email templates to project ${projectRef}`);
  console.log(
    `Next: set SMTP sender name to "${BRAND.name}" if emails still show "Supabase Auth".`
  );
}

async function main() {
  writePreviews();
  await applyViaApi();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
