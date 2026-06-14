import type { Education as EducationType } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Stagger, StaggerItem } from '@/components/Reveal';

export function Education({ education }: { education: EducationType[] }) {
  return (
    <Section id="education" eyebrow="06 / Education" title="Education">
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {education.map((edu) => (
          <StaggerItem key={edu.institution} className="card h-full p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
              {edu.grade ? <span className="chip border-accent/30 text-accent">{edu.grade}</span> : null}
            </div>
            {edu.field ? <p className="mt-1 text-sm text-accent/90">{edu.field}</p> : null}
            <p className="mt-2 text-sm text-slate-400">{edu.institution}</p>
            {edu.period ? <p className="mt-1 font-mono text-xs text-slate-600">{edu.period}</p> : null}
            {edu.details ? <p className="mt-3 text-sm text-slate-400">{edu.details}</p> : null}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
