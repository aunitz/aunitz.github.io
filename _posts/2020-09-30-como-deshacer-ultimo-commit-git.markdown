---
layout:        post
title:         "Cómo deshacer el último commit con Git"
subtitle:      "Apuntes sobre Git"
date:          2020-09-30 17:00:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-56.jpg"
tags:          [git]
---

<p>Me he dado cuenta de que estoy un tanto encandilado con el tema de cómo deshacer el último <em>commit</em> de un repositorio Git. <a href="{{ site.baseurl }}{% post_url 2017-07-29-git-como-deshacer-commit %}">Publiqué un vídeo muy sencillo</a> al respecto en verano del 2017 y un artículo más completo en el 2019. Te emplazo a consultar <a href="{{ site.baseurl }}{% post_url 2019-11-16-diferencias-checkout-revert-reset %}">el post del 2019</a> si quieres más detalle del que proporciono en esta ocasión.</p>

<p>Tomando como referencia un <a href="https://midu.dev/como-deshacer-el-ultimo-commit-git" target="_blank" rel="noopener noreferrer">post publicado por Miguel Angel Durán</a> en su página web voy a proporcionar unas pautas muy sencillas y directas.</p>

<p><img src="{{ site.baseurl }}/img/como-deshacer-ultimo-commit-git-01.jpg" loading="lazy" alt="" width="720" height="401"></p>

<h2>Caso 1: quieres deshacer un <em>commit</em> no publicado</h2>

<p>Este comando sirve siempre y cuando todavía no hayas hecho <code>push</code>.</p>

<h3>Si quieres mantener los cambios</h3>

<p>Deshace el <em>commit</em>, pero mantiene en local los cambios que habías hecho.</p>

<code>git reset --soft HEAD~1</code>

<h3>Si no quieres mantener los cambios</h3>

<code>git reset --hard  HEAD~1</code>

<h2>Caso 2: quieres modificar el último <em>commit</em> no publicado</h2>

<p>Este comando sirve siempre y cuando todavía no hayas hecho <code>push</code>.</p>

<h3>Si sólo quieres modificar el mensaje del último <em>commit</em></h3>

<code>git commit --amend -m "Este es el mensaje correcto"</code>

<h3>Si quieres añadir más cambios al último <em>commit</em></h3>

<code># Añade los archivos con modificaciones que quieres añadir al commit anterior</code>

<code>git add src/archivo-con-cambios.js</code>

<code># Vuelve a hacer el commit con el parámetro amend</code>

<code>git commit --amend -m "Mensaje del commit"</code>

<h2>Caso 3: quieres deshacer un <em>commit</em> ya publicado</h2>

<p>Con este comando se añadirá un nuevo <em>commit</em> que deshace todos los cambios de un <em>commit</em> previo en concreto. De ese modo, los cambios del <em>commit</em> que has deshecho quedan almacenados en el historial y se pueden llegar a recuperar en un futuro.</p>

<code>git revert 74a1092</code>