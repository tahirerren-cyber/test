export default async function handler(req, res) {
  const token = (process.env.ACCESS_TOKEN || '').trim();
  const auth = (req.headers.authorization || '').trim();
  res.status(200).json({
    auth,
    expected: `Bearer ${token}`,
    envTokenEmpty: token === '',
  });
}
