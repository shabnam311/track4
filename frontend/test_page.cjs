const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  await page.goto('http://localhost:5173/track4/', { waitUntil: 'networkidle0' });
  const html = await page.content();
  console.log('HTML ROOT:', html.substring(html.indexOf('<div id="root">'), html.indexOf('<div id="root">') + 200));
  await browser.close();
  process.exit(0);
})();
