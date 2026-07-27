/* Que las 34 ruedas se puedan señalar con el dedo o el cursor.
   Las coaxiales comparten centro exacto: si la diana fuera un disco en el árbol,
   solo la mayor de cada eje sería alcanzable. Aquí se comprueba una por una. */
import { chromium } from 'playwright';

const FILE = 'file://' + new URL('../index.html', import.meta.url).pathname;
let fail = 0;
const br = await chromium.launch();

for (const [vw, vh, tag] of [[390, 844, 'teléfono 390px'], [900, 1000, 'escritorio 900px']]) {
  const pg = await br.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto(FILE);
  await pg.waitForTimeout(400);
  await pg.evaluate(() => { setView('gears'); select(null); });

  const cv = await pg.$('#cv');
  const box = await cv.boundingBox();

  /* dos puntos por rueda: su letra y su corona dentada */
  const targets = await pg.evaluate(() => {
    const out = [];
    for (const [id] of GEARS) {
      const lab = hits.find(h => h.id === id && h.ring === undefined);
      const rim = hits.find(h => h.id === id && h.ring !== undefined);
      if (lab) out.push({ id, k: 'letra', x: lab.x, y: lab.y });
      /* En el punto donde dos ruedas engranan sus coronas se tocan, así que ahí el
         empate es real. Se busca un ángulo de la corona que sea inequívoco. */
      if (rim) {
        let best = null;
        for (let i = 0; i < 72; i++) {
          const a = i / 72 * Math.PI * 2;
          const x = rim.x + rim.ring * Math.cos(a), y = rim.y + rim.ring * Math.sin(a);
          if (pick({ x, y }) === id) { best = { id, k: 'corona', x, y }; break; }
        }
        out.push(best || { id, k: 'corona', x: rim.x + rim.ring, y: rim.y });
      }
    }
    return out;
  });

  const bad = [];
  for (const t of targets) {
    await pg.mouse.click(box.x + t.x, box.y + t.y);
    const got = await pg.evaluate(() => sel);
    if (got !== t.id) bad.push(`${t.id} por ${t.k} → ${got}`);
    await pg.evaluate(() => select(null));
  }

  const scan = await pg.evaluate(() => {
    const cv = document.getElementById('cv');
    const seen = new Set();
    for (let x = 0; x < cv.clientWidth; x += 2)
      for (let y = 0; y < cv.clientHeight; y += 2) { const b = pick({ x, y }); if (b) seen.add(b); }
    return GEARS.map(g => g[0]).filter(i => !seen.has(i));
  });

  console.log(`── ${tag} ──`);
  console.log(`  ${targets.length} dianas probadas con clic real · ${bad.length ? '✗ ' + bad.join(', ') : '✓ todas seleccionan su propia rueda'}`);
  console.log(`  barrido del lienzo: ${scan.length ? '✗ inalcanzables ' + scan.join(' ') : '✓ las 34 ruedas son alcanzables'}`);
  if (errs.length) console.log('  ✗ errores de consola: ' + errs.join(' | '));
  fail += bad.length + scan.length + errs.length;
  await pg.close();
}
await br.close();
console.log(fail ? `\n✗ ${fail} fallos` : '\n✓ sin fallos');
process.exit(fail ? 1 : 0);
