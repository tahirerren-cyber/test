export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (req.headers.authorization !== `Bearer ${process.env.ACCESS_TOKEN}`)
    return res.status(401).end();

  const { message } = await req.json();
  const r = await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message || '' })
  });
  if (!r.ok) return res.status(502).send('discord error');
  res.status(200).send('ok');
}
