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

## Reanudación de sesión interrumpida

Al inicio de la skill, comprueba si existe el fichero de estado:
```
.claude/skills/publish-post-blog-aunitz/state/state.json
```
Si existe, ofrece al usuario reanudarlo mostrando el título del post y el paso en que se interrumpió. Si el usuario acepta, salta directamente al paso guardado. Si no existe o el usuario prefiere empezar desde cero, continúa normalmente (y borra el fichero de estado si existía).

---

## Paso 1: Solicitar y extraer el documento Word

Pide al usuario que adjunte el documento Word (.docx) con el contenido del nuevo post. Dile algo como:

> Adjunta el documento Word del nuevo post para que pueda procesarlo.

Espera a que el usuario proporcione el fichero.

### Extracción del contenido

El formato `.docx` es un ZIP con XML; la herramienta Read no puede leerlo directamente. Extráelo así:

```bash
cp "RUTA/AL/FICHERO.docx" /tmp/post.docx
unzip -p /tmp/post.docx word/document.xml > /tmp/doc.xml
unzip -p /tmp/post.docx word/_rels/document.xml.rels > /tmp/doc.rels
```

### ⚠ Nota sobre paths en Windows (Git Bash + Node.js)

Los comandos Bash anteriores crean ficheros en `/tmp/` (el MSYS virtual filesystem). **Node.js es un proceso Windows** y no ve ese filesystem, por lo que `readFileSync('/tmp/doc.xml')` falla. Solución: usa siempre `cygpath -w` para convertir el path antes de pasarlo a Node.js, y escribe siempre los scripts en ficheros temporales en lugar de usar `-e`:

```bash
DOCXML=$(cygpath -w /tmp/doc.xml)
DOCRELS=$(cygpath -w /tmp/doc.rels)
# Luego: node $(cygpath -w /tmp/script.js) "$DOCXML"
```

### Parser de párrafos (análisis)

Escribe este script en `/tmp/parse_paragraphs.js` y ejecútalo. **Muestra cada párrafo con su número, estilo, y texto colapsando runs adyacentes del mismo formato en una sola marca:**

```js
const fs = require('fs');
const content = fs.readFileSync(process.argv[2], 'utf8');
const paraRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
let match, i = 0;
while ((match = paraRegex.exec(content)) !== null) {
    const p = match[0];
    const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"/);
    const style = styleMatch ? styleMatch[1] : 'Normal';
    const imgMatch = p.match(/r:embed="(rId\d+)"/);
    const hasImg = imgMatch ? ` [IMG:${imgMatch[1]}]` : '';
    // Detectar si es elemento de lista
    const isList = p.includes('<w:numId ') && !p.includes('<w:numId w:val="0"');
    // Extraer runs y colapsar adyacentes con mismo formato
    const runs = [...p.matchAll(/<w:r[ >][\s\S]*?<\/w:r>/g)];
    let segments = [];
    runs.forEach(r => {
        const rText = [...r[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join('');
        const bold = r[0].includes('<w:b/>') || (r[0].includes('<w:b ') && !r[0].includes('<w:b w:val="0"'));
        const italic = r[0].includes('<w:i/>') || (r[0].includes('<w:i ') && !r[0].includes('<w:i w:val="0"'));
        if (!rText) return;
        const last = segments[segments.length - 1];
        if (last && last.bold === bold && last.italic === italic) {
            last.text += rText;
        } else {
            segments.push({ text: rText, bold, italic });
        }
    });
    const text = segments.map(s => (s.bold ? '**' : '') + (s.italic ? '_' : '') + s.text + (s.italic ? '_' : '') + (s.bold ? '**' : '')).join('');
    const listMark = isList ? ' [LIST]' : '';
    if (text.trim() || hasImg) console.log(`[${style}] Para ${i}${hasImg}${listMark}: ${text.substring(0, 300)}`);
    i++;
}
```

