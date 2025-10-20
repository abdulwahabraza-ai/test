export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url, title, text } = req.body;

    if (!text || text.length < 100) {
      return res.status(400).json({
        error: "Insufficient text content to summarize",
      });
    }

    const prompt = `You are ClauseMap, a legal assistant for summarising Terms & Conditions and Privacy Policies.

Source: ${url}
Title: ${title}

Please analyze the following text and provide a clear, ND-friendly summary. Focus on:
1. Key terms and conditions
2. User rights and obligations
3. Data collection and privacy practices
4. Potential risks or concerning clauses

Return your response as valid JSON in this exact format:
{
  "summaryBullets": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "riskTable": [
    {
      "risk": "Description of the risk",
      "level": "High/Medium/Low",
      "why": "Explanation of why this is a risk"
    }
  ]
}

TEXT TO ANALYZE:
${text.slice(0, 12000)}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are ClauseMap, a legal assistant for summarising T&Cs. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Try to parse the JSON response
    let summary;
    try {
      summary = JSON.parse(content);
    } catch (parseError) {
      // If parsing fails, create a fallback response
      summary = {
        summaryBullets: [
          "Unable to parse AI response",
          "Please try again or check the page content",
        ],
        riskTable: [
          {
            risk: "Analysis failed",
            level: "Unknown",
            why: "The AI response could not be parsed",
          },
        ],
      };
    }

    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error in summarize API:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
