import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Globe, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper dark:bg-soil-900 font-sans pb-20 text-soil-900 dark:text-wheat-100 transition-colors duration-200">
      <header className="bg-white dark:bg-soil-800 p-4 shadow-sm flex items-center gap-3 border-b border-transparent dark:border-white/10">
        <button aria-label="Go Back" onClick={() => navigate('/')} className="text-soil-700 dark:text-wheat-400 hover:text-soil-900 dark:hover:text-white transition"><ArrowLeft /></button>
        <h1 className="text-lg font-bold text-soil-900 dark:text-white">{t('about_page')}</h1>
      </header>

      <div className="p-6 max-w-2xl mx-auto space-y-8 mt-4">
        <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 border border-transparent dark:border-blue-900/50">
            <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-soil-900 dark:text-white mb-2">National Alignment</h2>
          <p className="text-soil-700 dark:text-wheat-400 leading-relaxed mb-4">
            Bhoomi Setu is designed to act as a shared digital public good for the <strong>National Network on Digital Agriculture</strong> and the <strong>AgriN</strong> initiative (Indore Declaration, June 2026).
          </p>
          <ul className="space-y-3 text-sm text-soil-700 dark:text-wheat-400">
            <li className="flex gap-2">
              <span className="text-leaf-600 dark:text-leaf-400 font-bold">•</span>
              <span>Plugs directly into the <strong>Centres of Excellence on Agro-Ecology and Regenerative Agriculture</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-leaf-600 dark:text-leaf-400 font-bold">•</span>
              <span>Protects smallholder data sovereignty by design.</span>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 border border-transparent dark:border-green-900/50">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-soil-900 dark:text-white mb-2">Data Sovereignty First</h2>
          <p className="text-soil-700 dark:text-wheat-400 leading-relaxed">
            Unlike centralized agricultural platforms, Bhoomi Setu uses <strong>Federated Learning</strong>. When a farmer reports a crop disease, the raw photo <em>never leaves their device</em>. Only statistical model updates (parameter gradients) cross district/state borders to update the shared threat radar.
          </p>
        </section>

        <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 border border-transparent dark:border-yellow-900/50">
            <BookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-soil-900 dark:text-white mb-2">Bankable Proof</h2>
          <p className="text-soil-700 dark:text-wheat-400 leading-relaxed">
            Advising farmers on regenerative practices isn't enough. Bhoomi Setu uses <strong>Sentinel-1/2 satellite data</strong> to generate portable, hash-anchored verification certificates. This lowers the cost of verification for smallholders, allowing them to finally access green subsidies and carbon markets.
          </p>
        </section>
        
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => { localStorage.clear(); alert('Demo data reset. Please refresh.'); }} 
            className="px-6 py-3 bg-red-500/10 dark:bg-red-900/20 hover:bg-red-500/20 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 font-bold rounded-xl transition border border-red-500/20 dark:border-red-900/50"
          >
            {t('reset_demo') || 'Reset Demo Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
