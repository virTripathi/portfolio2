import type { SkillGroup } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Stagger, StaggerItem } from '@/components/Reveal';

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section
      id="skills"
      tag="Skills />"
      title="Tools I work with"
      description="A backend-leaning toolkit, with enough frontend to ship end-to-end."
    >
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <StaggerItem key={group.category} className="card h-full p-5">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
