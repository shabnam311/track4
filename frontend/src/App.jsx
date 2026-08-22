import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FarmerHome from './pages/FarmerHome';
import PracticeReporting from './pages/PracticeReporting';
import Certificate from './pages/Certificate';
import PestDiagnosis from './pages/PestDiagnosis';
import PolicymakerDashboard from './pages/PolicymakerDashboard';
import AboutPage from './pages/AboutPage';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const setPersona = (farmerData) => {
    // In a real app, we'd use Context/Zustand. For prototype, use localStorage.
    localStorage.setItem('bhoomi_farmer', JSON.stringify(farmerData));
    navigate('/farmer');
  };

  return (
    <div className="min-h-screen bg-paper text-soil-900 bg-radial-pattern font-sans flex flex-col">
      <header className="flex justify-between items-center px-6 py-5 md:px-12 md:py-6">
        <div className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-600 flex items-center justify-center text-white text-sm font-sans">भू</span> 
          Bhoomi Setu
        </div>
        <div className="flex gap-2">
          <button onClick={() => changeLanguage('en')} className={`px-4 py-1.5 rounded-full text-sm font-bold border border-black/15 transition ${i18n.language === 'en' ? 'bg-soil-900 text-wheat-100 border-soil-900' : 'bg-transparent text-soil-700 hover:bg-black/5'}`}>EN</button>
          <button onClick={() => changeLanguage('hi')} className={`px-4 py-1.5 rounded-full text-sm font-bold border border-black/15 transition ${i18n.language === 'hi' ? 'bg-soil-900 text-wheat-100 border-soil-900' : 'bg-transparent text-soil-700 hover:bg-black/5'}`}>HI</button>
          <button onClick={() => changeLanguage('pt')} className={`px-4 py-1.5 rounded-full text-sm font-bold border border-black/15 transition ${i18n.language === 'pt' ? 'bg-soil-900 text-wheat-100 border-soil-900' : 'bg-transparent text-soil-700 hover:bg-black/5'}`}>PT</button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 bg-sky-100 text-leaf-600 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide mb-6">
            ● BRICS Digital Public Good — AgriN Verify
          </span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-soil-900 leading-tight mb-5">
            Proof your fields <span className="font-sans text-leaf-600">बदल रहे हैं</span><br/>the climate can bank on.
          </h1>
          <p className="text-lg text-soil-700 max-w-prose mb-8 leading-relaxed">
            Satellite-verified regenerative practice certificates and a cross-border pest early-warning network — built for smallholders, not just Anjali's two acres, but every acre across BRICS.
          </p>
          
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex gap-2">
              <button 
                onClick={() => setPersona({ name: 'Anjali', country: 'India', location: 'Madhya Pradesh', lang: 'hi' })}
                className="flex-1 bg-soil-900 text-wheat-100 py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm"
              >
                Farmer: Anjali (IN) <span>→</span>
              </button>
              <button 
                onClick={() => setPersona({ name: 'Carlos', country: 'Brazil', location: 'Mato Grosso', lang: 'pt' })}
                className="flex-1 bg-leaf-600 text-white py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm"
              >
                Carlos (BR) <span>→</span>
              </button>
            </div>
            <button 
              onClick={() => navigate('/policymaker')}
              className="bg-white border-[1.5px] border-black/15 text-soil-900 py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm"
            >
              Continue as Policymaker <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="bg-transparent text-leaf-600 font-bold py-2 px-1 mt-2 text-left hover:underline"
            >
              About Bhoomi Setu & BRICS Alignment →
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-leaf-500 to-soil-700 shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.8) 0 2px, transparent 2px 26px)' }}></div>
          <div className="absolute bottom-6 left-6 right-6 bg-paper/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20">
            <div className="font-serif font-bold text-4xl text-soil-900">87<span className="text-xl text-soil-700 font-sans font-normal">/100</span></div>
            <div className="text-xs uppercase tracking-widest text-soil-700 font-bold mt-1">Regen Score · Verified via S-1/2</div>
          </div>
        </div>
      </main>

      <div className="border-t border-black/10 py-6 px-12 flex justify-center gap-8 text-sm text-soil-700 font-medium flex-wrap">
        <span>🇮🇳 India</span><span>🇧🇷 Brazil</span><span>🇿🇦 South Africa</span><span>🇨🇳 China</span><span>🇷🇺 Russia</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/farmer" element={<FarmerHome />} />
      <Route path="/farmer/report-practice" element={<PracticeReporting />} />
      <Route path="/farmer/certificate" element={<Certificate />} />
      <Route path="/farmer/diagnose" element={<PestDiagnosis />} />
      <Route path="/policymaker" element={<PolicymakerDashboard />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
