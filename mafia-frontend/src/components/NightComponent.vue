<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePlayRoom } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { useRandomArray } from '@/stores/randomArray'

const playerRoom = usePlayRoom()
const ws = useWebsocket()
const randomArray = useRandomArray()

playerRoom.initialize()

const playerChoice = ref<string | null>(null)
const playerReady = ref<boolean>(false)

onMounted(() => {
  randomArray.randomNumberGeneratorToSolve()
})

function choosenPlayer(player: string) {
  console.log(ws.role)

  if (player !== ws.userName) {
    playerChoice.value = player
    playerRoom.choosenPlayer = {
      name: ws.userName,
      choosenPlayer: player
    }
  } else {
    playerChoice.value = null
    playerRoom.choosenPlayer = null
  }
}

function confirmChoice() {
  console.log('Pa dobar je odabro')
  ws.socket?.send(JSON.stringify({ message: 'night', player: playerChoice.value }))
  playerReady.value = true
}
</script>

<template>
  <main>
    <div v-if="ws.role === 'Villager' && playerReady === false">
      <div class="row card">Night</div>
      <div class="row card mg-y-15">You are a villager</div>
      <div class="row card mg-y-15">
        The number to solve is: {{ randomArray.randomNumberToSolve }}
      </div>
      <div
        v-for="(randomAnswer, index) in randomArray.randomAnswersArray"
        :key="index"
        class="row card mg-y-15"
      >
        <button
          class="btn"
          :class="'btn-secondary'"
          @click="randomAnswer.correct ? confirmChoice() : null"
        >
          {{ randomAnswer.text }}
        </button>
      </div>
    </div>
    <div v-else-if="ws.role !== 'Villager' && playerReady === false">
      <div class="row card">Night</div>
      <div class="row card mg-y-15">You are {{ ws.role }}</div>
      <div class="row card mg-y-15">Choose a player:</div>
      <div
        v-for="player in playerRoom.players"
        class="row card text-center mg-y-25"
        :class="[player.name === playerChoice ? 'choosenPlayer' : '']"
        v-bind:key="player.name"
      >
        <div @click="choosenPlayer(player.name)">{{ player.name }}</div>
      </div>
      <div class="row card mg-y-15">
        <button @click="confirmChoice()" class="btn btn-danger">Confirm choice</button>
      </div>
    </div>
    <div v-else>
      <Transition name="ready">
        <h1 v-if="playerReady" class="card">Waiting for other players</h1>
      </Transition>
    </div>
  </main>
</template>

<style>
.choosenPlayer {
  border: 1px solid red !important;
  background-color: #fef4f4 !important;
}

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
