import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Share2, Download, Award, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
  const payload = `bhoomisetu.demo/verify/0x8f2a9c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t-${farmer.id || 'F001'}`;
  const hash = payload.substring(payload.length - 20) || '0x...';

  return (
    <div className="min-h-screen bg-paper dark:bg-soil-900 pb-20 font-sans text-soil-900 dark:text-wheat-100 flex justify-center p-4 md:p-10 transition-colors duration-200">
      <style>{`@media print { .no-print { display: none !important; } }`}</style>
      <div className="w-full max-w-md">
        <header className="flex items-center justify-between mb-6 no-print">
          <div className="flex items-center gap-3">
            <button aria-label="Go Back" onClick={() => navigate('/farmer')} className="text-soil-700 dark:text-wheat-400 hover:text-soil-900 dark:hover:text-white transition"><ArrowLeft /></button>
            <h1 className="text-lg font-bold font-serif">Regen Passport</h1>
          </div>
          <div className="flex gap-4">
            <button aria-label="Share" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }} className="text-soil-700 dark:text-wheat-400 hover:text-soil-900 dark:hover:text-white transition"><Share2 className="w-5 h-5" /></button>
            <button aria-label="Download" onClick={() => window.print()} className="text-soil-700 dark:text-wheat-400 hover:text-soil-900 dark:hover:text-white transition"><Download className="w-5 h-5" /></button>
          </div>
        </header>

        {/* Certificate Card */}
        <div className="bg-white dark:bg-soil-800 rounded-3xl shadow-xl overflow-hidden border border-black/10 dark:border-white/10">
          {/* Header */}
          <div className="bg-gradient-to-br from-leaf-500 to-soil-700 p-6 text-wheat-100 text-center relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 mx-auto mb-2 text-wheat-400" />
              <h2 className="text-xl font-bold font-serif uppercase tracking-wider mb-1 text-white">Regenerative Practice Certificate</h2>
              <p className="text-white/80 text-sm">Issued by Bhoomi Setu Network</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="text-center border-b border-black/10 dark:border-white/10 pb-6">
              <p className="text-xs text-soil-700 dark:text-wheat-400 uppercase tracking-wide mb-1 font-bold">Farmer</p>
              <p className="text-2xl font-bold font-serif text-soil-900 dark:text-white">{farmer.name}</p>
              <p className="text-sm text-soil-700 dark:text-wheat-400 mt-1 font-medium">ID: {farmer.name.substring(0,2).toUpperCase()}001 • {farmer.location}, IN</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-soil-700 dark:text-wheat-400 uppercase tracking-wide mb-1 font-bold">Practice</p>
                <p className="font-bold text-leaf-600 dark:text-leaf-400">{displayPractice}</p>
              </div>
              <div>
                <p className="text-xs text-soil-700 dark:text-wheat-400 uppercase tracking-wide mb-1 font-bold">Plot</p>
                <p className="font-bold text-soil-900 dark:text-white">{verification.plot_details?.name || 'P101 (2 Acres)'}</p>
              </div>
              <div>
                <p className="text-xs text-soil-700 dark:text-wheat-400 uppercase tracking-wide mb-1 font-bold">Verification</p>
                <p className="font-bold text-soil-900 dark:text-white">Satellite (S-1/2)</p>
              </div>
              <div>
                <p className="text-xs text-soil-700 dark:text-wheat-400 uppercase tracking-wide mb-1 font-bold">Confidence</p>
                <p className="font-bold text-leaf-600 dark:text-leaf-400">{verification.confidence_score}%</p>
              </div>
            </div>

            {/* Tamper evident block */}
            <div className="bg-wheat-100 dark:bg-soil-900 rounded-2xl p-4 flex items-center justify-between gap-3 border border-transparent dark:border-white/5">
              <div className="overflow-hidden flex-1">
                <p className="text-[10px] font-bold text-soil-700 dark:text-wheat-400 uppercase mb-1 tracking-wide">Blockchain Anchor Hash</p>
                <p className="text-xs text-soil-900 dark:text-wheat-100 font-mono truncate">{hash}</p>
                <p className="text-[10px] text-leaf-600 dark:text-leaf-400 font-extrabold mt-1"> Verified on immutable ledger</p>
              </div>
              <div className="w-16 h-16 bg-white dark:bg-soil-800 p-1 rounded-xl shadow-sm border border-black/5 dark:border-white/10 flex-shrink-0">
                <QRCodeSVG value={payload} size={54} fgColor="#22281c" title="Certificate QR Code" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-soil-700 dark:text-wheat-400 text-center mt-6 px-4 font-medium">Show this certificate to partner banks or input suppliers to claim green incentives. Eligible for PM-KISAN green bonus.</p>
      </div>
    </div>
  );
};

export default Certificate;