---
layout:     post
title:      "Memorando sobre el libro Atomic Design de Brad Frost"
subtitle:   "Notas que quiero recordar sobre lo leído en el libro"
date:       2017-09-15 18:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-08.jpg"
tags:       [sistemas de diseño, memorandos]
---

<p>El libro <strong>Atomic Design</strong> de <strong>Brad Frost</strong> fue publicado en su primera edición en 2013. Desde entonces, se ha convertido en un libro de referencia para la creación de <strong>sistemas de diseño</strong>.</p>

<p><img src="{{ site.baseurl }}/img/atomic-design-01-ebook.jpg" loading="lazy" alt="Fotografía de una página interior del libro Atomic Design de Brad Frost" width="720" height="540"></p>

<p>Este post no pretender resumir el contenido del libro. Hay otros que lo han hecho muy bien. Por ejemplo, el mismo <a href="http://bradfrost.com/blog/post/atomic-web-design/" target="_blank" rel="noopener noreferrer">Brad Frost en su blog</a>.
</p>

<p>Lo que pretendo en este artículo es pasar a limpio las principales enseñanzas o reflexiones que a mí me ha aportado la lectura del libro. A modo de recordatorio para el futuro. En consecuencia, se trata de un escrito completamente subjetivo y basado en mi <i>know how</i> previo.</p>

<p>Lo primero que quiero decir, es que me parece un libro de <strong>lectura muy recomendable</strong> para todos aquellos que estéis interesados en desarrollar sistemas de diseño, interfaces de usuario, guías de estilo,  patrones de diseño, etc. </p>

<p>El autor ha sido muy generoso con la comunidad y <a href="http://atomicdesign.bradfrost.com/" target="_blank" rel="noopener noreferrer">el libro se puede leer completo online</a>. Además de comprarlo en formato papel y/o ebook.</p>

<p>Además, está escrito de manera que su lectura resulta muy amena y es relativamente breve. En su versión en papel tiene unas 190 páginas.</p>

<h2>Evaluar funcionalidades y componentes, no páginas</h2>

<p>El trabajo que supone desarrollar un proyecto se determina mucho mejor mediante sus funcionalidades y componentes que por el número de
páginas que contiene.</p>

<p>El concepto “página” es una metáfora útil y familiar que nos ayuda a comunicarnos, pero no resulta relevante a la hora de computar esfuerzo de desarrollo.</p>

<h2>Modulariza el contenido</h2>

<p>Prepara el contenido como si fuera a estar en cualquier sitio porque podrá estar en cualquier sitio.</p>

<p>Para ayudarte a modularizar la arquitectura de tu CSS existen metodologías como <a href="http://oocss.org/" target="_blank" rel="noopener noreferrer">OOCSS</a>, <a href="https://smacss.com/" target="_blank" rel="noopener noreferrer">SMACSS</a> y <a href="https://en.bem.info/" target="_blank" rel="noopener noreferrer">BEM</a>.</p>

<p>Las primeras aproximaciones visuales al diseño de un interfaz deben ser de porciones pequeñas del mismo. No de páginas completas que proporcionen un diseño con falsa apariencia de diseño final.</p>

<h2>Bootstrap sí o no</h2>

<p>Los tan populares <i>frameworks</i> de UI como <a href="http://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a> o <a href="http://foundation.zurb.com/" target="_blank" rel="noopener noreferrer">Foundation</a> resultan útiles para el desarrollo rápido de interfaces. </p>

<p>Proporcionan una colección de componentes bien comprobados y consistentes. Pero, como todo, le ve algunos serios inconvenientes:</p>

<ul>
     <li>Uniformidad en el diseño. Todas las webs desarrolladas con estos <i>frameworks</i> “son iguales”.</li>
     <li>Cargas el proyecto con código que no vas a usar.</li>
     <li>Te impone un <i>naming</i>.</li>
</ul>

