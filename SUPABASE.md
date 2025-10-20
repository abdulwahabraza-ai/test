# Deploy ClauseMap Summarizer on Supabase Edge Functions (Deno)

This sets up a server-side endpoint hosted on Supabase that calls OpenAI securely.

## 1) Prereqs
- Install Supabase CLI: https://supabase.com/docs/guides/cli
  - Windows: `npm i -g supabase`
- Login: `supabase login`

## 2) Add your OpenAI key as a secret
Replace with your real key locally; never hardcode it.

```bash
supabase functions secrets set OPENAI_API_KEY=YOUR_OPENAI_API_KEY -p <project-ref>
```

## 3) Deploy the function

```bash
supabase functions deploy summarize -p <project-ref>
```

The function will be available at:

```
https://<project-ref>.functions.supabase.co/summarize
```

## 4) Local testing (optional)

```bash
supabase functions serve summarize --env-file .env.local
```

## 5) Update the extension
Edit `background.js` and set the fetch URL to your deployed function URL. Optionally include the anon key header if you restrict access.

```js
// background.js
await fetch("https://<project-ref>.functions.supabase.co/summarize", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "apikey": "<YOUR_SUPABASE_ANON_KEY>", // only if you check it server-side
  },
  body: JSON.stringify({ url, title, text })
});
```

## 6) Security
- Do not expose the service_role secret to the client.
- Keep OPENAI_API_KEY only as a function secret.
- You may optionally check the `apikey` header against your anon key in the function if you want to restrict callers.


