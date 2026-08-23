import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, ShieldCheck, Activity, AlertCircle, Sprout, LogOut } from 'lucide-react';

const FarmerHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const parseSafe = (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      return val && val !== 'undefined' ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  };

  const farmer = parseSafe('bhoomi_farmer', { id: 'F001', name: 'Anjali', location: 'Madhya Pradesh', country: 'India' });
  const verification = parseSafe('bhoomi_last_verification', null);
  const regenScore = verification?.confidence_score || 87;
  const activePlot = verification?.plot_details?.name || 'Wheat Field (2 Acres)';
  const activeCertCount = verification ? 1 : 0;

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8 pb-20 font-sans text-soil-900 max-w-md mx-auto relative shadow-sm border-x border-black/5">
      <header className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-bold text-soil-900 m-0">{t('bhoomi_setu')}</h1>
          <p className="text-sm text-leaf-600 font-bold m-0 mt-0.5">{t('hello')}, {farmer?.name || 'Anjali'} ({farmer?.location || 'India'})</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')} 
            className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-soil-700 hover:bg-red-50 hover:text-red-600 transition shadow-sm"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <div className="w-11 h-11 bg-leaf-500 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            {(farmer?.name || 'AN').substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {farmer.id === 'F002' && (
        <div className="bg-[#fdf0e2] border-l-4 border-wheat-400 p-3.5 rounded-2xl shadow-sm mb-6 flex items-start gap-3">
          <p className="text-[13px] text-[#7c4a12] font-semibold leading-snug m-0 flex gap-2">
            <span>⚠️</span> {t('early_warning')}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        <button 
          onClick={() => navigate('/farmer/report-practice')}
          className="bg-white p-5 rounded-[20px] shadow-[0_2px_6px_rgba(34,40,28,0.06)] border border-black/5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(34,40,28,0.1)] transition text-left"
        >
          <div className="w-[52px] h-[52px] bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sprout className="w-6 h-6 text-leaf-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-extrabold text-[16px] text-soil-900 mb-0.5">{t('report_practice')}</h3>
            <p className="text-[13px] text-soil-700 m-0">Log your field activities for satellite verification.</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/farmer/diagnose')}
          className="bg-white p-5 rounded-[20px] shadow-[0_2px_6px_rgba(34,40,28,0.06)] border border-black/5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(34,40,28,0.1)] transition text-left"
        >
          <div className="w-[52px] h-[52px] bg-wheat-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-[#a5731a]" />
          </div>
          <div className="flex-1">
            <h3 className="font-extrabold text-[16px] text-soil-900 mb-0.5">{t('diagnose_crop')}</h3>
            <p className="text-[13px] text-soil-700 m-0">Take a photo of a pest or disease for instant advice.</p>
          </div>
        </button>
      </div>

      <div className="mt-7 rounded-3xl p-6 text-wheat-100 bg-gradient-to-br from-leaf-500 to-soil-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <p className="text-[12px] opacity-85 mb-1 font-bold uppercase tracking-wider">Current Regen Score</p>
          <p className="text-4xl font-serif font-bold mb-3">{regenScore}<span className="text-base font-sans font-normal opacity-80">/100</span></p>
          <p className="text-[13.5px] opacity-90 mb-4 font-medium">Active Certificates: {activeCertCount} ({activePlot})</p>
          {activeCertCount > 0 && (
            <button onClick={() => navigate('/farmer/certificate')} className="px-4 py-2 bg-white text-leaf-600 rounded-xl text-sm font-extrabold shadow-sm hover:bg-paper transition">
              View Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerHome;
