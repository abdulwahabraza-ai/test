# ClauseMap Setup Guide

## Quick Start

### 1. Deploy the Backend API

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

After deployment, note your Vercel URL (e.g., `https://clausemap-abc123.vercel.app`)

### 2. Update Extension Configuration

1. Open `background.js`
2. Replace `https://YOUR-VERCEL-APP.vercel.app/api/summarize` with your actual Vercel URL
3. Save the file

### 3. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the folder containing your extension files
5. The ClauseMap icon should appear in your toolbar

### 4. Test the Extension

1. Open `test-page.html` in Chrome (or any T&Cs page)
2. Click the ClauseMap extension icon
3. Wait for the summary to appear in the side panel

## Troubleshooting

### Extension Not Working
- Check browser console for errors
- Ensure all files are in the same directory
- Verify the API URL in `background.js` is correct

### API Errors
- Check Vercel deployment logs
- Verify OpenAI API key is set in Vercel environment variables
- Test API endpoint directly with curl or Postman

### Styling Issues
- Ensure `ui.css` is in the same directory as other files
- Check that `web_accessible_resources` is properly configured in `manifest.json`

## File Checklist

Make sure you have all these files:
- [ ] `manifest.json`
- [ ] `popup.html`
- [ ] `popup.js`
- [ ] `background.js`
- [ ] `content.js`
- [ ] `ui.css`
- [ ] `api/summarize.ts`
- [ ] `package.json`
- [ ] `vercel.json`

## API Testing

Test your API endpoint directly:

```bash
curl -X POST https://YOUR-VERCEL-APP.vercel.app/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/terms",
    "title": "Test Terms",
    "text": "This is a test terms and conditions document..."
  }'
```

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Verify the Vercel deployment is working
3. Test with the provided `test-page.html`
4. Ensure all file paths are correct
