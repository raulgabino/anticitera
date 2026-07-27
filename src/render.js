/* ============================================================
   DIBUJO — todo a escala de las medidas tomográficas
   ============================================================ */
const cv = document.getElementById('cv'), ctx = cv.getContext('2d');
let W = 0, H = 0, DPR = 1, view = 'front', hits = [], sel = null, calRingOffset = CAL.sun, gearsByFrag = false;

const CSS = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim();
let C = {};
function loadColors() {
  C = { bronze: CSS('--bronze'), bronzeHi: CSS('--bronze-hi'), patina: CSS('--patina'),
    ink: CSS('--ink'), ink2: CSS('--ink2'), ink3: CSS('--ink3'), line: CSS('--line'),
    luna: CSS('--luna'), surface: CSS('--surface'),
    mercurio: CSS('--mercurio'), venus: CSS('--venus'), sol: CSS('--sol'),
    marte: CSS('--marte'), jupiter: CSS('--jupiter'), saturno: CSS('--saturno'),
    ev: [CSS('--ev1'), CSS('--ev2'), CSS('--ev3'), CSS('--ev4')] };
}
loadColors();

const ASPECT = { front: 1.12, back: 1.76, gears: 1.20, corte: 1.95, letras: 1.78, frag: 1.14 };
function resize() {
  const w = cv.parentElement.clientWidth;
  DPR = Math.min(window.devicePixelRatio || 1, 2.5);
  W = w;
  if (view === 'corte') { const L = corteLayout(w); H = L.H; }
  else H = Math.round(w * ASPECT[view]);
  cv.width = W * DPR; cv.height = H * DPR;
  cv.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

/* helpers ------------------------------------------------- */
const P = (cx, cy, r, lon) => { const a = (lon - 90) * D2R; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
function ring(cx, cy, r, col, w, dash) {
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU);
  ctx.strokeStyle = col; ctx.lineWidth = w || 1;
  ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function line(x1, y1, x2, y2, col, w, dash) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = col; ctx.lineWidth = w || 1;
  ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function dot(x, y, r, col) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = col; ctx.fill(); }
const tanRot = lon => (n360(lon) > 90 && n360(lon) < 270 ? lon + 180 : lon) * D2R;
function txt(s, x, y, col, size, align, rot, weight) {
  ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot);
  ctx.fillStyle = col; ctx.font = `${weight || 500} ${size}px ui-sans-serif,-apple-system,"Segoe UI",sans-serif`;
  ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, 0); ctx.restore();
}
/* Dianas del lienzo.
   hit()     = disco: se acierta si el toque cae a menos de r del centro.
   hitRing() = corona: se acierta si el toque cae a menos de tol del radio R.
   La corona existe porque las ruedas coaxiales comparten centro exacto: un disco
   en el árbol solo dejaba tocar la mayor de cada eje y las otras eran inalcanzables.
   pri rompe empates antes que la distancia: 2 = etiqueta, 1 = corona, 0 = todo lo demás. */
function hit(id, x, y, r, pri) { hits.push({ id, x, y, r, pri: pri || 0 }); }
function hitRing(id, x, y, R, tol, pri) { hits.push({ id, x, y, r: tol, ring: R, pri: pri || 0 }); }
const SCALE_IDS = new Set(['zodiaco', 'calendario']);
const dim = id => !sel || sel === id ? 1 : (SCALE_IDS.has(id) ? 0.72 : 0.2);

/* plato de bronce con pátina */
function plate(cx, cy, r) {
  const g = ctx.createRadialGradient(cx - r * .3, cy - r * .35, r * .05, cx, cy, r * 1.05);
  g.addColorStop(0, '#2c2b29'); g.addColorStop(.55, '#232322'); g.addColorStop(1, '#1a1a19');
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fillStyle = g; ctx.fill();
  ring(cx, cy, r, '#4d4a42', 1.5);
}

/* ============================================================
   CARA FRONTAL — el cosmos, según la reconstrucción activa
   ============================================================ */
const EVOF = { nodos: 4, sol: 2, luna: 1, fecha: 2 };
function evOf(id) {
  if (EVOF[id]) return EVOF[id];
  const p = PLANETS.find(q => q.id === id);
  return p ? p.ev : 3;
}

