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
          TimeTree is a public knowledge-base for information on the evolutionary timescale of life. Data from thousands of published
          studies are assembled into a searchable tree of life scaled to time.
        </PopoverVue>
        :
      </span>
      <span v-if="taxonAdditionalData.age" class="text -font-sm -bold">{{ taxonAdditionalData.age.toHuman() }} {{ $t('age-unit') }}</span>
      <span v-else class="text -font-sm -color-shade-50">{{ $t('no-estimate') }}</span>
    </div>
  </template>
</template>

<script lang="ts" src="./TaxonAdditionalData.component.ts"></script>
