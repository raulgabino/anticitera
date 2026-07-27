/* ============================================================
   LOS 82 FRAGMENTOS
   Área (cm²) y peso (g) de los 82: Freeth et al. 2006,
   Nature 444, Notas Suplementarias 1, pp. 2–3 — el único
   conjunto completo de medidas que existe.
   Recuadros envolventes (mm) donde están publicados:
   IAM 3.2, 4.2, 5.2 y 6.2, Almagest 7.1 (2016); D en Price 1974.
   Tamaño real. La forma no: nadie ha publicado los contornos.
   ============================================================ */

/* id: [área cm², peso g, ancho mm, alto mm, grosor mm, clase] · null = no publicado
   clases: G engranes · D escalas de dial · I inscripción · P sin inscripción · U sin ubicar */
const FRAG = {
  A:[224.209,369.1,164,174,55,'G'], B:[66.692,99.4,98,111,20,'D'], C:[65.767,63.8,106,96,22,'D'],
  D:[15.491,15.0,40,40,8.5,'G'], E:[12.623,22.1,61,37,14,'I'], F:[50.197,86.2,94,80,35,'D'],
  G:[68.757,31.7,115,94,7.6,'I'],
  1:[39.189,62.5,null,null,null,'P'], 2:[16.018,15.3,null,null,null,'P'],
  3:[14.154,23.5,null,null,null,'P'], 4:[12.195,9.6,null,null,null,'P'],
  5:[8.041,6.2,null,null,null,'P'], 6:[7.166,10.9,null,null,null,'P'],
  7:[5.846,7.0,null,null,null,'P'], 8:[5.383,3.2,null,null,2.0,'P'],
  9:[3.512,1.7,21,23,3.2,'I'], 10:[2.296,1.2,null,null,null,'P'], 11:[1.262,0.7,null,null,null,'P'],
  12:[1.878,0.6,null,null,null,'P'], 13:[1.062,0.2,null,null,null,'P'], 14:[1.091,0.2,null,null,null,'P'],
  15:[0.733,0.1,null,null,null,'P'], 16:[0.629,0.3,null,null,null,'P'], 17:[0.658,0.2,null,null,null,'P'],
  18:[0.438,0.1,null,null,null,'P'], 19:[12.822,5.2,50,40,1.58,'I'], 20:[5.920,2.2,36,27,1.24,'I'],
  21:[5.651,2.0,45,26,1.0,'I'], 22:[9.547,2.7,47,32,1.6,'I'], 23:[7.570,5.8,28,35,6.9,'I'],
  24:[2.153,0.5,13,29,1.0,'I'], 25:[1.945,0.6,19,21,1.0,'I'], 26:[2.951,1.1,26,20,2.6,'I'],
  27:[2.873,1.5,18,25,5.3,'I'], 28:[3.379,1.1,20,25,2.8,'I'], 29:[3.402,1.0,23,23,2.1,'I'],
  30:[1.385,0.3,null,null,1.5,'P'], 31:[9.414,15.8,null,null,null,'P'], 32:[8.585,14.9,null,null,null,'P'],
  33:[2.170,1.1,null,null,null,'P'], 34:[0.286,0.05,null,null,null,'P'], 35:[0.222,0.1,null,null,null,'P'],
  36:[0.180,0.1,null,null,null,'P'], 37:[2.027,0.7,23,38,1.6,'I'], 38:[1.575,0.5,36,18,1.5,'I'],
  39:[1.376,0.4,27,20,null,'I'], 40:[1.026,0.3,28,16,null,'I'], 41:[1.228,0.5,23,23,1.7,'I'],
  42:[0.724,0.2,20,14,null,'U'], 43:[1.079,0.3,22,21,null,'I'], 44:[0.954,0.4,26,17,null,'I'],
  45:[1.660,0.6,null,null,1.5,'U'], 46:[0.592,0.2,null,null,null,'U'], 47:[0.911,0.3,null,null,null,'U'],
  48:[0.395,0.1,null,null,null,'U'], 49:[0.489,0.1,9,8,null,'I'], 50:[0.322,0.1,null,null,null,'U'],
  51:[1.108,0.2,13,14,1.5,'U'], 52:[0.781,0.3,null,null,1.9,'U'], 53:[0.849,0.3,null,null,2.1,'U'],
  54:[0.651,0.2,10,12,1.7,'I'], 55:[0.881,0.2,10,14,1.0,'I'], 56:[0.497,0.2,7,9,null,'I'],
  57:[0.346,0.1,null,null,null,'U'], 58:[0.565,0.2,null,null,null,'U'], 59:[0.285,0.1,null,null,null,'U'],
  60:[0.604,0.1,10,11,1.0,'I'], 61:[0.456,0.1,null,null,null,'U'], 62:[0.357,0.1,null,null,null,'U'],
  63:[0.334,0.1,null,null,null,'U'], 64:[0.237,0.05,null,null,null,'U'], 65:[0.266,0.05,null,null,null,'U'],
  66:[0.208,0.1,null,null,null,'U'], 67:[0.528,0.2,10,10,null,'I'], 68:[0.208,0.1,null,null,null,'U'],
  69:[0.187,0.05,null,null,null,'U'], 70:[0.238,0.05,null,null,null,'U'], 71:[0.270,0.1,null,null,null,'U'],
  72:[0.270,0.1,null,null,null,'U'], 73:[0.485,0.1,null,null,null,'U'], 74:[0.201,0.1,null,null,null,'U'],
  75:[0.146,0.1,null,null,null,'U']
};
/* Rampa ordinal de un solo tono: cuánto nos dice cada trozo, de más a menos. */
const FRAG_CLASS = {
  G: { lb: 'con engranes dentro · 4',  col: '#f0c069', dash: [], leg: 1 },
  D: { lb: 'escalas de dial',          col: '#b5904e', dash: [], leg: 0 },
  I: { lb: 'con texto o escalas · 26', col: '#b5904e', dash: [], leg: 1 },
  P: { lb: 'sin nada legible · 52',    col: '#7d776d', dash: [], leg: 1 },
  U: { lb: 'texto sin ubicar',         col: '#7d776d', dash: [3, 2], leg: 0 }
};
const FRAG_NOTE = {
  A: 'El terrón. <b>27 de los 30 engranes</b> están aquí dentro, más la mitad inferior de la Placa Posterior con parte del dial del Saros y <b>el dial del exeligmós entero</b>. Solo, es el 31 % de la superficie y el <b>41 % del peso</b> de todo lo que queda. Lleva la marca de pieza <b>Ξ</b> (60), tumbada de lado.',
  B: 'Un tercio de la espiral metónica y <b>el dial de los Juegos completo</b>, con su engrane o1 de 60 dientes debajo. Encima, una capa de concreción que guarda la impresión en espejo de la primera parte de la Inscripción de la Cubierta Posterior. Price dedujo en 1958 que A y B eran contiguos, y lo confirmó en 1961 encajándolos físicamente.',
  C: 'La esquina del Plato Frontal: <b>algo menos de un cuarto</b>. Trae la quinta parte de la escala zodiacal y la quinta parte del calendario egipcio, todas las inscripciones del dial frontal y el parapegma. También la Caja de la Luna —65 mm de diámetro— y el engrane q1. De aquí se desprendió, hacia 1905, el Fragmento G y todo el grupo pequeño de la Cubierta Frontal. Marca de pieza <b>Τ</b> (300), dos veces.',
  D: 'Una masa calcificada de unos 40 mm con <b>un solo engrane dentro: r1, de 63 dientes</b>. Es el fragmento que Freeth identifica en 2021 con el epiciclo de Venus, y es el único engrane de toda la cara frontal que existe. Se perdió dentro del museo y no reapareció hasta <b>marzo de 1973</b>. Lleva la marca <b>ΜΕ</b> (45), grabada en el engrane y otra vez en el disco remachado.',
  E: 'Tres capas superpuestas: Placa Posterior con parte del dial del Saros y su inscripción, encima la capa con la impresión de la Cubierta Posterior, y encima la placa de la cubierta. Estaba pegado al dorso de A y ya se había desprendido en 1902. Lo encontró Petros Kalligas el 4 de abril de 1976 <b>en un almacén de cerámica del sótano del museo</b> — no buceando, como suele contarse.',
  F: 'Parte del dial del Saros y su inscripción, todo bajo la pátina. Estaba justo debajo de A. Lo descubrió <b>Mary Zafeiropoulou en 2005</b>, catalogando los 79 fragmentos que no estaban expuestos: conservaba intactas sus concreciones marinas de 1901. Con él el inventario llegó a 82.',
  G: 'La Inscripción de la Cubierta Frontal, líneas 1 a 36 — donde están el 462 de Venus y el 442 de Saturno. No es una pieza: está <b>armado con unos veinte trozos</b>, el mayor de 48 × 51 mm. Se separó de C hacia 1905. Tiene una gran entrada en el lado derecho donde encaja el fragmento 26.',
  1: 'El más grande de los numerados y <b>el octavo de los 82</b>: 39 cm², 62.5 g, más que D o E. Y sin embargo <b>falta en la figura publicada</b> de la edición de 2016, que dice mostrar «los 82 fragmentos» y solo dibuja 81. Por su posición debería ir en el grupo de los que no llevan inscripción.',
  9: 'Parapegma, columna i. Conserva <b>el borde superior original de la placa</b>, un canto recto paralelo al texto. No aparece en ninguna fotografía anterior a 2005 y no se menciona en <i>Gears from the Greeks</i>: es un fragmento que solo existe para la ciencia desde la tomografía.',
  19: 'Una pieza ovalada de unos 50 × 40 mm: <b>el trozo más grande que se conserva de la placa de la Cubierta Posterior</b>. No estaba suelto — lo arrancaron de A durante la conservación de Rousopoulos, hacia 1905, dejando atrás la impresión en espejo del texto.',
  20: 'Parapegma. Dos trozos de placa superpuestos, ambos con bordes originales rectos que se cruzan a unos 10°, y <b>un agujero circular taladrado</b> con el resto de un pasador. Estaba en el punto medio exacto del canto superior de la placa inferior.',
  22: 'Parapegma, columnas iii y iv. Es el fragmento (v) de Price. No conserva ningún borde original.',
  28: 'Parapegma: cinco líneas que <b>nadie ha logrado ubicar</b>. Es el fragmento (iv) de Price, y hay una anécdota: «Price y Stamires tuvieron dificultad para leer el texto, y su intento de transcripción tiene el fragmento <b>orientado al revés</b>».',
  67: 'Diez milímetros por diez. Un trocito de la Cubierta Posterior, también arrancado de A en 1905.',
  75: 'El más pequeño de los 82: 0.146 cm² y una décima de gramo. Equivale a un cuadrado de <b>3.8 mm de lado</b>.'
};

