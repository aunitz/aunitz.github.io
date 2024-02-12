---
layout:     post
title:      "Cómo crear una página web gratuita en GitHub Pages (segunda parte)"
subtitle:   "Cómo configurar un nombre de dominio propio"
date:       2021-05-09 21:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-72.jpg"
tags:       [desarrollo de soluciones digitales]
---

<p>Este post es la segunda parte de uno anterior en el que explicaba <a href="{{ site.baseurl }}{% post_url 2021-05-08-como-crear-pagina-web-gratis-github-pages %}">el paso a paso de cómo crear una página web gratuita en GitHub Pages</a>.</p>

<p>En el post anterior aprendíamos a crear y alojar nuestra web en GitHub Pages y en este aprenderemos <strong>cómo configurarle un nombre de dominio propio</strong>.</p>

<p>Requisitos previos:</p>
<ul>
	<li><strong>Haber publicado una web en GitHub Pages</strong> siguiendo los pasos del <a href="{{ site.baseurl }}{% post_url 2021-05-08-como-crear-pagina-web-gratis-github-pages %}">post anterior</a>.</li>
	<li><strong>Comprar un nombre de dominio</strong> con alguna empresa registradora. Su coste suele rondar los 10 € anuales. Debes tener en cuenta que el coste del dominio se paga todos los años. Si dejas de pagarlo, dejarás de ser el propietario del dominio y quedará libre para que cualquier otro usuario pueda comprarlo.</li>
</ul>

<p>Para nuestro ejemplo, hemos comprado el nombre de dominio “<strong>aprendeusabilidadyux.com</strong>”.</p>

<h2>Paso 1: añadir una entrada de tipo CNAME en las DNS del dominio</h2>

<p>El paso 1 y el paso 2 son intercambiables. Es decir, no es relevante cuál realices primero y cuál después.</p>

<p>Al crear una nueva entrada de tipo CNAME en el registro de DNS del dominio, lo que estamos haciendo es decirle a los navegadores y buscadores que cuando entren en www.aprendeusabilidadyux.com, realmente deben mostrar el contenido de nuestro repositorio de GitHub Pages.</p>

<p>Para ello debes entrar al panel de control que te habrá facilitado la empresa en la que has comprado el dominio y <strong>añadir una nueva entrada a los registros DNS</strong>.</p>

<p>Esta nueva entrada tendrá las siguientes propiedades:</p>
<ul>
	<li>Host: <strong>www</strong></li>
	<li>Tipo: <strong>CNAME</strong></li>
	<li>Valor: <strong>[nombreusuario].github.io</strong></li>
</ul>

<p>Naturalmente sustituyendo [nombreusuario] por el correspondiente a nuestro proyecto. Si tienes dudas en este punto, vuelve a <a href="{{ site.baseurl }}{% post_url 2021-05-08-como-crear-pagina-web-gratis-github-pages %}">consultar la primera parte de este tutorial</a> que se encuentra en un post anterior.</p>

<p><strong class="text-danger">Aviso importante:</strong> aunque el cambio que acabas de realizar pueda estar visible en tu panel de control inmediatamente, la realidad es que <strong>las modificaciones a nivel de DNS pueden llegar a tardar entre 12 y 24 horas en propagarse</strong> a todo el mundo. A veces bastante menos otras veces incluso algunas horas más. Por lo que tendrás que esperar un tiempo hasta que GitHub Pages pueda detectar el cambio.</p>

<h2>Paso 2: añadir cuatro entradas de tipo A en las DNS del dominio</h2>

<p>De cara al óptimo posicionamiento en buscadores (SEO), no es conveniente que nuestra página web pueda ser consultada tanto con las “www” como sin ellas. Es decir, que pueda ser consultada tanto con el dominio raíz “aprendeusabilidadyux.com” como con el subdominio “www.aprendeusabilidadyux.com”. Ya que los buscadores considerarán que estamos sirviendo contenido duplicado. Para ellos el dominio raíz y el subdominio “www” son dos “direcciones de internet” diferentes.</p>

<p>Lo más conveniente es decantarse por una de las dos como la dirección canónica de nuestro sitio web. En mi caso, <strong>prefiero el subdominio “www” como dirección canónica</strong>. Preferencia que debo indicar en la configuración de GitHub Pages. Explico cómo en el paso 3.</p>

<p>Para que GitHub Pages nos redireccione correctamente los accesos sin "www" al subdominio con las "www", debemos dirigir el tráfico entrante en el dominio raíz a las cuatro IPs públicas y fijas del servicio de GitHub Pages. Para ello debes entrar al panel de control que te habrá facilitado la empresa en la que has comprado el dominio y <strong>añadir cuatro nuevas entradas a los registros DNS</strong>.</p>