<p>Estoy de acuerdo en el tema del <i>naming</i>, pero no del todo en los dos primeros. </p>

<p>La uniformidad en el diseño se puede evitar si se personaliza suficientemente el <i>framework</i>. Aunque lógicamente esto supone un importante trabajo de diseño y codificación. </p>

<p>La carga de código que no vas a usar también se puede evitar (o paliar al menos) configurando correctamente el <i>framework</i> y compilando sólo el CSS y el JavaScript que realmente necesitamos en nuestro proyecto.</p>

<h2>Guía de estilo, la base del sistema de diseño</h2>

<p>La guía de estilo (style guide) es la base de un buen sistema de diseño (design system). Documenta y organiza los componentes y proporciona instrucciones sobre su uso.</p>

<p>Las guías de estilo reciben varios nombres alternativos: pattern libraries, UI libraries, component libraries.</p>

<p>Las guías de estilo son herramientas que ayudan a prevenir el caos.</p>

<h2>Qué es una guía de estilo</h2>

<p>Una guía de estilo es una colección de componentes y reglas que el equipo de desarrollo debe seguir para asegurarse de que las partes separadas de una aplicación sean consistentes y proporcionen una experiencia coherente al usuario.</p>

<p>Una buena guía de estilo cuenta, al menos, con las siguientes funcionalidades:</p>

<ul>
    <li>Proporciona descripciones de los componentes que incluye.</li>
    <li>Facilita el código HTML, CSS y JavaScript de cada componente.</li>
    <li>Permite visualizar los componentes a distintas resoluciones de monitor.</li>
    <li>Proporciona mecanismos para visualizar las distintas variantes de un componente.</li>
    <li>Proporciona contenidos reales de ejemplo para las distintas plantillas.</li>
    <li>Proporciona información contextual sobre el uso adecuado de los componentes.</li>
</ul>

<h2>Principales beneficios de disponer de una guía de estilo</h2>

<ul>
    <li>Promueve la consistencia y cohesión de todos los interfaces y aplicaciones.</li>
    <li>Incrementa la productividad de los desarrolladores. Ahorrando tiempo y dinero.</li>
    <li>Facilita un flujo de trabajo colaborativo entre las distintas disciplinas implicadas en los proyectos de desarrollo (jefes de proyecto, diseñadores, desarrolladores front-end, desarrolladores back-end, etc.)</li>
    <li>Establece un vocabulario común para todas las partes implicadas en el desarrollo. Incluyendo proveedores externos.</li>
    <li>Proporciona documentación útil para ayudar a formar a todas las partes implicadas en el desarrollo. Incluyendo proveedores externos.</li>
    <li>Facilita el testeo en distintos navegadores y dispositivos.</li>
    <li>Constituye una base sólida que se puede extender y mejorar con el tiempo.</li>
</ul>

<h2>A las guías de estilo hay que dedicarles tiempo</h2>

<p>El desarrollo de una guía de estilo requiere de una importante dedicación en tiempo y recursos.</p>

<p>Si bien, una vez que se ha desarrollado, incrementa la velocidad y productividad de los desarrolladores.</p>

<h2>Las guías de estilo no deben ser tratadas como un proyecto auxiliar</h2>

<p>Son la base de un sistema de diseño y el sistema de diseño debe considerarse la base de todo proyecto de desarrollo de interfaces.</p>

<h2>Las guías de estilo tienen que resultar un recurso útil para cualquier miembro de la organización</h2>

<p>Deben ser atractivas, visibles, claras y fáciles de usar.</p>

<p>Deben proporcionar información sobre <strong>cuándo</strong>, <strong>cómo</strong> y <strong>dónde</strong> usar cada componente.</p>

<p>Un ejemplo de guía de estilo que proporciona información muy completa sobre cómo, cuándo y dónde utilizar cada componente es <a href="https://material.io/guidelines/" target="_blank" rel="noopener noreferrer">Material design</a>.</p>

