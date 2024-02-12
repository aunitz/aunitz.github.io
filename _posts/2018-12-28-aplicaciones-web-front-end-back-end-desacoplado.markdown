---
layout:     post
title:      "Aplicaciones web con front-end y back-end desacoplado"
subtitle:   "Las ventajas de mantener separados ambos mundos"
date:       2018-12-28 18:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-38.jpg"
tags:       [desarrollo de soluciones digitales]
---

<h2>El patrón MVC</h2>
<p>Llevamos lustros desarrollando aplicaciones web bajo el patrón MVC (Modelo-vista-controlador) y aún lo seguimos haciendo.</p>
<p>Hemos defendido este patrón de arquitectura de software porque separa:</p>
<ul>
	<li>El <strong>Modelo</strong>: los datos y la lógica de negocio. Envía a la vista aquella parte de la información que en cada momento se le solicita para que sea mostrada. Las peticiones de acceso o manipulación de información llegan al modelo a través del controlador.</li>
	<li>El <strong>Controlador</strong>: encargado de gestionar los eventos y las comunicaciones entre la vista y el modelo.</li>
	<li>La <strong>Vista</strong>: interfaz de usuario. Presenta la información procedente del modelo.</li>
</ul>
<p>Al separar el desarrollo en tres capas se simplifica el trabajo y se facilita la reutilización de código y la separación de conceptos, características que buscan facilitar la tarea de desarrollo de aplicaciones y su posterior mantenimiento.</p>

<p><img src="{{ site.baseurl }}/img/front-end-back-end-desacoplado-01.jpg" loading="lazy" alt="" width="722" height="339"></p>

<p>Los primeros desarrollos de aplicaciones web planteaban un enfoque de cliente ligero en el que casi todas las funciones, tanto de la vista, el modelo y el controlador recaían en el servidor. En este enfoque, el cliente manda la petición de cualquier enlace o formulario al controlador y después recibe de la vista una página completa y actualizada. Tanto el modelo como el controlador (y buena parte de la vista) están completamente alojados en el servidor.</p>
<p>Aquellas primeras aplicaciones eran percibidas por el usuario como lentas y poco dinámicas en comparación con las aplicaciones de escritorio. Para solventar este problema <strong>se fueron trasladando cada vez más partes de la vista al lado del cliente</strong>. Es decir, al navegador.</p>
<p>Típicamente se empezaron a actualizar partes de la vista usando <strong>AJAX</strong>. Normalmente con la ayuda de librerías como <strong>jQuery</strong>. En consecuencia, las tecnologías propias del front-end (HTML, CSS y JavaScript) fueron tomando cada vez mayor protagonismo.</p>
<p>Sin embargo, la interacción del usuario no estaba resultando todo lo dinámica y fluida que esperábamos si la comparábamos con las aplicaciones de escritorio y las ya masivamente implantadas aplicaciones móviles.</p>
<p>Además, empezaron a sumarse múltiples dispositivos en los que nuestra aplicación podía llegar a querer ser ejecutada: ordenadores de sobremesa, portátiles, tablets, móviles, consolas, televisores...</p>

<h3>¿Está la vista completamente desacoplada?</h3>
<p>Al querer dar respuesta a los nuevos retos planteados descubrimos que en la mayoría de nuestras aplicaciones <strong>el teórico desacoplamiento de la vista no era tal</strong>.</p>
<p>Una de las pruebas de ello era que las páginas (JSP, PHP, ASP.NET…) que componían el interfaz del usuario ejecutaban código en lenguajes de programación propios del back-end. Como Java, PHP o ASP.NET.</p>
<p>Este código se ejecutaba en el servidor y obligaba al navegador a recargase para poder acceder a las nuevas pantallas.</p>

<p><img src="{{ site.baseurl }}/img/front-end-back-end-desacoplado-02.jpg" loading="lazy" alt="" width="722" height="339"></p>

<p>Utilizando las herramientas front-end disponibles en aquellos años (AJAX, jQuery) podríamos haberlo evitado, pero resultaba excesivamente complejo y al final siempre dependíamos de los lenguajes de servidor para ciertas tareas del front. Como por ejemplo para el enrutado.</p>

<h2>El patrón SPA</h2>
<p>Aunque se habla de que el origen del concepto de SPA (Single-Page Applications) data del 2003, lo cierto es que, al menos yo, no empecé a participar en proyectos que lo usaban hasta aproximadamente el 2013. Año en el que MSDN Magazine de Microsoft publicó un <a href="https://msdn.microsoft.com/en-gb/magazine/dn463786.aspx" target="_blank" rel="noopener noreferrer">esclarecedor artículo sobre el tema</a>.</p>
<p>Los dos primeros párrafos del artículo definen claramente el concepto. Me permito la libertad de citarlos, tras una traducción libre.</p>

<blockquote>Las SPA son aplicaciones web que cargan una sola página HTML y actualizan dinámicamente esa página a medida que el usuario interactúa con la aplicación.</blockquote>
<blockquote>Los SPA utilizan AJAX y HTML5 para crear aplicaciones web fluidas y dinámicas, sin recargas de página constantes. Sin embargo, esto significa que gran parte del trabajo ocurre en el lado del cliente, en JavaScript.</blockquote>

<p>Y después apunta un matiz muy interesante:</p>

<blockquote>Para el desarrollador tradicional de ASP.NET, puede ser difícil dar el salto. Afortunadamente, hay muchos frameworks de JavaScript de código abierto que facilitan la creación de SPA.</blockquote>

