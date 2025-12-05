# Backlog y user stories

Este documento traduce la idea de una aplicación similar a **Mosaic Back of House** en un backlog accionable, priorizado para un MVP y evoluciones tempranas.

## Principios
- Poner en producción rápido un flujo básico de horarios y fichaje.
- Seguridad básica desde el inicio (roles, trazabilidad de fichajes).
- Iterar con feedback de supervisores y personal de piso.

## Épicas
1. **Gestión de horarios**: crear, asignar, publicar y actualizar turnos; swaps y disponibilidad.
2. **Rastreo de tiempo**: fichaje entrada/salida con validaciones simples y auditoría.
3. **Comunicación interna**: mensajes 1:1, de equipo y tablón de anuncios.
4. **Administración y permisos**: roles (admin, supervisor, empleado), locales, configuración.
5. **Analítica ligera**: asistencia, ausencias, horas extra, puntualidad.
6. **Documentos y SOPs**: repositorio de políticas y checklists por turno (fase posterior).

## Backlog priorizado (MVP → primeras iteraciones)

| Id | Story (rol/objetivo/beneficio) | Criticidad | Criterios de aceptación |
| --- | --- | --- | --- |
| H1 | Como **admin** quiero crear/editar turnos y asignarlos a empleados para publicar el calendario semanal. | Alta | CRUD de turno con fecha/hora, ubicación, rol; asignación a usuario; publicar/borrador. |
| H2 | Como **empleado** quiero ver mis turnos en un calendario claro para organizar mi semana. | Alta | Vista calendario/lista filtrada por usuario; timezone consistente; indica estado (publicado, cambiado). |
| H3 | Como **empleado** quiero fichar entrada/salida desde web/móvil para registrar mi jornada. | Alta | Botón check-in/out con timestamp; muestra estado actual; bloquea doble check-in. |
| H4 | Como **supervisor** quiero validar fichajes sospechosos (fuera de horario, ubicación) para controlar asistencia. | Alta | Marca fichajes fuera de rango; lista de pendientes; capacidad de aprobar/rechazar con comentario. |
| H5 | Como **empleado** quiero solicitar cambio de turno con otro compañero para cubrir imprevistos. | Media | Flujo de solicitud con motivo; notifica al supervisor; estado (pendiente, aprobado, rechazado). |
| H6 | Como **equipo** quiero un tablón de anuncios para comunicados y actualizaciones. | Media | Lista cronológica; autor y fecha; marcado como leído; pin de anuncios. |
| H7 | Como **empleado** quiero mensajería 1:1 y de grupo ligero para coordinarme. | Media | Enviar/recibir mensajes en tiempo real; canales por equipo/rol; mute/archivar. |
| H8 | Como **admin** quiero gestionar roles y permisos para controlar el acceso. | Alta | Roles predefinidos; edición de permisos básicos; asignación por usuario; auditoría de cambios. |
| H9 | Como **supervisor** quiero reportes básicos de asistencia para seguir KPIs. | Media | Tabla exportable con horas trabajadas, retrasos, ausencias; filtros por fecha y ubicación. |
| H10 | Como **empleado** quiero actualizar mi disponibilidad para mejorar la planificación. | Baja (post-MVP) | Captura disponibilidad semanal; supervisores la ven al crear turnos. |
| H11 | Como **supervisor** quiero adjuntar SOPs/checklists al inicio de cada turno. | Baja (post-MVP) | Checklist marcada; archivos o links asociados a turno/rol. |

## Roadmap sugerido
1. **Sprint 1 (MVP horarios + fichaje)**: H1, H2, H3, H8.
2. **Sprint 2 (control y swaps)**: H4, H5, ajustes de UX.
3. **Sprint 3 (comunicación)**: H6, H7.
4. **Sprint 4 (analítica básica)**: H9.
5. **Sprint 5 (mejoras de planificación y SOPs)**: H10, H11.

## Notas de implementación
- **Front-end**: PWA responsive; calendario semanal (vista agenda) y tarjetas de turno; componentes reutilizables para tarjetas de usuario/turno.
- **Back-end**: API REST/GraphQL; WebSockets o SSE para mensajería y estado de fichaje; logs de auditoría para fichajes y cambios de permisos.
- **Seguridad**: tokens de sesión con refresh; MFA opcional para admins; retención de logs de fichaje.
- **Métricas base**: puntualidad (% check-ins dentro de rango), tasa de ausencias, horas extra por ubicación.