function drawFront(o) {
  const MD = MODELS[MK], LAY = MD.lay;
  const cx = W / 2, cy = W * .565, R = W * .452;
  ctx.clearRect(0, 0, W, H);
  plate(cx, cy, R);

  /* — anillo del calendario egipcio (móvil) — */
  const calO = R, calI = R * .885;
  ring(cx, cy, calO, '#6b6559', 1); ring(cx, cy, calI, '#6b6559', 1);
  ctx.globalAlpha = dim('calendario');
  for (let d = 0; d < 365; d++) {
    const lon = calRingOffset + d / 365 * 360;
    const big = d % 30 === 0, [x1, y1] = P(cx, cy, calI, lon), [x2, y2] = P(cx, cy, big ? calO : calI + (calO - calI) * .42, lon);
    line(x1, y1, x2, y2, big ? '#b8a87f' : '#786f5e', big ? 1.2 : .5);
  }
  for (let m = 0; m < 12; m++) {
    const lon = calRingOffset + (m * 30 + 15) / 365 * 360;
    const [x, y] = P(cx, cy, (calO + calI) / 2, lon);
    const surv = SURVIVING_EGYPT.has(m);
    txt(EGYPT[m], x, y, surv ? '#d8cba7' : '#8e877a', Math.max(6.2, W * .0182), 'center', tanRot(lon), surv ? 700 : 500);
  }
  { const lon = calRingOffset + 362.5 / 365 * 360, [x, y] = P(cx, cy, (calO + calI) / 2, lon);
    txt('ΕΠΑΓ', x, y, '#8e877a', Math.max(5.6, W * .0158), 'center', tanRot(lon), 600); }
  ctx.globalAlpha = 1;
  hit('calendario', ...P(cx, cy, (calO + calI) / 2, calRingOffset + 90), R * .1);

  /* — anillo zodiacal (fijo, 360°, sentido horario) — */
  const zO = calI - 3, zI = calI - W * .105;
  ring(cx, cy, zO, '#6b6559', 1); ring(cx, cy, zI, '#6b6559', 1);
  ctx.globalAlpha = dim('zodiaco');
  for (let d = 0; d < 360; d++) {
    const big = d % 30 === 0, mid = d % 10 === 0;
    const [x1, y1] = P(cx, cy, zI, d), [x2, y2] = P(cx, cy, zI + (zO - zI) * (big ? 1 : mid ? .45 : .22), d);
    line(x1, y1, x2, y2, big ? '#b8a87f' : '#786f5e', big ? 1.2 : .5);
  }
  const sunLon = MD.trueSun ? o.trueSun : o.meanSun;
  for (let s = 0; s < 12; s++) {
    const lon = s * 30 + 15, [x, y] = P(cx, cy, (zO + zI) / 2, lon);
    const surv = SURVIVING_ZODIAC.has(s);
    txt(ZODIAC[s][0], x, y, s === Math.floor(sunLon / 30) ? C.bronzeHi : (surv ? '#d8cba7' : '#8e877a'),
        Math.max(6, W * .0175), 'center', tanRot(lon), surv ? 700 : 500);
  }
  /* las 13 letras índice del parapegma que sobreviven, en su grado real */
  ctx.globalAlpha = dim('zodiaco') * .95;
  for (const q of INDEX_LETTERS) {
    const [x, y] = P(cx, cy, zI - 5.5, q.lon);
    txt(q.L, x, y, C.patina, Math.max(5.4, W * .0152), 'center', tanRot(q.lon), 700);
  }
  ctx.globalAlpha = 1;
  hit('zodiaco', ...P(cx, cy, (zO + zI) / 2, 15), R * .09);

  const ZOUT = R * .772;   // hasta dónde llega un puntero que se lee contra el zodiaco

  /* — caminos: anillos si el modelo son anillos — */
  if (MD.style === 'rings') for (const id in LAY) {
    const ev = evOf(id);
    ctx.globalAlpha = dim(id) * .5;
    ring(cx, cy, R * LAY[id], C.ev[ev - 1], ev >= 3 ? .8 : 1, ev === 4 ? [2, 3] : ev === 3 ? [5, 3] : []);
    ctx.globalAlpha = 1;
  }

  /* — nodos: la Mano del Dragón (solo Freeth 2021) — */
  if (MD.nodes) {
    ctx.globalAlpha = dim('nodos');
    const [x1, y1] = P(cx, cy, ZOUT, o.node), [x2, y2] = P(cx, cy, ZOUT, o.node + 180);
    line(x1, y1, x2, y2, '#9a907c', 1, [4, 4]);
    [o.node, o.node + 180].forEach((L, i) => {
      const [x, y] = P(cx, cy, R * LAY.nodos, L);
      dot(x, y, 3.4, '#9a907c'); dot(x, y, 1.6, '#1a1a19');
      txt(i ? '☋' : '☊', ...P(cx, cy, R * .81, L), '#9a907c', Math.max(8, W * .026));
    });
    ctx.globalAlpha = 1;
    hit('nodos', ...P(cx, cy, R * LAY.nodos, o.node), 13);
  }

  /* — planetas — */
  for (const p of PLANETS) {
    const rr = R * LAY[p.id], col = C[p.id], st = o.planets[p.id];
    if (MD.style === 'pointers') {          // puntero radial hasta el zodiaco
      ctx.globalAlpha = dim(p.id) * .75;
      const [zx, zy] = P(cx, cy, ZOUT, st.lon);
      line(cx, cy, zx, zy, col, sel === p.id ? 1.5 : .9);
    } else {                                 // estela de 20 días sobre el anillo
      ctx.beginPath();
      for (let i = 0; i <= 10; i++) {
        const tt = o.T - (10 - i) * 2 / M.yearDays;
        const L = (CAL.helio[p.id] + 360 * tt / p.P) * D2R, ms = (n360(CAL.sun + 360 * tt) - 180) * D2R;
        const gx = p.au * Math.cos(L) - Math.cos(ms), gy = p.au * Math.sin(L) - Math.sin(ms);
        const [x, y] = P(cx, cy, rr, n360(Math.atan2(gy, gx) * R2D));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = col; ctx.globalAlpha = dim(p.id) * .45; ctx.lineWidth = 2.4;
      ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt';
      if (sel === p.id) { const [zx, zy] = P(cx, cy, ZOUT, st.lon); line(cx, cy, zx, zy, col, .8, [2, 4]); }
    }
    ctx.globalAlpha = dim(p.id);
    const [x, y] = P(cx, cy, rr, st.lon);
    if (st.retro) { ring(x, y, 6.2, col, 1.4); dot(x, y, 2.2, col); }
    else dot(x, y, MD.style === 'pointers' ? 4.6 : 4.2, col);
    ctx.globalAlpha = 1;
    hit(p.id, x, y, 15);
  }

  /* — Sol verdadero: esferita de oro con su rayo — */
  if (MD.trueSun) {
    const rr = R * LAY.sol, [x, y] = P(cx, cy, rr, o.trueSun);
    ctx.globalAlpha = dim('sol');
    const [zx, zy] = P(cx, cy, ZOUT, o.trueSun);
    line(cx, cy, zx, zy, C.sol, 1.1);
    const g = ctx.createRadialGradient(x - 1.5, y - 1.5, .5, x, y, 7);
    g.addColorStop(0, '#ffe9a8'); g.addColorStop(.55, '#e8b552'); g.addColorStop(1, '#8a6510');
    ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fillStyle = g; ctx.fill();
    ctx.globalAlpha = 1; hit('sol', x, y, 16);
  }

  /* — puntero de fecha (Sol medio) hasta el anillo del calendario — */
  {
    ctx.globalAlpha = dim('fecha');
    const [x, y] = P(cx, cy, calI + (calO - calI) * .55, o.meanSun);
    const from = MD.trueSun ? R * .80 : 0;
    const [xa, ya] = P(cx, cy, from, o.meanSun);
    line(xa, ya, x, y, C.bronze, 1.6);
    if (LAY.fecha) { const [mx, my] = P(cx, cy, R * LAY.fecha, o.meanSun); dot(mx, my, 4.2, C.bronze); }
    dot(x, y, 2.6, C.bronzeHi);
    ctx.globalAlpha = 1; hit('fecha', x, y, 14);
  }

  /* — Luna: puntero con la esferita de fase — */
  {
    ctx.globalAlpha = dim('luna');
    const rr = R * (LAY.luna || .70), [x, y] = P(cx, cy, rr, o.trueMoon);
    const [zx, zy] = P(cx, cy, ZOUT, o.trueMoon);
    line(cx, cy, zx, zy, '#b9c1c8', 1.5);
    const pr = Math.max(6, W * .019);
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, pr, 0, TAU); ctx.fillStyle = '#141618'; ctx.fill(); ctx.clip();
    const k = Math.cos(o.elong * D2R);
    ctx.beginPath();
    ctx.arc(x, y, pr, -Math.PI / 2, Math.PI / 2, o.elong > 180);
    ctx.ellipse(x, y, pr * Math.abs(k), pr, 0, Math.PI / 2, -Math.PI / 2, (o.elong > 180) !== (k > 0));
    ctx.fillStyle = '#eef2f5'; ctx.fill(); ctx.restore();
    ring(x, y, pr, '#8a939b', 1);
    ctx.globalAlpha = 1; hit('luna', x, y, pr + 8);
  }

  /* — la Tierra, quieta en el centro — */
  {
    const g = ctx.createRadialGradient(cx - 2, cy - 2.5, .5, cx, cy, 9);
    g.addColorStop(0, '#aec0b3'); g.addColorStop(1, '#46554c');
    ctx.beginPath(); ctx.arc(cx, cy, 7.5, 0, TAU); ctx.fillStyle = g; ctx.fill();
    ring(cx, cy, 7.5, '#7d8a80', 1);
    hit('tierra', cx, cy, 14);
  }

  if (MD.style === 'bare')
    txt('sin planetas · ningún engrane frontal inventado', cx, cy + R * .30, '#8e877a', Math.max(7.5, W * .021));
}

