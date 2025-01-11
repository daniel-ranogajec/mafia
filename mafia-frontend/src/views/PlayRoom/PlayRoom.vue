<script setup lang="ts">
import { usePlayRoom, CurrentGameScreen } from '@/stores/playRoom'
import { useWebsocket } from '@/stores/websocket'
import { useRoute } from 'vue-router'

import Day from '@/components/DayScreen.vue'
import Night from '@/components/NightComponent.vue'
import Results from '@/components/ResultsComponent.vue'
import Voting from '@/components/VotingComponent.vue'
import Roles from '@/components/Roles/Roles.vue'
import EndScreen from '@/components/EndScreen.vue'
import { computed } from 'vue'

const playerRoom = usePlayRoom()
const ws = useWebsocket()
const route = useRoute()

if (ws.socket === null && route.params.id !== undefined) {
  ws.joinNewSocket()
}

const currentDay = computed<number>(() => {
  return playerRoom.currentScreen
})
</script>

<template>
  <main>
    <div class="container">
      <TransitionGroup tag="div" name="game">
        <div v-if="currentDay === CurrentGameScreen.NIGHT">
          <Night />
        </div>
        <div v-if="currentDay === CurrentGameScreen.RESULTS">
          <Results />
        </div>
        <div v-if="currentDay === CurrentGameScreen.DAY">
          <Day />
        </div>
        <div v-if="currentDay === CurrentGameScreen.VOTING">
          <Voting />
        </div>
        <div v-if="currentDay === CurrentGameScreen.END">
          <EndScreen />
        </div>
        <div class="mg-y-10">
          <button class="btn btn-danger" @click="playerRoom.nextCycle()">Change screen</button>
        </div>
        <div class="mg-y-10">
          <Roles :title="ws.role" :text="'Some text for the role'" :buttonText="'Show role'" :closeButton="'Close'" />
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<style>
.game-enter-active,
.game-leave-active {
  transition: all 0.4s ease;
}

.game-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.game-enter-to {
  opacity: 1;
  transform: translateX(0%);
}

.game-leave-from {
  opacity: 1;
  transform: translateX(100%);
}

.game-leave-to {
  opacity: 0;
  transform: translateX(0%);

}
</style>
