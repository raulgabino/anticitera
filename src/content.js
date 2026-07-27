/* ============================================================
   TEXTOS LARGOS
   ============================================================ */
document.getElementById('bodyAlgebra').innerHTML = `
<p>Un engranaje no “representa” un número: <b>lo es</b>. Si una rueda de 64 dientes mueve una de 38,
la salida gira 64/38 veces por cada vuelta de la entrada. Encadena unas cuantas y tienes una fracción
arbitrariamente precisa. La máquina de Anticitera es un evaluador simultáneo de funciones racionales del
tiempo: das una vuelta a la manivela y <b>todas</b> las respuestas se actualizan a la vez.</p>

<h4>Las fracciones que están talladas en el bronce</h4>
<table class="t">
<tr><th>Salida</th><th>Razón</th><th class="n">Valor</th><th class="n">Error</th></tr>
<tr><td>Sol / fecha</td><td>1</td><td class="n">1 vuelta/año</td><td class="n">0 (definición)</td></tr>
<tr><td>Luna sidérea</td><td>254/19</td><td class="n">27.321289 d</td><td class="n">−32 s</td></tr>
<tr><td>Mes sinódico</td><td>235/19</td><td class="n">29.530240 d</td><td class="n">−30 s</td></tr>
<tr><td>Mes anomalístico</td><td>269/4237</td><td class="n">27.5525 d</td><td class="n">−0.0001 d</td></tr>
<tr><td>Metónico</td><td>5/19</td><td class="n">6939.61 d</td><td class="n">−0.081 d / 19 años</td></tr>
<tr><td>Saros</td><td>940/4237</td><td class="n">6585.24 d</td><td class="n">−0.077 d / 18 años</td></tr>
<tr><td>Exeligmós</td><td>235/12711</td><td class="n">54.089 años</td><td class="n">−0.23 d / 54 años</td></tr>
<tr><td>Juegos</td><td>1/4</td><td class="n">4 años</td><td class="n">0 (exacto)</td></tr>
<tr><td>Ápsides lunar</td><td>477/4237</td><td class="n">8.8826 años</td><td class="n"><b>+0.36 %</b></td></tr>
</table>
<p>Un mes sinódico con 30 segundos de error, calculado en bronce cortado a lima, hacia el 150 a.C.</p>

<h4>La pieza que rompe la linealidad</h4>
<p>Todo lo anterior es multiplicación de fracciones: lineal, y por tanto incapaz de producir movimiento
irregular. Pero la Luna no se mueve regular. La solución es el dispositivo <b>k1/k2</b>: dos ruedas de
50 dientes, cara a cara, con los ejes <b>descentrados 1.1 mm</b>. Un perno clavado en k1 a 9.6 mm del
centro corre por una ranura radial de k2.</p>
<p>Si k1 gira uniformemente en θ₁, k2 gira en</p>
<div class="chain">θ₂ = atan2( 9.6·sen θ₁ , 9.6·cos θ₁ + 1.1 )</div>
<p>que es casi una sinusoide de amplitud arcsen(1.1/9.6) = <b>6.58°</b>. Ahí está el operador no lineal:
un seno mecánico, sin electricidad, sin cálculo, hecho solo con dos círculos descentrados. Es la misma
idea que Freeth propone en 2021 para Marte, Júpiter y Saturno.</p>

<h4>La condición de ser mecánica</h4>
<ul>
<li><b>Sin escape y sin resorte.</b> No es un reloj: no corre sola. Alguien tiene que girar la manivela.
Sin mano no hay tiempo.</li>
<li><b>4.65 vueltas de manivela por año.</b> a1 tiene 48 dientes y b1 tiene 223: 223/48 = 4.646.
Un año entero cabe en menos de cinco vueltas de muñeca.</li>
<li><b>Calibración cuantizada.</b> Para poner un puntero en su sitio hay que sacar un engrane y volver a
engranarlo: solo puedes ajustar de diente en diente. En una rueda de 79 dientes eso son saltos de 4.6°.</li>
<li><b>Dientes triangulares.</b> No mantienen razón de velocidad constante: la rueda conducida se acelera
y se frena dentro de cada engrane. El error es pequeño, pero existe.</li>
<li><b>Fricción acumulada.</b> Szigety y Arenas (2025) calculan que, con los errores de fabricación
medidos, la máquina <b>se atascaría antes de que el puntero solar completase 120°</b>. O nunca funcionó,
o estaba hecha mejor de lo que el bronce corroído deja medir hoy.</li>
</ul>`;