Ejecución (Windows):
```bash
DOCXML=$(cygpath -w /tmp/doc.xml)
node $(cygpath -w /tmp/parse_paragraphs.js) "$DOCXML"
```

### Extracción de hipervínculos

```bash
DOCRELS=$(cygpath -w /tmp/doc.rels)
node -e "
const fs = require('fs');
const c = fs.readFileSync('$DOCRELS','utf8');
const re = /Id=\"(rId\\d+)\"[^>]*Type=\"[^\"]*hyperlink[^\"]*\"[^>]*Target=\"([^\"]+)\"/g;
let m; while((m=re.exec(c))!==null) console.log(m[1],'->',m[2]);
"
```

A partir de aquí, el XML parseado es tu fuente principal. **Nunca uses extracción de texto plano** (`sed 's/<[^>]*>//g'`), ya que pierde toda la información de formato.

---

## Paso 2: Analizar el contenido y preparar metadatos

A partir del contenido del Word:

1. **Identifica el título del post.** Será el título principal (heading 1 o el primer encabezado destacado del documento).
2. **Identifica el subtítulo.** Si existe un segundo encabezado o línea destacada justo después del título, úsalo como subtítulo. Si no hay subtítulo claro, pregunta al usuario.
3. **Genera la descripción SEO.** Debe ser un resumen del post de entre 100 y 150 caracteres. Escríbela en español.
4. **Identifica las etiquetas (tags).** Usa este comando para ver los tags más usados en el blog y propón los más adecuados para este contenido. Los tags se escriben en minúscula:
   ```bash
   grep -h "^tags:" _posts/*.markdown | sed 's/tags: *\[//' | sed 's/\]//' | tr ',' '\n' | sed 's/^ *//' | sed 's/ *$//' | sort | uniq -c | sort -rn | head -20
   ```
5. **Determina la fecha y hora.** La fecha es hoy. Pregunta explícitamente al usuario la hora de publicación:
   > ¿A qué hora quieres que aparezca publicado el post? (Por defecto: 10:00)
   Usa el formato `YYYY-MM-DD HH:MM:SS +0200`.

---

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

---

## Paso 4: Determinar el header-img

Busca en los ficheros de `_posts/` cuál es el número más alto usado en `header-img: "img/post-bg-NNN.jpg"`. El nuevo post usará el siguiente número consecutivo. Verifica que la imagen existe en la carpeta `img/`. Si no existe, avisa al usuario de que deberá crearla manualmente.

**⚠ Modo prueba:** no busques la siguiente imagen consecutiva. En su lugar, elige una imagen `post-bg-*.jpg` existente cualquiera dentro de `img/` (por ejemplo la más reciente ya en uso) y úsala como `header-img`. No hay que crear ni pedir nuevas imágenes.

---

## Paso 5: Imágenes del post — inventario y dimensiones

### 5a. Preguntar el nombre base

Pregunta al usuario:

> ¿Cuál es el nombre base de la primera imagen del post? (Por ejemplo: `como-sera-futuro-ingenieria-software-01.webp`)

A partir de esa respuesta, extrae el patrón base (todo excepto el número y la extensión) y busca en `img/` todas las imágenes que sigan ese patrón (01, 02, 03…):

```bash
ls img/PATRON-*.{webp,gif,jpg,png} 2>/dev/null | sort
```

**⚠ Modo prueba:** no preguntes. Selecciona imágenes existentes en `img/` (excluyendo `post-bg-*.jpg`) en número igual al de posiciones de imagen detectadas en el Word. Úsalas aunque no tengan relación con el contenido.

### 5b. Verificar inventario — comparar Word vs `img/`

Cuenta las posiciones de imagen en el Word con este script (`/tmp/count_images.js`):

```js
const fs = require('fs');
const content = fs.readFileSync(process.argv[2], 'utf8');
const embeds = [...content.matchAll(/r:embed="(rId\d+)"/g)];
console.log(`Imágenes en el Word: ${embeds.length}`);
embeds.forEach((m, i) => console.log(`  ${i+1}. ${m[1]}`));
```

