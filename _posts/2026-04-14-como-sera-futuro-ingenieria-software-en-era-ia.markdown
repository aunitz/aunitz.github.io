---
layout:        post
title:         "¿Cómo será el futuro de la ingeniería de software en la era de la IA?"
subtitle:      "Martin Fowler y unos 40 expertos han debatido sobre ello"
description:   "Retiro de expertos liderado por Fowler analiza el impacto de la IA en el desarrollo de software: deuda cognitiva, supervisión y TDD."
date:          2026-04-14 12:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-116.jpg"
tags:          [inteligencia artificial, desarrollo de soluciones digitales]
---

<h2>Hace 25 años: el Manifiesto Ágil</h2>

<p>En <strong>febrero de 2001</strong>, un grupo de 17 expertos en software —Martin Fowler entre ellos— se reunieron en estación de esquí de Snowbird, en las montañas de Utah (EEUU), para buscar alternativas a los métodos tradicionales, que consideraban demasiado rígidos y burocráticos. Como primer paso, redactaron el <a href="https://agilemanifesto.org/iso/es/manifesto.html" target="_blank" rel="noopener noreferrer">Manifiesto Ágil</a>, un documento que resume la filosofía "agile". Si trabajas en el ámbito del desarrollo de software, conocerás este manifiesto y su importancia capital para el sector.</p>

<p>El Manifiesto prioriza a los individuos e interacciones, el software funcional, la colaboración con el cliente y la respuesta al cambio sobre la documentación y los procesos rígidos. <strong>Transformó la industria</strong> al reemplazar (en muchos equipos) el modelo clásico "en cascada" (waterfall) —rígido y secuencial— por un enfoque basado en la <strong>iteración</strong> y la <strong>flexibilidad</strong>. Su impacto se refleja en una mayor eficiencia, calidad del producto y satisfacción del cliente.</p>

<p>Su influencia y efectos han repercutido no solo en el sector tecnológico, sino también en la <strong>gestión de equipos</strong> y la <strong>gestión empresarial</strong> en general.</p>

<h2>2026: retiro sobre el futuro del desarrollo de software</h2>

<p>25 años después del Manifiesto Ágil, en <strong>febrero de 2026</strong>, y de manera simbólica en las mismas montañas de Utah, <strong>Martin Fowler</strong> y la empresa Thoughtworks organizaron un <a href="https://www.thoughtworks.com/en-es/about-us/events/the-future-of-software-development" target="_blank" rel="noopener noreferrer">retiro de varias jornadas</a> con <strong>cerca de 40</strong> líderes técnicos, investigadores y profesionales de la ingeniería de software de todo el mundo.</p>

<p>El formato elegido para el debate fue de tipo "unconference" o espacio abierto (Open Space): un tipo de encuentro sin agenda ni presentaciones predefinidas, donde los propios participantes proponen los temas de las sesiones y eligen libremente a cuáles asistir.</p>

<p>Los organizadores del evento y algunas de las personas participantes han publicado artículos sobre los temas tratados en el retiro. Al final del post enlazo con las fuentes.</p>

<p><img src="{{ site.baseurl }}/img/como-sera-futuro-ingenieria-software-01.webp" loading="lazy" alt="" width="720" height="331"></p>

<p>Los participantes <strong>analizaron cómo la inteligencia artificial está transformando radicalmente el desarrollo de software</strong>. A continuación, profundizo en los temas que más interesantes me han resultado.</p>

<h2>Consecuencias negativas y riesgos de la adopción de la IA</h2>

<p>Los participantes en el retiro identificaron diversas consecuencias negativas y riesgos asociados a la adopción de la IA en el desarrollo de software. A continuación, recojo las que me han parecido más relevantes.</p>

<h3>El surgimiento de la "deuda cognitiva"</h3>

