/* ============================================================
   EL MECANISMO DE ANTICITERA — núcleo cinemático
   Todo se deriva de razones de dientes reales. Nada de efemérides.
   ============================================================ */

let T = 0;                       // estado único de la máquina: vueltas de b1
const TAU = Math.PI * 2, D2R = Math.PI / 180, R2D = 180 / Math.PI;
const n360 = a => ((a % 360) + 360) % 360;
const mod = (a, n) => ((a % n) + n) % n;
const wrapPi = a => { while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; return a; };

/* ---------- constantes de la máquina ---------- */
const M = {
  yearDays: 365.24667,          // año trópico de Hiparco: 365 + 1/4 − 1/300
  crankRatio: 223 / 48,         // vueltas de manivela por vuelta de b1
  // razones exactas de los trenes de engranes (vueltas por vuelta de b1)
  moon:      254 / 19,          // (64/38)(48/24)(127/32)
  apsis:     477 / 4237,        // (64/38)(53/96)(27/223)  — línea de ápsides lunar
  node:      -5 / 93,           // 1 − (49/62)(64/48)      — nodos, retrógrados
  metonic:   5 / 19,            // (64/38)(53/96)(15/53)
  callippic: 1 / 76,
  games:     1 / 4,             // contrarrotante
  saros:     940 / 4237,        // (477/4237)(188/53)(30/54)
  exeligmos: 235 / 12711,
  synodic:   19 / 235,          // mes sinódico en años de b1
  // anomalía lunar: perno y ranura k1/k2 (medidos en la tomografía)
  pinD: 9.6, pinE: 1.1,         // mm — amplitud = asin(1.1/9.6) = 6.58°
  // Sol: modelo excéntrico de Hiparco
  sunE: 1 / 24, sunApogee: 65.5 // Géminis 5;30
};

/* ---------- calibración: 23 dic 178 a.C. (juliano proléptico) ---------- */
const JD0 = 1656764.5;
const CAL = {                    // longitudes en el marco trópico congelado de esa fecha
  sun: 267.3083, moon: 274.5682, moonApogee: 277.2583, node: 92.6218,
  earth: 87.3179,
  helio: { mercurio: 310.933, venus: 129.6719, marte: 354.0425, jupiter: 208.3597, saturno: 58.3584 }
};
const T_NM0 = -0.00163047;       // novilunio inmediatamente anterior a la calibración

/* ---------- los cinco planetas, según cada escuela ----------
   Un mismo objeto, tres lecturas incompatibles. El selector cambia
   los periodos, la forma de mostrarlos y cuántos engranes hacen falta. */
const BODY = {
  mercurio: { gr: 'ΣΤΙΛΒΩΝ',  es: 'Mercurio', inferior: true,  color: '--mercurio' },
  venus:    { gr: 'ΦΩΣΦΟΡΟΣ', es: 'Venus',    inferior: true,  color: '--venus' },
  marte:    { gr: 'ΠΥΡΟΕΙΣ',  es: 'Marte',    inferior: false, color: '--marte' },
  jupiter:  { gr: 'ΦΑΕΘΩΝ',   es: 'Júpiter',  inferior: false, color: '--jupiter' },
  saturno:  { gr: 'ΦΑΙΝΩΝ',   es: 'Saturno',  inferior: false, color: '--saturno' }
};
const TRUE_SYN = { mercurio: 115.8775, venus: 583.9214, marte: 779.9361, jupiter: 398.8840, saturno: 378.0919 };

