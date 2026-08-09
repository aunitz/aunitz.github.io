---
name: enlazado-interno-ultimo-post-aunitz
description: Teje un post del blog Jekyll de aunitz.net con el resto del blog en tres direcciones (enlaces del post hacia posts antiguos, enlaces de posts antiguos hacia él, y el bloque «También te puede interesar» de _data/related.yml en ambos sentidos), proponiendo cada cambio para que Aunitz lo valide uno a uno antes de aplicarlo. Usa esta skill cuando el usuario pida mejorar, revisar o añadir enlaces internos del último post, enlazar el post recién publicado con el resto del blog, conectar un post nuevo con artículos relacionados, actualizar los posts relacionados o el related.yml de un post, tejer el post nuevo en el blog, o cualquier variación sobre enlazado interno de un post concreto.
---

# Skill: Enlazado interno del último post de aunitz.net

Eres un asistente especializado en tejer **un único post objetivo** (por defecto, el último publicado) del blog Jekyll `aunitz.net` con el resto de artículos del blog, **sin modificar ningún fichero sin aprobación humana previa y explícita para cada cambio**.

Esta skill NO hace una revisión global de todo el blog. Trabaja alrededor de un post objetivo y en **tres direcciones**:

- **A. Salientes:** enlaces desde el post objetivo hacia posts antiguos que amplían un concepto que el post objetivo ya menciona.
- **B. Entrantes:** enlaces desde posts antiguos hacia el post objetivo, en frases donde el post objetivo es el "saber más" natural.
- **C. Relacionados:** el bloque «También te puede interesar», que se alimenta de `_data/related.yml`. También en los dos sentidos: la lista curada del post objetivo, y la entrada del post objetivo en las listas ya curadas de otros posts.

La dirección C es la que evita que el grafo de relacionados se congele. Las listas curadas son estáticas: si nadie las toca al publicar, un post nuevo no aparecerá jamás en el bloque de ningún post curado.

## Regla de oro (no negociable)

- Ningún fichero de `_posts/` ni `_data/related.yml` se edita hasta que Aunitz apruebe expresamente esa propuesta concreta.
- No se asume aprobación por silencio, ni se aplican cambios "parecidos" a uno aprobado.
- No se fuerzan enlaces ni relacionados: solo se proponen si son útiles y naturales.
- No se añade contenido nuevo (párrafos, explicaciones) para justificar un enlace. Solo se permiten **ajustes mínimos de redacción** sobre texto ya existente.

## Fuente de criterios editoriales

Los criterios de calidad (qué enlace es válido, cómo elegir el texto ancla, cómo elegir el post destino, qué ajustes de redacción se permiten, cuándo dar lista curada de relacionados y cómo mantenerla) están definidos en:

```text
.claude/skills/enlazado-interno-ultimo-post-aunitz/CRITERIOS.md
```

Lee ese documento al empezar y aplícalo como norma editorial. Esta skill define **el flujo operativo y el mecanismo de validación**; CRITERIOS.md define **los criterios**. Si hay conflicto, esta skill manda en lo operativo y CRITERIOS.md en lo editorial.

Para los criterios de relacionados, la cabecera de `_data/related.yml` es la fuente de verdad si alguna vez diverge de CRITERIOS.md.

## Alcance por defecto

Si el usuario no indica un post, el objetivo es el **último post de `_posts/`** según la fecha del nombre de fichero (`YYYY-MM-DD-slug.markdown`). Si hay varios con la fecha más reciente, elige el último alfabéticamente y confírmalo.

Empieza siempre confirmando en una línea cuál es el post objetivo detectado antes de analizar nada.

Si el usuario nombra otro post ("enlaza el post de X", una fecha, un slug), usa ese como objetivo.

## Exclusiones y cautelas

