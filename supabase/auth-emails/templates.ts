/**
 * Branded Supabase Auth email subjects + HTML bodies for Move Trust Hub.
 * Used by scripts/apply-supabase-auth-emails.ts and as source of truth for Dashboard paste.
 */

import { BRAND, buildAuthEmailHtml } from './layout';

export type AuthEmailTemplate = {
  /** Management API subject key suffix after mailer_subjects_ */
  subjectKey: string;
  /** Management API content key suffix after mailer_templates_ / _content */
  contentKey: string;
  subject: string;
  html: string;
  /** Optional notification enable flag for security emails */
  notificationEnabledKey?: string;
};

const ignoreIfNotYou =
  'If you didn’t request this, you can safely ignore this email. Your account stays secure.';

export const AUTH_EMAIL_TEMPLATES: AuthEmailTemplate[] = [
  {
    subjectKey: 'mailer_subjects_magic_link',
    contentKey: 'mailer_templates_magic_link_content',
    subject: `Your Move Trust Hub sign-in link`,
    html: buildAuthEmailHtml({
      title: 'Sign in to Move Trust Hub',
      bodyHtml: `
        <p style="margin:0 0 12px;">Hi,</p>
        <p style="margin:0 0 12px;">
          Use the secure button below to sign in to your <strong>${BRAND.name}</strong> account
          (Save My Move, Verified Mover Portal, or other signed-in tools). This link expires shortly
          and can only be used once.
        </p>
        <p style="margin:0;">No password needed — this is your magic link.</p>
      `,
      ctaLabel: 'Sign in to Move Trust Hub',
      ctaHref: '{{ .ConfirmationURL }}',
      footerNote: ignoreIfNotYou,
    }),
  },
  {
    subjectKey: 'mailer_subjects_confirmation',
    contentKey: 'mailer_templates_confirmation_content',
    subject: `Confirm your Move Trust Hub email`,
    html: buildAuthEmailHtml({
      title: 'Confirm your email',
      bodyHtml: `
        <p style="margin:0 0 12px;">Welcome to <strong>${BRAND.name}</strong>.</p>
        <p style="margin:0;">
          Confirm <strong>{{ .Email }}</strong> to finish setting up your account and access
          Save My Move, reviews, and the Verified Mover Portal.
        </p>
      `,
      ctaLabel: 'Confirm email address',
      ctaHref: '{{ .ConfirmationURL }}',
      footerNote: ignoreIfNotYou,
    }),
  },
  {
    subjectKey: 'mailer_subjects_recovery',
    contentKey: 'mailer_templates_recovery_content',
    subject: `Reset your Move Trust Hub password`,
    html: buildAuthEmailHtml({
      title: 'Reset your password',
      bodyHtml: `
        <p style="margin:0 0 12px;">
          We received a request to reset the password for your <strong>${BRAND.name}</strong> account
          ({{ .Email }}).
        </p>
        <p style="margin:0;">Choose a new password using the button below. The link expires shortly.</p>
      `,
      ctaLabel: 'Reset password',
      ctaHref: '{{ .ConfirmationURL }}',
      footerNote: ignoreIfNotYou,
    }),
  },
  {
    subjectKey: 'mailer_subjects_invite',
    contentKey: 'mailer_templates_invite_content',
    subject: `You’re invited to Move Trust Hub`,
    html: buildAuthEmailHtml({
      title: 'You’re invited',
      bodyHtml: `
        <p style="margin:0 0 12px;">
          You’ve been invited to create a <strong>${BRAND.name}</strong> account.
        </p>
        <p style="margin:0;">Accept the invitation to get started.</p>
      `,
      ctaLabel: 'Accept invitation',
      ctaHref: '{{ .ConfirmationURL }}',
    }),
  },
  {
    subjectKey: 'mailer_subjects_email_change',
    contentKey: 'mailer_templates_email_change_content',
    subject: `Confirm your new Move Trust Hub email`,
    html: buildAuthEmailHtml({
      title: 'Confirm your new email',
      bodyHtml: `
        <p style="margin:0 0 12px;">
          Confirm <strong>{{ .NewEmail }}</strong> as the new email for your
          <strong>${BRAND.name}</strong> account.
        </p>
        <p style="margin:0;">Until you confirm, your existing email remains active.</p>
      `,
      ctaLabel: 'Confirm new email',
      ctaHref: '{{ .ConfirmationURL }}',
      footerNote: ignoreIfNotYou,
    }),
  },
  {
    subjectKey: 'mailer_subjects_reauthentication',
    contentKey: 'mailer_templates_reauthentication_content',
    subject: `{{ .Token }} is your Move Trust Hub verification code`,
    html: buildAuthEmailHtml({
      title: 'Your verification code',
      bodyHtml: `
        <p style="margin:0 0 16px;">
          Use this code to verify your identity on <strong>${BRAND.name}</strong>. It expires shortly.
        </p>
        <p style="margin:0;font-size:28px;font-weight:700;letter-spacing:0.2em;color:${BRAND.primary};font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
          {{ .Token }}
        </p>
      `,
      footerNote: ignoreIfNotYou,
    }),
  },
  {
    subjectKey: 'mailer_subjects_password_changed_notification',
    contentKey: 'mailer_templates_password_changed_notification_content',
    notificationEnabledKey: 'mailer_notifications_password_changed_enabled',
    subject: `Your Move Trust Hub password was changed`,
    html: buildAuthEmailHtml({
      title: 'Password changed',
      bodyHtml: `
        <p style="margin:0 0 12px;">
          The password for your <strong>${BRAND.name}</strong> account was recently changed.
        </p>
        <p style="margin:0;">
          If you didn’t make this change, reset your password immediately and contact
          <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.primary};">${BRAND.supportEmail}</a>.
        </p>
      `,
      ctaLabel: 'Go to Move Trust Hub',
      ctaHref: BRAND.siteUrl,
    }),
  },
  {
    subjectKey: 'mailer_subjects_email_changed_notification',
    contentKey: 'mailer_templates_email_changed_notification_content',
    notificationEnabledKey: 'mailer_notifications_email_changed_enabled',
    subject: `Your Move Trust Hub email was changed`,
    html: buildAuthEmailHtml({
      title: 'Email address changed',
      bodyHtml: `
        <p style="margin:0 0 12px;">
          The email on your <strong>${BRAND.name}</strong> account changed from
          <strong>{{ .OldEmail }}</strong> to <strong>{{ .Email }}</strong>.
        </p>
        <p style="margin:0;">
          If you didn’t make this change, contact
          <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.primary};">${BRAND.supportEmail}</a> immediately.
        </p>
      `,
      ctaLabel: 'Go to Move Trust Hub',
      ctaHref: BRAND.siteUrl,
    }),
  },
];

/** Payload for PATCH /v1/projects/{ref}/config/auth */
export function buildAuthConfigPatch(): Record<string, string | boolean> {
  const patch: Record<string, string | boolean> = {
    // Project-facing site name (used in some default mailer paths)
    site_url: BRAND.siteUrl,
  };

  for (const t of AUTH_EMAIL_TEMPLATES) {
    patch[t.subjectKey] = t.subject;
    patch[t.contentKey] = t.html;
    if (t.notificationEnabledKey) {
      patch[t.notificationEnabledKey] = true;
    }
  }

  return patch;
}
