const fs = require('fs');

const safeParseCode = 
const safeJSONParse = (str, fallback) => {
  if (!str || str === 'undefined') return fallback;
  try {
    return JSON.parse(str) || fallback;
  } catch (e) {
    return fallback;
  }
};
;

function fixFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  let original = content;
  
  // Replace JSON parse
  if (content.includes('JSON.parse(localStorage.getItem')) {
    content = content.replace(/JSON\.parse\(localStorage\.getItem\((.*?)\)\)/g, 'safeJSONParse(localStorage.getItem(), null)');
    if (!content.includes('const safeJSONParse')) {
      content = content.replace("import React", "import React from 'react';\n" + safeParseCode + "\n//");
    }
  }

  // Ensure FarmerHome handles null farmer
  if (path.includes('FarmerHome')) {
    content = content.replace("farmer.name.substring(0, 2)", "(farmer?.name || 'Anjali').substring(0, 2)");
  }

  fs.writeFileSync(path, content, 'utf8');
}

['src/App.jsx', 'src/pages/FarmerHome.jsx', 'src/pages/PracticeReporting.jsx', 'src/pages/Certificate.jsx', 'src/pages/PestDiagnosis.jsx', 'src/pages/PolicymakerDashboard.jsx'].forEach(file => {
  if(fs.existsSync(file)) fixFile(file);
});
console.log('Fixed JSON issues');
