<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="background"></div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
@import "@/assets/main.css";

html, body, #app {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/mafia-background.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .background {
    background-position: center;
  }

  .content {
    font-size: 14px;
  }
}
</style>