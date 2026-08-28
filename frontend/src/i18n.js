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
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
