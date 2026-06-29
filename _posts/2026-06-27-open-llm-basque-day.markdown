---
layout:        post
title:         "Open LLM Basque Day"
subtitle:      "Memorando sobre el evento celebrado en Bilbao el 18 de junio de 2026"
description:   "Notas y reflexiones sobre la primera edición del Open LLM Basque Day celebrado en Bilbao el 18 de junio de 2026."
date:          2026-06-27 21:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-121.webp"
tags:          [inteligencia artificial, memorandos]
---

<p>El jueves 18 de junio de 2026, asistí acompañado de algunos compañeros/as de <a href="https://www.adimedia.net/" target="_blank" rel="noopener noreferrer">Adimedia</a> a la primera edición del <a href="https://enpresadigitala.spri.eus/es/open-llm-basque-day-modelos-abiertos-de-ia-al-servicio-del-control-y-la-soberania-del-dato-en-la-empresa/" target="_blank" rel="noopener noreferrer">Open LLM Basque Day</a>.</p>

<p>Se celebró en la planta 29 de la Torre Iberdrola en Bilbao. Estuvo organizado por <a href="https://enpresadigitala.spri.eus/" target="_blank" rel="noopener noreferrer">Spri Enpresa Digitala</a> y <a href="https://www.mondragon.edu/" target="_blank" rel="noopener noreferrer">Mondragon Unibertsitatea</a>. La logística del evento (espacio, atención, <em>amenities</em>, etc.) estuvo de diez. La relevancia profesional de los conferenciantes era muy alta y la calidad e interés de las ponencias me resultó sobresaliente.</p>

<p>Este artículo no pretende ser una crónica exhaustiva ni pormenorizada, sólo es una página de notas sobre ideas, temas o casos de uso que me llamaron la atención.</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-logo.webp" loading="lazy" alt="Logotipo del Open LLM Basque Day con una figura geométrica multicolor bajo el texto del evento" width="750" height="427"></p>

<h2>Leitmotiv del Open LLM Basque Day</h2>

<p>La jornada giraba en torno al tema de <strong>los modelos abiertos de IA como alternativa</strong> para controlar los datos, la infraestructura y el coste de la IA, sin depender de un proveedor cerrado.</p>

<p>Se habló de temas como:</p>

<ul>
    <li>Los <strong>modelos abiertos</strong> en contraposición a los <strong>modelos cerrados</strong>.</li>
    <li><strong>Control</strong> sobre dónde van a parar nuestros <strong>datos</strong>.</li>
    <li><strong>Control de costes</strong>.</li>
    <li><strong>Control de la infraestructura</strong>.</li>
    <li><strong>Soberanía tecnológica</strong>.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-modelos-abiertos.webp" loading="lazy" alt="Ilustración de un escudo conectado a varios nodos con lupas, en referencia al control y la revisión de modelos abiertos" width="750" height="422"></p>

<h2>Ponencia- Modelos abiertos, una alternativa real para las empresas</h2>

<p><a href="https://www.linkedin.com/in/enekoagirre/" target="_blank" rel="noopener noreferrer">Eneko Agirre</a>. Director del HITZ Centro Vasco de Tecnología del lenguaje, EHU.</p>

<p>Los llamados modelos fundacionales o modelos de frontera suelen ser <strong>modelos cerrados</strong>.</p>

<ul>
    <li>Tecnológicamente son los mejores.</li>
    <li>Tienen precios al alza.</li>
    <li>Rápidos y fáciles de desplegar.</li>
</ul>

<p>En contraposición, los <strong>modelos abiertos</strong>, no son tecnológicamente punteros, pero nos permiten construir sin tener que partir de cero.</p>

<ul>
    <li>Tecnológicamente a unos 6 meses de los modelos de frontera.</li>
    <li>Costes controlados.</li>
    <li>Control de los datos.</li>
    <li>Independencia.</li>
    <li>Permiten adaptarlos a nuestras necesidades. Especialización de modelos.</li>
    <li>Si cumplen con nuestros requisitos se pueden seguir usando indefinidamente.</li>
    <li>Recomendación: antes de comprar el hardware para alojarlos, probarlos en la nube para ver si cumplen con nuestros requisitos.</li>
</ul>

<p>El equipo de Eneko ha desarrollado <strong>LATXA</strong>. Un modelo abierto de 70B de parámetros entrenado con un corpus en euskera. Latxa se basa en Llama-3.1 y <a href="https://www.apps.euskadi.eus/latxa/" target="_blank" rel="noopener noreferrer">se puede probar de manera gratuita</a>.</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-latxa.svg" loading="lazy" alt="Logotipo de LATXA, el modelo abierto en euskera desarrollado por el HITZ Zentroa" width="300" height="300" class="center-block"></p>

<p>Existen empresas que apuestan por modelos especializados (<em>fine-tuning</em>) y personalizados para determinadas tareas. Normalmente modelos más pequeños que los de frontera. Mencionó tres empresas que están recorriendo este camino:</p>

