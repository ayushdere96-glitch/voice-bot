const MODELS = [process.env.MODEL, "gemini-flash-latest", "gemini-2.5-flash", "gemini-3-flash-preview", "gemini-flash-lite-latest", "gemini-2.5-flash-lite"].filter(Boolean);

export default async function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;
  // Open /api/chat in the browser to run this health check
  if (req.method === "GET") {
    if (!key) return res.status(200).json({ ok: false, problem: "GEMINI_API_KEY is not set in Vercel. Add it in Settings > Environment Variables, then Redeploy." });
    const results = [];
    for (const m of MODELS) {
      const r = await callGemini(m, "Say hi in 3 words.", key);
      results.push({ model: m, ok: r.ok, status: r.status, text: r.text || undefined, error: r.error });
      if (r.ok) break;
    }
    return res.status(200).json({ ok: results.some(x => x.ok), keySet: true, results });
  }
  if (req.method !== "POST") return res.status(405).end();
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY missing" });
  const { prompt } = req.body || {};
  if (!prompt || prompt.length > 20000) return res.status(400).json({ error: "bad prompt" });
  let last;
  for (const m of MODELS) {
    last = await callGemini(m, prompt, key);
    if (last.ok) return res.json({ text: last.text, model: m });
  }
  return res.status(502).json({ error: last });
}

async function callGemini(model, prompt, key) {
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": key, "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 2000 } })
    });
    const d = await r.json();
    if (!r.ok) return { ok: false, status: r.status, error: d?.error?.message || "request failed" };
    const text = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("").trim();
    if (!text) return { ok: false, status: 200, error: "empty reply" };
    return { ok: true, status: 200, text };
  } catch (e) { return { ok: false, status: 0, error: String(e) }; }
}
