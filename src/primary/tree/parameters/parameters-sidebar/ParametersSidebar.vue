<template>
  <div class="sidebar">
    <div class="sidebar--header">
      <button class="button -shade-0-70 -icon -small" @click.stop.prevent="$emit('close')">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    <div class="sidebar--body">
      <div class="sidebar--body--slot">
        <h2 class="title">{{ $t('parameters') }}</h2>
      </div>
      <div class="sidebar--body--slot -scrollable">
        <div class="flex-container -vertical">
          <div class="flex-container -vertical -gap-lg">
            <div class="title -small flex-container -gap-xs">
              <i class="mdi mdi-wikipedia"></i>
              <span>{{ $t('wikipedia-preferred-language') }}</span>
            </div>
            <DropdownVue :bus="languageDropdownBus" right>
              <template #dropdown-trigger>
                <button class="button -stretch -outlined -small flex-container">
                  <span v-if="selectedLanguage.key === 'app'" class="flex-item -expand text">
                    {{ $t('app-language', { lang: $i18n.locale }) }}
                  </span>
                  <span v-else class="flex-item -expand text">{{ selectedLanguage.title }}</span>
                  <i class="text -font-xl mdi mdi-chevron-down"></i>
                </button>
              </template>
              <div class="contextual-menu">
                <button class="contextual-menu--entry" @click.stop.prevent="changeWikipediaLanguage({ key: 'app', title: '' })">
                  <span class="contextual-menu--entry--slot">{{ $t('app-language', { lang: $i18n.locale }) }}</span>
                </button>
                <button
                  v-for="language in languages"
                  :key="language.key"
                  class="contextual-menu--entry"
                  @click.stop.prevent="changeWikipediaLanguage(language)"
                >
                  <span class="contextual-menu--entry--slot">
                    <span class="text -bold">{{ language.key }}</span>
                  </span>
                  <span class="contextual-menu--entry--slot">{{ language.title }}</span>
                </button>
              </div>
            </DropdownVue>
          </div>
          <!--
      </div>
      <div class="sidebar--body--slot">
      -->
          <hr class="separator" />
          <!--
      </div>
      <div class="sidebar--body--slot">
      -->
          <fieldset class="fieldset">
            <legend class="fieldset--legend">{{ $t('efficiency-mode') }}</legend>
            <div class="flex-container -gap-xs -align-start">
              <input
                type="checkbox"
                id="efficiency-mode-input"
                name="efficiency-mode-input"
                class="input"
                :checked="efficiencyMode"
                @change.prevent.stop="toggleEfficiencyMode()"
              />
              <label for="efficiency-mode-input">{{ $t('enabled') }}</label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ParametersSidebar.component.ts"></script>