<ul>
    <li>Cohere (Canada)</li>
    <li>Mistral AI (Francia)</li>
    <li>Reka AI (EEUU)</li>
</ul>

<p>Considera que hay un nicho de mercado en los <strong>modelos abiertos especializados</strong>.</p>

<h2>Ponencia - IA soberana en Suiza: ¿qué es posible y qué tiene sentido hoy en día?</h2>

<p><a href="https://www.linkedin.com/in/mariagrandury/" target="_blank" rel="noopener noreferrer">Maria Grandury</a>. Investigadora, École polytechnique fédérale de Lausanne (EPFL).</p>

<p>Ha presentado <a href="https://apertvs.ai/" target="_blank" rel="noopener noreferrer">Apertus</a>, el <strong>modelo soberano y abierto suizo</strong>. Es un modelo multilingüe por diseño. Evaluado en 94 idiomas y 120 países. Existe en versión de 70B y 8B de parámetros. Se lanzó en septiembre de 2025.</p>

<h3>The Foundation Model Transparency Index</h3>

<p><a href="https://crfm.stanford.edu/fmti/" target="_blank" rel="noopener noreferrer">Índice de transparencia de los desarrolladores de modelos fundacionales</a>. Elaborado por la Universidad de Stanford. La transparencia media ha caído el último año.</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-transparency-index.webp" loading="lazy" alt="Gráfico del Foundation Model Transparency Index 2025 con IBM en cabeza y varios desarrolladores de modelos fundacionales por debajo del 50%" width="500" height="496"></p>

<p>La <strong>transparencia</strong> implica que se utilicen <strong>solo datos públicos</strong>, sin fuentes ilegales.</p>

<h3>Casos de uso de Apertus</h3>

<p>Me resulto particularmente interesante la exposición de varios casos de uso reales de Apertus. Algunos de ellos:</p>

<ul>
    <li>Sistema de traducción interna segura de la administración del cantón de Tesino.</li>
    <li>Asistente IA de la administración de la ciudad de Zúrich: <a href="https://oss.zuericitygpt.ch/" target="_blank" rel="noopener noreferrer">ZüriCityGPT</a>.</li>
    <li>La aplicación de traducción <a href="https://helvetra.ch/" target="_blank" rel="noopener noreferrer">Helvetra</a>. Con soporte para los seis dialectos del alemán de Suiza.</li>
    <li><a href="https://www.infomaniak.com/es/euria" target="_blank" rel="noopener noreferrer">Euria</a>, un asistente de IA para la nube europea de Infomaniak.</li>
    <li>Meditron, un LLM especializado en el sector médico y la salud.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-zuri-city-gpt.webp" loading="lazy" alt="Pantalla de ZüriCityGPT OSS Version con un campo para preguntar sobre la administración de la ciudad de Zúrich" width="750" height="464"></p>

<h2>Ponencia - Ingeteam y Open LLM: cómo decidir entre modelos abiertos, cloud, local y Edge</h2>

<p><a href="https://www.linkedin.com/in/gaizkalanda/" target="_blank" rel="noopener noreferrer">Gaizka Landa</a>. Artificial Intelligence Manager - Ingeteam Research Institute.</p>

<p>Muy interesante la visión de una empresa muy pegada a la realidad del día a día. Han desarrollado una arquitectura híbrida que combina modelos abiertos y cerrados. El objetivo: <strong>no quedar atados a ningún proveedor</strong>.</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-sin-ataduras.webp" loading="lazy" alt="Ilustración de dos personas conectadas a una pasarela central que distribuye el acceso a varios modelos de IA" width="750" height="422"></p>

<p>La mayor parte del uso de IA la canalizan vía API y han desarrollado un interfaz de usuario propio que facilita a los trabajadores el acceso a los diferentes modelos.</p>

<p>Nos resultó bastante sorprendente el dato del coste por usuario al mes: 2 €. Sí, "dos euros".</p>

<h2>Ponencia - Your Data, Your Models, Your Advantage: Open LLMs for European Industry</h2>

<p><a href="https://www.linkedin.com/in/floresherr/" target="_blank" rel="noopener noreferrer">Nicolas Flores-Herr</a>. Responsable de Modelos Funcionales y Sistemas de IA Generativa en Soofi y jefe de equipo en Fraunhofer IAIS.</p>

<p>Nicolas comenzó referenciando un relato de ficción titulado <a href="https://europe2031.ai/" target="_blank" rel="noopener noreferrer">Europe 2031</a>, que explora cómo la mala gestión de la inteligencia artificial podría llevar a Europa a la irrelevancia económica y política.</p>

