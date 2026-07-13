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
1. Instala Ruby con [RubyInstaller](https://rubyinstaller.org/). Comprobar: `ruby -v`
2. Ejecuta: `gem install bundler jekyll`. Comprobar: `jekyll -v`
3. Instala las dependencias con Bundler: `bundle install`. Se basa en el contenido de `Gemfile`.
4. Levanta el servidor local de Jekyll.
5. *(Opcional)* Limpiar antes de volver a generar: `bundle exec jekyll clean`.

## Compilar LESS manualmente en VS Code
1. Guarda el archivo `less/clean-blog.less`.
2. Pulsa `Ctrl+Shift+P`.
3. Escribe `Compile LESS to CSS` y selecciona ese comando.

## Dashboard de estadísticas del blog

URL: `/dashboard/` (`dashboard.html`, con el layout `_layouts/dashboard.html`)

Es un **dashboard estático generado en build-time**: no hay JavaScript, backend ni llamadas a APIs. Todas las métricas (posts por año y mes, etiquetas, imágenes, enlaces internos/externos, cobertura de alt, palabras totales, etc.) se calculan con Liquid a partir de `site.posts` y `site.static_files` durante la compilación de Jekyll, y quedan «congeladas» en el HTML resultante hasta la siguiente compilación (cada publicación de un post). No refleja tráfico ni datos en tiempo real; para eso están Google Analytics y Microsoft Clarity.

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

Mejora el enlazado interno de **un único post objetivo** (por defecto, el último publicado) conectándolo con el resto del blog en las dos direcciones, **sin editar ningún fichero de `_posts/` hasta que Aunitz apruebe expresamente cada cambio concreto**. No hace una revisión global del blog. Tareas que realiza:

1. Identifica y confirma el post objetivo (el último de `_posts/` por fecha del nombre, o el que indique el usuario).
2. Lee el post objetivo y extrae su tema, conceptos clave, entidades (leyes de UX, sesgos, herramientas) y los enlaces internos que ya tiene.
3. Detecta candidatos en dos direcciones, dirigido por conceptos (con `Grep` sobre `_posts/`, sin leer todos los posts a ciegas):
   - **Salientes:** enlaces desde el post objetivo hacia posts antiguos que amplían un concepto que ya menciona.
   - **Entrantes:** enlaces desde posts antiguos hacia el post objetivo, en frases donde este es el "saber más" natural.
4. Prepara una ficha por propuesta (origen, destino, motivo, texto actual vs. propuesto, texto ancla) sin editar nada.
5. Publica una **hoja HTML (artifact)** con todas las propuestas y sus diffs a color, más una sección de descartadas por transparencia.
6. Aplica **solo** las propuestas que Aunitz aprueba explícitamente en el chat, una a una; nunca asume aprobación por silencio ni convierte una aprobación parcial en total.
7. Verifica cada cambio: que el `{% post_url %}` apunta a un fichero existente y que el HTML queda bien formado.

Los criterios editoriales (qué enlace es válido, cómo elegir el ancla y el destino, qué ajustes de redacción se permiten) están en `.agents/plans/enlazado-interno-posts.md`; la skill define el flujo operativo y el mecanismo de validación. No añade contenido nuevo ni fuerza enlaces: solo enlaces útiles y naturales, con ajustes mínimos de redacción sobre texto ya existente. Omite como origen los posts de The Conversation (`republished: true`, `canonical` externo) y los `hide_from_home: true` salvo confirmación. No añade `target="_blank"` a los enlaces internos.

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

## Licencias

Este repositorio combina varias licencias:

| Ámbito | Licencia | Fichero / referencia |
|---|---|---|
| Contenido del blog (posts, textos e imágenes propias) | Todos los derechos reservados — copyright Aunitz Giménez Mendiburu | `LICENSE-CONTENT` |
| Artículos republicados de [The Conversation](https://theconversation.com/es) | [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/) — copyright de cada autor original | En el byline de cada post |
| Código del tema (plantilla Clean Blog) | [MIT](https://opensource.org/licenses/MIT) — copyright Blackrock Digital LLC | `LICENSE` |
| Bootstrap 3.4.1 (CSS compilado localmente + JS vía CDN) | [MIT](https://opensource.org/licenses/MIT) — copyright Twitter, Inc. | Cabecera en `css/bootstrap.min.css` |
| Font Awesome 4.3.0 (iconos vía CDN) | Fuentes: [SIL OFL 1.1](https://scripts.sil.org/OFL) — CSS: [MIT](https://opensource.org/licenses/MIT) | CDN de BootstrapCDN |
| jQuery 1.12.4 (vía CDN) | [MIT](https://opensource.org/licenses/MIT) — copyright OpenJS Foundation | CDN de Google |

## TODO
1. Revisar datos de https://search.google.com/
3. Revisar datos de https://clarity.microsoft.com/lang/es-es