```bash
node $(cygpath -w /tmp/count_images.js) $(cygpath -w /tmp/doc.xml)
```

Compara el número de imágenes del Word con el número de ficheros encontrados en `img/`:

- **Si coinciden:** asume correspondencia secuencial (imagen 1 del Word → `nombre-01.webp`, imagen 2 → `nombre-02.webp`, etc.) y continúa.
- **Si no coinciden:** informa al usuario del desfase (p. ej. "El Word tiene 28 imágenes pero en `img/` hay 25 con ese patrón") y avisa de que algunas posiciones de imagen quedarán sin imagen. Asume de todas formas correspondencia secuencial para las que sí existen, y omite (`<!-- imagen no disponible -->`) las posiciones sobrantes del Word.

### 5c. Obtener dimensiones reales (sin dependencias externas)

Para cada imagen encontrada, obtén sus dimensiones con este script Node.js portátil (`/tmp/img_dimensions.js`):

```js
const fs = require('fs');
const path = require('path');

function getDimensions(filepath) {
    const buf = fs.readFileSync(filepath);
    const ext = path.extname(filepath).toLowerCase();
    // PNG
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
        return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    }
    // GIF
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
        return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
    }
    // JPEG
    if (buf[0] === 0xFF && buf[1] === 0xD8) {
        let offset = 2;
        while (offset < buf.length) {
            if (buf[offset] !== 0xFF) break;
            const marker = buf[offset + 1];
            if (marker === 0xC0 || marker === 0xC2) {
                return { w: buf.readUInt16BE(offset + 7), h: buf.readUInt16BE(offset + 5) };
            }
            offset += 2 + buf.readUInt16BE(offset + 2);
        }
    }
    // WebP
    if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        const vp8type = buf.toString('ascii', 12, 16);
        if (vp8type === 'VP8 ') {
            return { w: buf.readUInt16LE(26) & 0x3FFF, h: buf.readUInt16LE(28) & 0x3FFF };
        } else if (vp8type === 'VP8L') {
            const bits = buf.readUInt32LE(21);
            return { w: (bits & 0x3FFF) + 1, h: ((bits >> 14) & 0x3FFF) + 1 };
        } else if (vp8type === 'VP8X') {
            return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
        }
    }
    return null;
}

const files = process.argv.slice(2);
files.forEach(f => {
    const dim = getDimensions(f);
    if (dim) console.log(`${path.basename(f)}: ${dim.w}x${dim.h}`);
    else console.log(`${path.basename(f)}: dimensiones desconocidas (usa 720x405 por defecto)`);
});
```

```bash
node $(cygpath -w /tmp/img_dimensions.js) img/PATRON-*.{webp,gif,jpg,png} 2>/dev/null
```

Con esto tienes la lista completa de imágenes con sus dimensiones. Ahora guarda el estado (ver sección **Estado de la skill** al final).

---

## Paso 6: Convertir el contenido Word a HTML limpio

### Reglas generales

- Usa `<p>` para párrafos normales.
- Usa `<h2>` y `<h3>` para encabezados (nunca `<h1>`, que es el título del post).
- Usa `<strong>` para negritas y `<em>` para cursivas, **colapsando runs adyacentes del mismo formato** (véase script del Paso 1). Si varios runs consecutivos son todos bold, envuélvelos en un único `<strong>`.
- **Listas con viñetas:** un párrafo es elemento de lista si su XML contiene `<w:numPr>` con `<w:numId w:val="N">` (N > 0). Agrupa párrafos de lista consecutivos en `<ul>…</ul>`. Cierra el `</ul>` en cuanto aparezca un párrafo sin lista. Si la lista es claramente numerada, usa `<ol>`. Ejemplo:
  ```html
  <ul>
      <li><strong>Primer elemento.</strong></li>
      <li><strong>Segundo elemento</strong>, continuación no negrita.</li>
  </ul>
  ```
