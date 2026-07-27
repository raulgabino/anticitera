/* ============================================================
   INTERFAZ
   ============================================================ */
const EVLABEL = ['Sobrevive en bronce', 'Atestiguado por inscripción', 'Reconstruido', 'Conjetural'];

const INFO = {
  tierra: { t: 'La Tierra', gr: 'ΓΗ', ev: 2, p: [
    'Quieta en el centro, porque eso es lo que la máquina afirma. La Inscripción de la Cubierta Posterior describe la cara frontal como un cosmos de círculos concéntricos y dice que el círculo de Marte está “por encima” del Sol —es decir, más afuera—. Es el universo aristotélico visto en corte.',
    'Aristarco de Samos ya había propuesto que la Tierra giraba alrededor del Sol, hacia el 270 a.C. No era secreto: era una hipótesis conocida, marginal y sin desarrollo técnico. Nadie calculaba con ella.'],
    src: 'Freeth &amp; Jones 2012, §2.3 (lectura de la BCI en el Fragmento B).' },

  zodiaco: { t: 'Anillo zodiacal', gr: 'ΖΩΙΔΙΑΚΟΣ', ev: 1, p: [
    '360 divisiones de grado en doce signos de 30°, corriendo en sentido horario. Sobreviven las letras de Παρθένος, Χηλαί, Σκορπίος y Τοξότης.',
    'Libra aquí no es Ζυγός sino <b>ΧΗΛΑΙ</b>, “las Pinzas” del Escorpión: el uso griego antiguo, heredado de Babilonia.',
    'Las letras índice pequeñas junto a ciertos grados remiten al parapegma —un texto de ortos y ocasos de estrellas brillantes— grabado en la placa. Su existencia prueba que había un puntero solar.'],
    src: 'Anastasiou et al., <i>Almagest</i> 7.1 (2016). Las divisiones de grado no son uniformes (Evans &amp; Carman 2019).' },

  calendario: { t: 'Anillo del calendario egipcio', gr: 'ΕΠΑΓΟΜΕΝΑΙ', ev: 1, p: [
    'Doce meses de 30 días más 5 epagómenos: 365 exactos, sin bisiesto. Por eso se atrasa un día cada cuatro años y recorre un signo del zodiaco cada 120 años.',
    'El anillo <b>gira</b>: se apoya sobre una base perforada. Esa movilidad está físicamente atestiguada, y es la corrección manual del error. Puedes arrastrarlo.',
    'Controversia abierta: Woan &amp; Bayley (2024) reanalizaron los agujeros de la base con métodos bayesianos de ondas gravitacionales y obtuvieron <b>354 ± 1.4</b>, no 365. Si tienen razón, el anillo era lunar y esta parte de la reconstrucción cambia.'],
    src: 'Budiselic et al. 2020; Woan &amp; Bayley, <i>Horological Journal</i> 2024 (arXiv:2403.00040).' },

  fecha: { t: 'Puntero de fecha · Sol medio', gr: 'ΗΛΙΟΣ', ev: 2, p: [
    'Una vuelta por año, exactamente. Es la definición del año en la máquina: la rueda b1 da una vuelta y este puntero también.',
    'No sale del centro de b1 —los engranes fijos lo estorban— sino de una barra remachada al bloque perforado del Radio D.'],
    chain: 'manivela → a1(48) ~ b1(223) ≡ b2(64) = 1 vuelta/año',
    src: 'Freeth et al. 2021, Fig. 3.' },

  sol: { t: 'Sol verdadero', gr: 'ΗΛΙΟΣ · χρυσοῦν σφαίριον', ev: 2, p: [
    'Una esferita dorada con su rayo. Las palabras <i>χρυσοῦν σφαίριον</i> están literalmente escritas en la máquina.',
    'No se mueve uniformemente: el modelo excéntrico de Hiparco (excentricidad 1/24, apogeo en Géminis 5;30) lo adelanta y lo atrasa hasta <b>±2.39°</b>. Aquí lo ves como la diferencia entre este puntero y el de fecha.'],
    chain: '56(fijo) ~ 52 ~ 56 ⊕ seguidor de perno',
    src: 'Ptolomeo, <i>Almagesto</i> III.4, para los parámetros de Hiparco.' },

  luna: { t: 'Luna y esferita de fase', gr: 'ΣΕΛΗΝΗ', ev: 1, p: [
    'La joya de la máquina. La Luna avanza 254/19 vueltas por año —el mes sidéreo, con un error de <b>32 segundos</b>—, pero no a velocidad constante.',
    'Dos ruedas de 50 dientes, k1 y k2, montadas sobre un portador con los ejes <b>descentrados 1.1 mm</b>. Un perno a 9.6 mm del centro de k1 corre por una ranura de k2. Eso convierte giro uniforme en giro variable: <b>±6.5°</b> de anomalía. Es una función seno hecha de geometría.',
    'Y el portador gira: la línea de ápsides recorre su ciclo en 8.883 años, con lo que la anomalía pasa de sidérea a anomalística. Es teoría lunar de Hiparco, mecanizada.',
    'La esferita de 6 mm, mitad negra mitad blanca, gira por diferencial entre la Luna y el Sol medio: 254/19 − 1 = 235/19.'],
    chain: 'b2(64)~c1(38)+c2(48)~d1(24)+d2(127)~e2(32) → [e5(50)~k1(50) ⊕ k2(50)~e6(50)] → e1(32)~b3(32)',
    src: 'Freeth et al. 2006, Fig. 6; Freeth et al. 2021, Tabla S8.' },

  nodos: { t: 'Mano del Dragón · nodos', gr: 'ΑΝΑΒΙΒΑΖΩΝ ☊ ΚΑΤΑΒΙΒΑΖΩΝ ☋', ev: 4, p: [
    'Un puntero de dos puntas que marca dónde la órbita lunar cruza la eclíptica. Cuando el Sol y la Luna caen cerca de esta línea, hay eclipse.',
    '<b>No hay ninguna evidencia física de esta pieza.</b> Los propios autores lo dicen: “es una opción interesante para que el lector la considere”. La incluimos porque explica visualmente el dial del Saros, no porque exista.',
    'Objeción real: como iría montada en b1, giraría a velocidad constante, y todos los ciclos lunares tienen velocidad variable. Haría falta otro perno y ranura.'],
    chain: '49(fijo) ~ 62 + 64 ~ 48  →  1 − 98/93 = −5/93 (18.6 años, retrógrado)',
    src: 'Freeth et al. 2021; objeción en Voulgaris et al., <i>Heritage</i> 9(3):95 (2026).' },

  metonico: { t: 'Espiral metónica', gr: 'ΜΕΤΩΝ', ev: 1, p: [
    '235 celdas en una espiral de cinco vueltas: 235 meses lunares caben casi exactamente en 19 años solares. El error del engranaje es de <b>0.081 días en 19 años</b>.',
    'Los nombres de los meses son <b>corintios</b> —Φοινικαῖος, Κράνειος, Λανοτρόπιος…—, en dialecto dórico. Es el único rasgo dialectal de toda la máquina, y por eso se sospecha que salió del noroeste griego: Corinto, Siracusa o, más probablemente, una colonia corintia del Epiro.',
    'Los meses intercalares van marcados en verde: 12 años de 12 meses más 7 años de 13.'],
    chain: 'b2(64)~l1(38)+l2(53)~m1(96)+m2(15)~n1(53)  →  5/19 vuelta/año',
    src: 'Freeth, Jones, Steele &amp; Bitsakis, <i>Nature</i> 454 (2008).' },

  saros: { t: 'Espiral del Saros', gr: 'ΣΑΡΟΣ', ev: 1, p: [
    '223 meses lunares en cuatro vueltas: 18 años, 11 días y 8 horas. Tras ese lapso, la geometría Sol–Luna–nodos se repite casi igual y los eclipses vuelven.',
    'Los glifos no predicen eclipses: predicen <b>posibilidades</b> de eclipse. Σ (ΣΕΛΗΝΗ) para lunar, Η (ΗΛΙΟΣ) para solar, con la hora y con “características” heredadas de la adivinación babilónica: magnitud, <b>color</b> y <b>vientos</b>. Eso último no tiene ninguna función astronómica.',
    'Freeth recupera 51 glifos: 38 lunares y 28 solares. Aquí están reconstruidos a partir de la propia lógica nodal de la máquina, y reproducen el patrón auténtico de 6-6-6-5 meses.'],
    chain: 'm3(27)~e3(223) ≡ e4(188)~f1(53)+f2(30)~g1(54)  →  940/4237',
    src: 'Freeth et al., <i>Nature</i> 454 (2008); Freeth 2014.' },

  exeligmos: { t: 'Dial del Exeligmós', gr: 'ΕΞΕΛΙΓΜΟΣ', ev: 1, p: [
    'Tres Saros = 54 años y 34 días enteros. Como cada Saros sobra un tercio de día, el eclipse siguiente ocurre 8 horas después y la Tierra ha girado 120°.',
    'Este dial corrige eso: sectores en blanco, <b>Η</b> (8 horas) y <b>ΙΗ</b> (16 horas). Es el único ajuste horario de toda la máquina.'],
    chain: 'g2(20)~h1(60)+h2(15)~i1(60)  →  235/12711 (54.089 años)',
    src: 'Freeth et al., <i>Nature</i> 454 (2008).' },

  juegos: { t: 'Dial de los Juegos', gr: 'ΟΛΥΜΠΙΑ · ΝΕΜΕΑ · ΙΣΘΜΙΑ · ΠΥΘΙΑ', ev: 1, p: [
    'Cuatro años exactos, sin error posible: la razón sale redonda. Marca los juegos panhelénicos —Olimpia, Nemea, Ístmicos, Píticos— más los Naa de Dodona y los Halieia de Rodas.',
    'Es el <b>único puntero que gira al revés</b> que todos los demás. Por eso sus sectores están inscritos en sentido antihorario: el constructor prefirió invertir el grabado antes que añadir un engrane.',
    'También es el único rasgo de la máquina que no tiene equivalente en el manual de astronomía de Gémino. No es astronomía: es calendario social.'],
    chain: 'n2(57) ~ o1(60)  →  1/4 de vuelta por año, exacto',
    src: 'Freeth et al., <i>Nature</i> 454 (2008). o1 sobrevive en el Fragmento B.' },

  calipico: { t: 'Dial calípico', gr: 'ΚΑΛΛΙΠΠΟΣ', ev: 4, p: [
    'Cuatro ciclos metónicos menos un día: 76 años, 27 759 días. Corrige el pequeño sobrante del ciclo de Metón.',
    'Hasta 2008 se creía que este dial era el de los Juegos. Al leerse las inscripciones de los juegos, hubo que reasignarlo y reubicarlo como imagen especular. <b>Ningún engrane suyo sobrevive</b>; los conteos de dientes solo están obligados a dar 1/76.'],
    chain: 'n3(15)~p1(60)+p2(12)~q1(60)  →  1/76',
    src: 'Freeth &amp; Jones 2012: “(conjeturalmente) un dial del ciclo calípico de 76 años”.' }
};
function refreshPlanetInfo() {
  for (const id in BODY) delete INFO[id];
  for (const p of PLANETS) INFO[p.id] = { t: p.es, gr: p.gr, ev: p.ev, chain: p.train, planet: p };
}
refreshPlanetInfo();

