# Bloque «También te puede interesar»

Rama: `feat/articulos-relacionados` (partida de `main` en `9d0c107`)
Estado: prueba funcionando en un solo post, pendiente de ajustar el aspecto visual.
Última sesión: 28/07/2026.

## Qué problema resuelve

Al final de un post la única continuidad era el Anterior/Siguiente cronológico,
que salta entre temáticas sin relación. El objetivo es aumentar las páginas
vistas por sesión ofreciendo artículos realmente afines.

## Qué hay hecho

Tres ficheros tocados, 115 líneas añadidas y ninguna borrada (commit `fc528c9`):

- `_includes/related-posts.html` — nuevo. Lógica de selección y marcado.
- `_layouts/post.html` — llama al include justo antes del Anterior/Siguiente,
  detrás de la puerta `{% if page.related %}`.
- `_posts/2026-06-21-dark-patterns-en-comercio-online.markdown` — se le ha
  añadido `related: true` al frontmatter. Es el único post con el bloque activo.

## Cómo selecciona los posts

No todas las etiquetas pesan igual. Compartir «sesgos cognitivos» (7 posts) dice
mucho más que compartir «buenas prácticas de usabilidad» (37 posts). Por eso cada
coincidencia puntúa según lo específica que sea la etiqueta:

| Posts con esa etiqueta | Puntos |
|---|---|
| ≤ 10 | 5 |
| ≤ 20 | 3 |
| > 20 | 1 |

A igualdad de puntos gana el post más reciente. Se muestran 3 (`related_limit`).

Detalle de implementación: en vez de recorrer los 166 posts del sitio, parte de
`site.tags[etiqueta]`, que ya devuelve solo los candidatos. Es Liquid puro, sin
plugins, compatible con GitHub Pages.

En el post de prueba el resultado son los tres de sesgos cognitivos: *Nuestra
mente ha evolucionado…*, *Efecto halo* y *Parálisis por análisis*. Ninguno de la
etiqueta paraguas.

## Cómo se presenta

Tres entradas apiladas a ancho completo, separadas por `<hr>`, reutilizando el
marcado `.post-preview` de la portada. Hereda de `clean-blog` las tipografías,
los tamaños (titular 36 px → 30 px en móvil; subtítulo 24 px → 20 px), el color
`#404040`, el hover a `#0085A1` y el `:visited` en morado.

El único estilo propio es una declaración, en un `<style scoped>` dentro del
include: baja el rótulo de 36 px a 24 px para que no compita con los titulares.
No hay fichero CSS nuevo ni petición extra.

Niveles de encabezado, comprobados en el DOM renderizado: `h1` (título del post)
→ `h2` (secciones del cuerpo) → `h2` (rótulo del bloque) → `h3`/`h4` (los
artículos). El tamaño no lo marca la etiqueta sino la clase, igual que en la
portada.

## Verificado

- Renderiza correctamente en escritorio (1280 px) y en móvil (375 px), sin
  desbordamiento horizontal.
- Compilación completa activando el bloque en **todos** los posts: **126 de 128**
  obtienen bloque. Los dos que no: `template` (no es un post real) y
  `para-que-sirven-las-lenguas`, único con la etiqueta `off topic`. Ahí el bloque
  simplemente no se pinta.
- Tiempo de compilación: **10,5 s** con el bloque en todos los posts frente a
  **10,8 s** con el bloque en uno solo. No hay penalización.

## Siguiente paso

**Pendiente: mejorar el aspecto del UI.** El punto de entrada es la parte final
de `_includes/related-posts.html` (marcado y `<style scoped>`); la lógica de
selección de la mitad superior no hace falta tocarla para cambiar el aspecto.

Decisiones ya tomadas y descartadas, para no repetirlas:

- Nada de miniaturas: las cabeceras son `post-bg-NNN.jpg` a tamaño completo y
  tres de ellas al pie de cada post se comerían lo ganado con el preconnect y el
  lazy loading. Harían falta versiones reducidas primero.
- Descartada la rejilla de 3 tarjetas en columnas: a 230 px por columna los
  titulares largos ocupaban hasta cinco líneas.
- Descartado el rótulo de etiqueta sobre cada titular y el truncado del
  subtítulo.

## Cuando se dé por bueno

1. En `_layouts/post.html`, cambiar la condición `page.related` por
   `page.related != false`. Queda activo por defecto y con la opción de
   desactivarlo post a post con `related: false`.
2. Quitar `related: true` del frontmatter de
   `2026-06-21-dark-patterns-en-comercio-online.markdown`.
3. Borrar este fichero de plan.
