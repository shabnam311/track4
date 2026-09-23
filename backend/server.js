require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

// Middleware
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

// Route modules
const healthRoutes = require('./routes/health');
const plotsRoutes = require('./routes/plots');
const pestRoutes = require('./routes/pest');
const practicesRoutes = require('./routes/practices');
const agriRoutes = require('./routes/agriData');

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://shabnam311.github.io'
  ]
}));
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);

// Shared resources via app.locals
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

app.locals.genAI = genAI;
app.locals.MODEL = MODEL;
app.locals.plots = plots;
app.locals.farmers = farmers;

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/plots', plotsRoutes);
app.use('/api/pest', pestRoutes);
app.use('/api/practices', practicesRoutes);
app.use('/api/agri', agriRoutes);

// Centralized error handler (must be after routes)
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

module.exports = app;