/* engranes */
const NUM = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];
const GEARNOTE = {
  b1: 'La Rueda Motriz. 223 dientes, 130 mm de diámetro, 2.7 mm de espesor, cuatro radios. Es la más grande y la más gruesa porque es la más cargada. Sobre ella iban montados todos los epiciclos planetarios.',
  d2: '127 dientes. No es un número cualquiera: 127 = 254/2, y 254 mesesidéreos en 19 años es la relación que define la Luna. Un primo escondido en el metal.',
  e3: 'El portador epicíclico. 223 dientes —el primo del Saros— y sobre él viajan k1 y k2. Gira una vez cada 8.88 años: la precesión de la línea de ápsides lunar. Su error, +0.36%, es el mayor de toda la máquina, y es un error de diseño, no de fabricación.',
  k1: 'Perno. 50 dientes, 0.6 mm de espesor. El perno está a 9.6 mm del centro.',
  k2: 'Ranura. 50 dientes, 0.5 mm de espesor. Su eje está descentrado 1.1 mm respecto al de k1. Cinco capas, e1 a e6, van apretadas en unos 7 mm.',
  o1: 'Sobrevive en el Fragmento B, justo debajo del dial de los Juegos. La distancia entre ejes medida es de 24.4 mm, exactamente 12.5 + 11.9: la prueba física de que el engrane que lo mueve tenía 57 dientes.',
  m3: 'Reconstruido. 27 dientes. Es la pieza que reparte el movimiento hacia el Saros y hacia la anomalía lunar.',
  h2: 'El engrane más pequeño de la máquina: 15 dientes, 7.6 mm de diámetro.'
};

Object.assign(INFO, {
  caja: { t: 'La caja', gr: '315 × 190 × 100 mm', ev: 3, p: [
    'Marco de madera con dos cubiertas de bronce grabadas: la frontal mira hacia fuera, la posterior hacia dentro y se sujetaba con pestillos deslizantes.',
    'Todo el engranaje —41 milímetros— ocupa menos de la mitad del fondo. El resto es madera, aire y las inscripciones. La medida de la caja es <b>incierta</b>: Freeth et al. 2006 la dan como «tamaño total (incierto) de 315 × 190 × 100 mm». Wikipedia repite 340 × 180 × 90, que contradice la fuente primaria.'],
    src: 'Freeth et al., <i>Nature</i> 444:587 (2006).' },
  placa: { t: 'Placa Principal', gr: '2 mm de bronce', ev: 1, p: [
    'El plano de referencia de toda la máquina. Detrás lleva el tren lunar y los calendarios; delante, la Rueda Motriz y todo el planetario.',
    'Los árboles la atraviesan. b1 y b2 van en el mismo eje, uno a cada lado: por eso una sola vuelta de b1 define el año en las dos caras.'] },
  strap: { t: 'La Correa', gr: '1.6 mm · inclinada 11°', ev: 3, p: [
    'Una banda de bronce que cruza por delante de b1 y sostiene el segundo piso del planetario.',
    'Va <b>inclinada 11°</b> respecto a los radios de b1. No es un descuido: es la única forma de librar los engranes epicíclicos de Mercurio y Venus. Y explica el ángulo raro de los pilares cortos, que llevaba décadas sin explicación.'],
    src: 'Freeth et al. 2021, Discusión Suplementaria.' },
  cp: { t: 'Placa Circular', gr: '2.0 mm', ev: 3, p: [
    'El tercer piso. Sobre ella van Marte, Júpiter, Saturno y el Sol verdadero, y de ella sale el tubo exterior que sostiene todo el nido coaxial.',
    'Un solo engrane fijo de 56 dientes, remachado a una subplaca, sirve a los tres planetas superiores y al Sol, y a la vez hace de cojinete de toda la pila de tubos. Es la pieza más económica del diseño.'] },
  frente1: { t: '9 capas en 15 mm', gr: '1.67 mm por capa', ev: 4, p: [
    'Entre b1 y la Correa. Aquí van los epiciclos de Mercurio y Venus y el mecanismo de los nodos, montados sobre los radios A, B y C de la Rueda Motriz.',
    'Nueve planos de engranes en el grosor de un lápiz. <b>Ninguno de estos engranes existe.</b> Los 34 de la cara frontal son reconstrucción completa.'] },
  frente2: { t: '5 capas en 9.7 mm', gr: '1.94 mm por capa', ev: 4, p: [
    'Entre la Correa y la Placa Circular. Marte, Júpiter y Saturno con el mecanismo indirecto de siete engranes, más el Sol verdadero.',
    'Las parejas finales iguales —86~86, 65~65, 80~80— no cambian ninguna razón: están solo para invertir el sentido de giro. Son geometría, no astronomía.'] },
  pilares: { t: 'Los pilares', gr: 'largos 32.0 mm · cortos 20.4 mm', ev: 1, p: [
    'Columnas de bronce que mantienen separadas las placas. Los largos miden 32.0 mm con el hombro a 27.5; los cortos, 20.4 con el hombro a 16.2.',
    'Los extremos están perforados con agujeros de 1.0 a 1.4 mm para pasadores de retención de 1 mm. Sobreviven, y son la medida directa de cuánto espacio había entre planos.'] },
  tubos: { t: 'Los 9 tubos coaxiales', gr: 'radio total 8.8 mm', ev: 4, p: [
    'Nueve tubos de bronce, uno dentro de otro, más el árbol central de la Luna. Cada uno saca una salida distinta al frente. Quedan <b>0.76 mm por tubo</b> para pared más juego.',
    'La regla que los ordena es contraintuitiva: <b>cuanto más cerca del eje está un tubo, más atrás tiene que estar su engranaje</b>. Por eso los mecanismos van deliberadamente entrelazados, y por eso el Sol medio —que solo sirve para mover la fase lunar— vive en el tubo más profundo.',
    'Aquí es donde el modelo se pone frágil, y lo dicen sus propios autores. Freeth: «desde el punto de vista de la ingeniería, el sistema de tubos coaxiales de salida es el aspecto más problemático del modelo actual». Su coautor Adam Wojcik, a <i>The Guardian</i>: «los tubos concéntricos del núcleo del planetario son donde mi fe en la tecnología griega falla».'],
    src: 'Freeth et al. 2021, §Discusión.' },
  tapaAtras: { t: 'Cubierta posterior', gr: 'bronce grabado', ev: 1, p: [
    'Grabada por la cara interior y sujeta con pestillos deslizantes. Lleva la Inscripción de la Cubierta Posterior, que es la que describe el cosmos de la cara frontal: los círculos, las esferitas, la esferita dorada del Sol.',
    'Es, literalmente, el manual de instrucciones pegado por dentro de la tapa.'] },
  tapaFrente: { t: 'Cubierta frontal', gr: 'bronce grabado', ev: 1, p: [
    'Grabada por fuera. Conserva los periodos planetarios: ϒΞΒ (462) para Venus y ϒΜΒ (442) para Saturno. Son los únicos dos números planetarios que son evidencia y no deducción.'],
    src: 'Anastasiou et al., <i>Almagest</i> 7(1) 250–297 (2016).' }
});

