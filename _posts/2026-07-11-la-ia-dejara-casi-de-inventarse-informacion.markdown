---
layout:        post
title:         "La IA dejará (casi) de inventarse información"
subtitle:      "“No lo sé”: la respuesta que está acabando con las alucinaciones de la IA"
description:   "Los modelos de IA inventan cada vez menos. Repasamos el estudio de OpenAI sobre alucinaciones y experimentos propios replicados en 2026."
date:          2026-07-11 18:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-05.jpg"
tags:          [inteligencia artificial]
---

<p>Las denominadas “<strong>alucinaciones</strong>” (<em>hallucinations</em>) son <strong>información inventada por la IA</strong>. Son afirmaciones plausibles pero falsas generadas por modelos de lenguaje de gran tamaño (LLM).</p>

<p>Sin embargo, si llevas varios años utilizando modelos de lenguaje frontera, habrás observado que <strong>cada vez se inventan menos cosas</strong>. Al inicio de ChatGPT y otros modelos era muy habitual encontrarse con alucinaciones. Esta realidad está evolucionando muy rápidamente. Los últimos modelos (como GPT-5.5, Gemini 3.5, Claude Sonnet 5, etc.) se inventan mucha menos información que antes y <strong>ya se atreven a responder con un “No lo sé” o un “No dispongo de la información sobre”</strong>.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-robot-pensando.webp" loading="lazy" alt="Robot con un signo de interrogación sobre la cabeza, representando la incertidumbre de una IA al responder" width="750" height="422"></p>

<p>No soy de los que suelen hacer predicciones sobre el futuro y menos aún de los que suelen acertarlas 😉, pero me atrevo a afirmar que <strong>los datos inventados por los modelos se irán reduciendo cada vez más</strong>. Otra cuestión distinta es que hagan afirmaciones o interpretaciones discutibles. Lo cual será inevitable, en tanto en cuanto han sido entrenados con contenido que también es interpretable o discutible en algunos temas.</p>

<p>En septiembre de 2025 investigadores de OpenAI publicaron un <em>paper</em> titulado “<a href="https://arxiv.org/abs/2509.04664" target="_blank" rel="noopener noreferrer">Why Language Models Hallucinate</a>”. Investigación sobre la cual en la web de OpenAI se publicó un <a href="https://openai.com/es-ES/index/why-language-models-hallucinate/" target="_blank" rel="noopener noreferrer">resumen accesible para todos los públicos y traducido al español</a>.</p>

<p>En el artículo de OpenAI se explican con mucha claridad dos cuestiones fundamentales:</p>

<ul>
    <li>Por qué los modelos de lenguaje se inventan información</li>
    <li>Cómo se inventan información</li>
</ul>

<p>Tras estudiarlo con detenimiento, he concluido que: si los incentivos para inventarse información disminuyen, técnicamente es factible reducir drásticamente las alucinaciones de la IA.</p>

<p>Mi predicción de que la IA dejará muy pronto de inventarse información se deriva de la opinión de que los incentivos para que se inventen información realmente se reducirán con rapidez porque es una demanda insistente de las personas usuarias. Y las empresas desarrolladoras de los modelos de lenguaje buscan satisfacer a los usuarios para ganar más dinero.</p>

<p>El título de este post lleva el término “casi”. Al final explico el motivo por el que creo que la información “inventada” no desaparecerá del todo.</p>

<h2>Por qué los modelos de lenguaje se inventan información</h2>

<p><strong>OpenAI atribuye la culpa a los sistemas de evaluación</strong>. Es decir, a las métricas que se utilizan principalmente para elaborar los rankings de los mejores modelos. Lo cual me resuena a la <a href="{{ site.baseurl }}{% post_url 2025-04-13-ley-de-campbell %}">ley de Campbell</a> o a la de Goodhart.</p>

<p>Los procedimientos estándar de entrenamiento y evaluación premian más la elaboración de una conjetura que el reconocimiento de que algo se desconoce.</p>

<p>Me gusta uno de los ejemplos que aportan en el artículo de OpenAI. Los <em>benchmarks</em> de IA actuales son como un examen tipo test en el que se obtiene 1 punto por acierto y 0 por dejar en blanco la respuesta o decir “no lo sé”. Al no haber penalización por contestar incorrectamente, el alumno prefiere contestar a todas las preguntas, aunque no conozca la respuesta.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-examen-tipo-test.webp" loading="lazy" alt="Hoja de examen tipo test con una respuesta marcada que suma un punto y una pregunta sin responder que obtiene cero puntos" width="750" height="422"></p>

<p>En OpenAI abogan por modificar el sistema de evaluación de los <em>benchmarks</em> existentes que dominan los rankings para que dejen de penalizar la abstención cuando hay incertidumbre.</p>