const MODELS = {
  f2021: {
    short: 'Freeth 2021', long: 'Freeth et al. 2021',
    style: 'rings', planets: true, nodes: true, trueSun: true,
    gears: 69, front: 34, lost: 39,
    who: 'Tony Freeth, David Higgon, Aris Dacanalis, Lindsay MacDonald, Myrto Georgakopoulou y Adam Wojcik (UCL), <i>Scientific Reports</i> 11:5821.',
    what: 'Anillos concéntricos. Cada cuerpo lleva un marcador sobre su propio anillo, en el orden cosmológico habitual, con el Sol verdadero como esferita dorada y una Mano del Dragón de dos puntas para los nodos.',
    strong: 'Es el único modelo que usa los periodos <b>escritos en la propia máquina</b>: 462 años para Venus y 442 para Saturno, leídos en la Inscripción de la Cubierta Frontal. Y resuelve el problema de Marte con un mecanismo indirecto de siete engranes análogo al de la anomalía lunar.',
    weak: 'Requiere <b>39 engranes perdidos</b>, ninguno de los 34 frontales sobrevive, y tres de los cinco periodos son deducciones modernas, no lecturas. El propio Freeth admite que los tubos coaxiales de salida son «el aspecto más problemático desde el punto de vista de la ingeniería». Su coautor Adam Wojcik dijo a <i>The Guardian</i> que es «donde mi fe en la tecnología griega falla».',
    per: {
      mercurio: { sig: 1513, Y: 480, au: 0.39, ev: 3, train: '51 ~ 72 + 89 ~ 40 ~ 20 ⊕ seguidor' },
      venus:    { sig: 289,  Y: 462, au: 0.72, ev: 2, train: '51 ~ 44 + 34 ~ 26 ~ 63 ⊕ seguidor' },
      marte:    { sig: 133,  Y: 284, au: 1.52, ev: 3, train: '56 ~ 64 + 38 ~ 40 ~ 71 ⊕ 80 ~ 80' },
      jupiter:  { sig: 315,  Y: 344, au: 5.20, ev: 3, train: '56 ~ 64 + 45 ~ 40 ~ 43 ⊕ 65 ~ 65' },
      saturno:  { sig: 427,  Y: 442, au: 9.58, ev: 2, train: '56 ~ 52 + 61 ~ 40 ~ 68 ⊕ 86 ~ 86' }
    },
    /* radio del marcador, de dentro hacia fuera */
    lay: { nodos: .155, mercurio: .250, venus: .340, sol: .440, marte: .535, jupiter: .628, saturno: .718 }
  },

  fj2012: {
    short: 'Jones · Wright', long: 'Freeth & Jones 2012 · Jones 2017 · Wright',
    style: 'pointers', planets: true, nodes: false, trueSun: true,
    gears: 55, front: 19, lost: 25,
    who: 'Tony Freeth y Alexander Jones, <i>ISAW Papers</i> 4 (2012); Jones, <i>A Portable Cosmos</i> (2017); modelo en bronce de Michael Wright.',
    what: 'Punteros con esferitas marcadoras, no anillos. Es la lectura literal de la inscripción, que habla de <i>σφαίρια</i> —esferitas— que se mueven por sus círculos. El puntero de fecha va entre Venus y Marte: como son punteros y no anillos, el orden no tiene que respetar la jerarquía cosmológica.',
    strong: 'Solo <b>19 engranes frontales</b> en lugar de 34, y periodos babilónicos de año-meta que sí están atestiguados en tablillas: (5, 8) para Venus, (76, 83) para Júpiter. Jones rechazó explícitamente los anillos en 2012: «el orden de los anillos tendría que seguir el orden de anidamiento de las salidas coaxiales, así que el Sol tendría que ir junto a la Luna, lo que contradice el orden canónico». Wright lo construyó en bronce y funciona.',
    weak: 'Ocho punteros superpuestos sobre el mismo dial: legible en bronce pulido, dudoso a simple vista. Y sus periodos son bastante peores: Venus se equivoca en 0.08 %, doce veces más que el modelo de 2021. Tampoco explica los 462 y 442 escritos en la máquina.',
    per: {
      mercurio: { sig: 104, Y: 33, au: 0.387, ev: 3, train: '104(fijo) ~ 33 ⊕ perno y ranura' },
      venus:    { sig: 5,   Y: 8,  au: 0.722, ev: 3, train: '40(fijo) ~ 64 ⊕ perno y ranura' },
      marte:    { sig: 37,  Y: 79, au: 1.524, ev: 3, train: '37(fijo) ~ 79 ⊕ 70 ~ 70' },
      jupiter:  { sig: 76,  Y: 83, au: 5.203, ev: 3, train: '76(fijo) ~ 83 ⊕ 85 ~ 85' },
      saturno:  { sig: 57,  Y: 59, au: 9.537, ev: 3, train: '57(fijo) ~ 59 ⊕ 60 ~ 60' }
    },
    lay: { luna: .200, sol: .290, mercurio: .378, venus: .462, fecha: .548, marte: .628, jupiter: .700, saturno: .762 }
  },

  voulgaris: {
    short: 'Voulgaris 2026', long: 'Voulgaris, Mouratidis, Vossinakis & Roumeliotis 2026',
    style: 'bare', planets: false, nodes: false, trueSun: false,
    gears: 36, front: 2, lost: 6,
    who: 'Aristeidis Voulgaris, Christophoros Mouratidis, Andreas Vossinakis y Manolis Roumeliotis, <i>Heritage</i> 9(3):95 (28 de febrero de 2026).',
    what: 'Sin planetas. Solo el Sol y la Luna, con su fase, contra el zodiaco y el calendario. La máquina es «un dispositivo lunisolar de medición del tiempo, en oposición a la idea de que fuera un planetario mecánico».',
    strong: 'Es el único modelo que <b>no necesita ni un engrane inventado</b> en la cara frontal. Nombrar planetas en la inscripción no prueba que hubiera engranaje para ellos: la Inscripción de la Cubierta Frontal no contiene ningún término mecánico —ni ΓΝΩΜΟΝΙΟΝ ΚΡΟΝΟΥ (puntero de Saturno) ni ΣΦΑΙΡΙΟΝ ΔΙΟΣ (esferita de Júpiter)— y no hay espacio material suficiente para las inscripciones que exigiría. Y es la palabra más reciente con revisión por pares.',
    weak: 'Deja sin explicar por qué la inscripción describe círculos, esferitas y una «esferita dorada» del Sol, por qué menciona estacionamientos (στηριγμός) y máxima elongación —fenómenos exclusivamente planetarios—, y para qué está el engrane r1 de 63 dientes del Fragmento D. Jones ha sido duro con su datación del 178 a.C.: «no es un artículo que resistiría una revisión por pares competente».',
    per: {}, lay: {}
  }
};