/* ============================================================
   DORSO — las dos espirales
   ============================================================ */
function spiralPt(cx, cy, r0, r1, turns, f) {
  const rr = r0 + (r1 - r0) * f, a = (-90 + f * turns * 360) * D2R;
  return [cx + rr * Math.cos(a), cy + rr * Math.sin(a), rr, a];
}
function drawSpiral(cx, cy, r0, r1, turns, col) {
  ctx.beginPath();
  for (let i = 0; i <= 900; i++) { const [x, y] = spiralPt(cx, cy, r0, r1, turns, i / 900); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.stroke();
}
function subDial(cx, cy, rr, sectors, frac, label, labels, col, ccw) {
  plate(cx, cy, rr);
  for (let i = 0; i < sectors; i++) {
    const a = (-90 + i / sectors * 360) * D2R;
    line(cx, cy, cx + rr * Math.cos(a), cy + rr * Math.sin(a), '#7a7263', .8);
    if (labels) {
      const lon = (i + .5) / sectors * 360, [x, y] = P(cx, cy, rr * .62, lon);
      txt(labels[i], x, y, '#bcb3a2', Math.max(6, rr * .22), 'center', 0, 600);
    }
  }
  const a = (-90 + (ccw ? -frac : frac) * 360) * D2R;
  line(cx, cy, cx + rr * .88 * Math.cos(a), cy + rr * .88 * Math.sin(a), col, 1.8);
  dot(cx, cy, 2.4, col);
  txt(label, cx, cy + rr + Math.max(8, rr * .3), C.ink3, Math.max(6.5, rr * .2));
}

function drawBack(o) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, Rs = W * .355;
  const cyU = W * .48, cyL = H - W * .45;
  const F = Math.max(7, W * .0205);

  /* ---- espiral metónica: 235 celdas, 5 vueltas ---- */
  plate(cx, cyU, Rs * 1.045);
  ctx.globalAlpha = dim('metonico');
  drawSpiral(cx, cyU, Rs * .52, Rs, 5, '#8a8068');
  for (let i = 0; i < 235; i++) {
    const [x, y, rr, a] = spiralPt(cx, cyU, Rs * .52, Rs, 5, i / 235);
    const t = 3.2, cur = i === o.metonicCell;
    line(x - t * Math.cos(a), y - t * Math.sin(a), x + t * Math.cos(a), y + t * Math.sin(a),
      cur ? C.bronzeHi : (METONIC_SEQ[i].inter ? '#cfa85f' : '#857c69'), cur ? 2.2 : .8);
  }
  { const [x, y, , a] = spiralPt(cx, cyU, Rs * .52, Rs, 5, o.metonicFrac);
    line(cx, cyU, cx + Rs * 1.0 * Math.cos(a), cyU + Rs * 1.0 * Math.sin(a), '#8d7c52', 1.2);
    line(cx, cyU, x, y, C.bronzeHi, 1.8); dot(x, y, 3.4, C.bronzeHi); }
  ctx.globalAlpha = 1;
  txt('ΜΕΤΩΝ · 235 meses en 19 años', cx, cyU + Rs * 1.045 + F, C.ink3, F);
  hit('metonico', ...spiralPt(cx, cyU, Rs * .52, Rs, 5, o.metonicFrac), 22);

  const rg = Rs * .215, rc = Rs * .185;
  ctx.globalAlpha = dim('juegos');
  subDial(cx - Rs * .25, cyU - Rs * .04, rg, 4, o.gamesTurn, 'JUEGOS', ['ΟΛΥΜ', 'ΝΑΑ', 'ΠΥΘ', 'ΑΛΙ'], C.patina, true);
  ctx.globalAlpha = 1; hit('juegos', cx - Rs * .25, cyU - Rs * .04, rg + 5);
  ctx.globalAlpha = dim('calipico');
  subDial(cx + Rs * .25, cyU - Rs * .04, rc, 4, o.callippic, 'ΚΑΛΛΙΠΠΟΣ', ['Α', 'Β', 'Γ', 'Δ'], '#9a907c');
  ctx.globalAlpha = 1; hit('calipico', cx + Rs * .25, cyU - Rs * .04, rc + 5);

  /* ---- espiral del Saros: 223 celdas, 4 vueltas ---- */
  plate(cx, cyL, Rs * 1.045);
  ctx.globalAlpha = dim('saros');
  drawSpiral(cx, cyL, Rs * .48, Rs, 4, '#8a8068');
  for (let i = 0; i < 223; i++) {
    const [x, y, rr, a] = spiralPt(cx, cyL, Rs * .48, Rs, 4, i / 223);
    const g = GLYPH_MAP.get(i), cur = i === o.sarosCell, t = 3.0;
    line(x - t * Math.cos(a), y - t * Math.sin(a), x + t * Math.cos(a), y + t * Math.sin(a),
      cur ? C.bronzeHi : '#857c69', cur ? 2.2 : .7);
    if (g) {
      if (g[1] & 2) dot(x - 5 * Math.cos(a), y - 5 * Math.sin(a), 1.8, C.luna);
      if (g[1] & 1) dot(x + 5 * Math.cos(a), y + 5 * Math.sin(a), 1.8, C.sol);
    }
  }
  { const [x, y, , a] = spiralPt(cx, cyL, Rs * .48, Rs, 4, o.sarosFrac);
    line(cx, cyL, cx + Rs * 1.0 * Math.cos(a), cyL + Rs * 1.0 * Math.sin(a), '#8d7c52', 1.2);
    line(cx, cyL, x, y, C.bronzeHi, 1.8); dot(x, y, 3.4, C.bronzeHi); }
  ctx.globalAlpha = 1;
  txt('ΣΑΡΟΣ · 223 meses en 18 años', cx, cyL + Rs * 1.045 + F, C.ink3, F);
  hit('saros', ...spiralPt(cx, cyL, Rs * .48, Rs, 4, o.sarosFrac), 22);

  ctx.globalAlpha = dim('exeligmos');
  subDial(cx, cyL, Rs * .28, 3, o.exeligmosTurn, '', ['—', 'Η', 'ΙϚ'], C.patina);
  ctx.globalAlpha = 1; hit('exeligmos', cx, cyL, Rs * .28);
}

