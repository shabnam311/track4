# Bhoomi Setu (भूमि सेतु) — AgriN Verify
### A Federated Regenerative-Practice Passport & Cross-Border Pest Radar for BRICS Smallholder Farmers

**Track:** Track 4 — AgriN & Regenerative Agricultural Intelligence
**BRICS Theme:** Cooperation

## What is this?
Bhoomi Setu is a Digital Public Good designed to plug directly into the **BRICS Network on Digital Agriculture** and **AgriN**. It solves two structural problems:
1. **Verification Poverty**: Uses free Sentinel-1/2 satellite data to verify regenerative practices (no-till, cover cropping) at a smallholder scale, issuing a tamper-evident "Regen Passport" so farmers can access green finance without expensive manual audits.
2. **Border-Blind Pest Intelligence**: Uses Federated Learning to detect crop disease patterns across borders. Raw photos never leave the farmer's country, but statistical threat signals (gradients) cross borders to provide early warnings to partner nations.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Leaflet, Recharts, i18next (English, Hindi, Tamil, Portuguese)
- **Backend**: Node.js, Express, `@google/genai` (Gemini 2.5 Flash)
- **Blockchain**: (Simulated via client-side hash and QR credentialing)

## How to Run the Demo

**1. Setup the Backend (Requires Gemini API Key)**
```bash
cd backend
npm install
# Create a .env file and add your key:
# echo "GEMINI_API_KEY=your_key_here" > .env
npm run dev
```
*(Note: If no API key is provided, the backend degrades gracefully and serves mock responses to preserve the demo flow.)*

**2. Setup the Frontend**
```bash
cd frontend
npm install
# Configure your API URL (points to localhost:3000 by default):
# echo "VITE_API_URL=http://localhost:3000" > .env
npm run dev
```

## Key Demo Journeys

1. **Anjali (Indian Farmer)**:
   - Uses **Hindi**.
   - Logs "No-Till Farming" for her Wheat plot. 
   - Backend calls Gemini to analyze simulated NDTI satellite data.
   - Views her **Regen Passport** with a verifiable local QR code.
2. **Carlos (Brazilian Farmer)**:
   - Uses **Portuguese**.
   - Navigates to the app and immediately receives a **cross-border early warning** on his dashboard about a Spodoptera mutation detected via the federated network.
   - Takes a photo of a leaf spot (`PestDiagnosis.jsx`), securely getting treatment advice from Gemini 2.5 Flash.
3. **Dr. Meera (Indian Policymaker)**:
   - Clicks "Continue as Policymaker".
   - Views the **Global Pest Radar**, seeing local outbreaks vs. federated early signals.
   - Views **Compound Risk Districts** where low regenerative adoption correlates with high pest risk.

## Disclaimers for Judges
- **AI Integration**: The AI integration is **real**. The backend connects to Gemini 2.5 Flash using the `@google/genai` SDK to process satellite NDTI curves and analyze pest diagnosis text/images. A robust fallback mechanism exists if the API key is missing or quota is exhausted.
- **Federated Learning**: Raw images are strictly local. We simulate a federated gradient sync through the UI and cross-border alerts.
- **Verifiable Credentials**: The "Blockchain Anchor" QR code is generated dynamically on the client side (`qrcode.react`) to demonstrate offline, decentralized verification without relying on external APIs during a live demo.
- **WhatsApp/IVR**: The UI simulates these channels for demo purposes.
- **Blockchain Hash**: The certificate hashes are generated locally, simulating a real ledger anchor.

*All simulated data is clearly marked in the UI with warning banners.*
