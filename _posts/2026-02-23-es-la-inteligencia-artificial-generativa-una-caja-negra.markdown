---
layout:        post
title:         "¿Es la inteligencia artificial generativa una “caja negra”?"
subtitle:      "Y, si lo es, ¿supone un problema?"
description:   "Los LLM son cajas negras: funcionan bien en promedio, son sensibles al contexto y variables; requieren supervisión e interpretabilidad."
date:          2026-02-23 09:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-115.jpg"
tags:          [inteligencia artificial]
---

<p>La <strong>inteligencia Artificial generativa</strong> es una herramienta profundamente disruptiva para los profesionales del conocimiento. Para aprovecharla con éxito y criterio, merece la pena invertir tiempo en comprenderla más allá de su uso puramente instrumental.</p>

<p>Como expliqué en un <a href="/como-funciona-la-inteligencia-artificial-generativa/">artículo anterior sobre el funcionamiento de un <strong>LLM</strong></a> (<em>Large Language Model</em> o modelo extenso de lenguaje), sistemas como ChatGPT, Gemini, Copilot, DeepSeek o Claude son, en esencia, motores de procesamiento que <strong>predicen el siguiente token</strong> (la siguiente “pieza” de texto). Hasta ahí, el mecanismo general resulta razonablemente claro.</p>

<p>Sin embargo, al profundizar en la literatura técnica aparece una afirmación recurrente: los LLM son una <strong>caja negra</strong>. Algunos investigadores sostienen incluso que resulta imposible anticipar con precisión qué responderá el modelo ante una instrucción concreta.</p>

<p><img src="{{ site.baseurl }}/img/es-la-inteligencia-artificial-generativa-una-caja-negra-01.svg" loading="lazy" alt="" width="750" height="422"></p>

<p>¿Estamos ante una exageración mediática o hay fundamentos técnicos sólidos detrás de esta afirmación?</p>

<h2>Qué significa “caja negra” en ingeniería</h2>

<p>En ingeniería de sistemas, un entorno se considera una <em>caja negra</em> cuando:</p>

<ul>
  <li>Conocemos sus <strong>entradas</strong> y sus <strong>salidas</strong>.</li>
  <li>Podemos describir qué tipo de función matemática implementa.</li>
  <li>Pero <strong>no podemos explicar de manera trazable</strong> el proceso interno que conecta una entrada con una salida concreta.</li>
</ul>

<p><strong>Un LLM encaja a la perfección en esta definición.</strong> Aunque sepamos qué hace “en general”, resulta muy difícil explicar paso a paso y de forma intuitiva por qué, ante una petición específica, el modelo asigna más probabilidad a una palabra que a otra.</p>

<h3>No todos los LLM son igual de transparentes</h3>

<p>Aquí conviene matizar: existen distintos niveles de opacidad.</p>

<ul>
  <li>En los modelos <em>open source</em> u <em>open weights</em> se publica la arquitectura y los pesos neuronales (la fuerza de las conexiones internas), lo que permite que expertos externos puedan auditar, inspeccionar y reproducir parcialmente el comportamiento del sistema.</li>
  <li>En la mayoría de los modelos comerciales, los pesos no se publican, los datos de entrenamiento y su mezcla exacta no se revelan, y la fase de postentrenamiento rara vez se documenta en detalle.</li>
</ul>

<p>Dicho esto, incluso los modelos más abiertos siguen siendo, por definición, cajas negras. Veamos por qué.</p>

<h2>Representaciones distribuidas: el conocimiento no está en reglas</h2>

<p>Un error frecuente es imaginar que el modelo contiene directrices internas del tipo:</p>

<blockquote>“Si el texto habla de invierno, la siguiente palabra probable es nieve.”</blockquote>

<p>Ese tipo de representación simbólica <strong>no existe en forma de reglas explícitas y legibles</strong> dentro de un LLM.</p>

<p>El “conocimiento” del modelo base no se almacena en una base de datos interna estructurada (independientemente de que luego el producto final pueda conectarse a buscadores o sistemas RAG). En su lugar, la información está codificada en <strong>patrones numéricos distribuidos</strong> a lo largo de todo su espacio de parámetros.</p>

<p>En vez de imaginar una biblioteca con libros perfectamente ordenados, piensa en una enorme <strong>nube de asociaciones</strong>. Cada consulta activa múltiples zonas simultáneamente, y la respuesta emerge de la combinación matemática de todas ellas.</p>

