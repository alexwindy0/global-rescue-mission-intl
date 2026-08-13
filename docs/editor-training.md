# Content Editor Training & Quick Reference Guide

## Global Rescue Mission Intl. — Decap CMS Workflow

### 1. Accessing the Content Manager
1. Go to `https://globalrescuemission.org/admin` in any modern web browser.
2. Click **"Log in with Netlify Identity"**.
3. Enter your assigned email address and password.
4. If you forgot your password, click *"Forgot password?"* to receive a reset link.

### 2. Managing Content Collections

#### Prayers (`src/content/prayers/`)
- **Title:** Enter concise, descriptive title (e.g. "Prayer for Peace in Troubled Regions").
- **Date:** Select the scheduled publishing date.
- **Author:** Enter author's full name.
- **Summary:** Write 1–2 sentences summarizing the prayer focus.
- **Tags:** Add relevant tags (e.g. `peace`, `daily-prayer`).
- **Featured:** Toggle on to highlight on the homepage and blog header.
- **Body:** Use the rich text Markdown editor to format prayer focus bullet points and scriptures.

#### Impact Stories (`src/content/stories/`)
- **Title:** Descriptive title of the outreach or mission project.
- **Date & Location:** Date of field deployment and location (e.g., "Kano, Nigeria").
- **Impact Statement:** Summary of key metrics (e.g., "500+ families received food aid").
- **Image & Gallery:** Upload compressed images (< 500KB) via the media library.

### 3. Publishing Workflow
1. **Draft / Review:** Saving a post creates an editorial draft and generates a Netlify **Deploy Preview URL**.
2. **Previewing:** Click the Deploy Preview link in Netlify or GitHub to visually inspect changes.
3. **Publishing:** Click **"Publish"** in Decap CMS. This automatically merges changes into `main` and deploys to production within 60 seconds.

### 4. Technical Support
- **DevOps Team:** `devops@globalrescuemission.org`
- **Communications:** `media@globalrescuemission.org`
