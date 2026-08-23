import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map as MapIcon, Network, ShieldAlert, Download } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';

const FederatedNetwork = () => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [anomaly, setAnomaly] = useState(null);

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial State
      setActiveNodes(['IN', 'BR', 'ZA', 'CN', 'RU']);
      
      // 2. Anomaly in BR
      await new Promise(r => setTimeout(r, 2000));
      setAnomaly('BR');
      
      // 3. Sync to Aggregator (Center)
      await new Promise(r => setTimeout(r, 1500));
      setAnomaly('CENTER');

      // 4. Alert to others
      await new Promise(r => setTimeout(r, 1000));
      setAnomaly('ALL');
    };
    sequence();
    const interval = setInterval(sequence, 8000);
    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (id) => {
    if (anomaly === 'ALL') return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]';
    if (anomaly === id) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse';
    if (anomaly === 'CENTER' && id === 'CENTER') return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.7)] scale-110 transition-transform';
    return id === 'CENTER' ? 'bg-blue-600' : 'bg-green-500';
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 h-96 relative flex items-center justify-center overflow-hidden border border-slate-700">
      <div className="absolute top-4 left-4 text-slate-300 text-xs max-w-xs">
        <p className="font-bold text-white mb-1">Live Federated Sync</p>
        <p>Models are updated locally. Only parameter gradients cross borders.</p>
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Normal Training</p>
          <p className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Anomaly/Alert</p>
        </div>
      </div>
      
      {/* Center Node (Aggregator) */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${getNodeColor('CENTER')}`}>
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
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line 
                x1="50%" y1="50%" 
                x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                stroke={anomaly === 'ALL' || anomaly === 'CENTER' || anomaly === node ? '#ef4444' : '#334155'} 
                strokeWidth="2"
                strokeDasharray={anomaly ? "4" : "0"}
                className={anomaly ? "animate-[dash_1s_linear_infinite]" : ""}
              />
            </svg>
            <div 
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-500 ${getNodeColor(node)}`}
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
    <div className="h-96 w-full rounded-xl overflow-hidden border border-gray-200">
      <MapContainer center={[20, 77]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Local Confirmed */}
        <CircleMarker center={[22.9, 78.6]} radius={8} pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.7 }}>
          <Popup><strong>Confirmed Outbreak:</strong> Fall Armyworm (Madhya Pradesh)</Popup>
        </CircleMarker>
        <CircleMarker center={[19.0, 73.0]} radius={8} pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.7 }}>
          <Popup><strong>Confirmed Outbreak:</strong> Rust (Maharashtra)</Popup>
        </CircleMarker>
        
        {/* Early Signal (Federated) */}
        <CircleMarker center={[-12.6, -56.9]} radius={15} pathOptions={{ color: 'orange', fillColor: '#f97316', fillOpacity: 0.4, dashArray: '4' }} className="animate-pulse">
          <Popup><strong>Early Signal (Brazil):</strong> High probability of Spodoptera mutation based on network gradient update.</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

const PolicymakerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' or 'network'

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans text-soil-900">
      <header className="bg-soil-900 p-4 shadow-sm flex items-center justify-between text-wheat-100 relative z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-wheat-400 hover:text-white transition"><ArrowLeft /></button>
          <h1 className="text-lg font-bold font-serif uppercase tracking-wider">AgriN BRICS Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase">Live Network</span>
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
            onClick={() => setActiveTab('passport')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition flex items-center gap-2 shadow-sm ${activeTab === 'passport' ? 'bg-soil-900 text-wheat-100' : 'bg-white text-soil-700 hover:bg-black/5 border border-black/10'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Regen Passports
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              {activeTab === 'radar' ? <ThreatRadarMap /> : <FederatedNetwork />}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              Compound Risk Districts
            </h2>
            <p className="text-sm text-gray-600">Districts exhibiting both low regenerative adoption AND active pest signals.</p>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">District</th>
                    <th className="px-4 py-3 text-center">Regen Score</th>
                    <th className="px-4 py-3 text-center">Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 font-bold text-gray-900">Mato Grosso (BR)</td>
                    <td className="px-4 py-3 text-center text-red-600 font-bold">32/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">CRITICAL</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900">Bhopal (IN)</td>
                    <td className="px-4 py-3 text-center text-orange-600 font-bold">45/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">HIGH</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900">Free State (ZA)</td>
                    <td className="px-4 py-3 text-center text-green-600 font-bold">78/100</td>
                    <td className="px-4 py-3 text-center"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">ELEVATED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
              <strong>BRICS Alignment:</strong> This dashboard directly feeds into the BRICS Network on Digital Agriculture data layer (Indore Declaration '26).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicymakerDashboard;