<p><img src="{{ site.baseurl }}/img/es-la-inteligencia-artificial-generativa-una-caja-negra-02.svg" loading="lazy" alt="" width="750" height="422"></p>

<p><a href="/como-funciona-la-inteligencia-artificial-generativa/">La arquitectura Transformer</a> (la base de los LLMs actuales) opera mediante el encadenamiento de decenas o cientos de capas de funciones altamente no lineales. Esta estructura permite capturar matices lingüísticos asombrosos, pero a costa de sacrificar la interpretabilidad: <strong>para el cerebro humano, seguir el rastro de miles de millones de operaciones simultáneas es simplemente imposible</strong>.</p>

<p>Matemáticamente, la función global está perfectamente definida; a nivel cognitivo humano, resulta inabarcable. Incluso si conociéramos todos los parámetros exactos, el <strong>volumen de interacciones cruzadas</strong> hace prácticamente imposible reconstruir mentalmente el camino causal que lleva de un token de entrada a uno de salida.</p>

<p>No es que la función sea misteriosa, es que es <strong>extraordinariamente compleja</strong>. A día de hoy, carecemos de una teoría mecanicista exhaustiva que explique el comportamiento de un LLM gigante en su totalidad.</p>

<h2>Alta sensibilidad al contexto</h2>

<p>Otra característica clave es su extrema <strong>sensibilidad al contexto</strong>.</p>

<p>Pequeñas variaciones en el <em>prompt</em> (la instrucción del usuario) pueden alterar de forma sustancial:</p>

<ul>
  <li>Los patrones de atención de la red.</li>
  <li>Las activaciones internas.</li>
  <li>Y, en consecuencia, la distribución final de la probabilidad.</li>
</ul>

<p>Por ejemplo, añadir la coletilla <em>“Explícalo brevemente”</em> frente a <em>“Explícalo con rigor técnico”</em> no solo cambia el estilo superficial del texto: reconfigura las conexiones internas de múltiples cabezas de atención y altera el recorrido de la información a través de las capas.</p>

<p><img src="{{ site.baseurl }}/img/es-la-inteligencia-artificial-generativa-una-caja-negra-03.svg" loading="lazy" alt="" width="750" height="422"></p>

<p>Desde fuera vemos únicamente la respuesta final. El proceso intermedio permanece opaco.</p>

<h2>Por qué el mismo prompt no siempre devuelve la misma respuesta</h2>

<p>Dado que un LLM implementa una función matemática, en teoría, si fijáramos todas las variables, el modelo produciría siempre la misma salida. Sin embargo, en la práctica el sistema suele introducir <strong>azar controlado</strong> durante la generación.</p>

<p>Cuando el modelo redacta texto, no "elige" una palabra con absoluta certeza, sino que calcula una <strong>distribución de probabilidad</strong> para el siguiente token. Existen dos formas principales de convertir esa probabilidad en una palabra concreta:</p>

<ul>
  <li><strong>Decodificación determinista</strong>: Escoger siempre el token más probable (<em>greedy</em>) o el mejor conjunto estadístico (<em>beam search</em>).</li>
  <li><strong>Decodificación probabilística (muestreo)</strong>: Elegir un token al azar, pero respetando los pesos de las probabilidades calculadas.</li>
</ul>

<p><strong>La gran mayoría de los asistentes conversacionales utilizan el muestreo.</strong> ¿El motivo? Mejora la naturalidad, permite variar el estilo, reduce las repeticiones robóticas y ayuda a explorar respuestas creativas. Al utilizar muestreo, es completamente normal que un mismo <em>prompt</em> genere respuestas distintas.</p>

<p>Además, en los productos comerciales (como ChatGPT o Gemini), hay capas adicionales que introducen variabilidad:</p>

<ul>
  <li><strong>Instrucciones del sistema (<em>system prompts</em>)</strong> ocultas que cambian con cada actualización.</li>
  <li><strong>Filtros de seguridad</strong> que pueden desviar o reescribir una respuesta al vuelo.</li>
  <li><strong>Herramientas externas</strong>: Si el modelo consulta la web (RAG), la información recuperada puede cambiar de un día para otro.</li>
  <li><strong>Infraestructura</strong>: Pequeñas diferencias de procesamiento paralelo entre servidores pueden generar microvariaciones matemáticas que se amplifican token a token.</li>
