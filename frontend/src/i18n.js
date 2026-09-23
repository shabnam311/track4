import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'Farmer: Anjali (MP)',
      farmer_karthik: 'Karthik (TN)',
      policymaker: 'Continue as Policymaker',
      report_practice: 'Report Regenerative Practice',
      pest_diagnosis: 'Pest & Disease Diagnosis',
      diagnose_crop: 'Diagnose Crop',
      my_passport: 'My Passport',
      certificate: 'View Certificates',
      about_page: 'About TerraSync',
      early_warning: 'Network signal: possible Spodoptera mutation nearby',
      hello: 'Hello',
      reset_demo: 'Reset Demo Data',
      export_brief: 'Export Brief',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  hi: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'किसान: अंजलि (MP)',
      farmer_karthik: 'कार्तिक (TN)',
      policymaker: 'नीति निर्माता के रूप में जारी रखें',
      report_practice: 'पुनर्योजी कृषि रिपोर्ट करें',
      pest_diagnosis: 'कीट और रोग निदान',
      diagnose_crop: 'फसल निदान',
      my_passport: 'मेरा पासपोर्ट',
      certificate: 'प्रमाणपत्र देखें',
      about_page: 'TerraSync के बारे में',
      early_warning: 'चेतावनी: आस-पास स्पोडोप्टेरा म्यूटेशन संभव है',
      hello: 'नमस्ते',
      reset_demo: 'डेटा रीसेट करें',
      export_brief: 'रिपोर्ट निर्यात करें',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  ta: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'விவசாயி: அஞ்சலி (MP)',
      farmer_karthik: 'கார்த்திக் (TN)',
      policymaker: 'கொள்கை வகுப்பாளராக தொடரவும்',
      report_practice: 'மறுபிறவி நடைமுறையைப் புகாரளிக்கவும்',
      pest_diagnosis: 'பூச்சி மற்றும் நோய் கண்டறிதல்',
      diagnose_crop: 'பயிர் கண்டறிதல்',
      my_passport: 'என் பாஸ்போர்ட்',
      certificate: 'சான்றிதழ்களைக் காண்க',
      about_page: 'TerraSync பற்றி',
      early_warning: 'எச்சரிக்கை: அருகில் ஸ்போடோப்டெரா மாற்றம்',
      hello: 'வணக்கம்',
      reset_demo: 'தரவை மீட்டமை',
      export_brief: 'அறிக்கை ஏற்றுமதி',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  mr: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'शेतकरी: अंजली (MP)',
      farmer_karthik: 'कार्तिक (TN)',
      policymaker: 'धोरणकर्ता म्हणून पुढे जा',
      report_practice: 'पुनरुत्पादक शेती नोंदवा',
      pest_diagnosis: 'कीड आणि रोग निदान',
      diagnose_crop: 'पीक निदान',
      my_passport: 'माझा पासपोर्ट',
      certificate: 'प्रमाणपत्रे पहा',
      about_page: 'TerraSync बद्दल',
      early_warning: 'इशारा: स्पोडोप्टेरा उत्परिवर्तनाची शक्यता',
      hello: 'नमस्कार',
      reset_demo: 'डेटा रीसेट करा',
      export_brief: 'अहवाल निर्यात करा',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  pa: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'ਕਿਸਾਨ: ਅੰਜਲੀ (MP)',
      farmer_karthik: 'ਕਾਰਤਿਕ (TN)',
      policymaker: 'ਪਾਲਿਸੀਮੇਕਰ ਵਜੋਂ ਜਾਰੀ ਰੱਖੋ',
      report_practice: 'ਖੇਤੀ ਅਭਿਆਸ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
      pest_diagnosis: 'ਕੀੜੇ ਅਤੇ ਰੋਗ ਦੀ ਪਛਾਣ',
      diagnose_crop: 'ਫ਼ਸਲ ਦੀ ਪਛਾਣ',
      my_passport: 'ਮੇਰਾ ਪਾਸਪੋਰਟ',
      certificate: 'ਸਰਟੀਫਿਕੇਟ ਦੇਖੋ',
      about_page: 'TerraSync ਬਾਰੇ',
      early_warning: 'ਚੇਤਾਵਨੀ: ਸੰਭਾਵਿਤ ਸਪੋਡੋਪਟੇਰਾ ਪਰਿਵਰਤਨ',
      hello: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
      reset_demo: 'ਡਾਟਾ ਰੀਸੈਟ ਕਰੋ',
      export_brief: 'ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  gu: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'ખેડૂત: અંજલિ (MP)',
      farmer_karthik: 'કાર્તિક (TN)',
      policymaker: 'નીતિ નિર્માતા તરીકે ચાલુ રાખો',
      report_practice: 'પુનર્જીવિત કૃષિની જાણ કરો',
      pest_diagnosis: 'જંતુ અને રોગ નિદાન',
      diagnose_crop: 'પાક નિદાન',
      my_passport: 'મારો પાસપોર્ટ',
      certificate: 'પ્રમાણપત્ર જુઓ',
      about_page: 'TerraSync વિશે',
      early_warning: 'ચેતવણી: સંભવિત સ્પોડોપ્ટેરા પરિવર્તન',
      hello: 'નમસ્તે',
      reset_demo: 'ડેટા રીસેટ કરો',
      export_brief: 'રિપોર્ટ નિકાસ કરો',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  bn: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'কৃষক: অঞ্জলি (MP)',
      farmer_karthik: 'কার্তিক (TN)',
      policymaker: 'পলিসি মেকার হিসাবে চালিয়ে যান',
      report_practice: 'পুনরুত্পাদনমূলক কৃষির রিপোর্ট করুন',
      pest_diagnosis: 'কীটপতঙ্গ ও রোগ নির্ণয়',
      diagnose_crop: 'ফসল নির্ণয়',
      my_passport: 'আমার পাসপোর্ট',
      certificate: 'সার্টিফিকেট দেখুন',
      about_page: 'TerraSync সম্পর্কে',
      early_warning: 'সতর্কতা: সম্ভাব্য স্পোডোপ্টেরা মিউটেশন',
      hello: 'নমস্কার',
      reset_demo: 'ডেটা রিসেট করুন',
      export_brief: 'রিপোর্ট এক্সপোর্ট করুন',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  te: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'రైతు: అంజలి (MP)',
      farmer_karthik: 'కార్తీక్ (TN)',
      policymaker: 'విధానకర్తగా కొనసాగండి',
      report_practice: 'పునరుత్పత్తి వ్యవసాయాన్ని నివేదించండి',
      pest_diagnosis: 'తెగులు మరియు వ్యాధి నిర్ధారణ',
      diagnose_crop: 'పంట నిర్ధారణ',
      my_passport: 'నా పాస్‌పోర్ట్',
      certificate: 'ధృవీకరణ పత్రాలను చూడండి',
      about_page: 'TerraSync గురించి',
      early_warning: 'హెచ్చరిక: సమీపంలో స్పోడోప్టెరా మ్యుటేషన్',
      hello: 'నమస్కారం',
      reset_demo: 'డేటాను రీసెట్ చేయండి',
      export_brief: 'నివేదికను ఎగుమతి చేయండి',
      national_dashboard: 'National TerraSync Dashboard'
    }
  },
  kn: {
    translation: {
      terrasync: 'TerraSync',
      farmer_anjali: 'ರೈತ: ಅಂಜಲಿ (MP)',
      farmer_karthik: 'ಕಾರ್ತಿಕ್ (TN)',
      policymaker: 'ನೀತಿ ನಿರ್ಮಾಪಕರಾಗಿ ಮುಂದುವರಿಯಿರಿ',
      report_practice: 'ಪುನರುತ್ಪಾದಕ ಕೃಷಿ ವರದಿ ಮಾಡಿ',
      pest_diagnosis: 'ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ಣಯ',
      diagnose_crop: 'ಬೆಳೆ ನಿರ್ಣಯ',
      my_passport: 'ನನ್ನ ಪಾಸ್\u200cಪೋರ್ಟ್',
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
      my_passport: 'എന്റെ പാസ്\u200cപോർട്ട്',
      certificate: 'സർട്ടിഫിക്കറ്റുകൾ കാണുക',
      about_page: 'TerraSync-നെ കുറിച്ച്',
      early_warning: 'മുന്നറിയിപ്പ്: സമീപത്ത് സ്\u200cപോഡോപ്\u200cടെറ മ്യൂട്ടേഷൻ',
      hello: 'നമസ്കാരം',
      reset_demo: 'ഡാറ്റ പുനഃസജ്ജമാക്കുക',
      export_brief: 'റിപ്പോർട്ട് എക്സ്\u200cപോർട്ട്',
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
      my_passport: 'মোৰ পাছপৰ্ট',
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
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