<p>Otro ejemplo que aporta el artículo de OpenAI es ilustrativo del juego de probabilidades que pervierte los actuales sistemas de evaluación. Supongamos que se le pregunta a un modelo de lenguaje por la fecha de cumpleaños de alguien, pero no lo sabe. Si, al azar, dice “10 de septiembre”, tiene una probabilidad entre 365 de acertar. Responder “no lo sé” le garantiza cero puntos. Tras miles de preguntas de prueba, <strong>el modelo que se inventa información acaba obteniendo mejores resultados en las tablas de clasificación</strong> que un modelo más prudente que admite que no conoce la respuesta. Lo que motiva a los desarrolladores a crear modelos que realicen conjeturas en lugar de no dar una respuesta.</p>

<h2>Cómo se inventan información</h2>

<p>Sabemos que <a href="{{ site.baseurl }}{% post_url 2026-02-21-como-funciona-la-inteligencia-artificial-generativa %}">los modelos de lenguaje son preentrenados</a> (<em>pretraining</em>) con enormes cantidades de texto. El modelo ha aprendido de millones de ejemplos de texto fluido a predecir la siguiente palabra. <strong>El modelo no memoriza frases: aprende una distribución de probabilidad sobre el lenguaje.</strong> Su trabajo es que <strong>el texto que genera se parezca estadísticamente al texto que vio</strong>.</p>

<p>El <em>paper</em> de OpenAI explica el mecanismo de invención de la información que desarrollan los modelos de lenguaje mediante un enfoque puramente estadístico. Explican cómo la información inventada surge del proceso estadístico de predicción de la siguiente palabra. La naturaleza de la información inventada es probabilística.</p>

<p>Podemos visualizar los textos de preentrenamiento del modelo como una gigantesca biblioteca. En esa biblioteca hay dos tipos de información muy distintos.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-biblioteca.webp" loading="lazy" alt="Estantería con muchos libros repetidos a un lado y un único libro aislado al otro, como metáfora de patrones frecuentes y datos únicos en el entrenamiento" width="750" height="422"></p>

<p>Por un lado, información con un patrón claro. “París es la capital de Francia” aparece miles de veces, en miles de textos, siempre igual. El modelo ve tanta repetición que la señal estadística es clarísima: ante “la capital de Francia es...”, la continuación correcta domina abrumadoramente. Aquí el modelo casi nunca falla.</p>

<p>Por otro lado, tenemos información arbitraria. El cumpleaños de una investigadora poco conocida, digamos “Marta Ibáñez nació el 14 de marzo de 1971”, aparece exactamente una vez en toda la biblioteca. Y aquí está el problema: no hay ningún patrón que aprender. Nada en el nombre “Marta Ibáñez” permite deducir que nació en marzo y no en octubre. Es un dato tan arbitrario como el resultado de tirar un dado.</p>

<p><strong>Si forzamos al modelo a contestar (para salir bien parado en los <em>benchmarks</em>)</strong>, marzo, octubre o diciembre tendrán la misma probabilidad de aparecer en la respuesta.</p>

<h2>En menos de un año los ejemplos del paper han quedado obsoletos</h2>

<p>En el <em>paper</em> de OpenAI explican cómo en <strong>mayo de 2025</strong> realizaron algunos miniexperimentos con modelos frontera de aquel momento.</p>

<p>El primer miniexperimento consistió en preguntar por la fecha de cumpleaños de Adam Tauman Kalai (uno de los autores del artículo). Lo probaron solo con un modelo. Fue DeepSeek-V3, accedido a través de la <em>app</em> de DeepSeek el 11 de mayo de 2025. En tres intentos separados dio tres fechas incorrectas ("03-07", "15-06" y "01-01"), pese a que el <em>prompt</em> pedía responder solo si se conocía la respuesta.</p>

<p>El segundo experimento consistió en preguntar por el título de la tesis doctoral de Kalai. Aquí usaron tres modelos populares, accedidos gratuitamente el 9 de mayo de 2025: ChatGPT (GPT-4o) vía chatgpt.com, DeepSeek (R1) vía su <em>app</em>, y Llama-4-Scout-17B-16E-Instruct vía Hugging Face. Para la prueba se les bloqueó el acceso a la web. Ninguno generó el título ni el año correctos: cada uno inventó un título, una universidad y un año distintos.</p>

<p>El <em>paper</em> incluye un tercer miniexperimento de alucinación intrínseca: preguntar cuántas D hay en “DEEPSEEK”. DeepSeek-V3 respondió “2” o “3” en diez intentos independientes, y Meta AI (meta.ai) y Claude 3.7 Sonnet (claude.ai) rindieron de forma similar, con respuestas de hasta “6” y “7”. El experimento se realizó en mayo de 2025.</p>

<h3>Primer miniexperimento en julio de 2026</h3>

