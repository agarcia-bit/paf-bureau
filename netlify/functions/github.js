export default async (req, context) => {
  const token = Netlify.env.get('GH_TOKEN');
  const OWNER = 'agarcia-bit';
  const REPO  = 'paf-bureau';
  const FILE  = 'data.json';
  const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === 'GET') {
    const r = await fetch(API, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
    });
    const data = await r.json();
    return new Response(JSON.stringify(data), {
      status: r.status,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  if (req.method === 'PUT') {
    const body = await req.json();
    const r = await fetch(API, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    return new Response(JSON.stringify(data), {
      status: r.status,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405, headers });
};

export const config = { path: '/api/github' };
