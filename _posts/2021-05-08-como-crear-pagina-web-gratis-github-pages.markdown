---
layout:     post
title:      "Cómo crear una página web gratuita en GitHub Pages"
subtitle:   "Guía práctica paso a paso"
date:       2021-05-08 23:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-71.jpg"
tags:       [desarrollo de soluciones digitales]
---

<p>Este post es un tanto <em>off topic</em> dentro de la temática de este blog, pero creo que puede ser de interés para aquellos de vosotros que queráis <strong>publicar una web</strong> de manera sencilla, rápida y <strong>gratuita</strong>.</p>

<p><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>, la archifamosísima plataforma de alojamiento de proyectos de software bajo el sistema de control de versiones Git, ofrece un sistema de alojamiento y publicación de páginas web completamente gratuito llamado <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a>.</p>

<p>Existen decenas de tutoriales y guías en internet sobre cómo usar y configurar GitHub Pages. Mi aportación pretende ser un <strong>sencillo paso a paso</strong> para aquellos de vosotros que queráis ver publicada vuestra web en cuestión de minutos. Lo explicaré mediante <strong>un caso práctico</strong>.</p>

<p>Requisitos previos:</p>
<ul>
	<li>Disponer de una cuenta de <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a> (es gratis).</li>
	<li>Tener <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a> instalado en tu equipo (es gratis).</li>
	<li>Saber lo básico sobre el uso de Git. Tienes cientos de tutoriales en internet para aprender, pero si Git no forma parte habitual de tu flujo de trabajo quizá GitHub Pages no es la mejor alternativa para alojar tu web.</li>
	<li>Saber lo básico sobre edición HTML y CSS. Nuevamente, si no estás mínimamente habituado a trabajar con HTML y CSS, GitHub Pages tampoco es la mejor solución para tu caso.</li>
</ul>

<p>Supongamos que has escrito un libro titulado “<strong>Aprende usabilidad y experiencia de usuario</strong>”. Este libro lo tienes a la venta en la página web de la editorial que te lo ha publicado. Tú intención es desarrollar y publicar una <em>landing page</em> para promocionar su venta.</p>

<h2>Paso 1: crear un repositorio en GitHub</h2>

<p>Cuando en GitHub creas un repositorio con el mismo nombre que tu usuario de GitHub seguido de la expresión “.github.io” le estás diciendo a GitHub que lo que subas a ese repositorio lo publique como una web en la URL https://[nombreusuario].github.io</p>

<p>En nuestro ejemplo el nombre de usuario es “aprendeusabilidadyux”:</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-01.png" loading="lazy" alt="" width="739" height="736"></p>

<h2>Paso 2: clonar el repositorio de GitHub a nuestro equipo</h2>

<p>Para ellos ejecutaremos en el directorio local de nuestra elección el comando:</p>

<p><small><code style="word-break: break-all;">git clone https://[nombreusuario]@github.com/[nombreusuario]/[nombreusuario].github.io</code></small></p>

<p>Nos avisará de que el repositorio que hemos clonado está vacío, pero no pasa nada. Entraremos en el directorio que nos ha creado (en nuestro ejemplo “aprendeusabilidadyux.github.io”) y desarrollaremos nuestra <em>landing</em> dentro del mismo.</p>

<h2>Paso 3: desarrollar la landing (en este caso mediante una plantilla gratuita)</h2>

<p>Para no tener que empezar a desarrollar desde cero, localizas una buena plantilla HTML gratuita y lista para ser descargada. En este ejemplo nos quedaremos con la <a href="https://themes.3rdwavemedia.com/bootstrap-templates/product/devbook-free-bootstrap-4-book-ebook-landing-page-template-for-developers/" target="_blank" rel="noopener noreferrer">plantilla DevBook</a>, que puedes <a href="https://themes.3rdwavemedia.com/download/2862/" target="_blank" rel="noopener noreferrer">descargar en este enlace</a>.</p>

