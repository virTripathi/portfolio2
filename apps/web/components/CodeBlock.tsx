import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Lightweight, dependency-free "syntax highlighting" primitives.
 * Compose code visually with these token components - no parser needed.
 */

export function CodeWindow({
  filename,
  children,
  className,
  ...rest
}: {
  filename: string;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 surface ${className ?? ''}`}
      {...rest}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-xs text-slate-500">{filename}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/** A single line with optional indentation (each level = 2 spaces). */
export function Line({ indent = 0, children }: { indent?: number; children?: ReactNode }) {
  return (
    <div className="whitespace-pre">
      {'  '.repeat(indent)}
      {children}
    </div>
  );
}

export const Cmt = ({ children }: { children: ReactNode }) => (
  <span className="italic text-slate-500">{children}</span>
);
export const Kw = ({ children }: { children: ReactNode }) => (
  <span className="text-accent">{children}</span>
);
export const Fn = ({ children }: { children: ReactNode }) => (
  <span className="text-[#93b4f5]">{children}</span>
);
export const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-[#8fc7b0]">{children}</span>
);
export const Num = ({ children }: { children: ReactNode }) => (
  <span className="text-[#d6b06a]">{children}</span>
);
export const Prop = ({ children }: { children: ReactNode }) => (
  <span className="text-slate-200">{children}</span>
);
export const Punc = ({ children }: { children: ReactNode }) => (
  <span className="text-slate-500">{children}</span>
);
