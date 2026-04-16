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

### Instalar lo necesario en Windows
1. Instala Ruby con [RubyInstaller](https://rubyinstaller.org/). Comprobar: `ruby -v`
2. Ejecuta: `gem install bundler jekyll`. Comprobar: `jekyll -v`
3. Instala las dependencias con Bundler: `bundle install`. Se basa en el contenido de `Gemfile`.
4. Levanta el servidor local de Jekyll.
5. *(Opcional)* Limpiar antes de volver a generar: `bundle exec jekyll clean`.

## Skill de Claude Code: publish-post

Ubicación: `.claude/skills/publish-post/SKILL.md`

Automatiza la publicación de un nuevo post a partir de un documento Word. Tareas que realiza:

1. Lee el contenido del Word adjuntado por el usuario.
2. Genera el fichero `.markdown` en `_posts/` con la fecha del día y el slug del título.
3. Rellena el frontmatter (título, subtítulo, descripción SEO, tags, header-img).
4. Convierte el contenido a HTML limpio siguiendo las convenciones del blog.
5. Añade `target="_blank" rel="noopener noreferrer"` a los enlaces externos.
6. Convierte los enlaces internos (aunitz.net) a la sintaxis `{% post_url %}` de Jekyll.
7. Inserta las imágenes del post (que deben estar previamente en `img/`) con sus dimensiones reales.

Para ejecutarla, escribe `/publish-post` o di "quiero publicar un nuevo post" en Claude Code.

## TODO
1. Un **Dashboard** con métricas estáticas del sitio web:
- Número de posts total
  - Número de posts totales por año
  - Número de posts totales por mes y año
- Número total de imágenes
- Número totas de etiquetas (tags) diferentes
- Nube de palabras de etiquetas (tags)
2. Corregir los enlaces de las URLs que redireccionan.
3. Escribir mi biografía profesional en la wikipedia.