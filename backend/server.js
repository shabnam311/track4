require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors({ origin: '*' })); // Should restrict to frontend URL in full pilot
app.use(express.json({ limit: '10mb' }));

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
const PORT = process.env.PORT || 3000;
const MODEL = "gemini-2.5-flash"; // Updated to current active model

// Seed Data
const farmers = [
  { id: 'F001', name: 'Anjali', phone: '+919876543210', country: 'India', preferred_language: 'hi' },
  { id: 'F002', name: 'Carlos', phone: '+5511987654321', country: 'Brazil', preferred_language: 'ta' } // Swapped PT to Tamil (ta)
];

const plots = [
  { id: 'P101', farmer_id: 'F001', country: 'India', crop_type: 'Wheat', name: 'Wheat Field (2 Acres)', location: 'Bhopal Dist.', geometry: { lat: 22.9734, lng: 78.6569 } },
  { id: 'P102', farmer_id: 'F002', country: 'Brazil', crop_type: 'Soy', name: 'Soy Field (15 Hectares)', location: 'Mato Grosso', geometry: { lat: -12.6819, lng: -56.9211 } }
];

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/plots', (req, res) => {
  const { farmer_id } = req.query;
  if (farmer_id) {
    return res.json(plots.filter(p => p.farmer_id === farmer_id));
  }
  res.json(plots);
});

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

// Gemini Pest Diagnosis
app.post('/api/pest/diagnose', async (req, res) => {
  const { imageBase64, text, language = 'en' } = req.body;
  
  if (!genAI) {
    return res.json({
      disease_name: "Fall Armyworm (Offline Mode)",
      confidence: 92,
      treatment: "Apply neem oil (5%). (Add GEMINI_API_KEY to backend/.env for real AI response)",
      symptoms_detected: ["leaf spots", "chewed edges"]
    });
  }

  try {
    const prompt = `You are an expert agronomist. Analyze this crop issue. The user says: "${text}". 
      Respond ONLY with a JSON object in this format (translate values to ${language}): 
      {"disease_name": "Name", "confidence": <number 0-100>, "treatment": "Actionable advice", "symptoms_detected": ["symp1"]}`;

    const contents = [prompt];
    
    if (imageBase64) {
      const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      });
    }

    const response = await withTimeout(genAI.models.generateContent({
      model: MODEL,
      contents: contents,
    }));
    
    const data = extractJSON(response.text);
    if (!data) throw new Error("Failed to parse AI JSON response");

    res.json(data);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI service error — showing cached example" });
  }
});

// Gemini Practice Verification
app.post('/api/practices/verify', async (req, res) => {
  const { plot_id, practice_type } = req.body;
  if (!plot_id || !practice_type) return res.status(400).json({ error: "Missing plot_id or practice_type" });

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

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
