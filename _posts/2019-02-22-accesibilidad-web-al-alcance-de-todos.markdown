---
layout:     post
title:      "Accesibilidad web al alcance de todos"
subtitle:   "Con estas pautas básicas incrementarás considerablemente la accesibilidad de tu web"
date:       2019-02-22 12:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-36.jpg"
tags:       [buenas prácticas de accesibilidad]
---

<h2>Qué es la accesibilidad web</h2>

<p>La accesibilidad consiste en el <strong>acceso a la información sin limitación alguna por razón de discapacidad u otro tipo de deficiencia</strong>. Son muchas las personas que acceden a la información de nuestras páginas desde contextos muy diferentes ya que…</p>

<ul>
    <li>Pueden tener problemas de oído, visión, movilidad.</li>
    <li>Pueden tener dificultades de lectura o comprensión.</li>
    <li>Quizás no pueden utilizar el teclado o el ratón.</li>
    <li>Pueden tener una pantalla pequeña o una conexión lenta.</li>
    <li>...</li>
</ul>

<p><strong>La accesibilidad no es de interés únicamente para las personas con discapacidad</strong>, sino que <strong>mejora el acceso a la web en general</strong>. Por ello, aunque suele recibir un tratamiento específico, prefiero considerar la accesibilidad como <strong>una parte de la experiencia de usuario</strong>.</p>

<h2>Las reglas internacionales de accesibilidad</h2>

<p>La <a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer">WAI</a> (Web Accessibility Initiative) es el grupo de trabajo específico de la <a href="https://www.w3.org/" target="_blank" rel="noopener noreferrer">W3C</a> para los temas de accesibilidad. Establece a nivel internacional un conjunto de pautas o reglas básicas de accesibilidad que deben cumplir los sitios web para resultar accesibles.</p>

<p>Existen tres niveles de accesibilidad establecidos por la WAI: nivel A (el mínimo), nivel AA y nivel AAA (el máximo).</p>

<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-01.png" loading="lazy" alt="" width="699" height="80"></p>

<p>Muchos diseñadores y desarrolladores web que se interesan por las reglas de la WAI pueden verse apabullados por su gran número y su profusa documentación.</p>

<p>Formarse exhaustivamente en accesibilidad web es un camino largo e intenso al que hay que dedicarle tiempo y esfuerzo.</p>

<p>Sin embargo, <strong>sin tener que ser un experto en accesibilidad podemos aplicar unas sencillas reglas</strong> que mejorarán considerablemente la accesibilidad de nuestras webs.</p>

<h2>Reglas básicas de accesibilidad</h2>

<p>Inspirándome en el <a href="https://moritzgiessmann.de/accessibility-cheatsheet/" target="_blank" rel="noopener noreferrer">Accessibility Cheatsheet de Moritz Gießmann</a> (que recomiendo tener siempre a mano), lo que pretendo en este artículo es proporcionar una <strong>pautas de accesibilidad muy básicas</strong>. No encaminadas a conseguir un nivel de accesibilidad estándar determinado (A, AA o AAA) sino orientadas a conseguir un mínimo de accesibilidad elemental que facilite el acceso a los usuarios de tus webs y aplicaciones.</p>

<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-02.jpg" loading="lazy" alt="" width="722" height="363"></p>

<p>A nivel general, las barreras de accesibilidad principales que nos podemos encontrar en los usuarios son las siguientes:</p>

<ul>
    <li>Sordera</li>
    <li>Sordoceguera</li>
    <li>Movilidad (entendida como la imposibilidad de utilizar el ratón y/o el teclado)</li>
    <li>Cognitiva</li>
    <li>Visión reducida</li>
    <li>Daltonismo</li>
</ul>

<p>Teniendo en mente estas barreras, a continuación enumero nueve pautas que ayudarán a superarlas.</p>

<h3>1. Utiliza HTML semántico</h3>
<p>El uso semántico de las etiquetas HTML ayuda a los lectores de pantalla<sup id="fnref:fn-f1"><a href="#fn:fn-f1" class="footnote">1</a></sup> a interpretar correctamente la estructura y contenidos de la página.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-03.png" loading="lazy" alt="" width="521" height="430"></p>
<p>Define el atributo <code>lang</code> del elemento <code>&lt;html&gt;</code>, utiliza una estructura jerárquica de encabezados, listas para lo que son listas, utiliza etiquetas <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code>, etc.</p>

