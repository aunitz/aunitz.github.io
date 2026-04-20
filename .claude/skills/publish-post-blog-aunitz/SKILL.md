---
name: publish-post-blog-aunitz
description: >
  Publica un nuevo post en el blog Jekyll de aunitz.net. Usa esta skill cuando el usuario diga que
  quiere publicar un nuevo post, crear un artículo, añadir una entrada al blog, o algo similar.
  Automatiza la conversión de Word a HTML, la creación del fichero del post, la generación del
  frontmatter, la inserción de imágenes y la corrección de enlaces.
when_to_use: >
  Trigger phrases: "publicar un post", "nuevo post", "nuevo artículo", "crear post", "publicar
  artículo", "añadir entrada al blog", "publish post", "new post", "new blog post".
argument-hint: "[--test] ruta/al/documento.docx"
allowed-tools: Read Write Edit Glob Grep Bash AskUserQuestion
---

# Skill: Publicar nuevo post en el blog

Eres un asistente especializado en publicar nuevos posts en el blog Jekyll de aunitz.net. Sigue estos pasos en orden estricto.

## Modos de ejecución

La skill tiene dos modos:

- **Modo real (por defecto):** ejecuta todo el proceso y deja el post creado en `_posts/` para que el usuario lo revise, haga commit y push manualmente.
- **Modo prueba:** se activa cuando el usuario incluye `--test`, `test`, `prueba` o expresiones similares (p. ej. "en modo prueba", "modo test") en la invocación de la skill. Ejecuta todo el proceso igual que el modo real, con dos diferencias:
  1. **No se usan imágenes nuevas reales.** En los pasos 4 y 5, en lugar de asignar/buscar imágenes específicas del nuevo post, se seleccionan imágenes cualquiera ya existentes en la carpeta `img/` (aunque no tengan relación con el contenido). Ver detalles en cada paso.
  2. **Al finalizar, se ofrece borrar el post creado** (ver Paso 9).

Identifica el modo al inicio y tenlo en cuenta en los pasos marcados con "⚠ Modo prueba".

## Paso 1: Solicitar el documento Word

Pide al usuario que adjunte el documento Word (.docx) con el contenido del nuevo post. Dile algo como:

> Adjunta el documento Word del nuevo post para que pueda procesarlo.

Espera a que el usuario proporcione el fichero. **Importante:** el formato `.docx` es un ZIP que contiene XML; la herramienta Read no puede leerlo directamente. Debes extraer el contenido así:

```bash
cp "RUTA/AL/FICHERO.docx" /tmp/post.docx
cd /tmp && unzip -p post.docx word/document.xml > doc.xml
```

A continuación usa Node.js para parsear los párrafos y sus runs de formato (negrita, cursiva, etc.), que es la única forma fiable de recuperar el formato del documento. Este script de referencia lista cada párrafo con sus runs marcados:

```js
const fs = require('fs');
const content = fs.readFileSync('/tmp/doc.xml', 'utf8');
const paraRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
let match, i = 0;
while ((match = paraRegex.exec(content)) !== null) {
    const p = match[0];
    const runs = [...p.matchAll(/<w:r[ >][\s\S]*?<\/w:r>/g)];
    const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"/);
    const style = styleMatch ? styleMatch[1] : 'Normal';
    let out = [];
    runs.forEach(r => {
        const rText = [...r[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join('');
        const bold = r[0].includes('<w:b/>') || (r[0].includes('<w:b ') && !r[0].includes('<w:b w:val="0"'));
        const italic = r[0].includes('<w:i/>') || (r[0].includes('<w:i ') && !r[0].includes('<w:i w:val="0"'));
        if (rText) out.push((bold ? '**' : '') + (italic ? '_' : '') + rText + (italic ? '_' : '') + (bold ? '**' : ''));
    });
    const text = out.join('');
    if (text.trim()) console.log('[' + style + '] Para ' + i + ': ' + text.substring(0, 200));
    i++;
}
```

También extrae los hipervínculos del fichero de relaciones para saber a qué URL apunta cada `r:id`:

```bash
unzip -p /tmp/post.docx word/_rels/document.xml.rels
```

A partir de aquí, el XML parseado es tu fuente principal. **Nunca uses la extracción de texto plano (`unzip | sed 's/<[^>]*>//g'`) como fuente principal**, ya que pierde toda la información de formato.

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

