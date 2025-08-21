#!/bin/bash

echo "🚀 Starting KodlarBot deployment to Vercel..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy KodlarBot to Vercel - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No Git remote found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/kodlarbot.git"
    echo "   Then run: git push -u origin main"
else
    echo "🔄 Pushing to GitHub..."
    git push origin main
    echo "✅ Pushed to GitHub! Vercel will auto-deploy."
fi

echo ""
echo "🎉 Deployment process completed!"
echo "📋 Next steps:"
echo "   1. Check your Vercel dashboard for deployment status"
echo "   2. Make sure GOOGLE_API_KEY is set in Vercel environment variables"
echo "   3. Your site will be live at: https://kodlarbot.vercel.app (or your custom domain)"
echo ""
