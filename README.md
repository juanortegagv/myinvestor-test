# Funds App – Prueba técnica

Aplicación Frontend (React + TypeScript + Vite) que consume la API Express incluida en este repositorio para gestionar fondos: listar, comprar, ver cartera, vender y traspasar.

Se priorizó el tipado estricto y una arquitectura clara, con tests unitarios e integración selectivos para validar el flujo principal.

## Cómo ejecutar

Requisitos: Node 24.x y npm.

- Desarrollo (API + Web):
  - `npm install`
  - `npm run dev`
  - Web: `http://localhost:5173` (la API bajo `/api/*` hacia `http://127.0.0.1:3000`).
- Build y preview:
  - `npm run build`
  - `npm run preview`
- Tests:
  - `npm test`

## Arquitectura del proyecto

```
src/
  app/                 # Providers (ApiContext), Router
  components/ui/       # Primitivas de UI (Button, Input, Table, Dialog, Select)
  features/
    funds/             # Listado de fondos, paginación, ordenación
    portfolio/         # Vista de cartera
    orders/            # Dialog reutilizable (comprar, vender, traspasar)
  shared/
    api/               # httpClient y servicios (fundsService, portfolioService)
    types/             # Tipos de dominio (Fund, Portfolio)
    utils/             # currency, validators
```

### Decisiones técnicas y justificación
- Vite en vez de Webpack: menor configuración, HMR más veloz, build con Rollup y buena integración con Vitest.
- TypeScript estricto: favorece seguridad y DX;
- Context API: suficiente para el alcance (inyección de `httpClient` y estado global de órdenes). Evitamos Redux para mantener simplicidad.
- MSW: mocks deterministas de la API en tests, sin depender del servidor real.
- styled-components: estilos por componente, sin inline styles, mejorando mantenibilidad.

### Capa de datos
- `ApiContext` inyecta un `httpClient` basado en `fetch` (DIP) y los servicios lo consumen.
- Servicios:
  - `fundsService`: list, detail, buy, sell, transfer
  - `portfolioService`: get
- En dev, Vite proxyfía `/api/*` al servidor Express.

## Funcionalidades implementadas
- Listado de fondos con paginación y ordenación accesible (`aria-sort`).
- Compra con validaciones (> 0 y ≤ 10.000) en diálogo `<dialog>` con fallback.
- Cartera ordenada alfabéticamente y refresco automático tras órdenes.
- Venta con validación (> 0 y ≤ posición).
- Traspaso: selección de fondo destino (excluye origen) y validaciones correspondientes.

## Tests
- Unitarios: utilidades de validación y formateo, servicios y helpers.
- Integración: flujos clave (compra), ordenación en listados.
- MSW: handlers por endpoint para tests rápidos y deterministas.

## Endpoints utilizados (resumen)
- GET `/api/funds?page=1&limit=10`
- GET `/api/funds/:id`
- POST `/api/funds/:id/buy` { quantity }
- POST `/api/funds/:id/sell` { quantity }
- POST `/api/funds/transfer` { fromFundId, toFundId, quantity }
- GET `/api/portfolio`

## Mejoras pendientes por falta de tiempo
- Más cobertura de tests de integración (vender/traspasar end-to-end) y E2E (Playwright).
- Aliases de paths (`@/*`) y un archivo centralizado de constantes (límites, rutas, mensajes).
- Precommit con husky + lint-staged para lint, type-check y prettier automáticos.
- UX/A11y:
  - Toasters globales de feedback y manejo de errores unificado.
  - Mejor focus management y trap para `<dialog>`.
  - Skeletons/empty states más ricos y mensajes de error consistentes.
- Responsive/mobile: pulir tablas en móviles (scroll-snap, columnas prioritarias) y mejorar spacing.
- Cache de datos (SWR/React Query) si el dominio crece.
- CI (lint/test).

