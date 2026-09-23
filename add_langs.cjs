const fs = require('fs');
let code = fs.readFileSync('frontend/src/i18n.js', 'utf8');

const newLangs = `,
  kn: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'ರೈತ: ಅಂಜಲಿ (MP)',
      farmer_karthik: 'ಕಾರ್ತಿಕ್ (TN)',
      policymaker: 'ನೀತಿ ನಿರ್ಮಾಪಕರಾಗಿ ಮುಂದುವರಿಯಿರಿ',
      report_practice: 'ಪುನರುತ್ಪಾದಕ ಕೃಷಿ ವರದಿ ಮಾಡಿ',
      pest_diagnosis: 'ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ಣಯ',
      diagnose_crop: 'ಬೆಳೆ ನಿರ್ಣಯ',
      my_passport: 'ನನ್ನ ಪಾಸ್\\u200cಪೋರ್ಟ್',
      certificate: 'ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      about_page: 'TerraSync ಬಗ್ಗೆ',
      early_warning: 'ಎಚ್ಚರಿಕೆ: ಸಮೀಪದಲ್ಲಿ ಸ್ಪೋಡೋಪ್ಟೆರಾ ರೂಪಾಂತರ',
      hello: 'ನಮಸ್ಕಾರ',
      reset_demo: 'ಡೇಟಾ ಮರುಹೊಂದಿಸಿ',
      export_brief: 'ವರದಿ ರಫ್ತು ಮಾಡಿ',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  ml: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'കർഷകൻ: അഞ്ജലി (MP)',
      farmer_karthik: 'കാർത്തിക് (TN)',
      policymaker: 'നയരൂപകർത്താവായി തുടരുക',
      report_practice: 'പുനരുൽപ്പാദന കൃഷി റിപ്പോർട്ട് ചെയ്യുക',
      pest_diagnosis: 'കീടങ്ങളും രോഗ നിർണയവും',
      diagnose_crop: 'വിള നിർണയം',
      my_passport: 'എന്റെ പാസ്\\u200cപോർട്ട്',
      certificate: 'സർട്ടിഫിക്കറ്റുകൾ കാണുക',
      about_page: 'TerraSync-നെ കുറിച്ച്',
      early_warning: 'മുന്നറിയിപ്പ്: സമീപത്ത് സ്\\u200cപോഡോപ്\\u200cടെറ മ്യൂട്ടേഷൻ',
      hello: 'നമസ്കാരം',
      reset_demo: 'ഡാറ്റ പുനഃസജ്ജമാക്കുക',
      export_brief: 'റിപ്പോർട്ട് എക്സ്\\u200cപോർട്ട്',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  or: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'ଚାଷୀ: ଅଞ୍ଜଳୀ (MP)',
      farmer_karthik: 'କାର୍ତ୍ତିକ (TN)',
      policymaker: 'ନୀତି ନିର୍ମାତା ଭାବରେ ଜାରି ରଖନ୍ତୁ',
      report_practice: 'ପୁନରୁତ୍ପାଦନ କୃଷି ରିପୋର୍ଟ କରନ୍ତୁ',
      pest_diagnosis: 'କୀଟ ଏବଂ ରୋଗ ନିର୍ଣ୍ଣୟ',
      diagnose_crop: 'ଫସଲ ନିର୍ଣ୍ଣୟ',
      my_passport: 'ମୋ ପାସପୋର୍ଟ',
      certificate: 'ପ୍ରମାଣପତ୍ର ଦେଖନ୍ତୁ',
      about_page: 'TerraSync ବିଷୟରେ',
      early_warning: 'ସତର୍କତା: ନିକଟରେ ସ୍ପୋଡୋପ୍ଟେରା ପରିବର୍ତ୍ତନ',
      hello: 'ନମସ୍କାର',
      reset_demo: 'ଡାଟା ରିସେଟ୍ କରନ୍ତୁ',
      export_brief: 'ରିପୋର୍ଟ ରପ୍ତାନି କରନ୍ତୁ',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  as: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'কৃষক: অঞ্জলী (MP)',
      farmer_karthik: 'কাৰ্তিক (TN)',
      policymaker: 'নীতি নিৰ্মাতা হিচাপে আগবাঢ়ক',
      report_practice: 'পুনৰুৎপাদনশীল কৃষি প্ৰতিবেদন দিয়ক',
      pest_diagnosis: 'কীট-পতংগ আৰু ৰোগ নিৰ্ণয়',
      diagnose_crop: 'শস্য নিৰ্ণয়',
      my_passport: 'মোৰ পাছপ'ৰ্ট',
      certificate: 'প্ৰমাণপত্ৰ চাওক',
      about_page: 'TerraSync সম্পৰ্কে',
      early_warning: 'সতৰ্কবাণী: ওচৰত স্পডোপ্টেৰা পৰিৱৰ্তন',
      hello: 'নমস্কাৰ',
      reset_demo: 'তথ্য পুনৰায় ছেট কৰক',
      export_brief: 'প্ৰতিবেদন ৰপ্তানি কৰক',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  ur: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'کسان: انجلی (MP)',
      farmer_karthik: 'کارتک (TN)',
      policymaker: 'پالیسی ساز کے طور پر جاری رکھیں',
      report_practice: 'تخلیقی زراعت کی رپورٹ کریں',
      pest_diagnosis: 'کیڑوں اور بیماری کی تشخیص',
      diagnose_crop: 'فصل کی تشخیص',
      my_passport: 'میرا پاسپورٹ',
      certificate: 'سرٹیفکیٹ دیکھیں',
      about_page: 'TerraSync کے بارے میں',
      early_warning: 'انتباہ: قریب میں اسپوڈوپٹیرا تبدیلی',
      hello: 'السلام علیکم',
      reset_demo: 'ڈیٹا ری سیٹ کریں',
      export_brief: 'رپورٹ ایکسپورٹ کریں',
      national_dashboard: 'National TerraSync Dashboard'
    }
  }`;

// Insert new languages before the closing of resources
code = code.replace(
  /(\s+te:\s*\{[\s\S]*?national_dashboard:.*?\n\s*\}\s*\})\s*\};/,
  '$1,' + newLangs + '\n};'
);

fs.writeFileSync('frontend/src/i18n.js', code, 'utf8');
console.log('Added 5 new languages to i18n.js');
