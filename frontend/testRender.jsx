import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import PolicymakerDashboard from './src/pages/PolicymakerDashboard.jsx';
import FarmerHome from './src/pages/FarmerHome.jsx';
import './src/i18n.js';

global.window = {};
global.window.requestAnimationFrame = () => {};
global.document = { createElement: () => ({}) };
global.navigator = { userAgent: 'node' };

try {
  renderToString(
    <MemoryRouter initialEntries={["/policymaker"]}>
      <PolicymakerDashboard />
    </MemoryRouter>
  );
  console.log("PolicymakerDashboard renders OK.");
} catch (e) {
  console.error("PolicymakerDashboard Error:", e);
}

try {
  renderToString(
    <MemoryRouter initialEntries={["/farmer"]}>
      <FarmerHome />
    </MemoryRouter>
  );
  console.log("FarmerHome renders OK.");
} catch (e) {
  console.error("FarmerHome Error:", e);
}