document.getElementById('bodyEvidence').innerHTML = `
<p>Alrededor de un tercio de la máquina sobrevive. Esta reconstrucción sigue el modelo completo de
Freeth et al. 2021 —el más ambicioso— pero conviene saber dónde pisa firme y dónde no.</p>
<table class="t">
<tr><th>Elemento</th><th>Estatus</th></tr>
<tr><td>30 engranes, con sus dientes contados por tomografía</td><td style="color:var(--ev1)">Existen</td></tr>
<tr><td>Espirales metónica y del Saros, dial de los Juegos, exeligmós</td><td style="color:var(--ev1)">Existen</td></tr>
<tr><td>Anomalía lunar k1/k2, esferita de fase</td><td style="color:var(--ev1)">Existen</td></tr>
<tr><td>Anillo zodiacal, calendario egipcio, parapegma</td><td style="color:var(--ev1)">Existen</td></tr>
<tr><td>Los cinco planetas en la cara frontal</td><td style="color:var(--ev2)">Descritos por escrito</td></tr>
<tr><td>Periodos de Venus (462) y Saturno (442)</td><td style="color:var(--ev2)">Escritos: ϒΞΒ, ϒΜΒ</td></tr>
<tr><td>Periodos de Mercurio, Marte y Júpiter</td><td style="color:var(--ev3)">Deducidos</td></tr>
<tr><td>Dial calípico de 76 años</td><td style="color:var(--ev4)">Conjetural</td></tr>
<tr><td>Mano del Dragón (nodos)</td><td style="color:var(--ev4)">Conjetural, sin evidencia física</td></tr>
<tr><td>Los 34 engranes de la cara frontal</td><td style="color:var(--ev4)">Ninguno sobrevive</td></tr>
</table>

<h4>Tres lecturas del mismo objeto</h4>
<p>El selector de arriba no cambia el estilo: cambia la <b>hipótesis</b>. Los periodos, la forma de mostrar
los planetas, el número de engranes que hay que suponer y hasta si los planetas estaban o no.</p>
<table class="t">
<tr><th>Modelo</th><th class="n">Engranes</th><th class="n">Perdidos</th><th>Muestra</th></tr>
<tr><td>Freeth et al. 2021</td><td class="n">69</td><td class="n">39</td><td>anillos, 5 planetas, nodos</td></tr>
<tr><td>Freeth &amp; Jones 2012 · Jones · Wright</td><td class="n">55</td><td class="n">25</td><td>punteros con esferitas</td></tr>
<tr><td>Voulgaris et al. 2026</td><td class="n">36</td><td class="n">6</td><td>solo Sol y Luna</td></tr>
</table>
<p>Fíjate en la última columna de la lectura, «discrepancia»: los modelos no coinciden. Para Saturno la
diferencia entre Freeth 2021 (427 apariciones en 442 años) y el periodo babilónico de año-meta
(57 en 59 años) crece con los siglos, porque 442/15 = 29.4667 y 59/2 = 29.5 no son el mismo número.
Los dos son cinemáticamente correctos. Solo uno es el que eligió el constructor, y no sabemos cuál.</p>
<p><b>El dorso es idéntico en las tres.</b> Eso no es casualidad: ahí está toda la evidencia física
—las espirales, los glifos, los engranes que se pueden contar—. La discusión entera cabe en la cara frontal,
que es justamente la parte de la que no sobrevive ni un engrane.</p>

<h4>Lo que queda pesa menos de un kilo</h4>
<p>Los 82 fragmentos suman <b>731 cm² y 895 gramos</b>. El Fragmento A solo es el 31 % de la superficie
y el 41 % del peso, y dentro lleva <b>27 de los 30 engranes</b>. Los siete grandes son el 69 %; los otros
75, juntos, el 31 %. Treinta y ocho miden menos de un centímetro cuadrado, y el más pequeño equivale a un
cuadrado de 3.8 mm de lado.</p>
<p>Esa desigualdad importa para leer la reconstrucción: en la pestaña de engranajes, si coloreas
<b>por fragmento</b>, se ve de un golpe que todo el tren del dorso salió de <b>un solo terrón</b>, más una
rueda suelta en B. Los siete engranes grises no existen en ninguna parte.</p>

<h4>Cinco planos: el mínimo teórico</h4>
<p>El engranaje del dorso está repartido en unos cinco planos de profundidad dentro de 8 milímetros.
Eso no es una casualidad de fabricación. Si tomas los quince grupos de ruedas que tienen que ser
coplanares —porque engranan entre sí— y exiges que dos ruedas del mismo eje nunca estén a la misma
profundidad, el problema es un <b>coloreado de grafo</b>, y su solución mínima es exactamente <b>5</b>.</p>
<p>El cuello de botella es el árbol <b>e</b>: seis ruedas en un solo eje, repartidas entre cinco grupos
distintos. Ese eje solo fija el mínimo de toda la máquina. Y 8.0 mm ÷ 5 = 1.6 mm por plano, que es
justo el paso de capa que se mide en la tomografía.</p>
<p>Dicho de otro modo: el constructor empaquetó el mecanismo en el óptimo combinatorio. No sobra un plano.</p>

<h4>Por qué el anillo del calendario está en duda</h4>
<p>Dos equipos —Budiselic et al. (2020) y luego Woan y Bayley (2024), con estadística bayesiana de
detección de ondas gravitacionales— midieron los agujeros de montaje del anillo y les salieron
<b>354, no 365</b>. Si es así, el anillo era lunar, no egipcio, y esta parte de la reconstrucción está mal.
Nadie lo ha zanjado.</p>`;

