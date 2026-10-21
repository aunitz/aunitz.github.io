---
name: publish-post-blog-aunitz
description: >
  Publica un nuevo post en el blog Jekyll de aunitz.net. Usa esta skill cuando el usuario diga que
  quiere publicar un nuevo post, crear un artículo, añadir una entrada al blog, o algo similar.
  Automatiza la conversión de Word a HTML, la creación del fichero del post, la generación del
  frontmatter, el procesado de las imágenes en bruto (tamaño y formato del blog: WebP, -xl,
  WebM, cabecera y og-image), su inserción y la corrección de enlaces.
when_to_use: >
  Trigger phrases: "publicar un post", "nuevo post", "nuevo artículo", "crear post", "publicar
  artículo", "añadir entrada al blog", "publish post", "new post", "new blog post".
argument-hint: "[--test] ruta/al/documento.docx [carpeta/de/imagenes]"
allowed-tools: Read Write Edit Glob Grep Bash AskUserQuestion
---

# Skill: Publicar nuevo post en el blog

Eres un asistente especializado en publicar nuevos posts en el blog Jekyll de aunitz.net. Sigue estos pasos en orden estricto.

## Modos de ejecución

La skill tiene dos modos:

- **Modo real (por defecto):** ejecuta todo el proceso y deja el post creado en `_posts/` para que el usuario lo revise, haga commit y push manualmente.
- **Modo prueba:** se activa cuando el usuario incluye `--test`, `test`, `prueba` o expresiones similares (p. ej. "en modo prueba", "modo test") en la invocación de la skill. Ejecuta todo el proceso igual que el modo real, con dos diferencias:
  1. **Las imágenes en bruto son opcionales.** Si el usuario no las aporta, en los pasos 4 y 5 se usan imágenes cualquiera ya existentes en `img/` (aunque no tengan relación con el contenido). Si las aporta, se procesan igual que en modo real, lo que sirve para probar el procesado. Ver detalles en cada paso.
  2. **Al finalizar, se ofrece borrar el post creado y las imágenes generadas** (ver Paso 9).

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

> Adjunta el documento Word del nuevo post para que pueda procesarlo. Si tienes ya la carpeta con las imágenes en bruto, indícamela también.

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

Las cabeceras son `img/post-bg-NNN.jpg` de **1500×474**. Hay dos casos:

- **El usuario aporta una cabecera en bruto** (se pide en el Paso 5a): se procesa en el Paso 5c con el tipo `cabecera` y se guarda como `post-bg-NNN.jpg`. NNN es el siguiente al número más alto que exista **en `img/`**, no en `_posts/`: los posts recientes reutilizan cabeceras antiguas (`post-bg-05.jpg`…), así que el máximo en uso no sirve.
  ```bash
  ls img/post-bg-*.* | sed 's/.*post-bg-\([0-9]*\)\..*/\1/' | sort -n | tail -1
  ```
- **No la aporta:** pregunta qué `post-bg` existente quiere usar. Comprueba que el fichero existe.

En los dos casos, mira la cabecera elegida con Read antes de seguir. El título, el subtítulo y el bloque `.meta` («Publicado por…») van en blanco directamente sobre la foto, sin velo, y `.meta` es texto de 20 px que necesita un contraste de 4,5:1. Si la franja central de la imagen es clara o tiene mucho detalle, avísalo. Si la cabecera procede de un original en bruto, propón otro encuadre con `posicion` (ver 5c).

**⚠ Modo prueba:** si no hay cabecera en bruto, usa cualquier `post-bg-*` existente sin preguntar.

---

## Paso 5: Imágenes del post — procesado de los originales

La skill recibe, junto al Word, los **ficheros en bruto** de las imágenes (capturas a resolución completa, ilustraciones exportadas, GIF o vídeos de pantalla…). En este paso los empareja con las posiciones de imagen del Word y genera en `img/` los ficheros con el tamaño y el formato del blog.

