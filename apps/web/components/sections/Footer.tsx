import type { Profile } from '@portfolio/types';
import { Icon } from '@/components/Icon';

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js, three.js &amp; NestJS.
        </p>
        <div className="flex items-center gap-4">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-slate-500 transition-colors hover:text-accent"
            >
              <Icon name={s.icon} width={18} height={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