<h3>2. Proporciona texto alternativo para las imágenes</h3>
<p>Todo contenido que no sea texto resulta invisible para los lectores de pantalla. Proporciona un texto alternativo significativo (por ejemplo, mediante el atributo <code>alt</code>) para aquellos elementos no textuales (imágenes, gráficos, CAPTCHAs, etc.) de la página.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-04.gif" loading="lazy" alt="" width="392" height="33"></p>

<h3>3. Añade labels a los elementos de formulario</h3>
<p>Los elementos de formulario deben llevar una etiqueta <code>&lt;label&gt;</code> correctamente relacionada que los nombre adecuadamente para que resulten identificables por los lectores de pantalla.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-05.gif" loading="lazy" alt="" width="294" height="38"></p>
<p>El atributo <code>placeholder</code> no es una alternativa válida.</p>

<h3>4. Muestra dónde está el foco</h3>
<p>Los usuarios que navegan con el teclado necesitan tener resaltado el elemento que tiene el foco (<code>:focus</code>). Además de que todos los elementos interactivos deben poder coger el foco y poderse recorrer con el teclado en un orden lógico.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-06.gif" loading="lazy" alt="" width="627" height="157"></p>
<p>Por ejemplo, un element <code>&lt;button&gt;</code> puede coger el foco, pero un elemento <code>&lt;span&gt;</code> no.</p>

<h3>5. El color del texto debe contrastar con el color de fondo</h3>
<p>Se estima que los usuarios con visión reducida son casi tres veces más numerosos que los usuarios con ceguera total. Por ello, el color de texto debe contrastar lo suficiente con el color del fondo para que resulte fácilmente legible.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-07.png" loading="lazy" alt="" width="478" height="376"></p>
<p>El nivel de contraste debe ser de al menos 4.5:1 para textos pequeños o de 3:1 para textos grandes (de más de 14px en negrita o de más de 18px si no llevan negrita).</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-08.png" loading="lazy" alt="" width="478" height="377"></p>
<p>Existen varias herramientas para medir el nivel de contraste. Por ejemplo <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">Color Contrast Checker</a>.</p>

<h3>6. No transmitas información solo mediante el color</h3>
<p>Los usuarios con visión reducida o daltonismo pueden tener serias dificultades para distinguir los colores. Por ello no se debe transmitir ninguna información solo mediante el color. Debe ir apoyada por información gráfica o textual que permita interpretarla correctamente en caso de ausencia de color.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-09.png" loading="lazy" alt="" width="496" height="157"></p>
<p>Una manera sencilla de comprobar esta pauta es imprimir (puede ser en formato PDF) la página en blanco y negro y verificar que todo el contenido se entiende correctamente. Una alternativa más precisa es utilizar una aplicación como <a href="http://colororacle.org/" target="_blank" rel="noopener noreferrer">Color Oracle</a>, que muestra en tiempo real lo que ven las personas con discapacidades comunes de la visión del color.  </p>

<h3>7. Escribe enlaces descriptivos</h3>
<p>Los lectores de pantalla disponen de atajos de teclado que permiten a los usuarios navegar de manera secuencial por los enlaces de un sitio web. Por tanto, deben tener significado por si mismos y no depender del contexto que les rodea.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-10.png" loading="lazy" alt="" width="187" height="67"></p>

<h3>8. Los enlaces deben distinguirse del texto circundante</h3>
<p>Garantiza que los usuarios que no pueden distinguir fácilmente entre colores puedan saber cuándo el texto es un enlace. Para ello se necesita que los vínculos cuenten con algún elemento decorativo que los diferencie (como el clásico subrayado) o, si se distinguen únicamente mediante el color, se precisa una relación de contraste de color de al menos 3:1 para distinguir el color del texto del enlace del color del texto circundante.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-11.png" loading="lazy" alt="" width="558" height="67"></p>

<h3>9. No se debe desactivar la posibilidad de hacer zoom</h3>
<p>La página no debe incluir el parámetro <code>user-scalable=no</code> en la etiqueta <code>&lt;meta name="viewport"&gt;</code>, ya que desactiva la posibilidad de que el usuario pueda hacer zoom. Una funcionalidad esencial para los usuarios con visión reducida.</p>
<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-12.jpg" loading="lazy" alt="" width="722" height="363"></p>
<p>Además, esta misma etiqueta <code>&lt;meta name="viewport"&gt;</code>, no debe incluir el parámetro <code>maximum-scale</code>. El cual limita la escala máxima del nivel de zoom. En caso de que se incluya el parámetro, no debería estar establecido a un valor inferior a 5.</p>

