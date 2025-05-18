---
layout:        post
title:         "Objeciones al CSS-in-JS"
subtitle:      "Mantengámonos fieles al estándar CSS"
date:          2019-11-11 21:00:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-43.jpg"
tags:          [sistemas de diseño, desarrollo de soluciones digitales]
---

<p>Ya he escrito <a href="{{ site.baseurl }}{% post_url 2017-09-15-memorando-libro-atomic-design-brad-frost %}">en otras ocasiones</a> sobre Brad Frost. El padre del <a href="https://bradfrost.com/blog/post/atomic-web-design/" target="_blank" rel="noopener noreferrer">Atomic Design</a>. Una metodología de referencia para la creación de <strong>sistemas de diseño</strong>.</p>

<p>En esta ocasión me hago eco de <a href="https://bradfrost.com/blog/link/whats-wrong-with-css-in-js/" target="_blank" rel="noopener noreferrer">su escepticismo</a> sobre una tecnología muy en boga en el desarrollo front-end: el <strong>CSS-in-JS</strong>. Un modelo en el que el CSS se compone usando JavaScript en lugar de estar definido en archivos externos.</p>

<p><img src="{{ site.baseurl }}/img/objeciones-al-css-in-js.png" loading="lazy" alt="Objeciones al CSS-in-JS" width="722" height="425"></p>

<p>Coincido con Brad en los tres inconvenientes que observa en las implementaciones de CSS-in-JS. Los he encontrado en proyectos en los que he participado como mánager o consultor; además de alguno más.</p>
<ul>
    <li><strong>Falta de portabilidad.</strong> Un sistema de diseño potente y complejo debería ser portable a cualquier tecnología de front-end. Los CSS-in-JS sólo funcionan con tecnologías muy concretas basadas en JavaScript y no pueden ser exportados a proyectos basados en otras tecnologías como pueden ser CMS como WordPress o Liferay.</li>
    <li><strong>Mezcla de contextos.</strong> No me parece adecuado mezclar en un mismo fichero la funcionalidad y su presentación. Resulta un archivo abarrotado y que mezcla especialidades que suelen dominar diferentes perfiles de desarrollador. Un especialista en CSS es raro que domine JavaScript y viceversa. Incluso en el caso de que se trate de un profesional que se desenvuelve en ambos campos con soltura, estará acoplando en un mismo lugar competencias diferentes. <br />En este punto cabe decir que hay frameworks como Vue.js que resuelven esta mezcla con más elegancia que otros. Creando espacios reservados para el marcado, el estilo y la funcionalidad.</li>
    <li><strong>Tendencia a las malas prácticas CSS.</strong> Quizá sea por esa mezcla de contextos que comentaba en el punto anterior, quizá por falta de especialización y conocimiento profundo de la tecnología CSS, pero lo cierto es que es habitual encontrarse con abundancia de malas prácticas CSS en los proyectos que utilizan CSS-in-JS.</li>
    <li><strong>Falta de fidelidad al estándar. </strong>El <a href="https://www.w3.org/Style/CSS/" target="_blank" rel="noopener noreferrer">estándar de CSS</a> que define la W3C recomienda la <a href="https://www.w3.org/wiki/The_web_standards_model_-_HTML_CSS_and_JavaScript" target="_blank" rel="noopener noreferrer">separación del HTML, el CSS y el JS</a>. Y el uso de <a href="https://www.w3.org/Style/Examples/011/firstcss.en.html#external" target="_blank" rel="noopener noreferrer">hojas de estilo externas para los CSS</a>. Las ventajas son múltiples: eficiencia del código, facilidad de mantenimiento, accesibilidad, compatibilidad con los diferentes dispositivos, compatibilidad con los buscadores.</li>
</ul>

<p>Entrando en un plano más de detalle técnico, resulta muy interesante el <a href="https://soundcloud.com/vanillajspodcast/whats-wrong-with-css-in-js" target="_blank" rel="noopener noreferrer">podcast de Chris Ferdinandi</a> en el que cuestiona las <a href="https://speakerdeck.com/vjeux/react-css-in-js" target="_blank" rel="noopener noreferrer">objeciones que Christopher Chedeu</a> le hace al uso de CSS estándar en proyectos de gran escala. En este sentido, Chris Ferdinandi opina que muchos desarrolladores JavaScript juzgan el CSS por las mismas reglas que el JavaScript. Algo que, sencillamente, no es correcto. Ya que se trata de lenguajes completamente diferentes y que sirven a propósitos muy distintos.</p>

<p>Un caso típico es la crítica que algunos desarrolladores JavaScript hacen al alcance global por defecto de las reglas de CSS. Comparándolo directamente con la clásica buena práctica de JavaScript de no utilizar variables globales. Sin embargo, el CSS no es un lenguaje de programación y no puede evaluarse de la misma manera que se hace con el JavaScript. El alcance global de las reglas y la cascada no son errores del CSS, son características intrínsecas de este lenguaje. Características que permiten escribir menos código y crear archivos que son mucho más pequeños y de mayor rendimiento, si se sabe cómo aprovecharlas.</p>