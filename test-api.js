// Quick test for deployed API
const https = require('https');

const VERCEL_URL = 'https://kodlar-5kouovu4x-al-candarlis-projects.vercel.app';

function testAPI(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, VERCEL_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing deployed KodlarBot API...\n');
  
  try {
    // Test health endpoint
    console.log('1️⃣ Testing /api/health...');
    const healthResult = await testAPI('/api/health');
    console.log(`Status: ${healthResult.status}`);
    console.log('Response:', healthResult.data);
    
    // Test ask endpoint
    console.log('\n2️⃣ Testing /api/ask...');
    const askResult = await testAPI('/api/ask', 'POST', {
      task: 'fix',
      prompt: 'console.log(hello)',
      language: ''
    });
    console.log(`Status: ${askResult.status}`);
    console.log('Response:', askResult.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();