document.getElementById('bodyLimits').innerHTML = `
<p>El objeto es un prodigio, pero es un prodigio del siglo II a.C. Lo interesante es exactamente dónde
está el límite.</p>
<h4>No podían saber</h4>
<ul>
<li><b>Sin telescopio.</b> Ojo desnudo con dioptra y gnomon: precisión angular realista, no mejor de
unos 10 minutos de arco.</li>
<li><b>Sin órbitas elípticas.</b> Kepler es de 1609. Todo aquí es suma de movimientos circulares uniformes.</li>
<li><b>Sin gravitación.</b> Newton es de 1687. La máquina modela <b>dónde</b> están los cuerpos,
nunca <b>por qué</b>.</li>
<li><b>Exactamente cinco planetas.</b> Urano es de 1781.</li>
<li><b>Sin segunda anomalía.</b> Los lazos retrógrados salen todos iguales, en cualquier punto del zodiaco.
En el cielo real no lo son. Ptolomeo cuenta que Hiparco ya se quejaba de esta falta.</li>
<li><b>Sin precesión.</b> Hiparco la acababa de descubrir, hacia el 128 a.C., y él mismo era escéptico.
Como el zodiaco de la máquina va atado a la vuelta del Sol, la precesión no descoloca los planetas: lo que
rompe es el <b>parapegma</b>, el listado de ortos y ocasos de estrellas, que se sale de su sitio a razón de
un grado cada 72 años.</li>
<li><b>Su año es 6.4 minutos largo.</b> Usa el año trópico de Hiparco, 365 + ¼ − 1/300 días. Suena
irrelevante y lo es durante una vida; al cabo de mil años el Sol va cuatro días corrido respecto a las
estaciones. Puedes verlo en el marcador de error acumulado.</li>
<li><b>Sin trigonometría real.</b> No hay senos: hay cuerdas, y la tabla de cuerdas era una novedad
reciente de Hiparco.</li>
<li><b>Sin cero ni notación posicional.</b> Numerales alfabéticos griegos —ϒΞΒ = 462— con fracciones
sexagesimales tomadas de Babilonia.</li>
</ul>
<h4>Sí sabían, y muy bien</h4>
<ul>
<li>Que la Tierra es una esfera, y cuánto mide: Eratóstenes, 250 000 estadios.</li>
<li>La oblicuidad de la eclíptica con buena precisión: unos 23°51′ (o 24° redondos).</li>
<li>Predecir eclipses a partir del Periódico y el exeligmós, herencia babilónica, con hora del día y
“características” del eclipse.</li>
<li>La distancia a la Luna: Hiparco obtuvo 59–67 radios terrestres. El valor real es 60.3. Es la única
distancia absoluta realmente buena de toda la astronomía griega.</li>
<li>Un archivo de observaciones babilónicas que llegaba hasta el 747 a.C.</li>
<li>Cortar bronce con precisión de décimas de milímetro.</li>
</ul>`;

