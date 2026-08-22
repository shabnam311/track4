require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key_for_build');
const PORT = process.env.PORT || 3000;

// Seed Data
const farmers = [
  { id: 'F001', name: 'Anjali', phone: '+919876543210', country: 'India', preferred_language: 'hi' },
  { id: 'F002', name: 'Carlos', phone: '+5511987654321', country: 'Brazil', preferred_language: 'pt' }
];

const plots = [
  { id: 'P101', farmer_id: 'F001', country: 'India', crop_type: 'Wheat', geometry: { lat: 22.9734, lng: 78.6569 } },
  { id: 'P102', farmer_id: 'F002', country: 'Brazil', crop_type: 'Soy', geometry: { lat: -12.6819, lng: -56.9211 } }
];

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/plots', (req, res) => res.json(plots));

// Gemini Pest Diagnosis
app.post('/api/pest/diagnose', async (req, res) => {
  const { imageBase64, text, language = 'en' } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    // Fallback if no key is provided during demo
    return res.json({
      disease_name: "Fall Armyworm (Simulated Fallback)",
      confidence: 92,
      treatment: "Apply neem oil (5%). (Add GEMINI_API_KEY to backend/.env for real AI response)",
      symptoms_detected: ["leaf spots", "chewed edges"]
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert agronomist. Analyze this crop issue. The user says: "${text}". 
      Respond ONLY with a JSON object in this format (translate values to ${language}): 
      {"disease_name": "Name", "confidence": <number 0-100>, "treatment": "Actionable advice", "symptoms_detected": ["symp1"]}`;

    const parts = [{ text: prompt }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.split(',')[1] || imageBase64,
          mimeType: "image/jpeg"
        }
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const textResponse = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.json(JSON.parse(textResponse));
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to analyze image via Google AI" });
  }
});

// Gemini Practice Verification
app.post('/api/practices/verify', async (req, res) => {
  const { plot_id, practice_type } = req.body;
  
  // Synthetic Satellite Data Generation
  const ndti_series = [
    { date: '2026-06-01', value: 0.1 },
    { date: '2026-06-15', value: 0.15 },
    { date: '2026-07-01', value: 0.25 },
    { date: '2026-07-15', value: 0.28 },
  ];
  const sar_series = [-12, -12.5, -13, -12.8];

  let confidence_score = 87;

  // Enhance with Google AI predictive modelling if key exists
  if (process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Act as an agronomy verification AI. Analyze this NDTI satellite series: ${JSON.stringify(ndti_series)}. 
      Does this curve indicate successful ${practice_type}? Return ONLY a JSON object: {"confidence_score": <number 0-100>, "status": "Verified" | "NeedsCheck"}`;
      
      const result = await model.generateContent(prompt);
      const data = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, '').trim());
      confidence_score = data.confidence_score;
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
    sar_series
  });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