let fragSel = null;

function fragDims(id) {                       // devuelve [ancho, alto] en mm
  const f = FRAG[id];
  if (f[2] && f[3]) return [f[2], f[3]];
  const s = Math.sqrt(f[0]) * 10;             // cuadrado de área equivalente
  return [s, s];
}

function drawFrag(o) {
  ctx.fillStyle = '#161615'; ctx.fillRect(0, 0, W, H);
  const F = Math.max(7.2, W * .0195), F2 = Math.max(6.4, W * .0175), m = 12, TOP = 32;

  /* ---------- barra de proporciones ---------- */
  const totA = Object.values(FRAG).reduce((s, f) => s + f[0], 0);
  const totW = Object.values(FRAG).reduce((s, f) => s + f[1], 0);
  txt(`${totA.toFixed(0)} cm² DE SUPERFICIE · ${totW.toFixed(0)} g DE BRONCE, EN TOTAL`, m, TOP, C.ink3, F, 'left');
  let by = TOP + 16;
  {
    const bw = W - m * 2, bh = 16;
    const seg = [['A', FRAG.A[0], '#f0c069'], ['G', FRAG.G[0], '#b5904e'], ['B', FRAG.B[0], '#b5904e'],
      ['C', FRAG.C[0], '#b5904e'], ['F', FRAG.F[0], '#b5904e'], ['1', FRAG[1][0], '#7d776d']];
    const resto = totA - seg.reduce((s, x) => s + x[1], 0);
    seg.push(['los otros 76', resto, '#514d45']);
    let x = m;
    for (const [lb, a, col] of seg) {
      const w = a / totA * bw - 2;
      ctx.fillStyle = col; ctx.fillRect(x, by, w, bh);
      if (w > 22) txt(lb, x + w / 2, by + bh / 2, '#171716', F2, 'center', 0, 700);
      x += w + 2;
    }
    txt('Fragmento A: 31 % de la superficie, 41 % del peso', m, by + bh + 10, C.bronzeHi, F2, 'left', 0, 700);
    txt('38 de los 82 miden menos de 1 cm²', W - m, by + bh + 10, C.ink3, F2, 'right');
    by += bh + 24;
  }

  /* ---------- los 82 a escala ---------- */
  txt('A ESCALA, ORDENADOS POR TAMAÑO · el recuadro es la medida real; la forma no se conoce',
      m, by + 4, C.ink3, F2, 'left');
  by += 16;

  const ids = Object.keys(FRAG).sort((a, b) => FRAG[b][0] - FRAG[a][0]);
  /* escala: el ancho de A más un margen debe caber en media anchura */
  const availW = W - m * 2;
  let s = Math.min(availW / 250, (H - by - 26) / 340);
  const gap = 5;
  /* empaquetado por filas */
  let rows = [], row = [], rowW = 0, rowH = 0;
  for (const id of ids) {
    const [w, h] = fragDims(id), pw = w * s, ph = h * s;
    if (rowW + pw > availW && row.length) { rows.push({ row, rowH }); row = []; rowW = 0; rowH = 0; }
    row.push({ id, pw, ph }); rowW += pw + gap; rowH = Math.max(rowH, ph);
  }
  if (row.length) rows.push({ row, rowH });
  const totalH = rows.reduce((t, r) => t + r.rowH + gap, 0);
  if (by + totalH > H - 22) { s *= (H - 22 - by) / totalH; return drawFragAt(by, s, ids, m, availW, F2); }
  drawFragAt(by, s, ids, m, availW, F2);
}

