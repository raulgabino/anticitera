/* ¿Salta la caja al girar? Recorre 400 fechas y mide la altura
   de cada bloque y la posición de los que van debajo. */
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const vp of [{width:320,height:700},{width:390,height:900},{width:1280,height:1000}]) {
  const p = await b.newPage({ viewport: vp });
  await p.goto('file://' + process.cwd() + '/index.html');
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const ids = ['#dateval','.datebar','#grid','.readout','.controls','.info','.modelnote','.viewnote'];
    const seen = {}; ids.forEach(i => seen[i] = new Set());
    const cellH = new Set(), cellCount = new Set();
    for (let i = 0; i < 420; i++) {
      if (i === 400) setModel('fj2012');
      if (i === 410) setModel('voulgaris');
      T = -20 + (i % 400) * 0.63;    // ~250 años, y luego los otros dos modelos
      render();
      for (const id of ids) {
        if (i >= 400 && id === '.info') continue;   // cambiar de modelo cambia la ficha: es acción del usuario
        const el = document.querySelector(id);
        if (el) seen[id].add(Math.round(el.getBoundingClientRect().height));
      }
      const cells = document.querySelectorAll('#grid .cell');
      cellCount.add(cells.length);
      cells.forEach((c, k) => cellH.add(k + ':' + Math.round(c.getBoundingClientRect().height)));
    }
    const out = {};
    for (const id of ids) out[id] = [...seen[id]];
    out.celdas = [...cellCount];
    out.alturasDeCelda = [...cellH].sort();
    return out;
  });
  let ok = true;
  console.log(`\n── ${vp.width}px ──`);
  for (const [k, v] of Object.entries(r)) {
    if (k === 'alturasDeCelda') continue;
    const stable = v.length === 1;
    if (!stable) ok = false;
    console.log(`  ${stable ? '✓' : '✗'} ${k.padEnd(12)} ${stable ? v[0] + 'px constante' : v.length + ' alturas distintas: ' + v.join(', ')}`);
  }
  const perCell = {};
  for (const s of r.alturasDeCelda) { const [i, h] = s.split(':'); (perCell[i] ||= []).push(+h); }
  const bad = Object.entries(perCell).filter(([, hs]) => new Set(hs).size > 1);
  if (bad.length) { ok = false; console.log('  ✗ celdas que cambian de alto:', bad.map(([i, hs]) => `#${i} ${[...new Set(hs)].join('/')}`).join(' · ')); }
  else console.log('  ✓ las 8 celdas mantienen su alto');
  console.log(ok ? '  → sin saltos' : '  → HAY SALTOS');
  if (!ok) globalThis.__jitterFail = true;
  await p.close();
}
await b.close();
if (globalThis.__jitterFail) process.exit(1);