**Requisitos:** `node_modules` con `sharp` (va en `devDependencies`) y, para las animaciones, `ffmpeg` y `ffprobe` en el PATH. Compruébalo antes de empezar:
```bash
node -e "require('sharp')" 2>/dev/null || npm install
ffmpeg -version >/dev/null 2>&1 || echo "Falta ffmpeg: las animaciones no se podrán convertir"
```

### Criterios del blog (sacados de los posts de 2026)

| Tipo | Cuándo | Resultado |
|---|---|---|
| `normal` | Ilustraciones, fotos y capturas que se leen bien a 750 px | WebP de **750 px de ancho** como máximo, sin ampliar nunca (una captura de 660 px se queda en 660). Las ilustraciones suelen ser 16:9 (750×422) |
| `xl` | Capturas de escritorio de **más de ~1125 px** con texto que a 750 px no se lee | WebP de 750 px en el post **más** `NOMBRE-xl.webp` de hasta 1600 px, que se abre al pulsar la imagen |
| `movil` | Capturas verticales de móvil | WebP de **360 px** de ancho. Dos seguidas van en dos columnas (ver Paso 6) |
| `animacion` | GIF animados y vídeos (mp4, mov, webm…) | **WebM VP9 sin audio** de 750 px como máximo. Un GIF de 1,6 MB queda en unos 235 KB |
| `svg` | Diagramas y logos vectoriales | Se copia tal cual; solo se calculan las dimensiones que hay que declarar |
| `cabecera` | La imagen de cabecera | JPG recortado a 1500×474 |
| `og` | Imagen para la tarjeta de LinkedIn y X (Paso 5d) | JPG recortado a 1200×630 |

Todos los ficheros raster salen con la orientación EXIF aplicada, en sRGB y sin metadatos.

### 5a. Pedir los originales

Si no vinieron en la invocación, pide la carpeta:

> Indica la carpeta con las imágenes en bruto del post (y la cabecera, si tienes una nueva). Si alguna imagen solo está dentro del Word, dímelo y la saco de ahí.

Pregunta también el **nombre base** de los ficheros y propón uno derivado del slug del Paso 3, acortado si es muy largo (p. ej. `buenas-practicas-usabilidad-chatbot-ia`). Los ficheros se llamarán `BASE-01`, `BASE-02`… en el orden del Word. Comprueba que no hay ficheros con ese nombre en `img/`:
```bash
ls img/BASE-* 2>/dev/null
```

### 5b. Emparejar originales y posiciones del Word

Extrae las imágenes que lleva incrustadas el Word y su orden de aparición:
```bash
rm -rf /tmp/docx-media && mkdir -p /tmp/docx-media && unzip -o -q /tmp/post.docx 'word/media/*' -d /tmp/docx-media
```
El orden lo dan los `r:embed="rIdN"` de `document.xml` (las marcas `[IMG:rIdN]` del parser del Paso 1), y cada `rIdN` apunta a su `media/imageN.*` en `/tmp/doc.rels`.

Empareja cada posición con un original:

- Si los originales están numerados o tienen nombres que siguen el orden del texto, empareja por orden.
- **Si hay dudas, compáralos a la vista:** abre con Read la imagen del Word (`/tmp/docx-media/word/media/imageN.*`) y los originales candidatos.
- **Si a una posición le falta el original,** propón usar la imagen incrustada en el Word como fuente. Suele estar comprimida, pero sirve. No dejes huecos sin preguntar.

Asigna a cada imagen un **tipo** según la tabla de criterios. Para decidir entre `normal` y `xl`, mira la captura: si a 750 px de ancho el texto relevante sería ilegible, es `xl`.

Muestra la propuesta en una tabla y **espera a que el usuario la confirme o la corrija**:

