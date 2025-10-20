@echo off
echo 🚀 Deploying ClauseMap Extension...

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Deploy to Vercel
echo 📦 Deploying API to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo.
echo 📝 Next steps:
echo 1. Note the deployment URL from the output above
echo 2. Update the API URL in background.js with your Vercel domain
echo 3. Load the extension in Chrome developer mode
echo 4. Test on a Terms ^& Conditions page
echo.
pause