<p>Donde menciona "desarrollador tradicional de ASP.NET" podríamos mencionar igualmente desarrollador tradicional de Java, PHP, etc.</p>
<p>Desde mi experiencia, la realidad es que <strong>el desarrollador tradicional de back-end rara vez es capaz de asimilar todas las competencias en HTML, CSS y JavaScript que son necesarias</strong> para desarrollar una aplicación web moderna. Es por ello por lo que desde hace años existe una nueva especialidad de desarrollador: el <strong>programador front-end</strong>.</p>

<p><img src="{{ site.baseurl }}/img/front-end-back-end-desacoplado-03.jpg" loading="lazy" alt="" width="722" height="339"></p>

<p>Por supuesto también existen los <strong>desarrolladores full-stack</strong> (que trabajan tanto con tecnologías front como back) pero, a mi entender, por la natural limitación de nuestra capacidad intelectual es muy difícil encontrar profesionales que sean capaces de desenvolverse con la misma soltura en ambos frentes. Especialmente para el desarrollo de proyectos de cierta envergadura.</p>

<h3>¿Está la vista completamente desacoplada?</h3>
<p>Volvemos a plantearnos la misma pregunta que con el patrón MVC clásico y la respuesta en esta ocasión es que sí.</p>
<p>Sí, siempre y cuando desarrollemos las aplicaciones separando completamente el back-end del front-end.</p>
<ul>
	<li>El <strong>back-end</strong> se encarga de gestionar los datos y la lógica de negocio. Se ejecuta en el servidor y expone al front una <strong>API</strong>.</li>
	<li>El <strong>front-end</strong> constituye el interfaz de usuario. Se encarga de todo el dinamismo y la interacción. Se ejecuta (típicamente) en el navegador. Se comunica con la API mediante el intercambio de ficheros ligeros de datos (habitualmente <strong>JSON</strong>).</li>
</ul>
<p>A nivel puramente teórico, podríamos discutir si este patrón no es también una modalidad de MVC. Esta postura es defendible y argumentable. De hecho, la literatura sobre MVC es a menudo confusa y contradictoria.</p>
<p>Bajo mi punto de vista, estoy de acuerdo en que la contraposición a nivel teórico del patrón MVC y el patrón SPA no es del todo acertada. Pero en la práctica, la experiencia me dice que <strong>el patrón SPA “obliga” a los desarrolladores de manera más consciente a separar front y back</strong>. Que es al fin y al cabo el objetivo último de ambas arquitecturas. Y diría que de cualquier arquitectura de desarrollo de aplicaciones moderna.</p>

<h2>Ventajas de desacoplar el front-end y el back-end</h2>
<p>Habría muchas ventajas de las que hablar. Algunas ya las he mencionado anteriormente. Destacaré las que en este momento me parecen más relevantes.</p>
<ul>
	<li>Probablemente la principal ventaja y el principal motivo por el que surgieron las SPA fue el de dotar a los interfaces web de la misma <strong>rapidez e interactividad fluida</strong> que las aplicaciones de escritorio.</li>
	<li>El back-end puede ser utilizado por otras interfaces web y por aplicaciones móviles. Es decir, los datos y la lógica pueden estar centralizadas y expuestas a través de una misma <strong>API</strong> que dé servicio a multitud de interfaces de usuario. Presentes y futuros.</li>
	<li>Salvo en la carga inicial de la aplicación, el intercambio de información entre cliente y servidor es extremadamente ligero porque en cada petición y respuesta entre cliente y servidor lo que se intercambian son archivos <strong>JSON</strong>.</li>
	<li>Las SPA envían una solicitud al servidor, <strong>almacenan los datos localmente</strong> y conservan la capacidad de usar esos datos sin tener que realizar otra solicitud, incluso si el usuario pierde la conexión a internet.</li>
</ul>
<p>A nivel más técnico, me gustaría mencionar algunas ventajas adicionales:</p>
<ul>
	<li>Los frameworks de front-end están muy orientados a las <strong>componentización</strong> y la <strong>encapsulación</strong>. De modo que permiten crear grandes aplicaciones a partir de infinidad de piezas pequeñas independientes entre sí. Es paradigmático el caso de Facebook que utiliza más de 30.000 componentes React en su red social.</li>
	<li>Los desarrolladores back-end no necesitan lidiar con HTML, CSS y JS. Puede parecer una ventaja menor, pero por mi experiencia resulta fundamental para la buena calidad final del producto. No nos engañemos, la mayor parte de los programadores de perfil back no son buenos con el HTML y los CSS. Resulta mucho más eficiente que los equipos cuenten con especialistas específicos en ambos perfiles.</li>
</ul>

<h2>Qué framework de front-end escoger</h2>
<p>Siento si defraudo las expectativas de algunos, pero no voy a posicionarme sobre esta cuestión. Considero que sería desviar la atención del debate sobre lo realmente relevante: la <strong>apuesta por desacoplar el front-end y el back-end</strong>.</p>
<p>Entrar a debatir si usar un framework de front u otro es entrar a un detalle técnico similar al que sería necesario para debatir sobre qué framework de back utilizar.</p>

<p><img src="{{ site.baseurl }}/img/front-end-back-end-desacoplado-04.jpg" loading="lazy" alt="" width="722" height="481"></p>

<p>Creo que entre los frameworks de primera línea no hay uno mejor ni peor. Dependerá de las características concretas del proyecto, del conocimiento de los desarrolladores, de las necesidades de integración con otros sistemas, de los plazos, etc.</p>
<p>Lo que considero que es claramente ventajosa es la apuesta por una arquitectura que desacople el front-end y el back-end de manera radical.</p>
<p>No en vano es el camino que han seguido empresas como <strong>Google, Microsoft, Facebook, HBO, Instagram, PayPal, WhatsApp Web, American Express, OpenBank, eBay, Airbnb, Twitter, Pinterest, Slack, Uber, Dropbox </strong>y un largo etcétera.</p>