export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const auth = (req.headers.authorization || '').trim();
  const expected = `Bearer ${process.env.ACCESS_TOKEN}`.trim();
  if (auth !== expected) return res.status(401).end();

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { message } = body;
  const r = await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message || '' })
  });
  if (!r.ok) return res.status(502).send('discord error');
  res.status(200).send('ok');
}
