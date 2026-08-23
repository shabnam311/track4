import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Share2, Download, Award, ShieldCheck } from 'lucide-react';

const Certificate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem('bhoomi_farmer')) || { name: 'Anjali', location: 'Madhya Pradesh', country: 'India' };
  const verification = JSON.parse(localStorage.getItem('bhoomi_last_verification')) || {
    practice_type: 'no-till',
    plot_details: { id: 'P101', name: 'Wheat Field (2 Acres)' },
    confidence_score: 87
  };
  
  const displayPractice = verification.practice_type === 'cover-crop' ? 'Cover Cropping' : verification.practice_type === 'mulch' ? 'Residue Mulching' : 'No-Till Farming';

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      <header className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/farmer')} className="text-gray-600"><ArrowLeft /></button>
          <h1 className="text-lg font-bold text-gray-900">Regen Passport</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }} className="text-gray-600"><Share2 className="w-5 h-5" /></button>
          <button onClick={() => window.print()} className="text-gray-600"><Download className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="p-4">
        {/* Certificate Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white text-center relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 mx-auto mb-2 text-green-200" />
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-1">Regenerative Practice Certificate</h2>
              <p className="text-green-100 text-sm">Issued by Bhoomi Setu Network</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="text-center border-b border-gray-100 pb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Farmer</p>
              <p className="text-xl font-bold text-gray-900">{farmer.name}</p>
              <p className="text-sm text-gray-600">ID: {farmer.name.substring(0,2).toUpperCase()}001 • {farmer.location}, {farmer.country === 'India' ? 'IN' : 'BR'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Practice</p>
                <p className="font-bold text-green-700">{displayPractice}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Plot</p>
                <p className="font-bold text-gray-900">{verification.plot_details?.name || 'P101 (2 Acres)'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Verification</p>
                <p className="font-bold text-gray-900">Satellite (S-1/2)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Confidence</p>
                <p className="font-bold text-green-600">{verification.confidence_score}%</p>
              </div>
            </div>

            {/* Tamper evident block */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-gray-500 mb-1">Blockchain Anchor Hash</p>
                <p className="text-xs text-gray-400 font-mono truncate w-48">0x8f2a9c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t</p>
                <p className="text-[10px] text-green-600 font-bold mt-1">Verified on immutable ledger</p>
              </div>
              <div className="w-16 h-16 bg-white border border-gray-200 p-1 rounded-lg">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bhoomisetu.demo/verify/0x8f2`} alt="QR Code" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-500 text-center">Show this certificate to partner banks or input suppliers to claim green incentives.</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
