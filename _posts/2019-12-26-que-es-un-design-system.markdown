---
layout:        post
title:         "Qué es un sistema de diseño"
subtitle:      "Mucho más que una guía de estilo"
date:          2019-12-26 20:00:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-48.jpg"
tags:          [sistemas de diseño, desarrollo de soluciones digitales, buenas prácticas de diseño]
---

<p>Un <strong>sistema de diseño</strong> (design system) es un <strong>proceso</strong> y conjuntamente una <strong>fuente de recursos</strong> que ayuda a los equipos a diseñar y <strong>desarrollar</strong> los <strong>productos digitales</strong> de una compañía.</p>

<p>Es un <strong>proceso</strong> porque se encuentra en constante evolución. Un sistema de diseño está vivo y progresa continuamente a la vez que los productos que ayuda a desarrollar.</p>

<p>Es una <strong>fuente de recursos</strong> porque proporciona, entre otros elementos, una biblioteca de componentes funcionales y unas reglas o pautas de uso.</p>

<p>El <strong>propósito fundamental</strong> de un sistema de diseño es <strong>facilitar el trabajo de los equipos</strong>.</p>

<p><img src="{{ site.baseurl }}/img/design-system-01.jpg" loading="lazy" alt="" width="720" height="406"></p>

<p>Una de las claves del éxito de los sistemas de diseño es que están concebidos para facilitar el trabajo y dar soporte a todos los miembros de un equipo de desarrollo de producto. Su vocación es ser <strong>interdisciplinar</strong>. De modo que sirva de ayuda a diseñadores, desarrolladores, product owners, etc.</p>

<p>La idea de disponer de elementos de interfaz reutilizables no es nueva. Existe desde hace décadas. Con formas y nombres diferentes: UI kit, guía de estilo, widgets, etc. El hecho diferencial o valor añadido que aporta un sistema de diseño es que proporciona los elementos que necesitan tanto los diseñadores como los desarrolladores. Además de que no permanece estático, sino que <strong>evoluciona constantemente</strong> para adaptarse a las nuevas necesidades de los productos que ayuda a construir.</p>

<h2>Principales beneficios de un sistema de diseño</h2>

<p><a href="https://bradfrost.com/" target="_blank" rel="noopener noreferrer">Brad Frost</a> es uno de los primeros y más influyentes autores que han teorizado sobre los sistemas de diseño. En su libro <a href="http://atomicdesign.bradfrost.com/table-of-contents/" target="_blank" rel="noopener noreferrer">Atomic Design</a> (2013) aporta un listado de los principales beneficios que se derivan de disponer de un sistema de diseño:</p>

<ul>
    <li>Promueve la <strong>consistencia y cohesión</strong> de todos los interfaces y aplicaciones.</li>
    <li>Incrementa la <strong>productividad</strong> de los equipos. Ahorrando tiempo y dinero.</li>
    <li>Facilita un <strong>flujo de trabajo colaborativo</strong> entre las distintas disciplinas implicadas en los proyectos de desarrollo (jefes de proyecto, diseñadores, desarrolladores front-end, desarrolladores back-end, etc.)</li>
    <li>Establece un <strong>vocabulario común</strong> para todas las partes implicadas en el desarrollo. Incluyendo proveedores externos.</li>
    <li>Proporciona <strong>documentación útil</strong> para ayudar a formar a todas las partes implicadas en el desarrollo. Incluyendo proveedores externos.</li>
    <li><strong>Facilita el testeo</strong> en distintos navegadores y dispositivos.</li>
    <li>Constituye una base sólida que se debe <strong>extender y mejorar con el tiempo</strong>.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/design-system-02.jpg" loading="lazy" alt="" width="720" height="346"></p>

<h2>A los sistemas de diseño hay que dedicarles tiempo</h2>

<p>El desarrollo de un sistema de diseño requiere de una importante dedicación de tiempo y recursos. Si bien, una vez que se ha desarrollado, incrementa la velocidad y productividad de los equipos.</p>

<p>No hay que considerar un sistema de diseño como un proyecto con un alcance limitado. Debe ser considerado como parte del producto. Y como tal, crecer y evolucionar de manera ilimitada.</p>

<p>En el momento en el que un sistema de diseño deja de reflejar la realidad del producto, está obsoleto. Para evitarlo hay que disponer de un <em>workflow</em> que lo actualice constantemente.</p>

<p>El “secreto” para desarrollar un sistema de diseño realmente efectivo no es otro que el que exista una auténtica colaboración y comunicación entre todas las partes implicadas y hacerlas trabajar de manera colaborativa, iterativa e incremental.</p>

<p><img src="{{ site.baseurl }}/img/design-system-03.png" loading="lazy" alt="" class="center-block" width="447" height="446"></p>

<h2>La base de un sistema de diseño: la guía de estilo</h2>

<p>No existe una convención universal sobre los entregables que debe o no debe contener un sistema de diseño. En gran medida depende de las necesidades, recursos y conocimientos de cada compañía. El mínimo que debería incluir es lo que se conoce como <strong>guía de estilo</strong> (style guide).</p>

<p><img src="{{ site.baseurl }}/img/design-system-04.png" loading="lazy" alt="" width="720" height="406"></p>

<p>Las guías de estilo reciben varios nombres alternativos: pattern libraries, UI libraries, component libraries.</p>

<p>La guía de estilo es una <strong>colección de componentes y reglas de uso</strong> que el equipo debe seguir para asegurarse de que las diferentes partes de un producto sean consistentes y proporcionen una experiencia coherente al usuario.</p>

<p>Una buena guía de estilo cuenta, al menos, con las siguientes funcionalidades:</p>

