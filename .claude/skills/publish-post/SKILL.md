---
name: publish-post
description: >
  Publica un nuevo post en el blog Jekyll de aunitz.net. Usa esta skill cuando el usuario diga que
  quiere publicar un nuevo post, crear un artículo, añadir una entrada al blog, o algo similar.
  Automatiza la conversión de Word a HTML, la creación del fichero del post, la generación del
  frontmatter, la inserción de imágenes y la corrección de enlaces.
when_to_use: >
  Trigger phrases: "publicar un post", "nuevo post", "nuevo artículo", "crear post", "publicar
  artículo", "añadir entrada al blog", "publish post", "new post", "new blog post".
argument-hint: ""
allowed-tools: Read Write Edit Glob Grep Bash(ls *) AskUserQuestion
---

# Skill: Publicar nuevo post en el blog

Eres un asistente especializado en publicar nuevos posts en el blog Jekyll de aunitz.net. Sigue estos pasos en orden estricto.

## Paso 1: Solicitar el documento Word

Pide al usuario que adjunte el documento Word (.docx) con el contenido del nuevo post. Dile algo como:

> Adjunta el documento Word del nuevo post para que pueda procesarlo.

Espera a que el usuario proporcione el fichero. Lee su contenido completo. A partir de aquí, el contenido del Word es tu fuente principal.

## Paso 2: Analizar el contenido y preparar metadatos

A partir del contenido del Word:

1. **Identifica el título del post.** Será el título principal (heading 1 o el primer encabezado destacado del documento).
2. **Identifica el subtítulo.** Si existe un segundo encabezado o línea destacada justo después del título, úsalo como subtítulo. Si no hay subtítulo claro, pregunta al usuario.
3. **Genera la descripción SEO.** Debe ser un resumen del post de entre 100 y 150 caracteres. Escríbela en español.
4. **Identifica las etiquetas (tags).** Mira los posts existentes en `_posts/` para ver qué tags se usan habitualmente y propón las más adecuadas para este contenido. Los tags se escriben en minúscula.
5. **Determina la fecha.** Usa la fecha de hoy en formato `YYYY-MM-DD HH:MM:SS +0200`.

## Paso 3: Generar el nombre del fichero

El nombre del fichero sigue este patrón: `YYYY-MM-DD-slug.markdown`

Para generar el slug a partir del título:
- Convierte a minúsculas.
- Elimina tildes y acentos (á→a, é→e, í→i, ó→o, ú→u, ñ→n).
- Elimina signos de interrogación, exclamación, comillas, paréntesis y cualquier carácter especial.
- Elimina artículos sueltos: "el", "la", "los", "las", "un", "una", "unos", "unas" (solo cuando son palabras completas, no partes de otras palabras).
- Reemplaza espacios por guiones `-`.
- Elimina guiones duplicados.

Ejemplos de referencia:
- "¿Es la inteligencia artificial generativa una caja negra?" → `es-inteligencia-artificial-generativa-caja-negra`
- "¿Puede la inteligencia artificial superar a la humana?" → `puede-inteligencia-artificial-superar-humana`
- "Cómo funciona la inteligencia artificial generativa" → `como-funciona-inteligencia-artificial-generativa`
- "¿Qué es el diseño centrado en el usuario?" → `que-es-diseno-centrado-en-usuario`

## Paso 4: Determinar el header-img

Busca en los ficheros de `_posts/` cuál es el número más alto usado en `header-img: "img/post-bg-NNN.jpg"`. El nuevo post usará el siguiente número consecutivo. Verifica que la imagen existe en la carpeta `img/`. Si no existe, avisa al usuario de que deberá crearla manualmente.

## Paso 5: Preguntar por las imágenes del post

Pregunta al usuario:

> ¿Cuál es el nombre base de la primera imagen del post? (Por ejemplo: `como-sera-futuro-ingenieria-software-01.webp`)

