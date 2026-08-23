# Bhoomi Setu — AgriN Verify
### A Federated Regenerative-Practice Passport & Cross-District Pest Radar for Indian Smallholder Farmers

**Track:** Track 4 — AgriN & Regenerative Agricultural Intelligence
**Theme:** Cooperation

## What is this?
Bhoomi Setu (भूमि सेतु) is a Digital Public Good designed to plug directly into the **National Network on Digital Agriculture** and **AgriN**. It solves two structural problems:
1. **Verification Poverty**: Uses free Sentinel-1/2 satellite data to verify regenerative practices (no-till, cover cropping) at a smallholder scale, issuing a tamper-evident "Regen Passport" so farmers can access green finance without expensive manual audits.
2. **Federated Pest Intelligence**: Uses Federated Learning to detect crop disease patterns across states. Raw photos never leave the farmer's device, but statistical threat signals (gradients) cross district/state lines to provide early warnings to partner nodes.

## Tech Stack & Features
- **Frontend**: React 19, Vite, Tailwind CSS (with full **Dark Mode** support), Lucide React, Leaflet, Recharts
- **Backend**: Node.js, Express, `@google/genai` (Google Gemini 2.5 Flash API)
- **Localization**: Full i18n support across 8 Indian languages (English, Hindi, Tamil, Marathi, Punjabi, Gujarati, Bengali, Telugu)
- **Accessibility & UX**: Offline-ready UI, Print-optimized CSS for certificates, System-preference dark/light themes, and functional CSV exports.
- **Blockchain**: Simulated via client-side hash and QR credentialing (Error correction Level 'M' for field scannability).

## How to Run the Demo

**1. Setup the Backend (Requires Gemini API Key)**
```bash
cd backend
npm install
# Create a .env file and add your Google AI key:
# echo "GEMINI_API_KEY=your_key_here" > .env
npm start
```
*(Note: If no API key is provided, the backend degrades gracefully into an explicitly marked "Offline Mode" and serves smart fallback responses to preserve the demo flow on stage.)*

**2. Setup the Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Key Demo Journeys

1. **Anjali (Madhya Pradesh)**:
   - Uses **Hindi**.
   - Logs "No-Till Farming" for her Wheat plot. 
   - Backend calls **Gemini 2.5 Flash** to analyze simulated NDTI satellite data.
   - Views her **Regen Passport** with a verifiable local QR code, which she can now Print directly from the browser.
2. **Karthik (Tamil Nadu)**:
   - Uses **Tamil**.
   - Navigates to the app and immediately receives a **cross-state early warning** on his dashboard about a Spodoptera mutation detected via the federated network.
   - Diagnoses a pest issue (`PestDiagnosis.jsx`), securely getting treatment advice and agronomist escalation options.
3. **Dr. Meera (National Policymaker)**:
   - Clicks "Continue as Policymaker".
   - Views the **National Pest Radar**, seeing local outbreaks vs. federated early signals via an animated sync cycle.
   - Views **Compound Risk Districts** and exports a functional **CSV Brief** directly from the table data.

## Disclaimers for Judges
- **AI Integration**: The AI integration is **real**. The backend connects to **Gemini 2.5 Flash** using the official `@google/genai` SDK to process satellite NDTI curves and analyze pest diagnosis text/images. A robust fallback mechanism exists if the API key is missing or quota is exhausted.
- **Federated Learning**: Raw images are strictly local. We simulate a federated gradient sync through the UI and cross-state alerts.
- **Verifiable Credentials**: The "Blockchain Anchor" QR code is generated dynamically on the client side to demonstrate offline, decentralized verification without relying on external APIs during a live demo.
- **Satellite Data**: The "satellite data" Gemini reasons over is a fixed, synthetic four-point NDTI series representing Sentinel-1/2 patterns. The reasoning is real; the data is simulated.

*All simulated demo states can be cleared at any time via the "Reset Demo Data" button on the About page.*
