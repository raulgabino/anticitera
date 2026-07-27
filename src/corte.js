/* ============================================================
   CORTE AXIAL — la tercera dimensión
   Espesores y profundidades totales: medidos por tomografía.
   Orden de las capas: reconstruido a partir de los engranamientos.
   ============================================================ */

/* la caja de madera, en mm */
const CASE = { deep: 100, tall: 190, wide: 315 };

/* bandas del corte, de atrás hacia delante (mm) */
const AXIAL = [
  { id: 'tapaAtras',  t: 1.0,  k: 'plate', lb: 'cubierta posterior' },
  { id: 'aireAtras',  t: 2.4,  k: 'air',   lb: '' },
  { id: 'dorso',      t: 8.3,  k: 'back',  lb: 'dorso · 5 planos en 8 mm' },
  { id: 'placa',      t: 2.0,  k: 'plate', lb: 'Placa Principal' },
  { id: 'b1',         t: 2.7,  k: 'b1',    lb: 'b1 · Rueda Motriz' },
  { id: 'frente1',    t: 15.0, k: 'front', lb: '9 capas · Mercurio y Venus', n: 9 },
  { id: 'strap',      t: 1.6,  k: 'strap', lb: 'la Correa, a 11°' },
  { id: 'frente2',    t: 9.7,  k: 'front', lb: '5 capas · los superiores', n: 5 },
  { id: 'cp',         t: 2.0,  k: 'plate', lb: 'Placa Circular' },
  { id: 'aireFrente', t: 2.6,  k: 'air',   lb: '' },
  { id: 'tapaFrente', t: 1.0,  k: 'plate', lb: 'cubierta frontal' }
];
const MECH_DEPTH = AXIAL.reduce((s, b) => s + b.t, 0);

/* engranes del dorso en sección: z desde la cara trasera de la Placa Principal */
const BACK_SECTION = [
  { g: 'b2', z: 0.2, t: 2.3, r: 15.3, ch: 'in' },
  { g: 'c1', z: 0.2, t: 1.5, r: 9.8,  ch: 'moon' },
  { g: 'l1', z: 0.2, t: 1.5, r: 8.6,  ch: 'trunk' },
  { g: 'c2', z: 2.7, t: 1.3, r: 10.7, ch: 'moon' },
  { g: 'd1', z: 2.7, t: 2.4, r: 5.4,  ch: 'moon' },
  { g: 'l2', z: 2.7, t: 1.5, r: 12.9, ch: 'trunk' },
  { g: 'm1', z: 2.7, t: 2.0, r: 24.1, ch: 'trunk' },
  { g: 'd2', z: 4.1, t: 1.3, r: 31.2, ch: 'moon' },
  { g: 'e2', z: 4.1, t: 1.0, r: 7.4,  ch: 'moon' },
  { g: 'm2', z: 4.1, t: 1.8, r: 3.9,  ch: 'cal' },
  { g: 'n1', z: 4.1, t: 1.3, r: 13.3, ch: 'cal' },
  { g: 'e3', z: 5.2, t: 1.4, r: 51.9, ch: 'anom' },
  { g: 'm3', z: 5.2, t: 1.4, r: 6.8,  ch: 'anom' },
  { g: 'n2', z: 5.2, t: 1.2, r: 11.9, ch: 'cal' },
  { g: 'o1', z: 5.2, t: 1.1, r: 12.5, ch: 'cal' },
  { g: 'e4', z: 5.6, t: 1.5, r: 49.5, ch: 'saros' },
  { g: 'e5', z: 5.7, t: 0.5, r: 12.6, ch: 'moon' },
  { g: 'k1', z: 5.7, t: 0.6, r: 13.0, ch: 'moon' },
  { g: 'f1', z: 5.6, t: 1.3, r: 13.2, ch: 'saros' },
  { g: 'f2', z: 5.6, t: 1.2, r: 7.8,  ch: 'saros' },
  { g: 'g1', z: 5.6, t: 1.5, r: 13.9, ch: 'saros' },
  { g: 'k2', z: 6.4, t: 0.5, r: 13.5, ch: 'moon' },
  { g: 'e6', z: 6.4, t: 0.6, r: 13.4, ch: 'moon' },
  { g: 'g2', z: 6.4, t: 1.6, r: 4.5,  ch: 'saros' },
  { g: 'h1', z: 6.4, t: 1.0, r: 13.4, ch: 'saros' },
  { g: 'h2', z: 6.4, t: 1.4, r: 3.4,  ch: 'saros' },
  { g: 'e1', z: 7.0, t: 1.3, r: 9.2,  ch: 'moon' },
  { g: 'b3', z: 7.0, t: 1.3, r: 8.7,  ch: 'in' },
  { g: 'i1', z: 7.0, t: 1.2, r: 12.9, ch: 'saros' },
  { g: 'p1', z: 7.0, t: 1.2, r: 15.0, ch: 'cal' },
  { g: 'p2', z: 7.0, t: 1.0, r: 3.0,  ch: 'cal' },
  { g: 'q1', z: 7.0, t: 1.2, r: 15.0, ch: 'cal' },
  { g: 'n3', z: 6.4, t: 1.0, r: 3.8,  ch: 'cal' }
];

