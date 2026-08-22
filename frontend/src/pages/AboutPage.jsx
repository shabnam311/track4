import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Globe, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <header className="bg-white p-4 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-gray-600"><ArrowLeft /></button>
        <h1 className="text-lg font-bold text-gray-900">{t('about_bhoomi_setu')}</h1>
      </header>

      <div className="p-6 max-w-2xl mx-auto space-y-8 mt-4">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">BRICS Alignment</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Bhoomi Setu is designed to act as a shared digital public good for the <strong>BRICS Network on Digital Agriculture</strong> and the <strong>AgriN</strong> initiative (Indore Declaration, June 2026).
          </p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Plugs directly into the <strong>Centres of Excellence on Agro-Ecology and Regenerative Agriculture</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Protects smallholder data sovereignty by design.</span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Sovereignty First</h2>
          <p className="text-gray-600 leading-relaxed">
            Unlike centralized agricultural platforms, Bhoomi Setu uses <strong>Federated Learning</strong>. When a farmer reports a crop disease, the raw photo <em>never leaves their country</em>. Only statistical model updates (parameter gradients) cross borders to update the shared threat radar.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bankable Proof</h2>
          <p className="text-gray-600 leading-relaxed">
            Advising farmers on regenerative practices isn't enough. Bhoomi Setu uses <strong>Sentinel-1/2 satellite data</strong> to generate portable, hash-anchored verification certificates. This lowers the cost of verification for smallholders, allowing them to finally access green subsidies and carbon markets.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