<h2>Una estrategia de mantenimiento y actualización es crítica para la supervivencia de una guía de estilo</h2>

<p>No hay que considerar un sistema de diseño como un proyecto con un alcance limitado. Debe ser considerado como parte del producto. Y como tal. crecer y evolucionar de manera ilimitada.</p>

<p>En el momento en el que una guía de estilo deja de reflejar la realidad del producto, está obsoleta. Para evitarlo hay que disponer de un <i>workflow</i> que actualice la guía de estilo antes que los interfaces de usuario finales.</p>

<p>Para desarrollar una guía de estilo sostenible en el tiempo, aconseja:</p>

<ul>
    <li><strong>Hacerla oficial</strong>. Asignando tiempo, dinero y recursos al sistema de diseño.</li>
    <li><strong>Hacerla adaptable</strong>. Estableciendo una estrategia de actualización clara.</li>
    <li><strong>Hacerla fácil de mantener</strong>. Técnicamente fácil de mantener y con un sistema para comunicar los cambios a todas las partes implicadas.</li>
    <li><strong>Hacerla interdisciplinar</strong>. Toda la organización participa de su desarrollo y evolución.</li>
    <li><strong>Hacerla atractiva</strong>. Clara y fácil de usar.</li>
    <li><strong>Hacerla visible</strong>. Dentro de la organización. Evangelizarla.</li>
    <li><strong>Hacerla más grande</strong>. Incluyendo, poco a poco, otras guías que no se refieran sólo a la parte visual: guías sobre cómo redactar los textos, cómo escribir el código, cómo tratar con el cliente, etc.</li>
    <li><strong>Hacerla agnóstica</strong>. Nombrando a los patrones de acuerdo a su estructura y no a su contexto o contenido.</li>
    <li><strong>Hacerla contextual</strong>. Proporcionando información sobre cuándo, cómo y dónde usar cada componente.</li>
    <li><strong>Tenerla actualizada</strong>. En el momento en el que una guía de estilo deja de reflejar la realidad del producto, está obsoleta.</li>
</ul>

<h2>Atomic Design no es un proceso lineal</h2>

<p>Aunque la metáfora de los átomos, las moléculas, los organismos, etc. pueda dar a entender que se trata de un proceso de construcción lineal, es crucial entender que no es así.</p>

<p>No tendría sentido diseñar botones y otros elementos de forma aislada y luego cruzar los dedos para que se cohesionen correctamente con el resto de elementos del interfaz.</p>

<p>Debemos pensar que Atomic Design es un modelo que nos permite crear <strong>al mismo tiempo</strong> los interfaces finales y sus componentes subyacentes.</p>

<h2>El contenido condiciona el sistema de diseño</h2>

<p>Más que condicionarlo, incluso podríamos decir que lo define. </p>

<p>El contenido real que vayan a albergar los distintos componentes del interfaz condiciona las características del propio componente.</p>

<h2>La metáfora química no es lo relevante</h2>

<p>La metáfora, basada en la química básica (átomos, moléculas, organismos), ayuda a entender que la construcción de los componentes de un sistema de diseño implica jerarquía.</p>

<p>Pero si esta metáfora no funciona en tú organización, el autor no ve problema en que la cambies. <a href="http://atomicdesign.bradfrost.com/chapter-2/#whats-in-a-name" target="_blank" rel="noopener noreferrer">Atomic Design no es un dogma rígido</a>.</p>

<h2>Pattern Lab, una herramienta muy útil</h2>

<p>Con la colaboración de varios colegas, Brad Frost ha desarrollado una herramienta que facilita construir una guía de estilo respetando los principios del Atomic Design. La han llamado <a href="http://patternlab.io/" target="_blank" rel="noopener noreferrer">Pattern Lab</a> y es open source.</p>

