'use client';

import { useEffect, useState } from 'react';
import type { GithubStats as GithubStatsType } from '@portfolio/types';
import { fetchGithubStats } from '@/lib/api';

export function GithubStats({ username }: { username: string }) {
  const [stats, setStats] = useState<GithubStatsType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchGithubStats(username)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) return null;

  const items = [
    { label: 'Repositories', value: stats?.publicRepos },
    { label: 'Total stars', value: stats?.totalStars },
    { label: 'Followers', value: stats?.followers },
  ];

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">GitHub</span>
        {stats ? (
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white"
          >
            @{stats.username}
          </a>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-2xl font-bold text-white">
              {item.value === undefined ? (
                <span className="inline-block h-7 w-10 animate-pulse rounded bg-white/10" />
              ) : (
                item.value
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      {stats?.topLanguages.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stats.topLanguages.slice(0, 5).map((lang) => (
            <span key={lang} className="chip">
              {lang}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