<ul>
    <li>Proporciona <strong>descripciones de los componentes</strong> que incluye.</li>
    <li>Facilita el <strong>código fuente</strong> de cada componente.</li>
    <li>Permite visualizar los componentes a <strong>distintas resoluciones</strong> de monitor.</li>
    <li>Proporciona mecanismos para visualizar las distintas <strong>variantes de un componente</strong>.</li>
    <li>Proporciona <strong><a href="{{ site.baseurl }}{% post_url 2019-11-02-tip-15-contenido-precede-diseno %}">contenidos reales</a> de ejemplo</strong> para las distintas plantillas.</li>
    <li>Proporciona <strong>información contextual sobre el uso</strong> adecuado de los componentes.</li>
</ul>

<h2>Las piezas de un sistema de diseño: los componentes</h2>

<p>La unidad básica de un sistema de diseño la constituyen los llamados <strong>componentes</strong>. Son con los que construiremos los interfaces de nuestra aplicación.</p>

<p><img src="{{ site.baseurl }}/img/design-system-05.jpg" loading="lazy" alt="" width="720" height="296"></p>

<p>Para entender el concepto de componente, es habitual compararlos con los bloques de LEGO. Nos es mala aproximación, pero le faltan matices. Los bloques de LEGO son piezas muy pequeñas y reutilizables. Mientras que los componentes de un sistema de diseño pueden ser de dimensión y/o funcionalidades muy diferentes. Por ello el autor <a href="https://bradfrost.com/" target="_blank" rel="noopener noreferrer">Brad Frost</a>, en su libro <a href="http://atomicdesign.bradfrost.com/table-of-contents/" target="_blank" rel="noopener noreferrer">Atomic Design</a> (2013), popularizó la metáfora de la química básica. De modo que los componentes pueden ser de tipo “átomo”, “molécula” u “organismo”. Ayudando a entender que la construcción de los componentes de un sistema de diseño implica <strong>jerarquía</strong>.</p>

<p>La clave de los componentes está en desarrollarlos de modo que puedan estar ubicados en “cualquier” sitio. Es decir, deben ser <strong>modulares</strong>.</p>

<p>No menos importante que la modularidad es que los componentes incluyan <strong>instrucciones de uso</strong> que nos permitirán utilizarlos de manera lógica y consistente, a través de todos los productos.</p>

<h2>Ejemplos de sistemas de diseño</h2>

<p>Algunas compañías publican en abierto sus sistemas de diseño. Suelen hacerlo aquellas que cuentan con una comunidad de desarrolladores externos que trabajan desarrollando aplicaciones que vivirán en su mismo ecosistema.</p>

<p>Lo cual nos brinda una oportunidad única de estudiar y aprender de los sistemas de diseño que estas compañías han desarrollado. Nos ayudará a la hora de crear y mantener los nuestros propios. Porque sí, si puedes permitírtelo, <a href="{{ site.baseurl }}{% post_url 2019-02-07-ventajas-diseno-interfaz-personalizado %}">existen importantes ventajas derivadas de crear un sistema de diseño propio</a>.</p>

<p>Algunos ejemplos destacados:</p>

<h3>Material Design by Google</h3>

<p><a href="https://material.io/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Google</a> para el desarrollo de aplicaciones para Android, iOS y web.</p>

<p><img src="{{ site.baseurl }}/img/design-system-google.png" loading="lazy" alt="Captura de pantalla de Material Design by Google" width="720" height="478"></p>

<h3>Fluent Design System by Microsoft</h3>

<p><a href="https://www.microsoft.com/design/fluent/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Microsoft</a> para el desarrollo de aplicaciones para Windows, Android, iOS y web.</p>

<p><img src="{{ site.baseurl }}/img/design-system-microsoft.png" loading="lazy" alt="Captura de pantalla de Fluent Design System by Microsoft" width="720" height="478"></p>

<h3>Human Interface Guidelines by Apple</h3>

<p><a href="https://developer.apple.com/design/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Apple</a> para el desarrollo de aplicaciones macOS, iOS, watchOS y tvOS.</p>

<p><img src="{{ site.baseurl }}/img/design-system-apple.png" loading="lazy" alt="Captura de pantalla de Human Interface Guidelines by Apple" width="720" height="478"></p>

<h3>Lightning by Salesforce</h3>

<p><a href="https://www.lightningdesignsystem.com/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Salesforce</a> para el desarrollo de aplicaciones web en el ecosistema de este popular CRM en la nube.</p>

<p><img src="{{ site.baseurl }}/img/design-system-salesforce.png" loading="lazy" alt="Captura de pantalla de Lightning by Salesforce" width="720" height="478"></p>

<h3>Carbon Design System by IBM</h3>

<p><a href="https://www.carbondesignsystem.com/" target="_blank" rel="noopener noreferrer">Sistema de diseño de IBM</a> para el desarrollo de aplicaciones web.</p>

<p><img src="{{ site.baseurl }}/img/design-system-ibm.png" loading="lazy" alt="Captura de pantalla de Carbon Design System by IBM" width="720" height="478"></p>

<h3>Atlassian Design</h3>

<p><a href="https://atlassian.design/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Atlassian</a> para el desarrollo de aplicaciones web.</p>

<p><img src="{{ site.baseurl }}/img/design-system-atlassian.png" loading="lazy" alt="Captura de pantalla de Atlassian Design" width="720" height="478"></p>

<h3>Polaris by Shopify</h3>

<p><a href="https://polaris.shopify.com/" target="_blank" rel="noopener noreferrer">Sistema de diseño de Shopify</a> para el desarrollo de aplicaciones web.</p>

<p><img src="{{ site.baseurl }}/img/design-system-shopify.png" loading="lazy" alt="Captura de pantalla de Polaris by Shopify" width="720" height="478"></p>
