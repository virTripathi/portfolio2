import type { NavItem, SiteConfig } from '@portfolio/types';
import { siteConfig } from './site.config';

export { siteConfig };
export default siteConfig;

/** Section labels used for the in-page navigation. */
const SECTION_LABELS: Record<keyof SiteConfig['features']['sections'], string> = {
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  writings: 'Writing',
  education: 'Education',
  contact: 'Contact',
};

/**
 * Builds the nav from enabled sections, in display order. Keeping this derived
 * from `features` means hiding a section also removes it from the nav.
 */
export function getNavItems(config: SiteConfig = siteConfig): NavItem[] {
  const order: (keyof SiteConfig['features']['sections'])[] = [
    'about',
    'experience',
    'skills',
    'projects',
    'writings',
    'education',
    'contact',
  ];

  return order
    .filter((id) => config.features.sections[id])
    .map((id) => ({ id, label: SECTION_LABELS[id] }));
}

/** Experience sorted most-recent first using `startDate`. */
export function getSortedExperience(config: SiteConfig = siteConfig) {
  return [...config.experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
}
