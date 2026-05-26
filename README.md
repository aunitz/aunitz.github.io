# Aunitz Giménez Mendiburu
## Consultor y director de proyectos digitales
### https://www.aunitz.net/
Este es mi blog personal. Escribo sobre experiencia de usuario (UX), usabilidad, accesibilidad y desarrollo de soluciones en entornos digitales.
[Más información en mi perfil de LinkedIn](https://www.linkedin.com/in/aunitz/).

## Ejecutar Jekyll en local

### Levantar el servidor local de Jekyll
```console
bundle exec jekyll serve
```

**Nota:** es la instrucción que contiene el fichero `serve.bat`.

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
4. Rellena el frontmatter con `author` = autor original (no Aunitz), `canonical` = URL en The Conversation, descripción SEO, tags y `header-img` consecutivo.
5. Construye desde cero un byline propio con la plantilla del blog y lo coloca duplicado al inicio (seguido de `<hr>`) y al final (precedido de `<hr>`) del cuerpo.
6. Limpia el HTML del artículo (elimina `<div>`/`<span>` decorativos, atributos `style` y `srcset`, clases CSS de The Conversation), conserva `<h2>`/`<h3>`, listas y blockquotes, y añade `target="_blank" rel="noopener noreferrer"` a los enlaces externos.
7. Descarga las imágenes del cuerpo desde `images.theconversation.com` a `img/` con el patrón `{slug}-NN.{ext}`, preserva captions y atribuciones (CC BY-SA), y obtiene dimensiones reales.
8. Conserva intacto el píxel contador de The Conversation y la atribución original (requisito de la licencia CC).

### Modos de ejecución

- **Modo real (por defecto):** ejecuta todo el proceso, descarga las imágenes del artículo y deja el post creado en `_posts/` para revisión manual. La imagen de cabecera (`post-bg-NNN.jpg`) hay que crearla y subirla manualmente.
- **Modo prueba:** se activa añadiendo `--test` (o palabras como "prueba", "test") en la invocación. Usa imágenes ya existentes en `img/` en lugar de descargar las del artículo y, al finalizar, ofrece borrar el fichero de prueba creado.

### Cómo ejecutarla

Escribe `/republish-theconversation-aunitz` o di "quiero republicar un artículo de The Conversation" en Claude Code. Para modo prueba: `/republish-theconversation-aunitz --test`.

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
1. Un **Dashboard** con métricas estáticas del sitio web:
- Número de posts total
  - Número de posts totales por año
  - Número de posts totales por mes y año
- Número total de imágenes
- Número totas de etiquetas (tags) diferentes
- Número total de enlaces internos
- Número total de enlaces externos
- Nube de palabras de etiquetas (tags)
4. Mejorar el Schema Markup de los posts que no son míos.
5. Buscar enlaces rotos y sustituirlos por accesos a https://web.archive.org/
6. Implementar redireccionamientos 301 en los posts renombrados
7. Renombrar y redireccionar los posts de leyes UX
8. Eliminar los redireccionadores de los tips y de las leyes. De modo que quede el directorio de posts limpio de redireccionadores.