/* ============================================================
   ENGRANAJES — trazado a escala con dientes triangulares
   ============================================================ */
/* id, dientes, radio primitivo mm, árbol, evidencia(1=sobrevive), cadena */
const GEARS = [
  ['b1', 223, 64.4, 'b', 1, 'in'], ['b2', 64, 15.3, 'b', 1, 'in'], ['b3', 32, 8.7, 'b', 1, 'moon'],
  ['c1', 38, 9.8, 'c', 1, 'moon'], ['c2', 48, 10.7, 'c', 1, 'moon'],
  ['d1', 24, 5.4, 'd', 1, 'moon'], ['d2', 127, 31.2, 'd', 1, 'moon'],
  ['e3', 223, 51.9, 'e', 1, 'anom'], ['e4', 188, 49.5, 'e', 1, 'saros'],
  ['e2', 32, 7.4, 'e', 1, 'moon'], ['e5', 50, 12.6, 'e', 1, 'moon'],
  ['e6', 50, 13.4, 'e', 1, 'moon'], ['e1', 32, 9.2, 'e', 1, 'moon'],
  ['k1', 50, 13.0, 'k', 1, 'moon'], ['k2', 50, 13.5, 'k2', 1, 'moon'],
  ['f1', 53, 13.2, 'f', 1, 'saros'], ['f2', 30, 7.8, 'f', 1, 'saros'],
  ['g1', 54, 13.9, 'g', 1, 'saros'], ['g2', 20, 4.5, 'g', 1, 'saros'],
  ['h1', 60, 13.4, 'h', 1, 'saros'], ['h2', 15, 3.4, 'h', 1, 'saros'], ['i1', 60, 12.9, 'i', 1, 'saros'],
  ['l1', 38, 8.6, 'l', 1, 'trunk'], ['l2', 53, 12.9, 'l', 1, 'trunk'],
  ['m1', 96, 24.1, 'm', 1, 'trunk'], ['m2', 15, 3.9, 'm', 1, 'cal'], ['m3', 27, 6.8, 'm', 3, 'anom'],
  ['n1', 53, 13.3, 'n', 3, 'cal'], ['n2', 57, 11.9, 'n', 3, 'cal'], ['n3', 15, 3.8, 'n', 3, 'cal'],
  ['o1', 60, 12.5, 'o', 1, 'cal'], ['p1', 60, 15.0, 'p', 3, 'cal'], ['p2', 12, 3.0, 'p', 3, 'cal'],
  ['q1', 60, 15.0, 'q', 3, 'cal']
];