- Si el **post objetivo** tiene `source_org: "The Conversation"`, `republished: true` o un `canonical` externo, detente y avísalo: no conviene reescribir su texto sin instrucción específica.
- Como **origen de enlaces entrantes**, omite por defecto los posts con `source_org: "The Conversation"`, `republished: true` o `canonical` externo. No edites su texto salvo que Aunitz lo confirme.
- Los posts con `hide_from_home: true` quedan fuera salvo que Aunitz confirme que entran.
- Un post excluido como origen puede seguir siendo destino de un enlace si el contenido lo permite.

## Flujo de trabajo

1. **Identifica el post objetivo** y confírmalo en una línea.
2. **Lee el post objetivo completo** y extrae su tema principal, conceptos clave, entidades (leyes de UX, sesgos cognitivos, herramientas, prácticas), tags y los enlaces internos que ya tiene.
3. **Detecta candidatos** en las tres direcciones (ver sección siguiente) sin editar nada.
4. **Prepara las propuestas** con el formato de ficha definido más abajo. No edites ficheros todavía.
5. **Presenta y valida una por una** con el mecanismo de validación definido más abajo.
6. **Aplica solo lo aprobado** y verifica cada cambio.
7. **Entrega el resumen final.**

Procesa el análisis completo antes de empezar a validar. No hagas cambios globales automáticos ni uses reemplazos masivos.

## Detección de candidatos

No leas los 165 posts a ciegas. Trabaja dirigido por conceptos:

**Salientes (desde el post objetivo):**

- Recorre el texto del post objetivo buscando menciones a conceptos, leyes, sesgos, herramientas o prácticas que tengan **su propio post** en el blog.
- Para cada mención, comprueba si existe un post más específico que la desarrolle (usa el inventario / `Grep` sobre `_posts/` por el término).
- Descarta menciones donde el post objetivo ya enlaza a ese destino.

**Entrantes (hacia el post objetivo):**

- Para cada concepto o entidad clave del post objetivo, haz `Grep` en `_posts/*.markdown` para localizar posts antiguos que mencionen ese término **en su prosa**.
- Lee solo esos posts candidatos (no todos) y evalúa si hay un punto natural donde el post objetivo sea la ampliación lógica.
- Descarta posts que ya enlacen al objetivo, posts excluidos como origen, y frases donde el enlace quedaría forzado o tangencial.

**Relacionados (dirección C, `_data/related.yml`):**

Son dos comprobaciones distintas, y ninguna se puede saltar.

*C1 — ¿el post objetivo necesita lista curada propia?*

- Mira sus etiquetas y cuenta cuántos posts tiene cada una (`Grep` sobre `^tags:` en `_posts/`).
- Propón entrada curada **solo** si se cumple alguna de las dos condiciones de CRITERIOS.md: todas sus etiquetas son paraguas (más de 20 posts), o existe un gemelo temático que el algoritmo no puede alcanzar.
- Si no se cumple ninguna, **dilo explícitamente y deja el post en automático**. No es un fallo: en clusters pequeños curar es trabajo perdido.
- Antes de proponer, comprueba qué está dando el algoritmo ahora mismo para ese post (compila y mira `_site/<slug>/index.html`, o razónalo con la tabla de puntuación del README). Sin ese "antes" no se puede juzgar si la curación aporta.

*C2 — ¿hay que meter el post objetivo en listas ya curadas?*

- **Esta es la parte que se olvida y la que evita que el grafo se congele.**
- No revises las 41 entradas. Localiza las temáticamente próximas: `Grep` en `_data/related.yml` por los slugs de los posts que comparten tema o etiqueta con el objetivo, y por los conceptos clave del objetivo.
- Para cada candidata, la pregunta es: *¿el post objetivo es más afín que alguno de los tres que ya están?* Si no lo es, no la toques.
- Como las listas son de 3, meter uno obliga a sacar otro. La propuesta debe decir **cuál entra, cuál sale y por qué**.
- Es correcto terminar sin ninguna propuesta en C2.

Prioriza siempre calidad sobre cantidad. Es correcto terminar con pocas propuestas, o con ninguna en una dirección, si no hay enlaces realmente útiles.

## Formato de cada propuesta

Cada propuesta se recoge en la hoja visual de validación (ver más abajo) con estos datos. Este es el contenido mínimo de cada ficha, tanto en la hoja HTML como en cualquier resumen de apoyo en el chat:

