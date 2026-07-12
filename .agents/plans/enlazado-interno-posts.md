# Plan de trabajo: mejora de enlaces internos entre posts

Este documento sirve como orden de trabajo reutilizable para un agente de Codex que revise los posts del sitio `aunitz.net` y proponga mejoras de enlazado interno entre artículos.

La regla principal del plan es que el agente no debe modificar ningún post sin aprobación humana previa y explícita para cada cambio.

## Objetivo

Recorrer uno por uno los posts de `_posts/` y analizar el texto de cada artículo para detectar fragmentos en los que tendría sentido enlazar de forma natural con otro post del blog.

El agente debe:

- Proponer enlaces internos útiles y contextuales entre posts relacionados.
- Priorizar enlaces que ayuden al lector a ampliar una idea, concepto, herramienta, ley de UX, sesgo cognitivo, práctica de usabilidad, accesibilidad, diseño de formularios, IA, gestión de proyectos digitales u otro tema ya tratado en el blog.
- Evitar enlaces forzados, genéricos, redundantes o pensados solo para SEO.
- Permitir pequeños ajustes de redacción cuando hagan que el enlace resulte más natural.
- No añadir contenido nuevo a los posts existentes con el único objetivo de insertar enlaces.
- No ejecutar ningún cambio en `_posts/` hasta que Aunitz apruebe expresamente la propuesta concreta.

## Contexto del sitio

El sitio es un blog Jekyll. Los posts se encuentran en:

```text
_posts/*.markdown
```

Los artículos están escritos mayoritariamente en HTML directo dentro de ficheros Markdown con frontmatter YAML.

Los enlaces internos entre posts deben usar la sintaxis Jekyll:

```liquid
{% post_url YYYY-MM-DD-slug %}
```

Ejemplo:

```html
<a href="{% post_url 2024-01-15-ejemplo-de-post %}">texto enlazado</a>
```

## Principio editorial

El enlazado interno debe mejorar la experiencia del lector. Un enlace es válido si:

- Aporta una ampliación relevante del tema tratado en el párrafo.
- Conecta conceptos realmente relacionados.
- Ayuda a seguir una línea de lectura lógica dentro del blog.
- No interrumpe el flujo natural del texto.
- Puede integrarse con un ancla descriptiva y comprensible.

Un enlace no debe proponerse si:

- La relación entre posts es débil o tangencial.
- El texto ancla queda artificial.
- Repite un enlace ya presente muy cerca.
- Enlaza una palabra demasiado genérica, como "aquí", "este artículo", "más información" o términos aislados sin valor contextual.
- Obliga a añadir frases nuevas que no estaban justificadas por el contenido original.

## Criterio sobre cambios de texto

El agente puede proponer ajustes mínimos del texto original cuando el cambio haga más natural el enlace interno.

Cambios permitidos:

- Convertir una mención existente en un texto ancla más descriptivo.
- Reordenar levemente una frase para que el enlace no quede forzado.
- Sustituir una expresión genérica por otra más clara si mantiene el significado original.
- Ajustar una concordancia o puntuación afectada por la inserción del enlace.

Cambios no permitidos:

- Añadir nuevos párrafos.
- Añadir explicaciones completas que no estaban en el post.
- Reescribir secciones enteras.
- Cambiar el enfoque editorial del artículo.
- Introducir enlaces solo porque exista un post relacionado, si el contexto del párrafo no lo pide.

## Exclusiones y cautelas

Antes de empezar, el agente debe identificar posts con condiciones especiales.

No modificar sin una instrucción específica:

- Posts republicados de The Conversation, especialmente si el frontmatter contiene `source_org: "The Conversation"` o `republished: true`.
- Posts con `canonical` externo.
- Posts marcados con `hide_from_home: true`, salvo que Aunitz confirme que también deben entrar en la revisión.

Estos posts pueden usarse como destino de enlaces solo si el contenido y la licencia lo permiten y si no generan una experiencia extraña para el lector. En caso de duda, dejarlos fuera y reportarlo.

## Inventario inicial

Antes de proponer cambios, el agente debe construir un inventario de todos los posts disponibles.

Para cada post registrar:

- Ruta del fichero.
- Fecha.
- Título.
- Subtítulo, si existe.
- Descripción SEO.
- Tags.
- Slug usado en `{% post_url %}`.
- Tema principal inferido.
- Conceptos secundarios relevantes.
- Enlaces internos ya existentes.
- Condiciones especiales: `republished`, `canonical`, `hide_from_home`, `source_org`.