<p>La <strong>deuda cognitiva</strong> es el vacío de comprensión que surge cuando la IA genera código de forma tan masiva que <strong>los humanos perdemos la capacidad de comprender en profundidad cómo funciona el sistema</strong> y por qué se construyó de esa manera. Se produce cuando el volumen de código generado por la IA es tal que obliga a los ingenieros a <strong>revisarlo de manera superficial</strong>.</p>

<p>El concepto tiene similitudes con el clásico de <strong>deuda técnica</strong>. Que se define como el coste futuro de retrabajo (los "intereses" de la deuda) derivado de elegir soluciones rápidas o atajos en el desarrollo actual en lugar de enfoques más eficientes y sólidos.</p>

<p>Los equipos pueden <strong>acumular deuda cognitiva más rápido que deuda técnica</strong>, hasta alcanzar un punto en el que no pueden realizar cambios sencillos sin romper algo inesperado, porque nadie comprende la teoría subyacente al sistema ni las decisiones de diseño originales.</p>

<p><img src="{{ site.baseurl }}/img/como-sera-futuro-ingenieria-software-02.webp" loading="lazy" alt="" width="720" height="449"></p>

<p>Al igual que los <strong>intereses</strong> en la deuda financiera, la deuda cognitiva encarece progresivamente la incorporación de nuevas funcionalidades y exige una inversión explícita de tiempo y recursos para recuperar el conocimiento perdido.</p>

<h3>El desapego del autor</h3>

<p>Es un concepto estrechamente relacionado con el de deuda cognitiva. Mientras que la deuda cognitiva es causada por la velocidad y el volumen —la IA permite generar código tan rápido que sobrepasa la capacidad de procesamiento humana—, el desapego del autor surge de la delegación y la falta de autoría. Al dejar que agentes realicen el trabajo, el ingeniero se convierte en un supervisor que se distancia del "hacer", perdiendo la conexión profunda con el producto final. Se trata de una <strong>pérdida de conexión emocional</strong> con el sistema construido y una <strong>pérdida de responsabilidad</strong> sobre lo desarrollado.</p>

<h3>Pérdida de habilidades</h3>

<p>El uso intensivo de agentes de IA puede provocar que las habilidades de los ingenieros se atrofien al dejar de realizar el trabajo de forma manual.</p>

<h3>Agotamiento y fatiga mental</h3>

<p>La presión de revisar miles de líneas de código generado por múltiples agentes de forma simultánea genera una carga cognitiva inmensa, que está llevando a los ingenieros más experimentados al agotamiento.</p>

<h3>Crisis de identidad</h3>

<p>Como veremos más adelante, los roles de los ingenieros están evolucionando hacia la supervisión, lo que puede desencadenar una crisis de identidad en aquellos desarrolladores que aman el acto de programar y que disfrutan con la escritura artesanal de código (<em>software craftsmanship</em>).</p>

<h2>Medidas para contrarrestar las consecuencias negativas y los riesgos</h2>

<p>En el retiro se debatió sobre muchas medidas estratégicas centradas en recuperar el control humano y el rigor técnico. Destaco las que me han parecido más relevantes.</p>

<h3>El surgimiento de la ingeniería de supervisión</h3>

<p>El desarrollo de software se ha descrito durante mucho tiempo mediante dos bucles. El <strong>bucle interno</strong> es el ciclo personal del desarrollador: escribir, probar y depurar. El <strong>bucle externo</strong> es el ciclo de entrega más amplio de CI/CD, despliegue y operaciones. El retiro identificó un tercero: un <strong>bucle intermedio</strong> de <strong>ingeniería de supervisión</strong> situado entre ambos. En esta nueva etapa, la labor del ingeniero no consiste en la ejecución manual de la sintaxis, sino en:</p>

