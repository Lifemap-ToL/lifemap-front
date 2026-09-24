# lifemap-front

<a id="codebase"></a>
## Codebase

### Architecture
The project design is inspired by [Domain Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design)
principles and structured following the
[hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)). Thus, the codebase in this
project is organized in three layers:
- the domain
- the primary
- the secondary

#### The domain
The domain is at the heart of the DDD principles. What belongs to the domain is only the business classes, interfaces or
other code structures freed from any technical aspects regarding the way they are retrieved or the way they are
rendered on the screen.

##### Entities and repositories
Entities and repositories are two concepts that are heavily used in the domain of this project.

Entities are objects that have an
identity (in other words, that can be identified by some kind of identifier). Taxa are obviously the main entities in
this project, but we can also found boreholes or countries.

Repositories allow creating bridges between the domain entities and the secondary layer. In the context of this project
it consists of interfaces with a list of methods which are implemented in the secondary layer. For instance, below the
repository of the `Taxon` entity:

```ts
export interface TaxonRepository {
  listAncestors(ncbiIds: number[]): Promise<number[][]>;
  listByNCBIIds(ncbiIds: number[]): Promise<Taxon[]>;
  findByNCBIId(ncbiId: number): Promise<Taxon>;
  findTaxonAdditionalData(ncbiId: number): Promise<TaxonAdditionalData>;
  findTaxonWikidataRecord(ncbiId: number): Promise<TaxonWikidataRecord>;
  findTaxonWikipediaPages(ncbiId: number): Promise<TaxonWikipediaPage[]>;
  findTaxonWikipediaPageSummary(url: string): Promise<WikipediaPageSummary>;
  findSequencedGenomes(ncbiId: number): Promise<Numeral>;
  listForExtent(maxZoom: number, extent: Extent, loadSequencedGenomes?: boolean): Promise<Taxon[]>;
  listSuggestion(search: string): Promise<TaxonSuggestion[]>;
}
```

#### The secondary
The secondary is the layer where stands what we get and how we get it from the outside world. At the scale of this
project, in the vast majority of cases, it concerns:
- the data we get from external databases, mostly through REST API
- the way we retrieve those data, in most cases by leveraging the possibilities offered by the `axios` javascript
  library
- the way we transform data retrieved via the REST APIs to domain data

