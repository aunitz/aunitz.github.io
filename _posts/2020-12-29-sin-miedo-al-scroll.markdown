---
layout:        post
title:         "Sin miedo al scroll"
subtitle:      "Los usuarios hacen scroll de manera natural"
date:          2020-12-29 15:30:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-60.jpg"
tags:          [buenas prácticas de usabilidad]
---

<p>Algunas personas siguen creyendo en el <strong>falso mito de que los usuarios no se desplazan verticalmente en las páginas</strong> (hacer scroll) y que sólo se fijan en el contenido que aparece en la parte superior de la página. Es decir, que sólo prestan atención al contenido que el navegador les muestra en la zona visible de la pantalla de su dispositivo y que no están habituados a desplazarse más allá de esa primera zona.</p>

<p><img src="{{ site.baseurl }}/img/sin-miedo-al-scroll-01.png" loading="lazy" alt="" width="720" height="420"></p>

<p>Las personas que aún creen en este mito presionan a los diseñadores web para que todo el contenido que consideran importante deba estar visible en la zona superior de la página. Aquella que supuestamente es la única a la que el usuario presta atención.</p>

<h2>El origen del mito (al principio era cierto)</h2>
<p>Probablemente el origen de este mito procede de los primeros estudios del <a href="{{ site.baseurl }}{% post_url 2018-01-21-ley-03-ley-de-jakob %}">experto en usabilidad Jakob Nielsen</a>. Quien a principios de los años 90 descubrió que sólo el 10% de los usuarios se desplazaban hacia abajo para ver los enlaces que no estaban visibles en la pantalla inicial. Sin embargo, en el año 1997 el propio <a href="https://www.nngroup.com/articles/changes-in-web-usability-since-1994/" target="_blank" rel="noopener noreferrer">Jakob Nielsen publicó un artículo</a> en el que explicaba que aquel comportamiento de principios de los años 90 ya no estaba vigente. De modo que <strong>la mayoría de los usuarios sí hacen scroll</strong> cuando visitan una página que excede en contenido la parte visible de su pantalla. Él mismo apunta que este cambio de comportamiento probablemente se deba a que los usuarios han adquirido más experiencia en el uso del scroll de las páginas web.</p>

<p><img src="{{ site.baseurl }}/img/sin-miedo-al-scroll-02.png" loading="lazy" alt="" width="720" height="531"></p>

<h2>La falsedad actual del mito</h2>
<p>Si en el año 1997 Jakob Nielsen ya descubrió que la mayoría de los usuarios hacen scroll cuando visitan una página porque se han familiarizado con su uso, <strong>el hábito del desplazamiento vertical</strong> en los usuarios de hoy en día es ya algo que podemos considerar <strong>consustancial al hecho de consultar una página web</strong>.</p>

<p>Como detalle curioso que muestra claramente que los usuarios están más que familiarizados con el uso del scroll es el hecho de que <a href="https://uxmag.com/articles/the-extinction-of-the-scrollbar" target="_blank" rel="noopener noreferrer">en julio de 2011 Apple eliminó visualmente la barra de desplazamiento de Mac OS X</a>.</p>

<h2>La indefinición de la “zona inicialmente visible”</h2>
<p>Imaginemos por un momento que hemos seleccionado una serie de contenidos que consideramos importantísimos y que es imprescindible que el usuario los visualice a “primera vista”. Sin tener que hacer scroll.</p>

<p>En los años 90, cuando la mayor parte de los monitores tenían una resolución de 800x600 o de 1024x768, podía ser relativamente factible<sup id="fnref:fn-f1"><a href="#fn:fn-f1" class="footnote">1</a></sup> definir el tamaño de una zona en píxeles que resultase visible para casi todos los usuarios. Sin embargo, hoy en día, la variedad de dispositivos (ordenadores, tablets, smartphones, TV…) es tan amplia y heterogénea, que resulta imposible desterminar cuál es el contenido que figurará inicialmente visible para un usuario particular que acceda a la página con un dispositivo concreto.</p>

<p><img src="{{ site.baseurl }}/img/sin-miedo-al-scroll-03.jpg" loading="lazy" alt="" width="720" height="401"></p>

<p>En la web <a href="https://screensizemap.com/" target="_blank" rel="noopener noreferrer">Screen size map</a> podemos visualizar la enorme variedad de resoluciones de pantalla existentes hoy en día.</p>

<p><img src="{{ site.baseurl }}/img/sin-miedo-al-scroll-04.png" loading="lazy" alt="" width="720" height="405"></p>

<p>¿Cómo determinar de manera invariable qué contenido aparecerá en la zona inicialmente visible? No es posible.</p>

<p>Es por ello por lo que, desde hace unos años, los sitios web habitualmente tienen un diseño fluido que se adapta a la resolución de la pantalla del dispositivo del usuario. Es lo que se conoce como <a href="https://es.wikipedia.org/wiki/Dise%C3%B1o_web_adaptable" target="_blank" rel="noopener noreferrer">Responsive Web Design</a>.</p>

<p><img src="{{ site.baseurl }}/img/sin-miedo-al-scroll-05.png" loading="lazy" alt="" width="720" height="412"></p>

<h2>La zona superior de la página sigue siendo importante</h2>
<p><strong>El objetivo de este post es que le perdamos el miedo</strong> <strong>a la necesidad de realizar scroll</strong> vertical para poder acceder al contenido completo. No es algo malo en términos de usabilidad. Sin embargo, <strong>no debemos concluir que la zona superior de una página no sea importante</strong>. Lo es y mucho.</p>

<p>La zona inicialmente visible de una página web <strong>es la que recibe la mayor atención del usuario</strong> y su contenido es crucial para que los usuarios decidan si quieren seguir leyendo nuestra página o no.</p>

<p>Volviendo a citar al equipo de Jakob Nielsen, en un <a href="https://www.nngroup.com/articles/scrolling-and-attention/" target="_blank" rel="noopener noreferrer">estudio de seguimiento ocular (eyetracking) que realizaron en 2018</a>, concluyeron que la mayor parte de la atención de los usuarios se centra en la zona superior de la página.</p>

<h2>Diseño y contenido que invite a hacer scroll</h2>
<p>En el estudio antes citado, llegaron a la importante conclusión de que <strong>a los usuarios no les molesta hacer scroll, siempre y cuando perciban visualmente que hay más contenido por debajo de la zona inicialmente visible</strong>. Es decir, el diseño tiene que ser especialmente cuidadoso para que el usuario perciba que el contenido prosigue por debajo de la zona de corte visual. Por ejemplo, mediante el uso de textos cortados.</p>

<p>Por último, y aunque suene obvio, nada de lo sugerido anteriormente tendrá ningún efecto si el contenido de nuestra página no es lo que busca el usuario o no se lo presentamos de manera que lo perciba como valioso para sus objetivos. Todos conocemos la frase de que <strong>el contenido es el Rey</strong>. Y de mi cosecha añado que <a href="{{ site.baseurl }}{% post_url 2019-11-02-tip-15-contenido-precede-diseno %}">debe preceder al diseño</a>.</p>

<hr>

<div class="footnotes">
    <ol>
        <li id="fn:fn-f1">
            <p>Aún y todo existía la dificultad de tener en cuenta el espacio que dejaba disponible para el contenido cada navegador, cada sistema operativo, la configuración particular del usuario de las barras del navegador, etc.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
        </li>
    </ol>
</div>