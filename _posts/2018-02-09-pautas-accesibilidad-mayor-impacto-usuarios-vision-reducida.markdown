---
layout:     post
title:      "Las 3 pautas de accesibilidad de mayor impacto para usuarios con visión reducida"
subtitle:   "Todos tendremos visión reducida en algún momento"
date:       2018-02-09 18:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-27.jpg"
tags:       [accesibilidad]
---

<p>Con este artículo voy a iniciar una serie dedicada a divulgar aquellas pautas de accesibilidad que tienen un <strong>mayor impacto práctico</strong> en el día a día de los usuarios con algún tipo de discapacidad.</p>

<p>Lo primero que hay que aclarar, para los que aún nos seáis conscientes de ello, es que todos nosotros somos o seremos en algún momento usuarios con algún tipo de discapacidad.</p>

<p>Podemos tener una discapacidad crónica. Podemos desarrollarla con el tiempo; a medida que cumplimos años. O bien podemos padecerla de manera temporal; si nos rompemos un brazo.</p>

<p>Una de las discapacidades con las que tendremos que lidiar casi seguro todos y todas, ahora o en el futuro, es la <strong>visión reducida</strong>. Es decir, los problemas de visión de todo tipo que nos impiden tener una visión perfecta.</p>

<p>Por este motivo, el primer artículo de esta serie va dirigido a exponer los errores de accesibilidad que mayor impacto tienen en los usuarios con visión reducida.</p>

<h2>1. Los enlaces deben distinguirse del texto circundante</h2>

<p>Garantiza que los usuarios puedan distinguir cuándo el texto es un enlace. Para ello se necesita que los enlaces cuenten con algún elemento decorativo que los diferencie (como el clásico subrayado) o, si se distinguen únicamente mediante el color, se precisa una relación de contraste de color de al menos 3:1 para distinguir el color del enlace del color del texto circundante.</p>

<p><img src="{{ site.baseurl }}/img/pautas-accesibilidad-mayor-impacto-usuarios-vision-reducida-1.png" loading="lazy" alt="Ilustración de la primera pauta de accesibilidad: Los enlaces deben distinguirse del texto circundante" width="722" height="428"></p>

<h2>2. Los textos deben tener suficiente contraste de color con el fondo</h2>

<p>Todos los contenidos textuales deben tener suficiente contraste entre el texto en primer plano y los colores de fondo detrás de él.</p>

<p><img src="{{ site.baseurl }}/img/pautas-accesibilidad-mayor-impacto-usuarios-vision-reducida-2.png" loading="lazy" alt="Ilustración de la segunda pauta de accesibilidad: Los textos deben tener suficiente contraste de color con el fondo" width="722" height="428"></p>

<h2>3. No se debe desactivar la posibilidad de hacer zoom</h2>

<p>Esta pauta es especialmente importante para los dispositivos móviles.</p>

<p>La página no debe incluir el parámetro <code>user-scalable=no</code> en la etiqueta <code>&lt;meta name=”viewport”&gt;</code>, ya que desactiva la posibilidad de que el usuario pueda hacer zoom. Una funcionalidad esencial para los usuarios con visión reducida.</p>

<p>Además, esta misma etiqueta <code>&lt;meta name=”viewport”&gt;</code>, no debe incluir el parámetro <code>maximum-scale</code>. El cual limita la escala máxima del nivel de zoom. Si irremediablemente se incluye esta limitación, no debería estar establecida a un valor inferior a 5.</p>

<p><img src="{{ site.baseurl }}/img/pautas-accesibilidad-mayor-impacto-usuarios-vision-reducida-3.png" loading="lazy" alt="Ilustración de la tercera pauta de accesibilidad: No se debe desactivar la posibilidad de hacer zoom" width="569" height="549"></p>

<p>Para la verificación de las dos primeras pautas, os resultarán útiles estas sencillas herramientas para comprobar el nivel de contraste existente entre dos colores:</p>
<ul>
    <li><a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM: Color Contrast Checker</a>. Herramienta online.</li>
    <li><a href="https://developer.paciellogroup.com/resources/contrastanalyser/" target="_blank" rel="noopener noreferrer">Colour Contrast Analyser</a>. Aplicación instalable para Windows y Mac.</li>
</ul>