document.getElementById('bodyOthers').innerHTML = `
<h4>Lo que dicen los textos</h4>
<p><b>Cicerón</b> describe <b>dos</b> esferas de Arquímedes traídas de Siracusa por Marcelo en el 212 a.C.
De la segunda, en <i>De re publica</i> I.14, dice que en un solo giro reproducía los movimientos
desiguales del Sol, la Luna y los cinco planetas, e incluso los eclipses. En <i>De natura deorum</i> II.88
menciona otra, contemporánea suya, construida por <b>Posidonio</b> en Rodas. <b>Pappus</b> cita un
tratado perdido de Arquímedes, <i>Sobre la fabricación de esferas</i> (Περὶ σφαιροποιΐας).</p>

<h4>Lo que sobrevive</h4>
<table class="t">
<tr><th>Objeto</th><th class="n">Fecha</th><th class="n">Engranes</th></tr>
<tr><td>Mecanismo de Anticitera</td><td class="n">~150–60 a.C.</td><td class="n">30</td></tr>
<tr><td>Reloj-calendario bizantino, Science Museum de Londres</td><td class="n">~450–550 d.C.</td><td class="n">4 + trinquete</td></tr>
<tr><td>Astrolabio con engranes de al-Isfahani, Oxford</td><td class="n">1221–22 d.C.</td><td class="n">~7</td></tr>
<tr><td>Astrolabio con engranes francés, Londres</td><td class="n">~1300 d.C.</td><td class="n">—</td></tr>
</table>
<p>Trece siglos entre cuatro objetos. La tradición existió, pero fue rarísima.</p>
<p>Conviene una distinción que estableció Derek de Solla Price en 1959: los engranes <b>de fuerza</b>
—molinos, odómetros, tornos— eran comunes en todas partes. Los engranes <b>matemáticos</b>, cuyos
dientes codifican relaciones astronómicas, son excepcionales. Se distinguen por el número: los de fuerza
tienen números redondos (16, 24, 40); los matemáticos tienen 7, 19, 59, 223.</p>

<h4>Sobre la idea de que servía para navegar</h4>
<p>Merece contarse porque fue la primera hipótesis y estuvo a punto de fijarse. Entre 1902 y 1910
<b>todos</b> daban por hecho que era instrumento náutico: salió de un naufragio. Svoronos y el oficial de
marina Rediadis decían que era un astrolabio; el historiador naval Rados, un odómetro marino de rueda de
paletas. En 1905–06 el filólogo <b>Albert Rehm</b> lo identificó correctamente como planetario y contestó
la pregunta obvia:</p>
<p style="border-left:2px solid var(--line);padding-left:11px;color:var(--ink)">“Por supuesto, la
delicada y complicada obra mecánica no estaba pensada para ser manejada por marineros; es uno de esos
artículos de comercio con los que la Hélade culturalmente superior impresionaba a sus señores romanos.”</p>
<p>Iba como <b>carga</b>, junto a 36 esculturas de mármol, bronces, vidrio fino y joyería, rumbo al
occidente del Mediterráneo. Y el argumento decisivo es numérico: para sacar longitud geográfica habría
que comparar la hora de un eclipse, y el dial del Saros da la hora <b>entera</b>, lo que equivale a
±7.5° de longitud: unos <b>650 kilómetros</b>. No sirve para posicionarse.</p>
<p>¿Para qué servía entonces? El consenso actual no señala ninguna aplicación práctica. Jones lo resume
sin adornos: <i>“no parece haber ningún campo específico de aplicación práctica que explique todas las
funciones del mecanismo; y si solo interesaban los datos, siempre había una alternativa más barata o más
exacta”</i>. Lo que sí explica todas sus funciones es un libro: la <i>Introducción a los fenómenos</i> de
Gémino, contemporáneo del naufragio. La máquina cubre capítulo por capítulo lo mismo —salvo el dial de
los Juegos—. Era, con toda probabilidad, un objeto para <b>enseñar, demostrar y maravillar</b>: un cosmos
portátil para un filósofo rico.</p>`;

