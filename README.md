# Portfolio Monorepo

A configurable, content-driven portfolio website.

- **Frontend** (`apps/web`): Next.js 15 (App Router) + TypeScript + Tailwind CSS, with an interactive **three.js** hero (`@react-three/fiber` + `drei`) and **framer-motion** animations.
- **Backend** (`apps/api`): a thin **NestJS 11** API for the contact form (validated + rate-limited email) and a cached GitHub-stats proxy.
- **Shared packages**: `packages/content` (all site content as typed config) and `packages/types` (shared TypeScript types).

Everything you see on the site is driven by one file - [`packages/content/src/site.config.ts`](packages/content/src/site.config.ts). Edit it to update content; no component changes needed.

## Architecture

```
portfolio2/
├─ apps/
│  ├─ web/        # Next.js frontend (port 3000)
│  └─ api/        # NestJS API     (port 4000)
├─ packages/
│  ├─ content/    # site.config.ts — the single source of truth
│  └─ types/      # shared interfaces (imported by web + api)
├─ turbo.json     # task pipeline
└─ package.json   # npm workspaces + scripts
```

The web app imports content/types directly (compiled via `transpilePackages`). The API only imports `@portfolio/types` as type-only, so it needs no build step from the packages.

## Prerequisites

- Node.js >= 20 (tested on 22)
- npm >= 10

## Getting started

```bash
# 1. Install all workspaces
npm install

# 2. Set up env files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 3. Run both apps together (Turborepo)
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000 (health check at `/health`)

Run a single app instead:

```bash
npm run dev -w @portfolio/web
npm run dev -w @portfolio/api
```

## Editing content (the configurable part)

Open [`packages/content/src/site.config.ts`](packages/content/src/site.config.ts). It is fully typed against `packages/types`, so your editor will guide you.

- `profile` — name, role, tagline, summary, contact details, social links, resume URL.
- `experience[]`, `projects[]`, `skills[]`, `writings[]`, `education[]` — list-based sections.
- `theme` — `accent`, `accentSecondary`, `background` colors (drive CSS variables).
- `features` — toggles:
  - `three` — enable/disable the 3D hero (falls back to a CSS gradient).
  - `contactForm` — show the contact form and call the API.
  - `githubStats` — show the live GitHub widget.
  - `sections.*` — show/hide individual sections (also removes them from the nav).
- `githubUsername` — used by the GitHub stats widget.

> Placeholders to replace: social URLs, `writings[].href`, and `githubUsername` (search for `TODO` in the config). Add your CV to `apps/web/public/Virat-Tripathi-CV.pdf` to enable the resume button.

## Environment variables

**Web** (`apps/web/.env.local`)

| Var | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the API (default `http://localhost:4000`). |

**API** (`apps/api/.env`)

| Var | Description |
| --- | --- |
| `PORT` | API port (default `4000`). |
| `CORS_ORIGINS` | Comma-separated allowed origins. |
| `SMTP_HOST/PORT/SECURE/USER/PASS` | SMTP credentials for the contact form. If empty, submissions are logged to the console (dev-friendly). |
| `CONTACT_TO` / `CONTACT_FROM` | Recipient / sender for contact emails. |
| `GITHUB_TOKEN` | Optional token to raise the GitHub API rate limit. |

## Useful scripts

```bash
npm run dev         # run web + api in watch mode
npm run build       # build all workspaces
npm run typecheck   # type-check all workspaces
npm run lint        # lint
npm run format      # prettier --write
```

## Deployment

- **Web → Vercel**: set the project root to `apps/web` (or use the monorepo preset). Set `NEXT_PUBLIC_API_URL` to your deployed API URL.
- **API → Render / Fly / Railway / VPS**: build with `npm run build -w @portfolio/api`, run `node apps/api/dist/main.js`, and set the env vars above (especially `CORS_ORIGINS` to your web origin).
- **Docker (both)**: `docker compose up --build` brings up web (3000) and api (4000). Pass SMTP/GitHub secrets via your shell environment or an `.env` file next to `docker-compose.yml`.