| # | Párrafo Word | Original | Medidas originales | Tipo | Fichero final |
|---|---|---|---|---|---|
| 1 | Para 4 | `IMG_2034.png` | 2560×1187 | xl | `BASE-01.webp` + `BASE-01-xl.webp` |
| 2 | Para 9 | `animacion.gif` | 834×248 | animacion | `BASE-02.webm` |

Si te ayuda montar una hoja de contactos (originales en una fila, imágenes del Word en otra) para compararlas de un vistazo, ten en cuenta que **un script guardado en `/tmp` no encuentra `sharp`**: Node busca los módulos junto al script, no en el directorio actual. Ejecútalo desde la raíz del repo con `NODE_PATH="$(cygpath -w "$PWD/node_modules")" node …`. Los `node -e` lanzados desde la raíz del repo no tienen ese problema.

Las medidas originales se sacan con sharp (sirve para cualquier formato raster):
```bash
node -e "const s=require('sharp');Promise.all(process.argv.slice(1).map(f=>s(f).metadata().then(m=>console.log(f,m.width+'x'+m.height,m.format,(m.pages||1)>1?'animada':''))))" RUTA/*.*
```

Señala también los **originales que no se usan** por si sobra alguno.

### 5c. Procesar

Escribe el plan en `/tmp/plan-imagenes.json`. Las rutas de `src` van en formato Windows, porque Node no ve `/tmp` de Git Bash, pero **con barras normales** (`C:/ruta/…`): Node las acepta, y las barras invertidas se pierden al escribir el JSON con un heredoc de Bash, lo que rompe el `JSON.parse`:
```json
{
  "outDir": "img",
  "items": [
    { "src": "C:/ruta/IMG_2034.png", "name": "BASE-01", "tipo": "xl" },
    { "src": "C:/ruta/animacion.gif", "name": "BASE-02", "tipo": "animacion" },
    { "src": "C:/ruta/cabecera.jpg", "name": "post-bg-122", "tipo": "cabecera", "posicion": "centre" }
  ]
}
```
`posicion` solo afecta a `cabecera` y `og`, y decide qué parte se conserva al recortar: `centre` (por defecto), `top`, `bottom`, `left`, `right`, `attention` (la zona más llamativa) o `entropy`.

Ejecuta el script desde la raíz del repositorio:
```bash
node .claude/skills/publish-post-blog-aunitz/scripts/procesar-imagenes.mjs $(cygpath -w /tmp/plan-imagenes.json)
```

El script no sobrescribe ficheros existentes salvo con `"sobrescribir": true`. Devuelve un JSON con, por imagen, el `src`, las **dimensiones que hay que declarar** en el HTML, la `-xl` si la hay, la `duracion` de las animaciones y el peso. Además:

- Si alguna imagen sale en `errores`, informa al usuario y decide con él antes de seguir.
- Muestra los `aviso` que devuelva: una `-xl` que no aporta resolución, una cabecera ampliada desde un original pequeño…
- Abre con Read la cabecera generada y una de las capturas con texto para comprobar que el recorte y la nitidez son correctos.

Guarda el resultado en el estado (ver **Estado de la skill**) y apunta la lista de ficheros generados: el modo prueba la necesita para limpiar.

**⚠ Modo prueba:** si el usuario no aporta originales, no proceses nada. Usa imágenes existentes en `img/` (excluyendo `post-bg-*`), tantas como posiciones de imagen tenga el Word, y saca sus medidas con el comando de sharp del 5b. Si aporta originales, procésalos igual que en modo real: el Paso 9 los borrará.

### 5d. Imagen de la tarjeta de LinkedIn y X (`og-image`)

`_includes/head.html` elige la imagen de la tarjeta social en este orden:

1. `og-image` del frontmatter, si existe.
2. La **primera imagen del post**, pero solo si es **JPG o PNG** (LinkedIn no lista WebP y ninguna de las dos redes admite SVG) y declara en `width`/`height` **al menos 600×315**.
3. Si no, `header-img`: una banda de 1500×474 que LinkedIn y X recortan a 1,91:1 y suele quedar mal.