<p>En su estructura, Pattern Lab utiliza la metáfora de la química, pero fácilmente se puede utilizar otra estructura o metáfora. De hecho, <a href="http://atomicdesign.bradfrost.com/chapter-3/#building-atomic-design-systems-with-pattern-lab" target="_blank" rel="noopener noreferrer">en el libro se invita</a> a establecer el <i>naming</i> y la categorización que resulte más efectiva para nuestro proyecto.</p>

<h2>Pattern Lab para el testeo de casos extremos</h2>

<p>Una de las funcionalidades que, a mi juicio, resulta más interesante de esta herramienta son las <i>pattern variations</i>. Las cuales permiten testar variantes de un mismo componente con contenidos de distintas características.</p>

<p>Por ejemplo, ¿qué ocurre si el usuario añade 87 productos al carrito de la compra?, ¿qué ocurre si el título del post es de 400 caracteres?, etc.</p>

<h2>Pattern Lab para el testeo de distintas resoluciones</h2>

<p>Los desarrolladores front-end están acostumbrados a utilizar herramientas que permiten probar con facilidad distintas resoluciones de pantalla. Sin embargo, otros <i>stakeholders</i> del proyecto puede que no. Pattern Lab incorpora una herramienta para el cambio de resoluciones que puede resultar muy útil para hacer entender a ciertos <i>stakeholders</i> las propiedades <i>responsive</i> de un sistema de diseño.</p>

<p><img src="{{ site.baseurl }}/img/atomic-design-02-pattern-lab-capture.png" loading="lazy" alt="Captura de pantalla del redimensionador de Pattern Lab" width="266" height="29"></p>

<h2>El “secreto” para el éxito de un sistema de diseño: la colaboración y la comunicación</h2>

<p>El “secreto” para desarrollar un sistema de diseño realmente efectivo no es otro que el que exista una auténtica colaboración y comunicación entre todas las partes implicadas.</p>

<h2>Un ejercicio para favorecer la colaboración y comunicación al inicio del proyecto: la auditoría de componentes</h2>

<p>Realizar en equipo una auditoría de los componentes actuales de un interfaz de usuario es una excelente manera de evidenciar sus inconsistencias y demostrar a los <i>stakeholders</i> la necesidad de un sistema de diseño.</p>

<p><a href="http://atomicdesign.bradfrost.com/chapter-4/#conducting-an-interface-audit" target="_blank" rel="noopener noreferrer">En el libro se detalla la técnica</a> para llevar a cabo este ejercicio.</p>

<h2>Tres imágenes muy útiles para hacer comprender la complejidad del entorno web</h2>

<p>Nuestro trabajo es proporcionar una buena experiencia de uso para una gran diversidad de dispositivos, tamaños de pantalla, velocidades de conexión, capacidades del dispositivo, funcionalidades del navegador, etc.</p>

<p>El libro incluye tres imágenes que al autor le han resultado muy útiles para hacer entender la complejidad del entorno web a los clientes, colegas, etc.</p>

<p><img src="{{ site.baseurl }}/img/atomic-design-03-esto-no-es-web.png" loading="lazy" alt="Fotografía de un monitor de ordenador de escritorio: esto no es la web" width="720" height="540"></p>

<p><img src="{{ site.baseurl }}/img/atomic-design-04-esto-es-web.png" loading="lazy" alt="Fotografía de múltiples dispositivos de distintos tamaños: esto es la web" width="720" height="540"></p>

<p><img src="{{ site.baseurl }}/img/atomic-design-05-esto-sera-web.png" loading="lazy" alt="Fotografía de múltiples dispositivos de distintos tamaños y signos de interrogación: esto será la web" width="720" height="540"></p>

<h2>Considerar el rendimiento como un principio esencial del diseño</h2>

<p>El rendimiento o velocidad de carga de un interfaz debe ser considerado como un requisito esencial de la experiencia de usuario.</p>

<h2>La metodología de desarrollo en cascada no es válida para el mundo digital</h2>