<ul>
  <li><strong>Orquestar y delegar:</strong> descomponer problemas complejos en paquetes de trabajo que los agentes de IA puedan procesar.</li>
  <li><strong>Evaluar la veracidad:</strong> valorar con rapidez la calidad de la salida de los agentes y reconocer cuándo producen resultados plausibles pero incorrectos.</li>
  <li><strong>Mantener la coherencia:</strong> asegurar que la integridad arquitectónica del sistema se mantenga a pesar de los múltiples flujos de trabajo paralelos generados por la IA.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/como-sera-futuro-ingenieria-software-03.webp" loading="lazy" alt="" width="720" height="427"></p>

<p>Vinculado a la supervisión, se habló de que las organizaciones están adoptando una <strong>clasificación por niveles de riesgo</strong>, donde la intensidad de la revisión humana es proporcional al impacto de un posible error. Así, los sistemas críticos requieren de una revisión humana profunda y rigurosa.</p>

<h3>Modelo de gestión de riesgos y supervisión estratégica</h3>

<p>Ante la capacidad de la IA para generar código de forma masiva, la ingeniería no desaparece, sino que se transforma. Algunas de las tareas a realizar por parte de los ingenieros serán:</p>

<ul>
  <li><strong>Escritura precisa de especificaciones.</strong> Dado que la IA genera código a partir de instrucciones, la precisión de estas resulta crítica. Se está trabajando en diseñar métodos estructurados de redacción de especificaciones para evitar que la IA cometa errores de base.</li>
  <li><strong>Restricciones y tipado fuerte.</strong> En lugar de corregir errores a posteriori, se definen restricciones arquitectónicas que limitan lo que la IA puede o no modificar. Además, se propone utilizar lenguajes con sistemas de tipado fuerte para que el código incorrecto resulte "irrepresentable".</li>
  <li><strong>Revisión humana por niveles de riesgo.</strong> No todo el código requiere la misma supervisión.</li>
  <li><strong>TDD (Test-Driven Development).</strong> En un entorno donde la generación de código es no determinista (la IA puede dar respuestas distintas cada vez), las pruebas se convierten en la única fuente de verdad. Escribir las pruebas antes que el código evita que los agentes "engañen" al sistema creando pruebas que validen comportamientos erróneos.</li>
  <li><strong>Ingeniería de supervisión.</strong> Surge una nueva categoría de trabajo de supervisión situada entre la escritura de código (bucle interno) y la entrega (bucle externo). Este rol requiere habilidades de orquestación, delegación y una visión arquitectónica profunda para mantener la coherencia del sistema.</li>
</ul>

<p>Las estructuras actuales, diseñadas solo para humanos, se están resquebrajando bajo el peso del trabajo asistido por IA, lo que exige una transición desde un <strong>modelo de artesanía</strong> hacia uno de <strong>gestión de riesgos y supervisión estratégica</strong>.</p>

<h3>El resurgir del TDD (Test-Driven Development)</h3>

<p>El TDD es un viejo conocido del desarrollo de software, defendido infinidad de veces como la técnica de desarrollo más eficiente y sostenible a largo plazo. Los participantes en el retiro sostienen que <strong>el TDD debe ser una responsabilidad humana fundamental</strong> para actuar como contrapeso determinista frente a la IA.</p>

<p><img src="{{ site.baseurl }}/img/como-sera-futuro-ingenieria-software-04.webp" loading="lazy" alt="" width="720" height="395"></p>

<p>Los motivos principales que esgrimen son:</p>