let MK = 'f2021';                 // reconstrucción activa
let PLANETS = [];
function planetList(mk) {
  const m = MODELS[mk], out = [];
  for (const id of ['mercurio', 'venus', 'marte', 'jupiter', 'saturno']) {
    const q = m.per[id]; if (!q) continue;
    const b = BODY[id];
    const P = b.inferior ? q.Y / (q.Y + q.sig) : q.Y / (q.Y - q.sig);
    out.push({ id, ...b, ...q, P,
      Pfrac: b.inferior ? `${q.Y}/${q.Y + q.sig}` : `${q.Y}/${q.Y - q.sig}`,
      synDays: M.yearDays * q.Y / q.sig,
      err: (M.yearDays * q.Y / q.sig - TRUE_SYN[id]) / TRUE_SYN[id] * 100 });
  }
  return out;
}
PLANETS = planetList(MK);

/* longitud geocéntrica de un planeta según cualquier modelo, para poder comparar */
function lonFor(mk, id, T) {
  const q = MODELS[mk].per[id]; if (!q) return null;
  const b = BODY[id];
  const Pp = b.inferior ? q.Y / (q.Y + q.sig) : q.Y / (q.Y - q.sig);
  const L = (CAL.helio[id] + 360 * T / Pp) * D2R, ms = (n360(CAL.sun + 360 * T) - 180) * D2R;
  return n360(Math.atan2(q.au * Math.sin(L) - Math.sin(ms), q.au * Math.cos(L) - Math.cos(ms)) * R2D);
}