function drawFragAt(by, s, ids, m, availW, F2) {
  const gap = 5;
  let rows = [], row = [], rowW = 0, rowH = 0;
  for (const id of ids) {
    const [w, h] = fragDims(id), pw = w * s, ph = h * s;
    if (rowW + pw > availW && row.length) { rows.push({ row, rowH }); row = []; rowW = 0; rowH = 0; }
    row.push({ id, pw, ph }); rowW += pw + gap; rowH = Math.max(rowH, ph);
  }
  if (row.length) rows.push({ row, rowH });

  let y = by;
  for (const r of rows) {
    let x = m;
    for (const it of r.row) {
      const f = FRAG[it.id], cls = FRAG_CLASS[f[5]], known = f[2] && f[3];
      const sel = fragSel === it.id;
      const yy = y + (r.rowH - it.ph) / 2;
      /* recuadro envolvente */
      ctx.strokeStyle = cls.col; ctx.lineWidth = sel ? 1.6 : .7;
      ctx.globalAlpha = fragSel && !sel ? .3 : (known ? 1 : .55);
      ctx.setLineDash(cls.dash.length ? cls.dash : (known ? [] : [2, 2]));
      ctx.strokeRect(x, yy, it.pw, it.ph);
      ctx.setLineDash([]);
      /* área real medida, como relleno proporcional dentro del recuadro */
      const boxA = (it.pw * it.ph), realA = f[0] * 100 * s * s;
      const k = Math.sqrt(Math.min(1, realA / boxA));
      ctx.fillStyle = cls.col + (sel ? '66' : '33');
      ctx.fillRect(x + it.pw * (1 - k) / 2, yy + it.ph * (1 - k) / 2, it.pw * k, it.ph * k);
      if (it.pw > 15 && it.ph > 10)
        txt(String(it.id), x + it.pw / 2, yy + it.ph / 2, sel ? '#fff' : C.ink2,
            Math.min(12, Math.max(6.2, it.pw * .22)), 'center', 0, 700);
      ctx.globalAlpha = 1;
      hit('frag_' + it.id, x + it.pw / 2, yy + it.ph / 2, Math.max(6, Math.min(it.pw, it.ph) / 2));
      x += it.pw + gap;
    }
    y += r.rowH + gap;
  }
  /* leyenda */
  let lx = m;
  const fs = Math.max(7, W * .0185);
  ctx.font = `600 ${fs}px ui-sans-serif,-apple-system,sans-serif`;
  for (const k of ['G', 'I', 'P']) {
    const t = FRAG_CLASS[k].lb, wd = ctx.measureText(t).width;
    if (lx + wd + 22 > W - m) { lx = m; y += fs + 5; }
    dot(lx + 3, y + 8, 2.6, FRAG_CLASS[k].col);
    txt(t, lx + 9, y + 8, C.ink3, fs, 'left');
    lx += wd + 22;
  }
  txt('línea punteada = solo se publicó su área, no sus medidas', m, y + 8 + fs + 6, '#8e877a', F2, 'left');
}
