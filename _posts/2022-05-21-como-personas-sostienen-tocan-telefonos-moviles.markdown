---
layout:     post
title:      "Cómo las personas sostienen y tocan sus teléfonos móviles"
subtitle:   "Memorando sobre el primer artículo de Steven Hoober dedicado a la interacción táctil"
date:       2022-05-21 21:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-79.jpg"
tags:       [buenas prácticas de usabilidad, memorandos]
---

<p>El <strong>especialista en diseño para dispositivos móviles</strong> <a href="https://www.uxmatters.com/authors/archives/2012/04/steven_hoober.php" target="_blank" rel="noopener noreferrer">Steven Hoober</a> escribió una trilogía de artículos basados en <strong>evidencia científica</strong> que aportan información fundamental sobre el uso que hacemos las personas de nuestros dispositivos móviles y cuáles son los patrones de diseño que mejor funcionan.</p>

<p>Este post de mi blog está dedicado a recopilar las principales ideas que quiero recordar del <a href="https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php" target="_blank" rel="noopener noreferrer">primer artículo de la serie de Steven Hoober</a>. Publicado en 2017 en la prestigiosa revista digital <a href="https://www.uxmatters.com/" target="_blank" rel="noopener noreferrer">UXmatters</a>.</p>

<hr>

<h2>Datos obtenidos de años de estudios empíricos</h2>

<p>Me parece muy relevante señalar que los descubrimientos y conclusiones a las que llega Steven Hoober proceden de <strong>varios años de estudios, investigaciones y meta investigaciones</strong>. <a href="https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php" target="_blank" rel="noopener noreferrer">En el artículo del autor se detallan con mayor precisión</a>.</p>

<h2>La tecnología predominante actualmente es la <strong>pantalla táctil capacitiva</strong></h2>

<p>La zona de contacto es el área del dedo del usuario que está en contacto con una pantalla táctil capacitiva.</p>

<p>Esta área puede variar mucho, dependiendo de cómo toque la pantalla el usuario, por ejemplo, con la punta o la yema de un dedo o el pulgar, o si el usuario presiona con más fuerza.</p>

<p><img src="{{ site.baseurl }}/img/como-personas-sostienen-tocan-telefonos-moviles-01.png" loading="lazy" alt="" width="720" height="326"></p>

<p>Las pantallas táctiles capacitivas <strong>informan solo de un único punto de contacto</strong> en el centro geométrico de la zona de contacto con el dedo.</p>

<p>Curiosamente no importa qué tan grande sea la zona de contacto, y no hay necesidad de detectar presión, tamaño o cualquier otra cosa. Si bien muchos dispositivos admiten la función multitáctil y algunos pueden detectar la presión, estas capacidades no se admiten de manera constante, por lo que es difícil implementarlas de manera útil.</p>

<p>Por lo tanto, a menos que estemos desarrollando una herramienta de dibujo o un juego asumamos, por ahora, que las pantallas táctiles no detectan la presión.</p>

<p>En consecuencia, <strong>el tamaño del dedo del usuario es totalmente irrelevante para la precisión y la detección táctiles</strong>.</p>

<h2>Pon en constante duda tus propias observaciones y sesgos cognitivos</h2>

<p>Si no somos muy cuidadosos, podemos tomar decisiones de diseño basadas en opiniones, prejuicios personales, observaciones estadísticamente poco significativas, etc.</p>

<p>El alcance y la profundidad del conocimiento del que disponemos sobre cómo utilizan los usuarios las pantallas táctiles es aún limitado y está en constante evolución.</p>

<h2>Cuestiónate la validez de algunos estándares oficiales</h2>

<p>Algunas normas y guías de desarrollo están basadas en tecnologías obsoletas como las pantallas táctiles de IR Grid (años 80) o en tecnología resistiva (presente, por ejemplo, en algunas PDA o en los primeros smartphones).</p>

<p>En consecuencia, <strong>los antiguos estándares táctiles que se basan en el tamaño de los dedos ya no son relevantes</strong>. Por ejemplo, debido a que los sistemas IR Grid eran la tecnología de pantalla táctil dominante en el momento en que se escribieron los estándares ISO y funcionaban detectando el dedo del usuario, estos estándares especifican que los objetivos deben tener 22x22 milímetros para adaptarse a dedos más grandes. El estándar era válido para la tecnología IR Grid, pero no lo es para la actual.</p>

