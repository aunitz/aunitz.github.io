---
layout:        post
title:         "Cómo funciona la inteligencia artificial generativa"
subtitle:      "Conceptos clave para entenderla y utilizarla con criterio"
description:   "Explicación de cómo funcionan los LLM: arquitectura Transformer, predicción probabilística de palabras en espacios multidimensionales y sus limitaciones."
date:          2026-02-21 18:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-113.jpg"
tags:          [inteligencia artificial]
---

<p>La <strong>inteligencia artificial generativa</strong> es una herramienta profundamente disruptiva para las trabajadoras y los trabajadores del conocimiento. Para utilizarla con éxito y, sobre todo, con criterio, merece la pena invertir tiempo en comprenderla más allá de un uso meramente instrumental como usuarios.</p>

<p>He leído numerosos artículos y he visto muchos vídeos sobre el funcionamiento interno de la IA, sobre sus <em>tripas</em>. Uno de los contenidos más didácticos con los que me he encontrado recientemente es una ponencia del médico y catedrático <a href="https://universidadeuropea.com/profesores/juan-jose-beunza-nuin/" target="_blank" rel="noopener noreferrer">Juan José Beunza Nuin</a> en el marco de la <a href="https://www.fundacionbiomedica.es/event/i-jornada-cientifica-de-medicina-digital/" target="_blank" rel="noopener noreferrer">I Jornada Científica de Medicina Digital</a>, celebrada en diciembre de 2025 en Pontevedra (España).</p>

<p>El doctor Juan José Beunza Nuin es una voz autorizada en la aplicación de la IA en entornos sanitarios: director del grupo de trabajo IASalud-UEM y editor y autor principal del <em>Manual Práctico de inteligencia artificial en Entornos Sanitarios</em> (Elsevier, 2020; segunda edición en 2023). La ponencia a la que me refiero <a href="https://www.youtube.com/live/fu50SzfOjSU?si=3MwXucYfxTIGlLDQ&t=9165" target="_blank" rel="noopener noreferrer">puede verse completa en YouTube</a>.</p>

<p>Durante los primeros minutos de la charla explica de forma muy clara y accesible qué es un <strong>LLM (Large Language Model)</strong> o <strong>modelo extenso de lenguaje</strong>, es decir, lo que son ChatGPT, Gemini, Copilot, DeepSeek, Claude, Grok, etc. Como ocurre en toda explicación dirigida a un público amplio sobre una tecnología compleja, el ponente introduce algunas simplificaciones. Aun así, considero que expone con gran claridad las bases de la tecnología subyacente a un LLM.</p>

<p>En este artículo incorporaré, además, alguna simplificación adicional de cosecha propia, con el objetivo de quedarnos con la esencia de cómo funcionan estos modelos.</p>

<h2>El nacimiento de la arquitectura Transformer</h2>

<p>En <strong>2017</strong>, ocho autores que trabajaban en <strong>Google</strong> publicaron el artículo científico <a href="https://research.google/pubs/attention-is-all-you-need/" target="_blank" rel="noopener noreferrer"><em>Attention is All You Need</em></a>, en el que se introdujo una nueva arquitectura de red neuronal denominada <strong>Transformer</strong>. Este trabajo supuso un auténtico cambio de paradigma.</p>

<figure>
    <img src="{{ site.baseurl }}/img/como-funciona-la-inteligencia-artificial-01.webp" loading="lazy" alt="" width="450" height="663" class="center-block">
    <figcaption>
        Arquitectura del Transformer
    </figcaption>
</figure>

<p>Los investigadores de Google propusieron la arquitectura Transformer en un contexto muy ligado a la traducción automática (Google Translate). Sin embargo, fue <strong>OpenAI</strong> quien dio el siguiente paso al convertir esta arquitectura en un modelo generativo de lenguaje, creando <strong>GPT</strong> en <strong>2018</strong>.</p>

<p><img src="{{ site.baseurl }}/img/como-funciona-la-inteligencia-artificial-04.webp" loading="lazy" alt="" width="720" height="405"></p>

<h2>Cómo genera texto un LLM</h2>

<p>Gracias a la arquitectura Transformer, cuando un modelo está generando texto <strong>es capaz de tener en cuenta todas las palabras anteriores</strong> de la frase antes de proponer la siguiente.</p>

<p>En la frase:</p>

<blockquote>"En invierno y con mucho frío cae la blanca → ?"</blockquote>

<p>el modelo tiene en cuenta simultáneamente “invierno”, “mucho”, “frío” y “blanca”, relacionándolas entre sí para <strong>predecir matemáticamente la siguiente palabra</strong>. En este caso, la predicción correcta será “blanca → nieve”, y no, por ejemplo, “blanca → camiseta”, “blanca → harina” o “blanca → nube”. Al considerar todas las palabras previas a la vez, la probabilidad de acierto aumenta de forma significativa.</p>

