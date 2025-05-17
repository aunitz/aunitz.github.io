---
layout:        post
title:         "Tamaño mínimo de los elementos interactivos"
subtitle:      "Para un diseño inclusivo"
description:   "Guía sobre el tamaño mínimo recomendado para elementos interactivos en interfaces digitales, considerando accesibilidad y usabilidad."
date:          2025-05-11 20:00:00 +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-107.jpg"
tags:          [buenas prácticas de usabilidad, accesibilidad]
---

<p>En un artículo de hace unos años escribía sobre el <a href="{{ site.baseurl }}{% post_url 2020-09-03-tamano-minimo-elementos-interactivos-dispositivo-tactil %}">tamaño mínimo recomendado para los elementos interactivos en dispositivos táctiles</a>. En el presente artículo me quiero referir al <strong>tamaño mínimo recomendado de cualquier elemento interactivo</strong> de un interfaz, independientemente de si se accede desde un dispositivo táctil o no.</p>

<p>Afortunadamente, disponemos de una guía que nos sacará de dudas: ni más ni menos que el <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">estándar internacional de accesibilidad WCAG 2.1</a>&nbsp;<sup id="fnref:fn-f1"><a href="#fn:fn-f1" class="footnote">1</a></sup>.</p>

<p>Las WCAG 2.1 consideran que el <strong>tamaño mínimo</strong> debe ser <strong>44x44 píxeles CSS</strong>.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-01.png" loading="lazy" alt="" width="720" height="261"></p>

<p>Es importante tener en cuenta que el tamaño mínimo se refiere al <strong>área de interacción</strong>, no necesariamente a la representación visual del elemento interactivo. Un ejemplo de ello sería un icono que represente el acceso al buscador: el icono de la lupa puede tener un tamaño inferior a 44×44 px, siempre que el área de interacción sí cumpla con el tamaño recomendado.</p>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-02.png" loading="lazy" alt="" width="720" height="262"></p>

<p>Las WCAG admiten <strong>algunas excepciones</strong> en las que se admite que el elemento interactivo tenga un tamaño menor. Las más relevantes son las siguientes:</p>

<ul>
	<li>Si el elemento es redundante. Es decir, que el elemento esté replicado y alguna de las réplicas sí respete el tamaño mínimo recomendado.</li>
	<li>Si el objetivo está incluido dentro de una oración o bloque de texto. Es decir, la excepción se aplica únicamente cuando el enlace forma parte del flujo natural de un texto, como en una frase o párrafo, no cuando está aislado o actúa como botón.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/tamano-minimo-elementos-interactivos-03.png" loading="lazy" alt="" width="720" height="859"></p>

<p>Esta pauta de las WCAG 2.1 es la <a href="https://www.w3.org/TR/WCAG21/#target-size" target="_blank" rel="noopener noreferrer">2.5.5</a> y pertenece al grupo de criterios que buscan que la web sea <strong>operable</strong> para todas las personas usuarias. Se trata de un criterio de nivel AAA, es decir, el más exigente. Sin embargo, ello no impide que sea <strong>más que recomendable tenerlo en cuenta</strong> en cualquier tipo de interfaz digital.</p>

<p>El objetivo de esta pauta es facilitar la interacción a las personas usuarias que tienen dificultades para actuar sobre objetivos pequeños, ya sea por <strong>temblores en las manos</strong>, <strong>destreza limitada</strong> u otras razones. Si el objetivo es demasiado reducido, puede resultar difícil acertar al pulsarlo.</p>

<p>Las WCAG mencionan algunos casos de uso en los que <strong>las personas usuarias se beneficiarán de cumplir con esta pauta</strong>:</p>

<ul>
	<li>Usuarios que utilizan un dispositivo móvil donde la pantalla táctil es el modo principal de interacción.</li>
	<li>Usuarios con problemas de movilidad, como temblores en las manos.</li>
	<li>Usuarios que utilizan un dispositivo móvil en entornos donde están expuestos a vibraciones, como el transporte público.</li>
	<li>Usuarios que tienen dificultades con los movimientos motores finos.</li>
	<li>Usuarios que acceden a un dispositivo con una mano.</li>
	<li>Usuarios con dedos grandes o que operan el dispositivo solo con una parte del dedo o nudillo.</li>
	<li>Los usuarios con baja visión podrán ver mejor el objetivo.</li>
</ul>

<p>Aunque 44x44 píxeles es la medida mínima, la WCAG recomienda que sea mayor cuando:</p>

<ul>
	<li>El control se deba usar frecuentemente.</li>
	<li>El resultado de su interacción no se pueda deshacer fácilmente.</li>
	<li>Esté cerca del borde de la pantalla.</li>
	<li>Sea difícil de alcanzar.</li>
	<li>Sea parte de una tarea secuencial.</li>
</ul>

<p>Si estas sensibilizado con la accesibilidad y no sabes por dónde empezar, te recomiendo este <a href="{{ site.baseurl }}{% post_url 2019-02-22-accesibilidad-web-al-alcance-de-todos %}">artículo introductorio a la accesibilidad web</a>, en el que aprenderás las <strong>reglas básicas</strong> que lograrán que tu aplicación/web sea mucho más accesible a todo tipo de personas usuarias.</p>

<h2>Qué es un píxel CSS</h2>

<p>Es probable que te haya llamado la atención el término “píxel CSS”. <a href="https://www.w3.org/TR/WCAG21/#dfn-css-pixels" target="_blank" rel="noopener noreferrer">Las WCAG los definen</a> del siguiente modo (traducción simplificada para facilitar su comprensión):</p>

<blockquote>Un píxel CSS es la unidad de medida canónica para todas las longitudes y medidas en CSS. Esta unidad es independiente de la densidad y distinta de los píxeles de hardware presentes en una pantalla.</blockquote>

<p>El propósito del píxel CSS es proporcionar <strong>consistencia visual</strong> entre distintos dispositivos, <strong>sin importar la resolución o densidad de pantalla</strong>.</p>

<p>La definición de su tamaño está basada en el concepto de <strong>píxel de referencia</strong>, que considera una distancia de visualización estándar.</p>

<p>En otras palabras, el píxel CSS está diseñado para que, sin importar la resolución o densidad del dispositivo, el contenido se vea del <strong>mismo tamaño físico aparente</strong> si el dispositivo se sostiene a una distancia típica. La cual está establecida en 28 pulgadas (71 cm).</p>

<p>Los navegadores y sistemas operativos ajustan automáticamente la escala de los píxeles CSS para mantener una experiencia de usuario coherente.</p>

<hr>

<div class="footnotes">
    <ol>
        <li id="fn:fn-f1">
            <p>La WCAG 2.1 (Web Content Accessibility Guidelines) es un conjunto de pautas internacionales que establecen cómo diseñar contenido web accesible para todas las personas, incluidas aquellas con discapacidades visuales, auditivas, cognitivas o motoras.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
        </li>
    </ol>
</div>