El inventario puede mantenerse como notas de trabajo durante la ejecución. Si el volumen resulta alto, el agente puede generar un archivo temporal de apoyo fuera de `_posts/`, pero no debe considerarlo entregable final salvo que Aunitz lo pida.

## Orden de trabajo

1. Crear el inventario inicial de posts.
2. Revisar los enlaces internos ya existentes para evitar duplicados y patrones repetitivos.
3. Procesar los posts en orden cronológico, del más antiguo al más reciente, salvo que Aunitz indique otra prioridad.
4. Analizar un post completo antes de pasar al siguiente.
5. Para cada post, buscar candidatos de enlace dentro de frases ya existentes.
6. Preparar propuestas de cambio sin editar el fichero.
7. Presentar las propuestas a Aunitz para validación.
8. Aplicar únicamente las propuestas aprobadas.
9. Revisar el diff exacto después de aplicar cada lote aprobado.
10. Informar de propuestas descartadas, pendientes o dudosas.

## Formato de validación humana

La mejor forma de validar los cambios es trabajar por lotes pequeños y legibles, no con un diff masivo.

El agente debe presentar propuestas agrupadas por post. Cada lote debe contener, como máximo:

- 1 post si tiene varias propuestas.
- O hasta 3 posts si cada uno tiene una única propuesta sencilla.
- No más de 5 cambios concretos por lote.

Cada propuesta debe mostrarse con este formato:

```markdown
## Lote N: propuestas para validar

### Propuesta N.1

Estado: pendiente de aprobación

Post origen:
`_posts/YYYY-MM-DD-slug-origen.markdown`

Post destino:
`_posts/YYYY-MM-DD-slug-destino.markdown`

Motivo:
Breve explicación de por qué el enlace ayuda al lector en ese punto concreto.

Texto actual:
> Fragmento exacto del post tal como está ahora.

Texto propuesto:
> Fragmento exacto con el enlace interno ya integrado.

Tipo de cambio:
- Solo enlace
- Enlace con ajuste mínimo de redacción

Comentario editorial:
Nota breve sobre el nivel de confianza o cualquier duda.
```

Aunitz debe poder responder con decisiones simples, por ejemplo:

```text
Apruebo N.1 y N.3. Rechazo N.2. En N.4 cambia el texto ancla por "diseño de formularios accesibles".
```

El agente debe interpretar la respuesta así:

- Solo las propuestas aprobadas se pueden aplicar.
- Las rechazadas se descartan.
- Las modificadas por Aunitz se actualizan y, si el cambio sigue siendo claro, se aplican según la instrucción recibida.
- Si una respuesta es ambigua, el agente debe pedir confirmación antes de editar.

## Estados de propuesta

Usar estos estados en las notas de trabajo y en los resúmenes:

- `pendiente`: propuesta presentada y aún no validada.
- `aprobada`: Aunitz ha autorizado aplicarla.
- `aprobada con ajustes`: Aunitz ha autorizado aplicarla con cambios concretos.
- `rechazada`: Aunitz no quiere aplicarla.
- `dudosa`: el agente no tiene suficiente confianza y pide criterio editorial.
- `aplicada`: el cambio aprobado ya está en el fichero.
- `pendiente de revisión diff`: el cambio se aplicó y falta revisar el diff.

## Reglas estrictas de aprobación

- No editar `_posts/` durante la fase de análisis.
- No editar `_posts/` para una propuesta con estado `pendiente`, `dudosa` o `rechazada`.
- No aplicar cambios "similares" a los aprobados si no han sido presentados y aprobados.
- No convertir una aprobación parcial en aprobación de todo el lote.
- No asumir aprobación por silencio.
- No hacer cambios globales automáticos.
- No usar scripts de reemplazo masivo sobre posts.
- Si una propuesta requiere más redacción de la prevista, volver a pedir aprobación.

## Criterios para elegir el texto ancla

El texto ancla debe:

- Ser descriptivo por sí mismo.
- Encajar de forma natural dentro de la frase.
- Anticipar correctamente el contenido del post destino.
- Tener una longitud razonable, normalmente entre 2 y 8 palabras.
- Evitar fórmulas genéricas como "leer más", "este post", "aquí" o "en este enlace".
- No sobreoptimizar palabras clave.

