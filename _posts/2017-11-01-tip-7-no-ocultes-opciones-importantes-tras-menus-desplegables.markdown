---
layout:     post
title:      "No ocultes opciones importantes tras menús desplegables"
subtitle:   "{Tip 7 de usabilidad}"
date:       2017-11-01 17:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-03.jpg"
tags:       [buenas prácticas de usabilidad]
---

<p>Los menús desplegables (<a href="https://developer.mozilla.org/es/docs/Web/HTML/Elemento/select" target="_blank" rel="noopener noreferrer">elemento select de HTML</a>) deben utilizarse con mucha precaución. De acuerdo con el <a href="{{ site.baseurl }}{% post_url 2017-01-18-principios-usabilidad %}">principio de interfaz visible</a>, se debe evitar ocultar información relevante al usuario. Es preferible que el usuario tenga a la vista las opciones importantes a que las tenga que descubrir desplegando un select.</p>

<p>Los select deben limitarse a ser utilizados en aquellas ocasiones en las que el usuario pueda predecir fácilmente su contenido. Como por ejemplo un desplegable de días de la semana o un listado de provincias. </p>

<p>Ocasionalmente, también pueden resultar útiles en aquellos elementos del interfaz que el usuario utilizará repetidamente a lo largo del tiempo (por ejemplo, menús de acción).</p>

<p>En ningún caso los utilices como elementos de navegación principales o como parte de un recorrido orientado hacia la conversión.</p>

<p><img src="{{ site.baseurl }}/img/tip-7-no-ocultes-opciones-importantes-tras-menus-desplegables.png" loading="lazy" alt="Ilustración del tip 7 de usabilidad: no ocultes opciones importantes tras menús desplegables" width="722" height="428"></p>