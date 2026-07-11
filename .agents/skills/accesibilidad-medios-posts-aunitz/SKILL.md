---
name: accesibilidad-medios-posts-aunitz
description: Revisa y completa los atributos de accesibilidad de medios en posts del blog Jekyll de aunitz.net. Usa esta skill cuando el usuario pida añadir, revisar, aplicar o validar textos alternativos, atributos alt de imágenes, title de vídeos o accesibilidad de medios en un post nuevo, el último post publicado, un post concreto o varios posts del blog.
---

# Skill: Accesibilidad de medios en posts de aunitz.net

Eres un asistente especializado en revisar medios dentro de posts del blog Jekyll `aunitz.net` y completar sus atributos de accesibilidad sin alterar el resto del contenido.

## Alcance por defecto

Si el usuario no indica un fichero concreto, aplica la revisión solo al último post añadido en `_posts/`. Si el usuario pide "el post de hoy", usa únicamente los posts cuya fecha de nombre sea la fecha actual y elige el último si hay más de uno.

No revises todo el histórico salvo que el usuario lo pida explícitamente.

## Objetivo

Revisar los medios dentro del contenido del artículo:

- `<img>`: añadir o corregir `alt`.
- `<video>`: añadir o corregir `title` cuando el vídeo aporte contenido.
- `<iframe>` de vídeo, especialmente YouTube o Vimeo: añadir o corregir `title` cuando falte o sea insuficiente.

El contenido de cada post se inyecta dentro de `<article>` desde `_layouts/post.html` mediante `{{ content }}`. Aunque el fichero Markdown no contenga la etiqueta `<article>`, trata todo el contenido posterior al frontmatter como contenido del artículo.

No modifiques `header-img`; no forma parte de esta revisión.

## Exclusión obligatoria

No modifiques ningún post cuyo frontmatter contenga:

```yaml
source_org: "The Conversation"
```

En esos posts no cambies imágenes, vídeos, contador invisible, enlaces, formato ni metadatos.

## Flujo de trabajo

1. Identifica el post o posts objetivo.
2. Comprueba si alguno tiene `source_org: "The Conversation"` y omítelo por completo.
3. Lista los medios del contenido con línea aproximada, `src`, `alt` o `title` existente y contexto cercano.
4. Revisa visualmente cada imagen o vídeo antes de describirlo.
5. Edita solo los atributos necesarios: `alt` y `title`.
6. Valida el post editado.
7. Entrega un resumen breve con cambios y validaciones.

Procesa un post completo antes de pasar al siguiente. No hagas cambios globales automáticos.

## Inspección visual

Para imágenes locales:

- Resuelve `{{ site.baseurl }}/img/...` como `img/...`.
- Abre y visualiza el archivo real antes de escribir el `alt`.
- Si la imagen está enlazada a una versión `-xl`, revisa la imagen mostrada en `<img>` y usa la versión grande solo si necesitas leer detalles.
- En `.gif` y `.webm`, inspecciona el movimiento cuando sea relevante para comprender el contenido.

Para vídeos:

- En `<video>`, revisa el archivo local y el contexto del post.
- En `<iframe>`, revisa el `src` y el contexto editorial.
- Si ya existe un `title` correcto, no lo cambies.

No inventes descripciones sin mirar el medio. Si un medio no se puede abrir o no se entiende con seguridad, déjalo pendiente y repórtalo.

## Criterio para `alt`

Una imagen necesita `alt` descriptivo si aporta información, ejemplo, prueba visual, captura de interfaz, diagrama, comparación, animación explicativa o contenido que el texto comenta.

Una imagen puede mantener `alt=""` solo si es realmente decorativa, separadora, redundante o un píxel/contador invisible.

Reglas:

- No dejes `alt=""` en capturas, diagramas, gráficos, animaciones o ejemplos visuales mencionados por el texto.
- No conviertas imágenes decorativas en descriptivas solo por completar.
- No elimines un `alt` correcto.
- Corrige un `alt` existente si es vacío, genérico, erróneo, SEO-forzado o no describe el aspecto relevante.

## Estilo de `alt`

Escribe en español natural, siguiendo como referencia el estilo de:

```text
_posts/2026-05-12-buenas-practicas-usabilidad-chatbot-ia-sitio-web.markdown
```

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

Si necesitas comillas dentro de un atributo, usa comillas latinas o entidades HTML para no romper el HTML.

## Estilo de `title` en vídeos

Los vídeos no admiten `alt`; usa `title` cuando aporten contenido.

El `title` debe describir el contenido o la función del vídeo en el contexto del post. Para YouTube o Vimeo, puedes usar el título público si es adecuado; si no, escribe un título contextual en español.

Ejemplo:

```html
title="Ejemplo de campo de texto de chatbot que aumenta de altura progresivamente mientras el usuario escribe una consulta larga"
```

## Reglas de edición

- Edita solo atributos `alt` y `title`.
- Preserva el resto del HTML.
- No reformatees posts completos.
- No cambies orden, clases, dimensiones, `loading`, enlaces, Liquid ni frontmatter.
- No toques layouts, includes, CSS ni JS.
- No cambies posts de The Conversation.

## Validación

Después de editar cada post:

- Revisa el diff o, si el fichero no está trackeado, revisa directamente las líneas modificadas.
- Confirma que no se han roto comillas dentro de atributos.
- Confirma que los atributos quedan dentro de la etiqueta correcta.
- Busca imágenes sin `alt`.
- Busca imágenes con `alt=""` y confirma que las restantes son decorativas o casos pendientes.
- Busca `<video>` sin `title`.
- Busca `<iframe>` de vídeo sin `title`.
- Confirma que ningún post con `source_org: "The Conversation"` fue modificado.
- Si es razonable, ejecuta `bundle exec jekyll build`.

## Resumen final

Entrega:

- Post o posts revisados.
- Imágenes con `alt` añadido o corregido.
- Vídeos o iframes con `title` añadido o corregido.
- Posts omitidos por ser de The Conversation.
- Casos pendientes, si los hay.
- Validaciones realizadas.
