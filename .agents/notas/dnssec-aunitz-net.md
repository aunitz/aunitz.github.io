# DNSSEC en aunitz.net

## Contexto

El 26/07/2026 activé DNSSEC en Cloudflare para aunitz.net. Cloudflare generó un registro DS que debía añadirse en Realtime Register (mi registrador de dominio), pero no pude añadirlo yo mismo y abrí un ticket de soporte con ellos para que lo hagan.

## Cómo comprobar si ya está activo

1. En Cloudflare: entra en el dashboard de aunitz.net → DNS → Settings → apartado "DNSSEC". Si sigue diciendo "DNSSEC is pending while we wait for the DS to be added to your registrar" significa que el registrador aún no lo ha añadido o no se ha propagado. Si en cambio aparece como activo/verde (normalmente con un mensaje del tipo "DNSSEC is active" o similar), ya está funcionando.

2. Verificación externa (sin depender del panel): usar una herramienta pública de comprobación DNSSEC como https://dnssec-analyzer.verisignlabs.com/aunitz.net o https://dnsviz.net/d/aunitz.net/dnssec/ , e introducir "aunitz.net". Estas herramientas comprueban si el registro DS publicado en el registrador coincide con la firma DNSSEC que sirve Cloudflare, y si toda la cadena de confianza es válida.

3. Si tras varios días sigue en estado "pending", conviene hacer seguimiento del ticket con Realtime Register, ya que el retraso vendría de su lado, no del de Cloudflare.
