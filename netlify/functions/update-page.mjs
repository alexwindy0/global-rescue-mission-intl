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

function buildResponse(statusCode, payload) {
  return {
    statusCode,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

async function handleUpdatePage(event) {
  const method = event.httpMethod || 'GET';
  if (method !== 'POST') {
    return buildResponse(405, {
      error: 'Method not allowed.',
      message: 'This endpoint requires POST requests from the admin dashboard. Direct browser GET requests are not valid for saving content.',
      expectedMethod: 'POST',
    });
  }

  try {
    const token = parseTokenFromRequest(event);
    if (!token) {
      return buildResponse(401, { error: 'Missing Authorization Bearer token' });
    }

    if (!NETLIFY_IDENTITY_JWT_SECRET) {
      return buildResponse(500, {
        error: 'NETLIFY_IDENTITY_JWT_SECRET is not configured in Netlify environment settings.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, NETLIFY_IDENTITY_JWT_SECRET);
    } catch (err) {
      return buildResponse(401, {
        error: err instanceof Error ? err.message : 'Authentication failed',
      });
    }

    if (!decoded || typeof decoded !== 'object') {
      return buildResponse(401, { error: 'Invalid token payload' });
    }

    const email = (decoded.email || decoded.user_metadata?.email || '').toLowerCase();
    const allowedEmails = getAllowedEmails();
    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      return buildResponse(403, {
        error: 'This Netlify user is not allowed to edit content.',
      });
    }

    if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
      return buildResponse(500, {
        error: 'GITHUB_TOKEN and GITHUB_REPOSITORY must be set in Netlify environment settings.',
      });
    }

    const payload = JSON.parse(event.body || '{}');
    const { title, description, lastUpdated, draft, body } = payload;
    const pageId = sanitizePageId(payload.id);

    if (!pageId || !title || !body) {
      return buildResponse(400, {
        error: 'Missing valid page id, title, or body content.',
      });
    }

    const filePath = `src/content/pages/${pageId}.mdx`;
    const dateValue = lastUpdated || new Date().toISOString().slice(0, 10);
    const content = `---\ntitle: ${escapeYaml(title)}\ndescription: ${escapeYaml(description || '')}\nlastUpdated: ${dateValue}\ndraft: ${draft ? 'true' : 'false'}\n---\n\n${body.trim()}\n`;

    const sha = await fetchGithubFileSha(filePath);
    const result = await updateGithubFile(filePath, content, sha);

    return buildResponse(200, {
      message: `Updated ${pageId}.mdx successfully via GitHub.`,
      commitSha: result?.commit?.sha || null,
      filePath,
      user: email || 'authenticated-user',
    });
  } catch (error) {
    return buildResponse(500, {
      error: error instanceof Error ? error.message : 'Server error while saving page',
    });
  }
}

export async function handler(req) {
  const headers = {};
  if (req && typeof req.headers?.entries === 'function') {
    for (const [key, value] of req.headers.entries()) {
      headers[key] = value;
    }
  }

  const method = req?.method || req?.httpMethod || 'GET';
  const bodyText = req && typeof req.text === 'function' ? await req.text() : '';

  const event = {
    httpMethod: method,
    headers,
    body: bodyText,
  };

  return handleUpdatePage(event);
}

export const handlerLegacy = async (event) => handleUpdatePage(event);
