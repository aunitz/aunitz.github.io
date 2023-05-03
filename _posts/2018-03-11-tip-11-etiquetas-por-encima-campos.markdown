---
layout:     post
title:      "Las etiquetas de los campos, mejor por encima"
subtitle:   "{Tip 11 de usabilidad}"
date:       2018-03-11 12:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-28.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>Una de las decisiones importantes que debes tomar al diseñar un formulario es dónde ubicar las etiquetas (labels) con respecto a los campos del formulario.</p>

<p>Esta no es una decisión trivial, ya que afecta a la legibilidad, a la tasa de finalización, la velocidad de finalización y, en última instancia, el nivel de satisfacción de los usuarios que intentan completar tu formulario.</p>

<p>Básicamente existen tres alternativas:</p>
<ul>
	<li>Etiquetas por encima.</li>
	<li>Etiquetas alineadas a la izquierda.</li>
	<li>Etiquetas alineadas a la derecha.</li>
</ul>

<p>Como de costumbre en usabilidad, no hay una respuesta única, todo depende del contexto de uso concreto. Aunque, como veremos, para la mayoría de los casos, <strong>la mejor opción es ubicar las etiquetas por encima de los campos</strong>.</p>

<h2>Etiquetas por encima</h2>

<p><img src="{{ site.baseurl }}/img/tip-11-etiquetas-por-encima.png" loading="lazy" alt="Formulario con las etiquetas ubicadas por encima de los campos" width="521" height="463"></p>

<div class="row">
    <div class="col-sm-6">
        <strong class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;&nbsp;Ventajas</strong>
        <ul>
            <li>Tiempos de finalización más rápidos. Especialmente en dispositivos móviles.</li>
            <li>Más facilidad para rellenar el formulario siguiendo un orden lógico.</li>
            <li>Mejor soporte multilenguaje. Dado que se maximiza el espacio dedicado a las etiquetas.</li>
        </ul>
    </div>
    <div class="col-sm-6">
        <strong class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;&nbsp;Inconvenientes</strong>
        <ul>
            <li>Requiere más espacio vertical.</li>
            <li>No es la solución ideal para formularios muy extensos.</li>
        </ul>
    </div>
</div>

<h2>Etiquetas alineadas a la izquierda</h2>

<p><img src="{{ site.baseurl }}/img/tip-11-etiquetas-alineadas-izquierda.png" loading="lazy" alt="Formulario con las etiquetas alineadas a la izquierda" width="521" height="463"></p>

<div class="row">
    <div class="col-sm-6">
        <strong class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;&nbsp;Ventajas</strong>
        <ul>
            <li>Requiere menos espacio vertical.</li>
            <li>Facilita la lectura y comprensión de las etiquetas.</li>
            <li>Requiere del usuario que preste más atención. Lo cual es positivo cuando se le piden datos poco habituales.</li>
        </ul>
    </div>
    <div class="col-sm-6">
        <strong class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;&nbsp;Inconvenientes</strong>
        <ul>
            <li>Requiere más espacio horizontal.</li>
            <li>Los estudios han medido tiempos de finalización más lentos. Lo cual no es necesariamente un inconveniente cuando lo que se le pide al usuario son datos complejos o poco habituales.</li>
            <li>Peor soporte multilenguaje.</li>
        </ul>
    </div>
</div>

<h2>Etiquetas alineadas a la derecha</h2>

<p><img src="{{ site.baseurl }}/img/tip-11-etiquetas-alineadas-derecha.png" loading="lazy" alt="Formulario con las etiquetas alineadas a la derecha" width="521" height="463"></p>

<div class="row">
    <div class="col-sm-6">
        <strong class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;&nbsp;Ventajas</strong>
        <ul>
            <li>Requiere menos espacio vertical.</li>
            <li>Mejor conexión visual entre la etiqueta y el campo que en los alineados a la izquierda.</li>
            <li>En consecuencia, se han medido tiempos de finalización más rápidos que en los alienados a la izquierda.</li>
        </ul>
    </div>
    <div class="col-sm-6">
        <strong class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;&nbsp;Inconvenientes</strong>
        <ul>
            <li>Requiere más espacio horizontal.</li>
            <li>Peor soporte multilenguaje.</li>
            <li>Más difíciles de leer y comprender que los alineados a la izquierda. Especialmente cuando lo que se le pide al usuario son datos complejos o poco habituales.</li>
        </ul>
    </div>
</div>

<h2>Nunca prescindas de las etiquetas</h2>

<p>Por si se te había pasado por la cabeza prescindir de las etiquetas (labels) y utilizar los textos por defecto (placeholders) como sustitutos de estos, no lo hagas.</p>

<p><img src="{{ site.baseurl }}/img/tip-11-inputs-sin-labels.png" loading="lazy" alt="Formulario sin etiquetas" width="521" height="463"></p>

<p>Puede quedar estéticamente muy bonito, pero tiene dos graves problemas de usabilidad:</p>
<ul>
	<li>Una vez que el usuario entra en el cuadro texto para editarlo, el texto por defecto desaparece y, por tanto, el usuario no puede verificar que lo que está escribiendo es lo que debe escribir.</li>
	<li>También puede ocurrir que el usuario confunda el texto por defecto por un campo que ya ha rellenado y lo pase por alto.</li>
</ul>

<p>Se podría hacer alguna excepción a esta regla, en casos como por ejemplo el típico formulario de acceso (login) en el que únicamente se pide usuario y contraseña.</p>

<p><img src="{{ site.baseurl }}/img/tip-11-iniciar-sesion.png" loading="lazy" alt="Formulario de inicio de sesión" width="521" height="319"></p>

<h2 class="section-heading">Referencias</h2>

<ul>
    <li><a href="https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php" target="_blank" rel="noopener noreferrer">Matteo Penzo. Label Placement in Forms. UX matters (2006)</a></li>
    <li><a href="https://ai.googleblog.com/2014/07/simple-is-better-making-your-web-forms.html" target="_blank" rel="noopener noreferrer">Javier Bargas-Avila y Mirjam Seckler. Simple is better - Making your web forms easy to use pays off. Google Research Blog (2014)</a></li>
</ul>