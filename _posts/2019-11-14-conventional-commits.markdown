---
layout:        post
title:         "Conventional Commits"
subtitle:      "Una convención para dar significado a los mensajes de los commits"
date:          2019-11-14 17:30:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-44.jpg"
tags:          [git]
---

<p>El mes pasado dejo de ser <em>beta</em> una iniciativa muy interesante llamada <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener noreferrer">Conventional Commits</a>.</p>

<p>Se trata de una especificación para dar significado a los mensajes de los <em>commits</em> haciéndolos legibles para máquinas y humanos.</p>

<p>Esta especificación proporciona un conjunto fácil de reglas para crear un historial de <em>commits</em> explícito. Esta convención se ajusta a <a href="http://semver.org/" target="_blank" rel="noopener noreferrer">SemVer</a>, al describir las características, correcciones y cambios que rompen la compatibilidad en los mensajes de los <em>commits</em>.</p>

<p><img src="{{ site.baseurl }}/img/conventional-commits.jpg" loading="lazy" alt="Conventional Commits" width="722" height="435"></p>

<p>En <a href="https://www.adimedia.net/" target="_blank" rel="noopener noreferrer">la empresa en la que trabajo</a> ya veníamos utilizando SemVer y desde la semana pasada, hemos decidido probar a utilizar Conventional Commits en nuestro día a día.</p>

<h2>Resumen de la convención</h2>

<pre>[tipo]([ámbito opcional]): [descripción]

[cuerpo opcional]

[nota de pie opcional]
</pre>

<p>Ejemplo sólo con los campos obligatorios:</p>

<pre>feat: cambiar títulos y estilos en la página de inicio</pre>

<p>Ejemplo completo:</p>

<pre>feat(home): añadir pie alternativo a la home

Implementar una versión alternativa del pie de página
Agregar iconos alternativos en la versión móvil del pie de página

Soluciona la incidencia #3
</pre>

<h3>Tipo (obligatorio)</h3>

<p>El tipo de commit es obligatorio indicarlo.</p>

<h4>Tipos de commits principales</h4>
<ol>
    <li><strong>fix:</strong> corrige un error (se correlaciona con <strong>PATCH</strong> en el versionado semántico).</li>
    <li><strong>feat:</strong> introduce nuevas funcionalidades (se correlaciona con <strong>MINOR</strong> en el versionado semántico).</li>
</ol>

<h4>Otros tipos de commits</h4>

<p>Está permitido cualquier tipo, pero se recomiendan los que usa <a href="https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines" target="_blank" rel="noopener noreferrer">Angular convention</a>. Ejemplos recomendados:</p>

<ul>
    <li><strong>build:</strong> cambios que afectan el sistema de compilación o dependencias externas (gulp, broccoli, npm...)</li>
    <li><strong>ci:</strong> cambios en nuestros archivos y scripts de configuración de CI.</li>
    <li><strong>docs:</strong> cambios en la documentación.</li>
    <li><strong>improvement:</strong> mejorar una implementación actual sin añadir nuevas características ni corregir errores.</li>
    <li><strong>perf:</strong> cambio en el código que mejora el rendimiento.</li>
    <li><strong>refactor:</strong> mejora en el código que no corrige un error ni añade funcionalidad.</li>
    <li><strong>style:</strong> cambios cosméticos en el código que no afectan a la funcionalidad (formateo, espacios en blanco, tabuladores, etc.).</li>
    <li><strong>test:</strong> añadidos nuevos tests o corregidos estistentes.</li>
</ul>

<h3>Ámbito (opcional)</h3>

<p>Se puede agregar un ámbito al tipo de commit para proveer información contextual adicional. Es opcional y se escribe entre paréntesis.</p>

<p>Ejemplo:</p>

<pre>feat(parser): añadir capacidad de parsear arrays</pre>

<h3>Descripción (obligatoria)</h3>

<p>Es obligatoria una descripción corta de los cambios realizados en el código.</p>

<h3>Cuerpo (opcional)</h3>

<p>Un cuerpo del commit más extenso PUEDE agregarse después de la descripción, dando información contextual adicional acerca de los cambios en el código. El cuerpo DEBE iniciar con una línea en blanco después de la descripción.</p>

<h3>Nota de pie (opcional)</h3>

<p>Una nota de pie PUEDE agregarse tras una línea en blanco después del cuerpo o después de la descripción en caso de que no se haya dado un cuerpo. La nota de pie DEBE contener referencias adicionales a los números de problemas registrados sobre el cambio del código (como el número de problema que corrige, ejemplo <i>Corrige incidencia #154</i>).</p>

<h4>Commit que rompe la compatibilidad hacia atrás</h4>

<p>Siempre que se produzca un commit (sea del tipo que sea) que rompa la compatibilidad hacia atrás, se debe indicar con un texto <em>BREAKING CHANGE:</em> en el pie.</p>

<p>En lugar del <em>BREAKING CHANGE:</em> o de manera adicional, se puede usar un signo ! tras el tipo/ámbito.</p>

<p>Ejemplo:</p>

<pre>refactor!: eliminado soporte para Node 6

BREAKING CHANGE: refactorizar para usar características de JavaScript no disponibles en Node 6
</pre>

<p>Estos commits se correlacionan con <strong>MAJOR</strong> en el versionado semántico.</p>

<h3>Bola extra: CHANGELOG.md automático</h3>

<p>Existe un paquete NPM llamado <a href="https://github.com/conventional-changelog/standard-version" target="_blank" rel="noopener noreferrer">standard-version</a> que nos permite crear el documento CHANGELOG.md de manera automatizada si nos ajustamos a Conventional Commits.</p>