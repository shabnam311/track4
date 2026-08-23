import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "bhoomi_setu": "Bhoomi Setu",
      "farmer_anjali": "Farmer: Anjali (MP)",
      "farmer_karthik": "Karthik (TN)",
      "policymaker": "Continue as Policymaker",
      "report_practice": "Report Regenerative Practice",
      "pest_diagnosis": "Pest & Disease Diagnosis",
      "diagnose_crop": "Diagnose Crop",
      "my_passport": "My Passport",
      "certificate": "View Certificates",
      "about_brics": "About Bhoomi Setu",
      "early_warning": "Network signal: possible Spodoptera mutation nearby",
      "hello": "Hello"
    }
  },
  hi: {
    translation: {
      "bhoomi_setu": "भूमि सेतु",
      "farmer_anjali": "किसान: अंजलि (MP)",
      "farmer_karthik": "कार्तिक (TN)",
      "policymaker": "नीति निर्माता के रूप में जारी रखें",
      "report_practice": "पुनर्योजी कृषि रिपोर्ट करें",
      "pest_diagnosis": "कीट और रोग निदान",
      "diagnose_crop": "फसल निदान",
      "my_passport": "मेरा पासपोर्ट",
      "certificate": "प्रमाणपत्र देखें",
      "about_brics": "भूमि सेतु के बारे में",
      "early_warning": "चेतावनी: आस-पास स्पोडोप्टेरा म्यूटेशन संभव है",
      "hello": "नमस्ते"
    }
  },
  ta: {
    translation: {
      "bhoomi_setu": "பூமி சேது",
      "farmer_anjali": "விவசாயி: அஞ்சலி (MP)",
      "farmer_karthik": "கார்த்திக் (TN)",
      "policymaker": "கொள்கை வகுப்பாளராக தொடரவும்",
      "report_practice": "மறுபிறவி நடைமுறையைப் புகாரளிக்கவும்",
      "pest_diagnosis": "பூச்சி மற்றும் நோய் கண்டறிதல்",
      "diagnose_crop": "பயிர் கண்டறிதல்",
      "my_passport": "என் பாஸ்போர்ட்",
      "certificate": "சான்றிதழ்களைக் காண்க",
      "about_brics": "பூமி சேது பற்றி",
      "early_warning": "எச்சரிக்கை: அருகில் ஸ்போடோப்டெரா மாற்றம்",
      "hello": "வணக்கம்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
