---
layout:     post
title:      "Romper la escala del eje Y en un gráfico"
subtitle:   "¿Es una buena idea?"
date:       2021-06-22 16:30:00
author:     "Aunitz Giménez"
header-img: "img/post-bg-74.jpg"
tags:       [buenas prácticas de diseño, buenas prácticas de usabilidad]
---

<p>Imaginemos un caso práctico. Tenemos un equipo de ventas que ha obtenido los siguientes resultados.</p>

<table class="table table-bordered" style="max-width: 425px;">
    <thead>
        <tr class="active">
            <th>Comercial</th>
            <th class="text-right">Ventas</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Luciana Pla</td>
            <td class="text-right">1.540 €</td>
        </tr>
        <tr>
            <td>Pablo Conde</td>
            <td class="text-right">30 €</td>
        </tr>
        <tr>
            <td>Fabian Gonzalo</td>
            <td class="text-right">89 €</td>
        </tr>
        <tr>
            <td>Maria Luisa Perello</td>
            <td class="text-right">153 €</td>
        </tr>
        <tr>
            <td>Nadia Caparros</td>
            <td class="text-right">122 €</td>
        </tr>
        <tr>
            <td>Isidoro Enriquez</td>
            <td class="text-right">76 €</td>
        </tr>
    </tbody>
</table>

<p>Luciana destaca claramente sobre el resto de comerciales por su abultado importe de ventas totales.</p>

<p>Si utilizamos una hoja de cálculo como Excel para visualizar los resultados mediante un gráfico de barras, obtendremos una representación parecida a la siguiente.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-01.png" loading="lazy" alt=""></p>

<p>Como la barra de ventas de Luciana es mucho mayor que las demás, no se llegan a apreciar en toda su magnitud las diferencias que hay entre el resto de los comerciales. Por ejemplo, no se percibe con claridad que María Luisa ha venido el doble que Isidoro.</p>

<p>Podríamos utilizar una <strong>escala logarítmica</strong> para el eje Y. Obteniendo un gráfico como el siguiente.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-02.png" loading="lazy" alt=""></p>

<p>El problema de <strong>las escalas logarítmicas</strong> es que <strong>no resultan fácilmente interpretables</strong> por el público en general. Requiere de conocimientos matemáticos y estadísticos avanzados.</p>

<p>Una solución que nos encontraremos en más de una ocasión es la de recurrir a <strong>“romper” la escala del eje Y</strong> para “acortar” la barra que distorsiona el gráfico y que el resto de las barras se diferencien mejor entre sí.</p>

<p>Por ejemplo, del siguiente modo.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-03.png" loading="lazy" alt=""></p>

<p>El gráfico anterior lo he creado de manera muy rudimentaria y tosca con Excel, pero sirve de ejemplo.</p>

<p>Las librerías de gráficos web más completas del mercado suelen ofrecer soluciones más elegantes. Es el caso de <a href="https://www.highcharts.com/" target="_blank" rel="noopener noreferrer">Highcharts</a> que, aunque no ofrece esta funcionalidad de manera nativa, <a href="https://www.highcharts.com/forum/viewtopic.php?t=39310" target="_blank" rel="noopener noreferrer">la comunidad ha desarrollado</a> sus propias soluciones. Como la del siguiente ejemplo; que puede <a href="https://jsfiddle.net/qgro9e28/" target="_blank" rel="noopener noreferrer">consultarse online en JSFiddle</a>.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-04.png" loading="lazy" alt=""></p>

<h2>¿Es una buena idea romper la escala del eje Y?</h2>

<p>El principal inconveniente de romper la escala del eje Y es que <strong>se pierde la correlación entre los valores pequeños y los grandes</strong>. Volvamos a ver el gráfico con la escala partida.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-03.png" loading="lazy" alt=""></p>

<p>Puede ocurrir que interpretemos inconscientemente que las ventas de Luciana son el doble o el triple que las de María Luisa. Pero la realidad es que son <strong>diez veces más grandes</strong>.</p>

<p>Es difícil, sin leer con detenimiento y atención los datos, obtener una compresión visual fiable de los diferentes órdenes de magnitud reales.</p>

<h2>¿Existen soluciones mejores?</h2>

<p>Puede que sí. Una posible alternativa es utilizar un <strong>doble gráfico apilado</strong>. En nuestro ejemplo se vería del siguiente modo.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-05.png" loading="lazy" alt=""></p>

<p>El doble gráfico anterior muestra dos escalas diferentes para el eje Y. En la escala del <strong>gráfico superior</strong> se representa la <strong>proporción real</strong> de los diferentes valores. En el <strong>gráfico inferior</strong> se ha <strong>recortado</strong> la escala del eje Y. De modo que se centra en representar los valores del grupo de comerciales que menos a vendido. Mostrando de manera incompleta la barra de Luciana. Con un degradado del color azul que sugiere al usuario que la barra no se representa completa.</p>

<p>Otras opciones más elaboradas y dinámicas que aprovechan la <strong>interactividad</strong> que tiene la web son las de, por ejemplo, la librería <a href="https://www.amcharts.com/" target="_blank" rel="noopener noreferrer">amCharts</a> que incorpora una solución nativa equivalente al doble gráfico apilado. En la cual, al pasar el cursor por encima de la zona “cortada”, el gráfico toma la forma que representa la proporción real de los diferentes valores.</p>

<p>A continuación, se puede ver una animación en formato GIF que muestra la solución de amCharts. Que también <a href="https://www.amcharts.com/demos/column-chart-with-axis-break/" target="_blank" rel="noopener noreferrer">se puede experimentar en vivo en su página web</a>.</p>

<p><img src="{{ site.baseurl }}/img/romper-escala-eje-y-grafico-06.gif" loading="lazy" alt=""></p>

<p>Se trata de una solución muy imaginativa y que además cuenta con <strong>cierto componente lúdico</strong> por la transformación dinámica, interactiva y visual del gráfico.</p>