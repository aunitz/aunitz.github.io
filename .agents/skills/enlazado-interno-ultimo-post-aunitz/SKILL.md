---
name: enlazado-interno-ultimo-post-aunitz
description: Mejora el enlazado interno del último post publicado en el blog Jekyll de aunitz.net, en ambas direcciones (enlaces del post nuevo hacia posts antiguos y de posts antiguos hacia el nuevo), proponiendo cada cambio para que Aunitz lo valide uno a uno antes de aplicarlo. Usa esta skill cuando el usuario pida mejorar, revisar o añadir enlaces internos del último post, enlazar el post recién publicado con el resto del blog, conectar un post nuevo con artículos relacionados, tejer el post nuevo en el blog, o cualquier variación sobre enlazado interno de un post concreto.
---

# Skill: Enlazado interno del último post de aunitz.net

Eres un asistente especializado en mejorar el enlazado interno de **un único post objetivo** (por defecto, el último publicado) del blog Jekyll `aunitz.net`, conectándolo con el resto de artículos del blog **sin modificar ningún post sin aprobación humana previa y explícita para cada cambio**.

Esta skill NO hace una revisión global de todo el blog. Trabaja alrededor de un post objetivo y en dos direcciones:

- **Salientes:** enlaces desde el post objetivo hacia posts antiguos que amplían un concepto que el post objetivo ya menciona.
- **Entrantes:** enlaces desde posts antiguos hacia el post objetivo, en frases donde el post objetivo es el "saber más" natural.

## Regla de oro (no negociable)

- Ningún fichero de `_posts/` se edita hasta que Aunitz apruebe expresamente esa propuesta concreta.
- No se asume aprobación por silencio, ni se aplican cambios "parecidos" a uno aprobado.
- No se fuerzan enlaces: solo se proponen si son útiles y naturales en el contexto de la frase.
- No se añade contenido nuevo (párrafos, explicaciones) para justificar un enlace. Solo se permiten **ajustes mínimos de redacción** sobre texto ya existente.

## Fuente de criterios editoriales

Los criterios de calidad (qué enlace es válido, cómo elegir el texto ancla, cómo elegir el post destino, qué ajustes de redacción se permiten, reglas de edición) están definidos en:

```text
.agents/plans/enlazado-interno-posts.md
```

Lee ese documento al empezar y aplícalo como norma editorial. Esta skill define **el flujo operativo y el mecanismo de validación**; el plan define **los criterios**. Si hay conflicto, esta skill manda en lo operativo y el plan en lo editorial.

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
3. **Detecta candidatos** en las dos direcciones (ver sección siguiente) sin editar nada.
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

## Mecanismo de validación (hoja visual HTML + aprobación en el chat)

La validación es lo más importante de esta skill. Aunitz decidió validar mediante una **hoja visual HTML** (artifact) que reúne todas las propuestas con sus diffs a color, y luego **aprobar en el chat**.

1. Ordena las propuestas: primero las **salientes** del post objetivo (pocas y de alto valor), luego las **entrantes** agrupadas por post de origen. Numéralas (Propuesta 1, 2, 3…).
2. Genera una **hoja HTML** y publícala como artifact. Debe contener, por propuesta:
   - Número, dirección (saliente/entrante) y nivel de confianza.
   - Rutas de origen y destino.
   - Motivo editorial en una línea.
   - **Diff a color**: el texto actual y el propuesto, resaltando en verde el fragmento que pasa a ser enlace.
   - El **código HTML exacto** que se insertaría, con la parte añadida marcada.
   - Tipo (solo enlace / con ajuste mínimo) y el texto ancla.
   - Una sección de **descartadas/excluidas** por transparencia (p. ej. posts de The Conversation, o enlaces desechados por redundantes).
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

- Edita únicamente el fragmento aprobado. Preserva el resto del HTML y del Liquid.
- Usa `{% post_url YYYY-MM-DD-slug %}` para el enlace interno.
- No añadas `target="_blank"` ni `rel="noopener noreferrer"` a enlaces internos.
- No cambies el frontmatter.
- No reformatees el post completo ni toques otros enlaces existentes.
- No toques layouts, includes, CSS ni JS.

## Validación después de aplicar cada tanda

- Revisa el diff de cada post modificado (o las líneas modificadas si el fichero no está trackeado).
- Confirma que solo se aplicaron las propuestas aprobadas.
- Confirma que cada `{% post_url YYYY-MM-DD-slug %}` corresponde a un fichero existente en `_posts/`.
- Confirma que el HTML del fragmento queda bien formado y no se rompieron comillas, etiquetas ni entidades.
- Si algo no coincide exactamente con lo aprobado, detente y explícalo antes de seguir.
- Si es razonable, ejecuta `bundle exec jekyll build` al terminar.

## Resumen final

Entrega:

- Post objetivo.
- Nº de candidatos detectados (salientes / entrantes).
- Nº de propuestas presentadas, aprobadas, ajustadas y rechazadas.
- Lista de posts modificados.
- Posts omitidos por exclusión o duda editorial.
- Validaciones realizadas e incidencias, si las hay.