<p>Otro ejemplo son los <a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer">estándares de accesibilidad de la W3C</a>. Los cuales ignoran los dispositivos móviles. Sus estándares definen los tamaños de píxeles utilizando el antiguo estándar de 72/96 ppp (píxeles por pulgada) y no hacen referencia a los ángulos de visión, el deslumbramiento, la distancia u otros problemas con los que deben lidiar los usuarios móviles.</p>

<h2>Realidades observadas en los estudios de Steven Hoober</h2>

<h3>1. Las 6 diferentes maneras de sostener el teléfono</h3>

<p>¿La gente sostiene su teléfono con las dos manos? No. Las personas sostienen su teléfono de muchas maneras y la van cambiando a medida que interactúan con él.</p>

<p>Los seis métodos más comunes que usan las personas para sostener y tocar su teléfono móvil son los siguientes.</p>

<p><img src="{{ site.baseurl }}/img/como-personas-sostienen-tocan-telefonos-moviles-02.png" loading="lazy" alt="" width="716" height="478"></p>

<p>A continuación, los hallazgos fundamentales de Steven Hoober:</p>

<ul>
	<li>Las personas sostienen los teléfonos de varias formas, según su dispositivo, sus necesidades y su contexto.</li>
	<li>Cambian sus métodos de agarrar su teléfono sin darse cuenta, lo que también significa que las personas no pueden observarse lo suficientemente bien como para predecir este comportamiento.</li>
	<li><strong>El 75% de los usuarios tocan la pantalla solo con un pulgar</strong>.</li>
	<li><strong>Menos del 50% de los usuarios sostienen su teléfono con una mano.</strong></li>
	<li>El 36% de los usuarios acuna su teléfono, usando su segunda mano para un mayor alcance y estabilidad.</li>
	<li>El 10% de los usuarios sostienen su teléfono con una mano y tocan con un dedo de la otra mano.</li>
</ul>

<h3>2. El centro de la pantalla es el rey</h3>

<p>En los estudios observacionales queda demostrado que <strong>los usuarios prefieren ver y tocar el centro de la pantalla</strong>.</p>

<p>En el siguiente gráfico se muestra la precisión táctil para las diversas partes de la pantalla de un teléfono móvil o tableta.</p>

<p><img src="{{ site.baseurl }}/img/como-personas-sostienen-tocan-telefonos-moviles-03.png" loading="lazy" alt="" width="720" height="774"></p>

<p>Las personas pueden leer mejor el contenido en el centro de la pantalla y, a menudo, desplazan el contenido para llevar la parte que están leyendo al centro de la pantalla.</p>

<p>Las personas son más eficaces tocando <strong>en el centro de la pantalla</strong>, por lo que los objetivos táctiles pueden ser más pequeños, tan pequeños como <strong>7 milímetros</strong>, mientras que los tamaños de los objetivos de las <strong>esquinas</strong> deben ser de unos <strong>12 milímetros</strong>.</p>

<p>El enfoque del usuario en el centro de la pantalla es la razón por la que usamos tantas vistas de lista y cuadrícula. Funcionan bien, y las personas se enfocan e interactúan con ellos muy bien, tocando y desplazándose.</p>

<p>En resumen:</p>

<ul>
	<li>Ubica siempre el <strong>contenido principal</strong> en el <strong>centro</strong> de la pantalla.</li>
	<li>Las <strong>acciones secundarias</strong> en los <strong>bordes</strong> superior e inferior.</li>
	<li>Las <strong>acciones terciarias ocultos en los menús</strong> a los que los usuarios suelen acceder desde una de las esquinas.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/como-personas-sostienen-tocan-telefonos-moviles-04.png" loading="lazy" alt="" width="720" height="737"></p>

<h3>3. Los usuarios fallan al tocar</h3>

<p>Después de docenas de observaciones, el autor concluye que ni un solo usuario había tocado el centro exacto del ícono del menú, y muchos toques estaban bastante lejos del objetivo.</p>

<p>Es por este motivo que <strong>debemos minimizar los errores que causen problemas colocando elementos peligrosos o no relacionados lejos de otros elementos</strong>, eliminando o reduciendo así las consecuencias de toques accidentales.</p>

<p><img src="{{ site.baseurl }}/img/como-personas-sostienen-tocan-telefonos-moviles-05.png" loading="lazy" alt="" width="712" height="434"></p>