<p>Una vez descargada, descomprimiremos el contenido del ZIP en el directorio que alberga nuestro repositorio clonado de GitHub.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-02.png" loading="lazy" alt="" width="198" height="183"></p>

<p>GitHub Pages no sólo sirve para alojar páginas web estáticas desarrolladas mediante HTML y CSS. Resulta que incluye uno de los generadores de sitios webs estáticos más veteranos de internet llamado <a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll</a>.</p>

<p>Jekyll es ideal para desarrollar sitios web estáticos sencillos y sobre todo para <strong>publicar un blog</strong>. De hecho, mi blog, este en el que te encuentras ahora, está generado con Jekyll y GitHub Pages. Pero para no complicar este ejemplo, dejaremos el tema de cómo usar Jekyll para un futuro post.</p>

<h2>Paso 4: añadir un fichero .nojekyll a la landing</h2>

<p>Como no queremos complicar el ejemplo con Jekyll, le tenemos que decir a GitHub Pages que no procese nuestra página web mediante el motor de Jekyll. Para ello debemos añadir un fichero de texto plano vacío con el nombre “.nojekyll” a la raíz del proyecto.</p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-03.png" loading="lazy" alt="" width="201" height="198"></p>

<h2>Paso 5: subir a GitHub la web para probar que se publica correctamente</h2>

<p>Como la plantilla que hemos descargado ya tiene un contenido de ejemplo, antes incluso de personalizarla, vamos a subirla a GitHub y comprobar cómo se visualiza en forma de página web.</p>

<p>Para ello ejecutaremos los siguientes comandos de Git:</p>

<p><small><code>git branch -M main</code></small></p>

<p><small><code>git add --all</code></small></p>

<p><small><code>git commit -m "Commit inicial"</code></small></p>

<p><small><code>git push -u origin main</code></small></p>

<p>Y accederemos mediante el navegador a la URL correspondiente.</p>

<p>En nuestro caso a <span style="word-break: break-all;">https://aprendeusabilidadyux.github.io/</span></p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-04.png" loading="lazy" alt="" width="722" height="449"></p>

<p>Si todo ha funcionado correctamente estaremos viendo nuestra web. En caso contrario, conviene entrar a la raíz del repositorio en nuestra cuenta de GitHub y nos indicará si GitHub Pages ha encontrado algún error al tratar de publicar la web.</p>

<h2>Paso 6: ir personalizando el contenido y subiendo los cambios</h2>

<p>A partir de este punto lo que nos toca es ir personalizando el contenido de la plantilla a nuestra conveniencia. Cada vez que queramos ver cómo se refleja en internet un cambio que hayamos hecho en local, deberemos “commitearlo” y “pushearlo” al repositorio de GitHub con los siguientes comandos de Git:</p>

<p><small><code>git add --all</code></small></p>

<p><small><code>git commit -m "Contenidos reales de la web (primera parte)"</code></small></p>

<p><small><code>git push -u origin main</code></small></p>

<p>Y accediendo a la URL correspondiente visualizaremos los cambios.</p>

<p>En nuestro caso en <span style="word-break: break-all;">https://aprendeusabilidadyux.github.io/</span></p>

<p><img src="{{ site.baseurl }}/img/como-crear-pagina-web-gratis-github-pages-05.png" loading="lazy" alt="" width="722" height="438"></p>

<h2>Próximo paso: asignarle un dominio propio</h2>

<p>Una vez que hayamos personalizado completamente el contenido de nuestra página web, podemos querer contratar un <strong>nombre de dominio propio</strong> y asignárselo a nuestra web. De modo que en lugar de https://[nombreusuario].github.io podamos tener publicada la web en, por ejemplo, <strong>www.aprendeusabilidadyux.com</strong>.</p>
<p>GitHub Pages permite que podamos configurar un nombre de dominio propio que tengamos comprado. Te explico cómo se hace en la <a href="{{ site.baseurl }}{% post_url 2021-05-09-como-crear-pagina-web-gratis-github-pages-segunda-parte %}">segunda parte de este post</a>.</p>