<p>Habló de como escapar de "<strong>la trampa de los tokens</strong>". Recurriendo a modelos abiertos auditables, adaptables y soberanos. Como por ejemplo <strong>Soofi</strong> (Sovereign Open Source Foundation Models), que es un proyecto colaborativo alemán enfocado en desarrollar modelos fundacionales de inteligencia artificial soberanos para Europa orientados a un uso industrial y no como chatbots generales.</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-soberania-tecnologica.webp" loading="lazy" alt="Ilustración de una profesional sosteniendo servidores junto a iconos de seguridad, datos e infraestructura" width="750" height="422"></p>

<p>Nicolas coincidió con Eneko en que hay una <strong>oportunidad de negocio en el <em>fine-tuning</em></strong> para soluciones de nicho y empresas.</p>

<h2>Ponencia - IA soberana en empresas y AAPP</h2>

<p><a href="https://www.linkedin.com/in/andres-pedre%C3%B1o-lloret/" target="_blank" rel="noopener noreferrer">Andrés Pedreño Lloret</a>, Head of Sales Public Sector at 1MillionBot.</p>

<p>Habló de "<strong>la trampa del modelo más potente</strong>". Una idea que también expusieron casi la totalidad del resto de ponentes. Para muchos casos no nos hace falta el modelo más potente, el mejor modelo de frontera. También hay muchas veces en los que en un proyecto de IA lo que falla no es el modelo, son otras cuestiones.</p>

<p>Uno de los productos de 1MillionBot son los asistentes conversacionales basados en inteligencia artificial. Interesante el planteamiento combinado de <strong>IA predictiva</strong> "clásica" para las respuestas deterministas y de <strong>IA generativa</strong> (LLMs avanzados) para conversaciones naturales con comprensión profunda.</p>

<p>Tranquilizadora, para los que estamos desarrollando productos basados en IA, la experiencia de que <strong>todos los productos de IA tienen un porcentaje de errores</strong> y que <strong>los guardarraíles también fallan</strong> en algunas ocasiones.</p>

<p>Están haciendo pruebas con modelos creados en el marco del <a href="https://alia.gob.es/" target="_blank" rel="noopener noreferrer">proyecto ALIA</a>. Una iniciativa pública del gobierno español para fomentar el impulso del castellano y lenguas cooficiales —catalán y valenciano, euskera y gallego— en el desarrollo y despliegue de la IA en el mundo.</p>

<p>Ejemplo de uno de los asistentes de 1MillionBot instalado en la web del <a href="https://aviles.es/" target="_blank" rel="noopener noreferrer">Ayuntamiento de Aviles</a>:</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-aviles.webp" loading="lazy" alt="Ventana de Avibot, asistente del Ayuntamiento de Avilés, mostrando opciones para pedir cita previa, consultar incidencias y trámites municipales" width="450" height="627"></p>

<h2>Mesa redonda - Modelos abiertos: coste, soberanía y decisiones reales</h2>

<p>La jornada terminó con una mesa redonda de debate moderada por <a href="https://www.linkedin.com/in/iraitz-cordero/" target="_blank" rel="noopener noreferrer">Iraitz Cordero</a> de Mondragon Unibertsitatea en la que participaron:</p>

<ul>
    <li><a href="https://www.linkedin.com/in/itziar-cort%C3%A9s/" target="_blank" rel="noopener noreferrer">Itziar Cortes</a> de Elhuyar</li>
    <li><a href="https://www.linkedin.com/in/gunamuno/" target="_blank" rel="noopener noreferrer">Gorka Unamuno</a> de Multiverse Computing</li>
    <li><a href="https://www.linkedin.com/in/carlos-tom%C3%A1s-moro/" target="_blank" rel="noopener noreferrer">Carlos Tomás</a> de Innkia</li>
    <li><a href="https://www.linkedin.com/in/endika-gil-uriarte/" target="_blank" rel="noopener noreferrer">Endika Gil Uriarte</a> de Alias Robotics</li>
</ul>

<p>El debate resultó interesante y se habló de distintos temas. Me quedo con la idea compartida por los intervinientes de que en Euskadi tenemos que <strong>formar talento</strong> y <strong>atraer talento</strong> en el ámbito de la IA. Alguien dijo, lo apunte en mis notas, "necesitamos gente que sepa hacer estas cosas". Reflexión que sirve de pie para mencionar a dos de los compañeros de Adimedia que me acompañaron al evento: <a href="https://www.linkedin.com/in/oihane-zaldua/" target="_blank" rel="noopener noreferrer">Oihane Zaldua</a> y <a href="https://www.linkedin.com/in/sergio-hern%C3%A1ndez-castro/" target="_blank" rel="noopener noreferrer">Sergio Hernández</a>. Forman parte de ese grupo de profesionales vascos que "saben hacer estas cosas".</p>

<p><img src="{{ site.baseurl }}/img/open-llm-basque-day-futuro-ia.webp" loading="lazy" alt="Ilustración de dos profesionales trabajando frente a ordenadores con una estructura de IA compartida entre ambos" width="750" height="422"></p>
