---
name: republish-theconversation-aunitz
description: >
  Republica un artículo de The Conversation en el blog Jekyll de aunitz.net respetando la licencia
  Creative Commons. Usa esta skill cuando el usuario diga que quiere republicar un artículo de
  The Conversation, añadir un post de The Conversation al blog, o algo similar. Pide al usuario
  el código HTML que The Conversation facilita en su pestaña "Republicar" y lo procesa siguiendo
  exactamente el formato de los posts republicados ya existentes en el blog.
when_to_use: >
  Trigger phrases: "republicar artículo de The Conversation", "republicar The Conversation",
  "post de The Conversation", "nuevo post de The Conversation", "añadir artículo de The Conversation",
  "republish The Conversation".
argument-hint: "[--test]"
allowed-tools: Read Write Edit Glob Grep Bash AskUserQuestion WebFetch
---

# Skill: Republicar artículo de The Conversation

Eres un asistente especializado en republicar artículos de **The Conversation** en el blog Jekyll de aunitz.net respetando los términos de su licencia Creative Commons. Sigue estos pasos en orden estricto.

## Contexto importante: licencia Creative Commons

The Conversation publica sus artículos bajo licencia Creative Commons. La republicación está permitida siempre que se cumplan estas condiciones obligatorias:

- **Conservar la autoría original** (autor, cargo, institución).
- **Conservar el enlace al artículo original** en The Conversation.
- **Mantener intacto el píxel de seguimiento** (`<img src="https://counter.theconversation.com/...">`) que aparece al final del cuerpo. Nunca lo elimines ni lo modifiques.
- **No alterar el contenido** del artículo más allá de los ajustes mínimos de presentación necesarios para integrarlo en el blog (envoltorio `<div>`, atributos `target/rel`, conversión de imágenes a rutas locales, etc.).

Si en cualquier paso no estás seguro de si una transformación respeta la licencia, mantén el HTML tal cual.

## Modos de ejecución

La skill tiene dos modos:

- **Modo real (por defecto):** ejecuta todo el proceso, descarga las imágenes a `img/` y deja el post creado en `_posts/` para que el usuario lo revise, haga commit y push manualmente.
- **Modo prueba:** se activa cuando el usuario incluye `--test`, `test`, `prueba` o expresiones similares ("en modo prueba", "modo test") en la invocación. Ejecuta todo el proceso igual que el modo real, con dos diferencias:
  1. **No se descargan ni se crean imágenes nuevas reales.** Se usan imágenes cualquiera ya existentes en la carpeta `img/` aunque no tengan relación con el contenido (ver Pasos 4 y 6).
  2. **Al finalizar, se ofrece borrar el post creado** (ver Paso 10).

Identifica el modo al inicio y tenlo en cuenta en los pasos marcados con "⚠ Modo prueba".

## Paso 1: Solicitar el código HTML

Pide al usuario que pegue el código HTML que The Conversation facilita en su pestaña "Republicar" → "Básico". Dile algo como:

> Pega aquí el código HTML del artículo que The Conversation te ha facilitado para republicar. Cópialo desde la pestaña **"Básico"** del cuadro de republicación: ese código ya incluye el píxel oculto del contador, no hace falta usar la pestaña "Avanzado".

Espera a que el usuario lo pegue. El HTML típico contiene:

- Un `<h1>` con el título.
- Un `<h2>` o párrafo destacado con el subtítulo (kicker).
- Un párrafo con la firma del autor (con enlaces a su perfil y su institución en `theconversation.com`).
- El cuerpo del artículo con `<p>`, `<h2>`, `<figure>`, etc.
- Imágenes alojadas en `https://images.theconversation.com/files/...`.
- Un píxel contador de tipo `<img src="https://counter.theconversation.com/content/NNNNN/count.gif?...">` al final del cuerpo.
- Un párrafo final de atribución/licencia con enlace al artículo original.

Si el HTML pegado no contiene la URL de The Conversation o el píxel contador, avisa al usuario de que parece incompleto y pídele que lo pegue desde la pestaña **Básico** del cuadro de republicación.

## Paso 2: Extraer metadatos del HTML

Analiza el HTML proporcionado y extrae los siguientes datos. Estos datos son los que necesitarás para construir el byline propio del Paso 7 (no se reutiliza el byline original del HTML):

