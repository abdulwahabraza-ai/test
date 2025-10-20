const fs = require("fs");

const configs = {
  local: "http://localhost:3001/api/summarize",
  vercel: "https://YOUR-VERCEL-APP.vercel.app/api/summarize",
};

const target = process.argv[2] || "local";

if (!configs[target]) {
  console.log("Usage: node switch-api.js [local|vercel]");
  console.log("Available targets:", Object.keys(configs).join(", "));
  process.exit(1);
}

// Read background.js
let backgroundJs = fs.readFileSync("background.js", "utf8");

// Replace the API URL
const currentUrl = backgroundJs.match(/fetch\("([^"]+)"/)?.[1];
if (currentUrl) {
  backgroundJs = backgroundJs.replace(currentUrl, configs[target]);
  fs.writeFileSync("background.js", backgroundJs);
  console.log(`✅ Switched API URL to: ${configs[target]}`);
} else {
  console.log("❌ Could not find API URL in background.js");
}
