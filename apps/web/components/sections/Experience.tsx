import type { Experience as ExperienceType } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

export function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <Section
      id="experience"
      tag="Experience />"
      title="Where I've worked"
      description="Four years across SaaS products, distributed systems, and full-stack delivery."
    >
      <ol className="relative border-l border-white/10 pl-6 sm:pl-8">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.startDate}`} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-base sm:-left-[9px]" />
            <Reveal delay={i * 0.04}>
              <div className="card p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {job.title} <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-slate-500">{job.period}</span>
                </div>

                {job.summary ? <p className="mt-2 text-sm text-slate-400">{job.summary}</p> : null}

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((point, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                {job.stack?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