const _gk = s => `<div class="gk2">${s}</div>`;
const _tr = s => `<div class="tr">${s}</div>`;
Object.assign(INFO, {
  parapegma: { t: 'El parapegma', gr: 'ortos y ocasos de estrellas', ev: 1, html: () =>
    `<p>Dos placas de 171 mm de ancho, una encima y otra debajo del dial frontal, con dos columnas cada
     una: una por estación. Cuarenta y dos entradas indexadas —30 fenómenos estelares y 12 entradas de
     «el Sol entra en el signo»— más cuatro líneas sin índice para los solsticios y los equinoccios.
     <b>Sobreviven partes de 31 líneas de 46.</b> Es la letra más grande de la máquina: 2.3 a 3.0 mm.</p>
     <p>Las <b>13 letras índice</b> que ves en el anillo zodiacal están en su grado real. Se agolpan entre
     Virgo y Sagitario porque solo sobrevive el Fragmento C, que cubre ese arco. Los mismos cuatro nombres
     del zodiaco que aparecen en claro son los únicos que existen.</p>
     <p><b>La columna mejor conservada, entera y verbatim</b> (PP1 col. ii, primavera):</p>` +
     PARAPEGMA_II.map(([L, gr, es]) => _gk(gr) + _tr(es)).join('') +
     `<p>Y algunas de las otras columnas:</p>` +
     PARAPEGMA_OTRAS.map(([gr, es, nota]) => _gk(gr) + _tr(es + ' <span class="ln">· ' + nota + '</span>')).join('') +
     `<p style="color:var(--ink3);font-size:12px">Los solsticios van en <b>plural</b> —τροπαί— y los
     equinoccios en singular —ἰσημερία—. El único equinoccio parcialmente leído es el de otoño; el de
     primavera está enteramente restituido. Los verbos son ἐπιτέλλω (salir) y δύνω / δύομαι (ponerse).</p>`,
    src: 'IAM 3 (Bitsakis &amp; Jones), <i>Almagest</i> 7.1 (2016), pp. 68–137.' },

  dialFrente: { t: 'Los rótulos del dial frontal', gr: 'ΧΗΛΑΙ · ΠΑΧΩΝ', ev: 1, html: () =>
    `<p>Solo sobreviven <b>cuatro nombres del zodiaco</b> — Παρθένος, Χηλαί, Σκορπίος, Τοξ[ότης] — y
     <b>tres meses egipcios</b> — Παχών, Παῦνι, Ἐπείφ. En el dial los verás en claro; los demás están
     apagados porque son restitución.</p>
     <p>Χηλαί, «las Pinzas» del Escorpión, es el nombre griego antiguo de Libra, heredado de Babilonia.
     Ζυγός, «la Balanza», es posterior.</p>
     <p>El nombre del signo va escrito a lo largo del arco del sector, entre determinadas graduaciones:
     Χηλαί ocupa de la 9.ª a la 17.ª. Altura de letra: 1.8 mm.</p>
     <p>La placa del dial frontal mide 165 × 171 mm, con un recorte circular de 132 mm y un anillo de
     <b>365 agujeros</b> de 0.7 a 0.8 mm de diámetro a 74.0 mm de radio. Ese recuento de 365 es el de la
     edición de 2016 y es justo el que discuten Budiselic (2020) y Woan y Bayley (2024), que miden 354.</p>`,
    src: 'IAM 3, pp. 74–85; IAM 1 §1.5.' },

  dialDorso: { t: 'Los rótulos de los diales traseros', gr: 'ΦΟΙΝΙΚΑΙΟΣ · ΟΛΥΜΠΙΑ', ev: 1, html: () =>
    `<p>Los doce meses corintios, con la ortografía canónica de la edición:</p>
     ${_gk('Φοινικαῖος   Κρανεῖος   Λανοτρόπιος   Μαχανεύς\nΔωδεκατεύς   Εὔκλειος   Ἀρτεμίσιος   Ψυδρεύς\nΓαμείλιος   Ἀγριάνιος   Πάναμος   Ἀπελλαῖος')}
     <p>«Aunque muy pocas celdas son completamente legibles, las repeticiones de los nombres garantizan
     que todas estas grafías son correctas.» El año va marcado con el símbolo <b>L</b> = ἔτος: se leen
     α΄, δ΄, η΄, ιβ΄, [ι]ε΄ y ιϛ. Las celdas 128 y 129 son <b>las dos Μαχανεύς</b>: el único mes
     intercalar atestiguado, en el año 11.</p>
     <p>El dial de los Juegos, los cuatro sectores completos. Es el único dial cuyas inscripciones miran
     hacia el centro, y sus líneas divisorias están inclinadas unos 8°:</p>
     ${_gk('año α΄   Ἴσθμια | Ὀλύμπ̣ι̣α̣\naño β΄   Νέμε̣α̣ | Νᾶα\naño γ΄   Ἴσ[θ]μ̣ια | Π̣ύθι̣α\naño δ΄   Νέμεα | Ἁ̣λι̣εῖα')}
     <p>En todo el dial hay <b>una sola restitución</b>: la theta de Ἴσ[θ]μ̣ια. Ἁλιεῖα, los juegos de Rodas,
     no se había leído en 2008.</p>
     <p>El dial del exeligmós, completo: sector 1 vacío, sector 2 <b>η</b> (8), sector 3 <b>ιϛ</b> (16).
     Eso es todo lo que hay. La palabra ἐξελιγμός no está grabada en ninguna parte.</p>`,
    src: 'IAM 4, <i>Almagest</i> 7.1 (2016), pp. 138–215.' },

  glifos: { t: 'Los glifos de los eclipses', gr: 'Σ · Η · ὥρ(ᾳ)', ev: 1, html: () =>
    `<p>La sintaxis, formalmente: <b>Σ</b> encabeza la predicción lunar (Σελήνη), <b>Η</b> la solar (Ἥλιος).
     Luego el momento del día y la hora, y al final una letra índice.</p>
     <p>Las abreviaturas no se escriben con letras seguidas sino con <b>monogramas</b>: ἡμέρας es una
     <i>mu montada sobre una eta</i>; νυκτός, una <i>ípsilon sobre una ny</i>; y ὥρᾳ —en dativo, «a la
     hora»— es una <i>omega cursiva atravesada por una rho alargada verticalmente</i>. Esa omega cursiva
     no aparece como letra suelta en ninguna otra inscripción de la máquina.</p>
     <p>Las horas van de α΄ a ιβ΄, siempre número entero de 1 a 12. El seis es <b>ϛ</b>, digamma.</p>
     <p>Las <b>letras índice</b> recorren dos veces el alfabeto griego completo de 24 letras: las del
     segundo alfabeto llevan <b>una raya encima</b>. Después hacen falta dos o tres símbolos más, para
     unas 50 o 51 celdas indexadas. Solo <b>un</b> símbolo no alfabético está atestiguado en el objeto,
     y los editores creen que era el numeral de 1000.</p>
     <p>De las 51 celdas reconstruidas, <b>20 conservan texto</b>. Éstas:</p>` +
     Object.entries(GLYPH_TEXT).map(([c, g]) =>
       `<div class="gk2" style="font-size:12.5px">celda ${c} · Fragmento ${g[2]}<br>${g[0].replace(/\|/g, '<br>')}</div><div class="tr">${g[1]}</div>`).join('') +
     `<p>Y el texto de la placa posterior añade las «características» del eclipse: tamaño, <b>color</b> y
     <b>vientos</b> —de dónde vienen, cómo giran, dónde acaban—. Eso no tiene ninguna función astronómica.
     Es material de presagio, heredado de la adivinación babilónica.</p>`,
    src: 'IAM 4, pp. 158–200. Los 51 glifos: Tabla 4.6, p. 200.' },

  bpi: { t: 'Placa posterior · el texto de los eclipses', gr: 'ΒΠΙ', ev: 1, html: () =>
    `<p>Debajo de la espiral del Saros. Cada párrafo describe un eclipse con la misma estructura: un
     sujeto plural tácito que empieza en una dirección de viento, «gira alrededor» y «acaba hacia» otra;
     un adjetivo en femenino plural; y «el color es» tal.</p>
     <p>Y luego, una línea de letras índice que remite a las celdas de la espiral. La línea 36 es la única
     que <b>no necesita ninguna restitución</b>:</p>
     ${_gk('Τ  Η̅  Θ  Ρ̅  Ψ̅')}
     <p>Altura de letra 1.6 mm en el Fragmento A, 2.0 mm en el F. Interlínea 3.0 mm.</p>`,
    src: 'IAM 4, pp. 163–200.' },

  bci: { t: 'Inscripción de la Cubierta Posterior', gr: 'el cosmos, descrito', ev: 1, html: () =>
    `<p>Cincuenta y cinco líneas en una sola columna ancha, de unas 75 letras cada una. No es un manual
     de instrucciones: los editores lo rechazan expresamente. Su relación con la máquina «era como la de
     <b>un pie de foto respecto a un dibujo, dirigido al espectador y no al operario</b>».</p>
     <p>La parte I describe la cara frontal, hacia fuera desde el centro. Es la prueba de que había
     planetas:</p>` +
     BCI_I.map(([n, gr, es]) => `<div class="gk2"><span class="ln">I.${n}</span>  ${gr}</div>${_tr(es)}`).join('') +
     `<p>Los nombres que <b>sí</b> sobreviven en el metal son Ἀφροδίτη Φωσφόρος (Venus), Ἥλιος (Sol) y
     Ἄρης Πυρόεις (Marte). De Júpiter solo queda «έθοντος» y de Saturno «ίνοντος»: los nombres divinos
     son restitución. De Mercurio no queda el nombre, solo una conjetura sobre la sílaba final.</p>
     <p>Y fíjate en la línea I.19: <b>Ἀφροδίτη&lt;ς&gt;</b>. El grabador se comió la sigma final. En la II.5
     empezó a escribir στημάτιον y se corrigió sobre la marcha — señal de que grababa directamente desde
     un original escrito, sin trazar antes.</p>
     <p>La parte II describe la cara posterior:</p>` +
     BCI_II.map(([n, gr, es]) => `<div class="gk2"><span class="ln">II.${n}</span>  ${gr}</div>${_tr(es)}`).join('') +
     `<p>El <b>σλ̅ε</b> de la línea II.3 —235— es «el único caso definido» en toda la máquina de un numeral
     marcado con raya. Los demás números van sueltos, con un pequeño espacio antes y después.</p>
     <p style="color:var(--ink3);font-size:12px">Detalle palegráfico: en esta inscripción la theta es
     siempre <b>un óvalo estrecho con una raya</b>; en todas las demás es <b>un círculo con un punto</b>.
     Esa diferencia constante es difícil de explicar si no la grabó <b>otra persona</b>.</p>`,
    src: 'IAM 5 (Bitsakis &amp; Jones), <i>Almagest</i> 7.1 (2016), pp. 216–249.' },

  fci: { t: 'Inscripción de la Cubierta Frontal', gr: 'los periodos planetarios', ev: 1, html: () =>
    `<p>Cuarenta y tres líneas seguidas, todas descripciones de los ciclos sinódicos de los cinco planetas,
     en el orden Mercurio, Venus, Marte, Júpiter, Saturno. Cada bloque da un intervalo largo con números
     enteros de ciclos, la duración aproximada de un ciclo en días, y el ciclo troceado en tramos según la
     dirección del movimiento y la relación con el Sol. <b>No sobrevive ningún encabezado.</b></p>` +
     FCI_LINES.map(([n, gr, es, q]) => `<div class="gk2"><span class="ln">${n}</span>  ${gr}</div>${_tr(es + ' <span class="ln">· ' + q + '</span>')}`).join('') +
     `<p><b>Los únicos dos números planetarios que son evidencia son 462 y 442.</b> El 289 de Venus y el
     427 de Saturno no están en el objeto: son deducción de los editores. Y los tres periodos de Mercurio,
     Marte y Júpiter son deducción de Freeth.</p>
     <p>Sobre las letras: el artículo de 2021 imprimió <b>ΨΞΒ</b> y <b>ΨΜΒ</b>, y tuvo que publicar una
     corrección en agosto de ese año. En numeración jónica Υ = 400 y Ψ = 700, así que ΨΞΒ sería 762, no 462.
     Fue un error de tipografía —ϒ es un codepoint matemático que se confunde con Ψ—; la edición de 2016 ya
     leía ípsilon, sin duda, desde el principio. En el objeto se distinguen sin problema: la ípsilon es una
     V sobre un tallo; la psi es mucho más ancha.</p>
     <p style="color:var(--ink3);font-size:12px">Y una finura: en esta inscripción la xi aparece de dos
     formas, con tres trazos horizontales (Ξ) y con tres trazos cruzados por una vertical. La versión de
     cuatro trazos parece reservada <b>a los numerales</b>. El 462 lleva xi de cuatro trazos.</p>`,
    src: 'IAM 6, <i>Almagest</i> 7.1 (2016), pp. 250–297; corrección: <i>Sci Rep</i> 11:17361 (2021).' }
});