Como el procesado genera WebP, la primera imagen casi nunca cumple. Propón generar `BASE-og.jpg` con el tipo `og` a partir del **original** de la primera imagen del post (lo habitual es una ilustración 16:9, que apenas pierde nada al recortarla a 1,91:1). Si encaja mejor, usa el original de la cabecera:

> La tarjeta de LinkedIn y X usaría la cabecera recortada. ¿Genero `BASE-og.jpg` (1200×630) a partir de la primera imagen del post?

- **Si acepta:** procésala con el mismo script. Si devuelve el aviso de original pequeño, coméntaselo. Abre el resultado con Read y añade `og-image: "img/BASE-og.jpg"` al frontmatter (Paso 7).
- **Si prefiere otra imagen ya preparada:** comprueba que existe en `img/`, que es JPG o PNG y que mide al menos 600×315.
- **Si no quiere ninguna:** no añadas `og-image` y anótalo en los warnings del resumen.

**⚠ Modo prueba:** no preguntes ni añadas `og-image`.

---

## Paso 6: Convertir el contenido Word a HTML limpio

### Reglas generales

- Usa `<p>` para párrafos normales.
- Usa `<h2>` y `<h3>` para encabezados (nunca `<h1>`, que es el título del post).
- Usa `<strong>` para negritas y `<em>` para cursivas, **colapsando runs adyacentes del mismo formato** (véase script del Paso 1). Si varios runs consecutivos son todos bold, envuélvelos en un único `<strong>`.
- **Encabezados:** `Ttulo2` → `<h2>`, `Ttulo3` → `<h3>`. Si el Word usa `Ttulo4`, respétalo como `<h4>` (el CSS lo estiliza y lo usan varios posts, como `2026-04-20-quiero-que-la-ia-me-cite.markdown`); no lo aplanes a `<h3>`.
- **Listas con viñetas:** un párrafo es elemento de lista si su XML contiene `<w:numPr>` con `<w:numId w:val="N">` (N > 0). Agrupa párrafos de lista consecutivos en `<ul>…</ul>`. Cierra el `</ul>` en cuanto aparezca un párrafo sin lista. **Para saber si es numerada no te fíes del texto:** mira en `word/numbering.xml` qué `abstractNumId` tiene ese `numId` y el `numFmt` de su nivel 0 (`decimal` → `<ol>`, `bullet` → `<ul>`):
  ```bash
  unzip -p /tmp/post.docx word/numbering.xml > /tmp/numbering.xml
  node -e "const c=require('fs').readFileSync(process.argv[1],'utf8');const fmt={};for(const m of c.matchAll(/<w:abstractNum [^>]*w:abstractNumId=\"(\d+)\"[\s\S]*?<w:numFmt w:val=\"(\w+)\"/g))fmt[m[1]]=m[2];for(const m of c.matchAll(/<w:num w:numId=\"(\d+)\"[^>]*>[\s\S]*?<w:abstractNumId w:val=\"(\d+)\"/g))console.log('numId',m[1],fmt[m[2]])" "$(cygpath -w /tmp/numbering.xml)"
  ```
  Ejemplo:
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

Inserta cada imagen en su posición del Word con el `src` y las dimensiones **exactas que devolvió el script del Paso 5c**.

**Imagen dentro de un párrafo con texto.** Word suele anclar la imagen en el mismo párrafo que el encabezado o la frase que la sigue: el parser lo muestra como `[Ttulo3] Para 24 [IMG:rId10]: Hacia dónde va la industria`. La imagen va en su propio `<p>`, **antes** del encabezado si en el XML el `r:embed` aparece antes del primer `<w:t>`, y después si aparece detrás. Nunca la metas dentro del `<h2>`/`<h3>`.

El marcado depende del tipo:

