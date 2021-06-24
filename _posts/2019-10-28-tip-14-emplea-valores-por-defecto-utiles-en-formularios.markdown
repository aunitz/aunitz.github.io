---
layout:     post
title:      "Emplea valores por defecto útiles en los formularios"
subtitle:   "{Tip 14 de usabilidad}"
date:       2019-10-28 18:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-39.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>Una de las tareas más engorrosas para los usuarios de aplicaciones consiste en rellenar formularios. La manera más eficaz de reducir el tiempo que necesitamos para completar un formulario es que no tengamos que rellenar algunos de sus campos. Esto último se consigue si una buena parte de los campos del formulario ya vienen rellenados con un contenido por defecto que nos resulte útil.</p>

<p>Resultará mucho más rápido para el usuario validar que los valores por defecto son correctos que tener que rellenarlos partiendo de cero. Incluso si el contenido por defecto no es acertado, al usuario le costará lo mismo sustituirlo por el correcto que introducirlo en un campo previamente vacío.</p>

<p><img src="{{ site.baseurl }}/img/tip-14-emplea-valores-por-defecto-utiles-en-formularios.png" loading="lazy" alt="Emplea valores por defecto útiles en los formularios" width="722" height="428"></p>

<p>Podemos desarrollar una lógica para rellenar valores por defecto que vaya desde lo más básico hasta algoritmos mucho más elaborados. Algunos ejemplos relativamente sencillos de implementar son:</p>

<ul>
    <li>Rellenar los campos en los que hay que seleccionar una de varias opciones con la que sea de uso más frecuente.</li>
    <li>Colocar las opciones más frecuentes en la parte de arriba de los campos desplegables.</li>
    <li>Preseleccionar el país del usuario en función de la geolocalización del usuario.</li>
    <li>Precargar los valores que rellenó en el pasado en nuestra aplicación para los campos que vuelven a solicitarse.</li>
    <li>Rellenar los campos de texto extensos (<code>textarea</code>) en los que se espera una descripción o texto largo con un ejemplo.</li>
    <li>Rellenar los campos en los que se solicita autorización para enviar publicidad, boletines de noticias, etc. con el valor “No” en lugar de con el “Sí”. Este tipo de valores por defecto generan confianza en el usuario y son más respetuosos con la legislación de privacidad de muchos países.</li>
</ul>

<p>La idoneidad de todos estos ejemplos deberá ser analizada en el contexto de uso concreto de la aplicación en cuestión. Ya que no siempre resultarán procedentes.</p>