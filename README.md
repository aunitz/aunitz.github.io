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