```markdown
### Propuesta N — [saliente | entrante] · confianza [alta | media | baja]

Origen:  `_posts/YYYY-MM-DD-slug-origen.markdown`
Destino: `_posts/YYYY-MM-DD-slug-destino.markdown`

Motivo: una línea sobre por qué el enlace ayuda al lector en ese punto concreto.

Texto actual:
> Fragmento exacto tal como está ahora en el post.

Texto propuesto:
> Fragmento exacto con el enlace ya integrado, resaltando el texto ancla.

Tipo: [solo enlace | enlace con ajuste mínimo de redacción]
```

El enlace propuesto debe usar siempre sintaxis Jekyll:

```html
<a href="{% post_url YYYY-MM-DD-slug %}">texto ancla descriptivo</a>
```

El texto ancla debe ser descriptivo (normalmente 2-8 palabras), encajar en la frase y evitar fórmulas genéricas como "aquí", "este post", "leer más" o "más información".

### Formato de las propuestas de relacionados (dirección C)

Las fichas de `_data/related.yml` no llevan texto ancla ni fragmento de prosa. Usa este formato:

```markdown
### Propuesta N — relacionados [lista propia | entrar en lista ajena] · confianza [alta | media | baja]

Entrada: `nombre-del-slug` en `_data/related.yml`

Motivo: una línea sobre por qué esta selección ayuda al lector.

Ahora (algoritmo | lista curada actual):
1. Título del post
2. Título del post
3. Título del post

Propuesto:
1. Título del post   ← entra
2. Título del post
3. Título del post   ← sale: Título del que se cae

YAML resultante:
```yaml
nombre-del-slug:
  - slug-1
  - slug-2
  - slug-3
```
```

En la hoja HTML, estas fichas van **en su propia sección**, después de las de enlaces en prosa, para que se vea claro que son otro tipo de cambio. Marca en color lo que entra y lo que sale, igual que en los diffs de texto.

Si la conclusión es que el post objetivo **no necesita lista curada**, no inventes una ficha: dilo en la sección de descartadas, con el motivo (por ejemplo: «su etiqueta `git` tiene 5 posts, el algoritmo ya acierta»).

## Mecanismo de validación (hoja visual HTML + aprobación en el chat)

La validación es lo más importante de esta skill. Aunitz decidió validar mediante una **hoja visual HTML** (artifact) que reúne todas las propuestas con sus diffs a color, y luego **aprobar en el chat**.

1. Ordena las propuestas: primero las **salientes** del post objetivo (pocas y de alto valor), luego las **entrantes** agrupadas por post de origen, y por último las de **relacionados** en su propia sección. Numéralas de corrido (Propuesta 1, 2, 3…).
2. Genera una **hoja HTML** y publícala como artifact. Debe contener, por propuesta:
   - Número, dirección (saliente / entrante / relacionados) y nivel de confianza.
   - Rutas de origen y destino, o la entrada de `_data/related.yml` afectada.
   - Motivo editorial en una línea.
   - **Diff a color**: para enlaces, el texto actual y el propuesto resaltando el fragmento que pasa a ser enlace; para relacionados, la lista de antes y la de después marcando lo que entra y lo que sale.
   - El **código exacto** que se insertaría —HTML del fragmento, o el bloque YAML resultante— con la parte añadida marcada.
   - Tipo (solo enlace / con ajuste mínimo) y el texto ancla, en las de enlaces.
   - Una sección de **descartadas/excluidas** por transparencia: posts de The Conversation, enlaces desechados por redundantes y, muy importante, **si el post objetivo se deja en automático sin lista curada, con el motivo**.
   - Una nota de "cómo aprobar" con ejemplos de respuesta.
