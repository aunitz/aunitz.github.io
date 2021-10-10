---
layout:     post
title:      "Patch Mode de Git"
subtitle:   "Permite <em>commitear</em> sólo parte de los cambios de un archivo"
date:       2021-10-10 22:10:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-78.jpg"
tags:       [git]
---

<p>Si <strong>has hecho varios cambios en un archivo y no quieres incluirlos todos en el mismo <em>commit</em></strong> porque se refieren a temas diferentes, hay una manera de pasar al <em>stage</em> sólo parte de los cambios, <em>commitearlos</em> y después proceder a <em>commitear</em> el resto.</p>

<p>La funcionalidad de Git que permite pasar al <em>stage</em> sólo una parte de los cambios realizados en un archivo se llama <strong>Patch Mode</strong>. Por línea de comandos se activa mediante el <em>flag patch</em>:</p>

<code>git add --patch nombreDelArchivo</code>

<p>O de modo abreviado:</p>

<code>git add -p nombreDelArchivo</code>

<h2>Con Visual Studio Code es muy fácil de utilizar</h2>

<p>Imaginad la siguiente situación de partida. Un archivo en el que hay dos cambios que quiero <em>commitear</em> por separado.</p>

<a href="{{ site.baseurl }}/img/patch-mode-git-01.png"><img src="{{ site.baseurl }}/img/patch-mode-git-01.png" loading="lazy" alt="" width="1759" height="417"></a>

<p>Selecciono las líneas 3 y 4 de la parte de la derecha y pulso botón derecho del ratón. Después clico en «Stage Selected Ranges».</p>

<a href="{{ site.baseurl }}/img/patch-mode-git-02.png"><img src="{{ site.baseurl }}/img/patch-mode-git-02.png" loading="lazy" alt="" width="653" height="527"></a>

<p>De ese modo, habré llevado a <em>Stage</em> sólo los cambios seleccionados y podré <em>commitearlos</em>.</p>

<a href="{{ site.baseurl }}/img/patch-mode-git-03.png"><img src="{{ site.baseurl }}/img/patch-mode-git-03.png" loading="lazy" alt="" width="1375" height="383"></a>

<p>Mientras que los cambios de la línea 12 permanecen sin pasar al <em>Stage</em>.</p>

<a href="{{ site.baseurl }}/img/patch-mode-git-04.png"><img src="{{ site.baseurl }}/img/patch-mode-git-04.png" loading="lazy" alt="" width="1660" height="387"></a>
