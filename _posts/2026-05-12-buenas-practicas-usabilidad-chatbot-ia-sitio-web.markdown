---
layout:        post
title:         "Buenas prácticas de usabilidad para el chatbot de IA de tu sitio web"
subtitle:      "13 recomendaciones ilustradas con ejemplos reales para ofrecer una buena experiencia de usuario"
description:   "Cómo diseñar chatbots de IA en sitios web con buena usabilidad: 13 recomendaciones respaldadas por estudios de NN/Group."
date:          2026-05-12 10:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-120.jpg"
tags:          [buenas prácticas de usabilidad, inteligencia artificial]
---

<p>Proporcionar un <strong>chatbot de IA integrado en el sitio web</strong> se está convirtiendo en una <strong>funcionalidad estándar</strong> en numerosos sitios web o aplicaciones. Resulta fundamental ofrecer una buena experiencia de usuario para que los usuarios lo encuentren útil y quieran volver a utilizarlo.</p>

<p>En <a href="https://www.nngroup.com/" target="_blank" rel="noopener noreferrer">NN/Group</a> —prestigiosa agencia de expertos en UX— han publicado muy recientemente (abril del 2026) un interesante artículo con <a href="https://www.nngroup.com/articles/ai-chatbots-design-guidelines/" target="_blank" rel="noopener noreferrer">recomendaciones de usabilidad derivadas de la observación de personas usuarias reales interactuando con chatbots de IA</a> integrados en la web. Es decir, se trata de un <strong>estudio de campo</strong>, por lo que no se basa en suposiciones, sino en la <a href="{{ site.baseurl }}{% post_url 2023-05-04-que-es-un-test-de-usabilidad-con-personas-usuarias %}">observación real</a>. El artículo está firmado por <a href="https://www.nngroup.com/articles/author/georgia-kenderova/" target="_blank" rel="noopener noreferrer">Georgia Kenderova</a>, <a href="https://www.nngroup.com/articles/author/maria-rosala/" target="_blank" rel="noopener noreferrer">Maria Rosala</a> y <a href="https://www.nngroup.com/articles/author/tanner-kohler/" target="_blank" rel="noopener noreferrer">Tanner Kohler</a> y expone 10 buenas prácticas de usabilidad para chatbots de IA.</p>

<p>Dado el rigor y la profesionalidad que caracteriza los estudios de NN/Group, me ha parecido interesante hacerme eco de sus hallazgos y exponerlos en español (el artículo original está escrito en inglés). Además, para aportar valor añadido, los he ilustrado con capturas de pantalla o <em>wireframes</em> con ejemplos en español para acercar este interesante contenido al entorno hispanohablante. Y <strong>he añadido tres recomendaciones adicionales</strong> de cosecha propia que no se mencionan explícitamente en el artículo original.</p>

<h2>1. Deja claro desde el principio qué puede y qué no puede hacer el chatbot</h2>

<p>Cuando las personas usuarias lo abren por primera vez, <strong>el chatbot debería indicar de forma clara y concisa qué puede hacer</strong>.</p>

<p>Me parece uno de los puntos más importantes a tener en cuenta. ChatGPT y Gemini saben de todo y responden a cualquier pregunta que les hagamos. Salvo, quizás, para responder preguntas relacionadas con nuestro contenido propio. Con contenido exclusivo o específico de nuestro sitio web.</p>

<p>Los chatbots de IA integrados en un sitio web tienen un objetivo diferente a las IAs generalistas, el valor añadido que pueden ofrecer es resolver dudas o consultas específicas de nuestro contexto o negocio. Son chatbots que tienen acceso a nuestro contenido. Pero quizá no a todo él. O se encuentran limitados en algún área de conocimiento propia de nuestro contexto. Pero la persona usuaria no lo sabe, y es vital que le mostremos desde el principio <strong>qué tipo de dudas puede resolver nuestro chatbot</strong>.</p>

<p>Los saludos genéricos o la ausencia de sugerencias de preguntas no ajustan las expectativas de los usuarios y darán por supuesto que el chatbot puede resolverles cualquier tipo de consulta.</p>

<p>Por ejemplo, el mensaje inicial de la Administració Oberta de Catalunya es muy genérico.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-06.webp" loading="lazy" alt="" width="750" height="480"></p>

<p><strong>Indica en el mensaje introductorio los temas o tareas en los que el chatbot puede ayudar</strong>.</p>

<p>El asistente de la web del Gobierno de Grecia es también demasiado genérico.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-07.webp" loading="lazy" alt="" width="750" height="478"></p>

<p>Un buen ejemplo lo tenemos en el chatbot de la Seguridad Social.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-08.webp" loading="lazy" alt="" width="750" height="436"></p>

