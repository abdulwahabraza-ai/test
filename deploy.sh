#!/bin/bash

echo "🚀 Deploying ClauseMap Extension..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "📦 Deploying API to Vercel..."
vercel --prod

# Get the deployment URL
echo "🔗 Getting deployment URL..."
DEPLOYMENT_URL=$(vercel ls | grep -o 'https://[^[:space:]]*' | head -1)

if [ -n "$DEPLOYMENT_URL" ]; then
    echo "✅ Deployment successful!"
    echo "🌐 API URL: $DEPLOYMENT_URL"
    echo ""
    echo "📝 Next steps:"
    echo "1. Update the API URL in background.js with: $DEPLOYMENT_URL"
    echo "2. Load the extension in Chrome developer mode"
    echo "3. Test on a Terms & Conditions page"
else
    echo "❌ Failed to get deployment URL"
    exit 1
fi
