/* ============================================================
   LAS LETRAS — texto griego verbatim de la edición de 2016
   Anastasiou, Bitsakis, Jones, Moussas, Steele, Tselikas,
   Zafeiropoulou et al., «Inscriptions of the Antikythera
   Mechanism», Almagest 7.1 (2016), pp. 4–312.
   Convenciones de Leiden conservadas. Nada de griego inventado.
   ============================================================ */

/* las 13 letras índice que sobreviven en el anillo zodiacal, con su grado real */
const INDEX_LETTERS = [
  { L: 'Ψ', lon: 169, sign: 'Virgo', deg: 19, dot: true },
  { L: 'Ω', lon: 171, sign: 'Virgo', deg: 21 },
  { L: 'Α', lon: 181, sign: 'Libra', deg: 1, sun: true },
  { L: 'Β', lon: 191, sign: 'Libra', deg: 11 },
  { L: 'Γ', lon: 194, sign: 'Libra', deg: 14 },
  { L: 'Δ', lon: 196, sign: 'Libra', deg: 16 },
  { L: 'Ε', lon: 211, sign: 'Escorpio', deg: 1, sun: true },
  { L: 'Ζ', lon: 214, sign: 'Escorpio', deg: 4 },
  { L: 'Η', lon: 227, sign: 'Escorpio', deg: 17 },
  { L: 'Θ', lon: 232, sign: 'Escorpio', deg: 22 },
  { L: 'Ι', lon: 241, sign: 'Sagitario', deg: 1, sun: true },
  { L: 'Κ', lon: 243, sign: 'Sagitario', deg: 3, dot: true },
  { L: 'Λ', lon: 247, sign: 'Sagitario', deg: 7 }
];
/* qué rótulos del dial frontal sobreviven físicamente */
const SURVIVING_ZODIAC = new Set([5, 6, 7, 8]);        // Παρθένος, Χηλαί, Σκορπίος, Τοξότης
const SURVIVING_EGYPT = new Set([8, 9, 10]);           // Παχών, Παῦνι, Ἐπείφ

/* la columna mejor conservada del parapegma, verbatim (IAM 3, PP1 col. ii) */
const PARAPEGMA_II = [
  ['Κ',  '[Κ v –12– ] ̣Ι ἑσ̣[π]ερ̣[ί]α̣[ nn]', '[Κ ] … por la tarde. [nn]', 4],
  ['Λ',  'Λ v Ὑάδ̣[ες δύον]ται ἑσ̣περίαι̣. v ΚΑ', 'Λ  Las Híades se ponen por la tarde. 21', 2],
  ['Μ',  'Μ v Ταῦρο̣ς̣ ἄ̣ρχ̣ε̣ται ἀνατέλλειν. Α', 'Μ  Tauro empieza a salir. 1', 2],
  ['Ν',  '[Ν v] Λύ̣ρα ἐ[πιτ]έ̣λ̣λ̣ε̣[ι] ἑσπερία. v ΙΑ', '[Ν]  La Lira sale por la tarde. 11', 3],
  ['Ξ',  'Ξ̣ v Πλειὰς ἐπι[τ]έλλει ἑῶι̣α̣. v ΙΖ̣', 'Ξ  La Pléyade sale por la mañana. 17', 2],
  ['Ο',  'Ο v Ὑὰς ἐπιτέλλει v ἑώια. v Κ̣Ε', 'Ο  La Híade sale por la mañana. 25', 2],
  ['Π',  'Π v Δίδυμοι ἄρχονται ἐπιτέλλει̣ν̣. [Α]', 'Π  Los Gemelos empiezan a salir. [1]', 2],
  ['Ρ',  'Ρ v Ἀετὸς ἐπιτέλλει ἑσπέριο[ς. nn]', 'Ρ  El Águila sale por la tarde. [nn]', 2],
  ['Σ',  'Σ v Ἀρκτοῦρος δύνει v ἑῶι̣ος. v Ι̣', 'Σ  Arturo se pone por la mañana. 10', 2]
];
const PARAPEGMA_OTRAS = [
  ['[ v τροπαὶ χει]μ̣ερινα[ί. Α]', 'Solsticio de invierno. 1', 'PP1 col. i 2 · solo sobrevive «μερινα»'],
  ['[ v ἰσημ]ερ̣ί̣α̣ φθ̣ινοπ̣ω̣ρι̣νή. v Α', 'Equinoccio de otoño. 1', 'PP2 col. iii 2 · el único equinoccio parcialmente leído'],
  ['[Α v Χηλ]αὶ ἄρχονται ἐπιτ̣[έ]λ[λ]ειν.', 'Las Pinzas (Libra) empiezan a salir.', 'PP2 col. iii 1'],
  ['Μ v Καρκί[νος ἄρχεται ἐπιτέλλειν.]', 'Μ  Cáncer [empieza a salir.]', 'PP2 col. iv 1'],
  ['Ν v Ὠρί̣[ων ἐπιτέλλει ἑῶιος. nn]', 'Ν  Orión [sale por la mañana. nn]', 'PP2 col. iv 3 · solo «Ὠρί»'],
  ['Ξ v Κ̣ύων̣ [ἐπιτέλλει ἑῶιος. nn]', 'Ξ  Sirio [sale por la mañana. nn]', 'PP2 col. iv 4 · solo «Κύων»'],
  ['Ο v Ἀετ[ὸς δύνει ἑῶιος. nn]', 'Ο  El Águila [se pone por la mañana. nn]', 'PP2 col. iv 5 · solo «Ἀετ»']
];