- Usa `<blockquote>` para citas.
- No añadas clases CSS salvo `class="center-block"` en imágenes dentro de `<figure>`.
- No uses `<div>`, `<span>`, ni atributos `style`.
- No incluyas el título ni el subtítulo en el HTML (van en el frontmatter).
- **Emojis:** conserva los emojis del Word original tal cual; no añadas ni elimines ninguno.
- **Comillas tipográficas:** conserva las comillas tipográficas tal como aparecen en el Word ("…", «…»). No las conviertas a comillas ASCII.

### Negritas y cursivas — algoritmo de colapso

Al generar el HTML, lee el XML run a run y aplica este algoritmo antes de renderizar:

1. Extrae todos los runs como `{text, bold, italic}`.
2. Fusiona runs adyacentes con **exactamente el mismo** par `(bold, italic)`: concatena su texto.
3. Renderiza cada segmento resultante:
   - Solo bold → `<strong>texto</strong>`
   - Solo italic → `<em>texto</em>`
   - Ambos → `<strong><em>texto</em></strong>`
   - Ninguno → texto plano

### Enlaces externos

A **todos** los enlaces que apunten fuera de aunitz.net, añádeles:
```html
target="_blank" rel="noopener noreferrer"
```

### Enlaces internos (a otros posts del blog)

Si el contenido enlaza a URLs del tipo `https://www.aunitz.net/SLUG/` o `http://www.aunitz.net/SLUG/`:
1. Extrae el SLUG de la URL.
2. **Verifica que existe** en `_posts/`:
   ```bash
   ls _posts/*-SLUG.markdown 2>/dev/null
   ```
   Si no existe, avisa al usuario antes de continuar.
3. Convierte el enlace a la sintaxis Jekyll:
   ```html
   <a href="{{ site.baseurl }}{% post_url YYYY-MM-DD-slug %}">texto del enlace</a>
   ```
   donde `YYYY-MM-DD-slug` es el nombre del fichero sin la extensión `.markdown`.

### Imágenes

Inserta las imágenes en los lugares adecuados del HTML (posición secuencial respecto al Word). Usa este formato:

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

Si una posición de imagen no tiene fichero correspondiente (inventario desfasado), inserta un comentario:
```html
<!-- imagen no disponible -->
```

### Estrategia para posts largos (más de 5 secciones h2)

Si el post tiene más de 5 secciones `<h2>`, genera el HTML **sección por sección** en lugar de todo de golpe, para evitar alcanzar el límite de tokens de salida:

1. Escribe el fichero con el frontmatter y el bloque introductorio (párrafos anteriores al primer `<h2>`).
2. Para cada sección `<h2>`, **añade** al fichero con un append de Bash:
   ```bash
   cat >> "_posts/FICHERO.markdown" << 'ENDSECTION'
   <h2>Título de la sección</h2>
   <p>...</p>
   ENDSECTION
   ```
3. Actualiza el estado guardado tras cada sección (ver sección **Estado de la skill**).

---

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

Para posts con más de 5 secciones, aplica la estrategia de escritura incremental descrita en el Paso 6.

---

## Paso 8: Mostrar resumen detallado y avisar al usuario

Una vez creado el fichero, muestra un resumen completo:

**Fichero creado:** `_posts/FICHERO.markdown`

| Campo | Valor |
|---|---|
| Título | … |
| Subtítulo | … |
| Descripción SEO | … (N caracteres) |
| Fecha de publicación | … |
| Header-img | … |
| Tags | … |
| Secciones h2 | N |
| Párrafos procesados | N |

**Imágenes insertadas (N):**
| Fichero | Dimensiones | Párrafo Word |
|---|---|---|
| nombre-01.webp | 750×400 | Para 10 |
| … | … | … |

**Imágenes omitidas / sin fichero:** lista si las hay.

**Imágenes no utilizadas en `img/` con el mismo patrón:** lista si las hay (posibles huérfanas).

