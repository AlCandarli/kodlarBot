// Main API endpoint for KodlarBot on Vercel
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { task, prompt, language } = req.body;

    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    if (!genAI) {
      return res.status(500).json({ 
        error: 'Google AI not available', 
        output: 'Sorry, the AI service is currently unavailable. Please check the API key configuration.' 
      });
    }

    // Create the appropriate prompt based on the task
    let fullPrompt = '';
    if (task === 'fix') {
      fullPrompt = `Please fix the following code and explain what was wrong:\n\n${prompt}`;
    } else if (task === 'translate') {
      fullPrompt = `Please translate the following code to ${language}:\n\n${prompt}`;
    } else {
      fullPrompt = prompt;
    }

    console.log('Processing request:', { task, promptLength: prompt.length, language });

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('Response generated successfully');

    // Send response in the format expected by frontend
    res.status(200).json({ output: text });
  } catch (err) {
    console.error('Error in /api/ask:', err);
    res.status(500).json({ 
      error: 'Something went wrong', 
      details: err.message,
      output: `Error: ${err.message}. Please try again.`
    });
  }
}
