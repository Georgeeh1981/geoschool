# Maquetas de UI (texto)

Bocetos rápidos para las pantallas clave: horarios, fichaje y mensajería. Pensados para un layout responsive (sidebar colapsable en móvil) y componentes reutilizables.

## 1) Horarios (vista calendario + lista)
```
┌─────────────────────────────────────────────────────┐
│ Header: Logo | Ubicación ▾ | Semana 12-18 Jun | (+) │
├─────────────────────────────────────────────────────┤
│ Sidebar (tabs): [Horarios] [Fichaje] [Mensajes]     │
├─────────────────────────────────────────────────────┤
│ Filtros: Equipo ▾ | Rol ▾ | Estado ▾ | Buscar 🔍    │
│                                                     │
│ Semana (col-7):                                     │
│ ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐ │
│ │ L    │ M    │ X    │ J    │ V    │ S    │ D    │ │
│ ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤ │
│ │ Tarjetas de turnos con:                           │
│ │ - Hora: 08:00-16:00                               │
│ │ - Rol: Cocina                                     │
│ │ - Asignado a: Ana Pérez                           │
│ │ - Estado: Publicado / Cambiado / Pendiente        │
│ │ - Botones: Editar | Cambiar asignación | ...      │
│ └──────┴──────┴──────┴──────┴──────┴──────┴──────┘ │
│                                                     │
│ Panel lateral (detalles del turno seleccionado):    │
│  • Resumen, notas, ubicación, historial de cambios   │
│  • Checklists o SOPs (cuando existan)               │
└─────────────────────────────────────────────────────┘
```

## 2) Fichaje (check-in/out)
```
┌─────────────────────────────┐
│ Header compacto: Ubicación ▾│
├─────────────────────────────┤
│ Tarjeta estado actual:       │
│  • Próximo turno: 08:00-16:00│
│  • Estado: Fuera de turno    │
│  • Botón principal: [Check-in]
│  • Botón secundario: Ver historial
│                               │
│ Validaciones/alertas:         │
│  • Si fuera de horario: tooltip + requiere motivo    │
│  • Si ubicación/IP incorrecta: aviso y log           │
│                               │
│ Historial reciente:           │
│  • 07:58 Check-in (On time)   │
│  • 16:04 Check-out (+4m)      │
└─────────────────────────────┘
```

## 3) Mensajería (1:1, grupos, tablón)
```
┌───────────────────────────────────────────┐
│ Header: Mensajes | Buscar 🔍 | Nuevo +    │
├───────────────────────────────────────────┤
│ Columnas:                                 │
│ [Listas]          | [Hilo activo]         │
│ - Bandeja:        | Título del hilo       │
│   • 1:1           | -------------------   │
│   • Equipos       | Mensajes burbuja      │
│   • Tablón        | (autor, hora, estado) │
│ - Notificaciones  | Campo para escribir + │
│   • @mentions     | adjuntar 📎           │
│                   |                       │
│ Tarjeta de anuncio (tablón):              │
│  • Título, autor, fecha                   │
│  • Pin/Archivado, Confirmar lectura ✓     │
└───────────────────────────────────────────┘
```

## Recomendaciones de UX
- Colores y badges claros para estados de turno (publicado, cambiado, pendiente).
- Botones grandes para fichaje en móvil; feedback inmediato (estado, hora, resultado).
- Búsqueda unificada en mensajería con resultados por pestaña (1:1, grupos, tablón).
- Indicadores de conectividad/offline para fichaje y mensajería.