**⚠ Modo prueba:** no busques la siguiente imagen consecutiva. En su lugar, elige una imagen `post-bg-*.jpg` existente cualquiera dentro de `img/` (por ejemplo la más reciente ya en uso) y úsala como `header-img`. No hay que crear ni pedir nuevas imágenes.

## Paso 5: Preguntar por las imágenes del post

Pregunta al usuario:

> ¿Cuál es el nombre base de la primera imagen del post? (Por ejemplo: `como-sera-futuro-ingenieria-software-01.webp`)

A partir de esa respuesta:
1. Extrae el patrón base (todo excepto el número y la extensión).
2. Busca en la carpeta `img/` todas las imágenes que sigan ese patrón (01, 02, 03...).
3. Para cada imagen encontrada, obtén sus dimensiones reales usando el comando: `identify -format "%w %h"` (ImageMagick) o, si no está disponible, usa `file` o pide las dimensiones al usuario.
4. Si no puedes obtener las dimensiones, usa `width="720" height="405"` como valores por defecto y avisa al usuario para que los ajuste.

**⚠ Modo prueba:** no preguntes por el nombre base ni esperes imágenes nuevas. En su lugar:
1. Determina cuántas imágenes inline necesita el post (analizando el Word: imágenes embebidas y/o secciones donde encajarían).
2. Selecciona ese número de imágenes cualquiera ya existentes en la carpeta `img/` (excluyendo las `post-bg-*.jpg`). Pueden ser imágenes de posts antiguos; no importa que el contenido no se corresponda con el post.
3. Usa las dimensiones reales de esas imágenes (o `720×405` por defecto si no puedes obtenerlas).
4. Inserta esas imágenes en las posiciones donde habrían ido las reales.

## Paso 6: Convertir el contenido Word a HTML limpio

Convierte el contenido del Word a HTML siguiendo estas reglas estrictas.

**Antes de escribir el HTML**, asegúrate de haber analizado el XML completo con el script del Paso 1 para identificar todos los runs con negrita (`<w:b/>`) y cursiva (`<w:i/>`). La negrita se mapea a `<strong>` y la cursiva a `<em>`. Un run puede tener ambas a la vez (`<strong><em>texto</em></strong>`). Si hay duda sobre si un fragmento lleva negrita, consulta el XML; no lo infiereas del contexto.

### Estructura HTML
- Usa `<p>` para párrafos.
- Usa `<strong>` para negritas y `<em>` para cursivas. Aplícalos exactamente donde el XML indica runs con `<w:b/>` o `<w:i/>`, sin añadir ni omitir ninguno.
- Usa `<h2>` y `<h3>` para encabezados (nunca `<h1>`, que es el título del post).
- Usa `<ul>` y `<li>` para listas con viñetas, `<ol>` y `<li>` para listas numeradas.
- Usa `<blockquote>` para citas.
- No añadas clases CSS salvo `class="center-block"` en imágenes dentro de `<figure>`.
- No uses `<div>`, `<span>`, ni atributos `style`.
- No incluyas el título ni el subtítulo del post en el HTML (eso va en el frontmatter).
- **Emojis:** no añadas emojis propios, pero si el documento Word original incluye algún emoji de manera puntual, consérvalo en el HTML tal como aparece en el original.

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

En **modo real**, aquí termina la skill.

## Paso 9: Limpieza en modo prueba

**Solo aplica en modo prueba.**

Tras mostrar el resumen del Paso 8, avisa al usuario con un mensaje como:

> El post de prueba se ha creado en `_posts/FICHERO.markdown`. Revísalo ahora en local (por ejemplo ejecutando `bundle exec jekyll serve` y abriéndolo en el navegador). Cuando hayas terminado de revisarlo, dímelo para proceder.

Espera a que el usuario confirme que ha terminado la revisión. A continuación pregúntale explícitamente (usa `AskUserQuestion` si procede):

> ¿Quieres que elimine el fichero de prueba `_posts/FICHERO.markdown`?

- Si responde **sí** (o equivalente): elimina el fichero con `rm` y confirma que el post de prueba ha sido borrado.
- Si responde **no** (o equivalente): deja el fichero en su sitio y avisa al usuario de que el fichero permanece en `_posts/` y que deberá borrarlo manualmente cuando ya no lo necesite.

No toques las imágenes — en modo prueba no se han creado imágenes nuevas, así que no hay nada que limpiar en `img/`.
