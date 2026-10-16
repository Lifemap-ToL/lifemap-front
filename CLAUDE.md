# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Lifemap front-end: a Vue 3 + TypeScript SPA (built with Vite) for exploring the tree of life as a zoomable OpenLayers map backed by vector tiles.

## Commands

```bash
npm run dev                  # dev server on http://localhost:3000
npm run build                # production build to dist/ (also builds 404.html and the PWA service worker)
npm run type-check           # vue-tsc
npm run lint                 # ESLint, runs with --fix (modifies files)
npm run format               # Prettier on src/
npm run test:unit            # Vitest in watch mode
npx vitest run path/to/file.spec.ts   # run a single unit test file
npm run test:e2e             # Cypress against `vite preview` on port 4173
```

Known state of the tooling (check before relying on it):
- `npm run type-check` currently crashes with `ReferenceError: ScriptKind is not defined`; `vue-tsc` 3.x seems incompatible with the pinned `typescript ~5.0.4`.
- The only unit test, `tests/unit/common/app/App.spec.ts`, imports a path that no longer exists, so `vitest` fails to load it. `tests/e2e/example.cy.ts` is a scaffold.
- `vite build` works and is the reliable check that the code compiles.

Prettier: single quotes, semicolons, 140-char lines, `arrowParens: avoid`, `trailingComma: es5`. Use the `@/` alias for `src/`.

## Architecture

Hexagonal architecture with DDD vocabulary, in three layers under `src/`:

- **`domain/`**: framework-free business types: entities (`Taxon`, `TaxonTree`…), repository *interfaces* (`TaxonRepository`, `TreeRepository`), and abstractions such as `Logger` and `AlertBus`. Must not import Vue, axios or OpenLayers.
- **`secondary/`**: adapters to the outside world. `REST*Repository` classes implement the domain repositories with axios. Each `REST*` file declares the raw API shape plus a `to<DomainType>()` mapper (e.g. `RESTTaxonSuggestion.toTaxonSuggestion` parses the backend's pipe-separated suggestion string). Wikidata SPARQL access goes through `secondary/wikidata/WikidataCaller`.
- **`primary/`**: the only layer that knows about Vue. Components turn domain objects into view models with `to*Projection()` functions in `*Projection.ts` files placed next to the component.

### Wiring: `src/main.ts`

`main.ts` is the composition root. It builds the axios instances (base URLs from `VITE_LIFEMAP_API_BASE_URL` and `VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL`), the repositories, the event buses, and the **entire OpenLayers map**: composite vector-tile layer, taxon/LUCA/ancestor-route/subtree vector layers, overlays and select/click interactions. It then `app.provide()`s all of them.

Every provided value is wrapped in a **factory function**: `app.provide('taxonRepository', () => repo)`. Components consume them as functions:

```ts
@Inject() private taxonRepository!: () => TaxonRepository;
// usage: this.taxonRepository().listSuggestion(search)
```

To add a new injectable, create it in `main.ts`, provide it there, and inject it by the same key.

The map is created once in `main.ts`, not inside a component. Components under `primary/tree/` get the `map` and its layers through injection. Map building blocks live in `primary/tree/map/` (`layer/`, `style/`, `interaction/`, `overlay/`, `view/`), and each one is created by a `create*` factory.

### Buses (mitt-based pub/sub)

Distant components communicate through buses rather than a store: `modalBus`, `sidebarBus` (both `MittModalBus`), `clickBus` (global window clicks, used to close dropdowns), `inputBus`, `alertBus`, and `appBus`. `appBus` carries app-wide settings events (`changelocale`, `changewikipedialanguage`, `changeefficiencymode`) whose handlers in `main.ts` rebuild map styles/layers and persist the choice to `localStorage`.

"Efficiency mode" (defaulting to on for screens narrower than 1024px) swaps the composite layer and disables hover/select interactions. Several features need to respect it.

### Components

Each component has its own kebab-case folder containing three files:
- `Foo.vue`: template only, ending with `<script lang="ts" src="./Foo.component.ts"></script>` (no inline script, no styles)
- `Foo.component.ts`: class-based logic with `vue-facing-decorator` (`@Component`, `@Prop`, `@Inject`, `@Watch`, `extends Vue`)
- `index.ts`: barrel exporting `FooComponent` and `FooVue`

Child components sit inside their parent's folder, and shared ones go in `primary/common/`. The README says the project plans to move from `vue-facing-decorator` to the Composition API, but new code currently follows the class style.

Routes (`src/router.ts`): `/`, `/about`, `/tree`. `/tree` maps query params to props: `ancestor=<id>,<id>` becomes `ancestorRequest`, and `subtree=<id>,…` becomes `subtree` (NCBI ids).

### Styles

No styles in components. All styling is SCSS under `src/assets/styles/`, organised following atomic design (`token`, `element`, `component`, `layout`, `template`…), and imported once via `styles.scss` in `main.ts`. Templates use those global class names.

### i18n

`vue-i18n` in Composition mode (`legacy: false`). Messages live in `src/locale/*.json`, with `en.json` as the reference schema. To add an app language, add its JSON file **and** register it in both `primary/common/i18n/index.ts` (messages) and `primary/common/i18n/locale.ts` (`APP_LOCALES`, plus a `TREE_LOCALES` entry mapping it to a tree/tile locale, currently only `en` or `fr`). `el.json` and `zh-CN.json` exist but are not registered yet.

## Environment & deployment

- `.env` (production defaults) and `.env.development` define `VITE_LIFEMAP_API_BASE_URL`, `VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL` and `VITE_ENABLE_MATOMO_TRACKING` (keep it false in development).
- Deployment: GitHub Pages via `.github/workflows/deploy_pages.yml`, triggered by pushing a `v*` tag (`npm ci && npm run build`, then publish `dist/`). There is no CI test/lint job.