/* ---------- estado y lectura ---------- */
/* ============================================================
   LECTURA
   Se construye UNA vez y después solo se actualiza el texto.
   Antes se reconstruía el innerHTML en cada fotograma: con la manivela
   girando, eso hacía saltar toda la caja. Tres reglas ahora:
     · el esqueleto no cambia nunca — todas las filas siempre presentes
     · cada celda tiene altura reservada, así nada empuja a lo de abajo
     · los planetas van SIEMPRE en orden cosmológico, nunca ordenados
       por valor: si se reordenan solos, la vista es ilegible en marcha
   ============================================================ */
let RO = null;
function buildReadout() {
  const grid = document.getElementById('grid');
  const mk = (cls, id) => {
    const d = document.createElement('div');
    d.className = 'cell' + (cls ? ' ' + cls : '');
    if (id) d.dataset.id = id;
    d.innerHTML = '<div class="k"></div><div class="v"></div>';
    grid.appendChild(d);
    return { box: d, k: d.querySelector('.k'), v: d.querySelector('.v') };
  };
  grid.textContent = '';
  RO = {
    dateval: document.getElementById('dateval'),
    turns: document.getElementById('turns'),
    sol: mk('', 'sol'), luna: mk('', 'luna'),
    mes: mk('', 'metonico'), juegos: mk('', 'juegos'),
    ecl: mk('wide c-ecl', 'glifos'), pla: mk('wide c-pla', ''),
    cmp: mk('wide cmp c-cmp', ''), drift: mk('wide c-drift', '')
  };
  grid.onclick = e => { const c = e.target.closest('.cell[data-id]'); if (c && c.dataset.id) select(c.dataset.id); };
}

