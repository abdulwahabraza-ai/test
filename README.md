# ClauseMap — On-Click T&Cs Summariser

A Chrome Manifest V3 extension that provides instant AI-powered summaries of Terms & Conditions and Privacy Policy pages.

## Features

- 🔍 **Smart Detection**: Automatically detects T&Cs and Privacy Policy pages
- 🤖 **AI-Powered**: Uses OpenAI's GPT-4o-mini for intelligent summarization
- 🎯 **ND-Friendly**: Clear, accessible summaries with risk assessments
- ⌨️ **Keyboard Shortcut**: Press `Ctrl+Shift+Y` for quick access
- 🎨 **Modern UI**: Clean, responsive side panel design
- 🔒 **Secure**: API key stored server-side, never exposed to client

## Installation

### Chrome Extension

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The ClauseMap icon should appear in your toolbar

### Backend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy the API: `vercel --prod`
3. Update the API URL in `background.js` with your Vercel domain

## Usage

1. Navigate to any Terms & Conditions or Privacy Policy page
2. Click the ClauseMap extension icon or press `Ctrl+Shift+Y`
3. Wait for the AI analysis (usually 2-5 seconds)
4. Review the summary and risk assessment in the side panel

## File Structure

```
clausemap-extension/
├── manifest.json          # Chrome extension manifest
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── background.js         # Service worker for messaging
├── content.js            # Content script for DOM extraction
├── ui.css                # Styling for the side panel
├── api/
│   └── summarize.ts      # Vercel Edge Function for OpenAI API
├── package.json          # Node.js dependencies
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## API Configuration

The extension uses a Vercel Edge Function to securely call the OpenAI API. The API key is stored as an environment variable in Vercel.

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (already configured)

## Development

### Local Testing

1. Load the extension in Chrome developer mode
2. Test on various T&Cs pages
3. Check browser console for any errors

### API Development

1. Install dependencies: `npm install`
2. Deploy to Vercel: `vercel --prod`
3. Update the API URL in `background.js`

## Security Notes

- ✅ API key is stored server-side only
- ✅ All requests go through Vercel Edge Function
- ✅ No sensitive data is stored locally
- ✅ HTTPS-only communication

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## License

MIT License - see LICENSE file for details

## Support

For issues or feature requests, please create an issue in the repository.
