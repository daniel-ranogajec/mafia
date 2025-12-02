import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocket } from './websocket'

export enum CurrentGameScreen {
  NIGHT,
  RESULTS,
  DAY,
  VOTING,
  END
}

export interface ChoosenPlayer {
  name: string
  choosenPlayer?: string
}

export const usePlayRoom = defineStore('playRoom', () => {
  const ws = useWebsocket()

  const players = ref<ChoosenPlayer[]>([])
  const choosenPlayer = ref<ChoosenPlayer | null>(null)

  const currentScreen = ref<CurrentGameScreen>(CurrentGameScreen.NIGHT)
  const screenBefore = ref<CurrentGameScreen>(CurrentGameScreen.NIGHT)

  const readyBool = ref<boolean>(false)

  function initialize() {
    // Sync players in the play room store with the latest websocket players
    players.value = ws.players.map((val) => ({ name: val }))
    checkTheCurrentGame()
  }

  function checkTheCurrentGame() {
    // Use websocket players as single source of truth for game state
    if (ws.players.length === 1) {
      currentScreen.value = CurrentGameScreen.END
    }
  }

  function nextCycle() {
    checkTheCurrentGame()

    if (currentScreen.value === CurrentGameScreen.END) {
      return
    }

    // Simple cycle: NIGHT -> RESULTS -> DAY -> VOTING -> RESULTS -> NIGHT (loop)
    switch (currentScreen.value) {
      case CurrentGameScreen.NIGHT:
        currentScreen.value = CurrentGameScreen.RESULTS
        screenBefore.value = CurrentGameScreen.NIGHT
        readyBool.value = false
        break

      case CurrentGameScreen.RESULTS:
        if (screenBefore.value === CurrentGameScreen.NIGHT) {
          currentScreen.value = CurrentGameScreen.DAY
          screenBefore.value = CurrentGameScreen.RESULTS
          readyBool.value = false
        } else if (screenBefore.value === CurrentGameScreen.VOTING) {
          currentScreen.value = CurrentGameScreen.NIGHT
          screenBefore.value = CurrentGameScreen.RESULTS
          readyBool.value = false
        }
        break

      case CurrentGameScreen.DAY:
        currentScreen.value = CurrentGameScreen.VOTING
        screenBefore.value = CurrentGameScreen.DAY
        readyBool.value = false
        break

      case CurrentGameScreen.VOTING:
        currentScreen.value = CurrentGameScreen.RESULTS
        screenBefore.value = CurrentGameScreen.VOTING
        readyBool.value = false
        break
    }
  }

  return {
    currentScreen,
    nextCycle,
    players,
    choosenPlayer,
    initialize,
    readyBool
  }
})
