import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "bhoomi_setu": "Bhoomi Setu",
      "subtitle": "AgriN Verify | A BRICS Digital Public Good",
      "continue_farmer": "Continue as Farmer",
      "continue_policymaker": "Continue as Policymaker",
      "about_bhoomi_setu": "About Bhoomi Setu & BRICS Alignment",
      "report_practice": "Report Regenerative Practice",
      "diagnose_crop": "Diagnose Crop Problem",
      "my_passport": "My Regen Passport",
      "simulated_data_warning": "You are viewing simulated satellite/federated data for demo purposes",
      "threat_radar": "Threat Radar",
      "federated_network": "Federated Network"
    }
  },
  hi: {
    translation: {
      "bhoomi_setu": "भूमि सेतु",
      "subtitle": "एग्री-एन वेरीफाई | ब्रिक्स डिजिटल पब्लिक गुड",
      "continue_farmer": "किसान के रूप में जारी रखें",
      "continue_policymaker": "नीति निर्माता के रूप में जारी रखें",
      "about_bhoomi_setu": "भूमि सेतु और ब्रिक्स संरेखण के बारे में",
      "report_practice": "पुनर्योजी कृषि की रिपोर्ट करें",
      "diagnose_crop": "फसल रोग का निदान करें",
      "my_passport": "मेरा रीजन पासपोर्ट",
      "simulated_data_warning": "आप डेमो उद्देश्यों के लिए सिम्युलेटेड सैटेलाइट/फेडरेटेड डेटा देख रहे हैं",
      "threat_radar": "खतरा रडार",
      "federated_network": "फेडरेटेड नेटवर्क"
    }
  },
  pt: {
    translation: {
      "bhoomi_setu": "Ponte da Terra (Bhoomi Setu)",
      "subtitle": "AgriN Verify | Um Bem Público Digital do BRICS",
      "continue_farmer": "Continuar como Agricultor",
      "continue_policymaker": "Continuar como Formulador de Políticas",
      "about_bhoomi_setu": "Sobre Bhoomi Setu e Alinhamento do BRICS",
      "report_practice": "Relatar Prática Regenerativa",
      "diagnose_crop": "Diagnosticar Problema na Cultura",
      "my_passport": "Meu Passaporte Regen",
      "simulated_data_warning": "Você está visualizando dados de satélite/federados simulados para fins de demonstração",
      "threat_radar": "Radar de Ameaças",
      "federated_network": "Rede Federada"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
