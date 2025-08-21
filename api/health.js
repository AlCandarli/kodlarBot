// Health check endpoint for Vercel
module.exports = function handler(req, res) {
  try {
    console.log('Health check requested:', req.method, req.url);

    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      console.log('Health CORS preflight handled');
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      console.log('Health check successful');
      const response = {
        status: 'OK',
        message: 'KodlarBot Backend is running on Vercel',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        hasApiKey: !!process.env.GOOGLE_API_KEY,
        version: '1.0.0'
      };

      return res.status(200).json(response);
    } else {
      console.log('Health check - invalid method:', req.method);
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
