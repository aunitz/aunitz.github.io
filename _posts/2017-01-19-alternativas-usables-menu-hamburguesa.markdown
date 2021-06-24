---
layout:     post
title:      "Alternativas usables al menú hamburguesa"
subtitle:   "No abuses de las hamburguesas ;)"
date:       2017-01-19 09:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-09.jpg"
tags:       [buenas prácticas de usabilidad]
---

<p>Ya habrás leído en más de una ocasión<sup id="fnref:fn-f1"><a href="#fn:fn-f1" class="footnote">1</a></sup> que el menú hamburguesa no resulta usable para muchos usuarios. Comparto esta opinión por la sencilla razón de que contradice el principio de usabilidad de <strong>interfaz visible</strong><sup id="fnref:fn-f2"><a href="#fn:fn-f2" class="footnote">2</a></sup>. El cual afirma que deben evitarse elementos invisibles de navegación que han de ser inferidos por los usuarios, menús desplegables, indicaciones ocultas, etc.</p>

<p>Buscando alternativas, he encontrado este <a href="https://medium.com/@kollinz/hamburger-menu-alternatives-for-mobile-navigation-a3a3beb555b8#.h13amirvf" target="_blank" rel="noopener noreferrer">excelente artículo de Zoltan Kollin</a> en Medium, que describe hasta 5 alternativas válidas.</p>

<ol>
  <li>Pestañas</li>
  <li>Pestañas con la opción “Más”</li>
  <li>Menú que muestra más o menos opciones en función de la resolución</li>
  <li>Menú con scroll horizontal</li>
  <li>Menú desplegable</li>
</ol>

<p>Voy a tratar de simplificar el problema y escoger una de las alternativas que proporciona Zoltan.</p>

<p>Realmente, la opción (3) es una variante más trabajada de la opción (2).</p>

<p>La opción (5) la descarto porque incumple el principio de interfaz visible.</p>

<p>La opción (4) la descarto porque hay usuarios a los que no les resultará evidente que hay que hacer scroll horizontal para acceder a las secciones ocultas.</p>

<h2 class="section-heading">Conclusión</h2>

<p>Si el menú tiene más opciones de las que pueden verse en un móvil la mejor solución me parece la del menú que muestra más o menos opciones en función de la resolución. De este modo, mostramos de primeras el máximo número posible de opciones de menú que permite cada dispositivo. Maximizando el cumplimiento del principio de interfaz visible.</p>

<h3>Ejemplo: BBC</h3>
<p><img src="{{ site.baseurl }}/img/bbc-menu.gif" loading="lazy" alt="Menú progresivo de la web de la BBC" width="800" height="31"></p>

<hr>

<div class="footnotes">
    <ol>
        <li id="fn:fn-f1">
            <p>Por ejemplo <a href="https://www.nngroup.com/articles/hamburger-menus/" target="_blank" rel="noopener noreferrer">en este artículo de Nielsen Norman Group</a>.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
        </li>
        <li id="fn:fn-f2">
            <p>Mi lista de <a href="{{ site.baseurl }}{% post_url 2017-01-18-principios-usabilidad %}">principios generales de usabilidad</a>.&nbsp;<a href="#fnref:fn-f2" class="reversefootnote">&#8617;</a></p>
        </li>
    </ol>
</div>