Ejemplos de buenos textos ancla:

```html
<a href="{% post_url 2024-03-10-sesgo-confirmacion-ux %}">sesgo de confirmación en UX</a>
```

```html
<a href="{% post_url 2025-02-18-formularios-usables %}">formularios más usables</a>
```

Ejemplos a evitar:

```html
<a href="{% post_url 2025-02-18-formularios-usables %}">aquí</a>
```

```html
<a href="{% post_url 2025-02-18-formularios-usables %}">post</a>
```

## Criterios para elegir el post destino

Un post destino es buen candidato si:

- Profundiza en un concepto mencionado en el post origen.
- Resuelve una duda que el lector podría tener justo en ese punto.
- Es más específico que el post origen sobre ese tema.
- Tiene relación temática fuerte, no solo una coincidencia de palabra.
- No recibe ya un enlace equivalente desde el mismo párrafo o sección.

Cuando haya varios destinos posibles:

- Elegir el más útil para el lector, no necesariamente el más reciente.
- Preferir posts evergreen frente a noticias o piezas muy coyunturales, salvo que el contexto lo pida.
- Evitar enlazar siempre a los mismos posts si existen alternativas igual de útiles.
- Reportar la duda si dos destinos parecen igualmente válidos.

## Reglas de edición

Cuando una propuesta esté aprobada:

- Editar solo el fragmento aprobado.
- Preservar el resto del HTML y Liquid.
- Usar `{% post_url YYYY-MM-DD-slug %}` en enlaces a posts.
- Mantener `target="_blank"` fuera de los enlaces internos salvo que ya exista una decisión editorial explícita en sentido contrario.
- No añadir `rel="noopener noreferrer"` a enlaces internos.
- No cambiar frontmatter salvo que sea imprescindible y haya sido aprobado.
- No reformatear el post completo.
- No ordenar ni limpiar enlaces existentes que no formen parte de la propuesta aprobada.

## Validación después de aplicar cada lote

Después de aplicar un lote aprobado, el agente debe:

1. Revisar el diff de cada post modificado.
2. Confirmar que solo se aplicaron las propuestas aprobadas.
3. Confirmar que cada `{% post_url %}` corresponde a un fichero existente.
4. Confirmar que el HTML queda bien formado en el fragmento tocado.
5. Confirmar que no se rompieron comillas, etiquetas o entidades.
6. Reportar a Aunitz los cambios aplicados y cualquier incidencia.

Si algo no coincide exactamente con lo aprobado, el agente debe detenerse y explicar el problema antes de seguir.

## Validación final

Al terminar la revisión completa:

1. Revisar que no quedan propuestas aprobadas sin aplicar.
2. Revisar que no hay cambios en posts excluidos.
3. Buscar enlaces internos nuevos con `{% post_url %}` y comprobar que todos resuelven a posts existentes.
4. Revisar el diff completo para detectar cambios accidentales.
5. Si es posible, ejecutar una revisión local del sitio con Jekyll.
6. Entregar un resumen final.

## Resumen final esperado

El agente debe entregar un resumen con:

- Número de posts inventariados.
- Número de posts revisados.
- Número de propuestas presentadas.
- Número de propuestas aprobadas.
- Número de propuestas rechazadas.
- Número de propuestas aplicadas.
- Lista de posts modificados.
- Lista de posts omitidos por exclusión o duda editorial.
- Validaciones realizadas.
- Incidencias o enlaces pendientes de decisión.

## Prompt de ejecución para Codex

Usa este documento como orden de trabajo. Recorre los posts de `_posts/` uno por uno y mejora el enlazado interno del blog, pero no modifiques ningún post sin aprobación previa de Aunitz.

Primero crea un inventario de posts y enlaces internos existentes. Después analiza cada post en orden cronológico y prepara propuestas de enlace natural hacia otros posts del blog.

Presenta las propuestas por lotes pequeños usando el formato de validación humana definido en este plan. Muestra siempre el texto actual, el texto propuesto, el post origen, el post destino y el motivo editorial del enlace.

Aplica únicamente las propuestas aprobadas explícitamente. No asumas aprobación por silencio y no hagas cambios globales automáticos. Después de cada lote aprobado, revisa el diff y confirma que solo se han aplicado los cambios autorizados.
