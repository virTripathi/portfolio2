'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Project } from '@portfolio/types';
import { Icon } from '@/components/Icon';

const TILT = 10;

/**
 * yasio.dev/#work-style project tile: 3D tilt on pointer, slow spin while
 * hovered, and a contextual cursor label ("Spinning" / "→").
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT * 2);
    rotateX.set(-py * TILT * 2);
  }

  function onLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  const paddedIndex = String(index).padStart(2, '0');

  return (
    <motion.article
      ref={ref}
      data-cursor="label"
      data-cursor-label={hovered ? '→' : 'view'}
      data-cursor-magnetic
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{ rotateZ: hovered ? [0, 1.5, -1.5, 0] : 0 }}
      transition={hovered ? { rotateZ: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } : { duration: 0.3 }}
      className="card group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden p-6"
    >
      {/* Corner index — yasio-style numbering */}
      <span className="absolute right-5 top-5 font-mono text-xs text-slate-600 transition-colors group-hover:text-accent">
        {paddedIndex}
      </span>

      <div>
        <div className="mb-4 flex items-start justify-between gap-3 pr-8">
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          {project.featured ? (
            <span className="chip shrink-0 border-accent/30 text-accent">Featured</span>
          ) : null}
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-accent/70">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

        {project.highlights?.length ? (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/5 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        <span
          className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] transition-opacity duration-300 ${
            hovered ? 'text-accent opacity-100' : 'text-slate-600 opacity-0'
          }`}
        >
          Spinning
        </span>
      </div>

      {project.links?.length ? (
        <div className="mt-3 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="label"
              data-cursor-label="open"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-accent"
            >
              <Icon name={link.icon ?? 'external'} width={15} height={15} />
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
