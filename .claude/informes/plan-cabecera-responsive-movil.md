# Plan: servir una imagen de cabecera más pequeña en móvil

**Estado:** pendiente de ejecutar. Redactado en agosto de 2026 a partir del informe de Lighthouse móvil de `https://www.aunitz.net/open-llm-basque-day/`.

**Origen:** punto 3b del análisis de rendimiento móvil. Los puntos 1 (contraste del navbar) y 3a (subsetting de tipografías) ya se resolvieron en esa misma sesión; este queda para más adelante.

---

## 1. Qué problema resuelve

El elemento LCP de una página de post es `header.intro-header`, es decir, la imagen de cabecera, que se aplica como `background-image`. Hoy se sirve **el mismo fichero de 1500 px a todos los dispositivos**.

En el informe móvil (Moto G Power, 412 px de ancho, DPR 1,75, 1,6 Mbps):

| Métrica | Valor |
|---|---|
| LCP | 3.569 ms (puntúa 62 sobre un peso de 25) |
| `lcpLoadDelay` | 953 ms |
| `lcpLoadDuration` | 1.437 ms |
| Peso del recurso LCP (`post-bg-121.webp`) | 55,7 KB |

Un móvil de 412 px con DPR 1,75 necesita como mucho **721 px reales**. Se le están enviando 1500. Una variante de ~800 px de ancho baja el fichero a unos 20 KB: **≈35 KB menos, y no en un recurso cualquiera, sino en el propio recurso que define el LCP**.

### Ganancia esperada, sin adornos

A los ~184 KB/s efectivos que simula Lighthouse en móvil, 35 KB son **unos 190 ms**. El LCP bajaría de ~3,57 s a ~3,38 s y la puntuación de Performance subiría **1 o 2 puntos**.

Es una mejora modesta en la métrica sintética. Lo que la justifica es otra cosa: **es tráfico real que se ahorra a cada visitante desde móvil**, que es la mayoría, y a diferencia del subsetting de tipografías (descartado por rendir 10,6 KB) aquí el ahorro es grande, cae sobre el recurso crítico y no tiene contrapartida de fragilidad.

---

## 2. Qué hay ya montado en el repositorio

Antes de escribir nada, conviene saber que **media parte del andamiaje ya existe**, aunque hoy no hace nada.

`_layouts/post.html` (líneas 6-15) ya emite un bloque `<style>` con dos reglas y un `@media`:

```liquid
<style>
    .intro-header {
        background-image: url('{% if page.header-img %}...{% elsif page.header-img-cdn %}...{% else %}...{% endif %}');
    }
    @media (max-width: 767px) {
        .intro-header {
            background-image: url('{% if page.header-img %}...{% elsif page.header-img-cdn-mini %}...{% else %}...{% endif %}');
        }
    }
</style>
```

**La media query está muerta.** Cuando el post define `header-img` —que es el caso de los 126 posts que la tienen— las dos ramas resuelven al **mismo fichero**, porque `page.header-img` se evalúa primero en las dos. La rama `header-img-cdn-mini` solo entraría si no hubiera `header-img`, algo que hoy no ocurre en ningún post. Es un resto de una época en la que las cabeceras se servían desde un CDN externo.

Es decir: **no hay que inventar la estructura, hay que revivirla.**

---

## 3. La trampa que hay que evitar

⚠️ **Este es el punto que puede hacer que el cambio salga peor que no hacerlo.**

`_includes/head.html` (líneas 7-12) precarga la imagen LCP:

```liquid
<link rel="preload" as="image" fetchpriority="high" href="{{ site.baseurl }}/{{ page.header-img }}">
```

Ese `preload` **no tiene atributo `media`**. Si se añade una variante móvil solo en el CSS y se deja el preload como está, el móvil se descargará **las dos imágenes**: la grande porque el preload se la pide con `fetchpriority="high"`, y la pequeña porque el CSS es quien manda al pintar. El resultado sería más tráfico y un LCP peor que el actual.

**El preload y la media query del CSS tienen que llevar exactamente el mismo punto de corte**, y hay que duplicar el preload en dos, uno por rama:

```html
<link rel="preload" as="image" fetchpriority="high" media="(max-width: 767px)"  href="…-mini.webp">
<link rel="preload" as="image" fetchpriority="high" media="(min-width: 768px)" href="…webp">
```

El atributo `media` sí se respeta en `<link rel="preload">`: el navegador solo descarga el que casa. Y 767/768 px es el mismo corte que ya usa todo `less/clean-blog.less`, así que no se introduce un breakpoint nuevo.

---

## 4. Diseño propuesto

### 4.1 Nueva clave de frontmatter

Añadir un atributo **opcional** a los posts:

