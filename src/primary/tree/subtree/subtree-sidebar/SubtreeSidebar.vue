<template>
  <div class="sidebar">
    <div class="sidebar--header">
      <button class="button -shade-0-70 -icon -small" @click.stop.prevent="$emit('close')">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    <div class="sidebar--body">
      <div class="sidebar--body--slot">
        <h2 class="title">{{ $t('subtree') }}</h2>
      </div>
      <div class="sidebar--body--slot">
        <div class="flex-container -gap-xl -vertical">
          <label class="title -small">{{ $t('subtree-input-label') }}</label>
          <div class="flex-container -vertical -gap-sm">
            <div class="flex-container -gap-xs -align-start">
              <input
                type="radio"
                id="by-names"
                name="by"
                class="input"
                value="by-names"
                :checked="inputMethod === 'NAME'"
                @input="changeInputMethod('NAME')"
              />
              <label for="by-names">{{ $t('by-name') }}</label>
            </div>
            <fieldset class="fieldset flex-container -vertical -gap-xs" :disabled="inputMethod !== 'NAME'">
              <TaxonTaginputVue :value="taxonTagInputs"></TaxonTaginputVue>
              <div class="flex-container -gap-xs">
                <button class="button -text -icon -small" @click.stop.prevent="onSubtreeFit" :disabled="leafs.length === 0">
                  <i class="mdi mdi-crosshairs-gps"></i>
                </button>
                <button class="button -text -icon -small" @click.stop.prevent="openExportSubtreeModal" :disabled="leafs.length === 0">
                  <i class="mdi mdi-export"></i>
                </button>
                <span class="flex-item -expand"></span>
                <button v-if="leafs.length > 0" class="button -text -icon -small" @click.stop.prevent="clearTaxonTaginput">
                  <i class="mdi mdi-close"></i>
                </button>
              </div>
            </fieldset>
          </div>
          <div class="flex-container -vertical -gap-sm">
            <div class="flex-container -gap-xs -align-start">
              <input
                type="radio"
                id="by-tax-id"
                name="by"
                class="input"
                value="by-tax-id"
                :checked="inputMethod === 'ID'"
                @input="changeInputMethod('ID')"
              />
              <label for="by-tax-id">{{ $t('by-tax-id') }}</label>
            </div>
            <fieldset class="fieldset flex-container -vertical -gap-xs" :disabled="inputMethod !== 'ID'">
              <textarea class="textarea" rows="4" :value="leafTaxonIds" ref="leaf-taxon-ids-textarea" @input="inputTaxonIds"></textarea>
              <button class="button -extra-small -main" @click.stop.prevent="getSubtree">{{ $t('get-subtree') }}</button>
              <div class="flex-container -gap-xs">
                <button class="button -text -icon -small" @click.stop.prevent="onSubtreeFit" :disabled="leafs.length === 0">
                  <i class="mdi mdi-crosshairs-gps"></i>
                </button>
                <button class="button -text -icon -small" @click.stop.prevent="openExportSubtreeModal" :disabled="leafs.length === 0">
                  <i class="mdi mdi-export"></i>
                </button>
                <span class="flex-item -expand"></span>
                <button v-if="leafs.length > 0" class="button -text -icon -small" @click.stop.prevent="clearTaxonTaginput">
                  <i class="mdi mdi-close"></i>
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SubtreeSidebar.component.ts"></script>
