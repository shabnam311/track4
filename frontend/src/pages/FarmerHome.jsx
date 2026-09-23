import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Leaf, ShieldCheck, Bug, AlertCircle, Sprout, LogOut, 
  CloudRain, IndianRupee, Sun, Wind, Droplets, ArrowRight,
  TrendingUp, Activity, Award, Sparkles, MapPin, RefreshCw,
  FileCheck2, Compass, Mic
} from 'lucide-react';

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

  const farmer = parseSafe('terrasync_farmer', { id: 'F001', name: 'Anjali', location: 'Madhya Pradesh', country: 'India' });
  const verification = parseSafe('terrasync_last_verification', null);
  const activeCertCount = verification ? 1 : 0;
  const regenScore = activeCertCount > 0 ? verification.confidence_score : 84;
  const activePlot = activeCertCount > 0 ? (verification?.plot_details?.name || 'Wheat Field (2 Acres)') : (farmer.id === 'F002' ? 'Rice Paddy (15 Acres)' : 'Wheat Field (2 Acres)');
  const isTopPercentile = regenScore && regenScore > 80;

  // Real-time states
  const [weatherData, setWeatherData] = useState(null);
  const [mandiData, setMandiData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'soil', 'market'

  const plotCoords = farmer.id === 'F002' 
    ? { lat: 10.7870, lng: 79.1378, crop: 'rice', state: 'Tamil Nadu', plotId: 'P102' }
    : { lat: 23.2599, lng: 77.4126, crop: 'wheat', state: 'Madhya Pradesh', plotId: 'P101' };

  useEffect(() => {
    const fetchAgriTelemetry = async () => {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      try {
        // Fetch live weather
        const weatherRes = await fetch(`${apiUrl}/api/agri/weather?lat=${plotCoords.lat}&lng=${plotCoords.lng}`);
        const weatherJson = await weatherRes.json();
        setWeatherData(weatherJson);

        // Fetch live mandi prices
        const mandiRes = await fetch(`${apiUrl}/api/agri/mandi?crop=${plotCoords.crop}&state=${plotCoords.state}`);
        const mandiJson = await mandiRes.json();
        setMandiData(mandiJson.data);

        // Fetch soil health profile
        const soilRes = await fetch(`${apiUrl}/api/agri/soil?plot_id=${plotCoords.plotId}`);
        const soilJson = await soilRes.json();
        setSoilData(soilJson.data);
      } catch (err) {
        console.warn("Could not fetch remote agri data, using fallback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgriTelemetry();
  }, [farmer.id]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-soil-900 p-4 md:p-6 pb-24 font-sans text-soil-900 dark:text-wheat-100 max-w-md mx-auto relative shadow-2xl border-x border-black/5 dark:border-white/10 transition-colors duration-200">
      
      {/* Top Navigation & Profile Bar */}
      <header className="flex justify-between items-center mb-5 bg-white/70 dark:bg-soil-800/70 backdrop-blur-md p-3.5 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-tr from-leaf-600 to-emerald-400 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            {(farmer?.name || 'AN').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-base font-bold font-serif text-soil-900 dark:text-white m-0 flex items-center gap-1.5">
              <span>{farmer?.name || 'Anjali'}</span>
              <span className="text-[10px] bg-leaf-100 dark:bg-leaf-900/50 text-leaf-700 dark:text-leaf-300 font-extrabold px-2 py-0.5 rounded-full">
                Verified
              </span>
            </h1>
            <p className="text-xs text-soil-500 dark:text-wheat-400 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-leaf-500" /> {farmer?.location || 'Madhya Pradesh'}, India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => navigate('/')} 
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-soil-700 flex items-center justify-center text-soil-600 dark:text-wheat-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition"
            title="Switch Profile"
            aria-label="Switch Profile"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Cross-District Early Warning Alert Banner */}
      {farmer.id === 'F002' && (
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 dark:bg-yellow-900/30 border border-amber-300 dark:border-yellow-600/50 p-3.5 rounded-2xl shadow-sm mb-5 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-900 dark:text-yellow-300 leading-tight mb-0.5">
              Regional Outbreak Radar
            </p>
            <p className="text-[12px] text-amber-800 dark:text-yellow-400/90 font-medium leading-normal m-0">
              {t('early_warning')} (Spodoptera frugiperda mutation risk high in adjacent sub-districts).
            </p>
          </div>
        </div>
      )}

      {/* Main Feature Tabs */}
      <div className="flex bg-slate-200/70 dark:bg-soil-800/80 p-1 rounded-xl mb-5 text-xs font-bold">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 rounded-lg transition ${activeTab === 'overview' ? 'bg-white dark:bg-soil-700 text-soil-900 dark:text-white shadow-sm' : 'text-soil-600 dark:text-wheat-400'}`}
        >
          🌾 Overview
        </button>
        <button 
          onClick={() => setActiveTab('soil')}
          className={`flex-1 py-2 rounded-lg transition ${activeTab === 'soil' ? 'bg-white dark:bg-soil-700 text-soil-900 dark:text-white shadow-sm' : 'text-soil-600 dark:text-wheat-400'}`}
        >
          🧪 Soil Health
        </button>
        <button 
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-2 rounded-lg transition ${activeTab === 'market' ? 'bg-white dark:bg-soil-700 text-soil-900 dark:text-white shadow-sm' : 'text-soil-600 dark:text-wheat-400'}`}
        >
          📈 Mandi Price
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Live Telemetry Weather & Market Quick Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Live Weather Card */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-soil-800 dark:to-sky-950/40 rounded-2xl p-3.5 border border-sky-100 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-sky-800 dark:text-sky-300 font-extrabold uppercase tracking-wide flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" /> Weather
                </span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-1.5 py-0.2 rounded font-bold">
                  Live
                </span>
              </div>
              <div className="mt-1">
                <p className="text-xl font-bold font-serif text-soil-900 dark:text-white">
                  {weatherData?.current?.temp ?? 28}°C
                </p>
                <p className="text-[11px] font-medium text-soil-600 dark:text-wheat-400 truncate">
                  {weatherData?.current?.condition ?? 'Scattered Clouds'}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-soil-500 dark:text-wheat-400 font-semibold">
                  <span>💧 {weatherData?.current?.humidity ?? 65}% RH</span>
                  <span>💨 {weatherData?.current?.wind_speed ?? 12} km/h</span>
                </div>
              </div>
            </div>

            {/* Live Mandi Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-soil-800 dark:to-emerald-950/40 rounded-2xl p-3.5 border border-emerald-100 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-extrabold uppercase tracking-wide flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" /> Mandi
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded font-bold">
                  eNAM
                </span>
              </div>
              <div className="mt-1">
                <p className="text-xl font-bold font-serif text-soil-900 dark:text-white">
                  ₹{mandiData?.current_price ?? (farmer.id === 'F002' ? 2290 : 2480)}
                  <span className="text-xs font-sans font-normal opacity-75">/q</span>
                </p>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {mandiData?.daily_change ?? '+₹45 today'} (Above MSP)
                </p>
                <p className="text-[10px] text-soil-500 dark:text-wheat-400 mt-2 font-semibold truncate">
                  📍 {mandiData?.top_mandis?.[0]?.name?.split(' ')?.[0] || 'Bhopal'} ({mandiData?.top_mandis?.[0]?.distance || '12 km'})
                </p>
              </div>
            </div>
          </div>

          {/* Today's Contextual Agro-Advisory Banner */}
          <div className="bg-white dark:bg-soil-800 p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm flex items-start gap-3">
            <div className="p-2.5 bg-leaf-100 dark:bg-leaf-900/40 text-leaf-700 dark:text-leaf-300 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-leaf-800 dark:text-leaf-300 mb-0.5">
                Today's Gemini Agro-Advisory
              </h3>
              <p className="text-xs text-soil-700 dark:text-wheat-300 leading-relaxed font-medium">
                {farmer.id === 'F002'
                  ? 'Favorable humidity for paddy tillering. Recommended to apply green manure / Azospirillum biofertilizer before afternoon rains.'
                  : 'Soil moisture is optimal for Rabi wheat crown root initiation. Hold off on nitrogen top-dressing until moisture index stabilises.'}
              </p>
            </div>
          </div>

          {/* Two Core Action Cards */}
          <div className="grid grid-cols-1 gap-3">
            {/* Practice Reporting Card */}
            <button 
              onClick={() => navigate('/farmer/report-practice')}
              className="group bg-white dark:bg-soil-800 p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-between hover:border-leaf-500 dark:hover:border-leaf-400 transition text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/40 rounded-xl flex items-center justify-center text-leaf-600 dark:text-leaf-400 group-hover:scale-105 transition">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-soil-900 dark:text-white mb-0.5 flex items-center gap-1.5">
                    {t('report_practice')}
                  </h3>
                  <p className="text-xs text-soil-500 dark:text-wheat-400 font-medium">
                    Log no-till & cover crops for Sentinel satellite verification
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-soil-400 group-hover:translate-x-1 transition flex-shrink-0" />
            </button>

            {/* AI Pest Diagnosis Card */}
            <button 
              onClick={() => navigate('/farmer/diagnose')}
              className="group bg-white dark:bg-soil-800 p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-between hover:border-amber-500 dark:hover:border-yellow-400 transition text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-amber-100 dark:bg-yellow-900/40 rounded-xl flex items-center justify-center text-amber-700 dark:text-yellow-400 group-hover:scale-105 transition">
                  <Bug className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-soil-900 dark:text-white mb-0.5 flex items-center gap-1.5">
                    {t('diagnose_crop')}
                    <span className="text-[9px] bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-1.5 py-0.2 rounded font-extrabold">Voice / Camera</span>
                  </h3>
                  <p className="text-xs text-soil-500 dark:text-wheat-400 font-medium">
                    Take photo or speak in Hindi, Tamil, Kannada & 10+ languages
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-soil-400 group-hover:translate-x-1 transition flex-shrink-0" />
            </button>
          </div>

          {/* Regen Score & Passport Banner */}
          <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-leaf-700 via-leaf-800 to-soil-900 relative overflow-hidden shadow-lg border border-leaf-600/30">
            <div className="absolute top-0 right-0 p-3 opacity-15">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-leaf-200">
                  Verified Regen Score
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Sentinel-2 NDTI Synced
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-serif font-bold">{regenScore}</span>
                <span className="text-sm opacity-80 font-sans">/100 Index</span>
              </div>

              {isTopPercentile && (
                <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-lg mb-3 text-leaf-100">
                  <Award className="w-3.5 h-3.5 text-yellow-300" /> Top 15% in {farmer.location}
                </div>
              )}

              <p className="text-xs opacity-90 mb-4 font-medium leading-relaxed">
                Active Plot: <span className="font-bold text-white">{activePlot}</span>
              </p>

              <button 
                onClick={() => navigate('/farmer/certificate')} 
                className="w-full py-2.5 bg-white text-leaf-800 hover:bg-slate-100 rounded-xl text-xs font-extrabold shadow-sm transition flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" /> View Verifiable QR Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOIL HEALTH */}
      {activeTab === 'soil' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-soil-800 p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-black/5 dark:border-white/10 pb-2">
              <div>
                <h3 className="font-extrabold text-sm text-soil-900 dark:text-white">Soil Health Card Profile</h3>
                <p className="text-xs text-soil-500 dark:text-wheat-400 font-medium">Plot ID: {soilData?.plot_id || 'P101'} • {soilData?.soil_type || 'Deep Black Soil'}</p>
              </div>
              <span className="text-xs bg-leaf-100 dark:bg-leaf-900/50 text-leaf-700 dark:text-leaf-300 font-bold px-2 py-0.5 rounded-full">Optimal</span>
            </div>

            {/* Nutrient Bars */}
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Nitrogen (N)</span>
                  <span className="text-leaf-600 dark:text-leaf-400">{soilData?.nitrogen?.value || 240} kg/ha ({soilData?.nitrogen?.rating || 'Medium'})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-soil-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${soilData?.nitrogen?.score || 68}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Phosphorus (P)</span>
                  <span className="text-leaf-600 dark:text-leaf-400">{soilData?.phosphorus?.value || 18.5} kg/ha ({soilData?.phosphorus?.rating || 'Adequate'})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-soil-700 rounded-full overflow-hidden">
                  <div className="h-full bg-leaf-500 rounded-full" style={{ width: `${soilData?.phosphorus?.score || 85}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Potassium (K)</span>
                  <span className="text-leaf-600 dark:text-leaf-400">{soilData?.potassium?.value || 310} kg/ha ({soilData?.potassium?.rating || 'High'})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-soil-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${soilData?.potassium?.score || 92}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Soil pH (Acidity/Alkalinity)</span>
                  <span className="text-leaf-600 dark:text-leaf-400">{soilData?.ph?.value || 7.4} ({soilData?.ph?.rating || 'Neutral'})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-soil-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${soilData?.ph?.score || 95}%` }}></div>
                </div>
              </div>
            </div>

            {/* Soil Recommendation Tip */}
            <div className="mt-4 p-3 bg-slate-50 dark:bg-soil-700/50 rounded-xl text-xs font-medium text-soil-700 dark:text-wheat-300">
              🌱 <span className="font-bold">Organic Amendment:</span> {soilData?.recommended_amendment || 'Apply Azotobacter biofertilizer to boost organic carbon.'}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MARKET & MANDI */}
      {activeTab === 'market' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-soil-800 p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-black/5 dark:border-white/10 pb-2">
              <div>
                <h3 className="font-extrabold text-sm text-soil-900 dark:text-white">Agmarknet / eNAM Rate</h3>
                <p className="text-xs text-soil-500 dark:text-wheat-400">{mandiData?.crop_name || 'Wheat'} • {mandiData?.state || 'Madhya Pradesh'}</p>
              </div>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                +₹45 / quintal
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="p-3 bg-slate-50 dark:bg-soil-700/50 rounded-xl">
                <p className="text-[10px] text-soil-500 dark:text-wheat-400 font-bold uppercase">Govt MSP Floor</p>
                <p className="text-base font-bold text-soil-900 dark:text-white">₹{mandiData?.msp || 2275}/q</p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase">Today's Avg Mandi</p>
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">₹{mandiData?.current_price || 2480}/q</p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-soil-800 dark:text-wheat-200 mt-4 mb-2">Nearby Regulated Mandis:</h4>
            <div className="space-y-2">
              {(mandiData?.top_mandis || [
                { name: 'Bhopal Central Mandi', price: 2510, distance: '12 km' },
                { name: 'Sehore Krishi Upaj Mandi', price: 2480, distance: '28 km' }
              ]).map((mandi, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-soil-700/50 rounded-xl text-xs">
                  <div>
                    <p className="font-bold text-soil-900 dark:text-white">{mandi.name}</p>
                    <p className="text-[10px] text-soil-500 dark:text-wheat-400 font-medium">Distance: {mandi.distance}</p>
                  </div>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">₹{mandi.price}/q</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Voice Assistant Shortcut) */}
      <button 
        onClick={() => navigate('/farmer/diagnose')}
        className="fixed bottom-6 right-6 md:right-[calc(50%-200px)] z-30 bg-leaf-600 hover:bg-leaf-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition hover:scale-105"
        title="Voice AI Assistant"
      >
        <Mic className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-extrabold pr-1">Talk to AI</span>
      </button>

    </div>
  );
};

export default FarmerHome;