/* Los engranes de la cara frontal, agrupados por mecanismo.
   R = distancia del árbol al eje central, en mm (Freeth & Jones 2012, Figs. 42–43).
   spoke = radio de b1 / de la Placa Circular sobre el que va montado: A=0°, B=90°, C=180°, D=270°.
   Los engranes fijos centrales (51, 49, 56) NO orbitan: se quedan en el eje. */
const FRONT_SECTION = {
  frente1: [
    { id: 'f51', R: 0,    spoke: 0,   ch: 'fix', g: [[1, 51]] },
    { id: 'mercurio', R: 26.8, spoke: 0,   ch: 'mer', g: [[2, 72], [3, 89], [4, 40], [5, 20]] },
    { id: 'venus',    R: 32.8, spoke: 180, ch: 'ven', g: [[2, 44], [3, 34], [4, 26], [5, 63]] },
    { id: 'f49', R: 0,    spoke: 0,   ch: 'fix', g: [[7, 49]] },
    { id: 'nodos',    R: 27.0, spoke: 90,  ch: 'nod', g: [[8, 62], [9, 64], [9, 48]] }
  ],
  frente2: [
    { id: 'f56', R: 0,    spoke: 0,   ch: 'fix', g: [[1, 56]] },
    { id: 'saturno',  R: 29.4, spoke: 0,   ch: 'sat', g: [[2, 52], [3, 61], [4, 40], [4, 68], [5, 86], [5, 86]] },
    { id: 'jupiter',  R: 37.8, spoke: 90,  ch: 'jup', g: [[2, 64], [3, 45], [4, 40], [4, 43], [5, 65], [5, 65]] },
    { id: 'marte',    R: 34.3, spoke: 180, ch: 'mar', g: [[2, 64], [3, 38], [4, 40], [4, 71], [5, 80], [5, 80]] },
    { id: 'solv',     R: 25.6, spoke: 270, ch: 'solv', g: [[2, 52], [3, 56]] }
  ]
};


/* el nido de tubos coaxiales, del eje hacia fuera (Freeth 2021) */
const TUBES = [
  { lb: 'Luna', sub: 'árbol central', col: '--luna' },
  { lb: 'Sol medio', sub: 'interno · mueve la fase', col: '--sol' },
  { lb: 'nodos', sub: 'Mano del Dragón', col: null },
  { lb: 'Mercurio', sub: '', col: '--mercurio' },
  { lb: 'Venus', sub: '', col: '--venus' },
  { lb: 'Sol verdadero', sub: 'esferita dorada', col: '--sol' },
  { lb: 'Marte', sub: '', col: '--marte' },
  { lb: 'Júpiter', sub: '', col: '--jupiter' },
  { lb: 'Saturno', sub: '', col: '--saturno' },
  { lb: 'fecha', sub: 'rígido a la Placa Circular', col: '--bronze' }
];
const TUBE_R = 8.8, ARBOR_R = 1.2;