const ZAB = ['Ari','Tau','Gém','Cán','Leo','Vir','Lib','Esc','Sag','Cap','Acu','Pis'];
const PHASE = e => e < 22 || e > 338 ? 'nueva' : e < 68 ? 'creciente' :
  e < 112 ? 'cuarto creciente' : e < 158 ? 'gibosa creciente' :
  e < 202 ? 'llena' : e < 248 ? 'gibosa menguante' :
  e < 292 ? 'cuarto menguante' : 'menguante';

function updateReadout(o) {
  if (!RO) buildReadout();
  const MD = MODELS[MK];
  const f = fmtDate(o.jd);
  RO.dateval.innerHTML = `${f.txt} <small>${f.cal}</small>`;
  RO.turns.textContent = `${Math.abs(o.crankTurns).toFixed(2)} vueltas · b1 ${o.T.toFixed(3)}`;

  const sunLon = MD.trueSun ? o.trueSun : o.meanSun;
  const sign = ZODIAC[Math.floor(n360(sunLon) / 30)], signM = ZODIAC[Math.floor(n360(o.trueMoon) / 30)];
  const dg = x => `${Math.floor(x % 30)}°${String(Math.floor((x % 1) * 60)).padStart(2, '0')}′`;
  const key = (n, col) => `<i style="background:${col}"></i>${n}`;

  RO.sol.k.innerHTML = key(MD.trueSun ? 'Sol verdadero' : 'Sol medio', C.sol);
  RO.sol.v.innerHTML = `${sign[1]} ${dg(sunLon)} <em>${sign[0]}</em>`;
  RO.luna.k.innerHTML = key('Luna', C.luna);
  RO.luna.v.innerHTML = `${signM[1]} ${dg(o.trueMoon)} <em>${PHASE(o.elong)}, ${o.age.toFixed(1)} d</em>`;
  RO.mes.k.innerHTML = key('Mes corintio', C.bronze);
  RO.mes.v.innerHTML = `${o.corinth.name}${o.corinth.inter ? ' <em>intercalar</em>' : ''} <em>año ${o.corinth.y} de 19</em>`;
  RO.juegos.k.innerHTML = key('Juegos', C.patina);
  RO.juegos.v.innerHTML = `${GAMES[o.gamesSector][1]} <em>+ ${GAMES[o.gamesSector][0]}</em>`;

  /* — eclipses: dos líneas siempre. El griego grabado vive en la ficha, no aquí — */
  const g = o.glyph;
  if (g) {
    const [, bits, idxKey, engCell] = g;
    const tipo = (bits & 2 ? '<b>lunar</b> (Σ)' : '') + (bits === 3 ? ' y ' : '') + (bits & 1 ? '<b>solar</b> (Η)' : '');
    RO.ecl.box.classList.remove('none');
    RO.ecl.k.innerHTML = key(`Saros · celda ${o.sarosCell + 1} de 223 · grabada ${engCell} · índice ${IDX_GR[idxKey] || idxKey}`, C.bronzeHi);
    RO.ecl.v.innerHTML = `Posibilidad de eclipse ${tipo}, más ${['0', '8', '16'][o.exeligmosSector]} h por el exeligmós.
      <em>${GLYPH_TEXT[engCell] ? 'Toca para ver el grabado.' : 'La hora se perdió: celda reconstruida.'}</em>`;
  } else {
    RO.ecl.box.classList.add('none');
    RO.ecl.k.innerHTML = key(`Saros · celda ${o.sarosCell + 1} de 223`, C.line);
    RO.ecl.v.innerHTML = `<em>celda sin glifo — ningún eclipse posible este mes</em>`;
  }

  /* — planetas: orden cosmológico fijo, nunca por valor — */
  RO.pla.k.innerHTML = MD.planets
    ? `Los cinco planetas <em style="text-transform:none;letter-spacing:0">℞ = retrógrado</em>` : 'Los cinco planetas';
  RO.pla.v.innerHTML = MD.planets
    ? PLANETS.map(p => {
        const st = o.planets[p.id], z = ZODIAC[Math.floor(st.lon / 30)];
        return `<span class="chip fx"><i style="background:${C[p.id]}"></i>${p.es} ${ZAB[Math.floor(st.lon / 30)]} ${String(Math.floor(st.lon % 30)).padStart(2, ' ')}°<b class="rx">${st.retro ? '℞' : ''}</b></span>`;
      }).join('')
    : `<em>Voulgaris et al. 2026 sostienen que no estaban. Nombrarlos en la inscripción no prueba que hubiera engranaje para moverlos.</em>`;

  /* — discrepancia entre modelos, mismo orden fijo — */
  if (MD.planets) {
    const otro = MK === 'f2021' ? 'fj2012' : 'f2021';
    RO.cmp.k.innerHTML = key(`Discrepancia con ${MODELS[otro].short}`, C.patina);
    RO.cmp.v.innerHTML = PLANETS.map(p => {
      const ol = lonFor(otro, p.id, o.T); let d = Math.abs(ol - o.planets[p.id].lon); if (d > 180) d = 360 - d;
      return `<span class="chip fx"><i style="background:${C[p.id]}"></i>${p.es} <b>${d.toFixed(1)}°</b></span>`;
    }).join('');
  } else {
    RO.cmp.k.innerHTML = key('Discrepancia entre modelos', C.line);
    RO.cmp.v.innerHTML = `<em>esta lectura no propone planetas, así que no hay con qué comparar</em>`;
  }

  /* — error acumulado: la fila existe siempre, para que nada salte — */
  const yrs = Math.abs(o.T);
  RO.drift.k.innerHTML = key(`Error acumulado · ${Math.round(yrs)} años desde la calibración`, C.ink3);
  RO.drift.v.innerHTML = yrs < 5
    ? `<em>todavía nada apreciable: la máquina acaba de calibrarse</em>`
    : `<span class="chip fx">Luna <b>${(yrs * 0.06553).toFixed(1)}°</b></span><span class="chip fx">Sol ${(yrs * 0.00447).toFixed(1)} d</span><span class="chip fx">metónico ${Math.abs(o.drift.metonic).toFixed(1)} d</span><span class="chip fx">Saros ${(yrs / 18.0298 * 0.0767).toFixed(1)} d</span>`;
}

function select(id) {
  if (id && String(id).startsWith('frag_')) {
    const f = id.slice(5);
    fragSel = (fragSel === f) ? null : f;
    showFrag(fragSel); render(); return;
  }
  sel = (sel === id) ? null : id;
  showInfo(sel); render();
}