<p>Ahora bien, el mensaje inicial no debería abrumar con explicaciones detalladas, sino indicar de forma sencilla qué puede esperar el usuario. El caso de Iberia es un buen ejemplo en este sentido.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-09.webp" loading="lazy" alt="" width="750" height="733"></p>

<p>Si queremos ir a por nota, <strong>el mensaje inicial debería adaptarse a la página en la que se encuentra la persona usuaria</strong>. Es lo que hace Rufus, el asistente de IA de Amazon. La página de inicio me muestra unas sugerencias diferentes a la que se muestra en la página de un producto concreto como el Apple MacBook Neo.</p>

<div class="row">
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-10.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-11.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
</div>

<h2>2. Mantén el chatbot accesible en todas las páginas</h2>

<p>Es un principio básico el <strong>ser consistentes con el aprendizaje previo</strong> del usuario. Si le hemos acostumbrado a que el acceso al chatbot de nuestra web es un botón flotante en el extremo inferior derecho de la página, por ejemplo, no deberíamos hacerlo desaparecer en algunas secciones del sitio. Un chatbot que desaparece entre páginas es un chatbot que los usuarios acabarán dejando de utilizar.</p>

<p>En la web de Iberia tienen un chatbot de IA presente en casi todas las páginas del sitio web.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-02.webp" loading="lazy" alt="" width="750" height="333"></p>

<p>No así en el apartado de gestión de reservas.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-03.webp" loading="lazy" alt="" width="750" height="422"></p>

<p>Un hecho curioso, máxime teniendo en cuenta que el chatbot está diseñado precisamente para ayudar con la gestión de reservas.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-04.webp" loading="lazy" alt="" width="750" height="769"></p>

<h2>3. Conserva el historial del diálogo entre todas las páginas</h2>

<p>Esta pauta no está incluida en el decálogo de NN/Group, pero me parece un requisito imprescindible. Imagina que estableces un diálogo con el chatbot y que en una de sus respuestas te ofrece un enlace interno a otra página del sitio. Lo esperable sería que, en la página de destino, el chatbot permaneciese abierto y conservase el historial de la conversación. Al menos durante la sesión vigente.</p>

<p>Afortunadamente, no es fácil encontrar ejemplos de chatbots que presenten este problema. Un caso es el de la Seguridad Social en España. En su chatbot, el historial de la conversación no solo se pierde cuando navegamos a otra página del sitio web, sino también, lo cual es aún peor, se pierde cada vez que cerramos la ventana del chatbot.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-05.gif" loading="lazy" alt="" width="750" height="401"></p>

<h2>4. Un chatbot consciente del contexto ofrece respuestas mucho más relevantes</h2>

<p><strong>El chatbot debería conocer la página del sitio web en la que se encuentra el usuario</strong> y tenerla en cuenta si la pregunta que lanza el usuario está relacionada.</p>

<p>En Leroy Merlin, por ejemplo, si nos encontramos en una página de producto, el usuario esperaría que el chatbot fuese sensible al contexto. Pero no es así.</p>

<p><a href="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-12-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-12.webp" loading="lazy" alt="" width="750" height="348"></a></p>

<p>Sin embargo, en Amazon, su chatbot responde en relación a la página de producto en la que nos encontramos.</p>

<div class="row">
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-13.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-14.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
</div>

<h2>5. Ofrece preguntas sugeridas relevantes como botones, no como texto</h2>

<p>Hay dos momentos principales en los que los chatbots pueden mostrar sugerencias de preguntas:</p>

<ul>
    <li><strong>Cuando el usuario abre el chatbot por primera vez.</strong></li>
    <li><strong>Después de que el chatbot responda</strong>, especialmente si hay más información relevante que el usuario podría explorar.</li>
</ul>

<p><strong>Las sugerencias reducen el esfuerzo del usuario porque eliminan la necesidad de formular preguntas desde cero.</strong></p>

<p>Para facilitar su uso, <strong>las preguntas sugeridas deberían mostrarse como botones</strong> clicables y no como texto plano. Esto evita escritura innecesaria y permite ofrecer múltiples sugerencias sin resultar pesado con mucho texto.</p>

<p>Anteriormente hemos visto ejemplos de buenas preguntas o <strong>sugerencias de inicio</strong>. Por ejemplo, en la Seguridad Social.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-08.webp" loading="lazy" alt="" width="750" height="436"></p>

<p>Las <strong>preguntas adicionales y relacionadas</strong> que el chatbot puede sugerir después de proporcionar una respuesta pueden ser muy útiles si son relevantes y no repetitivas.</p>

<p>Una participante en el estudio de NN/Group manifestó que le habían gustado mucho las preguntas de seguimiento porque le habían hecho reparar en cuestiones en las que no había pensado.</p>