/* ---------- nomenclatura ---------- */
const ZODIAC = [
  ['ΚΡΙΟΣ','Aries'],['ΤΑΥΡΟΣ','Tauro'],['ΔΙΔΥΜΟΙ','Géminis'],['ΚΑΡΚΙΝΟΣ','Cáncer'],
  ['ΛΕΩΝ','Leo'],['ΠΑΡΘΕΝΟΣ','Virgo'],['ΧΗΛΑΙ','Libra'],['ΣΚΟΡΠΙΟΣ','Escorpio'],
  ['ΤΟΞΟΤΗΣ','Sagitario'],['ΑΙΓΟΚΕΡΩΣ','Capricornio'],['ΥΔΡΟΧΟΟΣ','Acuario'],['ΙΧΘΥΕΣ','Piscis']
];
const EGYPT = ['ΘΩΘ','ΦΑΩΦΙ','ΑΘΥΡ','ΧΟΙΑΚ','ΤΥΒΙ','ΜΕΧΙΡ','ΦΑΜΕΝΩΘ','ΦΑΡΜΟΥΘΙ','ΠΑΧΩΝ','ΠΑΥΝΙ','ΕΠΕΙΦ','ΜΕΣΟΡΗ'];
const CORINTH = ['ΦΟΙΝΙΚΑΙΟΣ','ΚΡΑΝΕΙΟΣ','ΛΑΝΟΤΡΟΠΙΟΣ','ΜΑΧΑΝΕΥΣ','ΔΩΔΕΚΑΤΕΥΣ','ΕΥΚΛΕΙΟΣ',
  'ΑΡΤΕΜΙΣΙΟΣ','ΨΥΔΡΕΥΣ','ΓΑΜΕΙΛΙΟΣ','ΑΓΡΙΑΝΙΟΣ','ΠΑΝΑΜΟΣ','ΑΠΕΛΛΑΙΟΣ'];
const GAMES = [['ΙΣΘΜΙΑ','ΟΛΥΜΠΙΑ'],['ΝΕΜΕΑ','ΝΑΑ'],['ΙΣΘΜΙΑ','ΠΥΘΙΑ'],['ΝΕΜΕΑ','ΑΛΙΕΙΑ']];

/* secuencia metónica: 235 meses = 12 años de 12 + 7 años de 13 */
const METONIC_SEQ = (() => {
  const inter = new Set([3,6,8,11,14,17,19]), out = [];
  for (let y = 1; y <= 19; y++) {
    const nm = inter.has(y) ? 13 : 12;
    for (let m = 0; m < nm; m++)
      out.push({ y, name: CORINTH[Math.min(m,11)], inter: m === 12 });
  }
  return out;   // 235
})();

/* Los 51 glifos del dial del Saros, según la reconstrucción de la edición de 2016
   (IAM 4, Tabla 4.6): [celda 0-223, bits (1=solar, 2=lunar), letra índice, celda grabada].
   El desfase con las fechas se ajustó para que las 38 celdas lunares y las 27 solares
   caigan todas sobre posibilidades reales de eclipse en la época de calibración. */
