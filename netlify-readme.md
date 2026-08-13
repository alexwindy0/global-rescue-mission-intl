# Netlify custom CMS setup guide

This project uses a custom admin dashboard instead of Decap CMS. The dashboard is authenticated through Netlify Identity and writes content updates to the GitHub repository via a Netlify Function.

## What is required

- Netlify site connected to your GitHub repo
- Netlify Identity enabled
- Netlify Function support enabled automatically for Netlify-hosted projects
- A GitHub token with repository write access
- The site environment variables configured in Netlify

## 1) Enable Netlify Identity

1. Open your Netlify site dashboard.
2. Go to Site configuration → Identity.
3. Turn on Identity.
4. Choose the registration and invite settings that match your workflow.
5. Create or invite the editor accounts that should access the admin dashboard.
6. Make sure the site is using the correct domain and that the admin route is served correctly.

## 2) Add the site environment variables

In Netlify, open:

- Site configuration → Environment variables

Add these values:

```bash
ASTRO_SITE_URL=https://your-site-name.netlify.app
NETLIFY_IDENTITY_JWT_SECRET=your-netlify-identity-secret
ADMIN_ALLOWED_EMAILS=you@example.com,team@example.com
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_REPOSITORY=your-org/your-repo-name
```

### Notes

- `NETLIFY_IDENTITY_JWT_SECRET` must match the value used by Netlify Identity JWT verification.
- `ADMIN_ALLOWED_EMAILS` is optional. If left blank, any authenticated Netlify Identity user may attempt saves.
- `GITHUB_TOKEN` must have permission to push to the repository.
- `GITHUB_REPOSITORY` must follow the format `owner/repo-name`.

## 3) Make sure the GitHub token has permissions

The token should be able to:

- read repository contents
- create commits for file updates
- write to the content files in this project

Recommended: use a fine-grained token or a classic PAT with repository access only to this repo.

## 4) Confirm the custom admin route is live

Your admin page is served from:

```text
https://your-site-name.netlify.app/admin
```

The admin UI loads the Netlify Identity widget and then tries to save changes via:

```text
/.netlify/functions/update-page
```

## 5) Confirm content files used by the site

The site reads MDX pages from:

```text
src/content/pages/
```

Each page file is an MDX document in the same pattern as:

```text
src/content/pages/about.mdx
src/content/pages/donate.mdx
src/content/pages/programs.mdx
```

The custom CMS saves page content back into those files.

## 6) Test the admin workflow

1. Log in to the site with a Netlify Identity user.
2. Open `/admin`.
3. Pick a page from the sidebar.
4. Edit the title, description, or MDX content.
5. Click Save page.
6. Check the Netlify Function response.
7. Confirm the file in the GitHub repo was updated.
8. Trigger a new deploy and verify the live page reflects the change.

## 7) Troubleshooting

### 401 Unauthorized

This usually means one of the following:

- Netlify Identity is not enabled
- the JWT secret is wrong
- the browser isn’t sending the Netlify token correctly
- the user is not signed in

### 403 Forbidden

This means the editor email is not in `ADMIN_ALLOWED_EMAILS`.

### 500 server error on save

Check these values in Netlify:

- `NETLIFY_IDENTITY_JWT_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_REPOSITORY`

Also confirm the GitHub token is valid and has repo write permission.

## 8) Production notes

- Keep editing restricted to trusted Netlify users.
- Use a dedicated GitHub token rather than a personal account token if possible.
- Limit the allowed admin email list to only people who should modify content.
- Deploy from main after confirming the edited page works in preview.

## 9) Admin route security summary

This custom CMS setup provides:

- login through Netlify Identity
- authenticated function calls
- JWT verification before content saves
- email allowlist support
- direct GitHub repo writes for content pages

This is the recommended pattern for a custom CMS without using Decap.
