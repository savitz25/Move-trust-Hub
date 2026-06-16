import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping email');
      return NextResponse.json({ success: false, reason: 'email not configured' });
    }

    const payload = await req.json();

    const subject = `New Quote Request from ${payload.name || 'Unknown'}`;
    
    const html = `
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
      <p><strong>Home Size:</strong> ${payload.home_size}</p>
      <p><strong>Estimated Volume:</strong> ${payload.estimated_volume ? payload.estimated_volume + ' cu ft' : 'Not provided'}</p>
      
      ${payload.notes ? `<h3>Additional Notes</h3><p>${payload.notes}</p>` : ''}
      
      <p style="margin-top: 30px; font-size: 12px; color: #666;">
        This lead was captured via the Move Trust Hub quote form.<br>
        Source: ${payload.source || 'quote-modal'}
      </p>
    `;

    const { error } = await resend.emails.send({
      from: 'Move Trust Hub <quotes@movetrusthub.com>', // Update this to a verified domain in Resend if needed
      to: 'mhenry@amerisafemoving.com',
      reply_to: payload.email || undefined,
      subject,
      html,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Email notification error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
