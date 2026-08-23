import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, ShieldCheck, Activity, AlertCircle, Sprout } from 'lucide-react';

const FarmerHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const farmer = JSON.parse(localStorage.getItem('bhoomi_farmer')) || { id: 'F001', name: 'Anjali', location: 'Madhya Pradesh', country: 'India' };

  return (
    <div className="min-h-screen bg-sky-100 p-4 pb-20 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-soil-900">{t('bhoomi_setu')}</h1>
          <p className="text-sm text-leaf-600 font-medium">{t('hello')}, {farmer.name} ({farmer.location})</p>
        </div>
        <div className="w-10 h-10 bg-leaf-500 rounded-full flex items-center justify-center text-white font-bold">
          {farmer.name.substring(0, 2).toUpperCase()}
        </div>
      </header>

      {farmer.id === 'F002' && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-xl shadow-sm mb-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
          <p className="text-sm text-orange-800 font-medium">
            {t('early_warning')}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <button 
          onClick={() => navigate('/farmer/report-practice')}
          className="w-full bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-gray-900">{t('report_practice')}</h3>
            <p className="text-sm text-gray-500">Log your field activities</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/farmer/diagnose')}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 flex flex-col items-center text-center hover:bg-yellow-50 transition"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('diagnose_crop')}</h2>
          <p className="text-sm text-gray-500">Take a photo of a pest/disease. Get instant advice.</p>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-800 mb-4">{t('my_passport')}</h3>
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <ShieldCheck className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-green-100 mb-1">Current Regen Score</p>
            <p className="text-4xl font-bold mb-4">87<span className="text-xl font-normal text-green-200">/100</span></p>
            <p className="text-sm">Active Certificates: 1 (Wheat Plot)</p>
            <button onClick={() => navigate('/farmer/certificate')} className="mt-4 px-4 py-2 bg-white text-green-700 rounded-lg text-sm font-bold shadow-sm">
              View Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerHome;