const GEAR_SURV = '#f0c069', GEAR_REC = '#9a907c', ACCENT = '#7fc4ab';
const CHAIN_NAME = { in: 'entrada', moon: 'Luna', trunk: 'tronco común', anom: 'anomalía y ápsides', saros: 'Saros y eclipses', cal: 'calendarios' };
const SEL2CHAIN = { luna: 'moon', fecha: 'in', sol: 'in', tierra: 'in',
  saros: 'saros', exeligmos: 'saros', nodos: 'anom',
  metonico: 'cal', juegos: 'cal', calipico: 'cal' };
const RATE = { b: 1, c: -64 / 38, d: 3.368421, e: -13.368421, e3: -477 / 4237,
  k: 13.14326, f: 0.399358, g: -940 / 4237, h: 0.073952, i: -235 / 12711,
  l: -64 / 38, m: 0.929825, n: -5 / 19, o: .25, p: 0.0657895, q: -1 / 76 };

/* e3 y e4 van sobre el árbol e pero no giran con él: e3 es el portador epicíclico.
   k2 va sobre su propio eje, descentrado 1.1 mm del de k1. */
function gearRate(id, arb) { return RATE[(id === 'e3' || id === 'e4') ? 'e3' : (id === 'k2' ? 'k' : arb)]; }

