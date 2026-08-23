import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, ShieldAlert, Download, Activity, ShieldCheck } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';

const FederatedNetwork = () => {
  const [anomaly, setAnomaly] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nodes = ['IN', 'BR', 'ZA', 'CN', 'RU', 'ALL', 'CENTER', null];
      setAnomaly(nodes[Math.floor(Math.random() * nodes.length)]);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const getNodeColor = (id) => {
    if (anomaly === 'ALL') return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]';
    if (anomaly === id) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse';
    if (anomaly === 'CENTER' && id === 'CENTER') return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.7)] scale-110 transition-transform';
    return id === 'CENTER' ? 'bg-soil-700 border-2 border-leaf-500' : 'bg-leaf-600';
  };

  return (
    <div className="bg-soil-900 rounded-2xl p-6 h-96 relative flex items-center justify-center overflow-hidden border border-soil-700">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      <div className="absolute top-4 left-4 text-wheat-100 text-xs max-w-xs z-10">
        <p className="font-bold text-white mb-1 font-serif text-sm">Live Federated Sync</p>
        <p className="opacity-80">Models are updated locally. Only parameter gradients cross borders.</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-leaf-500"></span>
            <span className="opacity-80">Normal Local Training</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="opacity-80 text-red-200">New Pathogen Detected</span>
          </div>
        </div>
      </div>

      {/* Center Node (Global Aggregator) */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${getNodeColor('CENTER')}`}>
        <Network className="w-8 h-8 text-white" />
      </div>

      {/* Outer Nodes */}
      {['IN', 'BR', 'ZA', 'CN', 'RU'].map((node, i) => {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const radius = 120;
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
    <div className="h-96 w-full rounded-2xl overflow-hidden border border-black/10">
      <MapContainer center={[20, 77]} zoom={4} style={{ height: '100%', width: '100%' }}>
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
        <CircleMarker center={[-12.6, -56.9]} radius={15} pathOptions={{ color: '#c2410c', fillColor: '#f97316', fillOpacity: 0.4, dashArray: '4' }} className="animate-pulse">
          <Popup><strong>Early Signal (Brazil):</strong> High probability of Spodoptera mutation based on network gradient update.</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

const PolicymakerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('radar');

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans text-soil-900">
      <header className="bg-soil-900 p-4 shadow-sm flex items-center justify-between text-wheat-100 relative z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-wheat-400 hover:text-white transition"><ArrowLeft /></button>
          <h1 className="text-lg font-bold font-serif uppercase tracking-wider">AgriN BRICS Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-leaf-500">Live Network</span>
        </div>
        <button onClick={() => alert("Brief exported successfully!")} className="hidden md:flex items-center gap-2 bg-soil-800 border border-soil-700 px-3 py-1.5 rounded-xl text-sm font-bold hover:bg-soil-700 transition">
          <Download className="w-4 h-4" /> Export Brief
        </button>
      </header>

      <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('radar')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition flex items-center gap-2 shadow-sm ${activeTab === 'radar' ? 'bg-soil-900 text-wheat-100' : 'bg-white text-soil-700 hover:bg-black/5 border border-black/10'}`}
          >
            <Activity className="w-4 h-4" /> Global Pest Radar
          </button>
          <button 
            onClick={() => setActiveTab('network')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition flex items-center gap-2 shadow-sm ${activeTab === 'network' ? 'bg-soil-900 text-wheat-100' : 'bg-white text-soil-700 hover:bg-black/5 border border-black/10'}`}
          >
            <Network className="w-4 h-4" /> Federated Network Status
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-black/5">
              {activeTab === 'radar' ? <ThreatRadarMap /> : <FederatedNetwork />}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-soil-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-orange-600" />
              Compound Risk Districts
            </h2>
            <p className="text-[13px] text-soil-700">Districts exhibiting both low regenerative adoption AND active pest signals.</p>
            
            <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-black/5 border-b border-black/5 text-[10px] uppercase text-soil-700 tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">District</th>
                    <th className="px-4 py-3 text-center font-bold">Regen Score</th>
                    <th className="px-4 py-3 text-center font-bold">Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-[13px]">
                  <tr className="bg-red-500/5 hover:bg-red-500/10 transition">
                    <td className="px-4 py-3 font-bold text-soil-900">Mato Grosso (BR)</td>
                    <td className="px-4 py-3 text-center text-red-700 font-bold">32/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider">CRITICAL</span></td>
                  </tr>
                  <tr className="bg-orange-500/5 hover:bg-orange-500/10 transition">
                    <td className="px-4 py-3 font-bold text-soil-900">Bhopal (IN)</td>
                    <td className="px-4 py-3 text-center text-orange-700 font-bold">45/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider">HIGH</span></td>
                  </tr>
                  <tr className="bg-leaf-500/5 hover:bg-leaf-500/10 transition">
                    <td className="px-4 py-3 font-bold text-soil-900">Free State (ZA)</td>
                    <td className="px-4 py-3 text-center text-leaf-700 font-bold">78/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-wheat-100 text-[#7c4a12] px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider border border-wheat-400/50">ELEVATED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sky-100 border border-leaf-500/20 p-4 rounded-2xl text-[13px] text-leaf-800 shadow-sm flex items-start gap-3">
              <span className="text-leaf-600 font-extrabold mt-0.5">ℹ</span>
              <p>
                <strong>BRICS Alignment:</strong> This dashboard directly feeds into the BRICS Network on Digital Agriculture data layer (Indore Declaration '26).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicymakerDashboard;
