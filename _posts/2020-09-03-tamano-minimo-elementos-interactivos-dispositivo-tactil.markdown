---
layout:        post
title:         "Tamaño mínimo recomendado para los elementos interactivos en dispositivo táctil"
subtitle:      "Para una cómoda manipulación"
date:          2020-09-03 20:30:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-54.jpg"
tags:          [buenas prácticas de usabilidad]
---

<p><strong>El dispositivo de pantalla táctil más extendido</strong> y con el que más familiarizados estamos es el <strong>teléfono móvil</strong>. Pero hay otros muchos dispositivos, cada vez más, que cuentan con un interfaz de usuario táctil: tabletas, relojes, navegadores GPS, ordenadores portátiles, cámaras de fotos, impresoras, paneles de control de los coches, etc. En todos ellos, son nuestros dedos los que interactúan con las aplicaciones.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-01.jpg" loading="lazy" alt="" width="720" height="370"></p>

<p>Lo que me lleva a preguntarme por el <strong>tamaño que deberían tener los elementos interactivos</strong> (botones, enlaces, menús, etc.) de una aplicación para que sean cómodamente manipulables por la mayoría de los usuarios.</p>

<p>Si consultamos las pautas de diseño de interfaces de las grandes empresas de software, veremos que no existe un criterio común al respecto. Apple recomienda un tamaño mínimo de <a href="https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/" target="_blank" rel="noopener noreferrer">44×44 pt</a>. Microsoft recomienda un mínimo de <a href="https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting#target-size" target="_blank" rel="noopener noreferrer">7,5×7,5 mm</a>. Google recomienda un tamaño mínimo de <a href="https://material.io/design/usability/accessibility.html#layout-and-typography" target="_blank" rel="noopener noreferrer">48×48 dp</a>. ¿Confuso verdad? Probablemente no tengas claro el significado de algunas de las unidades que manejan para definir los tamaños.</p>

<p>Para arrojar algo de luz, podríamos fijarnos, como sugiere el artículo <a href="https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/" target="_blank" rel="noopener noreferrer">Finger-Friendly Design</a> publicado en Smashing Magazine, en las medidas físicas que tienen los dedos humanos. Especialmente los dedos<strong> índice y pulgar</strong>. Que son los que más se utilizan para interactuar con este tipo de dispositivos.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-02.jpg" loading="lazy" alt="" width="720" height="365"></p>

<p>En el artículo de Smashing Magazine explican que <a href="http://touchlab.mit.edu/publications/2003_009.pdf" target="_blank" rel="noopener noreferrer">un estudio del MIT Touch Lab sobre las yemas de los dedos humanos</a> descubrió que el ancho promedio del dedo índice es de 1,6 a 2 cm (16 a 20 mm) para la mayoría de los adultos. Mientras que el ancho promedio del dedo pulgar de un adulto es de… <a href="http://en.wikipedia.org/wiki/Finger_(unit)" target="_blank" rel="noopener noreferrer">una pulgada</a>, claro. Es decir, 2,5 cm (25 mm).</p>

<p>En base a estos tamaños, el autor del artículo recomienda unas medidas mínimas en píxeles. Sin embargo, los píxeles no son una unidad de medida adecuada para definir el tamaño recomendado de un elemento interactivo para dispositivos móviles porque es una unidad que no tiene en cuenta la <strong>densidad de píxeles de la pantalla del dispositivo</strong>.</p>

<p>Las pantallas de alta densidad (como las pantallas <em>retina</em> de Apple) tienen más píxeles por pulgada que las de baja densidad. Como resultado, los elementos de interfaz con las mismas dimensiones en píxeles se visualizan más grandes en pantallas de baja densidad y más pequeños en pantallas de alta densidad.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-03.png" loading="lazy" alt="" width="722" height="355"></p>

<p>Para anular este efecto, deberíamos utilizar unidades relativas, que escalen para tener dimensiones reales uniformes en cualquier pantalla. Como es el caso de los <a href="https://material.io/design/layout/pixel-density.html#pixel-density" target="_blank" rel="noopener noreferrer">píxeles independientes de la densidad</a> ideados por Google para el sistema operativo Android. Los llamados “dp” (pronunciado "dips").</p>

<p>Un dp es igual a un píxel físico en una pantalla con una densidad de 160 ppp (puntos por pulgada, en inglés dpi: dots per inch).</p>

<p>Las recomendaciones de tamaño de Apple y de Microsoft también utilizan medidas relativas independientes de la densidad de píxeles de la pantalla del dispositivo. Pero encuentro que la unidad creada por Google es más fácil de implementar en la práctica y está mejor documentada.</p>

<h2>Conclusión</h2>

<p>Ya sabíamos por la <a href="{{ site.baseurl }}{% post_url 2018-01-21-ley-01-ley-de-fitts %}">ley de Fitts</a> (y por sentido común) que cuanto más grande sea el objeto a pulsar, menos tardará el usuario en conseguirlo. Ahora bien, la solución no puede ser diseñar enormes todos los elementos interactivos de un interfaz táctil porque, especialmente en móvil, el espacio disponible es muy limitado y tiene que quedar sitio para el contenido.</p>

<p>En espera de estudios más rigurosos o de un mayor consenso de las grandes empresas de software al respecto, para no equivocarnos demasiado deberemos diseñar <strong>elementos interactivos de al menos 48×48 dp</strong>.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-04.png" loading="lazy" alt="" width="722" height="306"></p>

<h2>Aviso: tened en cuenta la zona sensible al tacto</h2>

<p>Las medidas anteriores se refieren siempre a la zona sensible al tacto (<em>touch target</em>). Que no tiene por qué coincidir con el tamaño del icono, el texto o la forma visible del elemento interactivo. Con la siguiente imagen se entiende mejor.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-05.png" loading="lazy" alt="" width="722" height="299"></p>

<p>La zona sombreada en azul es el <em>touch target</em>. Es decir, si el usuario toca con el dedo en algún punto de esa zona, se activa el botón. Sin embargo, en ambos casos, el icono que ilustra el elemento interactivo es más pequeño que el <em>touch target</em>.</p>

<h2>Bola extra: cómo transformar a píxeles una medida en dp</h2>

<p>Si queréis saber a cuántos píxeles equivale un elemento de 48x48 dp, deberéis conocer cuál es la densidad de píxeles de la pantalla de vuestro dispositivo objetivo.</p>

<p>Si buscáis las especificaciones de la pantalla de vuestro dispositivo, encontrareis un valor expresado en ppp (puntos por pulgada) o en dpi (dots per inch). Ambas son la misma unidad y típicamente oscilará entre unos 120 y 640 dpi.</p>

<p>La fórmula para la conversión es la siguiente:</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-dispositivo-tactil-06.png" loading="lazy" alt="px = dp * (dpi / 160)" width="722" height="68"></p>

<p>De modo que, por ejemplo, si nuestra pantalla tiene una densidad de 240 dpi, un elemento de 48x48 dp ocupará 72x72 píxeles.</p>

<p><a href="https://developer.android.com/training/multiscreen/screendensities" target="_blank" rel="noopener noreferrer">Más información sobre los dp</a> en la web oficial para desarrolladores de Android de Google.</p>