const SAROS_GLYPHS = [[0,2,"N2",161],[5,1,"X2",166],[6,2,"O2",167],[11,3,"P2",172],[17,3,"R2",178],[23,3,"S2",184],[29,2,"T2",190],[35,2,"U2",196],[40,1,"Ph2",201],[41,2,"Ch2",202],[46,1,"Ps2",207],[47,2,"W2",208],[52,1,"sym",213],[53,2,"sym",214],[58,3,"sym",219],[64,2,"A",2],[70,3,"B",8],[75,1,"G",13],[76,2,"D",14],[82,2,"E",20],[87,1,"Z",25],[88,2,"H",26],[93,1,"Th",31],[94,2,"I",32],[99,3,"K",37],[105,3,"L",43],[111,2,"M",49],[117,3,"N",55],[122,1,"X",60],[123,2,"O",61],[129,2,"P",67],[134,1,"R",72],[135,2,"S",73],[140,1,"T",78],[141,2,"U",79],[146,3,"Ph",84],[152,3,"Ch",90],[158,2,"Ps",96],[164,3,"W",102],[169,1,"A2",107],[170,2,"B2",108],[176,2,"G2",114],[181,1,"D2",119],[182,2,"E2",120],[187,3,"Z2",125],[193,3,"H2",131],[199,3,"Th2",137],[205,2,"I2",143],[211,2,"K2",149],[216,1,"L2",154],[217,2,"M2",155]];
const GLYPH_MAP = new Map(SAROS_GLYPHS.map(g => [g[0], g]));

