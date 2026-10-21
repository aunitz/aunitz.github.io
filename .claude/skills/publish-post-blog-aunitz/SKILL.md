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

Escribe este script en `/tmp/parse_paragraphs.js` y ejecútalo. **Muestra cada párrafo con su número, estilo, y texto colapsando runs adyacentes del mismo formato en una sola marca. Cada enlace aparece en línea con su texto y su URL ya resuelta**, con la forma `[texto del enlace](→URL)`, para que no haya que adivinar qué URL corresponde a qué texto:

```js
const fs = require('fs');
const [docPath, relsPath] = process.argv.slice(2);
const content = fs.readFileSync(docPath, 'utf8');

const decode = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&');

// Relaciones rId → URL. Se lee cada <Relationship> entero y luego sus atributos por
// separado, porque Word no garantiza el orden Id/Type/Target dentro de la etiqueta.
const rels = {};
if (relsPath && fs.existsSync(relsPath)) {
    for (const [tag] of fs.readFileSync(relsPath, 'utf8').matchAll(/<Relationship\b[^>]*>/g)) {
        const attr = name => (tag.match(new RegExp(`\\b${name}="([^"]*)"`)) || [])[1];
        if (/\/hyperlink$/.test(attr('Type') || '')) rels[attr('Id')] = decode(attr('Target'));
    }
}

const paraRegex = /<w:p[ >][\s\S]*?<\/w:p>/g;
let match, i = 0;
let fieldLink = null, inFieldResult = false; // enlaces como campo HYPERLINK (fldChar/instrText)
while ((match = paraRegex.exec(content)) !== null) {
    const p = match[0];
    const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"/);
    const style = styleMatch ? styleMatch[1] : 'Normal';
    const imgMatch = p.match(/r:embed="(rId\d+)"/);
    const hasImg = imgMatch ? ` [IMG:${imgMatch[1]}]` : '';
    // Detectar si es elemento de lista
    const isList = p.includes('<w:numId ') && !p.includes('<w:numId w:val="0"');
    // Recorrer runs y bloques <w:hyperlink> en orden de aparición
    const parts = [...p.matchAll(/<w:hyperlink\b([^>]*)>([\s\S]*?)<\/w:hyperlink>|<w:r[ >][\s\S]*?<\/w:r>/g)];
    let segments = [];
    const addRun = (r, link) => {
        if (/<w:fldChar [^>]*w:fldCharType="begin"/.test(r)) { fieldLink = null; inFieldResult = false; }
        const instr = r.match(/<w:instrText[^>]*>\s*HYPERLINK\s+"([^"]+)"/);
        if (instr) fieldLink = decode(instr[1]);
        if (/<w:fldChar [^>]*w:fldCharType="separate"/.test(r)) inFieldResult = !!fieldLink;
        if (/<w:fldChar [^>]*w:fldCharType="end"/.test(r)) { fieldLink = null; inFieldResult = false; }
        if (!link && inFieldResult) link = fieldLink;
        const rText = decode([...r.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join(''));
        const bold = r.includes('<w:b/>') || (r.includes('<w:b ') && !r.includes('<w:b w:val="0"'));
        const italic = r.includes('<w:i/>') || (r.includes('<w:i ') && !r.includes('<w:i w:val="0"'));
        if (!rText) return;
        const last = segments[segments.length - 1];
        if (last && last.bold === bold && last.italic === italic && last.link === link) {
            last.text += rText;
        } else {
            segments.push({ text: rText, bold, italic, link });
        }
    };
    parts.forEach(part => {
        if (part[0].startsWith('<w:hyperlink')) {
            const rid = (part[1].match(/r:id="([^"]+)"/) || [])[1];
            const anchor = (part[1].match(/w:anchor="([^"]+)"/) || [])[1];
            const link = rid ? (rels[rid] || `${rid}?? (sin URL en el .rels)`) : `#${anchor}`;
            [...part[2].matchAll(/<w:r[ >][\s\S]*?<\/w:r>/g)].forEach(r => addRun(r[0], link));
        } else {
            addRun(part[0], null);
        }
    });
    // Formato primero y enlace por fuera, fusionando segmentos contiguos del mismo enlace
    let text = '';
    segments.forEach((s, k) => {
        const fmt = (s.bold ? '**' : '') + (s.italic ? '_' : '') + s.text + (s.italic ? '_' : '') + (s.bold ? '**' : '');
        const prev = segments[k - 1], next = segments[k + 1];
        if (s.link && (!prev || prev.link !== s.link)) text += '[';
        text += fmt;
        if (s.link && (!next || next.link !== s.link)) text += `](→${s.link})`;
    });
    const listMark = isList ? ' [LIST]' : '';
    if (text.trim() || hasImg) console.log(`[${style}] Para ${i}${hasImg}${listMark}: ${text}`);
    i++;
}
```

Ejecución (Windows). El segundo argumento, el `.rels`, es el que permite resolver cada enlace a su URL:
```bash
DOCXML=$(cygpath -w /tmp/doc.xml)
DOCRELS=$(cygpath -w /tmp/doc.rels)
node $(cygpath -w /tmp/parse_paragraphs.js) "$DOCXML" "$DOCRELS"
```

El parser detecta las dos formas en que Word guarda un enlace: el bloque `<w:hyperlink r:id="…">` (lo habitual) y el campo `HYPERLINK "…"` (documentos pegados desde la web o de versiones antiguas). Los enlaces a marcadores internos del propio documento salen como `#nombre-del-marcador`. Si algún enlace sale como `rIdN?? (sin URL en el .rels)`, el `.rels` no tiene esa relación: avisa al usuario en lugar de inventar la URL.

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

   Usa el formato `YYYY-MM-DD HH:MM:SS +HHMM`. **El desfase no es fijo:** el blog va en hora de Madrid, que es `+0200` en verano y `+0100` en invierno (el cambio es el último domingo de marzo y el último de octubre). Calcúlalo siempre para la fecha y hora concretas de publicación, nunca lo copies de otro post:
   ```bash
   node -e "const [d,t]=process.argv.slice(1);const o=new Intl.DateTimeFormat('en',{timeZone:'Europe/Madrid',timeZoneName:'longOffset'}).formatToParts(new Date(d+'T'+t+'Z')).find(p=>p.type==='timeZoneName').value;console.log(d+' '+t+' '+o.replace(/GMT|:/g,''))" 2026-11-03 10:00:00
   # → 2026-11-03 10:00:00 +0100
   ```
   (La hora se interpreta como UTC solo para averiguar el desfase; en las dos horas del cambio de hora el resultado puede salir con el desfase anterior, así que no programes posts entre las 00:00 y las 03:00 de esos domingos.)

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