1. **Título:** texto del `<h1>` (si no hay `<h1>`, el primer encabezado destacado).
2. **Subtítulo (kicker):** texto del `<h2>` que sigue inmediatamente al título, o del primer párrafo destacado si no hay `<h2>` previo al cuerpo. Si no hay subtítulo claro, pregunta al usuario.
3. **Nombre del autor.**
4. **URL de la ficha del autor en The Conversation** (enlace a `https://theconversation.com/profiles/...`).
5. **Cargo del autor** (texto entre el nombre del autor y el enlace a la institución, p. ej. "Profesora Titular de Ciencias de la Computación e Inteligencia Artificial").
6. **Nombre de la institución.**
7. **URL de la ficha de la institución en The Conversation** (enlace a `https://theconversation.com/institutions/...`).
8. **URL del artículo original (canonical):** la URL `https://theconversation.com/SLUG-NNNNNN` que aparece en el bloque de atribución final o que puedes deducir a partir del ID del píxel contador.
9. **ID numérico del contador:** los dígitos del píxel `https://counter.theconversation.com/content/NNNNNN/count.gif`.
10. **Fecha original de publicación en The Conversation** en formato "DD de MES de YYYY" (p. ej. "14 de diciembre de 2022"). Búscala en el bloque de atribución final ("Este artículo fue publicado originalmente el DD de MES de YYYY").
11. **Píxel contador completo:** copia tal cual la etiqueta `<img>` del contador, incluyendo todos sus atributos. Se reutiliza intacto en el Paso 7.

**Verificación antes de continuar.** El HTML que The Conversation facilita en su pestaña "Básico" suele contener todos estos datos en el bloque de atribución (byline original) que aparece al inicio y/o al final del artículo, por lo que normalmente no necesitarás pedir nada al usuario. Si tras analizar el HTML te falta cualquiera de los datos 3–10, **pídeselos al usuario antes de continuar** (preferentemente con `AskUserQuestion`). No avances al Paso 3 con campos vacíos: el byline del Paso 7 los necesita todos.

Si el HTML está en inglés u otro idioma distinto del español, **detente** y avisa al usuario: esta skill solo se usa con artículos en español de The Conversation, ya que el blog publica únicamente en español.

## Paso 3: Preparar metadatos del post

A partir de los datos extraídos:

1. **Descripción SEO.** Genera un resumen del artículo de entre 100 y 150 caracteres en español. Propón una versión y, si tienes dudas, pide confirmación al usuario.
2. **Etiquetas (tags).** Mira los posts existentes en `_posts/` (especialmente los republicados de The Conversation y los del último año) para ver qué tags existen. Propón las más adecuadas al contenido del artículo. Los tags se escriben en minúscula. Confirma con el usuario antes de aplicarlos.
3. **Fecha de publicación en el blog.** Usa la fecha de hoy en formato `YYYY-MM-DD HH:MM:SS +0200`. **No uses la fecha original** del artículo en The Conversation: esa va en el byline, no en el frontmatter `date`.

## Paso 4: Generar el slug y el nombre del fichero

El slug se deriva del título del artículo siguiendo las mismas reglas que la skill `publish-post-blog-aunitz`:

- Convierte a minúsculas.
- Elimina tildes y acentos (á→a, é→e, í→i, ó→o, ú→u, ñ→n).
- Elimina signos de interrogación, exclamación, comillas, paréntesis y caracteres especiales.
- Elimina artículos sueltos: "el", "la", "los", "las", "un", "una", "unos", "unas".
- Reemplaza espacios por guiones `-`.
- Elimina guiones duplicados.

Ejemplos:
- "¿Puede la inteligencia artificial superar a la humana?" → `puede-inteligencia-artificial-superar-humana`
- "¿Para qué sirven las lenguas?" → `para-que-sirven-las-lenguas`

Nombre del fichero: `_posts/YYYY-MM-DD-slug.markdown` con la fecha de hoy.

## Paso 5: Determinar el header-img

Busca en los ficheros de `_posts/` el número más alto utilizado en `header-img: "img/post-bg-NNN.jpg"`. El nuevo post usará el siguiente número consecutivo (por ejemplo, si el último es `post-bg-114.jpg`, este post usará `post-bg-115.jpg`).

Verifica si la imagen existe en `img/`:

- **Si existe:** úsala.
- **Si no existe:** asígnala en el frontmatter de todas formas y avisa al usuario de que deberá crearla y subirla manualmente al directorio `img/` antes del deploy. The Conversation **no proporciona** la imagen de cabecera del blog: la imagen principal del artículo (la que va dentro del cuerpo, si la hay) sí, pero la cabecera de portada del blog la elige Aunitz aparte.

**⚠ Modo prueba:** no busques la siguiente imagen consecutiva. Elige una imagen `post-bg-*.jpg` existente cualquiera dentro de `img/` y úsala como `header-img`.

## Paso 6: Procesar las imágenes del cuerpo

Para cada `<figure>` o `<img>` del cuerpo del artículo (no la cabecera del post, que va aparte):

1. **Localiza la URL de la imagen.** Las imágenes de The Conversation están en `https://images.theconversation.com/files/.../original/file-NNNNNN.{jpg,png,webp}` o en variantes con tamaño (`/file-NNN-x-NNN.{ext}`). Prefiere siempre la versión `original/` o la de mayor tamaño disponible en `srcset`.
2. **Descarga la imagen** a `img/` con el nombre `{slug}-NN.{ext}` donde `NN` es un contador de dos dígitos (`01`, `02`, `03`...) y `{ext}` es la extensión del fichero descargado (`jpg`, `png` o `webp`). Usa `curl`:
   ```bash
   curl -sL "URL_ORIGINAL" -o "img/{slug}-NN.{ext}"
   ```
3. **Obtén las dimensiones reales** con `identify -format "%w %h" img/...` (ImageMagick). Si no está disponible, intenta `file img/...` o usa `720x405` como valor por defecto y avisa al usuario.
4. **Reescribe la `<figure>`** siguiendo este formato (preservando caption y atribución, requisitos de la licencia):
   ```html
   <figure>
     <img src="{{ site.baseurl }}/img/{slug}-NN.{ext}" loading="lazy" alt="TEXTO ALT ORIGINAL" width="W" height="H">
     <figcaption>
       TEXTO DEL CAPTION ORIGINAL.
       <span class="attribution"><a class="source" href="URL_FUENTE" target="_blank" rel="noopener noreferrer">FUENTE</a>, <a class="license" href="URL_LICENCIA" target="_blank" rel="noopener noreferrer">CC BY-SA</a></span>
     </figcaption>
   </figure>
   ```
   Si la figura original tiene clase `align-right` o `align-left`, consérvala en el `<figure>` (`<figure class="align-right">`).
5. **Limpia atributos sobrantes:** elimina `srcset`, `sizes`, `style`, enlaces `<a class="zoomable">` que envuelvan la imagen (deja solo el `<img>` dentro del `<figure>`).

**⚠ Modo prueba:** no descargues nada. Cuenta cuántas imágenes inline tiene el HTML, selecciona ese número de imágenes ya existentes en `img/` (excluyendo `post-bg-*`) y úsalas con sus dimensiones reales en lugar de descargar las de The Conversation. Mantén los textos de caption y atribución del original.

## Paso 7: Construir el cuerpo HTML del post

El cuerpo del post sigue **exactamente** este esquema (basado en los posts ya publicados, p. ej. [`2026-02-21-puede-inteligencia-artificial-superar-humana.markdown`](_posts/2026-02-21-puede-inteligencia-artificial-superar-humana.markdown) y [`2026-01-01-para-que-sirven-las-lenguas.markdown`](_posts/2026-01-01-para-que-sirven-las-lenguas.markdown)).

### Plantilla del byline (obligatoria)

**No reutilices** el párrafo de atribución que viene en el HTML pegado de The Conversation. Constrúyelo desde cero usando **exactamente** esta plantilla, rellenando los placeholders con los datos extraídos en el Paso 2:

```html
<p><em><a href="[URL de la ficha del autor en The Conversation]" target="_blank" rel="noopener noreferrer">[NOMBRE DEL AUTOR]</a>, [CARGO DEL AUTOR], <a href="[URL DE LA FICHA DE LA INSTITUCIÓN DEL AUTOR EN The Conversation]" target="_blank" rel="noopener noreferrer">[NOMBRE DE LA INSTITUCIÓN DEL AUTOR EN The Conversation]</a>. Este artículo fue publicado <a href="[URL ORIGINAL DEL POST EN The Conversation]" target="_blank" rel="noopener noreferrer">originalmente</a> el [FECHA ORIGINAL DE PUBLICACIÓN EN The Conversation] en <a href="https://theconversation.com" target="_blank" rel="noopener noreferrer">The Conversation</a>.</em></p>
```

