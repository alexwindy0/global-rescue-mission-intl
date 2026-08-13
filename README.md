# Global Rescue Mission Intl. — Website

A zero-cost, high-performance, accessible website for evangelism, fundraising, and community engagement.

## Technology Stack

- **Framework:** Astro v5 (Zero-JS by default)
- **Styling:** Tailwind CSS v3
- **Content:** MDX with TypeScript collections
- **CMS:** Decap CMS (Git-based, browser UI)
- **Hosting:** Netlify (Global CDN)
- **Animations:** AOS (Animate On Scroll)
- **Forms:** Netlify Forms (serverless)
- **Auth:** Netlify Identity + Git Gateway
- **Analytics:** Google Analytics via GTM

## Prerequisites

- Node.js 20 LTS
- npm 10+
- Git

## Local Development

```bash
# Clone repository
git clone https://github.com/<org>/global-rescue-mission-intl.git
cd global-rescue-mission-intl

# Install dependencies
npm ci

# Start development server
npm run dev
# Server runs at http://localhost:4321

# Build for production
npm run build
# Output in dist/
```

## Content Management (Decap CMS)

1. Navigate to `https://globalrescuemission.org/admin`
2. Log in with your Netlify Identity credentials (invite-only)
3. Create or edit content via the browser UI
4. Save changes — Decap CMS commits to a new branch
5. Review the Deploy Preview URL
6. Publish to merge to `main` and deploy to production

## Branching Strategy

| Branch | Purpose |
|:---|:---|
| `main` | Production — always deployable |
| `staging` | Pre-production testing |
| `feature/*` | Short-lived feature branches |

## CI/CD Workflow

1. Push to any branch → GitHub Actions CI runs (lint, build, test, audit)
2. Pull Request → Deploy Preview generated on Netlify
3. Merge to `main` → Automatic production deployment
4. Build failure → GitHub issue created automatically

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required variables:
- `PUBLIC_GTM_ID` — Google Tag Manager container ID
- `PUBLIC_SENTRY_DSN` — Sentry error tracking DSN
- `NETLIFY_AUTH_TOKEN` — For CD pipeline
- `NETLIFY_SITE_ID` — Site identifier

## Project Structure

```
src/
  components/     # Reusable Astro components
  content/        # MDX content (prayers, stories, pages)
  data/           # JSON/CSV data files
  layouts/        # Page layouts (BaseLayout, BlogLayout, etc.)
  pages/          # Route definitions
  styles/         # Global CSS and animations
  utils/          # TypeScript utilities
admin/            # Decap CMS configuration
public/           # Static assets
.github/          # GitHub Actions workflows
```

## Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| Dev | `npm run dev` | Start development server |
| Build | `npm run build` | Build for production |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | Run ESLint |
| Format | `npm run format:write` | Run Prettier |
| Test | `npm run test:e2e` | Run Playwright E2E tests |

## Accessibility

- WCAG 2.1 AA compliance target
- All images require descriptive `alt` text
- All form inputs require associated labels
- Keyboard navigation supported throughout
- AOS animations respect `prefers-reduced-motion`

## Performance Targets

- Google PageSpeed Score > 95
- Zero unused JavaScript (Astro default)
- Images lazy-loaded and compressed
- Fonts loaded with `display=swap`

## Security

- Content Security Policy headers
- HTTPS enforced (HSTS)
- Clickjacking protection (X-Frame-Options)
- Admin route protected by Netlify Identity
- Dependency vulnerabilities scanned in CI

## Support

For technical issues, contact the DevOps team.
For content issues, contact the Communications Director.
