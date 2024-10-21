<script setup lang="ts">
import { CurrentGameScreen, usePlayRoom } from '@/stores/playRoom';
import { useWebsocket } from '@/stores/websocket';
import { ref } from 'vue';

const ws = useWebsocket();
const playRoom = usePlayRoom();

function ready() {
  playRoom.readyBool = false;
  ws.socket?.send(JSON.stringify({'message': 'ready'}))
}

//NEED TO CHANGE TO VOTING AGAIN

const timer = ref<number>(5);

let countDownDate = setInterval(() => {
  console.log(timer.value)
  if (timer.value === 0) {
    clearInterval(countDownDate)
    playRoom.nextCycle()
  } else {
    timer.value--
  }             
}, 1000);

if(playRoom.currentScreen !== CurrentGameScreen.DAY) {
  clearInterval(countDownDate)
}
</script>

<template>
  <main>
    <div v-if="playRoom.readyBool">
      <div class="card row text-center mg-y-25">
        <h1 class="">Day time</h1>
      </div>
      <div class="card row text-center mg-y-25">
        {{ timer }}
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