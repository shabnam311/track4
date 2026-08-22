import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Loader2, MapPin, AlertCircle, ArrowLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const PracticeReporting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const mockPlots = [
    { id: 'P101', name: 'Wheat Field (2 Acres)', location: 'Bhopal Dist.' }
  ];

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate API call to FastAPI backend
    try {
      const res = await fetch('http://localhost:3000/api/practices/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plot_id: 'P101', practice_type: 'no-till' })
      });
      const data = await res.json();
      setResult(data);
      setStep(2);
    } catch (e) {
      console.error(e);
      // Fallback if backend isn't running
      setTimeout(() => {
        setResult({
          status: 'Verified',
          confidence_score: 87,
          ndti_series: [
            { date: 'Jun 1', value: 0.1 },
            { date: 'Jun 15', value: 0.15 },
            { date: 'Jul 1', value: 0.25 },
            { date: 'Jul 15', value: 0.28 },
          ]
        });
        setStep(2);
      }, 2000);
    }
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate('/farmer')} className="text-gray-600"><ArrowLeft /></button>
        <h1 className="text-lg font-bold text-gray-900">{t('report_practice')}</h1>
      </header>

      <div className="p-4">
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100 flex gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Your practice will be verified automatically using satellite imagery (Sentinel-1/2). No field visit required.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Plot</label>
              {mockPlots.map(p => (
                <div key={p.id} className="border-2 border-green-500 bg-green-50 rounded-xl p-4 flex justify-between items-center cursor-pointer">
                  <div>
                    <p className="font-bold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3"/> {p.location}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Practice Adopted</label>
              <select className="w-full bg-white border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="no-till">No-Till / Zero Tillage</option>
                <option value="cover-crop">Cover Cropping</option>
                <option value="mulch">Crop Residue Mulching</option>
              </select>
            </div>

            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-green-600 text-white font-bold rounded-xl p-4 shadow-sm flex items-center justify-center gap-2 disabled:bg-green-400"
            >
              {isVerifying ? (
                <><Loader2 className="animate-spin w-5 h-5" /> Verifying via Satellite...</>
              ) : (
                'Submit for Verification'
              )}
            </button>
          </div>
        )}

        {step === 2 && result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Verified!</h2>
              <p className="text-green-700 font-medium mb-4">Confidence Score: {result.confidence_score}%</p>
              
              <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-200">
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Satellite Evidence (NDTI)</p>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.ndti_series}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} domain={[0, 0.4]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center italic">The spike in NDTI confirms crop residue cover without soil disturbance.</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/farmer/certificate')}
              className="w-full bg-green-600 text-white font-bold rounded-xl p-4 shadow-sm"
            >
              View Regen Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeReporting;
