# Plan de trabajo: textos alternativos y títulos para medios en posts

Este documento sirve como orden de trabajo reutilizable para un agente de Codex que revise los posts del sitio `aunitz.net` y complete los atributos de accesibilidad de imágenes y vídeos dentro del contenido de los artículos.

## Objetivo

Recorrer uno por uno los posts de `_posts/` y revisar las imágenes y vídeos que aparecen dentro del contenido del post, es decir, dentro del `<article>` generado por el layout.

El agente debe:

- Añadir o corregir el atributo `alt` de las imágenes relevantes para el contenido.
- Mantener `alt=""` solo en imágenes realmente decorativas o no informativas.
- Añadir o corregir el atributo `title` de vídeos HTML5 y vídeos embebidos cuando falte o sea insuficiente.
- No hacer ningún cambio en posts republicados de The Conversation.

## Contexto del sitio

El sitio es un blog Jekyll. Los posts se encuentran en:

```text
_posts/*.markdown
```

El contenido de cada post se inyecta dentro de `<article>` desde `_layouts/post.html`, mediante `{{ content }}`. Por tanto, aunque la etiqueta `<article>` no aparezca dentro de cada fichero Markdown, todo el contenido posterior al frontmatter del post debe tratarse como contenido del artículo.

El ejemplo de referencia para el estilo correcto de `alt` y `title` es:

```text
_posts/2026-05-12-buenas-practicas-usabilidad-chatbot-ia-sitio-web.markdown
```

## Exclusión obligatoria: The Conversation

No se debe modificar absolutamente nada en posts cuyo frontmatter contenga:

```yaml
source_org: "The Conversation"
```

En esos posts no se debe cambiar ni siquiera el contador invisible, imágenes, enlaces, formato o metadatos.

Posts identificados inicialmente:

- `_posts/2026-01-01-para-que-sirven-las-lenguas.markdown`
- `_posts/2026-02-21-puede-inteligencia-artificial-superar-humana.markdown`
- `_posts/2026-04-26-ia-facilita-pero-no-garantiza-aprendizaje-en-organizaciones.markdown`
- `_posts/2026-05-31-lo-que-inteligencia-artificial-nos-ensena-sobre-que-es-realmente-inteligencia.markdown`

El agente debe volver a comprobar esta lista antes de empezar, por si se han añadido nuevas republicaciones.

## Inventario inicial

Antes de editar, generar una lista de posts candidatos con medios dentro del contenido:

- `<img>`
- `<video>`
- `<iframe>` de vídeo, especialmente YouTube o Vimeo

Para cada medio registrar mentalmente o en notas de trabajo:

- fichero del post
- línea aproximada
- `src`
- `alt` existente, si es imagen
- `title` existente, si es vídeo o iframe
- encabezado anterior
- párrafo anterior y posterior

## Orden de trabajo

1. Recorrer los posts de forma cronológica.
2. Procesar un post completo antes de pasar al siguiente.
3. No hacer cambios globales automáticos.
4. Revisar visualmente cada imagen o vídeo antes de describirlo.
5. Revisar el diff del post antes de continuar con el siguiente bloque.

## Inspección visual

Para cada imagen local:

- Resolver `{{ site.baseurl }}/img/...` como `img/...`.
- Abrir y visualizar el archivo real.
- Si hay una versión enlazada `-xl`, revisar la imagen mostrada en `<img>` y usar la versión grande solo si hace falta para leer detalles.
- En `.gif` y `.webm`, inspeccionar el movimiento cuando sea relevante para comprender el contenido.

Para vídeos:

- En `<video>`, revisar el archivo local y el contexto del post.
- En `<iframe>`, revisar el `src` y el contexto editorial.
- Si ya existe un `title` correcto, no cambiarlo.

No inventar descripciones sin mirar el medio. Si una imagen o vídeo no se puede abrir o no se entiende con seguridad, dejarlo pendiente y reportarlo.

## Criterio para decidir si una imagen necesita alt

Una imagen es relevante si aporta información, ejemplo, prueba visual, captura de interfaz, diagrama, comparación, animación explicativa o contenido que el texto comenta.

Una imagen es decorativa si solo separa, adorna, repite sin aportar información o funciona como píxel/contador invisible.