<ul>
  <li><strong>Evitar que la IA "haga trampas".</strong> Si se permite que los agentes escriban las pruebas al mismo tiempo o después del código, estos suelen crear pruebas que simplemente confirman su propia implementación, incluso si esta es incorrecta. Al escribir el humano las pruebas (o definirlas rigurosamente) <strong>antes</strong> de que la IA genere el código, se evita este fallo y se obliga al agente a ajustarse a un criterio externo y objetivo.</li>
  <li><strong>Las pruebas son la mejor técnica de ingeniería de <em>prompts</em>.</strong> Las pruebas escritas por el desarrollador sirven como las instrucciones deterministas que validan la generación no determinista de la IA.</li>
  <li><strong>Reducir la deuda cognitiva.</strong> El ciclo de TDD permite a los desarrolladores humanos consolidar su comprensión del sistema y plasmarla en la base de código, sobre todo si los humanos llevan a cabo también el <strong>paso de refactorización</strong> del ciclo. Delegar este proceso por completo a la IA contribuiría a la acumulación de deuda cognitiva, ya que el humano dejaría de razonar sobre la "teoría del sistema".</li>
  <li><strong>Facilita la labor del ingeniero de supervisión.</strong> En el nuevo rol de ingeniería de supervisión, el humano utiliza las pruebas para evaluar la calidad de lo producido por los agentes de forma rápida y segura, sin necesidad de leer cada línea de código generado.</li>
</ul>

<h3>Evolución del rol de desarrollador y del <em>product manager</em></h3>

<p>En el debate se estableció un paralelismo interesante con la historia de las imágenes generadas por ordenador. En 1992 los ingenieros codificaban a mano el renderizado de polígonos. Más tarde, ese trabajo lo hacía el hardware, y la tarea de los ingenieros paso a ser la de animación e iluminación. Cada nueva capa de abstracción en la generación de imágenes por ordenador provocaba que los trabajadores que no se adaptaban quedaran rezagados.</p>

<p>Los desarrolladores deberán evolucionar hacia supervisión, la arquitectura y el diseño de sistemas de alto nivel. Este movimiento puede conducir a la convergencia entre los roles de los <em>product managers</em> (PM) y de los desarrolladores. Algunos desarrolladores se desplazarán hacia decidir qué construir y por qué, un territorio que tradicionalmente pertenecía a la gestión de producto. Por otro lado, ya hay organizaciones que impulsan a los PM hacia las herramientas técnicas.</p>

<p>La convergencia es tan palpable que algunas grandes empresas tecnológicas están investigando si el rol de PM necesita una nueva denominación.</p>

<h2>Un futuro incierto por construir entre todos</h2>

<p>Annie Vella, una de las ingenieras participantes en el evento, <a href="https://annievella.com/posts/finding-comfort-in-the-uncertainty/" target="_blank" rel="noopener noreferrer">aporta unas interesantes reflexiones</a> que quiero incorporar a modo de conclusiones.</p>

<ul>
  <li><strong>Hay más incertidumbre que certeza:</strong> sobre cómo usar bien la IA, qué impacto real tiene en la productividad, cómo están cambiando los roles y hacia dónde evolucionará todo. Nadie tiene respuestas definitivas. Todos están aprendiendo sobre la marcha.</li>
  <li>Debemos ayudar a las generaciones actuales y futuras de ingenieros no con promesas vacías, sino definiendo con claridad los nuevos problemas que deben resolver. Se les contrató para escribir código; ahora se les pide delegarlo. Merecen que <strong>definamos qué viene después</strong>.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/como-sera-futuro-ingenieria-software-05.webp" loading="lazy" alt="" width="720" height="480"></p>

<h2>Fuentes consultadas para el artículo</h2>

<ul>
  <li><a href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf" target="_blank" rel="noopener noreferrer">The future of software engineering – Thoughtworks (PDF)</a></li>
  <li><a href="https://martinfowler.com/bliki/FutureOfSoftwareDevelopment.html" target="_blank" rel="noopener noreferrer">Future Of Software Development - Martin Fowler</a></li>
  <li><a href="https://annievella.com/posts/finding-comfort-in-the-uncertainty/" target="_blank" rel="noopener noreferrer">Finding Comfort in the Uncertainty - Annie Vella</a></li>
  <li><a href="https://thenewstack.io/ai-velocity-debt-accelerator/" target="_blank" rel="noopener noreferrer">Reflexiones de Rachel Laycock, CTO de Thoughtworks</a></li>
</ul>