function showInfo(id) {
  const box = document.getElementById('info');
  if (!id) {
    box.innerHTML = `<h3>El cosmos en una caja de 315 × 190 × 100 mm</h3>
      <p>Toca cualquier anillo, puntero, dial o engrane para ver qué hace, de qué tren de engranes sale
      y cuánta evidencia física lo respalda.</p>
      <p><b>El color significa siempre lo mismo:</b> oro vivo = la pieza existe en metal; oro pálido = lo
      dice una inscripción; gris = reconstruido; gris punteado = conjetural. Los siete cuerpos celestes
      tienen color propio, pero solo en la cara frontal, donde ellos son el tema.</p>
      <p style="color:var(--ink3);font-size:12px">De los ~69 engranes del modelo completo, <b>30 sobreviven</b>
      y 39 están perdidos. Todo lo que queda del aparato son <b>82 trozos, 895 gramos de bronce</b>, y el
      Fragmento A solo es el 41 % de ese peso. Ningún engrane planetario sobrevive: la cara frontal entera
      se infiere de una inscripción y de una rueda suelta de 63 dientes.</p>`;
    return;
  }
  const gearRow = GEARS.find(g => g[0] === id);
  if (gearRow) {
    const [gid, N, rp, arb, ev, ch] = gearRow;
    const rate = gearRate(gid, arb);
    const sib = GEARS.filter(g => g[3] === arb && g[0] !== gid);
    const junto = sib.filter(g => gearRate(g[0], arb) === rate).map(g => g[0]);
    const suelto = sib.filter(g => gearRate(g[0], arb) !== rate).map(g => g[0]);
    const lista = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1] : a[0];
    let eje = `sobre el árbol <b>${arb}</b>`;
    if (junto.length) eje += `, clavada al mismo eje que ${lista(junto)}: las ${NUM[junto.length + 1] || junto.length + 1} giran solidarias`;
    if (suelto.length) eje += `${junto.length ? '; ' : ', pero '}${lista(suelto)} comparte${suelto.length > 1 ? 'n' : ''} ese eje sin girar con ${junto.length ? 'ellas' : 'ella'}: ahí está el epiciclo`;
    if (!junto.length && !suelto.length) eje += ', que no comparte con ninguna otra rueda';
    box.innerHTML = `<h3>Engrane ${gid}</h3>
      <div class="gk">${N} dientes · radio primitivo ${rp} mm · módulo ${(2 * rp / N).toFixed(3)}</div>
      <span class="ev ev${ev}">${EVLABEL[ev - 1]}</span>
      <p>${GEARNOTE[gid] || 'Rueda de bronce de dientes triangulares, cortada a lima. Las divisiones desiguales indican que no se usó máquina divisora.'}</p>
      <p style="color:var(--ink3);font-size:12px">Va en el tren de <b>${CHAIN_NAME[ch] || ch}</b>, ${eje}.</p>
      <div class="chain">${rate >= 0 ? '+' : '−'}${Math.abs(rate).toFixed(6)} vueltas por año de b1</div>
      <div class="src">Medidas: Freeth et al. 2021, <i>Scientific Reports</i> 11:5821, Tabla Suplementaria S8 (tomografía de rayos X).</div>`;
    return;
  }
  const e = INFO[id]; if (!e) { showInfo(null); return; }
  let html = `<h3>${e.t}</h3><div class="gk">${e.gr}</div><span class="ev ev${e.ev}">${EVLABEL[e.ev - 1]}</span>`;
  if (e.html) { box.innerHTML = html + e.html() + (e.src ? `<div class="src">${e.src}</div>` : ''); if (typeof letraSel !== 'undefined') letraSel = id; return; }
  if (e.planet) {
    const p = e.planet, st = out.planets[p.id], z = ZODIAC[Math.floor(st.lon / 30)];
    html += `<p>Según <b>${MODELS[MK].short}</b>: <b>${p.sig}</b> apariciones en <b>${p.Y}</b> años
      → periodo sinódico ${p.synDays.toFixed(3)} días, contra ${TRUE_SYN[p.id]} reales.
      Error de <b>${Math.abs(p.err).toFixed(4)}%</b>. Periodo sidéreo ${p.Pfrac} = ${p.P.toFixed(5)} años.</p>`;
    { const otro = MK === 'f2021' ? 'fj2012' : 'f2021', ol = lonFor(otro, p.id, out.T);
      if (ol !== null) { let d = Math.abs(ol - st.lon); if (d > 180) d = 360 - d;
        html += `<p style="color:var(--ink3);font-size:12px">Hoy, ${MODELS[otro].short} lo pondría en
          ${ZODIAC[Math.floor(ol / 30)][1]} ${Math.floor(ol % 30)}°: <b>${d.toFixed(1)}° de diferencia</b>.
          Los dos modelos son cinemáticamente correctos; solo difieren en qué fracción eligió el constructor.</p>`; } }
    if ((p.id === 'venus' || p.id === 'saturno') && MK === 'f2021')
      html += `<p><b>Este número está escrito en la máquina.</b> La Inscripción de la Cubierta Frontal
        conserva ϒΞΒ (462) para Venus y ϒΜΒ (442) para Saturno. Son los dos únicos periodos planetarios
        que son evidencia y no deducción; los otros tres se derivaron buscando fracciones factorizables
        de precisión parecida.</p>`;
    else if (MK === 'f2021') html += `<p>Este periodo <b>no está escrito en ninguna parte</b>. Se dedujo
      buscando la fracción más económica y factorizable que diera la precisión adecuada. Para Júpiter hay
      al menos otra matemáticamente posible.</p>`;
    else html += `<p>Es un <b>periodo babilónico de año-meta</b>, del tipo que aparece atestiguado en tablillas
      cuneiformes. No está escrito en la máquina, pero sí en la tradición de la que la máquina bebe.</p>`;
    html += `<p>El movimiento se arma sumando dos giros uniformes: el deferente y el epiciclo. Eso es
      exactamente la teoría de Apolonio de Perga, y es lo que produce los <b>lazos retrógrados</b>.
      Ahora mismo ${p.es} está en ${z[1]} y va ${st.retro ? '<b>retrógrado</b>' : 'directo'}.</p>`;
    html += `<p style="color:var(--ink3);font-size:12px">Detalle de fidelidad: los lazos salen todos del
      mismo tamaño en cualquier punto del zodiaco. Es un modelo de <b>anomalía única</b>. La segunda
      anomalía —la zodiacal— no está, y Ptolomeo cuenta que Hiparco ya se quejaba de que faltaba.</p>`;
  }
  (e.p || []).forEach(t => html += `<p>${t}</p>`);
  if (e.chain) html += `<div class="chain">${e.chain}</div>`;
  if (e.src) html += `<div class="src">${e.src}</div>`;
  box.innerHTML = html;
}

/* ---------- fichas de los fragmentos ---------- */
function showFrag(id) {
  const box = document.getElementById('info');
  if (!id) {
    box.innerHTML = `<h3>82 fragmentos, 895 gramos</h3>
      <p>Todo lo que queda del mecanismo de Anticitera cabe en <b>menos de un kilo de bronce</b> y suma
      731 cm² de superficie. El reparto es brutalmente desigual: el <b>Fragmento A solo</b> es el 31 % de
      la superficie y el 41 % del peso, y dentro lleva 27 de los 30 engranes. Los siete grandes son el
      69 %; los otros 75, juntos, el 31 %. <b>Treinta y ocho miden menos de un centímetro cuadrado.</b></p>
      <p>En 1902 se conocían <b>tres</b>. La mayoría de los pequeños los <b>fabricó la conservación de
      1905</b> al separar piezas fusionadas. El D se perdió dentro del museo hasta 1973; el E apareció en
      1976 en un almacén de cerámica del sótano; el F, en 2005, catalogando lo no expuesto. Desde entonces
      el inventario está en 82 y <b>no ha subido</b>: ninguna campaña de buceo, ni la de Cousteau ni las de
      2021 a 2025, ha recuperado un solo fragmento nuevo.</p>
      <p style="color:var(--ink3);font-size:12px">Los recuadros son medidas reales donde están publicadas
      —30 de los 82—; los demás son cuadrados del área equivalente, con línea punteada. El relleno interior
      es la superficie realmente medida, así que el hueco entre relleno y recuadro es lo que el trozo
      <i>no</i> ocupa dentro de su caja. Nadie ha publicado los contornos.</p>`;
    return;
  }
  const f = FRAG[id], cls = FRAG_CLASS[f[5]];
  const dim = (f[2] && f[3]) ? `${f[2]} × ${f[3]}${f[4] ? ' × ' + f[4] : ''} mm` :
    `${(Math.sqrt(f[0]) * 10).toFixed(0)} mm de lado equivalente <em style="font-style:normal;color:var(--ink3)">· medidas no publicadas</em>`;
  const rank = Object.keys(FRAG).sort((a, b) => FRAG[b][0] - FRAG[a][0]).indexOf(String(id)) + 1;
  box.innerHTML = `<h3>Fragmento ${id}</h3>
    <div class="gk">${dim}</div>
    <span class="ev ev1" style="border-color:${cls.col}55;color:${cls.col};background:transparent">${cls.lb}</span>
    <div class="chain">${f[0]} cm² · ${f[1]} g · el ${rank}.º más grande de los 82</div>
    <p>${FRAG_NOTE[id] || (f[5] === 'P'
      ? 'Sin inscripción. Es uno de los 23 fragmentos que la edición agrupa como «fragmentos sin inscripciones»: no llevan texto y no se han identificado como parte de ningún componente concreto.'
      : f[5] === 'U'
      ? 'Uno de los trozos diminutos «con inscripciones sin ubicar». La edición de 2016 los deja fuera expresamente: llevan letras, pero nadie sabe de qué texto vienen.'
      : 'Fragmento de placa inscrita.')}</p>
    <div class="src">Área y peso: Freeth et al., <i>Nature</i> 444 (2006), Notas Suplementarias 1.
    Medidas: <i>Almagest</i> 7.1 (2016), §§3.2, 4.2, 5.2 y 6.2${id === 'D' ? '; Price 1974, p. 36' : ''}.</div>`;
}

