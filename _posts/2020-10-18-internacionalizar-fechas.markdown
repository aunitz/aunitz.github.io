---
layout:     post
title:      "Internacionalizar fechas"
subtitle:   "{Tip 19 de usabilidad}"
date:       2020-10-18 10:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-57.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>Si tu web o aplicación incluye fechas en su contenido y va dirigida a un público internacional, te surgirá la duda de <strong>qué formato de fecha utilizar</strong>.</p>

<p>El significado del formato de las fechas depende del país. “08/11/2020” puede significar 11 de agosto de 2020 en EEUU, pero será 8 de noviembre de 2020 en algunos países europeos.</p>

<p><img src="{{ site.baseurl }}/img/internacionalizar-fechas-00.jpg" loading="lazy" alt="" width="722" height="403"></p>

<p><strong>Lo ideal</strong> sería que el <strong>formato de las fechas</strong> fuese <strong>dinámico</strong> y que le mostrásemos a cada usuario aquel formato que es habitual en su país. Sin embargo, esto es algo que la mayor parte de las veces no será posible. Habitualmente porque nuestra web o aplicación puede que se encuentre traducida a varios idiomas, pero no internacionalizada. Es decir, no adaptada a los usos y costumbres de diferentes países. Típicamente podemos tener una versión en inglés de nuestro proyecto, pero no una versión en inglés para EEUU, otra para Reino Unido, otra para Australia, otra para el resto del mundo...</p>

<p>En consecuencia, nos veremos obligados a utilizar un <strong>formato de fecha común para todos los casos</strong>. ¿Cuál escoger? Si sigues los dos consejos que te proporciono a continuación tus usuarios no tendrán demasiados problemas.</p>

<h2>1. Incluye el nombre del mes para distinguirlo del día</h2>

<p>Por ejemplo: 3 de abril de 2020. Puede que necesites abreviar el nombre del mes: 03-abr-2020.</p>

<p><img src="{{ site.baseurl }}/img/internacionalizar-fechas-01.png" loading="lazy" alt="" width="302" height="387"></p>

<p>Por cierto, en español, <a href="https://www.fundeu.es/recomendacion/dias-de-la-semana-meses-estaciones-minuscula/" target="_blank" rel="noopener noreferrer">los nombres de los meses se escriben en minúscula</a> por tratarse de nombres comunes.</p>

<h2>2. En los formularios distingue claramente los campos de día, mes y año</h2>

<p>Si vas a dejar que el usuario escriba la fecha, utiliza campos diferentes para el día, mes y año y etiquétalos correctamente.</p>

<p><img src="{{ site.baseurl }}/img/internacionalizar-fechas-02.png" loading="lazy" alt="" width="478" height="354"></p>

<p>En caso de que proporciones un componente de calendario para que el usuario seleccione la fecha, utiliza uno que utilice el nombre del mes. Como por ejemplo el de Google Calendar.</p>

<p><img src="{{ site.baseurl }}/img/internacionalizar-fechas-03.png" loading="lazy" alt="" width="371" height="376"></p>

<h2>Consideraciones adicionales</h2>

<h3>El formato ISO 8601</h3>

<p><a href="https://www.w3.org/QA/Tips/iso-date" target="_blank" rel="noopener noreferrer">Existe un formato internacional definido por ISO</a> (ISO 8601) para representar las fechas en formato numérico. Es el siguiente: AAAA-MM-DD. Donde AAAA es el año, MM es el mes (representado siempre con dos dígitos) y DD el día (representado siempre con dos dígitos).</p>

<p>Este formato ISO tiene el inconveniente de que <strong>no resulta amigable para el usuario</strong>. Ya que no es el formato habitual de casi ningún país.</p>

<h3>Inconvenientes de escribir el nombre del mes</h3>

<p>El primero de los consejos de usabilidad que te he proporcionado es el de escribir el nombre del mes. Sin embargo, no está exento de inconvenientes. El principal es que <strong>ocupa más espacio</strong>. Lo cual puede llegar a ser un problema en ciertos contextos de uso en los cuales el espacio disponible sea limitado. No existe una solución ideal para este problema. Tendrás que evaluar las opciones y seleccionar la más adecuada para tu caso particular.</p>