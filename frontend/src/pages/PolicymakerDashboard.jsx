import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, ShieldAlert, Activity, Network, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const exportBriefToCSV = (districts, filename) => {
  const csvLines = [['District', 'Regen Score', 'Threat Level']];
  districts.forEach(d => {
    csvLines.push([d.district, d.regenScore, d.threatLevel]);
  });
  const csvContent = csvLines.map(row => row.map(cell => `"${cell}"`).join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const FederatedNetwork = () => {
  const [anomaly, setAnomaly] = useState(null);
  
  useEffect(() => {
    const states = [null, 'CENTER', 'TN', 'MP', 'MH', 'PB', 'UP', 'GJ', 'ALL'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % states.length;
      setAnomaly(states[currentIndex]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const nodes = ['TN', 'MP', 'MH', 'PB', 'UP', 'GJ'];
  
  const getNodeColor = (node) => {
    if (anomaly === 'ALL' || anomaly === node) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    if (anomaly === 'CENTER' && node === 'TN') return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]';
    return 'bg-leaf-600';
  };

  return (
    <div className="h-96 w-full rounded-2xl bg-soil-900 dark:bg-black/90 p-4 relative overflow-hidden flex items-center justify-center border border-black/10 dark:border-white/10">
      <div className="absolute inset-0 bg-radial-pattern opacity-50 dark:opacity-30 mix-blend-screen"></div>
      
      {/* Central Aggregator */}
      <div className={`absolute w-20 h-20 rounded-full flex flex-col items-center justify-center text-white z-10 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/20 ${anomaly === 'CENTER' || anomaly === 'ALL' ? 'bg-orange-600 scale-110' : 'bg-soil-800'}`}>
        <Network className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-bold tracking-widest">NNDA</span>
      </div>

      {/* State Nodes */}
      {nodes.map((node, i) => {
        const angle = (i * Math.PI * 2) / nodes.length;
        const radius = 110;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <React.Fragment key={node}>
            {/* SVG Line connecting node to center */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              <line 
                x1="50%" y1="50%" 
                x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                stroke={anomaly === 'ALL' || anomaly === 'CENTER' || anomaly === node ? '#ef4444' : '#6a9955'} 
                strokeWidth="2"
                strokeDasharray={anomaly ? "4" : "0"}
                className={anomaly ? "animate-[dash_1s_linear_infinite]" : ""}
              />
            </svg>
            <div 
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 border border-white/20 shadow-lg ${getNodeColor(node)}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {node}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ThreatRadarMap = () => {
  return (
    <div className="h-96 w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
      <MapContainer center={[20, 77]} zoom={4} style={{ height: '100%', width: '100%' }} className="dark:invert dark:hue-rotate-180 dark:contrast-100">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Local Confirmed */}
        <CircleMarker center={[22.9, 78.6]} radius={8} pathOptions={{ color: '#991b1b', fillColor: '#ef4444', fillOpacity: 0.7 }}>
          <Popup><strong>Confirmed Outbreak:</strong> Fall Armyworm (Madhya Pradesh)</Popup>
        </CircleMarker>
        <CircleMarker center={[19.0, 73.0]} radius={8} pathOptions={{ color: '#991b1b', fillColor: '#ef4444', fillOpacity: 0.7 }}>
          <Popup><strong>Confirmed Outbreak:</strong> Rust (Maharashtra)</Popup>
        </CircleMarker>
        
        {/* Early Signal (Federated) */}
        <CircleMarker center={[11.1, 78.6]} radius={15} pathOptions={{ color: '#c2410c', fillColor: '#f97316', fillOpacity: 0.4, dashArray: '4' }} className="animate-pulse">
          <Popup><strong>Early Signal (Tamil Nadu):</strong> High probability of Spodoptera mutation based on network gradient update.</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

const PolicymakerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const compoundRiskDistricts = [
    { district: 'Coimbatore (TN)', regenScore: '32/100', threatLevel: 'CRITICAL' },
    { district: 'Bhopal (MP)', regenScore: '45/100', threatLevel: 'HIGH' },
    { district: 'Ludhiana (PB)', regenScore: '78/100', threatLevel: 'ELEVATED' },
  ];

  const [activeTab, setActiveTab] = useState('radar');

  return (
    <div className="min-h-screen bg-paper dark:bg-soil-900 flex flex-col font-sans text-soil-900 dark:text-wheat-100 transition-colors duration-200">
      <header className="bg-soil-900 p-4 shadow-sm flex items-center justify-between text-wheat-100 relative z-10 border-b border-transparent dark:border-white/10">
        <div className="flex items-center gap-3">
          <button aria-label="Go Back" onClick={() => navigate('/')} className="text-wheat-400 hover:text-white transition"><ArrowLeft /></button>
          <h1 className="text-lg font-bold font-serif uppercase tracking-wider hidden sm:block">{t('national_dashboard') || 'TerraSync National Dashboard'}</h1>
          <h1 className="text-lg font-bold font-serif uppercase tracking-wider sm:hidden">TerraSync Dash</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-leaf-500 hidden sm:inline">Live Network</span>
        </div>
        <button aria-label="Export Brief" onClick={() => exportBriefToCSV(compoundRiskDistricts, `terrasync-compound-risk-brief-${new Date().toISOString().split('T')[0]}.csv`)} className="flex items-center gap-2 bg-soil-800 border border-soil-700 px-3 py-1.5 rounded-xl text-sm font-bold hover:bg-soil-700 transition">
          <Download className="w-4 h-4" /> <span className="hidden sm:inline">{t('export_brief') || 'Export Brief'}</span>
        </button>
      </header>

      <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('radar')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition flex items-center gap-2 shadow-sm border border-transparent dark:border-white/10 ${activeTab === 'radar' ? 'bg-soil-900 dark:bg-soil-800 text-wheat-100' : 'bg-white dark:bg-soil-900 text-soil-700 dark:text-wheat-400 hover:bg-black/5 dark:hover:bg-white/5 border border-black/10'}`}
          >
            <Activity className="w-4 h-4" /> National Pest Radar
          </button>
          <button 
            onClick={() => setActiveTab('network')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition flex items-center gap-2 shadow-sm border border-transparent dark:border-white/10 ${activeTab === 'network' ? 'bg-soil-900 dark:bg-soil-800 text-wheat-100' : 'bg-white dark:bg-soil-900 text-soil-700 dark:text-wheat-400 hover:bg-black/5 dark:hover:bg-white/5 border border-black/10'}`}
          >
            <Network className="w-4 h-4" /> Federated Network Status
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-soil-800 p-4 rounded-3xl shadow-sm border border-black/5 dark:border-white/10">
              {activeTab === 'radar' ? <ThreatRadarMap /> : <FederatedNetwork />}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-soil-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              Compound Risk Districts
            </h2>
            <p className="text-[13px] text-soil-700 dark:text-wheat-400">Districts exhibiting both low regenerative adoption AND active pest signals.</p>
            
            <div className="bg-white dark:bg-soil-800 rounded-3xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10 text-[10px] uppercase text-soil-700 dark:text-wheat-400 tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">District</th>
                    <th className="px-4 py-3 text-center font-bold">Regen Score</th>
                    <th className="px-4 py-3 text-center font-bold">Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-[13px]">
                  <tr className="bg-red-500/5 dark:bg-red-900/10 hover:bg-red-500/10 dark:hover:bg-red-900/20 transition">
                    <td className="px-4 py-3 font-bold text-soil-900 dark:text-white">Coimbatore (TN)</td>
                    <td className="px-4 py-3 text-center text-red-700 dark:text-red-400 font-bold">32/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider flex items-center justify-center gap-1"><AlertOctagon className="w-3 h-3"/> CRITICAL</span></td>
                  </tr>
                  <tr className="bg-orange-500/5 dark:bg-orange-900/10 hover:bg-orange-500/10 dark:hover:bg-orange-900/20 transition">
                    <td className="px-4 py-3 font-bold text-soil-900 dark:text-white">Bhopal (MP)</td>
                    <td className="px-4 py-3 text-center text-orange-700 dark:text-orange-400 font-bold">45/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3"/> HIGH</span></td>
                  </tr>
                  <tr className="bg-leaf-500/5 dark:bg-leaf-900/10 hover:bg-leaf-500/10 dark:hover:bg-leaf-900/20 transition">
                    <td className="px-4 py-3 font-bold text-soil-900 dark:text-white">Ludhiana (PB)</td>
                    <td className="px-4 py-3 text-center text-leaf-700 dark:text-leaf-400 font-bold">78/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-wheat-100 dark:bg-wheat-900/20 text-[#7c4a12] dark:text-wheat-300 px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider border border-wheat-400/50 dark:border-wheat-600/30 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3"/> ELEVATED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sky-100 dark:bg-sky-900/30 border border-leaf-500/20 dark:border-white/10 p-4 rounded-2xl text-[13px] text-leaf-800 dark:text-wheat-300 shadow-sm flex items-start gap-3">
              <span className="text-leaf-600 dark:text-leaf-400 font-extrabold mt-0.5"></span>
              <p>
                <strong>National Alignment:</strong> This dashboard directly feeds into the National Network on Digital Agriculture data layer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicymakerDashboard;