Con esto tienes la lista completa de imágenes con sus dimensiones.

### 5d. Imagen de la tarjeta de LinkedIn y X (`og-image`)

`_includes/head.html` elige la imagen de la tarjeta social en este orden:

1. `og-image` del frontmatter, si existe.
2. La **primera imagen del post**, pero solo si es **JPG o PNG** (LinkedIn no lista WebP y ninguna de las dos redes admite SVG) y declara en `width`/`height` **al menos 600×315**.
3. Si no, `header-img`: una banda de 1500×474 que LinkedIn y X recortan a 1,91:1 y suele quedar mal.

Con el inventario del 5c, mira la primera imagen que vas a insertar:

- **Si es JPG/PNG de 600×315 o más:** la tarjeta ya sale bien sola. No añadas `og-image`.
- **Si no lo es** (lo habitual, porque las imágenes del cuerpo suelen ser `.webp`), o el post no tiene imágenes, pregunta al usuario:
  > La tarjeta de LinkedIn y X usaría la cabecera recortada, porque la primera imagen del post es `nombre-01.webp`. ¿Tienes una imagen JPG o PNG para la tarjeta, idealmente de 1200×630? (Por ejemplo: `PATRON-og.jpg` en `img/`.) Si no, sigo sin ella.

  Si da un nombre, comprueba que el fichero existe en `img/` y saca sus dimensiones con el script del 5c. Si es JPG/PNG de 600×315 o más, añade `og-image: "img/NOMBRE"` al frontmatter (Paso 7); si no existe o no cumple, avísale y no lo añadas. Si dice que no tiene, no añadas `og-image` y anótalo en los warnings del resumen.

**⚠ Modo prueba:** no preguntes ni añadas `og-image`.

Ahora guarda el estado (ver sección **Estado de la skill** al final).

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

### Notas al pie

El Word puede incluir notas al pie (referencias `<w:footnoteReference w:id="N"/>` dentro de `document.xml`, con el texto de la nota en `word/footnotes.xml` y sus posibles hipervínculos en `word/_rels/footnotes.xml.rels`). Si detectas alguna:

