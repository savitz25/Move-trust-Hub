import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';

const url = process.argv[2] || 'https://www.movetrusthub.com/';
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
const options = {
  logLevel: 'error',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  port: chrome.port,
  formFactor: 'desktop',
  screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
};
const runnerResult = await lighthouse(url, options);
await chrome.kill();
const json = runnerResult.lhr;
writeFileSync('lighthouse-desktop-prod.json', JSON.stringify(json, null, 2));
const cats = json.categories;
console.log(JSON.stringify({
  performance: Math.round(cats.performance.score * 100),
  accessibility: Math.round(cats.accessibility.score * 100),
  bestPractices: Math.round(cats['best-practices'].score * 100),
  seo: Math.round(cats.seo.score * 100),
  LCP: json.audits['largest-contentful-paint'].displayValue,
  TBT: json.audits['total-blocking-time'].displayValue,
  CLS: json.audits['cumulative-layout-shift'].displayValue,
  FCP: json.audits['first-contentful-paint'].displayValue,
}, null, 2));