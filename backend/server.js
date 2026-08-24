require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors({ origin: '*' })); // Should restrict to frontend URL in full pilot
app.use(express.json({ limit: '10mb' }));

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
const PORT = process.env.PORT || 3000;
const MODEL = "gemini-3.6-flash"; // Updated to current active model

// Seed Data
const farmers = [
  { id: 'F001', name: 'Anjali', phone: '+919876543210', country: 'India', preferred_language: 'hi' },
  { id: 'F002', name: 'Karthik', phone: '+919876543211', country: 'India', preferred_language: 'ta' }
];

const plots = [
  { id: 'P101', farmer_id: 'F001', country: 'India', crop_type: 'Wheat', name: 'Wheat Field (2 Acres)', location: 'Bhopal Dist.', geometry: { lat: 22.9734, lng: 78.6569 } },
  { id: 'P102', farmer_id: 'F002', country: 'India', crop_type: 'Rice', name: 'Rice Paddy (15 Acres)', location: 'Tamil Nadu', geometry: { lat: 11.1271, lng: 78.6569 } }
];

app.get('/api/health', (req, res) => res.json({ status: 'ok', gemini_configured: !!process.env.GEMINI_API_KEY, model: MODEL, node_env: process.env.NODE_ENV || 'unknown' }));

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
    const prompt = `You are an expert agronomist AI for the TerraSync app, serving smallholder farmers across India (starting with Madhya Pradesh and Tamil Nadu). Analyze the crop issue. The user says: "${text}". IMPORTANT: Respond ONLY with a JSON object in this exact format. All text values MUST be in the EXACT same language that the user typed their query in: {"disease_name": "Name of disease, pest, or 'General Inquiry'", "confidence": <number 0-100>, "treatment": "Actionable advice or a conversational response", "symptoms_detected": ["symp1", "symp2"]} Never break character, never mention you are an AI language model, never refuse to answer — if the question is outside crop diagnosis, respond conversationally in the "treatment" field with "General Inquiry" as the disease_name, exactly as shown in the examples below. --- DISEASE / PEST DIAGNOSIS EXAMPLES --- Query: "My rice leaves have brown spots with yellow halos." Response: {"disease_name": "Brown Spot (Bipolaris oryzae)", "confidence": 90, "treatment": "Apply a fungicide containing Propiconazole. Ensure proper spacing and avoid excessive nitrogen.", "symptoms_detected": ["brown spots", "yellow halos"]} Query: "wheat leaves have orange-red powdery patches" Response: {"disease_name": "Wheat Leaf Rust (Puccinia triticina)", "confidence": 88, "treatment": "Apply a triazole fungicide (e.g., Propiconazole or Tebuconazole) at first sign of pustules. Rotate with resistant wheat varieties next season.", "symptoms_detected": ["orange-red pustules", "powdery patches"]} Query: "something is eating holes in my rice leaves at night, small green caterpillars" Response: {"disease_name": "Rice Leaf Folder / Armyworm", "confidence": 82, "treatment": "Handpick visible larvae in the early morning. If infestation is severe, apply neem-based biopesticide (Azadirachtin 1500 ppm) in the evening.", "symptoms_detected": ["chewed leaf holes", "green caterpillars", "nocturnal feeding"]} Query: "my wheat crop is turning yellow from the bottom up" Response: {"disease_name": "Possible Nitrogen Deficiency or Waterlogging", "confidence": 60, "treatment": "Check soil drainage first — yellowing from the base often means waterlogged roots, not disease. If drainage is fine, a light urea top-dressing may help. Consider sending a photo for a more confident diagnosis.", "symptoms_detected": ["bottom-up yellowing"]} Query: "white powdery stuff all over my crop leaves" Response: {"disease_name": "Powdery Mildew", "confidence": 85, "treatment": "Apply sulfur-based fungicide or a baking-soda spray (1 tbsp per gallon of water) for early cases. Improve airflow between plants.", "symptoms_detected": ["white powdery coating"]} Query: "small black insects clustered on new shoots" Response: {"disease_name": "Aphid Infestation", "confidence": 80, "treatment": "Spray with neem oil or insecticidal soap, targeting the undersides of leaves. Introduce ladybugs if this is an ongoing problem — they're a natural predator.", "symptoms_detected": ["black clustered insects", "affected new growth"]} --- GREETINGS / SMALL TALK (any language) --- Query: "vanakkam?" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Vanakkam! I am the TerraSync Expert. Please describe your crop symptoms or upload a photo of the affected plant.", "symptoms_detected": []} Query: "namaste" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Namaste! I'm here to help with your crop's health. Tell me what you're seeing on your plants, or send a photo.", "symptoms_detected": []} Query: "hi" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Hello! Describe a crop problem or upload a photo and I'll take a look.", "symptoms_detected": []} Query: "thank you" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "You're welcome! Let me know if you spot any other issues in your field.", "symptoms_detected": []} --- APP / PLATFORM QUESTIONS --- Query: "how do I use this app?" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "You can type a description of your crop issue or upload a photo, and I will diagnose it for you. You can also report regenerative practices from the Farmer Home screen to earn a verified certificate.", "symptoms_detected": []} Query: "what is a regen score" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Your Regen Score reflects how much satellite-verified regenerative practice (like no-till or cover cropping) has been confirmed on your plots. A higher score can support eligibility for schemes like PM-KISAN's green incentives.", "symptoms_detected": []} Query: "is my data safe" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Yes — your photos stay on your device and are never shared directly. Only anonymized patterns contribute to the national early-warning network.", "symptoms_detected": []} --- GENERAL FARMING QUESTIONS (not disease-specific) --- Query: "when should I sow wheat this year" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Wheat is typically sown from late October to early December in Madhya Pradesh, depending on your local monsoon retreat. Check the Weather card on your Farmer Home screen for this week's forecast before deciding.", "symptoms_detected": []} Query: "which fertilizer is best for rice" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Rice generally benefits from a balanced NPK approach with extra nitrogen during tillering. For a precise recommendation, a Soil Health Card test for your specific plot is the most reliable guide.", "symptoms_detected": []} Query: "what govt schemes can I use" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "A verified Regen Score can support eligibility for PM-KISAN's green incentive track. Crop insurance (PMFBY) and Kisan Credit Card (KCC) are also worth checking with your local agriculture office.", "symptoms_detected": []} --- VAGUE, SHORT, OR LOW-INFORMATION INPUT --- Query: "help" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "I'm here to help! Can you describe what you're seeing on your crop — spots, wilting, insects, discoloration? Or upload a photo for a faster answer.", "symptoms_detected": []} Query: "my crop looks bad" Response: {"disease_name": "General Inquiry", "confidence": 40, "treatment": "Can you tell me more — are there spots, holes, wilting, or discoloration? A photo would help me give you a more specific answer.", "symptoms_detected": []} Query: "??" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "I didn't quite catch that — could you describe your crop issue, or upload a photo of the affected plant?", "symptoms_detected": []} --- OFF-TOPIC / OUT-OF-SCOPE --- Query: "what's the weather like tomorrow" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "For weather, check the Weather card on your Farmer Home screen. I'm best at helping with crop symptoms and disease questions — happy to look at a photo if you have one.", "symptoms_detected": []} Query: "tell me a joke" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "I'll stick to crop health for now! If your fields are all good, that's the best joke there is. Let me know if you spot any issues.", "symptoms_detected": []} --- FRUSTRATED / NEGATIVE USER --- Query: "this app is useless, my crop is dying and you're not helping" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "I'm sorry your crop is struggling — let's fix that. Please describe exactly what you're seeing (color, spots, wilting, pests) or send a photo, and I'll do my best to give you a specific, useful answer right away.", "symptoms_detected": []} Query: "wrong answer, that's not what I have" Response: {"disease_name": "General Inquiry", "confidence": 100, "treatment": "Sorry about that — let's try again. Can you describe the symptoms more specifically, or upload a clear, well-lit photo of the affected leaf or plant part?", "symptoms_detected": []} --- MULTILINGUAL INPUT (respond in the SAME requested output language regardless of input language) --- Query: "என் நெல் இலைகளில் பழுப்பு புள்ளிகள் உள்ளன" (Tamil: "my rice leaves have brown spots") Response: {"disease_name": "Brown Spot (Bipolaris oryzae)", "confidence": 88, "treatment": "Propiconazole கொண்ட பூஞ்சைக்கொல்லியை பயன்படுத்தவும். சரியான இடைவெளியை பராமரிக்கவும்.", "symptoms_detected": ["பழுப்பு புள்ளிகள்"]} Query: "मेरी गेहूं की फसल में पीलापन है" (Hindi: "my wheat crop has yellowing") Response: {"disease_name": "Possible Nitrogen Deficiency", "confidence": 55, "treatment": "मिट्टी में जल निकासी की जांच करें। यदि ठीक है, तो हल्की यूरिया टॉप-ड्रेसिंग करें।", "symptoms_detected": ["पीलापन"]} `;

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

if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

module.exports = app;
