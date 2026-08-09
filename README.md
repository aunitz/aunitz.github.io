# Aunitz Giménez Mendiburu
## Consultor y director de proyectos digitales
### https://www.aunitz.net/
Este es mi blog personal. Escribo sobre experiencia de usuario (UX), usabilidad, accesibilidad y desarrollo de soluciones en entornos digitales.
[Más información en mi perfil de LinkedIn](https://www.linkedin.com/in/aunitz/).

## Ejecutar Jekyll en local

### Levantar el servidor local de Jekyll
```console
bundle exec jekyll serve --livereload
```

**Nota:** es la instrucción que contiene el fichero `serve.bat`. `--livereload` refresca el navegador automáticamente cada vez que Jekyll regenera el sitio (por defecto, en cada cambio de fichero), sin tener que recargar la página a mano.

### Avisos al arrancar el servidor (ignorables)

Al ejecutar `bundle exec jekyll serve` aparecen dos avisos que se pueden ignorar sin problema:

- **`To use retry middleware with Faraday v2.0+, install faraday-retry gem`** — aviso interno de una dependencia transitiva. No afecta al funcionamiento. No añadir `faraday-retry` al Gemfile para evitar conflictos con las versiones que fija `github-pages`.
- **`GitHub Metadata: No GitHub API authentication could be found`** — el gem `jekyll-github-metadata` intenta consultar la API de GitHub para rellenar variables `site.github.*`, que este blog no usa. En el build de GitHub Pages no aparece porque tiene autenticación propia.

### Build incremental (builds más rápidos en desarrollo)

Por defecto Jekyll regenera el sitio completo en cada cambio (~17 s). Con `--incremental` solo regenera los ficheros modificados:

```console
bundle exec jekyll serve --incremental
```

**Limitación:** si cambias un `_include` o un `_layout`, Jekyll puede no regenerar todos los ficheros que los usan. En ese caso, haz un build completo (sin `--incremental`).

### Instalar lo necesario en Windows

**Importante:** instala la versión de Ruby que usa GitHub Pages en producción (comprobar en [pages.github.com/versions](https://pages.github.com/versions/); en el momento de escribir esto, Ruby 3.3.x), no la última disponible en RubyInstaller. Versiones más nuevas (ej. Ruby 4.x) pueden hacer que `bundle install`/`bundle update` sea incapaz de resolver `github-pages` y sus dependencias contra versiones recientes, y termine retrocediendo en cascada hasta gemas transitivas antiguas (`jekyll` 1.x, `yajl-ruby`...) que ni siquiera compilan con Ruby moderno. Si ya tienes instalada una versión más nueva, no hace falta desinstalarla: se puede instalar la 3.3.x en una carpeta distinta (ej. `C:\Ruby33-x64`) y usar el acceso directo "Start Command Prompt with Ruby" que crea el instalador para trabajar en este proyecto sin tocar el PATH global.

1. Instala Ruby con [RubyInstaller](https://rubyinstaller.org/) (versión con **DevKit**, necesaria para compilar gemas nativas como `nokogiri`). En "Select Components" deja marcado también **MSYS2 development toolchain**.
2. Al final de la instalación, cuando se abra la consola de `ridk install`, elige la opción por defecto **`[1,3]`** (MSYS2 base + MINGW development toolchain) pulsando Enter.
3. Comprueba que todo quedó en el PATH: `ruby -v` y `gem -v`.
4. Instala Bundler: `gem install bundler`
5. Instala las dependencias del proyecto con Bundler: `bundle install`. Se basa en las versiones exactas fijadas en `Gemfile.lock` (jekyll, github-pages y el resto de gemas). **No uses `gem install jekyll`**: instalaría una versión distinta a la del `Gemfile.lock` y `jekyll -v` (sin `bundle exec`) fallaría con `Bundler::GemNotFound` al intentar cargar el `Gemfile` del proyecto.
6. Comprueba: `bundle exec jekyll -v`
7. Levanta el servidor local de Jekyll.
8. *(Opcional)* Limpiar antes de volver a generar: `bundle exec jekyll clean`.

## Compilar LESS manualmente en VS Code
1. Guarda el archivo `less/clean-blog.less`.
2. Pulsa `Ctrl+Shift+P`.
3. Escribe `Compile LESS to CSS` y selecciona ese comando.

## Dashboard de estadísticas del blog

URL: `/dashboard/` (`dashboard.html`, con el layout `_layouts/dashboard.html`)

Es un **dashboard estático generado en build-time**: no hay JavaScript, backend ni llamadas a APIs. Todas las métricas (posts por año y mes, etiquetas, imágenes, enlaces internos/externos, cobertura de alt, palabras totales, etc.) se calculan con Liquid a partir de `site.posts` y `site.static_files` durante la compilación de Jekyll, y quedan «congeladas» en el HTML resultante hasta la siguiente compilación (cada publicación de un post). No refleja tráfico ni datos en tiempo real; para eso están Google Analytics, Microsoft Clarity y GoatCounter.

## Analítica de tráfico: GoatCounter

Además de Google Analytics y Microsoft Clarity, el sitio carga [GoatCounter](https://www.goatcounter.com/), una analítica ligera y respetuosa con la privacidad. Se integra igual que GA4 y Clarity: include `_includes/goatcounter.html`, condicionado por la variable `goatcounter_code` en `_config.yml`, e insertado desde `_includes/head.html`.

**Desactivar el tracking de GoatCounter en un navegador:** entrando en https://www.aunitz.net/#toggle-goatcounter se desactiva el registro de estadísticas de GoatCounter para ese navegador concreto (queda guardado en el propio navegador, no afecta a otros dispositivos). Más detalle en la documentación oficial: [aunitz.goatcounter.com/help/skip-dev](https://aunitz.goatcounter.com/help/skip-dev).

## Skill de Claude Code: publish-post-blog-aunitz

Ubicación: `.claude/skills/publish-post-blog-aunitz/SKILL.md`

Automatiza la publicación de un nuevo post a partir de un documento Word. Tareas que realiza:

1. Lee el contenido del Word adjuntado por el usuario.
2. Genera el fichero `.markdown` en `_posts/` con la fecha del día y el slug del título.
3. Rellena el frontmatter (título, subtítulo, descripción SEO, tags, header-img).
4. Convierte el contenido a HTML limpio siguiendo las convenciones del blog.
5. Añade `target="_blank" rel="noopener noreferrer"` a los enlaces externos.
6. Convierte los enlaces internos (aunitz.net) a la sintaxis `{% post_url %}` de Jekyll.
7. Inserta las imágenes del post (que deben estar previamente en `img/`) con sus dimensiones reales.

### Modos de ejecución

- **Modo real (por defecto):** ejecuta todo el proceso y deja el post creado en `_posts/` para revisión manual.
- **Modo prueba:** se activa añadiendo `--test` (o palabras como "prueba", "test") en la invocación. Usa imágenes ya existentes en `img/` en lugar de las reales y, al finalizar, ofrece borrar el fichero de prueba creado.

### Cómo ejecutarla

Escribe `/publish-post-blog-aunitz` o di "quiero publicar un nuevo post" en Claude Code. Para modo prueba: `/publish-post-blog-aunitz --test`.

## Skill de Claude Code: republish-theconversation-aunitz

Ubicación: `.claude/skills/republish-theconversation-aunitz/SKILL.md`

Automatiza la republicación en el blog de un artículo de [The Conversation](https://theconversation.com/es) bajo licencia Creative Commons, siguiendo exactamente el formato de los posts de The Conversation ya publicados (estructura `<div class="theconversation-article-body">`, byline duplicado al inicio y al final, píxel contador conservado, frontmatter con `author` original y `canonical`). Tareas que realiza:

1. Pide al usuario el código HTML que The Conversation facilita en su pestaña **"Básico"** del cuadro de republicación (ese código ya incluye el píxel oculto del contador).
2. Extrae del HTML el título, subtítulo, autor, cargo, institución, URL canónica, ID del contador y fecha original de publicación.
3. Genera el fichero `.markdown` en `_posts/` con la fecha del día y el slug del título.
4. Rellena el frontmatter con `author` = autor original (no Aunitz), `canonical` = URL en The Conversation, descripción SEO, tags, `header-img` consecutivo y los campos de datos estructurados de republicación (`republished`, `original_date`, `license`, `author_url`, `author_affiliation`, `source_org`).
5. Construye desde cero un byline propio con la plantilla del blog y lo coloca duplicado al inicio (seguido de `<hr>`) y al final (precedido de `<hr>`) del cuerpo.
6. Limpia el HTML del artículo (elimina `<div>`/`<span>` decorativos, atributos `style` y `srcset`, clases CSS de The Conversation), conserva `<h2>`/`<h3>`, listas y blockquotes, y añade `target="_blank" rel="noopener noreferrer"` a los enlaces externos.
7. Descarga las imágenes del cuerpo desde `images.theconversation.com` a `img/` con el patrón `{slug}-NN.{ext}`, preserva captions y atribuciones (CC BY-SA), y obtiene dimensiones reales.
8. Conserva intacto el píxel contador de The Conversation y la atribución original (requisito de la licencia CC).

### Modos de ejecución

- **Modo real (por defecto):** ejecuta todo el proceso, descarga las imágenes del artículo y deja el post creado en `_posts/` para revisión manual. La imagen de cabecera (`post-bg-NNN.jpg`) hay que crearla y subirla manualmente.
- **Modo prueba:** se activa añadiendo `--test` (o palabras como "prueba", "test") en la invocación. Usa imágenes ya existentes en `img/` en lugar de descargar las del artículo y, al finalizar, ofrece borrar el fichero de prueba creado.

### Cómo ejecutarla

Escribe `/republish-theconversation-aunitz` o di "quiero republicar un artículo de The Conversation" en Claude Code. Para modo prueba: `/republish-theconversation-aunitz --test`.

## Skill de Claude Code: enlazado-interno-ultimo-post-aunitz

Ubicación: `.claude/skills/enlazado-interno-ultimo-post-aunitz/SKILL.md`

Teje **un único post objetivo** (por defecto, el último publicado) con el resto del blog, **sin editar ningún fichero hasta que Aunitz apruebe expresamente cada cambio concreto**. No hace una revisión global del blog. Trabaja en **tres direcciones**:

| Dirección | Qué hace | Fichero |
|---|---|---|
| **A. Salientes** | Enlaces desde el post objetivo hacia posts antiguos que amplían un concepto que ya menciona | `_posts/` |
| **B. Entrantes** | Enlaces desde posts antiguos hacia el post objetivo, donde este es el "saber más" natural | `_posts/` |
| **C. Relacionados** | Lista curada del bloque «También te puede interesar», en los dos sentidos | `_data/related.yml` |

Tareas que realiza:

1. Identifica y confirma el post objetivo (el último de `_posts/` por fecha del nombre, o el que indique el usuario).
2. Lee el post objetivo y extrae su tema, conceptos clave, entidades (leyes de UX, sesgos, herramientas) y los enlaces internos que ya tiene.
3. Detecta candidatos en las tres direcciones, dirigido por conceptos (con `Grep`, sin leer todos los posts a ciegas).
4. Prepara una ficha por propuesta sin editar nada.
5. Publica una **hoja HTML (artifact)** con todas las propuestas y sus diffs a color, más una sección de descartadas por transparencia.
6. Aplica **solo** las propuestas que Aunitz aprueba explícitamente en el chat, una a una; nunca asume aprobación por silencio ni convierte una aprobación parcial en total.
7. Verifica cada cambio: que el `{% post_url %}` apunta a un fichero existente, que el HTML queda bien formado y, si tocó `related.yml`, que todos los slugs resuelven y que cada lista renderiza en el orden escrito.

**Por qué la dirección C importa:** las listas curadas son estáticas. Si nadie las toca al publicar, un post nuevo no aparecerá jamás en el bloque de ningún post curado y se queda huérfano justo cuando más le interesa recibir tráfico. Cuantos más posts se curan, más se congela el grafo. La skill decide además si el post nuevo **necesita** lista curada: si sus etiquetas son específicas, el algoritmo ya acierta y lo deja en automático, diciéndolo explícitamente.

Los criterios editoriales (qué enlace es válido, cómo elegir el ancla y el destino, qué ajustes de redacción se permiten, cuándo curar los relacionados y cómo mantenerlos) están en `.claude/skills/enlazado-interno-ultimo-post-aunitz/CRITERIOS.md`; la skill define el flujo operativo y el mecanismo de validación. No añade contenido nuevo ni fuerza enlaces: solo enlaces útiles y naturales, con ajustes mínimos de redacción sobre texto ya existente. Omite como origen los posts de The Conversation (`republished: true`, `canonical` externo) y los `hide_from_home: true` salvo confirmación. No añade `target="_blank"` a los enlaces internos. `_data/related.yml` es el único fichero fuera de `_posts/` que puede tocar.

### Cómo ejecutarla

Escribe `/enlazado-interno-ultimo-post-aunitz` o di "mejora el enlazado interno del último post" en Claude Code.

## Permisos de los agentes de Claude Code

La configuración de permisos de Claude Code se distribuye en dos ficheros dentro de `.claude/`:

| Fichero | Propósito | En git |
|---|---|---|
| `settings.json` | Configuración del proyecto, compartida entre todos los colaboradores del repositorio | Sí |
| `settings.local.json` | Configuración local y personal de cada desarrollador (permisos de su entorno, preferencias propias) | Sí |

Claude Code carga ambos ficheros y combina sus permisos.

Los agentes de Claude Code pueden tener asignados permisos sobre las herramientas integradas. Estas son las herramientas disponibles:

| Herramienta | Descripción |
|---|---|
| `Read` | Leer el contenido de ficheros |
| `Write` | Crear ficheros nuevos |
| `Edit` | Editar ficheros existentes |
| `Bash` | Ejecutar comandos de terminal |
| `Glob` | Buscar ficheros por patrón de nombre |
| `Grep` | Buscar texto dentro del contenido de ficheros |
| `WebSearch` | Realizar búsquedas en la web |
| `WebFetch` | Obtener el contenido de una URL |
| `WebFetch(domain:ejemplo.com)` | Obtener el contenido de una URL restringida a un dominio concreto |
| `Skill(nombre-skill)` | Ejecutar una skill concreta |
| `Skill(nombre-skill:*)` | Ejecutar cualquier subcomando de una skill concreta |

## Sistema de redireccionamiento

### Situación actual

Algunos posts han sido renombrados a lo largo del tiempo (por ejemplo, los "tips" y las "leyes UX"). Para mantener las URLs antiguas funcionales, esos posts llevan `redirect_to: /url-destino/` en el frontmatter, junto con `sitemap: false` y `hide_from_home: true` para que no aparezcan en el sitemap ni en la portada.

El mecanismo real de redirección lo aporta el plugin **`jekyll-redirect-from`** (declarado en `_config.yml` y activo vía `github-pages`), no el layout `_layouts/redirected.html` que asignan estos posts en su frontmatter. El generador del plugin detecta cualquier documento con `redirect_to` y, en la fase `generate` (antes del render), le sobrescribe `layout` (a su propio layout interno `"redirect"`, inyectado en `site.layouts`) y también `content`/`output`, generando él mismo el HTML de redirección — con `<meta http-equiv="refresh">`, `<script>location = '...'` y `<link rel="canonical">`.

Como esa sobrescritura ocurre siempre que hay `redirect_to`, el layout `_layouts/redirected.html` **nunca llega a renderizarse para estos posts: es código muerto**. Se mantiene sin eliminar como documentación/red de seguridad. La señal fiable para detectar estos posts-stub en Liquid (por ejemplo al filtrar `site.posts` en `index.html` o `dashboard.html`) es `post.redirect_to`, no `post.layout`.

### Incidencia en el SEO

Este sistema es funcional pero **subóptimo desde el punto de vista SEO**:

- Las redirecciones cliente-side (meta-refresh + JS) **no son equivalentes a un HTTP 301**. Un 301 transfiere el link equity de forma limpia y definitiva; estas técnicas lo hacen de forma parcial e indeterminada según cómo cada motor de búsqueda decida procesarlas.
- El `<link rel="canonical">` mitiga parcialmente el problema señalando la URL de destino.
- En la práctica, **el impacto es bajo si las URLs antiguas no tienen backlinks externos relevantes**, que es el caso habitual de los posts renombrados de este blog.
- Google ha mejorado mucho su interpretación de estas redirecciones, pero nunca garantiza el mismo trato que a un 301.

### Alternativas

| Alternativa | Ventajas | Inconvenientes |
|---|---|---|
| **Redirect Rules en Cloudflare** (recomendada) | HTTP 301 real; transparente para el visitante; sin cambios en Jekyll | Requiere mantenimiento manual de cada regla en el panel de Cloudflare |
| **Eliminar los posts redirigidores** | Simplifica el repositorio | Solo válido si las URLs antiguas no tienen tráfico ni backlinks |

La opción más correcta a largo plazo es combinar **Redirect Rules en Cloudflare** (para los 301 reales) con la **eliminación progresiva de los posts redirigidores** una vez confirmado que no reciben tráfico. Ver también los puntos 6, 7 y 8 del TODO.

## Datos estructurados (Schema Markup)

El JSON-LD se genera en `_includes/schema.html` (incluido desde `_includes/head.html`). Usa un `@graph` con nodos globales (`WebSite`, `Person` de Aunitz, y `Blog` solo en portada) más nodos por página según el tipo de contenido:

| Tipo de post | Schema de artículo | Autoría | Particularidades |
|---|---|---|---|
| **Posts propios** (sin `canonical` ni `republished`) | `BlogPosting` | `Person` Aunitz (`#person`) | `publisher` = Aunitz; imagen tomada de la primera del cuerpo o `header-img` |
| **Republicados de The Conversation** (`republished: true`) | `Article` | `Person` con el autor **original** + `affiliation` | `publisher`/`sourceOrganization` = The Conversation; `isBasedOn` al original; `license`, `creditText`, `copyrightHolder`, `copyrightYear`; `datePublished` = fecha original |
| **Páginas duplicadas** (`canonical` sin `republished`) | — (suprimido) | — | Se omite el schema de artículo para evitar duplicados |

Tanto los posts propios como los republicados emiten además un `BreadcrumbList`.

### Posts republicados: campos de frontmatter

Los posts de The Conversation se identifican con `republished: true`, que activa el bloque `Article` específico. Campos que lo alimentan:

```yaml
canonical:          "https://theconversation.com/SLUG-NNNNNN"  # original; también es el rel=canonical
republished:        true
original_date:      YYYY-MM-DD          # fecha original de publicación → datePublished / copyrightYear
license:            "https://creativecommons.org/licenses/by-nd/4.0/"
author_url:         "https://theconversation.com/profiles/..."  # ficha del autor
author_affiliation: "Institución del autor"
source_org:         "The Conversation"
```

Cuando un post es republicado, `_includes/head.html` apunta el `<link rel="canonical">` y el `<meta name="author">` al artículo y autor originales (no a Aunitz). La skill `republish-theconversation-aunitz` rellena todos estos campos automáticamente.

## Bloque «También te puede interesar»

Al final de cada post, antes del paginador Anterior/Siguiente, se muestran hasta **3 artículos relacionados**. El objetivo de este bloque es aumentar las páginas vistas por sesión ofreciendo artículos realmente afines.

Es **Liquid puro, sin plugins**, por lo que funciona en GitHub Pages.

Se resuelve en **dos capas, por orden de prioridad**:

| Capa | Fuente | Cuándo actúa |
|---|---|---|
| 1. Curada | `_data/related.yml` | Si el slug del post aparece en el fichero |
| 2. Automática | Etiquetas compartidas | Si no aparece, o si ninguno de sus slugs existe ya |

Así ningún post se queda sin bloque y los artículos nuevos funcionan desde el primer día, sin esperar a que nadie los curé. Hoy hay **41 posts curados** y **85 en automático**.

### Capa curada (`_data/related.yml`)

Cada clave es el slug de un post y su valor la lista ordenada de slugs a mostrar. **El orden se respeta tal cual**, así que el primero debe ser el más afín.

```yaml
efecto-halo:
  - relacion-estetica-usabilidad
  - efecto-de-mera-exposicion
  - uso-sesgos-cognitivos-marketing
```

Criterios editoriales aplicados, documentados también en la cabecera del propio fichero:

1. **Orden por afinidad**: primero el post más parecido, no el que da más contexto.
2. **La afinidad real manda sobre la etiqueta**: se busca activamente cruzar etiquetas, porque los mejores relacionados a menudo no comparten ninguna. El caso más claro es *Qué es la accesibilidad de una aplicación* y *Qué es la usabilidad de una aplicación*, posts gemelos sin ninguna etiqueta en común.
3. **La fecha no cuenta**: un post de 2017 puede ser el más relevante.

**Alcance actual**: los 32 posts cuyas etiquetas son todas paraguas (más de 20 posts cada una), que es donde el algoritmo no tiene con qué desempatar y acaba mostrando los más recientes de una lista enorme; más 9 fichas sueltas de otras familias. En clusters pequeños (`git`, 5 posts) la curación no aporta nada: el algoritmo ya acierta.

Los slugs se escriben a mano, así que **si se renombra un post su referencia deja de resolver**. No rompe nada —se ignora, y si un post se queda sin ninguna referencia válida vuelve el algoritmo— pero degrada en silencio.

### Lógica de selección automática

Parte de las **etiquetas compartidas**, pero no todas valen lo mismo. Compartir una etiqueta poco frecuente («sesgos cognitivos», 7 posts) dice mucho más sobre el parecido entre dos artículos que compartir una etiqueta paraguas («buenas prácticas de usabilidad», 37 posts). Por eso cada coincidencia puntúa según **lo específica que sea la etiqueta**:

| Posts con esa etiqueta | Puntos por coincidencia |
|---|---|
| ≤ 10 | 5 |
| ≤ 20 | 3 |
| > 20 | 1 |

El proceso completo:

1. **Candidatos**: la unión de los posts de cada etiqueta puntuable del post actual. Se parte de `site.tags[etiqueta]`, que ya devuelve solo los posts que comparten etiqueta, en lugar de recorrer los 160+ posts del sitio.
2. **Filtrado**: se descartan el propio post, los que llevan `hide_from_home: true` y los de layout `redirected`.
3. **Puntuación**: se suman los puntos de todas las etiquetas compartidas según la tabla.
4. **Orden**: mayor puntuación primero; **a igualdad de puntos gana el post más reciente**.
5. Se muestran los 3 primeros (`related_limit` en el include).

Detalle de implementación: la puntuación se codifica como la cadena `"PPP~AAAAMMDD~/url/"` para poder ordenarla alfabéticamente con un solo `sort`. Se suma 100 a la puntuación para que siempre tenga 3 dígitos y el orden alfabético coincida con el numérico.

### Etiquetas excluidas

`related_excluded_tags` en `_config.yml` lista las etiquetas que **no puntúan**:

```yaml
related_excluded_tags: ["memorandos", "off topic"]
```

Son etiquetas de **formato**, no de **tema**: describen cómo está escrito el post, no de qué trata. El criterio de rareza asume «etiqueta poco frecuente = tema muy específico», y esa suposición se rompe con las etiquetas de género.

Caso real que motivó la exclusión: el post `open-llm-basque-day` tiene las etiquetas `inteligencia artificial` (12 posts → 3 puntos) y `memorandos` (7 posts → 5 puntos). Ganaba `memorandos`, y el bloque proponía un memorando sobre Tailwind, otro sobre cómo se sujeta el móvil y otro sobre los principios de Nielsen. Ningún post de IA entraba. Con la exclusión pasa a proponer los tres artículos de IA más recientes.

Si en el futuro aparecen otras etiquetas de formato que ensucien la selección, basta con añadirlas a esa lista. **Ojo**: Jekyll no recarga `_config.yml` en caliente, hay que reiniciar `jekyll serve`.

### Desactivarlo en un post concreto

El bloque va **activo por defecto en todos los posts**. Para ocultarlo en uno:

```yaml
related:       false
```

Un post puede quedarse sin bloque aunque esté activo: si no comparte ninguna etiqueta puntuable con ningún otro post, no hay candidatos y el bloque no se pinta. Hoy solo le ocurre a `para-que-sirven-las-lenguas`, único con la etiqueta `off topic`.

## Licencias

Este repositorio combina varias licencias:

| Ámbito | Licencia | Fichero / referencia |
|---|---|---|
| Contenido del blog (posts, textos e imágenes propias) | Todos los derechos reservados — copyright Aunitz Giménez Mendiburu | `LICENSE-CONTENT` |
| Artículos republicados de [The Conversation](https://theconversation.com/es) | [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/) — copyright de cada autor original | En el byline de cada post |
| Código del tema (plantilla Clean Blog) | [MIT](https://opensource.org/licenses/MIT) — copyright Blackrock Digital LLC | `LICENSE` |
| Bootstrap 3.4.1 (CSS compilado localmente + JS autoalojado) | [MIT](https://opensource.org/licenses/MIT) — copyright Twitter, Inc. | `css/bootstrap.min.css`, `js/vendor/bootstrap-3.4.1.min.js` |
| jQuery 1.12.4 (autoalojado) | [MIT](https://opensource.org/licenses/MIT) — copyright OpenJS Foundation | `js/vendor/jquery-1.12.4.min.js` |
| Lora y Caveat (Google Fonts, autoalojadas) | [SIL OFL 1.1](https://scripts.sil.org/OFL) | `fonts/lora-*.woff2`, `fonts/caveat-*.woff2`, `css/fonts.css` |
| Open Sans (Google Fonts, autoalojada) | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) | `fonts/open-sans-*.woff2`, `css/fonts.css` |

## Aviso legal

La página `/aviso-legal/` (`aviso-legal.html`, layout `page`) cubre el deber de información del art. 10 de la LSSI-CE: identificación del titular, condiciones de uso, propiedad intelectual, contenidos republicados, protección de datos y legislación aplicable. Va enlazada desde `_includes/footer.html` y lleva `hide_from_nav: true` para no aparecer en el menú superior.

El titular es Aunitz Giménez Mendiburu como persona física (no Adimedia). 

## TODO
1. Retirar Google Analytics 4 y Microsoft Clarity y dejar GoatCounter como única analítica (tras unas semanas de convivencia para comparar datos). Al hacerlo, actualizar el apartado 8 del aviso legal.