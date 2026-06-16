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
      <ol className="space-y-10">
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${job.startDate}`}
            className="grid grid-cols-[1.25rem_1fr] gap-x-4 sm:grid-cols-[1.5rem_1fr] sm:gap-x-6"
          >
            {/* Timeline rail — dot + connector, no negative positioning */}
            <div className="flex flex-col items-center">
              <span
                className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-accent bg-base"
                aria-hidden="true"
              />
              {i < experience.length - 1 ? (
                <span className="mt-2 w-px flex-1 bg-white/10" aria-hidden="true" />
              ) : null}
            </div>

            <Reveal delay={i * 0.04} className="min-w-0 w-full">
              <article className="experience-card p-5 sm:p-6">
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 break-words text-lg font-semibold leading-snug text-white">
                    {job.title}{' '}
                    <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-slate-500">{job.period}</span>
                </div>

                {job.summary ? (
                  <p className="mt-2 break-words text-sm leading-relaxed text-slate-400">
                    {job.summary}
                  </p>
                ) : null}

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex min-w-0 gap-2.5 text-sm leading-relaxed text-slate-300"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="min-w-0 break-words">{point}</span>
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
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