```yaml
header-img:      "img/post-bg-NNN.webp"
header-img-mini: "img/post-bg-NNN-mini.webp"
```

Opcional es la palabra clave: **los 126 posts que hoy tienen `header-img` tienen que seguir funcionando sin tocarlos**. La lógica Liquid debe caer con elegancia a la imagen grande cuando no exista la variante.

### 4.2 Convención de nombres

`post-bg-NNN-mini.webp`, junto a la imagen grande en `img/`. Encaja con la convención que ya fija `CLAUDE.md` (`post-bg-NNN.jpg`, numeración consecutiva) sin abrir una carpeta nueva ni un esquema paralelo.

### 4.3 Especificaciones de la variante

| Parámetro | Valor | Motivo |
|---|---|---|
| Ancho | 800 px | Cubre 412 px × DPR 1,75 = 721 px con margen |
| Alto | 253 px | Mantiene la proporción 1500×474 (3,165:1) |
| Formato | WebP | Ya se usa en `post-bg-121.webp` y en `home-bg.webp` |
| Calidad | 78-82 | Punto habitual de WebP antes de que se note |
| Objetivo de peso | ≤ 22 KB | Desde los ~55 KB actuales |

### 4.4 Por qué media query y no `image-set()`

`image-set()` resolvería el caso por densidad de píxel en una sola declaración, pero la decisión aquí **no es de densidad sino de tamaño de viewport**, y además el `preload` seguiría necesitando su `media` de todas formas. La media query es más simple, ya está escrita en el layout y usa un corte que el proyecto ya tiene interiorizado. **No cambiar a `image-set()`.**

---

## 5. Cambios de código

### 5.1 `_layouts/post.html`

Arreglar la rama muerta para que la media query consulte primero `header-img-mini`:

```liquid
@media (max-width: 767px) {
    .intro-header {
        background-image: url('{% if page.header-img-mini %}{{ site.baseurl }}/{{ page.header-img-mini }}{% elsif page.header-img %}{{ site.baseurl }}/{{ page.header-img }}{% elsif page.header-img-cdn-mini %}{{ page.header-img-cdn-mini }}{% else %}{{ site.baseurl }}/{{ site.header-img }}{% endif %}');
    }
}
```

El orden importa: `header-img-mini` **antes** que `header-img`, que es justo lo que hoy está al revés.

### 5.2 `_includes/head.html`

Sustituir el preload único por los dos con `media`. Mantener `fetchpriority="high"` en ambos: Lighthouse ya da por buenos los tres checks de *LCP request discovery* y no hay que perderlos.

Cuando el post **no** tenga `header-img-mini`, emitir un solo preload sin `media`, exactamente como hoy. Así los 126 posts antiguos no cambian ni un byte de su HTML.

### 5.3 `_layouts/page.html` — ojo, este es distinto

La línea 6 aplica la imagen con un **atributo `style=` en línea**, no con un bloque `<style>`:

```liquid
<header class="intro-header" style="background-image: url('…')">
```

Un atributo `style` **no admite media queries**. Si se quiere extender la mejora a las páginas (`/about/`, `/tags/`…), hay que convertirlo antes al mismo patrón de bloque `<style>` que usa `post.html`. **Es un cambio aparte y con su propio riesgo de regresión visual; no meterlo en el mismo commit.**

Recomendación: dejar `page.html` fuera del alcance inicial. Las páginas son una fracción mínima del tráfico frente a 166 posts.

---

## 6. Generación de las imágenes

### 6.1 Alcance: no regenerar las 126 de golpe

Hay **122 imágenes de cabecera, 5,41 MB en total, con una media de 45,4 KB**; 120 son JPG y solo 2 WebP. Regenerarlas todas duplicaría el número de ficheros del directorio `img/` para un beneficio muy desigual: el tráfico se concentra en los posts recientes y en un puñado de perennes.

Propuesta en dos tiempos:

1. **De aquí en adelante:** cada post nuevo se publica con su variante `-mini`.
2. **Retroactivo y selectivo:** sacar de Google Analytics los 15-20 posts más visitados y generar solo esas variantes. Cubre la mayor parte del tráfico real con una fracción del trabajo.

### 6.2 Herramienta

El repositorio **no tiene hoy ninguna cadena de build de imágenes** (ni `package.json`, ni `node_modules`; el CSS se compila con extensiones de VS Code). Opciones, de menos a más intrusiva:

- **Squoosh o cualquier conversor web**, a mano. Cero infraestructura. Razonable si se aplica el enfoque «una por post nuevo».
- **`sharp` en un script suelto de Node**, ejecutado a demanda y sin comprometerlo al repositorio. Adecuado para el lote retroactivo de 15-20.
- **Un paso de build en el workflow de GitHub Actions.** Es la opción correcta si algún día se decide regenerar las 122, pero **desproporcionada** para el alcance de este plan.

