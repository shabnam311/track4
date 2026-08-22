import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, ShieldCheck, Activity } from 'lucide-react';

const FarmerHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 p-4 pb-20 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('bhoomi_setu')}</h1>
          <p className="text-sm text-green-700 font-medium">Hello, Anjali (Madhya Pradesh)</p>
        </div>
        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold">
          AN
        </div>
      </header>

      <div className="space-y-4">
        <button 
          onClick={() => navigate('/farmer/report-practice')}
          className="w-full bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center text-center hover:bg-green-50 transition"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('report_practice')}</h2>
          <p className="text-sm text-gray-500">Log no-till, cover cropping, or agroforestry for satellite verification.</p>
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