<p><img src="{{ site.baseurl }}/img/como-funciona-la-inteligencia-artificial-02.webp" loading="lazy" alt="" width="734" height="327"></p>

<p>Ahora bien, simplificando mucho, <strong>todo es una cuestión de probabilidades y matemáticas</strong>. El LLM <strong>no piensa</strong>, <strong>no entiende</strong> lo que dice y <strong>no sabe si lo que genera es verdadero o falso</strong>.</p>

<p>Al conjunto de palabras que el modelo tiene en cuenta para predecir la siguiente palabra de la secuencia se le denomina <strong>contexto</strong>.</p>

<p>Por eso habrás observado que, cuando utilizas ChatGPT durante sesiones muy largas, la calidad puede resentirse. A veces ocurre porque la conversación se acerca a los límites de su ventana de contexto (y parte de lo anterior deja de “caber”); otras veces, simplemente, porque en un contexto muy extenso es más difícil priorizar lo relevante. De ahí que se hable de modelos con <strong>ventanas de contexto</strong> más grandes que otros.</p>

<h2>Cómo funciona un Transformer</h2>

<p>Veamos ahora, con algo más de detalle —aunque de forma necesariamente simplificada—, cómo funciona un Transformer.</p>

<p>Un Transformer no trabaja directamente con palabras, sino con <strong>tokens</strong>. Conviene mencionarlos porque seguramente hayas oído hablar de ellos. Un token puede corresponderse con una palabra completa, pero también con una parte de una palabra. Para simplificar esta explicación, asumiremos que una palabra equivale a un token y hablaremos de “palabras” para facilitar la comprensión.</p>

<p>Un Transformer convierte las palabras en números, más concretamente en <strong>vectores</strong>. Por ejemplo, la palabra <em>médico</em> podría estar definida por un vector de tres dimensiones como (6, 8, 1), y la palabra <em>paciente</em> por el vector (8, 6, 1).</p>

<p><img src="{{ site.baseurl }}/img/como-funciona-la-inteligencia-artificial-03.webp" loading="lazy" alt="" width="686" height="600"></p>

<p>Todas las palabras se representan en un espacio matemático. Las palabras conceptualmente cercanas —como <em>médico</em> y <em>paciente</em>— tienen entre sí un ángulo menor que palabras menos relacionadas, como <em>paciente</em> e <em>invierno</em>. Los conceptos cercanos tienden a quedar “próximos” en ese espacio. Lo que hace un LLM, simplificando mucho, es calcular estas distancias entre las palabras y, a partir de ahí, construir su respuesta.</p>

<p>En este ejemplo simplificado solo hemos utilizado tres dimensiones. En la realidad, los modelos extensos de lenguaje (LLM) <strong>se entrenan con billones de palabras</strong> y trabajan en un espacio multidimensional que suele tener en torno a <strong>12.000 dimensiones</strong>. Es decir, cada palabra está representada por un vector formado por miles de números.</p>

<p>Tal y como yo lo entiendo, cuando un LLM genera una respuesta aplica una capacidad de cálculo enorme sobre este gigantesco espacio multidimensional de palabras.</p>

<h2>Limitaciones de los LLM</h2>

<p>Los modelos generativos de lenguaje —como ChatGPT o Gemini— no son los únicos tipos de Transformers que existen. Hay otros, que darían para otro artículo y que quizá aborde en el futuro. Los <strong>LLM están especializados en generar texto</strong> y lo hacen, como hemos visto, mediante un mecanismo de <strong>relaciones asociativas basadas en probabilidad</strong>. Por este motivo, <strong>lo que generan no tiene por qué ser verdadero</strong>. No es su propósito ni el objetivo para el que fueron diseñados.</p>

<p>Cuando un modelo ha sido entrenado con información verídica y aquello por lo que le preguntamos se encuentra dentro de sus datos de entrenamiento, aumenta la probabilidad de que responda correctamente (aunque no es una garantía). Si no es así, puede inventar una respuesta. Y lo hará de una forma que suena muy verosímil y convincente. A este fenómeno se le ha denominado <strong>“alucinación” de la IA</strong>.</p>

<p>A día de hoy —y sin saber si esto cambiará en el futuro— <strong>los LLM fallan</strong>. No son sistemas 100 % fiables. Por eso <strong>requieren una supervisión humana constante y con criterio</strong>.</p>

<p>Tal y como explica Juan José Beunza hacia el final de su ponencia, la IA funciona especialmente bien cuando se parte de un buen profesional, con criterio, al que se forma en el uso adecuado de estas herramientas. El resultado es un <em>súper profesional</em>. En cambio, si se elimina por completo la supervisión humana, la IA cometerá errores que, en ámbitos como el sanitario, simplemente no son aceptables.</p>