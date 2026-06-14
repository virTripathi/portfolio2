import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionProps = {
  id: string;
  /** yasio-style terminal tag, e.g. "About />". Takes precedence over eyebrow. */
  tag?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, tag, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className ?? ''}`}>
      <div className="container-page">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            {tag ? (
              <span className="section-eyebrow font-mono normal-case tracking-normal text-accent">
                {tag}
              </span>
            ) : eyebrow ? (
              <span className="section-eyebrow">{eyebrow}</span>
            ) : null}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            {description ? <p className="mt-4 text-base text-slate-400">{description}</p> : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
