@echo off
echo 🚀 Starting ClauseMap Server with OpenAI API...

set OPENAI_API_KEY=

echo ✅ Environment variable set
echo 🌐 Starting server on http://localhost:3001
echo.
echo Press Ctrl+C to stop the server
echo.

node test-server.js
