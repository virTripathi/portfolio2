import type { ContactPayload, ContactResponse, GithubStats } from '@portfolio/types';

/**
 * Base URL of the NestJS API. Configured via NEXT_PUBLIC_API_URL so the same
 * build can point at localhost in dev and a deployed API in production.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
).replace(/\/$/, '');

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data: Partial<ContactResponse> = {};
  try {
    data = await res.json();
  } catch {
    // ignore non-JSON bodies
  }

  if (!res.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again later.');
  }

  return {
    ok: true,
    message: data.message ?? 'Thanks for reaching out - I will get back to you soon.',
  };
}

export async function fetchGithubStats(username: string): Promise<GithubStats> {
  const res = await fetch(`${API_BASE_URL}/github-stats?username=${encodeURIComponent(username)}`, {
    // Stats are cached on the server; allow the browser to revalidate.
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to load GitHub stats');
  }
  return res.json();
}