<h2>Reglas no tan básicas de accesibilidad</h2>

<p>Hasta aquí hemos revisado algunas reglas básicas que son realmente muy sencillas de implementar. De esas que casi cuesta tanto tenerlas en cuenta como ignorarlas. Las dos siguientes requieren por el contrario bastante más esfuerzo de implementación. Si bien su beneficio para algunos usuarios es enorme.</p>

<h3>1. Proporciona subtítulos de vídeo y audio</h3>
<p>Debes tener presente que, para los usuarios con sordera, sordoceguera o visión reducida, es la única manera de poder acceder a los contenidos de audio y vídeo.</p>
<p>Existen programas automáticos de reconocimiento de voz que pueden facilitar la labor de generar los subtítulos.</p>

<h3>2. Utiliza etiquetas ARIA para añadir semántica al HTML</h3>
<p>La <a href="https://www.w3.org/TR/wai-aria/" target="_blank" rel="noopener noreferrer">especificación ARIA</a> ha sido elaborada por la WAI para cubrir las carencias semánticas que tiene el HTML. Por ejemplo, en HTML no existe una etiqueta para definir semánticamente algo tan habitual como un menú emergente.</p>
<p>Mediante los atributos ARIA se pueden definir estos significados semánticos para los elementos del DOM de nuestra página web. De modo que resulten accesibles para los dispositivos de asistencia de los usuarios con discapacidad.</p>

<h2>Proporcionar un canal para el feedback</h2>

<p>Independientemente de todas las medidas técnicas que se adopten, <strong>es vital facilitar a los usuarios un canal </strong>mediante el cual puedan facilitarnos feedback sobre posibles problemas de accesibilidad y otro tipo de sugerencias sobre la usabilidad de las aplicaciones.</p>

<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-13.png" loading="lazy" alt="" width="345" height="69"></p>

<h2>Cómo comprobar la accesibilidad</h2>

<p>Existen multitud de herramientas y técnicas para la auditoría de accesibilidad. Algunas muy complejas. Pero manteniendo la filosofía de este artículo de que la accesibilidad puede implementarse, en gran parte, de manera sencilla, recomendaré algunas técnicas básicas.</p>

<ul>
    <li><strong>Haz zoom al 200%. </strong>Utiliza el zoom de tu navegador. ¿Todo el texto sigue estando visible?</li>
    <li><strong>Navega mediante el teclado.</strong> Comprueba que puedes acceder a todos los rincones de tu web utilizando solo las teclas de tu teclado: ←↑↓→ TAB, SHIFT+TAB, ESC y ENTER.</li>
    <li><strong>Apaga el monitor y navega con un lector de pantalla.</strong> Por ejemplo, <a href="https://help.apple.com/voiceover/info/guide/" target="_blank" rel="noopener noreferrer">Voiceover</a> para Mac o <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">NVDA</a> para Windows.</li>
    <li><strong>Ejecuta la auditoria de accesibilidad de Google Chrome.</strong> Está en la pestaña “Audits” de las DevTools (accede pulsando F12).</li>
    <li><strong>Navega con CSS desactivado.</strong> Y comprueba si la estructura de tu página tiene sentido.</li>
</ul>

<h2>Bola extra: Google es un usuario discapacitado</h2>

<p>Uno de los “usuarios” a los que beneficia enormemente la accesibilidad es la araña del buscador de <strong>Google</strong>.</p>

<p><img src="{{ site.baseurl }}/img/accesibilidad-web-al-alcance-de-todos-14.jpg" loading="lazy" alt="" width="722" height="363"></p>

<p><strong>Su robot de indexación es completamente sordo, ciego y no puede usar el ratón para navegar</strong>. Por lo que implementar las pautas de accesibilidad antes comentadas te reportará <strong>considerables beneficios SEO</strong> (Search Engine Optimization).</p>

<hr>

<div class="footnotes">
  <ol>
    <li id="fn:fn-f1">
      <p>Los lectores de pantalla (screen readers en inglés) son un software que permite la utilización del sistema operativo y las distintas aplicaciones mediante el empleo de un sintetizador de voz que "lee y explica" lo que se visualiza en la pantalla, lo que supone una ayuda para las personas con graves problemas de visión o completamente ciegas.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
    </li>
  </ol>
</div>