**`normal`, `svg` y `movil` suelta:**
```html
<p><img src="{{ site.baseurl }}/img/BASE-01.webp" loading="lazy" alt="" width="W" height="H"></p>
```
Un SVG de logo puede declararse más pequeño que 750 px (manteniendo la proporción) y centrarse con `class="center-block"`, como el de LATXA en `2026-06-27-open-llm-basque-day.markdown`.

**`xl`:** la versión de 750 px en el post, enlazada a la `-xl`:
```html
<p><a href="{{ site.baseurl }}/img/BASE-01-xl.webp" target="_blank" rel="noopener noreferrer"><img src="{{ site.baseurl }}/img/BASE-01.webp" loading="lazy" alt="" width="750" height="H"></a></p>
```

**Dos `movil` seguidas:** en dos columnas, como en `2026-05-12-buenas-practicas-usabilidad-chatbot-ia-sitio-web.markdown`:
```html
<div class="row">
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/BASE-03.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
    <div class="col-sm-6">
        <p><img src="{{ site.baseurl }}/img/BASE-04.webp" loading="lazy" alt="" width="360" height="800" class="img-responsive"></p>
    </div>
</div>
```
(Es la única excepción a la regla de no usar `<div>`.)

**`animacion`:** un `<video>` silencioso en bucle. El `title` se deja vacío, porque lo rellena la skill de accesibilidad de medios igual que los `alt`. Si la `duracion` que devolvió el script **supera los 5 segundos**, añade `controls`: WCAG 2.2.2 exige poder pausar cualquier movimiento automático de más de 5 s.
```html
<p><video src="{{ site.baseurl }}/img/BASE-02.webm" width="W" height="H" autoplay loop muted playsinline title=""></video></p>
<p><video src="{{ site.baseurl }}/img/BASE-05.webm" width="W" height="H" autoplay loop muted playsinline controls title=""></video></p>
```

Si una imagen necesita caption, usa:
```html
<figure>
    <img src="{{ site.baseurl }}/img/NOMBRE-IMAGEN.webp" loading="lazy" alt="" width="W" height="H" class="center-block">
    <figcaption>Texto del caption</figcaption>
</figure>
```

Si el usuario decidió en el Paso 5b dejar una posición sin imagen, inserta un comentario:
```html
<!-- imagen no disponible -->
```

### Estrategia para posts largos (más de 5 secciones h2)

Si el post tiene más de 5 secciones `<h2>`, genera el HTML **sección por sección** en lugar de todo de golpe, para evitar alcanzar el límite de tokens de salida:

1. Escribe el fichero con Write: el frontmatter y las primeras secciones.
2. Añade el resto con **Edit**, tomando como `old_string` el último párrafo escrito y como `new_string` ese mismo párrafo seguido de las secciones nuevas. **No uses `cat >> … << 'EOF'` en Bash:** con textos largos que llevan comillas tipográficas y rectas el heredoc falla (`unexpected EOF while looking for matching '`) y no se escribe nada.
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

### 7b. Verificar que no se ha perdido texto

