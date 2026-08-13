import jwt from 'jsonwebtoken';

const {
  NETLIFY_IDENTITY_JWT_SECRET,
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  ADMIN_ALLOWED_EMAILS,
} = process.env;

function escapeYaml(value = '') {
  return JSON.stringify(String(value));
}

function parseTokenFromRequest(event) {
  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.replace('Bearer ', '').trim();
}

function sanitizePageId(value) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (!cleaned || !/^[a-z0-9-]+$/.test(cleaned)) {
    return null;
  }
  return cleaned;
}

function getAllowedEmails() {
  return (ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function fetchGithubFileSha(filePath) {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/contents/${filePath}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'grm-custom-admin',
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`GitHub read failed: ${response.status} ${bodyText}`);
  }

  const json = await response.json();
  return json.sha || null;
}

async function updateGithubFile(filePath, content, sha) {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'grm-custom-admin',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Update ${filePath} via custom CMS`,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha,
    }),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`GitHub write failed: ${response.status} ${bodyText}`);
  }

  return response.json();
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const token = parseTokenFromRequest(event);
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Missing Authorization Bearer token' }),
      };
    }

    if (!NETLIFY_IDENTITY_JWT_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'NETLIFY_IDENTITY_JWT_SECRET is not configured in Netlify environment settings.',
        }),
      };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, NETLIFY_IDENTITY_JWT_SECRET);
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: err instanceof Error ? err.message : 'Authentication failed',
        }),
      };
    }

    if (!decoded || typeof decoded !== 'object') {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid token payload' }),
      };
    }

    const email = (decoded.email || decoded.user_metadata?.email || '').toLowerCase();
    const allowedEmails = getAllowedEmails();
    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'This Netlify user is not allowed to edit content.' }),
      };
    }

    if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'GITHUB_TOKEN and GITHUB_REPOSITORY must be set in Netlify environment settings.',
        }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const { title, description, lastUpdated, draft, body } = payload;
    const pageId = sanitizePageId(payload.id);

    if (!pageId || !title || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing valid page id, title, or body content.' }),
      };
    }

    const filePath = `src/content/pages/${pageId}.mdx`;
    const dateValue = lastUpdated || new Date().toISOString().slice(0, 10);
    const content = `---\ntitle: ${escapeYaml(title)}\ndescription: ${escapeYaml(description || '')}\nlastUpdated: ${dateValue}\ndraft: ${draft ? 'true' : 'false'}\n---\n\n${body.trim()}\n`;

    const sha = await fetchGithubFileSha(filePath);
    const result = await updateGithubFile(filePath, content, sha);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Updated ${pageId}.mdx successfully via GitHub.`,
        commitSha: result?.commit?.sha || null,
        filePath,
        user: email || 'authenticated-user',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Server error while saving page',
      }),
    };
  }
};
