---
layout:        post
title:         "Resultados del Front-End Tooling Survey 2019"
subtitle:      "Resumen de los resultados de la encuesta"
date:          2019-11-17 21:00:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-46.jpg"
tags:          [desarrollo de soluciones digitales]
---

<p>Desde hace algunos años, el ingeniero de UI <a href="https://ashleynolan.co.uk/" target="_blank" rel="noopener noreferrer">Ashley Watson-Nolan</a>, con el apoyo económico de su amigo el diseñador y desarrollador web <a href="https://wesbos.com/" target="_blank" rel="noopener noreferrer">Wes Bos</a>, elabora una <a href="https://ashleynolan.co.uk/blog/frontend-tooling-survey-2019-results" target="_blank" rel="noopener noreferrer">interesante encuesta</a> sobre las <strong>herramientas que utilizan los desarrolladores front-end</strong>.</p>

<p>La encuesta tiene relativa relevancia porque el número de desarrolladores que la responden es de varios miles. En el año 2019 han participado 3.005 desarrolladores. Además, un 60% de los participantes tienen más de 5 años de experiencia en desarrollo front-end.</p>

<p>La encuesta incluye un total de 27 preguntas sobre diferentes temas relacionados con el desarrollo front-end. No las mencionaré todas, si no que extractaré lo que me parece más relevante de cada grupo de respuestas.</p>

<h2>CSS</h2>

<h3>Preprocesadores</h3>

<p><strong>Sass</strong> sigue siendo el dominador absoluto. Con un 77% de uso regular.</p>

<h3>Frameworks</h3>

<p>Resulta interesante observar que el ganador de esta categoría es la ausencia de framework. El <strong>35% no utilizan frameworks</strong> habitualmente.</p>

<p>Entre los que sí lo utilizan, <strong>Bootstrap</strong> es el único con un porcentaje relevante, del 28% de uso. Además del significativo 17% que usan un framework personalizado.</p>

<h3>Naming Schemes</h3>

<p>El 52% utilizan algún sistema de nomenclatura. Mayoritariamente <strong>BEM</strong> (un 46%).</p>

<h3>Linting</h3>

<p>La mayoría, el 53%, los usa. Mayoritariamente <strong>Stylelint</strong> (un 27%).</p>

<h3>Uso de características avanzadas</h3>

<p>El 80% utiliza <strong>Flexbox</strong>. El 29% <strong>CSS Grid</strong>. Las <strong>Custom Properties</strong> son usadas por un 28%.</p>

<h2>JavaScript</h2>

<h3>Task Runners</h3>

<p>La más utilizada es <strong>NPM Scripts</strong>, con un 64%. Seguido a mucha distancia de Gulp, con un 19%.</p>

<h3>Librerías o frameworks</h3>

<p><strong>React</strong> encabeza la lista con mucha ventaja sobre las demás, con un 52%. El resto que tienen porcentajes superiores al 10% son: jQuery (37%), Lodash (33%), Vue.js (27%) y Angular v2+ (16%).</p>

<h3>Module Bundlers</h3>

<p>El 73% utiliza <strong>Webpack</strong>.</p>

<h3>Transpilers</h3>

<p>El <strong>82%</strong> los utiliza. No se especifica cuáles, pero entiendo que Babel será el mayoritario.</p>

<h3>Linting</h3>

<p>La gran mayoría, el 76%, usa <strong>ESLint</strong>.</p>

<h3>Package Managers</h3>

<p><strong>NPM</strong> es el líder absoluto con un 65%. Le sigue Yarn con un 30%.</p>

<h2>Testing</h2>

<h3>Testing de JavaScript</h3>

<p>El 64% hace testing. Siendo la herramienta más usada <strong>Jest</strong>, con un 45%.</p>

<h3>Testing del rendimiento</h3>

<p>El 68% testea el rendimiento con alguna herramienta. <strong>Lighthouse</strong> es la mayoritaria, con un 52%.</p>
<p>Resulta curioso que a pesar de lo que Google ha promocionado la tecnología AMP (Accelerated Mobile Pages), sólo el 6% de los desarrolladores la utiliza. Parece que se ha convertido en una tecnología de nicho.</p>

<h3>Testing de accesibilidad</h3>

<p>La accesibilidad parece ser <strong>la gran olvidada</strong> por los desarrolladores front-end. El 63% no utiliza ninguna herramienta para testearla.</p>

<p>Existen excelentes herramientas gratuitas para ello, muy fáciles de utilizar. Como son <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">Wave</a> y <a href="https://www.deque.com/axe/axe-for-web/" target="_blank" rel="noopener noreferrer">Axe</a>. Pero su uso es completamente marginal.</p>

<p>Si es por desconocimiento que no aplicas buenas prácticas de accesibilidad, debes saber que sin tener que ser un experto en accesibilidad podemos aplicar unas <a href="https://www.aunitz.net/accesibilidad-web-al-alcance-de-todos/">sencillas reglas que mejorarán considerablemente la accesibilidad de nuestras webs</a>.</p>

<h2>Resumen final</h2>

<p>A modo de resumen visual representaré los logotipos de las herramientas mayoritarias de cada área.</p>

<p><img src="{{ site.baseurl }}/img/resultados-front-end-tooling-survey-2019-01.png" loading="lazy" alt="CSS tools" width="722" height="263"></p>

<p><img src="{{ site.baseurl }}/img/resultados-front-end-tooling-survey-2019-02.png" loading="lazy" alt="JavaScript tools" width="722" height="263"></p>

<p><img src="{{ site.baseurl }}/img/resultados-front-end-tooling-survey-2019-03.png" loading="lazy" alt="Testing tools" width="722" height="263"></p>