document.getElementById('bodySources').innerHTML = `
<ul>
<li>Freeth, T. et al. <b>“A Model of the Cosmos in the ancient Greek Antikythera Mechanism”</b>,
<i>Scientific Reports</i> 11:5821 (2021) —
<a href="https://www.nature.com/articles/s41598-021-84310-w">nature.com</a>.
Tabla suplementaria S8: medidas de los 30 engranes. Corrección de autor (numerales griegos):
<a href="https://www.nature.com/articles/s41598-021-96382-9">Sci Rep 11:17232</a>.</li>
<li>Freeth, T. &amp; Jones, A. <b>“The Cosmos in the Antikythera Mechanism”</b>, <i>ISAW Papers</i> 4 (2012) —
<a href="http://dlib.nyu.edu/awdl/isaw/isaw-papers/4/">dlib.nyu.edu</a>.</li>
<li>Freeth, T. et al. <b>“Decoding the ancient Greek astronomical calculator…”</b>, <i>Nature</i> 444, 587 (2006) —
sus <a href="https://static-content.springer.com/esm/art%3A10.1038%2Fnature05357/MediaObjects/41586_2006_BFnature05357_MOESM1_ESM.pdf">Notas
Suplementarias</a> traen el área y el peso de los 82 fragmentos, uno por uno: el único conjunto completo que existe.</li>
<li>Freeth, T., Jones, A., Steele, J. &amp; Bitsakis, Y. <b>“Calendars with Olympiad display and eclipse
prediction…”</b>, <i>Nature</i> 454, 614 (2008).</li>
<li>Jones, A. <b><i>A Portable Cosmos</i></b> (Oxford UP, 2017); y <b>“The Antikythera Mechanism and the
Public Face of Greek Science”</b>, PoS(Antikythera &amp; SKA)038 (2012) —
<a href="https://pos.sissa.it/170/038/pdf">pos.sissa.it</a>.</li>
<li>Anastasiou, Bitsakis, Jones, Moussas, Steele, Tselikas &amp; Zafeiropoulou,
<b>“Inscriptions of the Antikythera Mechanism”</b>, <i>Almagest</i> 7.1 (2016), pp. 4–312 — edición
completa, acceso abierto:
<a href="https://archive.nyu.edu/bitstream/2451/71597/2/IAM%20Almagest%207.1%202016%20Complete.pdf">PDF</a>.
Todo el griego de la pestaña LETRAS sale de aquí, verbatim.</li>
<li>Price, D. de S. <b><i>Gears from the Greeks</i></b>, TAPS 64.7 (1974).</li>
<li>Woan, G. &amp; Bayley, J. <b>“An Improved Calendar Ring Hole-Count for the Antikythera Mechanism”</b>,
<i>Horological Journal</i> (2024) — <a href="https://arxiv.org/abs/2403.00040">arXiv:2403.00040</a>.</li>
<li>Voulgaris, A., Mouratidis, C., Vossinakis, A. &amp; Roumeliotis, M., <i>Heritage</i> 9(3):95 (2026) —
<a href="https://www.mdpi.com/2571-9408/9/3/95">mdpi.com</a>. La objeción publicada al modelo planetario.</li>
<li>Szigety, S. &amp; Arenas, A., sobre atascamiento y tolerancias (2025, preprint) —
<a href="https://arxiv.org/abs/2504.00327">arXiv:2504.00327</a>.</li>
<li>Field, J.V. &amp; Wright, M.T., sobre el reloj-calendario bizantino, Science Museum de Londres, inv. 1983-1393.</li>
</ul>
<p style="color:var(--ink3);font-size:11.5px">Los glifos de eclipse del dial del Saros se generaron aquí a
partir de la propia lógica nodal de la máquina, ajustados para reproducir el recuento de Freeth
(38 lunares, 28 solares) y el patrón auténtico de intervalos de 6-6-6-5 meses. La disposición plana de los
engranes es esquemática, pero todas las distancias entre ejes son la suma exacta de los radios primitivos
medidos.</p>`;