/* ---------- la reconstrucción activa ---------- */
function showModel() {
  const m = MODELS[MK], box = document.getElementById('info');
  box.innerHTML = `<h3>${m.long}</h3>
    <div class="gk">${m.gears} engranes en total · 30 sobreviven · <b>${m.lost} perdidos</b> · ${m.front} en la cara frontal</div>
    <p>${m.what}</p>
    <p><b style="color:var(--ev1)">A favor.</b> ${m.strong}</p>
    <p><b style="color:var(--ev4)">En contra.</b> ${m.weak}</p>
    <div class="src">${m.who}</div>`;
}
function setModel(k) {
  MK = k; PLANETS = planetList(k); refreshPlanetInfo();
  document.querySelectorAll('.models button').forEach(x => x.setAttribute('aria-pressed', x.dataset.m === k));
  if (sel && BODY[sel] && !MODELS[k].per[sel]) sel = null;
  if (sel === 'nodos' && !MODELS[k].nodes) sel = null;
  if (sel === 'sol' && !MODELS[k].trueSun) sel = null;
  document.getElementById('modelnote').innerHTML =
    `${MODELS[k].gears} engranes, <b>${MODELS[k].lost} perdidos</b>. El dorso es idéntico en las tres
     lecturas: lo que se discute es la cara frontal.`;
  buildLegend(); showModel(); render();
}
document.querySelectorAll('.models button').forEach(b => b.onclick = () => setModel(b.dataset.m));

/* ---------- manivela ---------- */
const crank = document.getElementById('crank'), cctx = crank.getContext('2d');
let crankAngle = 0;
function drawCrank() {
  const s = 180, r = 66, cx = 90, cy = 90;
  cctx.setTransform(1, 0, 0, 1, 0, 0); cctx.clearRect(0, 0, s, s);
  crankAngle = T * M.crankRatio * TAU;
  const g = cctx.createRadialGradient(cx - 14, cy - 16, 4, cx, cy, r + 8);
  g.addColorStop(0, '#4e4738'); g.addColorStop(1, '#26241f');
  cctx.beginPath(); cctx.arc(cx, cy, r, 0, TAU); cctx.fillStyle = g; cctx.fill();
  cctx.strokeStyle = '#8a7b56'; cctx.lineWidth = 3; cctx.stroke();
  /* corona a1: 48 dientes */
  for (let i = 0; i < 48; i++) {
    const a = crankAngle + i / 48 * TAU;
    cctx.beginPath();
    cctx.moveTo(cx + (r - 9) * Math.cos(a), cy + (r - 9) * Math.sin(a));
    cctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    cctx.strokeStyle = '#9a8760'; cctx.lineWidth = 2; cctx.stroke();
  }
  /* brazo */
  const a = crankAngle;
  cctx.beginPath(); cctx.moveTo(cx, cy);
  cctx.lineTo(cx + (r - 16) * Math.cos(a), cy + (r - 16) * Math.sin(a));
  cctx.strokeStyle = '#c99a4a'; cctx.lineWidth = 7; cctx.lineCap = 'round'; cctx.stroke();
  cctx.beginPath(); cctx.arc(cx + (r - 16) * Math.cos(a), cy + (r - 16) * Math.sin(a), 10, 0, TAU);
  cctx.fillStyle = '#f0c069'; cctx.fill();
  cctx.beginPath(); cctx.arc(cx, cy, 9, 0, TAU); cctx.fillStyle = '#403a30'; cctx.fill();
  cctx.strokeStyle = '#8a7b56'; cctx.lineWidth = 2; cctx.stroke();
}

let dragging = false, lastAng = 0;
function angFrom(ev, el) {
  const r = el.getBoundingClientRect();
  const p = ev.touches ? ev.touches[0] : ev;
  return Math.atan2(p.clientY - (r.top + r.height / 2), p.clientX - (r.left + r.width / 2));
}
function crankStart(e) { dragging = true; lastAng = angFrom(e, crank); e.preventDefault(); }
function crankMove(e) {
  if (!dragging) return;
  const a = angFrom(e, crank);
  let d = a - lastAng; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU;
  lastAng = a;
  T += (d / TAU) / M.crankRatio;
  render(); e.preventDefault();
}
function crankEnd() { dragging = false; }
crank.addEventListener('mousedown', crankStart); crank.addEventListener('touchstart', crankStart, { passive: false });
window.addEventListener('mousemove', crankMove); window.addEventListener('touchmove', crankMove, { passive: false });
window.addEventListener('mouseup', crankEnd); window.addEventListener('touchend', crankEnd);

/* ============================================================
   ARRASTRAR SOBRE LA MÁQUINA PARA GIRARLA
   El control estaba abajo y el aparato arriba: en el teléfono no
   cabían los dos en pantalla. Ahora la máquina ES el control, que
   es como se usaba el original — se agarra y se gira.
     · arrastrar sobre el anillo exterior del calendario = girar el anillo
     · arrastrar en cualquier otro sitio = dar vuelta a la manivela
     · un giro completo del dedo = una vuelta de manivela = 78.6 días
   Un gesto vertical sigue haciendo scroll: solo capturamos cuando el
   movimiento es claramente horizontal.
   ============================================================ */
const TURNABLE = new Set(['front', 'back', 'gears', 'corte']);
let drag = null;

function dialCenter() {
  return view === 'front' ? { cx: W / 2, cy: W * .565, R: W * .452 }
                          : { cx: W / 2, cy: H / 2, R: Math.min(W, H) * .45 };
}
function localPt(ev) {
  const r = cv.getBoundingClientRect();
  return { x: ev.clientX - r.left, y: ev.clientY - r.top };
}

cv.addEventListener('pointerdown', ev => {
  if (!TURNABLE.has(view)) return;
  const p = localPt(ev), c = dialCenter();
  const d = Math.hypot(p.x - c.cx, p.y - c.cy);
  const onRing = view === 'front' && d > c.R * .87 && d < c.R * 1.02;
  drag = { id: ev.pointerId, touch: ev.pointerType !== 'mouse',
           x0: ev.clientX, y0: ev.clientY, xl: ev.clientX,
           ang: Math.atan2(p.y - c.cy, p.x - c.cx),
           mode: onRing ? 'ring' : null, locked: onRing, moved: false };
  if (onRing) cv.setPointerCapture(ev.pointerId);
});

cv.addEventListener('pointermove', ev => {
  if (!drag || ev.pointerId !== drag.id) return;
  const dx = ev.clientX - drag.x0, dy = ev.clientY - drag.y0;
  if (!drag.locked) {
    /* Con ratón no hay conflicto: cualquier movimiento agarra, y el giro es
       circular. Con el dedo sí lo hay —la página necesita poder desplazarse—
       así que solo agarramos cuando el gesto es claramente horizontal, y
       entonces el giro se mide por el desplazamiento lateral. */
    if (drag.touch) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
    } else if (Math.abs(dx) < 3 && Math.abs(dy) < 3) return;
    drag.locked = true; drag.mode = 'turn';
    cv.setPointerCapture(ev.pointerId);
  }
  drag.moved = true;
  const p = localPt(ev), c = dialCenter();
  let turns;
  if (drag.mode === 'ring' || !drag.touch) {
    const a = Math.atan2(p.y - c.cy, p.x - c.cx);
    let da = a - drag.ang; while (da > Math.PI) da -= TAU; while (da < -Math.PI) da += TAU;
    drag.ang = a; turns = da / TAU;
    if (drag.mode === 'ring') { calRingOffset += da * R2D; render(); ev.preventDefault(); return; }
  } else {
    turns = (ev.clientX - drag.xl) / Math.max(120, W);   // el ancho del lienzo = una vuelta
    drag.xl = ev.clientX;
  }
  T += turns / M.crankRatio;
  stopPlay(); render(); ev.preventDefault();
});

function endDrag(ev) {
  if (!drag || (ev && ev.pointerId !== drag.id)) return;
  const wasTap = !drag.moved;
  drag = null;
  if (wasTap && ev) canvasTap(ev);
}
cv.addEventListener('pointerup', endDrag);
cv.addEventListener('pointercancel', () => { drag = null; });

/* con ratón, el cursor dice qué hay debajo: mano abierta = agarrar y girar,
   dedo = hay una pieza que se puede señalar */
cv.addEventListener('pointermove', ev => {
  if (drag || ev.pointerType !== 'mouse') return;
  cv.style.cursor = pick(localPt(ev)) ? 'pointer' : (TURNABLE.has(view) ? 'grab' : 'default');
});

