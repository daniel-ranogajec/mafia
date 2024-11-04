<script setup lang="ts">
import router from '@/router';
import { usePlayRoom } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket';
import axios from 'axios';

const playerRoom = usePlayRoom();
const ws = useWebsocket();

function goToLobby() {
  if (ws.isAdmin) {
    router.push({
      path: `/CreateRoom/${ws.roomId}`
    })
  } else {
    router.push({
      path: `/LobbyRoom/${ws.roomId}`
    })
  }
}
</script>
<template>
  <div class="row card mg-y-15">Game ended</div>
  <div class="row card mg-y-15">
    <div class="row">
      <div class="col col-8">Alive players:</div>
      <div class="col" v-for="alive in playerRoom.players" v-bind:key="alive.name">
        {{ alive.name }}
      </div>
    </div>
  </div>
  <div class="row card mg-y-15">
    <div class="row">
      <div class="col col-8">Dead players:</div>
      <div class="col" v-for="dead in ws.deadPlayers" v-bind:key="dead">
        <span v-if="dead !== null">{{ dead }}</span>
      </div>
    </div>
  </div>
  <div class="row card mg-y-15">
    <h1>{{ ws.endMesagge }}</h1>
  </div>
  <div class="row card mg-y-15">
    <button class="btn btn-warning" @click="goToLobby">Play again</button>
  </div>
</template>
<style>
.mg-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
