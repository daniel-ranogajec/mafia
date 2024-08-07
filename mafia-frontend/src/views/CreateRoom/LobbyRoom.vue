<script setup lang="ts">
import { useLobbyRoom } from '@/stores/lobbyRoom'
import { useWebsocket } from '@/stores/websocket';
import { computed } from 'vue';

const lobbyRoom = useLobbyRoom()
const ws = useWebsocket()

const players = computed<any>(() => {
  if(ws.players) {
    return ws.players
  } else {
    return "Nothing"
  }
})

console.log(ws.players, players.value)

</script>

<template>
  <main>
    <div class="container" v-for="player in ws.players" v-bind:key="player">
        <div class="row center card borderRole m-y-15">
            <div class="col">{{ player }}</div>
        </div>
    </div>
  </main>
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
</style>
