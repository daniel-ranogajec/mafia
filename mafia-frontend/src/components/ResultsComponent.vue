<script setup lang="ts">
import { usePlayRoom } from '@/stores/playRoom';
import { useWebsocket } from '@/stores/websocket';
import { computed } from 'vue';

const ws = useWebsocket();
const playRoom = usePlayRoom();

function ready() {
  playRoom.readyBool = true;
  ws.socket?.send(JSON.stringify({ 'message': 'ready' }))
}

const currentMessage = computed<string>(() => {
  if(ws.playerVoutedOut !== null && ws.playerVoutedOut !== "") {
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
        <h1 class="">Results: </h1>
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
        <h1 class="">Waiting for others</h1>
      </div>
    </div>
  </main>
</template>

<style></style>