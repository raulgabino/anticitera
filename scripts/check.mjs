/* Prueba de humo: abre index.html en Chromium, recorre las seis vistas
   con las tres reconstrucciones y toca todas las piezas. Falla si hay
   un solo error de consola. */
import { chromium } from 'playwright';

const VIEWS = ['front', 'back', 'gears', 'corte', 'letras', 'frag'];
const MODELS = ['f2021', 'fj2012', 'voulgaris'];
const PIECES = ['luna', 'sol', 'fecha', 'zodiaco', 'calendario', 'nodos', 'venus', 'saturno',
  'metonico', 'saros', 'juegos', 'calipico', 'exeligmos', 'b1', 'k1', 'e3', 'o1',
  'caja', 'placa', 'strap', 'cp', 'pilares', 'tubos', 'frente1', 'frente2',
  'parapegma', 'dialFrente', 'dialDorso', 'bpi', 'bci', 'fci', 'glifos'];

const url = 'file://' + process.cwd() + '/index.html';
const browser = await chromium.launch();
let fails = 0;

for (const vp of [{ width: 320, height: 700 }, { width: 390, height: 900 }, { width: 1280, height: 1000 }]) {
  const page = await browser.newPage({ viewport: vp });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e.message)));
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(url);
  await page.waitForTimeout(500);

  for (const mk of MODELS) {
    await page.evaluate(m => setModel(m), mk);
    for (const v of VIEWS) {
      await page.evaluate(x => setView(x), v);
      for (const p of PIECES) await page.evaluate(i => select(i), p);
      await page.evaluate(() => select(null));
    }
  }
  for (const k of await page.evaluate(() => Object.keys(FRAG)))
    await page.evaluate(i => select('frag_' + i), k);

  /* fechas extremas y la manivela */
  await page.evaluate(() => { goDate(-300, 1, 1); goDate(2026, 7, 26); T = -500; render(); T = 900; render(); });
  await page.evaluate(() => { setView('corte'); depthEx = 9; resize(); render(); depthEx = 1; resize(); render(); });

  /* invariantes del mecanismo */
  const inv = await page.evaluate(() => {
    const m = machine(0);
    return {
      glifos: SAROS_GLYPHS.length,
      lunares: SAROS_GLYPHS.filter(g => g[1] & 2).length,
      solares: SAROS_GLYPHS.filter(g => g[1] & 1).length,
      luna: +(M.moon).toFixed(9), sinodico: +(M.moon - 1).toFixed(9),
      saros: +(M.saros).toFixed(9),
      finito: [m.trueSun, m.trueMoon, m.node, ...Object.values(m.planets).map(p => p.lon)].every(Number.isFinite)
    };
  });
  const want = { glifos: 51, lunares: 38, solares: 27, luna: 13.368421053, sinodico: 12.368421053, saros: 0.221855086, finito: true };
  for (const k of Object.keys(want))
    if (String(inv[k]) !== String(want[k])) { errs.push(`invariante ${k}: ${inv[k]} ≠ ${want[k]}`); }

  if (errs.length) { fails++; console.error(`✗ ${vp.width}px:`, errs.slice(0, 6)); }
  else console.log(`✓ ${vp.width}px · ${MODELS.length} modelos × ${VIEWS.length} vistas · 82 fragmentos · invariantes OK`);
  await page.close();
}
await browser.close();
process.exit(fails ? 1 : 0);