/* Inscripción de la Cubierta Posterior — cara frontal, líneas I.15–I.28 */
const BCI_I = [
  [15, '[ ̣ ̣]οθ̣ε ̣ ̣τὸ σφαιρίον φερε ̣[', '…la esferita se desplaza…'],
  [16, 'προέχον αὐτοῦ γνωμόνιον σ[', '…un punterito que sobresale de él…'],
  [17, 'φερειῶν ἡ μὲν ἐχομένη τῶι τῆς [', '…arcos, el contiguo al de…'],
  [18, 'τος, τὸ δὲ δι᾿ αὐτοῦ φερόμεν[ον', '…(¿Estilbón?), y lo que se desplaza por él…'],
  [19, 'τῆς Ἀφροδίτη<ς> Φωσφόρου ̣ ̣ ̣[', '…de Afrodita Fósforo…'],
  [20, 'τοῦ [Φω]σφόρου περιφέρειαν ̣[', '…el arco de Fósforo…'],
  [21, 'γνώμω[ ̣] κεῖται χρυσοῦν σφαιρίον ̣ ̣[', '…sobre el puntero hay una esferita dorada…'],
  [22, 'Ἡλί̣[ου] ἀκτίν᾿, ὑπὲρ δὲ τὸν Ἥλιόν ἐστιν κυ[', '…rayo del Sol, y por encima del Sol está el círcu[lo…'],
  [23, '[ -3- το]ῦ Ἄρεως Πυρόεντος, τὸ δὲ διαπορε[υόμενον', '…de Ares Piroente, y lo que atraviesa…'],
  [24, '[Διὸς Φα]έθοντος, τὸ δὲ διαπορευόμενον̣ [', '…de [Zeus] Faetonte, y lo que atraviesa…'],
  [25, '[νου Φα]ίνοντ̣ος κύκλος, τὸ δὲ σφαιρίον φλ̣[', '…círculo de [Cro]no Fenonte, y la esferita…'],
  [26, '[ -7- ]ε̣ρα δ̣ὲ τοῦ κόσμου κεῖται ̣ ̣ ̣[', '…del cosmos está…'],
  [27, '[ -10- ]μεν[ ̣] στοιχεῖα παρακείμ[ενα', '…letras situadas al lado…'],
  [28, '[ -12- ] ̣αυτα ταῖς ἀσπιδ̣[ίσκαις', '…a los discos pequeños…']
];
const BCI_II = [
  [3,  '[ ̣ ̣ ἐ]ν ὅλη<ι> τῆι ἕλικι τμήματα v σλ̅ε [', '…en toda la espiral, 235 divisiones…'],
  [4,  'ΤΑΙ δὲ καὶ αἱ ἐξαιρεσιμοὶ ἡμέραι κα̣[', '…y los días excluidos…'],
  [15, '[ ̣ ̣ ̣] π̣ερόνην ὅθεν ἐξηλκύσ̣[θη', '…el pasador de donde se sacó…'],
  [17, '[γνω]μόνια δύο v ὧν τὰ ἄκρα φέ̣[ρεται', '…dos punteros, cuyas puntas se desplazan…'],
  [19, ' ̣ς τ̣ὴ̣ν τῆς v οϛL v ιθL v του[', '…el periodo de 76 años, el de 19 años…'],
  [20, 'μ̣ος εἰ̣ς̣ ἴσα v σκγ v συν τεσ[', '…en 223 partes iguales…'],
  [22, 'μ̣ο̣ν[ ̣ ̣ ̣ ̣]οι ἐγλειπτικοὶ χρ̣[', '…los tiempos de los eclipses…']
];

