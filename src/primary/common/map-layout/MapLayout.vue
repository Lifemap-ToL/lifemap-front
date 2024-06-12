<template>
  <div id="map" class="map">
    <div class="map--toolbar" ref="toolbar">
      <div class="toolbar">
        <div class="toolbar--slot">
          <ZoomControlVue :map="map"></ZoomControlVue>
        </div>
        <div class="toolbar--slot">
          <HomeControlVue :map="map"></HomeControlVue>
        </div>
        <div class="toolbar--slot">
          <slot name="toolbar"></slot>
        </div>
      </div>
    </div>
    <div class="map--sidebar" ref="sidebar">
      <slot name="left-bar"></slot>
    </div>
    <div class="map--search-bar" ref="search-bar">
      <slot name="searchbar"></slot>
    </div>
    <div class="map--info-bar" ref="info-bar">
      <slot name="right-bar"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" src="./MapLayout.component.ts"></script>
