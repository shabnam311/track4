const fs = require('fs');

let code = fs.readFileSync('frontend/src/pages/PestDiagnosis.jsx', 'utf8');

const oldFetchBlock = `      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(\`\${apiUrl}/api/pest/diagnose\`, {
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
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'bot',
            type: 'diagnosis_card',
            data: { disease_name: 'Fall Armyworm (Offline)', confidence: 92, treatment: 'Apply neem oil (5%).' }
          }]);
          setIsTyping(false);
        }, 1500);
        return;
      }`;

const newFetchBlock = `      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(\`\${apiUrl}/api/pest/diagnose\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: sentText || "What is wrong with this leaf?", 
            imageBase64: photoSimulate ? "data:image/jpeg;base64,mock..." : null 
          })
        });
        if (!res.ok) {
          throw new Error(\`Backend returned \${res.status}\`);
        }
        const data = await res.json();
        
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: 'diagnosis_card',
          data
        }]);
      } catch (e) {
        const isNetwork = e.message.includes('Failed to fetch');
        setTimeout(() => {
          setMessages(prev => [...prev, {
            sender: 'bot',
            type: 'diagnosis_card',
            data: { 
              disease_name: isNetwork ? '⚠️ Can\\'t reach the server — check your connection' : '⚠️ AI service hiccup — try again in a moment', 
              confidence: 0, 
              treatment: '' 
            }
          }]);
          setIsTyping(false);
        }, 1500);
        return;
      }`;

code = code.replace(oldFetchBlock, newFetchBlock);
fs.writeFileSync('frontend/src/pages/PestDiagnosis.jsx', code);
console.log("Updated PestDiagnosis.jsx");
