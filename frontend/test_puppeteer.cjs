const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  // Create a minimal local server to serve dist
  const express = require('express');
  const app = express();
  app.use('/track4', express.static('dist'));
  const server = app.listen(4174, async () => {
    try {
      await page.goto('http://127.0.0.1:4174/track4/', { waitUntil: 'networkidle0' });
      const html = await page.content();
      console.log('ROOT HTML:', html);
    } catch(e) {
      console.error(e);
    } finally {
      await browser.close();
      server.close();
      process.exit(0);
    }
  });
})();
