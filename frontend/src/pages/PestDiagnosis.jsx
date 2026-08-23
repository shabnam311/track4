import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Camera, Send, ImageIcon, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';

const PestDiagnosis = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem('bhoomi_farmer')) || { name: 'Anjali' };
  const [messages, setMessages] = useState([
    { sender: 'bot', type: 'text', text: `${t('hello')} ${farmer.name}! Take a photo of the crop problem, or type a description.` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (photoSimulate = false) => {
    if (!input.trim() && !photoSimulate) return;
    
    const newMsg = { sender: 'user', type: photoSimulate ? 'image_mock' : 'text', text: input };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);
    const sentText = input;
    setInput('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/api/pest/diagnose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: sentText || "What is wrong with this leaf?", 
          imageBase64: photoSimulate ? "data:image/jpeg;base64,mock..." : null 
        })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        sender: 'bot',
        type: 'diagnosis_card',
        data
      }]);
    } catch (e) {
      // Fallback
      setMessages(prev => [...prev, {
        sender: 'bot',
        type: 'diagnosis_card',
        data: { disease_name: 'Fall Armyworm (Offline)', confidence: 92, treatment: 'Apply neem oil (5%).' }
      }]);
    }
    setIsTyping(false);
  };

  const handlePhotoUpload = () => handleSend(true);

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans text-soil-900">
      <header className="bg-white p-4 shadow-sm flex items-center justify-between border-b border-black/10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/farmer')} className="text-soil-700 hover:text-soil-900 transition"><ArrowLeft /></button>
          <div>
            <h1 className="text-lg font-bold font-serif">AgriN Expert</h1>
            <p className="text-xs text-leaf-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-leaf-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/5 bg-blend-overlay">
        <div className="bg-wheat-100 p-3 rounded-2xl text-center text-xs text-soil-700 font-bold border border-black/10 mb-6 mx-4">
          Chat is private. Your photos help train the BRICS early-warning model anonymously.
        </div>

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              m.sender === 'user' 
                ? 'bg-soil-900 text-wheat-100 rounded-tr-none' 
                : 'bg-white text-soil-900 border border-black/10 rounded-tl-none'
            }`}>
              {m.type === 'text' && <p>{m.text}</p>}
              
              {m.type === 'image_mock' && (
                <div className="relative">
                  <div className="w-48 h-48 bg-black/10 rounded-xl mb-2 flex items-center justify-center border border-black/5">
                    <ImageIcon className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-xs text-wheat-400 font-medium italic">leaf_spot_scan.jpg</p>
                </div>
              )}

              {m.type === 'diagnosis_card' && (
                <div className="mt-1 space-y-3 w-64">
                  <div className="flex items-center gap-2 text-red-600 font-bold border-b border-black/5 pb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{m.data?.disease_name}</span>
                  </div>
                  <p className="text-sm text-soil-700 font-medium">Confidence: <span className="text-soil-900 font-bold">{m.data?.confidence}%</span></p>
                  <p className="text-xs text-soil-700 leading-relaxed">Treatment: {m.data?.treatment}</p>
                  
                  {/* Federated Learning Microcopy */}
                  <div className="bg-sky-100 p-3 rounded-xl mt-2 border border-leaf-500/20 flex gap-2">
                    <ShieldCheck className="w-4 h-4 text-leaf-600 flex-shrink-0" />
                    <p className="text-[10px] text-leaf-600 font-bold leading-tight">
                      Your anonymous report helps the BRICS federated network detect outbreaks earlier. No photos are shared across borders.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-black/10">
              <Loader2 className="w-5 h-5 animate-spin text-leaf-500" />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 border-t border-black/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePhotoUpload}
            className="p-3 text-leaf-600 bg-sky-100 rounded-full hover:bg-leaf-50 transition"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(false)}
            placeholder="Describe the symptoms..."
            className="flex-1 bg-paper border border-black/10 outline-none text-sm p-3 rounded-full text-soil-900 placeholder:text-soil-700/50 font-medium focus:border-leaf-500 transition"
          />
          <button 
            onClick={() => handleSend(false)}
            disabled={!input.trim()}
            className="bg-leaf-600 text-white p-3 rounded-full hover:bg-leaf-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PestDiagnosis;
