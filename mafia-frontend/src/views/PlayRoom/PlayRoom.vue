<script setup lang="ts">
import { usePlayRoom, CurrentGameScreen } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { useRoute } from 'vue-router'

import Day from '@/components/Day.vue'
import Night from '@/components/Night.vue'
import Results from '@/components/Results.vue'
import Voting from '@/components/Voting.vue'
import Roles from '@/components/Roles/Roles.vue'
import EndScreen from '@/components/EndScreen.vue'

const playerRoom = usePlayRoom()
const ws = useWebsocket();
const route = useRoute();

if(ws.socket === null && route.params.id !== undefined) {
  ws.joinNewSocket();
}

</script>

<template>
  <main>
    <div class="container">
      <div v-if="playerRoom.currentScreen === CurrentGameScreen.NIGHT">
        <Night />
      </div>
      <div v-if="playerRoom.currentScreen === CurrentGameScreen.RESULTS">
        <Results />
      </div>
      <div v-if="playerRoom.currentScreen === CurrentGameScreen.DAY">
        <Day />
      </div>
      <div v-if="playerRoom.currentScreen === CurrentGameScreen.VOTING">
        <Voting />
      </div>
      <div v-if="playerRoom.currentScreen === CurrentGameScreen.END">
        <EndScreen />
      </div>
      <div class="mg-y-10">
        <button class="btn btn-danger" @click="playerRoom.nextCycle()">Change screen</button>
      </div>
      <div class="mg-y-10">
        <Roles :title="ws.role" :text="'Some text for the role'" :buttonText="'Show role'" :closeButton="'Close'" />
      </div>
    </div>
  </main>
</template>
<style>
.mg-y-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>