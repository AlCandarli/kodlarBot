# KodlarBot 🤖

AI-powered code fixing and translation tool built with React and Google Gemini AI.

## Features

- 🔧 **Fix Code**: Automatically detect and fix bugs in your code
- 🔄 **Translate Code**: Convert code between different programming languages
- 🤖 **AI-Powered**: Uses Google Gemini AI for intelligent code analysis
- ⚡ **Fast & Responsive**: Built with React and deployed on Vercel

## Supported Languages

- Python
- JavaScript
- C++
- Java
- C#
- Go

## Live Demo

Visit: [Your Vercel URL will be here]

## Local Development

### Prerequisites

- Node.js 18+
- Google Gemini API Key

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd kodlar-app && npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env file in root
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Run locally:
   ```bash
   # Start backend
   cd backend-kodlar && npm start
   
   # Start frontend (in another terminal)
   cd kodlar-app && npm start
   ```

## Deployment

This project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add `GOOGLE_API_KEY` as an environment variable in Vercel dashboard
3. Deploy!

## Tech Stack

- **Frontend**: React, CSS3, React Icons
- **Backend**: Node.js, Express, Google Gemini AI
- **Deployment**: Vercel Serverless Functions
- **Styling**: Custom CSS with golden theme

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
