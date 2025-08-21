// Default API endpoint - redirects to health check
module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    message: 'KodlarBot API is running!',
    endpoints: {
      health: '/api/health',
      ask: '/api/ask'
    },
    version: '1.0.0'
  });
}
