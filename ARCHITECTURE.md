# TerraSync Architecture Specification

## Overview

**TerraSync** is an AI-powered **federated regenerative-practice verification** and **cross-district pest radar** system designed for Indian smallholder farmers with cross-border scalability to BRICS agricultural corridors.

This production-ready prototype couples a modern React single-page application with a serverless Node.js backend integrating Google's Gemini Flash AI.

---

## Architectural Components

### 1. The React Frontend
- **Framework**: React 19, Vite, Tailwind CSS with customized organic brand tokens (`soil`, `leaf`, `wheat`, `paper`).
- **State & Storage**: Client-side session and persona management stored locally (`localStorage`).
- **Localization**: 8 Indian languages (English, Hindi, Tamil, Marathi, Punjabi, Gujarati, Bengali, Telugu) managed via `react-i18next`.
- **Accessibility**: Full dark/light mode toggle with persistent local storage, print-optimized stylesheet for physical certificate generation.
- **Visualizations**: Interactive Leaflet mapping for regional pest clusters and Recharts for Sentinel-1/2 NDTI temporal disturbance trends.

### 2. The Serverless Backend (Node.js + Google GenAI)
- **Engine**: Express.js deployed as a Vercel Serverless Function via `backend/api/index.js` and `backend/vercel.json`.
- **AI Integration**: Powered by `@google/genai` (Google Gemini Flash) with comprehensive few-shot agronomic grounding.
- **Endpoints**:
  - `GET /api/health`: Health check reporting Gemini status, active model, and environment.
  - `GET /api/plots`: Farmer plot metadata and spatial geometry.
  - `POST /api/practices/verify`: Analyzes Sentinel-1/2 NDTI & SAR time-series curves using Gemini AI to verify reported regenerative farming practices.
  - `POST /api/pest/diagnose`: Multilingual multimodal crop symptom analyzer providing disease identification, confidence scoring, actionable remedies, and callback escalation.

### 3. Federated Intelligence & Data Sovereignty
- **Privacy-by-Design**: Raw photos and plot telemetry remain strictly on the farmer's client device.
- **Gradient Aggregation**: Only anonymized, statistical threat indicators propagate to the National Pest Radar.
- **Offline Verifiable Credentials**: QR credentials compute deterministic cryptographic hashes client-side with Error Correction Level 'M' for rural scannability without third-party network dependencies.

### 4. Compound Risk Policymaking
- Merges biological pest threat signals with soil resilience deficits across districts.
- Provides 1-click CSV brief generation enabling agricultural ministries to rapidly target emergency input subsidies and green finance allocation.
