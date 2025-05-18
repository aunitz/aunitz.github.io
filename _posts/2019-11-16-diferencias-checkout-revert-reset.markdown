---
layout:        post
title:         "Diferencias entre checkout, revert y reset"
subtitle:      "Apuntes sobre Git"
date:          2019-11-16 19:00:00
author:        "Aunitz Giménez"
header-img:    "img/post-bg-45.jpg"
tags:          [git]
---

<p>Los comandos <code>git checkout</code>, <code>git revert</code> y <code>git reset</code> sirven para deshacer cambios en nuestro control de versiones. Son muy útiles, pero también muy parecidos y pueden generar confusión.</p>

<p>Basándome en el excelente <a href="https://www.atlassian.com/git/tutorials" target="_blank" rel="noopener noreferrer">tutorial de Git de Atlassian</a>, he tomado algunas notas prácticas y simplificadas para diferenciarlos.</p>

<h2>Git checkout</h2>
<p>Un <em>checkout</em> es una operación que mueve el puntero de referencia HEAD a un <em>commit</em> específico.</p>

<p>Supongamos que el HEAD de la rama master se encuentra en el <em>commit</em> d. Ahora ejecutamos el comando <code>git checkout b</code>.</p>

<p><img src="{{ site.baseurl }}/img/checkout-revert-reset-1.png" loading="lazy" alt="Git checkout" width="722" height="225"></p>

<p>El resultado es un cambio en el historial de <em>commits</em>.</p>

<h3>Git checkout a nivel de archivo</h3>

<p>El comando <code>git checkout</code> se puede usar también a nivel de un único archivo. En cuyo caso su comportamiento es diferente a cuando se usa a nivel de <em>commit</em>.</p>

<p>En este caso no mueve el HEAD del repositorio, lo que hace es llevar al directorio de trabajo el fichero al que hemos hecho <em>checkout</em> con el contenido que tenía en el <em>commit</em> especificado.</p>

<h2>Git reset</h2>

<p>Un <em>reset</em> es una operación que toma un <em>commit</em> específico y restablece el historial para que coincida con el estado del repositorio en ese <em>commit</em> específico.</p>

<p>Supongamos que, partiendo de la siguiente situación, ejecutamos el comando <code>git reset HEAD~2</code></p>

<p><img src="{{ site.baseurl }}/img/checkout-revert-reset-2.png" loading="lazy" alt="Antes del git reset" width="722" height="321"></p>

<p>Estamos deshaciendo los dos últimos <em>commits</em> de la rama <em>Hotfix</em> . Estos dos <em>commits</em> quedarán huérfanos y se eliminarán la próxima vez que Git haga limpieza.</p>

<p><img src="{{ site.baseurl }}/img/checkout-revert-reset-3.png" loading="lazy" alt="Después del git reset" width="722" height="321"></p>

<h3>Git reset a nivel de archivo</h3>

<p>El comando git reset se puede usar también a nivel de un único archivo. En cuyo caso su comportamiento es diferente a cuando se usa a nivel de <em>commit</em>.</p>

<p>En este caso no mueve el HEAD del repositorio, lo que hace es llevar al directorio de <em>staged</em> el fichero al que hemos hecho <em>reset</em> con el contenido que tenía en el <em>commit</em> especificado. De modo que en el directorio de trabajo estará la versión última del contenido pendiente de <em>commit</em> y en <em>staged</em> la versión del contenido a la que hemos vuelto.</p>

<h2>Git revert</h2>

<p>Un <em>revert</em> es una operación que toma un <em>commit</em> específico y crea un nuevo <em>commit</em> con el contenido del <em>commit</em> especificado.</p>

<p>Este comando solo se puede ejecutar a nivel de <em>commit</em> y no a nivel de archivo.</p>

<p>Supongamos que partimos de la siguiente situación y queremos volver al <em>commit</em> marcado con el asterisco.</p>

<p><img src="{{ site.baseurl }}/img/checkout-revert-reset-4.png" loading="lazy" alt="Antes del git revert" width="722" height="321"></p>

<p>Tras ejecutar el comando <code>git revert HEAD~2</code> estaremos deshaciendo los cambios de los dos últimos <em> commits </em> de la rama <em> Hotfix </em> añadiendo un nuevo <em> commit </em> que ejecuta los cambios.</p>

<p><img src="{{ site.baseurl }}/img/checkout-revert-reset-5.png" loading="lazy" alt="Después del git revert" width="722" height="321"></p>

<h2>Usos más frecuentes</h2>

<p>Lo comandos de <em>checkout</em> y <em>reset</em> generalmente se usan para deshacer cambios en nuestro repositorio o rama de uso privado. Modifican el historial de un repositorio y pueden causar conflictos al hacer <em>push</em> a repositorios o ramas compartidas remotas.</p>

<p><strong><em>Revert</em> se considera una operación segura</strong> para deshacer en un repositorio público ya que crea un nuevo historial que se puede compartir de forma remota y no sobrescribe el historial del que pueden depender los miembros remotos del equipo.</p>

<p>En la siguiente tabla se resumen los usos más frecuentes que se hacen de estos comandos.</p>

<table class="table table-bordered">
    <colgroup>
        <col style="width:20%;">
        <col style="width:20%;">
        <col style="width:60%;">
    </colgroup>
    <thead>
        <tr>
            <th>Comando</th>
            <th>Alcance</th>
            <th>Uso más común</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>git reset</code></td>
            <td>Commit</td>
            <td>Descartar <em>commits</em> en una rama privada o descartar cambios no <em>commiteados</em></td>
        </tr>
        <tr>
            <td><code>git reset</code></td>
            <td>Archivo</td>
            <td>Cargar en el directorio <em>staged</em> una versión antigua del archivo</td>
        </tr>
        <tr>
            <td><code>git checkout</code></td>
            <td>Commit</td>
            <td>Cambiar entre ramas o inspeccionar <em>commits</em> antiguos</td>
        </tr>
        <tr>
            <td><code>git checkout</code></td>
            <td>Archivo</td>
            <td>Cargar en el directorio de trabajo una versión antigua del archivo</td>
        </tr>
        <tr>
            <td><code>git revert</code></td>
            <td>Commit</td>
            <td>Deshacer <em>commits</em> en una rama pública</td>
        </tr>
        <tr>
            <td><code>git revert</code></td>
            <td>Archivo</td>
            <td>No disponible</td>
        </tr>
    </tbody>
</table>