document.getElementById('bodyJam').innerHTML = `
<p>Es la pregunta incómoda, y hay respuesta publicada. Szigety y Arenas la modelaron en 2025 con las
tolerancias que Edmunds midió en 2011 sobre el bronce corroído.</p>

<h4>El criterio</h4>
<p>Con dientes triangulares, lo que decide si dos ruedas engranan es la separación <b>G</b> entre la punta
de un diente y el valle del siguiente, comparada con la altura del diente <b>h</b> (1.1 mm de media):</p>
<table class="t">
<tr><th>G / h</th><th>Qué pasa</th></tr>
<tr><td class="n">&lt; 10 %</td><td style="color:var(--marte)">se atasca</td></tr>
<tr><td class="n">≈ 40 %</td><td style="color:var(--ev1)">óptimo</td></tr>
<tr><td class="n">&gt; 90 %</td><td style="color:var(--marte)">se desengrana</td></tr>
</table>
<p>Los márgenes son estrechos: el error máximo por diente no debería pasar de 0.04 mm, y la excentricidad
del eje, de 0.1°.</p>

<h4>Las cuatro parejas de riesgo</h4>
<p><b>d2–e2 · m3–e3 · e4–f1 · l2–m1.</b> Todas comparten el mismo defecto geométrico: una rueda de radio
grande engranando con una pequeña. La excentricidad del eje se amplifica con el radio, mientras que la
altura del diente sigue siendo 1.1 mm. En d2 (31.2 mm de radio) o e3 (51.9 mm), un error angular
mínimo desplaza la punta del diente más que toda su altura.</p>

<h4>La conclusión, que es dura</h4>
<p style="border-left:2px solid var(--line);padding-left:11px;color:var(--ink)">«Un mecanismo con los
errores hallados por Edmunds se detendría, en general, después de que el puntero solar completara un
tercio (120°) de su vuelta completa.» Y por tanto: <b>«o el mecanismo nunca funcionó, o sus errores reales
eran menores que los reportados».</b></p>
<p>Voulgaris responde que un bronce corroído dos mil años no se puede medir para juzgar su precisión
original, y tiene razón. Pero la duda se queda: nadie ha construido el modelo de 2021 en metal.</p>

<h4>Y la objeción de Wright, que sigue en pie desde 2012</h4>
<p style="border-left:2px solid var(--line);padding-left:11px;color:var(--ink)">«Modelar la anomalía muy
grande de Marte exige un desplazamiento grande entre el eje de la rueda del perno y el de la rueda de la
ranura. El perno tiene que acercarse mucho al centro de la rueda de la ranura una vez por vuelta, y ahí
la presión entre el perno y el costado de la ranura, y las reacciones en los pivotes, serán altas. […] La
fricción entre los tubos concéntricos que llevan las manecillas cargaría el mecanismo de perno y ranura,
lo que podría llevarlo a un desgaste rápido.»</p>
<p>Y su advertencia general, dirigida justo a lo que estás mirando ahora:</p>
<p style="border-left:2px solid var(--marte);padding-left:11px;color:var(--ink2)">«El modelado por
computadora […] no genera más que un diagrama en movimiento. En un modelo virtual así las piezas no
tienen masa ni inercia. No hay cargas ni fricción. No hay deformación ni rotura. No hay desgaste.»</p>
<div class="src">M. G. Edmunds, <i>JHA</i> 42(3):307–320 (2011) · Szigety &amp; Arenas,
<a href="https://arxiv.org/abs/2504.00327">arXiv:2504.00327</a> (2025, preprint) ·
M. T. Wright, en <i>Explorations in the History of Machines and Mechanisms</i> (Springer, 2012).</div>`;

