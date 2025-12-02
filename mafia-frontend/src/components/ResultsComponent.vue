<script setup lang="ts">
import { usePlayRoom } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { computed } from 'vue'

const ws = useWebsocket()
const playRoom = usePlayRoom()

function ready() {
  playRoom.readyBool = true
  ws.socket?.send(JSON.stringify({ message: 'ready' }))
}

const currentMessage = computed<string>(() => {
  console.log(ws.messages)
  if (ws.playerVoutedOut !== null && ws.playerVoutedOut !== '') {
    return `Player killed: ${ws.playerVoutedOut}`
  } else {
    return ws.messages
  }
})
</script>

<template>
  <main>
    <div v-if="!playRoom.readyBool">
      <div class="card row text-center mg-y-25">
        <h1 class="">Results:</h1>
      </div>
      <div class="card row text-center mg-y-25">
        {{ currentMessage }}
      </div>
      <div class="card row text-center mg-y-25">
        <button class="btn btn-danger" @click="ready">I'm ready</button>
      </div>
    </div>
    <div v-else>
      <div class="card row text-center mg-y-25">
        <Transition name="ready">
          <h1 v-if="playRoom.readyBool" class="card">Waiting for other players in result</h1>
        </Transition>
      </div>
    </div>
  </main>
</template>

<style>
.ready-enter-active,
.ready-leave-active {
  transition: all 0.4s ease;
}

.ready-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.ready-enter-to {
  opacity: 1;
  transform: translateX(0%);
}

.ready-leave-from {
  opacity: 1;
  transform: translateX(100%);
}

.ready-leave-to {
  opacity: 0;
  transform: translateX(0%);
}
</style>
