<script setup lang="ts">
import { ref } from 'vue';
import { usePlayRoom } from '@/stores/playRoom';
import { useWebsocket } from '@/stores/websocket';

const playerRoom = usePlayRoom()
const ws = useWebsocket()

playerRoom.initialize()

const playerChoice = ref<string | null>(null)
const playerReady = ref<boolean>(false)

function choosenPlayer(player: string) {
  if(player !== ws.userName) {
    playerChoice.value = player;
    playerRoom.choosenPlayer = {
      name: ws.userName,
      choosenPlayer: player
    }
  } else {
    playerChoice.value = null;
    playerRoom.choosenPlayer = null;
  }
}

function confirmChoice() {
  ws.socket?.send(JSON.stringify({message: "voting", player: playerChoice.value}))
  playerReady.value = true;
}

</script>

<template>
  <main>
    <div v-if="!playerReady && ws.playerVoutedOut === null">
      <div class="row card">
        Voting
      </div>
      <div class="row card mg-y-15">
        Vote to kill a player:
      </div>
      <div v-for="player in playerRoom.players" class="row card text-center mg-y-25" :class="[
        player.name === playerChoice ? 'choosenPlayer': ''
      ]" v-bind:key="player.name">
        <div @click="choosenPlayer(player.name)">{{ player.name }}</div>
      </div>
      <div class="row card mg-y-15">
        <button @click="confirmChoice()" class="btn btn-danger">Confirm choice</button>
      </div>
    </div>
    <div v-else-if="playerReady && ws.playerVoutedOut === null">
      <h1 class="card">Waiting for other players</h1>
    </div>
    <div v-else-if="ws.playerVoutedOut !== null">
      <h1 class="card">Player vouted out: </h1>
      <div class="row card text-center mg-y-25">
        {{ ws.playerVoutedOut }}
      </div>
    </div>
  </main>
</template>
<style></style>