# Content Editing Guide

This document explains how to edit content for Global Rescue Mission Intl.

## Current Workflow: Direct File Editing

Content is stored as MDX files in the repository. All edits are made directly in your code editor.

### Where Content Lives

```
src/content/
├── pages/           # Static pages (about, contact, team, etc.)
│   └── *.mdx        # Page content
├── prayers/         # Daily prayer entries
│   └── *.mdx
└── stories/         # Impact stories
    └── *.mdx
```

### How to Edit a Page

1. **Open the file** in your editor:
   - Example: `src/content/pages/team.mdx`

2. **Edit the frontmatter** (top section between `---` and `---`):

   ```yaml
   ---
   title: Our Team
   description: Meet the people behind Global Rescue Mission
   lastUpdated: 2026-08-14
   draft: false
   ---
   ```

   **Available fields:**
   - `title` - Page heading
   - `description` - SEO description / page summary
   - `lastUpdated` - Date in YYYY-MM-DD format (updates automatically if changed)
   - `draft` - Set to `true` to hide the page from public view

3. **Edit the body** (content below the frontmatter):
   - Use standard Markdown syntax
   - Components like `<CTAButton />` can be used inline
   - See other pages for examples

4. **Save and commit**:

   ```bash
   git add src/content/pages/team.mdx
   git commit -m "docs: update team page content"
   git push origin main
   ```

5. **Netlify deploys automatically**:
   - Your changes are live within 1-2 minutes
   - A deploy preview is generated for each branch

### Example: Editing a Page

**File:** `src/content/pages/about.mdx`

```mdx
---
title: About Global Rescue Mission
description: Our mission and values
lastUpdated: 2026-08-14
draft: false
---

# About Us

Global Rescue Mission Intl. exists to...

<CTAButton href="/donate">Donate Now</CTAButton>
```

## Workflow for Different Content Types

### Static Pages

- Location: `src/content/pages/`
- Files: about.mdx, contact.mdx, team.mdx, etc.
- Edits are immediate after commit

### Blog Posts & Stories

- Location: `src/content/stories/` or `src/content/prayers/`
- Files: `YYYY-MM-DD-slug.mdx`
- Example: `2026-08-01-prayer-for-peace.mdx`
- Appears on `/blog` automatically

## Deployment

| Action               | Result                                       |
| :------------------- | :------------------------------------------- |
| Commit to any branch | Deploy Preview generated (link in GitHub PR) |
| Merge to `main`      | Production deployment (live immediately)     |
| Push to `staging`    | Staging environment deployment               |

## Draft Pages

To hide a page from the public:

1. Set `draft: true` in the frontmatter
2. Commit and push
3. The page will be excluded from production builds

## Future: Web-Based Admin Dashboard

In the future, we plan to add a web-based admin dashboard at `/admin` that allows editing content directly in the browser without needing to use a code editor or Git. The infrastructure for this already exists but is not currently in use.

To enable it later, set up these Netlify environment variables:

- `NETLIFY_IDENTITY_JWT_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_REPOSITORY`
- `ADMIN_ALLOWED_EMAILS`

See `netlify-readme.md` for detailed setup instructions.

## Tips

- Always commit meaningful messages describing what changed
- Use lowercase in filenames for blog posts: `2026-08-14-my-article.mdx`
- Preview locally before pushing: `npm run dev`
- If a page breaks the build, check for unclosed components or invalid YAML
- Images should be added to `public/` and referenced as `/image-name.jpg`
