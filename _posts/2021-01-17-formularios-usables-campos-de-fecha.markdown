---
layout:     post
title:      "Formularios usables: campos de fecha"
subtitle:   "Consejos de usabilidad para los campos de fecha"
date:       2021-01-17 19:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-63.jpg"
tags:       [buenas prácticas de usabilidad, formularios]
---

<p>La introducción de fechas es una de las acciones que más problemas de usabilidad plantea en los formularios.</p>

<p>En HTML existe un tipo de elemento específico para los campos de fecha (<code>&lt;input type="date"&gt;</code>). Sin embargo, salvo que haya alguna razón que lo justifique, no te aconsejo que lo utilices. El principal motivo es que cada navegador lo interpreta de una manera diferente. Lo cual te impide tener el control sobre lo que el usuario visualiza y en consecuencia plantea complicaciones de consistencia y usabilidad en tus formularios.</p>

<p>Consejos de usabilidad para los campos de fecha:</p>

<ul>
    <li>Utiliza campos diferentes para el día, mes y año. Habitualmente es la manera más rápida para el usuario de rellenar un campo de fecha.</li>
    <li>Etiquétalos correctamente para eliminar cualquier confusión sobre el formato de la fecha.</li>
    <li>No hagas que el cursor tabule automáticamente de un campo a otro.</li>
    <li>Permite entradas alternativas al usuario. Por ejemplo, permite tanto 03, como 3.</li>
</ul>

<p><img src="{{ site.baseurl }}/img/formularios-usables-campos-de-fecha.png" loading="lazy" alt="" width="521" height="275"></p>

<p class="small">Nota: este post se irá actualizando a medida que mis criterios sobre usabilidad de los formularios vayan evolucionando o los vaya enlazando a posts que desarrollan cada consejo. La fecha de publicación que figura en la cabecera se corresponde a la del post inicial.</p>