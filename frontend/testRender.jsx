import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App.jsx';
import FarmerHome from './src/pages/FarmerHome.jsx';
import PolicymakerDashboard from './src/pages/PolicymakerDashboard.jsx';
import PracticeReporting from './src/pages/PracticeReporting.jsx';
import Certificate from './src/pages/Certificate.jsx';
import AboutPage from './src/pages/AboutPage.jsx';
import PestDiagnosis from './src/pages/PestDiagnosis.jsx';
import './src/i18n.js';

global.window = {};
global.window.requestAnimationFrame = () => {};
global.document = { createElement: () => ({}) };
global.navigator = { userAgent: 'node' };

const components = [
  { name: 'App', component: <App /> },
  { name: 'FarmerHome', component: <FarmerHome /> },
  { name: 'PolicymakerDashboard', component: <PolicymakerDashboard /> },
  { name: 'PracticeReporting', component: <PracticeReporting /> },
  { name: 'Certificate', component: <Certificate /> },
  { name: 'AboutPage', component: <AboutPage /> },
  { name: 'PestDiagnosis', component: <PestDiagnosis /> }
];

components.forEach(({ name, component }) => {
  try {
    renderToString(<MemoryRouter>{component}</MemoryRouter>);
    console.log(`${name} renders OK.`);
  } catch (e) {
    console.error(`${name} Error:`, e);
  }
});
