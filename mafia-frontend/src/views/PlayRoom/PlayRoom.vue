<script setup lang="ts">
import Day from '@/components/Day.vue'
import Night from '@/components/Night.vue'
import Results from '@/components/Results.vue'
import Voting from '@/components/Voting.vue'
import Roles from '@/components/Roles/Roles.vue'
import { usePlayRoom, CurrentGameScreen } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { useRoute } from 'vue-router'

const playerRoom = usePlayRoom()
const ws = useWebsocket();
const route = useRoute();

if(ws.socket === null && route.params.id !== undefined) {
  ws.joinNewSocket();
}

const role = localStorage.getItem('role')
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
      <button class="btn btn-danger" @click="playerRoom.nextCycle()">Change screen</button>
      <Roles :title="role" :text="'Some text for the role'" :buttonText="'Show role'" :closeButton="'Close'" />
    </div>
  </main>
</template>
