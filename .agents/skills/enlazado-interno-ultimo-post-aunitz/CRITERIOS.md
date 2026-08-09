# Criterios editoriales del enlazado interno de aunitz.net

Documento de referencia de la skill `enlazado-interno-ultimo-post-aunitz`.
La skill define **el flujo operativo y el mecanismo de validación**; este
documento define **los criterios editoriales**. Si hay conflicto, la skill
manda en lo operativo y este documento en lo editorial.

> Este fichero vivía antes en `.agents/plans/enlazado-interno-posts.md` y se
> borró por error en el commit `9d0c107`, en una limpieza de planes
> completados, dejando la skill sin su fuente de criterios. Ahora vive junto a
> la skill precisamente para que las limpiezas de `.agents/plans/` no vuelvan
> a llevárselo.

---

## Parte 1 — Enlaces internos dentro del texto

### Principio editorial

El enlazado interno debe mejorar la experiencia del lector. Un enlace es
válido si:

- Aporta una ampliación relevante del tema tratado en el párrafo.
- Conecta conceptos realmente relacionados.
- Ayuda a seguir una línea de lectura lógica dentro del blog.
- No interrumpe el flujo natural del texto.
- Puede integrarse con un ancla descriptiva y comprensible.

Un enlace **no** debe proponerse si:

- La relación entre posts es débil o tangencial.
- El texto ancla queda artificial.
- Repite un enlace ya presente muy cerca.
- Enlaza una palabra demasiado genérica, como «aquí», «este artículo», «más
  información» o términos aislados sin valor contextual.
- Obliga a añadir frases nuevas que no estaban justificadas por el contenido
  original.

### Criterio sobre cambios de texto

Se pueden proponer ajustes mínimos del texto original cuando el cambio haga
más natural el enlace.

**Permitido:**

- Convertir una mención existente en un texto ancla más descriptivo.
- Reordenar levemente una frase para que el enlace no quede forzado.
- Sustituir una expresión genérica por otra más clara si mantiene el
  significado original.
- Ajustar una concordancia o puntuación afectada por la inserción del enlace.

**No permitido:**

- Añadir nuevos párrafos.
- Añadir explicaciones completas que no estaban en el post.
- Reescribir secciones enteras.
- Cambiar el enfoque editorial del artículo.
- Introducir enlaces solo porque exista un post relacionado, si el contexto
  del párrafo no lo pide.

### Criterios para elegir el texto ancla

El texto ancla debe:

- Ser descriptivo por sí mismo.
- Encajar de forma natural dentro de la frase.
- Anticipar correctamente el contenido del post destino.
- Tener una longitud razonable, normalmente entre 2 y 8 palabras.
- Evitar fórmulas genéricas como «leer más», «este post», «aquí» o «en este
  enlace».
- No sobreoptimizar palabras clave.

Buenos ejemplos:

```html
<a href="{% post_url 2025-02-07-efecto-halo %}">el efecto halo</a>
<a href="{% post_url 2021-03-19-formularios-usables-consejos-de-diseno %}">formularios más usables</a>
```

A evitar:

```html
<a href="{% post_url 2025-02-07-efecto-halo %}">aquí</a>
<a href="{% post_url 2025-02-07-efecto-halo %}">post</a>
```

### Criterios para elegir el post destino

Un post destino es buen candidato si:

- Profundiza en un concepto mencionado en el post origen.
- Resuelve una duda que el lector podría tener justo en ese punto.
- Es más específico que el post origen sobre ese tema.
- Tiene relación temática fuerte, no solo una coincidencia de palabra.
- No recibe ya un enlace equivalente desde el mismo párrafo o sección.

Cuando haya varios destinos posibles:

- Elegir el más útil para el lector, no necesariamente el más reciente.
- Preferir posts evergreen frente a piezas muy coyunturales, salvo que el
  contexto lo pida.
- Evitar enlazar siempre a los mismos posts si existen alternativas igual de
  útiles.
- Reportar la duda si dos destinos parecen igualmente válidos.

### Reglas de edición

- Editar solo el fragmento aprobado; preservar el resto del HTML y del Liquid.
- Usar `{% post_url YYYY-MM-DD-slug %}` en enlaces a posts.
- No añadir `target="_blank"` ni `rel="noopener noreferrer"` a enlaces
  internos.
- No cambiar el frontmatter.
- No reformatear el post completo ni ordenar o limpiar enlaces existentes que
  no formen parte de la propuesta aprobada.

---

## Parte 2 — Bloque «También te puede interesar» (`_data/related.yml`)

