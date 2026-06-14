import type { Project } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { ProjectCard } from '@/components/ProjectCard';

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="projects"
      tag="Work />"
      title="Selected projects"
      description="A selection of SaaS, AI, and research projects I've shipped."
    >
      <Stagger className="grid gap-6 [perspective:1200px] md:grid-cols-2">
        {projects.map((project, index) => (
          <StaggerItem key={project.name}>
            <ProjectCard project={project} index={index} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