<p>La <a href="http://www.javiergarzas.com/2013/07/ciclos-de-vida-software.html" target="_blank" rel="noopener noreferrer">metodología de desarrollo en cascada</a> tiene sentido en el mundo físico (imprenta, arquitectura,  manufactura, etc.) porque los cambios suponen un coste muchas veces inasumible. Sin embargo, esto no es así en el mundo digital.</p>

<p>Para crear un sistema de diseño hay que hacer comprender claramente este punto a todas las partes implicadas y hacerlas trabajar de manera colaborativa, <a href="http://www.javiergarzas.com/2012/10/iterativo-e-incremental.html" target="_blank" rel="noopener noreferrer">iterativa e incremental</a>. </p>

<h2>Hay que incluir a los desarrolladores front-end en el proceso de diseño</h2>

<p>En libro distingue fundamentalmente tres roles implicados en el desarrollo de un sistema de diseño:</p>

<ul>
    <li>UX designer</li>
    <li>Visual designer</li>
    <li>Front-end developer</li>
</ul>

<p>Defiende (y estoy completamente de acuerdo) que es crucial que los desarrolladores front-end formen parte del <i>core</i> del proceso de diseño. No puede existir ningún tipo de división entre diseñadores y desarrolladores front-end.</p>

<h2>La metáfora de la escultura</h2>

<p>Para ilustrar el proceso de creación de un sistema de diseño Brad Frost utiliza una, en mi opinión, acertada y bonita metáfora.</p>

<p>Desarrollar un sistema de diseño es un <a href="http://atomicdesign.bradfrost.com/chapter-4/#an-iterative-iterative-iterative-iterative-process" target="_blank" rel="noopener noreferrer">proceso iterativo similar a esculpir una escultura</a>.</p>

<p>
    <img src="{{ site.baseurl }}/img/atomic-design-06-escultor.jpg" alt="Fotografía de un escultor tallando una escultura" width="720" height="703">
    <figcaption>Créditos de la imagen: <a href="https://flic.kr/p/dLrf6w" target="_blank" rel="noopener noreferrer">Mike Beauregard en Flickr</a></figcaption>
</p>

<p>Es clave que los <i>stakeholders</i> se sientan cómodos y sepan revisar el sistema de diseño cuando aún está en curso de desarrollo.</p>

<h2>Papel de los UX designers</h2>

<p>Los <i>UX designers</i> (también conocidos como <i>information designers</i>, <i>information architects</i>, <i>interaction designers</i>…) son los responsables de sintetizar toda la información vital del proyecto y trasladarla a los interfaces de usuario para que cumplan con los objetivos del usuario y del negocio.</p>

<p>Dentro de este proceso, es mejor comenzar con <i>wireframes </i><a href="http://www.lukew.com/ff/entry.asp?933" target="_blank" rel="noopener noreferrer"><i>mobile first</i></a> de baja fidelidad, en lugar de documentos de alta fidelidad.</p>

<p>Utilizar la aproximación <i>mobile first</i> nos fuerza a poner el foco en el contenido más importante y realizar una correcta jerarquización del mismo. Te puedes preguntar: ¿tiene esta página el contenido adecuado?,  ¿está en el orden correcto?</p>

<h2>El test visual de los 20 segundos</h2>

<p><a href="http://goodkickoffmeetings.com/2010/04/the-20-second-gut-test/" target="_blank" rel="noopener noreferrer">Una técnica</a> que sirve para capturar en fases tempranas del proyecto los gustos visuales de los <i>stakeholders</i>.</p>

<h2>Style tiles</h2>

<p><a href="http://styletil.es/" target="_blank" rel="noopener noreferrer">Una técnica</a> que permite a los diseñadores visuales explorar aspectos de color, tipografía, textura, iconos, etc. sin tener que avanzar en el diseño de la estructura del interfaz.</p>

