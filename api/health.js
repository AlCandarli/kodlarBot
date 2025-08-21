// Health check endpoint for Vercel
module.exports = function handler(req, res) {
  console.log('Health check requested:', req.method, req.url);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Health CORS preflight handled');
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    console.log('Health check successful');
    res.status(200).json({
      status: 'OK',
      message: 'KodlarBot Backend is running on Vercel',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production'
    });
  } else {
    console.log('Health check - invalid method:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
