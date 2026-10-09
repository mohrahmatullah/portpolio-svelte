// Builds the site, prints cv.html to PDF in each language with headless Chromium,
// and writes the results to public/ (plus a copy for the legacy site at the repo root).
//
//   npx playwright install chromium   # once per machine
//   npm run cv
import { copyFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicDir = new URL('../public/', import.meta.url);
const legacyCv = new URL('../../curiculum-new.pdf', import.meta.url);
const MAX_PAGES = 2;

const pdfName = (lang) => `CV-Rohmatuloh-${lang.toUpperCase()}.pdf`;
const countPages = (pdf) => (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) ?? []).length;

await build({ root, logLevel: 'warn' });
const server = await preview({ root, preview: { port: 0, open: false }, logLevel: 'warn' });
const baseUrl = server.resolvedUrls.local[0];

const browser = await chromium.launch();
let failed = false;
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });

  for (const lang of ['en', 'id']) {
    await page.goto(new URL(`cv.html?lang=${lang}`, baseUrl).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.decode()));
    });

    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    const pages = countPages(pdf);
    await writeFile(new URL(pdfName(lang), publicDir), pdf);
    console.log(`${pdfName(lang)}: ${pages} page(s), ${(pdf.length / 1024).toFixed(0)} KB`);

    if (pages > MAX_PAGES) {
      console.error(`  ✗ exceeds ${MAX_PAGES} pages — shorten the content or tighten the layout`);
      failed = true;
    }
  }
} finally {
  await browser.close();
  await server.close();
}

if (failed) process.exit(1);

await copyFile(new URL(pdfName('en'), publicDir), legacyCv);
console.log(`Copied ${pdfName('en')} to ${fileURLToPath(legacyCv)}`);
