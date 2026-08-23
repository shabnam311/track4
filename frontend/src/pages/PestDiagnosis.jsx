import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Camera, Send, ImageIcon, AlertTriangle, ShieldCheck } from 'lucide-react';

const PestDiagnosis = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello Anjali! Take a photo of the crop problem, or type a description.' }
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
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-green-700 text-white p-4 shadow-md flex items-center gap-3">
        <button onClick={() => navigate('/farmer')} className="text-white"><ArrowLeft /></button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-700 font-bold text-xs">AI</span>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Bhoomi Setu Assistant</h1>
            <p className="text-[10px] text-green-200">Online</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-24" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
        {/* Warning label */}
        <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md text-center shadow-sm w-full max-w-xs mx-auto">
          Simulated WhatsApp UI for Demo
        </div>

        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm relative ${
              m.sender === 'user' ? 'bg-green-100 rounded-tr-none' : 'bg-white rounded-tl-none'
            }`}>
              {m.text && <p className="text-sm text-gray-800">{m.text}</p>}
              
              {m.type === 'image_mock' && (
                <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-green-500 opacity-20"></div>
                   <ImageIcon className="w-8 h-8 text-white opacity-50" />
                   <p className="absolute bottom-2 left-2 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">leaf_spot.jpg</p>
                </div>
              )}

              {m.type === 'diagnosis_card' && (
                <div className="mt-1 space-y-3 w-64">
                  <div className="flex items-center gap-2 text-red-600 font-bold border-b border-gray-100 pb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{m.data?.disease_name}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Confidence: {m.data?.confidence}%</p>
                  <p className="text-xs text-gray-500">Treatment: {m.data?.treatment}</p>
                  
                  {/* Federated Learning Microcopy */}
                  <div className="bg-blue-50 p-2 rounded-lg mt-2 border border-blue-100 flex gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-[10px] text-blue-800 leading-tight">
                      Your anonymous report helps the BRICS federated network detect outbreaks earlier. No photos are shared across borders.
                    </p>
                  </div>
                </div>
              )}
              
              <span className="text-[9px] text-gray-400 absolute bottom-1 right-2">
                12:00 PM
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-2 fixed bottom-0 left-0 right-0">
        <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-gray-200">
          <button onClick={handlePhotoUpload} className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition">
            <Camera className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />
          <button 
            onClick={() => handleSend(false)}
            disabled={!input.trim()}
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PestDiagnosis;
