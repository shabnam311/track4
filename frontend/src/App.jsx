import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ShieldAlert, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md mb-6 text-center shadow-sm">
        {t('simulated_data_warning')}
      </div>
      
      <div className="flex justify-end w-full max-w-md mb-8 gap-2">
        <button onClick={() => changeLanguage('en')} className={`px-2 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</button>
        <button onClick={() => changeLanguage('hi')} className={`px-2 py-1 text-sm rounded ${i18n.language === 'hi' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>HI</button>
        <button onClick={() => changeLanguage('pt')} className={`px-2 py-1 text-sm rounded ${i18n.language === 'pt' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>PT</button>
      </div>

      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Globe className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('bhoomi_setu')}</h1>
        <p className="text-lg text-green-700 font-medium">{t('subtitle')}</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button 
          onClick={() => navigate('/farmer')}
          className="w-full py-4 px-6 bg-white border-2 border-green-600 text-green-700 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-sm flex items-center justify-between"
        >
          <span>{t('continue_farmer')}</span>
          <span>→</span>
        </button>
        
        <button 
          onClick={() => navigate('/policymaker')}
          className="w-full py-4 px-6 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-sm flex items-center justify-between"
        >
          <span>{t('continue_policymaker')}</span>
          <span>→</span>
        </button>

        <button 
          onClick={() => navigate('/about')}
          className="w-full py-4 px-6 bg-blue-50 text-blue-800 rounded-xl font-bold text-lg hover:bg-blue-100 transition shadow-sm flex items-center justify-between mt-8"
        >
          <span className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> {t('about_bhoomi_setu')}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

import FarmerHome from './pages/FarmerHome';
import PracticeReporting from './pages/PracticeReporting';
import Certificate from './pages/Certificate';
import PestDiagnosis from './pages/PestDiagnosis';
import PolicymakerDashboard from './pages/PolicymakerDashboard';
import AboutPage from './pages/AboutPage';

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
