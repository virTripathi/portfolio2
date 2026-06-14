/**
 * Shared, framework-agnostic types for the portfolio.
 * Imported by both `apps/web` (values + types) and `apps/api` (type-only).
 */

export type IconName =
  | 'github'
  | 'linkedin'
  | 'hackerrank'
  | 'mail'
  | 'phone'
  | 'mapPin'
  | 'link'
  | 'external';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
  /** Short handle shown in the UI, e.g. "@virat". */
  handle?: string;
}

export interface Profile {
  name: string;
  /** e.g. "Senior Software Engineer". */
  role: string;
  /** Short headline shown in the hero. */
  tagline: string;
  /** Longer "about me" paragraph(s). */
  summary: string;
  location: string;
  email: string;
  phone?: string;
  /** Optional path to a downloadable resume, relative to /public. */
  resumeUrl?: string;
  /** Words cycled in the animated hero heading. */
  roles?: string[];
  socials: SocialLink[];
}

export interface Experience {
  company: string;
  title: string;
  /** Human-friendly range, e.g. "Dec 2024 - Present". */
  period: string;
  /** Used for sorting (most recent first). ISO-ish, e.g. "2024-12". */
  startDate: string;
  location?: string;
  /** Optional context, e.g. flagship product name. */
  summary?: string;
  highlights: string[];
  /** Tech tags surfaced on the card. */
  stack?: string[];
}

export interface SkillGroup {
  /** e.g. "Programming & Scripting". */
  category: string;
  skills: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  icon?: IconName;
}

export interface Project {
  name: string;
  /** One-line summary. */
  tagline: string;
  description: string;
  stack: string[];
  highlights?: string[];
  links?: ProjectLink[];
  /** Marks projects to surface first / with emphasis. */
  featured?: boolean;
  /** Optional cover image path relative to /public. */
  image?: string;
}

export interface Writing {
  title: string;
  description?: string;
  href: string;
  /** e.g. "Angular", "JavaScript". */
  tag?: string;
  /** When the article was published, optional. */
  date?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  period?: string;
  grade?: string;
  details?: string;
}

export interface ThemeConfig {
  /** Primary accent color (any valid CSS color). */
  accent: string;
  /** Secondary accent used in gradients. */
  accentSecondary: string;
  /** Base background color for the dark theme. */
  background: string;
}

export interface FeatureFlags {
  /** Toggle the three.js hero scene. Falls back to a CSS gradient when false. */
  three: boolean;
  /** Toggle the contact form (and its API call). */
  contactForm: boolean;
  /** Toggle the live GitHub stats widget. */
  githubStats: boolean;
  /** Per-section visibility switches. */
  sections: {
    about: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
    writings: boolean;
    education: boolean;
    contact: boolean;
  };
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SiteConfig {
  profile: Profile;
  experience: Experience[];
  skills: SkillGroup[];
  projects: Project[];
  writings: Writing[];
  education: Education[];
  theme: ThemeConfig;
  features: FeatureFlags;
  /** GitHub username used by the live-stats widget. */
  githubUsername?: string;
}

/** Payload accepted by the NestJS `POST /contact` endpoint. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Optional subject line. */
  subject?: string;
  /** Honeypot field - must be empty for a legitimate submission. */
  company?: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}

export interface GithubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  /** Sum of stargazers across the user's public repos. */
  totalStars: number;
  topLanguages: string[];
  profileUrl: string;
  /** When the stats were fetched (ISO string). */
  fetchedAt: string;
}
