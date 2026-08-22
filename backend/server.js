const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock Data
const farmers = [
  { id: 'F001', name: 'Anjali', phone: '+919876543210', country: 'India', preferred_language: 'hi' },
  { id: 'F002', name: 'Carlos', phone: '+5511987654321', country: 'Brazil', preferred_language: 'pt' }
];

const plots = [
  { id: 'P101', farmer_id: 'F001', country: 'India', crop_type: 'Wheat', geometry: { lat: 22.9734, lng: 78.6569 } },
  { id: 'P102', farmer_id: 'F002', country: 'Brazil', crop_type: 'Soy', geometry: { lat: -12.6819, lng: -56.9211 } }
];

// Endpoints
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/plots', (req, res) => {
  res.json(plots);
});

// Phase 2: Practice Reporting
app.post('/api/practices/verify', (req, res) => {
  const { plot_id, practice_type } = req.body;
  // Generate synthetic satellite data
  const result = {
    id: `VR-${Date.now()}`,
    plot_id,
    practice_type,
    status: 'Verified', // Verified | Partial | NeedsCheck
    confidence_score: 87,
    regen_score: 92,
    ndti_series: [
      { date: '2026-06-01', value: 0.1 },
      { date: '2026-06-15', value: 0.15 },
      { date: '2026-07-01', value: 0.25 },
      { date: '2026-07-15', value: 0.28 }, // Spike indicates residue cover
    ],
    ndvi_series: [
      { date: '2026-06-01', value: 0.3 },
      { date: '2026-06-15', value: 0.4 },
      { date: '2026-07-01', value: 0.7 },
      { date: '2026-07-15', value: 0.8 },
    ],
    sar_series: [
      { date: '2026-06-01', value: -12 },
      { date: '2026-06-15', value: -12.5 },
      { date: '2026-07-01', value: -13 },
      { date: '2026-07-15', value: -12.8 }, // Low fluctuation indicates no till
    ]
  };
  
  // Simulate delay for verification animation
  setTimeout(() => res.json(result), 2000);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
