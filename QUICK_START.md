# ClauseMap Extension - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Server
```bash
# Option A: Use the batch file (Windows)
start-server.bat

# Option B: Manual start
set OPENAI_API_KEY=
node test-server.js
```

You should see:
```
Test server running at http://localhost:3001
API endpoint: http://localhost:3001/api/summarize
```

### Step 2: Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select your extension folder
5. The ClauseMap icon should appear in your toolbar

### Step 3: Test the Extension
1. Open `test-page.html` in Chrome
2. Click the ClauseMap extension icon
3. Wait for the AI summary to appear in the side panel!

## 🔄 Switching Between Local and Vercel

### Use Local API (Current Setup)
```bash
npm run switch:local
```

### Switch to Vercel (After Deployment)
```bash
npm run switch:vercel
# Then update the URL in background.js with your actual Vercel URL
```

## 🐛 Troubleshooting

### Server Not Starting?
- Check if port 3001 is available
- Make sure Node.js is installed
- Run `npm install` first

### Extension Not Working?
- Refresh the page after loading the extension
- Check browser console for errors (F12)
- Make sure server is running on localhost:3001

### API Errors?
- Verify OpenAI API key is set correctly
- Check server console for error messages
- Test API directly: `curl http://localhost:3001/api/summarize`

## 📁 File Structure
```
clausemap-extension/
├── manifest.json          # Extension configuration
├── popup.html/js          # Extension popup
├── background.js          # Service worker
├── content.js             # Content script
├── ui.css                 # Styling
├── test-server.js         # Local API server
├── start-server.bat       # Windows startup script
├── switch-api.js          # API URL switcher
└── test-page.html         # Test page
```

## 🎯 What You Should See

### Working Extension:
1. ✅ Popup shows "Ready to summarize"
2. ✅ Clicking shows "Summarising…"
3. ✅ Side panel appears with AI-generated summary
4. ✅ Risk assessment table with color-coded levels

### Console Logs:
```
Content script received message: EXTRACT_TEXT
Extracted text length: [number]
Calling OpenAI API...
OpenAI response received, parsing...
Sending summary to client
```

## 🚀 Next Steps

1. **Test thoroughly** with different T&Cs pages
2. **Deploy to Vercel** when ready
3. **Update API URL** in background.js
4. **Share with users**!

## 💡 Pro Tips

- Use `test-page.html` for consistent testing
- Check server logs for debugging
- The extension works on any HTTPS page
- Keyboard shortcut: `Ctrl+Shift+Y`
