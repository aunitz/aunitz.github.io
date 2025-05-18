---
layout:        post
title:         "Formularios usables: mensajes de error"
subtitle:      "Consejos de usabilidad sobre cómo mostrar los mensajes de error"
date:          2021-02-06 21:30:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-64.jpg"
tags:          [buenas prácticas de usabilidad, formularios]
---

<p>En circunstancias ideales, nuestros formularios deberían ser tan fáciles de usar que las posibilidades de que el usuario cometa errores debería ser mínima. Aún así, en el mundo real, todos sabemos que por problemas de usabilidad o por despistes del usuario, los errores se producen.</p>

<p>El primer grupo de consejos que te proporciono va encaminado a <strong>reducir la posibilidad de que el error se produzca</strong>:</p>
<ul>
    <li><a href="{{ site.baseurl }}{% post_url 2017-03-09-tip-4-reducir-campos-formulario %}">Reduce el número de campos de los formularios</a>.</li>
    <li><a href="{{ site.baseurl }}{% post_url 2019-10-28-tip-14-emplea-valores-por-defecto-utiles-en-formularios %}">Emplea valores por defecto útiles en los formularios</a>.</li>
    <li><a href="{{ site.baseurl }}{% post_url 2020-01-29-tip-17-no-utilices-atributo-placeholder %}">No utilices el atributo placeholder</a>.</li>
    <li><a href="{{ site.baseurl }}{% post_url 2021-01-17-formularios-usables-campos-de-fecha %}">Utiliza campos diferentes para el día, mes y año</a>. Habitualmente es la manera más rápida para el usuario de rellenar un campo de fecha.</li>
</ul>

<p>Si a pesar de todas nuestras precauciones el usuario comente algún error, te aconsejo lo siguiente:</p>

<ul>
    <li><strong>No utilices la validación <em>inline</em></strong>. Es decir, aquella que se produce desde que el campo toma el foco y el usuario comienza a escribir. No sólo resulta muy molesto, hay otros muchos motivos que lo desaconsejan. Pero mejor que yo, <a href="https://adamsilver.io/articles/live-validation-is-problematic/" target="_blank" rel="noopener noreferrer">te los explica Adam Silver en su blog</a>.</li>
    <li><strong>No utilices la validación nativa de HTML5</strong>. Muestra unos mensajes que no son controlables por el desarrollador (ni en aspecto ni en contenido) porque la implementación del estándar de la W3C la realiza cada navegador web a su manera. Con lo cual perderás control y consistencia en tu aplicación. Además, presenta importantes problemas de accesibilidad. Como <a href="https://adrianroselli.com/2019/02/avoid-default-field-validation.html" target="_blank" rel="noopener noreferrer">los que explica de manera detallada Adrian Roselli en su blog</a>.</li>
    <li><strong>Muestra el mensaje de error justo encima del campo</strong>. Al estar próximo al campo (<a href="{{ site.baseurl }}{% post_url 2018-01-22-ley-06-principio-de-la-proximidad %}">principio de proximidad</a>), el usuario identifica claramente a qué campo corresponde cada error. El motivo de mostrarlo por encima y no por debajo del campo es que no quede oculto por las cajas de autocompletado que muestran los navegadores y/o por el teclado de los móviles y tabletas. En el blog de Adrian Roselli hay una buena <a href="https://adrianroselli.com/2017/01/avoid-messages-under-fields.html" target="_blank" rel="noopener noreferrer">colección de capturas de pantalla que ilustran este problema</a>.</li>
    <li><strong>Los textos de error deberán ir en color rojo y mostrar un icono de alerta</strong>. Esto último es para no transmitir al usuario información sólo mediante el color; lo cual <a href="{{ site.baseurl }}{% post_url 2019-02-22-accesibilidad-web-al-alcance-de-todos %}">atenta contra la accesibilidad</a>.</li>
    <li><strong>Los mensajes de error deben ser claros, concisos, específicos, consistentes y escritos en un lenguaje directo que evite innecesarias fórmulas de cortesía </strong>(como “por favor”)<strong>. </strong>En el sistema de diseño de GOV.UK tienen un <a href="https://design-system.service.gov.uk/components/error-message/" target="_blank" rel="noopener noreferrer">apartado que explica en detalle esta recomendación</a>.</li>
    <li>Y finalmente, <strong>respeta el <a href="{{ site.baseurl }}{% post_url 2017-01-18-principios-usabilidad %}">principio de protección del trabajo</a> de los usuarios</strong>. Se debe asegurar que los usuarios nunca pierden su trabajo como consecuencia de un error.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/formularios-usables-mensajes-de-error.png" loading="lazy" alt="" width="521" height="471"></p>

<p class="small">Nota: este post se irá actualizando a medida que mis criterios sobre usabilidad de los formularios vayan evolucionando o los vaya enlazando a posts que desarrollan cada consejo. La fecha de publicación que figura en la cabecera se corresponde a la del post inicial.</p>