/* ---------- calendario ---------- */
function toJD(y, m, d) {           // y astronómico (1 a.C. = 0); juliano antes de 1582-10-15
  const greg = (y > 1582) || (y === 1582 && (m > 10 || (m === 10 && d >= 15)));
  let Y = y, Mo = m;
  if (Mo <= 2) { Y--; Mo += 12; }
  let B = 0;
  if (greg) { const A = Math.floor(Y / 100); B = 2 - A + Math.floor(A / 4); }
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (Mo + 1)) + d + B - 1524.5;
}
function fromJD(jd) {
  const z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
  let A = z;
  if (z >= 2299161) { const a = Math.floor((z - 1867216.25) / 36524.25); A = z + 1 + a - Math.floor(a / 4); }
  const B = A + 1524, C = Math.floor((B - 122.1) / 365.25), D = Math.floor(365.25 * C),
        E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E) + f;
  const mo = E < 14 ? E - 1 : E - 13;
  const yr = mo > 2 ? C - 4716 : C - 4715;
  return { y: yr, m: mo, d: Math.floor(day), frac: day - Math.floor(day),
           julian: z < 2299161 };
}
function fmtDate(jd) {
  const c = fromJD(jd);
  const era = c.y <= 0 ? `${1 - c.y} a.C.` : `${c.y} d.C.`;
  const MN = ['','ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return { txt: `${c.d} ${MN[c.m]} ${era}`, cal: c.julian ? 'calendario juliano' : 'calendario gregoriano' };
}

/* ============================================================
   SALIDAS DE LA MÁQUINA — función pura de T (vueltas de b1)
   ============================================================ */
function machine(T) {
  const o = {};
  o.T = T;
  o.jd = JD0 + T * M.yearDays;
  o.crankTurns = T * M.crankRatio;

  /* — Sol medio: define el año. Mueve el puntero de fecha. */
  o.meanSun = n360(CAL.sun + 360 * T);

  /* — Sol verdadero: excéntrico de Hiparco, e = 1/24, apogeo en Géminis 5;30 */
  const Ms = (o.meanSun - M.sunApogee) * D2R;
  o.trueSun = n360(M.sunApogee + Math.atan2(Math.sin(Ms), M.sunE + Math.cos(Ms)) * R2D);
  o.sunEq = wrapPi((o.trueSun - o.meanSun) * D2R) * R2D;

  /* — Luna: media sidérea 254/19, más la anomalía del perno y ranura k1/k2,
       cuyo apogeo avanza a 477/4237 (precesión apsidal) */
  o.meanMoon = n360(CAL.moon + 360 * M.moon * T);
  o.moonApogee = n360(CAL.moonApogee + 360 * M.apsis * T);
  const th1 = (o.meanMoon - o.moonApogee) * D2R;
  const th2 = Math.atan2(M.pinD * Math.sin(th1), M.pinD * Math.cos(th1) + M.pinE);
  o.moonEq = wrapPi(th2 - th1) * R2D;
  o.trueMoon = n360(o.meanMoon + o.moonEq);
  /* velocidad instantánea de la Luna, en grados/día (la máquina la varía de verdad) */
  const dr = M.pinD * (M.pinD + M.pinE * Math.cos(th1)) /
             (M.pinD ** 2 + M.pinE ** 2 + 2 * M.pinD * M.pinE * Math.cos(th1));
  o.moonSpeed = 360 * (M.moon - M.apsis) * dr / M.yearDays + 360 * M.apsis / M.yearDays;

  /* — Fase: diferencial entre la Luna y el Sol medio → 235/19 */
  o.elong = n360(o.trueMoon - o.meanSun);
  o.phase = (1 - Math.cos(o.elong * D2R)) / 2;      // 0 = nueva, 1 = llena
  o.age = o.elong / 360 * (M.yearDays * M.synodic);

  /* — Nodos: la Mano del Dragón, −5/93 */
  o.node = n360(CAL.node + 360 * M.node * T);

  /* — Planetas: cada uno es la suma vectorial de dos movimientos circulares uniformes.
       Deferente + epiciclo = exactamente la teoría de Apolonio.
       Los periodos son los de la reconstrucción activa. */
  o.model = MK; o.MD = MODELS[MK];
  const earth = { x: Math.cos((o.meanSun - 180) * D2R), y: Math.sin((o.meanSun - 180) * D2R) };
  o.planets = {};
  for (const p of PLANETS) {
    const L = (CAL.helio[p.id] + 360 * T / p.P) * D2R;
    const gx = p.au * Math.cos(L) - earth.x, gy = p.au * Math.sin(L) - earth.y;
    const lon = n360(Math.atan2(gy, gx) * R2D);
    // ¿retrógrado? derivada numérica
    const dT = 2e-4;
    const L2 = (CAL.helio[p.id] + 360 * (T + dT) / p.P) * D2R;
    const ms2 = n360(CAL.sun + 360 * (T + dT)) - 180;
    const e2x = Math.cos(ms2 * D2R), e2y = Math.sin(ms2 * D2R);
    const lon2 = n360(Math.atan2(p.au * Math.sin(L2) - e2y, p.au * Math.cos(L2) - e2x) * R2D);
    o.planets[p.id] = { lon, retro: wrapPi((lon2 - lon) * D2R) < 0,
      dist: Math.hypot(gx, gy) };
  }

  /* — Diales traseros. El mes 0 es el primer novilunio tras la calibración. */
  const months = (T - T_NM0) / M.synodic;
  o.months = months;
  const mi = Math.floor(months);
  o.metonicCell = mod(mi, 235);
  o.sarosCell   = mod(mi, 223);
  o.metonicFrac = mod(months, 235) / 235;
  o.sarosFrac   = mod(months, 223) / 223;
  o.metonicTurn = months / 47;                       // 47 celdas por vuelta, 5 vueltas
  o.sarosTurn   = months / 55.75;                    // 55.75 celdas por vuelta, 4 vueltas
  o.metonicYear = Math.floor(o.metonicCell / 235 * 19) + 1;
  o.corinth = METONIC_SEQ[o.metonicCell];
  o.callippic = mod(T / 76, 1);
  o.gamesTurn = mod(T / 4, 1);
  o.gamesSector = Math.floor(o.gamesTurn * 4);
  o.exeligmosTurn = mod(months / 223 / 3, 1);
  o.exeligmosSector = Math.floor(o.exeligmosTurn * 3);
  o.glyph = GLYPH_MAP.get(o.sarosCell) || null;

  /* — Deriva acumulada frente al cielo (los errores propios del diseño) */
  const yrs = T;
  o.drift = {
    metonic: yrs / 19 * -0.0809,          // días
    saros:   yrs / 18.0298 * -0.0767,
    apsis:   yrs * (1 / 8.8504 - 1 / 8.88260) * 360   // grados de desfase del apogeo lunar
  };
  return o;
}
