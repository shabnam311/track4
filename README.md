# Bhoomi Setu (भूमि सेतु) — AgriN Verify
### A Federated Regenerative-Practice Passport & Cross-Border Pest Radar for BRICS Smallholder Farmers

**Track:** Track 4 — AgriN & Regenerative Agricultural Intelligence
**BRICS Theme:** Cooperation

## What is this?
Bhoomi Setu is a Digital Public Good designed to plug directly into the **BRICS Network on Digital Agriculture** and **AgriN**. It solves two structural problems:
1. **Verification Poverty**: Uses free Sentinel-1/2 satellite data to verify regenerative practices (no-till, cover cropping) at a smallholder scale, issuing a tamper-evident "Regen Passport" so farmers can access green finance without expensive manual audits.
2. **Border-Blind Pest Intelligence**: Uses Federated Learning to detect crop disease patterns across borders. Raw photos never leave the farmer's country, but statistical threat signals (gradients) cross borders to provide early warnings to partner nations.

## Tech Stack (Prototype)
- **Frontend**: React 18, Vite, Tailwind CSS, Recharts (Satellite NDTI curves), Leaflet (Threat Radar)
- **Backend**: Express (Mock API serving seeded synthetic data)

## How to Run the Demo

### 1. Start the mock backend
```bash
cd backend
npm install
npm run dev # or node server.js
```
*Note: The backend runs on `http://localhost:3000` and serves synthetic satellite verification data.*

### 2. Start the frontend
```bash
cd frontend
npm install
npm run dev
```
*Note: The frontend runs on `http://localhost:5173`.*

## Key Demo Journeys
1. **Anjali (Farmer, India)**: Reports a No-Till practice. Watch the satellite data pull (mocked) and generate her certificate. Then, she reports a Fall Armyworm sighting via the simulated WhatsApp bot.
2. **Carlos (Farmer, Brazil)**: Receives a cross-border early warning about a mutation.
3. **Dr. Meera (Policymaker)**: Opens the Dashboard to see the Live Federated Network sync, the Threat Radar, and export a ranked list of "Compound Risk Districts" needing intervention.

## Disclaimers for Judges
As requested for the prototype stage, the following are functionally mocked but designed to be replaced by real infrastructure:
- **Satellite Data**: Sentinel-1/2 time-series charts are seeded synthetic data.
- **Federated Network**: The animated diagram shows the *concept* of federated parameter syncing; it is not running live distributed TensorFlow.
- **WhatsApp/IVR**: The UI simulates these channels for demo purposes.
- **Blockchain Hash**: The certificate hashes are generated locally, simulating a real ledger anchor.

*All simulated data is clearly marked in the UI with warning banners.*