3. Tras publicar la hoja, resume en el chat qué contiene e invita a Aunitz a decidir por su número.
4. Aunitz responde en el chat en lenguaje natural, por ejemplo: "Aplica la 1 y la 2", "Solo la 1", "La 2 con ancla ‹…›". Interpreta así:
   - Solo las propuestas **explícitamente aprobadas** se aplican.
   - Las **no mencionadas o rechazadas** se descartan.
   - Si pide un **ajuste de ancla**, aplícalo; si la instrucción es ambigua, repregunta antes de editar. Si el ajuste crece hasta convertirse en redacción nueva, vuelve a proponer.
5. Si Aunitz aprueba un subconjunto, aplica solo ese subconjunto. Nunca conviertas una aprobación parcial en aprobación de todo. Nunca asumas aprobación por silencio.

Si tras aplicar hay una nueva ronda de propuestas, **actualiza la misma hoja** (republicando el mismo fichero para conservar la URL) en lugar de crear una nueva.

Alternativas admitidas si Aunitz lo pide expresamente en algún momento: responder por lotes en el chat sin hoja, o ir una a una. En todos los casos, cada propuesta sigue siendo una decisión independiente y explícita.

## Reglas de edición

Cuando (y solo cuando) una propuesta esté aprobada:

**En `_posts/` (direcciones A y B):**

- Edita únicamente el fragmento aprobado. Preserva el resto del HTML y del Liquid.
- Usa `{% post_url YYYY-MM-DD-slug %}` para el enlace interno.
- No añadas `target="_blank"` ni `rel="noopener noreferrer"` a enlaces internos.
- No cambies el frontmatter.
- No reformatees el post completo ni toques otros enlaces existentes.

**En `_data/related.yml` (dirección C):**

- Es el **único fichero fuera de `_posts/`** que esta skill puede tocar.
- Mantén la estructura: bloques con sus cabeceras de sección y el comentario que justifica cada entrada. Si añades una entrada, añade también su comentario de una o dos líneas.
- Coloca la entrada nueva en la sección temática que le corresponda, no al final del fichero.
- Exactamente 3 slugs por entrada, sin autorreferencias ni repetidos.
- No reordenes ni reformatees entradas que no formen parte de una propuesta aprobada.
- No toques la cabecera de criterios salvo que Aunitz lo pida.

**Nunca:** layouts, includes, CSS, JS, `_config.yml` ni ningún otro fichero.

## Validación después de aplicar cada tanda

- Revisa el diff de cada fichero modificado (o las líneas modificadas si el fichero no está trackeado).
- Confirma que solo se aplicaron las propuestas aprobadas.
- Confirma que cada `{% post_url YYYY-MM-DD-slug %}` corresponde a un fichero existente en `_posts/`.
- Confirma que el HTML del fragmento queda bien formado y no se rompieron comillas, etiquetas ni entidades.
- Si algo no coincide exactamente con lo aprobado, detente y explícalo antes de seguir.

**Si se tocó `_data/related.yml`, además (obligatorio, no opcional):**

- Todos los slugs, claves y valores, existen como post real en `_posts/` y no son stubs de redirección (`layout: redirected`).
- Ninguna entrada se referencia a sí misma ni repite un slug.
- Toda entrada tiene exactamente 3 slugs.
- `bundle exec jekyll build` termina sin errores.
- Cada lista tocada renderiza **en el orden escrito**: compruébalo en `_site/<slug>/index.html` buscando `related-posts-title`. Un fallo silencioso aquí no se ve de otra forma.
- Si algún post pasa a aparecer en más de 8 listas, dilo en el resumen.

## Resumen final

Entrega:

- Post objetivo.
- Nº de candidatos detectados por dirección (salientes / entrantes / relacionados).
- Nº de propuestas presentadas, aprobadas, ajustadas y rechazadas.
- Lista de ficheros modificados, distinguiendo posts de `_data/related.yml`.
- **Si el post objetivo se quedó sin lista curada, decirlo y por qué.** Es un resultado válido, pero tiene que quedar registrado para que no parezca un olvido.
- **Si no entró en ninguna lista ajena, decirlo también.** Es el punto donde el grafo se congela sin que se note.
- Posts omitidos por exclusión o duda editorial.
- Validaciones realizadas e incidencias, si las hay.
