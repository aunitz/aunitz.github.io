---
layout:     post
title:      "Scroll infinito vs paginación"
subtitle:   "Cuándo utilizar uno u otro"
date:       2017-12-12 10:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-14.jpg"
tags:       [buenas prácticas de usabilidad]
---

<p>Desde el punto de vista de la usabilidad, una y otra técnica tiene sus pros y sus contras.</p>

<p>Las conclusiones a las que he llegado son las siguientes.</p>

<h2>Scroll infinito</h2>

<p>Se utiliza especialmente en webs en las que el usuario no está buscando algo concreto. Webs en las que se pretende que el usuario descubra contenido.</p>

<p>Por ejemplo, el feed de contenidos de muchas redes sociales: Facebook, Pinterest, Twitter...</p>

<p>Hacer scroll es más cómodo que hacer clic y el usuario se sumerge en un scroll infinito de contenidos.</p>

<p>Inconvenientes:</p>
<ul>
    <li>El rendimiento es peor que con la paginación. Por dos motivos: hay un delay en la carga de contenidos y la página va ocupando cada vez más memoria.</li>
    <li>Se dificulta el localizar una fila concreta, ya que la referencia de la barra de scroll del navegador pierde su utilidad al estar recalculándose.</li>
    <li>Tras entrar a editar un contenido y volver a la página de listado puede que el usuario ya no localice, ni tenga a la vista, el ítem que acaba de editar.</li>
</ul>

<h2>Paginación</h2>

<p>Se utiliza típicamente en webs que muestran los resultados de una búsqueda. Por ejemplo, Google. El usuario espera encontrar el contenido que busca en la primera página y si no es así, avanza a través de la paginación. Pero en realidad, el usuario no quiere usar la paginación. Lo que quiere es que la primera pantalla le muestre la solución.</p>
<p>Otras ventajas son que:</p>

<ul>
    <li>Aporta mayor sensación de control al usuario que el scroll infinito.</li>
    <li>Facilita el volver a una fila concreta ya que estará en "la misma posición" en la que estaba la primera vez que la vimos.</li>
    <li>Así como volver a una misma posición de la paginación tras entrar a editar un contenido.</li>
</ul>

<p>El principal inconveniente de la paginación es que requiere de una acción por parte del usuario más incómoda que la del scroll. Es decir, es más "molesto" hacer clic que usar la rueda del ratón.</p>

<h2>Conclusión</h2>

<p><strong>Cada caso es distinto</strong> y para tomar una decisión final hay que ver el uso que hacen los usuarios de las tablas de resultados en cada aplicación.</p>

<p>Como pauta general, vemos que el <strong>scroll infinito</strong> es la mejor opción para aplicaciones en las que el usuario no busca algo en concreto y lo que quiere es <strong>descubrir contenido nuevo</strong> (Twitter, Facebook), así como webs de contenido visual (Pinterest, Instagram).</p>

<p>La <strong>paginación</strong> es una opción estándar y más adecuada para aplicaciones orientadas a <strong>localizar un contenido concreto</strong> y ejecutar una tarea con el mismo.</p>

<p>Finalmente, aconsejamos que si los <strong>listados no son excesivamente largos</strong> (100-150 filas) se muestren todos los resultados en pantalla desde el primer momento, <strong>sin paginación y sin scroll infinito</strong>.</p>