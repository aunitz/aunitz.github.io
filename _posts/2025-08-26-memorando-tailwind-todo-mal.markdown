---
layout:        post
title:         "Memorando del artículo de Colton Voege «Tailwind is the Worst of All Worlds»"
subtitle:      "Tailwind: todo mal 👎🏻"
description:   "Memorando del artículo de Colton Voege sobre Tailwind CSS: principales inconvenientes, motivos de su popularidad y reflexiones sobre su uso en desarrollo frontend."
date:          2025-08-26 14:30:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-109.jpg"
tags:          [desarrollo de soluciones digitales, memorandos]
---

<p>Hace años que estoy suscrito al excelente boletín semanal sobre desarrollo <em>frontend</em> llamado <a href="https://frontendfoc.us/" target="_blank" rel="noopener noreferrer"><em>Frontend Focus</em></a>. En su <a href="https://frontendfoc.us/issues/702" target="_blank" rel="noopener noreferrer">número 702</a>, publicado en julio de 2025, enlazan un artículo del ingeniero Colton Voege que lleva un título provocador: <a href="https://colton.dev/blog/tailwind-is-the-worst-of-all-worlds/" target="_blank" rel="noopener noreferrer"><em>Tailwind is the Worst of All Worlds</em></a>.</p>

<p>No soy experto en desarrollo <em>frontend</em>, pero llevo muchos años dirigiendo proyectos en los que trabajan excelentes profesionales del desarrollo de interfaces y, en especial, del uso de CSS. Estoy al tanto de las novedades y de la práctica cotidiana con este lenguaje. Teniendo en cuenta este contexto, diré que <strong><em>Tailwind</em> nunca me ha gustado</strong>. He experimentado un poco con él y hay aspectos que me han incomodado desde el principio. No lo había expresado antes porque no he visto que se critique en exceso este <em>framework</em>. Hasta que leí el artículo de Colton Voege y pensé: «¡Vaya! No soy el único al que no le convence <em>Tailwind</em>». Con la ventaja de que Colton es un ingeniero experto en desarrollo web y fundamenta técnicamente sus afirmaciones. Por ello, me sumo a él en la crítica a <em>Tailwind</em> y paso a resumir los principales inconvenientes que señala y en los que coincido plenamente.</p>

<p>Antes de nada, os mostraré una captura de pantalla tomada de la documentación oficial de <em>Tailwind</em>. No hay que buscar demasiado: está plagada de este tipo de ejemplos.</p>

<p>
    <a href="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-01-grande.jpg">
        <img src="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-01.jpg" loading="lazy" alt="" width="720" height="423">
    </a>
</p>

<p>He resaltado el fragmento de código que de inmediato me llamó la atención: esas <strong>largas listas de clases CSS</strong> que parecen más estilos en línea que clases definidas en una hoja de estilos externa. Nunca le he encontrado sentido a este tipo de código.</p>

<h2>Principales inconvenientes de <em>Tailwind</em> según Colton Voege</h2>

<h3>Clases como estilos inline ofuscados</h3>
<p>Como hemos visto en la captura anterior, <em>Tailwind</em> ofrece estilos <em>inline</em> mediante clases, no como pares clave-valor, lo que reduce la legibilidad y dificulta su escritura.</p>

<h3>Sin conjuntos de reglas reutilizables</h3>
<p>A diferencia de los estilos CSS que permiten agrupar reglas reutilizables, en <em>Tailwind </em>se recomienda duplicar las mismas cadenas de clases múltiples veces.</p>
<p>La siguiente captura de pantalla de la documentación oficial de <em>Tailwind</em> me dejó sin palabras:</p>

<p><img src="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-02.gif" loading="lazy" alt="" width="720" height="717"></p>

<h3>Dependencia de un <em>bundler</em></h3>
<p><em>Tailwind</em> no funciona sin un <em>plugin</em> y un sistema de <em>bundling</em>, al revés que CSS puro que se puede emplear directamente en una página.</p>