/* Inscripción de la Cubierta Frontal — los dos números que son evidencia */
const FCI_LINES = [
  [5,  '] ζ̣ω̣ι̣δ̣[ί]ου, ἐν δὲ ἴσοις v υ̅ξ̅β̣̅L v ἀποκατασ̣τάσ[εις', '…y en los mismos 462 años, restituciones…', 'Venus'],
  [6,  ']ΥΣ υ̅ξ̅β̅, ἑ̣κάστην δ᾿ ἀποκατάστασιν ἐν ἡμέρ̣αις φ̅[π̅δ̅', '…462, y cada restitución en 5[84] días…', 'Venus'],
  [7,  '] ̣ΝΑΣ. κ̣α̣ὶ̣ ἀ̣πὸ̣ μὲν [τ]ῆ̣ς πρὸς τὸν Ἥλιον συνό̣δου̣ ὑ̣πολε[ίπεται', '…y desde la conjunción con el Sol, regresa…', 'Venus'],
  [8,  ']Ν̣ ἀπόστημα ἐν ἡμέραις σ̅κ̅δ̣̅. προσάγει δὲ πρὸς τὸν Ἥλ[ιον', '…elongación en 224 días. Y se acerca al Sol…', 'Venus'],
  [20, '] τ̅μ̅θ̅ v', '…349…', 'Marte: estación vespertina → conjunción'],
  [22, '] π̅β̣̅ v', '…82…', 'Marte: retrogradación (349 + 349 + 82 = 780)'],
  [28, '] v ρ̅λ̅θ̅', '…139…', 'Júpiter: estación vespertina → conjunción'],
  [32, '] v ρ̅δ̅ v', '…104…', 'Júpiter: retrogradación (139 + 139 + 8 + 8 + 104 = 398)'],
  [33, '] υ̣̅μ̅β̅ v', '…442…', 'Saturno: la relación de periodo, en años']
];

