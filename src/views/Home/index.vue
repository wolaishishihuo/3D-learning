<template>
  <div class="home-container">
    <!-- Background -->
    <div class="background-wrapper">
      <Beams
        :beam-width="2"
        :beam-height="15"
        :beam-number="12"
        :light-color="'#ffffff'"
        :speed="2"
        :noise-intensity="1.75"
        :scale="0.2"
        :rotation="0"
      />
    </div>

    <!-- Overlay Content -->
    <div class="content-overlay">
      <!-- Hero Section -->
      <main class="hero">
        <div class="badge">
          <span class="badge-icon">⏣</span>
          <span class="badge-text">Three.js Learning</span>
        </div>

        <h1 class="title">
          Immersive 3D Learning<br />
          with Vue & Three.js
        </h1>

        <div class="actions">
          <button class="btn btn-secondary">View Demos</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beams from '@/blocks/Backgrounds/Beams/Beams.vue'
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
