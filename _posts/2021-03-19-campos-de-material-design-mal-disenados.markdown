---
layout:        post
title:         "Los campos de texto de Material Design están mal diseñados"
subtitle:      "Memorando sobre el artículo de Adam Silver"
date:          2021-03-19 23:30:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-68.jpg"
tags:          [buenas prácticas de usabilidad, formularios, memorandos]
---

<p>Desde la humildad de un experto en usabilidad de provincias, siempre he considerado que los campos de texto de los formularios de <a href="https://material.io/" target="_blank" rel="noopener noreferrer">Material Design</a><sup id="fnref:fn-f1"><a href="#fn:fn-f1" class="footnote">1</a></sup> no son todo lo usables que deberían. Pero oye, como es Google quien lo hace, no me había atrevido a criticarlos abiertamente en este blog.</p>

<p>Afortunadamente una reconocida autoridad internacional del mundo de la usabilidad los ha desacreditado tajantemente y no puedo estar más de acuerdo con sus argumentos. Se trata de <a href="https://adamsilver.io/about/" target="_blank" rel="noopener noreferrer">Adam Silver</a>, experto en diseño y usabilidad con más de 20 años de experiencia en organizaciones tan reconocidas por su buen hacer en cuestiones de experiencia de usuario como <a href="https://www.gov.uk/" target="_blank" rel="noopener noreferrer">GOV.UK</a>.</p>

<p>Escudándome en la autoridad Adam y su reciente publicación tanto <a href="https://adamsilver.io/blog/material-design-text-fields-are-badly-designed/" target="_blank" rel="noopener noreferrer">en su propio blog</a> como en la prestigiosa revista del sector <a href="https://www.smashingmagazine.com/2021/02/material-design-text-fields/" target="_blank" rel="noopener noreferrer">Smashing Magazine</a> de sendos artículos explicando los problemas de usabilidad de los campos de texto de los formularios de Material Design, paso a desgranar los inconvenientes que tienen.</p>

<h2>Los campos de texto de Material Design</h2>
<p>Presentemos primero cómo son los campos de texto de Material Design. Se trata de campos en los que la etiqueta del campo (<code>label</code>) se ubica dentro del campo, a modo de <code>placeholder</code>. De modo que cuando el usuario entra en el campo, la etiqueta se desplaza hacia arriba y “flota” sobre el texto que va escribiendo.</p>

<p><img src="{{ site.baseurl }}/img/campos-de-material-design-mal-disenados-01.gif" loading="lazy" alt="" width="234" height="80"></p>

<h2>Problemas de usabilidad de los campos de texto de Material Design</h2>
<p><strong>1. Las etiquetas de los campos que no están rellenados pueden confundirse con un campo rellenado y provocar que el usuario los omita accidentalmente.</strong></p>

<p><img src="{{ site.baseurl }}/img/campos-de-material-design-mal-disenados-02.png" loading="lazy" alt="" width="229" height="144"></p>

<p><strong>2. Las etiquetas tienen un color por defecto que no contrasta suficiente con el color de fondo del campo.</strong></p>
<p>Lo cual incumple los <a href="{{ site.baseurl }}{% post_url 2019-02-22-accesibilidad-web-al-alcance-de-todos %}">criterios de accesibilidad de la W3C</a>.</p>

<p><img src="{{ site.baseurl }}/img/campos-de-material-design-mal-disenados-03.png" loading="lazy" alt="" width="482" height="651"></p>

<p><strong>3. Las etiquetas largas se cortan en Material Design.</strong></p>

<p><img src="{{ site.baseurl }}/img/campos-de-material-design-mal-disenados-04.png" loading="lazy" alt="" width="227" height="65"></p>

<h2>Las etiquetas de los campos, mejor por encima</h2>
<p>Ninguno de los anteriores problemas de usabilidad se dan si <strong>utilizamos etiquetas convencionales situadas por encima de unos campos de formulario</strong> correctamente delimitados por sus cuatro costados.</p>

<p><img src="{{ site.baseurl }}/img/campos-de-material-design-mal-disenados-05.png" loading="lazy" alt="" width="410" height="347"></p>

<p>Una recomendación básica de usabilidad sobre la que <a href="{{ site.baseurl }}{% post_url 2018-03-11-tip-11-etiquetas-por-encima-campos %}">ya escribí en este mismo blog hace tres años</a>.</p>

<p>Tratar de reinventar la rueda no suele ser buena idea y en usabilidad contradecir el <a href="{{ site.baseurl }}{% post_url 2017-01-18-principios-usabilidad %}">principio de consistencia</a> tampoco.</p>

<hr>

<div class="footnotes">
    <ol>
        <li id="fn:fn-f1">
            <p>Sistema de diseño de Google para todo su ecosistema de productos y servicios digitales. Tanto para aplicaciones móviles como para entorno web.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
        </li>
    </ol>
</div>