**Enlaces internos convertidos a `post_url` (N):**
- "texto del enlace" → `2024-01-01-slug`

**Enlaces externos con `target/_blank` (N).**

**Warnings:** lista cualquier incidencia (slug no encontrado, imagen sin fichero, dimensiones desconocidas…).

Finaliza con:

> El post se ha creado correctamente. Revisa el contenido del fichero antes de hacer commit y push al repositorio.

**IMPORTANTE:** No hagas commit ni push. El usuario se encargará de eso manualmente.

### Recordatorio de accesibilidad de medios (obligatorio)

En **modo real**, tras el mensaje anterior, muestra siempre este recordatorio destacado:

> ⚠️ **Pendiente: textos alternativos de los medios.** El post se ha creado con los `alt` de las imágenes vacíos (`alt=""`). Antes de publicarlo, ejecuta la skill **`accesibilidad-medios-posts-aunitz`** para añadir los textos alternativos y los `title` de los vídeos.
>
> Hazlo **desde Codex, no desde Claude Code**: Codex genera textos alternativos de más calidad para los medios. La skill vive en `.agents/skills/accesibilidad-medios-posts-aunitz/` y, por defecto, revisa el último post añadido a `_posts/` (justo el que se acaba de crear).

No ejecutes tú esa skill ni intentes rellenar los `alt`: solo deja el recordatorio para que el usuario lo haga desde Codex.

Borra el fichero de estado (`.claude/skills/publish-post-blog-aunitz/state/state.json`) si existe, ya que el proceso ha finalizado con éxito.

En **modo real**, aquí termina la skill.

---

## Paso 9: Limpieza en modo prueba

**Solo aplica en modo prueba.**

Tras mostrar el resumen del Paso 8, avisa al usuario con un mensaje como:

> El post de prueba se ha creado en `_posts/FICHERO.markdown`. Revísalo ahora en local (por ejemplo ejecutando `bundle exec jekyll serve` y abriéndolo en el navegador). Cuando hayas terminado de revisarlo, dímelo para proceder.

Espera a que el usuario confirme que ha terminado la revisión. A continuación pregúntale explícitamente:

> ¿Quieres que elimine el fichero de prueba `_posts/FICHERO.markdown`?

- Si responde **sí** (o equivalente): elimina el fichero con `rm` y confirma que el post de prueba ha sido borrado.
- Si responde **no** (o equivalente): deja el fichero en su sitio y avisa al usuario de que el fichero permanece en `_posts/` y que deberá borrarlo manualmente cuando ya no lo necesite.

No toques las imágenes — en modo prueba no se han creado imágenes nuevas, así que no hay nada que limpiar en `img/`.

---

## Estado de la skill (persistencia entre sesiones)

Guarda el estado en `.claude/skills/publish-post-blog-aunitz/state/state.json` después de completar el análisis (Paso 5c) y después de cada sección HTML escrita (Paso 7). Formato:

```json
{
  "version": 1,
  "docx_path": "ruta/al/fichero.docx",
  "step": 6,
  "current_section": 3,
  "metadata": {
    "title": "Título del post",
    "subtitle": "Subtítulo",
    "slug": "slug-del-post",
    "date": "2026-01-01 10:00:00 +0200",
    "header_img": "img/post-bg-NNN.jpg",
    "tags": ["tag1", "tag2"],
    "description": "Descripción SEO"
  },
  "images": [
    { "para": 10, "file": "nombre-01.webp", "width": 750, "height": 400 }
  ],
  "hyperlinks": [
    { "rid": "rId7", "url": "https://...", "text": "texto", "internal": false, "post_url": null }
  ],
  "sections_done": ["intro", "1. Título sección 1"],
  "warnings": []
}
```

El directorio `.claude/skills/publish-post-blog-aunitz/state/` debe crearse si no existe:
```bash
mkdir -p .claude/skills/publish-post-blog-aunitz/state
```