<h3>Carga mental elevada para los desarrolladores</h3>
<p>Se requiere aprender no solo la semántica de CSS (como <code>background-color</code>), sino también las convenciones de <em>Tailwind</em> (<code>bg-</code>, <code>items-</code>, etc.).</p>
<p><em>Tailwind</em> no es especialmente consistente a la hora de nombrar sus clases. Escribir código significa tener que esperar la sugerencia del editor para saber qué estilo aplica cada clase, o buscarlo manualmente.</p>

<p><img src="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-03.png" loading="lazy" alt="" width="720" height="480"></p>

<h3>Migraciones difíciles entre versiones</h3>
<p>Cada vez que <em>Tailwind</em> actualiza su versión mayor y cambia algunas clases, es necesario usar <em>codemods</em> y después revisar manualmente miles de cambios.</p>

<h3>Uso reiterado del prefijo por cada regla</h3>
<p>Aunque <em>Tailwind</em> facilita el uso de variantes (como <code>lg:</code>) para <em>media queries</em>, cada regla debe repetirse con el prefijo. Lo cual es más verboso que definir un bloque <em>media</em><em> query</em> en una única estructura de código donde escribes todas las propiedades juntas.</p>

<h2>Y entonces, ¿por qué se utiliza tanto <em>Tailwind</em>?</h2>
<p>Yo también me lo pregunto. He de reconocer que no tengo el conocimiento suficiente como para responder con autoridad a esta cuestión, de modo que paso a enumerar los principales motivos por los que, según Colton Voege, «todo el mundo utiliza <em>Tailwind</em>».</p>

<h3>Buena documentación y marketing</h3>
<p><em>Tailwind</em> cuenta con una de las documentaciones más completas y cuidadas del ecosistema <em>frontend</em>. Su página web es atractiva, clara y ofrece ejemplos listos para copiar, lo que transmite una sensación de inmediatez.</p>

<h3>Promesa de velocidad</h3>
<p><em>Tailwind</em> transmite la sensación de que permite desarrollar interfaces con gran rapidez, ya que posibilita aplicar estilos sin salir del HTML/JSX. Se percibe como una opción más productiva que escribir CSS en hojas de estilo separadas o configurar un sistema de diseño desde cero.</p>

<p><img src="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-05.png" loading="lazy" alt="" width="720" height="480"></p>

<h3>Comunidad y moda</h3>
<p>Existe una comunidad muy numerosa que crea contenido, tutoriales y plantillas basadas en <em>Tailwind</em>. <em>Influencers</em>, <em>youtubers</em> y grandes proyectos han adoptado y promocionado esta herramienta, lo que genera validación social y provoca que nuevos desarrolladores la incorporen casi por inercia. Así se ha consolidado la percepción de que es un estándar de facto: «si todos lo usan, debe de ser bueno».</p>

<h4>La contribución de la IA generativa</h4>
<p>Las clases de <em>Tailwind</em> son especialmente fáciles de recordar, reproducir y generar para los modelos de lenguaje (LLM). Gracias a ello, se han vuelto muy populares en esta era de asistentes de inteligencia artificial, que pueden sugerir o generar código al instante usando sus utilidades.</p>

<h3>Plantillas y componentes predefinidos</h3>
<p><em>Tailwind</em> ofrece un amplio ecosistema de plantillas, <em>themes</em> y librerías UI que atraen a quienes quieren resultados rápidos y vistosos.</p>

<p><img src="{{ site.baseurl }}/img/memorando-tailwind-todo-mal-04.png" loading="lazy" alt="" width="720" height="480"></p>

<h3>Facilidad de entrada para principiantes</h3>
<p>Al no requerir un conocimiento profundo de CSS, los principiantes tienen la sensación de dominar la maquetación con mayor rapidez. Esto convierte a <em>Tailwind</em> en una herramienta atractiva para quienes se inician en este ámbito.</p>