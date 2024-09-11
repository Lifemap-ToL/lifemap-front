<template>
  <DropdownVue :bus="bus" shrink>
    <template #dropdown-trigger>
      <button class="link text flex-container -gap-xxs -align-baseline">
        <div><i class="mdi mdi-translate"></i></div>
        <div>{{ $tc('number-of-language', taxonWikipediaPages.length, { number: taxonWikipediaPages.length }) }}</div>
        <div><i class="mdi mdi-chevron-down"></i></div>
      </button>
    </template>
    <div class="contextual-menu">
      <button v-for="page in taxonWikipediaPages" :key="page.lang" class="contextual-menu--entry" @click.stop.prevent="select(page)">
        <span class="contextual-menu--entry--slot"
          ><span class="text -bold">{{ page.lang }}</span></span
        >
        <span class="contextual-menu--entry--slot">{{ page.title }}</span>
      </button>
    </div>
  </DropdownVue>
</template>

<script lang="ts" src="./WikipediaAvailablePagesDropdown.component.ts"></script>