Reglas de la plantilla:

- El párrafo entero va envuelto en `<em>...</em>`.
- Es **exactamente el mismo párrafo** al principio y al final del bloque del cuerpo (ambos idénticos).
- Al inicio del cuerpo: el byline va **seguido** de un `<hr>`.
- Al final del cuerpo: el byline va **precedido** de un `<hr>`.
- La fecha se escribe en formato natural en español: "DD de MES de YYYY" (p. ej. "14 de diciembre de 2022"), no en formato numérico.
- El cargo del autor se escribe tal cual aparece en The Conversation, sin recortes.
- No añadas comas, puntos ni texto extra fuera de lo que indica la plantilla.

### Esquema completo del cuerpo

```html
<div class="theconversation-article-body">

  [FIGURA PRINCIPAL DEL ARTÍCULO, si existe en el HTML original — opcional, va antes del byline si el original lo coloca ahí]

  [BYLINE DE LA PLANTILLA ANTERIOR]

  <hr>

  [CUERPO DEL ARTÍCULO — párrafos, h2/h3, figuras, listas...]

  <p>... ÚLTIMO PÁRRAFO DEL ARTÍCULO ...<!-- Below is The Conversation's page counter tag. Please DO NOT REMOVE. --><img src="https://counter.theconversation.com/content/NNNNNN/count.gif?distributor=republish-lightbox-basic" alt="The Conversation" width="1" height="1" style="border: none !important; box-shadow: none !important; margin: 0 !important; max-height: 1px !important; max-width: 1px !important; min-height: 1px !important; min-width: 1px !important; opacity: 0 !important; outline: none !important; padding: 0 !important" referrerpolicy="no-referrer-when-downgrade" /><!-- Fin del código. Si no ve ningún código arriba, por favor, obtenga el nuevo código de la pestaña Avanzado después de hacer clic en el botón de republicar. El contador de páginas no recoge ningún dato personal. Más información: http://theconversation.com/es/republishing-guidelines --></p>

  <hr>

  [BYLINE DE LA PLANTILLA ANTERIOR — IDÉNTICO AL DE ARRIBA]

</div>
```

Reglas de transformación al construir el cuerpo:

### Estructura
- Envuelve todo el contenido en `<div class="theconversation-article-body">...</div>` (la primera y última líneas del bloque).
- **Nunca incluyas** el `<h1>` del título ni el `<h2>` del subtítulo dentro del cuerpo: ambos van en el frontmatter (`title` y `subtitle`).
- **Elimina del HTML pegado el párrafo de atribución original** (el que viene de The Conversation con la firma del autor) tanto si aparece al principio como al final: lo sustituyes por el byline construido con la plantilla.
- El byline construido con la plantilla se coloca al principio (seguido de `<hr>`) y al final (precedido de `<hr>`) del bloque, idéntico en ambos sitios.
- Conserva los `<h2>` y `<h3>` del cuerpo del artículo. **Nunca uses `<h1>`** dentro del cuerpo.
- Conserva listas (`<ul>`, `<ol>`, `<li>`), citas (`<blockquote>`), énfasis (`<strong>`, `<em>`).
- Elimina `<div>` y `<span>` que The Conversation use solo para maquetar (excepto `<span class="attribution">`, `<span class="caption">` y `<span class="source">`/`<span class="license">` dentro de `<figcaption>`, que se conservan).
- Elimina atributos `style` salvo los que vienen dentro del `<img>` del píxel contador (ese va intacto).
- Elimina clases CSS de The Conversation (`tc-...`, `inline-promos`, etc.) salvo `align-right`, `align-left` en figuras y las clases dentro de `<figcaption>` antes mencionadas.

### Píxel contador (REQUISITO de licencia)
- Cópialo **tal cual** desde el HTML original al final del último párrafo del cuerpo, justo antes del `<hr>` final.
- No lo separes en su propio `<p>`: va dentro del último `<p>` del artículo, como en los ejemplos publicados.
- Conserva los comentarios `<!-- Below is The Conversation's page counter tag. Please DO NOT REMOVE. -->` y `<!-- Fin del código... -->` que rodean al píxel.
- No alteres `src`, `alt`, `width`, `height`, `style` ni `referrerpolicy` del `<img>` del contador.

