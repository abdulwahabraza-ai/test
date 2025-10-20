Write-Host "🚀 Starting ClauseMap Server with OpenAI API..." -ForegroundColor Green

$env:OPENAI_API_KEY = 

Write-Host "✅ Environment variable set" -ForegroundColor Green
Write-Host "🌐 Starting server on http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

node test-server.js
