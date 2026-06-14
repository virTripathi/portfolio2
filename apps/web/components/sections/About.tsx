import type { Education, Experience, Profile, SkillGroup } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { GithubStats } from '@/components/GithubStats';
import { ProfileCodeBlock } from '@/components/ProfileCodeBlock';

export function About({
  profile,
  experience,
  skills,
  education,
  githubUsername,
  showGithub,
}: {
  profile: Profile;
  experience: Experience[];
  skills: SkillGroup[];
  education: Education[];
  githubUsername?: string;
  showGithub: boolean;
}) {
  const details = [
    { icon: 'mapPin' as const, label: profile.location },
    { icon: 'mail' as const, label: profile.email, href: `mailto:${profile.email}` },
    profile.phone ? { icon: 'phone' as const, label: profile.phone, href: `tel:${profile.phone}` } : null,
  ].filter(Boolean) as { icon: 'mapPin' | 'mail' | 'phone'; label: string; href?: string }[];

  return (
    <Section id="about" tag="About />" title="Who I am">
      <Reveal>
        <ProfileCodeBlock
          profile={profile}
          experience={experience}
          skills={skills}
          education={education}
        />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <Reveal delay={0.05}>
          <p className="max-w-2xl text-base leading-relaxed text-slate-400">{profile.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {details.map((d) => (
              <li key={d.label}>
                {d.href ? (
                  <a
                    href={d.href}
                    data-cursor="link"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-accent"
                  >
                    <Icon name={d.icon} width={16} height={16} className="text-accent" />
                    {d.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <Icon name={d.icon} width={16} height={16} className="text-accent" />
                    {d.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        {showGithub && githubUsername ? (
          <Reveal from="right" delay={0.1} className="w-full lg:w-72">
            <GithubStats username={githubUsername} />
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
