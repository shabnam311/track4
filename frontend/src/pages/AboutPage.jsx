import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Globe, BookOpen, Cpu, BarChart3, RefreshCw, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper dark:bg-soil-900 font-sans pb-20 text-soil-900 dark:text-wheat-100 transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-soil-800/90 backdrop-blur-md p-4 shadow-sm flex items-center justify-between border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button 
            aria-label="Go Back" 
            onClick={() => navigate('/')} 
            className="p-2 rounded-lg text-soil-700 dark:text-wheat-400 hover:text-soil-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-soil-900 dark:text-white">{t('about_page') || 'About TerraSync'}</h1>
            <p className="text-xs text-soil-600 dark:text-wheat-400">Digital Public Good for Agricultural Resilience</p>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-3xl mx-auto space-y-8 mt-2">
        {/* Mission Banner */}
        <div className="bg-gradient-to-br from-leaf-700 to-soil-800 text-white p-7 rounded-3xl shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide uppercase text-wheat-100">
              National Digital Public Good
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Empowering Indian Farmers with Federated Intelligence</h2>
            <p className="text-wheat-200 text-sm sm:text-base leading-relaxed pt-1 max-w-2xl">
              TerraSync unites smallholders and policymakers by combining on-device AI pest diagnosis, Sentinel satellite verification for regenerative practices, and privacy-preserving cross-state intelligence.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: National Alignment */}
          <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center border border-blue-200 dark:border-blue-900/50">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-soil-900 dark:text-white">National & Global Alignment</h3>
            <p className="text-soil-700 dark:text-wheat-400 text-sm leading-relaxed">
              Designed as an open Digital Public Good aligned with the <strong>National Network on Digital Agriculture</strong> and the <strong>Centres of Excellence on Agro-Ecology</strong> (Indore Declaration, 2026).
            </p>
            <ul className="space-y-2 text-xs text-soil-600 dark:text-wheat-400 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Enables verifiable eligibility for <strong>PM-KISAN green bonuses</strong> and carbon finance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Architecture seamlessly scales to cross-border agricultural corridors across <strong>BRICS</strong> nations.</span>
              </li>
            </ul>
          </section>

          {/* Pillar 2: Federated Learning */}
          <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 space-y-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center border border-green-200 dark:border-green-900/50">
              <Shield className="w-6 h-6 text-leaf-600 dark:text-leaf-400" />
            </div>
            <h3 className="text-xl font-bold text-soil-900 dark:text-white">Privacy-First Federated Radar</h3>
            <p className="text-soil-700 dark:text-wheat-400 text-sm leading-relaxed">
              Protects smallholder data sovereignty by design. Raw photos and plot telemetry <strong>never leave the farmer's device</strong>.
            </p>
            <ul className="space-y-2 text-xs text-soil-600 dark:text-wheat-400 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Only anonymized statistical threat gradients cross state lines (e.g., MP to Tamil Nadu).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Triggers proactive early warnings before invasive pests (like Spodoptera) spread across regions.</span>
              </li>
            </ul>
          </section>

          {/* Pillar 3: Satellite Verification & Regen Passport */}
          <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 space-y-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center border border-amber-200 dark:border-amber-900/50">
              <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-soil-900 dark:text-white">Satellite-Verified Passports</h3>
            <p className="text-soil-700 dark:text-wheat-400 text-sm leading-relaxed">
              Eliminates "verification poverty" for smallholders. Uses free <strong>Sentinel-1/2 SAR & NDTI time-series</strong> data to cryptographically verify practices (no-till, cover cropping).
            </p>
            <ul className="space-y-2 text-xs text-soil-600 dark:text-wheat-400 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Issues tamper-evident, print-ready certificates with offline-scannable Level-M QR credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Replaces prohibitive $100+/acre manual certification fees with automated satellite reasoning.</span>
              </li>
            </ul>
          </section>

          {/* Pillar 4: Multimodal Google AI Engine */}
          <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 space-y-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-200 dark:border-purple-900/50">
              <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-soil-900 dark:text-white">Multimodal Google Gemini AI</h3>
            <p className="text-soil-700 dark:text-wheat-400 text-sm leading-relaxed">
              Powered by Google's latest <strong>Gemini Flash</strong> model via the official <code className="text-xs bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">@google/genai</code> SDK.
            </p>
            <ul className="space-y-2 text-xs text-soil-600 dark:text-wheat-400 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Few-shot conversational intelligence auto-detects English, Hindi, Tamil, and other regional dialects.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-600 dark:text-leaf-400 shrink-0 mt-0.5" />
                <span>Provides real-time agronomic remedies, dosage advice, and agronomist callback escalation.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Policymaker & Compound Risk Section */}
        <section className="bg-white dark:bg-soil-800 p-6 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-900/50">
            <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-soil-900 dark:text-white">National Compound Risk Intelligence</h3>
          <p className="text-soil-700 dark:text-wheat-400 text-sm leading-relaxed">
            The National Dashboard correlates biological pest outbreak hotspots with satellite-verified soil resilience metrics to compute <strong>Compound Risk Districts</strong>. Policymakers can instantly export actionable CSV briefs for targeted budgetary allocation and emergency pesticide subsidies.
          </p>
        </section>

        {/* Demo Management Section */}
        <div className="bg-soil-100/50 dark:bg-soil-800/50 p-6 rounded-2xl border border-black/5 dark:border-white/10 text-center space-y-4">
          <div>
            <h4 className="font-bold text-soil-900 dark:text-white text-base">Demo Environment Management</h4>
            <p className="text-xs text-soil-600 dark:text-wheat-400 max-w-md mx-auto pt-1">
              Reset stored test practices, local verification certificates, and persona preferences to their original clean state.
            </p>
          </div>
          <button 
            onClick={() => { 
              localStorage.clear(); 
              alert('Demo data has been reset to defaults. The page will now reload.'); 
              window.location.reload();
            }} 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 dark:bg-red-900/20 hover:bg-red-500/20 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 text-sm font-bold rounded-xl transition border border-red-500/20 dark:border-red-900/50 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            {t('reset_demo') || 'Reset Demo Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
