import { Resend } from 'resend';
import env from '../config/env.js';

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

// Resend free tier: FROM must be onboarding@resend.dev until domain is verified
// Resend free tier: TO can only be your signup email until domain is verified
const FROM_EMAIL = 'ZaishTech <onboarding@resend.dev>';

// YOUR email — the one you signed up with on Resend
// This is the only address Resend can send TO without domain verification
const ADMIN_EMAIL = 'zaishtech@gmail.com';

export const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    console.log('═══════════════════════════════════════');
    console.log('📧 [NO RESEND KEY] Email not sent — add RESEND_API_KEY to .env');
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log('═══════════════════════════════════════');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`❌ Resend error sending to ${to}:`, error.message);
      // Don't throw — we don't want email failures to break the API response
      return { success: false, error: error.message };
    }

    console.log(`✅ Email sent to ${to} — ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Admin notification — always goes to YOUR email (works even without domain verification)
export const sendNewInquiryNotification = async (inquiry) => {
  const result = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🚀 New Inquiry: ${inquiry.service} — ${inquiry.name}`,
    html: `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc2626; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">🚀 New Project Inquiry</h1>
        </div>
        <div style="background: #fafaf9; padding: 32px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
              <td style="padding: 12px 0; color: #1c1917; font-size: 14px; font-weight: 500;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; color: #1c1917; font-size: 14px;">${inquiry.email}</td>
            </tr>
            ${inquiry.phone ? `<tr><td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td><td style="padding: 12px 0; color: #1c1917; font-size: 14px;">${inquiry.phone}</td></tr>` : ''}
            ${inquiry.company ? `<tr><td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Company</td><td style="padding: 12px 0; color: #1c1917; font-size: 14px;">${inquiry.company}</td></tr>` : ''}
            <tr>
              <td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Service</td>
              <td style="padding: 12px 0; color: #1c1917; font-size: 14px;">${inquiry.service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Budget</td>
              <td style="padding: 12px 0; color: #1c1917; font-size: 14px;">${inquiry.budget || 'Not specified'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e7e5e4;">
            <div style="color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Message</div>
            <div style="color: #1c1917; font-size: 14px; line-height: 1.6; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e7e5e4;">${inquiry.message}</div>
          </div>
          <div style="margin-top: 32px;">
            <a href="${env.clientUrl}/admin/inquiries" 
               style="background: #dc2626; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">
              View in Dashboard →
            </a>
          </div>
          <div style="margin-top: 24px; color: #78716c; font-size: 12px;">
            Submitted: ${new Date(inquiry.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    `,
  });

  return result;
};

// Client confirmation — will work once domain is verified in Resend
// During testing, this only sends to your Resend signup email
export const sendInquiryConfirmation = async (inquiry) => {
  const result = await sendEmail({
    to: inquiry.email,
    subject: 'We received your inquiry — NexaFlow',
    html: `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1c1917; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Nexa<span style="color: #f87171;">Flow</span></h1>
        </div>
        <div style="background: #fafaf9; padding: 32px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1c1917; font-size: 18px; margin: 0 0 16px; font-weight: 500;">Hi ${inquiry.name},</h2>
          <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
            Thanks for reaching out! We've received your inquiry about <strong>${inquiry.service}</strong>.
          </p>
          <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
            Our team will review it and get back to you within <strong>24 hours</strong> with a detailed proposal.
          </p>
          <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 32px;">
            Feel free to reach us on WhatsApp for faster communication.
          </p>
          <div style="padding: 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e7e5e4;">
            <div style="color: #78716c; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Inquiry Summary</div>
            <div style="color: #1c1917; font-size: 14px; margin-bottom: 4px;"><strong>Service:</strong> ${inquiry.service}</div>
            <div style="color: #1c1917; font-size: 14px; margin-bottom: 4px;"><strong>Budget:</strong> ${inquiry.budget || 'To be discussed'}</div>
            <div style="color: #1c1917; font-size: 14px;"><strong>Reference:</strong> ${inquiry._id}</div>
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 12px;">
            NexaFlow — Custom Software, AI & Automation for Business
          </div>
        </div>
      </div>
    `,
  });

  // Log if client email failed (Resend free tier limitation)
  if (result && !result.success) {
    console.log(`⚠️  Client email to ${inquiry.email} was not sent (Resend free tier limitation).`);
    console.log(`   This will work once you verify your domain at resend.com/domains`);
    console.log(`   For testing, use ${ADMIN_EMAIL} as the client email.`);
  }

  return result;
};