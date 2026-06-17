import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = process.env.RESEND_FROM || 'Move Trust Hub <onboarding@resend.dev>';
const TEAM_EMAIL = process.env.QUOTE_TEAM_EMAIL || 'mhenry@amerisafemoving.com';

function getHomeSizeLabel(size: string | number | null | undefined): string {
  if (!size) return 'Not provided';
  const s = String(size).trim().toLowerCase();
  const map: Record<string, string> = {
    'studio': 'Studio / Small apartment',
    '1': '1 Bedroom',
    '2': '2 Bedrooms',
    '3': '3 Bedrooms',
    '4+': '4+ Bedrooms / Large',
  };
  return map[s] || String(size);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping email');
      return NextResponse.json({ success: false, reason: 'email not configured' });
    }

    const payload = await req.json();

    const subject = `New Quote Request from ${payload.name || 'Unknown'}`;
    
    const homeSizeLabel = getHomeSizeLabel(payload.home_size);

    const leadHtml = `
      <h2>New Move Quote Request</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${payload.name || 'N/A'}</p>
      <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
      
      <h3>Move Details</h3>
      <p><strong>From ZIP:</strong> ${payload.from_zip}</p>
      <p><strong>To ZIP:</strong> ${payload.to_zip}</p>
      <p><strong>Preferred Date:</strong> ${payload.move_date || 'Flexible'}</p>
      <p><strong>Home Size:</strong> ${homeSizeLabel}</p>
      <p><strong>Estimated Volume:</strong> ${payload.estimated_volume ? payload.estimated_volume + ' cu ft' : 'Not provided'}</p>
      
      ${payload.notes ? `<h3>Additional Notes</h3><p>${payload.notes}</p>` : ''}
      
      <p style="margin-top: 30px; font-size: 12px; color: #666;">
        This lead was captured via the Move Trust Hub quote form.<br>
        Source: ${payload.source || 'quote-modal'}
      </p>
    `;

    // 1. Notify the team (primary recipient)
    const teamSend = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_EMAIL,
      replyTo: payload.email || undefined,
      subject,
      html: leadHtml,
    });

    if (teamSend.error) {
      console.error('Resend team email error:', teamSend.error);
    } else if (teamSend.data?.id) {
      console.log(`[Resend] Team lead notification sent. Message ID: ${teamSend.data.id}`);
    }

    // 2. Send confirmation receipt to the submitter (so they know it was received)
    let confirmationSent = false;
    let confirmationId: string | null = null;
    if (payload.email) {
      const confirmationSubject = `Quote request received — Move from ${payload.from_zip} to ${payload.to_zip}`;
      const confirmationHtml = `
        <h2>We've received your quote request${payload.name ? ', ' + payload.name : ''}!</h2>
        <p>Thank you for submitting your move details via Move Trust Hub.</p>
        
        <h3>Your Request Summary</h3>
        <p><strong>From:</strong> ${payload.from_zip} &rarr; <strong>To:</strong> ${payload.to_zip}</p>
        <p><strong>Preferred Date:</strong> ${payload.move_date || 'Flexible'}</p>
        <p><strong>Home Size:</strong> ${homeSizeLabel}</p>
        ${payload.estimated_volume ? `<p><strong>Est. Volume:</strong> ${payload.estimated_volume} cu ft</p>` : ''}
        
        <p>Our team will review your request and match you with 2-3 highly-rated, licensed interstate movers within 24 hours. The movers will reach out to you directly with custom quotes.</p>
        
        <p style="margin-top: 20px;">If you have any questions in the meantime, just reply to this email.</p>
        
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          Move Trust Hub — Connecting you with trusted movers.<br>
          This is an automated confirmation of your quote request.
        </p>
      `;

      const confirmSend = await resend.emails.send({
        from: FROM_ADDRESS,
        to: payload.email,
        replyTo: TEAM_EMAIL,
        subject: confirmationSubject,
        html: confirmationHtml,
      });

      if (confirmSend.error) {
        console.error('Resend confirmation email error:', confirmSend.error);
      } else if (confirmSend.data?.id) {
        confirmationId = confirmSend.data.id;
        confirmationSent = true;
        console.log(`[Resend] Confirmation sent to lead (${payload.email}). Message ID: ${confirmationId}`);
      }
    }

    const messageIds = [teamSend.data?.id, confirmationId].filter(Boolean);

    return NextResponse.json({ 
      success: true, 
      messageIds,
      teamEmailSent: !teamSend.error,
      confirmationSent,
    });
  } catch (err: any) {
    console.error('Email notification error:', err);
    // Return success so user experience is never blocked (the lead is already saved to console + Supabase)
    return NextResponse.json({ success: true, emailError: err.message || 'email delivery issue (lead captured)' });
  }
}