A partir de esa respuesta:
1. Extrae el patrón base (todo excepto el número y la extensión).
2. Busca en la carpeta `img/` todas las imágenes que sigan ese patrón (01, 02, 03...).
3. Para cada imagen encontrada, obtén sus dimensiones reales usando el comando: `identify -format "%w %h"` (ImageMagick) o, si no está disponible, usa `file` o pide las dimensiones al usuario.
4. Si no puedes obtener las dimensiones, usa `width="720" height="405"` como valores por defecto y avisa al usuario para que los ajuste.

## Paso 6: Convertir el contenido Word a HTML limpio

Convierte el contenido del Word a HTML siguiendo estas reglas estrictas:

### Estructura HTML
- Usa `<p>` para párrafos.
- Usa `<strong>` para negritas y `<em>` para cursivas.
- Usa `<h2>` y `<h3>` para encabezados (nunca `<h1>`, que es el título del post).
- Usa `<ul>` y `<li>` para listas con viñetas, `<ol>` y `<li>` para listas numeradas.
- Usa `<blockquote>` para citas.
- No añadas clases CSS salvo `class="center-block"` en imágenes dentro de `<figure>`.
- No uses `<div>`, `<span>`, ni atributos `style`.
- No incluyas el título ni el subtítulo del post en el HTML (eso va en el frontmatter).

### Enlaces externos
A TODOS los enlaces que apunten fuera de aunitz.net, añádeles:
```html
target="_blank" rel="noopener noreferrer"
```

### Enlaces internos (a otros posts del blog)
Si el contenido enlaza a URLs del tipo `https://www.aunitz.net/SLUG/` o `http://www.aunitz.net/SLUG/`:
1. Busca en `_posts/` un fichero cuyo slug coincida.
2. Convierte el enlace a la sintaxis Jekyll:
```html
<a href="{{ site.baseurl }}{% post_url YYYY-MM-DD-slug %}">texto del enlace</a>
```
donde `YYYY-MM-DD-slug` es el nombre del fichero sin la extensión `.markdown`.

### Imágenes
Inserta las imágenes en los lugares adecuados del HTML. El usuario habrá indicado en el Word dónde van (generalmente entre secciones). Usa este formato:

```html
<p><img src="{{ site.baseurl }}/img/NOMBRE-IMAGEN.webp" loading="lazy" alt="" width="W" height="H"></p>
```

Si una imagen necesita caption, usa:
```html
<figure>
    <img src="{{ site.baseurl }}/img/NOMBRE-IMAGEN.webp" loading="lazy" alt="" width="W" height="H" class="center-block">
    <figcaption>Texto del caption</figcaption>
</figure>
```

## Paso 7: Crear el fichero del post

Crea el fichero en `_posts/` con el nombre generado en el Paso 3 y el siguiente contenido:

```markdown
---
layout:        post
title:         "TÍTULO DEL POST"
subtitle:      "SUBTÍTULO DEL POST"
description:   "DESCRIPCIÓN SEO GENERADA"
date:          YYYY-MM-DD HH:MM:SS +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-NNN.jpg"
tags:          [tag1, tag2]
---

CONTENIDO HTML GENERADO EN EL PASO 6
```

Notas sobre el frontmatter:
- Mantén el alineamiento visual de los valores (usa espacios para alinear como en los posts existentes).
- El `title` y `subtitle` van entre comillas dobles. Si contienen comillas dobles internas, escápalas correctamente.
- Los tags van en minúsculas y entre corchetes.

## Paso 8: Mostrar resumen y avisar al usuario

Una vez creado el fichero, muestra un resumen con:

- Nombre del fichero creado.
- Título, subtítulo y descripción.
- Número de imágenes insertadas.
- Número de enlaces internos convertidos a sintaxis Jekyll.
- Número de enlaces externos con atributos añadidos.
- Header-img asignado.

Finaliza con un mensaje como:

> El post se ha creado correctamente. Revisa el contenido del fichero antes de hacer commit y push al repositorio.

**IMPORTANTE:** No hagas commit ni push. El usuario se encargará de eso manualmente.
