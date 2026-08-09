# Instrucciones para Claude Code

## Descripción del proyecto

Blog personal y profesional de **Aunitz Giménez Mendiburu**, consultor y director de proyectos digitales especializado en UX/usabilidad. URL: https://www.aunitz.net

El blog publica contenido educativo en español sobre UX, usabilidad, accesibilidad digital, sesgos cognitivos, leyes de UX, diseño de formularios, desarrollo de soluciones digitales y herramientas de trabajo (Git, etc.). La audiencia principal son profesionales de UX, desarrolladores y product managers del mercado hispanohablante.

El blog es también una herramienta de posicionamiento SEO y de autoridad profesional para Aunitz y su empresa asociada Adimedia (adimedia.net).

---

## Stack tecnológico

- **Generador:** Jekyll (sitio estático)
- **Hospedaje:** GitHub Pages con dominio personalizado `aunitz.net`; Cloudflare para cache (hay un GitHub Actions workflow que invalida la cache tras cada deploy). Ver «Infraestructura: DNS y HTTPS» más abajo antes de tocar nada de Cloudflare
- **Plugins Jekyll:** `github-pages`, `jekyll-paginate`, `jekyll-feed`, `jekyll-redirect-from`, `jekyll-sitemap`
- **CSS:** Bootstrap 3.4.1 CSS compilado localmente desde `bootstrap-sass/` → `css/bootstrap.min.css` (via Live Sass Compiler) + plantilla Clean Blog compilada desde `less/` → `css/clean-blog.min.css` (via Easy LESS)
- **Tipografías:** Lora (cuerpo), Open Sans (nav), Caveat (decorativa) — Google Fonts autoalojadas en `fonts/` (`css/fonts.css`)
- **Iconos:** SVG inline en el footer (`css/icons.css`); no se usa ninguna librería de iconos
- **JavaScript:** jQuery 1.12.4 + Bootstrap JS 3.4.1, ambos autoalojados en `js/vendor/` + `js/clean-blog.min.js`
- **Analytics:** Google Analytics 4 (ID: G-PJWXCNEVTP) + Microsoft Clarity (heatmaps y grabaciones de sesión, ID: x62p7a3dnf)
- **Datos estructurados:** Schema.org via includes: BlogPosting, BreadcrumbList, WebSite, Organization
- **Lenguajes de plantilla:** Liquid (layouts e includes), HTML + SCSS

---

## Infraestructura: DNS y HTTPS

⚠️ **Configuración crítica y frágil. No modificar sin leer esta sección entera.**

Cloudflare va por delante de GitHub Pages en modo proxy (nube naranja) tanto en el CNAME `www` como en los cuatro registros A del apex.

**Modo SSL/TLS de Cloudflare: debe estar en «Custom SSL/TLS» → «Full».**

- **Nunca «Full (strict)».** Exige un certificado válido en el origen, y GitHub Pages no puede emitir ni renovar el suyo mientras Cloudflare esté en modo proxy (ve el dominio resolviendo a IPs de Cloudflare, no a las suyas, y lo marca como *«not properly configured to support HTTPS»*). Funcionó 564 días hasta que el certificado caducó; entonces el sitio cayó con error 526 y el pipeline de Pages dejó de compilar los commits (agosto de 2026).
- **Nunca «Automatic SSL/TLS».** Cloudflare sube el modo de cifrado por su cuenta de forma progresiva y, según su documentación, no vuelve a bajarlo aunque eso rompa el sitio. Acabaría reintroduciendo Full (strict).
- **Nunca «Flexible».** El tramo Cloudflare→origen viaja en texto plano.

Con «Full», el tramo Cloudflare→GitHub va cifrado pero sin validar el certificado del origen, lo que elimina por completo la dependencia del ciclo de renovación de 90 días de GitHub. Los visitantes reciben el certificado propio de Cloudflare (Universal SSL), que se autorrenueva solo.

**Consecuencias esperadas y aceptadas en la pantalla de GitHub Pages. Ninguna de las dos es un problema que haya que resolver, y no deben intentar arreglarse:**

- El checkbox **«Enforce HTTPS» queda permanentemente deshabilitado**. En esta arquitectura es irrelevante: quien termina el TLS con el visitante es Cloudflare.
- El estado del dominio se queda en **«DNS Check in Progress» y nunca pasa a verde**. GitHub busca un CNAME hacia `aunitz.github.io` o registros A con sus propias IPs, pero desde fuera el proxy de Cloudflare oculta el CNAME y publica sus propias IPs (`188.114.x.x`), así que el check no puede concluir. No afecta al servicio: GitHub decide qué servir a partir del fichero `CNAME` del repo y de la cabecera `Host`, no de este check.

