'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = {
  variant: 'default' | 'hover' | 'label' | 'magnetic';
  label: string;
};

/**
 * yasio.dev-style custom cursor: lagging ring + dot, magnetic pull toward
 * interactive targets, and contextual labels on project tiles.
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [state, setState] = useState<CursorState>({ variant: 'default', label: '' });
  const targetRef = useRef<{ x: number; y: number } | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.55 });
  const dotX = useSpring(x, { stiffness: 900, damping: 45 });
  const dotY = useSpring(y, { stiffness: 900, damping: 45 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setActive(true);
    document.documentElement.classList.add('has-custom-cursor');

    const resolveTarget = (el: HTMLElement | null) => {
      if (!el) {
        targetRef.current = null;
        setState({ variant: 'default', label: '' });
        return;
      }

      const rect = el.getBoundingClientRect();
      targetRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const mode = el.dataset.cursor;
      if (mode === 'label' && el.dataset.cursorLabel) {
        setState({ variant: 'label', label: el.dataset.cursorLabel });
      } else if (el.dataset.cursorMagnetic !== undefined || mode === 'magnetic') {
        setState({ variant: 'magnetic', label: '' });
      } else {
        setState({ variant: 'hover', label: '' });
      }
    };

    const onMove = (e: MouseEvent) => {
      let clientX = e.clientX;
      let clientY = e.clientY;

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [data-cursor], [data-cursor-magnetic]',
      );

      resolveTarget(target ?? null);

      // Magnetic pull toward the hovered element center (yasio-style).
      if (target && targetRef.current) {
        const strength = target.dataset.cursorMagnetic !== undefined ? 0.38 : 0.22;
        clientX += (targetRef.current.x - clientX) * strength;
        clientY += (targetRef.current.y - clientY) * strength;
      }

      x.set(clientX);
      y.set(clientY);
      setVisible(true);
    };

    const onLeave = () => {
      setVisible(false);
      targetRef.current = null;
      setState({ variant: 'default', label: '' });
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!active) return null;

  const isLabel = state.variant === 'label';
  const isHover = state.variant === 'hover' || state.variant === 'magnetic';
  const ringSize = isLabel ? 56 : isHover ? 40 : 28;
  const pressScale = pressed ? 0.82 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-accent/80 font-mono text-[11px] font-medium uppercase tracking-widest text-accent"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          backgroundColor: isLabel ? 'rgb(var(--accent) / 0.14)' : 'rgba(0,0,0,0)',
          borderColor: isLabel ? 'rgb(var(--accent) / 0.9)' : 'rgb(var(--accent) / 0.55)',
          scale: pressScale,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {isLabel ? (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12 }}
            >
              {state.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, marginLeft: -2, marginTop: -2 }}
        animate={{ opacity: isLabel ? 0 : 1, scale: isHover ? 0.6 : 1 }}
      />
    </div>
  );
}
