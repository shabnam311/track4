const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  await page.goto('https://shabnam311.github.io/track4/', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  console.log('BODY:', content.substring(0, 500));
  
  await browser.close();
})();