<p>He replicado el primer miniexperimento del paper el 11 de julio de 2026, accediendo a ChatGPT con el navegador en modo incógnito y sin iniciar sesión. La respuesta es perfecta: “No lo sé”.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-primer-experimento-chatgpt-no-lo-se.webp" loading="lazy" alt="ChatGPT responde «No lo sé» a una pregunta sobre la fecha de nacimiento de Adam Tauman Kalai" width="660" height="231"></p>

<p>Le he preguntado a Claude y a DeepSeek, y ambos han respondido que no lo saben.</p>

<h3>Segundo miniexperimento en julio de 2026</h3>

<p>Para el segundo experimento he tenido que añadir al <em>prompt</em> original del paper la instrucción adicional “No busques en Internet” porque las interfaces actuales de los modelos frontera disponen habitualmente de acceso a Internet y buscaban la respuesta en la web y respondían correctamente la pregunta.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-segundo-experimento-chatgpt-no-lo-se.webp" loading="lazy" alt="ChatGPT responde que no puede afirmar con confianza el título de la tesis doctoral de Adam Kalai y concluye «no lo sé»" width="663" height="307"></p>

<p>Tanto ChatGPT como Claude y DeepSeek han respondido que no lo saben.</p>

<h3>Tercer miniexperimento en julio de 2026</h3>

<p>Este es el único de los tres miniexperimentos que continúa en vigor. Preguntando a ChatGPT, Claude y DeepSeek en chats de incógnito, la mayor parte de las veces han respondido “2”. En algunas ocasiones también dan con la respuesta correcta.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-tercer-experimento-sonnet-2.webp" loading="lazy" alt="Claude Sonnet 5 responde «2» a la pregunta de cuántas D tiene DEEPSEEK en un chat de incógnito" width="723" height="496"></p>

<p>Este experimento es muy interesante porque me sirve para mantener el “casi” en el título de este <em>post</em>. Entiendo que siempre habrá casos en los que la IA responda de manera incorrecta. Ya no tanto porque invente datos o información, sino porque el modelo estadístico no está preparado para resolver todo tipo de problemas.</p>

<p>Ahora bien, los procesos de “razonamiento” que incorporan los modelos más avanzados descomponen los problemas en partes y hacen revisiones y validaciones de sus respuestas iniciales, lo cual evita, en gran parte, que las respuestas inicialmente incorrectas lleguen a los usuarios. Por ejemplo, Claude Sonnet 5 falla a veces en este miniexperimento, pero Claude Fable 5 no.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-tercer-experimento-fable-1.webp" loading="lazy" alt="Claude Fable 5 responde «1» a la pregunta de cuántas D tiene DEEPSEEK en un chat de incógnito" width="723" height="496"></p>

<h2>OpenAI refuta la afirmación de que es inevitable que los modelos se inventen información</h2>

<p>Hemos visto cómo, en cuestión de meses, los modelos frontera han modificado su comportamiento incrementando sustancialmente las veces que responden “no lo sé”.</p>

<p>En el <a href="https://openai.com/es-ES/index/why-language-models-hallucinate/" target="_blank" rel="noopener noreferrer">artículo de la web de OpenAI</a> aportan unos datos muy interesantes a este respecto.</p>

<p><img src="{{ site.baseurl }}/img/la-ia-dejara-casi-de-inventarse-informacion-grafico-tasa-abstencion.webp" loading="lazy" alt="Gráfico comparativo de OpenAI: gpt-5-thinking-mini muestra 52 % de abstención, 22 % de precisión y 26 % de error, frente a o4-mini con 1 %, 24 % y 75 % respectivamente" width="750" height="422"></p>

<p>La tasa de abstención mide las veces que el modelo no ofrece una respuesta concreta; la tasa de precisión, las que acierta con una respuesta correcta; y la tasa de error, las que responde de forma incorrecta.</p>

<p>El modelo de OpenAI o4-mini se lanzó en abril del 2025. gpt-5-thinking-mini es de agosto del 2025. El enorme cambio de comportamiento del modelo más reciente es que <strong>su tasa de abstención se ha disparado</strong>, mientras que la tasa de precisión se ha mantenido estable. Y son datos de hace un año.</p>

<p>Conclusión: los modelos no están mejorando su tasa de precisión; lo que hacen es decir “no lo sé” mucho más que antes, y añado que buscan en la web las respuestas que desconocen.</p>

<p>OpenAI afirma en el artículo que no es cierto que sea inevitable que los modelos se inventen información. Los expertos conocen los mecanismos estadísticos a través de los cuales los modelos inventan información y se les recompensa por ello en las evaluaciones. No es algo totalmente inevitable ni misterioso. Afirman que, si se replantean las métricas de evaluación principales, el comportamiento de los modelos cambiará. Ya lo estamos viendo: los datos lo confirman y la tendencia irá a más.</p>