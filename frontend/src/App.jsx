import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import FarmerHome from './pages/FarmerHome';
import PracticeReporting from './pages/PracticeReporting';
import Certificate from './pages/Certificate';
import PestDiagnosis from './pages/PestDiagnosis';
import PolicymakerDashboard from './pages/PolicymakerDashboard';
import AboutPage from './pages/AboutPage';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Handle html lang change
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Dark mode logic
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#22281c');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fbfaf6');
    }
  }, [isDark]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const setPersona = (farmerData) => {
    localStorage.setItem('bhoomi_farmer', JSON.stringify(farmerData));
    navigate('/farmer');
  };

  const LangBtn = ({ code, label }) => (
    <button onClick={() => changeLanguage(code)} className={`px-2 py-1 rounded text-xs font-bold border border-black/15 dark:border-white/10 transition ${i18n.language === code ? 'bg-soil-900 dark:bg-soil-800 text-wheat-100 border-soil-900 dark:border-white/20' : 'bg-transparent text-soil-700 dark:text-wheat-400 hover:bg-black/5 dark:hover:bg-white/5'}`}>{label}</button>
  );

  return (
    <div className="min-h-screen bg-paper dark:bg-soil-900 text-soil-900 dark:text-wheat-100 bg-radial-pattern font-sans flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-center px-6 py-5 md:px-12 md:py-6 gap-4">
        <div className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-600 flex items-center justify-center text-white text-sm font-sans">BS</span> 
          Bhoomi Setu
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <LangBtn code="en" label="EN" />
          <LangBtn code="hi" label="HI" />
          <LangBtn code="ta" label="TA" />
          <LangBtn code="mr" label="MR" />
          <LangBtn code="pa" label="PA" />
          <LangBtn code="gu" label="GU" />
          <LangBtn code="bn" label="BN" />
          <LangBtn code="te" label="TE" />
          <button 
            onClick={() => setIsDark(!isDark)}
            className="ml-2 p-1.5 rounded-full border border-black/15 dark:border-white/10 bg-transparent text-soil-700 dark:text-wheat-400 hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 text-leaf-600 dark:text-leaf-400 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide mb-6">
            ● AgriN Verify — Built for India
          </span>
          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-soil-900 dark:text-white leading-tight mb-5">
            Proof your fields <span className="font-sans text-leaf-600 dark:text-leaf-500">for a future</span><br/>the climate can bank on.
          </h1>
          <p className="text-lg text-soil-700 dark:text-wheat-400 max-w-prose mb-8 leading-relaxed">
            Satellite-verified regenerative practice certificates and an early-warning network — built for smallholders, not just Anjali's two acres, but every acre across the nation.
          </p>
          
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex gap-2">
              <button 
                onClick={() => setPersona({ id: 'F001', name: 'Anjali', country: 'India', location: 'Madhya Pradesh', lang: 'hi' })}
                className="flex-1 bg-soil-900 dark:bg-soil-800 text-wheat-100 py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm border border-transparent dark:border-white/10"
              >
                Farmer: Anjali (MP) <span>→</span>
              </button>
              <button 
                onClick={() => setPersona({ id: 'F002', name: 'Karthik', country: 'India', location: 'Tamil Nadu', lang: 'ta' })}
                className="flex-1 bg-leaf-600 text-white py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm"
              >
                Karthik (TN) <span>→</span>
              </button>
            </div>
            <button 
              onClick={() => navigate('/policymaker')}
              className="bg-white dark:bg-soil-800 border-[1.5px] border-black/15 dark:border-white/10 text-soil-900 dark:text-wheat-100 py-4 px-5 rounded-2xl font-bold flex justify-between items-center hover:-translate-y-0.5 transition shadow-sm"
            >
              Continue as Policymaker <span>→</span>
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="bg-transparent text-leaf-600 dark:text-leaf-400 font-bold py-2 px-1 mt-2 text-left hover:underline"
            >
              About Bhoomi Setu →
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-leaf-500 to-soil-700 dark:to-soil-900 shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.8) 0 2px, transparent 2px 26px)' }}></div>
          <div className="absolute bottom-6 left-6 right-6 bg-paper/95 dark:bg-soil-800/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 dark:border-white/10">
            <div className="font-serif font-bold text-4xl text-soil-900 dark:text-white">87<span className="text-xl text-soil-700 dark:text-wheat-400 font-sans font-normal">/100</span></div>
            <div className="text-xs uppercase tracking-widest text-soil-700 dark:text-wheat-400 font-bold mt-1">Regen Score • Verified via S-1/2</div>
          </div>
        </div>
      </main>

      <div className="border-t border-black/10 dark:border-white/10 py-6 px-12 flex justify-center gap-8 text-sm text-soil-700 dark:text-wheat-400 font-medium flex-wrap">
        <span>Madhya Pradesh</span><span>Tamil Nadu</span><span>Maharashtra</span><span>Punjab</span><span>Gujarat</span>
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
