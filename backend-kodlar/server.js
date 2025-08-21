const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google Gemini AI - with error handling
let genAI = null;
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  console.log("Google AI initialized successfully");
} catch (error) {
  console.error("Error initializing Google AI:", error.message);
}

// Configure CORS to allow frontend connection
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.post("/api/ask", async (req, res) => {
  try {
    const { task, prompt, language } = req.body;

    // Check if Google AI is available
    if (!genAI) {
      return res.status(500).json({
        error: "Google AI not available",
        output: "Sorry, the AI service is currently unavailable. Please check the API key configuration."
      });
    }

    // Create the appropriate prompt based on the task
    let fullPrompt = "";
    if (task === "fix") {
      fullPrompt = `Please fix the following code and explain what was wrong:\n\n${prompt}`;
    } else if (task === "translate") {
      fullPrompt = `Please translate the following code to ${language}:\n\n${prompt}`;
    } else {
      fullPrompt = prompt;
    }

    console.log("Processing request:", { task, promptLength: prompt.length, language });

    // Get the generative model (using the latest available model)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("Response generated successfully");

    // Send response in the format expected by frontend
    res.json({ output: text });
  } catch (err) {
    console.error("Error in /api/ask:", err);
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
      output: `Error: ${err.message}. Please try again.`
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

const server = app.listen(PORT, () => {
  console.log(`✅ KodlarBot Backend Server Started Successfully!`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ API endpoint: http://localhost:${PORT}/api/ask`);
  console.log(`✅ Google Gemini AI: ${genAI ? 'Connected' : 'Not Available'}`);
  console.log(`✅ Ready to serve requests!`);
});

// Keep the process alive
setInterval(() => {
  // This keeps the event loop active
}, 1000);

// Keep the server running and handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