let depthEx = 2.4;                 // exageración de la profundidad
const CHAIN_COL2 = { in: '#f0c069', moon: '#f0c069', trunk: '#f0c069', anom: '#f0c069',
  saros: '#f0c069', cal: '#f0c069', fix: '#cfa85f',
  mer: '#00a9a7', ven: '#708fe6', nod: '#9a907c', sat: '#6ca649', jup: '#c072c4',
  mar: '#e26a54', solv: '#d9a52a' };
const GEAR_DEPTH = 41.3;           // solo el engranaje, sin cubiertas ni aire

/* Trazado del corte: una sola función, para que resize() y drawCorte() nunca se desincronicen. */
function corteLayout(w) {
  const m = 11, TOP = 26;
  const LBW = w < 340 ? 96 : 112;
  const sR = Math.min((w - m * 2 - LBW) / 192, 2.2);      // RMAX = 96 mm de radio
  const p1h = Math.round(w * .30) + TOP;
  const secH = 48.3 * sR * depthEx;
  const p3h = Math.round(w * .52);
  const p2h = Math.round(26 + secH + 88);
  return { m, TOP, LBW, sR, sZ: sR * depthEx, p1h, p2h, p3h, secH, H: p1h + p2h + p3h };
}

/* La profundidad va en VERTICAL: el radio cabe a lo ancho y las etiquetas se leen de corrido. */
function drawCorte(o) {
  ctx.fillStyle = '#161615'; ctx.fillRect(0, 0, W, H);
  const F = Math.max(7.2, W * .0195), F2 = Math.max(6.4, W * .0175);
  const LO = corteLayout(W), m = LO.m;

  /* ---------- PANEL 1: la caja ---------- */
  const TOP = LO.TOP, p1h = LO.p1h;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, p1h); ctx.clip();
  {
    txt('LA CAJA EN SECCIÓN · 190 × 100 mm', m, TOP + 6, C.ink3, F, 'left');
    const s = Math.min((W - m * 2 - 96) / CASE.tall, (p1h - TOP - 34) / CASE.deep);
    const x0 = m, y0 = TOP + 18;
    ctx.fillStyle = '#26241f'; ctx.fillRect(x0, y0, CASE.tall * s, CASE.deep * s);
    ctx.strokeStyle = '#5c5546'; ctx.lineWidth = 1.2; ctx.strokeRect(x0, y0, CASE.tall * s, CASE.deep * s);
    const mw = 150 * s, mh = GEAR_DEPTH * s;
    const mx = x0 + (CASE.tall * s - mw) / 2, my = y0 + (CASE.deep * s - mh) / 2;
    ctx.fillStyle = 'rgba(201,154,74,.30)'; ctx.fillRect(mx, my, mw, mh);
    ctx.strokeStyle = C.bronze; ctx.lineWidth = 1; ctx.strokeRect(mx, my, mw, mh);
    txt('41.3 mm de engranaje', mx + mw / 2, my + mh / 2, C.bronzeHi, F2, 'center', 0, 700);
    txt('madera', x0 + 6, y0 + 8, '#8e877a', F2, 'left');
    const tx = x0 + CASE.tall * s + 10;
    txt('41 % del fondo', tx, y0 + 10, C.bronzeHi, F2, 'left', 0, 700);
    txt('el resto es madera,', tx, y0 + 10 + F2 * 1.7, C.ink3, F2, 'left');
    txt('aire y las cubiertas', tx, y0 + 10 + F2 * 3.1, C.ink3, F2, 'left');
    txt('grabadas', tx, y0 + 10 + F2 * 4.5, C.ink3, F2, 'left');
    hit('caja', x0 + CASE.tall * s / 2, y0 + CASE.deep * s / 2, 30);
  }
  ctx.restore();

  /* ---------- PANEL 2: el corte axial ---------- */
  const p2y = p1h, p2h = LO.p2h;
  ctx.save(); ctx.beginPath(); ctx.rect(0, p2y, W, p2h); ctx.clip();
  const RMAX = 96, LBW = LO.LBW, sR = LO.sR, sZ = LO.sZ;
  const axCx = m + (W - m * 2 - LBW) / 2;
  const totalZ = AXIAL.reduce((s2, b) => s2 + b.t, 0);
  const axY0 = p2y + 24;
  txt(`CORTE AXIAL · profundidad ×${depthEx.toFixed(1)} · radio 1:1`, m, p2y + 11, C.ink3, F, 'left');

  /* eje de simetría */
  line(axCx, axY0 - 8, axCx, axY0 + totalZ * sZ + 8, '#4d4a42', .7, [5, 4]);

  const bandY = {}, labels = [];
  let z = 0;
  for (const b of AXIAL) {
    const y = axY0 + z * sZ, hh = Math.max(.8, b.t * sZ);
    bandY[b.id] = [y, hh];
    if (b.k === 'plate' || b.k === 'strap') {
      const half = (b.id === 'placa' ? 92 : b.id === 'cp' ? 46 : b.id === 'strap' ? 30 : 95) * sR;
      ctx.save();
      if (b.k === 'strap') { ctx.translate(axCx, y + hh / 2); ctx.rotate(11 * D2R); ctx.translate(-axCx, -(y + hh / 2)); }
      ctx.fillStyle = '#4f4c44'; ctx.fillRect(axCx - half, y, half * 2, hh);
      ctx.strokeStyle = '#8e877a'; ctx.lineWidth = .8; ctx.strokeRect(axCx - half, y, half * 2, hh);
      ctx.restore();
      hit(b.id, axCx, y + hh / 2, Math.max(7, hh));
    }
    if (b.k === 'b1') {
      const r = 64.4 * sR;
      [-1, 1].forEach(sg => {
        ctx.fillStyle = 'rgba(201,154,74,.4)';
        ctx.fillRect(axCx + sg * r - 1.2 * sR, y, 2.4 * sR, hh);
        ctx.strokeStyle = C.bronze; ctx.lineWidth = .9;
        ctx.strokeRect(axCx + sg * r - 1.2 * sR, y, 2.4 * sR, hh);
        line(axCx + sg * 8 * sR, y + hh / 2, axCx + sg * r, y + hh / 2, C.bronze, Math.max(.9, hh * .3));
      });
      hit('b1', axCx + r, y + hh / 2, 10);
    }
    if (b.k === 'back') {
      for (const q of BACK_SECTION) {
        const gy = y + q.z * sZ, gh = Math.max(.9, q.t * sZ), gr = q.r * sR, col = CHAIN_COL2[q.ch];
        [-1, 1].forEach(sg => {
          ctx.fillStyle = col + '55';
          ctx.fillRect(axCx + sg * gr - .9 * sR, gy, 1.8 * sR, gh);
          ctx.strokeStyle = col; ctx.lineWidth = .5;
          ctx.strokeRect(axCx + sg * gr - .9 * sR, gy, 1.8 * sR, gh);
          line(axCx + sg * 2.2 * sR, gy + gh / 2, axCx + sg * gr, gy + gh / 2, col, .45);
        });
        hit(q.g, axCx + gr, gy + gh / 2, 7);
      }
      /* el perno de k1, que sí se mueve: a 9.6 mm de su eje, once vueltas al mes */
      {
        const thk = 13.14326 * o.T * TAU;
        const gy = y + 5.7 * sZ, px = 9.6 * Math.cos(thk) * sR;
        ctx.globalAlpha = .2;
        line(axCx - 9.6 * sR, gy + 1.5 * sZ, axCx + 9.6 * sR, gy + 1.5 * sZ, '#ff8f74', .8);
        ctx.globalAlpha = 1;
        dot(axCx + px, gy + 1.5 * sZ, Math.max(1.8, 1.1 * sR), '#ff8f74');
      }
      /* rótulos de los tres grandes */
      if (sZ > 5.5) [['e3', 51.9, 5.2, 'anom'], ['e4', 49.5, 5.6, 'saros'], ['d2', 31.2, 4.1, 'moon'],
       ['m1', 24.1, 2.7, 'trunk'], ['b2', 15.3, 0.2, 'in'], ['k1', 13.0, 5.7, 'moon'],
       ['k2', 13.5, 6.4, 'moon']].forEach(([g, rr, zz, ch]) => {
        txt(g, axCx - rr * sR - 8, y + zz * sZ + 3, CHAIN_COL2[ch], F2, 'right', 0, 700);
      });
    }
    if (b.k === 'front') {
      const set = FRONT_SECTION[b.id], pitch = b.t / b.n;
      /* b1 y la Placa Circular dan una vuelta al año: en el corte, cada bloque
         epicíclico se proyecta a R·cos(θ) y se ve acercarse y alejarse del eje. */
      const th = o.T * TAU;
      for (const blk of set) {
        const col = CHAIN_COL2[blk.ch];
        const px = blk.R === 0 ? 0 : blk.R * Math.cos(th + blk.spoke * D2R) * sR;
        const bx = axCx + px;
        /* recorrido del bloque, tenue */
        if (blk.R > 0) {
          const ry = y + (blk.g[0][0] - .85) * pitch * sZ - 2.6 * sR;
          ctx.globalAlpha = .16;
          line(axCx - blk.R * sR, ry, axCx + blk.R * sR, ry, col, .8);
          ctx.globalAlpha = 1;
        }
        for (const [lay, N] of blk.g) {
          const gy = y + (lay - .85) * pitch * sZ, gh = Math.max(.9, 1.3 * sZ), gr = N * .26 * sR;
          const sides = blk.R === 0 ? [-1, 1] : [-1, 1];
          sides.forEach(sg => {
            ctx.fillStyle = col + '4d';
            ctx.fillRect(bx + sg * gr - .9 * sR, gy, 1.8 * sR, gh);
            ctx.strokeStyle = col; ctx.lineWidth = .45;
            ctx.strokeRect(bx + sg * gr - .9 * sR, gy, 1.8 * sR, gh);
            line(bx + sg * 1.4 * sR, gy + gh / 2, bx + sg * gr, gy + gh / 2, col, .4);
          });
          if (blk.R > 0) dot(bx, gy + gh / 2, .9 * sR, col);
          if (N === 63) {                       // r1, Fragmento D: el único que sobrevive
            ctx.globalAlpha = .9;
            ring(bx + gr, gy + gh / 2, 3.4 * sR, C.bronzeHi, 1);
            ring(bx - gr, gy + gh / 2, 3.4 * sR, C.bronzeHi, 1);
            if (sZ > 5) txt('r1', bx + gr, gy - 4 * sR, C.bronzeHi, Math.max(6.4, W * .0175), 'center', 0, 700);
            ctx.globalAlpha = 1;
          }
        }
      }
      hit(b.id, axCx, y + hh / 2, Math.max(9, hh / 2));
    }
    if (b.lb) labels.push([y + hh / 2, b.lb, b.k === 'air' ? '#8e877a' : '#bcb3a2', b.id]);
    z += b.t;
  }

  /* pilares largos, de la Placa Principal a la Placa Circular */
  {
    const [py] = bandY.placa, pr = 56 * sR;
    [-1, 1].forEach(sg => {
      ctx.fillStyle = 'rgba(140,120,88,.32)';
      ctx.fillRect(axCx + sg * pr - 1.3 * sR, py, 2.6 * sR, 32.0 * sZ);
      ctx.strokeStyle = '#b8a87f'; ctx.lineWidth = .6;
      ctx.strokeRect(axCx + sg * pr - 1.3 * sR, py, 2.6 * sR, 32.0 * sZ);
    });
    hit('pilares', axCx + pr, py + 16 * sZ, 9);
  }

  /* los tubos de salida saliendo hacia el frente */
  {
    const [cy0, ch0] = bandY.cp, tr = TUBE_R * sR, out = bandY.tapaFrente[0] - cy0 - ch0;
    ctx.fillStyle = 'rgba(240,192,105,.16)';
    ctx.fillRect(axCx - tr, cy0 + ch0, tr * 2, out);
    ctx.strokeStyle = C.bronzeHi; ctx.lineWidth = .7;
    ctx.strokeRect(axCx - tr, cy0 + ch0, tr * 2, out);
    hit('tubos', axCx, cy0 + ch0 + out / 2, Math.max(8, out / 2));
  }

  /* etiquetas a la derecha, sin encimarse */
  {
    const lx = W - m - LBW + 8;
    let lastY = -99;
    ctx.font = `500 ${F2}px ui-sans-serif,-apple-system,sans-serif`;
    for (const [ly0, lb, col, id] of labels) {
      const ly = Math.max(ly0, lastY + F2 * 1.45); lastY = ly;
      line(axCx + RMAX * sR + 3, ly0, lx - 5, ly, '#5c574c', .5);
      /* recorta el texto al ancho disponible */
      let t = lb;
      while (ctx.measureText(t).width > LBW - 10 && t.length > 6) t = t.slice(0, -2);
      if (t !== lb) t = t.replace(/[ ·]+$/, '') + '…';
      txt(t, lx, ly, col, F2, 'left', 0, 600);
      hits.push({ id, x: lx + 20, y: ly, r: 12 });
    }
  }
  /* nota del movimiento */
  {
    const ny = axY0 + totalZ * sZ + 42;
    txt('el dorso no se mueve: sus ejes están fijos a la placa', axCx, ny, '#a49c8e', F2);
    txt('el frente sí: cada bloque epicíclico orbita y cruza el plano de corte', axCx, ny + F2 * 1.5, '#bcb3a2', F2);
  }
  /* regla de profundidad */
  {
    const y = axY0 + totalZ * sZ + 12, len = 10 * sZ;
    line(axCx - len / 2, y, axCx + len / 2, y, C.ink3, 1);
    line(axCx - len / 2, y - 3, axCx - len / 2, y + 3, C.ink3, 1);
    line(axCx + len / 2, y - 3, axCx + len / 2, y + 3, C.ink3, 1);
    txt('10 mm de profundidad', axCx, y + 10, C.ink3, F2);
  }
  ctx.restore();

  /* ---------- PANEL 3: el nido de tubos ---------- */
  const p3y = p2y + p2h, p3h = LO.p3h;
  ctx.save(); ctx.beginPath(); ctx.rect(0, p3y, W, p3h); ctx.clip();
  {
    txt('LOS 9 TUBOS COAXIALES · radio total 8.8 mm', m, p3y + 11, C.ink3, F, 'left');
    const rad = Math.min((p3h - 48) / 2, W * .19);
    const cxT = m + rad + 4, cyT = p3y + 26 + rad;
    const sT = rad / TUBE_R, wall = (TUBE_R - ARBOR_R) / TUBES.length;
    for (let i = TUBES.length - 1; i >= 0; i--) {
      const rr = (ARBOR_R + (i + 1) * wall) * sT;
      ctx.beginPath(); ctx.arc(cxT, cyT, rr, 0, TAU); ctx.fillStyle = '#1c1c1b'; ctx.fill();
      ring(cxT, cyT, rr, TUBES[i].col ? CSS(TUBES[i].col) : '#9a907c', 1.05);
    }
    ctx.beginPath(); ctx.arc(cxT, cyT, ARBOR_R * sT, 0, TAU); ctx.fillStyle = CSS('--luna'); ctx.fill();
    hit('tubos', cxT, cyT, rad);
    txt(`${wall.toFixed(2)} mm por tubo`, cxT, cyT + rad + 11, C.bronzeHi, F2);
    txt('pared más juego', cxT, cyT + rad + 11 + F2 * 1.5, C.ink3, F2);
    /* lista, del eje hacia fuera */
    const lx = cxT + rad + 12, step = Math.min(F2 * 1.62, (p3h - 40) / TUBES.length);
    const ly0 = p3y + 26 + Math.max(0, (p3h - 34 - step * TUBES.length) / 2);
    TUBES.forEach((t, i) => {
      const y = ly0 + i * step + step / 2;
      dot(lx, y, 2.5, t.col ? CSS(t.col) : '#9a907c');
      txt(`${i === 0 ? 'eje' : i}. ${t.lb}`, lx + 8, y, C.ink2, F2, 'left', 0, 600);
    });
  }
  ctx.restore();
}
