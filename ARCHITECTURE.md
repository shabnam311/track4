# AgriN Verify Architecture (BRICS Track 4)

## Overview

Bhoomi Setu (AgriN Verify) is a **federated regenerative-practice verification** and **cross-border pest radar** system designed for BRICS smallholder farmers. 

This prototype is built using React (frontend) and Node.js (backend), demonstrating an end-to-end flow without requiring expensive real-time satellite integrations or hardware deployment.

## Architecture Components

### 1. The React Web App (Frontend)
- Built with Vite, Tailwind CSS, and Lucide React.
- Deployed on GitHub Pages via a HashRouter for deep-linking support.
- Fully localized (English, Hindi, Tamil) via `react-i18next`.
- Stores user context (`farmer` persona, verification results) in `localStorage`.

### 2. The Mock Backend (Express + Google GenAI)
- Uses `@google/genai` with the `gemini-2.5-flash` model for lightweight text and mock image processing.
- Handles two core endpoints:
  - `/api/practices/verify`: Takes an abstract "NDTI satellite series" (simulated JSON input) and asks Gemini to verify if the curve matches the reported regenerative practice.
  - `/api/pest/diagnose`: Accepts an image (base64) and textual description, returning a structured JSON diagnosis (disease, confidence, treatment).

### 3. Data Flow (Simulated Federated Learning)
- Instead of centralizing raw data, local pest diagnoses stay locally tagged. The frontend only displays aggregated, macro-level signals (e.g., "Early warning for Carlos in Brazil") to mimic a privacy-preserving federated model.
- "On-chain" functionality is mocked via local hash generation, rendered into a client-side QR Code (`qrcode.react`) to demonstrate offline verifiable credentials.

## Design Choices
- **Design Tokens**: We use custom colors (`soil`, `leaf`, `wheat`) and fonts (`Fraunces`, `Manrope`) configured in `tailwind.config.js` to ensure the app feels organic, grounded, and distinct from typical SaaS products.
- **Fail-safe AI**: The Express backend wraps the Gemini SDK in a `Promise.race` timeout and regex-based JSON extractor (`extractJSON`) to prevent UI hanging when the AI takes too long or formats improperly. If the LLM fails or is missing an API key, the endpoints fall back to hardcoded mock JSON to preserve the demo flow for judges.
