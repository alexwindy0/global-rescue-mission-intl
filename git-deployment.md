# Detailed Step-by-Step Git Deployment & Netlify Setup Guide

**Project:** Global Rescue Mission Intl. (GRM)  
**Technology Stack:** Astro v5 + Tailwind CSS v3 + Decap CMS + Netlify Forms & Identity + GitHub Actions CI/CD

---

## Overview

This document provides a complete, step-by-step guide to hosting the Global Rescue Mission Intl. web platform on a brand-new GitHub repository and deploying it to Netlify with full CI/CD automation, serverless form processing, Netlify Identity authentication for Decap CMS, and production security headers.

---

## Table of Contents

- [Detailed Step-by-Step Git Deployment \& Netlify Setup Guide](#detailed-step-by-step-git-deployment--netlify-setup-guide)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [1. Prerequisites](#1-prerequisites)
  - [Step 1: Create a Public GitHub Repository](#step-1-create-a-public-github-repository)
  - [Step 2: Connect Local Code to the New GitHub Remote](#step-2-connect-local-code-to-the-new-github-remote)
  - [Step 3: Establish the Trunk-Based Branching Model](#step-3-establish-the-trunk-based-branching-model)
    - [Configure Branch Protection Rules on GitHub:](#configure-branch-protection-rules-on-github)
  - [Step 4: Connect Repository to Netlify \& Configure Build Settings](#step-4-connect-repository-to-netlify--configure-build-settings)
  - [Step 5: Configure Netlify Environment Variables](#step-5-configure-netlify-environment-variables)
  - [Step 6: Configure Netlify Identity \& Git Gateway (for Decap CMS)](#step-6-configure-netlify-identity--git-gateway-for-decap-cms)
    - [1. Enable Netlify Identity](#1-enable-netlify-identity)
    - [2. Enable Git Gateway](#2-enable-git-gateway)
    - [3. Invite Content Editors](#3-invite-content-editors)
  - [Step 7: Configure GitHub Repository Secrets for CD Pipeline](#step-7-configure-github-repository-secrets-for-cd-pipeline)
    - [1. Obtain Netlify Personal Access Token](#1-obtain-netlify-personal-access-token)
    - [2. Obtain Netlify Site ID](#2-obtain-netlify-site-id)
    - [3. Add Secrets to GitHub Repository](#3-add-secrets-to-github-repository)
  - [Step 8: Verify CI/CD Pipelines \& Deploy Previews](#step-8-verify-cicd-pipelines--deploy-previews)
  - [Step 9: Custom Domain Setup \& SSL Configuration](#step-9-custom-domain-setup--ssl-configuration)
  - [Step 10: Production Verification \& Smoke Test Checklist](#step-10-production-verification--smoke-test-checklist)
    - [Manual Testing Checklist:](#manual-testing-checklist)

---

## 1. Prerequisites

Before starting, ensure you have:

- A **GitHub Account** (https://github.com).
- A **Netlify Account** (https://netlify.com — free tier).
- **Node.js 20 LTS** installed locally (`node -v` prints `v20.x.x`).
- **npm 10+** installed locally (`npm -v` prints `10.x.x`).
- **Git** installed locally and authenticated with GitHub (SSH key or Personal Access Token).

---

## Step 1: Create a Public GitHub Repository

> **Constraint Notice:** Decap CMS Git Gateway free tier **requires** a public repository on GitHub.

1. Log into your GitHub account at [https://github.com](https://github.com).
2. Click the **"+"** icon in the top-right corner and select **"New repository"** (or visit [https://github.com/new](https://github.com/new)).
3. Fill in the repository details:
   - **Repository name:** `global-rescue-mission-intl`
   - **Description:** _Global Rescue Mission Intl. website — Astro v5 + Netlify implementation_
   - **Visibility:** Select **Public**
   - **Initialize repository with:**
     - ❌ **Do NOT** check _Add a README file_
     - ❌ **Do NOT** check _Add .gitignore_
     - ❌ **Do NOT** choose a license
4. Click **"Create repository"**.
5. Copy your new repository URL (e.g., `https://github.com/<your-username>/global-rescue-mission-intl.git`).

---

## Step 2: Connect Local Code to the New GitHub Remote

Open your terminal and execute the following commands from your project root:

```bash
# 1. Navigate to the project directory
cd /home/user/global-rescue-mission-intl

# 2. Check local Git status and commit history
git status

# 3. Add or update the Git remote URL to your new GitHub repository
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/alexwindy0/global-rescue-mission-intl

# 4. Verify the remote URL is correctly set
git remote -v
# Expected output:
# origin  https://github.com/<your-username>/global-rescue-mission-intl.git (fetch)
# origin  https://github.com/<your-username>/global-rescue-mission-intl.git (push)

# 5. Push the active feature branch to your new remote
git push -u origin feature/initial-setup
```

---

## Step 3: Establish the Trunk-Based Branching Model

Push the `staging` and `main` branches to GitHub to complete the trunk-based branching infrastructure:

```bash
# 1. Push main branch
git checkout main
git push -u origin main

# 2. Push staging branch
git checkout staging
git push -u origin staging

# 3. Return to the working feature branch
git checkout feature/initial-setup
```

### Configure Branch Protection Rules on GitHub:

1. In your GitHub repository, go to **Settings** → **Branches**.
2. Click **"Add branch protection rule"**.
3. **Branch name pattern:** `main`
4. Check the following settings:
   - [x] **Require a pull request before merging** (Require 1 review)
   - [x] **Require status checks to pass before merging**
     - Search and select `build-and-test` (from `.github/workflows/ci.yml`)
   - [x] **Include administrators**
5. Click **"Create"**.
6. Repeat for the `staging` branch pattern.

---

## Step 4: Connect Repository to Netlify & Configure Build Settings

1. Log into your [Netlify Dashboard](https://app.netlify.com).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select **GitHub** under _Connect to Git provider_.
4. Authorize Netlify to access your GitHub account, then select the `global-rescue-mission-intl` repository.
5. Configure the site build settings:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Expand **Advanced build settings**:
   - **Environment variables:**
     - Key: `NODE_VERSION` | Value: `20`
7. Click **"Deploy global-rescue-mission-intl"**.

---

## Step 5: Configure Netlify Environment Variables

In your Netlify site dashboard, navigate to **Site settings** → **Environment variables** → **Add a variable**:

| Variable Name            | Example Value                          | Description                       |
| :----------------------- | :------------------------------------- | :-------------------------------- |
| `ASTRO_SITE_URL`         | `https://globalrescuemission.org`      | Canonical production site URL     |
| `PUBLIC_GTM_ID`          | `GTM-XXXXXXX`                          | Google Tag Manager Container ID   |
| `PUBLIC_SENTRY_DSN`      | `https://xxx@xxx.ingest.sentry.io/xxx` | Sentry Error Tracking DSN         |
| `NETLIFY_WEBHOOK_SECRET` | _(Generate random string)_             | Secure webhook verification token |

---

## Step 6: Configure Netlify Identity & Git Gateway (for Decap CMS)

Decap CMS (at `/admin`) uses Netlify Identity and Git Gateway to allow content editors to edit MDX files directly from their browser.

### 1. Enable Netlify Identity

1. Go to **Site settings** → **Identity** → Click **"Enable Identity"**.
2. Under **Registration preferences**:
   - Click **Edit** and set to **"Invite only"** _(CRITICAL: Prevents open registration for unauthorized users)_.
3. Under **External providers**:
   - Ensure all third-party providers (Google, GitHub, etc.) are **disabled** (use email/password authentication only).

### 2. Enable Git Gateway

1. Go to **Site settings** → **Identity** → **Services** → **Git Gateway**.
2. Click **"Enable Git Gateway"**.
3. Netlify will prompt you to authorize Git Gateway access to your GitHub repository. Confirm authorization.

### 3. Invite Content Editors

1. Go to the top navigation tab **Identity** → **Users**.
2. Click **"Invite users"**.
3. Enter the email address(es) of your site editors.
4. Editors will receive an email invitation to create a password and log into `https://<your-site>.netlify.app/admin`.

---

## Step 7: Configure GitHub Repository Secrets for CD Pipeline

The GitHub Actions CD pipeline (`.github/workflows/cd.yml`) requires automated credentials to deploy directly to Netlify on push to `main`.

### 1. Obtain Netlify Personal Access Token

1. In Netlify, click your profile avatar (top-right) → **User settings** → **Applications**.
2. Under **Personal access tokens**, click **"New access token"**.
3. Description: `GitHub Actions CD Pipeline`
4. Click **"Generate token"** and copy the generated secret token immediately.

### 2. Obtain Netlify Site ID

1. In Netlify, navigate to your site dashboard → **Site settings** → **Site details**.
2. Copy the **Site ID** GUID (e.g., `a1b2c3d4-e5f6-7890-abcd-1234567890ab`).

### 3. Add Secrets to GitHub Repository

1. On GitHub, navigate to your repository → **Settings** → **Secrets and variables** → **Actions**.
2. Click **"New repository secret"** and add:

| Secret Name          | Value                                        |
| :------------------- | :------------------------------------------- |
| `NETLIFY_AUTH_TOKEN` | _(Your Personal Access Token from Step 7.1)_ |
| `NETLIFY_SITE_ID`    | _(Your Site ID GUID from Step 7.2)_          |
| `PUBLIC_GTM_ID`      | `GTM-XXXXXXX` _(Optional for build step)_    |

---

## Step 8: Verify CI/CD Pipelines & Deploy Previews

1. Create a Pull Request on GitHub:
   - Base branch: `staging`
   - Compare branch: `feature/initial-setup`
2. **Observe CI Workflow Execution:**
   - GitHub Actions executes `.github/workflows/ci.yml`.
   - Runs `npm ci`, `npm audit`, `npm run lint`, `npm run format:check`, `check-image-sizes.js`, `npm run build`, `axe-core` accessibility audit, and Playwright smoke tests.
3. **Observe Netlify Deploy Preview:**
   - Netlify automatically comments on the Pull Request with a unique **Deploy Preview URL** (e.g., `https://deploy-preview-1--globalrescuemission.netlify.app`).
4. Review the preview URL in a browser to verify:
   - Navigation, responsiveness, and AOS scroll animations.
   - Form submissions on `/donate`, `/volunteer`, and `/contact`.
   - Admin route accessibility at `/admin`.
5. Merge `feature/initial-setup` into `staging`, then create a Pull Request from `staging` to `main`.
6. Merging to `main` automatically triggers `.github/workflows/cd.yml` to deploy production artifacts to Netlify.

---

## Step 9: Custom Domain Setup & SSL Configuration

1. In Netlify Dashboard, navigate to **Domain management** → **Add custom domain**.
2. Enter your production domain: `globalrescuemission.org`.
3. Click **"Verify"** and confirm ownership.
4. **Configure DNS Records at your Domain Registrar** (e.g., Namecheap, Cloudflare, GoDaddy):
   - **Apex Domain (`globalrescuemission.org`):**
     - Type: `A` | Name: `@` | Value: `75.2.60.5` _(Netlify Load Balancer)_
   - **Subdomain (`www.globalrescuemission.org`):**
     - Type: `CNAME` | Name: `www` | Value: `<your-site-name>.netlify.app`
5. **HTTPS Provisioning:**
   - Netlify automatically issues a free Let's Encrypt SSL certificate once DNS propagation completes.
   - In Netlify UI under **HTTPS**, click **"Verify DNS configuration"**, then enable **"Force HTTPS"**.

---

## Step 10: Production Verification & Smoke Test Checklist

Execute these terminal verification commands against your live production domain:

```bash
# 1. Verify HTTPS Redirect (Should return 301 to https://)
curl -I http://globalrescuemission.org

# 2. Verify Production Security Headers
curl -I https://globalrescuemission.org | grep -E "(X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security|Content-Security-Policy)"
# Expected output:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# Content-Security-Policy: default-src 'self'...

# 3. Verify XML Sitemap Excludes Admin SPA
curl -s https://globalrescuemission.org/sitemap-0.xml | grep -c "admin"
# Expected output: 0

# 4. Verify 404 Routing
curl -I https://globalrescuemission.org/nonexistent-route
# Expected output: HTTP/2 404
```

### Manual Testing Checklist:

- [x] **Homepage:** Loads in < 2 seconds with AOS scroll animations active.
- [x] **Decap CMS (`/admin`):** Netlify Identity modal opens; unauthorized users cannot edit content.
- [x] **Netlify Forms:** Submit `/donate` proof-of-transfer form, `/volunteer` form, and `/contact` form; verify submissions populate in Netlify Dashboard → **Forms**.
- [x] **Mobile Responsiveness:** Navigation hamburger menu toggles correctly on mobile viewports.
- [x] **Accessibility:** Keyboard tab navigation works seamlessly across all interactive buttons and inputs.

---

_Deployment Guide Complete — Platform Ready for Live Production Use._
