<template>
  <div class="sidebar">
    <div class="sidebar--slot">
      <AncestorFormVue :value="ancestorRouteExtremes"></AncestorFormVue>
    </div>
    <div v-if="ancestorRoute.length > 0" class="sidebar--slot -expand">
      <div class="flex-container -vertical -gap-sm block -stretch">
        <div class="flex-container -gap-xs">
          <i class="icon -clickable mdi mdi-close" @click.stop.prevent="clearAncestor"></i>
          <i class="icon -clickable mdi mdi-crosshairs-gps" @click.stop.prevent="onAncestorRouteFit()"></i>
        </div>
        <div class="flex-item -expand block -scrollable-y">
          <div class="step-list">
            <div v-for="(taxon, index) in ancestorRoute" :key="`${ancestorRouteExtremes.join('-')}-${taxon.id}`" class="step-list--item">
              <div class="step-list--item--marker" :class="{ '-emphasized': taxon.id === ancestorId }"></div>
              <div class="step-list--item--text">
                <div
                  class="text"
                  :class="{
                    '-font-sm': index !== 0 && index !== ancestorRoute.length - 1 && taxon.id !== ancestorId && taxon.id !== ancestorId,
                    '-color-shade-95': index !== 0 && index !== ancestorRoute.length - 1 && taxon.id !== ancestorId,
                    '-color-shade-100': index === 0 || index === ancestorRoute.length - 1 || taxon.id === ancestorId,
                  }"
                >
                  {{ taxon.name }}
                </div>
                <div
                  class="text -uppercase -color-shade-75"
                  :class="{
                    '-font-xs': index !== 0 && index !== ancestorRoute.length - 1,
                    '-font-sm': index === 0 || index === ancestorRoute.length - 1 || taxon.id === ancestorId,
                  }"
                >
                  {{ taxon.rank }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AncestorSidebar.component.ts"></script>
