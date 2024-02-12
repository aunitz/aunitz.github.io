---
layout:     post
title:      "Memorando del podcast de Daniel Primo “¿Por qué Drupal es difícil?”"
subtitle:   "Notas que quiero recordar sobre lo escuchado en el podcast"
date:       2021-02-16 17:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-66.jpg"
tags:       [desarrollo de soluciones digitales, memorandos]
---

<p>Hace unos años escribí un <a href="{{ site.baseurl }}{% post_url 2017-09-15-memorando-libro-atomic-design-brad-frost %}">memorando sobre el libro Atomic Design de Brad Frost</a>. Es habitual encontrar en Internet: reseñas, resúmenes y memorandos sobre libros. ¿Y por qué no sobre podcasts?</p>

<p>Recientemente necesité informarme sobre los motivos por los que Drupal es considerado un CMS difícil o “para desarrolladores”. Y no he encontrado mejor recurso en español que el <a href="https://www.danielprimo.io/blog/por-que-drupal-es-dificil" target="_blank" rel="noopener noreferrer">episodio número 22 (13/02/2018) del podcast Web Reactiva</a> del programador y formador <a href="https://www.danielprimo.io/" target="_blank" rel="noopener noreferrer">Daniel Primo</a>.</p>

<p><img src="{{ site.baseurl }}/img/memorando-por-que-drupal-es-dificil-01.png" width="600" height="150" loading="lazy" alt=""></p>

<p>Lo que pretendo en este artículo es pasar a limpio las principales enseñanzas o reflexiones que me ha aportado la escucha del episodio. A modo de recordatorio para el futuro. En consecuencia, se trata de un escrito completamente subjetivo y basado en mi <em>know how</em> previo.</p>

<h2>¿Qué es Drupal?</h2>
<p>Drupal es algo más que un CMS (Content Management System), un gestor de contenidos. Es un <strong>framework para construir aplicaciones web</strong>. Es software libre (open source). Está construido con tecnologías de software libre como <strong>PHP</strong> y <strong>JavaScript</strong>.</p>

<p>Arquitectura básica de Drupal: <strong>módulos</strong> (PHP y JS para el navegador) y <strong>plantillas</strong> (themes CSS, JS y HTML) que se integran sobre el <strong>núcleo</strong> y se comunican con él a través de diversas <strong>APIs</strong>.</p>

<p><img src="{{ site.baseurl }}/img/memorando-por-que-drupal-es-dificil-02.png" width="650" height="364" loading="lazy" alt=""></p>

<p>Características destacadas:</p>
<ul>
	<li>Alta escalabilidad</li>
	<li>Modular</li>
	<li><a href="{{ site.baseurl }}{% post_url 2020-04-06-que-es-mobile-first %}">Mobile First</a></li>
	<li>Máxima preocupación por la seguridad</li>
	<li>Integración con otras plataformas (API First)</li>
	<li>Arquitectura de contenido flexible</li>
	<li>Multisite</li>
	<li>Multidioma</li>
	<li>Una gran comunidad de desarrolladores que lo soporta</li>
</ul>

<h2>¿Para qué proyectos es adecuado Drupal?</h2>
<p>En la charla que Dries Buytaert (el creador de Drupal) ofreció en la DrupalCon de 2017 en Viena, expuso las intenciones sobre el propósito futuro de Drupal. Declaró que no es una herramienta para crear sitios web sencillos, sino para crear <strong>plataformas complejas</strong>. Como, por ejemplo:</p>
<ul>
	<li>Sitios con integraciones de terceros</li>
	<li>Plataformas multisite</li>
	<li>Plataformas omnicanal (presentar información en distintos dispositivos y/o aplicaciones mediante la API)</li>
	<li>Etc.</li>
</ul>

<p>Drupal no es la herramienta para webs corporativas sencillas, blogs o portfolios personales.</p>

<h2>¿Qué perfil se requiere para desarrollar sobre Drupal?</h2>
<p>Para poder empezar a exprimir el potencial de Drupal, es necesario que los usuarios que desarrollen los sitios web tengan <strong>cierto grado de conocimiento de Drupal</strong> y sepan <strong>programar en PHP</strong>.</p>

<p><img src="{{ site.baseurl }}/img/memorando-por-que-drupal-es-dificil-03.jpg" width="720" height="318" loading="lazy" alt=""></p>

<h2>¿Por qué es considerado Drupal difícil?</h2>
<p>El núcleo de Drupal 8 se basa en componentes <strong>Symfony</strong> (uno de los <em>framework</em> más potentes que existen para PHP). Por tanto, ha dado un giro definitivo hacia la <strong>programación orientada a objetos</strong>. Paradigma de programación que hay que entender y dominar para sacarle el máximo provecho a la herramienta. En consecuencia, marca ineludiblemente unas reglas del juego que tienes que aprender.</p>

<p>Además, los recursos de aprendizaje para los usuarios que ya han superado las fases iniciales de conocimiento de la herramienta son escasos y <strong>cobran mucha importancia las personas con experiencia</strong>. Debería haber al menos una persona en el equipo con este perfil de experto que oriente a los más novatos.</p>
<p>Desde hace años circula un gráfico anónimo en clave de humor que representa la <strong>curva de aprendizaje de Drupal </strong>con respecto a otros populares CMS.</p>

<p><img src="{{ site.baseurl }}/img/memorando-por-que-drupal-es-dificil-04.png" width="600" height="581" loading="lazy" alt=""></p>