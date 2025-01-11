<script setup lang="ts">
import { computed, ref, Transition } from 'vue'
import { usePlayRoom } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import Swal from 'sweetalert2'

const playRoom = usePlayRoom()
const ws = useWebsocket()

playRoom.initialize()

const playerChoice = ref<string | null>(null)
const playerReady = ref<boolean>(false)

function choosenPlayer(player: string) {
  if (player !== ws.userName) {
    playerChoice.value = player
    playRoom.choosenPlayer = {
      name: ws.userName,
      choosenPlayer: player
    }
  } else {
    playerChoice.value = null
    playRoom.choosenPlayer = null
  }
}

function confirmChoice() {
  if (playerChoice.value === null) {
    Swal.fire({
      text: 'Choose a player!',
      confirmButtonText: 'OK'
    })
  } else {
    ws.socket?.send(JSON.stringify({ message: 'voting', player: playerChoice.value }))
    playerReady.value = true
  }
}

const playerVotedOut = computed<string | null>(() => {
  return ws.playerVoutedOut
})

function ready() {
  playRoom.readyBool = true
  ws.socket?.send(JSON.stringify({ message: 'ready' }))
}
</script>

<template>
  <main>
    <div v-if="!playerReady && ws.playerVoutedOut === null">
      <div class="row card">Voting</div>
      <div class="row card mg-y-15">Vote to kill a player:</div>
      <div v-for="player in playRoom.players" class="row card text-center mg-y-25"
        :class="[player.name === playerChoice ? 'choosenPlayer' : '']" v-bind:key="player.name">
        <div @click="choosenPlayer(player.name)">{{ player.name }}</div>
      </div>
      <div class="row card mg-y-15">
        <button @click="confirmChoice()" class="btn btn-danger">Confirm choice</button>
      </div>
    </div>
    <div v-else-if="playerReady && ws.playerVoutedOut === null">
      <Transition name="ready">
        <h1 v-if="playerReady" class="card">Waiting for other players</h1>
      </Transition>
    </div>
    <div v-else-if="playerReady && ws.playerVoutedOut !== null">
      <h1 class="card">Player vouted out:</h1>
      <div class="row card text-center mg-y-25">
        {{ playerVotedOut }}
      </div>
      <div class="row card mg-y-15">
        <button @click="ready()" class="btn btn-danger">I'm ready</button>
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