/* los 20 glifos del Saros que sobreviven, verbatim (IAM 4 pp. 159–160) */
const GLYPH_TEXT = {
  8: ['Σ̣ ̣| ̣ ̣ ̣| Β', 'Luna, …  Β', 'A'],
  13: ['Η | ὥρ(ᾳ) α΄. | Γ', 'Sol, hora 1.ª  Γ', 'A'],
  20: ['Σ [ ] | ὥρ(ᾳ) ϛ΄. | Ε', 'Luna, [ ] hora 6.ª  Ε', 'F'],
  25: ['Η | ὥρ(ᾳ) ϛ΄. | Ζ', 'Sol, hora 6.ª  Ζ', 'F'],
  26: ['Σ ἡμ(έρας) | ὥρ(ᾳ) ζ΄. | Η̣', 'Luna, hora 7.ª del día  Η', 'F'],
  61: ['Σ [ ] | [ ] | [Ο]', 'Luna, …  [Ο]', 'E'],
  67: ['Σ [ ] | ὥ̣ρ̣(ᾳ) η΄ | Π', 'Luna, [ ] hora 8.ª  Π', 'A'],
  72: ['Η ν̣υ̣(κτὸς) | ὥ̣ρ̣(ᾳ) ̣΄. | Ρ', 'Sol, hora … de la noche  Ρ', 'A'],
  78: ['Η | ὥρ(ᾳ) α΄. | Τ', 'Sol, hora 1.ª (?) del día  Τ', 'F'],
  79: ['Σ ἡμ(έρας) | ὥρ(ᾳ) ι΄. | Υ', 'Luna, hora 10.ª del día  Υ', 'F'],
  114: ['Σ ἡμ(έρας) | ὥρ(ᾳ) ιβ΄. | Γ̅', 'Luna, hora 12.ª del día  Γ̅', 'E'],
  119: ['Η νυ(κτὸς) | ὥρ(ᾳ) ιβ΄. | Δ̅', 'Sol, hora 12.ª de la noche  Δ̅', 'E'],
  120: ['Σ ἡμ(έρας) | ὥρ(ᾳ) ̣΄. | Ε̣̅', 'Luna, hora … del día  Ε̅', 'A'],
  125: ['Σ ἡμ̣(έρας) ὥ̣ρ̣(ᾳ) η΄. | Η ὥρ(ᾳ) γ΄. | Ζ̅', 'Luna, hora 8.ª del día. Sol, hora 3.ª  Ζ̅', 'A'],
  131: ['Σ ὥρ(ᾳ) β΄. | Η νυ(κτὸς) ὥρ(ᾳ) θ΄. | Η̅', 'Luna, hora 2.ª. Sol, hora 9.ª de la noche  Η̅', 'F'],
  137: ['Σ ἡμ(έρας) ὥρ(ᾳ) ε΄. | Η ὥρ(ᾳ) ιβ΄. | Θ̅', 'Luna, hora 5.ª del día. Sol, hora 12.ª  Θ̅', 'F'],
  172: ['Σ ὥρ(ᾳ) ϛ΄. | Η ὥρ(ᾳ) ιβ΄. | Π̅', 'Luna, hora 6.ª. Sol, hora 12.ª  Π̅', 'E'],
  178: ['Σ ὥρ(ᾳ) θ΄. | Η ὥρ(ᾳ) θ΄. | Ρ̅', 'Luna, hora 9.ª. Sol, hora 9.ª  Ρ̅', 'A'],
  184: ['Σ ἡμ(έρας) ὥρ(ᾳ) δ΄. | Η̣ ὥρ(ᾳ) α΄. | Σ̣̅', 'Luna, hora 4.ª del día. Sol, hora 1.ª  Σ̅', 'A'],
  190: ['Σ ἡμ(έρας) | ὥρ(ᾳ) θ΄. | Τ̅', 'Luna, hora 9.ª del día  Τ̅', 'F']
};
const IDX_GR = { A:'Α',B:'Β',G:'Γ',D:'Δ',E:'Ε',Z:'Ζ',H:'Η',Th:'Θ',I:'Ι',K:'Κ',L:'Λ',M:'Μ',N:'Ν',
  X:'Ξ',O:'Ο',P:'Π',R:'Ρ',S:'Σ',T:'Τ',U:'Υ',Ph:'Φ',Ch:'Χ',Ps:'Ψ',W:'Ω',
  A2:'Α̅',B2:'Β̅',G2:'Γ̅',D2:'Δ̅',E2:'Ε̅',Z2:'Ζ̅',H2:'Η̅',Th2:'Θ̅',I2:'Ι̅',K2:'Κ̅',L2:'Λ̅',M2:'Μ̅',
  N2:'Ν̅',X2:'Ξ̅',O2:'Ο̅',P2:'Π̅',R2:'Ρ̅',S2:'Σ̅',T2:'Τ̅',U2:'Υ̅',Ph2:'Φ̅',Ch2:'Χ̅',Ps2:'Ψ̅',W2:'Ω̅',
  sym:'⟨símbolo⟩' };

/* alturas de letra medidas, por superficie (mm) */
const LETTER_SIZES = [
  { s: 'Parapegma', h: 2.7, note: 'la letra más grande de la máquina · 2.3 a 3.0 mm' },
  { s: 'Cubierta posterior', h: 2.0, note: 'interlínea 3.5 mm' },
  { s: 'Cubierta frontal', h: 2.0, note: 'interlínea 2.6 mm, la más apretada' },
  { s: 'Nombres del zodiaco', h: 1.8, note: 'y los meses egipcios' },
  { s: 'Placa posterior', h: 1.6, note: 'el texto de los eclipses' },
  { s: 'Letras índice', h: 1.2, note: 'y los glifos, «apenas más altos de 1 mm»' }
];

let letraSel = 'parapegma';

