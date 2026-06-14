'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '@portfolio/types';
import { Icon } from '@/components/Icon';

export function Hero({ profile }: { profile: Profile }) {
  const roles = profile.roles?.length ? profile.roles : [profile.role];
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (roles.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-16">
      <div className="container-page">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="section-eyebrow font-mono normal-case tracking-normal">
            Start /&gt;
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m {profile.name}.
          </h1>

          <div className="mt-4 flex h-10 items-center text-2xl font-semibold sm:h-12 sm:text-3xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="gradient-text"
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" data-cursor="link" className="btn-primary">
              View my work
            </a>
            <a href="#contact" data-cursor="link" className="btn-ghost">
              Contact me
            </a>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Resume <Icon name="external" width={15} height={15} />
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex items-center gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-cursor="link"
                className="text-slate-400 transition-colors hover:text-accent"
              >
                <Icon name={social.icon} width={22} height={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-500 transition-colors hover:text-white sm:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