</ul>

<p>En un entorno conversacional, se prioriza la naturalidad frente a la reproducibilidad exacta.</p>

<h2>La emergencia: comportamientos no programados</h2>

<p>Al escalar drásticamente el número de parámetros y el volumen de datos, los modelos desarrollan capacidades para las que no fueron programados explícitamente. Por ejemplo:</p>

<ul>
  <li>Resolución aproximada de problemas aritméticos.</li>
  <li>Traducción directa entre idiomas que no formaban parte de su entrenamiento principal.</li>
  <li>Razonamiento analógico básico.</li>
</ul>

<p>Este fenómeno se conoce como <strong>emergencia</strong> (<em>emergent abilities</em>). No significa que la IA haya desarrollado "comprensión" en un sentido humano, sino que la escala genera propiedades complejas que no se pueden deducir analizando sus componentes por separado.</p>

<p>La existencia de estos comportamientos emergentes hace aún más difícil anticipar cómo reaccionará el sistema ante instrucciones novedosas.</p>

<h2>Conclusión: sí, un LLM es una “caja negra”</h2>

<p>Con todo lo anterior sobre la mesa, podemos afirmar —de manera rigurosa y sin dramatismos— que un LLM <strong>es una caja negra</strong>. Y no por arte de magia, sino por dos motivos puramente técnicos:</p>

<ol>
  <li><strong>Es inescrutable a nivel causal.</strong> Aunque entendamos su arquitectura, el "porqué" de una respuesta concreta depende de interacciones distribuidas entre miles de millones de parámetros. No hay reglas explícitas ni pasos interpretables.</li>
  <li><strong>Falta de acceso a la información clave.</strong> En la mayoría de los modelos comerciales, carecemos de las piezas necesarias para auditar su comportamiento (pesos, datos, recetas de entrenamiento). En estos casos, literalmente solo vemos <strong>las entradas y las salidas</strong>.</li>
</ol>

<p>Esto explica por qué no podemos predecir de manera infalible qué responderá el modelo. Su función interna es colosal, no lineal, hipersensible al contexto y basa su conocimiento en un sistema distribuido.</p>

<h2>La variación es una funcionalidad, no un fallo</h2>

<p>En la práctica, la IA generativa optimiza la naturalidad, la fluidez y la creatividad. Que el modelo no responda siempre de la misma manera no indica que sea caótico; significa que está diseñado para elegir fluidamente entre varias continuaciones plausibles.</p>

<p><img src="{{ site.baseurl }}/img/es-la-inteligencia-artificial-generativa-una-caja-negra-04.svg" loading="lazy" alt="" width="750" height="422"></p>

<h2>¿Supone un problema esta variación?</h2>

<p>El hecho de que los LLM actuales <strong>no sean deterministas</strong> y <strong>cometan errores (alucinaciones)</strong> resulta inaceptable en ciertos escenarios críticos.</p>

<p>Podemos concluir que estos modelos "funcionan bastante bien" o, siendo precisos, que <strong>funcionan bien en promedio</strong>. Esto es fantástico para muchas tareas, pero insuficiente para otras.</p>

<p>Por ejemplo, es perfectamente válido usar un LLM para pulir este artículo: no es una tarea crítica y el resultado final se publica bajo mi supervisión y criterio humano. Pero hagámonos las siguientes preguntas:</p>

<ul>
  <li>¿Dejarías una decisión médica de vida o muerte en manos de un sistema que funciona bien “en promedio”?</li>
  <li>¿Dejarías que pilotara un avión comercial un agente que funciona bien “en promedio”?</li>
  <li>¿Permitirías que programara la seguridad de una central nuclear un asistente que funciona bien “en promedio”?</li>
</ul>

<p>La respuesta es un rotundo no.</p>

<p>Por esta razón, la comunidad científica y técnica está invirtiendo enormes esfuerzos en <strong>entender, acotar y controlar</strong> el funcionamiento de estos modelos. El gran reto actual de la inteligencia artificial es la <strong>interpretabilidad</strong>: avanzar desde el <em>"el modelo suele acertar"</em> hacia el <em>"sabemos exactamente cuándo acierta, cuándo falla, por qué lo hace y cómo garantizar su control"</em>.</p>