Compara, párrafo a párrafo, el texto del Word con el del post sin etiquetas. Detecta párrafos perdidos, duplicados o retocados sin querer, algo fácil en posts largos escritos por partes. Guarda primero la salida del parser y luego compara:
```bash
node $(cygpath -w /tmp/parse_paragraphs.js) "$(cygpath -w /tmp/doc.xml)" "$(cygpath -w /tmp/doc.rels)" > /tmp/word.txt
node -e "
const fs=require('fs');const norm=s=>s.replace(/\[([^\]]*)\]\(→[^)]*\)/g,'\$1').replace(/[*_]/g,'').replace(/\s+/g,' ').trim();
const w=fs.readFileSync(process.argv[1],'utf8').split('\n').filter(Boolean).map(l=>norm(l.replace(/^\[[^\]]*\] Para \d+( \[IMG:\w+\])?( \[LIST\])?: ?/,''))).filter(Boolean).slice(2);
let post=fs.readFileSync(process.argv[2],'utf8').split('---').slice(2).join('---');post=post.split('<div class=\"footnotes\">')[0].replace(/<sup[^>]*>.*?<\/sup>/g,'');
const p=[...post.matchAll(/<(p|li|h2|h3|h4)>([\s\S]*?)<\/\1>/g)].map(m=>norm(m[2].replace(/<[^>]+>/g,''))).filter(Boolean);
console.log('Word',w.length,'post',p.length);let bad=0;w.forEach((t,i)=>{if(t!==p[i]){bad++;console.log('DIF',i,'\nW:',t.slice(0,150),'\nP:',(p[i]||'').slice(0,150))}});console.log('diferencias',bad)" "$(cygpath -w /tmp/word.txt)" "_posts/FICHERO.markdown"
```
El `.slice(2)` descarta el título y el subtítulo, que van en el frontmatter; ajústalo si el Word no tiene subtítulo. Si sale alguna diferencia, corrígela antes del resumen. Las únicas aceptables son las intencionadas (por ejemplo, un párrafo en negrita convertido en encabezado), y en ese caso explícalas en el resumen.

Después, si el usuario tiene Ruby y Bundler, arranca la vista previa (`preview_start` con la configuración `jekyll-aunitz` de `.claude/launch.json`) y comprueba en la página del post que cargan todas las imágenes, que cada llamada a nota lleva a su nota y que `og:image` apunta a la imagen esperada.

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

**Imágenes procesadas e insertadas (N):**
| Original | Tipo | Fichero | Dimensiones | Peso | Párrafo Word |
|---|---|---|---|---|---|
| IMG_2034.png (2560×1187) | xl | BASE-01.webp + BASE-01-xl.webp | 750×348 / 1600×742 | 18 KB / 54 KB | Para 10 |
| … | … | … | … | … | … |

**Peso total de las imágenes del post** (sin contar las `-xl`, que solo se descargan al pulsar).

**Posiciones sin imagen y originales sin usar:** lista si los hay.

**Ficheros nuevos en `img/`:** la lista completa, para que el usuario los añada al commit junto con el post.

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

> ¿Quieres que elimine el fichero de prueba `_posts/FICHERO.markdown` y las N imágenes que se generaron en `img/`?

(Enumera las imágenes: son las que apuntaste en el estado al procesarlas en el Paso 5c. Si no se procesó ninguna, la pregunta es solo por el post.)

- Si responde **sí** (o equivalente): borra con `rm` el post y **exactamente** los ficheros generados en esta ejecución, y confirma que se han borrado. Nunca borres imágenes de `img/` que existieran antes, aunque se hayan usado en el post de prueba.
- Si responde **no** (o equivalente): deja los ficheros en su sitio y avisa al usuario de que permanecen en `_posts/` e `img/` y que deberá borrarlos manualmente cuando ya no los necesite.

---

## Estado de la skill (persistencia entre sesiones)

Guarda el estado en `.claude/skills/publish-post-blog-aunitz/state/state.json` después de procesar las imágenes (Paso 5c) y después de cada sección HTML escrita (Paso 6). Si una sesión se interrumpe después del 5c, al reanudarla **no vuelvas a procesar** las imágenes: ya están en `img/` y el script se negaría a sobrescribirlas. Formato:

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
  "images_dir": "C:\\ruta\\a\\los\\originales",
  "images": [
    { "para": 10, "original": "IMG_2034.png", "tipo": "xl", "src": "img/BASE-01.webp", "width": 750, "height": 348, "xl": "img/BASE-01-xl.webp" },
    { "para": 15, "original": "animacion.gif", "tipo": "animacion", "src": "img/BASE-02.webm", "width": 750, "height": 224, "duracion": 6.65 }
  ],
  "generated_files": ["img/BASE-01.webp", "img/BASE-01-xl.webp", "img/BASE-02.webm", "img/post-bg-122.jpg"],
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
