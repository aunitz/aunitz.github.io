---
layout:     post
title:      "Qué son las Core Web Vitals"
subtitle:   "Métricas básicas de experiencia de usuario"
date:       2021-02-27 23:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-67.jpg"
tags:       [desarrollo de soluciones digitales, SEO]
---

<p>Google lleva mucho tiempo promoviendo <strong>buenas prácticas de usabilidad y experiencia de usuario </strong>en general. Para ello ha venido lanzando multitud de herramientas de medición (<a href="https://developers.google.com/web/tools/chrome-devtools" target="_blank" rel="noopener noreferrer">Chrome DevTools</a>, <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer">Lighthouse</a>, <a href="https://developers.google.com/speed/pagespeed/insights/?hl=es" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a>, <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener noreferrer">Google Search Console</a>, <a href="https://developers.google.com/web/tools/chrome-user-experience-report" target="_blank" rel="noopener noreferrer">Chrome User Experience Report</a>) así como iniciativas más generales como el <a href="https://amp.dev/" target="_blank" rel="noopener noreferrer">formato AMP</a> o los portales <a href="https://developers.google.com/web/fundamentals" target="_blank" rel="noopener noreferrer">Web Fundamentals</a> y <a href="https://web.dev/" target="_blank" rel="noopener noreferrer">web.dev</a>.</p>

<p>Debido precisamente a esta abundancia de herramientas y recursos y a que, algunos de ellos, están orientados a un público muy técnico, Google se ha decidido a lanzar una iniciativa que tiene por objetivo simplificar el panorama y ayudar a los responsables de los sitios web a centrarse en las métricas que más importan. A las que han bautizado como <strong>Core Web Vitals</strong> y <strong>son tres</strong>.</p>

<p>Cada una de las Core Web Vitals mide un determinado comportamiento crítico del sitio web que es vital para una óptima experiencia de usuario.</p>

<h2>LCP (Largest Contentful Paint): velocidad de carga</h2>

<p><img src="{{ site.baseurl }}/img/que-son-las-core-web-vitals-01.png" width="384" height="336" loading="lazy" alt=""></p>

<p>Mide el tiempo que tarda en cargarse el elemento de contenido más grande que esté ubicado en la parte de la página que se ve sin necesidad de hacer scroll hacia abajo. Para ser considerado bueno debe ser inferior a 2,5 segundos.</p>

<p>Se trata de una métrica centrada en la <strong>velocidad de carga de la página</strong>.</p>

<p>El elemento de contenido más grande ubicado en la zona visible de la página puede tratarse de una imagen, un titular, un bloque de texto, etc. Puede resultar confuso de identificar. Por eso en web.dev dedican un <a href="https://web.dev/lcp/" target="_blank" rel="noopener noreferrer">artículo que incluye ejemplos visuales</a>.</p>

<h2>FID (First Input Delay): velocidad de interacción</h2>

<p><img src="{{ site.baseurl }}/img/que-son-las-core-web-vitals-02.png" width="384" height="336" loading="lazy" alt=""></p>

<p>Es el tiempo que transcurre desde que el usuario realiza una primera acción sobre la página (puede ser un clic en un enlace, pulsar sobre un botón, etc.) y la página responde a dicha acción. Para ser considerado bueno debe ser inferior a 100 milisegundos.</p>

<p>Por tanto, es una métrica centrada en la <strong>capacidad que ofrece la página al usuario de interactuar con ella con rapidez</strong>.</p>

<p>Esta métrica es la única de las tres que está basada en mediciones sobre usuarios reales recogidas por herramientas de campo como son <a href="https://developers.google.com/web/tools/chrome-user-experience-report" target="_blank" rel="noopener noreferrer">Chrome User Experience Report</a>, <a href="https://developers.google.com/speed/pagespeed/insights/?hl=es" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a> y <a href="https://support.google.com/webmasters/answer/9205520" target="_blank" rel="noopener noreferrer">Google Search Console</a>. No es posible medirla con herramientas de laboratorio como <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer">Lighthouse</a>. Si bien, existe una métrica de laboratorio que se le asemeja: el <strong>TBT (Total Blocking Time)</strong>. No mide exactamente lo mismo, pero las recomendaciones que las herramientas de laboratorio (como por ejemplo <a href="https://developers.google.com/web/tools/chrome-devtools/" target="_blank" rel="noopener noreferrer">Chrome DevTools</a>, <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer">Lighthouse</a>, <a href="https://www.webpagetest.org/" target="_blank" rel="noopener noreferrer">WebPageTest</a>) aconsejan para mejorar esta métrica sirven también para mejorar el FID.</p>

<h2>CLS (Cumulative Layout Shift): estabilidad visual</h2>

<p><img src="{{ site.baseurl }}/img/que-son-las-core-web-vitals-03.png" width="384" height="336" loading="lazy" alt=""></p>

<p>Seguro que te habrá pasado en más de una ocasión que has tratado de interactuar con algún elemento de la página y justo en el momento que ibas a pulsarlo se ha movido de sitio debido a que la página no se había cargado del todo. Lo cual provoca clics en lugares incorrectos y una mala experiencia de usuario.</p>

<p>Esta métrica mide justamente la <strong>estabilidad visual de la página</strong>. No tiene que ver con el tiempo o la velocidad de carga de la página, si no que va sumando puntos cada vez que un elemento se mueve de sitio durante la carga de la página. De modo que, para ser considerada una buena puntuación, debe ser inferior a 0.1.</p>

<h2>Relevancia de estas métricas para el SEO</h2>
<p>Mucho se ha escrito sobre la importancia que puedan llegar a tener estas métricas para el SEO de un sitio web. Como siempre con Google, es algo que no sabemos con exactitud. Lo único que sabemos, por el momento, es que <a href="https://developers.google.com/search/blog/2020/11/timing-for-page-experience" target="_blank" rel="noopener noreferrer">Google ha anunciado</a> que estas tres métricas comenzarán a tenerse en cuenta en el SEO <strong>a partir de mayo de 2021</strong>.</p>

<p>Dentro de la política de Google de no basarse sólo en la calidad del contenido de las páginas y tener también en cuenta la experiencia de usuario a la hora de posicionar resultados en el buscador, las Core Web Vitals se combinarán con los indicadores de UX que ya se tiene en cuenta hoy en día, como la <strong>optimización para móviles</strong>, la <strong>navegación segura</strong>, el <strong>uso de HTTPS</strong> y el <strong>uso de anuncios intersticiales intrusivos</strong>.</p>

<h2>Las Core Web Vitals cambiarán en el futuro</h2>
<p>En el apartado de web.dev en el que <a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer">explican las Core Web Vitals</a>, ya especifican que las métricas que las componen <strong>evolucionarán con el tiempo</strong>. Las tres métricas actuales se centran en lo que consideraron más relevante para el <strong>año 2020</strong>.</p>