---
layout:     post
title:      "Botones Aceptar y Cancelar, ¿en qué orden los situamos?"
subtitle:   "Lo más importante es mantener la consistencia"
date:       2020-02-20 16:40:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-50.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>Los formularios y las ventanas de diálogo habitualmente disponen de dos botones de acción. Uno destinado a ejecutar la acción principal (por ejemplo “Aceptar”) y otro para la acción secundaria (por ejemplo “Cancelar”).</p>

<p>¿En qué orden debemos colocarlos?</p>

<p>¿Primero el principal y después el secundario?</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-01.png" loading="lazy" alt="" width="187" height="49"></p>

<p>¿Primero el secundario y a continuación el principal?</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-02.png" loading="lazy" alt="" width="188" height="49"></p>

<h2>Primero el principal y después el secundario</h2>

<p>Los partidarios de esta opción defienden que el botón de acción más habitual, es decir, el de Aceptar, debe ser <strong>el primero</strong> que se encuentre el usuario <strong>en su orden de lectura natural</strong>. De ese modo el primer botón que se encontrarán será el correcto la mayor parte de las veces y la velocidad de ejecución será mayor.</p>

<h2>Primero el secundario y a continuación el principal</h2>

<p>Los defensores de esta opción argumentan que el botón principal debe ser <strong>el último que se encuentre el usuario</strong>. Ya que sirve para completar la acción en curso y finalizarla de acuerdo con el flujo de trabajo seguido en la pantalla.</p>

<h2>Qué hacen Microsoft, Apple y Google</h2>

<p>Vamos a fijarnos en qué hacen los tres principales desarrolladores de sistemas operativos del mundo.</p>

<p>La guía de estilo de <strong>Microsoft Windows</strong> establece que primero debe ir el principal y después el secundario.</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-03.png" loading="lazy" alt="" width="482" height="242"></p>

<p>Las pautas de <strong>Apple MacOS</strong> establecen justo lo contrario.</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-04.png" loading="lazy" alt="" width="537" height="209"></p>

<p>Mientras que <strong>Google Android</strong> se decanta por la misma ubicación que Apple.</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-05.png" loading="lazy" alt="" width="300" height="372"></p>

<h2>Lo más importante es mantener la consistencia</h2>

<p>No parece haber estudios suficientes que decanten claramente la balanza por una u otra opción. El reconocido experto internacional de usabilidad <a href="https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/" target="_blank" rel="noopener noreferrer">Jakob Nielsen ya afirmó en 2008</a> que <strong>no es relevante si optas por una u otra solución</strong>. No tendrá un impacto significativo en la usabilidad. <strong>Lo importante es que mantengas la consistencia en toda la aplicación</strong>, para no confundir al usuario.</p>

<p>Naturalmente, si desarrollas aplicaciones nativas de escritorio para un determinado sistema operativo deberás adoptar su convención. Si desarrollas aplicaciones web para un público multiplataforma deberás escoger una de las dos alternativas y mantener la consistencia a lo largo de toda la aplicación.</p>

<h2>Más importante que el orden: el peso y los nombres de los botones</h2>

<p>Un <a href="{{ site.baseurl }}{% post_url 2017-01-18-principios-usabilidad %}">principio básico de usabilidad</a> es el de proteger el trabajo del usuario mediante la prevención de errores. Es decir, reduciendo la probabilidad de que los cometa. Para ello, más importante que el orden de los botones, es <strong>otorgarles diferente peso visual</strong>. De modo que el botón de acción principal destaque visualmente sobre el secundario.</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-06.png" loading="lazy" alt="" width="180" height="48"></p>

<p>Además, es muy importante utilizar unos <strong>nombres de botón</strong> que dejen lo más claro posible la acción que van a ejecutar.</p>

<p><img src="{{ site.baseurl }}/img/botones-aceptar-cancelar-orden-07.png" loading="lazy" alt="" width="517" height="225"></p>

<h2>Conclusión</h2>

<p>Si desarrollas <strong>aplicaciones nativas</strong>, <strong>utiliza la convención del sistema operativo</strong> correspondiente.</p>

<ul>
    <li>Microsoft: Aceptar / Cancelar</li>
    <li>Apple: Cancelar / Aceptar</li>
    <li>Google: Cancelar / Aceptar</li>
</ul>

<p>Si desarrollas <strong>aplicaciones web multiplataforma</strong>, <strong>escoge una de las dos alternativas</strong> (no importa cuál) y mantén la coherencia en toda la aplicación.</p>

<p>En cualquiera de los dos casos, <strong>otorga mayor peso visual a la acción principal</strong> y redacta <strong>unos nombres de botón que se entiendan</strong> lo mejor posible. Con el fin de reducir la probabilidad de que el usuario cometa errores.</p>

<p>Una cuestión relacionada con el orden: ¿en qué posición de la página colocaremos los botones? ¿Alineados a la izquierda? ¿A la derecha? ¿En el centro? Este es un tema que trataré en un futuro post.</p>