Recomendación: la primera para el día a día, la segunda para el lote retroactivo.

---

## 7. Integración con la skill de publicación

`.claude/skills/publish-post-blog-aunitz/SKILL.md` gestiona el `header-img` en su **paso 4** (busca el número consecutivo más alto y verifica que la imagen existe en `img/`), y vuelca el frontmatter en las líneas 409 y 525.

Si este plan se ejecuta, **hay que actualizar la skill en los tres sitios** para que pida o genere también la variante `-mini` y añada `header-img-mini` al frontmatter. Si no, cada post nuevo publicado con la skill nacerá sin variante móvil y la mejora se irá diluyendo sola.

---

## 8. Documentación que hay que actualizar

- **`CLAUDE.md`**, sección «Naming conventions»: añadir `post-bg-NNN-mini.webp`.
- **`CLAUDE.md`**, sección «Frontmatter de posts»: añadir `header-img-mini` a los atributos opcionales.
- **`AGENTS.md`**: replicar ambos cambios. La «Nota de mantenimiento» del propio `CLAUDE.md` obliga a mantener los dos ficheros sincronizados.
- **Este documento**: marcarlo como ejecutado, con la fecha y el resultado medido.

---

## 9. Verificación

Que **ninguno de estos pasos se dé por bueno sin comprobarlo**; el modo de fallo más probable (descargar las dos imágenes) es invisible a simple vista, porque la página se ve perfecta.

1. **Que el móvil pide una sola imagen, y la pequeña.** Con el sitio servido, DevTools o las herramientas de navegador en 412 px de ancho, recargar y filtrar la pestaña de red por `post-bg`. **Tiene que aparecer exactamente una petición, y ser la `-mini`.** Si aparecen dos, el `media` del preload no casa con el de la media query.
2. **Que el escritorio sigue pidiendo la grande.** Lo mismo a 1280 px: una sola petición, la de 1500 px.
3. **Que no se ha roto el descubrimiento del LCP.** Repetir Lighthouse en móvil y confirmar que la auditoría *LCP request discovery* mantiene sus tres checks en verde (`priorityHinted`, `requestDiscoverable`, `eagerlyLoaded`).
4. **Que el LCP baja.** Comparar `largestContentfulPaint` y `lcpLoadDuration` con la línea base de este documento (3.569 ms y 1.437 ms). **En ventana de incógnito y sin extensiones**: el informe original se tomó con una extensión de Chrome inyectando scripts, y eso mete ruido en la comparación.
5. **Que la cabecera se ve bien.** Revisar un par de posts a 375, 412 y 768 px. El texto blanco del `.intro-header` va directo sobre la foto, sin velo, así que una recompresión agresiva puede empeorar un contraste que ya es justo (ver el aviso de `CLAUDE.md` sobre `.meta`, que es texto normal de 20 px y necesita 4,5:1).
6. **Que la caché de Cloudflare no despista.** Las imágenes nuevas responderán `cf-cache-status: MISS` la primera vez. Es lo esperado. El workflow `purge-cloudflare-cache.yml` se dispara en cada despliegue.

---

## 10. Riesgos

| Riesgo | Gravedad | Mitigación |
|---|---|---|
| El móvil descarga las dos imágenes | **Alta** — deja el sitio peor que antes | Paso 1 de la verificación, innegociable |
| Se toca `page.html` y se rompe el `intro-header` de las páginas | Media | Dejarlo fuera del alcance inicial |
| Los posts sin `-mini` dejan de renderizar la cabecera | Alta | Cadena de `elsif` con fallback a `header-img`; probar con un post antiguo |
| La skill de publicación se queda desactualizada | Media | Sección 7 |
| La recompresión daña el contraste del texto de cabecera | Baja | Paso 5 de la verificación |
| Duplicar 122 ficheros en `img/` | Baja | Enfoque selectivo de la sección 6.1 |

---

## 11. Orden de ejecución sugerido

1. Generar la variante `-mini` de **un solo post** (`post-bg-121.webp` → `post-bg-121-mini.webp`) y añadir `header-img-mini` a su frontmatter.
2. Aplicar los cambios de `post.html` y `head.html`.
3. Verificar los pasos 1, 2 y 3 en local **con ese post y con uno antiguo sin variante**. Este es el punto de no retorno: si el número de peticiones no es el correcto, parar aquí.
4. Desplegar y medir con Lighthouse móvil (paso 4).
5. Solo si la medición confirma la mejora: lote retroactivo de los 15-20 posts más visitados.
6. Actualizar la skill de publicación y la documentación (secciones 7 y 8).
