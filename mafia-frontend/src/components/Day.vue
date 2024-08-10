<script setup lang="ts">
import { ref } from 'vue';
import { usePlayRoom } from '@/stores/playRoom';
import { useWebsocket } from '@/stores/websocket';

const ws = useWebsocket();
const playRoom = usePlayRoom();

function ready() {
  playRoom.readyBool = true;
  playRoom.readyLength++;
  ws.socket?.send(JSON.stringify({'message': 'ready'}))
  if(playRoom.readyLength === ws.players.length) {
    playRoom.nextCycle()
  }
  console.log(playRoom.readyLength, ws.players.length)
}

</script>
<template>
  <main>
    <div v-if="!playRoom.readyBool">
      <div class="card row text-center mg-y-25">
        <h1 class="">Day time</h1>
      </div>
      <div class="card row text-center mg-y-25">
        Are you ready to vote?
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
<style>

</style>