document.getElementById('bodyEpi').innerHTML = `
<p>Los textos de esta reconstrucción están copiados literalmente de la edición de 2016, con las
<b>convenciones de Leiden</b> intactas. Se leen así:</p>
<table class="t">
<tr><th>Signo</th><th>Qué significa</th></tr>
<tr><td><code>[αβγ]</code></td><td>texto perdido, restituido por los editores</td></tr>
<tr><td><code>α̣β̣γ̣</code></td><td>trazos poco claros, ambiguos fuera de contexto</td></tr>
<tr><td><code> ̣ ̣</code></td><td>trazos insuficientes para restituir</td></tr>
<tr><td><code>ΑΒΓ</code></td><td>letras claras pero que no forman palabra reconocible</td></tr>
<tr><td><code>nn</code></td><td>numerales perdidos</td></tr>
<tr><td><code>v</code></td><td><i>vacat</i>: un espacio en blanco dejado por el grabador</td></tr>
<tr><td><code>– 14 –</code></td><td>hueco calculado en 14 letras</td></tr>
<tr><td><code>&lt; &gt;</code></td><td>letra que el grabador omitió, suplida</td></tr>
</table>
<p>Regla práctica al leer: <b>si está entre corchetes, no está en el bronce.</b> Los acentos, los espíritus,
las comas y los puntos también son editoriales — el objeto no lleva ninguno.</p>

<h4>Cómo se ve de verdad</h4>
<ul>
<li><b>Capitales con serifas.</b> «Bajo aumento, los tamaños, los espaciados y las formas de las letras
resultan más bien <b>irregulares</b>, aunque el grabador se ha esforzado claramente por imitar el aspecto
de la letra con serifas sobre piedra.» No las imagines regulares.</li>
<li><b>Sin separación entre palabras y sin puntuación.</b> Se respeta la división silábica al final de
línea, y hay <i>vacats</i> ocasionales que a veces separan palabras «sin obedecer a ningún principio claro».</li>
<li><b>Sigma y épsilon rectilíneos</b> (Σ, Ε): no hay sigma lunar en toda la máquina. La omega normal es
Ω; la cursiva ω solo aparece en el monograma de ὥρᾳ y una vez en la placa posterior.</li>
<li><b>Grabado con buril, no con cincel.</b> Un buril <b>arranca</b> metal en vez de desplazarlo, y los
cortes tomográficos de las letras <b>no muestran rebordes</b> a los lados de los surcos.</li>
<li><b>Al menos dos grabadores.</b> La theta de la cubierta posterior es siempre un óvalo estrecho con
raya; en todas las demás inscripciones es un círculo con un punto. Esa distinción constante es difícil de
explicar de otro modo.</li>
<li><b>Numeración jónica</b>, sin fracciones. El 6 es un digamma «de tres trazos rectos, como una E sin la
raya de en medio». El año se escribe con una <b>L</b>.</li>
</ul>

<h4>Para hacerse una idea del tamaño</h4>
<p>«Las alturas de letra en los decretos áticos son típicamente de 5 a 9 mm; los inventarios y arriendos
pueden rondar los 3 o 4 mm. En cambio la letra más grande del mecanismo, la del parapegma, se mantiene
entre 2.3 y 3.0 mm, y la más pequeña, la de los diales, <b>apenas pasa de 1 mm</b>.»</p>
<div class="src">Todas las citas: IAM 1 y IAM 2 (Anastasiou, Bitsakis, Jones et al.),
<i>Almagest</i> 7.1 (2016), pp. 4–67. Edición completa:
<a href="https://archive.nyu.edu/bitstream/2451/71597/2/IAM%20Almagest%207.1%202016%20Complete.pdf">archive.nyu.edu</a>.</div>`;

/* ---------- portada ----------
   La imagen de la portada no es una captura guardada: es el lienzo de la propia
   máquina copiado tal como acaba de dibujarse. Siempre enseña la versión actual. */
function snapIntro() {
  const src = document.getElementById('cv'), dst = document.getElementById('introShot');
  if (!src || !dst || !src.width || !src.height) return;
  dst.width = src.width; dst.height = src.height;
  dst.getContext('2d').drawImage(src, 0, 0);
}
function closeIntro() {
  const el = document.getElementById('intro');
  if (!el || el.classList.contains('gone')) return;
  el.classList.add('gone');
  document.body.classList.remove('locked');
  setTimeout(() => { el.style.display = 'none'; }, 240);
}
function openIntro() {
  const el = document.getElementById('intro');
  if (!el) return;
  el.style.display = '';
  document.body.classList.add('locked');
  requestAnimationFrame(() => { el.classList.remove('gone'); el.scrollTop = 0; });
  snapIntro();
}
document.getElementById('introGo').onclick = closeIntro;
document.getElementById('introBack').onclick = openIntro;
addEventListener('keydown', e => { if (e.key === 'Escape') closeIntro(); });

/* ---------- arranque ---------- */
resize();
setModel('f2021');
setView('front');
snapIntro();
