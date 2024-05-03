---
layout:     post
title:      "No utilices el atributo placeholder"
subtitle:   "En ningún caso debe sustituir al label"
date:       2020-01-29 22:15:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-49.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>El atributo <code>placeholder</code> de HTML pretende ser un texto breve que proporcione una pista sobre el valor esperado en un campo de entrada de formulario.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-00.png" loading="lazy" alt="" width="170" height="77"></p>

<p>De primeras podría parecer que es buena idea utilizarlo, sin embargo, tiene algunos inconvenientes de usabilidad y de accesibilidad.</p>

<h2>En ningún caso debe sustituir al label</h2>

<p>Una práctica que no es raro ver en algunos formularios es la de utilizar atributos <code>placeholder</code> como sustitutos de los elementos <code>label</code> de HTML.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-01.png" loading="lazy" alt="" width="608" height="170"></p>

<p>Puede parecer que es una solución estéticamente atractiva, pero tiene dos graves problemas de usabilidad y uno adicional de accesibilidad:</p>

<ul>
    <li>Una vez que el usuario entra en el cuadro de texto para editarlo, el <code>placeholder</code> desaparece y, por tanto, no puede verificar que lo que está escribiendo es lo que debe escribir.</li>
    <li>Puede ocurrir que el usuario confunda el <code>placeholder</code> con un campo que ya ha rellenado y lo pase por alto.</li>
    <li>Por accesibilidad, <a href="https://www.w3.org/TR/WCAG20-TECHS/H44.html" target="_blank" rel="noopener noreferrer">todos los campos de un formulario deben ir correctamente identificados y asociados con un <code>label</code></a>. Este problema de accesibilidad es también aplicable a los <a href="https://dribbble.com/shots/1254439--GIF-Mobile-Form-Interaction" target="_blank" rel="noopener noreferrer"><code>label</code> de efecto flotante</a> que a nivel de código se resuelvan mediante <code>placeholder</code>.</li>
</ul>

<h2>Desaparece en el momento de escribir</h2>

<p>Una vez que tenemos claro que no podemos prescindir de los <code>label</code>, podemos plantearnos utilizar los atributos <code>placeholder</code> para proporcionar información adicional o de ayuda al usuario para rellenar el campo.</p>

<p>El gran problema de usabilidad que tiene esta solución es que perdemos el texto de ayuda justo en el momento que más podemos necesitar consultarlo. Es decir, en el momento de rellenar el campo de formulario.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-02.gif" loading="lazy" alt="" width="581" height="84"></p>

<p>Es mucho mejor solución proporcionar esta ayuda siempre visible para el usuario.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-03.png" loading="lazy" alt="" width="399" height="89"></p>

<p>Como recomendación adicional, es mejor facilitar este texto de ayuda por encima del campo de formulario en lugar de por debajo. Ya que, si está debajo, en dispositivos que utilicen un teclado virtual (como los móviles), puede quedar tapado.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-04.png" loading="lazy" alt="" width="400" height="463"></p>

<h2>Puede confundirse con un campo rellenado</h2>

<p>En un formulario a medio rellenar, es mucho más fácil distinguir visualmente los campos que me faltan por rellenar si estos se encuentran en blanco que si llevan un <code>placeholder</code>. En este último caso, puedo confundirlos con campos que ya hayan sido rellenados.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-05.png" loading="lazy" alt="" width="709" height="257"></p>

<h2>Insuficiente contraste</h2>

<p>El color que asignan por defecto los navegadores a los atributos <code>placeholder</code> no cumple con los <a href="https://www.w3.org/TR/WCAG20-TECHS/G18.html" target="_blank" rel="noopener noreferrer">requisitos de contraste establecidos en accesibilidad</a>. De modo que resultan difíciles de leer para algunos usuarios.</p>

<p><img src="{{ site.baseurl }}/img/no-utilices-atributo-placeholder-06.png" loading="lazy" alt="" width="702" height="507"></p>