**Registros A del apex (`aunitz.net`):** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Las antiguas `192.30.252.153/.154` están obsoletas. Ojo: con el proxy activo estos registros son invisibles desde internet (Cloudflare publica los suyos); sirven para que Cloudflare sepa a qué origen conectarse, no para los checks de GitHub.

**Verificación de dominio:** `aunitz.net` está verificado a nivel de cuenta de GitHub mediante el registro TXT `_github-pages-challenge-aunitz` (agosto de 2026). Al ser TXT no se ve afectado por el proxy, así que es la única comprobación del lado de GitHub que sí funciona en esta arquitectura. Impide que otra cuenta pueda reclamar el dominio en sus propias GitHub Pages. **No borrar ese registro TXT.**

**Otros ajustes activos:** DNSSEC, HSTS (max-age 6 meses), Always Use HTTPS, Automatic HTTPS Rewrites, una Page Rule que redirige el apex a `www` con 301 y otra de «Cache Everything» sobre `www`.

---

## Convenciones de código y estilo

### Estructura de carpetas relevante

```
_layouts/       # Templates Jekyll (default, page, post, empty, fullscreen, redirected)
_includes/      # Componentes reutilizables (head, nav, footer, ga, clarity, schema, youtube)
_posts/         # Artículos en formato .markdown
css/            # Estilos compilados (no editar directamente)
js/             # JavaScript (clean-blog.js y su versión minificada)
img/            # Imágenes del sitio
```

### Naming conventions

- **Posts:** `YYYY-MM-DD-slug.markdown` — slug en minúsculas, sin tildes, guiones entre palabras, sin artículos
- **Imágenes de cabecera:** `post-bg-NNN.jpg` (numeración consecutiva: post-bg-99.jpg, post-bg-100.jpg…)
- **Imágenes inline:** `nombre-descriptivo-NN.{jpg,png,webp}` (ej: `efecto-halo-01.jpg`)

### Frontmatter de posts

```yaml
---
layout:        post
title:         "Título del post"
subtitle:      "Subtítulo opcional"
date:          YYYY-MM-DD HH:MM:SS +0200
author:        "Aunitz Giménez"
header-img:    "img/post-bg-NNN.jpg"
description:   "Descripción SEO (100-150 caracteres)"
tags:          [tag1, tag2, tag3]
---
```

Atributos opcionales: `hide_from_home: true` (oculta de portada), `last_modified_at` (para schema), `canonical` (URL canónica; en duplicados sin `republished` suprime el schema de artículo), `related: false` (oculta el bloque «También te puede interesar», que va activo por defecto en todos los posts). Posts republicados de The Conversation: `republished: true` + `original_date`, `license`, `author_url`, `author_affiliation`, `source_org` (activan el bloque `Article` específico en `_includes/schema.html`).

### Convenciones HTML/Markdown en posts

- El contenido de los posts se escribe en **HTML directo** (no Markdown puro) para control preciso del marcado
- Imágenes: atributo `loading="lazy"` y dimensiones reales
- Enlaces externos: `target="_blank" rel="noopener noreferrer"`
- Enlaces internos: sintaxis Jekyll `{% post_url YYYY-MM-DD-slug %}`
- Estructura de encabezados: `<h2>` y `<h3>` dentro del post (nunca `<h1>`, que es el título)
- Énfasis: `<strong>` (negrita) y `<em>` (cursiva)

### Convenciones CSS

- Bootstrap 3 para grid (`col-lg-*`, `col-md-*`, offsets)
- Clases propias de Clean Blog: `.post-preview`, `.intro-header`, `.tags`, `.center-block`, etc.
- Sin metodología BEM; estilo centrado en Bootstrap
- No editar los `.min.css` directamente

---

## Contexto de negocio

- **Idioma:** 100% español
- **Volumen:** 160+ posts desde 2017
- **Frecuencia de publicación:** irregular
- **SEO:** URLs limpias (`/:title/`), meta descriptions por post, OG tags para LinkedIn, sitemap y feed RSS automáticos
- **Automatización:** existen skills de Claude Code para el blog en `.claude/skills/`: `publish-post-blog-aunitz` (conversión Word → HTML y creación del fichero de post con metadatos e imágenes), `republish-theconversation-aunitz` (republicación de artículos de The Conversation respetando la licencia CC) y `enlazado-interno-ultimo-post-aunitz` (mejora del enlazado interno del último post publicado)
- **Paginación:** 5 posts por página en portada
- **Timezone:** Europe/Madrid

---

## Nota de mantenimiento

Existe un fichero gemelo `AGENTS.md` (instrucciones para Codex) con contenido casi idéntico a este. Cualquier cambio en las convenciones o el stack debe replicarse en ambos ficheros para mantenerlos sincronizados.
