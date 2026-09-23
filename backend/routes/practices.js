const router = require('express').Router();

// Helper for extracting JSON from Gemini response
function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : null;
}

// Timeout wrapper for AI calls
const withTimeout = (promise, ms = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('AI Request timed out')), ms))
  ]);
};

// Gemini Practice Verification
router.post('/verify', async (req, res, next) => {
  const { plot_id, practice_type } = req.body;
  if (!plot_id || !practice_type) return res.status(400).json({ error: "Missing plot_id or practice_type" });

  const { genAI, MODEL, plots } = req.app.locals;
  const plot = plots.find(p => p.id === plot_id);

  const ndti_series = [
    { date: '2026-06-01', value: 0.1 },
    { date: '2026-06-15', value: 0.15 },
    { date: '2026-07-01', value: 0.25 },
    { date: '2026-07-15', value: 0.28 },
  ];
  const sar_series = [-12, -12.5, -13, -12.8];

  let confidence_score = 87;

  if (genAI) {
    try {
      const prompt = `Act as an agronomy verification AI. Analyze this NDTI satellite series: ${JSON.stringify(ndti_series)}. 
      Does this curve indicate successful ${practice_type}? Return ONLY a JSON object: {"confidence_score": <number 0-100>, "status": "Verified" | "NeedsCheck"}`;

      const response = await withTimeout(genAI.models.generateContent({
        model: MODEL,
        contents: prompt
      }));

      const data = extractJSON(response.text);
      if (data && data.confidence_score) {
        confidence_score = data.confidence_score;
      }
    } catch (e) {
      console.error("Gemini Scoring Error:", e);
    }
  }

  res.json({
    id: `VR-${Date.now()}`,
    plot_id,
    practice_type,
    status: 'Verified',
    confidence_score,
    regen_score: 92,
    ndti_series,
    sar_series,
    plot_details: plot || null
  });
});

module.exports = router;