<p>Un buen ejemplo son las <strong>preguntas de seguimiento</strong> que hace Rufus, el asistente de Amazon.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-15.webp" loading="lazy" alt="" width="360" height="800"></p>

<p>Las preguntas de seguimiento deberían responder al contexto de la conversación y no volver constantemente sobre temas que el usuario ya ha ignorado. Además, presentarlas como botones clicables hace mucho más sencillo continuar conversando.</p>

<p>En el siguiente ejemplo de Scouting America se echa en falta que las opciones de registro se presenten como botones y no en forma de pregunta en modo texto.</p>

<p><a href="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-16-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-16.webp" loading="lazy" alt="" width="750" height="348"></a></p>

<h2>6. Usa componentes expandibles para no abrumar con respuestas largas</h2>

<p>Las conversaciones con chatbots de IA pueden volverse largas rápidamente. En el artículo de NN/Group proponen mostrar la información adicional mediante componentes expandibles de tipo «acordeón». Sin embargo, no aportan ningún ejemplo de chatbot que aplique esta técnica. Por el contrario, mencionan el ejemplo de Rufus (el asistente de Amazon) que contiene enlaces de «más información» que en realidad lanzan una nueva pregunta al chatbot. Así comprobaron cómo los usuarios perdían el contexto y les resultaba difícil comparar opciones.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-19.gif" loading="lazy" alt="" width="380" height="844"></p>

<h2>7. No hagas autoscroll hasta el final de la respuesta</h2>

<p>Algunos chatbots desplazan automáticamente la conversación hasta el final de las respuestas largas, obligando a los usuarios a volver hacia arriba para leer desde el principio.</p>

<p>Este comportamiento resulta especialmente confuso y molesto cuando el chatbot muestra la respuesta progresivamente mientras la genera.</p>

<p>El chat de Qwen lo hace así en estos momentos.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-20.gif" loading="lazy" alt="" width="750" height="508"></p>

<p>Si una respuesta es más larga que el área visible del chat, <strong>mantén la posición del usuario al principio del nuevo mensaje en lugar de desplazarlo al final</strong>.</p>

<p>En sus inicios, ChatGPT también adolecía de este problema, pero actualmente ya lo han corregido.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-21.gif" loading="lazy" alt="" width="750" height="508"></p>

<h2>8. Incluye imágenes en las respuestas, no solo enlaces o descripciones textuales</h2>

<p>Los chatbots de IA están basados en los llamados LLM (Large Language Model) o modelos extensos de lenguaje. Es decir, <a href="{{ site.baseurl }}{% post_url 2026-02-21-como-funciona-la-inteligencia-artificial-generativa %}">trabajan con palabras</a>. Por eso, incluso en los productos punteros de IA, como ChatGPT o Gemini, la inclusión de imágenes en las respuestas es algo relativamente reciente. Sin embargo, a los humanos nos encantan las imágenes y nos ayudan "más que mil palabras" a entender ciertas respuestas.</p>

<p>Hay casos claros en los que las respuestas del chatbot se benefician enormemente si incluyen fotografías u otro tipo de elementos visuales. Por ejemplo, en la <strong>exploración de productos</strong> o en las <strong>instrucciones</strong> para aprender a utilizar una determinada herramienta.</p>

<p>Tenemos un buen ejemplo en el chatbot de Leroy Merlin.</p>

<p><a href="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-17-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-17.webp" loading="lazy" alt="" width="750" height="348"></a></p>

<p>En otro sitio web, a la misma pregunta sobre pintura naranja, la respuesta inicial es de solo texto.</p>

<p><a href="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-18-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-18.webp" loading="lazy" alt="" width="750" height="482"></a></p>

<p>Nota: en favor de esta web hay que decir que, inmediatamente después de esta respuesta, haciendo scroll, se muestran fotografías de los productos.</p>

<h2>9. Haz que el campo de texto crezca a medida que el usuario escribe</h2>

<p>Esta pauta no está incluida en el decálogo de NN/Group, pero me parece un requisito muy recomendable. Sabemos por la experiencia de muchos años de diseñar formularios que <a href="{{ site.baseurl }}{% post_url 2021-03-28-formularios-usables-consejos-de-diseno %}">el espacio disponible para escribir condiciona al usuario</a>. De modo que si el campo para escribir la petición o pregunta de la persona usuaria es reducido, desincentivará e incluso dificultará la escritura de <em>prompts</em> más extensos.</p>

<p><video src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-23.webm" width="834" height="248" autoplay loop muted playsinline></video></p>

<p>La solución es que <strong>el campo del <em>prompt</em> crezca progresivamente a medida que el usuario escribe</strong>.</p>

<p><video src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-24.webm" width="834" height="353" autoplay loop muted playsinline></video></p>

<h2>10. Evita tener múltiples chatbots compitiendo por la atención del usuario</h2>

