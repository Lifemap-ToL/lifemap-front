<template>
  <div class="sidebar">
    <div class="sidebar--header">
      <button class="button -shade-0-70 -icon -small" @click.stop.prevent="$emit('close')">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    <div class="sidebar--body">
      <div class="sidebar--body--slot">
        <h2 class="title">{{ $t('additional-data') }}</h2>
      </div>
      <div class="sidebar--body--slot">
        <div class="flex-container -vertical">
          <div class="title -small">
            <div class="flex-container -gap-xs">
              <i class="mdi mdi-database"></i>
              <span>NCBI</span>
            </div>
          </div>
          <div class="flex-container block -ph8">
            <input
              :key="additional"
              type="radio"
              id="genomes-fully-sequenced"
              name="genomes-fully-sequenced"
              class="input"
              :checked="additional === 'genomes'"
              @click.stop.prevent="changeAdditional('genomes')"
            />
            <label for="genomes-fully-sequenced">{{ $t('sequenced-genomes-label') }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AdditionalDataSidebar.component.ts"></script>
