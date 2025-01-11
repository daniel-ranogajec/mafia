<script setup lang="ts">
import { useWebsocket } from '@/stores/websocket'
import { ref, TransitionGroup } from 'vue'

const ws = useWebsocket()
const socket = ref<WebSocket | null>(null)

socket.value?.send(JSON.stringify({ message: 'refresh' }))
</script>

<template>
  <TransitionGroup tag="div" name="players">
    <div class="container" v-for="(player, index) in ws.players" :key="index">
      <div v-if="player !== null" class="row center card borderRole m-y-15">
        <div class="col">{{ player }}</div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style>
.center {
  text-align: center;
}

.choosenRole {
  border: 1px solid red !important;
  background-color: #fef4f4;
}

.borderRole {
  border: 1px solid grey !important;
}

.m-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.players-enter-active,
.players-leave-active {
  transition: all 0.4s ease;
}

.players-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.players-enter-to {
  opacity: 1;
  transform: translateX(0%);
}

.players-leave-from {
  opacity: 1;
  transform: translateX(100%);
}

.players-leave-to {
  opacity: 0;
  transform: translateX(0%);
}
</style>
