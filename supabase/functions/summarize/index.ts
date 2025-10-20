// Supabase Edge Function: summarize
// Endpoint: https://<project-ref>.functions.supabase.co/summarize

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
  } as Record<string, string>;
}

serve(async (req: Request) => {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const { url, title, text } = await req.json();

    if (!text || typeof text !== "string" || text.length < 100) {
      return new Response(
        JSON.stringify({ error: "Insufficient text content to summarize" }),
        { status: 400, headers },
      );
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY not set" }), {
        status: 500,
        headers,
      });
    }

    const prompt = `You are ClauseMap, a legal assistant for summarising Terms & Conditions and Privacy Policies.\n\nSource: ${url}\nTitle: ${title}\n\nPlease analyze the following text and provide a clear, ND-friendly summary. Focus on:\n1. Key terms and conditions\n2. User rights and obligations\n3. Data collection and privacy practices\n4. Potential risks or concerning clauses\n\nReturn your response as valid JSON in this exact format:\n{\n  "summaryBullets": [\n    "Key point 1",\n    "Key point 2",\n    "Key point 3"\n  ],\n  "riskTable": [\n    {\n      "risk": "Description of the risk",\n      "level": "High/Medium/Low",\n      "why": "Explanation of why this is a risk"\n    }\n  ]\n}\n\nTEXT TO ANALYZE:\n${text.slice(0, 12000)}`;

    const aiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
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
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!aiResp.ok) {
      return new Response(
        JSON.stringify({
          error: `OpenAI API error: ${aiResp.status} ${aiResp.statusText}`,
        }),
        { status: 502, headers },
      );
    }

    const data = await aiResp.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: "No content from OpenAI" }), {
        status: 502,
        headers,
      });
    }

    let summary: any;
    try {
      summary = JSON.parse(content);
    } catch (_e) {
      summary = {
        summaryBullets: [
          "Unable to parse AI response",
          "Please try again or check the page content",
        ],
        riskTable: [
          { risk: "Analysis failed", level: "Unknown", why: "Parse error" },
        ],
      };
    }

    return new Response(JSON.stringify(summary), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal error", details: `${error}` }),
      { status: 500, headers },
    );
  }
});


