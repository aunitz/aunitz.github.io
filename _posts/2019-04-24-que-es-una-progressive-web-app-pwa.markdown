---
layout:     post
title:      "Qué es una Progressive Web App (PWA)"
subtitle:   "Proporciona una experiencia de usuario similar a las aplicaciones nativas"
date:       2019-04-24 13:00:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-40.jpg"
tags:       [desarrollo de aplicaciones web]
---

<p>Las aplicaciones web progresivas (PWA, por sus siglas en inglés) <strong>son aplicaciones web</strong> que se cargan como páginas web o sitios web normales, pero <strong>ofrecen una experiencia de usuario que las asemeja a las aplicaciones nativas</strong>.</p>

<p>Son capaces de ofrecer funcionalidades como trabajar sin conexión, notificaciones push o el acceso al hardware del dispositivo. Tradicionalmente estas funcionalidades sólo estaban disponibles para aplicaciones nativas.</p>

<p><img src="{{ site.baseurl }}/img/que-es-una-progressive-web-app-pwa-01.jpg" loading="lazy" alt="" width="722" height="363"></p>

<p>Las PWA no son una tecnología en sí misma, sino un <strong>conjunto de tecnologías</strong> disponibles en los navegadores web modernos. El concepto de PWA es más bien un término “marketiniano” que fue acuñado por primera vez por Google en 2015. De hecho, Google es la empresa que con más fuerza ha promovido este concepto y cuenta con una <a href="https://developers.google.com/web/progressive-web-apps/" target="_blank" rel="noopener noreferrer">completa web</a> que lo documenta en detalle.</p>

<h2>Funcionalidades que se pueden implementar en una PWA</h2>

<p>Al tratarse de un variado conjunto de tecnologías, hay que tener en cuenta que una determinada PWA no tiene que implementarlas todas. Sólo aquellas que tengan sentido para el proyecto en concreto. Además, se trata de tecnologías que podemos utilizar en cualquier aplicación o sitio web, sin tener siquiera que denominarla como PWA.</p>

<p>La lista es amplia y va creciendo continuamente. Muchas de estas funcionalidades están todavía en fase experimental y, en gran parte, sólo Chrome las soporta totalmente.</p>

<p>A continuación, muestro un listado de algunas de las más interesantes en el momento de escribir este artículo. Acompañado de enlaces para poder profundizar en su conocimiento.</p>

<h3>Funcionalidades relacionadas con el hardware del dispositivo</h3>

<ol>
    <li>Acceso a la geolocalización (<a href="https://developers.google.com/maps/documentation/geolocation/intro" target="_blank" rel="noopener noreferrer">Geolocation API</a>).</li>
    <li>Acceso a los <a href="https://developer.mozilla.org/es/docs/Web/API/Sensor_APIs" target="_blank" rel="noopener noreferrer">sensores de movimiento y orientación</a>: acelerómetro, giroscopio y brújula.</li>
    <li>Acceso a dispositivos conectados mediante USB (<a href="https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web" target="_blank" rel="noopener noreferrer">WebUSB API</a>).</li>
    <li>Posibilidad de conectarse a otros dispositivos mediante Bluetooth e interactuar con ellos (<a href="https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web" target="_blank" rel="noopener noreferrer">Web Bluetooth API</a>).</li>
    <li><a href="https://developers.google.com/web/fundamentals/media/recording-audio/" target="_blank" rel="noopener noreferrer">Grabación de audio</a>.</li>
    <li><a href="https://developers.google.com/web/fundamentals/media/capturing-images/" target="_blank" rel="noopener noreferrer">Captura de imágenes</a> (acceso a la cámara).</li>
    <li><a href="https://developers.google.com/web/fundamentals/media/recording-video/" target="_blank" rel="noopener noreferrer">Grabación de vídeo</a>.</li>
</ol>

<p><img src="{{ site.baseurl }}/img/que-es-una-progressive-web-app-pwa-02.jpg" loading="lazy" alt="" width="722" height="363"></p>

<h3>Funcionalidades que facilitan la vida al usuario (mejoran la usabilidad)</h3>

<ol>
    <li>Permiten “instalar” la aplicación en el móvil (<a href="https://developers.google.com/web/fundamentals/app-install-banners/" target="_blank" rel="noopener noreferrer">Add to home screen</a>, A2HS).</li>
    <li>Sincronización en segundo plano (<a href="https://developers.google.com/web/updates/2015/12/background-sync" target="_blank" rel="noopener noreferrer">Background Sync</a>). Permite que las PWA se actualicen, aunque el usuario no las tenga abiertas.</li>
    <li><a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa" target="_blank" rel="noopener noreferrer">Capacidades offline</a>. La PWA puede guardar en local todo lo necesario para seguir funcionando, aunque pierda la conexión a internet.</li>
    <li>Notificaciones push (<a href="https://developers.google.com/web/fundamentals/push-notifications/" target="_blank" rel="noopener noreferrer">Web Push Notifications</a>). Permite que las PWA envíen notificaciones push al dispositivo, aunque el usuario no las tenga abiertas.</li>
    <li>Una API que facilita los procesos de login (<a href="https://developers.google.com/web/fundamentals/security/credential-management/" target="_blank" rel="noopener noreferrer">Credential Management API</a>).</li>
    <li>Facilidades para ejecutar pagos sin tener que rellenar formularios web (<a href="https://developers.google.com/web/fundamentals/payments/" target="_blank" rel="noopener noreferrer">Payment Request API</a>).</li>
    <li>Facilidades para <a href="https://developers.google.com/web/fundamentals/discovery/social-discovery/" target="_blank" rel="noopener noreferrer">compartir contenido en redes sociales</a> (Open Graph Protocol para Facebook y las Twitter Cards para Twitter).</li>
</ol>

<p><img src="{{ site.baseurl }}/img/que-es-una-progressive-web-app-pwa-03.jpg" loading="lazy" alt="" width="722" height="363"></p>