function drawLetras(o) {
  ctx.fillStyle = '#161615'; ctx.fillRect(0, 0, W, H);
  const F = Math.max(7.2, W * .0195), F2 = Math.max(6.4, W * .0175), m = 12, TOP = 26;
  const PPMM = 3.7795;                                   // 1 mm ≈ 3.78 px CSS

  /* ---------- tamaño real ---------- */
  txt('A TAMAÑO REAL · así de pequeño está grabado', m, TOP, C.ink3, F, 'left');
  let y = TOP + 16;
  for (const L of LETTER_SIZES) {
    const cap = L.h * PPMM, px = cap / 0.7;          // la altura de caja no es la altura de letra
    ctx.fillStyle = '#d8cba7';
    ctx.font = `600 ${px}px Georgia,"Times New Roman",serif`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('ΑΡΚΤΟΥΡΟΣ', m, y + cap);
    txt(`${L.h} mm`, m + 96, y + cap * .62, C.bronzeHi, F2, 'left', 0, 700);
    txt(L.s, m + 132, y + cap * .62, C.ink3, F2, 'left');
    y += Math.max(cap + 8, 15);
  }
  /* regla */
  { const len = 10 * PPMM;
    line(m, y + 5, m + len, y + 5, C.ink3, 1);
    line(m, y + 2, m, y + 8, C.ink3, 1); line(m + len, y + 2, m + len, y + 8, C.ink3, 1);
    txt('10 mm', m + len + 6, y + 5, C.ink3, F2, 'left'); }
  y += 20;
  txt('sin separación entre palabras, sin puntuación, capitales con serifas', m, y, '#a49c8e', F2, 'left');
  y += 20;

  /* ---------- ampliado ×5 ---------- */
  txt('LA MISMA LÍNEA, AMPLIADA', m, y + 8, C.ink3, F, 'left');
  y += 20;
  const word = 'ΑΡΚΤΟΥΡΟΣ';
  let cap4 = 2.7 * PPMM * 4;
  ctx.font = `600 ${cap4 / 0.7}px Georgia,"Times New Roman",serif`;
  const wid = ctx.measureText(word).width, maxw = W - m * 2;
  if (wid > maxw) cap4 *= maxw / wid;
  ctx.font = `600 ${cap4 / 0.7}px Georgia,"Times New Roman",serif`;
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillStyle = '#e6d8b4';
  ctx.fillText(word, m, y);
  y += cap4 * 1.5 + 2;
  txt(`×${(cap4 / (2.7 * PPMM)).toFixed(1)} · «Arturo se pone por la mañana» · parapegma, entrada Σ`,
      m, y, '#bcb3a2', F2, 'left');
  y += 20;

  /* ---------- mapa de las superficies ---------- */
  txt('DÓNDE ESTÁ CADA TEXTO', m, y + 6, C.ink3, F, 'left');
  y += 18;
  const availH = H - y - 14, availW = W - m * 2;
  const pw = Math.min((availW - 14) / 2, availH * 171 / 315 * 1.02);
  const s = pw / 171, ph = 315 * s;
  const faces = [
    { x: m, lb: 'CARA FRONTAL', blocks: [
      { y0: 0, h: 68, id: 'parapegma', t: 'parapegma PP1', c: '#c99a4a' },
      { y0: 72, h: 171, id: 'dialFrente', t: 'dial: zodiaco y calendario', c: '#6a9943' },
      { y0: 247, h: 68, id: 'parapegma', t: 'parapegma PP2', c: '#c99a4a' } ] },
    { x: m + pw + 14, lb: 'CARA POSTERIOR', blocks: [
      { y0: 0, h: 150, id: 'dialDorso', t: 'espiral metónica, Juegos', c: '#577bd6' },
      { y0: 152, h: 163, id: 'bpi', t: 'espiral del Saros, glifos,\ntexto de los eclipses', c: '#d05040' } ] }
  ];
  for (const f of faces) {
    txt(f.lb, f.x + pw / 2, y + 4, C.ink3, F2);
    const y0 = y + 14;
    ctx.fillStyle = '#242422'; ctx.fillRect(f.x, y0, pw, ph);
    ctx.strokeStyle = '#4d4a42'; ctx.lineWidth = 1; ctx.strokeRect(f.x, y0, pw, ph);
    for (const b of f.blocks) {
      const by = y0 + b.y0 * s, bh = b.h * s;
      ctx.fillStyle = b.c + (letraSel === b.id ? '44' : '20');
      ctx.fillRect(f.x + 2, by + 1, pw - 4, bh - 2);
      ctx.strokeStyle = b.c; ctx.lineWidth = letraSel === b.id ? 1.2 : .6;
      ctx.strokeRect(f.x + 2, by + 1, pw - 4, bh - 2);
      b.t.split('\n').forEach((ln, i) =>
        txt(ln, f.x + pw / 2, by + bh / 2 + (i - (b.t.split('\n').length - 1) / 2) * (F2 * 1.35), C.ink2, F2));
      hit(b.id, f.x + pw / 2, by + bh / 2, Math.min(pw / 2, bh / 2));
    }
    txt('171 × 315 mm', f.x + pw / 2, y0 + ph + 9, '#8e877a', F2);
  }
}