Además de los enlaces dentro del texto, el blog muestra al final de cada post
hasta 3 artículos relacionados. Se resuelve en dos capas: si el slug del post
está en `_data/related.yml` se usa esa lista curada; si no, un algoritmo por
etiquetas compartidas elige por él. Ver el README para el detalle técnico.

### Por qué hay que mantenerlo al publicar

Una lista curada es **estática**. Si no se toca al publicar, un post nuevo no
aparecerá en el bloque de ningún artículo curado y se queda huérfano justo
cuando más le interesa recibir tráfico. Cuantos más posts se curan, más se
congela el grafo. Por eso el mantenimiento va en **dos direcciones**, igual
que el enlazado del texto.

### Criterios de selección

1. **Orden por afinidad**: primero el post más parecido, no el que da más
   contexto. Si un artículo explica una ley y otro la aplica, manda el
   parecido temático y no la jerarquía conceptual.
2. **La afinidad real manda sobre la etiqueta compartida**: hay que buscar
   activamente cruzar etiquetas, porque los mejores relacionados a menudo no
   comparten ninguna. El caso de referencia son «Qué es la accesibilidad de
   una aplicación» y «Qué es la usabilidad de una aplicación»: posts gemelos
   sin ninguna etiqueta en común.
3. **La fecha no cuenta**: un post de 2017 puede ser el más relevante.
4. **Exactamente 3 slugs** por entrada, sin autorreferencias ni repetidos.

Estos criterios están también en la cabecera del propio `_data/related.yml`,
que es la fuente de verdad si alguna vez divergen.

### Cuándo dar lista curada a un post nuevo

No todos los posts la necesitan: **en clusters pequeños el algoritmo ya
acierta y curar es trabajo perdido** (comprobado con la etiqueta `git`, 5
posts, donde la curación solo cambiaba el orden). Proponer entrada curada
solo si se cumple alguna de estas dos condiciones:

- **Etiquetas paraguas**: todas las etiquetas del post nuevo tienen más de 20
  posts (hoy «buenas prácticas de usabilidad» y «leyes y principios de UX»).
  Sin nada que desempate, el algoritmo mostraría «los tres más recientes» de
  una lista enorme.
- **Gemelo inalcanzable**: existe un post claramente afín que el algoritmo no
  puede proponer o dejaría muy abajo, porque comparten pocas etiquetas o
  ninguna.

Si no se cumple ninguna, **decirlo explícitamente y dejar el post en
automático**. Es un resultado válido y preferible a curar por curar.

### Dirección entrante: meter el post nuevo en listas ya curadas

Es la parte que evita que el grafo se congele, y la que más fácil se olvida.

- Revisar solo las entradas de `_data/related.yml` **temáticamente próximas**
  al post nuevo, no las 41. Localizarlas por concepto, con `Grep` sobre el
  fichero y sobre las etiquetas del post nuevo.
- Para cada candidata, valorar si el post nuevo es **más afín que alguno de
  los tres que ya están**. Si no lo es, no tocarla.
- Como las listas son de 3, meter uno obliga a **sacar otro**: la propuesta
  debe decir siempre cuál sale y por qué.
- No inflar: es correcto terminar sin ninguna propuesta entrante.

### Vigilar la concentración

Un post bisagra puede acabar apareciendo en muchas listas. Si al añadir el
post nuevo alguno pasa a estar en **más de 8 listas**, mencionarlo en el
resumen para que Aunitz decida. En la primera tanda de curación el máximo era
6 apariciones sobre 41 entradas.

### Reglas de edición de `_data/related.yml`

- Es el **único fichero fuera de `_posts/`** que esta skill puede tocar.
- Mantener la estructura del fichero: bloques con sus cabeceras de sección y
  el comentario que explica cada entrada. Si se añade una entrada nueva,
  añadir también su comentario de una o dos líneas justificando la elección.
- Colocar la entrada nueva en la sección temática que le corresponda, no al
  final del fichero.
- No reordenar ni reformatear entradas existentes que no formen parte de una
  propuesta aprobada.
- No tocar la cabecera de criterios salvo que Aunitz lo pida.

### Validación obligatoria tras editar el fichero

1. Todos los slugs (claves y valores) existen como post real en `_posts/` y
   no son stubs de redirección (`layout: redirected`).
2. Ninguna entrada se referencia a sí misma ni repite un slug.
3. Toda entrada tiene exactamente 3 slugs.
4. `bundle exec jekyll build` termina sin errores.
5. En el HTML generado, cada lista tocada renderiza **en el orden escrito**.
   Comprobarlo sobre `_site/<slug>/index.html` buscando
   `related-posts-title`.

Si algo falla, detenerse y explicarlo antes de seguir.