<p>Personalmente, no es un problema que me haya encontrado con frecuencia. En NN/Group, mencionan el caso del sitio web de Home Depot, que ofrece dos chatbots de IA que compiten entre sí por la atención del usuario. Tienen finalidades distintas, pero la persona usuaria no lo sabe de antemano. Obviamente no hay que hacer elegir al usuario entre múltiples chatbots diferentes. Si nuestra web ya cuenta con un chatbot, por ejemplo, para atención al cliente y queremos incorporar uno para resolver dudas sobre productos, <strong>deberemos combinarlos en un único chatbot</strong>.</p>

<p>Lo ideal es que haya un único chatbot claramente identificado que trate de resolver mediante IA todo lo que pueda y que escale las preguntas a humanos cuando sea necesario.</p>

<p>Me ha resultado difícil encontrar un ejemplo en español de este problema. Quizá el que más se asemeja es el caso de la web de PcComponentes, que llega a mostrar tres puntos de acceso diferentes a un mismo servicio de chatbot de IA.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-01.webp" loading="lazy" alt="" width="750" height="654"></p>

<p>Cuantas más opciones tenga el usuario a la vista, <a href="{{ site.baseurl }}{% post_url 2017-03-07-tip-2-usabilidad-unifica-funcionalidades-similares %}">más le costará tomar una decisión</a>.</p>

<h2>11. Permite maximizar la ventana de chat</h2>

<p>El formato más extendido actualmente para mostrar un chatbot de IA integrado en la web es un widget flotante en el extremo inferior derecho de la ventana del navegador. Al clicar sobre él, se abre una pequeña ventana vertical superpuesta en la que se conversa con el chatbot. Como en el caso de la Administració Oberta de Catalunya.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-06.webp" loading="lazy" alt="" width="750" height="480"></p>

<p>En este tipo de interfaces, el espacio disponible puede ser reducido. Bien porque el usuario quiere extender la conversación y necesita un entorno más cómodo o bien porque las respuestas del bot se beneficiarían de una ventana de diálogo de mayor tamaño. Por ejemplo, si muestran respuestas enriquecidas con mapas, imágenes de producto, descripciones largas o listas extensas.</p>

<p>Una solución sencilla es incorporar un botón que permita maximizar la ventana del chatbot.</p>

<p><a href="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-22-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-22.webp" loading="lazy" alt="" width="750" height="348"></a></p>

<h2>12. Añade un botón para copiar la respuesta al portapapeles</h2>

<p>Hay ocasiones en las que el chatbot genera un contenido que el usuario puede querer consultar más adelante o compartirlo con alguien.</p>

<p>Los chats de IA más avanzados —ChatGPT, Gemini, etc.— ofrecen funcionalidades como compartir mediante un enlace, descargar a formatos como Word o <strong>copiar el contenido de una respuesta al portapapeles del sistema operativo</strong>. Precisamente esta última funcionalidad —botón de copiar la respuesta— es relativamente sencilla de implementar en el chatbot de IA de nuestra web y deberíamos incluirla. Sin embargo, es un patrón que aún no se encuentra muy extendido y es difícil encontrarlo en webs institucionales o <em>retail</em>.</p>

<p>Recientemente lo he planteado en el <em>wireframe</em> de la solución de <a href="https://www.adimedia.net/" target="_blank" rel="noopener noreferrer">Adimedia</a> de asistente IA.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-26.webp" loading="lazy" alt="" width="750" height="550"></p>

<h2>13. No todos los usuarios quieren escribir: ofrece la opción de dictar los mensajes</h2>

<p>No todas las personas usuarias quieren escribir sus mensajes. Personalmente he observado que <strong>algunas personas</strong>, cuando utilizan un chatbot —en especial desde el móvil—, <strong>tienden de forma natural a dictar sus mensajes</strong>.</p>

<p>La entrada por voz es una funcionalidad muy recomendable. No tanto en el móvil, sino en especial en dispositivos de escritorio. En el móvil no es tan necesaria porque el propio sistema operativo permite dictar desde el teclado. Pero en equipos de escritorio la funcionalidad debería estar disponible. Como la tienen todos los "grandes jugadores" de IA.</p>

<p><img src="{{ site.baseurl }}/img/buenas-practicas-usabilidad-chatbot-ia-25.webp" loading="lazy" alt="" width="750" height="98"></p>

<p>Estas han sido mis buenas prácticas de usabilidad para chatbots de IA. ¿Se te ocurre alguna más que debería incluir?👉 Te invito a proponerla en los <a href="https://www.linkedin.com/posts/aunitz_buenas-pr%C3%A1cticas-de-usabilidad-para-el-chatbot-share-7459971416323600384-3Xfw" target="_blank" rel="noopener noreferrer">comentarios de esta publicación en LinkedIn</a>.</p>
