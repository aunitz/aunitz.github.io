---
layout:     post
title:      "Ley de dirección de Accot-Zhai"
subtitle:   "Evita los recorridos largos y angostos"
date:       2022-11-02 00:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-83.jpg"
tags:       [leyes y principios de usabilidad]
---

<p>La ley de dirección predice el tiempo necesario que invertirá un usuario en dirigir un puntero (como el cursor de un ratón) a través de un recorrido determinado (como un menú desplegable, una barra de desplazamiento o un campo de formulario desplegable). Este tiempo depende de la longitud y la anchura del recorrido. Al que se le suele denominar “túnel”.</p>

<p><strong> Cuanto más largo y estrecho sea el túnel, más tiempo necesitará el usuario para recorrerlo con éxito. </strong></p>

<p>Esta ley fue formulada por los investigadores en interacción persona-ordenador (HCI: Human Computer Interaction) Johnny Accot y Shumin Zhai en 1997. Es un corolario de la conocida <a href="{{ site.baseurl }}{% post_url 2018-01-21-ley-01-ley-de-fitts %}"> ley de Fitts</a>.</p>

<p><strong> La idea práctica que se deriva de esta ley es que los recorridos largos y angostos le llevarán más tiempo al usuario que los recorridos cortos y anchos. </strong></p>
<p>El llamado “túnel” es cualquier control del interfaz que requiera que el usuario mueva el cursor (o arrastre un dedo en una pantalla táctil) a lo largo de un <strong> recorrido que tiene bordes</strong>. De modo que, si se sobrepasa el borde, tendrá alguna consecuencia negativa; aunque sea leve.</p>

<p>Revisemos algunos elementos de interfaz comunes que se ven afectados por esta ley.</p>

<h2>Menús desplegables</h2>

<p>En los menús desplegables jerárquicos, si el usuario mueve el cursor fuera del recorrido, normalmente, el menú desaparece. Este problema se agrava cuantos más niveles jerárquicos posea el menú.</p>

<p>Veamos un ejemplo:</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-01.gif" loading="lazy" alt="" width="720" height="406"></p>

<p>Para hacer que los menús sean más usables tenemos varias opciones a nuestra disposición.</p>

<p>Por ejemplo, mantener los menús desplegables lo más cortos posibles y con “túneles” lo más anchos posibles. Además, podemos aplicar un breve retraso de tiempo entre el desplazamiento del ratón fuera del túnel y la desaparición del menú para permitir movimientos en diagonal que no provoquen un error. Ambas soluciones las ponemos ver en acción en este menú de la web corporativa de Microsoft.</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-02.gif" loading="lazy" alt="" width="720" height="406"></p>

<p>Una solución alternativa a los menús desplegables jerárquicos la constituyen los llamados “mega menús” o menús rectangulares.  Los cuales permiten el movimiento libre del puntero dentro de un amplio espacio en dos dimensiones. Podemos ver también un ejemplo de mega menú en la web corporativa de Microsoft.</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-03.png" loading="lazy" alt="" width="720" height="308"></p>

<p>En los mega menús deja de aplicarse la ley de dirección, pero debemos vigilar la <a href="{{ site.baseurl }}{% post_url 2018-01-21-ley-01-ley-de-fitts %}"> ley de Fitts</a> y evitar objetivos demasiado pequeños sobre los que interactuar.</p>

<h2>Controles deslizantes</h2>

<p>Los controles deslizantes para configurar parámetros suelen resultar difíciles de manejar por los usuarios. Especialmente en dispositivos táctiles y/o si la densidad de los puntos de la línea de desplazamiento es muy alta.</p>

<p>Ejemplo de controles deslizantes densos en Skyscanner.</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-04.gif" loading="lazy" alt="" width="272" height="362"></p>

<p>Debemos plantearnos si existen soluciones mejores para este tipo de interacciones. Como pueden ser unos sencillos campos de texto.</p>

<p>En la web de Airbnb por ejemplo combinan los controles deslizantes con campos de texto libres.</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-05.png" loading="lazy" alt="" width="473" height="291"></p>

<h2>Las barras de progreso</h2>

<p>Las barras de progreso interactivas son muy habituales en los reproductores de audio y/o vídeo. En estos casos, sabemos que cuánto más ancha sea la superficie del túnel, mas usable será la barra.</p>

<p>En YouTube amplían el tamaño de la barra cuando nos situamos sobre ella. Facilitando la interacción.</p>

<p><img src="{{ site.baseurl }}/img/ley-de-direccion-06.gif" loading="lazy" alt="" width="622" height="93"></p>