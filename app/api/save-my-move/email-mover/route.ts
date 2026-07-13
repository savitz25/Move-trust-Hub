import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import {
  buildMoverDetailsEmailHtml,
  buildMoverDetailsEmailText,
  buildMoverDetailsSubject,
  companyToMoverEmailData,
} from '@/lib/emails/mover-details';

export const runtime = 'nodejs';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';

function resolveFrom(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
}

function resolveRecipientName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}): string | null {
  const meta = user.user_metadata ?? {};
  const fromMeta =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    null;
  if (fromMeta) return fromMeta;
  const email = user.email?.trim();
  if (!email) return null;
  return email.split('@')[0] ?? null;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Email delivery is temporarily unavailable. Try again later or view the profile on Move Trust Hub.',
        },
        { status: 503 }
      );
    }

    let body: { companySlug?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const companySlug = body.companySlug?.trim();
    if (!companySlug) {
      return NextResponse.json({ error: 'Company is required' }, { status: 400 });
    }

    const rawCompany = await getCompanyBySlugAsync(companySlug);
    if (!rawCompany) {
      return NextResponse.json({ error: 'Mover not found' }, { status: 404 });
    }

    const company = normalizeCompanyForDisplay(rawCompany);
    const emailData = companyToMoverEmailData(company, resolveRecipientName(user));

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: resolveFrom(),
      to: user.email,
      subject: buildMoverDetailsSubject(company.name),
      html: buildMoverDetailsEmailHtml(emailData),
      text: buildMoverDetailsEmailText(emailData),
    });

    if (error) {
      console.error('[email-mover] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again in a few minutes.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('[email-mover] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending your email.' },
      { status: 500 }
    );
  }
}