1. Extrae también `word/footnotes.xml` y `word/_rels/footnotes.xml.rels`:
   ```bash
   unzip -p /tmp/post.docx word/footnotes.xml > /tmp/footnotes.xml
   unzip -p /tmp/post.docx word/_rels/footnotes.xml.rels > /tmp/footnotes.rels
   ```
   Y pásalos por el mismo parser del Paso 1, que así resuelve también los enlaces de las notas (las notas tienen su propio `.rels`; los `rId` del cuerpo no sirven para ellas):
   ```bash
   node $(cygpath -w /tmp/parse_paragraphs.js) $(cygpath -w /tmp/footnotes.xml) $(cygpath -w /tmp/footnotes.rels)
   ```
   Las dos primeras «notas» de `footnotes.xml` son los separadores de Word (sin texto); el parser las omite.
2. Numera las notas en el orden en que aparecen en el texto (1, 2, 3…) e identifícalas con el slug `fn-fN`.
3. En el punto del texto donde aparece la llamada a la nota, inserta justo después de la palabra o frase de referencia (sin espacio):
   ```html
   <sup id="fnref:fn-fN"><a href="#fn:fn-fN" class="footnote">N</a></sup>
   ```
4. Al final del HTML del post (después del último párrafo), añade un único bloque con todas las notas, en orden:
   ```html
   <hr>

   <div class="footnotes">
       <ol>
           <li id="fn:fn-f1">
               <p>Texto de la nota, con sus enlaces si los tiene.&nbsp;<a href="#fnref:fn-f1" class="reversefootnote">&#8617;</a></p>
           </li>
           <li id="fn:fn-f2">
               <p>Texto de la segunda nota.&nbsp;<a href="#fnref:fn-f2" class="reversefootnote">&#8617;</a></p>
           </li>
       </ol>
   </div>
   ```
   Este es el mismo patrón ya usado en `_posts/2017-01-19-alternativas-usables-menu-hamburguesa.markdown`.
5. Si la nota o el propio texto llevan un hipervínculo, aplica las mismas reglas de enlaces externos/internos ya descritas.

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
date:          YYYY-MM-DD HH:MM:SS +HHMM
author:        "Aunitz Giménez"
header-img:    "img/post-bg-NNN.jpg"
og-image:      "img/NOMBRE-og.jpg"
tags:          [tag1, tag2]
---

CONTENIDO HTML GENERADO EN EL PASO 6
```

Notas sobre el frontmatter:
- Mantén el alineamiento visual de los valores (usa espacios para alinear como en los posts existentes).
- El `title` y `subtitle` van entre comillas dobles. Si contienen comillas dobles internas, escápalas correctamente.
- Los tags van en minúsculas y entre corchetes.
- El desfase horario de `date` es el calculado en el Paso 2 (`+0100` o `+0200`), no uno fijo.
- La línea `og-image` solo se incluye si así se decidió en el Paso 5d; en caso contrario, se omite.

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
| Imagen de la tarjeta social | `og-image` / primera imagen del post / header-img recortada |
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

### Recordatorio de enlazado interno (obligatorio)

En **modo real**, tras el recordatorio de accesibilidad, muestra siempre este segundo recordatorio destacado:

> ⚠️ **Pendiente: enlazado interno del nuevo post.** El post se ha creado sin tejer sus enlaces internos con el resto del blog. Cuando lo tengas revisado, ejecuta la skill **`enlazado-interno-ultimo-post-aunitz`** para proponer enlaces salientes (del post nuevo hacia posts antiguos) y entrantes (de posts antiguos hacia el nuevo), validándolos uno a uno.
>
> Esta skill sí vive en Claude Code (`.claude/skills/enlazado-interno-ultimo-post-aunitz/`) y, por defecto, trabaja sobre el último post añadido a `_posts/` (justo el que se acaba de crear). Ejecútala con `/enlazado-interno-ultimo-post-aunitz`.

No ejecutes tú esa skill dentro de esta: solo deja el recordatorio para que el usuario la lance cuando haya terminado de revisar el post (y, si procede, los textos alternativos).

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
    "date": "2026-01-01 10:00:00 +0100",
    "header_img": "img/post-bg-NNN.jpg",
    "og_image": null,
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
