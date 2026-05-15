# Instrucciones para Claude Code

## Descripción del proyecto

Blog personal y profesional de **Aunitz Giménez Mendiburu**, consultor y director de proyectos digitales especializado en UX/usabilidad. URL: https://www.aunitz.net

El blog publica contenido educativo en español sobre UX, usabilidad, accesibilidad digital, sesgos cognitivos, leyes de UX, diseño de formularios, desarrollo de soluciones digitales y herramientas de trabajo (Git, etc.). La audiencia principal son profesionales de UX, desarrolladores y product managers del mercado hispanohablante.

El blog es también una herramienta de posicionamiento SEO y de autoridad profesional para Aunitz y su empresa asociada Adimedia (adimedia.net).

---

## Stack tecnológico

- **Generador:** Jekyll (sitio estático)
- **Hospedaje:** GitHub Pages con dominio personalizado `aunitz.net`; Cloudflare para cache (hay un GitHub Actions workflow que invalida la cache tras cada deploy)
- **Plugins Jekyll:** `github-pages`, `jekyll-paginate`, `jekyll-feed`, `jekyll-redirect-from`, `jekyll-sitemap`
- **CSS:** Bootstrap 3.4.1 CSS compilado localmente desde `bootstrap-sass/` → `css/bootstrap.min.css` (via Live Sass Compiler) + plantilla Clean Blog compilada desde `less/` → `css/clean-blog.min.css` (via Easy LESS)
- **Tipografías:** Lora (cuerpo), Open Sans (nav), Caveat (decorativa) — Google Fonts
- **Iconos:** Font Awesome 4.3.0 (CDN)
- **JavaScript:** jQuery 1.12.4 (CDN) + Bootstrap JS 3.4.1 (CDN) + `js/clean-blog.min.js`
- **Analytics:** Google Analytics 4 (ID: G-PJWXCNEVTP)
- **Datos estructurados:** Schema.org via includes: BlogPosting, BreadcrumbList, WebSite, Organization
- **Lenguajes de plantilla:** Liquid (layouts e includes), HTML + SCSS

---

## Convenciones de código y estilo

### Estructura de carpetas relevante

```
_layouts/       # Templates Jekyll (default, page, post, empty, redirected)
_includes/      # Componentes reutilizables (head, nav, footer, ga, schema-*, youtube)
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

Atributos opcionales: `hide_from_home: true` (oculta de portada), `last_modified_at` (para schema), `canonical` (evita schema en duplicados).

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
- **Volumen:** 150+ posts desde 2017
- **Frecuencia de publicación:** irregular
- **SEO:** URLs limpias (`/:title/`), meta descriptions por post, OG tags para LinkedIn, sitemap y feed RSS automáticos
- **Automatización:** existe una skill de Claude Code (`publish-post-blog-aunitz`) que automatiza la conversión de Word → HTML y la creación del fichero de post con metadatos e imágenes
- **Paginación:** 5 posts por página en portada
- **Timezone:** Europe/Madrid
