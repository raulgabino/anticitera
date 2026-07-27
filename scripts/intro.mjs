/* La portada: que aparezca, que se quite, que vuelva, y que su imagen
   sea el lienzo de verdad y no una captura guardada. */
import { chromium } from 'playwright';

const FILE = 'file://' + new URL('../index.html', import.meta.url).pathname;
const br = await chromium.launch();
const pg = await br.newPage({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 2 });
const errs = []; pg.on('pageerror', e => errs.push(String(e)));
await pg.goto(FILE);
await pg.waitForTimeout(600);

const pinta = async () => pg.evaluate(() => {
  const c = document.getElementById('introShot');
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let n = 0; for (let i = 0; i < d.length; i += 4000) if (d[i] > 12) n++;
  return n;
});

const t = [];
t.push(['aparece al abrir', await pg.isVisible('#intro')]);
t.push(['bloquea el desplazamiento', await pg.evaluate(() => document.body.classList.contains('locked'))]);
t.push(['su imagen trae la máquina dibujada', (await pinta()) > 0]);
await pg.click('#introGo'); await pg.waitForTimeout(400);
t.push(['«Girar la manivela» la quita', await pg.evaluate(() => getComputedStyle(document.getElementById('intro')).display === 'none')]);
t.push(['devuelve el desplazamiento', await pg.evaluate(() => !document.body.classList.contains('locked'))]);
await pg.evaluate(() => { setView('gears'); select('e5'); });
t.push(['la máquina responde debajo', (await pg.evaluate(() => sel)) === 'e5']);
await pg.evaluate(() => select(null));
await pg.click('#introBack'); await pg.waitForTimeout(400);
t.push(['el pie la vuelve a abrir', await pg.isVisible('#intro')]);
t.push(['al reabrir redibuja la vista actual', (await pinta()) > 0]);
await pg.keyboard.press('Escape'); await pg.waitForTimeout(400);
t.push(['Escape la cierra', await pg.evaluate(() => document.getElementById('intro').classList.contains('gone'))]);

t.forEach(([n, ok]) => console.log(`  ${ok ? '✓' : '✗'} ${n}`));
console.log(errs.length ? '  ✗ errores: ' + errs.join(' | ') : '  ✓ sin errores de consola');
await br.close();
const bad = t.filter(x => !x[1]).length + errs.length;
console.log(bad ? `\n✗ ${bad} fallos en la portada` : '\n✓ portada correcta');
process.exit(bad ? 1 : 0);
