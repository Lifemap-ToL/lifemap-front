<template>
  <template v-if="state === 'PENDING'">
    <div class="flex-container -vertical -gap-sm">
      <div class="twinkle-area -h20"></div>
      <div class="twinkle-area -h20"></div>
    </div>
  </template>
  <template v-if="state === 'SUCCESS'">
    <div>
      <span class="text -font-sm">{{ $t('sequenced-genome') }}: </span>
      <span class="text -font-sm -bold">{{ taxonAdditionalData.sequencedGenomes.toHuman() }}</span>
    </div>
    <div>
      <span class="text -font-sm">
        {{ $t('age') }}
        <PopoverVue>
          <template #trigger>
            <i class="link mdi mdi-information"></i>
          </template>
          <i18n-t keypath="age-description" tag="span">
            <template v-slot:timetree>
              <a
                href="https://timetree.org/"
                class="link text -color-shade-95 -hover-color-shade-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Timetree
              </a>
            </template>
          </i18n-t>
        </PopoverVue>
        :
      </span>
      <span v-if="taxonAdditionalData.age" class="text -font-sm -bold">{{ taxonAdditionalData.age.toHuman() }} {{ $t('age-unit') }}</span>
      <span v-else class="text -font-sm -color-shade-50">{{ $t('no-estimate') }}</span>
    </div>
  </template>
</template>

<script lang="ts" src="./TaxonAdditionalData.component.ts"></script>
