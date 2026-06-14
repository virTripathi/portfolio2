'use client';

import { useState, type FormEvent } from 'react';
import type { Profile } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { sendContactMessage } from '@/lib/api';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ profile, enabled }: { profile: Profile; enabled: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      company: String(data.get('company') ?? ''), // honeypot
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setFeedback('Please fill in your name, email, and message.');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const res = await sendContactMessage(payload);
      setStatus('success');
      setFeedback(res.message);
      form.reset();
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <Section
      id="contact"
      tag="Contact />"
      title="Let's build something"
      description="Have a role, a project, or just want to say hi? My inbox is open."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal from="left">
          <div className="space-y-5">
            <p className="text-slate-300">
              The fastest way to reach me is by email, but the form works too.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-lg font-medium text-white transition-colors hover:text-accent"
            >
              <Icon name="mail" className="text-accent" />
              {profile.email}
            </a>
            {profile.phone ? (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-slate-300 transition-colors hover:text-accent"
              >
                <Icon name="phone" className="text-accent" />
                {profile.phone}
              </a>
            ) : null}
            <div className="flex items-center gap-4 pt-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-slate-400 transition-colors hover:text-accent"
                >
                  <Icon name={s.icon} width={22} height={22} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {enabled ? (
          <Reveal from="right" delay={0.1}>
            <form onSubmit={handleSubmit} className="card space-y-4 p-6" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" type="text" placeholder="Jane Doe" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                />
              </div>

              {/* Honeypot - hidden from real users */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                data-cursor="link"
                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending...' : 'Send message'}
              </button>

              {feedback ? (
                <p
                  role="status"
                  className={`text-sm ${status === 'success' ? 'text-accent' : 'text-rose-400'}`}
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-slate-400">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
      />
    </div>
  );
}