/* ---------- toques en el lienzo ---------- */
function pick(p) {
  let best = null, bp = -1, bd = 1e9;
  for (const h of hits) {
    const c = Math.hypot(h.x - p.x, h.y - p.y);
    const d = h.ring !== undefined ? Math.abs(c - h.ring) : c;
    if (d >= h.r) continue;
    const pr = h.pri || 0;
    if (pr > bp || (pr === bp && d < bd)) { bp = pr; bd = d; best = h.id; }
  }
  return best;
}
function canvasTap(ev) { select(pick(localPt(ev))); }

/* ---------- pestañas ---------- */
const GROUPS = {
  maquina:   [['front', 'Frente'], ['back', 'Dorso']],
  dentro:    [['gears', 'Engranajes'], ['corte', 'Corte']],
  evidencia: [['letras', 'Letras'], ['frag', 'Trozos']]
};
const GROUP_OF = { front: 'maquina', back: 'maquina', gears: 'dentro', corte: 'dentro',
  letras: 'evidencia', frag: 'evidencia' };
const VIEWNOTE = {
  front: 'Arrastra sobre el dial para girar la máquina, o sobre el anillo exterior para mover el calendario. Toca cualquier pieza para saber qué es y cuánta evidencia hay detrás.',
  back:  'Arrastra para girar. Los ciclos largos: 235 meses en una espiral de cinco vueltas, 223 en otra de cuatro; los puntos son posibilidades de eclipse.',
  gears: 'Arrastra para girar. A escala real: toca la corona dentada o la letra de cualquier rueda —las coaxiales se distinguen por su radio— y se enciende su tren completo.',
  corte: 'Arrastra para girar: el dorso se queda quieto y el frente cruza el plano de corte. La caja mide 100 mm de fondo y el engranaje ocupa 41.',
  letras: 'El griego, copiado literalmente de la edición de 2016. Toca un bloque del mapa para leer su texto.',
  frag:  'Todo lo que queda: 82 trozos, 731 cm² y 895 gramos de bronce. Toca uno.'
};
function setView(v) {
  view = v; sel = null;
  const g = GROUP_OF[v];
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.group === g));
  const st = document.getElementById('subtabs');
  st.innerHTML = GROUPS[g].map(([id, lb]) =>
    `<button data-view="${id}" aria-pressed="${id === v}">${lb}</button>`).join('');
  st.querySelectorAll('button').forEach(b => b.onclick = () => setView(b.dataset.view));
  document.getElementById('viewnote').textContent = VIEWNOTE[v];
  document.getElementById('corteCtl').style.display = v === 'corte' ? '' : 'none';
  document.getElementById('mainCtl').style.display = (v === 'letras' || v === 'frag') ? 'none' : '';
  const hideM = (v === 'back' || v === 'letras' || v === 'frag');
  document.getElementById('models').style.display = hideM ? 'none' : 'grid';
  document.getElementById('modelnote').style.display = hideM ? 'none' : '';
  if (v === 'letras') showInfo('parapegma');
  else if (v === 'frag') { fragSel = null; showFrag(null); }
  else showInfo(null);
  buildLegend(); resize(); render();
}
document.querySelectorAll('.tab').forEach(b => b.onclick = () => setView(GROUPS[b.dataset.group][0][0]));

/* ---------- leyenda ---------- */
function buildLegend() {
  const L = document.getElementById('legend');
  if (view === 'gears') {
    L.innerHTML = `<span><i style="background:#c99a4a"></i>línea continua = sobrevive (30)</span>
      <span><i style="background:#9a907c"></i>línea punteada = reconstruido</span>
      <span style="color:var(--ink2)">toca una salida arriba y se enciende su tren</span>`;
  } else if (view === 'front') {
    L.innerHTML = '';
  } else if (view === 'frag') {
    L.innerHTML = '';
  } else if (view === 'letras') {
    L.innerHTML = `<span style="color:var(--ink2)">toca un bloque del mapa para leer su texto</span>
      <span><i style="background:#c99a4a"></i>parapegma</span>
      <span><i style="background:#6a9943"></i>dial frontal</span>
      <span><i style="background:#577bd6"></i>dial trasero</span>
      <span><i style="background:#d05040"></i>eclipses</span>`;
  } else if (view === 'corte') {
    L.innerHTML = `<span><i style="background:#cfd6dc"></i>tren de la Luna</span>
      <span><i style="background:#577bd6"></i>Saros</span>
      <span><i style="background:#6a9943"></i>calendarios</span>
      <span><i style="background:#019d9a"></i>Mercurio y Venus</span>
      <span><i style="background:#b263b7"></i>superiores</span>`;
  } else {
    L.innerHTML = `<span><i style="background:var(--patina)"></i>mes intercalar</span>
      <span><i style="background:var(--luna)"></i>eclipse lunar posible</span>
      <span><i style="background:var(--sol)"></i>eclipse solar posible</span>`;
  }
}

/* ---------- modos ---------- */
const mC = document.getElementById('mCrank'), mD = document.getElementById('mDate');
mC.onclick = () => { mC.setAttribute('aria-pressed', 'true'); mD.setAttribute('aria-pressed', 'false');
  document.getElementById('panelCrank').style.display = ''; document.getElementById('panelDate').classList.remove('on'); };
mD.onclick = () => { mD.setAttribute('aria-pressed', 'true'); mC.setAttribute('aria-pressed', 'false');
  document.getElementById('panelCrank').style.display = 'none'; document.getElementById('panelDate').classList.add('on'); playing = false; stopPlay(); };

document.querySelectorAll('.steps button').forEach(b =>
  b.onclick = () => { T += (+b.dataset.d) / M.yearDays; render(); });

let playing = false, raf = null, lastTS = 0;
function stopPlay() {
  if (!playing) return;
  playing = false; cancelAnimationFrame(raf);
  const b = document.getElementById('play');
  b.setAttribute('aria-pressed', 'false'); b.textContent = '▶';
  document.getElementById('playrow').classList.remove('on');
}
const playBtn = document.getElementById('play'), speed = document.getElementById('speed');
playBtn.onclick = () => {
  playing = !playing; playBtn.setAttribute('aria-pressed', playing);
  playBtn.textContent = playing ? '⏸' : '▶';
  /* el mando de velocidad solo existe mientras algo se mueve: así la barra
     flotante es más baja y tapa menos máquina */
  document.getElementById('playrow').classList.toggle('on', playing);
  if (playing) { lastTS = performance.now(); raf = requestAnimationFrame(loop); }
  else cancelAnimationFrame(raf);
};
function loop(ts) {
  if (!playing) return;
  const dt = Math.min(50, ts - lastTS); lastTS = ts;
  T += (+speed.value) * dt / 1000 / M.yearDays;
  render(); raf = requestAnimationFrame(loop);
}

function goDate(y, m, d) {
  T = (toJD(y, m, d) - JD0) / M.yearDays;
  playing = false; playBtn.setAttribute('aria-pressed', 'false'); playBtn.textContent = '▶';
  render();
}
document.getElementById('qgo').onclick = () => {
  const d = +document.getElementById('qd').value, m = +document.getElementById('qm').value;
  let y = +document.getElementById('qy').value; const e = +document.getElementById('qe').value;
  if (e < 0) y = 1 - y;
  goDate(y, m, d);
  document.querySelector('.stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
};
document.querySelectorAll('.presets button').forEach(b => b.onclick = () => {
  if (b.dataset.p === 'today') { const n = new Date(); goDate(n.getFullYear(), n.getMonth() + 1, n.getDate()); }
  else { const [y, m, d] = b.dataset.p.split(',').map(Number); goDate(y, m, d); }
  const c = fromJD(JD0 + T * M.yearDays);
  document.getElementById('qd').value = c.d; document.getElementById('qm').value = c.m;
  document.getElementById('qy').value = c.y <= 0 ? 1 - c.y : c.y;
  document.getElementById('qe').value = c.y <= 0 ? '-1' : '1';
  document.querySelector('.stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const dEx = document.getElementById('depthEx');
dEx.oninput = () => {
  depthEx = (+dEx.value) / 10;
  document.getElementById('depthVal').textContent = '×' + depthEx.toFixed(1);
  resize(); render();
};

window.addEventListener('resize', () => { resize(); render(); });