<p>Estas cuatro nuevas entradas (una por cada IP pública de GitHub Pages) tendrán las siguientes propiedades:</p>
<ul>
	<li>Host: <em>dejarlo en blanco</em>.</li>
	<li>Tipo: <strong>A</strong>.</li>
	<li>Valor: <strong>185.199.108.153</strong></li>
	<li>Host: <em>dejarlo en blanco</em>.</li>
	<li>Tipo: <strong>A</strong>.</li>
	<li>Valor: <strong>185.199.109.153</strong></li>
	<li>Host: <em>dejarlo en blanco</em>.</li>
	<li>Tipo: <strong>A</strong>.</li>
	<li>Valor: <strong>185.199.110.153</strong></li>
	<li>Host: <em>dejarlo en blanco</em>.</li>
	<li>Tipo: <strong>A</strong>.</li>
	<li>Valor: <strong>185.199.111.153</strong></li>
</ul>

<p>De nuevo te recordamos que <strong>las modificaciones a nivel de DNS pueden llegar a tardar entre 12 y 24 horas en propagarse</strong> a todo el mundo.</p>

<h2>Paso 3: configurar nuestro dominio personalizado en GitHub Pages</h2>

<p>Para ello deberemos acceder a la pestaña “Settings” de nuestro repositorio y después entrar en la opción “Pages”.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-01.png" loading="lazy" alt="" width="925" height="71"></p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-02.png" loading="lazy" alt="" width="289" height="170"></p>

<p>Una vez dentro, debemos escribir el nombre de nuestro nombre de dominio personalizado que hayamos escogido como canónico en el formulario de “Custom domain” y pulsar en “Save”.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-03.png" loading="lazy" alt="" width="443" height="112"></p>

<p>La acción de guardar lanzará a su vez tres procesos en GitHub Pages.</p>

<p>El primer proceso que se completará es el de añadir un <em>commit</em> automático a nuestro repositorio que <strong>incorporará un fichero nuevo llamado CNAME</strong>.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-04.png" loading="lazy" alt="" width="514" height="220"></p>

<p>Este fichero contendrá en su interior el nombre de dominio personalizado que hayamos introducido en el formulario anterior.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-05.png" loading="lazy" alt="" width="344" height="217"></p>

<p>Como ya habrás intuido, <strong>no debemos eliminar ni modificar este fichero CNAME</strong> por nuestra cuenta.</p>

<p>El segundo proceso que lanzará GitHub Pages será el de <strong>comprobar</strong> si el dominio que hemos introducido tiene una <strong>entrada CNAME correctamente configurada en sus registros DNS</strong>.</p>

<p>Si no ha transcurrido el tiempo suficiente para que la modificación de DNS se haya propagado, obtendremos un mensaje de error similar al siguiente:</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-06.png" loading="lazy" alt="" width="833" height="150"></p>

<p>En caso de error, deberemos esperar unas horas más y probar de nuevo con el botón “Check again”. Al final el proceso se completará correctamente y obtendremos un check verde de OK.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-07.png" loading="lazy" alt="" width="426" height="99"></p>

<h2>Paso 4: activar el protocolo HTTS para nuestro configurar nuestro dominio personalizado en GitHub Pages</h2>

<p>El tercer y último proceso que se habrá lanzado tras pulsar el botón de “Save” del paso anterior habrá sido el de <strong>crear un certificado SSL gratuito para nuestro sitio web.</strong> GitHub Pages nos indicará el estado del proceso mediante una barra de progreso.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-08.png" loading="lazy" alt="" width="845" height="244"></p>

<p>Cuando el proceso haya finalizado, nos permitirá chequear la casilla de “<strong>Enforce HTTPS</strong>”. La cual es más que recomendable que activemos para que nuestro sitio web se sirva encriptado y seguro.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-09.png" loading="lazy" alt="" width="675" height="94"></p>

<p>Una vez completados todos los pasos anteriores y haber esperado los plazos necesarios para que los nuevos registros DNS se propaguen, podremos escribir el dominio en nuestro navegador y disfrutar de la web que hemos desarrollado.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-segunda-parte-10.png" loading="lazy" alt="" width="722" height="519"></p>

<p>En nuestro caso en <a href="https://www.aprendeusabilidadyux.com/" target="_blank" rel="noopener noreferrer" style="word-break: break-all;">https://www.aprendeusabilidadyux.com/</a></p>

<p>Y recuerda que si quieres actualizar el contenido de la página puedes hacerlo en cualquier momento subiendo los cambios al repositorio GitHub correspondiente. Tal y como lo explico en detalle <a href="{{ site.baseurl }}{% post_url 2021-05-08-como-crear-pagina-web-gratis-github-pages %}">en la primera parte de este post</a>.</p>

<p><strong>Nota:</strong> GitHub proporciona una <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/" target="_blank" rel="noopener noreferrer">completa documentación sobre cómo configurar un dominio propio en GitHub Pages</a>.</p>