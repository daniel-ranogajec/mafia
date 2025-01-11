<script setup lang="ts">
import { CurrentGameScreen, usePlayRoom } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { ref, Transition } from 'vue'

const ws = useWebsocket()
const playRoom = usePlayRoom()

function ready() {
  playRoom.readyBool = false
  clearInterval(countDownDate)
  ws.socket?.send(JSON.stringify({ message: 'ready' }))
}

//NEED TO CHANGE TO VOTING AGAIN

const timer = ref<number>(25)

let countDownDate = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(countDownDate)
    playRoom.nextCycle()
  } else {
    timer.value--
  }
}, 1000)

if (playRoom.currentScreen !== CurrentGameScreen.DAY) {
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
      <div class="card row text-center mg-y-25">Are you ready to vote?</div>
      <div class="card row text-center mg-y-25">
        <button class="btn btn-danger" @click="ready">I'm ready</button>
      </div>
    </div>
    <div v-else>
      <Transition name="ready">
        <h1 v-if="!playRoom.readyBool" class="card row text-center mg-y-25">
          Waiting for other players
        </h1>
      </Transition>
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
