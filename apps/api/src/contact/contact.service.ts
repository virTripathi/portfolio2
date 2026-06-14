import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { ContactPayload, ContactResponse } from '@portfolio/types';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly config: ConfigService) {}

  async send(payload: ContactPayload): Promise<ContactResponse> {
    // Honeypot tripped -> pretend success, drop silently.
    if (payload.company && payload.company.trim().length > 0) {
      this.logger.warn('Honeypot triggered, dropping submission.');
      return { ok: true, message: 'Thanks for reaching out!' };
    }

    const transport = this.createTransport();

    if (!transport) {
      // No mail credentials configured: log so local dev still works end-to-end.
      this.logger.warn(
        `SMTP not configured. Logging contact submission instead:\n${JSON.stringify(payload, null, 2)}`,
      );
      return {
        ok: true,
        message: 'Thanks for reaching out - I will get back to you soon.',
      };
    }

    const to = this.config.get<string>('CONTACT_TO') ?? this.config.get<string>('SMTP_USER');
    const from =
      this.config.get<string>('CONTACT_FROM') ??
      this.config.get<string>('SMTP_USER') ??
      'no-reply@portfolio.local';

    await transport.sendMail({
      to,
      from,
      replyTo: payload.email,
      subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : `[Portfolio] New message from ${payload.name}`,
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${payload.subject ? `<p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>` : ''}
        <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
      `,
    });

    this.logger.log(`Contact email sent for ${payload.email}`);
    return { ok: true, message: 'Thanks for reaching out - I will get back to you soon.' };
  }

  private createTransport(): nodemailer.Transporter | null {
    const host = this.config.get<string>('SMTP_HOST');
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    if (!host || !user || !pass) {
      return null;
    }

    return nodemailer.createTransport({
      host,
      port: Number(this.config.get<string>('SMTP_PORT') ?? 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      auth: { user, pass },
    });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