Reglas:

- Las imágenes relevantes deben tener un `alt` descriptivo.
- Las imágenes decorativas pueden mantener `alt=""`.
- No cambiar imágenes decorativas a `alt` descriptivo solo por completar.
- No dejar `alt=""` en capturas, diagramas, gráficos, animaciones o ejemplos visuales mencionados por el texto.

## Estilo de los alt

Escribir los `alt` en español natural, siguiendo el estilo del post de referencia.

El `alt` debe:

- Describir lo que se ve.
- Explicar el aspecto relevante para el contexto del post.
- Ser conciso, normalmente una sola frase.
- Evitar relleno como "imagen de" o "captura de" si no aporta nada.
- Evitar usar el nombre del archivo como descripción.
- Evitar SEO forzado.
- Evitar empezar todos los `alt` con la misma fórmula.

Ejemplo correcto:

```html
alt="Chatbot de Leroy Merlin respondiendo a una consulta sobre pintura naranja con tarjetas de producto que incluyen fotografías y precios"
```

Ejemplo insuficiente:

```html
alt="Leroy Merlin"
```

Ejemplo decorativo válido:

```html
alt=""
```

## Estilo de los title en vídeos

Los vídeos no admiten `alt`, por lo que deben tener `title` cuando aporten contenido.

Aplicar a:

- `<video>`
- `<iframe>` de vídeo

El `title` debe describir el contenido o la función del vídeo en el contexto del post.

Ejemplo:

```html
title="Ejemplo de campo de texto de chatbot que aumenta de altura progresivamente mientras el usuario escribe una consulta larga"
```

Para vídeos de YouTube o Vimeo, si el título público del vídeo es adecuado, puede usarse. Si no, escribir un título contextual en español.

## Reglas de edición

- Editar solo atributos necesarios: `alt` y `title`.
- Preservar el resto del HTML.
- No reformatear posts completos.
- No cambiar orden, clases, dimensiones, `loading`, enlaces, Liquid ni frontmatter salvo que sea imprescindible para el atributo trabajado.
- No tocar `header-img`.
- No tocar layouts, includes, CSS ni JS.
- No modificar posts de The Conversation.

## Validación por post

Después de editar cada post:

- Revisar el diff.
- Confirmar que no se han roto comillas dentro de atributos.
- Si el texto necesita comillas internas, usar comillas latinas o entidades HTML.
- Confirmar que los atributos quedan dentro de la etiqueta correcta.
- Confirmar que no se han producido cambios ajenos al objetivo.

## Validación final

Al terminar:

1. Buscar imágenes sin `alt`.
2. Buscar imágenes con `alt=""` y confirmar que las restantes son decorativas o casos pendientes.
3. Buscar `<video>` sin `title`.
4. Buscar `<iframe>` de vídeo sin `title`.
5. Confirmar que ningún post con `source_org: "The Conversation"` aparece en el diff.
6. Si es posible, ejecutar una revisión local del sitio.

## Resumen final esperado

El agente debe entregar un resumen con:

- Número de posts revisados.
- Número de posts modificados.
- Número de imágenes con `alt` añadido o corregido.
- Número de vídeos o iframes con `title` añadido o corregido.
- Lista de posts omitidos por ser de The Conversation.
- Casos pendientes, si los hay.
- Validaciones realizadas.

## Prompt de ejecución para Codex

Usa este documento como orden de trabajo. Recorre los posts de `_posts/` uno por uno y completa los atributos de accesibilidad de medios dentro del contenido del artículo:

- `alt` en imágenes relevantes.
- `title` en vídeos HTML5 y vídeos embebidos.

Sigue estrictamente las exclusiones, criterios de relevancia, estilo editorial, reglas de edición y validaciones descritas aquí.

No modifiques ningún post con `source_org: "The Conversation"`.

Usa como ejemplo de estilo:

```text
_posts/2026-05-12-buenas-practicas-usabilidad-chatbot-ia-sitio-web.markdown
```

No inventes descripciones sin revisar visualmente el medio y su contexto. Si no puedes inspeccionar una imagen o vídeo con seguridad, deja el caso pendiente y repórtalo en el resumen final.
