export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { prompt } = req.body || {};
  if (!prompt || prompt.length > 20000) return res.status(400).json({ error: "bad prompt" });
  const model = process.env.MODEL || "gemini-flash-latest";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 800 } })
    });
    const d = await r.json();
    if (!r.ok) return res.status(502).json({ error: d });
    const text = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("");
    res.json({ text });
  } catch (e) { res.status(500).json({ error: String(e) }); }
}
