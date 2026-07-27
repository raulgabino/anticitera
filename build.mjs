/* Construye index.html: mete los módulos de src/ dentro de la plantilla, en orden.
   El resultado es un único archivo autocontenido, sin dependencias ni red. */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const ORDER = ['core.js', 'render.js', 'corte.js', 'letras.js', 'frag.js', 'ui.js', 'content.js'];

const app = ORDER.map(f => {
  const code = readFileSync(join(SRC, f), 'utf8');
  return `/* ===== src/${f} ===== */\n${code}`;
}).join('\n');

const tpl = readFileSync(join(SRC, 'index.html'), 'utf8');
if (!tpl.includes('/*__APP__*/')) throw new Error('falta el marcador /*__APP__*/ en src/index.html');

const out = tpl.replace('/*__APP__*/', app);
writeFileSync('index.html', out);

const kb = (out.length / 1024).toFixed(1);
console.log(`index.html  ${kb} KB  ·  ${ORDER.length} módulos  ·  0 dependencias`);