#### The primary
The primary is the layer where we consume domain data and integrate them to the rendering process. At the scale of this
project it is mainly done by building a [Vue.js](https://fr.vuejs.org/) component tree and using domain-related data or
structures in these components.

##### Projections
Data retrieved from the domain is often reworked to meet the specific needs of the primary layer. This processing is
almost always done within "projections" interfaces located in dedicated files suffixed by "Projection"
("TaxonWikidataRecordProjection", "TaxonSuggestionProjection", ...).

#### Injections
To make domain repositories and some other features available in Vue components, we use the [dependency injection system
natively provided by Vue](https://vuejs.org/guide/components/provide-inject.html). All the injections are centralized
in the `main.ts` file (located in the `src/src` folder).

#### Buses
When some Vue components need to make simple communications but are quite distant in the component tree, to avoid the
prop drilling antipattern or the overkill usage of a store such as [pinia](https://pinia.vuejs.org/), we created simple
buses based on the publish-subscribe principle and dedicated to a specific task.

#### Vue
[Vue.js](https://fr.vuejs.org/) (version 3) is the JavaScript framework used for this project. As the whole application
rendering consists of a Vue component tree, it is a very structuring element. Vue Components in this project are split
in 3 files:
- a "template" file that contains only the markup / template part of the component (files with the ".vue" extension),
- a "script" file that contains the "typescript" part of the component (files with the ".component.ts" extension),
- a [barrel file](https://en.wiktionary.org/wiki/barrel_file) (index.ts) to ease importing

Each component (all the 3 files listed above) is located in its own folder; for instance the component dedicated to the
homepage is placed in a `homepage` folder containing, at least, a `Homepage.vue` file, a `Homepage.component.ts`
file and an `ìndex.ts` file. By default, a folder corresponding to a child component is located in the folder
of its parent component; generic components used in several components are located in the `/src/src/primary/common`.

The names of the folders containing components follow the kebab case
 convention,[](https://en.wiktionary.org/wiki/kebab_case) whereas the "template" and "script" files are named following the
[upper camel case](https://en.wiktionary.org/wiki/upper_camel_case).

The script part of each component is written in [typescript](https://www.typescriptlang.org/) using a "class" approach
thanks to the [`vue-facing-decorators`](https://facing-dev.github.io/vue-facing-decorator/) features.

```diff
In a near future, the use of [`vue-facing-decorators`](https://facing-dev.github.io/vue-facing-decorator/) will be dropped
and components will be written using the Vue composition API. This major change will leverage, among other things,
of all the possibilities offered by the Vue composition API in terms of code reuse and code organization.. 
```

This application also takes advantage of the [Vue Router](https://router.vuejs.org/) for front-end JavaScript routing.

To go deeper in Vue.js understanding, please have a look at the [Vue.js guide](https://fr.vuejs.org/guide/introduction.html) which is an excellent resource that 
covers most of the framework capabilities.

To be noted that, in this project, the use of Vue components is restrained by design to the primary layer. This means
that if one day the front-end framework has to change, only the primary layer will be impacted, what belongs to the
domain and secondary layers will not have to change.

#### Web mapping
Although it is not obvious, web mapping is essential for this project. [Vector tiles](https://en.wikipedia.org/wiki/Vector_tiles)  
are heavily used in the app, the choice was made to use the [OpenLayers](https://openlayers.org/) JavaScript library to consume them.

#### App Entry point
As the entire app rendering is done in Vue components, the `main.ts` file, located in the `src/` folder, can be seen
as the app entry point. The `index.html` file, used as default page for production and development contexts, contain no 
relevant rendering content except a `div` tag with an `app` id and a script tag to load and execute the `main.ts` file. 
Within the `main.ts` file, the Vue app is initialized and "attach" to the `div` tag with the `app` id.

Several initialization processes are also done in the `main.ts` file:
- [SASS](https://sass-lang.com/) files import,
- buses, axios instances, repositories and other commonly used objects are created,
- Vue app initialization
- Injection of objects that needed to be available for each Vue component (via the
  [Vue provide / inject Vue utility](https://vuejs.org/guide/components/provide-inject.html))

To be noted that the Vue router is initialized in a separated `router.ts` file (located in the `src` folder)
but the router exported in this file is only imported and used in the `main.ts` file.

### Styles
To make a clear separation of concern between the app content and the way this content is rendered, CSS styling has not
been done in the Vue components but in separated files. This allows, notably, more flexibility. If, one day, Vue
components are dropped for this project, the styling will not be impacted and can be reused with another framework.

The CSS is built using [SASS extension](https://sass-lang.com/) files located in the `src/assets/styles` folder.

The lifemap styling has been developed following some [atomic design](https://atomicdesign.bradfrost.com/table-of-contents/) principles. The [SASS](https://sass-lang.com/) files forming the 
app styling are thus divided in atoms, molecules, organisms and templates as advocated 
in [atomic design methodology](https://atomicdesign.bradfrost.com/chapter-2/).

The SASS files import is done in the app entry point, the `main.ts` file. Compilation to CSS is done at build or 
development time.

Besides the styles developed specifically for this project, the [OpenLayers](https://openlayers.org/) CSS is also imported in the `main.ts` 
file.

<a id="installation-and-usage"></a>
## Installation and usage

### Prerequisite
To run or build the app locally, you need to have [Node.js](https://nodejs.org) installed on your machine.

To be noted that all the commands listed below are defined in the `scripts` block of the `package.json` file located in
the project root directory.

### Installation
The following command should be executed in the project root directory to locally install all the project dependencies:

```
npm install
```

### Development
To run the app locally, the following command should be executed in the project root directory. This command starts a 
local web server available through the 3000 port (that port can be changed via [vite configuration files](https://vite.dev/config/server-options))

```
npm run dev
```

### Build
To make production builds of the app, the following command should be executed in the project root directory:

```
npm run build
```

### Customize configuration

#### Vite
Vite is the preferential build tool for Vue projects. It serves many purposes such as:
- running a local web server for development,
- bundling the source code with preconfigured [Rollup](https://rollupjs.org/) instructions,

See [Vite Configuration Reference](https://vite.dev/config/) to go further on that topic.

#### .env file
The `.env` files located in the project root directory gives the possibility to define different values for variables depending on
the execution environment (development environment, production environment, ...).

There are 2 `.env` files for this project:
- `.env`, the one for production,
- `.env.devlopment`, the one used for local development,

The content of each `.env` files consists of a list of key / value pairs, such as the ones below:

```
VITE_LIFEMAP_API_BASE_URL=https://lifemap-back.univ-lyon1.fr
VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL=https://query.wikidata.org
```

The variables that need to be accessed at build time by Vite should be prefixed by `VITE_`. The `.env` file should be
seen as the "main" `.env` file. Variables that are not defined in other `.env` files (`.env.development` in the context 
of this project) take the values defined in the `.env` file.

See [Vite documentation](https://vite.dev/guide/env-and-mode) to go further on that topic.

Below is the list of environment variables declared for this project. Besides, for each of them, a quick explanation as
well as examples:

VITE_LIFEMAP_API_BASE_URL
VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL
VITE_ENABLE_MATOMO_TRACKING=true

##### VITE_LIFEMAP_API_BASE_URL

The value assigned to this variable should be the URL of the lifemap backend API server.

Example:
```
VITE_LIFEMAP_API_BASE_URL=https://lifemap-back.univ-lyon1.fr
```

##### VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL
The value assigned to this variable should be the URL of the Wikidata query service API.

Example:
```
VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL=https://query.wikidata.org
```

##### VITE_ENABLE_MATOMO_TRACKING
The value assigned to this variable should be a boolean value indicating whether Matomo tracking is enabled or not 
(unless there is a specific reason to enable it, this setting should remain false in development environments.)

Example:
```
VITE_ENABLE_MATOMO_TRACKING=true
```