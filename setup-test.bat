@echo off
echo 🚀 Setting up ClauseMap Test Environment...

echo 📦 Installing dependencies...
npm install

echo 🎯 Starting test server...
echo.
echo ✅ Test server will run on http://localhost:3001
echo ✅ Load the extension in Chrome developer mode
echo ✅ Test with test-page.html
echo.
echo Press Ctrl+C to stop the server
echo.

node test-server.js