let LAYOUT = null;
function solveLayout() {
  const at = (o, dist, deg) => [o[0] + dist * Math.cos(deg * D2R), o[1] + dist * Math.sin(deg * D2R)];
  function isect(c1, r1, c2, r2, side) {
    const dx = c2[0] - c1[0], dy = c2[1] - c1[1], D = Math.hypot(dx, dy);
    const a = (r1 * r1 - r2 * r2 + D * D) / (2 * D);
    const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    return [c1[0] + a * dx / D + side * h * dy / D, c1[1] + a * dy / D - side * h * dx / D];
  }
  const A = {};
  A.b = [0, 0];
  A.e = at(A.b, 17.9, 158);             // e1–b3
  A.c = at(A.b, 25.1, 74);              // b2–c1
  A.d = isect(A.c, 16.1, A.e, 38.6, 1); // c2–d1 y d2–e2
  A.l = at(A.b, 23.9, -70);             // b2–l1
  A.m = isect(A.l, 37.0, A.e, 58.7, 1); // l2–m1 y m3–e3
  A.n = at(A.m, 17.2, -34);             // m2–n1
  A.o = at(A.n, 24.4, -95);             // n2–o1
  A.p = at(A.n, 18.8, 34);              // n3–p1
  A.q = at(A.p, 18.0, 96);              // p2–q1
  A.f = at(A.e, 62.7, 232);             // e4–f1
  A.g = at(A.f, 21.7, 310);             // f2–g1
  A.h = at(A.g, 17.9, 352);             // g2–h1
  A.i = at(A.h, 16.3, 48);              // h2–i1
  A.k = at(A.e, 25.6, 300);             // e5–k1, sobre el portador e3
  A.k2 = at(A.e, 26.9, 300);            // k2–e6, ejes descentrados 1.1 mm
  return A;
}
function gearPath(x, y, rp, N, ang) {
  const h = 1.15, ro = rp + h * .55, ri = rp - h * .45;
  ctx.beginPath();
  for (let i = 0; i < N; i++) {
    const a0 = ang + i / N * TAU, a1 = ang + (i + .5) / N * TAU, a2 = ang + (i + 1) / N * TAU;
    if (!i) ctx.moveTo(x + ri * Math.cos(a0), y + ri * Math.sin(a0));
    else ctx.lineTo(x + ri * Math.cos(a0), y + ri * Math.sin(a0));
    ctx.lineTo(x + ro * Math.cos(a1), y + ro * Math.sin(a1));
    ctx.lineTo(x + ri * Math.cos(a2), y + ri * Math.sin(a2));
  }
  ctx.closePath();
}

