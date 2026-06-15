import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to portfolio
  await page.goto('http://localhost:5173/portfolio');
  
  // Wait for React to mount and helmet to do its thing
  await page.waitForTimeout(2000);
  
  // Extract all canonical tags
  const canonicals = await page.$$eval('link[rel="canonical"]', els => els.map(el => el.outerHTML));
  console.log('Canonical tags found:', canonicals);
  
  // Also check the page title to ensure helmet is working at all
  const title = await page.title();
  console.log('Page title:', title);

  await browser.close();
})();