### Enlaces
A todos los enlaces externos (incluidos los de `theconversation.com`) añádeles `target="_blank" rel="noopener noreferrer"`. Si el HTML original ya los lleva, no los dupliques.

Si en el cuerpo del artículo aparece algún enlace a `https://www.aunitz.net/SLUG/`:
1. Busca en `_posts/` un fichero cuyo slug coincida.
2. Conviértelo a sintaxis Jekyll:
   ```html
   <a href="{{ site.baseurl }}{% post_url YYYY-MM-DD-slug %}">texto</a>
   ```

### Imágenes
Aplica las reglas del Paso 6.

### Bloque final de atribución redundante
A veces The Conversation incluye, antes del `<hr>` final y del byline duplicado, un párrafo extra que repite la atribución (por ejemplo `Este artículo fue publicado originalmente en la revista Telos...`). Si aparece, **consérvalo** tal cual: forma parte del aviso de republicación original y respetar la licencia incluye no recortarlo. Su sitio es justo después del píxel contador y antes del byline final.

## Paso 8: Crear el fichero del post

Crea el fichero `_posts/YYYY-MM-DD-slug.markdown` con este contenido:

```markdown
---
layout:        post
title:         "TÍTULO DEL ARTÍCULO"
subtitle:      "SUBTÍTULO DEL ARTÍCULO"
description:   "DESCRIPCIÓN SEO GENERADA"
date:          YYYY-MM-DD HH:MM:SS +0200
author:        "NOMBRE DEL AUTOR ORIGINAL"
header-img:    "img/post-bg-NNN.jpg"
tags:          [tag1, tag2]
canonical:     "https://theconversation.com/SLUG-NNNNNN"
---

CUERPO HTML GENERADO EN EL PASO 7
```

Notas sobre el frontmatter:

- **`author`** es el autor original del artículo en The Conversation, **no** "Aunitz Giménez". Esta es la diferencia clave con los posts originales del blog y un requisito de la licencia CC.
- **`canonical`** apunta al artículo original en The Conversation. Es obligatorio para evitar problemas de contenido duplicado en SEO y para respetar la licencia.
- Mantén el alineamiento visual de los valores (espacios para alinear como en los posts existentes).
- Los valores con comillas dobles internas se escapan correctamente.
- Los tags van en minúsculas y entre corchetes.
- No añadas `last_modified_at` (es un post nuevo).

## Paso 9: Mostrar resumen y avisar al usuario

Muestra un resumen con:

- Nombre del fichero creado.
- Título, subtítulo, autor original y URL canónica.
- Descripción SEO y tags.
- Header-img asignado y si la imagen existe ya o falta crearla.
- Número de imágenes del cuerpo descargadas (o reutilizadas en modo prueba).
- Número de enlaces externos con atributos añadidos.
- Confirmación de que el píxel contador de The Conversation se ha conservado intacto (esencial por licencia).
- Confirmación de que el byline aparece duplicado (arriba y abajo del cuerpo).

Finaliza con:

> El post se ha creado correctamente. Revisa el contenido del fichero antes de hacer commit y push al repositorio. Recuerda subir manualmente la imagen de cabecera `post-bg-NNN.jpg` si aún no existe.

**IMPORTANTE:** No hagas commit ni push. El usuario se encargará manualmente.

En **modo real**, aquí termina la skill.

## Paso 10: Limpieza en modo prueba

**Solo aplica en modo prueba.**

Tras mostrar el resumen del Paso 9, avisa al usuario:

> El post de prueba se ha creado en `_posts/FICHERO.markdown`. Revísalo ahora en local (por ejemplo ejecutando `bundle exec jekyll serve` y abriéndolo en el navegador). Cuando hayas terminado, dímelo para proceder.

Espera a que el usuario confirme la revisión. Después pregúntale (usa `AskUserQuestion` si procede):

> ¿Quieres que elimine el fichero de prueba `_posts/FICHERO.markdown`?

- Si responde **sí**: elimina el fichero con `rm` y confirma que el post de prueba ha sido borrado.
- Si responde **no**: deja el fichero en su sitio y avisa al usuario de que deberá borrarlo manualmente cuando ya no lo necesite.

No toques las imágenes — en modo prueba no se han descargado imágenes nuevas, así que no hay nada que limpiar en `img/`.