function drawGears(o) {
  ctx.fillStyle = '#161615'; ctx.fillRect(0, 0, W, H);
  if (!LAYOUT) LAYOUT = solveLayout();
  const A = LAYOUT;
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  for (const g of GEARS) { const p = A[g[3]], rr = g[2] + 2;
    x0 = Math.min(x0, p[0] - rr); x1 = Math.max(x1, p[0] + rr); y0 = Math.min(y0, p[1] - rr); y1 = Math.max(y1, p[1] + rr); }
  const padX = 10, padT = 24, padB = 48;
  const s = Math.min((W - padX * 2) / (x1 - x0), (H - padT - padB) / (y1 - y0));
  const ox = padX + (W - padX * 2 - (x1 - x0) * s) / 2 - x0 * s;
  const oy = padT + (H - padT - padB - (y1 - y0) * s) / 2 + y1 * s;
  const X = p => ox + p[0] * s, Y = p => oy - p[1] * s;

  const th1 = (o.meanMoon - o.moonApogee) * D2R;
  const dev = wrapPi(Math.atan2(M.pinD * Math.sin(th1), M.pinD * Math.cos(th1) + M.pinE) - th1);
  const hot = SEL2CHAIN[sel] || null;
  const selGear = GEARS.find(g => g[0] === sel);

  const order = GEARS.slice().sort((a, b) => b[2] - a[2]);
  for (const [id, N, rp, arb, ev, ch] of order) {
    const p = A[arb], x = X(p), y = Y(p), rr = rp * s;
    const rate = gearRate(id, arb);
    let ang = -rate * o.T * TAU;
    if (id === 'e1' || id === 'e6') ang -= dev;
    if (id === 'k2') ang = -RATE.k * o.T * TAU + dev;

    const isHot = (hot && ch === hot) || sel === id;
    const anySel = hot || selGear;
    /* al señalar una rueda suelta se deja ver a media luz el tren al que pertenece:
       una rueda sola no dice nada, lo que significa es de quién es compañera */
    const kin = selGear && !hot && ch === selGear[5] && !isHot;
    ctx.globalAlpha = anySel ? (isHot ? 1 : kin ? .42 : .13) : (ev === 1 ? .78 : .5);
    const col = isHot ? ACCENT : (ev === 1 ? GEAR_SURV : GEAR_REC);
    if ((TAU * rr / N) > 2.6) {
      gearPath(x, y, rr, N, ang);
      if (rp < 20) { ctx.fillStyle = col + '18'; ctx.fill(); }
      ctx.strokeStyle = col; ctx.lineWidth = isHot ? 1.1 : .65;
      ctx.setLineDash(ev === 1 ? [] : [2.5, 2.5]); ctx.stroke(); ctx.setLineDash([]);
    } else {
      ring(x, y, rr, col, isHot ? 1.4 : .9, ev === 1 ? [] : [3, 3]);
      ring(x, y, rr - 1.5, col, .4);
    }
    if (id === 'b1' || id === 'e3') for (let k = 0; k < 4; k++) {
      const a = ang + k / 4 * TAU + .4;
      { const sa = ctx.globalAlpha; ctx.globalAlpha = sa * .5;
        line(x + rr * .10 * Math.cos(a), y + rr * .10 * Math.sin(a),
             x + rr * .92 * Math.cos(a), y + rr * .92 * Math.sin(a), col, isHot ? 1.5 : .9);
        ctx.globalAlpha = sa; }
    }
    dot(x, y, 1.6, col);
    if (id === 'o1' && rr > 8) txt('frag. B', x + rr + 4, y + rr * .7, GEAR_SURV, Math.max(7, W * .019), 'left', 0, 700);
    const sib = GEARS.filter(g => g[3] === arb), k = sib.findIndex(g => g[0] === id);
    const la = sib.length > 1 ? (-100 + k * (330 / sib.length)) * D2R : -Math.PI / 2;
    const lr = sib.length > 1 ? Math.min(rr * .68, rr - 5) : 0;
    const lx = x + lr * Math.cos(la), ly = y + lr * Math.sin(la);
    const labelled = rr > 9;
    if (labelled) txt(id, lx, ly, isHot ? '#fff' : col,
                      Math.min(10, Math.max(6.8, rr * .28)), 'center', 0, 700);
    ctx.globalAlpha = 1;
    /* se señala una rueda por su corona o por su letra, nunca por el eje que comparte */
    hitRing(id, x, y, rr, Math.max(7, Math.min(14, rr * .55)), 1);
    if (labelled) hit(id, lx, ly, Math.max(11, Math.min(16, rr * .30)), 2);
    else hit(id, x, y, Math.max(9, rr), 2);   // demasiado chica para llevar letra: su diana es el eje mismo
  }

  /* el perno y la ranura k1/k2: el corazón no lineal */
  {
    const x = X(A.k), y = Y(A.k), ang = -RATE.k * o.T * TAU;
    const pr = 9.6 * s;
    ctx.globalAlpha = (hot && hot !== 'moon') ? .16 : 1;
    line(x, y, x + pr * Math.cos(ang), y + pr * Math.sin(ang), '#d05040', 1.3);
    dot(x + pr * Math.cos(ang), y + pr * Math.sin(ang), 2.8, '#ff7d63');
    ctx.globalAlpha = 1;
  }

  /* leyenda */
  {
    const fs = Math.max(7.2, W * .0195);
    const items = [['sobrevive · 26 del Fragmento A, 1 del B', GEAR_SURV], ['reconstruido · 7', GEAR_REC]];
    ctx.font = `600 ${fs}px ui-sans-serif,-apple-system,sans-serif`;
    let tot = 0; items.forEach(i => tot += ctx.measureText(i[0]).width + 22);
    let lx = Math.max(6, (W - tot + 22) / 2), ly = H - 34;
    items.forEach(([t, c]) => { dot(lx + 3, ly, 2.8, c); txt(t, lx + 10, ly, C.ink2, fs, 'left');
      lx += ctx.measureText(t).width + 22; });
    txt('q1 está en el Fragmento C y r1 en el D, pero no van en esta cara', W / 2, H - 34 + fs + 7, '#a49c8e', fs);
    txt('a escala real · distancia entre ejes = suma de radios primitivos', W / 2, H - 8, '#8e877a', fs);
  }
}

/* ============================================================
   bucle
   ============================================================ */
let out = null;
function render() {
  if (!W) resize();
  if (!W) return;
  hits = [];
  out = machine(T);
  if (view === 'front') drawFront(out);
  else if (view === 'back') drawBack(out);
  else if (view === 'corte') drawCorte(out);
  else if (view === 'letras') drawLetras(out);
  else if (view === 'frag') drawFrag(out);
  else drawGears(out);
  drawCrank();
  updateReadout(out);
}
