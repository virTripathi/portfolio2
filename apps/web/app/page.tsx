import { getNavItems, getSortedExperience, siteConfig } from '@portfolio/content';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Writings } from '@/components/sections/Writings';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  const { profile, experience, skills, projects, writings, education, features, githubUsername } =
    siteConfig;
  const { sections } = features;
  const navItems = getNavItems(siteConfig);

  return (
    <>
      <Navbar items={navItems} brand={profile.name} />
      <main>
        <Hero profile={profile} />

        {sections.about ? (
          <About
            profile={profile}
            experience={experience}
            skills={skills}
            education={education}
            githubUsername={githubUsername}
            showGithub={features.githubStats}
          />
        ) : null}

        {sections.experience ? <Experience experience={getSortedExperience(siteConfig)} /> : null}
        {sections.skills ? <Skills skills={skills} /> : null}
        {sections.projects ? <Projects projects={projects} /> : null}
        {sections.writings && writings.length ? <Writings writings={writings} /> : null}
        {sections.education ? <Education education={education} /> : null}
        {sections.contact ? <Contact profile={profile} enabled={features.contactForm} /> : null}
      </main>
      <Footer profile={profile} />
    </>
  );
}
