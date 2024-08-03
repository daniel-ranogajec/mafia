<script setup lang="ts">
import roles from '@/assets/roles.json'
import { useLobbyRoom } from '@/stores/lobbyRoom'

const lobbyRoom = useLobbyRoom()


</script>

<template>
  <main>
    <div class="container" v-for="player in lobbyRoom.players" v-bind:key="player.id">
        <div class="row center card borderRole m-y-15">
            <div class="col">{{ player.name }}</div>
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
