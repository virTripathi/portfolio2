import type { Writing } from '@portfolio/types';
import { Section } from '@/components/Section';
import { Stagger, StaggerItem } from '@/components/Reveal';
import { Icon } from '@/components/Icon';

export function Writings({ writings }: { writings: Writing[] }) {
  return (
    <Section
      id="writings"
      eyebrow="05 / Writing"
      title="Technical writing"
      description="Guides and notes I've written while learning in public."
    >
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {writings.map((post) => (
          <StaggerItem key={post.title}>
            <a
              href={post.href}
              target={post.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              data-cursor="label"
              data-cursor-label="read"
              className="card group flex h-full flex-col p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                {post.tag ? <span className="chip border-accent/30 text-accent">{post.tag}</span> : <span />}
                <Icon
                  name="external"
                  width={16}
                  height={16}
                  className="text-slate-500 transition-colors group-hover:text-accent"
                />
              </div>
              <h3 className="text-base font-semibold text-white transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              {post.description ? (
                <p className="mt-2 text-sm text-slate-400">{post.description}</p>
              ) : null}
              {post.date ? <span className="mt-auto pt-3 text-xs text-slate-600">{post.date}</span> : null}
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