<p>Sabemos que diseñar componentes y pantallas finales en fases demasiado tempranas del proyecto y sin la necesaria participación de los desarrolladores front-end nos llevará a realizar asunciones técnicas poco realistas.</p>

<p>Los <i>style tiles</i> sirven también para educar a los <i>stakeholders</i> en que piensen en términos de “sistema”, en lugar de en términos de “páginas”.</p>

<h2>Collages de elementos</h2>

<p><a href="http://v3.danielmall.com/articles/rif-element-collages/" target="_blank" rel="noopener noreferrer">Es una técnica</a> que permite avanzar algo más en el diseño que los <i>style tiles</i>, pero sin llegar aún a diseñar los componentes finales.</p>

<h2>Tareas iniciales de cada rol de desarrollo</h2>

<p>Durante los primeros días del desarrollo de un sistema de diseño, los roles implicados en el mismo pueden llevar a cabo tareas iniciales en paralelo:</p>

<ul>
    <li><i>UX designers</i>: pueden crear los <i>wireframes</i> de baja fidelidad para establecer la arquitectura de la información y anticipar algunos patrones de interfaz.</li>
    <li><i>Visual designers</i>: pueden capturar las preferencias estéticas de los <i>stakeholders</i> mediante el test de los 20 segundos y plasmarlas en <i>style tiles</i> y collages de elementos.</li>
    <li>Desarrolladores front-end: pueden establecer las dependencias técnicas del proyecto, trabajar en las plantillas básicas, etc.</li>
</ul>

<p>Estas tareas pueden llevarse a cabo en paralelo, pero no de manera aislada.</p>

<h2>Iteraciones en el navegador</h2>

<p>Diseñar los componentes finales requiere de mucho trabajo. Es por ese motivo que previamente se utilizan técnicas de aproximación para establecer la dirección del trabajo a realizar.</p>

<p>Si el <i>feedback</i> que obtenemos de los <i>stakeholders</i> cuando presentemos el diseño de los componentes finales es del tipo “¿podemos aumentar el tamaño de esta imagen?” o “¿podríamos cambiar este formulario de posición?” es que vamos por el buen camino. Estos ajustes de poco calado deberíamos realizarlos ya sobre el navegador.</p>

<p>Hasta que los componentes diseñados no se transfieren al navegador, debemos considerarlos como hipótesis de trabajo. Es el comportamiento en el navegador quien los valida definitivamente.</p>

<p>Trabajando en el navegador se pueden probar:</p>

<ul>
    <li>Distintas resoluciones de pantalla.</li>
    <li>Distintas longitudes de los literales.</li>
    <li>Distintos tamaños de las imágenes.</li>
    <li>La interacción y las animaciones.</li>
    <li>El rendimiento.</li>
</ul>

<h2>Técnica para compartir el CSS y el JavaScript del front-end</h2>

<p><a href="https://medium.com/@marcelosomers/chasing-the-holy-grail-bbc0b7cce365" target="_blank" rel="noopener noreferrer">Marcelo Somers escribió un post</a> en el que compara diversas técnicas para compartir y coordinar librerías de componentes. </p>

<p>Una de las técnicas más sencillas de implementar es la de proporcionar URLs con las versiones de los archivos CSS y JavaScript del front-end.</p>

<p>Ejemplo: http://mycdn.com/1.3.5/styles.css</p>

<h2>Los nombres de los componentes deben ser independientes del contexto</h2>

<p>Por ejemplo “carrusel” en lugar de “carrusel home”. Así podrá ser utilizado en cualquier página. No solo en el <i>home</i>.</p>

<p>Por ejemplo “panel” en lugar de “panel de producto”. Así podrá ser utilizado para contener productos, pero también promociones, localizaciones de tiendas, etc.</p>

<p>En resumen, si los nombres de los componentes son agnósticos del contexto, serán más portables, reusables y versátiles.</p>