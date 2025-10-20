const fetch = require("node-fetch");

async function testAPI() {
  try {
    console.log("🧪 Testing ClauseMap API...");

    const response = await fetch("http://localhost:3001/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://example.com/terms",
        title: "Test Terms & Conditions",
        text: "This is a comprehensive terms and conditions document that outlines user rights, data collection practices, liability limitations, and termination clauses. Users must agree to these terms before using our service. We collect personal information including names, email addresses, and browsing behavior. This data may be shared with third-party partners for marketing purposes. We reserve the right to terminate accounts without notice. Our liability is limited to the maximum extent permitted by law.",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("✅ API Response:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ API Test Failed:", error.message);
  }
}

testAPI();
