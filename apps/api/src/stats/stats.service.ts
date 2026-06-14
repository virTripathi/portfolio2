import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GithubStats } from '@portfolio/types';

interface CacheEntry {
  data: GithubStats;
  expiresAt: number;
}

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly ttlMs = 30 * 60 * 1000; // 30 minutes

  constructor(private readonly config: ConfigService) {}

  async getGithubStats(username: string): Promise<GithubStats> {
    const key = username.toLowerCase();
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const data = await this.fetchFromGithub(username);
    this.cache.set(key, { data, expiresAt: Date.now() + this.ttlMs });
    return data;
  }

  private async fetchFromGithub(username: string): Promise<GithubStats> {
    const token = this.config.get<string>('GITHUB_TOKEN');
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-app',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
      });
      if (!userRes.ok) {
        throw new HttpException(
          `GitHub user lookup failed (${userRes.status})`,
          userRes.status === 404 ? 404 : 502,
        );
      }
      const user = (await userRes.json()) as GithubUser;

      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        { headers },
      );
      const repos = reposRes.ok ? ((await reposRes.json()) as GithubRepo[]) : [];

      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

      const languageCounts = new Map<string, number>();
      repos
        .filter((r) => !r.fork && r.language)
        .forEach((r) => {
          const lang = r.language as string;
          languageCounts.set(lang, (languageCounts.get(lang) ?? 0) + 1);
        });
      const topLanguages = [...languageCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([lang]) => lang)
        .slice(0, 6);

      return {
        username,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        totalStars,
        topLanguages,
        profileUrl: user.html_url,
        fetchedAt: new Date().toISOString(),
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      this.logger.error('Failed to fetch GitHub stats', err as Error);
      throw new HttpException('Failed to fetch GitHub stats', 502);
    }
  }
}
