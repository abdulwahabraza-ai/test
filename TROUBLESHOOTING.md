# ClauseMap Extension Troubleshooting Guide

## Common Issues and Solutions

### 1. "Could not establish connection. Receiving end does not exist"

**Cause:** Content script not loaded or not responding

**Solutions:**
1. **Refresh the page** - Content scripts only load on page load
2. **Check if page is HTTPS** - Some pages block content scripts
3. **Reload the extension** - Go to `chrome://extensions/` and click the reload button
4. **Check console errors** - Open DevTools (F12) and look for JavaScript errors

### 2. "The message port closed before a response was received"

**Cause:** Background script timeout or communication error

**Solutions:**
1. **Check background script** - Go to `chrome://extensions/` → Details → Inspect views: background page
2. **Verify API server** - Make sure test server is running on `http://localhost:3001`
3. **Check network tab** - Look for failed API requests

### 3. Extension Not Working on Some Pages

**Cause:** Content Security Policy or page restrictions

**Solutions:**
1. **Try on different pages** - Test with `test-page.html` first
2. **Check page permissions** - Some sites block extensions
3. **Use HTTPS pages** - HTTP pages may have restrictions

## Step-by-Step Debugging

### Step 1: Start the Test Server
```bash
npm install
node test-server.js
```
You should see: `Test server running at http://localhost:3001`

### Step 2: Load Extension in Chrome
1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select your extension folder
5. Verify extension appears in toolbar

### Step 3: Test on Simple Page
1. Open `test-page.html` in Chrome
2. Click the ClauseMap extension icon
3. Check browser console for errors (F12)

### Step 4: Check Background Script
1. Go to `chrome://extensions/`
2. Find ClauseMap extension
3. Click "Details"
4. Click "Inspect views: background page"
5. Check console for errors

### Step 5: Check Content Script
1. On the test page, open DevTools (F12)
2. Go to Console tab
3. Look for "Content script received message" logs
4. Check for any error messages

## Debug Console Commands

### Test API Directly
```javascript
fetch('http://localhost:3001/api/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com',
    title: 'Test',
    text: 'This is a test terms and conditions document...'
  })
}).then(r => r.json()).then(console.log)
```

### Test Content Script
```javascript
// In page console
chrome.runtime.sendMessage({type: 'EXTRACT_TEXT'}, console.log)
```

## Expected Behavior

### Working Extension Should:
1. ✅ Show "Ready to summarize" in popup
2. ✅ Display "Summarising…" when clicked
3. ✅ Show "Summary complete! Check the side panel" on success
4. ✅ Display side panel with summary and risk table
5. ✅ Log messages in console

### Console Logs You Should See:
```
Content script received message: EXTRACT_TEXT
Extracted text length: [number]
Is policy page: [true/false]
Sending message to background script for tab: [number]
Received response from background: {success: true}
```

## Still Not Working?

1. **Check all files are present:**
   - manifest.json
   - popup.html, popup.js
   - background.js
   - content.js
   - ui.css

2. **Verify file permissions:**
   - All files should be readable
   - No special characters in file names

3. **Try different browser:**
   - Test in Chrome Canary
   - Try Edge (Chromium-based)

4. **Reset extension:**
   - Remove extension completely
   - Reload Chrome
   - Load extension again

## Getting Help

If issues persist:
1. Copy all console error messages
2. Note which step fails
3. Check if test server is running
4. Verify all files are in the same directory
